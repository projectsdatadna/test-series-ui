import React, { useRef, useState } from 'react';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import {
  setUploadedFile,
  setSelectedSyllabus,
  setSelectedStandard,
  setSelectedSubject,
  setChapterName,
  setUploading,
  setUploadError,
  setUploadSuccess,
  setUploadProgress,
  setFileId,
  resetForm,
} from '../../actions';
import {
  selectUploadedFile,
  selectSelectedSyllabus,
  selectSelectedStandard,
  selectSelectedSubject,
  selectChapterName,
  selectIsUploading,
  selectUploadError,
  selectUploadSuccess,
  selectUploadProgress,
} from '../../selectors';
import { uploadFilesToContentBuilder } from '../../../adaptiveContent/services/contentBuilderService';
import { uploadBookMetadata } from '../../services/bookUploadService';
import type { DropdownOption } from '../../types';
import * as S from './BookUploadForm.styles';

const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    borderColor: '#d1d5db',
    borderRadius: '0.375rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#2563eb',
    },
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
    },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#f0f9ff' : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#1f2937',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: state.isSelected ? '#2563eb' : '#f0f9ff',
    },
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '0.375rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  }),
};

// Mock data - replace with API calls if needed
const SYLLABUSES: DropdownOption[] = [
  { id: 'SYL_NCERT', name: 'NCERT' },
  { id: 'SYL_TNST', name: 'TN State Board' },
];

const STANDARDS: DropdownOption[] = [
  { id: 'STD_6', name: 'Class 6' },
  { id: 'STD_7', name: 'Class 7' },
  { id: 'STD_8', name: 'Class 8' },
  { id: 'STD_9', name: 'Class 9' },
  { id: 'STD_10', name: 'Class 10' },
  { id: 'STD_11', name: 'Class 11' },
  { id: 'STD_12', name: 'Class 12' },
];

const SUBJECTS: DropdownOption[] = [
  { id: 'SUB_TAM', name: 'Tamil' },
  { id: 'SUB_ENG', name: 'English' },
  { id: 'SUB_MAT', name: 'Mathematics' },
  { id: 'SUB_SCI', name: 'Science' },
  { id: 'SUB_SOC', name: 'Social Studies' },
  { id: 'SUB_PHY', name: 'Physics' },
  { id: 'SUB_CHE', name: 'Chemistry' },
  { id: 'SUB_BIO', name: 'Biology' },
  { id: 'SUB_HIS', name: 'History' },
  { id: 'SUB_GEO', name: 'Geography' },
  { id: 'SUB_ECO', name: 'Economics' },
  { id: 'SUB_POL', name: 'Political Science' },
];

export const BookUploadForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const uploadedFile = useAppSelector(selectUploadedFile);
  const selectedSyllabus = useAppSelector(selectSelectedSyllabus);
  const selectedStandard = useAppSelector(selectSelectedStandard);
  const selectedSubject = useAppSelector(selectSelectedSubject);
  const chapterName = useAppSelector(selectChapterName);
  const isUploading = useAppSelector(selectIsUploading);
  const uploadError = useAppSelector(selectUploadError);
  const uploadSuccess = useAppSelector(selectUploadSuccess);
  const uploadProgress = useAppSelector(selectUploadProgress);

  const isFormValid =
    uploadedFile &&
    selectedSyllabus &&
    selectedStandard &&
    selectedSubject;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      dispatch(setUploadedFile(file));
      dispatch(setUploadError(null));
    } else {
      dispatch(setUploadError('Please select a valid PDF file'));
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      dispatch(setUploadedFile(file));
      dispatch(setUploadError(null));
    } else {
      dispatch(setUploadError('Please drop a valid PDF file'));
    }
  };

  const handleRemoveFile = () => {
    dispatch(setUploadedFile(null));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!isFormValid || !uploadedFile) return;

    try {
      dispatch(setUploading(true));
      dispatch(setUploadError(null));
      dispatch(setUploadSuccess(null));

      // Step 1: Upload file to content builder
      const uploadResponse = await uploadFilesToContentBuilder(
        [uploadedFile],
        chapterName || uploadedFile.name,
        'book',
        (fileName, progress) => {
          dispatch(setUploadProgress(progress));
        }
      );

      if (!uploadResponse || uploadResponse.length === 0) {
        throw new Error('File upload failed');
      }

      const fileId = uploadResponse[0].fileId;
      dispatch(setFileId(fileId));

      // Use chapter name from input or fallback to filename
      const finalChapterName = chapterName || uploadedFile.name;

      // Step 2: Upload book metadata to backend
      await uploadBookMetadata({
        fileId,
        fileName: uploadedFile.name,
        syllabusId: selectedSyllabus.id,
        standardId: selectedStandard.id,
        subjectId: selectedSubject.id,
        chapterName: finalChapterName,
        fileSize: uploadedFile.size,
      });

      dispatch(setUploadSuccess('Book uploaded successfully!'));
      setTimeout(() => {
        dispatch(resetForm());
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      dispatch(setUploadError(errorMessage));
    } finally {
      dispatch(setUploading(false));
      dispatch(setUploadProgress(0));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <S.FormContainer>
      {/* Dropdowns Section */}
      <S.FormSection>
        <S.SectionTitle>
          <span className="material-symbols-outlined">settings</span>
          Book Details
        </S.SectionTitle>
        <S.DropdownsGrid>
          <S.DropdownWrapper>
            <S.Label>Syllabus *</S.Label>
            <Select
              options={SYLLABUSES.map((s) => ({ value: s.id, label: s.name }))}
              value={selectedSyllabus ? { value: selectedSyllabus.id, label: selectedSyllabus.name } : null}
              onChange={(option) => {
                const selected = SYLLABUSES.find((s) => s.id === option?.value);
                dispatch(setSelectedSyllabus(selected || null));
              }}
              isDisabled={isUploading}
              isClearable
              styles={customSelectStyles}
              placeholder="Select Syllabus"
            />
          </S.DropdownWrapper>

          <S.DropdownWrapper>
            <S.Label>Standard *</S.Label>
            <Select
              options={STANDARDS.map((s) => ({ value: s.id, label: s.name }))}
              value={selectedStandard ? { value: selectedStandard.id, label: selectedStandard.name } : null}
              onChange={(option) => {
                const selected = STANDARDS.find((s) => s.id === option?.value);
                dispatch(setSelectedStandard(selected || null));
              }}
              isDisabled={isUploading}
              isClearable
              styles={customSelectStyles}
              placeholder="Select Standard"
            />
          </S.DropdownWrapper>

          <S.DropdownWrapper>
            <S.Label>Subject *</S.Label>
            <Select
              options={SUBJECTS.map((s) => ({ value: s.id, label: s.name }))}
              value={selectedSubject ? { value: selectedSubject.id, label: selectedSubject.name } : null}
              onChange={(option) => {
                const selected = SUBJECTS.find((s) => s.id === option?.value);
                dispatch(setSelectedSubject(selected || null));
              }}
              isDisabled={isUploading}
              isClearable
              styles={customSelectStyles}
              placeholder="Select Subject"
            />
          </S.DropdownWrapper>

          <S.DropdownWrapper>
            <S.Label>Chapter Name (Optional)</S.Label>
            <S.TextInput
              type="text"
              placeholder="e.g., Chapter 1: Introduction (auto-filled from file if not provided)"
              value={chapterName}
              onChange={(e) => dispatch(setChapterName(e.target.value))}
              disabled={isUploading}
            />
          </S.DropdownWrapper>
        </S.DropdownsGrid>
      </S.FormSection>

      {/* File Upload Section */}
      <S.FormSection>
        <S.SectionTitle>
          <span className="material-symbols-outlined">upload_file</span>
          Upload Book
        </S.SectionTitle>

        {uploadedFile ? (
          <S.FileInfo>
            <S.FileIcon className="material-symbols-outlined">description</S.FileIcon>
            <S.FileDetails>
              <S.FileName>{uploadedFile.name}</S.FileName>
              <S.FileSize>{formatFileSize(uploadedFile.size)}</S.FileSize>
            </S.FileDetails>
            <S.RemoveButton onClick={handleRemoveFile} disabled={isUploading}>
              Remove
            </S.RemoveButton>
          </S.FileInfo>
        ) : (
          <S.UploadBox
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={isDragActive ? 'active' : ''}
          >
            <S.UploadIcon className="material-symbols-outlined">cloud_upload</S.UploadIcon>
            <S.UploadText>
              <S.UploadTitle>Drag and drop your PDF here</S.UploadTitle>
              <S.UploadSubtitle>or click to browse (Max 50MB)</S.UploadSubtitle>
            </S.UploadText>
            <S.BrowseButton onClick={(e) => e.stopPropagation()}>
              Browse Files
            </S.BrowseButton>
            <input
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              type="file"
            />
          </S.UploadBox>
        )}

        {isUploading && (
          <div>
            <S.ProgressBar>
              <S.ProgressFill progress={uploadProgress} />
            </S.ProgressBar>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}
      </S.FormSection>

      {/* Messages */}
      {uploadError && (
        <S.ErrorMessage>
          <span className="material-symbols-outlined">error</span>
          {uploadError}
        </S.ErrorMessage>
      )}

      {uploadSuccess && (
        <S.SuccessMessage>
          <span className="material-symbols-outlined">check_circle</span>
          {uploadSuccess}
        </S.SuccessMessage>
      )}

      {/* Action Buttons */}
      <S.ButtonGroup>
        <S.Button
          variant="secondary"
          onClick={() => dispatch(resetForm())}
          disabled={isUploading}
        >
          Clear
        </S.Button>
        <S.Button
          variant="primary"
          onClick={handleUpload}
          disabled={!isFormValid || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Book'}
        </S.Button>
      </S.ButtonGroup>
    </S.FormContainer>
  );
};
