/**
 * Navbar Module Reducer
 */

import type { NavbarState } from './types';
import type { AnyAction } from 'redux';

export const NAVBAR_TOGGLE = 'navbar/TOGGLE';
export const NAVBAR_OPEN = 'navbar/OPEN';
export const NAVBAR_CLOSE = 'navbar/CLOSE';

const initialState: NavbarState = {
  isOpen: true,
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

    default:
      return state;
  }
};
