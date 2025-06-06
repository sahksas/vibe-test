import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { ApiError } from '@/types/api';
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/app';
import { API_ENDPOINTS, HTTP_STATUS } from '@/constants/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // リクエストインターセプター
    this.client.interceptors.request.use(
      (config) => {
        // 認証トークンを付与
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem(AUTH_TOKEN_KEY);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // レスポンスインターセプター
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError<ApiError>) => {
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          // リフレッシュトークンで再認証を試みる
          const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
          if (refreshToken && !error.config?.url?.includes('/auth/refresh')) {
            try {
              const response = await this.post<{ data: { accessToken: string; refreshToken?: string } }>(
                API_ENDPOINTS.AUTH.REFRESH, 
                { refreshToken }
              );
              
              const { accessToken, refreshToken: newRefreshToken } = response.data;
              localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
              if (newRefreshToken) {
                localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
              }

              // 元のリクエストを再実行
              if (error.config) {
                error.config.headers.Authorization = `Bearer ${accessToken}`;
                return this.client.request(error.config);
              }
            } catch {
              // リフレッシュ失敗時はログアウト処理
              localStorage.removeItem(AUTH_TOKEN_KEY);
              localStorage.removeItem(REFRESH_TOKEN_KEY);
              window.location.href = '/login';
            }
          } else {
            // リフレッシュトークンがない場合はログイン画面へ
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            window.location.href = '/login';
          }
        }

        // エラーメッセージの整形
        if (error.response?.data?.error) {
          const apiError = error.response.data.error;
          const errorMessage = apiError.message || 'エラーが発生しました';
          return Promise.reject(new Error(errorMessage));
        }

        return Promise.reject(error);
      }
    );
  }

  // 共通メソッド
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // ファイルアップロード用メソッド
  async upload<T>(
    url: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const response = await this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
    return response.data;
  }
}

export const apiClient = new ApiClient();