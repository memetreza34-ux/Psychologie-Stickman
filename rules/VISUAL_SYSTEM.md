# VISUAL SYSTEM — CINEMATIC HUMAN BEHAVIOR WORLD v2

**STATUS: ACTIVE CHANNEL SOURCE OF TRUTH**

Policy ID: `CINEMATIC_HUMAN_BEHAVIOR_V2`

Character anatomy sub-policy: `GEOMETRIC_STICKMAN_ANATOMY_V1`

This system replaces `CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1` for NEW productions.

## 1. Core idea

**One recognizable mature cinematic 2D strict-stickman world that can move from bright everyday psychology to uneasy, dark, powerful, financial, isolated and hopeful scenes without changing illustration style.**

The target is an adult psychology-documentary / editorial-graphic-novel feeling — never a children's cartoon, mascot sheet, classroom doodle or generic explainer template.

## 2. What never changes — HARD LOCK

Across every scene, mood and topic preserve:
- polished cinematic 2D illustration
- clean slightly organic dark outlines
- soft cel shading with stronger graphic shadow when useful
- controlled subtle texture
- believable natural depth
- purposeful cinematic composition
- the same strict simplified stickman anatomy family
- mature editorial tone
- the same rendering quality and visual grammar

Mood may change strongly. Illustration identity may not.

## 3. Unified human cast — GEOMETRIC HARD LOCK

Whenever humans appear, every visible human belongs to `STYLIZED_STICKMAN_CAST_V2` and obeys `GEOMETRIC_STICKMAN_ANATOMY_V1`.

**Recognition test:** if the silhouette could plausibly be called a thin normal cartoon human, it is a FAIL. It must unmistakably read as a true illustrated stick figure.

Required geometry:
- one simple circular/slightly oval head, not chibi oversized
- two tiny eye dots/marks, tiny simple mouth, optional tiny eyebrow strokes
- no ears, no nose, no neck, no realistic jaw/cheeks
- one tiny narrow graphic torso, clearly less than half the head width
- no chest, waist, hips or anatomical shoulder mass
- arms = ultra-thin near-uniform line-like strokes, no upper-arm/forearm volume
- legs = ultra-thin near-uniform line-like strokes, no thighs/calves or trouser-leg volume
- tiny no-finger hand endpoints
- small flat simple shoes
- clothing = flat graphic cue only; it may not create normal sleeves, chest, waist, hips, thighs or calves
- hair = tiny flat head-edge cue, never volumetric hairstyle

The same geometry is used for main, supporting, background, crowd, screen, poster, reflection and memory humans.

## 4. Mature-character rule — HARD LOCK

Characters must not drift into cute/chibi/mascot language, but maturity must never be achieved by adding realistic anatomy.

Avoid:
- oversized baby-like heads
- short rounded plush limbs
- broad rounded shoulders
- large soft cartoon torsos
- blush/cute facial styling
- toy-like proportions
- volumetric sleeves/trouser legs
- skinny-but-human body anatomy

Maturity comes from posture, gaze, role, camera, environment and restrained expression while the body remains unmistakably stick-figure geometry.

## 5. Emotional character range

Characters may look neutral, confident, anxious, vulnerable, exhausted, sad, dominant, authoritative, manipulative, deceptive-friendly, arrogant, suspicious or isolated.

Threat and role should normally be communicated through posture, gaze, proximity, hierarchy, camera angle, shadow, negative space and environment — not by adding body mass or villain clichés.

## 6. Character presence is optional — HARD LOCK

Use people when human action, reaction, hierarchy or relationship is the clearest explanation.

Prefer no-human frames when clearer: schema/mechanism, symbolic object, environmental metaphor, object close-up, comparison or text illustration.

Never insert a decorative stickman merely to fill empty space.

## 7. Mood engine

Allowed mood modes:
- `CLEAR`
- `UNEASY`
- `DARK`
- `POWER`
- `MONEY`
- `ISOLATION`
- `HOPE`

Mood changes framing, light, posture, negative space, saturation and temperature. It never changes the channel's illustration family or geometric anatomy.

## 8. Power relationships

When relevant, power should be visible through blocking, scale, camera angle, distance, posture, gaze and foreground/background placement — never by turning one figure into a muscular or realistic body.

## 9. Environment — RICH WORLD HARD LOCK

Locations must support the psychological beat and may range widely: apartment, bedroom, café, train, supermarket, cinema, office, school, street, restaurant, park, negotiation room, lobby, shop floor, waiting room, corridor, platform and other believable locations.

Use recognizable architecture, furniture and props. Normal scenes should usually have meaningful foreground/midground/background separation.

Do NOT default to:
- empty cream/off-white backgrounds
- a character floating in blank space
- the same classroom/office repeatedly
- sterile generic rooms
- flat stock-vector staging

A sparse background is allowed only when negative space is deliberately part of the idea.

## 10. Lighting

Lighting is storytelling, not decoration. Use motivated daylight, practical lamps, cool window light, screen light, institutional light, side light, doorway light, rim light or low-key light when appropriate.

Never use symbolic glow/rays as a substitute for concrete behavior unless a deliberate metaphor is clearly the best explanation.

## 11. Color system

There is no single forced palette. Recurring anchors may include deep navy, charcoal, warm amber, muted teal/blue, coral/red, burgundy, deep green, restrained gold and natural local object colors.

Rules:
- controlled, not candy-colored
- no grey/beige/cream wash as default
- focal subject receives strongest useful contrast
- mood influences saturation/temperature
- avoid repeating the same teal/cream or red/burgundy treatment mechanically

## 12. Visual representation families

Every beat chooses the clearest representation:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`
- environment/object-only illustration

These are semantic choices, not quotas.

## 13. One clear beat per frame

Every frame communicates one primary thought with a clear focal subject/relation, current-beat clarity and meaningful environment only.

A multi-part composition is allowed only when all parts belong to the same single beat. Separate scene numbers are never combined into one asset.

## 14. Continuity

Repeat a person only when narrative continuity requires it. Then preserve:
- head shape
- tiny hair/accessory cue
- tiny torso-garment shape/color
- ultra-thin line-limb proportions
- shoes
- face simplification

Mood may change while identity stays stable.

## 15. Background/crowd anatomy — HARD LOCK

Background people are a frequent drift source.

Even when small, seated or partially occluded, they must retain:
- simple circle/oval heads
- tiny narrow torsos
- ultra-thin line arms and legs
- no thick seated-human silhouettes
- no broad shoulders/chests/hips

Do not simplify background people into normal cartoon silhouettes or generic corporate people.

## 16. Reference architecture

Permanent channel reference pack:
`assets/cinematic-human-behavior-world/`

Prefer a small approved set: style master, one or two compatible character references when needed, optional group/environment/schema reference.

Until approved references exist, this file + `rules/visual-system.json` + `rules/STICKMAN_DNA.md` are authoritative.

Any candidate reference must itself pass the geometric-stickman anatomy lock before steering later scenes.

## 17. Text

Normal scenes remain text-free unless text is planned. All visible wording is exact planned German text. If nothing is planned: `ZERO READABLE TEXT`.

Speech context is never rendered as visible text.

## 18. Cover

Cover uses the same world but stronger composition: one dominant conflict/question, clear silhouette, stronger useful contrast, deliberate lighting, thumbnail readability and integrated safe text area.

The cover may never switch into a different cartoon/anime/poster world.

## 19. Hard fail

Regenerate if:
- a figure can pass as a thin normal cartoon human
- limbs become tapered/cylindrical human arms or legs
- sleeves/trousers create human limb volume
- chest/waist/hips/thighs/calves appear
- background people use a different/chunkier anatomy family
- character becomes realistic/full-cartoon/whiteboard
- character becomes chibi, mascot-like or toy-like
- 3D/CGI/Pixar/anime drift appears
- photorealistic environment appears
- corporate-vector look appears
- empty cream/off-white space is used without semantic reason
- mood contradicts the spoken beat
- schema looks like PowerPoint
- random readable text appears
- current beat is unclear

## 20. Priority

1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/PREMIUM_VISUAL_LOCK.md`
5. approved `assets/cinematic-human-behavior-world/` references
6. current Visual Beat
7. compatibility lock files

This file defines the visual world. Google Flow output behavior is separately locked by `rules/FLOW_OUTPUT_MODE.md`. The existing production/file structure remains unchanged.
