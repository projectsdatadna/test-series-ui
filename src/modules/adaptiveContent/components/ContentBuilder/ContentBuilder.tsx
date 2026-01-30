import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../../navbar/actions';
import adaptiveContentSelector from '../../selectors';
import {
  contentBuilderAddUploadedFile,
  contentBuilderUpdateFileUploadStatus,
  contentBuilderRemoveUploadedFile,
  contentBuilderSetFileUploading,
  contentBuilderSetUploadError,
  contentBuilderSetGenerating,
  contentBuilderSetGeneratedContent,
  contentBuilderSetGenerationError,
  contentBuilderUpdateCustomization,
  contentBuilderSetSelectedFile,
  contentBuilderSetFileUploadApiLoading,
  contentBuilderSetGenerateContentApiLoading,
} from '../../actions';
import { generateAdaptiveContent, uploadFilesToContentBuilder } from '../../services/contentBuilderService';
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
  EditButton,
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
  PreviewButton,
  SaveButton,
} from './ContentBuilder.styles';

export const ContentBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSection, setSelectedSection] = useState('4.1');

  // Redux selectors
  const uploadedFiles = useSelector(adaptiveContentSelector.getUploadedFiles);
  const isUploading = useSelector(adaptiveContentSelector.getIsUploading);
  const hasAnyFileUploading = useSelector(adaptiveContentSelector.getHasAnyFileUploading);
  const hasCompleteFiles = useSelector(adaptiveContentSelector.getHasCompleteFiles);
  const uploadError = useSelector(adaptiveContentSelector.getUploadError);
  const isGenerating = useSelector(adaptiveContentSelector.getIsGenerating);
  const generatedContent = useSelector(adaptiveContentSelector.getGeneratedContent);
  const generationError = useSelector(adaptiveContentSelector.getGenerationError);
  const customizationSettings = useSelector(adaptiveContentSelector.getCustomizationSettings);
  const selectedFileId = useSelector(adaptiveContentSelector.getSelectedFileId);
  const selectedFile = useSelector(adaptiveContentSelector.getSelectedFile);
  const selectedContentTypeId = useSelector(adaptiveContentSelector.getSelectedContentTypeId);
  const fileUploadApiLoading = useSelector(adaptiveContentSelector.getFileUploadApiLoading);
  const generateContentApiLoading = useSelector(adaptiveContentSelector.getGenerateContentApiLoading);

  const handleBackToAdaptiveContent = () => {
    dispatch(setCurrentPage('adaptive-content') as any);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;

    const filesToUpload: File[] = [];

    // Validate all files first
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type !== 'application/pdf') {
        toast.error(`${file.name}: Only PDF files are allowed`);
        dispatch(contentBuilderSetUploadError('Only PDF files are allowed'));
        continue;
      }

      filesToUpload.push(file);
    }

    if (filesToUpload.length === 0) return;

    // Upload all files using pre-signed URLs
    try {
      dispatch(contentBuilderSetFileUploading(true));
      dispatch(contentBuilderSetFileUploadApiLoading(true));
      dispatch(contentBuilderSetUploadError(null));

      // Add files to state first
      filesToUpload.forEach((file) => {
        dispatch(
          contentBuilderAddUploadedFile({
            file,
            fileName: file.name,
            fileSize: file.size,
            uploadProgress: 0,
            isUploading: true,
          })
        );
      });

      // Upload all files using pre-signed URLs
      console.log('Uploading', filesToUpload.length, 'file(s) using pre-signed URLs');
      const responses = await uploadFilesToContentBuilder(
        filesToUpload,
        'Study Material',
        'document',
        (fileName: string, progress: number) => {
          console.log(`${fileName} upload progress:`, progress);
          dispatch(contentBuilderUpdateFileUploadStatus(fileName, progress, true));
        }
      );

      // Update each file with its fileId
      responses.forEach((response, index) => {
        const file = filesToUpload[index];
        const fileId = response.fileId || response.id;
        console.log(`File ${file.name} uploaded with fileId:`, fileId);
        dispatch(
          contentBuilderUpdateFileUploadStatus(
            file.name,
            100,
            false,
            fileId
          )
        );
      });

      toast.success(`${filesToUpload.length} file${filesToUpload.length !== 1 ? 's' : ''} uploaded successfully!`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      dispatch(contentBuilderSetUploadError(errorMessage));
      toast.error(errorMessage);
      // Mark all files as not uploading on error
      filesToUpload.forEach((file) => {
        dispatch(contentBuilderUpdateFileUploadStatus(file.name, 0, false));
      });
    } finally {
      dispatch(contentBuilderSetFileUploading(false));
      dispatch(contentBuilderSetFileUploadApiLoading(false));
    }

    // Reset input to allow re-uploading same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (fileId: string | undefined) => {
    if (!fileId) return;
    dispatch(contentBuilderRemoveUploadedFile(fileId));
    toast.success('File removed');
  };

  const handleSelectFile = (fileId: string | undefined) => {
    if (!fileId) return;
    dispatch(contentBuilderSetSelectedFile(fileId));
  };

  const handleRegenerateContent = async () => {
    try {
      console.log('Selected file:', selectedFile);
      console.log('Uploaded files:', uploadedFiles);
      
      if (!selectedFile || !selectedFile.fileId) {
        toast.error('Please select a file first');
        return;
      }

      dispatch(contentBuilderSetGenerating(true));
      dispatch(contentBuilderSetGenerateContentApiLoading(true));
      dispatch(contentBuilderSetGenerationError(null));

      const response = await generateAdaptiveContent({
        fileId: selectedFile.fileId,
        sectionNumber: 1,
        topicName: 'Study Material',
        contentType: customizationSettings.formatStyle,
        contentDepth: customizationSettings.contentDepth,
        visualStyle: customizationSettings.visualStyle,
        outputLanguage: customizationSettings.outputLanguage,
        contentTypeId: selectedContentTypeId || 'sticky-notes',
      });

      console.log('API Response:', response);

      if (response.success) {
        // Handle new API response format: { success: true, images: [...] }
        const images = (response as any).images || (response.data as any)?.images || (response.data as any)?.zipFile || [];
        
        console.log('Images from response:', images);

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

        console.log('Valid images:', validImages);

        dispatch(
          contentBuilderSetGeneratedContent({
            sectionNumber: 1,
            topicName: 'Study Material',
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
        console.log('Generated content stored in Redux:', validImages);
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
        toast.error('No content to view');
        return;
      }

      // Check if imageData is an array of objects with URLs
      if (Array.isArray(generatedContent.imageData) && generatedContent.imageData.length > 0) {
        console.log('Opening images in new tabs...');
        
        // Extract URLs from imageData array
        const imageUrls = generatedContent.imageData
          .filter((item: any) => item.url)
          .map((item: any) => item.url);

        if (imageUrls.length === 0) {
          throw new Error('No image URLs found in response');
        }

        console.log('Found', imageUrls.length, 'image URL(s)');
        
        // Open each image in a new tab
        imageUrls.forEach((url: string, index: number) => {
          console.log(`Opening image ${index + 1} in new tab:`, url);
          window.open(url, '_blank');
        });
        
        toast.success(`Opened ${imageUrls.length} image(s) in new tab(s)!`);
      } else if (typeof generatedContent.imageData === 'string') {
        // Fallback: if imageData is a base64 string, decode and download as ZIP
        try {
          console.log('Image data is base64 string, downloading as ZIP...');
          
          let cleanBase64 = generatedContent.imageData;
          
          // Handle data URLs
          if (cleanBase64.includes(',')) {
            cleanBase64 = cleanBase64.split(',')[1];
          }

          // Remove any whitespace and newlines
          cleanBase64 = cleanBase64.replace(/\s/g, '').replace(/\n/g, '').replace(/\r/g, '');

          // Validate base64 format
          if (cleanBase64.length % 4 !== 0) {
            while (cleanBase64.length % 4 !== 0) {
              cleanBase64 += '=';
            }
          }

          const byteCharacters = atob(cleanBase64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const zipBlob = new Blob([byteArray], { type: 'application/zip' });

          const blobUrl = window.URL.createObjectURL(zipBlob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'adaptive-content.zip';
          link.style.display = 'none';
          
          document.body.appendChild(link);
          link.click();
          
          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
          }, 100);

          toast.success('ZIP file downloaded successfully!');
        } catch (zipError) {
          console.error('Error downloading ZIP:', zipError);
          toast.error(`Failed to download: ${zipError instanceof Error ? zipError.message : 'Unknown error'}`);
        }
      } else {
        toast.error('No content available');
        console.log('No valid imageData found');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to open content';
      toast.error(errorMessage);
      console.error('Error:', error);
    }
  };
  

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const sections = [
    { id: '4.1', label: '4.1 Basis of Classification' },
    { id: '4.2', label: '4.2 Phylum Porifera' },
    { id: '4.3', label: '4.3 Phylum Coelenterata' },
  ];

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
            <PreviewButton disabled={!generatedContent}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                preview
              </span>
              Preview
            </PreviewButton>
            <SaveButton
              onClick={handleFinalizeAndSave}
              disabled={!generatedContent || isGenerating}
              style={{
                opacity: !generatedContent || isGenerating ? 0.5 : 1,
                cursor: !generatedContent || isGenerating ? 'not-allowed' : 'pointer',
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
              <div
                onClick={() => !isUploading && !fileUploadApiLoading && fileInputRef.current?.click()}
                style={{
                  padding: '2rem',
                  border: '2px dashed #e2e8f0',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  cursor: isUploading || fileUploadApiLoading ? 'not-allowed' : 'pointer',
                  backgroundColor: isUploading || fileUploadApiLoading ? '#f3f4f6' : '#f9fafb',
                  transition: 'all 0.2s',
                  opacity: isUploading || fileUploadApiLoading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isUploading && !fileUploadApiLoading) {
                    (e.currentTarget as HTMLElement).style.borderColor = '#2563eb';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#f0f9ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isUploading && !fileUploadApiLoading) {
                    (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#f9fafb';
                  }
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#2563eb', display: 'block', marginBottom: '0.5rem', animation: isUploading || fileUploadApiLoading ? 'spin 1s linear infinite' : 'none' }}>
                  {isUploading || fileUploadApiLoading ? 'hourglass_empty' : 'cloud_upload'}
                </span>
                <p style={{ margin: '0.5rem 0', fontWeight: 600, color: '#1f2937' }}>
                  {isUploading || fileUploadApiLoading ? 'Uploading PDF...' : 'Upload PDF'}
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                  {isUploading || fileUploadApiLoading ? 'Please wait while your file is being uploaded' : 'Click to browse or drag and drop'}
                </p>
                <p style={{ margin: '0.5rem 0', fontSize: '0.75rem', color: '#9ca3af' }}>
                  PDF files only
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              {uploadError && (
                <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#dc2626' }}>
                  ✗ {uploadError}
                </p>
              )}

              {uploadedFiles.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', marginBottom: '0.75rem' }}>
                    Uploaded Files ({uploadedFiles.length})
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.fileId}
                        onClick={() => handleSelectFile(file.fileId)}
                        style={{
                          padding: '0.75rem',
                          backgroundColor: selectedFileId === file.fileId ? '#e8f2ff' : '#f9fafb',
                          border: selectedFileId === file.fileId ? '1px solid #2563eb' : '1px solid #e2e8f0',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = '#f0f9ff';
                          (e.currentTarget as HTMLElement).style.borderColor = '#2563eb';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = selectedFileId === file.fileId ? '#e8f2ff' : '#f9fafb';
                          (e.currentTarget as HTMLElement).style.borderColor = selectedFileId === file.fileId ? '#2563eb' : '#e2e8f0';
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: '0', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {file.fileName}
                          </p>
                          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
                            {formatFileSize(file.fileSize)}
                            {file.fileId && ` • ID: ${file.fileId.substring(0, 8)}...`}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(file.fileId);
                          }}
                          style={{
                            marginLeft: '0.5rem',
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '0.375rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = '#fecaca';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = '#fee2e2';
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
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
                  <EditButton>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                      edit
                    </span>
                  </EditButton>
                  <ContentTitle>{generatedContent.topicName}</ContentTitle>
                  <ContentText>
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
                      : 'Upload a PDF and click Regenerate Content to get started'}
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
              disabled={!hasCompleteFiles || isGenerating || hasAnyFileUploading || fileUploadApiLoading || generateContentApiLoading}
              style={{
                opacity: !hasCompleteFiles || isGenerating || hasAnyFileUploading || fileUploadApiLoading || generateContentApiLoading ? 0.5 : 1,
                cursor: !hasCompleteFiles || isGenerating || hasAnyFileUploading || fileUploadApiLoading || generateContentApiLoading ? 'not-allowed' : 'pointer',
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
