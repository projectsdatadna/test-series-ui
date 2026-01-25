import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import remedialLabSelector from '../../selectors';
import { remedialLabSetSelectedStudent, remedialLabSetActiveTab } from '../../actions';
import type { StudentConceptGap, RemedialLabState } from '../../types';
import {
  Container,
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  SidebarSubtitle,
  ConceptGapsList,
  ConceptGapCard,
  ConceptGapHeader,
  StudentInfo,
  StudentName,
  GapLabel,
  PriorityBadge,
  ProgressSection,
  ProgressHeader,
  ProgressLabel,
  ProgressValue,
  ProgressTrack,
  ProgressFill,
  MainContent,
  ContentHeader,
  ContentHeaderInner,
  ContentHeaderTop,
  ContentHeaderInfo,
  ContentBadgeRow,
  ContentBadge,
  MatchBadge,
  ContentTitle,
  AssignButton,
  TabsContainer,
  Tab,
  ContentBody,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  ExplanationCard,
  ExplanationText,
  HighlightedText,
  UnderlinedText,
  VisualsGrid,
  VisualCard,
  VisualIcon,
  VisualLabel,
  StepsGrid,
  StepCard,
  StepNumber,
  StepContent,
  StepTitle,
  StepDescription,
  WorksheetCard,
  WorksheetHeader,
  WorksheetHeaderLeft,
  WorksheetIcon,
  WorksheetTitle,
  WorksheetDots,
  WorksheetDot,
  WorksheetBody,
  WorksheetInstruction,
  WorksheetGrid,
  WorksheetColumn,
  DraggableItem,
  DropTarget,
  DropTargetValue,
  DropTargetCircle,
  PuzzleCard,
  PuzzleOverlay,
  PuzzleContent,
  PuzzleIconWrapper,
  PuzzleIcon,
  PuzzleTitle,
  PuzzleDescription,
  PuzzleGridPreview,
  PuzzleCell,
  PuzzleButton,
  DownloadButton,
} from './RemedialLab.styles';

const tabs: { id: RemedialLabState['activeTab']; label: string; icon: string }[] = [
  { id: 'explanation', label: 'Simplified Explanation', icon: 'menu_book' },
  { id: 'steps', label: 'Step-by-Step', icon: 'format_list_numbered' },
  { id: 'quiz', label: 'Targeted Quiz', icon: 'quiz' },
  { id: 'worksheet', label: 'Interactive Worksheet', icon: 'description' },
  { id: 'puzzle', label: 'Educational Puzzle', icon: 'extension' },
];

const steps = [
  {
    number: 1,
    title: 'Identify the Whole',
    description: 'Look at the total number of parts in the diagram. This becomes your denominator.',
  },
  {
    number: 2,
    title: 'Count the Shaded Parts',
    description: 'Count only the parts that are colored in. This is your numerator.',
  },
  {
    number: 3,
    title: 'Combine the Fraction',
    description: 'Place the shaded count over the total parts. Example: 3 over 4 (3/4).',
  },
];

export const RemedialLab: React.FC = () => {
  const dispatch = useDispatch();
  const conceptGaps = useSelector(remedialLabSelector.getConceptGaps);
  const selectedStudent = useSelector(remedialLabSelector.getSelectedStudent);
  const activeTab = useSelector(remedialLabSelector.getActiveTab);

  const handleStudentSelect = (student: StudentConceptGap) => {
    dispatch(remedialLabSetSelectedStudent(student) as any);
  };

  const handleTabChange = (tab: RemedialLabState['activeTab']) => {
    dispatch(remedialLabSetActiveTab(tab) as any);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'High Priority':
        return 'High Priority';
      case 'In Progress':
        return 'In Progress';
      case 'Completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>Concept Gaps</SidebarTitle>
          <SidebarSubtitle>AI-identified interventions</SidebarSubtitle>
        </SidebarHeader>
        <ConceptGapsList>
          {conceptGaps.map((gap) => (
            <ConceptGapCard
              key={gap.id}
              isSelected={selectedStudent?.id === gap.id}
              onClick={() => handleStudentSelect(gap)}
            >
              <ConceptGapHeader>
                <StudentInfo>
                  <StudentName>{gap.studentName}</StudentName>
                  <GapLabel>Gap: {gap.gap}</GapLabel>
                </StudentInfo>
                <PriorityBadge priority={gap.priority}>{getStatusText(gap.status)}</PriorityBadge>
              </ConceptGapHeader>
              <ProgressSection>
                <ProgressHeader>
                  <ProgressLabel>Recovery Status</ProgressLabel>
                  <ProgressValue>{gap.recoveryProgress}%</ProgressValue>
                </ProgressHeader>
                <ProgressTrack>
                  <ProgressFill percentage={gap.recoveryProgress} />
                </ProgressTrack>
              </ProgressSection>
            </ConceptGapCard>
          ))}
        </ConceptGapsList>
      </Sidebar>

      <MainContent>
        <ContentHeader>
          <ContentHeaderInner>
            <ContentHeaderTop>
              <ContentHeaderInfo>
                <ContentBadgeRow>
                  <ContentBadge>Smart Remedial Learning Lab</ContentBadge>
                  <MatchBadge>
                    <span className="material-symbols-outlined" style={{ fontSize: '0.625rem' }}>
                      verified
                    </span>
                    {selectedStudent?.matchScore || 98}% Match
                  </MatchBadge>
                </ContentBadgeRow>
                <ContentTitle>
                  {selectedStudent?.studentName || 'Select a Student'}: Mastering{' '}
                  {selectedStudent?.gap || 'Concept'}
                </ContentTitle>
              </ContentHeaderInfo>
              <AssignButton>
                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>
                  send
                </span>
                Assign to Student
              </AssignButton>
            </ContentHeaderTop>
            <TabsContainer>
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  isActive={activeTab === tab.id}
                  onClick={() => handleTabChange(tab.id)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </Tab>
              ))}
            </TabsContainer>
          </ContentHeaderInner>
        </ContentHeader>

        <ContentBody>
          <SectionContainer>
            <SectionHeader>
              <SectionTitle>
                <span className="material-symbols-outlined" style={{ color: '#607afb' }}>
                  menu_book
                </span>
                Simplified Explanation
              </SectionTitle>
            </SectionHeader>
            <ExplanationCard>
              <ExplanationText>
                Think of a <HighlightedText>Fraction</HighlightedText> like a pizza party. The{' '}
                <UnderlinedText>Denominator</UnderlinedText> (bottom number) tells us how many total
                slices the pizza is cut into. The <UnderlinedText>Numerator</UnderlinedText> (top
                number) tells us how many slices you actually have on your plate.
              </ExplanationText>
              <VisualsGrid>
                <VisualCard>
                  <VisualIcon className="material-symbols-outlined">pie_chart</VisualIcon>
                  <VisualLabel>Visual 1/4</VisualLabel>
                </VisualCard>
                <VisualCard>
                  <VisualIcon className="material-symbols-outlined">pie_chart_outline</VisualIcon>
                  <VisualLabel>Visual 2/4</VisualLabel>
                </VisualCard>
                <VisualCard>
                  <VisualIcon className="material-symbols-outlined">donut_large</VisualIcon>
                  <VisualLabel>Visual 3/4</VisualLabel>
                </VisualCard>
              </VisualsGrid>
            </ExplanationCard>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>
              <span className="material-symbols-outlined" style={{ color: '#607afb' }}>
                format_list_numbered
              </span>
              Step-by-Step Walkthrough
            </SectionTitle>
            <StepsGrid>
              {steps.map((step) => (
                <StepCard key={step.number}>
                  <StepNumber>{step.number}</StepNumber>
                  <StepContent>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </StepContent>
                </StepCard>
              ))}
            </StepsGrid>
          </SectionContainer>

          <SectionContainer>
            <SectionHeader>
              <SectionTitle>
                <span className="material-symbols-outlined" style={{ color: '#607afb' }}>
                  description
                </span>
                Interactive Worksheet
              </SectionTitle>
              <DownloadButton>
                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>
                  download
                </span>
                Download PDF
              </DownloadButton>
            </SectionHeader>
            <WorksheetCard>
              <WorksheetHeader>
                <WorksheetHeaderLeft>
                  <WorksheetIcon className="material-symbols-outlined">grid_on</WorksheetIcon>
                  <WorksheetTitle>Interactive Preview: Matching Exercise</WorksheetTitle>
                </WorksheetHeaderLeft>
                <WorksheetDots>
                  <WorksheetDot color="red" />
                  <WorksheetDot color="yellow" />
                  <WorksheetDot color="green" />
                </WorksheetDots>
              </WorksheetHeader>
              <WorksheetBody>
                <WorksheetInstruction>
                  Drag items from left to match the fractions on the right
                </WorksheetInstruction>
                <WorksheetGrid>
                  <WorksheetColumn>
                    <DraggableItem>[3/4 Circle Diagram]</DraggableItem>
                    <DraggableItem>[1/2 Bar Chart]</DraggableItem>
                    <DraggableItem>[5/8 Grid]</DraggableItem>
                  </WorksheetColumn>
                  <WorksheetColumn>
                    <DropTarget>
                      <DropTargetValue>0.50</DropTargetValue>
                      <DropTargetCircle />
                    </DropTarget>
                    <DropTarget>
                      <DropTargetValue>0.75</DropTargetValue>
                      <DropTargetCircle />
                    </DropTarget>
                    <DropTarget>
                      <DropTargetValue>0.625</DropTargetValue>
                      <DropTargetCircle />
                    </DropTarget>
                  </WorksheetColumn>
                </WorksheetGrid>
              </WorksheetBody>
            </WorksheetCard>
          </SectionContainer>

          <SectionContainer style={{ paddingBottom: '5rem' }}>
            <SectionTitle>
              <span className="material-symbols-outlined" style={{ color: '#607afb' }}>
                extension
              </span>
              Educational Puzzle
            </SectionTitle>
            <PuzzleCard>
              <PuzzleOverlay />
              <PuzzleContent>
                <PuzzleIconWrapper>
                  <PuzzleIcon className="material-symbols-outlined">apps</PuzzleIcon>
                </PuzzleIconWrapper>
                <div>
                  <PuzzleTitle>The Fraction Grid Challenge</PuzzleTitle>
                  <PuzzleDescription>
                    Fill the missing denominators to complete the crossword and unlock the reward.
                  </PuzzleDescription>
                </div>
                <PuzzleGridPreview>
                  <PuzzleCell variant="filled">1</PuzzleCell>
                  <PuzzleCell variant="question">?</PuzzleCell>
                  <PuzzleCell variant="filled">4</PuzzleCell>
                  <PuzzleCell variant="empty" />
                  <PuzzleCell variant="empty" />
                  <PuzzleCell variant="filled">2</PuzzleCell>
                  <PuzzleCell variant="empty" />
                  <PuzzleCell variant="filled">8</PuzzleCell>
                </PuzzleGridPreview>
                <PuzzleButton>Play Mini-Game</PuzzleButton>
              </PuzzleContent>
            </PuzzleCard>
          </SectionContainer>
        </ContentBody>
      </MainContent>
    </Container>
  );
};
