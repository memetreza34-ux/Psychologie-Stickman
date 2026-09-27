# IMAGE REFERENCE LOCK — v2

**STATUS: VERBINDLICH**

The active visual system is `MINIMAL_EDITORIAL_STICKMAN_V2` from `rules/VISUAL_SYSTEM.md`.

## 1. Permanent channel reference, not Scene-01 master

The channel style reference is independent from any single video.

Permanent reference pack path:
`assets/style-v2/`

Target references:
- `style-master.png`
- `anatomy-sheet.png`
- `environment-examples.png`
- `metaphor-examples.png`
- `thumbnail-reference.png`

Until these PNG files exist and are approved, `rules/VISUAL_SYSTEM.md` + `rules/visual-system.json` are authoritative.

## 2. Scene 01 rule

For pipeline compatibility, `03-bilder/01.png` may remain:
- Scene 01
- first hook beat
- cover/thumbnail source

But `01.png` is NOT the global channel anatomy/style master anymore.
It must follow the channel reference pack, not define it.

## 3. What references lock

References lock:
- minimal stickman anatomy
- face simplification
- line character and approximate line weight
- flat fill behavior
- sparse environment density
- negative-space behavior
- fixed channel palette behavior
- overall 2D minimal editorial feel

References do NOT lock:
- exact character identity
- exact clothing color
- cast size
- pose/action
- location
- props
- camera/framing
- composition
- text from another scene

## 4. Minimal environment continuity

Consistency means similar simplification, not similar rooms.

Every scene should use only the cues required to identify place/action.
Do not copy a previous room merely because it was a reference frame.

## 5. Character continuity

When the same person genuinely continues across nearby scenes, preserve:
- head size/shape
- face style
- torso shape/color
- limb thickness
- hand/foot simplification
- relevant small accessory

Otherwise choose the best cast for the current beat.

## 6. Text

The existing Google Flow text policy remains active:
- planned text scene: exact approved German text and no additional readable text
- unplanned text scene: `ZERO READABLE TEXT`

Never copy text from a reference image into another scene.

## 7. Batch workflow

1. Generate Scene 01 using v2.
2. Check anatomy, simplification, palette restraint, negative space, hook clarity and exact text.
3. User approval remains required for Scene 01 under the current production workflow.
4. Generate later images in batches of at most 5.
5. Compare each image against the permanent v2 system/reference pack, not against Scene 01 as an art-direction source.
6. Regenerate only failed images.

## 8. Reference clause for Flow

`Follow MINIMAL EDITORIAL STICKMAN WORLD v2 and the attached approved channel reference pack as STYLE/ANATOMY/SIMPLIFICATION reference only. Preserve true minimal stickman anatomy, charcoal organic line language, flat fills, warm off-white base, restrained channel accents, sparse environment density and large clean negative space. Do not clone character identity, pose, room, composition or readable text from a reference. Use only the minimum props required for the current beat. No cinematic lighting, no rich detailed environments, no realistic anatomy, no 3D/CGI, no complex shading. Render readable text only when the CURRENT scene explicitly supplies exact German text; otherwise ZERO READABLE TEXT.`

## 9. Hard fail

Regenerate if:
- normal cartoon/semi-realistic person appears
- anatomy changes materially
- realistic hands/fingers appear
- environment becomes rich/detailed without explanatory need
- cinematic lighting or heavy shading appears
- channel palette is ignored
- too many accent colors compete
- reference text is copied
- visual idea is not immediately clear

## 10. Priority

`rules/VISUAL_SYSTEM.md` > approved `assets/style-v2/` references > `rules/STICKMAN_DNA.md` > current Visual Beat.
