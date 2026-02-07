/**
 * Assessment Service
 * Handles API calls for generating assessment questions
 */

import { createExternalApiClient } from '../../../utils/api';

const VITE_GENERATE_CLAUDE_CONTENT_URL = import.meta.env.VITE_GENERATE_CLAUDE_CONTENT_URL;

export interface GenerateQuestionsRequest {
  fileId: string;
  duration?: number;
  mcqCount?: number;
  mcqMarks?: number;
  mcqCompulsory?: number;
  shortAnswerCount?: number;
  shortAnswerMarks?: number;
  shortAnswerCompulsory?: number;
  customQuestions?: Array<{
    type: string;
    section: string;
    count: number;
    marks: number;
    compulsory?: number;
  }>;
  difficultyLevel?: string;
  subject?: string;
  topic?: string;
}

export interface GenerateQuestionsResponse {
  success: boolean;
  data?: any;
  message?: string;
}

/**
 * Generate questions for assessment paper
 */
export const generateQuestions = async (
  request: GenerateQuestionsRequest
): Promise<GenerateQuestionsResponse> => {
  try {
    const apiClient = createExternalApiClient(VITE_GENERATE_CLAUDE_CONTENT_URL);

    const payload = {
      fileId: request.fileId,
      duration: request.duration || 60,
      mcqCount: request.mcqCount || 10,
      mcqMarks: request.mcqMarks || 1,
      mcqCompulsory: request.mcqCompulsory || 0,
      shortAnswerCount: request.shortAnswerCount || 5,
      shortAnswerMarks: request.shortAnswerMarks || 2,
      shortAnswerCompulsory: request.shortAnswerCompulsory || 0,
      customQuestions: request.customQuestions || [],
      difficultyLevel: request.difficultyLevel || 'medium',
      subject: request.subject || '',
      topic: request.topic || '',
    };

    console.log('Sending payload to API:', payload);

    const response = await apiClient.post<GenerateQuestionsResponse>(
      '/question-paper/generate',
      payload
    );

    console.log('Raw API response:', response);
    console.log('Response data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};
