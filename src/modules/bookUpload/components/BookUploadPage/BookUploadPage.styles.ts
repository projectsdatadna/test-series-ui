import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const HeaderIcon = styled.span`
  font-size: 32px;
  color: #0066cc;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0;
`;

export const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;
