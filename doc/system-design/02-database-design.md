# 2. データベース設計

## 2.1 ER図

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│    users    │────<│ project_members │>────│  projects   │
└──────┬──────┘     └─────────────────┘     └──────┬──────┘
       │                                            │
       │                                            │
       │            ┌─────────────────┐            │
       │            │      tasks      │>───────────┘
       │            └────────┬────────┘
       │                     │
       │                     │
       │            ┌─────────────────┐     ┌─────────────┐
       └───────────<│    comments     │     │   labels    │
                    └─────────────────┘     └──────┬──────┘
                                                   │
                    ┌─────────────────┐            │
                    │  task_labels    │>───────────┘
                    └─────────────────┘

                    ┌─────────────────┐
                    │ notifications   │
                    └─────────────────┘

                    ┌─────────────────┐
                    │   attachments   │
                    └─────────────────┘
```

## 2.2 テーブル定義

### 2.2.1 users（ユーザー）
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    bio TEXT,
    timezone VARCHAR(50) DEFAULT 'Asia/Tokyo',
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    role VARCHAR(20) DEFAULT 'member', -- admin, member
    notification_email BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- インデックス
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_is_active ON users(is_active);
```

### 2.2.2 projects（プロジェクト）
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#1976d2', -- HEXカラーコード
    is_public BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    start_date DATE,
    end_date DATE,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス
CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_projects_is_archived ON projects(is_archived);
```

### 2.2.3 project_members（プロジェクトメンバー）
```sql
CREATE TABLE project_members (
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL DEFAULT 'member', -- admin, member
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, user_id)
);

-- インデックス
CREATE INDEX idx_project_members_user_id ON project_members(user_id);
```

### 2.2.4 tasks（タスク）
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'todo', -- todo, in_progress, done
    priority VARCHAR(10) DEFAULT 'medium', -- low, medium, high
    due_date TIMESTAMP,
    assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_by UUID NOT NULL REFERENCES users(id),
    completed_at TIMESTAMP,
    position INTEGER NOT NULL DEFAULT 0, -- 並び順
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_created_by ON tasks(created_by);
```

### 2.2.5 labels（ラベル）
```sql
CREATE TABLE labels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL DEFAULT '#757575',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, name)
);

-- インデックス
CREATE INDEX idx_labels_project_id ON labels(project_id);
```

### 2.2.6 task_labels（タスクラベル）
```sql
CREATE TABLE task_labels (
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, label_id)
);

-- インデックス
CREATE INDEX idx_task_labels_label_id ON task_labels(label_id);
```

### 2.2.7 comments（コメント）
```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス
CREATE INDEX idx_comments_task_id ON comments(task_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
```

### 2.2.8 attachments（添付ファイル）
```sql
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_parent CHECK (
        (task_id IS NOT NULL AND comment_id IS NULL) OR
        (task_id IS NULL AND comment_id IS NOT NULL)
    )
);

-- インデックス
CREATE INDEX idx_attachments_task_id ON attachments(task_id);
CREATE INDEX idx_attachments_comment_id ON attachments(comment_id);
CREATE INDEX idx_attachments_user_id ON attachments(user_id);
```

### 2.2.9 notifications（通知）
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- task_assigned, mentioned, task_due, etc
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    related_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    related_project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

### 2.2.10 activity_logs（活動ログ）
```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL, -- created, updated, deleted, completed, etc
    entity_type VARCHAR(50) NOT NULL, -- project, task, comment, etc
    entity_id UUID NOT NULL,
    old_value JSONB,
    new_value JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_project_id ON activity_logs(project_id);
CREATE INDEX idx_activity_logs_task_id ON activity_logs(task_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
```

## 2.3 インデックス設計方針

### 2.3.1 インデックス作成基準
1. **主キー**: 自動的にインデックス作成
2. **外部キー**: JOIN性能向上のため作成
3. **検索条件**: WHERE句で頻繁に使用されるカラム
4. **ソート条件**: ORDER BY句で使用されるカラム
5. **ユニーク制約**: 一意性保証が必要なカラム

### 2.3.2 複合インデックス
```sql
-- プロジェクトとステータスでの検索最適化
CREATE INDEX idx_tasks_project_status ON tasks(project_id, status);

-- ユーザーと未読での検索最適化
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read)
WHERE is_read = false;
```

## 2.4 マイグレーション方針

### 2.4.1 Prismaスキーマ定義
```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String   @map("password_hash")
  username      String   @unique
  displayName   String   @map("display_name")
  avatarUrl     String?  @map("avatar_url")
  bio           String?
  timezone      String   @default("Asia/Tokyo")
  isActive      Boolean  @default(true) @map("is_active")
  emailVerified Boolean  @default(false) @map("email_verified")
  role          String   @default("member")
  notificationEmail Boolean @default(true) @map("notification_email")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")
  lastLoginAt   DateTime? @map("last_login_at")
  
  // Relations
  projects      Project[]
  projectMembers ProjectMember[]
  tasks         Task[]
  assignedTasks Task[] @relation("AssignedTasks")
  comments      Comment[]
  attachments   Attachment[]
  notifications Notification[]
  activityLogs  ActivityLog[]
  
  @@map("users")
}
```

### 2.4.2 マイグレーション実行
```bash
# マイグレーションファイル生成
npx prisma migrate dev --name init

# マイグレーション実行
npx prisma migrate deploy

# スキーマ同期確認
npx prisma db push
```

## 2.5 データベース運用

### 2.5.1 バックアップ戦略
- 日次フルバックアップ（深夜2時）
- トランザクションログの継続的バックアップ
- 7世代保持（1週間分）

### 2.5.2 パフォーマンスチューニング
```sql
-- 統計情報更新
ANALYZE;

-- 不要領域の回収
VACUUM;

-- インデックスの再構築
REINDEX DATABASE taskflow;
```

### 2.5.3 監視項目
- コネクション数
- 長時間実行クエリ
- テーブルサイズ
- インデックス使用率
- デッドロック発生状況

## 2.6 シーディングデータ

### 2.6.1 初期データ
```typescript
// 管理者ユーザー
const adminUser = {
  email: 'admin@example.com',
  password: 'Admin123!',
  username: 'admin',
  displayName: 'システム管理者',
  role: 'admin'
};

// デモプロジェクト
const demoProject = {
  name: 'TaskFlowチュートリアル',
  description: 'TaskFlowの使い方を学ぶためのプロジェクト',
  color: '#4caf50'
};

// デモタスク
const demoTasks = [
  {
    title: 'TaskFlowへようこそ！',
    description: 'このタスクをクリックして詳細を確認してください',
    status: 'todo',
    priority: 'high'
  }
];
```