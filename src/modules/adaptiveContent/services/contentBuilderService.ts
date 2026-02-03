/**
 * Content Builder Service
 * Handles API calls for file upload and content generation
 */

import { createExternalApiClient } from '../../../utils/api';
import { uploadLargeFiles } from '../../../utils/largeFileUploadApi';

export interface GenerateAdaptiveContentRequest {
  fileId: string;
  sectionNumber: number;
  section_no?: string;
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
    const generateClient = createExternalApiClient();
    const response = await generateClient.post<GenerateAdaptiveContentResponse>(
      '/adaptive-content/generate',
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

    return response.data;
  } catch (error) {
    console.error('Error generating adaptive content:', error);
    throw error;
  }
};

/**
 * Upload files using pre-signed URLs (works for all file sizes)
 */
export const uploadFilesToContentBuilder = async (
  files: File[],
  topicName: string,
  contentType: string,
  onProgress?: (fileName: string, progress: number) => void
): Promise<FileUploadResponse[]> => {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    // Upload using pre-signed URLs
    const confirmResponse = await uploadLargeFiles(files, topicName, contentType, onProgress);

    // Normalize responses to ensure consistent format
    // Response structure: { success: true, data: { files: [...] } }
    const uploadedFiles = confirmResponse.data.files || [];
    
    return uploadedFiles.map((item: any) => ({
      id: item.fileId,
      fileId: item.fileId,
      filename: item.filename,
    }));
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

/**
 * Upload large files (>5MB) using pre-signed URLs
 * @deprecated Use uploadFilesToContentBuilder instead - it handles all file sizes
 */
export const uploadLargeFilesToContentBuilder = async (
  files: File[],
  topicName: string,
  contentType: string,
  onProgress?: (fileName: string, progress: number) => void
): Promise<FileUploadResponse[]> => {
  // Delegate to the unified upload function
  return uploadFilesToContentBuilder(files, topicName, contentType, onProgress);
};

export const downloadAdaptiveContent = async (
  request: GenerateAdaptiveContentRequest
) => {
  const generateClient = createExternalApiClient();
  const response = await generateClient.post(
    '/adaptive-content/generate',
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
