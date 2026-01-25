/**
 * Assessment Builder Module Selectors
 */

import type { RootState } from '../../store';
import type { AssessmentBuilderState, RecentActivityItem } from './types';

export const selectAssessmentBuilderLoading = (state: RootState): boolean =>
  state.assessmentBuilder.loading;

export const selectAssessmentBuilderError = (state: RootState): string | null =>
  state.assessmentBuilder.error;

export const selectAssessmentBuilderActiveTab = (
  state: RootState
): AssessmentBuilderState['activeTab'] => state.assessmentBuilder.activeTab;

export const selectRecentActivity = (state: RootState): RecentActivityItem[] =>
  state.assessmentBuilder.recentActivity;

const assessmentBuilderSelector = {
  getLoading: selectAssessmentBuilderLoading,
  getError: selectAssessmentBuilderError,
  getActiveTab: selectAssessmentBuilderActiveTab,
  getRecentActivity: selectRecentActivity,
};

export default assessmentBuilderSelector;
