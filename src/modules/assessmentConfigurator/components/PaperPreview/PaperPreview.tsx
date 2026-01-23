import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { toggleAnswerKey, reset } from '../../actions';
import { selectShowAnswerKey } from '../../selectors';
import {
  PaperPreviewSection,
  PreviewHeader,
  PreviewTitleSection,
  PreviewIcon,
  PreviewTitle,
  PreviewTitleBorderRight,
  AnswerKeyToggle,
  ToggleSwitchInput,
  ToggleSwitchBox,
  ToggleLabel,
  PreviewActionsSection,
  PreviewActionButton,
  ActionIcon,
  PreviewContent,
  PreviewDocument,
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

export const PaperPreview: React.FC = () => {
  const dispatch = useAppDispatch();
  const showAnswerKey = useAppSelector(selectShowAnswerKey);

  const handleAnswerKeyToggle = () => {
    dispatch(toggleAnswerKey());
  };

  const handleRegenerate = () => {
    dispatch(reset());
  };

  const handleDownloadKey = () => {
    // Implement download logic
    console.log('Download answer key');
  };

  const handleExportToWord = () => {
    // Implement export logic
    console.log('Export to Word');
  };

  return (
    <PaperPreviewSection id="section-preview">
      <PreviewHeader>
        <PreviewTitleSection>
          <PreviewIcon className="material-symbols-outlined">visibility</PreviewIcon>
          <PreviewTitleBorderRight>
            <PreviewTitle>Preview</PreviewTitle>
          </PreviewTitleBorderRight>
        </PreviewTitleSection>

        <AnswerKeyToggle>
          <ToggleSwitchInput
            checked={showAnswerKey}
            id="paper-answer-key-switch"
            onChange={handleAnswerKeyToggle}
            type="checkbox"
          />
          <ToggleSwitchBox />
          <ToggleLabel>Include Answers</ToggleLabel>
        </AnswerKeyToggle>

        <PreviewActionsSection>
          <PreviewActionButton title="Zoom In">
            <ActionIcon className="material-symbols-outlined">zoom_in</ActionIcon>
          </PreviewActionButton>
          <PreviewActionButton title="Print">
            <ActionIcon className="material-symbols-outlined">print</ActionIcon>
          </PreviewActionButton>
        </PreviewActionsSection>
      </PreviewHeader>

      <PreviewContent>
        <PreviewDocument>
          <DocumentWatermark>
            <WatermarkIcon className="material-symbols-outlined">history_edu</WatermarkIcon>
          </DocumentWatermark>

          <DocumentContent>
            <DocumentHeader>
              <DocumentTitle>Test Series Academy</DocumentTitle>
              <DocumentSubtitle>Mid-Term Assessment (Physics)</DocumentSubtitle>
              <DocumentMeta>
                <span>Code: PHY-102</span>
                <span>3 Hours</span>
                <span>70 Marks</span>
              </DocumentMeta>
            </DocumentHeader>

            <SectionGroup>
              <SectionTitle>Section A (MCQs)</SectionTitle>
              <QuestionItem>
                <QuestionText>
                  1. A spherical conductor of radius 10cm has a charge of 3.2 × 10⁻⁷C distributed
                  uniformly on its surface. What is the magnitude of electric field at a point 15cm from
                  the centre?
                </QuestionText>
                <OptionsGrid>
                  <OptionText>(a) 1.28 × 10⁵ N/C</OptionText>
                  <OptionText>(b) 1.28 × 10⁶ N/C</OptionText>
                  <OptionText>(c) 1.28 × 10⁴ N/C</OptionText>
                  <OptionText>(d) Zero</OptionText>
                </OptionsGrid>
                {showAnswerKey && (
                  <AnswerBox>
                    <AnswerLabel>Correct Answer: (a)</AnswerLabel>
                    <AnswerText>
                      Using Gauss's Law, E = (1/4πε₀) × (q/r²). Magnitude E = 1.28 × 10⁵ N/C.
                    </AnswerText>
                  </AnswerBox>
                )}
              </QuestionItem>
            </SectionGroup>
          </DocumentContent>
        </PreviewDocument>
      </PreviewContent>

      <PreviewFooter>
        <FooterButton onClick={handleRegenerate}>
          <FooterButtonIcon className="material-symbols-outlined">refresh</FooterButtonIcon>
          <FooterButtonSpan>Regenerate</FooterButtonSpan>
          <span style={{ display: 'block', fontSize: '0.75rem' }}>Reset</span>
        </FooterButton>
        <FooterButton $variant="secondary" onClick={handleDownloadKey}>
          <FooterButtonIcon className="material-symbols-outlined">key</FooterButtonIcon>
          <FooterButtonSpan>Download Key</FooterButtonSpan>
          <span style={{ display: 'block', fontSize: '0.75rem' }}>Answer Key</span>
        </FooterButton>
        <FooterButton
          $variant="primary"
          onClick={handleExportToWord}
          style={{ gridColumn: 'span 2' }}
        >
          <FooterButtonIcon className="material-symbols-outlined">description</FooterButtonIcon>
          <FooterButtonSpan>Export to Word</FooterButtonSpan>
        </FooterButton>
      </PreviewFooter>
    </PaperPreviewSection>
  );
};
