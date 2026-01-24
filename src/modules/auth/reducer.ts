/**
 * Auth Module Reducer
 */

import type { AuthState, AuthStep, UserRole } from './types';
import type { AuthAction } from './actions';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  AUTH_SET_CREDENTIALS,
  AUTH_SELECT_ROLE,
  AUTH_NEXT_STEP,
  AUTH_PREV_STEP,
  AUTH_CLEAR_ERROR,
  AUTH_SIGNUP_REQUEST,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_CONFIRM_EMAIL_REQUEST,
  AUTH_CONFIRM_EMAIL_SUCCESS,
  AUTH_CONFIRM_EMAIL_FAILURE,
  AUTH_PROFILE_COMPLETION_REQUEST,
  AUTH_PROFILE_COMPLETION_SUCCESS,
  AUTH_PROFILE_COMPLETION_FAILURE,
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILURE,
  AUTH_RESET_PASSWORD_REQUEST,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILURE,
  AUTH_SET_STEP,
  AUTH_SET_USER_ID,
  AUTH_SET_ROLE_ID,
  AUTH_SET_AUTHENTICATED,
} from './actions';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  userId: undefined,
  roleId: undefined,
  loading: false,
  error: null,
  currentStep: 'login',
  credentials: {
    email: '',
    password: '',
    rememberMe: false,
  },
  selectedRole: null,
  signupData: {
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    role: null,
  },
  otpData: {
    code: '',
    email: '',
    timeLeft: 0,
  },
  profileData: {
    schoolName: '',
    grades: [],
    subjects: [],
    experienceLevel: null,
    preferences: [],
  },
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    // Login actions
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        credentials: action.payload,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    // Signup actions
    case AUTH_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        signupData: {
          ...state.signupData,
          email: action.payload.email,
          fullName: `${action.payload.firstName} ${action.payload.lastName}`,
        },
      };

    case AUTH_SIGNUP_SUCCESS:
      console.log('[REDUCER] AUTH_SIGNUP_SUCCESS case triggered');
      console.log('[REDUCER] action.payload:', action.payload);
      console.log('[REDUCER] Previous state.userId:', state.userId);
      return {
        ...state,
        loading: false,
        error: null,
        // Keep existing userId if already set, otherwise try to extract from response
        userId: state.userId || action.payload?.data?.userId || action.payload?.userId,
        currentStep: 'verify-otp',
      };

    case AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Email confirmation actions
    case AUTH_CONFIRM_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        otpData: {
          ...state.otpData,
          email: action.payload.email,
          code: action.payload.confirmationCode,
        },
      };

    case AUTH_CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentStep: 'profile-setup',
      };

    case AUTH_CONFIRM_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Profile completion actions
    case AUTH_PROFILE_COMPLETION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_PROFILE_COMPLETION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true,
        user: action.payload.user || null,
      };

    case AUTH_PROFILE_COMPLETION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Forgot password actions
    case AUTH_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentStep: 'verify-otp',
      };

    case AUTH_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Reset password actions
    case AUTH_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentStep: 'login',
      };

    case AUTH_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Other actions
    case AUTH_LOGOUT:
      return {
        ...initialState,
        userId: undefined,
      };

    case AUTH_SET_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload,
      };

    case AUTH_SELECT_ROLE:
      return {
        ...state,
        selectedRole: action.payload,
      };

    case AUTH_SET_STEP:
      return {
        ...state,
        currentStep: action.payload as AuthStep,
      };

    case AUTH_SET_USER_ID:
      console.log('[REDUCER] AUTH_SET_USER_ID case triggered');
      console.log('[REDUCER] action.payload:', action.payload);
      console.log('[REDUCER] Previous state.userId:', state.userId);
      const newState = {
        ...state,
        userId: action.payload,
      };
      console.log('[REDUCER] New state.userId:', newState.userId);
      return newState;

    case AUTH_SET_ROLE_ID:
      console.log('[REDUCER] AUTH_SET_ROLE_ID case triggered');
      console.log('[REDUCER] action.payload:', action.payload);
      return {
        ...state,
        roleId: action.payload as UserRole,
      };

    case AUTH_SET_AUTHENTICATED:
      console.log('[REDUCER] AUTH_SET_AUTHENTICATED case triggered');
      console.log('[REDUCER] action.payload:', action.payload);
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case AUTH_NEXT_STEP:
      const stepOrder: AuthStep[] = ['login', 'signup', 'verify-otp', 'profile-setup', 'forgot-password', 'reset-password'];
      const currentIndex = stepOrder.indexOf(state.currentStep);
      const nextIndex = currentIndex < stepOrder.length - 1 ? currentIndex + 1 : currentIndex;
      return {
        ...state,
        currentStep: stepOrder[nextIndex],
      };

    case AUTH_PREV_STEP:
      const prevStepOrder: AuthStep[] = ['login', 'signup', 'verify-otp', 'profile-setup', 'forgot-password', 'reset-password'];
      const prevCurrentIndex = prevStepOrder.indexOf(state.currentStep);
      const prevIndex = prevCurrentIndex > 0 ? prevCurrentIndex - 1 : 0;
      return {
        ...state,
        currentStep: prevStepOrder[prevIndex],
      };

    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
