/**
 * Auth Module Types
 */

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  status?: string;
  preferences?: {
    language: string;
    ttsEnabled: boolean;
  };
  notificationPrefs?: {
    email: boolean;
    push: boolean;
  };
}

export type AuthStep = 'login' | 'signup' | 'verify-otp' | 'profile-setup' | 'forgot-password' | 'reset-password';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  userId?: string;
  roleId?: UserRole;
  loading: boolean;
  error: string | null;
  currentStep: AuthStep;
  credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  selectedRole: UserRole | null;
  signupData: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    role: UserRole | null;
  };
  otpData: {
    code: string;
    email: string;
    timeLeft: number;
  };
  profileData: {
    schoolName: string;
    grades: string[];
    subjects: string[];
    experienceLevel: 'beginner' | 'intermediate' | 'advanced' | null;
    preferences: string[];
  };
}

// API Request/Response Types
export interface EmailSignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId:UserRole;
}

export interface EmailSignupResponse {
  message: string;
  success: boolean;
  confirmationRequired?: boolean;
  email?: string;
  userId?: string;
  data?: {
    userId: string;
    email: string;
  };
}

export interface EmailLoginRequest {
  email: string;
  password: string;
}

export interface EmailLoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    access_token_expires_at: string;
    id_token: string;
    id_token_expires_at: string;
    refresh_token: string;
    refresh_token_expires_at: string;
    token_type: string;
    expires_in: number;
    session: {
      session_id: string;
      created_at: string;
    };
    token_validity: {
      access_token_days: number;
      id_token_days: number;
      refresh_token_days: number;
    };
    user: {
      user_id: string;
      email: string;
      given_name?: string;
      family_name?: string;
      name?: string;
      email_verified?: boolean;
      custom?: {
        role_id: string;
      };
    };
  };
}

export interface ConfirmEmailRequest {
  email: string;
  confirmationCode: string;
}

export interface ConfirmEmailResponse {
  message: string;
  verified: boolean;
}

export interface ProfileCompletionRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleId: string;
  status: string;
  preferences: {
    language: string;
    ttsEnabled: boolean;
  };
  notificationPrefs: {
    email: boolean;
    push: boolean;
  };
}

export interface ProfileCompletionResponse {
  message: string;
  user?: User;
  success?: boolean;
  data?: {
    profileSetupId: string;
    userId: string;
    roleId: string;
    schoolName: string;
    grades: string[];
    subjects: string[];
    experienceLevel: string;
    preferences: string[];
    created_at: string;
  };
  roleId?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  otpSent: boolean;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  confirmationCode: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

// New types for forgot password OTP verification
export interface ForgotPasswordVerifyOTPRequest {
  email: string;
  confirmationCode: string;
}

export interface ForgotPasswordVerifyOTPResponse {
  message: string;
  verified: boolean;
}

export interface ForgotPasswordConfirmPasswordRequest {
  email: string;
  newPassword: string;
  confirmationCode: string;
}

export interface ForgotPasswordConfirmPasswordResponse {
  message: string;
  success: boolean;
}

export interface ResendEmailConfirmationRequest {
  email: string;
}

export interface ResendEmailConfirmationResponse {
  message: string;
  otpSent: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RoleSelectionPayload {
  role: UserRole;
}
