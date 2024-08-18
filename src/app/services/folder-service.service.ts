import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Folder } from '../pages/model/folder.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  
 
  
  private apiUrl = 'http://localhost:8081/api/folders'; // Ensure this matches your backend API

  constructor(private http: HttpClient) { }

  // Fetch all folders for a user
  getFolders(userEmail: string): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/byUserEmail?userEmail=${userEmail}`);
  }

  createFolder(parentFolderName: string, userEmail: string): Observable<string> {
    const url = `${this.apiUrl}/createParentFolder`;
    // Send data as query parameters
    return this.http.post<string>(url, null, {
      params: {
        parentFolderName: parentFolderName,
        userEmail: userEmail
      }
    });
  }

  // Delete a folder by its ID
  deleteFolder(parentFolderName: string, userEmail: string): Observable<any> {
    const params = new HttpParams()
      .set('ParentFolderName', parentFolderName) // Make sure this matches the backend
      .set('userEmail', userEmail);

    return this.http.delete<any>(`${this.apiUrl}`, { params });
  }

  createParentSubFolder(parentFolderName: string, parentSubFolderName: string, userEmail: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${parentFolderName}/createParentSubFolder`, null, {
      params: {
        parentSubFolderName: parentSubFolderName,
        userEmail: userEmail
      }
    }).pipe(catchError(this.handleError));
  }

  createParentSubChildFolder(parentFolderName: string, parentSubFolderName: string, parentSubChildFolderName:string, userEmail: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${parentFolderName}/${parentSubFolderName}/parentSubChildFolder`, null, {
      params: {
        parentSubChildFolderName: parentSubChildFolderName,
        userEmail: userEmail
      }
    }).pipe(catchError(this.handleError));
  }


  getParentSubFolder(parentFolderName: string, userEmail: string): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/${parentFolderName}/files?userEmail=${userEmail}`)
      .pipe(catchError(this.handleError));
  }

  parentSubChildFolderNames(parentFolderName: string, parentSubFolderName: string, userEmail: string) {
    const url = `${this.apiUrl}/${parentFolderName}/${parentSubFolderName}/ParentSubFolders?userEmail=${userEmail}`;
    console.log('Constructed URL:', url); // Debugging line
    return this.http.get<Folder[]>(url);
  }

  
  deleteParentSubFolder(parentFolderName: string, parentSubFolderName: string, userEmail: string){
    const params = new HttpParams()
      .set('ParentSubFolderName',parentSubFolderName)
      .set('userEmail', userEmail);

    return this.http.delete<any>(`${this.apiUrl}/${parentFolderName}/deleteParentSubFolder`, { params });
  }

  deleteParentSubChildFolder(parentFolderName: string, parentSubFolderName: string, parentSubChildFolderName:string, userEmail: string){
    const params = new HttpParams()
    .set('parentSubChildFolderName',parentSubChildFolderName)
    .set('userEmail', userEmail);
    return this.http.delete<any>(`${this.apiUrl}/${parentFolderName}/${parentSubFolderName}/deleteParentSubChildFolder`, { params });
  }

  parentSubFinalChildFolderName(parentFolderName: string, parentSubFolderName: string,parentSubChildFolderName:string, userEmail: string){
    const url = `${this.apiUrl}/${parentFolderName}/${parentSubFolderName}/${parentSubChildFolderName}/ParentSubChildFolders?userEmail=${userEmail}`;
    console.log('Constructed URL:', url); // Debugging line
    return this.http.get<Folder[]>(url);
  }

  createParentSubFinalChildFolderName(parentFolderName: string, parentSubFolderName: string, parentSubChildFolderName:string, parentSubFinalChildFolderName:string, userEmail: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${parentFolderName}/${parentSubFolderName}/${parentSubChildFolderName}/createParentSubFinalChildFolder`, null, {
      params: {
        parentSubFinalChildFolderName: parentSubFinalChildFolderName,
        userEmail: userEmail
      }
    }).pipe(catchError(this.handleError));
  }

  deleteParentSubFinalChildFolder(parentFolderName: string, parentSubFolderName: string, parentSubChildFolderName:string,parentSubFinalChildFolderName:string, userEmail: string){
    const params = new HttpParams()
    .set('parentSubFinalChildFolderName',parentSubFinalChildFolderName)
    .set('userEmail', userEmail);
    return this.http.delete<any>(`${this.apiUrl}/${parentFolderName}/${parentSubFolderName}/${parentSubChildFolderName}/deleteParentSubFinalChildFolder`, { params });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}

