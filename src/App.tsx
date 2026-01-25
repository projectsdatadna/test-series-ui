import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import authSelector from './modules/auth/selectors';
import navbarSelector from './modules/navbar/selectors';
import { AuthPage } from './modules/auth/components/AuthPage';
import { Navbar } from './modules/navbar/components/Navbar';
import { AdminDashboard } from './modules/adminDashboard/components/AdminDashboard';
import { TeacherDashboard } from './modules/teacherDashboard/components/TeacherDashboard';
import { StudentDashboard } from './modules/studentDashboard/components/StudentDashboard';
import { AssessmentBuilder } from './modules/assessmentBuilder/components/AssessmentBuilder';
import { RemedialLab } from './modules/remedialLab/components/RemedialLab';
import { AdaptiveContent } from './modules/adaptiveContent/components/AdaptiveContent';
import { AssessmentConfigurator } from './modules/assessmentConfigurator/components/AssessmentConfigurator';
import { setRoleId, loginSuccess } from './modules/auth/actions';
import { storageManager } from './utils/storage';
import type { UserRole } from './modules/auth/types';
import type { PageId } from './modules/navbar/types';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector.getIsAuthenticated);
  const roleId = useSelector(authSelector.getUserRole) as UserRole | undefined;
  const navbarIsOpen = useSelector(navbarSelector.getIsOpen);
  const currentPage = useSelector(navbarSelector.getCurrentPage);

  // Check localStorage on app initialization (only once on mount)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const authData = storageManager.getAuthData();

    console.log('[App] Checking localStorage for authToken:', token ? 'Found' : 'Not found');
    console.log('[App] Checking localStorage for authData:', authData ? 'Found' : 'Not found');

    if (token && authData) {
      console.log('[App] Auth data found in localStorage, restoring...');

      // Restore user data first
      if (authData.user) {
        dispatch(loginSuccess(authData.user) as any);
        console.log('[App] Restored user data:', authData.user);
      }

      // Restore roleId
      if (authData.roleId) {
        dispatch(setRoleId(authData.roleId) as any);
        console.log('[App] Restored roleId:', authData.roleId);
      }
    }
  }, []); // Empty dependency array - run only once on mount

  const renderPage = (pageId: PageId) => {
    // Shared pages for admin and teacher
    if (roleId === 'admin' || roleId === 'teacher') {
      switch (pageId) {
        case 'assessment-builder':
          return <AssessmentBuilder />;
        case 'assessment-configurator':
          return <AssessmentConfigurator />;
        case 'remedial-lab':
          return <RemedialLab />;
        case 'adaptive-content':
          return <AdaptiveContent />;
        default:
          break;
      }
    }

    // Role-specific default dashboard
    switch (roleId) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <StudentDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  const renderDashboard = () => {
    return renderPage(currentPage);
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #10b981',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #ef4444',
            },
          },
        }}
      />
      {isAuthenticated ? <Navbar isOpen={navbarIsOpen}>{renderDashboard()}</Navbar> : <AuthPage />}
    </>
  );
};

export default App;
