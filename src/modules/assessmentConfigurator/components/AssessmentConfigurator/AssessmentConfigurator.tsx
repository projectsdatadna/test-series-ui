import React from 'react';
import { useAppSelector } from '../../../../hooks/useAppRedux';
import { selectActiveTab } from '../../selectors';
import { ContentSource } from '../ContentSource';
import { PaperSettings } from '../PaperSettings';
import { PaperPreview } from '../PaperPreview';
import { AssessmentConfiguratorContainer, ResponsiveSection } from './AssessmentConfigurator.styles';

export const AssessmentConfigurator: React.FC = () => {
  const activeTab = useAppSelector(selectActiveTab);

  return (
    <AssessmentConfiguratorContainer>
      <ResponsiveSection $visibility={activeTab === 'source' ? 'visible' : 'hidden'} $width="30%">
        <ContentSource />
      </ResponsiveSection>

      <ResponsiveSection $visibility={activeTab === 'settings' ? 'visible' : 'hidden'} $width="30%">
        <PaperSettings />
      </ResponsiveSection>

      <ResponsiveSection $visibility={activeTab === 'preview' ? 'visible' : 'hidden'} $width="40%">
        <PaperPreview />
      </ResponsiveSection>
    </AssessmentConfiguratorContainer>
  );
};
