/**
 * Navbar Module Selectors
 */

import type { RootState } from '../../store';
import type { PageId } from './types';

export const selectNavbarIsOpen = (state: RootState): boolean => state.navbar.isOpen;

export const selectCurrentPage = (state: RootState): PageId => state.navbar.currentPage;

const navbarSelector = {
  getIsOpen: selectNavbarIsOpen,
  getCurrentPage: selectCurrentPage,
};

export default navbarSelector;
