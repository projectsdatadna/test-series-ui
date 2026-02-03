/**
 * Content Library Styles
 */

import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  background-color: #f5f7fa;
  padding: 20px;
  min-height: 100vh;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`;

export const HeaderLeft = styled.div``;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 5px;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

export const CreateButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatIcon = styled.span`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #4f46e5;
`;

export const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

export const StatDetail = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;

  @media (max-width: 1400px) {
    gap: 8px;
  }
`;

export const SearchBox = styled.div`
  width: 200px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  transition: all 0.2s;
  height: 32px;
  box-sizing: border-box;

  &:focus-within {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  svg {
    color: #9ca3af;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 13px;
    background-color: transparent;
    color: #1f2937;
    height: 100%;

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

export const FilterSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  min-width: 140px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

export const ClearButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  background-color: #ef4444;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background-color: #dc2626;
    border-color: #dc2626;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

export const ContentCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: visible;
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: white;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const CardImage = styled.div<{ bgClass: string }>`
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
  background: ${(props) => {
    const backgrounds: Record<string, string> = {
      'bg-mindmap': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'bg-flashcards': 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
      'bg-infographic': 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
      'bg-timeline': 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      'bg-genetics': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'bg-literary': 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
    };
    return backgrounds[props.bgClass] || backgrounds['bg-mindmap'];
  }};
  border-radius: 12px 12px 0 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardImageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: rgba(255, 255, 255, 0.4);
`;

export const CardTag = styled.span<{ tagClass: string }>`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background-color: ${(props) => {
    const colors: Record<string, string> = {
      'tag-mindmap': '#3b82f6',
      'tag-flashcards': '#a855f7',
      'tag-infographic': '#06b6d4',
      'tag-timeline': '#f59e0b',
    };
    return colors[props.tagClass] || colors['tag-mindmap'];
  }};
  color: white;
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 6px;
`;

export const CardSubject = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const CardMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #4f46e5;
  background-color: #eef2ff;
  color: #4f46e5;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;

  &:hover {
    background-color: #e0e7ff;
  }
`;

export const IconButton = styled.button`
  padding: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const MoreButton = styled.div`
  position: relative;
  display: inline-block;
  z-index: 100;

  button {
    padding: 8px;
    border: 1px solid #e5e7eb;
    background-color: white;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9fafb;
    }
  }
`;

export const DropdownMenu = styled.div`
  display: block;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 150px;
  margin-top: 4px;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 14px;
  border: none;
  background-color: transparent;
  color: #1a1a1a;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
  text-align: left;

  &:hover {
    background-color: #f9fafb;
  }

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }

  span {
    font-size: 16px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 60px;
  margin-bottom: 20px;
`;

export const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`;

export const EmptyText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const SkeletonCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #f3f4f6;
  border-radius: 12px 12px 0 0;
`;

export const SkeletonContent = styled.div`
  padding: 16px;
`;

export const SkeletonTitle = styled.div`
  height: 16px;
  background-color: #f3f4f6;
  border-radius: 4px;
  margin-bottom: 8px;
  width: 80%;
`;

export const SkeletonSubtitle = styled.div`
  height: 12px;
  background-color: #f3f4f6;
  border-radius: 4px;
  margin-bottom: 12px;
  width: 60%;
`;

export const SkeletonMeta = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SkeletonMetaItem = styled.div`
  height: 12px;
  background-color: #f3f4f6;
  border-radius: 4px;
  width: 100px;
`;

export const SkeletonActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const SkeletonButton = styled.div`
  height: 32px;
  background-color: #f3f4f6;
  border-radius: 6px;
  flex: 1;
`;
