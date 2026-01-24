import React, { useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppRedux';
import { 
  emailSignup,
  emailLogin,
  confirmEmail,
  completeProfile,
  forgotPassword,
  resetPassword,
  resendEmailConfirmation,
} from '../../actions';
import type { AuthStep, UserRole } from '../../types';
import { Login } from '../Login';
import { Signup } from '../Signup';
import { VerifyOTP } from '../VerifyOTP';
import { ProfileSetup } from '../ProfileSetup';
import { ForgotPassword } from '../ForgotPassword';
import { ResetPassword } from '../ResetPassword';

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [tempData, setTempData] = useState<{
    email?: string;
    signupData?: any;
    otpCode?: string;
    otpSource?: 'signup' | 'forgot-password'; // Track OTP source
  }>({});

  const navigateToStep = (step: AuthStep, data?: any) => {
    setCurrentStep(step);
    if (data) {
      setTempData(prev => ({ ...prev, ...data }));
    }
  };

  const handleLogin = async (email: string, password: string, _rememberMe: boolean) => {
    try {
      await dispatch(emailLogin({ email, password }) as any);
      // On successful login, navigate to dashboard or profile setup
      navigateToStep('profile-setup');
    } catch (error) {
      // Error is already handled by the action with toast
      // Don't rethrow to prevent page reload
    }
  };

  const handleSignup = async (data: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    role: UserRole;
  }) => {
    try {
      const [firstName, lastName] = data.fullName.split(' ');
      await dispatch(emailSignup({
        email: data.email,
        password: data.password,
        firstName: firstName || '',
        lastName: lastName || '',
        roleId: data.role||'student',
      }) as any);
      
      // Store signup data and navigate to OTP verification
      navigateToStep('verify-otp', { 
        email: data.email, 
        signupData: data, 
        otpSource: 'signup' 
      });
    } catch (error) {
      // Error is already handled by the action with toast
      // Don't rethrow to prevent page reload
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      
        await dispatch(confirmEmail({
          email: tempData.email || '',
          confirmationCode: otp,
        }) as any);
        
        // Store the OTP for potential use
        setTempData(prev => ({ ...prev, otpCode: otp }));
        
        // Navigate to profile setup
        navigateToStep('profile-setup');
      
    } catch (error) {
      // Error is already handled by the action with toast
      // Don't rethrow to prevent page reload
    }
  };

  const handleProfileSetup = async (_data: {
    schoolName: string;
    grades: string[];
    subjects: string[];
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    preferences: string[];
  }) => {
    try {
      const signupData = tempData.signupData;
      const [firstName, lastName] = (signupData?.fullName || '').split(' ');
      
      await dispatch(completeProfile({
        firstName: firstName || '',
        lastName: lastName || '',
        email: signupData?.email || tempData.email || '',
        phone: signupData?.mobile || '',
        roleId: signupData?.role || 'student',
        status: 'active',
        preferences: {
          language: 'en',
          ttsEnabled: false,
        },
        notificationPrefs: {
          email: true,
          push: true,
        },
      }) as any);
      
      // Profile setup completed - user should now be authenticated
    } catch (error) {
      // Error is already handled by the action with toast
      // Don't rethrow to prevent page reload
    }
  };

  const handleForgotPassword = async (emailOrMobile: string) => {
    try {
      await dispatch(forgotPassword({ email: emailOrMobile }) as any);
      // Navigate directly to reset password screen after successful OTP send
      navigateToStep('reset-password', { 
        email: emailOrMobile, 
        otpSource: 'forgot-password' 
      });
    } catch (error) {
      // Error is already handled by the action with toast
      // Don't rethrow to prevent page reload
    }
  };

  const handleResetPassword = async (newPassword: string, _confirmPassword: string, otp: string) => {
    try {
      await dispatch(resetPassword({
        email: tempData.email || '',
        newPassword,
        confirmationCode: otp,
      }) as any);
      
      // Navigate back to login
      navigateToStep('login');
    } catch (error) {
      // Error is already handled by the action with toast
      // Don't rethrow to prevent page reload
    }
  };

  const handleResendOTP = async () => {
    try {
      const otpSource = tempData.otpSource || 'signup';
      
      if (otpSource === 'signup') {
        // Resend signup confirmation code
        await dispatch(resendEmailConfirmation({
          email: tempData.email || '',
        }) as any);
      } else {
        // Resend forgot password OTP by calling forgot password again
        await dispatch(forgotPassword({
          email: tempData.email || '',
        }) as any);
      }
    } catch (error) {
      // Error is already handled by the action with toast
      // Don't rethrow to prevent page reload
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return (
          <Login
            onLogin={handleLogin}
            onSignup={() => navigateToStep('signup')}
            onForgotPassword={() => navigateToStep('forgot-password')}
          />
        );

      case 'signup':
        return (
          <Signup
            onSignup={handleSignup}
            onLogin={() => navigateToStep('login')}
          />
        );

      case 'verify-otp':
        return (
          <VerifyOTP
            email={tempData.email || 'user@example.com'}
            source={tempData.otpSource || 'signup'}
            onVerify={handleVerifyOTP}
            onBackToLogin={() => navigateToStep('login')}
            onResendOTP={handleResendOTP}
          />
        );

      case 'profile-setup':
        return (
          <ProfileSetup
            onComplete={handleProfileSetup}
            onSkip={() => {
              // Profile setup skipped
            }}
          />
        );

      case 'forgot-password':
        return (
          <ForgotPassword
            onSendOTP={handleForgotPassword}
            onBackToLogin={() => navigateToStep('login')}
          />
        );

      case 'reset-password':
        return (
          <ResetPassword
            onResetPassword={handleResetPassword}
            onBackToLogin={() => navigateToStep('login')}
            onResendOTP={handleResendOTP}
          />
        );

      default:
        return (
          <Login
            onLogin={handleLogin}
            onSignup={() => navigateToStep('signup')}
            onForgotPassword={() => navigateToStep('forgot-password')}
          />
        );
    }
  };

  return <>{renderCurrentStep()}</>;
};