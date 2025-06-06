'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { AUTH_TOKEN_KEY } from '@/constants/app';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // トークンの存在をチェック
    const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
    
    if (token || isAuthenticated) {
      // 認証済みの場合はダッシュボードへ
      router.push('/dashboard');
    } else {
      // 未認証の場合はログインへ
      router.push('/login');
    }
  }, [router, isAuthenticated]);

  // リダイレクト中のローディング表示
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
}