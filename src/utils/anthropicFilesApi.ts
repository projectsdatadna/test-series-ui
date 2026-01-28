/**
 * Anthropic Files API Integration - Backend Proxy
 * All requests go through your backend to avoid CORS issues
 */

const BACKEND_API_BASE = import.meta.env.VITE_API_URL || 'https://vxreyz8fjc.execute-api.ap-south-1.amazonaws.com/';

export interface FileUploadResponse {
  id?: string;
  fileId?: string;
  filename: string;
  size?: number;
  created_at?: string;
}

export interface BatchUploadResponse {
  success: boolean;
  message: string;
  uploadedCount: number;
  data: {
    files: FileUploadResponse[];
    uploadedCount: number;
  };
}

export interface FileUploadError {
  error: {
    type: string;
    message: string;
  };
}

/**
 * Upload a single file to Anthropic Files API via backend
 */
export const uploadFileToAnthropic = async (
  file: File,
  apiKey: string,
  onProgress?: (progress: number) => void
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText) as FileUploadResponse;
          resolve(response);
        } catch (error) {
          reject(new Error('Failed to parse response'));
        }
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          reject(new Error(errorResponse.message || errorResponse.error?.message || 'Upload failed'));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload cancelled'));
    });

    // Call backend endpoint
    const endpoint = `${BACKEND_API_BASE}anthropic/upload-file`;
    xhr.open('POST', endpoint);
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    
    // Add API key for backend to use
    xhr.setRequestHeader('x-anthropic-key', apiKey);
    
    xhr.send(formData);
  });
};

/**
 * Upload multiple files in a single batch API call
 */
export const uploadFilesInBatch = async (
  files: File[],
  apiKey: string,
  onProgress?: (fileName: string, progress: number) => void
): Promise<FileUploadResponse[]> => {
  const formData = new FormData();
  
  // Add all files to single FormData
  files.forEach((file) => {
    formData.append('files', file);
  });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          // Distribute progress across all files
          files.forEach((file) => {
            onProgress(file.name, progress);
          });
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText) as BatchUploadResponse;
          
          // Handle the new response format
          const fileResponses = response.data?.files || [];
          
          // Normalize response to use 'id' field
          const normalizedResponses = fileResponses.map((file: any) => ({
            id: file.fileId || file.id,
            fileId: file.fileId || file.id,
            filename: file.filename,
            size: file.size,
            created_at: file.created_at,
          }));
          
          resolve(normalizedResponses);
        } catch (error) {
          reject(new Error('Failed to parse response'));
        }
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          reject(new Error(errorResponse.message || errorResponse.error?.message || 'Upload failed'));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload cancelled'));
    });

    // Call backend batch endpoint
    const endpoint = `${BACKEND_API_BASE}anthropic/upload-files`;
    xhr.open('POST', endpoint);
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    
    // Add API key for backend to use
    xhr.setRequestHeader('x-anthropic-key', apiKey);
    
    xhr.send(formData);
  });
};

/**
 * Upload multiple files to Anthropic Files API via backend
 * All files are uploaded in parallel in a single batch operation
 */
export const uploadFilesToAnthropic = async (
  files: File[],
  apiKey: string,
  onProgress?: (fileName: string, progress: number) => void
): Promise<{ fileIds: string[]; responses: FileUploadResponse[] }> => {
  const responses: FileUploadResponse[] = [];
  const fileIds: string[] = [];

  // Upload all files in parallel
  const uploadPromises = files.map((file) =>
    uploadFileToAnthropic(file, apiKey, (progress) => {
      if (onProgress) {
        onProgress(file.name, progress);
      }
    })
  );

  try {
    const results = await Promise.all(uploadPromises);
    results.forEach((response) => {
      responses.push(response);
      if (response?.id) {
        fileIds.push(response.id);
      }
    });
    return { fileIds, responses };
  } catch (error) {
    console.error('Batch upload error:', error);
    throw error;
  }
};

/**
 * Get file from Anthropic Files API via backend
 */
export const getFileFromAnthropic = async (
  fileId: string,
  apiKey: string
): Promise<FileUploadResponse> => {
  const endpoint = `${BACKEND_API_BASE}anthropic/get-file/${fileId}`;
  const token = localStorage.getItem('authToken');

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token || ''}`,
      'x-anthropic-key': apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Failed to get file: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Delete file from Anthropic Files API via backend
 */
export const deleteFileFromAnthropic = async (
  fileId: string,
  apiKey: string
): Promise<void> => {
  const endpoint = `${BACKEND_API_BASE}anthropic/delete-file/${fileId}`;
  const token = localStorage.getItem('authToken');

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token || ''}`,
      'x-anthropic-key': apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Failed to delete file: ${response.statusText}`);
  }
};
