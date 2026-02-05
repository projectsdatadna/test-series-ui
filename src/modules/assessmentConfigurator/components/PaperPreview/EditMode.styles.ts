import styled from 'styled-components';

export const EditModeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const EditModeModal = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const EditModeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
`;

export const EditModeTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

export const EditModeCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #1f2937;
  }
`;

export const EditModeContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
`;

export const EditModeFooter = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  flex-shrink: 0;
  justify-content: flex-end;
`;

export const EditModeButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$variant === 'primary'
      ? `
    background: #2563eb;
    color: white;
    
    &:hover {
      background: #1d4ed8;
    }
    
    &:active {
      background: #1e40af;
    }
  `
      : `
    background: #e5e7eb;
    color: #1f2937;
    
    &:hover {
      background: #d1d5db;
    }
    
    &:active {
      background: #9ca3af;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const EditSectionGroup = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

export const EditSectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #2563eb;
`;

export const EditQuestionBlock = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const EditQuestionNumber = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const EditFormGroup = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const EditLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const EditInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const EditTextarea = styled.textarea`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const EditOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.75rem;
`;

export const EditOptionBlock = styled.div`
  padding: 0.75rem;
  background: #f3f4f6;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
`;

export const EditOptionLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  margin-bottom: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const EditOptionInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.8125rem;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

export const EditAnswerBlock = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #eff6ff;
  border-left: 4px solid #2563eb;
  border-radius: 0.375rem;
`;

export const EditAnswerLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
`;

export const EditAnswerInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #93c5fd;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  background: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const EditKeyPointsList = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const EditKeyPointItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const EditKeyPointInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.8125rem;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

export const EditKeyPointRemoveButton = styled.button`
  padding: 0.375rem 0.5rem;
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: #fecaca;
    color: #991b1b;
  }
`;

export const EditAddKeyPointButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: #93c5fd;
    color: #1e3a8a;
  }
`;

export const EditCorrectAnswerSelect = styled.select`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #93c5fd;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const EditMarksInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const EditTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
`;

export const EditTab = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${(props) => (props.$active ? '#2563eb' : '#6b7280')};
  border-bottom: 2px solid ${(props) => (props.$active ? '#2563eb' : 'transparent')};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: #1f2937;
  }
`;

export const EditTabContent = styled.div`
  display: none;

  &.active {
    display: block;
  }
`;
