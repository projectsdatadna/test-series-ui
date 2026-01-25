/**
 * Adaptive Content Module Selectors
 */

import type { RootState } from '../../store';
import type { ContentType } from './types';

export const selectAdaptiveContentLoading = (state: RootState): boolean =>
  state.adaptiveContent.loading;

export const selectAdaptiveContentError = (state: RootState): string | null =>
  state.adaptiveContent.error;

export const selectContentTypes = (state: RootState): ContentType[] =>
  state.adaptiveContent.contentTypes;

export const selectAICredits = (state: RootState): number => state.adaptiveContent.aiCredits;

export const selectRecentlyGenerated = (state: RootState): number =>
  state.adaptiveContent.recentlyGenerated;

const adaptiveContentSelector = {
  getLoading: selectAdaptiveContentLoading,
  getError: selectAdaptiveContentError,
  getContentTypes: selectContentTypes,
  getAICredits: selectAICredits,
  getRecentlyGenerated: selectRecentlyGenerated,
};

export default adaptiveContentSelector;
