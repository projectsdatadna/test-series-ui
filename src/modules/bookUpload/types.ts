/**
 * Book Upload Module Types
 */

export interface BookUploadState {
  uploadedFile: File | null;
  selectedSyllabus: DropdownOption | null;
  selectedStandard: DropdownOption | null;
  selectedSubject: DropdownOption | null;
  chapterName: string;
  isUploading: boolean;
  uploadError: string | null;
  uploadSuccess: string | null;
  uploadProgress: number;
  fileId: string | null;
}

export interface DropdownOption {
  id: string;
  name: string;
}

export interface BookUploadRequest {
  fileId: string;
  fileName: string;
  syllabusId: string;
  standardId: string;
  subjectId: string;
  chapterName: string;
  fileSize: number;
}

export interface BookUploadResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    fileId: string;
    fileName: string;
  };
}
