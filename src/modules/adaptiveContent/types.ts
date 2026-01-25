/**
 * Adaptive Content Module Types
 */

export interface AdaptiveContentState {
  loading: boolean;
  error: string | null;
  contentTypes: ContentType[];
  aiCredits: number;
  recentlyGenerated: number;
}

export interface ContentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
}

export interface GeneratedContent {
  id: string;
  type: ContentType['id'];
  title: string;
  createdAt: string;
  status: 'draft' | 'published';
}

export interface AIUsageStats {
  creditsRemaining: number;
  generatedThisWeek: number;
  totalGenerated: number;
}
