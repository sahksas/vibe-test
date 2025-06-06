import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import projectsReducer from './projects/projectsSlice';
import tasksReducer from './tasks/tasksSlice';
import notificationsReducer from './notifications/notificationsSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    notifications: notificationsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Dateオブジェクトなどのシリアライズ可能性チェックを無視
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user.createdAt', 'auth.user.updatedAt'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;