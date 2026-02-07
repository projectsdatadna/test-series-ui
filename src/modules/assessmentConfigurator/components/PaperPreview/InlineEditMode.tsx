import React, { useState, useEffect } from 'react';
import type { MCQQuestion, ShortAnswerQuestion } from '../../types';
import {
  EditableQuestionText,
  EditableAnswerText,
} from './PaperPreview.styles';

export const useInlineEditMode = (
  mcqQuestions: MCQQuestion[],
  shortAnswerQuestions: ShortAnswerQuestion[]
) => {
  const [editedMCQs, setEditedMCQs] = useState<MCQQuestion[]>(mcqQuestions);
  const [editedShortAnswers, setEditedShortAnswers] = useState<ShortAnswerQuestion[]>(
    shortAnswerQuestions
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  // Sync state when input questions change
  useEffect(() => {
    setEditedMCQs(mcqQuestions);
  }, [mcqQuestions]);

  useEffect(() => {
    setEditedShortAnswers(shortAnswerQuestions);
  }, [shortAnswerQuestions]);

  const handleMCQQuestionEdit = (index: number, newText: string) => {
    if (index < 0 || index >= editedMCQs.length) return;
    const updated = [...editedMCQs];
    updated[index].question = newText;
    setEditedMCQs(updated);
  };

  const handleMCQOptionEdit = (index: number, option: 'A' | 'B' | 'C' | 'D', newText: string) => {
    if (index < 0 || index >= editedMCQs.length) return;
    const updated = [...editedMCQs];
    updated[index].options[option] = newText;
    setEditedMCQs(updated);
  };

  const handleMCQExplanationEdit = (index: number, newText: string) => {
    if (index < 0 || index >= editedMCQs.length) return;
    const updated = [...editedMCQs];
    updated[index].explanation = newText;
    setEditedMCQs(updated);
  };

  const handleShortAnswerQuestionEdit = (index: number, newText: string) => {
    if (index < 0 || index >= editedShortAnswers.length) return;
    const updated = [...editedShortAnswers];
    updated[index].question = newText;
    setEditedShortAnswers(updated);
  };

  const handleShortAnswerEdit = (index: number, newText: string) => {
    if (index < 0 || index >= editedShortAnswers.length) return;
    const updated = [...editedShortAnswers];
    updated[index].expectedAnswer = newText;
    setEditedShortAnswers(updated);
  };

  const handleKeyPointEdit = (questionIndex: number, pointIndex: number, newText: string) => {
    if (questionIndex < 0 || questionIndex >= editedShortAnswers.length) return;
    const updated = [...editedShortAnswers];
    updated[questionIndex].keyPoints[pointIndex] = newText;
    setEditedShortAnswers(updated);
  };

  const handleAddKeyPoint = (questionIndex: number) => {
    const updated = [...editedShortAnswers];
    updated[questionIndex].keyPoints.push('');
    setEditedShortAnswers(updated);
  };

  const handleRemoveKeyPoint = (questionIndex: number, pointIndex: number) => {
    const updated = [...editedShortAnswers];
    updated[questionIndex].keyPoints.splice(pointIndex, 1);
    setEditedShortAnswers(updated);
  };

  const saveChanges = () => {
    return { editedMCQs, editedShortAnswers };
  };

  const resetChanges = () => {
    setEditedMCQs(mcqQuestions);
    setEditedShortAnswers(shortAnswerQuestions);
  };

  return {
    editedMCQs,
    editedShortAnswers,
    editingId,
    setEditingId,
    handleMCQQuestionEdit,
    handleMCQOptionEdit,
    handleMCQExplanationEdit,
    handleShortAnswerQuestionEdit,
    handleShortAnswerEdit,
    handleKeyPointEdit,
    handleAddKeyPoint,
    handleRemoveKeyPoint,
    saveChanges,
    resetChanges,
  };
};

// Editable text component
export const EditableText: React.FC<{
  value: string;
  isEditing: boolean;
  onEdit: (newValue: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  multiline?: boolean;
  className?: string;
}> = ({ value, isEditing, onEdit, onFocus, onBlur, multiline = false, className }) => {
  if (!isEditing) {
    return <span className={className}>{value}</span>;
  }

  if (multiline) {
    return (
      <EditableAnswerText
        value={value}
        onChange={(e) => onEdit(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus
      />
    );
  }

  return (
    <EditableQuestionText
      value={value}
      onChange={(e) => onEdit(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus
    />
  );
};
