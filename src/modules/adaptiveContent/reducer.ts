/**
 * Adaptive Content Module Reducer
 */

import type { AdaptiveContentState } from './types';
import type { AnyAction } from 'redux';

export const ADAPTIVE_CONTENT_LOAD_REQUEST = 'adaptiveContent/LOAD_REQUEST';
export const ADAPTIVE_CONTENT_LOAD_SUCCESS = 'adaptiveContent/LOAD_SUCCESS';
export const ADAPTIVE_CONTENT_LOAD_FAILURE = 'adaptiveContent/LOAD_FAILURE';
export const ADAPTIVE_CONTENT_UPDATE_CREDITS = 'adaptiveContent/UPDATE_CREDITS';

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

    default:
      return state;
  }
};
