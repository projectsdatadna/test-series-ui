import React from 'react';
import { useSelector } from 'react-redux';
import authSelector from '../../../auth/selectors';
import type { UserRole } from '../../../auth/types';
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
} from './Navbar.styles';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const NAV_ITEMS: Record<UserRole, Array<{ label: string; icon: string; href: string }>> = {
  admin: [
    { label: 'Dashboard', icon: 'dashboard', href: '#' },
    { label: 'Classes', icon: 'school', href: '#' },
    { label: 'Question Bank', icon: 'quiz', href: '#' },
    { label: 'Assessment Builder', icon: 'construction', href: '#' },
    { label: 'Test Library', icon: 'library_books', href: '#' },
    { label: 'Revision Kit', icon: 'inventory_2', href: '#' },
    { label: 'Remedial Lab', icon: 'science', href: '#' },
    { label: 'Students', icon: 'group', href: '#' },
    { label: 'Reports', icon: 'description', href: '#' },
    { label: 'Analytics', icon: 'monitoring', href: '#' },
    { label: 'Settings', icon: 'settings', href: '#' },
    { label: 'Support', icon: 'support_agent', href: '#' },
  ],
  teacher: [
    { label: 'Dashboard', icon: 'dashboard', href: '#' },
    { label: 'Classes', icon: 'groups', href: '#' },
    { label: 'Question Bank', icon: 'database', href: '#' },
    { label: 'Assessment Builder', icon: 'construction', href: '#' },
    { label: 'Test Library', icon: 'library_books', href: '#' },
    { label: 'Revision Kit', icon: 'inventory_2', href: '#' },
    { label: 'Remedial Lab', icon: 'healing', href: '#' },
    { label: 'Students', icon: 'person', href: '#' },
    { label: 'Reports', icon: 'description', href: '#' },
    { label: 'Analytics', icon: 'bar_chart', href: '#' },
  ],
  student: [
    { label: 'Dashboard', icon: 'dashboard', href: '#' },
    { label: 'My Courses', icon: 'school', href: '#' },
    { label: 'Active Tests', icon: 'assignment', href: '#' },
    { label: 'Past Results', icon: 'history_edu', href: '#' },
    { label: 'AI Learning Path', icon: 'auto_fix_high', href: '#' },
    { label: 'Revision Kit', icon: 'inventory_2', href: '#' },
    { label: 'Practice Lab', icon: 'psychology', href: '#' },
    { label: 'Achievements', icon: 'military_tech', href: '#' },
    { label: 'Performance Analytics', icon: 'bar_chart', href: '#' },
    { label: 'Study Groups', icon: 'forum', href: '#' },
    { label: 'Schedule', icon: 'event', href: '#' },
  ],
  parent: [
    { label: 'Dashboard', icon: 'dashboard', href: '#' },
    { label: 'My Children', icon: 'family_restroom', href: '#' },
    { label: 'Performance', icon: 'trending_up', href: '#' },
    { label: 'Reports', icon: 'description', href: '#' },
  ],
};

export const Navbar: React.FC<NavbarProps> = ({ children, isOpen }) => {
  const user = useSelector(authSelector.getUser);
  const roleId = useSelector(authSelector.getUserRole) as UserRole | undefined;
  console.log('[Navbar] roleId:', roleId);


  const navItems = roleId && roleId in NAV_ITEMS ? NAV_ITEMS[roleId] : [];
  
  console.log(navItems,'navitems')
  const getRoleDisplayName = (role: UserRole): string => {
    const roleNames: Record<UserRole, string> = {
      admin: 'Administrator',
      teacher: 'Educator',
      student: 'Student',
      parent: 'Parent',
    };
    return roleNames[role];
  };

  console.log('[Navbar] roleId:', roleId);
  console.log('[Navbar] navItems:', navItems);

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
          <UserSection>
            <UserInfo>
              <UserName>{user?.name || 'User'}</UserName>
              <UserRoleText>{roleId ? getRoleDisplayName(roleId) : 'User'}</UserRoleText>
            </UserInfo>
            <UserAvatar style={{ backgroundImage: 'url(https://via.placeholder.com/40)' }} />
          </UserSection>
        </RightSection>
      </HeaderContainer>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SidebarContainer isOpen={isOpen}>
          <NavMenu>
            {navItems && navItems.length > 0 ? (
              navItems.map((item) => (
                <NavLink key={item.label} href={item.href} isActive={item.label === 'Dashboard'}>
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
      </div>
    </>
  );
};
