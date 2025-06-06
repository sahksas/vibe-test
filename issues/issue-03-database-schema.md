# データベーススキーマの実装

## 概要
Prisma ORMを使用して、TaskFlowシステムの全データベーススキーマを定義し、マイグレーションを実行します。

## 詳細仕様
### Prismaセットアップ
- Prisma CLIのインストール
- PostgreSQL接続設定
- prisma.schemaファイルの作成

### スキーマ定義
以下のテーブルを実装：

1. **users**
   - id (UUID)
   - email (unique)
   - username (unique)
   - password_hash
   - profile関連フィールド
   - timestamps

2. **projects**
   - id (UUID)
   - name
   - description
   - is_public
   - is_archived
   - owner_id (FK)
   - timestamps

3. **project_members**
   - project_id (FK)
   - user_id (FK)
   - role (admin/member)
   - joined_at

4. **tasks**
   - id (UUID)
   - title
   - description
   - status (TODO/IN_PROGRESS/DONE)
   - priority (LOW/MEDIUM/HIGH/URGENT)
   - due_date
   - project_id (FK)
   - assignee_id (FK)
   - created_by (FK)
   - timestamps

5. **labels**
   - id (UUID)
   - name
   - color
   - project_id (FK)

6. **task_labels**
   - task_id (FK)
   - label_id (FK)

7. **comments**
   - id (UUID)
   - content
   - task_id (FK)
   - user_id (FK)
   - edited_at
   - timestamps

8. **comment_history**
   - id (UUID)
   - comment_id (FK)
   - content
   - edited_at

9. **attachments**
   - id (UUID)
   - filename
   - file_path
   - file_size
   - mime_type
   - task_id (FK)
   - uploaded_by (FK)
   - timestamps

10. **notifications**
    - id (UUID)
    - user_id (FK)
    - type
    - title
    - content
    - is_read
    - related_data (JSON)
    - timestamps

11. **activity_logs**
    - id (UUID)
    - user_id (FK)
    - action
    - entity_type
    - entity_id
    - changes (JSON)
    - timestamp

## 受け入れ条件
- [ ] 全てのテーブルが正しくマイグレーションされる
- [ ] 外部キー制約が適切に設定されている
- [ ] カスケード削除の設定が適切
- [ ] タイムスタンプが自動更新される
- [ ] UUIDが自動生成される
- [ ] Prisma Clientが正常に生成される
- [ ] seedデータスクリプトが作成されている

## 技術的考慮事項
- UUID v4を主キーとして使用
- ソフトデリートの実装を検討（deleted_atフィールド）
- JSONフィールドはPostgreSQLのJSONB型を使用
- 適切なデフォルト値の設定
- Enum型の適切な使用

## 依存関係
- 前提Issue: #1
- ブロックしているIssue: #4, #5, #6, #7, #9, #11

## 見積もり工数
1日