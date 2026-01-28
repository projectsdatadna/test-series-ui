/**
 * Content Builder Service
 * Handles API calls for file upload and content generation
 */

import { api } from '../../../utils/api';
import { uploadFilesInBatch } from '../../../utils/anthropicFilesApi';

export interface GenerateAdaptiveContentRequest {
  fileId: string;
  sectionNumber: number;
  topicName: string;
  contentType: string;
  contentDepth: 'beginner' | 'intermediate' | 'advanced';
  visualStyle: 'academic' | 'creative' | 'minimal' | 'detailed';
  outputLanguage: 'english' | 'hindi' | 'spanish';
  contentTypeId?: string;
}

export interface GenerateAdaptiveContentResponse {
  success: boolean;
  message?: string;
  // New format: images at top level
  images?: Array<{
    slideNumber: number;
    url: string;
  }>;
  // Legacy format: nested in data
  data?: {
    fileId: string;
    sectionNumber: number;
    topicName: string;
    contentType: string;
    contentDepth: string;
    visualStyle: string;
    outputLanguage: string;
    fileName: string;
    mimeType: string;
    imageData?: string | Array<{ slideNumber: number; url: string }>;
    zipFile?: Array<{
      slideNumber: number;
      url: string;
    }>;
    pdfLink?: string;
    usage?: {
      inputTokens: number;
      outputTokens: number;
    };
    generatedContent?: string;
  };
}

export interface FileUploadResponse {
  id?: string;
  fileId?: string;
  filename: string;
}

/**
 * Generate adaptive content from uploaded file
 */
export const generateAdaptiveContent = async (
  request: GenerateAdaptiveContentRequest
): Promise<GenerateAdaptiveContentResponse> => {
  try {
    const response = await api.post<GenerateAdaptiveContentResponse>(
      'adaptive-content/generate',
      {
        fileId: request.fileId,
        sectionNumber: request.sectionNumber,
        topicName: request.topicName,
        contentType: request.contentType,
        contentDepth: request.contentDepth,
        visualStyle: request.visualStyle,
        outputLanguage: request.outputLanguage,
        contentTypeId: request.contentTypeId,
      }
    );

    return response;
  } catch (error) {
    console.error('Error generating adaptive content:', error);
    throw error;
  }
};

/**
 * Upload multiple files to Anthropic Files API via backend using batch API
 */
export const uploadFilesToContentBuilder = async (
  files: File[],
  apiKey: string,
  onProgress?: (fileName: string, progress: number) => void
): Promise<FileUploadResponse[]> => {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    // Use batch upload API
    const responses = await uploadFilesInBatch(files, apiKey, onProgress);

    // Normalize responses to ensure consistent format
    return responses.map((response) => ({
      id: response.id || response.fileId,
      fileId: response.fileId || response.id,
      filename: response.filename,
    }));
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

export const downloadAdaptiveContent = async (
  request: GenerateAdaptiveContentRequest
) => {
  const response = await api.post(
    'adaptive-content/generate',
    {
      fileId: request.fileId,
      sectionNumber: request.sectionNumber,
      topicName: request.topicName,
      contentType: request.contentType,
      contentDepth: request.contentDepth,
      visualStyle: request.visualStyle,
      outputLanguage: request.outputLanguage,
    },
    {
      responseType: 'blob', // 🔥 THIS IS THE KEY
    }
  );

  return response.data; // Blob
};
