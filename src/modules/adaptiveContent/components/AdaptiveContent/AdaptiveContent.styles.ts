import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2.5rem;
  max-width: 80rem;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  color: #111318;
  font-size: 2.25rem;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.033em;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: #616e89;
  font-size: 1.125rem;
  font-weight: 400;
  max-width: 48rem;
  margin: 0;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

export const CardImageContainer = styled.div<{ bgColor: string }>`
  height: 12rem;
  width: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const CardImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.4;
  mix-blend-mode: multiply;
  background-size: cover;
  background-position: center;
`;

export const CardIcon = styled.span<{ color: string }>`
  font-size: 3.5rem;
  color: ${(props) => props.color};
  position: relative;
  z-index: 10;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
`;

export const CardTextContent = styled.div``;

export const CardTitle = styled.h3`
  color: #111318;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
`;

export const CardDescription = styled.p`
  color: #616e89;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

export const CardActions = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

export const PrimaryButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #2463eb;
  color: white;
  border-radius: 0.5rem;
  height: 2.5rem;
  padding: 0 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const SecondaryButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #f0f1f4;
  color: #111318;
  border-radius: 0.5rem;
  height: 2.5rem;
  padding: 0 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const AddNewCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-radius: 0.75rem;
  border: 2px dashed #d1d5db;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #2463eb;
  }
`;

export const AddNewIconWrapper = styled.div`
  border-radius: 9999px;
  background-color: #f3f4f6;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: background-color 0.2s;

  ${AddNewCard}:hover & {
    background-color: rgba(36, 99, 235, 0.1);
  }
`;

export const AddNewIcon = styled.span`
  font-size: 2.5rem;
  color: #9ca3af;
  transition: color 0.2s;

  ${AddNewCard}:hover & {
    color: #2463eb;
  }
`;

export const AddNewText = styled.p`
  color: #6b7280;
  font-weight: 700;
  margin: 0;
`;

export const StatsFooter = styled.div`
  margin-top: 3rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const StatIconWrapper = styled.div<{ bgColor: string; textColor: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.textColor};
`;

export const StatContent = styled.div``;

export const StatLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: #616e89;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

export const StatValue = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: #111318;
  margin: 0;
`;

export const StatDivider = styled.div`
  height: 2.5rem;
  width: 1px;
  background-color: #e5e7eb;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const ViewReportButton = styled.button`
  margin-left: auto;
  background-color: rgba(36, 99, 235, 0.1);
  color: #2463eb;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2463eb;
    color: white;
  }
`;
