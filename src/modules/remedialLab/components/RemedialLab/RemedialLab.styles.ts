import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 4rem);
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 380px;
  border-right: 1px solid #e2e8f0;
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    max-height: 400px;
  }
`;

export const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
`;

export const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.25rem 0;
`;

export const SidebarSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

export const ConceptGapsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ConceptGapCard = styled.div<{ isSelected: boolean }>`
  padding: 1rem;
  border-radius: 0.75rem;
  border: ${(props) => (props.isSelected ? '2px solid #607afb' : '1px solid #f1f5f9')};
  background-color: ${(props) => (props.isSelected ? 'rgba(96, 122, 251, 0.05)' : 'white')};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${(props) => (props.isSelected ? '0 1px 2px rgba(96, 122, 251, 0.05)' : 'none')};

  &:hover {
    border-color: ${(props) => (props.isSelected ? '#607afb' : 'rgba(96, 122, 251, 0.4)')};
  }
`;

export const ConceptGapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

export const StudentInfo = styled.div``;

export const StudentName = styled.h3`
  font-weight: 700;
  font-size: 0.875rem;
  color: #0f172a;
  margin: 0;
`;

export const GapLabel = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
`;

export const PriorityBadge = styled.span<{ priority: 'High' | 'Medium' | 'Low' }>`
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: ${(props) => {
    switch (props.priority) {
      case 'High':
        return '#607afb';
      case 'Medium':
        return '#dbeafe';
      case 'Low':
        return '#f1f5f9';
      default:
        return '#f1f5f9';
    }
  }};
  color: ${(props) => {
    switch (props.priority) {
      case 'High':
        return 'white';
      case 'Medium':
        return '#1d4ed8';
      case 'Low':
        return '#64748b';
      default:
        return '#64748b';
    }
  }};
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  font-weight: 700;
`;

export const ProgressLabel = styled.span`
  color: #64748b;
`;

export const ProgressValue = styled.span`
  color: #607afb;
  font-weight: 700;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 0.375rem;
  background-color: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background-color: #607afb;
`;

export const MainContent = styled.section`
  flex: 1;
  overflow-y: auto;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
`;

export const ContentHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e2e8f0;
`;

export const ContentHeaderInner = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

export const ContentHeaderTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const ContentHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const ContentBadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ContentBadge = styled.span`
  background-color: rgba(96, 122, 251, 0.1);
  color: #607afb;
  font-size: 0.625rem;
  font-weight: 800;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(96, 122, 251, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const MatchBadge = styled.span`
  color: #94a3b8;
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const ContentTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #0f172a;
  margin: 0;

  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`;

export const AssignButton = styled.button`
  background-color: #607afb;
  color: white;
  font-weight: 700;
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 10px 15px -3px rgba(96, 122, 251, 0.25);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(96, 122, 251, 0.4);
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  overflow-x: auto;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: -1rem;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Tab = styled.button<{ isActive: boolean }>`
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  border-bottom: 2px solid ${(props) => (props.isActive ? '#607afb' : 'transparent')};
  color: ${(props) => (props.isActive ? '#607afb' : '#64748b')};
  font-size: 0.875rem;
  font-weight: ${(props) => (props.isActive ? '700' : '600')};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => (props.isActive ? '#607afb' : '#475569')};
  }
`;

export const ContentBody = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0f172a;
  margin: 0;
`;

export const ExplanationCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const ExplanationText = styled.p`
  color: #475569;
  line-height: 1.75;
  margin-bottom: 2rem;
  font-size: 1.125rem;
`;

export const HighlightedText = styled.span`
  color: #607afb;
  font-weight: 800;
`;

export const UnderlinedText = styled.strong`
  color: #0f172a;
  text-decoration: underline;
  text-decoration-color: rgba(96, 122, 251, 0.3);
`;

export const VisualsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const VisualCard = styled.div`
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e2e8f0;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(96, 122, 251, 0.4);
  }
`;

export const VisualIcon = styled.span`
  color: #cbd5e1;
  font-size: 3rem;
  margin-bottom: 0.75rem;
  transition: color 0.2s;

  ${VisualCard}:hover & {
    color: #607afb;
  }
`;

export const VisualLabel = styled.span`
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const StepsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StepCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const StepNumber = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: rgba(96, 122, 251, 0.1);
  color: #607afb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  flex-shrink: 0;
  font-size: 1.25rem;
  border: 1px solid rgba(96, 122, 251, 0.2);
`;

export const StepContent = styled.div``;

export const StepTitle = styled.h4`
  font-weight: 700;
  font-size: 1.125rem;
  margin: 0 0 0.25rem 0;
  color: #0f172a;
`;

export const StepDescription = styled.p`
  color: #64748b;
  margin: 0;
`;

export const WorksheetCard = styled.div`
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const WorksheetHeader = styled.div`
  background-color: #f1f5f9;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
`;

export const WorksheetHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const WorksheetIcon = styled.span`
  color: #64748b;
`;

export const WorksheetTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const WorksheetDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const WorksheetDot = styled.div<{ color: 'red' | 'yellow' | 'green' }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: ${(props) => {
    switch (props.color) {
      case 'red':
        return '#f87171';
      case 'yellow':
        return '#facc15';
      case 'green':
        return '#4ade80';
      default:
        return '#cbd5e1';
    }
  }};
`;

export const WorksheetBody = styled.div`
  padding: 2rem;
  background-color: white;
`;

export const WorksheetInstruction = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const WorksheetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
`;

export const WorksheetColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DraggableItem = styled.div`
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  border: 2px dashed #607afb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  font-weight: 700;
  color: #475569;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const DropTarget = styled.div`
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

export const DropTargetValue = styled.span`
  font-size: 1.125rem;
  font-weight: 900;
  color: #0f172a;
`;

export const DropTargetCircle = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  border: 2px solid #e2e8f0;
`;

export const PuzzleCard = styled.div`
  background-color: #0f172a;
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const PuzzleOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba(96, 122, 251, 0.2), rgba(168, 85, 247, 0.2));
  opacity: 0.5;
`;

export const PuzzleContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PuzzleIconWrapper = styled.div`
  margin: 0 auto;
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const PuzzleIcon = styled.span`
  font-size: 2.5rem;
`;

export const PuzzleTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
`;

export const PuzzleDescription = styled.p`
  color: #94a3b8;
  max-width: 28rem;
  margin: 0 auto;
`;

export const PuzzleGridPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  max-width: 15rem;
  margin: 0 auto;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const PuzzleCell = styled.div<{ variant: 'filled' | 'question' | 'empty' }>`
  aspect-ratio: 1;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background-color: ${(props) => {
    switch (props.variant) {
      case 'filled':
        return 'rgba(255, 255, 255, 0.1)';
      case 'question':
        return 'rgba(96, 122, 251, 0.4)';
      case 'empty':
        return 'rgba(255, 255, 255, 0.05)';
      default:
        return 'rgba(255, 255, 255, 0.05)';
    }
  }};
  border: ${(props) => (props.variant !== 'empty' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none')};
`;

export const PuzzleButton = styled.button`
  background-color: white;
  color: #0f172a;
  font-weight: 900;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 10px 15px -3px rgba(255, 255, 255, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;

export const DownloadButton = styled.button`
  color: #607afb;
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
