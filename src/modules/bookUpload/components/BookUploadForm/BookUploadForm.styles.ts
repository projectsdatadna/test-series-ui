import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  .material-symbols-outlined {
    font-size: 20px;
    color: #0066cc;
  }
`;

export const DropdownsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333333;
`;

export const SelectInput = styled.select`
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 14px;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #0066cc;
  }

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    color: #999999;
  }
`;

export const TextInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #0066cc;
  }

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    color: #999999;
  }
`;

export const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px;
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0066cc;
    background-color: #f0f7ff;
  }

  &.active {
    border-color: #0066cc;
    background-color: #f0f7ff;
  }
`;

export const UploadIcon = styled.span`
  font-size: 40px;
  color: #0066cc;
`;

export const UploadText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const UploadTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

export const UploadSubtitle = styled.p`
  font-size: 13px;
  color: #666666;
  margin: 0;
`;

export const BrowseButton = styled.button`
  padding: 8px 16px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0052a3;
  }

  &:active {
    background-color: #003d7a;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #f0f7ff;
  border-radius: 6px;
  border-left: 4px solid #0066cc;
`;

export const FileIcon = styled.span`
  font-size: 24px;
  color: #0066cc;
`;

export const FileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const FileName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0;
`;

export const FileSize = styled.p`
  font-size: 12px;
  color: #666666;
  margin: 0;
`;

export const RemoveButton = styled.button`
  padding: 6px 12px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cc0000;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #0066cc;
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background-color: #0066cc;
    color: white;

    &:hover {
      background-color: #0052a3;
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `
      : `
    background-color: #f0f0f0;
    color: #333333;
    border: 1px solid #d0d0d0;

    &:hover {
      background-color: #e0e0e0;
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
      color: #999999;
    }
  `}
`;

export const ErrorMessage = styled.div`
  padding: 12px;
  background-color: #ffe0e0;
  border-left: 4px solid #ff4444;
  border-radius: 4px;
  color: #cc0000;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  .material-symbols-outlined {
    font-size: 18px;
  }
`;

export const SuccessMessage = styled.div`
  padding: 12px;
  background-color: #e0ffe0;
  border-left: 4px solid #00cc00;
  border-radius: 4px;
  color: #006600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  .material-symbols-outlined {
    font-size: 18px;
  }
`;
