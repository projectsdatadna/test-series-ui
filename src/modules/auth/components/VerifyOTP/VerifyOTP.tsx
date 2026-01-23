import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheckIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import {
  Container,
  Header,
  HeaderContent,
  LogoContainer,
  LogoIcon,
  LogoText,
  HeaderActions,
  HelpButton,
  LoginButton,
  Main,
  ContentContainer,
  VerificationCard,
  IconContainer,
  HeaderSection,
  Title,
  Description,
  EmailHighlight,
  Form,
  OTPContainer,
  OTPInputs,
  OTPInput,
  SubmitButton,
  ArrowIcon,
  TimerSection,
  TimerContainer,
  TimerDisplay,
  TimeUnit,
  TimeValue,
  TimeNumber,
  TimeLabel,
  TimeSeparator,
  ResendSection,
  ResendButton,
  FooterLinks,
  FooterLink,
  LinkSeparator,
  Footer,
  FooterContent,
} from './VerifyOTP.styles';

interface VerifyOTPProps {
  email: string;
  source: 'signup' | 'forgot-password'; // New prop to determine the source
  onVerify: (otp: string) => void;
  onBackToLogin: () => void;
  onResendOTP: () => void;
}

export const VerifyOTP: React.FC<VerifyOTPProps> = ({ 
  email, 
  source,
  onVerify, 
  onBackToLogin, 
  onResendOTP 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const otpString = otp.join('');
    if (otpString.length === 6) {
      try {
        await onVerify(otpString);
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
    if (timeLeft === 0) {
      onResendOTP();
      setTimeLeft(115);
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
            <LogoText>Test Series</LogoText>
          </LogoContainer>
          <HeaderActions>
            <HelpButton>Help</HelpButton>
            <LoginButton onClick={onBackToLogin}>Login</LoginButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <Main>
        <ContentContainer>
          <VerificationCard>
            <HeaderSection>
              <IconContainer>
                <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
              </IconContainer>
              <Title>
                {source === 'signup' ? 'Verify Your Account' : 'Verify Reset Code'}
              </Title>
              <Description>
                We've sent a 6-digit verification code to{' '}
                <EmailHighlight>{email}</EmailHighlight>. Please enter it below.
              </Description>
            </HeaderSection>

            <Form onSubmit={handleSubmit}>
              <OTPContainer>
                <OTPInputs>
                  {otp.map((digit, index) => (
                    <OTPInput
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="number"
                      min="0"
                      max="9"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      autoFocus={index === 0}
                    />
                  ))}
                </OTPInputs>
              </OTPContainer>

              <SubmitButton type="submit">
                {source === 'signup' ? 'Verify Account' : 'Verify Code'}
                <ArrowIcon>
                  <ArrowRightIcon className="w-5 h-5" />
                </ArrowIcon>
              </SubmitButton>
            </Form>

            <TimerSection>
              <TimerContainer>
                <TimerDisplay>
                  <TimeUnit>
                    <TimeValue>
                      <TimeNumber>{minutes.toString().padStart(2, '0')}</TimeNumber>
                    </TimeValue>
                    <TimeLabel>Min</TimeLabel>
                  </TimeUnit>
                  <TimeSeparator>:</TimeSeparator>
                  <TimeUnit>
                    <TimeValue>
                      <TimeNumber>{seconds.toString().padStart(2, '0')}</TimeNumber>
                    </TimeValue>
                    <TimeLabel>Sec</TimeLabel>
                  </TimeUnit>
                </TimerDisplay>
                <ResendSection>
                  Didn't receive the code?{' '}
                  <ResendButton 
                    type="button"
                    disabled={timeLeft > 0}
                    onClick={handleResend}
                  >
                    Resend OTP
                  </ResendButton>
                </ResendSection>
              </TimerContainer>
            </TimerSection>
          </VerificationCard>

          <FooterLinks>
            <FooterLink href="#" onClick={(e) => { e.preventDefault(); onBackToLogin(); }}>
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Login
            </FooterLink>
            <LinkSeparator />
            <FooterLink href="#">Contact Support</FooterLink>
          </FooterLinks>
        </ContentContainer>
      </Main>

      <Footer>
        <FooterContent>
          © 2024 Test Series EdTech. All rights reserved.
        </FooterContent>
      </Footer>
    </Container>
  );
};