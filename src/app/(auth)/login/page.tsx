'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { login, clearError } from '@/store/auth/authSlice';
import { useRedirectIfAuthenticated } from '@/hooks/useAuth';
import { isValidEmail } from '@/utils/validation';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  // 認証済みの場合はダッシュボードへリダイレクト
  useRedirectIfAuthenticated('/dashboard');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
    
    // エラーをクリア
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'メールアドレスを入力してください';
    } else if (!isValidEmail(formData.email)) {
      errors.email = '有効なメールアドレスを入力してください';
    }

    if (!formData.password) {
      errors.password = 'パスワードを入力してください';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await dispatch(login({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    }));

    if (login.fulfilled.match(result)) {
      router.push('/dashboard');
    }
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            TaskFlow
          </Typography>
          <Typography variant="body1" color="text.secondary">
            アカウントにログイン
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="メールアドレス"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            margin="normal"
            autoComplete="email"
            autoFocus
          />

          <TextField
            fullWidth
            label="パスワード"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            margin="normal"
            autoComplete="current-password"
          />

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 1,
            mb: 3 
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="ログイン状態を保持"
            />
            <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                パスワードをお忘れですか？
              </Typography>
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'ログイン'
            )}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>または</Divider>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            アカウントをお持ちでない方は
          </Typography>
          <Link href="/register" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', mt: 1 }}>
              新規登録はこちら
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}