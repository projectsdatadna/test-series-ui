import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { updatePaperSettings, updateQuestionConfig, startGenerating, generateSuccess } from '../../actions';
import { selectPaperSettings, selectTotalMarks, selectDifficultyLevel, selectQuestionConfigs, selectSelectedChapterFileId, selectSelectedSubjectName, selectSelectedChapterName } from '../../selectors';
import { generateQuestions } from '../../services/assessmentService';
import toast from 'react-hot-toast';
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
  QuestionConfigLabelRow,
  QuestionConfigLabelItem,
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
  const selectedChapterFileId = useAppSelector(selectSelectedChapterFileId);
  const selectedSubjectName = useAppSelector(selectSelectedSubjectName);
  const selectedChapterName = useAppSelector(selectSelectedChapterName);

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

  const handleGeneratePaper = async () => {
    try {
      if (!selectedChapterFileId) {
        toast.error('Please select a chapter first');
        return;
      }

      dispatch(startGenerating());

      const response = await generateQuestions({
        fileId: selectedChapterFileId,
        duration: paperSettings.totalDuration,
        mcqCount: questionConfigs.find((c) => c.type === 'MCQs')?.count || 10,
        shortAnswerCount: questionConfigs.find((c) => c.type === 'Short Ans')?.count || 5,
        difficultyLevel: paperSettings.difficultyLevel.toLowerCase(),
        subject: selectedSubjectName || '',
        topic: selectedChapterName || '',
      });

      if (response.success) {
        dispatch(generateSuccess(response?.data));
        toast.success('Paper generated successfully!');
      } else {
        throw new Error(response.message || 'Failed to generate paper');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate paper';
      toast.error(errorMessage);
      console.error('Error generating paper:', error);
    }
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
          {/* <FormGroup>
            <FormLabel>Board Pattern</FormLabel>
            <Select onChange={handleBoardPatternChange} value={paperSettings.boardPattern}>
              <option value="CBSE">CBSE (Central Board)</option>
              <option value="ICSE">ICSE / ISC</option>
              <option value="STATE_BOARD">State Board</option>
            </Select>
          </FormGroup> */}

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

          <QuestionConfigLabelRow>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 5' }}>Type</QuestionConfigLabelItem>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 3' }}>No. of Questions</QuestionConfigLabelItem>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 1' }}>×</QuestionConfigLabelItem>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 2' }}>Marks</QuestionConfigLabelItem>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 1' }}>Total</QuestionConfigLabelItem>
          </QuestionConfigLabelRow>

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
