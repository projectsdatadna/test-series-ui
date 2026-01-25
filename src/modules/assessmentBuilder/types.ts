/**
 * Assessment Builder Module Types
 */

export interface AssessmentBuilderState {
  loading: boolean;
  error: string | null;
  activeTab: 'assessment' | 'revision' | 'lesson' | 'remedial';
  recentActivity: RecentActivityItem[];
}

export interface RecentActivityItem {
  id: string;
  documentName: string;
  type: 'Assessment' | 'Revision Kit' | 'Lesson Plan';
  dateCreated: string;
  status: 'Completed' | 'Draft' | 'In Progress';
  icon: string;
}

export interface AssessmentBuilderMetrics {
  totalAssessments: number;
  totalRevisionKits: number;
  totalLessonPlans: number;
  pendingRemedial: number;
}
