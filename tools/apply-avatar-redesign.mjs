import fs from 'node:fs';

const INDEX = 'index.html';
const README = 'README_iPhone.txt';
const SW = 'sw.js';
let html = fs.readFileSync(INDEX, 'utf8');

function replaceBetween(startMarker, endMarker, replacement, label) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0) throw new Error(`Patch marker not found: ${label}`);
  html = html.slice(0, start) + replacement.trim() + '\n' + html.slice(end);
}

function replaceRequired(from, to, label) {
  if (!html.includes(from)) throw new Error(`Required text not found: ${label}`);
  html = html.replace(from, to);
}

const foundationData = `
const appearanceFoundationData={
 guide:{label:"深淵巡礼外套",desc:"細い縦線と青い導光を持つ基準外套。",silhouette:"pilgrim",body:"#080d12",body2:"#13202a",lining:"#2b7890",metal:"#d2b66b"},
 spellblade:{label:"断章執行衣",desc:"片側だけを長く落とした戦闘用ローブ。",silhouette:"spellblade",body:"#0b0b10",body2:"#24191e",lining:"#8e3948",metal:"#d9b56c"},
 hunter:{label:"根狩り機動装",desc:"短い裾と非対称ベルトで動きを強調する軽装。",silhouette:"hunter",body:"#090f12",body2:"#172a2c",lining:"#2c8a82",metal:"#bfae72"},
 pilgrim:{label:"白骨典礼衣",desc:"象牙色の前垂れを持つ静かな祭装。",silhouette:"pilgrim",body:"#0b0d10",body2:"#31343a",lining:"#d8d1bf",metal:"#b99b58"},
 brassWarden:{label:"古銅守衛衣",desc:"真鍮縁を太く残した直線的な守衛装。",silhouette:"guide",body:"#0d0c0a",body2:"#33291b",lining:"#b8873d",metal:"#f0cf78"},
 voidWeaver:{label:"虚界編織衣",desc:"紫の細線が交差する深層術衣。",silhouette:"spellblade",body:"#090811",body2:"#211a32",lining:"#74559b",metal:"#c9b7dd"},
 crimsonJudge:{label:"血蝕審判衣",desc:"黒布に赤い断線を刻んだ処刑装。",silhouette:"spellblade",body:"#100809",body2:"#331214",lining:"#a6343a",metal:"#cf9d61"},
 lumenWarden:{label:"寂光守望衣",desc:"淡い光を縁へ集める監視者の外套。",silhouette:"pilgrim",body:"#0a0f10",body2:"#253132",lining:"#a6d7d2",metal:"#d6bd7b"},
 rootAegis:{label:"根脈防護衣",desc:"根の分岐を思わせる胸部ラインを持つ重衣。",silhouette:"guide",body:"#0a0b0d",body2:"#202526",lining:"#53665b",metal:"#a78d57"},
 cyanVicar:{label:"蒼晶司祭衣",desc:"青晶の発光帯を一本だけ通した細身祭衣。",silhouette:"pilgrim",body:"#070c12",body2:"#112637",lining:"#38a4c4",metal:"#c6a35f"},
 ironCantor:{label:"鉄唱導衣",desc:"金属襟と短い肩布で輪郭を締めた導衣。",silhouette:"guide",body:"#0d0e10",body2:"#292c30",lining:"#747a82",metal:"#c7b56f"},
 eclipseRobe:{label:"蝕環長衣",desc:"黒い円環意匠を背に持つ長衣。",silhouette:"pilgrim",body:"#07070b",body2:"#181524",lining:"#6f5e8d",metal:"#bca46f"},
 shardDuelist:{label:"晶刃決闘衣",desc:"腰布を切り分けた軽快な決闘装。",silhouette:"spellblade",body:"#091014",body2:"#18313a",lining:"#47a7b9",metal:"#d7ba74"},
 ashMonk:{label:"灰律修道衣",desc:"灰白の帯だけを残した無彩色の修道装。",silhouette:"pilgrim",body:"#101113",body2:"#36383b",lining:"#b5b2aa",metal:"#8f8774"},
 emberSeer:{label:"残火観測衣",desc:"煤黒に橙の観測線を刻む術衣。",silhouette:"guide",body:"#100b08",body2:"#302019",lining:"#b96535",metal:"#d8ad6b"},
 tideOracle:{label:"深潮託宣衣",desc:"青緑の内布が揺れる長い託宣衣。",silhouette:"pilgrim",body:"#071012",body2:"#123035",lining:"#3a8f91",metal:"#b8a66e"},
 paleExecutor:{label:"白骸執行衣",desc:"白い前面装甲と黒布を分けた執行装。",silhouette:"spellblade",body:"#090a0c",body2:"#303237",lining:"#ded9cb",metal:"#a68f5b"},
 duskRanger:{label:"暮影斥候衣",desc:"裾を短く絞った暗色の斥候装。",silhouette:"hunter",body:"#090b0d",body2:"#20262d",lining:"#526b7c",metal:"#9f8e62"},
 oracleBlack:{label:"黒律神託衣",desc:"光をほぼ吸う黒地に一本の金線だけを残す。",silhouette:"pilgrim",body:"#050607",body2:"#101215",lining:"#9d7b3e",metal:"#d5b66b"},
 cyanMarshal:{label:"蒼線元帥衣",desc:"肩から裾へ青い命令線を通した軍装。",silhouette:"guide",body:"#080d11",body2:"#182533",lining:"#397ea8",metal:"#c2a764"},
 relicBearer:{label:"遺物担持衣",desc:"浮遊遺物と干渉しない短い外套構成。",silhouette:"hunter",body:"#0b0c0d",body2:"#282b27",lining:"#7a7459",metal:"#c1a26a"},
 rootHerald:{label:"根告使の礼装",desc:"胸部に根紋の縦飾りを持つ伝令礼装。",silhouette:"guide",body:"#0a0d0c",body2:"#1e2923",lining:"#54765c",metal:"#c4aa66"},
 violetLancer:{label:"紫環槍礼衣",desc:"紫の円環と細い裾を組み合わせた槍礼衣。",silhouette:"spellblade",body:"#090811",body2:"#2b1d39",lining:"#855bb0",metal:"#c9aa6b"},
 frostCanticle:{label:"霜唱聖衣",desc:"霜色の帯を左右非対称に垂らす聖衣。",silhouette:"pilgrim",body:"#0b0e11",body2:"#2b343b",lining:"#b8d0d6",metal:"#d0b776"},
 redPilgrim:{label:"赤誓巡礼衣",desc:"深紅の裏地を一筋だけ見せる巡礼衣。",silhouette:"pilgrim",body:"#0d0809",body2:"#291317",lining:"#8f3038",metal:"#c19b5f"},
 obsidianKnight:{label:"黒曜騎礼衣",desc:"黒曜の板片を胸と肩にだけ配した騎礼装。",silhouette:"guide",body:"#060709",body2:"#181b20",lining:"#414b58",metal:"#b99b61"},
 azureNomad:{label:"蒼灰遊行衣",desc:"青灰布を重ねた旅人の細身外套。",silhouette:"hunter",body:"#091014",body2:"#22313a",lining:"#60879b",metal:"#b5a173"},
 brassOracle:{label:"金環託宣衣",desc:"真鍮の円環意匠を胸元に持つ託宣衣。",silhouette:"pilgrim",body:"#0c0b09",body2:"#302719",lining:"#a98545",metal:"#efd27e"},
 deepSentinel:{label:"最深監視衣",desc:"最深層の暗色と青い監視線で構成する重衣。",silhouette:"guide",body:"#05080c",body2:"#101b27",lining:"#255d81",metal:"#9faeae"},
 namelessIcon:{label:"無名標識衣",desc:"顔ではなく輪郭そのものを記号化する最小構成。",silhouette:"spellblade",body:"#07090b",body2:"#171b1f",lining:"#d0b56d",metal:"#e2d5a4"}
};`;

const maskData = `
const appearanceHairData={
 silver:{label:"無垢面甲",desc:"象牙色の無表情フェイスプレート。",shape:"monolith",base:"#d8d4c7",light:"#fff8df",shadow:"#77756f"},
 night:{label:"黒鏡バイザー",desc:"光を細い横線だけで返す黒鏡面。",shape:"visor",base:"#181b21",light:"#7ddfff",shadow:"#05070a"},
 teal:{label:"蒼晶視界",desc:"青晶の一点光を持つ観測面甲。",shape:"eye",base:"#aeb8b2",light:"#5be1e8",shadow:"#364b50"},
 white:{label:"霜骨面甲",desc:"骨白の縦割れを持つ静かな仮面。",shape:"split",base:"#ece7da",light:"#ffffff",shadow:"#8c9393"},
 ash:{label:"灰律面甲",desc:"灰鉄の細い十字溝を刻んだ標準面。",shape:"cross",base:"#8d9092",light:"#d9d9d4",shadow:"#454a50"},
 brass:{label:"古銅審判面",desc:"真鍮の縁取りと暗い中央面を持つ。",shape:"judge",base:"#b48a47",light:"#efd27f",shadow:"#4d3822"},
 hollow:{label:"空洞観測面",desc:"中央を黒く抜いた無貌の観測器。",shape:"hollow",base:"#d0c9b8",light:"#74d8e7",shadow:"#15191d"},
 slit:{label:"一線視界面",desc:"一本の発光スリットだけを残した面甲。",shape:"visor",base:"#30353b",light:"#56cbe9",shadow:"#0c0f13"},
 twin:{label:"双点測距面",desc:"左右二点の光で距離を測る戦術面。",shape:"eye",base:"#c2beb2",light:"#7fe7e5",shadow:"#525b5d"},
 eclipse:{label:"蝕環面甲",desc:"額に欠けた円を置く儀礼面。",shape:"ring",base:"#d4cfc3",light:"#a88ad1",shadow:"#5a5069"},
 crimson:{label:"血蝕執行面",desc:"赤い縦線を刻む処刑者の面甲。",shape:"split",base:"#bfb5aa",light:"#e35b5f",shadow:"#5a262b"},
 lumen:{label:"寂光監視面",desc:"淡い青白光で輪郭だけを浮かせる。",shape:"visor",base:"#d9e1dc",light:"#b8fff0",shadow:"#677573"},
 root:{label:"根紋面甲",desc:"細い根脈の溝が中心へ収束する。",shape:"cross",base:"#b8b39f",light:"#8bc49a",shadow:"#4c5548"},
 shard:{label:"晶片面甲",desc:"片側だけ尖った結晶的シルエット。",shape:"split",base:"#c9d4d6",light:"#6ad8ee",shadow:"#52656d"},
 void:{label:"虚界無貌面",desc:"紫の一点だけを残す漆黒面。",shape:"hollow",base:"#191522",light:"#b47cea",shadow:"#050407"},
 oracle:{label:"託宣三線面",desc:"三本の短い縦光で意思を示す。",shape:"judge",base:"#d0c7b6",light:"#e2bd70",shadow:"#5b5145"},
 sentinel:{label:"監視者面甲",desc:"額と顎を鋭く絞った警戒用面。",shape:"eye",base:"#b7c0c5",light:"#62bfe3",shadow:"#414b55"},
 knight:{label:"黒曜騎面",desc:"黒曜色の重い輪郭と金の一点光。",shape:"monolith",base:"#24272c",light:"#d6b45e",shadow:"#07080a"},
 priest:{label:"白祷面甲",desc:"祈祷記号を最小限に刻んだ白面。",shape:"cross",base:"#eee9dc",light:"#d4bc7a",shadow:"#77746d"},
 hunterMask:{label:"狩標バイザー",desc:"横長の暗視線と短い顎部を持つ。",shape:"visor",base:"#596166",light:"#5cd4cb",shadow:"#1d2326"},
 redline:{label:"赤線測距面",desc:"細い赤光のみで敵を捉える。",shape:"visor",base:"#2e2a2b",light:"#ef5a64",shadow:"#0a0809"},
 moonplate:{label:"月環面甲",desc:"額の小さな環で深淵光を受ける。",shape:"ring",base:"#cfd5d2",light:"#dceeff",shadow:"#626d75"},
 goldplate:{label:"金律面甲",desc:"縦の金属帯を一本だけ通した儀礼面。",shape:"judge",base:"#ad9a76",light:"#f0d47f",shadow:"#51452f"},
 cyanplate:{label:"蒼環面甲",desc:"シアンの円点を中心に置く象徴面。",shape:"ring",base:"#aababc",light:"#55e4ed",shadow:"#3f5a61"},
 purpleplate:{label:"紫断面甲",desc:"斜めに切れた紫光を持つ術者面。",shape:"split",base:"#716b7d",light:"#c88bf0",shadow:"#292432"},
 boneplate:{label:"骨碑面甲",desc:"墓碑のような縦長輪郭を持つ。",shape:"monolith",base:"#d7d0bd",light:"#fff4d8",shadow:"#726b5d"},
 thornplate:{label:"棘印面甲",desc:"額の小さな棘形だけで階級を示す。",shape:"judge",base:"#8b8e86",light:"#b9d08f",shadow:"#40453d"},
 deepplate:{label:"深核面甲",desc:"中心孔に最深部の青を封じた面甲。",shape:"hollow",base:"#8b9aa5",light:"#3e9ee1",shadow:"#172434"},
 silent:{label:"静寂面甲",desc:"発光を抑えた完全無記号の白面。",shape:"monolith",base:"#dad7ce",light:"#efede6",shadow:"#74736e"},
 icon:{label:"標識面甲",desc:"遠目でも一目で主人公と分かる環付き象徴面。",shape:"ring",base:"#e5dfcf",light:"#58dce7",shadow:"#665f53"}
};`;

const focusData = `
const appearanceFocusData={
 lantern:{label:"蒼核ペンダント",desc:"菱形の青核が一定距離を浮遊する。",kind:"lantern",core:"#eaffff",mid:"#42b9d4",glow:"rgba(66,185,212,.36)"},
 prism:{label:"虚界プリズム",desc:"紫光を分光する細長い晶体。",kind:"prism",core:"#f6e9ff",mid:"#a56ad3",glow:"rgba(165,106,211,.34)"},
 wisp:{label:"根火ビーコン",desc:"根の火を封じた小型浮遊標識。",kind:"wisp",core:"#dfffdc",mid:"#4aa071",glow:"rgba(74,160,113,.34)"},
 orbit:{label:"白環レリック",desc:"白い小核が細い環状軌道を描く。",kind:"orbit",core:"#ffffff",mid:"#a9dbea",glow:"rgba(169,219,234,.35)"},
 brassEye:{label:"古銅観測眼",desc:"真鍮枠の一点観測レリック。",kind:"lantern",core:"#fff3bd",mid:"#c28b3f",glow:"rgba(194,139,63,.32)"},
 cyanShard:{label:"蒼晶片",desc:"鋭い晶片が肩の外側を追従する。",kind:"prism",core:"#e9ffff",mid:"#39c5de",glow:"rgba(57,197,222,.36)"},
 voidOrb:{label:"虚無小球",desc:"黒い中心を紫の輪が囲む。",kind:"orbit",core:"#ddcaff",mid:"#725199",glow:"rgba(114,81,153,.34)"},
 redBeacon:{label:"血蝕標識",desc:"敵対時だけ赤く強く点灯する標識。",kind:"lantern",core:"#ffd5cc",mid:"#c8474d",glow:"rgba(200,71,77,.34)"},
 frostCore:{label:"霜核",desc:"白青の核が低い軌道で漂う。",kind:"wisp",core:"#ffffff",mid:"#9bd0dc",glow:"rgba(155,208,220,.34)"},
 lumenHalo:{label:"寂光環",desc:"淡い青白の小環が静止する。",kind:"orbit",core:"#effffb",mid:"#91d8cc",glow:"rgba(145,216,204,.32)"},
 rootSigil:{label:"根脈標本",desc:"根片を封じた縦長の浮遊器。",kind:"prism",core:"#e6ffd9",mid:"#719465",glow:"rgba(113,148,101,.3)"},
 judgeSeal:{label:"審判封印",desc:"金の角形枠が回転する。",kind:"orbit",core:"#fff0b0",mid:"#a97832",glow:"rgba(169,120,50,.3)"},
 blackLamp:{label:"黒灯",desc:"外殻は黒く、中心だけが青く灯る。",kind:"lantern",core:"#baf8ff",mid:"#245a6b",glow:"rgba(36,90,107,.3)"},
 twinShard:{label:"双晶片",desc:"二枚の晶片が上下にずれて浮く。",kind:"prism",core:"#f2ffff",mid:"#58aabc",glow:"rgba(88,170,188,.32)"},
 emberWisp:{label:"残火核",desc:"橙の小火が不規則に脈動する。",kind:"wisp",core:"#fff0c3",mid:"#c56f39",glow:"rgba(197,111,57,.33)"},
 tideOrb:{label:"深潮球",desc:"青緑の球核がゆっくり公転する。",kind:"orbit",core:"#e3ffff",mid:"#368d91",glow:"rgba(54,141,145,.33)"},
 oracleNeedle:{label:"託宣針",desc:"細い針状レリックが進行方向を指す。",kind:"prism",core:"#fff5cf",mid:"#b99b5a",glow:"rgba(185,155,90,.3)"},
 silentCore:{label:"静寂核",desc:"発光を抑えた灰白の小核。",kind:"wisp",core:"#e5e2da",mid:"#777a78",glow:"rgba(119,122,120,.22)"},
 redOrbit:{label:"赤環",desc:"深紅の輪が一点核を囲む。",kind:"orbit",core:"#ffd7d7",mid:"#a73842",glow:"rgba(167,56,66,.34)"},
 azureEye:{label:"蒼眼",desc:"視線のような横長光を持つ観測器。",kind:"lantern",core:"#e9ffff",mid:"#3d9fc7",glow:"rgba(61,159,199,.35)"},
 paleShard:{label:"白骸晶",desc:"骨白の晶体に淡い金線が走る。",kind:"prism",core:"#fffbea",mid:"#c6b579",glow:"rgba(198,181,121,.29)"},
 violetWisp:{label:"紫幽火",desc:"紫の幽火を幾何学殻に封じる。",kind:"wisp",core:"#f4e5ff",mid:"#8655ad",glow:"rgba(134,85,173,.34)"},
 brassOrbit:{label:"古銅環",desc:"三つの真鍮片が小核を周回する。",kind:"orbit",core:"#fff2b8",mid:"#9f753a",glow:"rgba(159,117,58,.3)"},
 rootEye:{label:"根眼",desc:"緑灰の核が根脈模様を投影する。",kind:"lantern",core:"#efffe0",mid:"#648360",glow:"rgba(100,131,96,.3)"},
 duskShard:{label:"暮影晶",desc:"暗い青灰の晶体が時折だけ光る。",kind:"prism",core:"#dae7ef",mid:"#52697a",glow:"rgba(82,105,122,.28)"},
 bloodWisp:{label:"血点火",desc:"赤い一点火が短い尾を引く。",kind:"wisp",core:"#ffe0d8",mid:"#a43a3d",glow:"rgba(164,58,61,.33)"},
 moonOrbit:{label:"月欠環",desc:"欠けた白環が静かに公転する。",kind:"orbit",core:"#ffffff",mid:"#b8c5d5",glow:"rgba(184,197,213,.3)"},
 cyanBeacon:{label:"蒼導標",desc:"進路を示すシアンの細長い標識。",kind:"lantern",core:"#efffff",mid:"#39c0d1",glow:"rgba(57,192,209,.35)"},
 deepPrism:{label:"最深晶",desc:"濃青の中心を白い縁光で囲む晶体。",kind:"prism",core:"#e6f6ff",mid:"#2b6597",glow:"rgba(43,101,151,.34)"},
 iconRelic:{label:"標識レリック",desc:"主人公の輪郭と対になる小さな菱形標識。",kind:"orbit",core:"#f8ffff",mid:"#43c7d6",glow:"rgba(67,199,214,.36)"}
};`;

const presetData = `
const appearancePresetData={
 abyssalPilgrim:{label:"1　深淵巡礼者",desc:"蒼核・無垢面甲・深淵巡礼外套",foundation:"guide",hair:"silver",focus:"lantern"},
 brassJudicator:{label:"2　古銅判決者",desc:"古銅観測眼・古銅審判面・古銅守衛衣",foundation:"brassWarden",hair:"brass",focus:"brassEye"},
 voidWeaverPreset:{label:"3　虚影編織者",desc:"虚界プリズム・虚界無貌面・虚界編織衣",foundation:"voidWeaver",hair:"void",focus:"prism"},
 crimsonExecutor:{label:"4　血蝕執行者",desc:"血蝕標識・血蝕執行面・血蝕審判衣",foundation:"crimsonJudge",hair:"crimson",focus:"redBeacon"},
 frostbonePriest:{label:"5　霜骨祭司",desc:"霜核・霜骨面甲・白骨典礼衣",foundation:"pilgrim",hair:"white",focus:"frostCore"},
 lumenWardenPreset:{label:"6　寂光守望者",desc:"寂光環・寂光監視面・寂光守望衣",foundation:"lumenWarden",hair:"lumen",focus:"lumenHalo"}
};`;

replaceBetween('const appearanceFoundationData={', 'const appearanceHairData={', foundationData, 'foundation data');
replaceBetween('const appearanceHairData={', 'const appearanceFocusData={', maskData, 'mask data');
replaceBetween('const appearanceFocusData={', 'const appearancePresetData={', focusData, 'focus data');
replaceBetween('const appearancePresetData={', 'const appearanceColorData={', presetData, 'preset data');

const maskRenderer = `
function nativeDrawFaceAndHair(g,p,facing,hurt,hairIndex){
 const mask=p.hairData||{},variant=hairIndex%6;
 const shell=mask.base||"#d8d4c7",edge=mask.shadow||"#666b70",light=hurt?"#ef5a64":(mask.light||p.focusCore);
 const halo=(variant===0||variant===4||mask.shape==="ring");
 const cx=facing==="left"?15:facing==="right"?18:16;
 if(halo){
  nativeFill(g,p.trim,[[cx-4,2,3,1],[cx+2,2,3,1],[cx-6,4,1,3],[cx+6,4,1,3],[cx-6,9,1,3],[cx+6,9,1,3],[cx-4,13,3,1],[cx+2,13,3,1]]);
  if(p.lightOn)nativeFill(g,p.focusCore,[[cx,1,1,1],[cx-7,7,1,1],[cx+7,7,1,1]]);
 }
 if(facing==="up"){
  nativeFill(g,p.ink,[[11,4,11,10],[10,7,13,5]]);
  nativeFill(g,edge,[[12,5,9,8],[11,8,11,4]]);
  nativeFill(g,shell,[[13,5,7,7]]);
  nativeFill(g,p.trim,[[15,5,3,1],[16,11,1,2]]);
  if(variant===2||variant===5)nativeFill(g,light,[[13,8,7,1]]);
  return;
 }
 if(facing==="left"){
  nativeFill(g,p.ink,[[10,4,11,10],[9,7,3,5]]);
  nativeFill(g,edge,[[11,5,9,8],[10,8,2,4]]);
  nativeFill(g,shell,[[11,5,7,7],[10,8,2,3]]);
  if(mask.shape==="visor"||variant===1)nativeFill(g,light,[[10,8,7,1]]);
  else if(mask.shape==="hollow"||variant===4){nativeFill(g,p.ink,[[10,7,4,4]]);nativeFill(g,light,[[10,8,2,1]])}
  else {nativeFill(g,p.ink,[[10,8,3,2]]);nativeFill(g,light,[[10,8,1,1]])}
  if(variant===3)nativeFill(g,p.trim,[[16,5,1,7]]);
  return;
 }
 if(facing==="right"){
  nativeFill(g,p.ink,[[13,4,11,10],[22,7,3,5]]);
  nativeFill(g,edge,[[14,5,9,8],[22,8,2,4]]);
  nativeFill(g,shell,[[16,5,7,7],[22,8,2,3]]);
  if(mask.shape==="visor"||variant===1)nativeFill(g,light,[[17,8,7,1]]);
  else if(mask.shape==="hollow"||variant===4){nativeFill(g,p.ink,[[20,7,4,4]]);nativeFill(g,light,[[22,8,2,1]])}
  else {nativeFill(g,p.ink,[[21,8,3,2]]);nativeFill(g,light,[[23,8,1,1]])}
  if(variant===3)nativeFill(g,p.trim,[[17,5,1,7]]);
  return;
 }
 nativeFill(g,p.ink,[[11,4,12,10],[10,7,14,5]]);
 nativeFill(g,edge,[[12,5,10,8],[11,8,12,4]]);
 nativeFill(g,shell,[[13,5,8,7],[12,8,10,3]]);
 if(mask.shape==="visor"||variant===1){
  nativeFill(g,p.ink,[[13,8,8,2]]);nativeFill(g,light,[[14,8,6,1]]);
 }else if(mask.shape==="hollow"||variant===4){
  nativeFill(g,p.ink,[[14,7,6,4]]);nativeFill(g,light,[[16,8,2,1]]);
 }else if(mask.shape==="split"||variant===2){
  nativeFill(g,p.ink,[[16,5,1,7],[13,8,3,1],[18,8,3,1]]);nativeFill(g,light,[[14,8,1,1],[19,8,1,1]]);
 }else if(mask.shape==="cross"||variant===3){
  nativeFill(g,p.ink,[[16,5,1,7],[13,8,8,1]]);nativeFill(g,light,[[16,8,1,1]]);
 }else if(mask.shape==="judge"||variant===5){
  nativeFill(g,p.trim,[[16,5,1,6],[13,7,1,3],[20,7,1,3]]);nativeFill(g,light,[[14,8,2,1],[18,8,2,1]]);
 }else{
  nativeFill(g,p.ink,[[14,8,2,2],[19,8,2,2]]);nativeFill(g,light,[[15,8,1,1],[19,8,1,1]]);
 }
 nativeFill(g,p.trim,[[16,12,1,1]]);
}
`;
replaceBetween('function nativeDrawFaceAndHair(g,p,facing,hurt,hairIndex){', 'function nativeDrawFocus(g,p,facing,focusIndex){', maskRenderer, 'mask renderer');

// Visible terminology: preserve the save key `hair`, but expose it only as Mask / Visor.
replaceRequired('<h3>基本衣装</h3>', '<h3>BODY / OUTERWEAR　外装</h3>', 'foundation heading');
replaceRequired('<h3>髪</h3>', '<h3>MASK / VISOR　面甲</h3>', 'hair heading');
replaceRequired('<h3>魔導具</h3>', '<h3>FLOATING RELIC　浮遊遺物</h3>', 'focus heading');
replaceRequired('<h3>魔力色</h3>', '<h3>COLOR PALETTE　配色</h3>', 'color heading');
replaceRequired('<h3>追加装飾</h3>', '<h3>SHOULDER / MANTLE　肩飾・披肩</h3>', 'shape heading');
replaceRequired('<h3>紋章</h3>', '<h3>SIGIL / EMBLEM　紋章</h3>', 'sigil heading');
replaceRequired('<h3>基本プリセット</h3>', '<h3>PRESET BUILDS　プリセット</h3>', 'preset heading');
replaceRequired('30×3部品からランダムコーデ', '30×3モジュールからランダム構築', 'randomize label');
replaceRequired('`髪：${hair.label}<br>`+', '`面甲：${hair.label}<br>`+', 'appearance summary mask label');
replaceRequired('`解放済み：魔力色 ${a.unlockedColors.length}/${Object.keys(appearanceColorData).length} / 装飾 ${a.unlockedShapes.length}/${Object.keys(appearanceShapeData).length} / 紋章 ${a.unlockedSigils.length}/${Object.keys(appearanceSigilData).length}<br>`+', '`解放済み：配色 ${a.unlockedColors.length}/${Object.keys(appearanceColorData).length} / 肩飾 ${a.unlockedShapes.length}/${Object.keys(appearanceShapeData).length} / 紋章 ${a.unlockedSigils.length}/${Object.keys(appearanceSigilData).length}<br>`+', 'appearance unlock summary');
replaceRequired('renderAppearanceCategory("appearanceColors",appearanceColorData,a.color,a.unlockedColors,"color","魔力色");', 'renderAppearanceCategory("appearanceColors",appearanceColorData,a.color,a.unlockedColors,"color","配色");', 'color category label');
replaceRequired('renderAppearanceCategory("appearanceShapes",appearanceShapeData,a.shape,a.unlockedShapes,"shape","追加装飾");', 'renderAppearanceCategory("appearanceShapes",appearanceShapeData,a.shape,a.unlockedShapes,"shape","肩飾・披肩");', 'shape category label');
replaceRequired('requestAppearancePurchase("魔力色",id,data,"unlockedColors","color")', 'requestAppearancePurchase("配色",id,data,"unlockedColors","color")', 'color purchase label');
replaceRequired('requestAppearancePurchase("追加装飾",id,data,"unlockedShapes","shape")', 'requestAppearancePurchase("肩飾・披肩",id,data,"unlockedShapes","shape")', 'shape purchase label');

// Version and presentation polish.
html = html.replaceAll('正式版 4.34 NATIVE PIXEL', '正式版 4.35 ICONIC TACTICS');
html = html.replaceAll('version:"4.34"', 'version:"4.35"');

const stylePatch = `
/* v4.35 ICONIC TACTICS AVATAR */
#appearanceModal .modalCard{border-color:#6f5a35;background:linear-gradient(180deg,#0b1014,#090a0d 58%,#07080a);box-shadow:0 20px 60px #000c,inset 0 0 0 1px rgba(202,164,86,.08)}
#appearanceModal h2{letter-spacing:.12em;color:#e7d2a0;text-shadow:0 0 16px rgba(69,205,220,.12)}
#appearanceModal h3{margin-top:13px;padding:6px 8px;border-left:2px solid #b3914f;border-bottom:1px solid #2c3235;color:#d8c8a6;font-size:11px;letter-spacing:.08em;background:linear-gradient(90deg,rgba(177,145,79,.09),transparent)}
#appearanceModal .appearanceChoice,#appearanceModal .appearancePreset{border-radius:4px;border-color:#31383a;background:linear-gradient(145deg,#10161a,#0a0d10);box-shadow:inset 0 0 0 1px rgba(255,255,255,.015)}
#appearanceModal .appearanceChoice.selected,#appearanceModal .appearancePreset.selected{border-color:#55c9d8;box-shadow:inset 0 0 14px rgba(58,188,207,.15),0 0 0 1px rgba(201,167,92,.12)}
#appearanceModal .appearanceChoice b,#appearanceModal .appearancePreset b{color:#eadcb8}
#appearanceModal .appearanceChoice small,#appearanceModal .appearancePreset small{color:#87979b}
#appearanceModal .appearancePreviewWrap{border-color:#5d4b2f;background:radial-gradient(circle at 50% 20%,#18252b 0,#090d10 46%,#060708 100%);box-shadow:0 8px 24px #000b,inset 0 0 35px rgba(49,178,196,.06)}
#appearanceModal .appearanceRandomBtn{border-color:#8b713f;background:linear-gradient(145deg,#211b10,#101519);color:#e8d39b;letter-spacing:.05em}
#appearanceModal .appearanceSummary{border-color:#343d40;background:#080b0d;color:#99a9ad}
#appearanceModal .appearanceSummary b{color:#f0dfb1}
`;
if (!html.includes('/* v4.35 ICONIC TACTICS AVATAR */')) {
  const styleEnd = html.lastIndexOf('</style>');
  if (styleEnd < 0) throw new Error('style end marker not found');
  html = html.slice(0, styleEnd) + stylePatch + '\n' + html.slice(styleEnd);
}

fs.writeFileSync(INDEX, html);

let readme = fs.readFileSync(README, 'utf8');
if (!readme.startsWith('深淵樹迷宮 v4.35 ICONIC TACTICS')) {
  const entry = `深淵樹迷宮 v4.35 ICONIC TACTICS\nv4.35 ICONIC TACTICS\n- 主人公を「髪のある人物」から、面甲・環・浮遊遺物で識別する細身の人型アイコンへ全面刷新\n- 旧hairセーブキーを互換スロットとして維持しつつ、表示・内容・32×36px描画は30種のMASK / VISORへ完全移行\n- BODY / OUTERWEAR 30種、MASK / VISOR 30種、FLOATING RELIC 30種を新規テーマへ総入れ替え\n- 既存の追加装飾をSHOULDER / MANTLE、紋章をSIGIL / EMBLEM、魔力色をCOLOR PALETTEとしてUI再編\n- 深淵巡礼者 / 古銅判決者 / 虚影編織者 / 血蝕執行者 / 霜骨祭司 / 寂光守望者の6プリセットを追加\n- 面甲は正面・背面・左右すべて専用のピクセル描画へ更新し、髪描画・肌顔描画を廃止\n- 戦闘、当たり判定、敵AI、進行、save schema version=4は変更なし\n- クライアント自己診断versionを4.35へ更新\n\n`;
  fs.writeFileSync(README, entry + readme);
}

let sw = fs.readFileSync(SW, 'utf8');
sw = sw.replace('abyssal-roots-v4-34-native-pixel', 'abyssal-roots-v4-35-iconic-tactics');
fs.writeFileSync(SW, sw);

console.log('Abyssal Roots v4.35 avatar redesign applied.');
