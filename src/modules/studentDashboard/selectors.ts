/**
 * Student Dashboard Module Selectors
 */

import type { RootState } from '../../store';

export const selectStudentDashboardLoading = (state: RootState): boolean =>
  state.studentDashboard.loading;

export const selectStudentDashboardError = (state: RootState): string | null =>
  state.studentDashboard.error;

const studentDashboardSelector = {
  getLoading: selectStudentDashboardLoading,
  getError: selectStudentDashboardError,
};

export default studentDashboardSelector;
