import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64toFileService {

  constructor() { }
  base64toFile(base64Data: string, filename: string): File | null {
    try {
      // Remove data URI prefix if present
      const base64String = base64Data.replace(/^data:[^;]+;base64,/, '');
      console.log('====================================');
      console.log(base64String, "base64String");
      console.log('====================================');
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new File([byteArray], filename, { type: 'application/octet-stream' });
    } catch (error) {
      console.error('Error decoding Base64 string:', error);
      return null;
    }
  }
}
