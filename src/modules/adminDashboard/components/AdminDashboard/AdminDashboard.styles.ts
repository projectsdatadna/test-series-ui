import styled from 'styled-components';

export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111218;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: #60688a;
  font-size: 0.875rem;
  margin: 0.25rem 0 0 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &.primary {
    background-color: #4f6ef7;
    color: white;
    box-shadow: 0 4px 6px rgba(79, 110, 247, 0.2);

    &:hover {
      background-color: #3d5ad1;
    }
  }

  &.secondary {
    background-color: white;
    color: #111218;
    border: 1px solid #e2e8f0;

    &:hover {
      background-color: #f9fafb;
    }
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const MetricCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f1f5;
  display: flex;
  flex-direction: column;
`;

export const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const MetricLabel = styled.span`
  color: #60688a;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const MetricIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f6ef7;
  font-size: 1.25rem;
`;

export const MetricValue = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
`;

export const MetricNumber = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111218;
  margin: 0;
`;

export const MetricChange = styled.span<{ isPositive: boolean }>`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${props => (props.isPositive ? '#10b981' : '#ef4444')};
  padding-bottom: 0.25rem;
`;

export const MetricChart = styled.div`
  margin-top: 1rem;
  height: 2rem;
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const ChartBar = styled.div<{ height: number }>`
  flex: 1;
  height: ${props => props.height}%;
  background-color: #4f6ef7;
  border-radius: 0.125rem 0.125rem 0 0;
  opacity: 0.6;

  &:last-child {
    opacity: 1;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f1f5;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f0f1f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #111218;
  margin: 0;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProgressLabel = styled.div`
  width: 6rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #60688a;
`;

export const ProgressTrack = styled.div`
  flex: 1;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: #4f6ef7;
  border-radius: 9999px;
`;

export const ProgressValue = styled.div`
  width: 3rem;
  text-align: right;
  font-size: 0.75rem;
  font-weight: 700;
  color: #111218;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f9fafb;
  border-bottom: 1px solid #f0f1f5;
`;

export const TableHeaderCell = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #60688a;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #f0f1f5;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: #111218;
`;

export const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const UserAvatar = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 700;
  color: #60688a;
`;

export const Badge = styled.span<{ variant: 'default' | 'success' | 'warning' | 'error' }>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  ${props => {
    switch (props.variant) {
      case 'success':
        return `background-color: #d1fae5; color: #065f46;`;
      case 'warning':
        return `background-color: #fef3c7; color: #92400e;`;
      case 'error':
        return `background-color: #fee2e2; color: #991b1b;`;
      default:
        return `background-color: #f3f4f6; color: #60688a;`;
    }
  }}
`;
