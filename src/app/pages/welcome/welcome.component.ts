import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  [x: string]: any;
  createFolderForm: FormGroup | any;
  folders: string[] = ['Resume', 'Passport', 'Documents'];


  userEmail: string | null = '';
  private folderApiUrl = 'http://localhost:8081/api/folders'; 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthenticationService , // Inject AuthenticationService
  
  ) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getCurrentUserEmail();  // Retrieve user email
    this.createFolderForm = this.fb.group({
      folderName: ['', Validators.required]
    });

    this.loadFolders();
  }

  // Method to select a folder and navigate to the file upload page
  selectFolder(folder: string): void {
    if (this.userEmail) {
      console.log('Navigating to:', `/${folder}/files`, 'with email:', this.userEmail);
      //this.router.navigate([`/${folder}/files`], { queryParams: { email: this.userEmail } });
      this.router.navigate([`/${folder}/files`]);
    }else {
      console.error('User email is not set');
    }
  }

  // Method to create a new folder
  createFolder(): void {
    if (this.createFolderForm.invalid) {
      console.log('Form is invalid');
      return;
    }
  
    const folderName = this.createFolderForm.value.folderName.trim();
    console.log('Attempting to create folder:', folderName);
  
    if (folderName) {
      if (this.folders.includes(folderName)) {
        this.toastr.error('Folder name already exists.');
        console.log('Folder name already exists:', folderName);
      } else {

        this.http.post<any>(this.folderApiUrl, { folderName, userEmail: this.userEmail })
    .subscribe(
        (response: any) => {
            
            console.log('Folder creation successful:', response);
           this.folders.push(folderName);
            this.toastr.success(`Folder '${folderName}' created successfully!`);
             this.createFolderForm.reset();
        },
        (error) => {
          console.error('Error creating folder:', error);
              this.toastr.error('Failed to create folder.');
        }
    );
        
      }
    }
  }

  // Load folders associated with the logged-in user
  loadFolders(): void {
    if (this.userEmail) {
      this.http.get<any>(`http://localhost:8081/api/folders?userEmail=${this.userEmail}`).subscribe(
        (folders) => {
          const folderNames = folders.map((folder: { folderName: string }) => folder.folderName);
          // Merge the default folders with the ones fetched from the backend
          this.folders = ['Resume', 'Passport', 'Documents', ...folderNames];
        },
        (error) => {
          console.error('Error loading folders:', error);
          this.toastr.error('Failed to load folders.');
        }
      );
    }
  }

  // Method to delete a folder
  deleteFolder(folderName: string): void {
    if (this.userEmail) {
      this.http.delete(`http://localhost:8081/api/folders?folderName=${folderName}&email=${this.userEmail}`).subscribe(
        (folders) => {
          this.folders = this.folders.filter((f: string) => f !== folderName);
          this.toastr.success('Folder deleted successfully!');
        },
        (error) => {
          this.toastr.error('Failed to delete folder.');
        }
      );
    }
  }
}
