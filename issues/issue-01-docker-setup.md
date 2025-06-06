# Docker環境の構築

## 概要
TaskFlowシステムの開発・本番環境をDocker Composeで構築します。PostgreSQL、Redis、Nginx、フロントエンド、バックエンドの各コンテナを設定し、開発効率を向上させます。

## 詳細仕様
- Docker Composeファイルの作成
  - PostgreSQL 15.xコンテナ（データ永続化設定）
  - Redis 7.xコンテナ（セッション・キャッシュ用）
  - Nginxコンテナ（リバースプロキシ設定）
  - Node.js 20.xベースのバックエンドコンテナ
  - Viteベースのフロントエンドコンテナ
- 環境変数の管理（.env.example作成）
- ボリュームマウントによる開発時のホットリロード設定
- ネットワーク設定（コンテナ間通信）
- 開発用と本番用の設定分離（docker-compose.dev.yml、docker-compose.prod.yml）

## 受け入れ条件
- [ ] `docker-compose up`で全サービスが正常に起動する
- [ ] PostgreSQLへの接続が確認できる
- [ ] Redisへの接続が確認できる
- [ ] フロントエンドがhttp://localhost:3000でアクセス可能
- [ ] バックエンドAPIがhttp://localhost:4000でアクセス可能
- [ ] Nginxがhttp://localhost:80で動作し、適切にプロキシする
- [ ] 開発時のホットリロードが機能する
- [ ] README.mdに起動手順が記載されている

## 技術的考慮事項
- Dockerfileはマルチステージビルドを使用し、イメージサイズを最適化
- セキュリティを考慮し、本番用イメージでは最小権限で実行
- ヘルスチェックの実装で可用性を確保
- 環境変数のセキュアな管理（シークレットは.gitignoreに追加）

## 依存関係
- 前提Issue: なし
- ブロックしているIssue: #2, #3

## 見積もり工数
1日