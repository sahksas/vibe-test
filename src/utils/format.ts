// 数値をカンマ区切りでフォーマット
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ja-JP');
};

// ファイルサイズを読みやすい形式に変換
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 名前のイニシャルを取得
export const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// メールアドレスをマスク
export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (!domain) return email;

  const maskedLocal = localPart.length > 2
    ? localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1)
    : localPart;

  return `${maskedLocal}@${domain}`;
};

// URLからドメインを抽出
export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return url;
  }
};

// テキストを省略
export const truncateText = (
  text: string,
  maxLength: number,
  suffix = '...'
): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

// HTMLタグを除去
export const stripHtml = (html: string): string => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

// パーセンテージを計算
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// 進捗率を色に変換
export const getProgressColor = (percentage: number): string => {
  if (percentage < 25) return '#f44336'; // Red
  if (percentage < 50) return '#ff9800'; // Orange
  if (percentage < 75) return '#ffeb3b'; // Yellow
  return '#4caf50'; // Green
};

// タスクの優先度を色に変換
export const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'high':
      return '#f44336'; // Red
    case 'medium':
      return '#ff9800'; // Orange
    case 'low':
      return '#4caf50'; // Green
    default:
      return '#9e9e9e'; // Gray
  }
};

// ステータスを色に変換
export const getStatusColor = (
  status: 'notStarted' | 'inProgress' | 'completed'
): string => {
  switch (status) {
    case 'completed':
      return '#4caf50'; // Green
    case 'inProgress':
      return '#2196f3'; // Blue
    case 'notStarted':
      return '#9e9e9e'; // Gray
    default:
      return '#9e9e9e';
  }
};

// ユーザー名を正規化（@を付与）
export const normalizeUsername = (username: string): string => {
  if (username.startsWith('@')) return username;
  return `@${username}`;
};

// メンション用のテキストをパース
export const parseMentions = (text: string): string[] => {
  const mentionRegex = /@([a-zA-Z0-9_]+)/g;
  const mentions = [];
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    mentions.push(match[1]);
  }

  return [...new Set(mentions)]; // 重複を除去
};

// マークダウンのリンクを検出してHTMLに変換
export const linkifyText = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
};

// 複数形の処理
export const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + 's'}`;
};

// 日本語の単位付き数値
export const formatJapaneseNumber = (num: number): string => {
  if (num >= 10000) {
    return `${Math.floor(num / 10000)}万${num % 10000 > 0 ? formatNumber(num % 10000) : ''}`;
  }
  return formatNumber(num);
};