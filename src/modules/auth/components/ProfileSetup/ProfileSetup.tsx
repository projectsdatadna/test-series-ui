import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import authSelector from '../../selectors';
import { setupProfile } from '../../actions';
import {
  Container,
  BackgroundDecoration,
  Header,
  LogoContainer,
  LogoIcon,
  LogoText,
  HeaderActions,
  HeaderButton,
  Main,
  FormContainer,
  ProgressSection,
  ProgressHeader,
  ProgressTitle,
  ProgressStep,
  ProgressBar,
  ProgressFill,
  ProgressDescription,
  FormHeader,
  FormTitle,
  FormDescription,
  FormContent,
  FormGroup,
  FormLabel,
  FormInput,
  TagContainer,
  Tag,
  TagRemove,
  AddButton,
  TagDropdown,
  TagDropdownContent,
  TagDropdownSection,
  TagDropdownSectionTitle,
  TagDropdownOption,
  TagDropdownInput,
  ExperienceGrid,
  ExperienceButton,
  PreferencesGrid,
  PreferenceOption,
  PreferenceCheckbox,
  PreferenceLabel,
  ActionButtons,
  PrimaryButton,
  SecondaryButton,
  FormFooter,
  FooterText,
} from './ProfileSetup.styles';

interface ProfileSetupProps {
  onComplete: (data: {
    schoolName: string;
    grades: string[];
    subjects: string[];
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    preferences: string[];
  }) => void;
  onSkip: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete, onSkip }) => {
  const dispatch = useDispatch();
  const userId = useSelector(authSelector.getUserId);
  
  console.log('[ProfileSetup] Component mounted/re-rendered, userId from Redux:', userId);
  const [formData, setFormData] = useState({
    schoolName: '',
    grades: ['Class X', 'Class XI', 'Class XII'] as string[],
    subjects: [] as string[],
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    preferences: ['Mock Tests', 'Practice Sheets'],
  });

  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [customTagInput, setCustomTagInput] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const gradeOptions = ['Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'];
  const subjectOptions = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Social Studies', 'Computer Science', 'Economics', 'History', 'Geography'];
  const availablePreferences = ['Mock Tests', 'Video Tutorials', 'Practice Sheets', 'Live Q&A'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTagDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!formData.schoolName.trim()) {
      toast.error('School name is required');
      return;
    }
    
    try {
      await dispatch(setupProfile({ ...formData, userId }) as any);
      onComplete(formData);
    } catch (error) {
      // Error is already handled by the action with toast
    }
  };

  const removeTag = (type: 'grades' | 'subjects', value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const toggleTag = (type: 'grades' | 'subjects', value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const addCustomTag = () => {
    if (customTagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, customTagInput.trim()]
      }));
      setCustomTagInput('');
    }
  };

  const togglePreference = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  return (
    <Container>
      <BackgroundDecoration />
      
      <Header>
        <LogoContainer>
          <LogoIcon>
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" />
            </svg>
          </LogoIcon>
          <LogoText>Test Series EdTech</LogoText>
        </LogoContainer>
        <HeaderActions>
          <HeaderButton>
            <BellIcon className="w-5 h-5" />
          </HeaderButton>
          <HeaderButton>
            <UserCircleIcon className="w-5 h-5" />
          </HeaderButton>
        </HeaderActions>
      </Header>

      <Main>
        <FormContainer>
          <ProgressSection>
            <ProgressHeader>
              <ProgressTitle>Profile Setup Progress</ProgressTitle>
              <ProgressStep>Step 4 of 5</ProgressStep>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill width={80} />
            </ProgressBar>
            <ProgressDescription>Almost there! Just a few more details.</ProgressDescription>
          </ProgressSection>

          <FormHeader>
            <FormTitle>Complete Your Profile</FormTitle>
            <FormDescription>
              This helps us tailor the best mock tests and learning materials for your needs.
            </FormDescription>
          </FormHeader>

          <FormContent>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>School Name</FormLabel>
                <FormInput
                  type="text"
                  placeholder="Enter your school or institution name"
                  value={formData.schoolName}
                  onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Grade / Subject</FormLabel>
                <TagContainer ref={dropdownRef}>
                  {formData.grades.map((grade) => (
                    <Tag key={`grade-${grade}`}>
                      {grade}
                      <TagRemove onClick={() => removeTag('grades', grade)}>
                        <XMarkIcon className="w-3 h-3" />
                      </TagRemove>
                    </Tag>
                  ))}
                  {formData.subjects.map((subject) => (
                    <Tag key={`subject-${subject}`}>
                      {subject}
                      <TagRemove onClick={() => removeTag('subjects', subject)}>
                        <XMarkIcon className="w-3 h-3" />
                      </TagRemove>
                    </Tag>
                  ))}
                  <AddButton type="button" onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}>
                    + Add more
                  </AddButton>
                  <TagDropdown isOpen={isTagDropdownOpen}>
                    <TagDropdownContent>
                      <TagDropdownSection>
                        <TagDropdownSectionTitle>Classes</TagDropdownSectionTitle>
                        {gradeOptions.map((grade) => (
                          <TagDropdownOption
                            key={grade}
                            type="button"
                            selected={formData.grades.includes(grade)}
                            onClick={() => toggleTag('grades', grade)}
                          >
                            {grade}
                          </TagDropdownOption>
                        ))}
                      </TagDropdownSection>
                      <TagDropdownSection>
                        <TagDropdownSectionTitle>Subjects</TagDropdownSectionTitle>
                        {subjectOptions.map((subject) => (
                          <TagDropdownOption
                            key={subject}
                            type="button"
                            selected={formData.subjects.includes(subject)}
                            onClick={() => toggleTag('subjects', subject)}
                          >
                            {subject}
                          </TagDropdownOption>
                        ))}
                        <TagDropdownInput
                          type="text"
                          placeholder="Add custom subject"
                          value={customTagInput}
                          onChange={(e) => setCustomTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addCustomTag();
                            }
                          }}
                        />
                        <AddButton type="button" onClick={addCustomTag} style={{ width: '100%', marginTop: '0.5rem' }}>
                          + Add Custom
                        </AddButton>
                      </TagDropdownSection>
                    </TagDropdownContent>
                  </TagDropdown>
                </TagContainer>
              </FormGroup>

              <FormGroup>
                <FormLabel>Experience Level</FormLabel>
                <ExperienceGrid>
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <ExperienceButton
                      key={level}
                      type="button"
                      selected={formData.experienceLevel === level}
                      onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level }))}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </ExperienceButton>
                  ))}
                </ExperienceGrid>
              </FormGroup>

              <FormGroup>
                <FormLabel>Learning Preferences</FormLabel>
                <PreferencesGrid>
                  {availablePreferences.map((preference) => (
                    <PreferenceOption key={preference}>
                      <PreferenceCheckbox
                        type="checkbox"
                        checked={formData.preferences.includes(preference)}
                        onChange={() => togglePreference(preference)}
                      />
                      <PreferenceLabel>{preference}</PreferenceLabel>
                    </PreferenceOption>
                  ))}
                </PreferencesGrid>
              </FormGroup>

              <ActionButtons>
                <PrimaryButton type="submit">Continue</PrimaryButton>
                <SecondaryButton type="button" onClick={onSkip}>
                  Skip for now
                </SecondaryButton>
              </ActionButtons>
            </form>
          </FormContent>

          <FormFooter>
            <FooterText>Trusted by 50,000+ Students & Teachers</FooterText>
          </FormFooter>
        </FormContainer>
      </Main>
    </Container>
  );
};