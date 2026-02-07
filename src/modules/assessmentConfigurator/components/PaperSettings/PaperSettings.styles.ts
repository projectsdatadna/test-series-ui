import styled from 'styled-components';

export const PaperSettingsSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: auto;
  max-height: calc(100vh - 220px);
  overflow: hidden;

  @media (min-width: 640px) {
    height: calc(100vh - 220px);
  }

  @media (min-width: 1024px) {
    width: 26%;
    height: 100%;
    max-height: none;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
    border-color: #1e293b;
  }
`;

export const SettingsHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #1e293b;
  }
`;

export const SettingsTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SettingsIcon = styled.span`
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

export const SettingsTitle = styled.h2`
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

export const LiveTotalBadge = styled.div`
  display: none;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background-color: rgba(37, 99, 235, 0.05);
  color: #2563eb;
  border-radius: 9999px;
  border: 1px solid rgba(37, 99, 235, 0.1);

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const LiveTotalLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const LiveTotalValue = styled.span`
  font-size: 0.75rem;
  font-weight: 800;
`;

export const ScrollContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

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

export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  align-items: center;
`;

export const FormLabel = styled.label`
  font-size: 0.625rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  white-space: nowrap;

  @media (prefers-color-scheme: dark) {
    color: #64748b;
  }
`;

export const SelectStyled = styled.select`
  width: 100%;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.625rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    ring: 2px #2563eb;
    border-color: #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
    border-color: #334155;
    color: #e2e8f0;

    &:focus {
      border-color: #2563eb;
    }
  }
`;

export const QuestionConfigSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;

  @media (prefers-color-scheme: dark) {
    border-top-color: #1e293b;
  }
`;

export const ConfigHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ConfigLabel = styled.label`
  font-size: 0.625rem;
  font-weight: 700;
  color: #2563eb;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
`;

export const AddCustomButton = styled.button`
  font-size: 0.625rem;
  font-weight: 700;
  color: #94a3b8;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

export const AddIcon = styled.span`
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 0.75rem;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
`;

export const QuestionConfigRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0.5rem;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background-color: rgba(248, 250, 252, 0.5);
  border: 1px solid #f1f5f9;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(37, 99, 235, 0.3);
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(15, 23, 42, 0.5);
    border-color: #1e293b;

    &:hover {
      border-color: rgba(37, 99, 235, 0.3);
    }
  }
`;

export const QuestionConfigLabelRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  margin-bottom: -0.5rem;
`;

export const QuestionConfigLabelItem = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

export const ConfigTypeSection = styled.div`
  grid-column: span 3;

  @media (min-width: 640px) {
    grid-column: span 3;
  }
`;

export const ConfigTypeName = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  display: block;

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

export const ConfigTypeSection2 = styled.span`
  font-size: 0.625rem;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #64748b;
  }
`;

export const ConfigInput = styled.input`
  width: 100%;
  height: 2rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 0.375rem;
  border: 1px solid #cbd5e1;
  background-color: transparent;
  cursor: text;

  &:focus {
    outline: none;
    border-color: #2563eb;
    ring: 2px #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
    border-color: #334155;
    color: #e2e8f0;
  }

  /* Remove number input spinner */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const ConfigMultiplier = styled.div`
  grid-column: span 1;
  text-align: center;
  color: #cbd5e1;
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #475569;
  }
`;

export const ConfigResult = styled.div`
  grid-column: span 1;

  @media (min-width: 640px) {
    grid-column: span 1;
    padding-left:12px;
  }

  text-align: right;
`;

export const ResultValue = styled.span`
  font-size: 0.875rem;
  font-weight: 800;
  color: #2563eb;

  @media (prefers-color-scheme: dark) {
    color: #2563eb;
  }
`;

export const TotalMarksDisplay = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #2563eb;
  color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-top: 1rem;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const TotalMarksLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const TotalMarksValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
`;

export const TotalMarksNumber = styled.span`
  font-size: 1.125rem;
  font-weight: 900;
`;

export const TotalMarksTarget = styled.span`
  font-size: 0.625rem;
  opacity: 0.8;
  font-weight: 700;
`;

export const DifficultySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DifficultyLabel = styled.label`
  font-size: 0.625rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;

  @media (prefers-color-scheme: dark) {
    color: #64748b;
  }
`;

export const DifficultyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const DifficultyButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border: ${(props) => (props.$isActive ? '2px solid #2563eb' : '1px solid #e2e8f0')};
  background-color: ${(props) => (props.$isActive ? 'rgba(37, 99, 235, 0.05)' : 'white')};
  color: ${(props) => (props.$isActive ? '#2563eb' : 'inherit')};
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
    background-color: rgba(37, 99, 235, 0.05);
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${(props) => (props.$isActive ? '#2563eb' : '#334155')};
    background-color: ${(props) => (props.$isActive ? 'rgba(37, 99, 235, 0.1)' : '#0f172a')};
    color: ${(props) => (props.$isActive ? '#2563eb' : '#e2e8f0')};

    &:hover {
      background-color: rgba(37, 99, 235, 0.05);
    }
  }
`;

export const SettingsFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e2e8f0;

  @media (prefers-color-scheme: dark) {
    border-top-color: #1e293b;
  }
`;

export const GenerateButton = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: white;
  font-weight: 700;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);

  &:hover {
    background-color: #1d4ed8;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: #1d4ed8;
    }
  }
`;

export const GenerateIcon = styled.span`
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
`;
