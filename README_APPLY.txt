Abyssal Roots v4.35 ICONIC TACTICS - 適用手順

1. リポジトリ直下に tools フォルダを作成し、apply-avatar-redesign.mjs を tools/apply-avatar-redesign.mjs として配置。
2. リポジトリ直下で以下を実行:
   node tools/apply-avatar-redesign.mjs
3. 更新対象:
   - index.html
   - README_iPhone.txt
   - sw.js
4. 変更確認後コミット:
   git add index.html README_iPhone.txt sw.js tools/apply-avatar-redesign.mjs
   git commit -m "Implement v4.35 iconic tactical avatar redesign"
   git push

GitHub Actionsで自動適用する場合:
- apply-avatar-redesign.yml を .github/workflows/apply-avatar-redesign.yml に配置。
- GitHub Actions の GITHUB_TOKEN に contents: write が許可されている必要があります。

実装方針:
- save schema version=4 は維持。
- 内部 hair キーは互換性のため残すが、ゲーム上は MASK / VISOR として完全再利用。
- 髪・肌顔の描画を廃止し、面甲/バイザー/環を使った人型アイコンへ刷新。
- BODY / OUTERWEAR 30種、MASK / VISOR 30種、FLOATING RELIC 30種へ総入れ替え。
- 既存 shape/color/sigil を SHOULDER / MANTLE、COLOR PALETTE、SIGIL / EMBLEM としてUI再編。
- 戦闘、当たり判定、敵AI、進行データは変更しない。
