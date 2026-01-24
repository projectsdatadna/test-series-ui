/**
 * Navbar Module Selectors
 */

import type { RootState } from '../../store';

export const selectNavbarIsOpen = (state: RootState): boolean =>
  state.navbar.isOpen;

const navbarSelector = {
  getIsOpen: selectNavbarIsOpen,
};

export default navbarSelector;
