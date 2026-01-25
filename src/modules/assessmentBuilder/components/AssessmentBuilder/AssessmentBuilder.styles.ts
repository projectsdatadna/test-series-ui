import styled from 'styled-components';

export const Container = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.75rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Title = styled.h1`
  color: #121417;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  color: #677583;
  font-size: 1rem;
  font-weight: 400;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const ToolCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ToolCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  background-color: white;
  border: 1px solid #dde0e4;
  border-radius: 0.75rem;
  border-left: 4px solid #607afb;
  transition: all 0.2s ease;

  &:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const ToolCardImage = styled.div<{ bgImage?: string }>`
  width: 100%;
  height: 10rem;
  background-color: rgba(96, 122, 251, 0.05);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: ${(props) => (props.bgImage ? `url(${props.bgImage})` : 'none')};
  background-size: cover;
  background-position: center;
`;

export const ToolCardImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(96, 122, 251, 0.2);
  transition: background-color 0.2s;

  ${ToolCard}:hover & {
    background-color: rgba(96, 122, 251, 0.1);
  }
`;

export const ToolCardIcon = styled.span`
  color: white;
  font-size: 3rem;
  position: relative;
  z-index: 10;
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07));
`;

export const ToolCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ToolCardTitle = styled.h3`
  color: #121417;
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
`;

export const ToolCardDescription = styled.p`
  color: #677583;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

export const ToolCardButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  background-color: #607afb;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: rgba(96, 122, 251, 0.9);
  }
`;

export const PendingBadge = styled.div`
  background-color: white;
  border: 1px solid rgba(96, 122, 251, 0.2);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 10;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

export const PendingDot = styled.span`
  display: flex;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 9999px;
  background-color: #607afb;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const PendingText = styled.span`
  color: #607afb;
  font-weight: 700;
  font-size: 0.875rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dde0e4;
  padding-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  color: #121417;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;
`;

export const ViewAllButton = styled.button`
  color: #607afb;
  font-size: 0.875rem;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  transition: text-decoration 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

export const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #dde0e4;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const TableWrapper = styled.div`
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  min-width: 800px;
`;

export const TableHead = styled.thead`
  background-color: #f9fafb;
`;

export const TableHeaderCell = styled.th<{ sticky?: 'left' | 'right' }>`
  padding: 1rem 1.5rem;
  color: #121417;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  ${(props) =>
    props.sticky === 'left' &&
    `
    position: sticky;
    left: 0;
    background-color: #f9fafb;
    z-index: 10;
    box-shadow: 4px 0 8px -4px rgba(0, 0, 0, 0.1);
  `}
  ${(props) =>
    props.sticky === 'right' &&
    `
    position: sticky;
    right: 0;
    background-color: #f9fafb;
    z-index: 10;
    text-align: right;
    box-shadow: -4px 0 8px -4px rgba(0, 0, 0, 0.1);
  `}
`;

export const TableBody = styled.tbody`
  & > tr {
    border-top: 1px solid #dde0e4;
  }
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(249, 250, 251, 0.5);
  }
`;

export const TableCell = styled.td<{ sticky?: 'left' | 'right' }>`
  padding: 1rem 1.5rem;
  ${(props) =>
    props.sticky === 'left' &&
    `
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 10;
    box-shadow: 4px 0 8px -4px rgba(0, 0, 0, 0.1);
  `}
  ${(props) =>
    props.sticky === 'right' &&
    `
    position: sticky;
    right: 0;
    background-color: white;
    z-index: 10;
    text-align: right;
    box-shadow: -4px 0 8px -4px rgba(0, 0, 0, 0.1);
  `}
`;

export const DocumentCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const DocumentIcon = styled.span`
  color: #607afb;
`;

export const DocumentName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #121417;
`;

export const TypeBadge = styled.span`
  padding: 0.25rem 0.625rem;
  background-color: rgba(96, 122, 251, 0.1);
  color: #607afb;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const DateText = styled.span`
  font-size: 0.875rem;
  color: #677583;
`;

export const StatusBadge = styled.span<{ status: 'Completed' | 'Draft' | 'In Progress' }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => {
    switch (props.status) {
      case 'Completed':
        return '#607afb';
      case 'Draft':
        return 'rgba(96, 122, 251, 0.7)';
      case 'In Progress':
        return '#f59e0b';
      default:
        return '#607afb';
    }
  }};
`;

export const ActionButton = styled.button`
  padding: 0.5rem;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #607afb;
  }
`;
