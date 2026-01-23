import styled from 'styled-components';

export const ContentSourceSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  height: calc(100vh - 220px);
  overflow: hidden;

  @media (min-width: 1024px) {
    width: 320px;
    height: 100%;
    flex-shrink: 0;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
    border-color: #1e293b;
  }
`;

export const ContentHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #1e293b;
  }
`;

export const HeaderIcon = styled.span`
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

export const HeaderTitle = styled.h2`
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

export const ScrollContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
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

export const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 0.75rem;
  border: 2px dashed #e2e8f0;
  padding: 2rem 1rem;
  background-color: rgba(248, 250, 252, 0.5);
  transition: border-color 0.2s;
  cursor: pointer;

  &:hover {
    border-color: rgba(37, 99, 235, 0.5);
  }

  @media (prefers-color-scheme: dark) {
    border-color: #1e293b;
    background-color: rgba(15, 23, 42, 0.5);
  }
`;

export const UploadIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  ${UploadBox}:hover & {
    transform: scale(1.1);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
  }
`;

export const UploadIcon = styled.span`
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

export const UploadText = styled.div`
  text-align: center;
`;

export const UploadTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

export const UploadSubtitle = styled.p`
  font-size: 0.6875rem;
  color: #64748b;
  margin: 0.25rem 0 0 0;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

export const BrowseButton = styled.button`
  width: 100%;
  height: 2.25rem;
  border-radius: 0.5rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
    border-color: #334155;

    &:hover {
      background-color: #334155;
    }
  }
`;

export const ChaptersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ChaptersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChaptersTitle = styled.h3`
  font-size: 0.625rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #64748b;
  }
`;

export const SelectAllButton = styled.button`
  font-size: 0.6875rem;
  color: #2563eb;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #1d4ed8;
  }
`;

export const ChaptersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ChapterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: #1e293b;
    }
  }
`;

export const ChapterCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  border: 2px solid #cbd5e1;
  border-radius: 0.25rem;
  background-color: transparent;
  cursor: pointer;
  accent-color: #2563eb;

  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #475569;
  }
`;

export const ChapterText = styled.span`
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: #e2e8f0;
  }
`;
