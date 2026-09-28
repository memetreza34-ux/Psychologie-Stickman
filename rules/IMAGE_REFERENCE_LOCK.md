# IMAGE REFERENCE LOCK — CINEMATIC HUMAN BEHAVIOR WORLD v2

**STATUS: BINDING**

Active visual system: `CINEMATIC_HUMAN_BEHAVIOR_V2`.

## Permanent channel references

Path:
`assets/cinematic-human-behavior-world/`

Target reference pack:

### Core
- `style-master.png`
- `character-neutral.png`
- `character-emotions.png`
- `character-dark-archetypes.png`
- `character-groups.png`

### Lighting / mood
- `lighting-clear.png`
- `lighting-uneasy.png`
- `lighting-dark.png`
- `lighting-power.png`

### Environments
- `environment-day.png`
- `environment-night.png`
- `environment-dark.png`

### Topic-specific behavior references
- `money-status-reference.png`
- `manipulation-reference.png`
- `schema-reference.png`
- `metaphor-reference.png`

### Covers
- `cover-reference-light.png`
- `cover-reference-dark.png`

Until approved reference images exist, `rules/VISUAL_SYSTEM.md`, `rules/visual-system.json`, `rules/STICKMAN_DNA.md` and `rules/FLOW_PROMPT_CONTRACT.md` are authoritative.

## What references lock

References may lock:
- simplified anatomy family
- outline language
- cel-shading language
- texture level
- rendering quality
- environment-detail level
- lighting language for the matching mood family
- controlled color behavior

They do NOT lock:
- exact person identity
- exact clothing
- exact pose
- exact room
- exact camera angle
- exact props
- exact composition
- exact text
- one single color palette for the whole channel

## Mood references

Choose references according to the planned `moodMode`, not merely because the previous frame used them.

Examples:
- `CLEAR` → core + clear/day references
- `UNEASY` → core + uneasy reference
- `DARK` → core + dark lighting/environment references
- `POWER` → core + power reference
- `MONEY` → core + money/status reference
- `ISOLATION` → core + night/dark environment where useful
- `HOPE` → core + clear/day reference with warmer resolution

A dark reference may not turn a neutral scene dark. A bright reference may not sanitize a genuinely dark beat.

## Scene 01

`03-bilder/01.png` remains Scene 01 + cover/thumbnail source for pipeline compatibility.

It follows the permanent reference system. It is NOT the global style master and must not redefine the channel world for later scenes.

## Character continuity

Repeat a character only when narrative continuity requires it. Preserve clothing, core colors, head design, accessory, proportions and shoes.

Mood and light may change while identity remains stable.

## Flow reference clause

`Use the approved CINEMATIC HUMAN BEHAVIOR WORLD v2 references only for STYLE, STICKMAN ANATOMY FAMILY, LINEWORK, CEL SHADING, TEXTURE, RENDERING QUALITY, MOOD-APPROPRIATE LIGHTING AND COLOR BEHAVIOR. Do not clone exact character identity, pose, room, camera, object arrangement, composition or readable text. Apply the current scene's MOOD MODE, MOOD INTENSITY and POWER DYNAMIC. Dark psychology must remain spatially believable and must not become generic black horror imagery. Render only exact planned German text; otherwise ZERO READABLE TEXT.`

## Hard fail

- reference creates style drift
- wrong mood reference overrides current beat
- bare line-stickman drift
- normal cartoon-human drift
- 3D/realistic/anime drift
- schema uses unrelated corporate design language
- copied text from reference
- Scene 01 is treated as global style truth
