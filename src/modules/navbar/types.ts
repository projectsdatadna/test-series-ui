/**
 * Navbar Module Types
 */

import type { UserRole } from '../auth/types';

export interface NavbarState {
  isOpen: boolean;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  roles: UserRole[];
}
