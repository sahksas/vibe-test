# 3. API設計

## 3.1 API概要

### 3.1.1 基本仕様
- **ベースURL**: `http://localhost:8080/api/v1`
- **形式**: RESTful API
- **データ形式**: JSON
- **文字コード**: UTF-8
- **認証方式**: JWT Bearer Token

### 3.1.2 共通ヘッダー
```http
Content-Type: application/json
Authorization: Bearer <jwt_token>
X-Request-ID: <request_id>
```

## 3.2 認証・認可

### 3.2.1 認証フロー
```
1. ユーザーがメールアドレスとパスワードでログイン
2. サーバーがJWTトークンを発行
3. クライアントがトークンをローカルストレージに保存
4. 以降のリクエストでAuthorizationヘッダーにトークンを付与
5. サーバーがトークンを検証して認証
```

### 3.2.2 認証エンドポイント

#### ユーザー登録
```http
POST /api/v1/auth/register

Request:
{
  "email": "user@example.com",
  "password": "Password123!",
  "username": "johndoe",
  "displayName": "John Doe"
}

Response: 201 Created
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "username": "johndoe",
    "displayName": "John Doe",
    "role": "member"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### ログイン
```http
POST /api/v1/auth/login

Request:
{
  "email": "user@example.com",
  "password": "Password123!"
}

Response: 200 OK
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "username": "johndoe",
    "displayName": "John Doe",
    "role": "member"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### ログアウト
```http
POST /api/v1/auth/logout
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "ログアウトしました"
}
```

#### パスワードリセット要求
```http
POST /api/v1/auth/forgot-password

Request:
{
  "email": "user@example.com"
}

Response: 200 OK
{
  "message": "パスワードリセット用のメールを送信しました"
}
```

## 3.3 ユーザー管理API

### 3.3.1 ユーザー情報取得
```http
GET /api/v1/users/me
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "username": "johndoe",
  "displayName": "John Doe",
  "avatarUrl": "https://example.com/avatar.jpg",
  "bio": "Software Developer",
  "timezone": "Asia/Tokyo",
  "role": "member",
  "notificationEmail": true,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### 3.3.2 ユーザー情報更新
```http
PUT /api/v1/users/me
Authorization: Bearer <token>

Request:
{
  "displayName": "John Smith",
  "bio": "Full Stack Developer",
  "timezone": "America/New_York",
  "notificationEmail": false
}

Response: 200 OK
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "displayName": "John Smith",
  "bio": "Full Stack Developer",
  ...
}
```

### 3.3.3 ユーザー検索
```http
GET /api/v1/users?search=john&limit=10&offset=0
Authorization: Bearer <token>

Response: 200 OK
{
  "users": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "username": "johndoe",
      "displayName": "John Doe",
      "avatarUrl": "https://example.com/avatar.jpg"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

## 3.4 プロジェクト管理API

### 3.4.1 プロジェクト作成
```http
POST /api/v1/projects
Authorization: Bearer <token>

Request:
{
  "name": "新規プロジェクト",
  "description": "プロジェクトの説明",
  "color": "#2196f3",
  "isPublic": false,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}

Response: 201 Created
{
  "id": "456e7890-e89b-12d3-a456-426614174000",
  "name": "新規プロジェクト",
  "description": "プロジェクトの説明",
  "color": "#2196f3",
  "isPublic": false,
  "isArchived": false,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "createdBy": "123e4567-e89b-12d3-a456-426614174000",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### 3.4.2 プロジェクト一覧取得
```http
GET /api/v1/projects?archived=false&limit=20&offset=0
Authorization: Bearer <token>

Response: 200 OK
{
  "projects": [
    {
      "id": "456e7890-e89b-12d3-a456-426614174000",
      "name": "新規プロジェクト",
      "description": "プロジェクトの説明",
      "color": "#2196f3",
      "isPublic": false,
      "isArchived": false,
      "taskCount": 10,
      "memberCount": 5,
      "myRole": "admin"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

### 3.4.3 プロジェクトメンバー管理
```http
POST /api/v1/projects/:projectId/members
Authorization: Bearer <token>

Request:
{
  "userId": "789e0123-e89b-12d3-a456-426614174000",
  "role": "member"
}

Response: 201 Created
{
  "projectId": "456e7890-e89b-12d3-a456-426614174000",
  "userId": "789e0123-e89b-12d3-a456-426614174000",
  "role": "member",
  "joinedAt": "2024-01-01T00:00:00Z"
}
```

## 3.5 タスク管理API

### 3.5.1 タスク作成
```http
POST /api/v1/projects/:projectId/tasks
Authorization: Bearer <token>

Request:
{
  "title": "新しいタスク",
  "description": "タスクの詳細説明",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-01-31T23:59:59Z",
  "assigneeId": "789e0123-e89b-12d3-a456-426614174000",
  "labelIds": ["label1", "label2"]
}

Response: 201 Created
{
  "id": "abc1234-e89b-12d3-a456-426614174000",
  "projectId": "456e7890-e89b-12d3-a456-426614174000",
  "title": "新しいタスク",
  "description": "タスクの詳細説明",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-01-31T23:59:59Z",
  "assignee": {
    "id": "789e0123-e89b-12d3-a456-426614174000",
    "displayName": "Jane Doe"
  },
  "labels": [
    {"id": "label1", "name": "バグ", "color": "#f44336"},
    {"id": "label2", "name": "緊急", "color": "#ff9800"}
  ],
  "createdBy": "123e4567-e89b-12d3-a456-426614174000",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### 3.5.2 タスク一覧取得
```http
GET /api/v1/projects/:projectId/tasks?status=todo,in_progress&assignee=me&sort=priority,desc
Authorization: Bearer <token>

Response: 200 OK
{
  "tasks": [
    {
      "id": "abc1234-e89b-12d3-a456-426614174000",
      "title": "新しいタスク",
      "status": "todo",
      "priority": "high",
      "dueDate": "2024-01-31T23:59:59Z",
      "assignee": {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "displayName": "Jane Doe"
      },
      "labels": [
        {"id": "label1", "name": "バグ", "color": "#f44336"}
      ],
      "commentCount": 5,
      "attachmentCount": 2
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

### 3.5.3 タスク更新
```http
PUT /api/v1/tasks/:taskId
Authorization: Bearer <token>

Request:
{
  "title": "更新されたタスク",
  "status": "in_progress",
  "assigneeId": "new-assignee-id"
}

Response: 200 OK
{
  "id": "abc1234-e89b-12d3-a456-426614174000",
  "title": "更新されたタスク",
  "status": "in_progress",
  ...
}
```

## 3.6 コメントAPI

### 3.6.1 コメント投稿
```http
POST /api/v1/tasks/:taskId/comments
Authorization: Bearer <token>

Request:
{
  "content": "これは @johndoe へのメンションを含むコメントです。"
}

Response: 201 Created
{
  "id": "comment123-e89b-12d3-a456-426614174000",
  "taskId": "abc1234-e89b-12d3-a456-426614174000",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "displayName": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg"
  },
  "content": "これは @johndoe へのメンションを含むコメントです。",
  "mentions": ["johndoe"],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 3.7 通知API

### 3.7.1 通知一覧取得
```http
GET /api/v1/notifications?unread=true&limit=20
Authorization: Bearer <token>

Response: 200 OK
{
  "notifications": [
    {
      "id": "notif123-e89b-12d3-a456-426614174000",
      "type": "task_assigned",
      "title": "新しいタスクが割り当てられました",
      "message": "「新しいタスク」があなたに割り当てられました",
      "isRead": false,
      "relatedTaskId": "abc1234-e89b-12d3-a456-426614174000",
      "relatedProjectId": "456e7890-e89b-12d3-a456-426614174000",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "unreadCount": 1
}
```

### 3.7.2 通知既読化
```http
PUT /api/v1/notifications/:notificationId/read
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "notif123-e89b-12d3-a456-426614174000",
  "isRead": true
}
```

## 3.8 ファイルアップロードAPI

### 3.8.1 ファイルアップロード
```http
POST /api/v1/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Request:
- file: (binary)
- taskId: "abc1234-e89b-12d3-a456-426614174000" (optional)
- commentId: "comment123-e89b-12d3-a456-426614174000" (optional)

Response: 201 Created
{
  "id": "file123-e89b-12d3-a456-426614174000",
  "filename": "document.pdf",
  "fileSize": 1048576,
  "mimeType": "application/pdf",
  "url": "/api/v1/files/file123-e89b-12d3-a456-426614174000"
}
```

## 3.9 エラーレスポンス

### 3.9.1 エラー形式
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": [
      {
        "field": "email",
        "message": "有効なメールアドレスを入力してください"
      }
    ]
  }
}
```

### 3.9.2 エラーコード一覧
| コード | 説明 |
|--------|------|
| UNAUTHORIZED | 認証が必要です |
| FORBIDDEN | アクセス権限がありません |
| NOT_FOUND | リソースが見つかりません |
| VALIDATION_ERROR | 入力値が不正です |
| DUPLICATE_ENTRY | 既に存在します |
| RATE_LIMIT_EXCEEDED | レート制限を超えました |
| INTERNAL_ERROR | サーバーエラーが発生しました |

## 3.10 レート制限

### 3.10.1 制限値
- 一般API: 100リクエスト/分
- 認証API: 5リクエスト/分
- ファイルアップロード: 50リクエスト/時

### 3.10.2 レスポンスヘッダー
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```