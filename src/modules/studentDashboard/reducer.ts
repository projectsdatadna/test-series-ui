/**
 * Student Dashboard Module Reducer
 */

import type { StudentDashboardState } from './types';
import type { AnyAction } from 'redux';

export const STUDENT_DASHBOARD_LOAD_REQUEST = 'studentDashboard/LOAD_REQUEST';
export const STUDENT_DASHBOARD_LOAD_SUCCESS = 'studentDashboard/LOAD_SUCCESS';
export const STUDENT_DASHBOARD_LOAD_FAILURE = 'studentDashboard/LOAD_FAILURE';

const initialState: StudentDashboardState = {
  loading: false,
  error: null,
};

export const studentDashboardReducer = (
  state: StudentDashboardState = initialState,
  action: AnyAction
): StudentDashboardState => {
  switch (action.type) {
    case STUDENT_DASHBOARD_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case STUDENT_DASHBOARD_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case STUDENT_DASHBOARD_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
