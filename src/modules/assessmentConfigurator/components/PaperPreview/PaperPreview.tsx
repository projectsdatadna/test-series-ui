import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { toggleAnswerKey, startGenerating, generateSuccess, setActiveTab } from '../../actions';
import { selectShowAnswerKey, selectGeneratedPaper, selectIsGenerating, selectSelectedSubjectName } from '../../selectors';
import { paginateQuestions } from '../../utils/paginationUtils';
import { exportToPDFWithPuppeteer } from '../../utils/exportUtils';
import { mockPaperData } from '../../mocks';
import { useInlineEditMode } from './InlineEditMode';
import '../../styles/print.css';
import '../../styles/toggle.css';
import toast from 'react-hot-toast';
import {
  PaperPreviewSection,
  PreviewHeader,
  PreviewTitleSection,
  PreviewIcon,
  PreviewTitle,
  PreviewTitleBorderRight,
  PreviewActionsSection,
  PreviewActionButton,
  ActionIcon,
  ZoomControls,
  ZoomDisplay,
  PreviewContent,
  PreviewDocument,
  PreviewDocumentPage,
  DocumentWatermark,
  WatermarkIcon,
  DocumentContent,
  DocumentHeader,
  DocumentTitle,
  DocumentSubtitle,
  DocumentMeta,
  SectionGroup,
  SectionTitle,
  QuestionItem,
  QuestionText,
  OptionsGrid,
  OptionText,
  AnswerBox,
  AnswerLabel,
  AnswerText,
  PreviewFooter,
  FooterButton,
  FooterButtonIcon,
  FooterButtonSpan,
  SaveButton,
  CancelButton,
  EditToolbar,
  EditToolbarIcon,
} from './PaperPreview.styles';

export const PaperPreview: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isExporting, setIsExporting] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isEditMode, setIsEditMode] = useState(false);
  const showAnswerKey = useAppSelector(selectShowAnswerKey);
  const generatedPaper = useAppSelector(selectGeneratedPaper);
  const isGenerating = useAppSelector(selectIsGenerating);
  const selectedSubjectName = useAppSelector(selectSelectedSubjectName);

  // Initialize inline edit mode
  const editMode = useInlineEditMode(
    generatedPaper?.mcqQuestions || [],
    generatedPaper?.shortAnswerQuestions || []
  );
  const { editingId, setEditingId } = editMode;

  const handleAnswerKeyToggle = () => {
    dispatch(toggleAnswerKey());
  };

  const handleEditClick = () => {
    if (generatedPaper) {
      setIsEditMode(true);
    }
  };

  const handleEditSave = () => {
    const { editedMCQs, editedShortAnswers } = editMode.saveChanges();
    if (generatedPaper) {
      const updatedPaper = {
        ...generatedPaper,
        mcqQuestions: editedMCQs,
        shortAnswerQuestions: editedShortAnswers,
      };
      dispatch(generateSuccess(updatedPaper));
      setIsEditMode(false);
      toast.success('Changes saved successfully!');
    }
  };

  const handleEditCancel = () => {
    editMode.resetChanges();
    setIsEditMode(false);
    toast.success('Changes discarded');
  };

  const handleRegenerate = async () => {
    try {
      dispatch(startGenerating());

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Use mock data instead of real API
      const mockData = mockPaperData.data;

      if (mockData) {
        dispatch(generateSuccess(mockData));
        dispatch(setActiveTab('preview'));
        toast.success('Paper generated successfully!');
      } else {
        throw new Error('Failed to generate paper');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to regenerate paper';
      toast.error(errorMessage);
    }
  };

  const handleExportPDFPuppeteer = async () => {
    try {
      setIsExporting(true);
      const mockData = mockPaperData.data;
      // Use Puppeteer for exact styling + selectable text
      await exportToPDFWithPuppeteer(
        'section-preview',
        {
          filename: `${mockData.examDetails.subject}_${mockData.examDetails.topic}`,
          title: mockData.examDetails.subject,
          subject: mockData.examDetails.topic,
          duration: mockData.examDetails.duration,
          totalMarks: totalMarks,
          institutionName: selectedSubjectName || 'Test Series Academy',
        },
        {
          mcqQuestions: mockData.mcqQuestions || [],
          shortAnswerQuestions: mockData.shortAnswerQuestions || [],
          examDetails: mockData.examDetails || {},
          totalMarks: totalMarks,
        },
        showAnswerKey
      );
      toast.success('Document exported as PDF (Premium) successfully!');
    } catch (error) {
      toast.error('Failed to export as PDF. Make sure backend server is running on port 3001');
    } finally {
      setIsExporting(false);
    }
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    let newZoom = zoomLevel;
    if (direction === 'in') {
      newZoom = Math.min(zoomLevel + 10, 200);
    } else if (direction === 'out') {
      newZoom = Math.max(zoomLevel - 10, 50);
    } else {
      newZoom = 100;
    }
    setZoomLevel(newZoom);
    toast.success(`Zoom: ${newZoom}%`);
  };

  // Calculate font size multiplier based on zoom level
  const fontSizeMultiplier = zoomLevel / 100;

  const handlePrint = () => {
    window.print();
  };

  const totalMarks = useMemo(() => {
    if (!generatedPaper) return 0;
    const mcqMarks = (generatedPaper.mcqQuestions?.length || 0) * 1;
    const shortAnswerMarks = (generatedPaper.shortAnswerQuestions || []).reduce(
      (sum, q) => sum + q.marksAllocated,
      0
    );
    return mcqMarks + shortAnswerMarks;
  }, [generatedPaper]);

  const pages = useMemo(() => {
    if (!generatedPaper) return [];
    return paginateQuestions(
      generatedPaper.mcqQuestions || [],
      generatedPaper.shortAnswerQuestions || [],
      true
    );
  }, [generatedPaper]);

  // Load mock data on component mount
  React.useEffect(() => {
    // Uncomment the line below to auto-load mock data on component mount
    dispatch(generateSuccess(mockPaperData.data));
  }, [dispatch]);

  return (
    <PaperPreviewSection id="section-preview">
      <PreviewHeader>
        <PreviewTitleSection>
          <PreviewIcon className="material-symbols-outlined">visibility</PreviewIcon>
          <PreviewTitleBorderRight>
            <PreviewTitle>Preview</PreviewTitle>
          </PreviewTitleBorderRight>
        </PreviewTitleSection>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          position: 'relative'
        }}>
          <input
            type="checkbox"
            checked={showAnswerKey}
            onChange={handleAnswerKeyToggle}
            id="answer-key-toggle"
            className="answer-key-toggle-input"
          />
          <label htmlFor="answer-key-toggle" className="answer-key-toggle-box" />
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#475569',
            transition: 'color 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            flexShrink: 0
          }}>
            Include Answers
          </span>
        </div>

        <PreviewActionsSection>
          <ZoomControls>
            <PreviewActionButton title="Zoom Out" onClick={() => handleZoom('out')}>
              <ActionIcon className="material-symbols-outlined">zoom_out</ActionIcon>
            </PreviewActionButton>
            <ZoomDisplay>{zoomLevel}%</ZoomDisplay>
            <PreviewActionButton title="Zoom In" onClick={() => handleZoom('in')}>
              <ActionIcon className="material-symbols-outlined">zoom_in</ActionIcon>
            </PreviewActionButton>
            <PreviewActionButton title="Reset Zoom" onClick={() => handleZoom('reset')}>
              <ActionIcon className="material-symbols-outlined">fit_screen</ActionIcon>
            </PreviewActionButton>
          </ZoomControls>
          <PreviewActionButton 
            title="Edit" 
            onClick={handleEditClick}
            disabled={!generatedPaper || isGenerating}
            style={{ opacity: !generatedPaper || isGenerating ? 0.6 : 1, cursor: !generatedPaper || isGenerating ? 'not-allowed' : 'pointer' }}
          >
            <ActionIcon className="material-symbols-outlined">edit</ActionIcon>
          </PreviewActionButton>
          <PreviewActionButton title="Print" onClick={handlePrint}>
            <ActionIcon className="material-symbols-outlined">print</ActionIcon>
          </PreviewActionButton>
        </PreviewActionsSection>
      </PreviewHeader>

      <PreviewContent style={{ '--zoom-multiplier': `${fontSizeMultiplier}` } as React.CSSProperties}>
        {isGenerating ? (
          <PreviewDocument>
            <DocumentWatermark>
              <WatermarkIcon className="material-symbols-outlined">history_edu</WatermarkIcon>
            </DocumentWatermark>
            <DocumentContent>
              <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>Generating your assessment paper...</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>This may take a moment</p>
              </div>
            </DocumentContent>
          </PreviewDocument>
        ) : pages.length > 0 ? (
          pages.map((page) => (
            <PreviewDocumentPage key={page.pageNumber} data-page={page.pageNumber}>
              <PreviewDocument>
                <DocumentWatermark>
                  <WatermarkIcon className="material-symbols-outlined">history_edu</WatermarkIcon>
                </DocumentWatermark>

                <DocumentContent>
                  {page.hasHeader && (
                    <DocumentHeader data-header>
                      <DocumentTitle data-header-title>Test Series Academy</DocumentTitle>
                      <DocumentSubtitle data-header-subtitle>
                        {generatedPaper?.examDetails?.subject || 'Assessment'} - {generatedPaper?.examDetails?.topic || 'Topic'}
                      </DocumentSubtitle>
                      <DocumentMeta data-header-meta>
                        <span>Duration: {generatedPaper?.examDetails?.duration || 180} mins</span>
                        <span>Total Marks: {totalMarks}</span>
                        <span>Questions: {generatedPaper?.examDetails?.totalQuestions || 0}</span>
                      </DocumentMeta>
                    </DocumentHeader>
                  )}

                  {/* MCQ Section */}
                  {page.mcqQuestions && page.mcqQuestions.length > 0 && (
                    <SectionGroup data-section>
                      <SectionTitle data-section-title>Section A: Multiple Choice Questions</SectionTitle>
                      {page.mcqQuestions.map((question, _idx) => {
                        const mcqIndex = (editMode.editedMCQs.findIndex(q => q.questionNumber === question.questionNumber));
                        const editedQuestion = mcqIndex >= 0 ? editMode.editedMCQs[mcqIndex] : question;
                        const isEditing = isEditMode && editingId === `mcq-${question.questionNumber}`;
                        
                        return (
                          <QuestionItem 
                            key={question?.questionNumber} 
                            data-question
                            onClick={() => isEditMode && editMode.setEditingId(`mcq-${question.questionNumber}`)}
                            style={{ cursor: isEditMode ? 'pointer' : 'default' }}
                          >
                            <QuestionText data-question-text>
                              {question?.questionNumber}. 
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editedQuestion?.question || ''}
                                  onChange={(e) => editMode.handleMCQQuestionEdit(mcqIndex, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ width: '100%', padding: '0.5rem', marginLeft: '0.5rem' }}
                                />
                              ) : (
                                editedQuestion?.question || 'Question not available'
                              )}
                            </QuestionText>
                            <OptionsGrid>
                              {(['A', 'B', 'C', 'D'] as const).map((option) => (
                                <OptionText 
                                  key={option}
                                  data-option
                                  onClick={() => isEditMode && editMode.setEditingId(`mcq-${question.questionNumber}-${option}`)}
                                >
                                  ({option}) 
                                  {isEditing && editingId === `mcq-${question.questionNumber}-${option}` ? (
                                    <input
                                      type="text"
                                      value={editedQuestion?.options?.[option] || ''}
                                      onChange={(e) => editMode.handleMCQOptionEdit(mcqIndex, option, e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      style={{ width: '90%', padding: '0.25rem', marginLeft: '0.5rem' }}
                                    />
                                  ) : (
                                    editedQuestion?.options?.[option] || 'Option not available'
                                  )}
                                </OptionText>
                              ))}
                            </OptionsGrid>
                            {showAnswerKey && (
                              <AnswerBox data-answer>
                                <AnswerLabel>Correct Answer: ({editedQuestion?.correctAnswer || 'N/A'})</AnswerLabel>
                                <AnswerText>
                                  {isEditing ? (
                                    <textarea
                                      value={editedQuestion?.explanation || ''}
                                      onChange={(e) => editMode.handleMCQExplanationEdit(mcqIndex, e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      style={{ width: '100%', padding: '0.5rem', minHeight: '60px' }}
                                    />
                                  ) : (
                                    editedQuestion?.explanation || 'Explanation not available'
                                  )}
                                </AnswerText>
                              </AnswerBox>
                            )}
                          </QuestionItem>
                        );
                      })}
                    </SectionGroup>
                  )}

                  {/* Short Answer Section */}
                  {page.shortAnswerQuestions && page.shortAnswerQuestions.length > 0 && (
                    <SectionGroup data-section>
                      <SectionTitle data-section-title>Section B: Short Answer Questions</SectionTitle>
                      {page.shortAnswerQuestions.map((question) => {
                        const shortIdx = editMode.editedShortAnswers.findIndex(q => q.questionNumber === question.questionNumber);
                        const editedQuestion = shortIdx >= 0 ? editMode.editedShortAnswers[shortIdx] : question;
                        const isEditing = isEditMode && editingId === `short-${question.questionNumber}`;
                        
                        return (
                          <QuestionItem 
                            key={question?.questionNumber} 
                            data-question
                            onClick={() => isEditMode && setEditingId(`short-${question.questionNumber}`)}
                            style={{ cursor: isEditMode ? 'pointer' : 'default' }}
                          >
                            <QuestionText data-question-text>
                              {question?.questionNumber}. 
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editedQuestion?.question || ''}
                                  onChange={(e) => editMode.handleShortAnswerQuestionEdit(shortIdx, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ width: '100%', padding: '0.5rem', marginLeft: '0.5rem' }}
                                />
                              ) : (
                                `${editedQuestion?.question || 'Question not available'} (${editedQuestion?.marksAllocated || 0} marks)`
                              )}
                            </QuestionText>
                            {showAnswerKey && (
                              <AnswerBox data-answer>
                                <AnswerLabel>Expected Answer:</AnswerLabel>
                                <AnswerText>
                                  {isEditing ? (
                                    <textarea
                                      value={editedQuestion?.expectedAnswer || ''}
                                      onChange={(e) => editMode.handleShortAnswerEdit(shortIdx, e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      style={{ width: '100%', padding: '0.5rem', minHeight: '60px' }}
                                    />
                                  ) : (
                                    editedQuestion?.expectedAnswer || 'Answer not available'
                                  )}
                                </AnswerText>
                                {editedQuestion?.keyPoints && editedQuestion.keyPoints.length > 0 && (
                                  <AnswerText style={{ marginTop: '0.5rem' }}>
                                    <strong>Key Points:</strong>
                                    <ul style={{ margin: '0.25rem 0 0 1rem', paddingLeft: 0 }}>
                                      {editedQuestion.keyPoints.map((point: string, idx: number) => (
                                        <li key={idx} style={{ margin: '0.25rem 0' }}>
                                          {isEditing ? (
                                            <input
                                              type="text"
                                              value={point || ''}
                                              onChange={(e) => editMode.handleKeyPointEdit(shortIdx, idx, e.target.value)}
                                              onClick={(e) => e.stopPropagation()}
                                              style={{ width: '90%', padding: '0.25rem' }}
                                            />
                                          ) : (
                                            point || 'Point not available'
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  </AnswerText>
                                )}
                              </AnswerBox>
                            )}
                          </QuestionItem>
                        );
                      })}
                    </SectionGroup>
                  )}
                </DocumentContent>
              </PreviewDocument>
            </PreviewDocumentPage>
          ))
        ) : (
          <PreviewDocument>
            <DocumentWatermark>
              <WatermarkIcon className="material-symbols-outlined">history_edu</WatermarkIcon>
            </DocumentWatermark>
            <DocumentContent>
              <SectionGroup>
                <SectionTitle>No Paper Generated</SectionTitle>
                <QuestionText>Click "Regenerate" to generate a new assessment paper.</QuestionText>
              </SectionGroup>
            </DocumentContent>
          </PreviewDocument>
        )}
      </PreviewContent>

      <PreviewFooter>
        <FooterButton 
          onClick={handleRegenerate}
          disabled={isGenerating || isExporting}
          style={{ opacity: isGenerating || isExporting ? 0.6 : 1, cursor: isGenerating || isExporting ? 'not-allowed' : 'pointer' }}
        >
          <FooterButtonSpan>
            {isGenerating ? 'Generating...' : 'Regenerate'}
          </FooterButtonSpan>
        </FooterButton>
        <FooterButton
          $variant="primary"
          onClick={handleExportPDFPuppeteer}
          disabled={!generatedPaper || isGenerating || isExporting}
          style={{ 
            gridColumn: 'span 2',
            opacity: !generatedPaper || isGenerating || isExporting ? 0.6 : 1, 
            cursor: !generatedPaper || isGenerating || isExporting ? 'not-allowed' : 'pointer',
            position: 'relative'
          }}
        >
          <FooterButtonIcon className="material-symbols-outlined">
            {isExporting ? 'hourglass_empty' : 'picture_as_pdf'}
          </FooterButtonIcon>
          <FooterButtonSpan>
            {isExporting ? 'Exporting...' : 'Export as PDF'}
          </FooterButtonSpan>
        </FooterButton>
      </PreviewFooter>

      {/* Edit Mode Toolbar */}
      {isEditMode && (
        <EditToolbar>
          <CancelButton onClick={handleEditCancel}>
            <EditToolbarIcon className="material-symbols-outlined">close</EditToolbarIcon>
            Cancel
          </CancelButton>
          <SaveButton onClick={handleEditSave}>
            <EditToolbarIcon className="material-symbols-outlined">check</EditToolbarIcon>
            Save Changes
          </SaveButton>
        </EditToolbar>
      )}
    </PaperPreviewSection>
  );
};
