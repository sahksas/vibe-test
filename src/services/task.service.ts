import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants/api';
import { 
  CreateTaskDto, 
  UpdateTaskDto,
  TaskFilterParams,
  PaginatedResponse,
  ApiResponse
} from '@/types/api';
import { Task, TaskStatus, Attachment } from '@/types/models';

class TaskService {
  async getTasksByProject(
    projectId: string,
    params?: TaskFilterParams
  ): Promise<PaginatedResponse<Task>> {
    return apiClient.get<PaginatedResponse<Task>>(
      API_ENDPOINTS.TASKS.BY_PROJECT(projectId),
      { params }
    );
  }

  async getTaskById(id: string): Promise<Task> {
    const response = await apiClient.get<ApiResponse<Task>>(
      API_ENDPOINTS.TASKS.BY_ID(id)
    );
    return response.data;
  }

  async createTask(projectId: string, data: CreateTaskDto): Promise<Task> {
    const response = await apiClient.post<ApiResponse<Task>>(
      API_ENDPOINTS.TASKS.BY_PROJECT(projectId),
      data
    );
    return response.data;
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    const response = await apiClient.put<ApiResponse<Task>>(
      API_ENDPOINTS.TASKS.BY_ID(id),
      data
    );
    return response.data;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const response = await apiClient.patch<ApiResponse<Task>>(
      API_ENDPOINTS.TASKS.STATUS(id),
      { status }
    );
    return response.data;
  }

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.TASKS.BY_ID(id));
  }

  async assignTask(id: string, userId: string | null): Promise<Task> {
    const response = await apiClient.patch<ApiResponse<Task>>(
      API_ENDPOINTS.TASKS.ASSIGN(id),
      { userId }
    );
    return response.data;
  }

  async addLabels(taskId: string, labelIds: string[]): Promise<Task> {
    const response = await apiClient.post<ApiResponse<Task>>(
      API_ENDPOINTS.TASKS.LABELS(taskId),
      { labelIds }
    );
    return response.data;
  }

  async removeLabel(taskId: string, labelId: string): Promise<Task> {
    const response = await apiClient.delete<ApiResponse<Task>>(
      `${API_ENDPOINTS.TASKS.LABELS(taskId)}/${labelId}`
    );
    return response.data;
  }

  async uploadAttachment(
    taskId: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<Attachment> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.upload<ApiResponse<Attachment>>(
      API_ENDPOINTS.TASKS.ATTACHMENTS(taskId),
      formData,
      onProgress
    );
    return response.data;
  }

  async deleteAttachment(taskId: string, attachmentId: string): Promise<void> {
    await apiClient.delete(
      API_ENDPOINTS.TASKS.ATTACHMENT_BY_ID(taskId, attachmentId)
    );
  }

  async searchTasks(query: string, projectId?: string): Promise<Task[]> {
    const response = await apiClient.get<ApiResponse<Task[]>>(
      API_ENDPOINTS.SEARCH.TASKS,
      { params: { q: query, projectId } }
    );
    return response.data;
  }

  async getMyTasks(params?: TaskFilterParams): Promise<PaginatedResponse<Task>> {
    return apiClient.get<PaginatedResponse<Task>>(
      API_ENDPOINTS.TASKS.BASE,
      { params: { ...params, assigneeId: 'me' } }
    );
  }

  async getTodayTasks(): Promise<Task[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const response = await apiClient.get<PaginatedResponse<Task>>(
      API_ENDPOINTS.TASKS.BASE,
      {
        params: {
          dueDateFrom: today.toISOString(),
          dueDateTo: tomorrow.toISOString(),
          assigneeId: 'me',
        },
      }
    );
    return response.data;
  }

  async getOverdueTasks(): Promise<Task[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const response = await apiClient.get<PaginatedResponse<Task>>(
      API_ENDPOINTS.TASKS.BASE,
      {
        params: {
          dueDateTo: today.toISOString(),
          status: 'notStarted,inProgress',
          assigneeId: 'me',
        },
      }
    );
    return response.data;
  }
}

export const taskService = new TaskService();