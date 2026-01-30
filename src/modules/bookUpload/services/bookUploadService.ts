/**
 * Book Upload Service
 * Handles API calls for book uploads
 */

import { api } from '../../../utils/api';
import type { BookUploadRequest, BookUploadResponse } from '../types';

/**
 * Upload book metadata to backend
 */
export const uploadBookMetadata = async (
  request: BookUploadRequest
): Promise<BookUploadResponse> => {
  try {
    const response = await api.post<BookUploadResponse>('/book-upload/upload', request);
    return response;
  } catch (error) {
    console.error('Error uploading book metadata:', error);
    throw error;
  }
};
