import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f7fb;
  display: flex;
  flex-direction: column;
  font-family: 'Manrope', sans-serif;
`;

export const Header = styled.header`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #f3f4f6;
  position: fixed;
  top: 0;
  z-index: 50;
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
  gap: 0.5rem;
`;

export const LogoIcon = styled.div`
  background-color: #506ef7;
  padding: 0.375rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const LogoText = styled.h2`
  color: #111218;
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.025em;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HeaderText = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  
  @media (max-width: 640px) {
    display: none;
  }
`;

export const LoginButton = styled.button`
  display: flex;
  min-width: 84px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  height: 2.5rem;
  padding: 0 1.25rem;
  background-color: rgba(80, 110, 247, 0.1);
  color: #506ef7;
  font-size: 0.875rem;
  font-weight: 700;
  border: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(80, 110, 247, 0.2);
  }
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1rem 3rem;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 560px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.05);
  padding: 2rem 2.5rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

export const FormTitle = styled.h1`
  color: #111218;
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
  margin: 0;
`;

export const FormDescription = styled.p`
  color: #6b7280;
  margin: 0.5rem 0 0 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RoleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RoleTitle = styled.h3`
  color: #111218;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

export const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const RoleOption = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid #f3f4f6;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: rgba(80, 110, 247, 0.5);
  }
  
  &:has(input:checked) {
    border-color: #506ef7;
    background-color: rgba(80, 110, 247, 0.05);
  }
`;

export const RoleInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const RoleIcon = styled.span`
  color: #9ca3af;
  font-size: 1.5rem;
  
  ${RoleOption}:has(input:checked) & {
    color: #506ef7;
  }
`;

export const RoleLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #111218;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const FormLabel = styled.label`
  color: #111218;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const FormInput = styled.input`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: white;
  padding: 0.875rem 1rem;
  padding-right: 3rem;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(80, 110, 247, 0.2);
    border-color: #506ef7;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const InputIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #d1d5db;
  font-size: 1.5rem;
`;

export const MobileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
`;

export const CountryCodeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border: 1px solid #d1d5db;
  // border-right: 0;
  background-color: #f9fafb;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 50px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: white;
    border-color: #9ca3af;
  }
  
  &:focus {
    outline: none;
    background-color: white;
    border-color: #506ef7;
    box-shadow: 0 0 0 2px rgba(80, 110, 247, 0.2);
  }
`;

export const CountryCodeDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  max-height: 300px;
  overflow-y: auto;
  width: 100px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
    
    &:hover {
      background: #9ca3af;
    }
  }
`;

export const CountryCodeOption = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: #6b7280;
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
    color: #506ef7;
  }
  
  &:active {
    background-color: rgba(80, 110, 247, 0.1);
  }
`;

export const CountryCode = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border: 1px solid #d1d5db;
  border-right: 0;
  background-color: #f9fafb;
  color: #6b7280;
  font-size: 0.875rem;
`;

export const MobileInput = styled(FormInput)`
  border-radius: 0 0.5rem 0.5rem 0;
  padding-right: 1rem;
  padding-top:0.9rem;
  flex: 1;
`;

export const PasswordContainer = styled.div`
  position: relative;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  
  &:hover {
    color: #506ef7;
  }
`;

export const PasswordStrength = styled.div`
  margin-top: 0.5rem;
`;

export const StrengthMeter = styled.div`
  display: flex;
  gap: 0.25rem;
  height: 0.25rem;
  width: 100%;
`;

export const StrengthBar = styled.div<{ active: boolean }>`
  flex: 1;
  border-radius: 9999px;
  background-color: ${props => props.active ? '#506ef7' : '#e5e7eb'};
`;

export const StrengthText = styled.p`
  font-size: 0.6875rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
`;

export const StrengthLabel = styled.span`
  color: #506ef7;
  font-weight: 700;
`;

export const PrivacyText = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  text-align: center;
  padding: 0 1rem;
  margin: 0;
`;

export const PrivacyLink = styled.a`
  color: #506ef7;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
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
  box-shadow: 0 10px 15px -3px rgba(80, 110, 247, 0.25);
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(80, 110, 247, 0.9);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const LoginSection = styled.div`
  text-align: center;
  padding-top: 0.5rem;
`;

export const LoginText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

export const LoginLink = styled.a`
  color: #506ef7;
  font-weight: 700;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  padding: 1.5rem 0;
  text-align: center;
  border-top: 1px solid #f3f4f6;
  margin-top: auto;
`;

export const FooterText = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  margin: 0;
`;