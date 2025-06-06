import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants/api';
import { PaginatedResponse, ApiResponse } from '@/types/api';
import { Notification } from '@/types/models';

class NotificationService {
  async getNotifications(
    page = 1,
    limit = 20
  ): Promise<PaginatedResponse<Notification>> {
    return apiClient.get<PaginatedResponse<Notification>>(
      API_ENDPOINTS.NOTIFICATIONS.BASE,
      { params: { page, limit } }
    );
  }

  async getUnreadCount(): Promise<{ count: number }> {
    const response = await apiClient.get<ApiResponse<{ count: number }>>(
      API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT
    );
    return response.data;
  }

  async markAsRead(id: string): Promise<void> {
    await apiClient.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
  }

  async markAllAsRead(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  }

  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.NOTIFICATIONS.BY_ID(id));
  }
}

export const notificationService = new NotificationService();