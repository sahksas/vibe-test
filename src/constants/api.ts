// APIエンドポイント定義
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
const API_VERSION = '/v1';
const API_PREFIX = `${API_BASE}${API_VERSION}`;

export const API_ENDPOINTS = {
  // 認証
  AUTH: {
    LOGIN: `${API_PREFIX}/auth/login`,
    REGISTER: `${API_PREFIX}/auth/register`,
    LOGOUT: `${API_PREFIX}/auth/logout`,
    REFRESH: `${API_PREFIX}/auth/refresh`,
    VERIFY_EMAIL: `${API_PREFIX}/auth/verify-email`,
    FORGOT_PASSWORD: `${API_PREFIX}/auth/forgot-password`,
    RESET_PASSWORD: `${API_PREFIX}/auth/reset-password`,
    ME: `${API_PREFIX}/auth/me`,
  },

  // ユーザー
  USERS: {
    BASE: `${API_PREFIX}/users`,
    BY_ID: (id: string) => `${API_PREFIX}/users/${id}`,
    PROFILE: `${API_PREFIX}/users/profile`,
    SETTINGS: `${API_PREFIX}/users/settings`,
    CHANGE_PASSWORD: `${API_PREFIX}/users/change-password`,
    UPLOAD_AVATAR: `${API_PREFIX}/users/avatar`,
    SEARCH: `${API_PREFIX}/users/search`,
  },

  // プロジェクト
  PROJECTS: {
    BASE: `${API_PREFIX}/projects`,
    BY_ID: (id: string) => `${API_PREFIX}/projects/${id}`,
    MEMBERS: (id: string) => `${API_PREFIX}/projects/${id}/members`,
    MEMBER_BY_ID: (projectId: string, memberId: string) => 
      `${API_PREFIX}/projects/${projectId}/members/${memberId}`,
    INVITE: (id: string) => `${API_PREFIX}/projects/${id}/invite`,
    STATS: (id: string) => `${API_PREFIX}/projects/${id}/stats`,
    ARCHIVE: (id: string) => `${API_PREFIX}/projects/${id}/archive`,
    UNARCHIVE: (id: string) => `${API_PREFIX}/projects/${id}/unarchive`,
  },

  // タスク
  TASKS: {
    BASE: `${API_PREFIX}/tasks`,
    BY_ID: (id: string) => `${API_PREFIX}/tasks/${id}`,
    BY_PROJECT: (projectId: string) => `${API_PREFIX}/projects/${projectId}/tasks`,
    STATUS: (id: string) => `${API_PREFIX}/tasks/${id}/status`,
    ASSIGN: (id: string) => `${API_PREFIX}/tasks/${id}/assign`,
    LABELS: (id: string) => `${API_PREFIX}/tasks/${id}/labels`,
    ATTACHMENTS: (id: string) => `${API_PREFIX}/tasks/${id}/attachments`,
    ATTACHMENT_BY_ID: (taskId: string, attachmentId: string) => 
      `${API_PREFIX}/tasks/${taskId}/attachments/${attachmentId}`,
  },

  // コメント
  COMMENTS: {
    BY_TASK: (taskId: string) => `${API_PREFIX}/tasks/${taskId}/comments`,
    BY_ID: (taskId: string, commentId: string) => 
      `${API_PREFIX}/tasks/${taskId}/comments/${commentId}`,
  },

  // 通知
  NOTIFICATIONS: {
    BASE: `${API_PREFIX}/notifications`,
    BY_ID: (id: string) => `${API_PREFIX}/notifications/${id}`,
    MARK_READ: (id: string) => `${API_PREFIX}/notifications/${id}/read`,
    MARK_ALL_READ: `${API_PREFIX}/notifications/read-all`,
    UNREAD_COUNT: `${API_PREFIX}/notifications/unread-count`,
  },

  // ダッシュボード
  DASHBOARD: {
    PERSONAL: `${API_PREFIX}/dashboard/personal`,
    PROJECT: (projectId: string) => `${API_PREFIX}/dashboard/project/${projectId}`,
    ACTIVITIES: `${API_PREFIX}/dashboard/activities`,
  },

  // ラベル
  LABELS: {
    BY_PROJECT: (projectId: string) => `${API_PREFIX}/projects/${projectId}/labels`,
    BY_ID: (projectId: string, labelId: string) => 
      `${API_PREFIX}/projects/${projectId}/labels/${labelId}`,
  },

  // ファイルアップロード
  UPLOAD: {
    FILE: `${API_PREFIX}/upload/file`,
    IMAGE: `${API_PREFIX}/upload/image`,
  },

  // 検索
  SEARCH: {
    GLOBAL: `${API_PREFIX}/search`,
    TASKS: `${API_PREFIX}/search/tasks`,
    PROJECTS: `${API_PREFIX}/search/projects`,
    USERS: `${API_PREFIX}/search/users`,
  },
};

// HTTPメソッド
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// HTTPステータスコード
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// APIエラーコード
export const API_ERROR_CODES = {
  // 認証関連
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  
  // バリデーション
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',
  DUPLICATE_USERNAME: 'DUPLICATE_USERNAME',
  
  // リソース関連
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  
  // ファイル関連
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  
  // レート制限
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // サーバーエラー
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;