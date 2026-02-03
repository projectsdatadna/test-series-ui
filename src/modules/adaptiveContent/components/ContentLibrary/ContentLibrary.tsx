/**
 * Content Library Component
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { setCurrentPage } from '../../../navbar/actions';
import adaptiveContentSelector from '../../selectors';
import { getAllAdaptiveContent } from '../../contentLibrary/service';
import { getChapters, getStandards, getSubjects, getSyllabuses } from '../../services/hierarchyService';
import { contentBuilderSetSelectedContentType } from '../../actions';
import { deleteAdaptiveContent } from '../../contentLibrary/service';
import { selectUser } from '../../../auth/selectors';
import * as S from './ContentLibrary.styles';
import toast from 'react-hot-toast';

interface ContentItem {
  id: string;
  title: string;
  subject: string;
  contentType: string;
  bgClass: string;
  tagClass: string;
  icon: string;
  usedByClasses: number;
  createdAt: string;
  standard: string;
  chapter: string;
  subjectId: string;
  images?: string[];
}

export const ContentLibrary: React.FC = () => {
  const dispatch = useDispatch();
  const selectedContentTypeId = useSelector(adaptiveContentSelector.getSelectedContentTypeId);
  const user = useSelector(selectUser);
  
  // Map UI content type IDs to API format
  const getApiContentType = (uiId: string | null): string => {
    if (!uiId) return '';
    const map: Record<string, string> = {
      'sticky-notes': 'STICKY NOTES',
      'ready-reckoner': 'READY RECKONER',
      'flash-cards': 'FLASHCARDS',
      'mind-maps': 'MIND MAP',
      'visual-explainers': 'VISUAL EXPLAINERS',
    };
    return map[uiId] || '';
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [syllabusFilter, setSyllabusFilter] = useState('');
  const [chapterFilter, setChapterFilter] = useState('');
  const [aidTypeFilter, setAidTypeFilter] = useState(getApiContentType(selectedContentTypeId));
  const [standardFilter, setStandardFilter] = useState('');
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [syllabuses, setSyllabuses] = useState<Array<{ id: string; name: string }>>([]);
  const [chapters, setChapters] = useState<Array<{ id: string; name: string }>>([]);
  const [standards, setStandards] = useState<Array<{ id: string; name: string }>>([]);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [loadingStandards, setLoadingStandards] = useState(false);
  const [loadingSyllabuses, setLoadingSyllabuses] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Fetch content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await getAllAdaptiveContent();
        
        // Transform API data to ContentItem format
        const transformedData: ContentItem[] = data.map((item: any) => {
          const contentTypeMap: Record<string, string> = {
            'STICKY NOTES': 'sticky_note_2',
            'READY RECKONER': 'table_view',
            'FLASHCARDS': 'style',
            'MIND MAP': 'account_tree',
            'VISUAL EXPLAINERS': 'burst_mode',
          };

          const bgClassMap: Record<string, string> = {
            'STICKY NOTES': 'bg-mindmap',
            'READY RECKONER': 'bg-flashcards',
            'FLASHCARDS': 'bg-infographic',
            'MIND MAP': 'bg-timeline',
            'VISUAL EXPLAINERS': 'bg-mindmap',
          };

          const tagClassMap: Record<string, string> = {
            'STICKY NOTES': 'tag-mindmap',
            'READY RECKONER': 'tag-flashcards',
            'FLASHCARDS': 'tag-infographic',
            'MIND MAP': 'tag-timeline',
            'VISUAL EXPLAINERS': 'tag-mindmap',
          };

          return {
            id: item.id,
            title: item.title,
            subject: item.subject,
            contentType: item.contentType,
            bgClass: bgClassMap[item.contentType] || 'bg-mindmap',
            tagClass: tagClassMap[item.contentType] || 'tag-mindmap',
            icon: contentTypeMap[item.contentType] || 'library_books',
            usedByClasses: item.metadata?.usedByClasses || 0,
            createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently',
            standard: item.standard,
            chapter: item.chapter,
            subjectId: item.subjectId,
            images: item.images || [],
          };
        });

        setContentData(transformedData);
      } catch (error) {
        console.error('Failed to fetch content:', error);
        toast.error('Failed to load content library');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Load syllabuses on component mount
  useEffect(() => {
    const loadSyllabuses = async () => {
      try {
        setLoadingSyllabuses(true);
        const data = await getSyllabuses();
        setSyllabuses(
          data
            .map((item) => ({
              id: item.id,
              name: item.name,
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
        );
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
    if (!syllabusFilter) {
      setStandards([]);
      setStandardFilter('');
      setChapters([]);
      setChapterFilter('');
      return;
    }

    const loadStandards = async () => {
      try {
        setLoadingStandards(true);
        const data = await getStandards(syllabusFilter);
        setStandards(
          data
            .map((item) => ({
              id: item.id,
              name: item.name,
            }))
            .sort((a, b) => {
              // Extract numeric values from names like "Class 6", "Class 7", etc.
              const numA = parseInt(a.name.match(/\d+/)?.[0] || '0');
              const numB = parseInt(b.name.match(/\d+/)?.[0] || '0');
              return numA - numB;
            })
        );
        setStandardFilter('');
        setChapters([]);
        setChapterFilter('');
      } catch (error) {
        console.error('Failed to load standards:', error);
      } finally {
        setLoadingStandards(false);
      }
    };

    loadStandards();
  }, [syllabusFilter]);

  // Load subjects when standard changes
  useEffect(() => {
    if (!standardFilter) {
      setChapters([]);
      setChapterFilter('');
      return;
    }

    const loadSubjects = async () => {
      try {
        await getSubjects(standardFilter);
        // We're not using subjects directly in the UI, but keeping the API call
        // for potential future use or to maintain consistency with ContentBuilder
        setChapters([]);
        setChapterFilter('');
      } catch (error) {
        console.error('Failed to load subjects:', error);
      }
    };

    loadSubjects();
  }, [standardFilter]);

  // Load chapters when standard filter changes
  useEffect(() => {
    if (!standardFilter) {
      setChapters([]);
      setChapterFilter('');
      return;
    }

    const loadChaptersData = async () => {
      try {
        setLoadingChapters(true);
        // Find the standard and syllabus info
        const selectedStandard = standards.find((s) => s.id === standardFilter);
        const selectedSyllabus = syllabuses.find((s) => s.id === syllabusFilter);
        
        if (selectedStandard) {
          // Get unique subjects from content data for the selected standard
          const uniqueSubjects = Array.from(
            new Set(
              contentData
                .filter((item) => item.standard === selectedStandard.name)
                .map((item) => item.subject)
            )
          );

          // Load chapters for the first subject if available
          if (uniqueSubjects.length > 0) {
            const subjectItem = contentData.find((item) => item.subject === uniqueSubjects[0]);
            if (subjectItem) {
              const chaptersData = await getChapters(
                subjectItem.subjectId,
                selectedSyllabus?.id || undefined,
                standardFilter || undefined
              );
              setChapters(
                chaptersData
                  .map((ch) => ({
                    id: ch.id,
                    name: ch.name,
                  }))
                  .sort((a, b) => {
                    // Extract numeric values from names like "Chapter 1", "Chapter 2", etc.
                    const numA = parseInt(a.name.match(/\d+/)?.[0] || '0');
                    const numB = parseInt(b.name.match(/\d+/)?.[0] || '0');
                    return numA - numB;
                  })
              );
            }
          }
        }
      } catch (error) {
        console.error('Failed to load chapters:', error);
      } finally {
        setLoadingChapters(false);
      }
    };

    loadChaptersData();
  }, [standardFilter, syllabusFilter, standards, syllabuses, contentData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Only close if clicking outside the more button and dropdown
      if (!target.closest(`[data-dropdown-id="${openMenuId}"]`)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [openMenuId]);

  const filteredContent = contentData.filter((item) => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (aidTypeFilter && item.contentType !== aidTypeFilter) {
      return false;
    }
    if (standardFilter) {
      const selectedStandard = standards.find((s) => s.id === standardFilter);
      if (selectedStandard && item.standard !== selectedStandard.name) {
        return false;
      }
    }
    if (chapterFilter) {
      const selectedChapter = chapters.find((c) => c.id === chapterFilter);
      if (selectedChapter && item.chapter !== selectedChapter.name) {
        return false;
      }
    }
    return true;
  });

  // const handleCreateNew = () => {
  //   dispatch(setCurrentPage('adaptive-content') as any);
  // };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSyllabusFilter('');
    setStandardFilter('');
    setChapterFilter('');
    setAidTypeFilter('');
  };

  // const handleAssign = () => {
  //   toast.success('Content assigned successfully');
  // };

  const handleEdit = (item: ContentItem) => {
    // Navigate to content builder with existing content details
    dispatch(contentBuilderSetSelectedContentType(item.contentType) as any);
    dispatch(setCurrentPage('content-builder') as any);
    toast.success('Opening content editor...');
  };

  const handleDownload = (item: ContentItem) => {
    if (item.images && item.images.length > 0) {
      window.open(item.images[0], '_blank');
      toast.success('Opening image in new tab');
    } else {
      toast.error('No image available to download');
    }
  };

  const handleDelete = async (item: ContentItem) => {
    try {
      await deleteAdaptiveContent(item.id, user?.id);
      setContentData(contentData.filter((content) => content.id !== item.id));
      toast.success('Content deleted successfully');
      setOpenMenuId(null);
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    }
  };

  const hasActiveFilters = searchQuery || syllabusFilter || standardFilter || chapterFilter || aidTypeFilter;

  // Calculate stats
  const totalAssets = contentData.length;
  const assignedToday = contentData.filter((item) => {
    const createdDate = new Date(item.createdAt);
    const today = new Date();
    return createdDate.toDateString() === today.toDateString();
  }).length;
  const aiGenerated = Math.floor(contentData.length * 0.68);

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      borderColor: '#d1d5db',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      width: '200px',
      minHeight: '32px',
      height: '32px',
      fontSize: '13px',
      padding: '0px',
      '&:hover': {
        borderColor: '#2563eb',
      },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#f0f9ff' : '#ffffff',
      color: state.isSelected ? '#ffffff' : '#1f2937',
      cursor: 'pointer',
      fontSize: '13px',
      padding: '8px 12px',
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '0.375rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      width: '200px',
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 1000,
    }),
    input: (base: any) => ({
      ...base,
      fontSize: '13px',
      margin: '0px',
      padding: '0px',
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: '4px 8px',
      fontSize: '13px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      width: '100%',
    }),
    singleValue: (base: any) => ({
      ...base,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '100%',
      color: '#1f2937',
    }),
    placeholder: (base: any) => ({
      ...base,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '100%',
      color: '#9ca3af',
    }),
    indicatorsContainer: (base: any) => ({
      ...base,
      padding: '2px 4px',
      height: '32px',
      flexShrink: 0,
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      padding: '4px',
    }),
    clearIndicator: (base: any) => ({
      ...base,
      padding: '4px',
    }),
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Header>
          <S.HeaderLeft>
            <S.Title>Content Library</S.Title>
            <S.Subtitle>Manage and assign adaptive teaching aids to your classes</S.Subtitle>
          </S.HeaderLeft>
          {/* <S.CreateButton onClick={handleCreateNew}>
            <span>+</span> Create New Aid
          </S.CreateButton> */}
        </S.Header>

        <S.StatsContainer>
          <S.StatCard>
            <S.StatHeader>
              <S.StatIcon>
                <span className="material-symbols-outlined">library_books</span>
              </S.StatIcon>
              <span>Total Assets</span>
            </S.StatHeader>
            <S.StatNumber>{totalAssets.toLocaleString()}</S.StatNumber>
            <S.StatDetail>+12 this week</S.StatDetail>
          </S.StatCard>

          <S.StatCard>
            <S.StatHeader>
              <S.StatIcon>
                <span className="material-symbols-outlined">check_circle</span>
              </S.StatIcon>
              <span>Assigned Today</span>
            </S.StatHeader>
            <S.StatNumber>{assignedToday}</S.StatNumber>
            <S.StatDetail>Across 6 departments</S.StatDetail>
          </S.StatCard>

          <S.StatCard>
            <S.StatHeader>
              <S.StatIcon>
                <span className="material-symbols-outlined">auto_awesome</span>
              </S.StatIcon>
              <span>AI Generated</span>
            </S.StatHeader>
            <S.StatNumber>{aiGenerated}</S.StatNumber>
            <S.StatDetail>Adaptive high-confidence</S.StatDetail>
          </S.StatCard>
        </S.StatsContainer>

        <S.FilterSection>
          <S.SearchBox>
            <MagnifyingGlassIcon style={{ width: '18px', height: '18px' }} />
            <input
              type="text"
              placeholder="Search by title, topic or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.SearchBox>
          <Select
            options={syllabuses.map((item) => ({ value: item.id, label: item.name }))}
            value={syllabusFilter ? { value: syllabusFilter, label: syllabuses.find((s) => s.id === syllabusFilter)?.name } : null}
            onChange={(option) => setSyllabusFilter(option?.value || '')}
            isDisabled={loadingSyllabuses}
            isLoading={loadingSyllabuses}
            isClearable
            placeholder="Select Syllabus"
            styles={customSelectStyles}
            menuPortalTarget={document.body}
          />
          <Select
            options={standards.map((item) => ({ value: item.id, label: item.name }))}
            value={standardFilter ? { value: standardFilter, label: standards.find((s) => s.id === standardFilter)?.name } : null}
            onChange={(option) => setStandardFilter(option?.value || '')}
            isDisabled={!syllabusFilter || loadingStandards}
            isLoading={loadingStandards}
            isClearable
            placeholder="Select Standard"
            styles={customSelectStyles}
            menuPortalTarget={document.body}
          />
          <Select
            options={chapters.map((item) => ({ value: item.id, label: item.name }))}
            value={chapterFilter ? { value: chapterFilter, label: chapters.find((c) => c.id === chapterFilter)?.name } : null}
            onChange={(option) => setChapterFilter(option?.value || '')}
            isDisabled={!standardFilter || loadingChapters}
            isLoading={loadingChapters}
            isClearable
            placeholder="Select Chapter"
            styles={customSelectStyles}
            menuPortalTarget={document.body}
          />
          <Select
            options={[
              { value: 'STICKY NOTES', label: 'Sticky Notes' },
              { value: 'READY RECKONER', label: 'Ready Reckoner' },
              { value: 'FLASHCARDS', label: 'Flashcards' },
              { value: 'MIND MAP', label: 'Mind Map' },
              { value: 'VISUAL EXPLAINERS', label: 'Visual Explainers' },
            ]}
            value={aidTypeFilter ? { value: aidTypeFilter, label: aidTypeFilter } : null}
            onChange={(option) => setAidTypeFilter(option?.value || '')}
            isClearable
            placeholder="Select Aid Type"
            styles={customSelectStyles}
            menuPortalTarget={document.body}
          />
          {hasActiveFilters && <S.ClearButton onClick={handleClearFilters}>Clear</S.ClearButton>}
        </S.FilterSection>

        {loading ? (
          <S.ContentGrid>
            {Array.from({ length: 6 }).map((_, index) => (
              <S.SkeletonCard key={index}>
                <S.SkeletonImage />
                <S.SkeletonContent>
                  <S.SkeletonTitle />
                  <S.SkeletonSubtitle />
                  <S.SkeletonMeta>
                    <S.SkeletonMetaItem />
                    <S.SkeletonMetaItem />
                  </S.SkeletonMeta>
                  <S.SkeletonActions>
                    <S.SkeletonButton />
                    <S.SkeletonButton style={{ flex: 0, width: '32px' }} />
                    <S.SkeletonButton style={{ flex: 0, width: '32px' }} />
                  </S.SkeletonActions>
                </S.SkeletonContent>
              </S.SkeletonCard>
            ))}
          </S.ContentGrid>
        ) : filteredContent.length === 0 ? (
          <S.EmptyState>
            <S.EmptyIcon>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>
                library_books
              </span>
            </S.EmptyIcon>
            <S.EmptyTitle>No content found</S.EmptyTitle>
            <S.EmptyText>
              {hasActiveFilters ? 'Try adjusting your filters' : 'Create your first adaptive teaching aid'}
            </S.EmptyText>
          </S.EmptyState>
        ) : (
          <S.ContentGrid>
            {filteredContent.map((item) => (
              <S.ContentCard key={item.id}>
                <S.CardImage bgClass={item.images && item.images.length > 0 ? '' : item.bgClass}>
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0.5rem 0.5rem 0 0',
                      }}
                    />
                  ) : (
                    <>
                      <S.CardImageContent>
                        <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>
                          {item.icon}
                        </span>
                      </S.CardImageContent>
                      <S.CardTag tagClass={item.tagClass}>{item.contentType}</S.CardTag>
                    </>
                  )}
                  {item.images && item.images.length > 0 && (
                    <S.CardTag tagClass={item.tagClass}>{item.contentType}</S.CardTag>
                  )}
                </S.CardImage>

                <S.CardContent>
                  <S.CardTitle>{item.title}</S.CardTitle>
                  <S.CardSubject>{item.subject}</S.CardSubject>

                  <S.CardMeta>
                    <S.CardMetaItem>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>
                        group
                      </span>
                      Used by {item.usedByClasses} classes
                    </S.CardMetaItem>
                    <S.CardMetaItem>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem', marginRight: '0.25rem' }}>
                        schedule
                      </span>
                      {item.createdAt}
                    </S.CardMetaItem>
                  </S.CardMeta>

                  <S.CardActions>
                    {/* <S.ActionButton onClick={() => handleAssign()}>Assign</S.ActionButton> */}
                    <S.IconButton onClick={() => handleEdit(item)} title="Edit">
                      <span className="material-symbols-outlined">edit</span>
                    </S.IconButton>
                    <S.MoreButton data-dropdown-id={item.id}>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === item.id ? null : item.id);
                      }}>
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                      {openMenuId === item.id && (
                        <S.DropdownMenu onClick={(e) => e.stopPropagation()}>
                          <S.DropdownItem onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(item);
                          }}>
                            <span className="material-symbols-outlined">download</span>
                            Download
                          </S.DropdownItem>
                          <S.DropdownItem onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item);
                          }}>
                            <span className="material-symbols-outlined">delete</span>
                            Delete
                          </S.DropdownItem>
                        </S.DropdownMenu>
                      )}
                    </S.MoreButton>
                  </S.CardActions>
                </S.CardContent>
              </S.ContentCard>
            ))}
          </S.ContentGrid>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
};
