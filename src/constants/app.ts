// アプリケーション全体の定数
export const APP_NAME = 'TaskFlow';

// 認証関連
export const AUTH_TOKEN_KEY = 'taskflow_auth_token';
export const REFRESH_TOKEN_KEY = 'taskflow_refresh_token';
export const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24時間

// タスク関連の定数
export const TASK_STATUS = {
  NOT_STARTED: 'notStarted',
  IN_PROGRESS: 'inProgress',
  COMPLETED: 'completed',
} as const;

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.NOT_STARTED]: '未着手',
  [TASK_STATUS.IN_PROGRESS]: '進行中',
  [TASK_STATUS.COMPLETED]: '完了',
} as const;

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: '低',
  [TASK_PRIORITY.MEDIUM]: '中',
  [TASK_PRIORITY.HIGH]: '高',
} as const;

// プロジェクトカラー
export const PROJECT_COLORS = [
  '#f44336', // Red
  '#e91e63', // Pink
  '#9c27b0', // Purple
  '#673ab7', // Deep Purple
  '#3f51b5', // Indigo
  '#2196f3', // Blue
  '#03a9f4', // Light Blue
  '#00bcd4', // Cyan
  '#009688', // Teal
  '#4caf50', // Green
  '#8bc34a', // Light Green
  '#cddc39', // Lime
  '#ffeb3b', // Yellow
  '#ffc107', // Amber
  '#ff9800', // Orange
  '#ff5722', // Deep Orange
];

// ファイルアップロード
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 5,
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
  ],
};

// ページネーション
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// 通知タイプ
export const NOTIFICATION_TYPE = {
  TASK_ASSIGNED: 'taskAssigned',
  TASK_COMPLETED: 'taskCompleted',
  TASK_DUE_SOON: 'taskDueSoon',
  COMMENT_MENTION: 'commentMention',
  PROJECT_INVITE: 'projectInvite',
} as const;

export const NOTIFICATION_TYPE_LABELS = {
  [NOTIFICATION_TYPE.TASK_ASSIGNED]: 'タスクが割り当てられました',
  [NOTIFICATION_TYPE.TASK_COMPLETED]: 'タスクが完了しました',
  [NOTIFICATION_TYPE.TASK_DUE_SOON]: 'タスクの期限が近づいています',
  [NOTIFICATION_TYPE.COMMENT_MENTION]: 'コメントでメンションされました',
  [NOTIFICATION_TYPE.PROJECT_INVITE]: 'プロジェクトに招待されました',
} as const;

// 日付フォーマット
export const DATE_FORMAT = {
  DISPLAY: 'yyyy/MM/dd',
  DISPLAY_WITH_TIME: 'yyyy/MM/dd HH:mm',
  API: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  TIME_ONLY: 'HH:mm',
};

// ロール
export const USER_ROLE = {
  ADMIN: 'admin',
  MEMBER: 'member',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLE.ADMIN]: '管理者',
  [USER_ROLE.MEMBER]: 'メンバー',
} as const;

// テーマ
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// 言語
export const LANGUAGE = {
  JA: 'ja',
  EN: 'en',
} as const;

// ローカルストレージキー
export const STORAGE_KEYS = {
  THEME: 'taskflow_theme',
  LANGUAGE: 'taskflow_language',
  SIDEBAR_COLLAPSED: 'taskflow_sidebar_collapsed',
  RECENT_PROJECTS: 'taskflow_recent_projects',
};