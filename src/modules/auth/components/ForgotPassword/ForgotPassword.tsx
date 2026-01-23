import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import {
  Container,
  Header,
  HeaderContent,
  LogoContainer,
  LogoIcon,
  LogoText,
  SignInButton,
  Main,
  FormContainer,
  IconContainer,
  IconWrapper,
  HeaderSection,
  Title,
  Description,
  Form,
  FormGroup,
  FormLabel,
  InputContainer,
  InputIcon,
  FormInput,
  SubmitButton,
  ButtonText,
  ButtonIcon,
  NavigationSection,
  BackLink,
  BackIcon,
  Footer,
  FooterText,
} from './ForgotPassword.styles';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
  onSendOTP: (emailOrMobile: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ 
  onBackToLogin, 
  onSendOTP 
}) => {
  const [emailOrMobile, setEmailOrMobile] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (emailOrMobile.trim()) {
      try {
        await onSendOTP(emailOrMobile);
      } catch (error) {
        // Error is already handled by the action with toast
      }
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoContainer>
            <LogoIcon>
              <BookOpenIcon className="w-5 h-5" />
            </LogoIcon>
            <LogoText>Test Series EdTech</LogoText>
          </LogoContainer>
          <SignInButton href="#" onClick={(e) => { e.preventDefault(); onBackToLogin(); }}>
            Sign In
          </SignInButton>
        </HeaderContent>
      </Header>

      <Main>
        <FormContainer>
          <IconContainer>
            <IconWrapper>
              <LockClosedIcon className="w-8 h-8" />
            </IconWrapper>
          </IconContainer>

          <HeaderSection>
            <Title>Forgot Password?</Title>
            <Description>
              Enter your registered email or mobile number to receive a one-time password (OTP) to reset your account.
            </Description>
          </HeaderSection>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Email / Mobile Number</FormLabel>
              <InputContainer>
                <InputIcon>
                  <UserIcon className="w-5 h-5" />
                </InputIcon>
                <FormInput
                  type="text"
                  placeholder="Enter email or 10-digit mobile"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  required
                />
              </InputContainer>
            </FormGroup>

            <div style={{ paddingTop: '0.5rem' }}>
              <SubmitButton type="submit">
                <ButtonText>Send OTP</ButtonText>
                <ButtonIcon>
                  <ArrowRightIcon className="w-5 h-5" />
                </ButtonIcon>
              </SubmitButton>
            </div>
          </Form>

          <NavigationSection>
            <BackLink href="#" onClick={(e) => { e.preventDefault(); onBackToLogin(); }}>
              <BackIcon>
                <ArrowLeftIcon className="w-4 h-4" />
              </BackIcon>
              Back to Login
            </BackLink>
          </NavigationSection>
        </FormContainer>
      </Main>

      <Footer>
        <FooterText>© 2024 Test Series EdTech. All rights reserved.</FooterText>
      </Footer>
    </Container>
  );
};