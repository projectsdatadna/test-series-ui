import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f6f6f8;
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: 'Manrope', sans-serif;
`;

export const BackgroundDecoration = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  opacity: 0.4;
  
  &::before {
    content: '';
    position: absolute;
    top: 10%;
    right: 10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(36, 99, 235, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(100px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 10%;
    left: 5%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(80px);
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  background-color: white;
  
  @media (min-width: 768px) {
    padding: 0.75rem 2.5rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #1e293b;
`;

export const LogoIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  color: #2463eb;
`;

export const LogoText = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  height: 2.5rem;
  width: 2.5rem;
  background-color: #f1f5f9;
  color: #475569;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e2e8f0;
  }
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 2.5rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem 1.5rem 0.5rem;
`;

export const ProgressHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressTitle = styled.p`
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

export const ProgressStep = styled.p`
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0;
`;

export const ProgressBar = styled.div`
  border-radius: 9999px;
  background-color: #f1f5f9;
  height: 0.5rem;
  width: 100%;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ width: number }>`
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #2463eb;
  width: ${props => props.width}%;
  transition: width 0.3s ease;
`;

export const ProgressDescription = styled.p`
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0;
`;

export const FormHeader = styled.div`
  padding: 1rem 1.5rem 0.5rem;
  text-align: center;
`;

export const FormTitle = styled.h1`
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

export const FormDescription = styled.p`
  color: #64748b;
  font-size: 1rem;
  font-weight: 400;
  margin: 0.5rem 0 0 0;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

export const FormLabel = styled.label`
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.4;
`;

export const FormInput = styled.input`
  display: flex;
  width: 100%;
  border-radius: 0.5rem;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  background-color: white;
  height: 3rem;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(36, 99, 235, 0.2);
    border-color: #2463eb;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

export const TagContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  min-height: 3rem;
  align-items: center;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: rgba(36, 99, 235, 0.1);
  color: #2463eb;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const TagRemove = styled.span`
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    color: #1d4ed8;
  }
`;

export const AddButton = styled.button`
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    color: #2463eb;
  }
`;

export const TagDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  display: ${props => props.isOpen ? 'block' : 'none'};
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
    
    &:hover {
      background: #94a3b8;
    }
  }
`;

export const TagDropdownContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TagDropdownSection = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TagDropdownSectionTitle = styled.p`
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;
`;

export const TagDropdownOption = styled.button<{ selected: boolean }>`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.selected ? '#2463eb' : '#e2e8f0'};
  background-color: ${props => props.selected ? 'rgba(36, 99, 235, 0.1)' : 'white'};
  color: ${props => props.selected ? '#2463eb' : '#475569'};
  font-size: 0.75rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  border-radius: 0.375rem;
  margin-bottom: 0.25rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? 'rgba(36, 99, 235, 0.15)' : '#f8fafc'};
    border-color: #2463eb;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const TagDropdownInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  background-color: #f8fafc;
  color: #1e293b;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #2463eb;
    background-color: white;
    box-shadow: 0 0 0 2px rgba(36, 99, 235, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

export const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const ExperienceButton = styled.button<{ selected: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: ${props => props.selected ? '2px solid #2463eb' : '1px solid #e2e8f0'};
  background-color: ${props => props.selected ? 'rgba(36, 99, 235, 0.05)' : 'transparent'};
  color: ${props => props.selected ? '#2463eb' : '#64748b'};
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? 'rgba(36, 99, 235, 0.05)' : '#f8fafc'};
  }
`;

export const PreferencesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PreferenceOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f8fafc;
  }
`;

export const PreferenceCheckbox = styled.input`
  border-radius: 0.25rem;
  accent-color: #2463eb;
  width: 1rem;
  height: 1rem;
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(36, 99, 235, 0.2);
  }
`;

export const PreferenceLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #2463eb;
  color: white;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(36, 99, 235, 0.2);
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(36, 99, 235, 0.9);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  height: 2.5rem;
  color: #64748b;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #1e293b;
  }
`;

export const FormFooter = styled.div`
  padding: 0 1.5rem 1.5rem;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 0.625rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  margin: 0;
`;