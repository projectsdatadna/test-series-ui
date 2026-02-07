import type { AnyAction, Reducer } from 'redux';
import type { AssessmentConfiguratorState, QuestionConfig, Chapter } from './types';
import {
  ASSESSMENT_SET_ACTIVE_TAB,
  ASSESSMENT_SET_UPLOADED_FILE,
  ASSESSMENT_UPDATE_CHAPTER,
  ASSESSMENT_SELECT_ALL_CHAPTERS,
  ASSESSMENT_SET_SELECTED_CHAPTER,
  ASSESSMENT_UPDATE_PAPER_SETTINGS,
  ASSESSMENT_UPDATE_QUESTION_CONFIG,
  ASSESSMENT_TOGGLE_ANSWER_KEY,
  ASSESSMENT_START_GENERATING,
  ASSESSMENT_GENERATE_SUCCESS,
  ASSESSMENT_GENERATE_ERROR,
  ASSESSMENT_CLEAR_MESSAGE,
  ASSESSMENT_RESET,
} from './actions';

const initialChapters: Chapter[] = [
  { id: 'ch1', name: 'Ch 1: Electric Charges', selected: true },
  { id: 'ch2', name: 'Ch 2: Electrostatic Potential', selected: true },
  { id: 'ch3', name: 'Ch 3: Current Electricity', selected: false },
];

const initialQuestionConfigs: QuestionConfig[] = [
  {
    type: 'MCQs',
    section: 'Section A',
    count: 10,
    compulsoryCount:10,
    marksPerQuestion: 1,
    totalMarks: 10,
  },
  {
    type: 'Short Ans',
    section: 'Section B',
    count: 12,
    compulsoryCount:10,
    marksPerQuestion: 2,
    totalMarks: 20,
  },
];

const initialState: AssessmentConfiguratorState = {
  activeTab: 'source',
  contentSource: {
    uploadedFile: null,
    selectedChapters: initialChapters,
    uploadProgress: 0,
    selectedChapterId: null,
    selectedChapterFileId: null,
    selectedChapterName: null,
    selectedSubjectName: null,
    selectedStandardId: null,
  },
  paperSettings: {
    boardPattern: 'CBSE',
    totalDuration: 180,
    difficultyLevel: 'BALANCED',
    totalMarks: 70,
    questionConfigs: initialQuestionConfigs,
  },
  showAnswerKey: true,
  isGenerating: false,
  generatedPaper: null,
  error: null,
  success: null,
};

export const assessmentConfiguratorReducer: Reducer<AssessmentConfiguratorState, AnyAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ASSESSMENT_SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    case ASSESSMENT_SET_UPLOADED_FILE:
      return {
        ...state,
        contentSource: {
          ...state.contentSource,
          uploadedFile: action.payload,
        },
      };

    case ASSESSMENT_UPDATE_CHAPTER:
      return {
        ...state,
        contentSource: {
          ...state.contentSource,
          selectedChapters: state.contentSource.selectedChapters.map((chapter) =>
            chapter.id === action.payload.chapterId
              ? { ...chapter, selected: action.payload.selected }
              : chapter,
          ),
        },
      };

    case ASSESSMENT_SELECT_ALL_CHAPTERS:
      return {
        ...state,
        contentSource: {
          ...state.contentSource,
          selectedChapters: state.contentSource.selectedChapters.map((chapter) => ({
            ...chapter,
            selected: action.payload,
          })),
        },
      };

    case ASSESSMENT_SET_SELECTED_CHAPTER:
      return {
        ...state,
        contentSource: {
          ...state.contentSource,
          selectedChapterId: action.payload.chapterId,
          selectedChapterFileId: action.payload.fileId,
          selectedChapterName: action.payload.chapterName,
          selectedSubjectName: action.payload.subjectName,
          selectedStandardId: action.payload.standardId,
        },
      };

    case ASSESSMENT_UPDATE_PAPER_SETTINGS:
      return {
        ...state,
        paperSettings: {
          ...state.paperSettings,
          ...action.payload,
        },
      };

    case ASSESSMENT_UPDATE_QUESTION_CONFIG:
      // Check if this config already exists
      const configExists = state.paperSettings.questionConfigs.some(
        (config) => config.type === action.payload.type
      );
      
      let updatedConfigs: QuestionConfig[];
      if (configExists) {
        // Update existing config
        updatedConfigs = state.paperSettings.questionConfigs.map((config) =>
          config.type === action.payload.type ? action.payload : config,
        );
      } else {
        // Add new config
        updatedConfigs = [...state.paperSettings.questionConfigs, action.payload];
      }
      
      const calculatedTotalMarks = updatedConfigs.reduce((sum, config) => sum + config.totalMarks, 0);
      return {
        ...state,
        paperSettings: {
          ...state.paperSettings,
          questionConfigs: updatedConfigs,
          totalMarks: calculatedTotalMarks,
        },
      };

    case ASSESSMENT_TOGGLE_ANSWER_KEY:
      return {
        ...state,
        showAnswerKey: !state.showAnswerKey,
      };

    case ASSESSMENT_START_GENERATING:
      return {
        ...state,
        isGenerating: true,
        error: null,
        success: null,
      };

    case ASSESSMENT_GENERATE_SUCCESS:
      return {
        ...state,
        isGenerating: false,
        generatedPaper: action.payload,
        success: 'Paper generated successfully!',
      };

    case ASSESSMENT_GENERATE_ERROR:
      return {
        ...state,
        isGenerating: false,
        error: action.payload,
      };

    case ASSESSMENT_CLEAR_MESSAGE:
      return {
        ...state,
        error: null,
        success: null,
      };

    case ASSESSMENT_RESET:
      return initialState;

    default:
      return state;
  }
};
