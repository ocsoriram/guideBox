# 技術スタックまとめ

## フロントエンド
- Next.js 15.5.4
- node:22-alpine

## バックエンド
- Spring Boot 3.5.6
  - Java 17
  - TDD

## 開発環境

## CI/CD
- CI/CD ツールやパイプライン

## データベース (DB)
- CloudSQL
  - PostgreSQL

## インフラ
- Deploy
  - Google Cloud
- Docker
  - Kubernetes
    - マイクロサービス


## ディレクトリ構成案

helloworld-docker/
├─ docker-compose.yml
├─ frontend/
│  ├─ Dockerfile
│  ├─ next.config.mjs
│  ├─ package.json
│  └─ pages/
│     └─ index.js
└─ backend/
   ├─ Dockerfile
   ├─ pom.xml
   └─ src/main/java/com/example/demo/
      ├─ DemoApplication.java
      └─ HelloController.java
