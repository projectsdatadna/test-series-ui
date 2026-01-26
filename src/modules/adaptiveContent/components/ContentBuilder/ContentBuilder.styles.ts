import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 4rem);
`;

export const LeftPanel = styled.section`
  width: 20rem;
  background-color: #f9fafb;
  border-right: 1px solid #f0f1f5;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const PanelContent = styled.div`
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }
`;

export const PanelTitle = styled.h3`
  color: #111218;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #60688a;
  margin-bottom: 0.5rem;
`;

export const Select = styled.select`
  width: 100%;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  color: #111218;

  &:focus {
    outline: none;
    border-color: #506ef7;
    box-shadow: 0 0 0 2px rgba(80, 110, 247, 0.1);
  }
`;

export const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SectionItem = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.isSelected ? 'rgba(80, 110, 247, 0.1)' : 'white')};
  border: 1px solid ${(props) => (props.isSelected ? 'rgba(80, 110, 247, 0.2)' : '#e2e8f0')};
  color: ${(props) => (props.isSelected ? '#506ef7' : '#111218')};

  &:hover {
    background-color: ${(props) => (props.isSelected ? 'rgba(80, 110, 247, 0.1)' : '#f8fafc')};
  }
`;

export const PdfPreview = styled.div`
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  margin-top: 1rem;
`;

export const PdfPreviewContent = styled.div`
  background-color: #e2e8f0;
  aspect-ratio: 3/4;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const PdfPlaceholderLine = styled.div<{ width?: string }>`
  height: 0.75rem;
  background-color: #cbd5e1;
  width: ${(props) => props.width || '100%'};
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
`;

export const PdfImagePlaceholder = styled.div`
  height: 8rem;
  background-color: #94a3b8;
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
`;

export const PdfCaption = styled.p`
  font-size: 0.625rem;
  text-align: center;
  margin-top: 0.5rem;
  color: #60688a;
`;

export const CenterPanel = styled.section`
  flex: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }
`;

export const CanvasContainer = styled.div`
  max-width: 56rem;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem;
`;

export const CanvasHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const CanvasTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CanvasTitleText = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111218;
  margin: 0;
`;

export const SaveStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SaveDot = styled.span`
  position: relative;
  display: flex;
  height: 0.5rem;
  width: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    display: inline-flex;
    height: 100%;
    width: 100%;
    border-radius: 9999px;
    background-color: #4ade80;
    opacity: 0.75;
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  &::after {
    content: '';
    position: relative;
    display: inline-flex;
    border-radius: 9999px;
    height: 0.5rem;
    width: 0.5rem;
    background-color: #22c55e;
  }

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

export const SaveText = styled.span`
  font-size: 0.75rem;
  color: #60688a;
`;

export const ContentCard = styled.div`
  position: relative;
  padding: 1.5rem;
  background-color: #f8faff;
  border: 1px solid rgba(80, 110, 247, 0.1);
  border-radius: 1rem;
  margin-bottom: 2rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(80, 110, 247, 0.4);
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: -0.75rem;
  right: -0.75rem;
  width: 2rem;
  height: 2rem;
  background-color: white;
  border-radius: 9999px;
  border: 1px solid #506ef7;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: none;
  align-items: center;
  justify-content: center;
  color: #506ef7;
  cursor: pointer;

  ${ContentCard}:hover & {
    display: flex;
  }
`;

export const ContentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #506ef7;
  margin: 0 0 1rem 0;
`;

export const ContentText = styled.div`
  font-size: 0.875rem;
  line-height: 1.75;
  color: #111218;

  p {
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    font-weight: 700;
  }
`;

export const AddContentCard = styled.div`
  position: relative;
  padding: 1.5rem;
  border: 2px dashed #e2e8f0;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 200px;
  background-color: rgba(248, 250, 252, 0.5);
  transition: border-color 0.2s;
  cursor: pointer;

  &:hover {
    border-color: rgba(80, 110, 247, 0.5);
  }
`;

export const AddIconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: rgba(80, 110, 247, 0.05);
  color: #506ef7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddContentText = styled.div`
  text-align: center;
`;

export const AddContentTitle = styled.p`
  font-weight: 700;
  color: #111218;
  margin: 0;
`;

export const AddContentSubtitle = styled.p`
  font-size: 0.875rem;
  color: #60688a;
  margin: 0;
`;

export const AddContentButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const AddContentButton = styled.button`
  padding: 0.375rem 0.75rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #111218;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #506ef7;
  }
`;

export const RightPanel = styled.section`
  width: 20rem;
  background-color: #f9fafb;
  border-left: 1px solid #f0f1f5;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const SettingsSection = styled.div`
  margin-bottom: 2rem;
`;

export const SettingsLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #60688a;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const DepthSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  background-color: #e2e8f0;
  padding: 0.25rem;
  border-radius: 0.75rem;
`;

export const DepthButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.isActive ? 'white' : 'transparent')};
  color: ${(props) => (props.isActive ? '#506ef7' : '#60688a')};
  box-shadow: ${(props) => (props.isActive ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none')};

  &:hover {
    color: #506ef7;
  }
`;

export const DepthHint = styled.p`
  font-size: 0.625rem;
  color: #60688a;
  margin: 0.5rem 0 0 0;
`;

export const FormatOption = styled.label<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.isSelected ? 'rgba(80, 110, 247, 0.05)' : 'white')};
  border: 1px solid ${(props) => (props.isSelected ? '#506ef7' : '#e2e8f0')};
  margin-bottom: 0.75rem;

  &:hover {
    border-color: rgba(80, 110, 247, 0.5);
  }
`;

export const FormatRadio = styled.input`
  color: #506ef7;
  width: 1rem;
  height: 1rem;

  &:focus {
    ring-color: #506ef7;
  }
`;

export const FormatContent = styled.div`
  flex: 1;
`;

export const FormatTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: #111218;
  margin: 0;
`;

export const FormatSubtitle = styled.p`
  font-size: 0.625rem;
  color: #60688a;
  margin: 0;
`;

export const FormatIcon = styled.span<{ isActive?: boolean }>`
  color: ${(props) => (props.isActive ? '#506ef7' : '#94a3b8')};
`;

export const LanguageTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const LanguageTag = styled.span<{ isSelected?: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.isSelected ? '#506ef7' : 'white')};
  color: ${(props) => (props.isSelected ? 'white' : '#60688a')};
  border: 1px solid ${(props) => (props.isSelected ? '#506ef7' : '#e2e8f0')};

  &:hover {
    border-color: #506ef7;
  }
`;

export const PanelFooter = styled.div`
  padding: 1.25rem;
  border-top: 1px solid #f0f1f5;
  background-color: white;
`;

export const RegenerateButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #506ef7;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  border: none;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(80, 110, 247, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(80, 110, 247, 0.9);
  }
`;

export const PageHeader = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #f0f1f5;
`;

export const Breadcrumbs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const BreadcrumbLink = styled.a`
  color: #60688a;
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #506ef7;
  }
`;

export const BreadcrumbSeparator = styled.span`
  color: #60688a;
  font-size: 0.75rem;
`;

export const BreadcrumbCurrent = styled.span`
  color: #506ef7;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.h1`
  color: #111218;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
`;

export const HeaderSubtitle = styled.p`
  color: #60688a;
  font-size: 0.875rem;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #f0f1f5;
  background-color: white;
  color: #111218;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #506ef7;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  background-color: #506ef7;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(80, 110, 247, 0.2);
  transition: all 0.2s;

  &:hover {
    background-color: rgba(80, 110, 247, 0.9);
  }
`;
