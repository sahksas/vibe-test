import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchCurrentUser } from '@/store/auth/authSlice';
import { AUTH_TOKEN_KEY } from '@/constants/app';

interface UseAuthOptions {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export const useAuth = (options: UseAuthOptions = {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const { redirectTo = '/login', redirectIfFound = false } = options;

  useEffect(() => {
    // トークンがある場合は現在のユーザー情報を取得
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token && !user && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user, isLoading]);

  useEffect(() => {
    // リダイレクト処理
    if (!isLoading) {
      if (!isAuthenticated && !redirectIfFound) {
        router.push(redirectTo);
      }
      if (isAuthenticated && redirectIfFound) {
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, redirectIfFound, redirectTo, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
};

// 認証が必要なページで使用
export const useRequireAuth = (redirectTo = '/login') => {
  return useAuth({ redirectTo, redirectIfFound: false });
};

// 認証済みの場合リダイレクトするページで使用（ログインページなど）
export const useRedirectIfAuthenticated = (redirectTo = '/dashboard') => {
  return useAuth({ redirectTo, redirectIfFound: true });
};