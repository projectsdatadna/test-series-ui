/**
 * Teacher Dashboard Module Selectors
 */

import type { RootState } from '../../store';

export const selectTeacherDashboardLoading = (state: RootState): boolean =>
  state.teacherDashboard.loading;

export const selectTeacherDashboardError = (state: RootState): string | null =>
  state.teacherDashboard.error;

const teacherDashboardSelector = {
  getLoading: selectTeacherDashboardLoading,
  getError: selectTeacherDashboardError,
};

export default teacherDashboardSelector;
