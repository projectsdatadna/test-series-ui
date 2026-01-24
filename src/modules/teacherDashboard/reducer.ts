/**
 * Teacher Dashboard Module Reducer
 */

import type { TeacherDashboardState } from './types';
import type { AnyAction } from 'redux';

export const TEACHER_DASHBOARD_LOAD_REQUEST = 'teacherDashboard/LOAD_REQUEST';
export const TEACHER_DASHBOARD_LOAD_SUCCESS = 'teacherDashboard/LOAD_SUCCESS';
export const TEACHER_DASHBOARD_LOAD_FAILURE = 'teacherDashboard/LOAD_FAILURE';

const initialState: TeacherDashboardState = {
  loading: false,
  error: null,
};

export const teacherDashboardReducer = (
  state: TeacherDashboardState = initialState,
  action: AnyAction
): TeacherDashboardState => {
  switch (action.type) {
    case TEACHER_DASHBOARD_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case TEACHER_DASHBOARD_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case TEACHER_DASHBOARD_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
