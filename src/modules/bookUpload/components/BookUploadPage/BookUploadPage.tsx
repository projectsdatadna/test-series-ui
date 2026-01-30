import React from 'react';
import { BookUploadForm } from '../BookUploadForm';
import * as S from './BookUploadPage.styles';

export const BookUploadPage: React.FC = () => {
  return (
    <S.PageContainer>
      <div>
        <S.Header>
          <S.HeaderIcon className="material-symbols-outlined">upload_file</S.HeaderIcon>
          <div>
            <S.Title>Upload Books</S.Title>
            <S.Subtitle>Upload textbooks and educational materials to the system</S.Subtitle>
          </div>
        </S.Header>
      </div>

      <S.ContentWrapper>
        <BookUploadForm />
      </S.ContentWrapper>
    </S.PageContainer>
  );
};
