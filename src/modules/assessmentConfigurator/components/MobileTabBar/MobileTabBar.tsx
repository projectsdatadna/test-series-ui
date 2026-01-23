import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { setActiveTab, toggleAnswerKey } from '../../actions';
import { selectActiveTab, selectTotalMarks, selectShowAnswerKey } from '../../selectors';
import {
  MobileTabBarWrapper,
  TabLabel,
  MobileStatsBar,
  StatsLabel,
  StatsValue,
  StatsNumber,
  StatsTarget,
  StatsControls,
  StatsDivider,
  ToggleWrapper,
  ToggleLabel,
  ToggleSwitch,
} from './MobileTabBar.styles';

export const MobileTabBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveTab);
  const totalMarks = useAppSelector(selectTotalMarks);
  const showAnswerKey = useAppSelector(selectShowAnswerKey);

  const handleTabChange = (tab: 'source' | 'settings' | 'preview') => {
    dispatch(setActiveTab(tab));
  };

  const handleAnswerKeyToggle = () => {
    dispatch(toggleAnswerKey());
  };

  return (
    <>
      <MobileStatsBar>
        <div>
          <StatsLabel>Running Total Marks</StatsLabel>
          <StatsValue>
            <StatsNumber>{totalMarks}</StatsNumber>
            <StatsTarget>/ {totalMarks} Target</StatsTarget>
          </StatsValue>
        </div>
        <StatsControls>
          <StatsDivider />
          <ToggleWrapper>
            <ToggleLabel>Key</ToggleLabel>
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <input
                checked={showAnswerKey}
                onChange={handleAnswerKeyToggle}
                style={{ display: 'none' }}
                type="checkbox"
              />
              <ToggleSwitch />
            </div>
          </ToggleWrapper>
        </StatsControls>
      </MobileStatsBar>

      <MobileTabBarWrapper>
        <TabLabel $isActive={activeTab === 'source'} onClick={() => handleTabChange('source')}>
          Source
        </TabLabel>
        <TabLabel $isActive={activeTab === 'settings'} onClick={() => handleTabChange('settings')}>
          Settings
        </TabLabel>
        <TabLabel $isActive={activeTab === 'preview'} onClick={() => handleTabChange('preview')}>
          Preview
        </TabLabel>
      </MobileTabBarWrapper>
    </>
  );
};
