import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f7fb;
  display: flex;
  flex-direction: column;
  font-family: 'Manrope', sans-serif;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;
  padding-bottom: 1.5rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #111318;
`;

export const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #2463eb;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0;
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1rem 5rem;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e5eaf2;
  padding: 2rem;
`;

export const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111318;
  margin-bottom: 0.5rem;
  margin: 0;
`;

export const FormDescription = styled.p`
  color: #616e89;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  color: #111318;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const FormInput = styled.input`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #dbdee6;
  background-color: white;
  color: #111318;
  height: 3rem;
  padding: 0 1rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2463eb;
    box-shadow: 0 0 0 1px #2463eb;
  }
  
  &::placeholder {
    color: #616e89;
  }
`;

export const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  color: #616e89;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: #2463eb;
  }
`;

export const FormControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #dbdee6;
  accent-color: #2463eb;
`;

export const CheckboxLabel = styled.span`
  font-size: 0.875rem;
  color: #111318;
`;

export const ForgotLink = styled.a`
  font-size: 0.875rem;
  font-weight: 600;
  color: #2463eb;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #2463eb;
  color: white;
  font-weight: 700;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Divider = styled.div`
  position: relative;
  margin: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e5eaf2;
  }
`;

export const DividerText = styled.span`
  background-color: white;
  padding: 0 0.75rem;
  color: #616e89;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 500;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid #dbdee6;
  border-radius: 0.5rem;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

export const SocialIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

export const SocialText = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111318;
`;

export const SignupSection = styled.div`
  margin-top: 1.5rem;
  text-center;
`;

export const SignupText = styled.p`
  font-size: 0.875rem;
  color: #616e89;
  margin: 0;
`;

export const SignupLink = styled.a`
  color: #2463eb;
  font-weight: 700;
  text-decoration: none;
  margin-left: 0.25rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Footer = styled.footer`
  padding: 2rem 0;
  text-align: center;
  color: #616e89;
  font-size: 0.75rem;
`;

export const FooterText = styled.p`
  margin: 0 0 0.5rem 0;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const FooterLink = styled.a`
  color: #616e89;
  text-decoration: none;
  
  &:hover {
    color: #2463eb;
  }
`;