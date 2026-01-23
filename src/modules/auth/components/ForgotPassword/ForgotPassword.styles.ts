import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f6f6f8;
  display: flex;
  flex-direction: column;
  font-family: 'Manrope', sans-serif;
`;

export const Header = styled.header`
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #f0f1f4;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
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
  gap: 0.75rem;
  color: #2463eb;
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

export const LogoText = styled.h2`
  color: #111318;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  margin: 0;
`;

export const SignInButton = styled.a`
  display: flex;
  min-width: 84px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.75rem;
  height: 2.5rem;
  padding: 0 1rem;
  background-color: #2463eb;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.015em;
  text-decoration: none;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
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
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-radius: 0.75rem;
  padding: 2rem;
  border: 1px solid #f0f1f4;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: rgba(36, 99, 235, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2463eb;
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  color: #111318;
  letter-spacing: -0.025em;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.75rem;
  margin: 0;
`;

export const Description = styled.p`
  color: #616e89;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  margin: 0.75rem 0 0 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  line-height: 1.4;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #616e89;
  font-size: 1.25rem;
`;

export const FormInput = styled.input`
  display: flex;
  width: 100%;
  border-radius: 0.75rem;
  color: #111318;
  border: 1px solid #dbdee6;
  background-color: white;
  height: 3.5rem;
  padding-left: 3rem;
  padding-right: 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.4;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(36, 99, 235, 0.2);
    border-color: #2463eb;
  }
  
  &::placeholder {
    color: #616e89;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.75rem;
  height: 3.5rem;
  padding: 0 1.25rem;
  background-color: #2463eb;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.015em;
  border: none;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(36, 99, 235, 0.2);
  gap: 0.5rem;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const ButtonText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonIcon = styled.span`
  font-size: 1.25rem;
`;

export const NavigationSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f1f4;
  text-align: center;
`;

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2463eb;
  font-weight: 700;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #1d4ed8;
  }
`;

export const BackIcon = styled.span`
  font-size: 1.125rem;
`;

export const Footer = styled.footer`
  padding: 2rem 0;
  text-align: center;
`;

export const FooterText = styled.p`
  color: #616e89;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
`;