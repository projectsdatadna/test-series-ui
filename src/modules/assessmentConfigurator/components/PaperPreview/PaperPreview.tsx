import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { toggleAnswerKey, generateSuccess, startGenerating } from '../../actions';
import { selectShowAnswerKey, selectGeneratedPaper, selectIsGenerating, selectSelectedSubjectName } from '../../selectors';
import { exportToPDFWithPuppeteer, exportToWord } from '../../utils/exportUtils';
import { EditMode } from './EditMode';
import '../../styles/print.css';
import '../../styles/toggle.css';
import toast from 'react-hot-toast';
import {
  PaperPreviewSection,
  PreviewHeader,
  PreviewActionsSection,
  PreviewActionButton,
  ActionIcon,
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
} from './PaperPreview.styles';

// Pagination interface for A4 pages
interface PageSection {
  type: 'mcq' | 'shortAnswer' | 'custom';
  sectionTitle: string;
  sectionNote?: string;
  marksInfo: string;
  questions: any[];
  customType?: string;
}

interface A4Page {
  pageNumber: number;
  sections: PageSection[];
  hasHeader: boolean;
}

const ESTIMATED_MCQ_HEIGHT = 100;
const ESTIMATED_SHORT_ANSWER_HEIGHT = 120;
const ESTIMATED_CUSTOM_HEIGHT = 150;
const PAGE_HEIGHT = 750;
const HEADER_HEIGHT = 150;
const SECTION_HEADER_HEIGHT = 80;

const paginateSectionedQuestions = (generatedPaper: any): A4Page[] => {
  if (!generatedPaper) return [];

  const pages: A4Page[] = [];
  let currentPage: PageSection[] = [];
  let currentPageHeight = HEADER_HEIGHT;
  let pageNumber = 1;

  // Build all sections in order
  const allSections: PageSection[] = [];

  // Add MCQ section
  if (generatedPaper.mcqQuestions && generatedPaper.mcqQuestions.length > 0) {
    const mcqMarks = generatedPaper.mcqQuestions.length * 1;
    allSections.push({
      type: 'mcq',
      sectionTitle: 'Section A: Multiple Choice Questions',
      sectionNote: generatedPaper.sections?.[0]?.note,
      marksInfo: `${generatedPaper.mcqQuestions.length} Questions × 1 Mark = ${mcqMarks} Marks`,
      questions: generatedPaper.mcqQuestions,
    });
  }

  // Add Short Answer section
  if (generatedPaper.shortAnswerQuestions && generatedPaper.shortAnswerQuestions.length > 0) {
    const shortAnswerMarks = generatedPaper.shortAnswerQuestions.length * 2;
    allSections.push({
      type: 'shortAnswer',
      sectionTitle: 'Section B: Short Answer Questions',
      sectionNote: generatedPaper.sections?.[1]?.note,
      marksInfo: `${generatedPaper.shortAnswerQuestions.length} Questions × 2 Marks = ${shortAnswerMarks} Marks`,
      questions: generatedPaper.shortAnswerQuestions,
    });
  }

  // Add Custom sections
  if (generatedPaper.customQuestions && generatedPaper.customQuestions.length > 0) {
    generatedPaper.customQuestions.forEach((customSection: any) => {
      const sectionInfo = generatedPaper.sections?.find((s: any) => s.sectionName === customSection.section);
      allSections.push({
        type: 'custom',
        sectionTitle: `${customSection.section}: ${customSection.type}`,
        sectionNote: sectionInfo?.note,
        marksInfo: `${customSection.questions.length} Questions × ${sectionInfo?.marksPerQuestion || 0} Marks = ${sectionInfo?.totalMarks || 0} Marks`,
        questions: customSection.questions,
        customType: customSection.type,
      });
    });
  }

  // Paginate based on A4 height
  for (const section of allSections) {
    let sectionHeight = SECTION_HEADER_HEIGHT;
    
    if (section.type === 'mcq') {
      sectionHeight += section.questions.length * ESTIMATED_MCQ_HEIGHT;
    } else if (section.type === 'shortAnswer') {
      sectionHeight += section.questions.length * ESTIMATED_SHORT_ANSWER_HEIGHT;
    } else {
      sectionHeight += section.questions.length * ESTIMATED_CUSTOM_HEIGHT;
    }

    // If section doesn't fit on current page and page has content, start new page
    if (currentPageHeight + sectionHeight > PAGE_HEIGHT && currentPage.length > 0) {
      pages.push({
        pageNumber,
        sections: currentPage,
        hasHeader: pageNumber === 1,
      });
      pageNumber++;
      currentPage = [];
      currentPageHeight = 0;
    }

    currentPage.push(section);
    currentPageHeight += sectionHeight;
  }

  // Add remaining content
  if (currentPage.length > 0) {
    pages.push({
      pageNumber,
      sections: currentPage,
      hasHeader: pageNumber === 1,
    });
  }

  return pages.length > 0 ? pages : [];
};

export const PaperPreview: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedMCQs, setEditedMCQs] = useState<any[]>([]);
  const [editedShortAnswers, setEditedShortAnswers] = useState<any[]>([]);
  
  const showAnswerKey = useAppSelector(selectShowAnswerKey);
  const generatedPaper = useAppSelector(selectGeneratedPaper);
  const isGenerating = useAppSelector(selectIsGenerating);
  const selectedSubjectName = useAppSelector(selectSelectedSubjectName);

  // Sync edited questions with generated paper
  React.useEffect(() => {
    if (generatedPaper) {
      setEditedMCQs(JSON.parse(JSON.stringify(generatedPaper.mcqQuestions || [])));
      setEditedShortAnswers(JSON.parse(JSON.stringify(generatedPaper.shortAnswerQuestions || [])));
    }
  }, [generatedPaper]);

  const handleAnswerKeyToggle = () => {
    dispatch(toggleAnswerKey());
  };

  const handleMCQQuestionEdit = (index: number, newText: string) => {
    const updated = [...editedMCQs];
    if (updated[index]) {
      updated[index] = { ...updated[index], question: newText };
      setEditedMCQs(updated);
    }
  };

  const handleMCQOptionEdit = (index: number, option: 'A' | 'B' | 'C' | 'D', newText: string) => {
    const updated = [...editedMCQs];
    if (updated[index]) {
      updated[index].options[option] = newText;
      setEditedMCQs(updated);
    }
  };

  const handleMCQExplanationEdit = (index: number, newText: string) => {
    const updated = [...editedMCQs];
    if (updated[index]) {
      updated[index] = { ...updated[index], explanation: newText };
      setEditedMCQs(updated);
    }
  };

  const handleShortAnswerQuestionEdit = (index: number, newText: string) => {
    const updated = [...editedShortAnswers];
    if (updated[index]) {
      updated[index] = { ...updated[index], question: newText };
      setEditedShortAnswers(updated);
    }
  };

  const handleShortAnswerEdit = (index: number, newText: string) => {
    const updated = [...editedShortAnswers];
    if (updated[index]) {
      updated[index] = { ...updated[index], expectedAnswer: newText };
      setEditedShortAnswers(updated);
    }
  };

  const handleKeyPointEdit = (questionIndex: number, pointIndex: number, newText: string) => {
    const updated = [...editedShortAnswers];
    if (updated[questionIndex]) {
      updated[questionIndex].keyPoints[pointIndex] = newText;
      setEditedShortAnswers(updated);
    }
  };

  const handleEditSave = () => {
    if (generatedPaper) {
      const updatedPaper = {
        ...generatedPaper,
        mcqQuestions: editedMCQs,
        shortAnswerQuestions: editedShortAnswers,
      };
      dispatch(generateSuccess(updatedPaper));
      setEditingId(null);
      toast.success('Changes saved!');
    }
  };

  const handleEditCancel = () => {
    // Reset to current paper state
    if (generatedPaper) {
      setEditedMCQs(JSON.parse(JSON.stringify(generatedPaper.mcqQuestions || [])));
      setEditedShortAnswers(JSON.parse(JSON.stringify(generatedPaper.shortAnswerQuestions || [])));
    }
    setEditingId(null);
  };

  const handleEditModeSave = (mcqQuestions: any[], shortAnswerQuestions: any[]) => {
    if (generatedPaper) {
      const updatedPaper = {
        ...generatedPaper,
        mcqQuestions,
        shortAnswerQuestions,
      };
      setEditedMCQs(JSON.parse(JSON.stringify(mcqQuestions)));
      setEditedShortAnswers(JSON.parse(JSON.stringify(shortAnswerQuestions)));
      dispatch(generateSuccess(updatedPaper));
      setIsEditMode(false);
      toast.success('Changes saved successfully!');
    }
  };

  const handleRegenerate = async () => {
    try {
      dispatch(startGenerating());
      toast.success('Regenerating paper...');
    } catch {
      toast.error('Failed to regenerate paper');
    }
  };

  const handleExportToWord = () => {
    setShowExportDropdown(true);
  };

  const handleExportWord = async () => {
    try {
      setIsExporting(true);
      if (!generatedPaper) {
        toast.error('No paper generated to export');
        return;
      }
      await exportToWord(
        'section-preview',
        {
          filename: `${generatedPaper.examDetails.subject}_${generatedPaper.examDetails.topic}`,
          title: generatedPaper.examDetails.subject,
          subject: generatedPaper.examDetails.topic,
          duration: generatedPaper.examDetails.duration,
          totalMarks: generatedPaper.examDetails.totalMarks,
          institutionName: selectedSubjectName || 'Test Series Academy',
        },
        {
          mcqQuestions: editedMCQs || [],
          shortAnswerQuestions: editedShortAnswers || [],
          customQuestions: generatedPaper.customQuestions || [],
          examDetails: generatedPaper.examDetails || {},
          totalMarks: generatedPaper.examDetails.totalMarks,
        },
        showAnswerKey
      );
      toast.success('Document exported as Word successfully!');
      setShowExportDropdown(false);
    } catch {
      toast.error('Failed to export as Word');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDFPuppeteer = async () => {
    try {
      setIsExporting(true);
      if (!generatedPaper) {
        toast.error('No paper generated to export');
        return;
      }
      await exportToPDFWithPuppeteer(
        'section-preview',
        {
          filename: `${generatedPaper.examDetails.subject}_${generatedPaper.examDetails.topic}`,
          title: generatedPaper.examDetails.subject,
          subject: generatedPaper.examDetails.topic,
          duration: generatedPaper.examDetails.duration,
          totalMarks: generatedPaper.examDetails.totalMarks,
          institutionName: selectedSubjectName || 'Test Series Academy',
        },
        {
          mcqQuestions: editedMCQs || [],
          shortAnswerQuestions: editedShortAnswers || [],
          customQuestions: generatedPaper.customQuestions || [],
          examDetails: generatedPaper.examDetails || {},
          totalMarks: generatedPaper.examDetails.totalMarks,
        },
        showAnswerKey
      );
      toast.success('Document exported as PDF successfully!');
    } catch {
      toast.error('Failed to export as PDF. Make sure backend server is running on port 3001');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const pages = useMemo(() => {
    return paginateSectionedQuestions(generatedPaper);
  }, [generatedPaper]);

  return (
    <PaperPreviewSection id="section-preview">
      <PreviewHeader>
        {/* <PreviewTitleSection>
          <PreviewIcon className="material-symbols-outlined">visibility</PreviewIcon>
          <PreviewTitleBorderRight>
            <PreviewTitle>Preview</PreviewTitle>
          </PreviewTitleBorderRight>
        </PreviewTitleSection> */}

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
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '120px' }}>
            <Select
              options={zoomOptions}
              value={zoomOptions.find((opt) => opt.value === zoomLevel)}
              onChange={(option) => option && setZoomLevel(option.value)}
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#e2e8f0',
                  borderRadius: '0.375rem',
                  padding: '0.25rem',
                  fontSize: '0.75rem',
                  minHeight: '32px',
                  backgroundColor: '#fff',
                }),
                option: (base, state) => ({
                  ...base,
                  fontSize: '0.75rem',
                  backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#f1f5f9' : '#fff',
                  color: state.isSelected ? '#fff' : '#000',
                }),
                singleValue: (base) => ({
                  ...base,
                  fontSize: '0.75rem',
                  color: '#475569',
                }),
              }}
            />
            <ActionIcon className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: '#2563eb' }}>
              zoom_in_map
            </ActionIcon> 
          </div> */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={isEditMode}
              onChange={(e) => setIsEditMode(e.target.checked)}
              id="edit-mode-toggle"
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="edit-mode-toggle" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
              Edit Mode
            </label>
          </div>

          <PreviewActionButton title="Print" onClick={handlePrint}>
            <ActionIcon className="material-symbols-outlined">print</ActionIcon>
          </PreviewActionButton>
        </PreviewActionsSection>
      </PreviewHeader>

      <PreviewContent>
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
          pages.map((page) => {
            return (
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
                        <span>Total Marks: {generatedPaper?.examDetails?.totalMarks || 0}</span>
                        <span>Questions: {generatedPaper?.examDetails?.totalQuestions || 0}</span>
                      </DocumentMeta>
                    </DocumentHeader>
                  )}

                  {page.sections.map((section, sectionIdx) => {
                    if (section.type === 'mcq') {
                      return (
                        <SectionGroup key={`mcq-${sectionIdx}`} data-section>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <SectionTitle data-section-title>{section.sectionTitle}</SectionTitle>
                            {/* <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                              {section.marksInfo}
                            </span> */}
                          </div>
                          {section.sectionNote && (
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                              Note: {section.sectionNote}
                            </div>
                          )}
                          {section.questions.map((question) => {
                            const mcqIndex = editedMCQs.findIndex(q => q.questionNumber === question.questionNumber);
                            const editedQuestion = mcqIndex >= 0 ? editedMCQs[mcqIndex] : question;
                            const isEditingQuestion = isEditMode && editingId === `mcq-${question.questionNumber}`;
                            
                            return (
                              <QuestionItem 
                                key={question?.questionNumber} 
                                data-question
                              >
                                <QuestionText data-question-text>
                                  {question?.questionNumber}. 
                                  {isEditingQuestion ? (
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', position: 'relative', width: '100%', flexWrap: 'nowrap' }}>
                                      <textarea
                                        value={editedQuestion?.question || ''}
                                        onChange={(e) => handleMCQQuestionEdit(mcqIndex, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ padding: '0.5rem', minHeight: '50px', borderRadius: '0.5rem', border: '2px solid #3b82f6', fontWeight: 'inherit', resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit', flex: '1 1 auto' }}
                                      />
                                      <div style={{ display: 'flex', gap: '0.25rem', flexDirection: 'row', flexShrink: 0 }}>
                                        <button
                                          onClick={() => handleEditSave()}
                                          style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                          title="Save"
                                        >
                                          <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>check</span>
                                        </button>
                                        <button
                                          onClick={() => handleEditCancel()}
                                          style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#e5e7eb', color: '#6b7280', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                          title="Cancel"
                                        >
                                          <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>close</span>
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <span 
                                      onClick={() => isEditMode && setEditingId(`mcq-${question.questionNumber}`)}
                                      style={{ cursor: isEditMode ? 'pointer' : 'default', display: 'inline' }}
                                    >
                                      {editedQuestion?.question || 'Question not available'}
                                    </span>
                                  )}
                                </QuestionText>
                                <OptionsGrid>
                                  {(['A', 'B', 'C', 'D'] as const).map((option) => {
                                    const isEditingOption = isEditMode && editingId === `mcq-${question.questionNumber}-${option}`;
                                    return (
                                      <OptionText 
                                        key={option}
                                        data-option
                                      >
                                        ({option}) 
                                        {isEditingOption ? (
                                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', position: 'relative', width: '100%', flexWrap: 'nowrap', minWidth: 0 }}>
                                            <textarea
                                              value={editedQuestion?.options?.[option] || ''}
                                              onChange={(e) => handleMCQOptionEdit(mcqIndex, option, e.target.value)}
                                              onClick={(e) => e.stopPropagation()}
                                              style={{ padding: '0.5rem', minHeight: '50px', borderRadius: '0.5rem', border: '2px solid #3b82f6', fontWeight: 'inherit', resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit', flex: '1 1 auto', minWidth: 0 }}
                                            />
                                            <div style={{ display: 'flex', gap: '0.25rem', flexDirection: 'row', flexShrink: 0 }}>
                                              <button
                                                onClick={() => handleEditSave()}
                                                style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                                title="Save"
                                              >
                                                <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>check</span>
                                              </button>
                                              <button
                                                onClick={() => handleEditCancel()}
                                                style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#e5e7eb', color: '#6b7280', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                                title="Cancel"
                                              >
                                                <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>close</span>
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <span 
                                            onClick={() => isEditMode && setEditingId(`mcq-${question.questionNumber}-${option}`)}
                                            style={{ cursor: isEditMode ? 'pointer' : 'default', display: 'inline' }}
                                          >
                                            {editedQuestion?.options?.[option] || 'Option not available'}
                                          </span>
                                        )}
                                      </OptionText>
                                    );
                                  })}
                                </OptionsGrid>
                                {showAnswerKey && (
                                  <AnswerBox data-answer>
                                    <AnswerLabel>Correct Answer: ({editedQuestion?.correctAnswer || 'N/A'})</AnswerLabel>
                                    <AnswerText>
                                      {isEditMode && editingId === `mcq-${question.questionNumber}-explanation` ? (
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', position: 'relative', width: '100%', flexWrap: 'nowrap', minWidth: 0 }}>
                                          <textarea
                                            value={editedQuestion?.explanation || ''}
                                            onChange={(e) => handleMCQExplanationEdit(mcqIndex, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            style={{ padding: '0.5rem', minHeight: '50px', borderRadius: '0.5rem', border: '2px solid #3b82f6', fontWeight: 'inherit', resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit', flex: '1 1 auto', minWidth: 0 }}
                                          />
                                          <div style={{ display: 'flex', gap: '0.25rem', flexDirection: 'row', flexShrink: 0 }}>
                                            <button
                                              onClick={() => handleEditSave()}
                                              style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                              title="Save"
                                            >
                                              <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>check</span>
                                            </button>
                                            <button
                                              onClick={() => handleEditCancel()}
                                              style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#e5e7eb', color: '#6b7280', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                              title="Cancel"
                                            >
                                              <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>close</span>
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <span 
                                          onClick={() => isEditMode && setEditingId(`mcq-${question.questionNumber}-explanation`)}
                                          style={{ cursor: isEditMode ? 'pointer' : 'default', display: 'inline' }}
                                        >
                                          {editedQuestion?.explanation || 'Explanation not available'}
                                        </span>
                                      )}
                                    </AnswerText>
                                  </AnswerBox>
                                )}
                              </QuestionItem>
                            );
                          })}
                        </SectionGroup>
                      );
                    } else if (section.type === 'shortAnswer') {
                      return (
                        <SectionGroup key={`short-${sectionIdx}`} data-section>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <SectionTitle data-section-title>{section.sectionTitle}</SectionTitle>
                            {/* <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                              {section.marksInfo}
                            </span> */}
                          </div>
                          {section.sectionNote && (
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                              Note: {section.sectionNote}
                            </div>
                          )}
                          {section.questions.map((question) => {
                            const shortIdx = editedShortAnswers.findIndex(q => q.questionNumber === question.questionNumber);
                            const editedQuestion = shortIdx >= 0 ? editedShortAnswers[shortIdx] : question;
                            const isEditingQuestion = isEditMode && editingId === `short-${question.questionNumber}`;
                            
                            return (
                              <QuestionItem 
                                key={question?.questionNumber} 
                                data-question
                              >
                                <QuestionText data-question-text>
                                  {question?.questionNumber}. 
                                  {isEditingQuestion ? (
                                    <div style={{ display: 'flex',flexDirection:'column', gap: '0.5rem', alignItems: 'flex-start', position: 'relative', width: '100%', flexWrap: 'nowrap', minWidth: 0 }}>
                                      <textarea
                                        value={editedQuestion?.question || ''}
                                        onChange={(e) => handleShortAnswerQuestionEdit(shortIdx, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ padding: '0.5rem', minHeight: '50px', borderRadius: '0.5rem', border: '2px solid #3b82f6', fontWeight: 'inherit', resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit', flex: '1 1 auto', minWidth: 0 }}
                                      />
                                      <div style={{ display: 'flex', gap: '0.25rem', flexDirection: 'column', flexShrink: 0 }}>
                                        <button
                                          onClick={() => handleEditSave()}
                                          style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                          title="Save"
                                        >
                                          <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>check</span>
                                        </button>
                                        <button
                                          onClick={() => handleEditCancel()}
                                          style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#e5e7eb', color: '#6b7280', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                          title="Cancel"
                                        >
                                          <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>close</span>
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <span 
                                      onClick={() => isEditMode && setEditingId(`short-${question.questionNumber}`)}
                                      style={{ cursor: isEditMode ? 'pointer' : 'default', display: 'inline' }}
                                    >
                                      {editedQuestion?.question || 'Question not available'}
                                    </span>
                                  )}
                                </QuestionText>
                                {showAnswerKey && (
                                  <AnswerBox data-answer>
                                    <AnswerLabel>Expected Answer:</AnswerLabel>
                                    <AnswerText>
                                      {isEditMode && editingId === `short-${question.questionNumber}-answer` ? (
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', position: 'relative', width: '100%', flexWrap: 'nowrap', minWidth: 0 }}>
                                          <textarea
                                            value={editedQuestion?.expectedAnswer || ''}
                                            onChange={(e) => handleShortAnswerEdit(shortIdx, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            style={{ padding: '0.5rem', minHeight: '50px', borderRadius: '0.5rem', border: '2px solid #3b82f6', fontWeight: 'inherit', resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit', flex: '1 1 auto', minWidth: 0 }}
                                          />
                                          <div style={{ display: 'flex', gap: '0.25rem', flexDirection: 'row', flexShrink: 0 }}>
                                            <button
                                              onClick={() => handleEditSave()}
                                              style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                              title="Save"
                                            >
                                              <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>check</span>
                                            </button>
                                            <button
                                              onClick={() => handleEditCancel()}
                                              style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#e5e7eb', color: '#6b7280', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                              title="Cancel"
                                            >
                                              <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>close</span>
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <span 
                                          onClick={() => isEditMode && setEditingId(`short-${question.questionNumber}-answer`)}
                                          style={{ cursor: isEditMode ? 'pointer' : 'default', display: 'inline' }}
                                        >
                                          {editedQuestion?.expectedAnswer || 'Answer not available'}
                                        </span>
                                      )}
                                    </AnswerText>
                                    {editedQuestion?.keyPoints && editedQuestion.keyPoints.length > 0 && (
                                      <AnswerText style={{ marginTop: '0.5rem' }}>
                                        <strong>Key Points:</strong>
                                        <ul style={{ margin: '0.25rem 0 0 1rem', paddingLeft: 0 }}>
                                          {editedQuestion.keyPoints.map((point: string, idx: number) => (
                                            <li key={idx} style={{ margin: '0.25rem 0' }}>
                                              {isEditMode && editingId === `short-${question.questionNumber}-point-${idx}` ? (
                                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', position: 'relative', width: '100%', flexWrap: 'nowrap', minWidth: 0 }}>
                                                  <textarea
                                                    value={point || ''}
                                                    onChange={(e) => handleKeyPointEdit(shortIdx, idx, e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    style={{ padding: '0.5rem', minHeight: '50px', borderRadius: '0.5rem', border: '2px solid #3b82f6', fontWeight: 'inherit', resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit', flex: '1 1 auto', minWidth: 0 }}
                                                  />
                                                  <div style={{ display: 'flex', gap: '0.25rem', flexDirection: 'row', flexShrink: 0 }}>
                                                    <button
                                                      onClick={() => handleEditSave()}
                                                      style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                                      title="Save"
                                                    >
                                                      <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>check</span>
                                                    </button>
                                                    <button
                                                      onClick={() => handleEditCancel()}
                                                      style={{ width: '24px', height: '24px', padding: 0, backgroundColor: '#e5e7eb', color: '#6b7280', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}
                                                      title="Cancel"
                                                    >
                                                      <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>close</span>
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <span 
                                                  onClick={() => isEditMode && setEditingId(`short-${question.questionNumber}-point-${idx}`)}
                                                  style={{ cursor: isEditMode ? 'pointer' : 'default', display: 'inline' }}
                                                >
                                                  {point || 'Point not available'}
                                                </span>
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
                      );
                    } else {
                      return (
                        <SectionGroup key={`custom-${sectionIdx}`} data-section>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <SectionTitle data-section-title>{section.sectionTitle}</SectionTitle>
                            {/* <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                              {section.marksInfo}
                            </span> */}
                          </div>
                          {section.sectionNote && (
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                              Note: {section.sectionNote}
                            </div>
                          )}
                          {section.questions.map((question) => (
                            <QuestionItem key={question.questionNumber} data-question>
                              <QuestionText data-question-text>
                                {question.questionNumber}. {question.question}
                              </QuestionText>
                              {showAnswerKey && (
                                <AnswerBox data-answer>
                                  <AnswerLabel>Expected Answer:</AnswerLabel>
                                  <AnswerText>
                                    {question.expectedAnswer || 'Answer not available'}
                                  </AnswerText>
                                  {question.keyPoints && question.keyPoints.length > 0 && (
                                    <AnswerText style={{ marginTop: '0.5rem' }}>
                                      <strong>Key Points:</strong>
                                      <ul style={{ margin: '0.25rem 0 0 1rem', paddingLeft: 0 }}>
                                        {question.keyPoints.map((point: string, idx: number) => (
                                          <li key={idx} style={{ margin: '0.25rem 0' }}>
                                            {point || 'Point not available'}
                                          </li>
                                        ))}
                                      </ul>
                                    </AnswerText>
                                  )}
                                </AnswerBox>
                              )}
                            </QuestionItem>
                          ))}
                        </SectionGroup>
                      );
                    }
                  })}
                </DocumentContent>
              </PreviewDocument>
            </PreviewDocumentPage>
            );
          })
        ) : (
          <PreviewDocument>
            <DocumentWatermark>
              <WatermarkIcon className="material-symbols-outlined">history_edu</WatermarkIcon>
            </DocumentWatermark>
            <DocumentContent>
              <SectionGroup>
                <SectionTitle>No Paper Generated</SectionTitle>
                <QuestionText>Generate a paper from the settings tab to preview it here.</QuestionText>
              </SectionGroup>
            </DocumentContent>
          </PreviewDocument>
        )}
      </PreviewContent>

      <PreviewFooter>
        <FooterButton
          $variant="secondary"
          onClick={handleRegenerate}
          disabled={!generatedPaper || isGenerating || isExporting}
          style={{ 
            gridColumn: 'span 2',
            opacity: !generatedPaper || isGenerating || isExporting ? 0.6 : 1, 
            cursor: !generatedPaper || isGenerating || isExporting ? 'not-allowed' : 'pointer',
          }}
        >
          <FooterButtonIcon className="material-symbols-outlined">
            {isGenerating ? 'hourglass_empty' : 'refresh'}
          </FooterButtonIcon>
          <FooterButtonSpan>
            {isGenerating ? 'Generating...' : 'Regenerate'}
          </FooterButtonSpan>
        </FooterButton>

        <FooterButton
          $variant="primary"
          onClick={handleExportToWord}
          disabled={!generatedPaper || isGenerating || isExporting}
          style={{ 
            gridColumn: 'span 4',
            opacity: !generatedPaper || isGenerating || isExporting ? 0.6 : 1, 
            cursor: !generatedPaper || isGenerating || isExporting ? 'not-allowed' : 'pointer',
            position: 'relative'
          }}
        >
          <FooterButtonIcon className="material-symbols-outlined">
            {isExporting ? 'hourglass_empty' : 'description'}
          </FooterButtonIcon>
          <FooterButtonSpan>
            {isExporting ? 'Exporting...' : 'Export'}
          </FooterButtonSpan>
        </FooterButton>
      </PreviewFooter>

      {showExportDropdown && (
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '20px',
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 50,
            minWidth: '200px',
          }}
        >
          <button
            onClick={handleExportWord}
            disabled={isExporting}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: isExporting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#000',
              opacity: isExporting ? 0.6 : 1,
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isExporting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
              description
            </span>
            <span>Export as Word</span>
          </button>
          <div style={{ borderTop: '1px solid #e2e8f0' }} />
          <button
            onClick={handleExportPDFPuppeteer}
            disabled={isExporting}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: isExporting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#000',
              opacity: isExporting ? 0.6 : 1,
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isExporting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
              picture_as_pdf
            </span>
            <span>Export as PDF</span>
          </button>
        </div>
      )}

      {showExportDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40,
          }}
          onClick={() => setShowExportDropdown(false)}
        />
      )}

      {isEditMode && generatedPaper && (
        <EditMode
          mcqQuestions={generatedPaper.mcqQuestions || []}
          shortAnswerQuestions={generatedPaper.shortAnswerQuestions || []}
          onSave={handleEditModeSave}
          onClose={() => setIsEditMode(false)}
        />
      )}
    </PaperPreviewSection>
  );
};
