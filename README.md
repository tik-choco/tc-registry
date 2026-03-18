# tc-registry

シンプルな JSON ベースの登録所です。

## 追加方法
1. [Issues](https://github.com/tik-choco/tc-registry/issues)を開く
2. **「アプリ追加申請」** テンプレートを選択
3. `アプリ名` / `URL` を入力して Issue を作成

> Issue が作成されると GitHub Actions が自動で `apps.json` に追記します。

## データ構造
- `id` (UUID v4)
- `url`
- `title`
- `hostname` (URL から自動生成)
- `addedAt` (Unix epoch ミリ秒)

## Raw データ
- `https://raw.githubusercontent.com/tik-choco/tc-registry/main/apps.json`
