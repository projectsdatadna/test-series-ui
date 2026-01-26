import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../navbar/actions';
import {
  Container,
  LeftPanel,
  PanelContent,
  PanelTitle,
  FormGroup,
  Label,
  Select,
  SectionList,
  SectionItem,
  PdfPreview,
  PdfPreviewContent,
  PdfPlaceholderLine,
  PdfImagePlaceholder,
  PdfCaption,
  CenterPanel,
  CanvasContainer,
  CanvasHeader,
  CanvasTitle,
  CanvasTitleText,
  SaveStatus,
  SaveDot,
  SaveText,
  ContentCard,
  EditButton,
  ContentTitle,
  ContentText,
  AddContentCard,
  AddIconWrapper,
  AddContentText,
  AddContentTitle,
  AddContentSubtitle,
  AddContentButtons,
  AddContentButton,
  RightPanel,
  SettingsSection,
  SettingsLabel,
  DepthSelector,
  DepthButton,
  DepthHint,
  FormatOption,
  FormatRadio,
  FormatContent,
  FormatTitle,
  FormatSubtitle,
  FormatIcon,
  LanguageTags,
  LanguageTag,
  PanelFooter,
  RegenerateButton,
  PageHeader,
  Breadcrumbs,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbCurrent,
  HeaderContent,
  HeaderTitle,
  HeaderSubtitle,
  HeaderActions,
  PreviewButton,
  SaveButton,
} from './ContentBuilder.styles';

type ContentDepth = 'beginner' | 'intermediate' | 'advanced';
type FormatStyle = 'bullet' | 'grid';
type Language = 'english' | 'hindi' | 'spanish';

export const ContentBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedSection, setSelectedSection] = useState('4.1');
  const [contentDepth, setContentDepth] = useState<ContentDepth>('intermediate');
  const [formatStyle, setFormatStyle] = useState<FormatStyle>('bullet');
  const [language, setLanguage] = useState<Language>('english');

  const handleBackToAdaptiveContent = () => {
    dispatch(setCurrentPage('adaptive-content') as any);
  };

  const sections = [
    { id: '4.1', label: '4.1 Basis of Classification' },
    { id: '4.2', label: '4.2 Phylum Porifera' },
    { id: '4.3', label: '4.3 Phylum Coelenterata' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <PageHeader>
        <Breadcrumbs>
          <BreadcrumbLink onClick={handleBackToAdaptiveContent}>Adaptive Content</BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbCurrent>Content Builder</BreadcrumbCurrent>
        </Breadcrumbs>
        <HeaderContent>
          <div>
            <HeaderTitle>AI Content Builder</HeaderTitle>
            <HeaderSubtitle>Generate and customize textbook-aligned teaching aids.</HeaderSubtitle>
          </div>
          <HeaderActions>
            <PreviewButton>
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                preview
              </span>
              Preview
            </PreviewButton>
            <SaveButton>
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                save
              </span>
              Finalize & Save
            </SaveButton>
          </HeaderActions>
        </HeaderContent>
      </PageHeader>

      <Container>
        <LeftPanel>
          <PanelContent>
            <PanelTitle>Textbook Context</PanelTitle>

            <FormGroup>
              <Label>Select Book</Label>
              <Select defaultValue="biology">
                <option value="biology">Biology Grade 11 - NCERT</option>
                <option value="chemistry">Chemistry Grade 11 - NCERT</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Chapter</Label>
              <Select defaultValue="04">
                <option value="04">04. Animal Kingdom</option>
                <option value="05">05. Plant Physiology</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Section</Label>
              <SectionList>
                {sections.map((section) => (
                  <SectionItem
                    key={section.id}
                    isSelected={selectedSection === section.id}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>
                      {selectedSection === section.id ? 'check_circle' : 'circle'}
                    </span>
                    {section.label}
                  </SectionItem>
                ))}
              </SectionList>
            </FormGroup>

            <FormGroup style={{ paddingTop: '1rem' }}>
              <Label>PDF Reference</Label>
              <PdfPreview>
                <PdfPreviewContent>
                  <PdfPlaceholderLine width="75%" />
                  <PdfPlaceholderLine />
                  <PdfPlaceholderLine />
                  <PdfPlaceholderLine width="83%" />
                  <PdfImagePlaceholder>
                    <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>
                      image
                    </span>
                  </PdfImagePlaceholder>
                  <PdfPlaceholderLine />
                  <PdfPlaceholderLine width="80%" />
                </PdfPreviewContent>
              </PdfPreview>
              <PdfCaption>Page 46 - Animal Kingdom</PdfCaption>
            </FormGroup>
          </PanelContent>
        </LeftPanel>

        <CenterPanel>
          <CanvasContainer>
            <CanvasHeader>
              <CanvasTitle>
                <span className="material-symbols-outlined" style={{ color: '#506ef7' }}>
                  auto_fix_high
                </span>
                <CanvasTitleText>AI Content Canvas</CanvasTitleText>
              </CanvasTitle>
              <SaveStatus>
                <SaveDot />
                <SaveText>Last saved 2m ago</SaveText>
              </SaveStatus>
            </CanvasHeader>

            <ContentCard>
              <EditButton>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                  edit
                </span>
              </EditButton>
              <ContentTitle>Ready Reckoner: Basis of Classification</ContentTitle>
              <ContentText>
                <p>
                  Living organisms are classified based on several fundamental features. This
                  summary covers the key parameters used in the Animal Kingdom:
                </p>
                <ul>
                  <li>
                    <strong>Levels of Organisation:</strong> Cellular (e.g., Sponges), Tissue,
                    Organ, and Organ system.
                  </li>
                  <li>
                    <strong>Symmetry:</strong> Asymmetrical, Radial symmetry, and Bilateral
                    symmetry.
                  </li>
                  <li>
                    <strong>Germ Layers:</strong> Diploblastic (two layers) vs. Triploblastic (three
                    layers).
                  </li>
                  <li>
                    <strong>Coelom:</strong> Acoelomates, Pseudocoelomates, and Coelomates.
                  </li>
                </ul>
              </ContentText>
            </ContentCard>

            <AddContentCard>
              <AddIconWrapper>
                <span className="material-symbols-outlined" style={{ fontSize: '1.875rem' }}>
                  add_circle
                </span>
              </AddIconWrapper>
              <AddContentText>
                <AddContentTitle>Add Visual Component</AddContentTitle>
                <AddContentSubtitle>Generate a Concept Map or Comparative Table</AddContentSubtitle>
              </AddContentText>
              <AddContentButtons>
                <AddContentButton>Table View</AddContentButton>
                <AddContentButton>Concept Map</AddContentButton>
              </AddContentButtons>
            </AddContentCard>
          </CanvasContainer>
        </CenterPanel>

        <RightPanel>
          <PanelContent>
            <PanelTitle>Customization</PanelTitle>

            <SettingsSection>
              <SettingsLabel>Content Depth</SettingsLabel>
              <DepthSelector>
                <DepthButton
                  isActive={contentDepth === 'beginner'}
                  onClick={() => setContentDepth('beginner')}
                >
                  Beginner
                </DepthButton>
                <DepthButton
                  isActive={contentDepth === 'intermediate'}
                  onClick={() => setContentDepth('intermediate')}
                >
                  Interm.
                </DepthButton>
                <DepthButton
                  isActive={contentDepth === 'advanced'}
                  onClick={() => setContentDepth('advanced')}
                >
                  Advanced
                </DepthButton>
              </DepthSelector>
              <DepthHint>
                {contentDepth === 'beginner' && 'Beginner: Simplified concepts with basics.'}
                {contentDepth === 'intermediate' && 'Intermediate: Balanced theory & examples.'}
                {contentDepth === 'advanced' && 'Advanced: In-depth analysis & details.'}
              </DepthHint>
            </SettingsSection>

            <SettingsSection>
              <SettingsLabel>Format Style</SettingsLabel>
              <FormatOption
                isSelected={formatStyle === 'bullet'}
                onClick={() => setFormatStyle('bullet')}
              >
                <FormatRadio
                  type="radio"
                  name="format"
                  checked={formatStyle === 'bullet'}
                  onChange={() => setFormatStyle('bullet')}
                />
                <FormatContent>
                  <FormatTitle>Bullet Points</FormatTitle>
                  <FormatSubtitle>Best for rapid review</FormatSubtitle>
                </FormatContent>
                <FormatIcon
                  className="material-symbols-outlined"
                  isActive={formatStyle === 'bullet'}
                >
                  format_list_bulleted
                </FormatIcon>
              </FormatOption>
              <FormatOption
                isSelected={formatStyle === 'grid'}
                onClick={() => setFormatStyle('grid')}
              >
                <FormatRadio
                  type="radio"
                  name="format"
                  checked={formatStyle === 'grid'}
                  onChange={() => setFormatStyle('grid')}
                />
                <FormatContent>
                  <FormatTitle>Structured Grid</FormatTitle>
                  <FormatSubtitle>Ideal for comparison</FormatSubtitle>
                </FormatContent>
                <FormatIcon className="material-symbols-outlined" isActive={formatStyle === 'grid'}>
                  grid_view
                </FormatIcon>
              </FormatOption>
            </SettingsSection>

            <SettingsSection>
              <SettingsLabel>Visual Style</SettingsLabel>
              <Select>
                <option>Academic (Clean & Formal)</option>
                <option>Modern (Vibrant Colors)</option>
                <option>Minimalist (B&W)</option>
              </Select>
            </SettingsSection>

            <SettingsSection>
              <SettingsLabel>Output Language</SettingsLabel>
              <LanguageTags>
                <LanguageTag
                  isSelected={language === 'english'}
                  onClick={() => setLanguage('english')}
                >
                  English
                </LanguageTag>
                <LanguageTag isSelected={language === 'hindi'} onClick={() => setLanguage('hindi')}>
                  Hindi
                </LanguageTag>
                <LanguageTag
                  isSelected={language === 'spanish'}
                  onClick={() => setLanguage('spanish')}
                >
                  Spanish
                </LanguageTag>
              </LanguageTags>
            </SettingsSection>
          </PanelContent>

          <PanelFooter>
            <RegenerateButton>
              <span className="material-symbols-outlined">refresh</span>
              Regenerate Content
            </RegenerateButton>
          </PanelFooter>
        </RightPanel>
      </Container>
    </div>
  );
};
