import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { FileService } from '../../services/file-service.service';
import { CommonModule } from '@angular/common';
import { Folder } from '../model/folder.model';
import { FolderService } from '../../services/folder-service.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-files',
  standalone: true,
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule // Import MatDialogModule for using Angular Material Dialog
  ]
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
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  // Debug: Check the route parameters
  this.route.paramMap.subscribe(params => {
    this.parentFolderName = params.get('ParentFolderName');
    this.parentSubFolderName = params.get('ParentSubFolderName');
    this.parentSubChildFoldername = params.get('ParentSubChildFolderName');
    this.parentSubFinalChildFoldername = params.get('ParentSubFinalChildFolderName');
    console.log('Route parameters:', this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername, this.parentSubFinalChildFoldername);
  });

  // Debug: Check current user email
  this.userEmail = this.authService.getCurrentUserEmail();
  console.log('Current user email:', this.userEmail);

  // Debug: Determine which folders to load
  if(this.parentSubFinalChildFoldername){
    console.log('Loading files for sub- Final - child folder...');
    this.loadFiles(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername, this.parentSubFinalChildFoldername);
  }else if (this.parentSubChildFoldername) {
    console.log('Loading folders and files for sub-child folder...');
    this.loadFolders(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername);
    this.loadFiles(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername);
  } else if (this.parentSubFolderName) {
    console.log('Loading folders and files for subfolder...');
    this.loadFolders(this.parentFolderName, this.parentSubFolderName);
    this.loadFiles(this.parentFolderName, this.parentSubFolderName);
  } else if (this.parentFolderName) {
    console.log('Loading folders and files for parent folder...');
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
      if (!this.createFolderForm.value.folderName.trim()) {
        this.toastr.warning('No file is choosen. Please choose a file', 'Warning', {
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
          timeOut: 5000
        });
      } 
      return;
    }
  
    const uploadObservable = this.getUploadObservable();
  
    if (uploadObservable) {
      uploadObservable.subscribe(
        (response: any) => {
          if (response.message === 'File uploaded successfully') {
            this.toastr.success('File uploaded successfully!');
            // Clear the file input and form values
            this.resetForm();
            // Reload files to reflect the uploaded file
            if (this.parentSubFinalChildFoldername) {
              this.loadFiles(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername, this.parentSubFinalChildFoldername);
            } else if (this.parentSubChildFoldername) {
              this.loadFiles(this.parentFolderName, this.parentSubFolderName, this.parentSubChildFoldername);
            } else if (this.parentSubFolderName) {
              this.loadFiles(this.parentFolderName, this.parentSubFolderName);
            } else {
              this.loadFiles(this.parentFolderName);
            }
          } else if (response.message === 'File already exists') {
            this.toastr.warning('File already exists. Please choose a different file.');
            this.resetForm();
          } else {
            this.toastr.error('Failed to upload file.');
            this.resetForm();
          }
        },
        (error) => {
          
           if (error.message === 'File already exists') {
            this.toastr.warning('File already exists. Please choose a different file.');
            this.resetForm();
          } else  {
            this.toastr.error('Failed to upload file.');
            this.resetForm();
            console.error('Error:', error);
          }

        }
      );
    }
  }
  
  private resetForm(): void {
    // Reset the selected file
    this.selectedFile = null;
    
    // Clear the file input element
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
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

    // Open confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
            if (this.parentFolderName && this.userEmail) {
                // Log the folder structure for debugging
                console.log('Attempting to delete file in folder structure:');
                console.log('parentFolderName:', this.parentFolderName);
                console.log('parentSubFolderName:', this.parentSubFolderName);
                console.log('parentSubChildFolderName:', this.parentSubChildFoldername);
                console.log('parentSubFinalChildFolderName:', this.parentSubFinalChildFoldername);

                // Call the appropriate service method to delete the file based on folder hierarchy
                if (this.parentSubFinalChildFoldername) {
                    console.log('Attempting to delete file from parent sub-final child folder');
                    this.fileService.deleteFileInParentSubFinalChildFolder(
                        fileName,
                        this.parentFolderName,
                        this.parentSubFolderName,
                        this.parentSubChildFoldername,
                        this.parentSubFinalChildFoldername,
                        this.userEmail
                    ).subscribe(
                        (response: any) => {
                             {
                                this.toastr.success(`File '${fileName}' deleted successfully!`);
                                this.loadFiles(
                                    this.parentFolderName,
                                    this.parentSubFolderName,
                                    this.parentSubChildFoldername,
                                    this.parentSubFinalChildFoldername
                                );
                            } 
                        },
                        (error) => {
                            this.toastr.error('Failed to delete file.');
                            console.error('Error deleting file:', error);
                        }
                    );
                } else if (this.parentSubChildFoldername) {
                    console.log('Attempting to delete file from parent sub-child folder');
                    this.fileService.deleteFileInParentSubChildFolder(
                        fileName,
                        this.parentFolderName,
                        this.parentSubFolderName,
                        this.parentSubChildFoldername,
                        this.userEmail
                    ).subscribe(
                        (response: any) => {
                                this.toastr.success(`File '${fileName}' deleted successfully!`);
                                this.loadFiles(
                                    this.parentFolderName,
                                    this.parentSubFolderName,
                                    this.parentSubChildFoldername
                                );
                        },
                        (error) => {
                            this.toastr.error('Failed to delete file.');
                            console.error('Error deleting file:', error);
                        }
                    );
                } else if (this.parentSubFolderName) {
                    console.log('Attempting to delete file from parent subfolder');
                    this.fileService.deleteFileInParentSubFolder(
                        fileName, this.parentFolderName,
                      this.parentSubFolderName,
                        this.userEmail
                    ).subscribe(
                        (response: any) => {
                            
                                this.toastr.success(`File '${fileName}' deleted successfully!`);
                                this.loadFiles(this.parentFolderName, this.parentSubFolderName);
                             
                        },
                        (error) => {
                            this.toastr.error('Failed to delete file.');
                            console.error('Error deleting file:', error);
                        }
                    );
                } else {
                    console.log('Attempting to delete file from root folder');
                    this.fileService.deleteFile(
                        fileName,
                        this.parentFolderName,
                        this.userEmail
                    ).subscribe(
                        (response: any) => {
                             
                                this.toastr.success(`File '${fileName}' deleted successfully!`);
                                this.loadFiles(this.parentFolderName);
                            
                        },
                        (error) => {
                            this.toastr.error('Failed to delete file.');
                            console.error('Error deleting file:', error);
                        }
                    );
                }
            } else {
                console.error('Missing parentFolderName or userEmail.');
                this.toastr.error('Cannot delete file: Missing parent folder name or user email.');
            }
        } else {
            console.log('File deletion canceled by user.');
        }
    });
}


  loadFiles(parentFolderName: string, parentSubFolderName?: string, parentSubChildFoldername?: string, parentSubFinalChildFoldername?: any): void {
    console.log('Loading files for:', parentFolderName, 'Subfolder:', parentSubFolderName, 'parentSubChildFoldername:',parentSubChildFoldername, 'parentSubFinalChildFoldername:',parentSubFinalChildFoldername);
    console.log('User Email:', this.userEmail);

    if (this.parentFolderName && this.userEmail) {

      // Check if a subfolder name is provided
      if(parentSubFinalChildFoldername && parentSubChildFoldername && parentSubFolderName ){
        console.log('Loading files from subChildfolder...');
        this.fileService.getParentFinalSubChildFolderFilesName(parentFolderName, parentSubFolderName, parentSubChildFoldername,parentSubFinalChildFoldername, this.userEmail)
          .subscribe(
            (files: any[]) => {
              this.files = files || []; 
              this.noFilesMessage = this.files.length === 0 ? 'No files found.' : '';
              console.log('Fetched files:', this.files);
            },
            (error: any) => {
              console.error('Error loading files from subfolder:', error);
              this.toastr.error('Failed to load files from subfolder.');
            }
          );
      }else if(parentSubChildFoldername && parentSubFolderName ){
        console.log('Loading files from subChildfolder...');
        this.fileService.getParentSubChildFolderFilesName(parentFolderName, parentSubFolderName, parentSubChildFoldername, this.userEmail)
          .subscribe(
            (files: any[]) => {
              this.files = files || [];
              this.noFilesMessage = this.files.length === 0 ? 'No files found.' : '';
              console.log('Fetched files:', this.files);
            },
            (error: any) => {
              console.error('Error loading files from subfolder:', error);
              this.toastr.error('Failed to load files from subfolder.');
            }
          );
      }else if (parentSubFolderName) {
        console.log('Loading files from subfolder...');
        this.fileService.getParentSubFolderFilesName(parentFolderName, parentSubFolderName, this.userEmail)
          .subscribe(
            (files: any[]) => {
              this.files = files;
              this.noFilesMessage = this.files.length === 0 ? 'No files found.' : '';
              console.log('Fetched files:', this.files);
            },
            (error: any) => {
              console.error('Error loading files from subfolder:', error);
              this.toastr.error('Failed to load files from subfolder.');
            }
          );
      } else {
        console.log('Loading files from parent folder...');
        this.fileService.getFiles(this.parentFolderName, this.userEmail)
          .subscribe(
            (files) => {
              this.files = files;
              this.noFilesMessage = this.files.length === 0 ? 'No files found.' : '';
              console.log('Fetched files:', this.files);
            },
            (error) => {
              console.error('Error loading files from parent folder:', error);
              this.toastr.error('Failed to load files from parent folder.');
            }
          );
      }
    } else {
      console.error('Missing folderName or userEmail.');
    }
  }

loadFolders(
  parentFolderName: string, 
  parentSubFolderName?: string, 
  parentSubChildFoldername?: string,  
  parentSubFinalChildFoldername?: string
): void {
  console.log(
    'Loading folders for:', 
    'Parent Folder:', parentFolderName, 
    'Parent Subfolder:', parentSubFolderName, 
    'Parent SubChild Folder:', parentSubChildFoldername, 
    'Parent SubFinalChild Folder:', parentSubFinalChildFoldername
  );
  console.log('User Email:', this.userEmail);

  if (parentSubChildFoldername && parentSubFinalChildFoldername) {
    console.log('in last folder no more nested folders');
   
  }else if (parentSubChildFoldername && parentSubFolderName) {
    console.log('Loading files from sub- Final child folder...');
    this.folderService.parentSubFinalChildFolderName(
      parentFolderName,
      parentSubFolderName,
      parentSubChildFoldername,
      this.userEmail
    ).subscribe(
      (folders: any[]) => {
        this.parentSubChildFolders = folders;
        console.log('Fetched final child folders:', this.parentSubFinalChildFoldername);
      },
      (error: any) => {
        console.error('Error loading final child folders:', error);
        this.toastr.error('Failed to load final child folders.');
      }
    );
  }else if (parentFolderName && parentSubFolderName) {
    console.log('Loading files from sub-child folder...');
    this.folderService.parentSubChildFolderNames(
      parentFolderName,
      parentSubFolderName,
      this.userEmail
    ).subscribe(
      (folders: any[]) => {
        this.parentSubFolders = folders;
        console.log('Fetched final child folders:', this.parentSubChildFolders);
      },
      (error: any) => {
        console.error('Error loading final child folders:', error);
        this.toastr.error('Failed to load final child folders.');
      }
    );
  } else if (parentFolderName) {
    console.log('Loading files from subfolder...');
    this.folderService.getParentSubFolder(
      parentFolderName,
      this.userEmail
    ).subscribe(
      (folders: any[]) => {
        this.parentFolders = folders;
        console.log('Fetched sub-child folders:', this.parentSubFolders);
      },
      (error: any) => {
        console.error('Error loading sub-child folders:', error);
        this.toastr.error('Failed to load sub-child folders.');
      }
    );
  }
}


createFolder(): void {
  if (this.createFolderForm.invalid) {
    if (!this.createFolderForm.value.folderName.trim()) {
      this.toastr.warning('Please enter a folder name.', 'Warning', {
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
        timeOut: 5000
      });
    } 
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
  
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        if (this.userEmail && this.parentFolderName) {
          if (parentSubFinalChildFolderName) {
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
            console.log('Attempting to delete parent subfolder');
            this.folderService.deleteParentSubFolder(
              this.parentFolderName,
              parentSubFolderName,
              this.userEmail
            ).subscribe(
              (response: any) => {
                console.log('Response after deleting parent subfolder:', response.message);
                if (response.message === 'Folder deleted successfully!') {
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
            this.toastr.error('No valid folder name provided for deletion.');
          }
        } else {
          console.log('Missing user email or parent folder name');
          this.toastr.error('Cannot delete folder: Missing user email or parent folder name.');
        }
      } else {
        console.log('Folder deletion canceled by user.');
      }
    });
  }
  



  selectFolder(folder: Folder): void {
    if (folder.parentFolderName && folder.parentSubFolderName && folder.parentSubChildFolderName && folder.parentSubFinalChildFolderName) {
      this.router.navigate([folder.parentFolderName, folder.parentSubFolderName, folder.parentSubChildFolderName,folder.parentSubFinalChildFolderName, 'files']);
    }else if (folder.parentFolderName && folder.parentSubFolderName && folder.parentSubChildFolderName) {
      this.router.navigate([folder.parentFolderName, folder.parentSubFolderName, folder.parentSubChildFolderName, 'files']);
    } else if (folder.parentFolderName && folder.parentSubFolderName) {
      this.router.navigate([folder.parentFolderName, folder.parentSubFolderName, 'files']);
    } else if (folder.parentFolderName) {
      this.router.navigate([folder.parentFolderName, 'files']);
    }
    console.log('selectFolder is clicked');
  }

}
