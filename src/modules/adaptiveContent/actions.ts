/**
 * Adaptive Content Module Actions
 */

import type { UploadedFileData, GeneratedContentData, CustomizationSettings } from './types';

// Existing action types
export const ADAPTIVE_CONTENT_LOAD_REQUEST = 'adaptiveContent/LOAD_REQUEST';
export const ADAPTIVE_CONTENT_LOAD_SUCCESS = 'adaptiveContent/LOAD_SUCCESS';
export const ADAPTIVE_CONTENT_LOAD_FAILURE = 'adaptiveContent/LOAD_FAILURE';
export const ADAPTIVE_CONTENT_UPDATE_CREDITS = 'adaptiveContent/UPDATE_CREDITS';

// Content Builder action types
export const CONTENT_BUILDER_ADD_UPLOADED_FILE = 'contentBuilder/ADD_UPLOADED_FILE';
export const CONTENT_BUILDER_UPDATE_FILE_UPLOAD_STATUS = 'contentBuilder/UPDATE_FILE_UPLOAD_STATUS';
export const CONTENT_BUILDER_REMOVE_UPLOADED_FILE = 'contentBuilder/REMOVE_UPLOADED_FILE';
export const CONTENT_BUILDER_SET_FILE_UPLOADING = 'contentBuilder/SET_FILE_UPLOADING';
export const CONTENT_BUILDER_SET_UPLOAD_ERROR = 'contentBuilder/SET_UPLOAD_ERROR';
export const CONTENT_BUILDER_SET_GENERATING = 'contentBuilder/SET_GENERATING';
export const CONTENT_BUILDER_SET_GENERATED_CONTENT = 'contentBuilder/SET_GENERATED_CONTENT';
export const CONTENT_BUILDER_SET_GENERATION_ERROR = 'contentBuilder/SET_GENERATION_ERROR';
export const CONTENT_BUILDER_UPDATE_CUSTOMIZATION = 'contentBuilder/UPDATE_CUSTOMIZATION';
export const CONTENT_BUILDER_SET_SAVING = 'contentBuilder/SET_SAVING';
export const CONTENT_BUILDER_SET_SAVE_ERROR = 'contentBuilder/SET_SAVE_ERROR';
export const CONTENT_BUILDER_SET_SELECTED_FILE = 'contentBuilder/SET_SELECTED_FILE';
export const CONTENT_BUILDER_SET_SELECTED_CONTENT_TYPE = 'contentBuilder/SET_SELECTED_CONTENT_TYPE';
export const CONTENT_BUILDER_CLEAR_ALL = 'contentBuilder/CLEAR_ALL';

// Existing action interfaces
export interface AdaptiveContentLoadRequestAction {
  type: typeof ADAPTIVE_CONTENT_LOAD_REQUEST;
}

export interface AdaptiveContentLoadSuccessAction {
  type: typeof ADAPTIVE_CONTENT_LOAD_SUCCESS;
}

export interface AdaptiveContentLoadFailureAction {
  type: typeof ADAPTIVE_CONTENT_LOAD_FAILURE;
  payload: string;
}

export interface AdaptiveContentUpdateCreditsAction {
  type: typeof ADAPTIVE_CONTENT_UPDATE_CREDITS;
  payload: number;
}

// Content Builder action interfaces
export interface ContentBuilderAddUploadedFileAction {
  type: typeof CONTENT_BUILDER_ADD_UPLOADED_FILE;
  payload: UploadedFileData;
  [key: string]: any;
}

export interface ContentBuilderUpdateFileUploadStatusAction {
  type: typeof CONTENT_BUILDER_UPDATE_FILE_UPLOAD_STATUS;
  payload: {
    fileName: string;
    uploadProgress: number;
    isUploading: boolean;
    fileId?: string;
  };
  [key: string]: any;
}

export interface ContentBuilderRemoveUploadedFileAction {
  type: typeof CONTENT_BUILDER_REMOVE_UPLOADED_FILE;
  payload: string; // fileId
  [key: string]: any;
}

export interface ContentBuilderSetFileUploadingAction {
  type: typeof CONTENT_BUILDER_SET_FILE_UPLOADING;
  payload: boolean;
  [key: string]: any;
}

export interface ContentBuilderSetUploadErrorAction {
  type: typeof CONTENT_BUILDER_SET_UPLOAD_ERROR;
  payload: string | null;
  [key: string]: any;
}

export interface ContentBuilderSetGeneratingAction {
  type: typeof CONTENT_BUILDER_SET_GENERATING;
  payload: boolean;
  [key: string]: any;
}

export interface ContentBuilderSetGeneratedContentAction {
  type: typeof CONTENT_BUILDER_SET_GENERATED_CONTENT;
  payload: GeneratedContentData;
  [key: string]: any;
}

export interface ContentBuilderSetGenerationErrorAction {
  type: typeof CONTENT_BUILDER_SET_GENERATION_ERROR;
  payload: string | null;
  [key: string]: any;
}

export interface ContentBuilderUpdateCustomizationAction {
  type: typeof CONTENT_BUILDER_UPDATE_CUSTOMIZATION;
  payload: Partial<CustomizationSettings>;
  [key: string]: any;
}

export interface ContentBuilderSetSavingAction {
  type: typeof CONTENT_BUILDER_SET_SAVING;
  payload: boolean;
  [key: string]: any;
}

export interface ContentBuilderSetSaveErrorAction {
  type: typeof CONTENT_BUILDER_SET_SAVE_ERROR;
  payload: string | null;
  [key: string]: any;
}

export interface ContentBuilderSetSelectedFileAction {
  type: typeof CONTENT_BUILDER_SET_SELECTED_FILE;
  payload: string | null; // fileId
  [key: string]: any;
}

export interface ContentBuilderSetSelectedContentTypeAction {
  type: typeof CONTENT_BUILDER_SET_SELECTED_CONTENT_TYPE;
  payload: string | null; // contentTypeId
  [key: string]: any;
}

export interface ContentBuilderClearAllAction {
  type: typeof CONTENT_BUILDER_CLEAR_ALL;
  [key: string]: any;
}

export type AdaptiveContentAction =
  | AdaptiveContentLoadRequestAction
  | AdaptiveContentLoadSuccessAction
  | AdaptiveContentLoadFailureAction
  | AdaptiveContentUpdateCreditsAction
  | ContentBuilderAddUploadedFileAction
  | ContentBuilderUpdateFileUploadStatusAction
  | ContentBuilderRemoveUploadedFileAction
  | ContentBuilderSetFileUploadingAction
  | ContentBuilderSetUploadErrorAction
  | ContentBuilderSetGeneratingAction
  | ContentBuilderSetGeneratedContentAction
  | ContentBuilderSetGenerationErrorAction
  | ContentBuilderUpdateCustomizationAction
  | ContentBuilderSetSavingAction
  | ContentBuilderSetSaveErrorAction
  | ContentBuilderSetSelectedFileAction
  | ContentBuilderSetSelectedContentTypeAction
  | ContentBuilderClearAllAction;

// Existing action creators
export const adaptiveContentLoadRequest = (): AdaptiveContentLoadRequestAction => ({
  type: ADAPTIVE_CONTENT_LOAD_REQUEST,
});

export const adaptiveContentLoadSuccess = (): AdaptiveContentLoadSuccessAction => ({
  type: ADAPTIVE_CONTENT_LOAD_SUCCESS,
});

export const adaptiveContentLoadFailure = (payload: string): AdaptiveContentLoadFailureAction => ({
  type: ADAPTIVE_CONTENT_LOAD_FAILURE,
  payload,
});

export const adaptiveContentUpdateCredits = (
  payload: number
): AdaptiveContentUpdateCreditsAction => ({
  type: ADAPTIVE_CONTENT_UPDATE_CREDITS,
  payload,
});

// Content Builder action creators
export const contentBuilderAddUploadedFile = (
  payload: UploadedFileData
): ContentBuilderAddUploadedFileAction => ({
  type: CONTENT_BUILDER_ADD_UPLOADED_FILE,
  payload,
});

export const contentBuilderUpdateFileUploadStatus = (
  fileName: string,
  uploadProgress: number,
  isUploading: boolean,
  fileId?: string
): ContentBuilderUpdateFileUploadStatusAction => ({
  type: CONTENT_BUILDER_UPDATE_FILE_UPLOAD_STATUS,
  payload: { fileName, uploadProgress, isUploading, fileId },
});

export const contentBuilderRemoveUploadedFile = (
  payload: string
): ContentBuilderRemoveUploadedFileAction => ({
  type: CONTENT_BUILDER_REMOVE_UPLOADED_FILE,
  payload,
});

export const contentBuilderSetFileUploading = (
  payload: boolean
): ContentBuilderSetFileUploadingAction => ({
  type: CONTENT_BUILDER_SET_FILE_UPLOADING,
  payload,
});

export const contentBuilderSetUploadError = (
  payload: string | null
): ContentBuilderSetUploadErrorAction => ({
  type: CONTENT_BUILDER_SET_UPLOAD_ERROR,
  payload,
});

export const contentBuilderSetGenerating = (
  payload: boolean
): ContentBuilderSetGeneratingAction => ({
  type: CONTENT_BUILDER_SET_GENERATING,
  payload,
});

export const contentBuilderSetGeneratedContent = (
  payload: GeneratedContentData
): ContentBuilderSetGeneratedContentAction => ({
  type: CONTENT_BUILDER_SET_GENERATED_CONTENT,
  payload,
});

export const contentBuilderSetGenerationError = (
  payload: string | null
): ContentBuilderSetGenerationErrorAction => ({
  type: CONTENT_BUILDER_SET_GENERATION_ERROR,
  payload,
});

export const contentBuilderUpdateCustomization = (
  payload: Partial<CustomizationSettings>
): ContentBuilderUpdateCustomizationAction => ({
  type: CONTENT_BUILDER_UPDATE_CUSTOMIZATION,
  payload,
});

export const contentBuilderSetSaving = (payload: boolean): ContentBuilderSetSavingAction => ({
  type: CONTENT_BUILDER_SET_SAVING,
  payload,
});

export const contentBuilderSetSaveError = (
  payload: string | null
): ContentBuilderSetSaveErrorAction => ({
  type: CONTENT_BUILDER_SET_SAVE_ERROR,
  payload,
});

export const contentBuilderSetSelectedFile = (
  payload: string | null
): ContentBuilderSetSelectedFileAction => ({
  type: CONTENT_BUILDER_SET_SELECTED_FILE,
  payload,
});

export const contentBuilderSetSelectedContentType = (
  payload: string | null
): ContentBuilderSetSelectedContentTypeAction => ({
  type: CONTENT_BUILDER_SET_SELECTED_CONTENT_TYPE,
  payload,
});

export const contentBuilderClearAll = (): ContentBuilderClearAllAction => ({
  type: CONTENT_BUILDER_CLEAR_ALL,
});
