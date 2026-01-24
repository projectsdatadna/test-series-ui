/**
 * Student Dashboard Module Types
 */

export interface StudentDashboardState {
  loading: boolean;
  error: string | null;
}

export interface StudentMetrics {
  overallGrade: string;
  studyPoints: number;
  currentStreak: number;
  upcomingTests: number;
}
