# RESAS Graph App

課題提出当時のコードは[タグ](https://github.com/h-yoshikawa44/resas-graph-app/releases/tag/submitted_for_examination)参照。  
提出以降も少しメンテナンスしている。

## 構成

- Node.js：20.9.0
- TypeScript：5.3.3
- Next.js：14.1.0

API

- [RESAS API](https://opendata.resas-portal.go.jp/)

※Node.js のバージョン管理には [Volta](https://volta.sh/) を使用。

## 環境構築

RESAS API に登録して、API Key を取得 + .env.example をコピーして値をセットする（初回のみ）

```bash
cp .env.example .env.local
```

コミットメッセージテンプレ反映（初回のみ）

```bash
git config commit.template .gitmessage
```

ライブラリインストール + Pre Commit 設定反映

```bash
npm install
```

開発サーバ起動

```
npm run dev
```

ブラウザでアクセス

```
localhost:3000
```
