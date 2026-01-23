// Question type configuration
export interface QuestionConfig {
  type: string;
  section: string;
  count: number;
  marksPerQuestion: number;
  totalMarks: number;
}

// Chapter selection
export interface Chapter {
  id: string;
  name: string;
  selected: boolean;
}

// Paper settings
export interface PaperSettings {
  boardPattern: 'CBSE' | 'ICSE' | 'STATE_BOARD';
  totalDuration: 180 | 120 | 90;
  difficultyLevel: 'EASY' | 'BALANCED' | 'RIGOROUS';
  totalMarks: number;
  questionConfigs: QuestionConfig[];
}

// Content source
export interface ContentSource {
  uploadedFile: File | null;
  selectedChapters: Chapter[];
  uploadProgress: number;
}

// Assessment Configurator State
export interface AssessmentConfiguratorState {
  activeTab: 'source' | 'settings' | 'preview';
  contentSource: ContentSource;
  paperSettings: PaperSettings;
  showAnswerKey: boolean;
  isGenerating: boolean;
  generatedPaper: string | null;
  error: string | null;
  success: string | null;
}
