# GOOGLE FLOW PROMPT ARCHITECTURE — NATURAL MASTER V2

**STATUS: BINDING PROCESS RULE**

Policy ID: `NATURAL_FLOW_MASTER_V2`

## Active visual world

Binding world: `PSYCHOLOGY_STICKMAN_WORLD_V1`

Source: `rules/PSYCHOLOGY_STICKMAN_WORLD.md`

Sequence hardening: `VISUAL_SEQUENCE_HARDENING_V1`
Source: `rules/VISUAL_SEQUENCE_HARDENING.md`

## One master file

Every video uses exactly one:

`02-google-flow/google-flow-prompt.txt`

All images stay inside this one master file.

## Final prompt order

1. TASK / OUTPUT
2. ACTIVE VISUAL WORLD
3. short global channel-style/species block
4. REPRESENTATION-FIRST rule
5. SAME-FRAME SPECIES rule
6. MOTIF PROGRESSION / PANEL-DENSITY rule
7. SEQUENCE VARIETY / MOBILE-READABILITY rule
8. VIDEO WORLD / continuity facts
9. COVER WORKFLOW
10. FIVE-IMAGE BATCH WORKFLOW
11. GLOBAL TEXT RULE
12. OBSERVABLE-SCENE RULE
13. BILD 01 through BILD NN

## Prompt simplicity

Detailed planning belongs in `99-intern/`.

Final BILD prompts stay short and direct:
- representation + camera/framing
- dominant subject/relation
- exact visible action/object/mechanism/text
- useful environment/props
- scene-specific light/color/mood
- continuity when needed
- exact German text or `No visible text.`

Do not repeat the full visual-world paragraph in every BILD.

## Representation first — HARD RULE

Before each BILD prompt, Phase 1 must already choose one:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

People are optional. A character scene is appropriate only when visible human behavior/interaction is the evidence.

## Stickman species lock — HARD RULE

Whenever a BILD contains people, the prompt must preserve the approved species. Use the compact reinforcement when needed:

`same approved stickman species: identical light round/oval base heads, tiny black oval eyes, narrow clothed torsos, very thin dark stick-like limbs; hair/clothing may vary but no normal-human anatomy.`

Historical, office, laboratory, family and dark-psychology scenes do not get exceptions. If Flow generates a normal cartoon human, that BILD fails and must be regenerated.

### Same-frame species rule

If two or more humans share one image, every human must visibly use the same light/white head shell, head proportion, eye language, torso scale and limb thickness. Hair sits on the approved head; it must not replace it with a normal skin-toned cartoon face. Clothing may not create human-like shoulders, chest, hips or thighs.

**Mixed normal-cartoon person + stickman in one image = FAIL.**

## Motif progression — HARD RULE

Projects using `VISUAL_SEQUENCE_HARDENING_V1` must plan `motifKey`, `visualChangeReason` and `panelCount` per scene.

Recurring objects are allowed for continuity, but neighboring scenes must materially progress through action, consequence, location, camera, focal scale, object state, social relation or foreground/background role.

Three or more adjacent scenes with the same `motifKey` require explicit `motifProgressionJustification`; otherwise redesign before Phase 2.

Do not treat a different representation label as sufficient variety if the frame is still essentially the same product/desk/person shot.

## Panel/state density — HARD RULE

Default maximum: **2 distinct visible states/panels in one BILD**.

Do not ask Flow for 3-part/4-part timelines, multi-panel mini-storyboards or slide-like explainer sequences inside one image.

For a 3-step mechanism, split it into multiple BILDs, show one coherent physical scene, or reduce it to a two-state before/after comparison.

## Sequence variety and staging

Representation variety alone is insufficient if the frames still look like repeated flat explainer cards.

Before Phase 2, check adjacent scenes for:
- camera distance
- focal scale
- subject placement
- spatial depth
- local palette/light
- flat-board vs immersive-environment staging
- recurring motif state and function

Avoid repeated beige/neutral presentation boards, centered objects, circles/arrows templates, near-identical layouts or repeated hero-object displays across several adjacent BILDs.

When the script allows, prefer concrete real-world contexts such as a shelf, room, street, desk, product close-up, hallway or laboratory over a generic explanatory background.

## Mobile readability

All images must work at phone size.

- large clear focal subject
- short planned text only
- no paragraph-like copy
- max 2 distinct states/panels by default
- schemas preferably max 3 major labels/branches
- avoid tiny crowds, dense arrow networks and many mini-panels

## Observable Scene First

Use:

`spoken meaning → viewer takeaway → observable evidence → best representation → concrete composition → motif/panel QA → final prompt`

Do not ask Flow to invent an abstract psychological visual. Do not literalize effect names automatically.

## Global style anchor

Use once near the top:

`Same approved Psychology Stickman World: high-quality hand-drawn 2D animation with organic dark outlines, soft cel shading, subtle illustration texture, natural clear colors and coherent depth. When people appear they use the exact same stickman species: identical oversized round/soft-oval light heads, tiny black oval eyes, narrow clothed torsos and very thin dark stick-like limbs; hair/clothing may vary but never normal cartoon-human anatomy. Objects, text, environments and schemas use the same illustrator language.`

Minimal exclusions:
- no 3D / Pixar
- no anime
- no photorealism
- no normal-human anatomy drift
- no mixed human species in one frame
- no bare whiteboard doodle
- no foreign corporate infographic style
- no repetitive beige explainer-board default
- no 3-/4-panel explainer-board default
- no unplanned readable text

## People

Do not invent a permanent protagonist. Reuse exact identity only when story continuity requires it. Do not add people to object/text/environment frames just to populate them.

## Cover-once, then autonomous full production

Binding policy: `COVER_ONCE_AUTOCONTINUE_FINAL_QA_V1` from `rules/FLOW_OUTPUT_MODE.md`.

The ONLY stop/request for the user is the choice among the three cover candidates for BILD 01. Upon selection, keep the approved `01.png` and delete both rejected cover candidates. Do NOT ask "weiter", approval, feedback or permission for any subsequent five-image batch. After batch-local QA, regenerate missing/failed items (only those), rename accepted images to `NN.png`, and proceed to the next batch immediately. Complete the entire 01–NN set in the single flat `03-bilder/` folder. Finish with an exact-count/name/16:9/no-leftover-covers/no-subfolders final QA and visual/species/text checks. Missing assets are corrected, not silently skipped. Only real operational failures justify stopping with an explicit incomplete status.

See also `npm run flow:cover -- <project-folder> <winner>` and `npm run flow:verify -- <project-folder>` for a local cover-selection and final file-structure QA when the images are accessible to the repo.

## Cover workflow

- BILD 01 only
- exactly 3 separate 16:9 cover candidates
- same visual thesis and exact cover text
- 3 meaningfully different compositions
- STOP for user choice
- winner → `01.png`
- approved `01.png` becomes episode reference for linework, shading, texture, finish and stickman species when people appear

The cover does not force later scenes to repeat its person, location, composition or representation type.

## Later generation

After cover approval:
- 02–06
- 07–11
- 12–16
- continue in groups of 5
- final remainder 1–4

Each BILD remains one separate 16:9 asset. Accepted images → `NN.png` → same flat `03-bilder/`. Regenerate only failed images. Never create storyboard/contact sheet/final video.

## Text

Default: `No visible text.`

Only exact planned German wording may appear. Text may be the primary subject of a `TEXT_ILLUSTRATION` when wording itself is the mechanism, but it must remain large and sparse.

Any unplanned readable English/German, UI/packaging words or gibberish is an immediate regeneration failure.

## Hard fail / rewrite

- character scene used by default without representation reason
- any human drifts into normal cartoon-human anatomy
- multiple people in one frame use different base species/anatomies
- non-character frame switches to a foreign rendering style
- several adjacent frames repeat the same flat explainer-board composition
- several adjacent frames reuse the same motif without material progression
- schema/text image is too dense for phone viewing
- more than 2 distinct states/panels appear without exceptional justification
- tiny people or labels are required to understand the point
- any unplanned readable text appears
- Flow must invent the core visual idea
- several scene numbers are combined into one asset
- cover gate or five-image batching is broken
