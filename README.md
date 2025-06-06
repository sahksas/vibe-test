# TaskFlow - タスク管理システム

## 🎯 プロジェクトの概要

TaskFlowは、中小規模チーム（5-50名）向けの高機能タスク管理Webアプリケーションです。Next.js 15.3.3をベースに構築され、直感的なUIと強力な機能により、チームの生産性向上を支援します。

### 主な機能

- **タスク管理**: タスクの作成、編集、削除、ステータス管理
- **プロジェクト管理**: 複数プロジェクトの並行管理
- **チームコラボレーション**: コメント機能、通知システム
- **権限管理**: ロールベースのアクセス制御
- **リアルタイム更新**: タスクの状態変更を即座に反映

## 🏗️ システムアーキテクチャ

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Frontend      │────▶│    Backend      │────▶│   Database      │
│   (Next.js)     │     │   (Next.js API) │     │  (PostgreSQL)   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │                         │
                                │                         │
                                ▼                         ▼
                        ┌─────────────────┐      ┌─────────────────┐
                        │                 │      │                 │
                        │   Cache/Session │      │   File Storage  │
                        │     (Redis)     │      │  (Future: S3)   │
                        │                 │      │                 │
                        └─────────────────┘      └─────────────────┘
```

## 🛠️ 技術スタック

### フロントエンド

- **Next.js** 15.3.3 - Reactベースのフルスタックフレームワーク
- **React** 19.0.0 - UIライブラリ
- **TypeScript** 5.x - 型安全なJavaScript
- **Material-UI** 7.x - UIコンポーネントライブラリ
- **Redux Toolkit** 2.x - 状態管理
- **Axios** 1.x - HTTPクライアント
- **Tailwind CSS** v4 - ユーティリティファーストCSS

### バックエンド

- **Next.js API Routes** - APIエンドポイント
- **Prisma** 6.x - ORMとデータベース管理
- **JWT** - 認証トークン
- **bcrypt** - パスワードハッシュ化
- **Joi** 17.x - バリデーション
- **Winston** 3.x - ロギング

### データベース & キャッシュ

- **PostgreSQL** 15.x - メインデータベース
- **Redis** 5.x - セッション管理とキャッシュ

### 開発ツール

- **ESLint** 9.x - コード品質管理
- **Prettier** 3.x - コードフォーマッター
- **Docker** - コンテナ化
- **Docker Compose** - ローカル開発環境

## 📋 開発環境のセットアップ

### 前提条件

以下のツールがインストールされている必要があります：

- **Node.js** 20.x 以上
- **npm** 10.x 以上
- **Docker Desktop** 4.x 以上（データベースとRedis用）
- **Git** 2.x 以上

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
   ```

   `.env.local`ファイルを編集し、必要な環境変数を設定してください。

4. **Dockerコンテナの起動**

   ```bash
   docker-compose up -d
   ```

   PostgreSQLとRedisが起動します。

5. **データベースのセットアップ**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

## 🚀 開発環境の起動方法

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動したら、ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

### その他のコマンド

#### コードフォーマット

```bash
npm run format        # コードの自動フォーマット
npm run format:check  # フォーマットチェックのみ
```

#### 型チェック

```bash
npm run type-check
```

#### Lint

```bash
npm run lint
```

#### ビルド

```bash
npm run build
```

#### Prisma関連

```bash
npm run prisma:generate  # Prismaクライアントの生成
npm run prisma:migrate   # マイグレーションの実行
npm run prisma:studio    # Prisma Studioの起動
```

## 📁 プロジェクト構造

```
taskflow/
├── src/                      # ソースコード
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # APIエンドポイント
│   │   ├── (auth)/         # 認証関連ページ
│   │   ├── dashboard/      # ダッシュボード
│   │   └── layout.tsx      # ルートレイアウト
│   ├── components/          # 共通コンポーネント
│   ├── hooks/              # カスタムフック
│   ├── lib/                # ユーティリティ関数
│   ├── store/              # Redux Store
│   └── types/              # TypeScript型定義
├── prisma/                  # Prisma設定
│   ├── schema.prisma       # データベーススキーマ
│   └── migrations/         # マイグレーションファイル
├── public/                  # 静的ファイル
├── docker-compose.yml       # Docker設定
├── .env.example            # 環境変数テンプレート
├── .prettierrc.json        # Prettier設定
├── .editorconfig           # エディタ設定
└── README.md               # このファイル
```

## 🔒 開発規約

### コーディング規約

1. **TypeScript**

   - 厳格な型チェックを有効化
   - `any`型の使用を避ける
   - インターフェースと型エイリアスを適切に使用

2. **React/Next.js**

   - 関数コンポーネントとフックを使用
   - コンポーネントは単一責任の原則に従う
   - カスタムフックでロジックを再利用

3. **命名規則**

   - コンポーネント: PascalCase
   - 関数・変数: camelCase
   - 定数: UPPER_SNAKE_CASE
   - ファイル名: kebab-case

4. **フォーマット**
   - Prettierの設定に従う
   - インデント: スペース2つ
   - セミコロン: あり
   - シングルクォート使用

### Git規約

1. **ブランチ戦略**

   - `main`: 本番環境
   - `develop`: 開発環境
   - `feature/*`: 機能開発
   - `fix/*`: バグ修正

2. **コミットメッセージ**

   ```
   <type>: <subject>

   <body>

   <footer>
   ```

   - type: feat, fix, docs, style, refactor, test, chore
   - subject: 変更内容の要約（50文字以内）
   - body: 詳細な説明（必要に応じて）
   - footer: Issue番号など

## 🧪 テスト実行方法

```bash
npm run test          # テストの実行
npm run test:watch    # ウォッチモード
npm run test:coverage # カバレッジレポート
```

※ 現在、テスト環境は構築中です。

## 🚢 デプロイ手順

### 本番環境へのデプロイ

1. **環境変数の設定**
   本番環境用の環境変数を設定

2. **ビルド**

   ```bash
   npm run build
   ```

3. **起動**
   ```bash
   npm run start
   ```

### Dockerを使用したデプロイ

```bash
docker build -t taskflow .
docker run -p 3000:3000 taskflow
```

## 📚 参考資料

詳細な技術情報については、以下のドキュメントを参照してください：

- [システム要件定義書](./doc/system-requirements/system-requirements-main.md)
- [システム設計書](./doc/system-design/system-design-main.md)
- [参考資料リンク集](./doc/research-resources.md)

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します。プルリクエストを送る前に、以下を確認してください：

1. コーディング規約に従っている
2. テストが通過している
3. Lintエラーがない
4. 適切なコミットメッセージ

## 📄 ライセンス

本プロジェクトは非公開プロジェクトです。無断での複製・配布を禁じます。
