import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f6f8;
  display: flex;
  flex-direction: column;
  font-family: 'Manrope', sans-serif;
  transition: all 0.3s;
`;

export const Header = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
`;

export const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #506ef7;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const LogoText = styled.h2`
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HelpButton = styled.button`
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #506ef7;
  }
`;

export const LoginButton = styled.button`
  background-color: #506ef7;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(80, 110, 247, 0.9);
  }
`;

export const Main = styled.main`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const VerificationCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem 2.5rem;
  border: 1px solid #f3f4f6;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: rgba(80, 110, 247, 0.1);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  color: #1f2937;
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 0.75rem;
  margin: 0;
`;

export const Description = styled.p`
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0.75rem 0 0 0;
`;

export const EmailHighlight = styled.span`
  color: #1f2937;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const OTPContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const OTPInputs = styled.fieldset`
  display: flex;
  gap: 0.5rem;
  border: none;
  padding: 0;
  margin: 0;
  
  @media (min-width: 640px) {
    gap: 0.75rem;
  }
`;

export const OTPInput = styled.input`
  display: flex;
  height: 3.5rem;
  width: 3rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 0.5rem;
  border: 2px solid #e5e7eb;
  background-color: transparent;
  color: #1f2937;
  outline: none;
  transition: all 0.2s;
  
  @media (min-width: 640px) {
    height: 4rem;
    width: 3.5rem;
  }
  
  &:focus {
    border-color: #506ef7;
    box-shadow: 0 0 0 4px rgba(80, 110, 247, 0.1);
  }
  
  /* Hide number input arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #506ef7;
  color: white;
  font-weight: 700;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  box-shadow: 0 10px 15px -3px rgba(80, 110, 247, 0.2);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: rgba(80, 110, 247, 0.9);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const ArrowIcon = styled.span`
  transition: transform 0.2s;
  
  ${SubmitButton}:hover & {
    transform: translateX(0.25rem);
  }
`;

export const TimerSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f3f4f6;
`;

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const TimerDisplay = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeValue = styled.div`
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  min-width: 50px;
  text-align: center;
`;

export const TimeNumber = styled.span`
  color: #1f2937;
  font-weight: 700;
  font-size: 1.125rem;
`;

export const TimeLabel = styled.span`
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  margin-top: 0.25rem;
  font-weight: 700;
`;

export const TimeSeparator = styled.div`
  color: #9ca3af;
  font-weight: 700;
  padding: 0.5rem 0;
`;

export const ResendSection = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

export const ResendButton = styled.button`
  color: #9ca3af;
  font-weight: 700;
  margin-left: 0.25rem;
  background: none;
  border: none;
  cursor: not-allowed;
  
  &:not(:disabled) {
    color: #506ef7;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #506ef7;
  }
`;

export const LinkSeparator = styled.span`
  width: 0.25rem;
  height: 0.25rem;
  background-color: #d1d5db;
  border-radius: 50%;
`;

export const Footer = styled.footer`
  padding: 2rem 0;
`;

export const FooterContent = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
`;