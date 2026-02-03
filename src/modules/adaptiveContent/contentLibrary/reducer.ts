/**
 * Content Library Reducer
 */

import type { ContentLibraryState, ContentLibraryItem, ContentLibraryFilters } from '../types';

export type ContentLibraryAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ITEMS'; payload: ContentLibraryItem[] }
  | { type: 'SET_FILTERS'; payload: ContentLibraryFilters }
  | { type: 'UPDATE_STATS'; payload: { totalAssets: number; assignedToday: number; aiGenerated: number } }
  | { type: 'ADD_ITEM'; payload: ContentLibraryItem }
  | { type: 'REMOVE_ITEM'; payload: string };

const initialState: ContentLibraryState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    searchQuery: '',
  },
  totalAssets: 0,
  assignedToday: 0,
  aiGenerated: 0,
};

export const contentLibraryReducer = (state: ContentLibraryState = initialState, action: ContentLibraryAction): ContentLibraryState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        totalAssets: action.payload.totalAssets,
        assignedToday: action.payload.assignedToday,
        aiGenerated: action.payload.aiGenerated,
      };

    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default contentLibraryReducer;
