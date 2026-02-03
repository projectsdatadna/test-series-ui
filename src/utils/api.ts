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

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors - try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // No refresh token available, clear auth and reject
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          return Promise.reject(error);
        }

        // Call refresh token endpoint
        const refreshResponse = await axios.post(
          `${API_BASE_URL}auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (refreshResponse.data?.data?.access_token) {
          const newAccessToken = refreshResponse.data.data.access_token;
          
          // Update stored token
          localStorage.setItem('authToken', newAccessToken);
          
          // Update the failed request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          // Retry the original request
          return apiClient(originalRequest);
        } else {
          // Refresh failed, clear tokens
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Refresh token request failed, clear auth
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      }
    }

    // For other 401 errors or if retry already attempted
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
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