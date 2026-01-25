/**
 * Remedial Lab Module Selectors
 */

import type { RootState } from '../../store';
import type { RemedialLabState, StudentConceptGap } from './types';

export const selectRemedialLabLoading = (state: RootState): boolean => state.remedialLab.loading;

export const selectRemedialLabError = (state: RootState): string | null => state.remedialLab.error;

export const selectSelectedStudent = (state: RootState): StudentConceptGap | null =>
  state.remedialLab.selectedStudent;

export const selectConceptGaps = (state: RootState): StudentConceptGap[] =>
  state.remedialLab.conceptGaps;

export const selectActiveTab = (state: RootState): RemedialLabState['activeTab'] =>
  state.remedialLab.activeTab;

const remedialLabSelector = {
  getLoading: selectRemedialLabLoading,
  getError: selectRemedialLabError,
  getSelectedStudent: selectSelectedStudent,
  getConceptGaps: selectConceptGaps,
  getActiveTab: selectActiveTab,
};

export default remedialLabSelector;
