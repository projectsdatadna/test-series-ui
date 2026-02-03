/**
 * Content Library Actions
 */

import type { ContentLibraryItem, ContentLibraryFilters } from '../types';
import type { ContentLibraryAction } from './reducer';

export const setLibraryLoading = (loading: boolean): ContentLibraryAction => ({
  type: 'SET_LOADING',
  payload: loading,
});

export const setLibraryError = (error: string | null): ContentLibraryAction => ({
  type: 'SET_ERROR',
  payload: error,
});

export const setLibraryItems = (items: ContentLibraryItem[]): ContentLibraryAction => ({
  type: 'SET_ITEMS',
  payload: items,
});

export const setLibraryFilters = (filters: ContentLibraryFilters): ContentLibraryAction => ({
  type: 'SET_FILTERS',
  payload: filters,
});

export const updateLibraryStats = (stats: { totalAssets: number; assignedToday: number; aiGenerated: number }): ContentLibraryAction => ({
  type: 'UPDATE_STATS',
  payload: stats,
});

export const addItemToLibrary = (item: ContentLibraryItem): ContentLibraryAction => ({
  type: 'ADD_ITEM',
  payload: item,
});

export const removeItemFromLibrary = (itemId: string): ContentLibraryAction => ({
  type: 'REMOVE_ITEM',
  payload: itemId,
});
