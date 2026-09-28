# FLOW PROMPT CONTRACT — FIXED SCENE STRUCTURE V1

**STATUS: HARD LOCK**

Every Google Flow scene prompt must use the exact same block order. Scene content may change; the structure may not.

Policy ID: `FLOW_SCENE_PROMPT_CONTRACT_V1`

## Why this exists

The image model must never infer a new prompt format from scene to scene. A manipulation scene, money scene, neutral explainer, schema, cover and dark scene all use the same ordered contract.

## Global rule

Each `SCENE NN` block contains these fields in this exact order:

1. `SPEECH CONTEXT — DO NOT RENDER AS TEXT:`
2. `SCENE TYPE:`
3. `COMPOSITION:`
4. `SOCIAL DENSITY:`
5. `MOOD MODE:`
6. `MOOD INTENSITY:`
7. `POWER DYNAMIC:`
8. `VISUAL IDEA:`
9. `VISUAL TASK:`
10. `CHARACTER / SUBJECT DIRECTION:`
11. `ACTION / RELATION:`
12. `ENVIRONMENT:`
13. `CAMERA:`
14. `LIGHTING:`
15. `COLOR:`
16. `CONTINUITY:`
17. `TEXT POLICY:`
18. `PLANNED GERMAN TEXT:`
19. `NEGATIVE LOCKS:`
20. `PROMPT:`

No field may be omitted. Use `NONE` when a field is not applicable.

## Fixed PROMPT substructure

Inside every `PROMPT:` use the following labels in this exact order:

`[GOAL]`
- State the single visible idea of this frame.

`[WORLD LOCK]`
- `CINEMATIC_HUMAN_BEHAVIOR_V2`.
- Polished cinematic 2D editorial/animated-film illustration.
- Same outline, cel-shading, texture and rendering language as all channel frames.

`[CHARACTER LOCK]`
- Every visible human uses `STYLIZED_STICKMAN_CAST_V2`.
- Large simple round/oval head, minimal face, compact clothed torso, very slim shaped limbs, simple hands and shoes.
- Never mix character anatomy families.
- If no human is needed, explicitly say `NO HUMAN REQUIRED`.

`[PSYCHOLOGICAL MOOD]`
- Repeat the exact `MOOD MODE`, `MOOD INTENSITY` and `POWER DYNAMIC` values.
- Translate mood through light, framing, posture, negative space and controlled color — never by changing illustration style.

`[SCENE CONTENT]`
- Describe only the current spoken beat.
- State subject, action/relation and environment.
- Never introduce later information.

`[CAMERA + COMPOSITION]`
- Repeat the planned camera and composition.
- Preserve one dominant focal idea.

`[LIGHT + COLOR]`
- Repeat the planned lighting and color direction.
- Dark does not mean a plain black background. Use motivated practical light, shadows and environmental depth.

`[TEXT LOCK]`
- If text is planned: render only the exact listed German strings.
- If none is planned: `ZERO READABLE TEXT`.
- Speech context must never appear as visible text.

`[NEGATIVE LOCK]`
- No photorealism.
- No 3D/Pixar/CGI.
- No anime/manga/chibi.
- No corporate vector stock art.
- No whiteboard/doodle style.
- No random readable text.
- No mixed human anatomy styles.
- No decorative person when a no-human visual is clearer.

`[FINAL CHECK]`
- One current beat only.
- Correct channel world.
- Correct character family.
- Correct mood.
- Correct text policy.

## Mood modes

Allowed:
- `CLEAR` — neutral explanation, everyday cognition, open readable light.
- `UNEASY` — doubt, pressure, uncertainty, subtle social tension.
- `DARK` — manipulation, deception, coercion, severe conflict or disturbing behavior.
- `POWER` — hierarchy, dominance, authority, status or control.
- `MONEY` — money, consumption, negotiation, greed, risk or financial behavior.
- `ISOLATION` — exclusion, loneliness, fear, alienation or vulnerability.
- `HOPE` — protection, solution, recovery, clarity or constructive resolution.

## Mood intensity

Integer `0–4`:
- `0` neutral/open.
- `1` subtle emotional direction.
- `2` clearly felt mood.
- `3` strong cinematic tension.
- `4` extreme but still readable and channel-consistent.

Never make every frame dark. Intensity follows the spoken beat.

## Power dynamic

Use one:
- `NEUTRAL`
- `SELF_VS_SELF`
- `PEER_TO_PEER`
- `DOMINANT_VS_TARGET`
- `AUTHORITY_VS_GROUP`
- `GROUP_VS_INDIVIDUAL`
- `SYSTEM_VS_INDIVIDUAL`
- `STATUS_CONTRAST`
- `NONE`

## Character-role principle

Characters do not need to look nice. They may be dominant, cold, exhausted, vulnerable, suspicious, intimidating, arrogant, isolated or deceptive while preserving the same simplified anatomy family.

Do not use cheap villain clichés by default: no horns, monster teeth, glowing red eyes or horror faces unless the literal subject requires them. Psychological threat should usually come from posture, framing, shadow, gaze, proximity, hierarchy and environment.

## Cover

Scene 01 uses the same contract. It is `SCENE 01 + COVER/THUMBNAIL`, not the global style master.

## QA

`npm run qa:flow-prompts` must fail new `CINEMATIC_HUMAN_BEHAVIOR_V2` prompts when required blocks are missing or out of order.
