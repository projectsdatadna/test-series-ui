import type { RootState } from '../../store';

// Root selector
export const selectAssessmentConfigurator = (state: RootState) =>
  state.assessmentConfigurator;

// Tab management
export const selectActiveTab = (state: RootState) =>
  state.assessmentConfigurator.activeTab;

// Content source
export const selectContentSource = (state: RootState) =>
  state.assessmentConfigurator.contentSource;

export const selectUploadedFile = (state: RootState) =>
  state.assessmentConfigurator.contentSource.uploadedFile;

export const selectSelectedChapters = (state: RootState) =>
  state.assessmentConfigurator.contentSource.selectedChapters;

export const selectSelectedChaptersCount = (state: RootState) =>
  state.assessmentConfigurator.contentSource.selectedChapters.filter(
    (chapter) => chapter.selected,
  ).length;

// Paper settings
export const selectPaperSettings = (state: RootState) =>
  state.assessmentConfigurator.paperSettings;

export const selectBoardPattern = (state: RootState) =>
  state.assessmentConfigurator.paperSettings.boardPattern;

export const selectTotalDuration = (state: RootState) =>
  state.assessmentConfigurator.paperSettings.totalDuration;

export const selectDifficultyLevel = (state: RootState) =>
  state.assessmentConfigurator.paperSettings.difficultyLevel;

export const selectTotalMarks = (state: RootState) =>
  state.assessmentConfigurator.paperSettings.totalMarks;

export const selectQuestionConfigs = (state: RootState) =>
  state.assessmentConfigurator.paperSettings.questionConfigs;

// Paper generation
export const selectShowAnswerKey = (state: RootState) =>
  state.assessmentConfigurator.showAnswerKey;

export const selectIsGenerating = (state: RootState) =>
  state.assessmentConfigurator.isGenerating;

export const selectGeneratedPaper = (state: RootState) =>
  state.assessmentConfigurator.generatedPaper;

export const selectError = (state: RootState) =>
  state.assessmentConfigurator.error;

export const selectSuccess = (state: RootState) =>
  state.assessmentConfigurator.success;
