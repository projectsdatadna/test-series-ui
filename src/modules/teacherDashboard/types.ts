/**
 * Teacher Dashboard Module Types
 */

export interface TeacherDashboardState {
  loading: boolean;
  error: string | null;
}

export interface TeacherMetrics {
  totalStudents: number;
  activeAssessments: number;
  avgPerformance: number;
  atRiskAlerts: number;
}
