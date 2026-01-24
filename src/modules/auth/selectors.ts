/**
 * Auth Module Selectors
 */

import type { RootState } from '../../store';
import type { AuthStep } from './types';

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;

export const selectUser = (state: RootState) => state.auth.user;

export const selectUserId = (state: RootState): string | undefined => state.auth.userId;

export const selectUserRole = (state: RootState): string | undefined => state.auth.roleId;

export const selectLoading = (state: RootState): boolean => state.auth.loading;

export const selectError = (state: RootState): string | null => state.auth.error;

export const selectCurrentStep = (state: RootState): AuthStep => state.auth.currentStep;

export const selectCredentials = (state: RootState) => state.auth.credentials;

export const selectSelectedRole = (state: RootState) => state.auth.selectedRole;

export const selectSignupData = (state: RootState) => state.auth.signupData;

export const selectOtpData = (state: RootState) => state.auth.otpData;

export const selectProfileData = (state: RootState) => state.auth.profileData;

export const selectEmail = (state: RootState): string => state.auth.credentials.email;

export const selectPassword = (state: RootState): string => state.auth.credentials.password;

export const selectRememberMe = (state: RootState): boolean =>
  state.auth.credentials.rememberMe;

// Auth Selector Object
const authSelector = {
  getIsAuthenticated: selectIsAuthenticated,
  getUser: selectUser,
  getUserId: selectUserId,
  getUserRole: selectUserRole,
  getLoading: selectLoading,
  getError: selectError,
  getCurrentStep: selectCurrentStep,
  getCredentials: selectCredentials,
  getSelectedRole: selectSelectedRole,
  getSignupData: selectSignupData,
  getOtpData: selectOtpData,
  getProfileData: selectProfileData,
  getEmail: selectEmail,
  getPassword: selectPassword,
  getRememberMe: selectRememberMe,
};

export default authSelector;
