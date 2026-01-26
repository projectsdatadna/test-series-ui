import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import adaptiveContentSelector from '../../selectors';
import { setCurrentPage } from '../../../navbar/actions';
import {
  Container,
  Header,
  Title,
  Subtitle,
  ContentGrid,
  ContentCard,
  CardImageContainer,
  CardIcon,
  CardContent,
  CardTextContent,
  CardTitle,
  CardDescription,
  CardActions,
  PrimaryButton,
  SecondaryButton,
  AddNewCard,
  AddNewIconWrapper,
  AddNewIcon,
  AddNewText,
  StatsFooter,
  StatItem,
  StatIconWrapper,
  StatContent,
  StatLabel,
  StatValue,
  StatDivider,
  ViewReportButton,
} from './AdaptiveContent.styles';

export const AdaptiveContent: React.FC = () => {
  const dispatch = useDispatch();
  const contentTypes = useSelector(adaptiveContentSelector.getContentTypes);
  const aiCredits = useSelector(adaptiveContentSelector.getAICredits);
  const recentlyGenerated = useSelector(adaptiveContentSelector.getRecentlyGenerated);

  const handleAIGenerate = () => {
    dispatch(setCurrentPage('content-builder') as any);
  };

  return (
    <Container>
      <Header>
        <Title>Adaptive Content Selector</Title>
        <Subtitle>
          Choose teaching aids to support diverse learners and enhance understanding through
          targeted supplemental materials.
        </Subtitle>
      </Header>

      <ContentGrid>
        {contentTypes.map((contentType) => (
          <ContentCard key={contentType.id}>
            <CardImageContainer bgColor={contentType.bgColor}>
              <CardIcon className="material-symbols-outlined" color={contentType.iconColor}>
                {contentType.icon}
              </CardIcon>
            </CardImageContainer>
            <CardContent>
              <CardTextContent>
                <CardTitle>{contentType.name}</CardTitle>
                <CardDescription>{contentType.description}</CardDescription>
              </CardTextContent>
              <CardActions>
                <PrimaryButton onClick={handleAIGenerate}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                    auto_awesome
                  </span>
                  AI Generate
                </PrimaryButton>
                <SecondaryButton>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                    library_books
                  </span>
                  View Library
                </SecondaryButton>
              </CardActions>
            </CardContent>
          </ContentCard>
        ))}

        <AddNewCard>
          <AddNewIconWrapper>
            <AddNewIcon className="material-symbols-outlined">add_circle</AddNewIcon>
          </AddNewIconWrapper>
          <AddNewText>Add Custom Aid Type</AddNewText>
        </AddNewCard>
      </ContentGrid>

      <StatsFooter>
        <StatItem>
          <StatIconWrapper bgColor="#dbeafe" textColor="#2463eb">
            <span className="material-symbols-outlined">bolt</span>
          </StatIconWrapper>
          <StatContent>
            <StatLabel>AI Generation Credits</StatLabel>
            <StatValue>{aiCredits} Remaining</StatValue>
          </StatContent>
        </StatItem>
        <StatDivider />
        <StatItem>
          <StatIconWrapper bgColor="#dcfce7" textColor="#16a34a">
            <span className="material-symbols-outlined">history</span>
          </StatIconWrapper>
          <StatContent>
            <StatLabel>Recently Generated</StatLabel>
            <StatValue>{recentlyGenerated} Aids this week</StatValue>
          </StatContent>
        </StatItem>
        <ViewReportButton>View Usage Report</ViewReportButton>
      </StatsFooter>
    </Container>
  );
};
