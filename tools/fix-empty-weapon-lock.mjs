import fs from "node:fs";

const INDEX = "index.html";
if (!fs.existsSync(INDEX)) throw new Error("index.html not found. Run from repository root.");

let html = fs.readFileSync(INDEX, "utf8");

const oldPreview = `function departureWeaponPreview(meta=state?.meta){
 ensureMetaLoadouts(meta);
 const stored=nextLoadoutGear(meta,"weapon");
 if(stored)return{kind:"stored",label:gearLabel(stored),weaponType:stored.weaponType,gear:stored};
 const starter=selectedDepartureStarter(meta);
 if(starter)return{kind:"starter",label:makeStarterWeapon(starter).name,weaponType:starter,gear:null};
 return null;
}`;

const newPreview = `function departureWeaponPreview(meta=state?.meta){
 ensureMetaLoadouts(meta);
 const stored=nextLoadoutGear(meta,"weapon");
 if(stored)return{kind:"stored",label:gearLabel(stored),weaponType:stored.weaponType,gear:stored};
 const starter=selectedDepartureStarter(meta);
 if(starter)return{kind:"starter",label:makeStarterWeapon(starter).name,weaponType:starter,gear:null};
 // Safety fallback: a player with no stored weapon must never be progression-locked.
 // The fallback starter is temporary and cannot be banked.
 const fallback="sword";
 return{kind:"fallback",label:makeStarterWeapon(fallback).name,weaponType:fallback,gear:null};
}`;

const oldStart = ` const guide=ensureLighthouseOnboardingMeta(meta);
 const starterType=selectedDepartureStarter(meta);
 const storedWeapon=nextLoadoutGear(meta,"weapon");

 if(!storedWeapon&&!starterType){
  openStarterSelection();
  return false;
 }

 const preparation=prepareDepartureProtection(meta);`;

const newStart = ` const guide=ensureLighthouseOnboardingMeta(meta);
 let starterType=selectedDepartureStarter(meta);
 const storedWeapon=nextLoadoutGear(meta,"weapon");

 // If every weapon has been lost/removed and no starter was selected,
 // automatically supply the free temporary sword instead of blocking progress.
 if(!storedWeapon&&!starterType){
  starterType="sword";
  guide.departureStarterWeapon=starterType;
 }

 const preparation=prepareDepartureProtection(meta);`;

if (html.includes(oldPreview)) {
  html = html.replace(oldPreview, newPreview);
} else if (!html.includes('kind:"fallback",label:makeStarterWeapon(fallback).name')) {
  throw new Error("departureWeaponPreview marker not found. Repository version may have changed.");
}

if (html.includes(oldStart)) {
  html = html.replace(oldStart, newStart);
} else if (!html.includes('starterType="sword";\n  guide.departureStarterWeapon=starterType;')) {
  throw new Error("startFreshRunFromHub marker not found. Repository version may have changed.");
}

// Small user-facing clarification.
html = html.replaceAll(
  '装備が無ければ初期武器を選びます。',
  '装備が無ければ無料の予備武器で出発できます。'
);
html = html.replaceAll(
  '武器を選ぶと出発ボタンが緑色に変わります。',
  '武器が無い場合も無料の旅人の剣で出発できます。'
);

fs.writeFileSync(INDEX, html);
console.log("Empty-weapon progression lock fixed: fallback starter sword enabled.");
