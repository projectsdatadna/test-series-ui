/**
 * Download Utilities
 * Handles downloading files from URLs and base64 data
 */

/**
 * Download file from base64 encoded data
 */
export const downloadBase64File = (base64Data: string, filename: string, mimeType: string = 'application/zip'): void => {
  try {
    // Handle both standard base64 and data URLs
    let cleanBase64 = base64Data;
    if (base64Data.includes(',')) {
      cleanBase64 = base64Data.split(',')[1];
    }
    
    // Convert base64 to blob
    const byteCharacters = atob(cleanBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Create download link
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error(`Error downloading file ${filename}:`, error);
    throw error;
  }
};

/**
 * Convert images to PDF and download via backend proxy
 * Backend handles CORS issues and generates PDF server-side
 */
export const downloadImagesAsPDF = async (imageUrls: string[], pdfFilename: string = 'adaptive-content.pdf'): Promise<void> => {
  try {
    let BACKEND_API_BASE = import.meta.env.VITE_API_URL || 'https://vxreyz8fjc.execute-api.ap-south-1.amazonaws.com/';
    
    // Ensure trailing slash
    if (!BACKEND_API_BASE.endsWith('/')) {
      BACKEND_API_BASE += '/';
    }

    const token = localStorage.getItem('authToken');
    const endpoint = `${BACKEND_API_BASE}download/images-to-pdf`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({ imageUrls, pdfFilename }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to generate PDF: ${response.status} ${response.statusText}`);
    }

    // Get the PDF blob from response
    const blob = await response.blob();

    if (blob.size === 0) {
      throw new Error('Generated PDF is empty');
    }

    // Create download link
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = pdfFilename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error('Error converting images to PDF:', error);
    throw error;
  }
};

/**
 * Download file directly from URL (for S3 URLs with public access)
 */
export const downloadFileDirectly = async (url: string, filename: string): Promise<void> => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (error) {
    console.error(`Error downloading file ${filename}:`, error);
    throw error;
  }
};

/**
 * Download files as ZIP via backend
 */
export const downloadFilesAsZip = async (
  files: Array<{ url: string; filename: string }>,
  zipName: string = 'adaptive-content.zip'
): Promise<void> => {
  try {
    let BACKEND_API_BASE = import.meta.env.VITE_API_URL || 'https://vxreyz8fjc.execute-api.ap-south-1.amazonaws.com/';
    
    // Ensure trailing slash
    if (!BACKEND_API_BASE.endsWith('/')) {
      BACKEND_API_BASE += '/';
    }

    const token = localStorage.getItem('authToken');
    const endpoint = `${BACKEND_API_BASE}download/files-zip`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({ files }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Download failed: ${response.status} ${response.statusText}`);
    }

    // Get the blob from response
    const blob = await response.blob();

    if (blob.size === 0) {
      throw new Error('Downloaded file is empty');
    }

    // Create download link
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = zipName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error('Error downloading files:', error);
    throw error;
  }
};

/**
 * Download a single file from URL via backend proxy
 */
export const downloadFile = async (url: string, filename: string): Promise<void> => {
  try {
    let BACKEND_API_BASE = import.meta.env.VITE_API_URL || 'https://vxreyz8fjc.execute-api.ap-south-1.amazonaws.com/';
    
    if (!BACKEND_API_BASE.endsWith('/')) {
      BACKEND_API_BASE += '/';
    }

    const token = localStorage.getItem('authToken');
    const endpoint = `${BACKEND_API_BASE}download/file`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({ url, filename }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Download failed: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    
    if (blob.size === 0) {
      throw new Error('Downloaded file is empty');
    }

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error(`Error downloading file ${filename}:`, error);
    throw error;
  }
};

/**
 * Open file in new tab (for preview)
 */
export const openFileInNewTab = (url: string): void => {
  window.open(url, '_blank');
};
