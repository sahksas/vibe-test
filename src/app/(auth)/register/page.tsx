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
  Divider,
  LinearProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { register, clearError } from '@/store/auth/authSlice';
import { useRedirectIfAuthenticated } from '@/hooks/useAuth';
import { 
  isValidEmail, 
  isValidPassword, 
  isValidUsername,
  getPasswordStrength 
} from '@/utils/validation';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  // 認証済みの場合はダッシュボードへリダイレクト
  useRedirectIfAuthenticated('/dashboard');

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    displayName: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState<ReturnType<typeof getPasswordStrength> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // パスワード強度チェック
    if (name === 'password') {
      setPasswordStrength(value ? getPasswordStrength(value) : null);
    }
    
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

    if (!formData.username) {
      errors.username = 'ユーザー名を入力してください';
    } else if (!isValidUsername(formData.username)) {
      errors.username = 'ユーザー名は3-20文字の英数字とアンダースコアのみ使用できます';
    }

    if (!formData.displayName) {
      errors.displayName = '表示名を入力してください';
    } else if (formData.displayName.length < 2 || formData.displayName.length > 50) {
      errors.displayName = '表示名は2-50文字で入力してください';
    }

    if (!formData.password) {
      errors.password = 'パスワードを入力してください';
    } else if (!isValidPassword(formData.password)) {
      errors.password = 'パスワードは8文字以上で、英数字を含む必要があります';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'パスワード（確認）を入力してください';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'パスワードが一致しません';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await dispatch(register({
      email: formData.email,
      username: formData.username,
      displayName: formData.displayName,
      password: formData.password,
    }));

    if (register.fulfilled.match(result)) {
      router.push('/dashboard');
    }
  };

  const getPasswordStrengthColor = (level: string) => {
    switch (level) {
      case 'strong': return 'success';
      case 'medium': return 'warning';
      case 'weak': return 'error';
      default: return 'error';
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
            新規アカウント登録
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
            label="ユーザー名"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!validationErrors.username}
            helperText={validationErrors.username || '英数字とアンダースコアのみ使用可能'}
            margin="normal"
            autoComplete="username"
          />

          <TextField
            fullWidth
            label="表示名"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            error={!!validationErrors.displayName}
            helperText={validationErrors.displayName || 'チーム内で表示される名前'}
            margin="normal"
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
            autoComplete="new-password"
          />

          {passwordStrength && formData.password && (
            <Box sx={{ mt: 1, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  パスワード強度:
                </Typography>
                <Typography 
                  variant="caption" 
                  color={`${getPasswordStrengthColor(passwordStrength.level)}.main`}
                  fontWeight="bold"
                >
                  {passwordStrength.level === 'strong' && '強'}
                  {passwordStrength.level === 'medium' && '中'}
                  {passwordStrength.level === 'weak' && '弱'}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(passwordStrength.score / 6) * 100}
                color={getPasswordStrengthColor(passwordStrength.level)}
                sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
              />
            </Box>
          )}

          <TextField
            fullWidth
            label="パスワード（確認）"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!validationErrors.confirmPassword}
            helperText={validationErrors.confirmPassword}
            margin="normal"
            autoComplete="new-password"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'アカウント作成'
            )}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>または</Divider>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            すでにアカウントをお持ちの方は
          </Typography>
          <Link href="/login" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', mt: 1 }}>
              ログインはこちら
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}