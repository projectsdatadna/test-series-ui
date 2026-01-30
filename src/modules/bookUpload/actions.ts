/**
 * Book Upload Module Actions
 */

import type { BookUploadState, DropdownOption } from './types';

export const SET_UPLOADED_FILE = 'bookUpload/SET_UPLOADED_FILE';
export const SET_SELECTED_SYLLABUS = 'bookUpload/SET_SELECTED_SYLLABUS';
export const SET_SELECTED_STANDARD = 'bookUpload/SET_SELECTED_STANDARD';
export const SET_SELECTED_SUBJECT = 'bookUpload/SET_SELECTED_SUBJECT';
export const SET_CHAPTER_NAME = 'bookUpload/SET_CHAPTER_NAME';
export const SET_UPLOADING = 'bookUpload/SET_UPLOADING';
export const SET_UPLOAD_ERROR = 'bookUpload/SET_UPLOAD_ERROR';
export const SET_UPLOAD_SUCCESS = 'bookUpload/SET_UPLOAD_SUCCESS';
export const SET_UPLOAD_PROGRESS = 'bookUpload/SET_UPLOAD_PROGRESS';
export const SET_FILE_ID = 'bookUpload/SET_FILE_ID';
export const RESET_FORM = 'bookUpload/RESET_FORM';

export const setUploadedFile = (file: File | null) => ({
  type: SET_UPLOADED_FILE,
  payload: file,
});

export const setSelectedSyllabus = (syllabus: DropdownOption | null) => ({
  type: SET_SELECTED_SYLLABUS,
  payload: syllabus,
});

export const setSelectedStandard = (standard: DropdownOption | null) => ({
  type: SET_SELECTED_STANDARD,
  payload: standard,
});

export const setSelectedSubject = (subject: DropdownOption | null) => ({
  type: SET_SELECTED_SUBJECT,
  payload: subject,
});

export const setChapterName = (name: string) => ({
  type: SET_CHAPTER_NAME,
  payload: name,
});

export const setUploading = (isUploading: boolean) => ({
  type: SET_UPLOADING,
  payload: isUploading,
});

export const setUploadError = (error: string | null) => ({
  type: SET_UPLOAD_ERROR,
  payload: error,
});

export const setUploadSuccess = (message: string | null) => ({
  type: SET_UPLOAD_SUCCESS,
  payload: message,
});

export const setUploadProgress = (progress: number) => ({
  type: SET_UPLOAD_PROGRESS,
  payload: progress,
});

export const setFileId = (fileId: string | null) => ({
  type: SET_FILE_ID,
  payload: fileId,
});

export const resetForm = () => ({
  type: RESET_FORM,
});
