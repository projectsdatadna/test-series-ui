/**
 * Navbar Module Reducer
 */

import type { NavbarState, PageId } from './types';
import type { AnyAction } from 'redux';

export const NAVBAR_TOGGLE = 'navbar/TOGGLE';
export const NAVBAR_OPEN = 'navbar/OPEN';
export const NAVBAR_CLOSE = 'navbar/CLOSE';
export const NAVBAR_SET_CURRENT_PAGE = 'navbar/SET_CURRENT_PAGE';

const initialState: NavbarState = {
  isOpen: true,
  currentPage: 'dashboard',
};

export const navbarReducer = (
  state: NavbarState = initialState,
  action: AnyAction
): NavbarState => {
  switch (action.type) {
    case NAVBAR_TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case NAVBAR_OPEN:
      return {
        ...state,
        isOpen: true,
      };

    case NAVBAR_CLOSE:
      return {
        ...state,
        isOpen: false,
      };

    case NAVBAR_SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload as PageId,
      };

    default:
      return state;
  }
};
