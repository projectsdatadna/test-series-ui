/**
 * Hierarchy Service
 * Handles API calls for syllabus, standards, subjects, and chapters
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export interface HierarchyItem {
  id: string;
  name: string;
  fileId?: string;
}

interface SyllabusResponse {
  syllabusId: string;
  syllabusName: string;
  linkedAt: string;
}

interface StandardResponse {
  standardId: string;
  standardName: string;
  linkedAt: string;
}

interface SubjectResponse {
  subjectId: string;
  subjectName: string;
  linkedAt: string;
}

interface ChapterResponse {
  chapterId: string;
  chapterName: string;
  fileId: string;
  linkedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T[];
  message: string;
}

/**
 * Get all syllabuses
 */
export const getSyllabuses = async (): Promise<HierarchyItem[]> => {
  try {
    const response = await axios.get<ApiResponse<SyllabusResponse>>(`${API_BASE_URL}/hierarchy/syllabi`);
    if (response.data.success && response.data.data) {
      return response.data.data.map((item) => ({
        id: item.syllabusId,
        name: item.syllabusName,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching syllabuses:', error);
    throw error;
  }
};

/**
 * Get standards for a specific syllabus
 */
export const getStandards = async (syllabusId: string): Promise<HierarchyItem[]> => {
  try {
    const response = await axios.get<ApiResponse<StandardResponse>>(
      `${API_BASE_URL}/hierarchy/standards/${syllabusId}`
    );
    if (response.data.success && response.data.data) {
      return response.data.data.map((item) => ({
        id: item.standardId,
        name: item.standardName,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching standards:', error);
    throw error;
  }
};

/**
 * Get subjects for a specific standard
 */
export const getSubjects = async (standardId: string): Promise<HierarchyItem[]> => {
  try {
    const response = await axios.get<ApiResponse<SubjectResponse>>(
      `${API_BASE_URL}/hierarchy/subjects/${standardId}`
    );
    if (response.data.success && response.data.data) {
      return response.data.data.map((item) => ({
        id: item.subjectId,
        name: item.subjectName,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

/**
 * Get chapters for a specific subject
 */
export const getChapters = async (
  subjectId: string,
  syllabusId?: string,
  standardId?: string
): Promise<HierarchyItem[]> => {
  try {
    const params = new URLSearchParams();
    params.append('subjectId', subjectId);
    if (syllabusId) params.append('syllabusId', syllabusId);
    if (standardId) params.append('standardId', standardId);

    const response = await axios.get<ApiResponse<ChapterResponse>>(
      `${API_BASE_URL}/hierarchy/chapters?${params.toString()}`
    );
    if (response.data.success && response.data.data) {
      return response.data.data.map((item) => ({
        id: item.chapterId,
        name: item.chapterName,
        fileId: item.fileId,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};
