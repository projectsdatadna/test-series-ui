/**
 * Content Library Selectors
 */

import type { RootState } from '../../../store';

const contentLibrarySelector = {
  getItems: (state: RootState) => state.adaptiveContent.contentLibrary.items,
  getLoading: (state: RootState) => state.adaptiveContent.contentLibrary.loading,
  getError: (state: RootState) => state.adaptiveContent.contentLibrary.error,
  getFilters: (state: RootState) => state.adaptiveContent.contentLibrary.filters,
  getTotalAssets: (state: RootState) => state.adaptiveContent.contentLibrary.totalAssets,
  getAssignedToday: (state: RootState) => state.adaptiveContent.contentLibrary.assignedToday,
  getAiGenerated: (state: RootState) => state.adaptiveContent.contentLibrary.aiGenerated,
  getFilteredItems: (state: RootState) => {
    const { items, filters } = state.adaptiveContent.contentLibrary;
    return items.filter((item) => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.subjects.some((s) => s.toLowerCase().includes(query))
        );
      }
      if (filters.aidType && item.contentType !== filters.aidType) {
        return false;
      }
      if (filters.standard && item.standard !== filters.standard) {
        return false;
      }
      return true;
    });
  },
};

export default contentLibrarySelector;
