import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, AcademicCapIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import type { UserRole } from '../../types';
import {
  Container,
  Header,
  HeaderContent,
  LogoContainer,
  LogoIcon,
  LogoText,
  HeaderActions,
  HeaderText,
  LoginButton,
  Main,
  FormContainer,
  FormHeader,
  FormTitle,
  FormDescription,
  Form,
  RoleSection,
  RoleTitle,
  RoleGrid,
  RoleOption,
  RoleInput,
  RoleIcon,
  RoleLabel,
  InputSection,
  FormGroup,
  FormLabel,
  InputContainer,
  FormInput,
  InputIcon,
  MobileContainer,
  CountryCode,
  MobileInput,
  PasswordContainer,
  PasswordToggle,
  PasswordStrength,
  StrengthMeter,
  StrengthBar,
  StrengthText,
  StrengthLabel,
  PrivacyText,
  PrivacyLink,
  SubmitButton,
  LoginSection,
  LoginText,
  LoginLink,
  Footer,
  FooterText,
} from './Signup.styles';

interface SignupProps {
  onLogin: () => void;
  onSignup: (data: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    role: UserRole;
  }) => void;
}

export const Signup: React.FC<SignupProps> = ({ onLogin, onSignup }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    role: 'student' as UserRole,
  });
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Weak', 'Fair', 'Medium', 'Strong'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (formData.fullName && formData.email && formData.mobile && formData.password) {
      try {
        await onSignup(formData);
      } catch (error) {
        // Error is already handled by the action with toast
      }
    }
  };

  const handleInputChange = (field: string, value: string | UserRole) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoContainer>
            <LogoIcon>
              <AcademicCapIcon className="w-5 h-5" />
            </LogoIcon>
            <LogoText>Test Series AI</LogoText>
          </LogoContainer>
          <HeaderActions>
            <HeaderText>Already have an account?</HeaderText>
            <LoginButton onClick={onLogin}>Login</LoginButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <Main>
        <FormContainer>
          <FormHeader>
            <FormTitle>Create your account</FormTitle>
            <FormDescription>Join the next generation AI learning platform</FormDescription>
          </FormHeader>

          <Form onSubmit={handleSubmit}>
            <RoleSection>
              <RoleTitle>I am a...</RoleTitle>
              <RoleGrid>
                <RoleOption>
                  <RoleInput
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={(e) => handleInputChange('role', e.target.value as UserRole)}
                  />
                  <RoleIcon>
                    <UserIcon className="w-6 h-6" />
                  </RoleIcon>
                  <RoleLabel>Student</RoleLabel>
                </RoleOption>
                <RoleOption>
                  <RoleInput
                    type="radio"
                    name="role"
                    value="teacher"
                    checked={formData.role === 'teacher'}
                    onChange={(e) => handleInputChange('role', e.target.value as UserRole)}
                  />
                  <RoleIcon>
                    <AcademicCapIcon className="w-6 h-6" />
                  </RoleIcon>
                  <RoleLabel>Teacher</RoleLabel>
                </RoleOption>
                <RoleOption>
                  <RoleInput
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={(e) => handleInputChange('role', e.target.value as UserRole)}
                  />
                  <RoleIcon>
                    <ShieldCheckIcon className="w-6 h-6" />
                  </RoleIcon>
                  <RoleLabel>Admin</RoleLabel>
                </RoleOption>
              </RoleGrid>
            </RoleSection>

            <InputSection>
              <FormGroup>
                <FormLabel>Full Name</FormLabel>
                <InputContainer>
                  <FormInput
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                  <InputIcon>
                    <UserIcon className="w-5 h-5" />
                  </InputIcon>
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <InputContainer>
                  <FormInput
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  <InputIcon>
                    <EnvelopeIcon className="w-5 h-5" />
                  </InputIcon>
                </InputContainer>
              </FormGroup>

              <FormGroup>
                <FormLabel>Mobile Number</FormLabel>
                <MobileContainer>
                  <CountryCode>+1</CountryCode>
                  <MobileInput
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    required
                  />
                </MobileContainer>
              </FormGroup>

              <FormGroup>
                <FormLabel>Password</FormLabel>
                <PasswordContainer>
                  <FormInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </PasswordToggle>
                </PasswordContainer>
                {formData.password && (
                  <PasswordStrength>
                    <StrengthMeter>
                      {[1, 2, 3, 4].map((level) => (
                        <StrengthBar key={level} active={passwordStrength >= level} />
                      ))}
                    </StrengthMeter>
                    <StrengthText>
                      Strength: <StrengthLabel>{strengthLabels[passwordStrength - 1] || 'Weak'}</StrengthLabel> (Use numbers & symbols)
                    </StrengthText>
                  </PasswordStrength>
                )}
              </FormGroup>
            </InputSection>

            <PrivacyText>
              By clicking "Create Account", you agree to our{' '}
              <PrivacyLink href="#">Terms of Service</PrivacyLink> and{' '}
              <PrivacyLink href="#">Privacy Policy</PrivacyLink>.
            </PrivacyText>

            <SubmitButton type="submit">Create Account</SubmitButton>

            <LoginSection>
              <LoginText>
                Already have an account?{' '}
                <LoginLink href="#" onClick={(e) => { e.preventDefault(); onLogin(); }}>
                  Login
                </LoginLink>
              </LoginText>
            </LoginSection>
          </Form>
        </FormContainer>
      </Main>

      <Footer>
        <FooterText>© 2024 Test Series AI. All rights reserved.</FooterText>
      </Footer>
    </Container>
  );
};