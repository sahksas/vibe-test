// API共通の型定義
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth関連のDTO
export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterDto {
  email: string;
  username: string;
  displayName: string;
  password: string;
}

export interface AuthResponse {
  user: import('./models').User;
  accessToken: string;
  refreshToken?: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

// Project関連のDTO
export interface CreateProjectDto {
  name: string;
  description?: string;
  color: string;
  isPublic: boolean;
  startDate?: string;
  endDate?: string;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  archived?: boolean;
}

export interface InviteProjectMemberDto {
  email: string;
  role: 'admin' | 'member';
}

// Task関連のDTO
export interface CreateTaskDto {
  title: string;
  description?: string;
  priority: import('./models').TaskPriority;
  dueDate?: string;
  assigneeId?: string;
  labelIds?: string[];
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  status?: import('./models').TaskStatus;
}

export interface TaskFilterParams extends PaginationParams {
  status?: import('./models').TaskStatus;
  priority?: import('./models').TaskPriority;
  assigneeId?: string;
  labelIds?: string[];
  dueDateFrom?: string;
  dueDateTo?: string;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

// Comment関連のDTO
export interface CreateCommentDto {
  content: string;
  mentions?: string[]; // ユーザーID配列
}

export interface UpdateCommentDto {
  content: string;
  mentions?: string[];
}

// Settings関連のDTO
export interface UpdateUserSettingsDto {
  emailNotifications?: {
    taskAssigned?: boolean;
    taskCompleted?: boolean;
    commentMention?: boolean;
    dailySummary?: boolean;
  };
  notificationTime?: string;
  language?: 'ja' | 'en';
  theme?: 'light' | 'dark' | 'system';
}

export interface UpdateProfileDto {
  displayName?: string;
  bio?: string;
  timezone?: string;
}

// File Upload関連
export interface FileUploadResponse {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
}