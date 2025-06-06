# プロジェクト基本構造の作成

## 概要
フロントエンド（React + TypeScript）とバックエンド（Node.js + Express + TypeScript）の基本プロジェクト構造を作成し、開発環境を整備します。

## 詳細仕様
### フロントエンド
- Viteを使用したReact + TypeScriptプロジェクトの初期化
- Redux Toolkitの設定
- Material-UI v5のインストールと基本テーマ設定
- React Routerの設定
- ESLint、Prettierの設定（Airbnbスタイルガイドベース）
- 基本的なディレクトリ構造の作成
  ```
  frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── hooks/
  │   ├── services/
  │   ├── store/
  │   ├── types/
  │   └── utils/
  ```

### バックエンド
- Express + TypeScriptプロジェクトの初期化
- ミドルウェアの基本設定（cors、helmet、morgan等）
- ESLint、Prettierの設定
- 基本的なディレクトリ構造の作成
  ```
  backend/
  ├── src/
  │   ├── controllers/
  │   ├── middlewares/
  │   ├── routes/
  │   ├── services/
  │   ├── types/
  │   ├── utils/
  │   └── validators/
  ```

## 受け入れ条件
- [ ] フロントエンドが`npm run dev`で起動する
- [ ] バックエンドが`npm run dev`で起動する
- [ ] TypeScriptのコンパイルエラーがない
- [ ] ESLintエラーがない
- [ ] Prettierによるコードフォーマットが機能する
- [ ] 基本的なAPIエンドポイント（/api/health）が動作する
- [ ] フロントエンドで基本的なルーティングが動作する

## 技術的考慮事項
- TypeScript 5.xの最新機能を活用
- strict modeを有効化し、型安全性を確保
- 共通の型定義はsharedディレクトリで管理することを検討
- 環境変数の型定義を作成

## 依存関係
- 前提Issue: #1
- ブロックしているIssue: #5, #6, #7, #8

## 見積もり工数
0.5日