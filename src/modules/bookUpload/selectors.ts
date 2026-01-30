/**
 * Book Upload Module Selectors
 */

import type { RootState } from '../../store';

export const selectBookUploadState = (state: RootState) => state.bookUpload;

export const selectUploadedFile = (state: RootState) => state.bookUpload.uploadedFile;

export const selectSelectedSyllabus = (state: RootState) => state.bookUpload.selectedSyllabus;

export const selectSelectedStandard = (state: RootState) => state.bookUpload.selectedStandard;

export const selectSelectedSubject = (state: RootState) => state.bookUpload.selectedSubject;

export const selectChapterName = (state: RootState) => state.bookUpload.chapterName;

export const selectIsUploading = (state: RootState) => state.bookUpload.isUploading;

export const selectUploadError = (state: RootState) => state.bookUpload.uploadError;

export const selectUploadSuccess = (state: RootState) => state.bookUpload.uploadSuccess;

export const selectUploadProgress = (state: RootState) => state.bookUpload.uploadProgress;

export const selectFileId = (state: RootState) => state.bookUpload.fileId;
