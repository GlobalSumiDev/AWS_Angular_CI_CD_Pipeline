// file-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Folder } from '../pages/model/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  //private apiUrl = 'https://app.globalsumi.com/api/files';
  private apiUrl = 'http://localhost:8081/api/files';

  constructor(private http: HttpClient) { }


  uploadParentFile(parentFolderName: string, userEmail: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('parentFolderName', parentFolderName);
    formData.append('userEmail', userEmail);
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}/upload`, formData)
      .pipe(catchError(this.handleError));
  }

  uploadParentSubChildFile(parentFolderName: string, parentSubFolderName: string, file: File, userEmail: string): Observable<any> {
    const formData = new FormData();
    formData.append('parentFolderName', parentFolderName);
    formData.append('parentSubFolderName', parentSubFolderName);
    formData.append('file', file);
    formData.append('userEmail', userEmail);

    return this.http.post<any>(`${this.apiUrl}/uploadParentSubFile`, formData)
      .pipe(catchError(this.handleError));
  }

  uploadParentSubFolderFile(parentFolderName: string, parentSubFolderName: string, parentSubChildFoldername: string, file: File, userEmail: string): Observable<any> {
    const formData = new FormData();
    formData.append('parentFolderName', parentFolderName);
    formData.append('parentSubFolderName', parentSubFolderName);
    formData.append('parentSubChildFoldername', parentSubChildFoldername);
    formData.append('file', file);
    formData.append('userEmail', userEmail);

    return this.http.post<any>(`${this.apiUrl}/uploadParentSubChildFile`, formData)
      .pipe(catchError(this.handleError));
  }

  uploadParentSubFinalChildFile(parentFolderName: string, parentSubFolderName: string, parentSubChildFoldername: string, parentSubFinalChildFoldername: string, file: File, userEmail: string): Observable<any> {
    const formData = new FormData();
    formData.append('parentFolderName', parentFolderName);
    formData.append('parentSubFolderName', parentSubFolderName);
    formData.append('parentSubChildFoldername', parentSubChildFoldername);
    formData.append('parentSubFinalChildFoldername', parentSubFinalChildFoldername);
    formData.append('file', file);
    formData.append('userEmail', userEmail);

    return this.http.post<any>(`${this.apiUrl}/uploadParentSubFinalChildFile`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteFile(fileName: string, parentFolderName: string, userEmail: string): Observable<void> {
    const params = new HttpParams()
      .set('fileName', encodeURIComponent(fileName))
      .set('parentFolderName', parentFolderName)
      .set('userEmail', userEmail);

    return this.http.delete<void>(`${this.apiUrl}/delete`, { params })
      .pipe(catchError(this.handleError));
  }


  downloadFile(fileName: string, parentFolderName: string, userEmail: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${fileName}?parentFolderName=${parentFolderName}&userEmail=${userEmail}`, {
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }



  getFiles(parentFolderName: string, userEmail: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/parentFolder?parentFolderName=${parentFolderName}&userEmail=${userEmail}`)
      .pipe(catchError(this.handleError));
  }
  getParentSubFolderFilesName(parentFolderName: string, parentSubFolderName: string, userEmail: any) {
    return this.http.get<any[]>(`${this.apiUrl}/parentSubFolder/Files?parentFolderName=${parentFolderName}&parentSubFolderName=${parentSubFolderName}&userEmail=${userEmail}`)
      .pipe(catchError(this.handleError));
  }
  getParentSubFinalChildFolderFilesName(parentFolderName: string, parentSubFolderName: string, parentSubChildFoldername: string, parentSubFinalChildFoldername: string, userEmail: any) {
    return this.http.get<any[]>(`${this.apiUrl}/parentSubChildFinalFolder?parentFolderName=${parentFolderName}&parentSubFolderName=${parentSubFolderName}&parentSubChildFoldername=${parentSubChildFoldername}&parentSubFinalChildFoldername=${parentSubFinalChildFoldername}&userEmail=${userEmail}`)
      .pipe(catchError(this.handleError));
  }
  getParentSubChildFolderFilesName(parentFolderName: string, parentSubFolderName: string, parentSubChildFoldername: string, userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/parentSubChildFolder/Files?parentFolderName=${parentFolderName}&parentSubFolderName=${parentSubFolderName}&parentSubChildFoldername=${parentSubChildFoldername}&userEmail=${userEmail}`)
      .pipe(catchError(this.handleError));
  }
  getParentFinalSubChildFolderFilesName(parentFolderName: string, parentSubFolderName: string, parentSubChildFoldername: string, parentSubFinalChildFoldername: string, userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/parentFinalSubChildFolder/Files?parentFolderName=${parentFolderName}&parentSubFolderName=${parentSubFolderName}&parentSubChildFoldername=${parentSubChildFoldername}&parentSubFinalChildFoldername=${parentSubFinalChildFoldername}&userEmail=${userEmail}`)
      .pipe(catchError(this.handleError));
  }




  deleteFileInParentSubFolder(fileName: string, parentFolderName: string, parentSubFolderName: string, userEmail: string): Observable<void> {
    const params = new HttpParams()
      .set('fileName', encodeURIComponent(fileName))
      .set('parentFolderName', parentFolderName)
      .set('parentSubFolderName', parentSubFolderName)
      .set('userEmail', userEmail);

    return this.http.delete<void>(`${this.apiUrl}/parentSubFolder/delete`, { params })
      .pipe(catchError(this.handleError));
  }

  deleteFileInParentSubChildFolder(fileName: string, parentFolderName: string, parentSubFolderName: string, parentSubChildFolderName:string, userEmail: string): Observable<void> {
    const params = new HttpParams()
      .set('fileName', encodeURIComponent(fileName))
      .set('parentFolderName', parentFolderName)
      .set('parentSubFolderName', parentSubFolderName)
      .set('parentSubChildFolderName',parentSubChildFolderName)
      .set('userEmail', userEmail);

    return this.http.delete<void>(`${this.apiUrl}/parentSubChildFolder/delete`, { params })
      .pipe(catchError(this.handleError));
  }

  deleteFileInParentSubFinalChildFolder(fileName: string, parentFolderName: string, parentSubFolderName: string, parentSubChildFolderName:string, parentSubFinalChildFoldername:string, userEmail: string): Observable<void> {
    const params = new HttpParams()
      .set('fileName', encodeURIComponent(fileName))
      .set('parentFolderName', parentFolderName)
      .set('parentSubFolderName', parentSubFolderName)
      .set('parentSubChildFolderName',parentSubChildFolderName)
      .set('parentSubFinalChildFoldername', parentSubFinalChildFoldername)
      .set('userEmail', userEmail);

    return this.http.delete<void>(`${this.apiUrl}/parentFinalSubChildFolder/delete`, { params })
      .pipe(catchError(this.handleError));
  }


}
