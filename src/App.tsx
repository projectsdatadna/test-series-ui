import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from './hooks/useAppRedux';
import { selectIsAuthenticated } from './modules/auth';
import { AuthPage } from './modules/auth';
import { HomePage } from './pages/HomePage';
import './App.css';

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'assessment' | 'analytics'>('assessment');

  if (!isAuthenticated) {
    return (
      <>
        <AuthPage />
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
      </>
    );
  }

  return (
    <>
      <HomePage currentPage={currentPage} onPageChange={setCurrentPage} />
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
    </>
  );
};

export default App;
