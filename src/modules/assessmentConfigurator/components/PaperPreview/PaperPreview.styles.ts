import styled from 'styled-components';

export const PaperPreviewSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1.5;
  background-color: #f1f5f9;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) inset;
  overflow: hidden;
  height: calc(100vh - 220px);

  @media (min-width: 1024px) {
    height: 100%;
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(15, 23, 42, 0.3);
    border-color: #1e293b;
  }
`;

export const PreviewHeader = styled.div`
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
    border-bottom-color: #1e293b;
  }
`;

export const PreviewTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  overflow: hidden;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

export const PreviewIcon = styled.span`
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  color: #2563eb;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
`;

export const PreviewTitle = styled.h2`
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  display: none;

  @media (min-width: 640px) {
    display: block;
  }

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

export const PreviewTitleBorderRight = styled.div`
  display: none;
  border-right: 1px solid #e2e8f0;
  padding-right: 1.5rem;

  @media (min-width: 768px) {
    display: block;
  }

  @media (prefers-color-scheme: dark) {
    border-right-color: #1e293b;
  }
`;

export const AnswerKeyToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
`;

export const ToggleSwitchInput = styled.input`
  display: none;

  &:checked ~ div::after {
    transform: translateX(1rem);
  }
`;

export const ToggleSwitchBox = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 2.25rem;
  height: 1.25rem;
  background-color: #cbd5e1;
  border-radius: 9999px;
  transition: background-color 0.2s;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    background-color: white;
    border: 1px solid #cbd5e1;
    border-radius: 9999px;
    height: 1rem;
    width: 1rem;
    transition: all 0.3s;
  }

  ${ToggleSwitchInput}:checked ~ & {
    background-color: #2563eb;
    border-color: #fff;

    &::after {
      border-color: #1e293b;
    }
  }

  @media (prefers-color-scheme: dark) {
    &::after {
      background-color: white;
      border-color: #475569;
    }

    ${ToggleSwitchInput}:checked ~ & {
      background-color: #2563eb;

      &::after {
        border-color: #334155;
      }
    }
  }
`;

export const ToggleLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  transition: color 0.2s;

  ${AnswerKeyToggle}:hover & {
    color: #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;

    ${AnswerKeyToggle}:hover & {
      color: #2563eb;
    }
  }
`;

export const PreviewActionsSection = styled.div`
  display: flex;
  gap: 0.25rem;

  @media (min-width: 768px) {
    gap: 0.5rem;
  }
`;

export const PreviewActionButton = styled.button`
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: #1e293b;
    }
  }
`;

export const ActionIcon = styled.span`
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  display: inline-block;
  font-size: 1.125rem;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const PreviewContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 1.5rem;
  background-color: #e2e8f0;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(15, 23, 42, 0.3);
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    &::-webkit-scrollbar-thumb {
      background: #475569;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: #2563eb;
    }
  }
`;

export const PreviewDocument = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  min-height: 842px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-radius: 0.125rem;
  padding: 1.5rem 3rem;
  font-family: 'Georgia', 'Times New Roman', serif;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  transform: scale(1);
  transform-origin: top;

  @media (min-width: 640px) {
    padding: 3rem;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
    border-color: #1e293b;
  }
`;

export const DocumentWatermark = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0.03;

  @media (prefers-color-scheme: dark) {
    opacity: 0.05;
  }
`;

export const WatermarkIcon = styled.span`
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 9.375rem;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  @media (min-width: 640px) {
    font-size: 25rem;
  }
`;

export const DocumentContent = styled.div`
  position: relative;
  z-index: 10;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #1f2937;

  @media (min-width: 640px) {
    font-size: 0.8125rem;
  }

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

export const DocumentHeader = styled.div`
  text-align: center;
  border-bottom: 2px solid rgba(15, 23, 42, 0.1);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
`;

export const DocumentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 0.25rem 0;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

export const DocumentSubtitle = styled.p`
  font-size: 0.75rem;
  font-style: italic;
  font-weight: 600;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

export const DocumentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-top: 1px solid rgba(15, 23, 42, 0.1);
  padding-top: 0.75rem;

  @media (prefers-color-scheme: dark) {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
`;

export const SectionGroup = styled.div`
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    margin-bottom: 2rem;
  }
`;

export const SectionTitle = styled.h4`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-style: italic;
  border-bottom: 1px solid rgba(15, 23, 42, 0.1);
  padding-bottom: 0.25rem;
  margin: 0 0 1rem 0;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
`;

export const QuestionItem = styled.div`
  position: relative;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    margin-bottom: 1.5rem;
  }
`;

export const QuestionText = styled.p`
  font-weight: 600;
  padding-right: 2rem;
  margin: 0 0 0.5rem 0;

  @media (prefers-color-scheme: dark) {
    color: #e2e8f0;
  }
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-left: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const OptionText = styled.p`
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

export const AnswerBox = styled.div`
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: rgba(37, 99, 235, 0.05);
  border-left: 4px solid #2563eb;
  border-radius: 0.25rem;

  @media (prefers-color-scheme: dark) {
    background-color: rgba(37, 99, 235, 0.1);
  }
`;

export const AnswerLabel = styled.p`
  font-weight: 700;
  font-size: 0.625rem;
  text-transform: uppercase;
  color: #2563eb;
  margin: 0 0 0.25rem 0;

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;
  }
`;

export const AnswerText = styled.p`
  font-size: 0.75rem;
  font-style: italic;
  line-height: 1.25;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

export const PreviewFooter = styled.div`
  padding: 0.75rem 1rem;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  @media (min-width: 768px) {
    display: flex;
    gap: 0.75rem;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
    border-top-color: #1e293b;
  }
`;

export const FooterButton = styled.button<{ $variant?: 'default' | 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  border: ${(props) => (props.$variant === 'primary' ? 'none' : '1px solid #e2e8f0')};
  background-color: ${(props) => {
    switch (props.$variant) {
      case 'primary':
        return '#2563eb';
      case 'secondary':
        return 'rgba(37, 99, 235, 0.05)';
      default:
        return 'white';
    }
  }};
  color: ${(props) => {
    switch (props.$variant) {
      case 'primary':
        return 'white';
      case 'secondary':
        return '#2563eb';
      default:
        return '#475569';
    }
  }};

  &:hover {
    background-color: ${(props) => {
      switch (props.$variant) {
        case 'primary':
          return '#1d4ed8';
        case 'secondary':
          return 'rgba(37, 99, 235, 0.1)';
        default:
          return '#f1f5f9';
      }
    }};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${(props) => (props.$variant === 'primary' ? 'none' : '#334155')};
    background-color: ${(props) => {
      switch (props.$variant) {
        case 'primary':
          return '#2563eb';
        case 'secondary':
          return 'rgba(37, 99, 235, 0.1)';
        default:
          return '#1e293b';
      }
    }};

    &:hover {
      background-color: ${(props) => {
        switch (props.$variant) {
          case 'primary':
            return '#1d4ed8';
          default:
            return '#334155';
        }
      }};
    }
  }
`;

export const FooterButtonIcon = styled.span`
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 1.125rem;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
`;

export const FooterButtonSpan = styled.span`
  display: none;

  @media (min-width: 640px) {
    display: inline;
  }
`;
