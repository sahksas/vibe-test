# TaskFlow - タスク管理システム

## 🎯 プロジェクトの概要

TaskFlowは、中小規模チーム（5-50名）向けのモダンなタスク管理システムです。プロジェクト管理、タスク追跡、チームコラボレーションを効率化し、チームの生産性向上を支援します。

### 主な特徴
- 📊 直感的なダッシュボード
- 🔐 ロールベースのアクセス制御
- 📱 レスポンシブデザイン（モバイルファースト）
- 🔔 リアルタイム通知
- 📈 進捗の可視化（バーンダウンチャート）
- 🎨 プロジェクトごとのカスタマイズ

## 🏗️ システムアーキテクチャ

### 技術スタック

#### フロントエンド
- **フレームワーク**: React 19.x with Next.js 15.3.3
- **言語**: TypeScript 5.x
- **状態管理**: Redux Toolkit
- **UIライブラリ**: Material-UI (MUI) v5
- **スタイリング**: CSS Modules + Emotion + Tailwind CSS
- **HTTPクライアント**: Axios
- **日付処理**: date-fns

#### バックエンド（将来実装予定）
- **ランタイム**: Node.js 20.x
- **フレームワーク**: Express.js
- **ORM**: Prisma
- **認証**: JWT (JSON Web Tokens)
- **バリデーション**: Joi
- **ロギング**: Winston

#### データベース
- **RDBMS**: PostgreSQL 15.x
- **キャッシュ**: Redis 7.x
- **セッション管理**: Redis

#### 開発ツール
- **ビルドツール**: Next.js with Turbopack
- **パッケージマネージャー**: npm
- **コードフォーマッター**: Prettier
- **リンター**: ESLint
- **テストフレームワーク**: Jest + React Testing Library
- **コンテナ**: Docker + Docker Compose

### アーキテクチャ概要

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Next.js App    │────▶│   API Routes    │────▶│   PostgreSQL    │
│  (React + MUI)  │     │   (Express)     │     │                 │
│                 │     │                 │     └─────────────────┘
└─────────────────┘     └─────────────────┘              │
         │                       │                        │
         │                       ▼                        ▼
         │              ┌─────────────────┐     ┌─────────────────┐
         └─────────────▶│     Redis       │     │   File Storage  │
                        │  (Cache/Session) │     │                 │
                        └─────────────────┘     └─────────────────┘
```

## 📋 開発環境のセットアップ

### 前提条件

- **Node.js** 20.x 以上
- **npm** 10.x 以上
- **Docker** 20.x 以上（データベース用）
- **Docker Compose** 2.x 以上

### セットアップ手順（WSL2 / macOS 共通）

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/sahksas/vibe-test.git
   cd vibe-test
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   ```bash
   cp .env.example .env.local
   # .env.localファイルを編集して必要な環境変数を設定
   ```

4. **Docker環境の起動**（PostgreSQL + Redis）
   ```bash
   docker-compose up -d
   ```

5. **データベースのセットアップ**（将来実装時）
   ```bash
   # Prismaのマイグレーション実行
   # npm run db:migrate
   
   # 初期データの投入
   # npm run db:seed
   ```

6. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

### 環境変数の説明

主要な環境変数（`.env.example`参照）:

- `DATABASE_URL`: PostgreSQL接続文字列
- `REDIS_URL`: Redis接続文字列
- `JWT_SECRET`: JWT署名用の秘密鍵
- `NEXT_PUBLIC_API_URL`: APIエンドポイントURL

## 🧑‍💻 開発規約

### コーディング規約

#### TypeScript/JavaScript
- **スタイルガイド**: Airbnb JavaScript Style Guide準拠
- **命名規則**:
  - コンポーネント: PascalCase（例: `TaskCard.tsx`）
  - 関数・変数: camelCase（例: `getUserTasks`）
  - 定数: UPPER_SNAKE_CASE（例: `MAX_FILE_SIZE`）
  - 型・インターフェース: PascalCase、Iプレフィックスなし

#### コード品質
- **Prettier**: 自動フォーマット（保存時）
- **ESLint**: 静的解析（エラーゼロを維持）
- **TypeScript**: strictモードを有効化
- **コミット前チェック**: `npm run lint && npm run type-check`

### Gitコミット規約

コミットメッセージは以下の形式に従う:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更
- `refactor`: バグ修正や機能追加を伴わないコード変更
- `test`: テストの追加・修正
- `chore`: ビルドプロセスやツールの変更

**例**:
```
feat(task): タスクの優先度設定機能を追加

- 高/中/低の3段階で優先度を設定可能
- タスク一覧で優先度順にソート機能を実装
- UIにMUIのChipコンポーネントを使用

Closes #123
```

### ディレクトリ構造

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # APIルート
│   ├── (auth)/         # 認証関連ページ
│   ├── dashboard/      # ダッシュボード
│   └── projects/       # プロジェクト関連ページ
├── components/         # 共通コンポーネント
│   ├── common/        # 汎用コンポーネント
│   ├── forms/         # フォームコンポーネント
│   └── layouts/       # レイアウトコンポーネント
├── features/          # 機能別モジュール
│   ├── auth/         # 認証機能
│   ├── projects/     # プロジェクト機能
│   └── tasks/        # タスク機能
├── hooks/            # カスタムフック
├── lib/              # 外部ライブラリの設定
├── services/         # APIクライアント
├── store/            # Redux store
├── types/            # TypeScript型定義
└── utils/            # ユーティリティ関数
```

### コンポーネント設計原則

1. **単一責任の原則**: 1つのコンポーネントは1つの責務のみ
2. **再利用性**: 汎用的なコンポーネントは`components/common`に配置
3. **型安全性**: すべてのpropsに型定義を必須
4. **テスタビリティ**: ロジックとUIを分離

## 🧪 テストの実行方法

### 単体テスト
```bash
# テストの実行
npm run test

# ウォッチモード
npm run test:watch

# カバレッジレポート生成
npm run test:coverage
```

### テスト方針
- **カバレッジ目標**: 80%以上
- **テスト対象**:
  - ビジネスロジックを含むすべての関数
  - カスタムフック
  - 重要なUIコンポーネント
- **テストファイル配置**: 対象ファイルと同じディレクトリに`*.test.ts(x)`として配置

### E2Eテスト（将来実装予定）
```bash
# Playwrightでの実行
# npm run test:e2e
```

## 📦 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# コード品質チェック
npm run lint          # ESLintの実行
npm run format        # Prettierでのフォーマット
npm run format:check  # フォーマットチェック
npm run type-check    # TypeScriptの型チェック

# テスト
npm run test          # テスト実行
npm run test:watch    # ウォッチモード
npm run test:coverage # カバレッジ測定
```

## 🚀 デプロイ手順

### 本番環境へのデプロイ（将来実装時）

1. **環境変数の設定**
   - 本番環境用の環境変数を設定

2. **ビルドの実行**
   ```bash
   npm run build
   ```

3. **デプロイ**
   - Vercel、AWS、またはその他のホスティングサービスにデプロイ

## 📚 参考資料

- [システム要件書](./doc/system-requirements/system-requirements-main.md)
- [システム設計書](./doc/system-design/system-design-main.md)
- [研究資料リンク集](./doc/research-resources.md)

## 🤝 貢献方法

1. Issueを作成して機能要望やバグ報告
2. フォークしてブランチを作成
3. 変更をコミット（コミット規約に従う）
4. プルリクエストを作成

## 📝 ライセンス

本プロジェクトは[MITライセンス](LICENSE)の下で公開されています。