/**
 * Teacher Dashboard Module Actions
 */

import {
  TEACHER_DASHBOARD_LOAD_REQUEST,
  TEACHER_DASHBOARD_LOAD_SUCCESS,
  TEACHER_DASHBOARD_LOAD_FAILURE,
} from './reducer';

export interface TeacherDashboardLoadRequestAction {
  type: typeof TEACHER_DASHBOARD_LOAD_REQUEST;
}

export interface TeacherDashboardLoadSuccessAction {
  type: typeof TEACHER_DASHBOARD_LOAD_SUCCESS;
}

export interface TeacherDashboardLoadFailureAction {
  type: typeof TEACHER_DASHBOARD_LOAD_FAILURE;
  payload: string;
}

export type TeacherDashboardAction =
  | TeacherDashboardLoadRequestAction
  | TeacherDashboardLoadSuccessAction
  | TeacherDashboardLoadFailureAction;

export const teacherDashboardLoadRequest = (): TeacherDashboardLoadRequestAction => ({
  type: TEACHER_DASHBOARD_LOAD_REQUEST,
});

export const teacherDashboardLoadSuccess = (): TeacherDashboardLoadSuccessAction => ({
  type: TEACHER_DASHBOARD_LOAD_SUCCESS,
});

export const teacherDashboardLoadFailure = (payload: string): TeacherDashboardLoadFailureAction => ({
  type: TEACHER_DASHBOARD_LOAD_FAILURE,
  payload,
});
