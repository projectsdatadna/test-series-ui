import React from 'react';
import {
  Container,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  HeaderActions,
  Button,
  MetricsGrid,
  MetricCard,
  MetricHeader,
  MetricLabel,
  MetricIcon,
  MetricValue,
  MetricNumber,
  MetricChange,
  MetricChart,
  ChartBar,
  ContentGrid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ProgressBar,
  ProgressLabel,
  ProgressTrack,
  ProgressFill,
  ProgressValue,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  UserCell,
  UserAvatar,
  Badge,
} from './AdminDashboard.styles';

export const AdminDashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Functional Admin Dashboard</Title>
          <Subtitle>Operational oversight and academic performance monitoring.</Subtitle>
        </HeaderContent>
        <HeaderActions>
          <Button className="secondary">
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>download</span>
            Export Metrics
          </Button>
          <Button className="primary">
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>sync</span>
            Refresh Data
          </Button>
        </HeaderActions>
      </Header>

      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <MetricLabel>Total Active Users</MetricLabel>
            <MetricIcon>
              <span className="material-symbols-outlined">person_check</span>
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <MetricNumber>128,492</MetricNumber>
            <MetricChange isPositive={true}>+12% ↑</MetricChange>
          </MetricValue>
          <MetricChart>
            <ChartBar height={40} />
            <ChartBar height={55} />
            <ChartBar height={40} />
            <ChartBar height={75} />
            <ChartBar height={100} />
          </MetricChart>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Avg. Student Mastery</MetricLabel>
            <MetricIcon style={{ color: '#10b981' }}>
              <span className="material-symbols-outlined">school</span>
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <MetricNumber>78.4%</MetricNumber>
            <MetricChange isPositive={true}>+4.2% ↑</MetricChange>
          </MetricValue>
          <MetricChart>
            <ChartBar height={100} style={{ backgroundColor: '#10b981' }} />
            <ChartBar height={100} style={{ backgroundColor: '#10b981' }} />
            <ChartBar height={100} style={{ backgroundColor: '#10b981' }} />
            <ChartBar height={50} style={{ backgroundColor: '#d1fae5' }} />
          </MetricChart>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Assessments Completed</MetricLabel>
            <MetricIcon style={{ color: '#f59e0b' }}>
              <span className="material-symbols-outlined">assignment_turned_in</span>
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <MetricNumber>42,810</MetricNumber>
            <MetricChange isPositive={true}>+1.2k today</MetricChange>
          </MetricValue>
          <MetricChart>
            <ChartBar height={40} style={{ backgroundColor: '#fcd34d' }} />
            <ChartBar height={25} style={{ backgroundColor: '#fcd34d' }} />
            <ChartBar height={100} style={{ backgroundColor: '#f59e0b' }} />
            <ChartBar height={50} style={{ backgroundColor: '#fcd34d' }} />
            <ChartBar height={40} style={{ backgroundColor: '#fcd34d' }} />
          </MetricChart>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricLabel>Support Requests</MetricLabel>
            <MetricIcon style={{ color: '#ef4444' }}>
              <span className="material-symbols-outlined">contact_support</span>
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <MetricNumber>28</MetricNumber>
            <MetricChange isPositive={false}>High Priority</MetricChange>
          </MetricValue>
          <MetricChart>
            <ChartBar height={25} style={{ backgroundColor: '#fecaca' }} />
            <ChartBar height={25} style={{ backgroundColor: '#fecaca' }} />
            <ChartBar height={100} style={{ backgroundColor: '#ef4444' }} />
            <ChartBar height={35} style={{ backgroundColor: '#fecaca' }} />
          </MetricChart>
        </MetricCard>
      </MetricsGrid>

      <ContentGrid>
        <Card>
          <CardHeader>
            <CardTitle>Institutional Overview</CardTitle>
            <select style={{ fontSize: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', backgroundColor: '#f9fafb', padding: '0.5rem' }}>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
          </CardHeader>
          <CardContent>
            <ProgressBar>
              <ProgressLabel>Delhi Public School</ProgressLabel>
              <ProgressTrack>
                <ProgressFill percentage={85} />
              </ProgressTrack>
              <ProgressValue>85%</ProgressValue>
            </ProgressBar>
            <ProgressBar>
              <ProgressLabel>St. Xavier's</ProgressLabel>
              <ProgressTrack>
                <ProgressFill percentage={72} />
              </ProgressTrack>
              <ProgressValue>72%</ProgressValue>
            </ProgressBar>
            <ProgressBar>
              <ProgressLabel>KV International</ProgressLabel>
              <ProgressTrack>
                <ProgressFill percentage={94} />
              </ProgressTrack>
              <ProgressValue>94%</ProgressValue>
            </ProgressBar>
            <ProgressBar>
              <ProgressLabel>Global Academy</ProgressLabel>
              <ProgressTrack>
                <ProgressFill percentage={61} />
              </ProgressTrack>
              <ProgressValue>61%</ProgressValue>
            </ProgressBar>
          </CardContent>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Management</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Button className="primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">auto_stories</span>
                Manage Curricula
              </Button>
              <Button className="secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <span className="material-symbols-outlined">person_add</span>
                User Onboarding
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Alerts</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#fef3c7', borderRadius: '0.75rem', border: '1px solid #fcd34d', display: 'flex', gap: '0.75rem' }}>
                <span className="material-symbols-outlined" style={{ color: '#d97706' }}>rate_review</span>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#92400e', margin: 0 }}>Pending Content Approval</p>
                  <p style={{ fontSize: '0.625rem', color: '#b45309', margin: '0.25rem 0 0 0' }}>4 new Physics modules awaiting review</p>
                </div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', borderRadius: '0.75rem', border: '1px solid #fecaca', display: 'flex', gap: '0.75rem' }}>
                <span className="material-symbols-outlined" style={{ color: '#dc2626' }}>trending_down</span>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#991b1b', margin: 0 }}>Low Performance Flag</p>
                  <p style={{ fontSize: '0.625rem', color: '#b91c1c', margin: '0.25rem 0 0 0' }}>Grade 10 math scores below benchmark</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentGrid>

      <Card>
        <CardHeader>
          <CardTitle>Recent Operational Log</CardTitle>
          <Button className="secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
            View History
          </Button>
        </CardHeader>
        <CardContent style={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>User</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
                <TableHeaderCell>Target</TableHeaderCell>
                <TableHeaderCell>Timestamp</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <UserCell>
                    <UserAvatar>JS</UserAvatar>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>John Smith</span>
                  </UserCell>
                </TableCell>
                <TableCell>
                  <Badge variant="default">Class Created</Badge>
                </TableCell>
                <TableCell>Section_A_Grade_12</TableCell>
                <TableCell style={{ color: '#60688a' }}>2 mins ago</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.625rem', fontWeight: 700, color: '#10b981' }}>
                    <span style={{ width: '0.375rem', height: '0.375rem', backgroundColor: '#10b981', borderRadius: '9999px' }} />
                    Active
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <UserCell>
                    <UserAvatar>AL</UserAvatar>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Amy Lee</span>
                  </UserCell>
                </TableCell>
                <TableCell>
                  <Badge variant="default">Library Updated</Badge>
                </TableCell>
                <TableCell>Entrance_Mock_2024</TableCell>
                <TableCell style={{ color: '#60688a' }}>15 mins ago</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.625rem', fontWeight: 700, color: '#10b981' }}>
                    <span style={{ width: '0.375rem', height: '0.375rem', backgroundColor: '#10b981', borderRadius: '9999px' }} />
                    Published
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <UserCell>
                    <UserAvatar>RK</UserAvatar>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Raj Kumar</span>
                  </UserCell>
                </TableCell>
                <TableCell>
                  <Badge variant="default">Report Generated</Badge>
                </TableCell>
                <TableCell>Annual_Growth_DPS</TableCell>
                <TableCell style={{ color: '#60688a' }}>42 mins ago</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.625rem', fontWeight: 700, color: '#10b981' }}>
                    <span style={{ width: '0.375rem', height: '0.375rem', backgroundColor: '#10b981', borderRadius: '9999px' }} />
                    Ready
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
};
