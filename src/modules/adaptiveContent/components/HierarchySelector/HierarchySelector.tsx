import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getSyllabuses, getStandards, getSubjects, getChapters } from '../../services/hierarchyService';
import type { HierarchyItem } from '../../services/hierarchyService';

const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {children}
  </div>
);

const customStyles = {
  control: (base: any) => ({
    ...base,
    borderColor: '#d1d5db',
    borderRadius: '0.375rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#2563eb',
    },
    '&:focus': {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
    },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#f0f9ff' : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#1f2937',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: state.isSelected ? '#2563eb' : '#f0f9ff',
    },
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '0.375rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  }),
};

interface HierarchySelectorProps {
  onSelectionChange?: (selection: {
    syllabusId: string | null;
    standardId: string | null;
    subjectId: string | null;
    chapterId: string | null;
    chapterFileId: string | null;
  }) => void;
}

export const HierarchySelector: React.FC<HierarchySelectorProps> = ({ onSelectionChange }) => {
  const [syllabuses, setSyllabuses] = useState<HierarchyItem[]>([]);
  const [standards, setStandards] = useState<HierarchyItem[]>([]);
  const [subjects, setSubjects] = useState<HierarchyItem[]>([]);
  const [chapters, setChapters] = useState<HierarchyItem[]>([]);

  const [selectedSyllabus, setSelectedSyllabus] = useState<string | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedChapterFileId, setSelectedChapterFileId] = useState<string | null>(null);

  const [loadingSyllabuses, setLoadingSyllabuses] = useState(false);
  const [loadingStandards, setLoadingStandards] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);

  // Load syllabuses on mount
  useEffect(() => {
    const loadSyllabuses = async () => {
      try {
        setLoadingSyllabuses(true);
        const data = await getSyllabuses();
        setSyllabuses(data);
      } catch (error) {
        console.error('Failed to load syllabuses:', error);
      } finally {
        setLoadingSyllabuses(false);
      }
    };

    loadSyllabuses();
  }, []);

  // Load standards when syllabus changes
  useEffect(() => {
    if (!selectedSyllabus) {
      setStandards([]);
      setSelectedStandard(null);
      setSubjects([]);
      setSelectedSubject(null);
      setChapters([]);
      setSelectedChapter(null);
      return;
    }

    const loadStandards = async () => {
      try {
        setLoadingStandards(true);
        const data = await getStandards(selectedSyllabus);
        setStandards(data);
        setSelectedStandard(null);
        setSubjects([]);
        setSelectedSubject(null);
        setChapters([]);
        setSelectedChapter(null);
      } catch (error) {
        console.error('Failed to load standards:', error);
      } finally {
        setLoadingStandards(false);
      }
    };

    loadStandards();
  }, [selectedSyllabus]);

  // Load subjects when standard changes
  useEffect(() => {
    if (!selectedStandard) {
      setSubjects([]);
      setSelectedSubject(null);
      setChapters([]);
      setSelectedChapter(null);
      return;
    }

    const loadSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const data = await getSubjects(selectedStandard);
        setSubjects(data);
        setSelectedSubject(null);
        setChapters([]);
        setSelectedChapter(null);
      } catch (error) {
        console.error('Failed to load subjects:', error);
      } finally {
        setLoadingSubjects(false);
      }
    };

    loadSubjects();
  }, [selectedStandard]);

  // Load chapters when subject changes
  useEffect(() => {
    if (!selectedSubject) {
      setChapters([]);
      setSelectedChapter(null);
      setSelectedChapterFileId(null);
      return;
    }

    const loadChapters = async () => {
      try {
        setLoadingChapters(true);
        const data = await getChapters(selectedSubject, selectedSyllabus || undefined, selectedStandard || undefined);
        setChapters(data);
        setSelectedChapter(null);
        setSelectedChapterFileId(null);
      } catch (error) {
        console.error('Failed to load chapters:', error);
      } finally {
        setLoadingChapters(false);
      }
    };

    loadChapters();
  }, [selectedSubject, selectedSyllabus, selectedStandard]);

  // Notify parent of selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({
        syllabusId: selectedSyllabus,
        standardId: selectedStandard,
        subjectId: selectedSubject,
        chapterId: selectedChapter,
        chapterFileId: selectedChapterFileId,
      });
    }
  }, [selectedSyllabus, selectedStandard, selectedSubject, selectedChapter, selectedChapterFileId, onSelectionChange]);

  return (
    <Container>
      <div>
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
          Syllabus
        </label>
        <Select
          options={syllabuses.map((item) => ({ value: item.id, label: item.name }))}
          value={selectedSyllabus ? { value: selectedSyllabus, label: syllabuses.find((s) => s.id === selectedSyllabus)?.name } : null}
          onChange={(option) => setSelectedSyllabus(option?.value || null)}
          isDisabled={loadingSyllabuses}
          isLoading={loadingSyllabuses}
          isClearable
          styles={customStyles}
          placeholder="Select Syllabus"
        />
      </div>

      <div>
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
          Standard
        </label>
        <Select
          options={standards.map((item) => ({ value: item.id, label: item.name }))}
          value={selectedStandard ? { value: selectedStandard, label: standards.find((s) => s.id === selectedStandard)?.name } : null}
          onChange={(option) => setSelectedStandard(option?.value || null)}
          isDisabled={!selectedSyllabus || loadingStandards || standards.length === 0}
          isLoading={loadingStandards}
          isClearable
          styles={customStyles}
          placeholder="Select Standard"
        />
      </div>

      <div>
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
          Subject
        </label>
        <Select
          options={subjects.map((item) => ({ value: item.id, label: item.name }))}
          value={selectedSubject ? { value: selectedSubject, label: subjects.find((s) => s.id === selectedSubject)?.name } : null}
          onChange={(option) => setSelectedSubject(option?.value || null)}
          isDisabled={!selectedStandard || loadingSubjects || subjects.length === 0}
          isLoading={loadingSubjects}
          isClearable
          styles={customStyles}
          placeholder="Select Subject"
        />
      </div>

      <div>
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
          Chapter
        </label>
        <Select
          options={chapters.map((item) => ({ value: item.id, label: item.name, fileId: item.fileId }))}
          value={selectedChapter ? { value: selectedChapter, label: chapters.find((c) => c.id === selectedChapter)?.name, fileId: chapters.find((c) => c.id === selectedChapter)?.fileId } : null}
          onChange={(option) => {
            setSelectedChapter(option?.value || null);
            setSelectedChapterFileId(option?.fileId || null);
          }}
          isDisabled={!selectedSubject || loadingChapters || chapters.length === 0}
          isLoading={loadingChapters}
          isClearable
          styles={customStyles}
          placeholder="Select Chapter"
        />
      </div>
    </Container>
  );
};
