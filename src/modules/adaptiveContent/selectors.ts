/**
 * Adaptive Content Module Selectors
 */

import type { RootState } from '../../store';
import type { ContentType, UploadedFileData, GeneratedContentData, CustomizationSettings } from './types';

// Existing selectors
export const selectAdaptiveContentLoading = (state: RootState): boolean =>
  state.adaptiveContent.loading;

export const selectAdaptiveContentError = (state: RootState): string | null =>
  state.adaptiveContent.error;

export const selectContentTypes = (state: RootState): ContentType[] =>
  state.adaptiveContent.contentTypes;

export const selectAICredits = (state: RootState): number => state.adaptiveContent.aiCredits;

export const selectRecentlyGenerated = (state: RootState): number =>
  state.adaptiveContent.recentlyGenerated;

// Content Builder selectors
export const selectContentBuilderUploadedFiles = (state: RootState): UploadedFileData[] =>
  state.adaptiveContent.contentBuilder.uploadedFiles;

export const selectContentBuilderIsUploading = (state: RootState): boolean =>
  state.adaptiveContent.contentBuilder.isUploading;

export const selectContentBuilderUploadError = (state: RootState): string | null =>
  state.adaptiveContent.contentBuilder.uploadError;

export const selectContentBuilderIsGenerating = (state: RootState): boolean =>
  state.adaptiveContent.contentBuilder.isGenerating;

export const selectContentBuilderGeneratedContent = (state: RootState): GeneratedContentData | null =>
  state.adaptiveContent.contentBuilder.generatedContent;

export const selectContentBuilderGenerationError = (state: RootState): string | null =>
  state.adaptiveContent.contentBuilder.generationError;

export const selectContentBuilderCustomizationSettings = (state: RootState): CustomizationSettings =>
  state.adaptiveContent.contentBuilder.customizationSettings;

export const selectContentBuilderIsSaving = (state: RootState): boolean =>
  state.adaptiveContent.contentBuilder.isSaving;

export const selectContentBuilderSaveError = (state: RootState): string | null =>
  state.adaptiveContent.contentBuilder.saveError;

export const selectContentBuilderSelectedFileId = (state: RootState): string | null =>
  state.adaptiveContent.contentBuilder.selectedFileId;

export const selectContentBuilderSelectedContentTypeId = (state: RootState): string | null =>
  state.adaptiveContent.contentBuilder.selectedContentTypeId;

export const selectContentBuilderSelectedFile = (state: RootState): UploadedFileData | undefined =>
  state.adaptiveContent.contentBuilder.uploadedFiles.find(
    (f) => f.fileId === state.adaptiveContent.contentBuilder.selectedFileId
  );

const adaptiveContentSelector = {
  // Existing
  getLoading: selectAdaptiveContentLoading,
  getError: selectAdaptiveContentError,
  getContentTypes: selectContentTypes,
  getAICredits: selectAICredits,
  getRecentlyGenerated: selectRecentlyGenerated,
  // Content Builder
  getUploadedFiles: selectContentBuilderUploadedFiles,
  getIsUploading: selectContentBuilderIsUploading,
  getUploadError: selectContentBuilderUploadError,
  getIsGenerating: selectContentBuilderIsGenerating,
  getGeneratedContent: selectContentBuilderGeneratedContent,
  getGenerationError: selectContentBuilderGenerationError,
  getCustomizationSettings: selectContentBuilderCustomizationSettings,
  getIsSaving: selectContentBuilderIsSaving,
  getSaveError: selectContentBuilderSaveError,
  getSelectedFileId: selectContentBuilderSelectedFileId,
  getSelectedContentTypeId: selectContentBuilderSelectedContentTypeId,
  getSelectedFile: selectContentBuilderSelectedFile,
};

export default adaptiveContentSelector;
