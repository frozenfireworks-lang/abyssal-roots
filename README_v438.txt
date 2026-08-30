ABYSSAL ROOTS v4.38 GPU LAYERED RENDERER

GitHubへの更新は index.html と sw.js の2ファイルを上書きしてください。
assetsフォルダは不要です。128px系の画像素材はindex.htmlへ埋め込まれています。

主な変更:
- 床/壁を常駐terrain canvasへ分離
- 宝箱/祭壇/階段/アイテム等をprop canvasへ分離し、状態変化時だけ更新
- 主人公/敵をDOM actor layerへ移動し、CSS translate3dで移動
- 敵が存在するだけではCanvasを60fps化しない
- ランタン/結晶/炎/レリックの発光テクスチャをキャッシュ
- 128pxソースアートとv4.37のビジュアル方向は維持
