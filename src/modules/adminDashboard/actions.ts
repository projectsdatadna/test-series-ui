/**
 * Admin Dashboard Module Actions
 */

import {
  ADMIN_DASHBOARD_LOAD_REQUEST,
  ADMIN_DASHBOARD_LOAD_SUCCESS,
  ADMIN_DASHBOARD_LOAD_FAILURE,
} from './reducer';

export interface AdminDashboardLoadRequestAction {
  type: typeof ADMIN_DASHBOARD_LOAD_REQUEST;
}

export interface AdminDashboardLoadSuccessAction {
  type: typeof ADMIN_DASHBOARD_LOAD_SUCCESS;
}

export interface AdminDashboardLoadFailureAction {
  type: typeof ADMIN_DASHBOARD_LOAD_FAILURE;
  payload: string;
}

export type AdminDashboardAction =
  | AdminDashboardLoadRequestAction
  | AdminDashboardLoadSuccessAction
  | AdminDashboardLoadFailureAction;

export const adminDashboardLoadRequest = (): AdminDashboardLoadRequestAction => ({
  type: ADMIN_DASHBOARD_LOAD_REQUEST,
});

export const adminDashboardLoadSuccess = (): AdminDashboardLoadSuccessAction => ({
  type: ADMIN_DASHBOARD_LOAD_SUCCESS,
});

export const adminDashboardLoadFailure = (payload: string): AdminDashboardLoadFailureAction => ({
  type: ADMIN_DASHBOARD_LOAD_FAILURE,
  payload,
});
