import { Folder } from "./folder.model";

export interface File {
    
    fileName: string;
    parentFolderName:string;
    parentSubFolderName:string;
    parentSubChildFolderName:string;
    parentSubFinalChildFolderName:string;
    userEmail: string;
    uploadTime: Date;
    size: number;
    data: Blob; 
    folder: Folder;

  }