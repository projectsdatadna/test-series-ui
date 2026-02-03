/**
 * Section Service
 * Handles API calls for extracting document structure and sections
 */

import { createExternalApiClient } from '../../../utils/api';

const VITE_GENERATE_CLAUDE_CONTENT_URL = import.meta.env.VITE_GENERATE_CLAUDE_CONTENT_URL;

export interface Section {
  id: string;
  label: string;
  number?: string;
  title?: string;
  isSubsection?: boolean;
  parentNumber?: string;
}

export interface ExtractStructureResponse {
  success: boolean;
  data: {
    sections: Array<{
      number: string;
      label: string;
      subsections?: Array<{
        number: string;
        label: string;
        subsections?: Array<{
          number: string;
          label: string;
        }>;
      }>;
    }>;
  };
  message?: string;
}

/**
 * Extract structure and sections from a document
 */
export const extractDocumentStructure = async (fileId: string, chapterId?: string, chapterName?: string): Promise<Section[]> => {
  try {
    const apiClient = createExternalApiClient(VITE_GENERATE_CLAUDE_CONTENT_URL);
    
    const requestBody: any = { fileId };
    if (chapterId) {
      requestBody.chapterId = chapterId;
    }
    if (chapterName) {
      requestBody.chapterName = chapterName;
    }
    
    const response = await apiClient.post<ExtractStructureResponse>(
      '/adaptive-content/extract-structure',
      requestBody
    );

    if (response.data.success && response.data.data?.sections) {
      const sections: Section[] = [];
      
      // Process all sections and their subsections
      response.data.data.sections.forEach((section) => {
        // Add main section
        sections.push({
          id: section.number,
          label: section.label,
          number: section.number,
          title: section.label,
          isSubsection: false,
        });
        
        // Add subsections if present
        if (section.subsections && Array.isArray(section.subsections)) {
          section.subsections.forEach((subsection) => {
            sections.push({
              id: subsection.number,
              label: subsection.label,
              number: subsection.number,
              title: subsection.label,
              isSubsection: true,
              parentNumber: section.number,
            });
            
            // Add sub-subsections if present
            if (subsection.subsections && Array.isArray(subsection.subsections)) {
              subsection.subsections.forEach((subsubsection) => {
                sections.push({
                  id: subsubsection.number,
                  label: subsubsection.label,
                  number: subsubsection.number,
                  title: subsubsection.label,
                  isSubsection: true,
                  parentNumber: subsection.number,
                });
              });
            }
          });
        }
      });
      
      return sections;
    }

    return [];
  } catch (error) {
    console.error('Error extracting document structure:', error);
    throw error;
  }
};

/**
 * Convert sections data from chapters API to Section format
 */
export const convertChapterSectionsToSections = (chaptersData: any[]): Section[] => {
  const sections: Section[] = [];
  
  chaptersData.forEach((section) => {
    // Add main section
    sections.push({
      id: section.number,
      label: section.label,
      number: section.number,
      title: section.label,
      isSubsection: false,
    });
    
    // Add subsections if present
    if (section.subsections && Array.isArray(section.subsections)) {
      section.subsections.forEach((subsection: any) => {
        sections.push({
          id: subsection.number,
          label: subsection.label,
          number: subsection.number,
          title: subsection.label,
          isSubsection: true,
          parentNumber: section.number,
        });
        
        // Add sub-subsections if present
        if (subsection.subsections && Array.isArray(subsection.subsections)) {
          subsection.subsections.forEach((subsubsection: any) => {
            sections.push({
              id: subsubsection.number,
              label: subsubsection.label,
              number: subsubsection.number,
              title: subsubsection.label,
              isSubsection: true,
              parentNumber: subsection.number,
            });
          });
        }
      });
    }
  });
  
  return sections;
};
