import type {
  AssessmentConfiguratorState,
  QuestionConfig,
  PaperSettings,
  GeneratedPaperData,
} from './types';

// Action types
export const ASSESSMENT_SET_ACTIVE_TAB = 'assessmentConfigurator/SET_ACTIVE_TAB';
export const ASSESSMENT_SET_UPLOADED_FILE = 'assessmentConfigurator/SET_UPLOADED_FILE';
export const ASSESSMENT_UPDATE_CHAPTER = 'assessmentConfigurator/UPDATE_CHAPTER';
export const ASSESSMENT_SELECT_ALL_CHAPTERS = 'assessmentConfigurator/SELECT_ALL_CHAPTERS';
export const ASSESSMENT_SET_SELECTED_CHAPTER = 'assessmentConfigurator/SET_SELECTED_CHAPTER';
export const ASSESSMENT_UPDATE_PAPER_SETTINGS = 'assessmentConfigurator/UPDATE_PAPER_SETTINGS';
export const ASSESSMENT_UPDATE_QUESTION_CONFIG = 'assessmentConfigurator/UPDATE_QUESTION_CONFIG';
export const ASSESSMENT_TOGGLE_ANSWER_KEY = 'assessmentConfigurator/TOGGLE_ANSWER_KEY';
export const ASSESSMENT_START_GENERATING = 'assessmentConfigurator/START_GENERATING';
export const ASSESSMENT_GENERATE_SUCCESS = 'assessmentConfigurator/GENERATE_SUCCESS';
export const ASSESSMENT_GENERATE_ERROR = 'assessmentConfigurator/GENERATE_ERROR';
export const ASSESSMENT_CLEAR_MESSAGE = 'assessmentConfigurator/CLEAR_MESSAGE';
export const ASSESSMENT_RESET = 'assessmentConfigurator/RESET';

// Action creators
export const setActiveTab = (tab: AssessmentConfiguratorState['activeTab']) => ({
  type: ASSESSMENT_SET_ACTIVE_TAB,
  payload: tab,
});

export const setUploadedFile = (file: File | null) => ({
  type: ASSESSMENT_SET_UPLOADED_FILE,
  payload: file,
});

export const updateChapter = (chapterId: string, selected: boolean) => ({
  type: ASSESSMENT_UPDATE_CHAPTER,
  payload: { chapterId, selected },
});

export const selectAllChapters = (selected: boolean) => ({
  type: ASSESSMENT_SELECT_ALL_CHAPTERS,
  payload: selected,
});

export const setSelectedChapter = (
  chapterId: string | null,
  fileId: string | null,
  chapterName: string | null,
  subjectName: string | null,
  standardId: string | null
) => ({
  type: ASSESSMENT_SET_SELECTED_CHAPTER,
  payload: { chapterId, fileId, chapterName, subjectName, standardId },
});

export const updatePaperSettings = (settings: Partial<PaperSettings>) => ({
  type: ASSESSMENT_UPDATE_PAPER_SETTINGS,
  payload: settings,
});

export const updateQuestionConfig = (config: QuestionConfig) => ({
  type: ASSESSMENT_UPDATE_QUESTION_CONFIG,
  payload: config,
});

export const toggleAnswerKey = () => ({
  type: ASSESSMENT_TOGGLE_ANSWER_KEY,
});

export const startGenerating = () => ({
  type: ASSESSMENT_START_GENERATING,
});

export const generateSuccess = (paper: GeneratedPaperData) => ({
  type: ASSESSMENT_GENERATE_SUCCESS,
  payload: paper,
});

export const generateError = (error: string) => ({
  type: ASSESSMENT_GENERATE_ERROR,
  payload: error,
});

export const clearMessage = () => ({
  type: ASSESSMENT_CLEAR_MESSAGE,
});

export const reset = () => ({
  type: ASSESSMENT_RESET,
});
