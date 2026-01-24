import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
  padding: 0.75rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
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

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 40;
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

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }
`;
