/**
 * Local Storage Management for Auth Data
 */

import type { UserRole } from '../modules/auth/types';

export interface StoredAuthData {
  token: string;
  roleId: UserRole;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}

const STORAGE_KEY = 'auth_data';

export const storageManager = {
  /**
   * Save auth data to localStorage
   */
  saveAuthData: (data: StoredAuthData): void => {
    try {
      console.log('[StorageManager] Attempting to save auth data:', data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('[StorageManager] Auth data saved successfully to localStorage');
      console.log('[StorageManager] Verification - data in localStorage:', localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      console.error('[StorageManager] Error saving auth data:', error);
    }
  },

  /**
   * Get auth data from localStorage
   */
  getAuthData: (): StoredAuthData | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        console.log('[StorageManager] Auth data retrieved from localStorage');
        return JSON.parse(data);
      }
      console.log('[StorageManager] No auth data found in localStorage');
      return null;
    } catch (error) {
      console.error('[StorageManager] Error retrieving auth data:', error);
      return null;
    }
  },

  /**
   * Clear auth data from localStorage
   */
  clearAuthData: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('[StorageManager] Auth data cleared from localStorage');
    } catch (error) {
      console.error('[StorageManager] Error clearing auth data:', error);
    }
  },

  /**
   * Check if auth data exists
   */
  hasAuthData: (): boolean => {
    try {
      const exists = localStorage.getItem(STORAGE_KEY) !== null;
      console.log('[StorageManager] Auth data exists:', exists);
      return exists;
    } catch (error) {
      console.error('[StorageManager] Error checking auth data:', error);
      return false;
    }
  },
};
