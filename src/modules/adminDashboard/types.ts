/**
 * Admin Dashboard Module Types
 */

export interface AdminDashboardState {
  loading: boolean;
  error: string | null;
}

export interface AdminMetrics {
  totalActiveUsers: number;
  avgStudentMastery: number;
  assessmentsCompleted: number;
  supportRequests: number;
}
