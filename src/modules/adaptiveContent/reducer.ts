/**
 * Adaptive Content Module Reducer
 */

import type { AdaptiveContentState } from './types';
import type { AnyAction } from 'redux';

export const ADAPTIVE_CONTENT_LOAD_REQUEST = 'adaptiveContent/LOAD_REQUEST';
export const ADAPTIVE_CONTENT_LOAD_SUCCESS = 'adaptiveContent/LOAD_SUCCESS';
export const ADAPTIVE_CONTENT_LOAD_FAILURE = 'adaptiveContent/LOAD_FAILURE';
export const ADAPTIVE_CONTENT_UPDATE_CREDITS = 'adaptiveContent/UPDATE_CREDITS';

export const CONTENT_BUILDER_ADD_UPLOADED_FILE = 'contentBuilder/ADD_UPLOADED_FILE';
export const CONTENT_BUILDER_UPDATE_FILE_UPLOAD_STATUS = 'contentBuilder/UPDATE_FILE_UPLOAD_STATUS';
export const CONTENT_BUILDER_REMOVE_UPLOADED_FILE = 'contentBuilder/REMOVE_UPLOADED_FILE';
export const CONTENT_BUILDER_SET_FILE_UPLOADING = 'contentBuilder/SET_FILE_UPLOADING';
export const CONTENT_BUILDER_SET_UPLOAD_ERROR = 'contentBuilder/SET_UPLOAD_ERROR';
export const CONTENT_BUILDER_SET_GENERATING = 'contentBuilder/SET_GENERATING';
export const CONTENT_BUILDER_SET_GENERATED_CONTENT = 'contentBuilder/SET_GENERATED_CONTENT';
export const CONTENT_BUILDER_SET_GENERATION_ERROR = 'contentBuilder/SET_GENERATION_ERROR';
export const CONTENT_BUILDER_UPDATE_CUSTOMIZATION = 'contentBuilder/UPDATE_CUSTOMIZATION';
export const CONTENT_BUILDER_SET_SAVING = 'contentBuilder/SET_SAVING';
export const CONTENT_BUILDER_SET_SAVE_ERROR = 'contentBuilder/SET_SAVE_ERROR';
export const CONTENT_BUILDER_SET_SELECTED_FILE = 'contentBuilder/SET_SELECTED_FILE';
export const CONTENT_BUILDER_SET_SELECTED_CONTENT_TYPE = 'contentBuilder/SET_SELECTED_CONTENT_TYPE';
export const CONTENT_BUILDER_CLEAR_ALL = 'contentBuilder/CLEAR_ALL';
export const CONTENT_BUILDER_SET_FILE_UPLOAD_API_LOADING = 'contentBuilder/SET_FILE_UPLOAD_API_LOADING';
export const CONTENT_BUILDER_SET_GENERATE_CONTENT_API_LOADING = 'contentBuilder/SET_GENERATE_CONTENT_API_LOADING';

const initialContentBuilderState = {
  uploadedFiles: [],
  isUploading: false,
  uploadError: null,
  isGenerating: false,
  generatedContent: null,
  generationError: null,
  customizationSettings: {
    contentDepth: 'intermediate' as const,
    formatStyle: 'bullet-points' as const,
    visualStyle: 'academic' as const,
    outputLanguage: 'english' as const,
  },
  isSaving: false,
  saveError: null,
  selectedFileId: null,
  selectedContentTypeId: null,
  fileUploadApiLoading: false,
  generateContentApiLoading: false,
};

const initialState: AdaptiveContentState = {
  loading: false,
  error: null,
  contentTypes: [
    {
      id: 'sticky-notes',
      name: 'Sticky Notes',
      description:
        'Digital annotations and key focus points tailored for specific student feedback and contextual learning.',
      icon: 'sticky_note_2',
      iconColor: '#ca8a04',
      bgColor: '#fffae0',
    },
    {
      id: 'ready-reckoner',
      name: 'Ready Reckoner',
      description:
        'Quick-reference charts and summary tables designed for rapid review and essential concept reinforcement.',
      icon: 'table_view',
      iconColor: '#2463eb',
      bgColor: '#e8f2ff',
    },
    {
      id: 'flash-cards',
      name: 'Flash Cards',
      description:
        'Active recall decks designed for spaced repetition, helping students master definitions and key dates.',
      icon: 'style',
      iconColor: '#dc2626',
      bgColor: '#fdf2f2',
    },
    {
      id: 'mind-maps',
      name: 'Concept / Mind Maps',
      description:
        'Visual hierarchies that demonstrate complex relationships between topics for better structural understanding.',
      icon: 'account_tree',
      iconColor: '#16a34a',
      bgColor: '#f0fdf4',
    },
    {
      id: 'visual-explainers',
      name: 'Visual Explainers',
      description:
        'Infographics and detailed diagrams that transform abstract concepts into clear visual mental models.',
      icon: 'burst_mode',
      iconColor: '#9333ea',
      bgColor: '#faf5ff',
    },
  ],
  aiCredits: 128,
  recentlyGenerated: 14,
  contentBuilder: initialContentBuilderState,
};

export const adaptiveContentReducer = (
  state: AdaptiveContentState = initialState,
  action: AnyAction
): AdaptiveContentState => {
  switch (action.type) {
    case ADAPTIVE_CONTENT_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADAPTIVE_CONTENT_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ADAPTIVE_CONTENT_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADAPTIVE_CONTENT_UPDATE_CREDITS:
      return {
        ...state,
        aiCredits: action.payload,
      };

    case CONTENT_BUILDER_ADD_UPLOADED_FILE:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          uploadedFiles: state.contentBuilder.uploadedFiles.some(
            (f) => f.fileName === action.payload.fileName
          )
            ? state.contentBuilder.uploadedFiles.map((f) =>
                f.fileName === action.payload.fileName ? action.payload : f
              )
            : [...state.contentBuilder.uploadedFiles, action.payload],
          uploadError: null,
          selectedFileId: action.payload.fileId || null,
        },
      };

    case CONTENT_BUILDER_UPDATE_FILE_UPLOAD_STATUS:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          uploadedFiles: state.contentBuilder.uploadedFiles.map((f) =>
            f.fileName === action.payload.fileName
              ? {
                  ...f,
                  uploadProgress: action.payload.uploadProgress,
                  isUploading: action.payload.isUploading,
                  fileId: action.payload.fileId || f.fileId,
                }
              : f
          ),
          selectedFileId: action.payload.fileId || state.contentBuilder.selectedFileId,
        },
      };

    case CONTENT_BUILDER_REMOVE_UPLOADED_FILE:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          uploadedFiles: state.contentBuilder.uploadedFiles.filter(
            (f) => f.fileId !== action.payload
          ),
          selectedFileId:
            state.contentBuilder.selectedFileId === action.payload
              ? state.contentBuilder.uploadedFiles[0]?.fileId || null
              : state.contentBuilder.selectedFileId,
        },
      };

    case CONTENT_BUILDER_SET_FILE_UPLOADING:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          isUploading: action.payload,
        },
      };

    case CONTENT_BUILDER_SET_UPLOAD_ERROR:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          uploadError: action.payload,
          isUploading: false,
        },
      };

    case CONTENT_BUILDER_SET_GENERATING:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          isGenerating: action.payload,
        },
      };

    case CONTENT_BUILDER_SET_GENERATED_CONTENT:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          generatedContent: action.payload,
          generationError: null,
          isGenerating: false,
        },
      };

    case CONTENT_BUILDER_SET_GENERATION_ERROR:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          generationError: action.payload,
          isGenerating: false,
        },
      };

    case CONTENT_BUILDER_UPDATE_CUSTOMIZATION:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          customizationSettings: {
            ...state.contentBuilder.customizationSettings,
            ...action.payload,
          },
        },
      };

    case CONTENT_BUILDER_SET_SAVING:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          isSaving: action.payload,
        },
      };

    case CONTENT_BUILDER_SET_SAVE_ERROR:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          saveError: action.payload,
          isSaving: false,
        },
      };

    case CONTENT_BUILDER_SET_SELECTED_FILE:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          selectedFileId: action.payload,
        },
      };

    case CONTENT_BUILDER_SET_SELECTED_CONTENT_TYPE:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          selectedContentTypeId: action.payload,
        },
      };

    case CONTENT_BUILDER_CLEAR_ALL:
      return {
        ...state,
        contentBuilder: initialContentBuilderState,
      };

    case CONTENT_BUILDER_SET_FILE_UPLOAD_API_LOADING:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          fileUploadApiLoading: action.payload,
        },
      };

    case CONTENT_BUILDER_SET_GENERATE_CONTENT_API_LOADING:
      return {
        ...state,
        contentBuilder: {
          ...state.contentBuilder,
          generateContentApiLoading: action.payload,
        },
      };

    default:
      return state;
  }
};
