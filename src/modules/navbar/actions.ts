/**
 * Navbar Module Actions
 */

import { NAVBAR_TOGGLE, NAVBAR_OPEN, NAVBAR_CLOSE, NAVBAR_SET_CURRENT_PAGE } from './reducer';
import type { PageId } from './types';

export interface NavbarToggleAction {
  type: typeof NAVBAR_TOGGLE;
}

export interface NavbarOpenAction {
  type: typeof NAVBAR_OPEN;
}

export interface NavbarCloseAction {
  type: typeof NAVBAR_CLOSE;
}

export interface NavbarSetCurrentPageAction {
  type: typeof NAVBAR_SET_CURRENT_PAGE;
  payload: PageId;
}

export type NavbarAction =
  | NavbarToggleAction
  | NavbarOpenAction
  | NavbarCloseAction
  | NavbarSetCurrentPageAction;

export const toggleNavbar = (): NavbarToggleAction => ({
  type: NAVBAR_TOGGLE,
});

export const openNavbar = (): NavbarOpenAction => ({
  type: NAVBAR_OPEN,
});

export const closeNavbar = (): NavbarCloseAction => ({
  type: NAVBAR_CLOSE,
});

export const setCurrentPage = (pageId: PageId): NavbarSetCurrentPageAction => ({
  type: NAVBAR_SET_CURRENT_PAGE,
  payload: pageId,
});
