# タスク管理APIの実装

## 概要
タスクのCRUD操作、ステータス管理、優先度設定、ラベル機能、担当者割り当てなどの機能を提供するAPIエンドポイントを実装します。

## 詳細仕様
### エンドポイント一覧

#### タスク管理
- `POST /api/v1/projects/:projectId/tasks` - タスク作成
- `GET /api/v1/projects/:projectId/tasks` - タスク一覧取得
- `GET /api/v1/tasks/:id` - タスク詳細取得
- `PUT /api/v1/tasks/:id` - タスク更新
- `DELETE /api/v1/tasks/:id` - タスク削除
- `PATCH /api/v1/tasks/:id/status` - ステータス更新
- `PATCH /api/v1/tasks/:id/assignee` - 担当者変更
- `PATCH /api/v1/tasks/:id/priority` - 優先度変更

#### ラベル管理
- `GET /api/v1/projects/:projectId/labels` - ラベル一覧取得
- `POST /api/v1/projects/:projectId/labels` - ラベル作成
- `PUT /api/v1/labels/:id` - ラベル更新
- `DELETE /api/v1/labels/:id` - ラベル削除
- `POST /api/v1/tasks/:id/labels` - タスクにラベル追加
- `DELETE /api/v1/tasks/:id/labels/:labelId` - タスクからラベル削除

#### 検索・フィルタリング
- `GET /api/v1/tasks/search` - タスク検索（全プロジェクト横断）
- フィルタリングパラメータ:
  - status (TODO/IN_PROGRESS/DONE)
  - priority (LOW/MEDIUM/HIGH/URGENT)
  - assignee_id
  - label_ids
  - due_date_from/due_date_to
  - created_date_from/created_date_to

### データ構造
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  projectId: string;
  assigneeId?: string;
  createdBy: string;
  labels: Label[];
  attachments: Attachment[];
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### バリデーション
- タイトル: 必須、最大200文字
- 説明: 最大5000文字
- 期限日: 現在日時以降
- ステータス・優先度: Enum値の検証

## 受け入れ条件
- [ ] 全エンドポイントが正常に動作する
- [ ] タスクの作成・更新時にアクティビティログが記録される
- [ ] 検索・フィルタリング機能が正しく動作する
- [ ] ソート機能（期限日、優先度、作成日）が動作する
- [ ] 権限チェックが適切（プロジェクトメンバーのみアクセス可）
- [ ] バルク操作（複数タスクの一括更新）が可能
- [ ] WebSocketでリアルタイム更新通知が送信される

## 技術的考慮事項
- タスクの順序管理（カンバンボード用）
- 楽観的ロックによる同時更新の制御
- 全文検索の実装（PostgreSQLのtsvector使用）
- タスクのサブタスク機能の拡張性を考慮

## 依存関係
- 前提Issue: #9
- ブロックしているIssue: #12, #13, #14

## 見積もり工数
2.5日