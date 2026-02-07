// Question type configuration
export interface QuestionConfig {
  type: string;
  section: string;
  count: number;
  marksPerQuestion: number;
  totalMarks: number;
  compulsoryCount?: number;
  isCustom?: boolean;
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

// Custom Question (Long Answer or Essay)
export interface CustomQuestion {
  questionNumber: number;
  question: string;
  expectedAnswer: string;
  keyPoints: string[];
  difficulty: string;
  marksAllocated: number;
}

// Section in the paper
export interface PaperSection {
  sectionName: string;
  type?: string;
  totalQuestions: number;
  marksPerQuestion: number;
  totalMarks: number;
  note?: string;
}

// Custom Section with questions
export interface CustomSection {
  section: string;
  type: string;
  questions: CustomQuestion[];
}

// Generated Paper Data
export interface GeneratedPaperData {
  examDetails: {
    duration: number;
    totalQuestions: number;
    totalMarks: number;
    subject: string;
    topic: string;
    difficultyLevel: string;
  };
  sections?: PaperSection[];
  mcqQuestions: MCQQuestion[];
  shortAnswerQuestions: ShortAnswerQuestion[];
  customQuestions?: CustomSection[];
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
    customAnswers?: Array<{
      section: string;
      type: string;
      answers: Array<{
        questionNumber: number;
        answer: string;
        keyPoints: string[];
      }>;
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
