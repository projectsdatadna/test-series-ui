/**
 * Admin Dashboard Module Selectors
 */

import type { RootState } from '../../store';

export const selectAdminDashboardLoading = (state: RootState): boolean =>
  state.adminDashboard.loading;

export const selectAdminDashboardError = (state: RootState): string | null =>
  state.adminDashboard.error;

const adminDashboardSelector = {
  getLoading: selectAdminDashboardLoading,
  getError: selectAdminDashboardError,
};

export default adminDashboardSelector;
