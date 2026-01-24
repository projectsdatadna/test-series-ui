/**
 * Student Dashboard Module Actions
 */

import {
  STUDENT_DASHBOARD_LOAD_REQUEST,
  STUDENT_DASHBOARD_LOAD_SUCCESS,
  STUDENT_DASHBOARD_LOAD_FAILURE,
} from './reducer';

export interface StudentDashboardLoadRequestAction {
  type: typeof STUDENT_DASHBOARD_LOAD_REQUEST;
}

export interface StudentDashboardLoadSuccessAction {
  type: typeof STUDENT_DASHBOARD_LOAD_SUCCESS;
}

export interface StudentDashboardLoadFailureAction {
  type: typeof STUDENT_DASHBOARD_LOAD_FAILURE;
  payload: string;
}

export type StudentDashboardAction =
  | StudentDashboardLoadRequestAction
  | StudentDashboardLoadSuccessAction
  | StudentDashboardLoadFailureAction;

export const studentDashboardLoadRequest = (): StudentDashboardLoadRequestAction => ({
  type: STUDENT_DASHBOARD_LOAD_REQUEST,
});

export const studentDashboardLoadSuccess = (): StudentDashboardLoadSuccessAction => ({
  type: STUDENT_DASHBOARD_LOAD_SUCCESS,
});

export const studentDashboardLoadFailure = (payload: string): StudentDashboardLoadFailureAction => ({
  type: STUDENT_DASHBOARD_LOAD_FAILURE,
  payload,
});
