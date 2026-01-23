import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { updatePaperSettings, updateQuestionConfig, startGenerating, generateSuccess } from '../../actions';
import { selectPaperSettings, selectTotalMarks, selectDifficultyLevel, selectQuestionConfigs } from '../../selectors';
import {
  PaperSettingsSection,
  SettingsHeader,
  SettingsTitleSection,
  SettingsIcon,
  SettingsTitle,
  LiveTotalBadge,
  LiveTotalLabel,
  LiveTotalValue,
  ScrollContent,
  SettingsGrid,
  FormGroup,
  FormLabel,
  Select,
  QuestionConfigSection,
  ConfigHeaderRow,
  ConfigLabel,
  AddCustomButton,
  AddIcon,
  QuestionConfigRow,
  ConfigTypeSection,
  ConfigTypeName,
  ConfigTypeSection2,
  ConfigInput,
  ConfigMultiplier,
  ConfigResult,
  ResultValue,
  TotalMarksDisplay,
  TotalMarksLabel,
  TotalMarksValue,
  TotalMarksNumber,
  TotalMarksTarget,
  DifficultySection,
  DifficultyLabel,
  DifficultyGrid,
  DifficultyButton,
  SettingsFooter,
  GenerateButton,
  GenerateIcon,
} from './PaperSettings.styles';

export const PaperSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const paperSettings = useAppSelector(selectPaperSettings);
  const totalMarks = useAppSelector(selectTotalMarks);
  const difficultyLevel = useAppSelector(selectDifficultyLevel);
  const questionConfigs = useAppSelector(selectQuestionConfigs);

  const handleBoardPatternChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updatePaperSettings({ boardPattern: e.target.value as any }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updatePaperSettings({ totalDuration: parseInt(e.target.value) as any }));
  };

  const handleDifficultyChange = (level: 'EASY' | 'BALANCED' | 'RIGOROUS') => {
    dispatch(updatePaperSettings({ difficultyLevel: level }));
  };

  const handleQuestionConfigChange = (
    configIndex: number,
    field: 'count' | 'marksPerQuestion',
    value: number,
  ) => {
    const config = questionConfigs[configIndex];
    const updatedConfig = {
      ...config,
      [field]: value,
      totalMarks: field === 'count' ? value * config.marksPerQuestion : config.count * value,
    };
    dispatch(updateQuestionConfig(updatedConfig));
  };

  const handleGeneratePaper = () => {
    dispatch(startGenerating());
    // Simulate paper generation
    setTimeout(() => {
      dispatch(generateSuccess('Paper generated successfully'));
    }, 2000);
  };

  return (
    <PaperSettingsSection id="section-settings">
      <SettingsHeader>
        <SettingsTitleSection>
          <SettingsIcon className="material-symbols-outlined">tune</SettingsIcon>
          <SettingsTitle>Paper Settings</SettingsTitle>
        </SettingsTitleSection>
        <LiveTotalBadge>
          <LiveTotalLabel>Live Total:</LiveTotalLabel>
          <LiveTotalValue>{totalMarks} Marks</LiveTotalValue>
        </LiveTotalBadge>
      </SettingsHeader>

      <ScrollContent>
        <SettingsGrid>
          <FormGroup>
            <FormLabel>Board Pattern</FormLabel>
            <Select onChange={handleBoardPatternChange} value={paperSettings.boardPattern}>
              <option value="CBSE">CBSE (Central Board)</option>
              <option value="ICSE">ICSE / ISC</option>
              <option value="STATE_BOARD">State Board</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>Total Duration</FormLabel>
            <Select onChange={handleDurationChange} value={paperSettings.totalDuration}>
              <option value="180">180 Minutes</option>
              <option value="120">120 Minutes</option>
              <option value="90">90 Minutes</option>
            </Select>
          </FormGroup>
        </SettingsGrid>

        <QuestionConfigSection>
          <ConfigHeaderRow>
            <ConfigLabel>Question Configuration</ConfigLabel>
            <AddCustomButton>
              <AddIcon className="material-symbols-outlined">add_circle</AddIcon>
              Add Custom Type
            </AddCustomButton>
          </ConfigHeaderRow>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {questionConfigs.map((config, index) => (
              <QuestionConfigRow key={config.type}>
                <ConfigTypeSection>
                  <ConfigTypeName>{config.type}</ConfigTypeName>
                  <ConfigTypeSection2>{config.section}</ConfigTypeSection2>
                </ConfigTypeSection>
                <div style={{ gridColumn: 'span 3' }}>
                  <ConfigInput
                    min="1"
                    onChange={(e) => handleQuestionConfigChange(index, 'count', parseInt(e.target.value))}
                    type="number"
                    value={config.count}
                  />
                </div>
                <ConfigMultiplier>×</ConfigMultiplier>
                <div style={{ gridColumn: 'span 2' }}>
                  <ConfigInput
                    min="1"
                    onChange={(e) =>
                      handleQuestionConfigChange(index, 'marksPerQuestion', parseInt(e.target.value))
                    }
                    type="number"
                    value={config.marksPerQuestion}
                  />
                </div>
                <ConfigResult>
                  <ResultValue>{config.totalMarks}</ResultValue>
                </ConfigResult>
              </QuestionConfigRow>
            ))}
          </div>

          <TotalMarksDisplay>
            <TotalMarksLabel>Running Total Marks</TotalMarksLabel>
            <TotalMarksValue>
              <TotalMarksNumber>{totalMarks}</TotalMarksNumber>
              <TotalMarksTarget>/ {totalMarks} Target</TotalMarksTarget>
            </TotalMarksValue>
          </TotalMarksDisplay>
        </QuestionConfigSection>

        <DifficultySection>
          <DifficultyLabel>Difficulty Distribution</DifficultyLabel>
          <DifficultyGrid>
            <DifficultyButton $isActive={difficultyLevel === 'EASY'} onClick={() => handleDifficultyChange('EASY')}>
              Easy
            </DifficultyButton>
            <DifficultyButton $isActive={difficultyLevel === 'BALANCED'} onClick={() => handleDifficultyChange('BALANCED')}>
              Balanced
            </DifficultyButton>
            <DifficultyButton $isActive={difficultyLevel === 'RIGOROUS'} onClick={() => handleDifficultyChange('RIGOROUS')}>
              Rigorous
            </DifficultyButton>
          </DifficultyGrid>
        </DifficultySection>
      </ScrollContent>

      <SettingsFooter>
        <GenerateButton onClick={handleGeneratePaper}>
          <GenerateIcon className="material-symbols-outlined">auto_awesome</GenerateIcon>
          Generate Paper
        </GenerateButton>
      </SettingsFooter>
    </PaperSettingsSection>
  );
};
