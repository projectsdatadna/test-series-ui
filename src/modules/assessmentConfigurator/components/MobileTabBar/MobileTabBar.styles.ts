import styled from 'styled-components';

export const MobileTabBarWrapper = styled.div`
  display: none;
  position: sticky;
  top: 104px;
  z-index: 40;
  flex-direction: row;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 1023px) {
    display: flex;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
    border-bottom-color: #1e293b;
  }
`;

export const TabLabel = styled.label<{ $isActive?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;

  ${(props) =>
    props.$isActive &&
    `
    border-bottom-color: #2563eb;
    color: #2563eb;
  `}

  @media (prefers-color-scheme: dark) {
    color: #64748b;

    ${(props) =>
      props.$isActive &&
      `
      color: #2563eb;
    `}
  }
`;

export const MobileStatsBar = styled.div`
  display: flex;
  position: sticky;
  top: 60px;
  z-index: 40;
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const StatsLabel = styled.span`
  font-size: 0.5625rem;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0.8;
`;

export const StatsValue = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatsNumber = styled.span`
  font-size: 1.125rem;
  font-weight: 900;
  line-height: 1;
`;

export const StatsTarget = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
`;

export const StatsControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatsDivider = styled.div`
  height: 2rem;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const ToggleWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const ToggleLabel = styled.span`
  font-size: 0.5625rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const ToggleSwitch = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 2rem;
  height: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    background-color: white;
    border-radius: 9999px;
    height: 0.75rem;
    width: 0.75rem;
    transition: all 0.3s;
  }

  input:checked ~ &::after {
    transform: translateX(1rem);
  }
`;
