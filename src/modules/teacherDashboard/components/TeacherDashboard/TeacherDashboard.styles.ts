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

export const DateRange = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #60688a;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
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

export const MetricTrend = styled.div<{ isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${props => (props.isPositive ? '#10b981' : '#ef4444')};
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

export const RecommendationItem = styled.div`
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

export const RecommendationAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  font-size: 0.875rem;
  font-weight: 700;
  color: #60688a;
`;

export const RecommendationContent = styled.div`
  flex: 1;
`;

export const RecommendationTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: #111218;
  margin: 0;
`;

export const RecommendationDescription = styled.p`
  font-size: 0.75rem;
  color: #60688a;
  margin: 0.25rem 0 0 0;
`;

export const RecommendationButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4f6ef7;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3d5ad1;
  }
`;

export const ActivityItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

export const ActivityIcon = styled.div<{ bgColor: string; textColor: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityTitle = styled.p`
  font-size: 0.875rem;
  color: #111218;
  margin: 0;
  font-weight: 500;
`;

export const ActivityTime = styled.p`
  font-size: 0.75rem;
  color: #60688a;
  margin: 0.25rem 0 0 0;
`;

export const QuickActionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.75rem;
  border: none;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.75rem;

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
    color: #4f6ef7;
    border: 1px solid rgba(79, 110, 247, 0.2);

    &:hover {
      background-color: rgba(79, 110, 247, 0.05);
    }
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

export const GoalFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: #4f6ef7;
  border-radius: 9999px;
`;

export const HighlightCard = styled.div`
  background: linear-gradient(135deg, #4f6ef7 0%, #3d5ad1 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(79, 110, 247, 0.2);
  position: relative;
  overflow: hidden;

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

export const HighlightTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  position: relative;
  z-index: 1;
`;

export const HighlightDescription = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1rem 0;
  position: relative;
  z-index: 1;
`;

export const HighlightButton = styled.button`
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
