import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vxreyz8fjc.execute-api.ap-south-1.amazonaws.com/';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Don't redirect on 401 errors during login/auth flows
    // Let the components handle the error with toast notifications
    if (error.response?.status === 401) {
      // Only clear token, don't redirect to prevent page reload
      localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

// Generic request function
export const apiRequest = async <T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await apiClient.request<T>({
      method,
      url: endpoint,
      data,
      ...config,
    });
    
    return response.data;
  } catch (error: any) {
    // Extract error message
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'An unexpected error occurred';
    
    throw new Error(errorMessage);
  }
};

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string, config?: AxiosRequestConfig) => 
    apiRequest<T>('GET', endpoint, undefined, config),
  
  post: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) => 
    apiRequest<T>('POST', endpoint, data, config),
  
  put: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) => 
    apiRequest<T>('PUT', endpoint, data, config),
  
  delete: <T = any>(endpoint: string, config?: AxiosRequestConfig) => 
    apiRequest<T>('DELETE', endpoint, undefined, config),
  
  patch: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig) => 
    apiRequest<T>('PATCH', endpoint, data, config),
};

// Auth token management
export const authTokenManager = {
  setToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },
  
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },
  
  removeToken: () => {
    localStorage.removeItem('authToken');
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },
};

// Create axios instance for external APIs with bearer token
export const createExternalApiClient = (baseUrl?: string): AxiosInstance => {
  const url = baseUrl || import.meta.env.VITE_GENERATE_CLAUDE_CONTENT_URL;
  
  const client = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add bearer token to requests
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
};

export default api;