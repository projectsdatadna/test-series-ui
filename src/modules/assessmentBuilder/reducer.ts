/**
 * Assessment Builder Module Reducer
 */

import type { AssessmentBuilderState } from './types';
import type { AnyAction } from 'redux';

export const ASSESSMENT_BUILDER_LOAD_REQUEST = 'assessmentBuilder/LOAD_REQUEST';
export const ASSESSMENT_BUILDER_LOAD_SUCCESS = 'assessmentBuilder/LOAD_SUCCESS';
export const ASSESSMENT_BUILDER_LOAD_FAILURE = 'assessmentBuilder/LOAD_FAILURE';
export const ASSESSMENT_BUILDER_SET_ACTIVE_TAB = 'assessmentBuilder/SET_ACTIVE_TAB';

const initialState: AssessmentBuilderState = {
  loading: false,
  error: null,
  activeTab: 'assessment',
  recentActivity: [
    {
      id: '1',
      documentName: 'Physics Midterm Quiz - Unit 4',
      type: 'Assessment',
      dateCreated: 'Oct 24, 2023',
      status: 'Completed',
      icon: 'description',
    },
    {
      id: '2',
      documentName: 'Calculus Revision Flashcards',
      type: 'Revision Kit',
      dateCreated: 'Oct 23, 2023',
      status: 'Draft',
      icon: 'psychology_alt',
    },
    {
      id: '3',
      documentName: 'Ancient Civilizations Lesson Plan',
      type: 'Lesson Plan',
      dateCreated: 'Oct 21, 2023',
      status: 'Completed',
      icon: 'menu_book',
    },
  ],
};

export const assessmentBuilderReducer = (
  state: AssessmentBuilderState = initialState,
  action: AnyAction
): AssessmentBuilderState => {
  switch (action.type) {
    case ASSESSMENT_BUILDER_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ASSESSMENT_BUILDER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ASSESSMENT_BUILDER_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ASSESSMENT_BUILDER_SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    default:
      return state;
  }
};
