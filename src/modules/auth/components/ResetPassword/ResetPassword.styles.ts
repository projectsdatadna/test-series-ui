import styled from 'styled-components';

 export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  position: relative;
`;

 export const FormInput = styled.input`
  flex: 1;
  border-radius: 0.75rem;
  color: #111318;
  border: 1px solid #dbdee6;
  background-color: white;
  height: 3.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(36, 99, 235, 0.2);
    border-color: #2463eb;
  }
  
  &::placeholder {
    color: rgba(97, 110, 137, 0.5);
  }
`;


 export const PasswordToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  border-radius: 0 0.75rem 0.75rem 0;
  border: 1px solid #dbdee6;
  border-left: 0;
  background-color: white;
  cursor: pointer;
  color: #616e89;
  transition: color 0.2s;
  
  &:hover {
    color: #2463eb;
  }
`;








export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f8;
`;

export const Header = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #dbdee6;
  padding: 0.75rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #111318;
`;

export const LogoIcon = styled.div`
  background-color: #2463eb;
  color: white;
  padding: 0.375rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const LogoText = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: -0.025em;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HelpButton = styled.button`
  font-size: 0.875rem;
  font-weight: 600;
  color: #616e89;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #2463eb;
  }
`;

export const LoginButton = styled.button`
  background-color: #2463eb;
  color: white;
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(36, 99, 235, 0.9);
  }
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(36, 99, 235, 0.05);
  border: 1px solid #f3f4f6;
  overflow: hidden;
`;

export const FormContent = styled.div`
  padding: 2rem;
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  color: #111318;
  font-size: 1.875rem;
  font-weight: 800;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  color: #616e89;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FormLabel = styled.label`
  color: #111318;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const OTPContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
`;

export const OTPInput = styled.input`
  width: 100%;
  height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 0.5rem;
  border: 1px solid #dbdee6;
  background-color: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #2463eb;
    border-color: #2463eb;
  }
  
  &::placeholder {
    color: rgba(97, 110, 137, 0.5);
  }
`;

export const TimerSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.25rem;
`;

export const TimerText = styled.span`
  color: #616e89;
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  color: #2463eb;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.75rem;
  transition: opacity 0.2s;
  
  &:disabled {
    color: #d1d5db;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #f3f4f6;
  margin: 0.5rem 0;
`;

export const PasswordInputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  position: relative;
`;

export const PasswordInput = styled.input`
  flex: 1;
  border-radius: 0.75rem 0 0 0.75rem;
  color: #111318;
  border: 1px solid #dbdee6;
  background-color: white;
  height: 3.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #2463eb;
    border-color: #2463eb;
  }
  
  &::placeholder {
    color: rgba(97, 110, 137, 0.5);
  }
`;

export const PasswordToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  border-radius: 0 0.75rem 0.75rem 0;
  border: 1px solid #dbdee6;
  border-left: none;
  background-color: white;
  cursor: pointer;
  color: #616e89;
  transition: color 0.2s;
  
  &:hover {
    color: #2463eb;
  }
`;

export const StrengthMeter = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #f3f4f6;
`;

export const StrengthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const StrengthTitle = styled.p`
  color: #111318;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StrengthPercentage = styled.p`
  color: #2463eb;
  font-size: 0.75rem;
  font-weight: bold;
`;

export const StrengthBar = styled.div`
  width: 100%;
  background-color: #dbdee6;
  height: 0.5rem;
  border-radius: 9999px;
  overflow: hidden;
`;

export const StrengthFill = styled.div<{ width: number }>`
  height: 100%;
  background-color: #2463eb;
  border-radius: 9999px;
  width: ${props => props.width}%;
  transition: width 0.2s;
`;

export const StrengthHint = styled.p`
  margin-top: 0.5rem;
  color: #616e89;
  font-size: 0.6875rem;
  line-height: 1.5;
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #2463eb;
  color: white;
  font-weight: bold;
  height: 3.5rem;
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 10px 15px -3px rgba(36, 99, 235, 0.2);
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: rgba(36, 99, 235, 0.9);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryAction = styled.div`
  text-align: center;
  padding-top: 0.5rem;
`;

export const BackLink = styled.a`
  font-size: 0.875rem;
  font-weight: 600;
  color: #616e89;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover {
    color: #2463eb;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
`;