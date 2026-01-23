import React from 'react';
// import { Header } from '../components/Header';
import { MobileTabBar } from '../modules/assessmentConfigurator/components/MobileTabBar';
import { AssessmentConfigurator } from '../modules/assessmentConfigurator/components/AssessmentConfigurator';

interface HomePageProps {
  currentPage?: 'dashboard' | 'assessment' | 'analytics';
  onPageChange?: (page: 'dashboard' | 'assessment' | 'analytics') => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <Header currentPage="Assessment Creator" /> */}
      <MobileTabBar />
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <AssessmentConfigurator />
      </main>
    </div>
  );
};
