# vibe-coding

## 概要

Vibe コーディングを行うときのリポジトリテンプレートです。

![img](https://private-user-images.githubusercontent.com/8337910/451841811-409b237f-aa0d-4750-85fc-d542cf48ed2d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDkxMjEzMjUsIm5iZiI6MTc0OTEyMTAyNSwicGF0aCI6Ii84MzM3OTEwLzQ1MTg0MTgxMS00MDliMjM3Zi1hYTBkLTQ3NTAtODVmYy1kNTQyY2Y0OGVkMmQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI1MDYwNSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA2MDVUMTA1NzA1WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ZGVlMGU0OTc0NmQ0NjBiYWRkZTFmMmU1MWZiYmJmMDkwY2ZmNWYxZTQwODNjYmNjZDEzYzA1YTRlMTNhNDJmZCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.f9Rf8n7S_aEwxIUY8OC11C8quPOW8pAKQtQtFnApwAM)

Repository template で選択してご利用ください。

テンプレートから作成後は、以下の手順を参考にプロジェクトの初期設定を行ってください。

## 使用方法

1. 任意のフレームワークのテンプレートをコピー(環境構築)
2. `README.md`(このファイル)をクリア
3. `README.md` の更新を AI agent へ依頼
4. ドキュメントのコミット
5. 環境の再構築と `README.md`の更新を AI agent へ依頼
6. 動作確認
7. フィードバック

### 任意のフレームワークのテンプレートをコピー(環境構築)

開発の元となるソースコードを準備して開発環境を構築します。

```bash
# Drupal の例
composer create-project drupal/recommended-project my-drupal-site

# Next.js の例
npx create-next-app@latest my-app --typescript --tailwind --app

# その他、ソースコードをコピペなど
```

### `README.md`(このファイル)をクリア

このファイルの内容を全て削除します。

```bash
echo "" > README.md
```

必ずこの手順を行ってから、次の手順へ進んでください。
そうしなければ、AI agent が余計な情報を読み込んでしまい、正しい `README.md` を生成できません。

### `README.md` の更新を AI agent へ依頼

AI agent へ `README.md` の更新を依頼します。

```markdown
現在のリポジトリ全体の構造とコードを分析して、README.md を作成してください。
以下の内容を含めてください：

1. プロジェクトの概要(ファイル構造とコードから推測される内容)
2. 使用されている技術スタック
3. 環境構築手順（WSL2 と OSX の 2 種類を記載。同じ手順の場合は 1 つにまとめる）
   - 必要な前提条件(Node.js、PHP、Composer、Docker など)
   - インストール手順
   - 初期設定方法
4. 開発環境の起動方法
5. プロジェクトの構造説明
```

### ドキュメントのコミット

2 つのディレクトリへドキュメントを格納してコミットしてください。
ドキュメントは Markdown 形式を推奨します。

#### doc/system-design/

システム要件定義書を格納するディレクトリです。
参照する img は `doc/system-design/img` に格納してください。

#### doc/technical-design/

システム機能設計書を格納するディレクトリです。
参照する img は `doc/technical-design/img` に格納してください。

### 環境の再構築と `README.md` の更新を AI agent へ依頼

ドキュメントの内容を反映し、開発環境を最適化するとともに、README.md を更新します。

```markdown
現在のリポジトリとドキュメント(doc/system-design/、doc/technical-design/)を分析して、以下を実行してください：

【環境構築の最適化】
開発環境のセットアップのみを行い、機能の実装は行わないでください。

1. ドキュメントに記載された要件に基づく追加パッケージのインストール

   - 将来的に必要となるライブラリやフレームワークの準備のみ
   - 機能実装は行わない

2. 開発効率を向上させるツールの導入

   - コードフォーマッター(Prettier、PHP CS Fixer など)
   - リンター(ESLint、PHPStan など)

3. IDE/エディタ設定ファイルの作成

   - .vscode/settings.json
   - .editorconfig

4. 環境変数の設定ファイルテンプレート作成(.env.example)

   - 必要な環境変数の定義のみ(値は空またはサンプル値)

5. 開発用の基盤整備
   - データベース接続設定(実際のテーブル作成は行わない)
   - ディレクトリ構造の整備
   - 設定ファイルの準備

注意: この段階では環境準備のみを行い、実際の機能開発やビジネスロジックの実装は行いません。

【README.md の更新】
以下の内容を追加・更新してください：

1. プロジェクトの概要(ドキュメントの要件定義・機能設計を反映)
2. システムアーキテクチャの概要
3. 開発環境のセットアップ手順(WSL2 と OSX の 2 種類を記載。同じ手順の場合は 1 つにまとめる)
4. 開発規約・コーディング規約
5. テストの実行方法
6. デプロイ手順(もしドキュメントに記載があれば)
```

### 動作確認

AI agent が環境構築を完了したら、ローカル環境で動作確認を行ってください。
環境の構築方法などは README.md に記載されているはずなので、それに従ってください。

### フィードバック

このリポジトリは未完成です。
改善の余地があると感じた場合は、ぜひ PR をお願いします！
