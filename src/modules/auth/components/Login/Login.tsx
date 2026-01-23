import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../../../hooks/useAppRedux';
import { selectLoading, selectError } from '../../selectors';
import {
  Container,
  Header,
  LogoContainer,
  LogoIcon,
  LogoText,
  Main,
  FormContainer,
  FormHeader,
  FormTitle,
  FormDescription,
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  PasswordContainer,
  PasswordToggle,
  FormControls,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
  ForgotLink,
  SubmitButton,
  Divider,
  DividerText,
  SocialButtons,
  SocialButton,
  SocialIcon,
  SocialText,
  SignupSection,
  SignupText,
  SignupLink,
  Footer,
  FooterText,
  FooterLinks,
  FooterLink,
} from './Login.styles';

interface LoginProps {
  onForgotPassword: () => void;
  onSignup: () => void;
  onLogin: (email: string, password: string, rememberMe: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ onForgotPassword, onSignup, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (email && password && !loading) {
      try {
        await onLogin(email, password, rememberMe);
      } catch (error) {
        // Error is already handled by the action with toast
      }
    }
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
      </Header>

      <Main>
        <FormContainer>
          <FormHeader>
            <FormTitle>Welcome back</FormTitle>
            <FormDescription>Please enter your details to sign in to your account.</FormDescription>
          </FormHeader>

          {error && (
            <div style={{ 
              backgroundColor: '#fee2e2', 
              color: '#dc2626', 
              padding: '0.75rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Email / Mobile</FormLabel>
              <FormInput
                type="text"
                placeholder="Enter your email or mobile number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Password</FormLabel>
              <PasswordContainer>
                <FormInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </PasswordToggle>
              </PasswordContainer>
            </FormGroup>

            <FormControls>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <CheckboxLabel>Remember Me</CheckboxLabel>
              </CheckboxContainer>
              <ForgotLink href="#" onClick={(e) => { e.preventDefault(); onForgotPassword(); }}>
                Forgot Password?
              </ForgotLink>
            </FormControls>

            <SubmitButton type="submit" disabled={!email || !password || loading}>
              {loading ? 'Signing in...' : 'Login'}
            </SubmitButton>
          </Form>

          <SignupSection>
            <SignupText>
              Don't have an account?
              <SignupLink href="#" onClick={(e) => { e.preventDefault(); onSignup(); }}>
                Create Account
              </SignupLink>
            </SignupText>
          </SignupSection>

          <Divider>
            <DividerText>Or continue with</DividerText>
          </Divider>

          <SocialButtons>
            <SocialButton type="button" disabled={loading}>
              <SocialIcon
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAppcGhXkKZnuRatkgf9P-1c41ufzoO6pIXqBlerp2jZJDZLNRzlo4fPwSUYEGBR_rF5ixOZ1KHFecPl1_VXO22zETWbBJ6F0NBO8MY7Gnt_MQicN07bioMgJ1dVGvTG-c5B-EYx62NTbQtFSUrzESQrmLgLkodW9KoG_EsLMPZTfdKx9K-ia-56MnQRwQM6rm43UhkH7mriE0KY1v9JCWb9Jic1VkQpHj3FbFNnat5gNPPxfH3fzaS9KDno4DxBcPrZ___88zUIYU"
                alt="Google logo"
              />
              <SocialText>Google</SocialText>
            </SocialButton>
            <SocialButton type="button" disabled={loading}>
              <SocialIcon
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB008Wux6iDrMCyJbS3q4aaN9lxXbCRCBe_rjLTuyBNFgbmTBNDFAGnj-FGtITI6Eo5gPRC_7owuYf4y3pU9Tp8_T5LGFyBChev3w_5Elu7CqEJowAgY9OOuGYfKaDgroGQ3HhxTw_vYd3fz5_yjUvQHr28V4Xuhi1Dq9iU7cKzV8CoKOtz9gpUyV3MaIKpiyDh2bwDVJ5OWwkMlxAKiTVsk54cs3YjKD_bIwEqz1zguuBzMEtYt1DVF-75Vvadod1ptnbHIu-VV-8"
                alt="Microsoft logo"
              />
              <SocialText>Microsoft</SocialText>
            </SocialButton>
          </SocialButtons>
        </FormContainer>
      </Main>

      <Footer>
        <FooterText>© 2024 Test Series EdTech Platform. All rights reserved.</FooterText>
        <FooterLinks>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Help Center</FooterLink>
        </FooterLinks>
      </Footer>
    </Container>
  );
};