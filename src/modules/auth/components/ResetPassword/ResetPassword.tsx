import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import {
  Container,
  Header,
  LogoContainer,
  LogoIcon,
  LogoText,
  HeaderActions,
  HelpButton,
  LoginButton,
  Main,
  FormContainer,
  FormContent,
  HeaderSection,
  Title,
  Description,
  Form,
  FormGroup,
  FormLabel,
  InputContainer,
  FormInput,
  PasswordInputContainer,
  PasswordInput,
  PasswordToggle,
  StrengthMeter,
  StrengthHeader,
  StrengthTitle,
  StrengthPercentage,
  StrengthBar,
  StrengthFill,
  StrengthHint,
  SubmitButton,
  SecondaryAction,
  BackLink,
  Footer,
} from './ResetPassword.styles';

interface ResetPasswordProps {
  onResetPassword: (newPassword: string, confirmPassword: string) => void;
  onBackToLogin: () => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ 
  onResetPassword, 
  onBackToLogin 
}) => {
  const [formData, setFormData] = useState({
    newPassword: 'SecurePass123!',
    confirmPassword: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (formData.newPassword && formData.confirmPassword) {
      try {
        await onResetPassword(formData.newPassword, formData.confirmPassword);
      } catch (error) {
        // Error is already handled by the action with toast
      }
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
              <Description>Enter a new, strong password to secure your account.</Description>
            </HeaderSection>

            <Form onSubmit={handleSubmit}>
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
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </PasswordToggle>
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
                <InputContainer>
                  <FormInput
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </InputContainer>
              </FormGroup>

              <div style={{ paddingTop: '1rem' }}>
                <SubmitButton type="submit">
                  <span>Update Password</span>
                  <LockClosedIcon className="w-4 h-4" />
                </SubmitButton>
              </div>

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