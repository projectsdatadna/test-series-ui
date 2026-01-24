/**
 * Navbar Module Actions
 */

import { NAVBAR_TOGGLE, NAVBAR_OPEN, NAVBAR_CLOSE } from './reducer';

export interface NavbarToggleAction {
  type: typeof NAVBAR_TOGGLE;
}

export interface NavbarOpenAction {
  type: typeof NAVBAR_OPEN;
}

export interface NavbarCloseAction {
  type: typeof NAVBAR_CLOSE;
}

export type NavbarAction = NavbarToggleAction | NavbarOpenAction | NavbarCloseAction;

export const toggleNavbar = (): NavbarToggleAction => ({
  type: NAVBAR_TOGGLE,
});

export const openNavbar = (): NavbarOpenAction => ({
  type: NAVBAR_OPEN,
});

export const closeNavbar = (): NavbarCloseAction => ({
  type: NAVBAR_CLOSE,
});
