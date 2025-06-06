import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants/api';
import { 
  LoginDto, 
  RegisterDto, 
  AuthResponse, 
  ResetPasswordDto,
  ApiResponse 
} from '@/types/api';
import { User } from '@/types/models';

class AuthService {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  async register(userData: RegisterDto): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // ログアウトエラーは無視（ローカルでトークンを削除するため）
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
  }

  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      token,
    });
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
  }

  async resetPassword(data: ResetPasswordDto): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(API_ENDPOINTS.USERS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
  }
}

export const authService = new AuthService();