import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authSelector from '../../../auth/selectors';
import navbarSelector from '../../selectors';
import type { UserRole } from '../../../auth/types';
import type { PageId } from '../../types';
import { logoutUser } from '../../../auth/actions';
import { setCurrentPage } from '../../actions';
import {
  HeaderContainer,
  LeftSection,
  LogoContainer,
  LogoIcon,
  LogoText,
  SearchContainer,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  RightSection,
  IconButton,
  Divider,
  UserSection,
  UserInfo,
  UserName,
  UserRole as UserRoleText,
  UserAvatar,
  SidebarContainer,
  NavMenu,
  NavLink,
  NavIcon,
  NavFooter,
  MainContent,
  ProfileDropdownContainer,
  ProfileDropdown,
  DropdownItem,
} from './Navbar.styles';

interface NavbarProps {
  children: React.ReactNode;
  isOpen: boolean;
}

interface NavItemConfig {
  label: string;
  icon: string;
  href: string;
  pageId: PageId;
}

const NAV_ITEMS: Record<UserRole, NavItemConfig[]> = {
  admin: [
    { label: 'Dashboard', icon: 'dashboard', href: '#', pageId: 'dashboard' },
    { label: 'Classes', icon: 'school', href: '#', pageId: 'classes' },
    { label: 'Question Bank', icon: 'quiz', href: '#', pageId: 'question-bank' },
    { label: 'Assessment Builder', icon: 'construction', href: '#', pageId: 'assessment-builder' },
    { label: 'Test Library', icon: 'library_books', href: '#', pageId: 'test-library' },
    { label: 'Revision Kit', icon: 'inventory_2', href: '#', pageId: 'revision-kit' },
    { label: 'Remedial Lab', icon: 'science', href: '#', pageId: 'remedial-lab' },
    { label: 'Adaptive Content', icon: 'layers', href: '#', pageId: 'adaptive-content' },
    { label: 'Students', icon: 'group', href: '#', pageId: 'students' },
    { label: 'Reports', icon: 'description', href: '#', pageId: 'reports' },
    { label: 'Analytics', icon: 'monitoring', href: '#', pageId: 'analytics' },
    { label: 'Settings', icon: 'settings', href: '#', pageId: 'settings' },
    { label: 'Support', icon: 'support_agent', href: '#', pageId: 'support' },
  ],
  teacher: [
    { label: 'Dashboard', icon: 'dashboard', href: '#', pageId: 'dashboard' },
    { label: 'Classes', icon: 'groups', href: '#', pageId: 'classes' },
    { label: 'Question Bank', icon: 'database', href: '#', pageId: 'question-bank' },
    { label: 'Assessment Builder', icon: 'construction', href: '#', pageId: 'assessment-builder' },
    { label: 'Test Library', icon: 'library_books', href: '#', pageId: 'test-library' },
    { label: 'Revision Kit', icon: 'inventory_2', href: '#', pageId: 'revision-kit' },
    { label: 'Remedial Lab', icon: 'healing', href: '#', pageId: 'remedial-lab' },
    { label: 'Adaptive Content', icon: 'layers', href: '#', pageId: 'adaptive-content' },
    { label: 'Students', icon: 'person', href: '#', pageId: 'students' },
    { label: 'Reports', icon: 'description', href: '#', pageId: 'reports' },
    { label: 'Analytics', icon: 'bar_chart', href: '#', pageId: 'analytics' },
  ],
  student: [
    { label: 'Dashboard', icon: 'dashboard', href: '#', pageId: 'dashboard' },
    { label: 'My Courses', icon: 'school', href: '#', pageId: 'my-courses' },
    { label: 'Active Tests', icon: 'assignment', href: '#', pageId: 'active-tests' },
    { label: 'Past Results', icon: 'history_edu', href: '#', pageId: 'past-results' },
    { label: 'AI Learning Path', icon: 'auto_fix_high', href: '#', pageId: 'ai-learning-path' },
    { label: 'Revision Kit', icon: 'inventory_2', href: '#', pageId: 'revision-kit' },
    { label: 'Practice Lab', icon: 'psychology', href: '#', pageId: 'practice-lab' },
    { label: 'Achievements', icon: 'military_tech', href: '#', pageId: 'achievements' },
    { label: 'Performance Analytics', icon: 'bar_chart', href: '#', pageId: 'analytics' },
    { label: 'Study Groups', icon: 'forum', href: '#', pageId: 'study-groups' },
    { label: 'Schedule', icon: 'event', href: '#', pageId: 'schedule' },
  ],
  parent: [
    { label: 'Dashboard', icon: 'dashboard', href: '#', pageId: 'dashboard' },
    { label: 'My Children', icon: 'family_restroom', href: '#', pageId: 'my-children' },
    { label: 'Performance', icon: 'trending_up', href: '#', pageId: 'performance' },
    { label: 'Reports', icon: 'description', href: '#', pageId: 'reports' },
  ],
};

export const Navbar: React.FC<NavbarProps> = ({ children, isOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const user = useSelector(authSelector.getUser);
  const roleId = useSelector(authSelector.getUserRole) as UserRole | undefined;
  const currentPage = useSelector(navbarSelector.getCurrentPage);

  const navItems = roleId && roleId in NAV_ITEMS ? NAV_ITEMS[roleId] : [];

  const handleNavClick = (pageId: PageId, e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setCurrentPage(pageId) as any);
  };

  const getRoleDisplayName = (role: UserRole): string => {
    const roleNames: Record<UserRole, string> = {
      admin: 'Administrator',
      teacher: 'Educator',
      student: 'Student',
      parent: 'Parent',
    };
    return roleNames[role];
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <LogoContainer>
            <LogoIcon>
              <span className="material-symbols-outlined">auto_awesome</span>
            </LogoIcon>
            <LogoText>Test Series AI</LogoText>
          </LogoContainer>
          <SearchContainer>
            <SearchWrapper>
              <SearchIcon>
                <span className="material-symbols-outlined">search</span>
              </SearchIcon>
              <SearchInput placeholder="Search..." />
            </SearchWrapper>
          </SearchContainer>
        </LeftSection>

        <RightSection>
          <IconButton>
            <span className="material-symbols-outlined">notifications</span>
          </IconButton>
          <Divider />
          <ProfileDropdownContainer ref={dropdownRef}>
            <UserSection onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <UserInfo>
                <UserName>{user?.name || 'User'}</UserName>
                <UserRoleText>{roleId ? getRoleDisplayName(roleId) : 'User'}</UserRoleText>
              </UserInfo>
              <UserAvatar style={{ backgroundImage: 'url(https://via.placeholder.com/40)' }} />
            </UserSection>
            <ProfileDropdown isOpen={isDropdownOpen}>
              <DropdownItem onClick={() => setIsDropdownOpen(false)}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                  person
                </span>
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => setIsDropdownOpen(false)}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                  settings
                </span>
                Settings
              </DropdownItem>
              <DropdownItem className="logout" onClick={handleLogout}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                  logout
                </span>
                Logout
              </DropdownItem>
            </ProfileDropdown>
          </ProfileDropdownContainer>
        </RightSection>
      </HeaderContainer>

      <SidebarContainer isOpen={isOpen}>
        <NavMenu>
          {navItems && navItems.length > 0 ? (
            navItems.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                isActive={currentPage === item.pageId}
                onClick={(e) => handleNavClick(item.pageId, e)}
              >
                <NavIcon>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                    {item.icon}
                  </span>
                </NavIcon>
                {item.label}
              </NavLink>
            ))
          ) : (
            <div style={{ padding: '1rem', color: '#60688a', fontSize: '0.875rem' }}>
              No menu items available
            </div>
          )}
        </NavMenu>

        <NavFooter>
          <NavLink href="#" isActive={false}>
            <NavIcon>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                settings
              </span>
            </NavIcon>
            Settings
          </NavLink>
          <NavLink href="#" isActive={false}>
            <NavIcon>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                contact_support
              </span>
            </NavIcon>
            Support
          </NavLink>
        </NavFooter>
      </SidebarContainer>

      <MainContent>{children}</MainContent>
    </>
  );
};
