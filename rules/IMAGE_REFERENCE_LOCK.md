# IMAGE REFERENCE LOCK — CINEMATIC HUMAN BEHAVIOR WORLD v2

**STATUS: BINDING**

Active visual system: `CINEMATIC_HUMAN_BEHAVIOR_V2`.

## Permanent channel references

Path:
`assets/cinematic-human-behavior-world/`

## Core principle

Use a **small approved reference system by role**, not a huge unverified pack.

References exist to stabilize style, anatomy, recurring identities or recurring environments. They must not become a contradictory collage that pulls the image world in different directions.

Until an actual reference image is approved, these text rules remain authoritative:
1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/PREMIUM_VISUAL_LOCK.md`
5. `rules/FLOW_PROMPT_ARCHITECTURE.md`
6. `rules/FLOW_OUTPUT_MODE.md` for Flow output behavior

## Preferred minimal reference architecture

Use only what the current production genuinely needs.

### Style anchor
- `style-master.png`

Purpose: style-only reference for linework, anatomy family, cel shading, texture, environment quality and overall rendering level.

### Recurring characters
When a recurring person matters, use one or two clean approved reference images for that same character.

Suggested naming:
- `character-a-01.png`
- `character-a-02.png`
- `character-b-01.png`
- `character-b-02.png`

Purpose: `character-identity`.

A second image is optional and should only be added when it improves identity consistency without contradicting the first.

### Groups
- `character-group.png` only when group/crowd consistency clearly benefits from a dedicated reference.

### Optional special reference
Use at most one additional approved visual-family reference when useful, for example:
- `schema-reference.png`
- `environment-reference.png`

Not every video needs every file above.

## Reference roles — HARD LOCK

References are used with an explicit role:

### `style-only`
May lock:
- mature strict-stickman anatomy family
- outline language
- 2D rendering level
- cel-shading language
- texture level
- environment-detail quality
- controlled light/color behavior

Must NOT force:
- exact person identity
- exact clothing
- exact room
- exact pose
- exact camera
- exact composition
- exact text
- one fixed palette for every scene

### `character-identity`
May additionally lock:
- recurring head/hair/accessory cues
- clothing/core colors
- shoes
- recurring silhouette

It must still follow the channel-wide anatomy/style lock.

### `environment-continuity`
May lock:
- recurring room/layout
- architecture
- major props
- recurring camera relation when continuity benefits from it

It must not override the channel illustration style.

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
- intended mature psychology-documentary illustration quality

A weak reference must never be used to propagate mistakes across the whole video.

## Character-reference quality

A clean single-character image is preferred over a busy character sheet when identity is the goal.

If two references are used for one character, they should show the same character clearly from compatible viewpoints without changing anatomy, clothing or rendering style.

Do not create a multi-character montage merely to provide identity references.

## Mood and scene adaptation

A style or identity reference does not force the same mood into every frame.

The current beat still decides whether the scene is `CLEAR`, `UNEASY`, `DARK`, `POWER`, `MONEY`, `ISOLATION` or `HOPE`.

A dark reference may not turn a neutral scene dark. A bright reference may not sanitize a genuinely dark beat.

## Scene/Bild 01

`03-bilder/01.png` remains Bild 01 + cover/thumbnail source for pipeline compatibility.

It follows the permanent reference system. It does not replace the permanent channel style source of truth.

After user approval, Bild 01 may help confirm quality/world consistency, but later images must not copy its room, pose, composition or palette unless continuity requires it.

## Character continuity

Repeat a character only when narrative continuity requires it. Preserve clothing, core colors, head design, accessory, proportions and shoes.

Mood and light may change while identity stays stable.

## Flow reference clause

`Use only approved references and use each reference for its declared role. Style-only references lock mature strict-stickman anatomy, linework, cel shading, texture and rendering quality, not scene content. Character-identity references additionally preserve the returning person's identity/clothing cues. Environment-continuity references preserve a recurring place when needed. Never copy accidental text or let a weak/chibi/cartoon reference override the channel rules.`

## Hard fail

- nonexistent/unapproved reference is treated as if it were approved
- conflicting references are combined without need
- reference creates style drift
- weak/chibi reference becomes the basis for later images
- wrong mood reference overrides current beat
- bare line-stickman drift
- normal cartoon-human drift
- 3D/realistic/anime drift
- schema uses unrelated corporate design language
- copied text from reference
- reference encourages empty cream backgrounds as default
