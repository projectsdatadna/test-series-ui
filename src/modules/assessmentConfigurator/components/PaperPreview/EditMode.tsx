import React, { useState } from 'react';
import type { MCQQuestion, ShortAnswerQuestion } from '../../types';
import {
  EditModeOverlay,
  EditModeModal,
  EditModeHeader,
  EditModeTitle,
  EditModeCloseButton,
  EditModeContent,
  EditModeFooter,
  EditModeButton,
  EditSectionGroup,
  EditSectionTitle,
  EditQuestionBlock,
  EditQuestionNumber,
  EditFormGroup,
  EditLabel,
  EditTextarea,
  EditOptionsGrid,
  EditOptionBlock,
  EditOptionLabel,
  EditOptionInput,
  EditAnswerBlock,
  EditAnswerLabel,
  EditKeyPointsList,
  EditKeyPointItem,
  EditKeyPointInput,
  EditKeyPointRemoveButton,
  EditAddKeyPointButton,
  EditCorrectAnswerSelect,
  EditMarksInput,
  EditTabs,
  EditTab,
  EditTabContent,
} from './EditMode.styles';

interface EditModeProps {
  mcqQuestions: MCQQuestion[];
  shortAnswerQuestions: ShortAnswerQuestion[];
  onSave: (mcqQuestions: MCQQuestion[], shortAnswerQuestions: ShortAnswerQuestion[]) => void;
  onClose: () => void;
}

export const EditMode: React.FC<EditModeProps> = ({
  mcqQuestions,
  shortAnswerQuestions,
  onSave,
  onClose,
}) => {
  const [editedMCQs, setEditedMCQs] = useState<MCQQuestion[]>(JSON.parse(JSON.stringify(mcqQuestions)));
  const [editedShortAnswers, setEditedShortAnswers] = useState<ShortAnswerQuestion[]>(
    JSON.parse(JSON.stringify(shortAnswerQuestions))
  );
  const [activeTab, setActiveTab] = useState<'mcq' | 'short'>('mcq');

  const handleMCQChange = (index: number, field: keyof MCQQuestion, value: any) => {
    const updated = [...editedMCQs];
    updated[index] = { ...updated[index], [field]: value };
    setEditedMCQs(updated);
  };

  const handleMCQOptionChange = (index: number, option: 'A' | 'B' | 'C' | 'D', value: string) => {
    const updated = [...editedMCQs];
    updated[index].options[option] = value;
    setEditedMCQs(updated);
  };

  const handleShortAnswerChange = (index: number, field: keyof ShortAnswerQuestion, value: any) => {
    const updated = [...editedShortAnswers];
    updated[index] = { ...updated[index], [field]: value };
    setEditedShortAnswers(updated);
  };

  const handleKeyPointChange = (questionIndex: number, pointIndex: number, value: string) => {
    const updated = [...editedShortAnswers];
    updated[questionIndex].keyPoints[pointIndex] = value;
    setEditedShortAnswers(updated);
  };

  const handleRemoveKeyPoint = (questionIndex: number, pointIndex: number) => {
    const updated = [...editedShortAnswers];
    updated[questionIndex].keyPoints.splice(pointIndex, 1);
    setEditedShortAnswers(updated);
  };

  const handleAddKeyPoint = (questionIndex: number) => {
    const updated = [...editedShortAnswers];
    updated[questionIndex].keyPoints.push('');
    setEditedShortAnswers(updated);
  };

  const handleSave = () => {
    onSave(editedMCQs, editedShortAnswers);
  };

  return (
    <EditModeOverlay onClick={onClose}>
      <EditModeModal onClick={(e) => e.stopPropagation()}>
        <EditModeHeader>
          <EditModeTitle>Edit Question Paper</EditModeTitle>
          <EditModeCloseButton onClick={onClose}>✕</EditModeCloseButton>
        </EditModeHeader>

        <EditModeContent>
          <EditTabs>
            <EditTab $active={activeTab === 'mcq'} onClick={() => setActiveTab('mcq')}>
              MCQ Questions ({editedMCQs.length})
            </EditTab>
            <EditTab $active={activeTab === 'short'} onClick={() => setActiveTab('short')}>
              Short Answer Questions ({editedShortAnswers.length})
            </EditTab>
          </EditTabs>

          {/* MCQ Section */}
          <EditTabContent className={activeTab === 'mcq' ? 'active' : ''}>
            <EditSectionGroup>
              <EditSectionTitle>Multiple Choice Questions</EditSectionTitle>
              {editedMCQs.map((question, index) => (
                <EditQuestionBlock key={index}>
                  <EditQuestionNumber>Question {question.questionNumber}</EditQuestionNumber>

                  <EditFormGroup>
                    <EditLabel>Question Text</EditLabel>
                    <EditTextarea
                      value={question.question}
                      onChange={(e) => handleMCQChange(index, 'question', e.target.value)}
                    />
                  </EditFormGroup>

                  <EditFormGroup>
                    <EditLabel>Options</EditLabel>
                    <EditOptionsGrid>
                      {(['A', 'B', 'C', 'D'] as const).map((option) => (
                        <EditOptionBlock key={option}>
                          <EditOptionLabel>Option {option}</EditOptionLabel>
                          <EditOptionInput
                            value={question.options[option]}
                            onChange={(e) => handleMCQOptionChange(index, option, e.target.value)}
                          />
                        </EditOptionBlock>
                      ))}
                    </EditOptionsGrid>
                  </EditFormGroup>

                  <EditAnswerBlock>
                    <EditFormGroup>
                      <EditAnswerLabel>Correct Answer</EditAnswerLabel>
                      <EditCorrectAnswerSelect
                        value={question.correctAnswer}
                        onChange={(e) => handleMCQChange(index, 'correctAnswer', e.target.value)}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </EditCorrectAnswerSelect>
                    </EditFormGroup>

                    <EditFormGroup>
                      <EditAnswerLabel>Explanation</EditAnswerLabel>
                      <EditTextarea
                        value={question.explanation}
                        onChange={(e) => handleMCQChange(index, 'explanation', e.target.value)}
                      />
                    </EditFormGroup>
                  </EditAnswerBlock>
                </EditQuestionBlock>
              ))}
            </EditSectionGroup>
          </EditTabContent>

          {/* Short Answer Section */}
          <EditTabContent className={activeTab === 'short' ? 'active' : ''}>
            <EditSectionGroup>
              <EditSectionTitle>Short Answer Questions</EditSectionTitle>
              {editedShortAnswers.map((question, index) => (
                <EditQuestionBlock key={index}>
                  <EditQuestionNumber>Question {question.questionNumber}</EditQuestionNumber>

                  <EditFormGroup>
                    <EditLabel>Question Text</EditLabel>
                    <EditTextarea
                      value={question.question}
                      onChange={(e) => handleShortAnswerChange(index, 'question', e.target.value)}
                    />
                  </EditFormGroup>

                  <EditFormGroup>
                    <EditLabel>Marks Allocated</EditLabel>
                    <EditMarksInput
                      type="number"
                      min="1"
                      value={question.marksAllocated}
                      onChange={(e) =>
                        handleShortAnswerChange(index, 'marksAllocated', parseInt(e.target.value))
                      }
                    />
                  </EditFormGroup>

                  <EditAnswerBlock>
                    <EditFormGroup>
                      <EditAnswerLabel>Expected Answer</EditAnswerLabel>
                      <EditTextarea
                        value={question.expectedAnswer}
                        onChange={(e) =>
                          handleShortAnswerChange(index, 'expectedAnswer', e.target.value)
                        }
                      />
                    </EditFormGroup>

                    <EditFormGroup>
                      <EditAnswerLabel>Key Points</EditAnswerLabel>
                      <EditKeyPointsList>
                        {question.keyPoints.map((point, pointIndex) => (
                          <EditKeyPointItem key={pointIndex}>
                            <EditKeyPointInput
                              value={point}
                              onChange={(e) =>
                                handleKeyPointChange(index, pointIndex, e.target.value)
                              }
                              placeholder={`Key point ${pointIndex + 1}`}
                            />
                            <EditKeyPointRemoveButton
                              onClick={() => handleRemoveKeyPoint(index, pointIndex)}
                            >
                              Remove
                            </EditKeyPointRemoveButton>
                          </EditKeyPointItem>
                        ))}
                      </EditKeyPointsList>
                      <EditAddKeyPointButton onClick={() => handleAddKeyPoint(index)}>
                        + Add Key Point
                      </EditAddKeyPointButton>
                    </EditFormGroup>
                  </EditAnswerBlock>
                </EditQuestionBlock>
              ))}
            </EditSectionGroup>
          </EditTabContent>
        </EditModeContent>

        <EditModeFooter>
          <EditModeButton $variant="secondary" onClick={onClose}>
            Cancel
          </EditModeButton>
          <EditModeButton $variant="primary" onClick={handleSave}>
            Save Changes
          </EditModeButton>
        </EditModeFooter>
      </EditModeModal>
    </EditModeOverlay>
  );
};
