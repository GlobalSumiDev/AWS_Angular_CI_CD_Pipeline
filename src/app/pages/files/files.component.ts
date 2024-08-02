import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FileInfo } from '../../services/file-service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-files',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})

export class FilesComponent implements OnInit {
  
  folderName: string | any ;
  selectedFile: File | any;
  files: FileInfo[] = [];
  noFilesMessage: string = '';
  userEmail: string | any = '';
  uploadForm: FormGroup | any;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthenticationService 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.folderName = params.get('folderName');
      console.log (this.folderName)
      });
        this.userEmail = this.authService.getCurrentUserEmail();  
      console.log(this.userEmail)
      this.loadFiles();
  }
  onFileChange(event: any): void {
       this.selectedFile = event.target.files[0] || null;
       console.log("outside upload file method")
      }

     

  uploadFile(): void {
    console.log("inside upload file method")
     if (!this.selectedFile) {
       this.toastr.error('Please select a file to upload.');
       return;
     }
  
     const formData = new FormData();
     formData.append('file', this.selectedFile);
     formData.append('folderName', this.folderName);
     formData.append('userEmail', this.userEmail);  
  
    //this.http.post<FileInfo[]>('http://localhost:8081/api/files/upload', formData).subscribe(
      this.http.post<any>('http://localhost:8081/api/files/upload', formData).subscribe(
        () => {
          this.toastr.success('File uploaded successfully!');
          this.loadFiles();  
          console.log("called API sucesfully");
        },
        () => {
          this.toastr.error('Failed to upload file.');
          console.log("Failed to called API sucesfully")
        }
      );

  }

  loadFiles(): void {
    console.log('inside load files method');
    this.http.get<FileInfo[]>(`http://localhost:8081/api/files?folderName=${this.folderName}&userEmail=${this.userEmail}`).subscribe(
      
      (files) => {
        if (files.length === 0) {
          this.noFilesMessage = 'No files uploaded yet.';
        } else {
          this.noFilesMessage = '';
        }
        this.files = files.map(file => ({
          ...file,
          size: (file.size / 1024).toFixed(2), 
          uploadTime: new Date(file.uploadTime).toLocaleString()
        }));
      },
      (error) => {
        this.toastr.error('Failed to load files.');
        this.noFilesMessage = 'No files available.';
      }
    );
  }

  downloadFile(fileName: string): void {
    this.http.get(`http://localhost:8081/api/files/download?fileName=${fileName}&folderName=${this.folderName}&userEmail=${this.userEmail}`, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      () => {
        this.toastr.error('Failed to download file.');
      }
    );
  }
  deleteFile(fileName: string): void {
    this.http.delete(`http://localhost:8081/api/files?fileName=${fileName}&folderName=${this.folderName}&userEmail=${this.userEmail}`).subscribe(
      () => {
        this.toastr.success('File deleted successfully!');
          this.loadFiles();  
      },
      () => {
        this.toastr.error('Failed to delete file.');
      }
    );
  }
 
}