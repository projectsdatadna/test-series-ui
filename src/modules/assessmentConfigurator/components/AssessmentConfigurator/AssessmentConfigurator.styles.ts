import styled from 'styled-components';

export const AssessmentConfiguratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  overflow-y: auto;
  gap: 1rem;
  padding: 0.75rem 1rem;

  @media (min-width: 768px) {
    padding: 1rem;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    height: calc(100vh - 64px);
    overflow: hidden;
    padding: 1rem;
    gap: 1rem;
  }
`;

export const ResponsiveSection = styled.div<{ $visibility?: 'hidden' | 'visible'; $width?: string }>`
  display: ${(props) => (props.$visibility === 'hidden' ? 'none' : 'flex')};
  width: 100%;

  @media (min-width: 1024px) {
    display: flex;
    width: ${(props) => props.$width || 'auto'};
    min-width: 0;
  }
`;
