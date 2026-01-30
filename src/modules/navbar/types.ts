/**
 * Navbar Module Types
 */

import type { UserRole } from '../auth/types';

export type PageId =
  | 'dashboard'
  | 'classes'
  | 'question-bank'
  | 'assessment-builder'
  | 'assessment-configurator'
  | 'test-library'
  | 'revision-kit'
  | 'remedial-lab'
  | 'adaptive-content'
  | 'content-builder'
  | 'book-upload'
  | 'students'
  | 'reports'
  | 'analytics'
  | 'settings'
  | 'support'
  | 'my-courses'
  | 'active-tests'
  | 'past-results'
  | 'ai-learning-path'
  | 'practice-lab'
  | 'achievements'
  | 'study-groups'
  | 'schedule'
  | 'my-children'
  | 'performance';

export interface NavbarState {
  isOpen: boolean;
  currentPage: PageId;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  pageId: PageId;
  roles: UserRole[];
}
