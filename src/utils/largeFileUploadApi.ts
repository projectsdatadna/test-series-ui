/**
 * Large File Upload Utility
 * Handles uploading files larger than 5MB using pre-signed URLs
 */

import { authTokenManager } from './api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vxreyz8fjc.execute-api.ap-south-1.amazonaws.com/';

export interface FileMetadata {
  filename: string;
  contentType: string;
  size: number;
}

export interface UploadUrlData {
  uploadUrl: string;
  fileKey: string;
}

export interface GetUploadUrlsResponse {
  success: boolean;
  data: {
    uploadUrls: UploadUrlData[];
  };
  message?: string;
}

export interface ConfirmUploadResponse {
  success: boolean;
  message: string;
  data: {
    uploadedCount: number;
    topicName: string;
    contentType: string;
    files: Array<{
      fileId: string;
      filename: string;
      createdAt: string;
    }>;
  };
}

/**
 * Get pre-signed URLs for uploading files to S3
 */
export const getUploadUrls = async (
  files: File[]
): Promise<UploadUrlData[]> => {
  const fileMetadata: FileMetadata[] = files.map((file) => ({
    filename: file.name,
    contentType: file.type,
    size: file.size,
  }));

  const token = authTokenManager.getToken();
  if (!token) {
    throw new Error('Authentication token not found');
  }

  const response = await fetch(`${API_BASE_URL}anthropic/get-upload-urls`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ files: fileMetadata }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get upload URLs');
  }

  const result: GetUploadUrlsResponse = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'Failed to get upload URLs');
  }

  return result.data.uploadUrls;
};

/**
 * Upload file directly to S3 using pre-signed URL
 */
export const uploadFileToS3 = async (
  file: File,
  uploadUrl: string,
  onProgress?: (progress: number) => void
): Promise<void> => {
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
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload aborted'));
    });

    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
};

/**
 * Confirm upload and process files
 */
export const confirmUpload = async (
  fileKeys: string[],
  topicName: string,
  contentType: string
): Promise<ConfirmUploadResponse> => {
  const token = authTokenManager.getToken();
  if (!token) {
    throw new Error('Authentication token not found');
  }

  const response = await fetch(`${API_BASE_URL}anthropic/confirm-upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileKeys,
      topicName,
      contentType,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to confirm upload');
  }

  const result: ConfirmUploadResponse = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'Failed to confirm upload');
  }

  return result;
};

/**
 * Upload large files using pre-signed URLs
 * Handles files larger than 5MB
 */
export const uploadLargeFiles = async (
  files: File[],
  topicName: string,
  contentType: string,
  onProgress?: (fileName: string, progress: number) => void
): Promise<ConfirmUploadResponse> => {
  try {
    // Step 1: Get pre-signed URLs
    console.log('Getting pre-signed URLs for', files.length, 'file(s)');
    const uploadUrls = await getUploadUrls(files);

    if (uploadUrls.length !== files.length) {
      throw new Error('Mismatch between requested and received upload URLs');
    }

    // Step 2: Upload each file directly to S3
    console.log('Uploading files to S3');
    const uploadPromises = uploadUrls.map(async (urlData, index) => {
      const file = files[index];
      console.log(`Uploading ${file.name}...`);

      await uploadFileToS3(file, urlData.uploadUrl, (progress) => {
        if (onProgress) {
          onProgress(file.name, progress);
        }
      });

      console.log(`${file.name} uploaded successfully`);
      return urlData.fileKey;
    });

    const fileKeys = await Promise.all(uploadPromises);

    // Step 3: Confirm upload and process
    console.log('Confirming upload with file keys:', fileKeys);
    const confirmResponse = await confirmUpload(fileKeys, topicName, contentType);

    console.log('Upload confirmed successfully');
    return confirmResponse;
  } catch (error) {
    console.error('Error uploading large files:', error);
    throw error;
  }
};
