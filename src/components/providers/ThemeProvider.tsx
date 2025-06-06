'use client';

import { ReactNode, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme: themeMode } = useSelector((state: RootState) => state.ui);
  
  const theme = useMemo(() => {
    const prefersDarkMode = 
      themeMode === 'dark' || 
      (themeMode === 'system' && 
        typeof window !== 'undefined' && 
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    return createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
        },
        secondary: {
          main: '#dc004e',
          light: '#e33371',
          dark: '#9a0036',
        },
        success: {
          main: '#4caf50',
        },
        warning: {
          main: '#ff9800',
        },
        error: {
          main: '#f44336',
        },
        background: {
          default: prefersDarkMode ? '#121212' : '#fafafa',
          paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
        },
      },
      typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        h1: {
          fontSize: '2.5rem',
          fontWeight: 600,
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 600,
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 600,
        },
        h4: {
          fontSize: '1.5rem',
          fontWeight: 600,
        },
        h5: {
          fontSize: '1.25rem',
          fontWeight: 600,
        },
        h6: {
          fontSize: '1rem',
          fontWeight: 600,
        },
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 500,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              boxShadow: prefersDarkMode 
                ? '0 2px 8px rgba(0,0,0,0.4)' 
                : '0 2px 8px rgba(0,0,0,0.1)',
            },
          },
        },
      },
    });
  }, [themeMode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}