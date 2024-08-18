import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { FolderService } from '../../services/folder-service.service';
import { FilesComponent } from '../files/files.component';
import { CommonModule } from '@angular/common';
import { Folder } from '../model/folder.model';


@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FilesComponent],
})
export class WelcomeComponent implements OnInit {
  createFolderForm: FormGroup | any;
  folders: Folder[] = [];
  userEmail: string | any;
  selectedFolder: Folder | null = null;
  fileService: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthenticationService,
    private folderService: FolderService
  ) { }

  ngOnInit(): void {
    this.userEmail = this.authService.getCurrentUserEmail();
    this.createFolderForm = this.fb.group({
      folderName: ['', Validators.required]
    });

    this.loadFolders();
  }

  loadFolders() {
    if (this.userEmail) {
      this.folderService.getFolders(this.userEmail)  // No parentFolderName provided
        .subscribe(
          (folders: any[]) => {
            this.folders = folders;
          },
          (error: any) => {
            console.error('Error loading folders:', error);
            this.toastr.error('Failed to load folders.');
          }
        );
    }
  }

  selectFolder(folder: Folder): void {
    this.router.navigate([folder.parentFolderName, 'files']);
    console.log('selectFolder is clicked');
  }

  createFolder(): void {
    // Check if the form is invalid
    if (this.createFolderForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    // Extract folder name from form and trim it
    const parentFolderName = this.createFolderForm.value.folderName.trim();

    // Check if folder name is not empty and doesn't already exist
    if (parentFolderName) {
      {
        // Call the service to create the folder
        this.folderService.createFolder(parentFolderName, this.userEmail).subscribe(
          (response: any) => {

            if (response.message === 'Folder already exists') {
              this.toastr.error(`Folder '${parentFolderName}' already exists.`);
            } else {
              this.toastr.success(`Folder '${parentFolderName}' created successfully!`);
              this.createFolderForm.reset();
              this.loadFolders();
            }
          },
          (error: any) => {
            console.error('Error creating folder:', error);
            this.toastr.error('Failed to create folder.');
          }
        );

      }
    }
  }



  deleteFolder(folder: any): void {
    const parentFolderName = folder.parentFolderName;

    if (this.userEmail && parentFolderName) {
      this.folderService.deleteFolder(parentFolderName, this.userEmail).subscribe(
        (response: any) => {
          // Remove the folder from the list after successful deletion
          this.folders = this.folders.filter(f => f.parentFolderName !== parentFolderName);
          this.toastr.success(`Folder '${parentFolderName}' deleted successfully!`);
          this.loadFolders();
        },
        (error: any) => {
          console.error('Error deleting folder:', error);
          this.toastr.error('Failed to delete folder.');
        }
      );
    }
  }
}
