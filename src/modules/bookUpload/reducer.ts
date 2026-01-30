/**
 * Book Upload Module Reducer
 */

import type { BookUploadState } from './types';
import {
  SET_UPLOADED_FILE,
  SET_SELECTED_SYLLABUS,
  SET_SELECTED_STANDARD,
  SET_SELECTED_SUBJECT,
  SET_CHAPTER_NAME,
  SET_UPLOADING,
  SET_UPLOAD_ERROR,
  SET_UPLOAD_SUCCESS,
  SET_UPLOAD_PROGRESS,
  SET_FILE_ID,
  RESET_FORM,
} from './actions';

const initialState: BookUploadState = {
  uploadedFile: null,
  selectedSyllabus: null,
  selectedStandard: null,
  selectedSubject: null,
  chapterName: '',
  isUploading: false,
  uploadError: null,
  uploadSuccess: null,
  uploadProgress: 0,
  fileId: null,
};

export const bookUploadReducer = (
  state: BookUploadState = initialState,
  action: any
): BookUploadState => {
  switch (action.type) {
    case SET_UPLOADED_FILE:
      return {
        ...state,
        uploadedFile: action.payload,
        uploadError: null,
      };

    case SET_SELECTED_SYLLABUS:
      return {
        ...state,
        selectedSyllabus: action.payload,
      };

    case SET_SELECTED_STANDARD:
      return {
        ...state,
        selectedStandard: action.payload,
      };

    case SET_SELECTED_SUBJECT:
      return {
        ...state,
        selectedSubject: action.payload,
      };

    case SET_CHAPTER_NAME:
      return {
        ...state,
        chapterName: action.payload,
      };

    case SET_UPLOADING:
      return {
        ...state,
        isUploading: action.payload,
      };

    case SET_UPLOAD_ERROR:
      return {
        ...state,
        uploadError: action.payload,
      };

    case SET_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadSuccess: action.payload,
      };

    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload,
      };

    case SET_FILE_ID:
      return {
        ...state,
        fileId: action.payload,
      };

    case RESET_FORM:
      return initialState;

    default:
      return state;
  }
};
