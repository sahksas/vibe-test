import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { THEME, STORAGE_KEYS } from '@/constants/app';

interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  isMobile: boolean;
  isTablet: boolean;
  taskModalOpen: boolean;
  projectModalOpen: boolean;
  selectedTaskId: string | null;
  selectedProjectId: string | null;
}

const getInitialTheme = (): 'light' | 'dark' | 'system' => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme && Object.values(THEME).includes(savedTheme as 'light' | 'dark' | 'system')) {
      return savedTheme as 'light' | 'dark' | 'system';
    }
  }
  return 'system';
};

const getInitialSidebarState = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED);
    return saved === 'true';
  }
  return false;
};

const initialState: UIState = {
  sidebarCollapsed: getInitialSidebarState(),
  theme: getInitialTheme(),
  isMobile: false,
  isTablet: false,
  taskModalOpen: false,
  projectModalOpen: false,
  selectedTaskId: null,
  selectedProjectId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          STORAGE_KEYS.SIDEBAR_COLLAPSED,
          state.sidebarCollapsed.toString()
        );
      }
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          STORAGE_KEYS.SIDEBAR_COLLAPSED,
          action.payload.toString()
        );
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.THEME, action.payload);
      }
    },
    setDeviceType: (
      state,
      action: PayloadAction<{ isMobile: boolean; isTablet: boolean }>
    ) => {
      state.isMobile = action.payload.isMobile;
      state.isTablet = action.payload.isTablet;
    },
    openTaskModal: (state, action: PayloadAction<string | null>) => {
      state.taskModalOpen = true;
      state.selectedTaskId = action.payload;
    },
    closeTaskModal: (state) => {
      state.taskModalOpen = false;
      state.selectedTaskId = null;
    },
    openProjectModal: (state, action: PayloadAction<string | null>) => {
      state.projectModalOpen = true;
      state.selectedProjectId = action.payload;
    },
    closeProjectModal: (state) => {
      state.projectModalOpen = false;
      state.selectedProjectId = null;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  setDeviceType,
  openTaskModal,
  closeTaskModal,
  openProjectModal,
  closeProjectModal,
} = uiSlice.actions;

export default uiSlice.reducer;