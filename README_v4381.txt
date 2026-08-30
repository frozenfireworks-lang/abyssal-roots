ABYSSAL ROOTS v4.38.1 LAYER ALIGN FIX

Fixes
- Actor / terrain / prop layers now align to the exact rendered #game canvas box.
- Removed mobile max-height/object-fit mismatch that caused layer coordinate drift.
- Enemy sprites use real IMG elements clipped inside the actor cell instead of giant Data-URL CSS background-image cropping (Safari compatibility).
- Enemy DOM keys are stable while enemies move.
- Chamber walls adjacent to explored floor are no longer crushed under the unseen-tile darkness mask.
- No assets folder is required; art remains embedded in index.html.

Upload
Replace index.html and sw.js in the GitHub repository root.
