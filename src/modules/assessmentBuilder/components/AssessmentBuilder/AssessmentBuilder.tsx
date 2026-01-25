import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import assessmentBuilderSelector from '../../selectors';
import { setCurrentPage } from '../../../navbar/actions';
import {
  Container,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  ToolCardsGrid,
  ToolCard,
  ToolCardImage,
  ToolCardImageOverlay,
  ToolCardIcon,
  ToolCardContent,
  ToolCardTitle,
  ToolCardDescription,
  ToolCardButton,
  PendingBadge,
  PendingDot,
  PendingText,
  Section,
  SectionHeader,
  SectionTitle,
  ViewAllButton,
  TableContainer,
  TableWrapper,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  DocumentCell,
  DocumentIcon,
  DocumentName,
  TypeBadge,
  DateText,
  StatusBadge,
  ActionButton,
} from './AssessmentBuilder.styles';

export const AssessmentBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const recentActivity = useSelector(assessmentBuilderSelector.getRecentActivity);

  const handleUploadGenerate = () => {
    dispatch(setCurrentPage('assessment-configurator') as any);
  };

  const handleRemedialLab = () => {
    dispatch(setCurrentPage('remedial-lab') as any);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'check_circle';
      case 'Draft':
        return 'history_edu';
      case 'In Progress':
        return 'pending';
      default:
        return 'check_circle';
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Welcome back, Prof. Sharma</Title>
          <Subtitle>Manage your Test Series assessments and classroom resources.</Subtitle>
        </HeaderContent>
      </Header>

      <ToolCardsGrid>
        <ToolCard>
          <ToolCardImage>
            <ToolCardImageOverlay />
            <ToolCardIcon className="material-symbols-outlined">upload_file</ToolCardIcon>
          </ToolCardImage>
          <ToolCardContent>
            <ToolCardTitle>Create Question Paper</ToolCardTitle>
            <ToolCardDescription>
              Upload a textbook PDF or notes. AI will generate multi-level assessments instantly.
            </ToolCardDescription>
          </ToolCardContent>
          <ToolCardButton onClick={handleUploadGenerate}>Upload & Generate</ToolCardButton>
        </ToolCard>

        <ToolCard>
          <ToolCardImage>
            <ToolCardImageOverlay />
            <ToolCardIcon className="material-symbols-outlined">auto_awesome</ToolCardIcon>
          </ToolCardImage>
          <ToolCardContent>
            <ToolCardTitle>Adaptive Revision Kit</ToolCardTitle>
            <ToolCardDescription>
              Generate smart summaries, digital flashcards, and reinforcement quizzes to boost
              retention.
            </ToolCardDescription>
          </ToolCardContent>
          <ToolCardButton>Build Kit</ToolCardButton>
        </ToolCard>

        <ToolCard>
          <ToolCardImage>
            <ToolCardImageOverlay />
            <PendingBadge>
              <PendingDot />
              <PendingText>5 Students Pending</PendingText>
            </PendingBadge>
          </ToolCardImage>
          <ToolCardContent>
            <ToolCardTitle>Remedial Lab</ToolCardTitle>
            <ToolCardDescription>
              Automated remedial tasks based on student performance in recent tests.
            </ToolCardDescription>
          </ToolCardContent>
          <ToolCardButton onClick={handleRemedialLab}>Review Progress</ToolCardButton>
        </ToolCard>
      </ToolCardsGrid>

      <Section>
        <SectionHeader>
          <SectionTitle>Recent Activity</SectionTitle>
          <ViewAllButton>View All Files</ViewAllButton>
        </SectionHeader>
        <TableContainer>
          <TableWrapper>
            <Table>
              <TableHead>
                <tr>
                  <TableHeaderCell sticky="left">Document Name</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Date Created</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell sticky="right">Action</TableHeaderCell>
                </tr>
              </TableHead>
              <TableBody>
                {recentActivity.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sticky="left">
                      <DocumentCell>
                        <DocumentIcon className="material-symbols-outlined">
                          {item.icon}
                        </DocumentIcon>
                        <DocumentName>{item.documentName}</DocumentName>
                      </DocumentCell>
                    </TableCell>
                    <TableCell>
                      <TypeBadge>{item.type}</TypeBadge>
                    </TableCell>
                    <TableCell>
                      <DateText>{item.dateCreated}</DateText>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.status}>
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '0.875rem' }}
                        >
                          {getStatusIcon(item.status)}
                        </span>
                        {item.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell sticky="right">
                      <ActionButton>
                        <span className="material-symbols-outlined">edit</span>
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </TableContainer>
      </Section>
    </Container>
  );
};
