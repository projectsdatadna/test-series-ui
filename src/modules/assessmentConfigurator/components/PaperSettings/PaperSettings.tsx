import React, { useState } from 'react';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { updatePaperSettings, updateQuestionConfig, startGenerating, generateSuccess } from '../../actions';
import { selectPaperSettings, selectTotalMarks, selectDifficultyLevel, selectQuestionConfigs, selectSelectedChapterFileId, selectSelectedSubjectName, selectSelectedChapterName } from '../../selectors';
import { generateQuestions } from '../../services/assessmentService';
import toast from 'react-hot-toast';
import type { QuestionConfig } from '../../types';
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
  const [showCustomTypeForm, setShowCustomTypeForm] = useState(false);
  const [customTypeName, setCustomTypeName] = useState('');
  const [customTypeCount, setCustomTypeCount] = useState(1);
  const [customTypeMarks, setCustomTypeMarks] = useState(1);
  const [customTypeCompulsory, setCustomTypeCompulsory] = useState(0);
  
  const paperSettings = useAppSelector(selectPaperSettings);
  const totalMarks = useAppSelector(selectTotalMarks);
  const difficultyLevel = useAppSelector(selectDifficultyLevel);
  const questionConfigs = useAppSelector(selectQuestionConfigs);
  const selectedChapterFileId = useAppSelector(selectSelectedChapterFileId);
  const selectedSubjectName = useAppSelector(selectSelectedSubjectName);
  const selectedChapterName = useAppSelector(selectSelectedChapterName);

  const durationOptions = [
    { value: 180, label: '180 Minutes' },
    { value: 120, label: '120 Minutes' },
    { value: 90, label: '90 Minutes' },
  ];

  const handleDurationChange = (option: { value: number; label: string } | null) => {
    if (option) {
      dispatch(updatePaperSettings({ totalDuration: option.value as 180 | 120 | 90 }));
    }
  };

  const handleDifficultyChange = (level: 'EASY' | 'BALANCED' | 'RIGOROUS') => {
    dispatch(updatePaperSettings({ difficultyLevel: level }));
  };

  const handleQuestionConfigChange = (
    configIndex: number,
    field: 'count' | 'marksPerQuestion' | 'compulsoryCount',
    value: number,
  ) => {
    const config = questionConfigs[configIndex];
    const compulsoryCount = field === 'compulsoryCount' ? value : (config.compulsoryCount || 0);
    const marksPerQuestion = field === 'marksPerQuestion' ? value : config.marksPerQuestion;
    const updatedConfig: QuestionConfig = {
      ...config,
      [field]: value,
      totalMarks: compulsoryCount * marksPerQuestion,
    };
    dispatch(updateQuestionConfig(updatedConfig));
  };

  const handleAddCustomType = () => {
    if (!customTypeName.trim()) {
      toast.error('Please enter a custom type name');
      return;
    }

    const newCustomType: QuestionConfig = {
      type: customTypeName,
      section: `Section ${String.fromCharCode(65 + questionConfigs.length)}`,
      count: customTypeCount,
      marksPerQuestion: customTypeMarks,
      totalMarks: customTypeCompulsory * customTypeMarks,
      compulsoryCount: customTypeCompulsory,
      isCustom: true,
    };

    dispatch(updateQuestionConfig(newCustomType));
    setCustomTypeName('');
    setCustomTypeCount(1);
    setCustomTypeMarks(1);
    setCustomTypeCompulsory(0);
    setShowCustomTypeForm(false);
    toast.success('Custom question type added');
  };

  const handleGeneratePaper = async () => {
    try {
      if (!selectedChapterFileId) {
        toast.error('Please select a chapter first');
        return;
      }

      dispatch(startGenerating());

      const mcqConfig = questionConfigs.find((c) => c.type === 'MCQs');
      const shortAnsConfig = questionConfigs.find((c) => c.type === 'Short Ans');
      const customConfigs = questionConfigs.filter((c) => c.isCustom);

      const response = await generateQuestions({
        fileId: selectedChapterFileId,
        duration: paperSettings.totalDuration,
        mcqCount: mcqConfig?.count || 10,
        mcqMarks: mcqConfig?.marksPerQuestion || 1,
        mcqCompulsory: mcqConfig?.compulsoryCount || 0,
        shortAnswerCount: shortAnsConfig?.count || 5,
        shortAnswerMarks: shortAnsConfig?.marksPerQuestion || 2,
        shortAnswerCompulsory: shortAnsConfig?.compulsoryCount || 0,
        customQuestions: customConfigs.map((c) => ({
          type: c.type,
          section: c.section,
          count: c.count,
          marks: c.marksPerQuestion,
          compulsory: c.compulsoryCount || 0,
        })),
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
            <Select
              options={durationOptions}
              value={durationOptions.find((opt) => opt.value === paperSettings.totalDuration)}
              onChange={handleDurationChange}
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#e2e8f0',
                  borderRadius: '0.375rem',
                  padding: '0.25rem',
                  fontSize: '0.875rem',
                }),
              }}
            />
          </FormGroup>
        </SettingsGrid>

        <QuestionConfigSection>
          <ConfigHeaderRow>
            <ConfigLabel>Question Configuration</ConfigLabel>
            <AddCustomButton onClick={() => setShowCustomTypeForm(!showCustomTypeForm)}>
              <AddIcon className="material-symbols-outlined">add_circle</AddIcon>
              Add Custom Type
            </AddCustomButton>
          </ConfigHeaderRow>

          {showCustomTypeForm && (
            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.375rem', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Type Name</label>
                <ConfigInput
                  placeholder="e.g., Essay"
                  value={customTypeName}
                  onChange={(e) => setCustomTypeName(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>No. of Qs</label>
                <ConfigInput
                  type="number"
                  min="1"
                  value={customTypeCount}
                  onChange={(e) => setCustomTypeCount(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Marks</label>
                <ConfigInput
                  type="number"
                  min="1"
                  value={customTypeMarks}
                  onChange={(e) => setCustomTypeMarks(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Compulsory</label>
                <ConfigInput
                  type="number"
                  min="0"
                  max={customTypeCount}
                  value={customTypeCompulsory}
                  onChange={(e) => setCustomTypeCompulsory(parseInt(e.target.value))}
                />
              </div>
              <button
                onClick={handleAddCustomType}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Add Type
              </button>
              <button
                onClick={() => setShowCustomTypeForm(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e2e8f0',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
            </div>
          )}

          <QuestionConfigLabelRow>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 3' }}>Type</QuestionConfigLabelItem>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 2' }}>No. Qs</QuestionConfigLabelItem>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 2' }}>Comp.</QuestionConfigLabelItem>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 1' }}>×</QuestionConfigLabelItem>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 2' }}>Marks</QuestionConfigLabelItem>
            <QuestionConfigLabelItem style={{ gridColumn: 'span 1' }}>Total</QuestionConfigLabelItem>
          </QuestionConfigLabelRow>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {questionConfigs
              .sort((a, b) => {
                // Sort order: MCQs first, then Short Ans, then custom types
                const typeOrder = { 'MCQs': 0, 'Short Ans': 1 };
                const aOrder = typeOrder[a.type as keyof typeof typeOrder] ?? 2;
                const bOrder = typeOrder[b.type as keyof typeof typeOrder] ?? 2;
                return aOrder - bOrder;
              })
              .map((config, index) => (
              <QuestionConfigRow key={config.type}>
                <ConfigTypeSection>
                  <ConfigTypeName>{config.type}</ConfigTypeName>
                  <ConfigTypeSection2>{config.section}</ConfigTypeSection2>
                </ConfigTypeSection>
                <div style={{ gridColumn: 'span 2' }}>
                  <ConfigInput
                    min="1"
                    onChange={(e) => handleQuestionConfigChange(index, 'count', parseInt(e.target.value))}
                    type="number"
                    value={config.count}
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <ConfigInput
                    min="0"
                    max={config.count}
                    onChange={(e) => handleQuestionConfigChange(index, 'compulsoryCount', parseInt(e.target.value))}
                    type="number"
                    value={config.compulsoryCount || 0}
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
