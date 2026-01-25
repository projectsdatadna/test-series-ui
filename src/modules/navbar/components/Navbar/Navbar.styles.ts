import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
  padding: 0.75rem 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 4rem;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4f6ef7;
`;

export const LogoIcon = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  background-color: #4f6ef7;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
`;

export const LogoText = styled.h2`
  color: #111218;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.015em;
  margin: 0;
`;

export const SearchContainer = styled.label`
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  height: 2.5rem;
  max-width: 28rem;
  width: 24rem;
`;

export const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  align-items: stretch;
  border-radius: 0.75rem;
  height: 100%;
`;

export const SearchIcon = styled.div`
  color: #60688a;
  display: flex;
  background-color: #f3f4f6;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  border-radius: 0.75rem 0 0 0.75rem;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: #f3f4f6;
  color: #111218;
  font-size: 0.875rem;
  padding: 0 1rem;
  border-radius: 0 0.75rem 0.75rem 0;
  outline: none;

  &::placeholder {
    color: #60688a;
  }

  &:focus {
    outline: none;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #f3f4f6;
  color: #60688a;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #4f6ef7;
  }
`;

export const Divider = styled.div`
  height: 2rem;
  width: 1px;
  background-color: #d1d5db;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

export const UserInfo = styled.div`
  text-align: right;
`;

export const UserName = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: #111218;
  margin: 0;
`;

export const UserRole = styled.p`
  font-size: 0.625rem;
  color: #60688a;
  margin: 0;
`;

export const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 9999px;
  border: 2px solid rgba(79, 110, 247, 0.2);
  transition: border-color 0.2s;

  &:hover {
    border-color: #4f6ef7;
  }
`;

export const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  width: 16rem;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  overflow-y: auto;
  transition: transform 0.3s ease;
  position: fixed;
  left: 0;
  top: 4rem;
  height: calc(100vh - 4rem);
  z-index: 40;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    transform: translateX(${props => (props.isOpen ? '0' : '-100%')});
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

export const NavLink = styled.a<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  text-decoration: none;
  cursor: pointer;

  ${props =>
    props.isActive
      ? `
    background-color: rgba(79, 110, 247, 0.1);
    color: #4f6ef7;
  `
      : `
    color: #60688a;
    &:hover {
      background-color: #f9fafb;
      color: #4f6ef7;
    }
  `}
`;

export const NavIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavFooter = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  margin-left: 16rem;
  margin-top: 4rem;
  height: calc(100vh - 4rem);
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const ProfileDropdownContainer = styled.div`
  position: relative;
`;

export const ProfileDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  min-width: 12rem;
  z-index: 100;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateY(-0.5rem)')};
  transition: all 0.2s ease;
`;

export const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: #111218;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:first-child {
    border-radius: 0.75rem 0.75rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.75rem 0.75rem;
  }

  &:hover {
    background-color: #f3f4f6;
    color: #4f6ef7;
  }

  &.logout {
    color: #dc2626;
    border-top: 1px solid #e5e7eb;

    &:hover {
      background-color: #fee2e2;
      color: #b91c1c;
    }
  }
`;
