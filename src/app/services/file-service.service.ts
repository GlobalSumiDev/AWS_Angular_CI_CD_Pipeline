import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = '/api/files';  // Base URL for the backend

  constructor(private http: HttpClient) {}

  getFiles(folderName: string, userEmail: string): Observable<FileInfo[]> {
    return this.http.get<FileInfo[]>(`${this.baseUrl}?folderName=${folderName}&userEmail=${userEmail}`);
  }

  uploadFile(file: File, folderName: string, userEmail: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderName', folderName);
    formData.append('userEmail', userEmail);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  downloadFile(fileId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download?fileId=${fileId}`, { responseType: 'blob' });
  }

  deleteFile(fileId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}?fileId=${fileId}`);
  }
}

export interface FileInfo {
  id: number;
  name: string;
  size: any;
  uploadTime: string;
  userEmail: string;
}