import React from 'react';
import {
  Container,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  DateRange,
  MetricsGrid,
  MetricCard,
  MetricHeader,
  MetricLabel,
  MetricTrend,
  MetricIcon,
  MetricValue,
  MetricChart,
  ChartBar,
  ContentGrid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  RecommendationItem,
  RecommendationAvatar,
  RecommendationContent,
  RecommendationTitle,
  RecommendationDescription,
  RecommendationButton,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityTitle,
  ActivityTime,
  QuickActionButton,
  GoalItem,
  GoalLabel,
  GoalLabelText,
  GoalLabelValue,
  GoalTrack,
  GoalFill,
  HighlightCard,
  HighlightTitle,
  HighlightDescription,
  HighlightButton,
} from './TeacherDashboard.styles';

export const TeacherDashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Welcome back, Dr. Wilson</Title>
          <Subtitle>Here's what's happening with your classes today.</Subtitle>
        </HeaderContent>
        <DateRange>Oct 24, 2023 - Oct 31, 2023</DateRange>
      </Header>

      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <MetricLabel>Total Students</MetricLabel>
            <MetricTrend isPositive={true}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_up</span>
              +12%
            </MetricTrend>
          </MetricHeader>
          <MetricIcon bgColor="#dbeafe" textColor="#4f6ef7">
            <span className="material-symbols-outlined">groups</span>
          </MetricIcon>
          <MetricValue>1,284</MetricValue>
          <MetricChart>
            <ChartBar height={50} color="#4f6ef7" />
            <ChartBar height={75} color="#4f6ef7" />
            <ChartBar height={50} color="#4f6ef7" />
            <ChartBar height={65} color="#4f6ef7" />
            <ChartBar height={100} color="#4f6ef7" />
          </MetricChart>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Active Assessments</MetricLabel>
            <MetricTrend isPositive={true}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_up</span>
              +4
            </MetricTrend>
          </MetricHeader>
          <MetricIcon bgColor="#f3e8ff" textColor="#a855f7">
            <span className="material-symbols-outlined">assignment</span>
          </MetricIcon>
          <MetricValue>24</MetricValue>
          <MetricChart>
            <ChartBar height={33} color="#a855f7" />
            <ChartBar height={50} color="#a855f7" />
            <ChartBar height={65} color="#a855f7" />
            <ChartBar height={75} color="#a855f7" />
            <ChartBar height={100} color="#a855f7" />
          </MetricChart>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Avg. Performance (%)</MetricLabel>
            <MetricTrend isPositive={false}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_down</span>
              -2%
            </MetricTrend>
          </MetricHeader>
          <MetricIcon bgColor="#dcfce7" textColor="#16a34a">
            <span className="material-symbols-outlined">insights</span>
          </MetricIcon>
          <MetricValue>78.4%</MetricValue>
          <MetricChart>
            <ChartBar height={100} color="#16a34a" />
            <ChartBar height={75} color="#86efac" />
            <ChartBar height={65} color="#86efac" />
            <ChartBar height={50} color="#86efac" />
            <ChartBar height={65} color="#86efac" />
          </MetricChart>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>At-Risk Alerts</MetricLabel>
            <MetricTrend isPositive={false}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_up</span>
              +5
            </MetricTrend>
          </MetricHeader>
          <MetricIcon bgColor="#fee2e2" textColor="#dc2626">
            <span className="material-symbols-outlined">warning</span>
          </MetricIcon>
          <MetricValue>12</MetricValue>
          <MetricChart>
            <ChartBar height={25} color="#fca5a5" />
            <ChartBar height={33} color="#fca5a5" />
            <ChartBar height={50} color="#fca5a5" />
            <ChartBar height={65} color="#fca5a5" />
            <ChartBar height={100} color="#dc2626" />
          </MetricChart>
        </MetricCard>
      </MetricsGrid>

      <ContentGrid>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="material-symbols-outlined">auto_fix_high</span>
                AI Recommendations
              </CardTitle>
              <button style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f6ef7', border: 'none', background: 'none', cursor: 'pointer' }}>
                View All
              </button>
            </CardHeader>
            <CardContent>
              <RecommendationItem className="highlighted">
                <RecommendationAvatar>
                  <span className="material-symbols-outlined">person</span>
                </RecommendationAvatar>
                <RecommendationContent>
                  <RecommendationTitle>Arjun Mehta</RecommendationTitle>
                  <RecommendationDescription>Needs intervention in "Organic Chemistry - Alkyl Halides"</RecommendationDescription>
                </RecommendationContent>
                <RecommendationButton>Review Kit</RecommendationButton>
              </RecommendationItem>

              <RecommendationItem>
                <RecommendationAvatar>
                  <span className="material-symbols-outlined">person</span>
                </RecommendationAvatar>
                <RecommendationContent>
                  <RecommendationTitle>Sarah Jenkins</RecommendationTitle>
                  <RecommendationDescription>Critical gap detected in "Calculus - Derivatives"</RecommendationDescription>
                </RecommendationContent>
                <RecommendationButton>Review Kit</RecommendationButton>
              </RecommendationItem>

              <RecommendationItem>
                <RecommendationAvatar>
                  <span className="material-symbols-outlined">person</span>
                </RecommendationAvatar>
                <RecommendationContent>
                  <RecommendationTitle>Rahul Kapoor</RecommendationTitle>
                  <RecommendationDescription>Suggesting remedial practice for "Physics - Electromagnetism"</RecommendationDescription>
                </RecommendationContent>
                <RecommendationButton>Review Kit</RecommendationButton>
              </RecommendationItem>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <button style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60688a', border: 'none', background: 'none', cursor: 'pointer' }}>
                Clear all
              </button>
            </CardHeader>
            <CardContent>
              <ActivityItem>
                <ActivityIcon bgColor="#dcfce7" textColor="#16a34a">
                  <span className="material-symbols-outlined">check_circle</span>
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>
                    <strong>Unit Test 3 Results</strong> uploaded for Class 12-B
                  </ActivityTitle>
                  <ActivityTime>15 minutes ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>

              <ActivityItem>
                <ActivityIcon bgColor="#dbeafe" textColor="#4f6ef7">
                  <span className="material-symbols-outlined">upload_file</span>
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>
                    New Question Bank <strong>"Biology - Genetics"</strong> generated
                  </ActivityTitle>
                  <ActivityTime>2 hours ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>

              <ActivityItem>
                <ActivityIcon bgColor="#fef3c7" textColor="#d97706">
                  <span className="material-symbols-outlined">pending_actions</span>
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>
                    15 Students pending for <strong>Revision Kit</strong> review
                  </ActivityTitle>
                  <ActivityTime>5 hours ago</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            </CardContent>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <QuickActionButton className="primary">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="material-symbols-outlined">add_box</span>
                  <span>Generate New Paper</span>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </QuickActionButton>

              <QuickActionButton className="secondary">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="material-symbols-outlined">healing</span>
                  <span>Review Remedial Kits</span>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </QuickActionButton>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Goals</CardTitle>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f6ef7' }}>65% Done</span>
            </CardHeader>
            <CardContent>
              <GoalItem>
                <GoalLabel>
                  <GoalLabelText>Grading Assessments</GoalLabelText>
                  <GoalLabelValue>18/25 done</GoalLabelValue>
                </GoalLabel>
                <GoalTrack>
                  <GoalFill percentage={72} />
                </GoalTrack>
              </GoalItem>

              <GoalItem>
                <GoalLabel>
                  <GoalLabelText>Content Creation</GoalLabelText>
                  <GoalLabelValue>2/5 generated</GoalLabelValue>
                </GoalLabel>
                <GoalTrack>
                  <GoalFill percentage={40} />
                </GoalTrack>
              </GoalItem>

              <GoalItem>
                <GoalLabel>
                  <GoalLabelText>Student Feedback</GoalLabelText>
                  <GoalLabelValue>12/12 done</GoalLabelValue>
                </GoalLabel>
                <GoalTrack>
                  <GoalFill percentage={100} />
                </GoalTrack>
              </GoalItem>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                <button style={{ width: '100%', padding: '0.625rem', fontSize: '0.75rem', fontWeight: 700, color: '#60688a', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>add</span>
                  Add new goal
                </button>
              </div>
            </CardContent>
          </Card>

          <HighlightCard>
            <HighlightTitle>Class 12-A Performance</HighlightTitle>
            <HighlightDescription>Trending upwards this week with +8% average score.</HighlightDescription>
            <HighlightButton>View Details</HighlightButton>
          </HighlightCard>
        </div>
      </ContentGrid>
    </Container>
  );
};
