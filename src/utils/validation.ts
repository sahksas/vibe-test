// メールアドレスのバリデーション
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// パスワードのバリデーション
export const isValidPassword = (password: string): boolean => {
  // 8文字以上、英数字を含む
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

// パスワード強度チェック
export const getPasswordStrength = (password: string): {
  score: number;
  level: 'weak' | 'medium' | 'strong';
  feedback: string[];
} => {
  let score = 0;
  const feedback: string[] = [];

  // 長さチェック
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('8文字以上にしてください');
  }

  if (password.length >= 12) {
    score += 1;
  }

  // 小文字
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('小文字を含めてください');
  }

  // 大文字
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('大文字を含めてください');
  }

  // 数字
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('数字を含めてください');
  }

  // 特殊文字
  if (/[@$!%*#?&]/.test(password)) {
    score += 1;
  } else {
    feedback.push('特殊文字を含めることを推奨します');
  }

  let level: 'weak' | 'medium' | 'strong';
  if (score <= 2) {
    level = 'weak';
  } else if (score <= 4) {
    level = 'medium';
  } else {
    level = 'strong';
  }

  return { score, level, feedback };
};

// ユーザー名のバリデーション
export const isValidUsername = (username: string): boolean => {
  // 3-20文字、英数字とアンダースコアのみ
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// URLのバリデーション
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// 必須フィールドのチェック
export const isRequired = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

// 文字数制限チェック
export const isWithinLength = (
  value: string,
  min: number,
  max: number
): boolean => {
  const length = value.trim().length;
  return length >= min && length <= max;
};

// ファイルサイズチェック（バイト単位）
export const isValidFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

// ファイルタイプチェック
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

// 日付の有効性チェック
export const isValidDate = (date: string): boolean => {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
};

// 未来の日付チェック
export const isFutureDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj > new Date();
};

// 電話番号のバリデーション（日本）
export const isValidPhoneNumber = (phone: string): boolean => {
  // ハイフンあり・なし両対応
  const phoneRegex = /^(0[0-9]{1,4}-?[0-9]{1,4}-?[0-9]{3,4}|0[0-9]{9,10})$/;
  return phoneRegex.test(phone.replace(/[\s　]/g, ''));
};

// エラーメッセージの生成
export const getValidationError = (
  field: string,
  value: unknown,
  rules: {
    required?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: unknown) => boolean | string;
  }
): string | null => {
  if (rules.required && !isRequired(value)) {
    return `${field}は必須項目です`;
  }

  if (typeof value === 'string') {
    if (rules.email && !isValidEmail(value)) {
      return '有効なメールアドレスを入力してください';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `${field}は${rules.minLength}文字以上で入力してください`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${field}は${rules.maxLength}文字以下で入力してください`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return `${field}の形式が正しくありません`;
    }
  }

  if (rules.custom) {
    const result = rules.custom(value);
    if (typeof result === 'string') {
      return result;
    }
    if (!result) {
      return `${field}が無効です`;
    }
  }

  return null;
};