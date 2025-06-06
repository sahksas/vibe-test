# vibe-test

## 🎯 プロジェクトの概要

本プロジェクトは、Next.js 15.3.3 を使用した最新のウェブアプリケーションです。React 19、TypeScript、Tailwind CSS v4 を採用し、モダンな開発環境を構築しています。Turbopackによる高速な開発体験を提供し、App Routerを使用した次世代のNext.jsアーキテクチャを実装しています。

## 🛠️ 技術スタック

### コア技術
- **Next.js** 15.3.3 - Reactベースのフルスタックフレームワーク
- **React** 19.0.0 - UIライブラリ
- **TypeScript** 5.x - 型安全なJavaScript

### スタイリング
- **Tailwind CSS** v4 - ユーティリティファーストCSSフレームワーク
- **PostCSS** - CSSトランスフォーマー

### 開発ツール
- **ESLint** 9.x - コード品質管理
- **Turbopack** - 高速な開発ビルドツール

## 📋 環境構築手順

### 前提条件

以下のツールがインストールされている必要があります：

- **Node.js** 18.20.0 以上（推奨: 20.x）
- **npm** 10.x 以上（Node.jsに含まれています）

### インストール手順（WSL2 / macOS 共通）

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/sahksas/vibe-test.git
   cd vibe-test
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**（必要に応じて）
   ```bash
   cp .env.example .env.local
   ```
   ※ 現在は環境変数の設定は不要です

## 🚀 開発環境の起動方法

### 開発サーバーの起動
```bash
npm run dev
```

開発サーバーが起動したら、ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。
Turbopackにより高速なホットリロードが有効になっています。

### その他のコマンド

#### 本番用ビルド
```bash
npm run build
```

#### 本番サーバーの起動
```bash
npm run start
```

#### Lintの実行
```bash
npm run lint
```

## 📁 プロジェクトの構造説明

```
vibe-test/
├── src/                    # ソースコード
│   └── app/               # App Router ディレクトリ
│       ├── favicon.ico    # ファビコン
│       ├── globals.css    # グローバルスタイル
│       ├── layout.tsx     # ルートレイアウト
│       └── page.tsx       # トップページコンポーネント
├── public/                # 静的ファイル
│   ├── file.svg          # SVGアイコン
│   ├── globe.svg         # SVGアイコン
│   ├── next.svg          # Next.jsロゴ
│   ├── vercel.svg        # Vercelロゴ
│   └── window.svg        # SVGアイコン
├── doc/                   # ドキュメント
│   ├── research-resources.md    # 参考資料リンク集
│   ├── system-design/          # システム設計ドキュメント（読み取り専用）
│   └── system-requirements/    # システム要件ドキュメント（読み取り専用）
├── RULES/                 # プロジェクトルール
│   ├── AI_COMMON_RULES.md      # AI実装ガイドライン（読み取り専用）
│   └── REPOSITORY_RULES.md     # リポジトリ固有ルール（読み取り専用）
├── CLAUDE.md             # Claude AI用の指示書
├── eslint.config.mjs     # ESLint設定
├── next.config.ts        # Next.js設定
├── package.json          # プロジェクト設定と依存関係
├── postcss.config.mjs    # PostCSS設定
└── tsconfig.json         # TypeScript設定
```

### 主要ディレクトリの説明

- **`src/app/`**: Next.js App Routerを使用したアプリケーションコード
  - `layout.tsx`: アプリケーション全体のレイアウトを定義
  - `page.tsx`: トップページのコンポーネント
  - `globals.css`: Tailwind CSSを含むグローバルスタイル

- **`public/`**: 静的アセット（画像、アイコンなど）を配置

- **`doc/`**: プロジェクトドキュメント
  - 開発時の参考資料へのリンクを含む

- **`RULES/`**: プロジェクトの開発ルールとガイドライン

### 設定ファイル

- **`tsconfig.json`**: TypeScriptの厳格な型チェックを有効化し、`@/`エイリアスで`src/`ディレクトリへのインポートをサポート
- **`tailwind.config.ts`**: Tailwind CSS v4の設定
- **`eslint.config.mjs`**: Next.jsのベストプラクティスに基づくLint設定

## 🔧 開発のヒント

- ファイルを編集すると自動的にブラウザがリロードされます
- TypeScriptの型エラーはブラウザとターミナルの両方に表示されます
- `src/app/page.tsx`を編集してトップページをカスタマイズできます
- Tailwind CSSのクラスを使用してスタイリングを行います