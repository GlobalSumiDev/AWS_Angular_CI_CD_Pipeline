import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { FileService } from '../../services/file-service.service';
import { CommonModule } from '@angular/common';
import { Folder } from '../model/folder.model';
import { FolderService } from '../../services/folder-service.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  standalone: true,
  styleUrls: ['./files.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class FilesComponent implements OnInit {

  parentFolderName: string | any;
  parentSubFolderName: string | any;
  createFolderForm: FormGroup | any;
  uploadForm: FormGroup | any;
  selectedFile: File | any;
  userEmail: string | any;
  parentSubChildFoldername: string | any;
  parentSubFinalChildFoldername: string | any;
  files: any[] = [];
  noFilesMessage: string = '';
  folders: Folder[] = [];
  parentFolders: Folder[] = [];
  parentSubFolders: Folder[] = [];
  parentSubChildFolders: Folder[] = [];

  constructor(
    private fileService: FileService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private folderService: FolderService,
  ) { }

  ngOnInit(): void {
    // Get the parent and subfolder names from the route parameters
    this.route.paramMap.subscribe(params => {
      this.parentFolderName = params.get('ParentFolderName');
      this.parentSubFolderName = params.get('ParentSubFolderName');
      this.parentSubChildFoldername = params.get('ParentSubChildFolderName');
      console.log('Parent Folder Name:', this.parentFolderName);
      console.log('Parent Sub Folder Name:', this.parentSubFolderName);
      console.log('Parent Sub Child Folder Name:', this.parentSubChildFoldername);
    });

    // Get the current user email
    this.userEmail = this.authService.getCurrentUserEmail();

    // Load folders first
    if (this.parentSubChildFoldername) {
      this.loadFolders(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername);
      this.loadFiles(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername);
    } else if (this.parentSubFolderName) {
      this.loadFolders(this.parentFolderName, this.parentSubFolderName);
      this.loadFiles(this.parentFolderName, this.parentSubFolderName);
    } else if (this.parentFolderName) {
      this.loadFolders(this.parentFolderName);
      this.loadFiles(this.parentFolderName);
    }

    // Initialize the form for creating a new folder
    this.createFolderForm = this.fb.group({
      folderName: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }

  uploadFile(): void {
    if (!this.selectedFile || !this.parentFolderName || !this.userEmail) {
      this.toastr.error('Please provide all required information.');
      return;
    }
  
    const uploadObservable = this.getUploadObservable();
  
    if (uploadObservable) {
      uploadObservable.subscribe(
        () => {
          this.toastr.success('File uploaded successfully!');
          this.loadFiles(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername, this.parentSubFinalChildFoldername);
        },
        (error) => {
          this.toastr.error('Failed to upload file.');
          console.error('Error:', error);
        }
      );
    }
  }
  
  private getUploadObservable() {
    if (this.parentSubFinalChildFoldername) {
      return this.fileService.uploadParentSubFinalChildFile(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername, this.parentSubFinalChildFoldername, this.selectedFile, this.userEmail);
    } else if (this.parentSubChildFoldername) {
      return this.fileService.uploadParentSubFolderFile(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername, this.selectedFile, this.userEmail);
    } else if (this.parentSubFolderName) {
      return this.fileService.uploadParentSubChildFile(this.parentFolderName, this.parentSubFolderName, this.selectedFile, this.userEmail);
    } else {
      return this.fileService.uploadParentFile(this.parentFolderName, this.userEmail, this.selectedFile);
    }
  }
  

  downloadFile(fileName: string): void {
    if (this.parentFolderName && this.userEmail) {
      this.fileService.downloadFile(fileName, this.parentFolderName, this.userEmail)
        .subscribe(
          (response: any) => {
            // Create a Blob from the response
            const blob = new Blob([response], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);

            // Create a link element and trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; // Set file name for download
            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            a.remove();
          },
          (error) => {
            console.error('Error downloading file:', error);
            // Display error message
          }
        );
    } else {
      console.error('Missing folderName or userEmail.');
    }
  }


  deleteFile(fileName: string): void {
    console.log('Deleting file:', fileName); // Debugging line to check fileName
    if (this.parentFolderName && this.userEmail) {
      this.fileService.deleteFile(fileName, this.parentFolderName, this.userEmail)
        .subscribe(
          (response: any) => {
            this.toastr.success('File deleted successfully!');
            console.log('File deleted, loading files...');
            if (this.parentSubFolderName) {
              this.loadFiles(this.parentFolderName, this.parentSubFolderName);
            } else {
              this.loadFiles(this.parentFolderName);
            }
          },
          (error) => {
            this.toastr.error('Failed to delete file.');
            console.error('Error:', error);
          }
        );
    }
  }


  loadFiles(parentFolderName: string, parentSubFolderName?: string, parentSubChildFoldername?: string, parentSubFinalChildFoldername?: string): void {
    console.log('Loading files for:', parentFolderName, 'Subfolder:', parentSubFolderName, 'SubChildFolder:', parentSubChildFoldername, 'SubFinalChildFolder:', parentSubFinalChildFoldername);
    console.log('User Email:', this.userEmail);

    if (!this.userEmail || !parentFolderName) {
        console.error('Missing folderName or userEmail.');
        return;
    }

    let fileObservable;

    if (parentSubFinalChildFoldername && parentSubChildFoldername && parentSubFolderName) {
        // Load files from the sub-final child folder
        console.log('Loading files from sub-final child folder...');
        fileObservable = this.fileService.getParentSubFinalChildFolderFilesName(parentFolderName, parentSubFolderName, parentSubChildFoldername, parentSubFinalChildFoldername, this.userEmail);
    } else if (parentSubChildFoldername && parentSubFolderName) {
        // Load files from the sub-child folder
        console.log('Loading files from sub-child folder...');
        fileObservable = this.fileService.getParentSubChildFolderFilesName(parentFolderName, parentSubFolderName, parentSubChildFoldername, this.userEmail);
    } else if (parentSubFolderName) {
        // Load files from the subfolder
        console.log('Loading files from subfolder...');
        fileObservable = this.fileService.getParentSubFolderFilesName(parentFolderName, parentSubFolderName, this.userEmail);
    } else {
        // Load files from the parent folder
        console.log('Loading files from parent folder...');
        fileObservable = this.fileService.getFiles(parentFolderName, this.userEmail);
    }

    fileObservable.subscribe(
        (files: any[]) => {
            this.files = files;
            this.noFilesMessage = this.files.length === 0 ? 'No files found.' : '';
            console.log('Fetched files:', this.files);
        },
        (error: any) => {
            console.error('Error loading files:', error);
            this.toastr.error('Failed to load files.');
        }
    );
}
  

loadFolders(parentFolderName: string, parentSubFolderName?: string, parentSubChildFoldername?: string,  parentSubFinalChildFoldername?: string): void {
  console.log('Loading folders for:', parentFolderName, 'Subfolder:', parentSubFolderName, 'SubChildFolder:', parentSubChildFoldername, 'SubFinalChildFolder:', parentSubFinalChildFoldername);
    console.log('User Email:', this.userEmail);
    // if (parentSubFinalChildFoldername && parentSubChildFoldername && parentSubFolderName) {
    //   // Load files from the sub-final child folder
    //   console.log('Loading files from sub-final child folder...');
    //   this.folderService.parentSubFinalChildFolderName(
    //     parentFolderName,
    //     parentSubFolderName,
    //     parentSubChildFoldername,
    //     this.userEmail
    // ).subscribe(
    //     (folders: any[]) => {
    //         this.parentSubChildFolders = folders;
    //         console.log('Fetched final child folders:', this.parentSubChildFolders);
    //         if (this.parentSubChildFolders.length === 0) {
    //             console.log('No folders found, displaying message or placeholder');
    //             this.parentSubChildFolders = []; // Ensure array is defined
    //         }
    //     },
    //     (error: any) => {
    //         console.error('Error loading final child folders:', error);
    //         this.toastr.error('Failed to load final child folders.');
    //     }
    // ); } else
     if (parentSubChildFoldername && parentSubFolderName) {
      // Load files from the sub-child folder
      console.log('Loading files from sub-child folder...');
      this.folderService.parentSubFinalChildFolderName(
        parentFolderName,
        parentSubFolderName,
        parentSubChildFoldername,
        this.userEmail
    ).subscribe(
        (folders: any[]) => {
            this.parentSubChildFolders = folders;
            console.log('Fetched final child folders:', this.parentSubChildFolders);
            if (this.parentSubChildFolders.length === 0) {
                console.log('No folders found, displaying message or placeholder');
                this.parentSubChildFolders = []; // Ensure array is defined
            }
        },
        (error: any) => {
            console.error('Error loading final child folders:', error);
            this.toastr.error('Failed to load final child folders.');
        }
    ); } else if (parentSubFolderName) {
      // Load files from the subfolder
      console.log('Loading files from subfolder...');
      this.folderService.parentSubChildFolderNames(
        parentFolderName,
        parentSubFolderName,
        this.userEmail
    ).subscribe(
        (folders: any[]) => {
            this.parentSubFolders = folders;
            console.log('Fetched sub-child folders:', this.parentSubFolders);
            if (this.parentSubFolders.length === 0) {
                console.log('No folders found, displaying message or placeholder');
                this.parentSubFolders = []; // Ensure array is defined
            }
        },
        (error: any) => {
            console.error('Error loading sub-child folders:', error);
            this.toastr.error('Failed to load sub-child folders.');
        }
    ); } else {
      // Load files from the parent folder
      console.log('Loading files from parent folder...');
      // Fetching parent folders
      this.folderService.getParentSubFolder(
        parentFolderName,
        this.userEmail
    ).subscribe(
        (folders: any[]) => {
            this.parentFolders = folders;
            console.log('Fetched parent folders:', this.parentFolders);
            if (this.parentFolders.length === 0) {
                console.log('No folders found, displaying message or placeholder');
                this.parentFolders = []; // Ensure array is defined
            }
        },
        (error: any) => {
            console.error('Error loading parent folders:', error);
            this.toastr.error('Failed to load parent folders.');
        }
    ); 
  }
}

createFolder(): void {
  if (this.createFolderForm.invalid) {
      console.log('Form is invalid');
      return;
  }

  const folderName = this.createFolderForm.value.folderName.trim();

  if (!folderName) {
      console.log('Folder name is empty');
      return;
  }

  let createFolderObservable;

  if (!this.parentSubFolderName) {
      createFolderObservable = this.folderService.createParentSubFolder(this.parentFolderName, folderName, this.userEmail);
  } else if (!this.parentSubChildFoldername) {
      createFolderObservable = this.folderService.createParentSubChildFolder(this.parentFolderName, this.parentSubFolderName, folderName, this.userEmail);
  } else {
      createFolderObservable = this.folderService.createParentSubFinalChildFolderName(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername, folderName, this.userEmail);
  }

  createFolderObservable.subscribe(
      (response: any) => {
          console.log('Response after creating folder:', response.message);
          if (response.message === 'Folder already exists') {
              this.toastr.error(`Folder '${folderName}' already exists.`);
          } else {
              this.toastr.success(`Folder '${folderName}' created successfully!`);
              this.createFolderForm.reset();
              console.log('Calling loadFolders after creating folder');
              // Call loadFolders after the folder is successfully created
              this.loadFolders(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername);
          }
      },
      (error: any) => {
          console.error('Error creating folder:', error);
          this.toastr.error('Failed to create folder.');
      }
  );
}
  goBackToFolders(): void {
    const currentUrl = this.router.url; // Get the current URL
    const urlSegments = currentUrl.split('/'); // Split the URL into segments

    // Remove the second-to-last segment
    if (urlSegments.length > 3) {
      urlSegments.splice(urlSegments.length - 2, 1); // Remove the second-to-last segment
      const newUrl = urlSegments.join('/'); // Join the remaining segments into a new URL
      this.router.navigate([newUrl]); // Navigate to the new URL
    } else {
      // If there are no more segments, navigate to the welcome page
      this.router.navigate(['/welcome']);
    }
  }

  deleteFolder(folder: any): void {
    const parentSubFolderName = folder.parentSubFolderName;
    const parentSubChildFolderName = folder.parentSubChildFolderName;
    const parentSubFinalChildFolderName = folder.parentSubFinalChildFolderName;

    console.log('Deleting folder:');
    console.log('parentFolderName:', this.parentFolderName);
    console.log('parentSubFolderName:', parentSubFolderName);
    console.log('parentSubChildFolderName:', parentSubChildFolderName);
    console.log('parentSubFinalChildFolderName:', parentSubFinalChildFolderName);

    if (this.userEmail && this.parentFolderName) {
      if (parentSubFinalChildFolderName) {
        // Case: Deleting a Parent Sub-Final Child Folder
        console.log('Attempting to delete parent sub-final child folder');

        this.folderService.deleteParentSubFinalChildFolder(
          this.parentFolderName,
          parentSubFolderName,
          parentSubChildFolderName,
          parentSubFinalChildFolderName,
          this.userEmail
        ).subscribe(
          (response: any) => {
            console.log('Response after deleting parent sub-final child folder:', response.message);
            if (response.message === 'Folder deleted successfully!') {
              // Remove the folder from the list after successful deletion
              this.parentSubChildFolders = this.parentSubChildFolders.filter(f => f.parentSubFinalChildFolderName !== parentSubFinalChildFolderName);
              this.toastr.success(`Parent sub-final child folder '${parentSubFinalChildFolderName}' deleted successfully!`);
              this.loadFolders(this.parentFolderName, parentSubFolderName, parentSubChildFolderName);
            } else {
              this.toastr.error('Failed to delete parent sub-final child folder.');
            }
          },
          (error: any) => {
            console.error('Error deleting parent sub-final child folder:', error);
            this.toastr.error('Failed to delete parent sub-final child folder.');
          }
        );
      } else if (parentSubChildFolderName) {
        // Case: Deleting a Parent Sub-Child Folder
        console.log('Attempting to delete parent sub-child folder');

        this.folderService.deleteParentSubChildFolder(
          this.parentFolderName,
          parentSubFolderName,
          parentSubChildFolderName,
          this.userEmail
        ).subscribe(
          (response: any) => {
            console.log('Response after deleting parent sub-child folder:', response.message);
            if (response.message === 'Folder deleted successfully!') {
              // Remove the folder from the list after successful deletion
              this.parentSubFolders = this.parentSubFolders.filter(f => f.parentSubChildFolderName !== parentSubChildFolderName);
              this.toastr.success(`Parent sub-child folder '${parentSubChildFolderName}' deleted successfully!`);
              this.loadFolders(this.parentFolderName, parentSubFolderName);
            } else {
              this.toastr.error('Failed to delete parent sub-child folder.');
            }
          },
          (error: any) => {
            console.error('Error deleting parent sub-child folder:', error);
            this.toastr.error('Failed to delete parent sub-child folder.');
          }
        );
      } else if (parentSubFolderName) {
        // Case: Deleting a Parent Subfolder
        console.log('Attempting to delete parent subfolder');

        this.folderService.deleteParentSubFolder(
          this.parentFolderName,
          parentSubFolderName,
          this.userEmail
        ).subscribe(
          (response: any) => {
            console.log('Response after deleting parent subfolder:', response.message);
            if (response.message === 'Folder deleted successfully!') {
              // Remove the folder from the list after successful deletion
              this.parentFolders = this.parentFolders.filter(f => f.parentSubFolderName !== parentSubFolderName);
              this.toastr.success(`Parent subfolder '${parentSubFolderName}' deleted successfully!`);
              this.loadFolders(this.parentFolderName);
            } else {
              this.toastr.error('Failed to delete parent subfolder.');
            }
          },
          (error: any) => {
            console.error('Error deleting parent subfolder:', error);
            this.toastr.error('Failed to delete parent subfolder.');
          }
        );
      } else {
        console.log('No valid folder name to delete');
      }
    } else {
      console.log('Missing user email or parent folder name');
    }
  }




  selectFolder(folder: Folder): void {
    if (folder.parentFolderName && folder.parentSubFolderName && folder.parentSubChildFolderName) {
      this.router.navigate([folder.parentFolderName, folder.parentSubFolderName, folder.parentSubChildFolderName, 'files']);
    } else if (folder.parentFolderName && folder.parentSubFolderName) {
      this.router.navigate([folder.parentFolderName, folder.parentSubFolderName, 'files']);
    } else if (folder.parentFolderName) {
      this.router.navigate([folder.parentFolderName, 'files']);
    }
    console.log('selectFolder is clicked');
  }

}
