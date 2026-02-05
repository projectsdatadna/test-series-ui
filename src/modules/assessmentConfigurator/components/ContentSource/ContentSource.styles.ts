import styled from 'styled-components';

export const ContentSourceSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  height: auto;
  max-height: calc(100vh - 220px);
  overflow: hidden;

  @media (min-width: 640px) {
    height: calc(100vh - 220px);
  }

  @media (min-width: 1024px) {
    width: 95%;
    height: 100%;
    max-height: none;
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

