import React from 'react';
import {
  Container,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  PointsBadge,
  MetricsGrid,
  MetricCard,
  MetricHeader,
  MetricLabel,
  MetricBadge,
  MetricIcon,
  MetricValue,
  MetricChart,
  ChartBar,
  ContentGrid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  PathItem,
  PathIcon,
  PathContent,
  PathTitle,
  PathMatch,
  PathDescription,
  PathButton,
  PerformanceGrid,
  PerformanceSection,
  PerformanceSectionTitle,
  PerformanceTrend,
  ChartContainer,
  PerformanceLabel,
  PerformanceValue,
  ResumeCard,
  ResumeLabel,
  ResumeTitle,
  ResumeDescription,
  ResumeButton,
  GoalItem,
  GoalLabel,
  GoalLabelText,
  GoalLabelValue,
  GoalTrack,
  GoalFill,
  StudyGroupItem,
  StudyGroupIcon,
  StudyGroupContent,
  StudyGroupTitle,
  StudyGroupInfo,
} from './StudentDashboard.styles';

export const StudentDashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Welcome back, Alex!</Title>
          <Subtitle>Ready to continue your learning journey today?</Subtitle>
        </HeaderContent>
        <PointsBadge>
          <span>Points: 2,450 XP</span>
        </PointsBadge>
      </Header>

      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <MetricLabel>Overall Grade</MetricLabel>
            <MetricBadge variant="primary">Top 5%</MetricBadge>
          </MetricHeader>
          <MetricIcon bgColor="#dbeafe" textColor="#4f6ef7">
            <span className="material-symbols-outlined">grade</span>
          </MetricIcon>
          <MetricValue>A-</MetricValue>
          <MetricChart>
            <ChartBar height={88} color="#4f6ef7" />
          </MetricChart>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Study Points (XP)</MetricLabel>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7' }}>+150 today</span>
          </MetricHeader>
          <MetricIcon bgColor="#f3e8ff" textColor="#a855f7">
            <span className="material-symbols-outlined">stars</span>
          </MetricIcon>
          <MetricValue>12,850</MetricValue>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '9999px', border: '2px solid white', backgroundColor: '#d1d5db' }} />
            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '9999px', border: '2px solid white', backgroundColor: '#d1d5db', marginLeft: '-0.5rem' }} />
            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '9999px', border: '2px solid white', backgroundColor: '#d1d5db', marginLeft: '-0.5rem' }} />
            <span style={{ marginLeft: '1rem', fontSize: '0.625rem', color: '#60688a' }}>Leveled up!</span>
          </div>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Current Streak</MetricLabel>
            <MetricBadge variant="warning">New Record!</MetricBadge>
          </MetricHeader>
          <MetricIcon bgColor="#fed7aa" textColor="#ea580c">
            <span className="material-symbols-outlined">local_fire_department</span>
          </MetricIcon>
          <MetricValue>🔥 12 Days</MetricValue>
          <MetricChart>
            <ChartBar height={100} color="#ea580c" />
            <ChartBar height={100} color="#ea580c" />
            <ChartBar height={100} color="#ea580c" />
            <ChartBar height={50} color="#fed7aa" />
            <ChartBar height={50} color="#fed7aa" />
          </MetricChart>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Upcoming Tests</MetricLabel>
            <MetricBadge variant="danger">2 days left</MetricBadge>
          </MetricHeader>
          <MetricIcon bgColor="#fee2e2" textColor="#dc2626">
            <span className="material-symbols-outlined">timer</span>
          </MetricIcon>
          <MetricValue>2</MetricValue>
          <div style={{ marginTop: '1rem', fontSize: '0.625rem', color: '#60688a' }}>
            Next: Physics (Nov 02)
          </div>
        </MetricCard>
      </MetricsGrid>

      <ContentGrid>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="material-symbols-outlined">auto_fix_high</span>
                AI Recommended Path
              </CardTitle>
              <button style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f6ef7', border: 'none', background: 'none', cursor: 'pointer' }}>
                Customize Path
              </button>
            </CardHeader>
            <CardContent>
              <PathItem className="highlighted">
                <PathIcon>
                  <span className="material-symbols-outlined">neurology</span>
                </PathIcon>
                <PathContent>
                  <PathTitle>
                    Master Neural Networks
                    <PathMatch>95% Match</PathMatch>
                  </PathTitle>
                  <PathDescription>AI recommends focusing on Backpropagation concepts based on your recent errors.</PathDescription>
                </PathContent>
                <PathButton>Start Revision</PathButton>
              </PathItem>

              <PathItem>
                <PathIcon>
                  <span className="material-symbols-outlined">biotech</span>
                </PathIcon>
                <PathContent>
                  <PathTitle>
                    Cellular Respiration Recap
                    <PathMatch style={{ backgroundColor: '#dbeafe', color: '#4f6ef7' }}>88% Match</PathMatch>
                  </PathTitle>
                  <PathDescription>Boost your Biology score by reviewing the Krebs Cycle summary.</PathDescription>
                </PathContent>
                <PathButton>Queue Up</PathButton>
              </PathItem>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceGrid>
                <PerformanceSection>
                  <PerformanceSectionTitle>
                    Accuracy Trend
                    <PerformanceTrend isPositive={true}>+5.2%</PerformanceTrend>
                  </PerformanceSectionTitle>
                  <ChartContainer>
                    <ChartBar height={40} color="#4f6ef7" />
                    <ChartBar height={55} color="#4f6ef7" />
                    <ChartBar height={45} color="#4f6ef7" />
                    <ChartBar height={70} color="#4f6ef7" />
                    <ChartBar height={60} color="#4f6ef7" />
                    <ChartBar height={85} color="#4f6ef7" />
                    <ChartBar height={90} color="#4f6ef7" />
                  </ChartContainer>
                  <PerformanceLabel>
                    Avg. Accuracy: <PerformanceValue>84%</PerformanceValue>
                  </PerformanceLabel>
                </PerformanceSection>

                <PerformanceSection>
                  <PerformanceSectionTitle>
                    Speed Trend
                    <PerformanceTrend isPositive={true}>-12s / q</PerformanceTrend>
                  </PerformanceSectionTitle>
                  <ChartContainer>
                    <ChartBar height={80} color="#3b82f6" />
                    <ChartBar height={75} color="#3b82f6" />
                    <ChartBar height={70} color="#3b82f6" />
                    <ChartBar height={65} color="#3b82f6" />
                    <ChartBar height={55} color="#3b82f6" />
                    <ChartBar height={50} color="#3b82f6" />
                    <ChartBar height={45} color="#3b82f6" />
                  </ChartContainer>
                  <PerformanceLabel>
                    Avg. Speed: <PerformanceValue>42s/question</PerformanceValue>
                  </PerformanceLabel>
                </PerformanceSection>
              </PerformanceGrid>
            </CardContent>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ResumeCard>
            <ResumeLabel>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>play_circle</span>
              Quick Resume
            </ResumeLabel>
            <ResumeTitle>Advanced Algebra</ResumeTitle>
            <ResumeDescription>Module 4: Quadratic Equations</ResumeDescription>
            <ResumeButton>Jump Back In</ResumeButton>
          </ResumeCard>

          <Card>
            <CardHeader>
              <CardTitle>Daily Goals</CardTitle>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f6ef7' }}>72% Done</span>
            </CardHeader>
            <CardContent>
              <GoalItem>
                <GoalLabel>
                  <GoalLabelText>Practice Questions</GoalLabelText>
                  <GoalLabelValue>42/50</GoalLabelValue>
                </GoalLabel>
                <GoalTrack>
                  <GoalFill percentage={84} />
                </GoalTrack>
              </GoalItem>

              <GoalItem>
                <GoalLabel>
                  <GoalLabelText>Mock Tests</GoalLabelText>
                  <GoalLabelValue>1/2 done</GoalLabelValue>
                </GoalLabel>
                <GoalTrack>
                  <GoalFill percentage={50} />
                </GoalTrack>
              </GoalItem>

              <GoalItem>
                <GoalLabel>
                  <GoalLabelText>Daily Streak Log</GoalLabelText>
                  <GoalLabelValue>Completed</GoalLabelValue>
                </GoalLabel>
                <GoalTrack>
                  <GoalFill percentage={100} color="#10b981" />
                </GoalTrack>
              </GoalItem>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
                <p style={{ fontSize: '0.625rem', color: '#60688a', margin: 0 }}>
                  Complete 2 more goals to earn 50 Bonus XP
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <StudyGroupItem>
                <StudyGroupIcon bgColor="#fed7aa" textColor="#ea580c">
                  <span className="material-symbols-outlined">calculate</span>
                </StudyGroupIcon>
                <StudyGroupContent>
                  <StudyGroupTitle>Math Olympiad Prep</StudyGroupTitle>
                  <StudyGroupInfo>12 members active</StudyGroupInfo>
                </StudyGroupContent>
              </StudyGroupItem>

              <StudyGroupItem>
                <StudyGroupIcon bgColor="#dbeafe" textColor="#4f6ef7">
                  <span className="material-symbols-outlined">science</span>
                </StudyGroupIcon>
                <StudyGroupContent>
                  <StudyGroupTitle>Physics Study Circle</StudyGroupTitle>
                  <StudyGroupInfo>5 new messages</StudyGroupInfo>
                </StudyGroupContent>
              </StudyGroupItem>
            </CardContent>
          </Card>
        </div>
      </ContentGrid>
    </Container>
  );
};
