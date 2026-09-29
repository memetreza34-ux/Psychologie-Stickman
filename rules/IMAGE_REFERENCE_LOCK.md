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

Until approved reference images exist, these are authoritative:
1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/PREMIUM_VISUAL_LOCK.md`
5. `rules/FLOW_OUTPUT_MODE.md` for Flow output behavior

## Reference approval gate — HARD LOCK

A generated reference image is NOT automatically approved just because it contains a stickman.

Reject a character reference if it looks:
- cute/chibi/mascot-like
- like a children's cartoon
- broad-shouldered
- thick-limbed
- too close to normal cartoon-human anatomy
- flat/cheap/blank without the intended rendering quality

Approve only when it demonstrates:
- mature adult editorial stickman proportions
- large simple head without chibi exaggeration
- small narrow clothed torso
- narrow shoulders
- very slim arms and legs
- simple no-finger hands and shoes
- clean dark linework
- controlled cel shading
- the intended mature psychology-documentary illustration quality

A weak reference must never be used to propagate mistakes across the whole video.

## What references lock

References may lock:
- simplified anatomy family
- mature visual tone
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

Choose references according to the current beat's mood, not merely because the previous frame used them.

Examples:
- `CLEAR` → core + clear/day references
- `UNEASY` → core + uneasy reference
- `DARK` → core + dark lighting/environment references
- `POWER` → core + power reference
- `MONEY` → core + money/status reference
- `ISOLATION` → night/dark environment only when useful
- `HOPE` → core + clear/day reference with warmer resolution

A dark reference may not turn a neutral scene dark. A bright reference may not sanitize a genuinely dark beat.

## Scene 01

`03-bilder/01.png` remains Scene 01 + cover/thumbnail source for pipeline compatibility.

It follows the permanent reference system. It does not replace the permanent channel reference pack.

## Character continuity

Repeat a character only when narrative continuity requires it. Preserve clothing, core colors, head design, accessory, proportions and shoes.

Mood and light may change while identity remains stable.

## Flow reference clause

`Use approved CINEMATIC HUMAN BEHAVIOR WORLD v2 references only for STYLE, MATURE STRICT-STICKMAN ANATOMY, LINEWORK, CEL SHADING, TEXTURE, RENDERING QUALITY, ENVIRONMENT DETAIL and MOOD-APPROPRIATE LIGHT/COLOR. Do not clone exact character identity, pose, room, camera, object arrangement, composition or readable text. Never drift into cute/chibi/mascot proportions or normal cartoon-human body volume. Render only exact planned German text; otherwise ZERO READABLE TEXT.`

## Hard fail

- reference creates style drift
- weak/chibi reference becomes the basis for later images
- wrong mood reference overrides current beat
- bare line-stickman drift
- normal cartoon-human drift
- 3D/realistic/anime drift
- schema uses unrelated corporate design language
- copied text from reference
- reference encourages empty cream backgrounds as default
