/**
 * Claude API Integration
 * Handles all API calls to Anthropic's Claude API with proper headers
 */

import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Claude API Configuration from environment variables
const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const CLAUDE_API_VERSION = import.meta.env.VITE_CLAUDE_API_VERSION || '2023-06-01';
const CLAUDE_API_BETA = import.meta.env.VITE_CLAUDE_API_BETA || 'files-api-2025-04-14';
const CLAUDE_API_URL = import.meta.env.VITE_CLAUDE_API_URL || 'https://api.anthropic.com/v1';

// Create axios instance for Claude API
const claudeClient: AxiosInstance = axios.create({
  baseURL: CLAUDE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': CLAUDE_API_KEY,
    'anthropic-version': CLAUDE_API_VERSION,
    'anthropic-beta': CLAUDE_API_BETA,
  },
});

// Request interceptor for logging
claudeClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.VITE_DEBUG) {
      console.log('[Claude API] Request:', {
        method: config.method,
        url: config.url,
        headers: {
          'x-api-key': '***hidden***',
          'anthropic-version': config.headers['anthropic-version'],
          'anthropic-beta': config.headers['anthropic-beta'],
        },
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
claudeClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.VITE_DEBUG) {
      console.log('[Claude API] Response:', {
        status: response.status,
        statusText: response.statusText,
      });
    }
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.error?.message || 
                        error.response?.data?.message || 
                        error.message || 
                        'Claude API request failed';
    
    console.error('[Claude API] Error:', {
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data,
    });
    
    return Promise.reject(new Error(errorMessage));
  }
);

// Generic request function
export const claudeRequest = async <T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await claudeClient.request<T>({
      method,
      url: endpoint,
      data,
      ...config,
    });
    
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Convenience methods
export const claudeApi = {
  get: <T = any>(endpoint: string, config?: AxiosRequestConfig) => 
    claudeRequest<T>('GET', endpoint, undefined, config),
  
  post: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) => 
    claudeRequest<T>('POST', endpoint, data, config),
  
  put: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) => 
    claudeRequest<T>('PUT', endpoint, data, config),
  
  delete: <T = any>(endpoint: string, config?: AxiosRequestConfig) => 
    claudeRequest<T>('DELETE', endpoint, undefined, config),
  
  patch: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) => 
    claudeRequest<T>('PATCH', endpoint, data, config),
};

// Claude-specific API methods
export interface MessageRequest {
  model: string;
  max_tokens: number;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  system?: string;
}

export interface MessageResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Send a message to Claude API
 */
export const sendMessage = async (request: MessageRequest): Promise<MessageResponse> => {
  try {
    const response = await claudeApi.post<MessageResponse>('/messages', request);
    return response;
  } catch (error) {
    console.error('[Claude API] Message request failed:', error);
    throw error;
  }
};

/**
 * Generate content using Claude
 */
export const generateContent = async (
  prompt: string,
  model: string = 'claude-3-5-sonnet-20241022',
  maxTokens: number = 2048,
  systemPrompt?: string
): Promise<string> => {
  try {
    const response = await sendMessage({
      model,
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      ...(systemPrompt && { system: systemPrompt }),
    });

    // Extract text from response
    const textContent = response.content.find((c) => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in Claude response');
    }

    return textContent.text;
  } catch (error) {
    console.error('[Claude API] Content generation failed:', error);
    throw error;
  }
};

export default claudeApi;
