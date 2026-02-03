/**
 * Adaptive Content Module Types
 */

export interface AdaptiveContentState {
  loading: boolean;
  error: string | null;
  contentTypes: ContentType[];
  aiCredits: number;
  recentlyGenerated: number;
  contentBuilder: ContentBuilderState;
  contentLibrary: ContentLibraryState;
}

export interface ContentBuilderState {
  uploadedFiles: UploadedFileData[];
  isUploading: boolean;
  uploadError: string | null;
  isGenerating: boolean;
  generatedContent: GeneratedContentData | null;
  generationError: string | null;
  customizationSettings: CustomizationSettings;
  isSaving: boolean;
  saveError: string | null;
  selectedFileId: string | null;
  selectedContentTypeId: string | null;
  fileUploadApiLoading: boolean;
  generateContentApiLoading: boolean;
}

export interface ContentLibraryState {
  items: ContentLibraryItem[];
  loading: boolean;
  error: string | null;
  filters: ContentLibraryFilters;
  totalAssets: number;
  assignedToday: number;
  aiGenerated: number;
}

export interface ContentLibraryItem {
  id: string;
  title: string;
  description: string;
  contentType: string;
  subjects: string[];
  standard: string;
  chapter: string;
  imageUrl: string;
  usedByClasses: number;
  createdAt: string;
  fileIds: string[];
  aidType?: string;
}

export interface ContentLibraryFilters {
  searchQuery: string;
  chapterSection?: string;
  aidType?: string;
  standard?: string;
}

export interface UploadedFileData {
  file: File;
  fileName: string;
  fileSize: number;
  fileId?: string;
  uploadProgress: number;
  isUploading: boolean;
  error?: string;
}

export interface GeneratedContentData {
  sectionNumber: number;
  topicName: string;
  contentType: string;
  htmlContent: string;
  inputTokens: number;
  outputTokens: number;
  generatedAt: string;
  imageData?: string | Array<{ slideNumber: number; url: string }>;
  fileName?: string;
  mimeType?: string;
  zipFiles?: Array<{
    slideNumber: number;
    url: string;
  }>;
  pdfLink?: string;
}

export interface CustomizationSettings {
  contentDepth: 'beginner' | 'intermediate' | 'advanced';
  formatStyle: 'bullet-points' | 'structured-grid';
  visualStyle: 'academic' | 'creative' | 'minimal' | 'detailed';
  outputLanguage: 'english' | 'hindi' | 'spanish';
}

export interface ContentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
}

export interface GeneratedContent {
  id: string;
  type: ContentType['id'];
  title: string;
  createdAt: string;
  status: 'draft' | 'published';
}

export interface AIUsageStats {
  creditsRemaining: number;
  generatedThisWeek: number;
  totalGenerated: number;
}
