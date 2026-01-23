import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppRedux';
import { setUploadedFile, updateChapter, selectAllChapters } from '../../actions';
import { selectSelectedChapters, selectSelectedChaptersCount } from '../../selectors';
import {
  ContentSourceSection,
  ContentHeader,
  HeaderIcon,
  HeaderTitle,
  ScrollContent,
  UploadBox,
  UploadIconBox,
  UploadIcon,
  UploadText,
  UploadTitle,
  UploadSubtitle,
  BrowseButton,
  ChaptersSection,
  ChaptersHeader,
  ChaptersTitle,
  SelectAllButton,
  ChaptersList,
  ChapterLabel,
  ChapterCheckbox,
  ChapterText,
} from './ContentSource.styles';

export const ContentSource: React.FC = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedChapters = useAppSelector(selectSelectedChapters);
  const selectedChaptersCount = useAppSelector(selectSelectedChaptersCount);
  const allSelected = selectedChaptersCount === selectedChapters.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(setUploadedFile(file));
    }
  };

  const handleChapterToggle = (chapterId: string, selected: boolean) => {
    dispatch(updateChapter(chapterId, selected));
  };

  const handleSelectAll = () => {
    dispatch(selectAllChapters(!allSelected));
  };

  return (
    <ContentSourceSection id="section-source">
      <ContentHeader>
        <HeaderIcon className="material-symbols-outlined">library_books</HeaderIcon>
        <HeaderTitle>Content Source</HeaderTitle>
      </ContentHeader>

      <ScrollContent>
        <UploadBox onClick={() => fileInputRef.current?.click()}>
          <UploadIconBox>
            <UploadIcon className="material-symbols-outlined">upload_file</UploadIcon>
          </UploadIconBox>
          <UploadText>
            <UploadTitle>Upload Textbook PDF</UploadTitle>
            <UploadSubtitle>Syllabus or Book (Max 50MB)</UploadSubtitle>
          </UploadText>
          <BrowseButton onClick={(e) => e.stopPropagation()}>Browse Files</BrowseButton>
          <input
            ref={fileInputRef}
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            type="file"
          />
        </UploadBox>

        <ChaptersSection>
          <ChaptersHeader>
            <ChaptersTitle>Select Chapters</ChaptersTitle>
            <SelectAllButton onClick={handleSelectAll}>Select All</SelectAllButton>
          </ChaptersHeader>
          <ChaptersList>
            {selectedChapters.map((chapter) => (
              <ChapterLabel key={chapter.id}>
                <ChapterCheckbox
                  checked={chapter.selected}
                  onChange={(e) => handleChapterToggle(chapter.id, e.target.checked)}
                  type="checkbox"
                />
                <ChapterText>{chapter.name}</ChapterText>
              </ChapterLabel>
            ))}
          </ChaptersList>
        </ChaptersSection>
      </ScrollContent>
    </ContentSourceSection>
  );
};
