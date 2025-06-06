# 5. 実装ガイド

## 5.1 コーディング規約

### 5.1.1 TypeScript/JavaScript
```typescript
// ファイル名: camelCase.ts
// クラス名: PascalCase
// 関数名: camelCase
// 定数名: UPPER_SNAKE_CASE
// 変数名: camelCase

// 良い例
export class TaskService {
  private readonly MAX_RETRY_COUNT = 3;

  async createTask(data: CreateTaskDto): Promise<Task> {
    // 実装
  }
}

// インポート順序
import { Module } from '@nestjs/common'; // 1. 外部ライブラリ
import { TaskService } from './task.service'; // 2. 内部モジュール
import { Task } from '@/types/task'; // 3. 型定義
import { API_ENDPOINTS } from '@/constants'; // 4. 定数
```

### 5.1.2 React コンポーネント
```typescript
// 関数コンポーネントを使用
interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  // フックは最上部に配置
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // イベントハンドラ
  const handleEdit = useCallback(() => {
    onEdit?.(task);
  }, [task, onEdit]);

  // 条件付きレンダリング
  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Card>
      <CardContent>
        <Typography>{task.title}</Typography>
      </CardContent>
    </Card>
  );
};
```

### 5.1.3 CSS/スタイリング
```typescript
// CSS Modulesの使用
import styles from './TaskCard.module.css';

// Emotionでのスタイリング
const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;
```

## 5.2 ディレクトリ構成詳細

### 5.2.1 フロントエンド構成
```
frontend/src/
├── components/          # 再利用可能なコンポーネント
│   ├── common/         # 汎用コンポーネント
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   ├── layout/         # レイアウトコンポーネント
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── Footer/
│   └── features/       # 機能別コンポーネント
│       ├── tasks/
│       ├── projects/
│       └── users/
├── pages/              # ページコンポーネント
│   ├── Home.tsx
│   ├── Login.tsx
│   └── Projects/
├── hooks/              # カスタムフック
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── useDebounce.ts
├── services/           # APIクライアント
│   ├── api.ts
│   ├── auth.service.ts
│   └── task.service.ts
├── store/              # Redux Store
│   ├── index.ts
│   ├── auth/
│   └── tasks/
├── types/              # 型定義
│   ├── api.ts
│   ├── models.ts
│   └── utils.ts
├── utils/              # ユーティリティ関数
│   ├── date.ts
│   ├── validation.ts
│   └── format.ts
├── constants/          # 定数定義
│   ├── api.ts
│   └── app.ts
└── styles/             # グローバルスタイル
    ├── globals.css
    └── theme.ts
```

### 5.2.2 バックエンド構成
```
backend/src/
├── controllers/        # コントローラー層
│   ├── auth.controller.ts
│   ├── task.controller.ts
│   └── project.controller.ts
├── services/           # サービス層
│   ├── auth.service.ts
│   ├── task.service.ts
│   └── email.service.ts
├── repositories/       # リポジトリ層
│   ├── user.repository.ts
│   └── task.repository.ts
├── middlewares/        # ミドルウェア
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── logger.middleware.ts
├── routes/             # ルート定義
│   ├── index.ts
│   ├── auth.routes.ts
│   └── api.routes.ts
├── types/              # 型定義
│   ├── express.d.ts
│   └── models.ts
├── utils/              # ユーティリティ
│   ├── jwt.ts
│   ├── bcrypt.ts
│   └── validator.ts
├── config/             # 設定
│   ├── database.ts
│   └── app.ts
└── prisma/             # Prisma関連
    ├── schema.prisma
    ├── seed.ts
    └── migrations/
```

## 5.3 実装順序

### Phase 1: 基盤構築（1週目）
1. **環境構築**
   - Docker環境のセットアップ
   - 開発環境の構築
   - CI/CD パイプラインの設定

2. **データベース設計**
   - Prismaスキーマの作成
   - マイグレーションの実行
   - シードデータの作成

3. **認証基盤**
   - JWT認証の実装
   - ユーザー登録・ログインAPI
   - 認証ミドルウェア

### Phase 2: コア機能実装（2-3週目）
4. **ユーザー管理**
   - プロフィールAPI
   - ユーザー検索API
   - パスワード変更機能

5. **プロジェクト管理**
   - CRUD API実装
   - メンバー管理機能
   - 権限チェック実装

6. **タスク管理基本機能**
   - タスクCRUD API
   - ステータス管理
   - 担当者割り当て

### Phase 3: 高度な機能（4-5週目）
7. **コメント・通知**
   - コメント投稿API
   - メンション機能
   - 通知システム

8. **ファイル管理**
   - ファイルアップロード
   - ファイル削除
   - アクセス制御

9. **ダッシュボード**
   - 統計情報API
   - アクティビティフィード
   - 検索機能

### Phase 4: UI実装（6-7週目）
10. **基本UI構築**
    - レイアウトコンポーネント
    - 認証画面
    - ルーティング設定

11. **主要画面実装**
    - プロジェクト一覧・詳細
    - タスク一覧・詳細
    - ダッシュボード

12. **高度なUI機能**
    - リアルタイム更新
    - ドラッグ&ドロップ
    - ショートカットキー

### Phase 5: 品質向上（8週目）
13. **テスト実装**
    - 単体テスト
    - 統合テスト
    - E2Eテスト

14. **最適化・改善**
    - パフォーマンス改善
    - セキュリティ強化
    - ドキュメント整備

## 5.4 テスト方針

### 5.4.1 単体テスト
```typescript
// backend/src/services/__tests__/task.service.test.ts
describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    taskRepository = createMockRepository();
    taskService = new TaskService(taskRepository);
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        projectId: 'project-123',
        assigneeId: 'user-123'
      };

      taskRepository.create.mockResolvedValue({
        id: 'task-123',
        ...createTaskDto
      });

      const result = await taskService.createTask(createTaskDto);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe(createTaskDto.title);
    });
  });
});
```

### 5.4.2 統合テスト
```typescript
// backend/src/controllers/__tests__/task.controller.test.ts
describe('POST /api/v1/tasks', () => {
  it('should create a task with valid data', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        title: 'Integration Test Task',
        projectId: testProject.id
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
```

### 5.4.3 E2Eテスト
```typescript
// e2e/task-management.spec.ts
describe('Task Management', () => {
  it('should create and complete a task', async () => {
    await page.goto('/projects/123/tasks');
    
    // タスク作成
    await page.click('[data-testid="create-task-button"]');
    await page.fill('[name="title"]', 'E2E Test Task');
    await page.click('[type="submit"]');
    
    // タスク完了
    await page.click('[data-testid="task-checkbox"]');
    
    // 確認
    await expect(page.locator('.task-completed')).toBeVisible();
  });
});
```

## 5.5 デプロイメント

### 5.5.1 Docker Compose設定
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - REACT_APP_API_URL=http://localhost:8080
    ports:
      - "3000:3000"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    volumes:
      - ./backend:/app
      - /app/node_modules
      - ./uploads:/app/uploads
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/taskflow
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=development-secret
    ports:
      - "8080:8080"
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=taskflow
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

  nginx:
    build:
      context: ./nginx
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

### 5.5.2 環境別設定
```typescript
// backend/src/config/app.ts
export const config = {
  development: {
    port: 8080,
    database: {
      logging: true,
      synchronize: true
    },
    cors: {
      origin: ['http://localhost:3000']
    }
  },
  production: {
    port: process.env.PORT || 8080,
    database: {
      logging: false,
      synchronize: false
    },
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || []
    }
  }
};
```

## 5.6 セキュリティ実装

### 5.6.1 入力検証
```typescript
// backend/src/validators/task.validator.ts
import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(5000).optional(),
  projectId: Joi.string().uuid().required(),
  assigneeId: Joi.string().uuid().optional(),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  dueDate: Joi.date().iso().optional(),
  labelIds: Joi.array().items(Joi.string().uuid()).optional()
});
```

### 5.6.2 認可チェック
```typescript
// backend/src/middlewares/authorization.ts
export const checkProjectAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  const hasAccess = await projectService.checkUserAccess(projectId, userId);
  
  if (!hasAccess) {
    return res.status(403).json({
      error: {
        code: 'FORBIDDEN',
        message: 'プロジェクトへのアクセス権限がありません'
      }
    });
  }

  next();
};
```

## 5.7 パフォーマンス最適化

### 5.7.1 データベースクエリ最適化
```typescript
// N+1問題の回避
const tasksWithRelations = await prisma.task.findMany({
  where: { projectId },
  include: {
    assignee: true,
    labels: true,
    _count: {
      select: { comments: true }
    }
  }
});
```

### 5.7.2 キャッシュ実装
```typescript
// backend/src/services/cache.service.ts
export class CacheService {
  private redis: Redis;

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttl || 3600);
  }

  async invalidate(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
```

## 5.8 監視・ログ

### 5.8.1 ログ設定
```typescript
// backend/src/utils/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});
```

### 5.8.2 エラートラッキング
```typescript
// backend/src/middlewares/error.middleware.ts
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id
  });

  // エラーレスポンス
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'サーバーエラーが発生しました'
    }
  });
};
```