import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrolltopComponent } from '../../components/scrolltop/scrolltop.component';
import { filter, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { contactAPI } from '../../constant/api';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ScrolltopComponent,
    ToastrModule,
  ],
  providers: [ToastrService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  //Get Current Year
  currentYear = new Date().getFullYear();

  homeForm: FormGroup | any;

  //Home page footer form
  enableFooterForm: boolean = true;
  contactFooterForm: boolean = true;
  submitted = false;
  toastr: any;
  loading: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.enableFooterForm = this.router.url === '/' ||
        this.router.url === '/contactus' ||
        this.router.url === '/contactus#letstalk';
      }
    });

    //Footer Form
    this.homeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      subject: ['', [Validators.required, Validators.maxLength(30)]],
      message: ['', [Validators.required]],
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.snapshot.fragment)
    ).subscribe((fragment) => {
      if (fragment === 'letstalk') {
        setTimeout(() => {
          const footerElement = document.getElementById('letstalk');
          if (footerElement) {
            footerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });

  }
  get footForm() {
    return this.homeForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.homeForm.valid) {
      this.loading = true;
      this.submitted = false;
      this.http.post<any>(contactAPI, this.homeForm.value)
      .subscribe(response => {
        this.loading = false;
        this.homeForm.reset();
        this.toastrService.success(response.responseMessage);

      }, error => {
        this.loading = false;
        if (error && error.status == 400) {
          this.toastrService.error("Bad Reqquest");
        } else {
          this.toastrService.error('An error occurred while uploading the data. Please try later');
        }
      });
    }
  }
}
