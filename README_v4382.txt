Abyssal Roots v4.38.2 ACTOR VISIBILITY FIX

修正内容:
- actorLayer の absolute 基準を CSS variable で Canvas と完全同期
- 新規生成した主人公/敵DOMへ即座にセル幅・高さを設定（0x0px対策）
- SafariでDOMスプライト表示が成立しない場合のみCanvas描画へ自動フォールバック
- 壁の既知領域の暗幕を弱め、輪郭を補助
- v4.38 GPU layered renderer の軽量化構造は維持

更新は index.html と sw.js の上書きでOKです。
assetsフォルダ不要。
