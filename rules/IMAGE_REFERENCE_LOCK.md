# IMAGE REFERENCE LOCK — CINEMATIC HUMAN BEHAVIOR WORLD v2

**STATUS: BINDING**

Active visual system: `CINEMATIC_HUMAN_BEHAVIOR_V2`.

Anatomy sub-policy: `GEOMETRIC_STICKMAN_ANATOMY_V1`.

## Permanent channel references

Path:
`assets/cinematic-human-behavior-world/`

## Core principle

Use a **small approved reference system by role**, not a huge unverified pack.

References stabilize style, anatomy, recurring identities or recurring environments. Until an actual reference image is approved, these written rules remain authoritative:
1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/PREMIUM_VISUAL_LOCK.md`
5. `rules/FLOW_PROMPT_ARCHITECTURE.md`
6. `rules/FLOW_OUTPUT_MODE.md`

## Preferred minimal reference architecture

### Style anchor
- `style-master.png`

Purpose: style-only reference for linework, geometric stickman anatomy family, cel shading, texture, environment quality and overall rendering level.

### Recurring characters
When a recurring person matters, use one or two clean approved reference images for that same character.

Suggested naming:
- `character-a-01.png`
- `character-a-02.png`
- `character-b-01.png`
- `character-b-02.png`

A second image is optional and only added when it improves identity consistency without contradiction.

### Groups
- `character-group.png` only when group/crowd consistency genuinely benefits from it.

### Optional special reference
Use at most one additional approved visual-family reference when useful, such as `schema-reference.png` or `environment-reference.png`.

## Reference roles — HARD LOCK

### `style-only`
May lock mature strict-stickman geometry, outline language, 2D rendering, cel shading, texture and environment-detail quality.

Must NOT force exact identity, clothing, room, pose, camera, composition, text or fixed palette.

### `character-identity`
May additionally lock recurring head/hair/accessory cues, tiny torso-garment color, shoes and silhouette. It must still obey channel-wide geometric anatomy.

### `environment-continuity`
May lock recurring room/layout, architecture and major props without overriding the channel illustration style.

## Reference approval gate — ABSOLUTE HARD LOCK

A generated reference is NOT approved merely because it looks simplified.

**Recognition test:** if the character could plausibly be described as a thin normal cartoon human, reject it.

Approve only when the figure unmistakably reads as a true illustrated stick figure and demonstrates:
- one simple circle/slightly oval head without chibi exaggeration
- two tiny eye marks and tiny mouth only
- no ears, nose or neck
- one tiny narrow graphic torso clearly below half the head width
- no chest, waist, hips or shoulder mass
- ultra-thin near-uniform line-like arms and legs
- no upper-arm/forearm/thigh/calf volume
- no sleeve-shaped arms or trouser-shaped legs
- tiny no-finger hands
- small flat shoes
- tiny flat hair cue only
- clean dark linework
- controlled cel shading
- mature psychology-documentary/editorial quality

Reject immediately if it looks:
- cute/chibi/mascot-like
- like a children's cartoon
- broad-shouldered
- skinny-human rather than stick-figure
- thick/tapered-limbed
- volumetric in sleeves/trousers
- too close to normal cartoon-human anatomy
- flat/cheap/blank without intended rendering quality

A weak reference must never propagate mistakes across later scenes.

## Background/group reference quality

A group reference must prove that SMALL and BACKGROUND people also preserve exact stickman geometry.

Reject a group reference if distant/seated/background figures become:
- normal cartoon silhouettes
- thick-limbed bodies
- broad-shouldered bodies
- realistic seated-human shapes
- generic corporate-vector people

## Character-reference quality

A clean single-character image is preferred over a busy sheet. If two references are used, both must show the same character from compatible viewpoints without changing geometry, clothing cue or rendering style.

## Mood and scene adaptation

A style or identity reference does not force the same mood into every frame. The current beat still controls CLEAR, UNEASY, DARK, POWER, MONEY, ISOLATION or HOPE.

## Scene/Bild 01

`03-bilder/01.png` remains Bild 01 + cover/thumbnail source. It follows the permanent reference system and never replaces the channel source of truth.

## Character continuity

Repeat a character only when narrative continuity requires it. Preserve head shape, tiny hair/accessory cue, torso-garment cue, ultra-thin line-limb geometry and shoes.

## Flow reference clause

`Use only approved references for their declared role. Any human reference must pass GEOMETRIC_STICKMAN_ANATOMY_V1: true stick-figure silhouette, tiny narrow torso, ultra-thin line-like arms/legs and no human body volume. If a reference looks like a thin cartoon human, ignore/reject it. Background people must preserve the same geometry. Style-only references lock rendering quality, not scene content.`

## Hard fail

- nonexistent/unapproved reference treated as approved
- conflicting references combined without need
- thin-cartoon-human reference accepted
- chibi/cartoon reference becomes basis for later images
- background figures drift to different anatomy
- realistic/3D/anime drift
- copied accidental text
- reference encourages empty cream backgrounds as default
