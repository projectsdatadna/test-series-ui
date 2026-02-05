import styled from 'styled-components';

export const PaperPreviewSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f1f5f9;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) inset;
  overflow: hidden;
  width: 100%;
  height: auto;
  max-height: calc(100vh - 220px);

  @media (min-width: 640px) {
    height: calc(100vh - 220px);
  }

  @media (min-width: 1024px) {
    width: 40%;
    height: 100%;
    max-height: none;
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(15, 23, 42, 0.3);
    border-color: #1e293b;
  }
`;

export const PreviewHeader = styled.div`
  padding: 0.75rem 1rem;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  @media (min-width: 640px) {
    padding: 1rem;
    flex-wrap: nowrap;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
    border-bottom-color: #1e293b;
  }
`;

export const PreviewTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  min-width: 0;

  @media (min-width: 640px) {
    gap: 1rem;
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

export const PreviewActionsSection = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
  align-items: center;

  @media (min-width: 640px) {
    gap: 0.5rem;
  }
`;

export const ZoomControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
  padding: 0.25rem;

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
  }
`;

export const ZoomButton = styled.button`
  padding: 0.375rem 0.5rem;
  border-radius: 0.375rem;
  background-color: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 2.5rem;

  &:hover {
    background-color: #e2e8f0;
    color: #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: #334155;
    }
  }
`;

export const ZoomDisplay = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  min-width: 2.5rem;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
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
  --zoom-multiplier: 1;
  font-size: calc(1rem * var(--zoom-multiplier));

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
  page-break-after: always;

  @media (min-width: 640px) {
    padding: 3rem;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
    border-color: #1e293b;
  }

  @media print {
    box-shadow: none;
    border: none;
    page-break-after: always;
    break-after: page;
  }
`;

export const PreviewDocumentPage = styled.div`
  min-height: 842px;
  page-break-after: always;
  break-after: page;
  margin-bottom: 2rem;

  @media print {
    page-break-after: always;
    break-after: page;
    margin-bottom: 0;
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
  font-size: calc(1.125rem * var(--zoom-multiplier, 1));
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 0 0.25rem 0;

  @media (min-width: 640px) {
    font-size: calc(1.25rem * var(--zoom-multiplier, 1));
  }

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

export const DocumentSubtitle = styled.p`
  font-size: calc(0.75rem * var(--zoom-multiplier, 1));
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
  font-size: calc(0.875rem * var(--zoom-multiplier, 1));

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
  font-size: calc(0.8rem * var(--zoom-multiplier, 1));

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
  font-size: calc(0.75rem * var(--zoom-multiplier, 1));

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
  font-size: calc(0.625rem * var(--zoom-multiplier, 1));
  text-transform: uppercase;
  color: #2563eb;
  margin: 0 0 0.25rem 0;

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;
  }
`;

export const AnswerText = styled.p`
  font-size: calc(0.75rem * var(--zoom-multiplier, 1));
  font-style: italic;
  line-height: 1.25;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }

  ul {
    margin: 0.25rem 0 0 1rem;
    padding-left: 0;

    li {
      margin: 0.25rem 0;
      list-style-type: disc;
    }
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
  width:100%;
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

export const ExportModal = styled.div<{ $isOpen?: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ExportModalContent = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 2rem;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
  }
`;

export const ExportModalTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #1f2937;

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

export const ExportModalDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

export const ExportButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const ExportOptionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${(props) => (props.$variant === 'primary' ? '#2563eb' : '#e2e8f0')};
  background-color: ${(props) => (props.$variant === 'primary' ? 'rgba(37, 99, 235, 0.05)' : 'white')};
  color: ${(props) => (props.$variant === 'primary' ? '#2563eb' : '#64748b')};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
    background-color: rgba(37, 99, 235, 0.05);
    color: #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${(props) => (props.$variant === 'primary' ? '#2563eb' : '#334155')};
    background-color: ${(props) => (props.$variant === 'primary' ? 'rgba(37, 99, 235, 0.1)' : '#1e293b')};
    color: ${(props) => (props.$variant === 'primary' ? '#2563eb' : '#cbd5e1')};

    &:hover {
      background-color: rgba(37, 99, 235, 0.05);
    }
  }
`;

export const ExportOptionIcon = styled.span`
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 1.5rem;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
`;

export const ExportOptionLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
`;


/* Inline Edit Mode Styles */

export const EditableQuestionText = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #2563eb;
  border-radius: 0.375rem;
  font-size: calc(0.875rem * var(--zoom-multiplier, 1));
  font-weight: 600;
  font-family: inherit;
  background-color: #eff6ff;
  color: #1f2937;
  transition: all 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(37, 99, 235, 0.1);
    color: #e2e8f0;
    border-color: #3b82f6;
  }
`;

export const EditableOptionText = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
  font-size: calc(0.75rem * var(--zoom-multiplier, 1));
  font-family: inherit;
  background-color: #f8fafc;
  color: #1f2937;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
    color: #e2e8f0;
    border-color: #475569;
  }
`;

export const EditableAnswerText = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #2563eb;
  border-radius: 0.375rem;
  font-size: calc(0.75rem * var(--zoom-multiplier, 1));
  font-family: inherit;
  background-color: #eff6ff;
  color: #1f2937;
  resize: vertical;
  min-height: 60px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(37, 99, 235, 0.1);
    color: #e2e8f0;
    border-color: #3b82f6;
  }
`;

export const EditableKeyPointText = styled.input`
  width: 100%;
  padding: 0.375rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
  font-size: calc(0.7rem * var(--zoom-multiplier, 1));
  font-family: inherit;
  background-color: #f8fafc;
  color: #1f2937;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
    color: #e2e8f0;
    border-color: #475569;
  }
`;

export const EditToolbar = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  z-index: 100;

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  }
`;

export const EditToolbarButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.3);
    }
  }
`;

export const EditToolbarIcon = styled.span`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SaveButton = styled(EditToolbarButton)`
  background-color: #10b981;
  color: white;

  &:hover {
    background-color: #059669;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #047857;

    &:hover {
      background-color: #065f46;
    }
  }
`;

export const CancelButton = styled(EditToolbarButton)`
  background-color: #ef4444;
  color: white;

  &:hover {
    background-color: #dc2626;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #b91c1c;

    &:hover {
      background-color: #991b1b;
    }
  }
`;
