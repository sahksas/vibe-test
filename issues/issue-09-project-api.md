# プロジェクト管理APIの実装

## 概要
プロジェクトの作成、読み取り、更新、削除（CRUD）操作とメンバー管理機能を提供するAPIエンドポイントを実装します。

## 詳細仕様
### エンドポイント一覧

#### プロジェクト管理
- `POST /api/v1/projects` - プロジェクト作成
- `GET /api/v1/projects` - プロジェクト一覧取得（ページネーション付き）
- `GET /api/v1/projects/:id` - プロジェクト詳細取得
- `PUT /api/v1/projects/:id` - プロジェクト更新
- `DELETE /api/v1/projects/:id` - プロジェクト削除（ソフトデリート）
- `POST /api/v1/projects/:id/archive` - プロジェクトアーカイブ
- `POST /api/v1/projects/:id/unarchive` - プロジェクトアーカイブ解除

#### メンバー管理
- `GET /api/v1/projects/:id/members` - メンバー一覧取得
- `POST /api/v1/projects/:id/members` - メンバー招待
- `PUT /api/v1/projects/:id/members/:userId` - メンバー権限更新
- `DELETE /api/v1/projects/:id/members/:userId` - メンバー削除

#### お気に入り機能
- `POST /api/v1/projects/:id/favorite` - お気に入り追加
- `DELETE /api/v1/projects/:id/favorite` - お気に入り削除
- `GET /api/v1/projects/favorites` - お気に入りプロジェクト一覧

### 権限管理
- プロジェクト作成は認証済みユーザーのみ
- プロジェクト更新・削除はオーナーまたは管理者のみ
- メンバー管理は管理者権限が必要
- 非公開プロジェクトはメンバーのみアクセス可能

### バリデーション
- プロジェクト名: 必須、最大100文字
- 説明: 最大1000文字
- メンバー招待時のメールアドレス検証

## 受け入れ条件
- [ ] 全エンドポイントが正常に動作する
- [ ] 権限チェックが適切に機能する
- [ ] 入力値のバリデーションが機能する
- [ ] エラーレスポンスが統一された形式
- [ ] ページネーションが正しく動作する
- [ ] N+1問題が発生しない
- [ ] トランザクション処理が適切
- [ ] APIドキュメントが作成されている

## 技術的考慮事項
- Prismaのincludeを活用してN+1問題を回避
- 検索・フィルタリング機能の実装
- ソート機能（作成日、更新日、名前）
- アクティビティログの記録

## 依存関係
- 前提Issue: #7
- ブロックしているIssue: #10, #11, #12

## 見積もり工数
2日