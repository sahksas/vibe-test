# 4. システム構成

## 4.1 技術スタック

### 4.1.1 フロントエンド
- **フレームワーク**: React 18.x
- **言語**: TypeScript 5.x
- **状態管理**: Redux Toolkit
- **UIライブラリ**: Material-UI (MUI) v5
- **スタイリング**: CSS Modules + Emotion
- **ビルドツール**: Vite
- **パッケージマネージャー**: npm

### 4.1.2 バックエンド
- **言語**: Node.js 20.x
- **フレームワーク**: Express.js
- **TypeScript**: 5.x
- **ORM**: Prisma
- **認証**: JWT (JSON Web Tokens)
- **バリデーション**: Joi
- **ロギング**: Winston

### 4.1.3 データベース
- **RDBMS**: PostgreSQL 15.x
- **キャッシュ**: Redis 7.x
- **セッション管理**: Redis

### 4.1.4 インフラ・DevOps
- **コンテナ**: Docker
- **オーケストレーション**: Docker Compose
- **Webサーバー**: Nginx
- **開発環境**: Docker Desktop

## 4.2 開発環境

### 4.2.1 必要なソフトウェア
```
- Docker Desktop 4.x以上
- Node.js 20.x（ローカル開発用）
- Git 2.x以上
- VSCode（推奨エディタ）
```

### 4.2.2 環境構築手順
```bash
# リポジトリのクローン
git clone [repository-url]
cd taskflow

# 環境変数の設定
cp .env.example .env

# Dockerコンテナの起動
docker-compose up -d

# データベースマイグレーション
docker-compose exec backend npm run migrate

# 初期データの投入
docker-compose exec backend npm run seed
```

### 4.2.3 アクセスURL
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8080
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## 4.3 ディレクトリ構成

```
taskflow/
├── docker-compose.yml
├── .env.example
├── README.md
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── store/
│       ├── services/
│       ├── types/
│       └── utils/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── middlewares/
│       ├── routes/
│       ├── types/
│       └── utils/
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
└── doc/
    ├── system-requirements/
    └── system-design/
```

## 4.4 Docker Compose設定

### 4.4.1 サービス構成
```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8080
    volumes:
      - ./frontend:/app
      - /app/node_modules

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/taskflow
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=your-secret-key
    depends_on:
      - db
      - redis
    volumes:
      - ./backend:/app
      - /app/node_modules

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=taskflow
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  nginx:
    build: ./nginx
    ports:
      - "80:80"
    depends_on:
      - frontend
      - backend
```

## 4.5 環境変数

### 4.5.1 バックエンド環境変数
```
# Database
DATABASE_URL=postgresql://user:password@db:5432/taskflow

# Redis
REDIS_URL=redis://redis:6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h

# Application
PORT=8080
NODE_ENV=development

# Email (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=/app/uploads
```

### 4.5.2 フロントエンド環境変数
```
# API
REACT_APP_API_URL=http://localhost:8080

# Application
REACT_APP_NAME=TaskFlow
REACT_APP_VERSION=1.0.0
```

## 4.6 セキュリティ設定

### 4.6.1 CORS設定
- 開発環境: http://localhost:3000 を許可
- 本番環境: 指定されたドメインのみ許可

### 4.6.2 セキュリティヘッダー
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000

### 4.6.3 レート制限
- API: 1分間に100リクエストまで
- ログイン: 1分間に5回まで
- ファイルアップロード: 1時間に50回まで