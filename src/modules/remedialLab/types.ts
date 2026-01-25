/**
 * Remedial Lab Module Types
 */

export interface RemedialLabState {
  loading: boolean;
  error: string | null;
  selectedStudent: StudentConceptGap | null;
  conceptGaps: StudentConceptGap[];
  activeTab: 'explanation' | 'steps' | 'quiz' | 'worksheet' | 'puzzle';
}

export interface StudentConceptGap {
  id: string;
  studentName: string;
  gap: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'High Priority' | 'In Progress' | 'Completed';
  recoveryProgress: number;
  matchScore: number;
}

export interface RemedialContent {
  id: string;
  type: 'explanation' | 'steps' | 'quiz' | 'worksheet' | 'puzzle';
  title: string;
  content: string;
}

export interface StepWalkthrough {
  stepNumber: number;
  title: string;
  description: string;
}
