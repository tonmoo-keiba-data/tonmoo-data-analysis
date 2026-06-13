# とんもぉ～のデータ分析

競馬の条件別集計を公開する静的サイトです。GitHub Pagesへそのまま配置できます。

## ローカル確認

```powershell
python -m http.server 4173 --directory .
```

ブラウザで `http://localhost:4173` を開きます。

## データ追加

1. `index.html` の `data-grid` 内に分析カードを追加
2. `app.js` の `articles` に詳細記事を追加
3. カードの `data-search`、`data-surface`、`data-class` を設定

## 公開前確認

- 元CSV、TARGET画面、ローカルパスを公開しない
- 本名、個人メール、APIキーを含めない
- 独自集計値と考察だけを掲載する
- 画像の利用権を確認する
