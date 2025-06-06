import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { InnerbannerComponent } from '../../components/innerbanner/innerbanner.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { fileUploadAPI } from '../../constant/api';


@Component({
  selector: 'app-careerapplication',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InnerbannerComponent, ToastrModule],
  providers: [ToastrService],
  templateUrl: './careerapplication.component.html',
  styleUrl: './careerapplication.component.scss'
})
export class CareerapplicationComponent {

  applicationForm: FormGroup | any;
  submitted = false;
  selectedCVFile: any | null = null;
  selectedCoverLatter: any | null = null;
  loading: boolean = false;
  // base64String: string | undefined;
  uploadCV: any;
  uploadCoverLatter: any;
  imageBase64: any;
  uploadCVBase: any;
  careerItemId: string | undefined;
  dataService: any;
  currentItem: any;
  filteredItems: any;
  items: any;
  registration: { firstName: any; lastName: any; email: any; role: any; company: any; phoneNumber: any; message: any; subject: any; description: any  } | undefined;
  jsonString: any;
  cv: { cv: any; } | undefined;
  coverLetter: { coverLetter: any; } | undefined;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }



  ngOnInit(): void {

    // Retrieve the 'id' parameter from the route
    this.route.params.subscribe(params => {
      this.careerItemId = params['id'];
    });

    //Filter the data
    this.http.get<any>('assets/data/careers-data.json').subscribe(data => {
      this.currentItem = data.careers;
      if (this.careerItemId) {
        this.filteredItems = this.currentItem.filter((item: { id: any; }) => item.id == this.careerItemId);
      }
    });

    //Form Values
    this.applicationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      company: ['', [Validators.required, Validators.maxLength(30)]],
      role: ['', [Validators.required, Validators.maxLength(30)]],
      cv: ['', [Validators.required,]],
      coverLetter: ['', [Validators.required,]],
      message: ['', [Validators.required]],

    });
  }
  get formControls() {
    return this.applicationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.applicationForm.valid) {
      this.loading = true;
      this.submitted = false;
      if(this.applicationForm.value || this.filteredItems ){

        this.registration = {
          "firstName": this.applicationForm.value.firstName,
          "lastName": this.applicationForm.value.lastName,
          "email": this.applicationForm.value.email,
          "role": this.applicationForm.value.role,
          "company": this.applicationForm.value.company,
          "phoneNumber": this.applicationForm.value.phoneNumber,
          "message": this.applicationForm.value.message,
          "subject": this.filteredItems && this.filteredItems[0]?.title,
          "description": this.filteredItems && this.filteredItems[0]?.description,
        };
      }

     const formData = new FormData();
    formData.append('cv', this.applicationForm.value.cv);
    formData.append('coverLetter', this.applicationForm.value.coverLetter);
    formData.append('registration', JSON.stringify(this.registration));

      const headers = new HttpHeaders()
      this.http.post<any>(fileUploadAPI,formData, { headers: headers })
      .subscribe(response => {

          this.loading = false;
          this.applicationForm.reset();
          this.selectedCVFile = null;
          this.selectedCoverLatter = null;
          this.toastrService.success(response.message);
        }, error => {
          this.loading = false;
          if (error && error.status == 400) {
            this.toastrService.error("Bad Reqquest");
          } else {
            this.toastrService.error('An error occurred while uploading the CV. Please try later');
          }
        });
  }
}
  displayFileNameCV(event: any) {
    if(event.target.files.length > 0){
      this.selectedCVFile = event.target.files[0];
      this.applicationForm.get('cv').setValue(this.selectedCVFile);
    }
   }

  displayselectedCoverLatter(event: any) {
    if(event.target.files.length > 0){
      this.selectedCoverLatter = event.target.files[0];
      this.applicationForm.get('coverLetter').setValue(this.selectedCoverLatter);
    }
  }

}
