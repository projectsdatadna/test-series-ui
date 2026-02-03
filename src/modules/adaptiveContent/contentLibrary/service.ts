/**
 * Content Library Service
 * Handles API calls for content library operations
 */

import { api } from '../../../utils/api';
import { store } from '../../../store';
import { selectUser } from '../../auth/selectors';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export interface ContentLibraryItem {
  id: string;
  title: string;
  subject: string;
  standard: string;
  chapter: string;
  contentType: string;
  syllabusId: string;
  standardId: string;
  subjectId: string;
  chapterId: string;
  fileId: string;
  images: string[];
  htmlContent?: string;
  metadata?: {
    usedByClasses?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContentRequest {
  title: string;
  subject: string;
  standard: string;
  chapter: string;
  contentType: string;
  syllabusId: string;
  standardId: string;
  subjectId: string;
  chapterId: string;
  fileId: string;
  images: string[];
  htmlContent?: string;
  metadata?: {
    usedByClasses?: number;
  };
}

/**
 * Get userId from Redux state
 */
const getUserId = (): string | undefined => {
  const state = store.getState();
  return selectUser(state)?.id;
};

/**
 * Create new adaptive content
 * POST /api/adaptive-content-library/
 */
export const createAdaptiveContent = async (data: CreateContentRequest): Promise<ContentLibraryItem> => {
  try {
    const userId = getUserId();
    const url = userId ? `${VITE_API_URL}adaptive-content-library/?userId=${userId}` : `${VITE_API_URL}adaptive-content-library/`;
    
    const response = await api.post(url, data);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to create content');
  } catch (error) {
    console.error('Error creating adaptive content:', error);
    throw error;
  }
};

/**
 * Get all content for user
 * GET /api/adaptive-content-library/?userId=...
 * Response: { success: true, data: [...], count: number, message: string }
 */
export const getAllAdaptiveContent = async (): Promise<ContentLibraryItem[]> => {
  try {
    const userId = getUserId();
    const url = userId ? `${VITE_API_URL}adaptive-content-library/?userId=${userId}` : `${VITE_API_URL}adaptive-content-library/`;
    
    const response = await api.get(url);
    
    // Handle response structure: { success: true, data: [...], count: number, message: string }
    if (response.success) {
      return Array.isArray(response.data) ? response.data : [];
    }
    throw new Error(response.message || 'Failed to fetch content');
  } catch (error) {
    console.error('Error fetching adaptive content:', error);
    throw error;
  }
};

/**
 * Get specific content by ID
 * GET /api/adaptive-content-library/:contentId
 */
export const getAdaptiveContentById = async (contentId: string): Promise<ContentLibraryItem> => {
  try {
    const response = await api.get(`${VITE_API_URL}adaptive-content-library/${contentId}`);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch content');
  } catch (error) {
    console.error('Error fetching adaptive content:', error);
    throw error;
  }
};

/**
 * Get content by standard
 * GET /api/adaptive-content-library/standard/:standardId?userId=...
 */
export const getAdaptiveContentByStandard = async (standardId: string): Promise<ContentLibraryItem[]> => {
  try {
    const userId = getUserId();
    const url = userId 
      ? `${VITE_API_URL}adaptive-content-library/standard/${standardId}?userId=${userId}`
      : `${VITE_API_URL}adaptive-content-library/standard/${standardId}`;
    
    const response = await api.get(url);
    if (response.success) {
      return Array.isArray(response.data) ? response.data : [];
    }
    throw new Error(response.message || 'Failed to fetch content');
  } catch (error) {
    console.error('Error fetching adaptive content by standard:', error);
    throw error;
  }
};

/**
 * Get content by subject
 * GET /api/adaptive-content-library/subject/:subjectId?userId=...
 */
export const getAdaptiveContentBySubject = async (subjectId: string): Promise<ContentLibraryItem[]> => {
  try {
    const userId = getUserId();
    const url = userId 
      ? `${VITE_API_URL}adaptive-content-library/subject/${subjectId}?userId=${userId}`
      : `${VITE_API_URL}adaptive-content-library/subject/${subjectId}`;
    
    const response = await api.get(url);
    if (response.success) {
      return Array.isArray(response.data) ? response.data : [];
    }
    throw new Error(response.message || 'Failed to fetch content');
  } catch (error) {
    console.error('Error fetching adaptive content by subject:', error);
    throw error;
  }
};

/**
 * Get content by chapter
 * GET /api/adaptive-content-library/chapter/:chapterId?userId=...
 */
export const getAdaptiveContentByChapter = async (chapterId: string): Promise<ContentLibraryItem[]> => {
  try {
    const userId = getUserId();
    const url = userId 
      ? `${VITE_API_URL}adaptive-content-library/chapter/${chapterId}?userId=${userId}`
      : `${VITE_API_URL}adaptive-content-library/chapter/${chapterId}`;
    
    const response = await api.get(url);
    if (response.success) {
      return Array.isArray(response.data) ? response.data : [];
    }
    throw new Error(response.message || 'Failed to fetch content');
  } catch (error) {
    console.error('Error fetching adaptive content by chapter:', error);
    throw error;
  }
};

/**
 * Get content by type
 * GET /api/adaptive-content-library/type/:contentType?userId=...
 */
export const getAdaptiveContentByType = async (contentType: string): Promise<ContentLibraryItem[]> => {
  try {
    const userId = getUserId();
    const url = userId 
      ? `${VITE_API_URL}adaptive-content-library/type/${contentType}?userId=${userId}`
      : `${VITE_API_URL}adaptive-content-library/type/${contentType}`;
    
    const response = await api.get(url);
    if (response.success) {
      return Array.isArray(response.data) ? response.data : [];
    }
    throw new Error(response.message || 'Failed to fetch content');
  } catch (error) {
    console.error('Error fetching adaptive content by type:', error);
    throw error;
  }
};

/**
 * Update content
 * PUT /api/adaptive-content-library/:contentId
 */
export const updateAdaptiveContent = async (
  contentId: string,
  data: Partial<CreateContentRequest>
): Promise<ContentLibraryItem> => {
  try {
    const response = await api.put(`${VITE_API_URL}adaptive-content-library/${contentId}`, data);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to update content');
  } catch (error) {
    console.error('Error updating adaptive content:', error);
    throw error;
  }
};

export const deleteAdaptiveContent = async (contentId: string, userId?: string): Promise<void> => {
  try {
    const url = userId 
      ? `${VITE_API_URL}adaptive-content-library/${contentId}?userId=${userId}`
      : `${VITE_API_URL}adaptive-content-library/${contentId}`;
    
    const response = await api.delete(url);
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete content');
    }
  } catch (error) {
    console.error('Error deleting adaptive content:', error);
    throw error;
  }
};
