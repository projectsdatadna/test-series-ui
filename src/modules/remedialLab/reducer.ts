/**
 * Remedial Lab Module Reducer
 */

import type { RemedialLabState, StudentConceptGap } from './types';
import type { AnyAction } from 'redux';

export const REMEDIAL_LAB_LOAD_REQUEST = 'remedialLab/LOAD_REQUEST';
export const REMEDIAL_LAB_LOAD_SUCCESS = 'remedialLab/LOAD_SUCCESS';
export const REMEDIAL_LAB_LOAD_FAILURE = 'remedialLab/LOAD_FAILURE';
export const REMEDIAL_LAB_SET_SELECTED_STUDENT = 'remedialLab/SET_SELECTED_STUDENT';
export const REMEDIAL_LAB_SET_ACTIVE_TAB = 'remedialLab/SET_ACTIVE_TAB';

const initialConceptGaps: StudentConceptGap[] = [
  {
    id: '1',
    studentName: 'Aryan Sharma',
    gap: 'Fractions',
    priority: 'High',
    status: 'High Priority',
    recoveryProgress: 0,
    matchScore: 98,
  },
  {
    id: '2',
    studentName: 'Maya Patel',
    gap: 'Decimals',
    priority: 'Medium',
    status: 'In Progress',
    recoveryProgress: 45,
    matchScore: 92,
  },
  {
    id: '3',
    studentName: 'Rahul Kumar',
    gap: 'Algebra Basics',
    priority: 'Low',
    status: 'In Progress',
    recoveryProgress: 72,
    matchScore: 85,
  },
];

const initialState: RemedialLabState = {
  loading: false,
  error: null,
  selectedStudent: initialConceptGaps[0],
  conceptGaps: initialConceptGaps,
  activeTab: 'explanation',
};

export const remedialLabReducer = (
  state: RemedialLabState = initialState,
  action: AnyAction
): RemedialLabState => {
  switch (action.type) {
    case REMEDIAL_LAB_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REMEDIAL_LAB_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case REMEDIAL_LAB_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REMEDIAL_LAB_SET_SELECTED_STUDENT:
      return {
        ...state,
        selectedStudent: action.payload,
      };

    case REMEDIAL_LAB_SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    default:
      return state;
  }
};
