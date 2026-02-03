import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../../navbar/actions';
import adaptiveContentSelector from '../../selectors';
import {
  contentBuilderSetGenerating,
  contentBuilderSetGeneratedContent,
  contentBuilderSetGenerationError,
  contentBuilderUpdateCustomization,
  contentBuilderSetGenerateContentApiLoading,
} from '../../actions';
import { generateAdaptiveContent,  } from '../../services/contentBuilderService';
import { extractDocumentStructure, convertChapterSectionsToSections } from '../../services/sectionService';
import { createAdaptiveContent } from '../../contentLibrary/service';
import { HierarchySelector } from '../HierarchySelector';
import toast from 'react-hot-toast';
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
  CenterPanel,
  CanvasContainer,
  CanvasHeader,
  CanvasTitle,
  CanvasTitleText,
  SaveStatus,
  SaveDot,
  SaveText,
  ContentCard,
  ContentTitle,
  ContentText,
  AddContentCard,
  AddIconWrapper,
  AddContentText,
  AddContentTitle,
  AddContentSubtitle,
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
  SaveButton,
} from './ContentBuilder.styles';

export const ContentBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedSection, setSelectedSection] = useState('4.1');
  const [hierarchySelection, setHierarchySelection] = useState({
    syllabusId: null as string | null,
    syllabusName: null as string | null,
    standardId: null as string | null,
    standardName: null as string | null,
    subjectId: null as string | null,
    subjectName: null as string | null,
    chapterId: null as string | null,
    chapterName: null as string | null,
    chapterFileId: null as string | null,
    chapterSections: null as Array<{
      number: string;
      label: string;
      subsections?: Array<{
        number: string;
        label: string;
        subsections?: Array<{
          number: string;
          label: string;
        }>;
      }>;
    }> | null,
  });
  const [sections, setSections] = useState<Array<{ id: string; label: string }>>([]);
  const [loadingSections, setLoadingSections] = useState(false);

  // Redux selectors
  const hasAnyFileUploading = useSelector(adaptiveContentSelector.getHasAnyFileUploading);
  const isGenerating = useSelector(adaptiveContentSelector.getIsGenerating);
  const generatedContent = useSelector(adaptiveContentSelector.getGeneratedContent);
  const generationError = useSelector(adaptiveContentSelector.getGenerationError);
  const customizationSettings = useSelector(adaptiveContentSelector.getCustomizationSettings);
  const selectedFile = useSelector(adaptiveContentSelector.getSelectedFile);
  const selectedContentTypeId = useSelector(adaptiveContentSelector.getSelectedContentTypeId);
  const fileUploadApiLoading = useSelector(adaptiveContentSelector.getFileUploadApiLoading);
  const generateContentApiLoading = useSelector(adaptiveContentSelector.getGenerateContentApiLoading);

  const handleBackToAdaptiveContent = () => {
    dispatch(setCurrentPage('adaptive-content') as any);
  };

  const handleHierarchyChange = (selection: any) => {
    setHierarchySelection(selection);
  };

  // Fetch sections when chapter is selected
  useEffect(() => {
    const fetchSections = async () => {
      if (hierarchySelection.chapterFileId) {
        try {
          setLoadingSections(true);
          setSections([]);
          setSelectedSection('');

          let fetchedSections: Array<{ id: string; label: string }> = [];

          // Check if sections data is available from the API response
          if (hierarchySelection.chapterSections && Array.isArray(hierarchySelection.chapterSections) && hierarchySelection.chapterSections.length > 0) {
            // Use sections data from chapters API
            const convertedSections = convertChapterSectionsToSections(hierarchySelection.chapterSections);
            fetchedSections = convertedSections.map((section) => ({
              id: section.id,
              label: section.label,
            }));
          } else {
            // Call extract document API if no sections data available
            const extractedSections = await extractDocumentStructure(hierarchySelection.chapterFileId, hierarchySelection.chapterId || undefined, hierarchySelection.chapterName || undefined);
            fetchedSections = extractedSections.map((section) => ({
              id: section.id,
              label: section.label,
            }));
          }

          setSections(fetchedSections);

          // Set first section as selected if available
          if (fetchedSections.length > 0) {
            setSelectedSection(fetchedSections[0].id);
          }
        } catch (error) {
          console.error('Failed to fetch sections:', error);
          toast.error('Failed to load sections');
        } finally {
          setLoadingSections(false);
        }
      } else {
        setSections([]);
        setSelectedSection('');
      }
    };

    fetchSections();
  }, [hierarchySelection.chapterFileId, hierarchySelection.chapterSections, hierarchySelection.chapterId, hierarchySelection.chapterName]);

  const handleRegenerateContent = async () => {
    try {
      // Use fileId from selected chapter if available, otherwise use selected file
      const fileIdToUse = hierarchySelection.chapterFileId || selectedFile?.fileId;
      
      if (!fileIdToUse) {
        toast.error('Please select a chapter or upload a file');
        return;
      }

      if (!hierarchySelection.chapterId) {
        toast.error('Please select a chapter');
        return;
      }

      dispatch(contentBuilderSetGenerating(true));
      dispatch(contentBuilderSetGenerateContentApiLoading(true));
      dispatch(contentBuilderSetGenerationError(null));

      const response = await generateAdaptiveContent({
        fileId: fileIdToUse,
        sectionNumber: 1,
        section_no: selectedSection || undefined,
        topicName: hierarchySelection.chapterId || 'Study Material',
        contentType: customizationSettings.formatStyle,
        contentDepth: customizationSettings.contentDepth,
        visualStyle: customizationSettings.visualStyle,
        outputLanguage: customizationSettings.outputLanguage,
        contentTypeId: selectedContentTypeId || 'sticky-notes',
      });

      if (response.success) {
        // Handle new API response format: { success: true, images: [...] }
        const images = (response as any).images || (response.data as any)?.images || (response.data as any)?.zipFile || [];
        
        // Validate images array
        if (!Array.isArray(images) || images.length === 0) {
          throw new Error('No images returned from API');
        }

        // Ensure all images have slideNumber and url
        const validImages = images.filter(
          (img: any) => img && typeof img === 'object' && 'slideNumber' in img && 'url' in img
        ) as Array<{ slideNumber: number; url: string }>;

        if (validImages.length === 0) {
          throw new Error('Invalid image format in response');
        }

        dispatch(
          contentBuilderSetGeneratedContent({
            sectionNumber: 1,
            topicName: hierarchySelection.chapterId || 'Study Material',
            contentType: customizationSettings.formatStyle,
            htmlContent: 'adaptive-content',
            inputTokens: 0,
            outputTokens: 0,
            generatedAt: new Date().toISOString(),
            imageData: validImages,
            fileName: 'adaptive-content-images.zip',
            mimeType: 'application/zip',
            zipFiles: validImages,
            pdfLink: undefined,
          })
        );

        toast.success(`Content generated successfully with ${validImages.length} image(s)!`);
      } else {
        throw new Error(response.message || 'Failed to generate content');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate content';
      dispatch(contentBuilderSetGenerationError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(contentBuilderSetGenerating(false));
      dispatch(contentBuilderSetGenerateContentApiLoading(false));
    }
  };

  const handleFinalizeAndSave = async () => {
    try {
      if (!generatedContent) {
        toast.error('No content to save');
        return;
      }

      if (!hierarchySelection.chapterId) {
        toast.error('Please select a chapter');
        return;
      }

      // Extract image URLs from imageData
      const imageUrls = Array.isArray(generatedContent.imageData)
        ? generatedContent.imageData
            .filter((item: any) => item.url)
            .map((item: any) => item.url)
        : [];

      if (imageUrls.length === 0) {
        toast.error('No images to save');
        return;
      }

      // Map UI content type IDs to API format
      const contentTypeMap: Record<string, string> = {
        'sticky-notes': 'STICKY NOTES',
        'ready-reckoner': 'READY RECKONER',
        'flash-cards': 'FLASHCARDS',
        'mind-maps': 'MIND MAP',
        'visual-explainers': 'VISUAL EXPLAINERS',
      };

      // Prepare content data for API
      const contentData = {
        title: hierarchySelection.chapterName || generatedContent.topicName || 'Untitled Content',
        subject: hierarchySelection.subjectName || 'Unknown Subject',
        standard: hierarchySelection.standardName || 'Unknown Standard',
        chapter: hierarchySelection.chapterName || 'Unknown Chapter',
        contentType: contentTypeMap[selectedContentTypeId || 'sticky-notes'] || 'STICKY NOTES',
        syllabusId: hierarchySelection.syllabusId || '',
        standardId: hierarchySelection.standardId || '',
        subjectId: hierarchySelection.subjectId || '',
        chapterId: hierarchySelection.chapterId || '',
        fileId: hierarchySelection.chapterFileId || '',
        images: imageUrls,
        htmlContent: generatedContent.htmlContent || '',
        metadata: {
          usedByClasses: 0,
        },
      };

      // Save to content library
      await createAdaptiveContent(contentData);
      toast.success('Content saved to library successfully!');

      // Reset form
      dispatch(contentBuilderSetGeneratedContent(null as any));
      setSelectedSection('');
      setSections([]);
      setHierarchySelection({
        syllabusId: null,
        syllabusName: null,
        standardId: null,
        standardName: null,
        subjectId: null,
        subjectName: null,
        chapterId: null,
        chapterName: null,
        chapterFileId: null,
        chapterSections: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save content';
      toast.error(errorMessage);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
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
            {/* <PreviewButton disabled={!generatedContent}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                preview
              </span>
              Preview
            </PreviewButton> */}
            <SaveButton
              onClick={handleFinalizeAndSave}
              disabled={!generatedContent || isGenerating || generateContentApiLoading}
              style={{
                opacity: !generatedContent || isGenerating || generateContentApiLoading ? 0.5 : 1,
                cursor: !generatedContent || isGenerating || generateContentApiLoading ? 'not-allowed' : 'pointer',
              }}
            >
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
              <Label>Select Hierarchy</Label>
              <HierarchySelector
                onSelectionChange={(selection) => handleHierarchyChange(selection)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Section</Label>
              {loadingSections ? (
                <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: '1.5rem',
                      animation: 'spin 1s linear infinite',
                      display: 'inline-block',
                    }}
                  >
                    hourglass_empty
                  </span>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>Loading sections...</p>
                </div>
              ) : sections.length > 0 ? (
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
                      {section.label || (section as any).name || section.id}
                    </SectionItem>
                  ))}
                </SectionList>
              ) : (
                <div style={{ padding: '1rem', color: '#9ca3af', fontSize: '0.875rem', textAlign: 'center' }}>
                  Select a chapter to load sections
                </div>
              )}
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
                <SaveText>
                  {generatedContent ? 'Content generated' : 'Ready to generate'}
                </SaveText>
              </SaveStatus>
            </CanvasHeader>

            {generatedContent ? (
              <>
                <ContentCard>
                  <ContentTitle>
                    {hierarchySelection.standardName && hierarchySelection.subjectName && hierarchySelection.chapterName
                      ? `${hierarchySelection.standardName} • ${hierarchySelection.subjectName} • ${hierarchySelection.chapterName}`
                      : generatedContent.topicName}
                  </ContentTitle>
                  <ContentText>
                    {Array.isArray(generatedContent.imageData) && generatedContent.imageData.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {generatedContent.imageData.map((image: any, index: number) => (
                          <div
                            key={index}
                            style={{
                              borderRadius: '0.5rem',
                              overflow: 'hidden',
                              border: '1px solid #e5e7eb',
                              backgroundColor: '#f9fafb',
                            }}
                          >
                            <img
                              src={image.url}
                              alt={`Generated content slide ${image.slideNumber}`}
                              style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <p>
                          Content generated successfully with {generatedContent.outputTokens} output tokens.
                        </p>
                        <ul>
                          <li>
                            <strong>Content Type:</strong> {generatedContent.contentType}
                          </li>
                          <li>
                            <strong>Depth:</strong> {customizationSettings.contentDepth}
                          </li>
                          <li>
                            <strong>Visual Style:</strong> {customizationSettings.visualStyle}
                          </li>
                          <li>
                            <strong>Language:</strong> {customizationSettings.outputLanguage}
                          </li>
                        </ul>
                      </div>
                    )}
                  </ContentText>
                </ContentCard>
              </>
            ) : (
              <AddContentCard>
                <AddIconWrapper>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.875rem' }}>
                    {isGenerating ? 'hourglass_empty' : 'add_circle'}
                  </span>
                </AddIconWrapper>
                <AddContentText>
                  <AddContentTitle>
                    {isGenerating ? 'Generating Content...' : 'Ready to Generate'}
                  </AddContentTitle>
                  <AddContentSubtitle>
                    {isGenerating
                      ? 'Please wait while we generate your content'
                      : 'Select a chapter and click Regenerate Content to get started'}
                  </AddContentSubtitle>
                </AddContentText>
                {generationError && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fdf2f2', borderRadius: '0.5rem', color: '#dc2626', fontSize: '0.875rem' }}>
                    ✗ {generationError}
                  </div>
                )}
              </AddContentCard>
            )}
          </CanvasContainer>
        </CenterPanel>

        <RightPanel>
          <PanelContent>
            <PanelTitle>Customization</PanelTitle>

            <SettingsSection>
              <SettingsLabel>Content Depth</SettingsLabel>
              <DepthSelector>
                <DepthButton
                  isActive={customizationSettings.contentDepth === 'beginner'}
                  onClick={() =>
                    dispatch(contentBuilderUpdateCustomization({ contentDepth: 'beginner' }))
                  }
                >
                  Beginner
                </DepthButton>
                <DepthButton
                  isActive={customizationSettings.contentDepth === 'intermediate'}
                  onClick={() =>
                    dispatch(contentBuilderUpdateCustomization({ contentDepth: 'intermediate' }))
                  }
                >
                  Interm.
                </DepthButton>
                <DepthButton
                  isActive={customizationSettings.contentDepth === 'advanced'}
                  onClick={() =>
                    dispatch(contentBuilderUpdateCustomization({ contentDepth: 'advanced' }))
                  }
                >
                  Advanced
                </DepthButton>
              </DepthSelector>
              <DepthHint>
                {customizationSettings.contentDepth === 'beginner' && 'Beginner: Simplified concepts with basics.'}
                {customizationSettings.contentDepth === 'intermediate' && 'Intermediate: Balanced theory & examples.'}
                {customizationSettings.contentDepth === 'advanced' && 'Advanced: In-depth analysis & details.'}
              </DepthHint>
            </SettingsSection>

            <SettingsSection>
              <SettingsLabel>Format Style</SettingsLabel>
              <FormatOption
                isSelected={customizationSettings.formatStyle === 'bullet-points'}
                onClick={() =>
                  dispatch(contentBuilderUpdateCustomization({ formatStyle: 'bullet-points' }))
                }
              >
                <FormatRadio
                  type="radio"
                  name="format"
                  checked={customizationSettings.formatStyle === 'bullet-points'}
                  onChange={() =>
                    dispatch(contentBuilderUpdateCustomization({ formatStyle: 'bullet-points' }))
                  }
                />
                <FormatContent>
                  <FormatTitle>Bullet Points</FormatTitle>
                  <FormatSubtitle>Best for rapid review</FormatSubtitle>
                </FormatContent>
                <FormatIcon
                  className="material-symbols-outlined"
                  isActive={customizationSettings.formatStyle === 'bullet-points'}
                >
                  format_list_bulleted
                </FormatIcon>
              </FormatOption>
              <FormatOption
                isSelected={customizationSettings.formatStyle === 'structured-grid'}
                onClick={() =>
                  dispatch(contentBuilderUpdateCustomization({ formatStyle: 'structured-grid' }))
                }
              >
                <FormatRadio
                  type="radio"
                  name="format"
                  checked={customizationSettings.formatStyle === 'structured-grid'}
                  onChange={() =>
                    dispatch(contentBuilderUpdateCustomization({ formatStyle: 'structured-grid' }))
                  }
                />
                <FormatContent>
                  <FormatTitle>Structured Grid</FormatTitle>
                  <FormatSubtitle>Ideal for comparison</FormatSubtitle>
                </FormatContent>
                <FormatIcon className="material-symbols-outlined" isActive={customizationSettings.formatStyle === 'structured-grid'}>
                  grid_view
                </FormatIcon>
              </FormatOption>
            </SettingsSection>

            <SettingsSection>
              <SettingsLabel>Visual Style</SettingsLabel>
              <Select
                value={customizationSettings.visualStyle}
                onChange={(e) =>
                  dispatch(
                    contentBuilderUpdateCustomization({
                      visualStyle: e.target.value as 'academic' | 'creative' | 'minimal' | 'detailed',
                    })
                  )
                }
              >
                <option value="academic">Academic (Clean & Formal)</option>
                <option value="creative">Creative (Engaging & Visual)</option>
                <option value="minimal">Minimal (Simple & Direct)</option>
                <option value="detailed">Detailed (Comprehensive)</option>
              </Select>
            </SettingsSection>

            <SettingsSection>
              <SettingsLabel>Output Language</SettingsLabel>
              <LanguageTags>
                <LanguageTag
                  isSelected={customizationSettings.outputLanguage === 'english'}
                  onClick={() =>
                    dispatch(contentBuilderUpdateCustomization({ outputLanguage: 'english' }))
                  }
                >
                  English
                </LanguageTag>
                <LanguageTag
                  isSelected={customizationSettings.outputLanguage === 'hindi'}
                  onClick={() =>
                    dispatch(contentBuilderUpdateCustomization({ outputLanguage: 'hindi' }))
                  }
                >
                  Hindi
                </LanguageTag>
                <LanguageTag
                  isSelected={customizationSettings.outputLanguage === 'spanish'}
                  onClick={() =>
                    dispatch(contentBuilderUpdateCustomization({ outputLanguage: 'spanish' }))
                  }
                >
                  Spanish
                </LanguageTag>
              </LanguageTags>
            </SettingsSection>
          </PanelContent>

          <PanelFooter>
            <RegenerateButton
              onClick={handleRegenerateContent}
              disabled={!hierarchySelection.chapterId || isGenerating || hasAnyFileUploading || fileUploadApiLoading || generateContentApiLoading}
              style={{
                opacity: !hierarchySelection.chapterId || isGenerating || hasAnyFileUploading || fileUploadApiLoading || generateContentApiLoading ? 0.5 : 1,
                cursor: !hierarchySelection.chapterId || isGenerating || hasAnyFileUploading || fileUploadApiLoading || generateContentApiLoading ? 'not-allowed' : 'pointer',
              }}
            >
              <span className="material-symbols-outlined" style={{ animation: isGenerating || generateContentApiLoading ? 'spin 1s linear infinite' : 'none' }}>
                {isGenerating || generateContentApiLoading ? 'hourglass_empty' : 'refresh'}
              </span>
              {isGenerating || generateContentApiLoading ? 'Generating...' : 'Regenerate Content'}
            </RegenerateButton>
          </PanelFooter>
        </RightPanel>
      </Container>
    </div>
  );
};
