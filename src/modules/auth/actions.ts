/**
 * Auth Module Actions
 */

import type { 
  LoginPayload, 
  User, 
  UserRole,
  EmailSignupRequest,
  EmailSignupResponse,
  EmailLoginRequest,
  EmailLoginResponse,
  ConfirmEmailRequest,
  ConfirmEmailResponse,
  ProfileCompletionRequest,
  ProfileCompletionResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ForgotPasswordVerifyOTPRequest,
  ForgotPasswordVerifyOTPResponse,
  ForgotPasswordConfirmPasswordRequest,
  ForgotPasswordConfirmPasswordResponse,
  ResendEmailConfirmationRequest,
  ResendEmailConfirmationResponse,
} from './types';
import { api, authTokenManager } from '../../utils/api';
import toast from 'react-hot-toast';

// Action Types
export const AUTH_LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const AUTH_LOGOUT = 'auth/LOGOUT';
export const AUTH_SET_CREDENTIALS = 'auth/SET_CREDENTIALS';
export const AUTH_SELECT_ROLE = 'auth/SELECT_ROLE';
export const AUTH_NEXT_STEP = 'auth/NEXT_STEP';
export const AUTH_PREV_STEP = 'auth/PREV_STEP';
export const AUTH_CLEAR_ERROR = 'auth/CLEAR_ERROR';

// New action types for API integration
export const AUTH_SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
export const AUTH_SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export const AUTH_SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE';
export const AUTH_CONFIRM_EMAIL_REQUEST = 'auth/CONFIRM_EMAIL_REQUEST';
export const AUTH_CONFIRM_EMAIL_SUCCESS = 'auth/CONFIRM_EMAIL_SUCCESS';
export const AUTH_CONFIRM_EMAIL_FAILURE = 'auth/CONFIRM_EMAIL_FAILURE';
export const AUTH_PROFILE_COMPLETION_REQUEST = 'auth/PROFILE_COMPLETION_REQUEST';
export const AUTH_PROFILE_COMPLETION_SUCCESS = 'auth/PROFILE_COMPLETION_SUCCESS';
export const AUTH_PROFILE_COMPLETION_FAILURE = 'auth/PROFILE_COMPLETION_FAILURE';
export const AUTH_FORGOT_PASSWORD_REQUEST = 'auth/FORGOT_PASSWORD_REQUEST';
export const AUTH_FORGOT_PASSWORD_SUCCESS = 'auth/FORGOT_PASSWORD_SUCCESS';
export const AUTH_FORGOT_PASSWORD_FAILURE = 'auth/FORGOT_PASSWORD_FAILURE';
export const AUTH_RESET_PASSWORD_REQUEST = 'auth/RESET_PASSWORD_REQUEST';
export const AUTH_RESET_PASSWORD_SUCCESS = 'auth/RESET_PASSWORD_SUCCESS';
export const AUTH_RESET_PASSWORD_FAILURE = 'auth/RESET_PASSWORD_FAILURE';
export const AUTH_SET_STEP = 'auth/SET_STEP';

// New action types for forgot password OTP flow
export const AUTH_FORGOT_PASSWORD_VERIFY_OTP_REQUEST = 'auth/FORGOT_PASSWORD_VERIFY_OTP_REQUEST';
export const AUTH_FORGOT_PASSWORD_VERIFY_OTP_SUCCESS = 'auth/FORGOT_PASSWORD_VERIFY_OTP_SUCCESS';
export const AUTH_FORGOT_PASSWORD_VERIFY_OTP_FAILURE = 'auth/FORGOT_PASSWORD_VERIFY_OTP_FAILURE';
export const AUTH_FORGOT_PASSWORD_CONFIRM_PASSWORD_REQUEST = 'auth/FORGOT_PASSWORD_CONFIRM_PASSWORD_REQUEST';
export const AUTH_FORGOT_PASSWORD_CONFIRM_PASSWORD_SUCCESS = 'auth/FORGOT_PASSWORD_CONFIRM_PASSWORD_SUCCESS';
export const AUTH_FORGOT_PASSWORD_CONFIRM_PASSWORD_FAILURE = 'auth/FORGOT_PASSWORD_CONFIRM_PASSWORD_FAILURE';
export const AUTH_RESEND_EMAIL_CONFIRMATION_REQUEST = 'auth/RESEND_EMAIL_CONFIRMATION_REQUEST';
export const AUTH_RESEND_EMAIL_CONFIRMATION_SUCCESS = 'auth/RESEND_EMAIL_CONFIRMATION_SUCCESS';
export const AUTH_RESEND_EMAIL_CONFIRMATION_FAILURE = 'auth/RESEND_EMAIL_CONFIRMATION_FAILURE';

// Action interfaces
export interface LoginRequestAction {
  type: typeof AUTH_LOGIN_REQUEST;
  payload: LoginPayload;
}

export interface LoginSuccessAction {
  type: typeof AUTH_LOGIN_SUCCESS;
  payload: User;
}

export interface LoginFailureAction {
  type: typeof AUTH_LOGIN_FAILURE;
  payload: string;
}

export interface LogoutAction {
  type: typeof AUTH_LOGOUT;
}

export interface SetCredentialsAction {
  type: typeof AUTH_SET_CREDENTIALS;
  payload: LoginPayload;
}

export interface SelectRoleAction {
  type: typeof AUTH_SELECT_ROLE;
  payload: UserRole;
}

export interface NextStepAction {
  type: typeof AUTH_NEXT_STEP;
}

export interface PrevStepAction {
  type: typeof AUTH_PREV_STEP;
}

export interface ClearErrorAction {
  type: typeof AUTH_CLEAR_ERROR;
}

// New action interfaces
export interface SignupRequestAction {
  type: typeof AUTH_SIGNUP_REQUEST;
  payload: EmailSignupRequest;
}

export interface SignupSuccessAction {
  type: typeof AUTH_SIGNUP_SUCCESS;
  payload: EmailSignupResponse;
}

export interface SignupFailureAction {
  type: typeof AUTH_SIGNUP_FAILURE;
  payload: string;
}

export interface ConfirmEmailRequestAction {
  type: typeof AUTH_CONFIRM_EMAIL_REQUEST;
  payload: ConfirmEmailRequest;
}

export interface ConfirmEmailSuccessAction {
  type: typeof AUTH_CONFIRM_EMAIL_SUCCESS;
  payload: ConfirmEmailResponse;
}

export interface ConfirmEmailFailureAction {
  type: typeof AUTH_CONFIRM_EMAIL_FAILURE;
  payload: string;
}

export interface ProfileCompletionRequestAction {
  type: typeof AUTH_PROFILE_COMPLETION_REQUEST;
  payload: ProfileCompletionRequest;
}

export interface ProfileCompletionSuccessAction {
  type: typeof AUTH_PROFILE_COMPLETION_SUCCESS;
  payload: ProfileCompletionResponse;
}

export interface ProfileCompletionFailureAction {
  type: typeof AUTH_PROFILE_COMPLETION_FAILURE;
  payload: string;
}

export interface ForgotPasswordRequestAction {
  type: typeof AUTH_FORGOT_PASSWORD_REQUEST;
  payload: ForgotPasswordRequest;
}

export interface ForgotPasswordSuccessAction {
  type: typeof AUTH_FORGOT_PASSWORD_SUCCESS;
  payload: ForgotPasswordResponse;
}

export interface ForgotPasswordFailureAction {
  type: typeof AUTH_FORGOT_PASSWORD_FAILURE;
  payload: string;
}

export interface ResetPasswordRequestAction {
  type: typeof AUTH_RESET_PASSWORD_REQUEST;
  payload: ResetPasswordRequest;
}

export interface ResetPasswordSuccessAction {
  type: typeof AUTH_RESET_PASSWORD_SUCCESS;
  payload: ResetPasswordResponse;
}

export interface ResetPasswordFailureAction {
  type: typeof AUTH_RESET_PASSWORD_FAILURE;
  payload: string;
}

export interface SetStepAction {
  type: typeof AUTH_SET_STEP;
  payload: string;
}

// New action interfaces for forgot password OTP flow
export interface ForgotPasswordVerifyOTPRequestAction {
  type: typeof AUTH_FORGOT_PASSWORD_VERIFY_OTP_REQUEST;
  payload: ForgotPasswordVerifyOTPRequest;
}

export interface ForgotPasswordVerifyOTPSuccessAction {
  type: typeof AUTH_FORGOT_PASSWORD_VERIFY_OTP_SUCCESS;
  payload: ForgotPasswordVerifyOTPResponse;
}

export interface ForgotPasswordVerifyOTPFailureAction {
  type: typeof AUTH_FORGOT_PASSWORD_VERIFY_OTP_FAILURE;
  payload: string;
}

export interface ForgotPasswordConfirmPasswordRequestAction {
  type: typeof AUTH_FORGOT_PASSWORD_CONFIRM_PASSWORD_REQUEST;
  payload: ForgotPasswordConfirmPasswordRequest;
}

export interface ForgotPasswordConfirmPasswordSuccessAction {
  type: typeof AUTH_FORGOT_PASSWORD_CONFIRM_PASSWORD_SUCCESS;
  payload: ForgotPasswordConfirmPasswordResponse;
}

export interface ForgotPasswordConfirmPasswordFailureAction {
  type: typeof AUTH_FORGOT_PASSWORD_CONFIRM_PASSWORD_FAILURE;
  payload: string;
}

export interface ResendEmailConfirmationRequestAction {
  type: typeof AUTH_RESEND_EMAIL_CONFIRMATION_REQUEST;
  payload: ResendEmailConfirmationRequest;
}

export interface ResendEmailConfirmationSuccessAction {
  type: typeof AUTH_RESEND_EMAIL_CONFIRMATION_SUCCESS;
  payload: ResendEmailConfirmationResponse;
}

export interface ResendEmailConfirmationFailureAction {
  type: typeof AUTH_RESEND_EMAIL_CONFIRMATION_FAILURE;
  payload: string;
}

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | SetCredentialsAction
  | SelectRoleAction
  | NextStepAction
  | PrevStepAction
  | ClearErrorAction
  | SignupRequestAction
  | SignupSuccessAction
  | SignupFailureAction
  | ConfirmEmailRequestAction
  | ConfirmEmailSuccessAction
  | ConfirmEmailFailureAction
  | ProfileCompletionRequestAction
  | ProfileCompletionSuccessAction
  | ProfileCompletionFailureAction
  | ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailureAction
  | SetStepAction
  | ForgotPasswordVerifyOTPRequestAction
  | ForgotPasswordVerifyOTPSuccessAction
  | ForgotPasswordVerifyOTPFailureAction
  | ForgotPasswordConfirmPasswordRequestAction
  | ForgotPasswordConfirmPasswordSuccessAction
  | ForgotPasswordConfirmPasswordFailureAction
  | ResendEmailConfirmationRequestAction
  | ResendEmailConfirmationSuccessAction
  | ResendEmailConfirmationFailureAction;

// Basic Action creators
export const loginRequest = (payload: LoginPayload): LoginRequestAction => ({
  type: AUTH_LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: User): LoginSuccessAction => ({
  type: AUTH_LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: string): LoginFailureAction => ({
  type: AUTH_LOGIN_FAILURE,
  payload,
});

export const logout = (): LogoutAction => ({
  type: AUTH_LOGOUT,
});

export const setCredentials = (payload: LoginPayload): SetCredentialsAction => ({
  type: AUTH_SET_CREDENTIALS,
  payload,
});

export const selectRole = (payload: UserRole): SelectRoleAction => ({
  type: AUTH_SELECT_ROLE,
  payload,
});

export const nextStep = (): NextStepAction => ({
  type: AUTH_NEXT_STEP,
});

export const prevStep = (): PrevStepAction => ({
  type: AUTH_PREV_STEP,
});

export const clearError = (): ClearErrorAction => ({
  type: AUTH_CLEAR_ERROR,
});

export const setStep = (step: string): SetStepAction => ({
  type: AUTH_SET_STEP,
  payload: step,
});

// New action creators for forgot password OTP flow
export const forgotPasswordVerifyOTPRequest = (payload: ForgotPasswordVerifyOTPRequest): ForgotPasswordVerifyOTPRequestAction => ({
  type: AUTH_FORGOT_PASSWORD_VERIFY_OTP_REQUEST,
  payload,
});

export const forgotPasswordVerifyOTPSuccess = (payload: ForgotPasswordVerifyOTPResponse): ForgotPasswordVerifyOTPSuccessAction => ({
  type: AUTH_FORGOT_PASSWORD_VERIFY_OTP_SUCCESS,
  payload,
});

export const forgotPasswordVerifyOTPFailure = (payload: string): ForgotPasswordVerifyOTPFailureAction => ({
  type: AUTH_FORGOT_PASSWORD_VERIFY_OTP_FAILURE,
  payload,
});

export const forgotPasswordConfirmPasswordRequest = (payload: ForgotPasswordConfirmPasswordRequest): ForgotPasswordConfirmPasswordRequestAction => ({
  type: AUTH_FORGOT_PASSWORD_CONFIRM_PASSWORD_REQUEST,
  payload,
});

export const forgotPasswordConfirmPasswordSuccess = (payload: ForgotPasswordConfirmPasswordResponse): ForgotPasswordConfirmPasswordSuccessAction => ({
  type: AUTH_FORGOT_PASSWORD_CONFIRM_PASSWORD_SUCCESS,
  payload,
});

export const forgotPasswordConfirmPasswordFailure = (payload: string): ForgotPasswordConfirmPasswordFailureAction => ({
  type: AUTH_FORGOT_PASSWORD_CONFIRM_PASSWORD_FAILURE,
  payload,
});

export const resendEmailConfirmationRequest = (payload: ResendEmailConfirmationRequest): ResendEmailConfirmationRequestAction => ({
  type: AUTH_RESEND_EMAIL_CONFIRMATION_REQUEST,
  payload,
});

export const resendEmailConfirmationSuccess = (payload: ResendEmailConfirmationResponse): ResendEmailConfirmationSuccessAction => ({
  type: AUTH_RESEND_EMAIL_CONFIRMATION_SUCCESS,
  payload,
});

export const resendEmailConfirmationFailure = (payload: string): ResendEmailConfirmationFailureAction => ({
  type: AUTH_RESEND_EMAIL_CONFIRMATION_FAILURE,
  payload,
});

// API Action Creators
export const signupRequest = (payload: EmailSignupRequest): SignupRequestAction => ({
  type: AUTH_SIGNUP_REQUEST,
  payload,
});

export const signupSuccess = (payload: EmailSignupResponse): SignupSuccessAction => ({
  type: AUTH_SIGNUP_SUCCESS,
  payload,
});

export const signupFailure = (payload: string): SignupFailureAction => ({
  type: AUTH_SIGNUP_FAILURE,
  payload,
});

export const confirmEmailRequest = (payload: ConfirmEmailRequest): ConfirmEmailRequestAction => ({
  type: AUTH_CONFIRM_EMAIL_REQUEST,
  payload,
});

export const confirmEmailSuccess = (payload: ConfirmEmailResponse): ConfirmEmailSuccessAction => ({
  type: AUTH_CONFIRM_EMAIL_SUCCESS,
  payload,
});

export const confirmEmailFailure = (payload: string): ConfirmEmailFailureAction => ({
  type: AUTH_CONFIRM_EMAIL_FAILURE,
  payload,
});

export const profileCompletionRequest = (payload: ProfileCompletionRequest): ProfileCompletionRequestAction => ({
  type: AUTH_PROFILE_COMPLETION_REQUEST,
  payload,
});

export const profileCompletionSuccess = (payload: ProfileCompletionResponse): ProfileCompletionSuccessAction => ({
  type: AUTH_PROFILE_COMPLETION_SUCCESS,
  payload,
});

export const profileCompletionFailure = (payload: string): ProfileCompletionFailureAction => ({
  type: AUTH_PROFILE_COMPLETION_FAILURE,
  payload,
});

export const forgotPasswordRequest = (payload: ForgotPasswordRequest): ForgotPasswordRequestAction => ({
  type: AUTH_FORGOT_PASSWORD_REQUEST,
  payload,
});

export const forgotPasswordSuccess = (payload: ForgotPasswordResponse): ForgotPasswordSuccessAction => ({
  type: AUTH_FORGOT_PASSWORD_SUCCESS,
  payload,
});

export const forgotPasswordFailure = (payload: string): ForgotPasswordFailureAction => ({
  type: AUTH_FORGOT_PASSWORD_FAILURE,
  payload,
});

export const resetPasswordRequest = (payload: ResetPasswordRequest): ResetPasswordRequestAction => ({
  type: AUTH_RESET_PASSWORD_REQUEST,
  payload,
});

export const resetPasswordSuccess = (payload: ResetPasswordResponse): ResetPasswordSuccessAction => ({
  type: AUTH_RESET_PASSWORD_SUCCESS,
  payload,
});

export const resetPasswordFailure = (payload: string): ResetPasswordFailureAction => ({
  type: AUTH_RESET_PASSWORD_FAILURE,
  payload,
});

// Thunk Action Creators (Async API calls)

// 1. Email Signup
export const emailSignup = (signupData: EmailSignupRequest) => {
  return async (dispatch: any) => {
    try {
      dispatch(signupRequest(signupData));
      
      const response = await api.post<EmailSignupResponse>('/auth/email-signup', signupData);
      
      dispatch(signupSuccess(response));
      
      // Show success toast
      toast.success('Account created successfully! Please check your email for verification code.');
      
      // Navigate to OTP verification step
      dispatch(setStep('verify-otp'));
      
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Signup failed';
      dispatch(signupFailure(errorMessage));
      
      // Show error toast
      toast.error(errorMessage);
      
      throw error;
    }
  };
};

// 2. Email Login
export const emailLogin = (loginData: EmailLoginRequest) => {
  return async (dispatch: any) => {
    try {
      dispatch(loginRequest({ ...loginData, rememberMe: false }));
      
      const response = await api.post<EmailLoginResponse>('/auth/email-login', loginData);
      
      // Store auth token
      if (response.token) {
        authTokenManager.setToken(response.token);
      }
      
      dispatch(loginSuccess(response.user));
      
      // Show success toast
      toast.success('Login successful! Welcome back.');
      
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      
      // Show error toast
      toast.error(errorMessage);
      
      throw error;
    }
  };
};

// 3. Confirm Email OTP
export const confirmEmail = (confirmData: ConfirmEmailRequest) => {
  return async (dispatch: any) => {
    try {
      dispatch(confirmEmailRequest(confirmData));
      
      const response = await api.post<ConfirmEmailResponse>('/auth/confirm-email', confirmData);
      
      dispatch(confirmEmailSuccess(response));
      
      // Show success toast
      toast.success('Email verified successfully!');
      
      // Navigate to profile completion step
      dispatch(setStep('profile-setup'));
      
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Email confirmation failed';
      dispatch(confirmEmailFailure(errorMessage));
      
      // Show error toast
      toast.error(errorMessage);
      
      throw error;
    }
  };
};

// 4. Profile Completion
export const completeProfile = (profileData: ProfileCompletionRequest) => {
  return async (dispatch: any) => {
    try {
      dispatch(profileCompletionRequest(profileData));
      
      const response = await api.post<ProfileCompletionResponse>('/users', profileData);
      
      dispatch(profileCompletionSuccess(response));
      
      // Update user data
      dispatch(loginSuccess(response.user));
      
      // Show success toast
      toast.success('Profile completed successfully! Welcome to Test Series.');
      
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Profile completion failed';
      dispatch(profileCompletionFailure(errorMessage));
      
      // Show error toast
      toast.error(errorMessage);
      
      throw error;
    }
  };
};

// 5. Forgot Password
export const forgotPassword = (forgotData: ForgotPasswordRequest) => {
  return async (dispatch: any) => {
    try {
      dispatch(forgotPasswordRequest(forgotData));
      
      const response = await api.post<ForgotPasswordResponse>('/auth/forgot/email', forgotData);
      
      dispatch(forgotPasswordSuccess(response));
      
      // Show success toast
      toast.success('Password reset code sent to your email!');
      
      // Navigate to reset password step
      dispatch(setStep('reset-password'));
      
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Forgot password request failed';
      dispatch(forgotPasswordFailure(errorMessage));
      
      // Show error toast
      toast.error(errorMessage);
      
      throw error;
    }
  };
};

// 6. Reset Password
export const resetPassword = (resetData: ResetPasswordRequest) => {
  return async (dispatch: any) => {
    try {
      dispatch(resetPasswordRequest(resetData));
      
      const response = await api.post<ResetPasswordResponse>('/auth/forgot/email/Reset', resetData);
      
      dispatch(resetPasswordSuccess(response));
      
      // Show success toast
      toast.success('Password reset successfully! You can now login with your new password.');
      
      // Navigate back to login step
      dispatch(setStep('login'));
      
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Password reset failed';
      dispatch(resetPasswordFailure(errorMessage));
      
      // Show error toast
      toast.error(errorMessage);
      
      throw error;
    }
  };
};

// Logout action with token cleanup
export const logoutUser = () => {
  return (dispatch: any) => {
    authTokenManager.removeToken();
    dispatch(logout());
  };
};

// 9. Resend Email Confirmation Code
export const resendEmailConfirmation = (resendData: ResendEmailConfirmationRequest) => {
  return async (dispatch: any) => {
    try {
      dispatch(resendEmailConfirmationRequest(resendData));
      
      const response = await api.post<ResendEmailConfirmationResponse>('/auth/resend/email/confirmationCode', resendData);
      
      dispatch(resendEmailConfirmationSuccess(response));
      
      // Show success toast
      toast.success('Verification code sent successfully! Please check your email.');
      
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to resend verification code';
      dispatch(resendEmailConfirmationFailure(errorMessage));
      
      // Show error toast
      toast.error(errorMessage);
      
      throw error;
    }
  };
};
