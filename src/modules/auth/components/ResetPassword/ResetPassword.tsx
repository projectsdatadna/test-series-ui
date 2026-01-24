import React, { useState, useRef, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { BackLink, Container, Description, Divider, Footer, Form, FormContainer, FormContent, FormGroup, FormLabel, Header, HeaderActions, HeaderSection, HelpButton, LoginButton, LogoContainer, LogoIcon, LogoText, Main, OTPContainer, OTPInput, PasswordInput, PasswordInputContainer, PasswordToggleButton, ResendButton, SecondaryAction, StrengthBar, StrengthFill, StrengthHeader, StrengthHint, StrengthMeter, StrengthPercentage, StrengthTitle, SubmitButton, TimerSection, TimerText, Title } from './ResetPassword.styles';


interface ResetPasswordProps {
  onResetPassword: (newPassword: string, confirmPassword: string, otp: string) => void;
  onBackToLogin: () => void;
  onResendOTP?: () => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ 
  onResetPassword, 
  onBackToLogin,
  onResendOTP,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(115); // 1:55
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);
  const strengthLabel = passwordStrength >= 75 ? 'Strong' : passwordStrength >= 50 ? 'Medium' : passwordStrength >= 25 ? 'Fair' : 'Weak';

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const otpString = otp.join('');
    if (formData.newPassword && formData.confirmPassword && otpString.length === 6) {
      try {
        await onResetPassword(formData.newPassword, formData.confirmPassword, otpString);
      } catch (error) {
        // Error is already handled by the action with toast
      }
    }
  };

  const handleResend = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (timeLeft === 0 && onResendOTP) {
      onResendOTP();
      setTimeLeft(115);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container>
      <Header>
        <LogoContainer>
          <LogoIcon>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
            </svg>
          </LogoIcon>
          <LogoText>Test Series</LogoText>
        </LogoContainer>
        <HeaderActions>
          <HelpButton>Help Center</HelpButton>
          <LoginButton onClick={onBackToLogin}>Login</LoginButton>
        </HeaderActions>
      </Header>

      <Main>
        <FormContainer>
          <FormContent>
            <HeaderSection>
              <Title>Reset Your Password</Title>
              <Description>Verify your identity and set a new password.</Description>
            </HeaderSection>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Verification Code</FormLabel>
                <OTPContainer>
                  {otp.map((digit, index) => (
                    <OTPInput
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      autoFocus={index === 0}
                    />
                  ))}
                </OTPContainer>
                <TimerSection>
                  <TimerText>
                    Didn't receive the code?
                  </TimerText>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#111318', fontWeight: 'bold' }}>
                      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                    </span>
                    <ResendButton 
                      type="button"
                      disabled={timeLeft > 0}
                      onClick={handleResend}
                    >
                      Resend Code
                    </ResendButton>
                  </div>
                </TimerSection>
              </FormGroup>

              <Divider />

              <FormGroup>
                <FormLabel>New Password</FormLabel>
                <PasswordInputContainer>
                  <PasswordInput
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    required
                  />
                  <PasswordToggleButton
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </PasswordToggleButton>
                </PasswordInputContainer>
              </FormGroup>

              {formData.newPassword && (
                <StrengthMeter>
                  <StrengthHeader>
                    <StrengthTitle>Strength</StrengthTitle>
                    <StrengthPercentage>{passwordStrength}% - {strengthLabel}</StrengthPercentage>
                  </StrengthHeader>
                  <StrengthBar>
                    <StrengthFill width={passwordStrength} />
                  </StrengthBar>
                  <StrengthHint>
                    Hint: Use uppercase, lowercase, numbers and symbols for better security.
                  </StrengthHint>
                </StrengthMeter>
              )}

              <FormGroup>
                <FormLabel>Confirm New Password</FormLabel>
                <PasswordInputContainer>
                  <PasswordInput
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </PasswordInputContainer>
              </FormGroup>

              <SubmitButton type="submit">
                <span>Update Password</span>
                <span style={{ fontSize: '1.125rem' }}>🔐</span>
              </SubmitButton>

              <SecondaryAction>
                <BackLink href="#" onClick={(e) => { e.preventDefault(); onBackToLogin(); }}>
                  <ArrowLeftIcon className="w-4 h-4" />
                  Back to Login
                </BackLink>
              </SecondaryAction>
            </Form>
          </FormContent>
        </FormContainer>
      </Main>

      <Footer>
        © 2024 Test Series EdTech Platform. All rights reserved.
      </Footer>
    </Container>
  );
};