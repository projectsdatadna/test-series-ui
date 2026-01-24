/**
 * Admin Dashboard Module Reducer
 */

import type { AdminDashboardState } from './types';
import type { AnyAction } from 'redux';

export const ADMIN_DASHBOARD_LOAD_REQUEST = 'adminDashboard/LOAD_REQUEST';
export const ADMIN_DASHBOARD_LOAD_SUCCESS = 'adminDashboard/LOAD_SUCCESS';
export const ADMIN_DASHBOARD_LOAD_FAILURE = 'adminDashboard/LOAD_FAILURE';

const initialState: AdminDashboardState = {
  loading: false,
  error: null,
};

export const adminDashboardReducer = (
  state: AdminDashboardState = initialState,
  action: AnyAction
): AdminDashboardState => {
  switch (action.type) {
    case ADMIN_DASHBOARD_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADMIN_DASHBOARD_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ADMIN_DASHBOARD_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
