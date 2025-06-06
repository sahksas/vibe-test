// User関連の型定義
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  profileImage?: string;
  bio?: string;
  timezone: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRole {
  id: string;
  userId: string;
  projectId: string;
  role: 'admin' | 'member';
  createdAt: Date;
}

// Project関連の型定義
export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  isPublic: boolean;
  startDate?: Date;
  endDate?: Date;
  archived: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  user?: User;
  role: 'admin' | 'member';
  joinedAt: Date;
}

// Task関連の型定義
export type TaskStatus = 'notStarted' | 'inProgress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  assigneeId?: string;
  assignee?: User;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  labels: Label[];
  attachments: Attachment[];
  commentCount: number;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  projectId: string;
}

export interface Attachment {
  id: string;
  taskId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

// Comment関連の型定義
export interface Comment {
  id: string;
  taskId: string;
  content: string;
  authorId: string;
  author?: User;
  mentions: string[]; // ユーザーID配列
  edited: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Notification関連の型定義
export type NotificationType = 
  | 'taskAssigned'
  | 'taskCompleted'
  | 'taskDueSoon'
  | 'commentMention'
  | 'projectInvite';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  relatedTaskId?: string;
  relatedProjectId?: string;
  createdAt: Date;
}

// Dashboard関連の型定義
export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  todayTasks: Task[];
  weekTasks: Task[];
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  userId: string;
  user?: User;
  action: string;
  entityType: 'task' | 'project' | 'comment';
  entityId: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface ProjectStats {
  projectId: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  notStartedTasks: number;
  memberCount: number;
  tasksByStatus: Record<TaskStatus, number>;
  tasksByPriority: Record<TaskPriority, number>;
  tasksByMember: Array<{
    userId: string;
    user?: User;
    taskCount: number;
    completedCount: number;
  }>;
}

// Settings関連の型定義
export interface UserSettings {
  userId: string;
  emailNotifications: {
    taskAssigned: boolean;
    taskCompleted: boolean;
    commentMention: boolean;
    dailySummary: boolean;
  };
  notificationTime: string; // HH:mm format
  language: 'ja' | 'en';
  theme: 'light' | 'dark' | 'system';
}