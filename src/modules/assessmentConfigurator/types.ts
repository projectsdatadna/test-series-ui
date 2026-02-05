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
  selectedChapterId: string | null;
  selectedChapterFileId: string | null;
  selectedChapterName: string | null;
  selectedSubjectName: string | null;
  selectedStandardId: string | null;
}

// MCQ Question
export interface MCQQuestion {
  questionNumber: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  explanation: string;
  difficulty: string;
}

// Short Answer Question
export interface ShortAnswerQuestion {
  questionNumber: number;
  question: string;
  expectedAnswer: string;
  keyPoints: string[];
  difficulty: string;
  marksAllocated: number;
}

// Generated Paper Data
export interface GeneratedPaperData {
  examDetails: {
    duration: number;
    totalQuestions: number;
    subject: string;
    topic: string;
    difficultyLevel: string;
  };
  mcqQuestions: MCQQuestion[];
  shortAnswerQuestions: ShortAnswerQuestion[];
  answerKey: {
    mcqAnswers: Array<{
      questionNumber: number;
      answer: string;
      explanation: string;
    }>;
    shortAnswerAnswers: Array<{
      questionNumber: number;
      answer: string;
      keyPoints: string[];
    }>;
  };
}

// Assessment Configurator State
export interface AssessmentConfiguratorState {
  activeTab: 'source' | 'settings' | 'preview';
  contentSource: ContentSource;
  paperSettings: PaperSettings;
  showAnswerKey: boolean;
  isGenerating: boolean;
  generatedPaper: GeneratedPaperData | null;
  error: string | null;
  success: string | null;
}
