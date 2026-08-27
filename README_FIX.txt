Abyssal Roots - 武器0個時の進行不能 修正

使い方:
1. このZIPを解凍
2. 解凍したフォルダの「中身」をすべて、GitHubの abyssal-roots リポジトリ直下へアップロード
3. Commit changes
4. GitHub Actions が自動実行され、index.html を修正

修正内容:
- 倉庫武器が0個
- 次回出撃武器も未設定
- 初期武器も未選択

この状態でも進行不能にならず、無料の一時武器「旅人の剣」を自動で補充して出撃可能にします。
旅人の剣は既存の starter 装備仕様を使うため、持ち帰り不可・倉庫保存不可のままです。

アップロードするもの:
.github/
tools/
README_FIX.txt
