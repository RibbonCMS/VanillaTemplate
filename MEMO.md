Next.js プロジェクトの作成:

```
$ docker compose run --rm -u node node npx create-next-app@latest
～～（略）～～
Would you like to use `src/` directory? Yes
Would you like to use App Router? (recommended) No   # Webサイトを作るのは No にした方がやりやすいため
～～（略）～～
```

プロジェクトディレクトリの名前を `src` へ変更:

```
mv ./<PROJECT_DIR>/ ./src/
```

Q. なぜ変更が必要か？
A. sideM で `front/src/` へコピーする仕様になっているから: https://github.com/RibbonCMS/RibbonCMS_sideM/blob/main/models/consts.py#L89

npm コマンドを最新版へ更新:

```
$ docker compose run --rm node node bash -c "cd ./src/ && npm i npm@latest"
```

固定ページの JSON ファイルは `contents/fixed/` へコピーされる仕様: https://github.com/RibbonCMS/RibbonCMS_sideM/blob/main/models/consts.py#L96

新しく固定ページを作りたい場合、 `components/pages/fixed/` に専用のディレクトリを作ってそこへ実装する。

実装する必要があるものは次のとおり:

- 固定ページ用のコンポーネントファイル
- sideM から渡された固定ページ用 JSON ファイルの型やデフォルト値などを定義するファイル（JSON 定義ファイル）

JSON 定義ファイルで定義する必要があるものは次の通り:

- JSON ファイルのパス（ `contents/fixed/<YOUR_FIXED_PAGE_JSON>.json` ）
- JSON の中身がどうなっているかの型定義
- 型のデフォルト値
