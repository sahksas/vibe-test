import { format, formatDistance, formatRelative, isToday, isYesterday, isTomorrow, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { DATE_FORMAT } from '@/constants/app';

// 日付をフォーマット
export const formatDate = (
  date: Date | string,
  formatStr: string = DATE_FORMAT.DISPLAY
): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: ja });
};

// 相対的な時間表示（例: 3分前、2時間前）
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { 
    addSuffix: true,
    locale: ja 
  });
};

// カレンダー形式の日付表示（例: 今日、昨日、明日、曜日）
export const formatCalendarDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) {
    return '今日';
  }
  if (isYesterday(dateObj)) {
    return '昨日';
  }
  if (isTomorrow(dateObj)) {
    return '明日';
  }
  
  return formatRelative(dateObj, new Date(), { locale: ja });
};

// 期限までの日数を計算
export const getDaysUntilDue = (dueDate: Date | string): number => {
  const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);
  
  const diffTime = dateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// 期限の状態を取得
export const getDueDateStatus = (
  dueDate: Date | string | null | undefined
): 'overdue' | 'dueSoon' | 'normal' | null => {
  if (!dueDate) return null;
  
  const daysUntilDue = getDaysUntilDue(dueDate);
  
  if (daysUntilDue < 0) return 'overdue';
  if (daysUntilDue <= 1) return 'dueSoon';
  return 'normal';
};

// 期限の表示テキストを取得
export const getDueDateText = (dueDate: Date | string | null | undefined): string => {
  if (!dueDate) return '';
  
  const daysUntilDue = getDaysUntilDue(dueDate);
  
  if (daysUntilDue < -1) {
    return `${Math.abs(daysUntilDue)}日遅れ`;
  }
  if (daysUntilDue === -1) {
    return '1日遅れ';
  }
  if (daysUntilDue === 0) {
    return '今日';
  }
  if (daysUntilDue === 1) {
    return '明日';
  }
  if (daysUntilDue > 1 && daysUntilDue <= 7) {
    return `${daysUntilDue}日後`;
  }
  
  return formatDate(dueDate);
};

// 作業時間を計算（分単位）
export const calculateWorkingTime = (
  startDate: Date | string,
  endDate: Date | string
): number => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  const diffMs = end.getTime() - start.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  return diffMinutes;
};

// 作業時間を読みやすい形式に変換
export const formatWorkingTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}分`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}時間`;
  }
  
  return `${hours}時間${remainingMinutes}分`;
};