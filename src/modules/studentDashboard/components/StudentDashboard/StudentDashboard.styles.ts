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

export const PointsBadge = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #60688a;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
`;

export const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const MetricLabel = styled.h3`
  color: #60688a;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

export const MetricBadge = styled.span<{ variant: 'primary' | 'success' | 'warning' | 'danger' }>`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `background-color: rgba(79, 110, 247, 0.1); color: #4f6ef7;`;
      case 'success':
        return `background-color: #dcfce7; color: #16a34a;`;
      case 'warning':
        return `background-color: #fef3c7; color: #d97706;`;
      case 'danger':
        return `background-color: #fee2e2; color: #dc2626;`;
      default:
        return `background-color: #f3f4f6; color: #60688a;`;
    }
  }}
`;

export const MetricIcon = styled.div<{ bgColor: string; textColor: string }>`
  padding: 0.5rem;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MetricValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111218;
  margin: 0.25rem 0 0 0;
`;

export const MetricChart = styled.div`
  margin-top: 1rem;
  height: 2rem;
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const ChartBar = styled.div<{ height: number; color: string }>`
  flex: 1;
  height: ${props => props.height}%;
  background-color: ${props => props.color};
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
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
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
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const PathItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  &.highlighted {
    background-color: rgba(79, 110, 247, 0.05);
    border-color: rgba(79, 110, 247, 0.1);
  }
`;

export const PathIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  color: #4f6ef7;
  flex-shrink: 0;
`;

export const PathContent = styled.div`
  flex: 1;
`;

export const PathTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: #111218;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PathMatch = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  background-color: #dcfce7;
  color: #16a34a;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
`;

export const PathDescription = styled.p`
  font-size: 0.75rem;
  color: #60688a;
  margin: 0.25rem 0 0 0;
`;

export const PathButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: #111218;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

export const PerformanceSection = styled.div``;

export const PerformanceSectionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #60688a;
  margin: 0 0 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PerformanceTrend = styled.span<{ isPositive: boolean }>`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${props => (props.isPositive ? '#10b981' : '#ef4444')};
`;

export const ChartContainer = styled.div`
  height: 4rem;
  display: flex;
  align-items: flex-end;
  gap: 0.375rem;
`;

export const PerformanceLabel = styled.p`
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #60688a;
  text-align: center;
`;

export const PerformanceValue = styled.span`
  color: #111218;
  font-weight: 700;
`;

export const ResumeCard = styled.div`
  background: linear-gradient(135deg, #4f6ef7 0%, #3d5ad1 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(79, 110, 247, 0.2);
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8rem;
    height: 8rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    transform: translate(2rem, -2rem);
  }
`;

export const ResumeLabel = styled.div`
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ResumeTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  position: relative;
  z-index: 1;
`;

export const ResumeDescription = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1rem 0;
  position: relative;
  z-index: 1;
`;

export const ResumeButton = styled.button`
  width: 100%;
  background-color: white;
  color: #4f6ef7;
  border: none;
  padding: 0.625rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  z-index: 1;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const GoalItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const GoalLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const GoalLabelText = styled.span`
  color: #111218;
  font-weight: 500;
`;

export const GoalLabelValue = styled.span`
  color: #60688a;
`;

export const GoalTrack = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
`;

export const GoalFill = styled.div<{ percentage: number; color?: string }>`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => props.color || '#4f6ef7'};
  border-radius: 9999px;
`;

export const StudyGroupItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.75rem;

  &:hover {
    background-color: #f9fafb;
    border-color: #e5e7eb;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StudyGroupIcon = styled.div<{ bgColor: string; textColor: string }>`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StudyGroupContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StudyGroupTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: #111218;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StudyGroupInfo = styled.p`
  font-size: 0.625rem;
  color: #60688a;
  margin: 0;
`;
