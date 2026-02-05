import React from 'react';
import { useAppDispatch } from '../../../../hooks/useAppRedux';
import { setSelectedChapter } from '../../actions';
import { HierarchySelector } from '../../../adaptiveContent/components/HierarchySelector';
import {
  ContentSourceSection,
  ContentHeader,
  HeaderIcon,
  HeaderTitle,
  ScrollContent,
} from './ContentSource.styles';

export const ContentSource: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleHierarchyChange = (selection: any) => {
    // Capture the selected chapter and its details
    dispatch(
      setSelectedChapter(
        selection.chapterId,
        selection.chapterFileId,
        selection.chapterName,
        selection.subjectName,
        selection.standardId
      )
    );
  };

  return (
    <ContentSourceSection id="section-source">
      <ContentHeader>
        <HeaderIcon className="material-symbols-outlined">library_books</HeaderIcon>
        <HeaderTitle>Content Source</HeaderTitle>
      </ContentHeader>

      <ScrollContent>
        <div style={{ padding: '1rem' }}>
          <HierarchySelector onSelectionChange={handleHierarchyChange} />
        </div>
      </ScrollContent>
    </ContentSourceSection>
  );
};
