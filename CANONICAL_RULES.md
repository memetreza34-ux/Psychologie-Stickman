# CANONICAL RULES — HUMAN BEHAVIOR VISUAL PRODUCTION

## Source of Truth

1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/PREMIUM_VISUAL_LOCK.md`
5. `rules/FLOW_OUTPUT_MODE.md`
6. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
7. `rules/FLOW_PROMPT_ARCHITECTURE.md`
8. `rules/REPRESENTATION_VARIETY_LOCK.md`
9. `rules/IMAGE_REFERENCE_LOCK.md`
10. approved `assets/cinematic-human-behavior-world/` references
11. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
12. `rules/COVER_LOCK.md`
13. `rules/TEXT_OVERLAY_LOCK.md` + `rules/FLOW_TEXT_STYLE_LOCK.md`
14. `rules/YOUTUBE_EXPORT_PACKAGE.md`
15. format/script/production rules

## Active world

`CINEMATIC_HUMAN_BEHAVIOR_V2`

Core:
- one unified mature strict-stickman human family
- polished cinematic 2D psychology-documentary / editorial rendering
- believable rich environments
- clean dark/organic outlines
- soft cel shading with useful graphic shadow
- adaptive psychological lighting and color
- natural depth
- same visual world across bright, uneasy, dark, power, money, isolation and hopeful scenes

## Character rule

All people follow `STYLIZED_STICKMAN_CAST_V2`:
- large simple head without chibi/mascot exaggeration
- minimal face
- small narrow clothed torso
- narrow shoulders
- very slim arms and legs
- simple no-finger hands and shoes

Individuality may come from restrained hair/eyebrow/eye/mouth variation, glasses/accessories, clothing, posture, gaze and role-specific body language without changing anatomy family.

No cute/chibi/mascot people, no normal cartoon humans, no realistic human anatomy, no broad shoulders/thick limbs, no 3D/Pixar/anime drift.

## Rich-world rule

**Simple Stickmen. Rich World. One clear idea per image.**

Normal real-life frames use scene-specific environments, meaningful props, useful foreground/midground/background and motivated light. Empty cream/off-white space is not the channel default.

## Unified film-world rule — HARD LOCK

The complete YouTube video must feel like one coherent illustrated film.

Across all batches preserve:
- Stickman anatomy family
- illustration/rendering language
- outline behavior
- cel-shading style
- texture/detail level
- environment quality
- depth/spatial logic
- typography language
- overall adult psychology-documentary/editorial identity

Mood, color temperature, location, camera and lighting may change. The visual identity may not.

## Visual Director — HARD LOCK FOR NEW VIDEOS

Follow `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md` / `OBSERVABLE_SCENE_FIRST_V1`.

The repo must decide the concrete visible scene before Google Flow is asked to generate it:

```text
spoken meaning
→ viewer takeaway
→ observable evidence
→ one concrete visible composition
→ final Flow prompt
```

Do not ask Flow to invent how an abstract psychological idea looks.

Psychological effect names are not literal art instructions:
- Spotlight-Effekt ≠ automatic spotlight beam
- Ankereffekt ≠ automatic ship anchor
- Halo-Effekt ≠ automatic halo
- Framing ≠ automatic picture frame

Human emotion/power must be supported by visible posture, gaze, distance, blocking and action rather than adjectives alone.

## Representation variety — guidance, not quota

Follow `rules/REPRESENTATION_VARIETY_LOCK.md`.

Allowed forms include:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`
- environment/object-only illustration

Typical percentage ranges are review guidance only. Never force a montage, group scene, split screen, character or schema because a quota expects one. Content determines the form.

Text and schemas are used only when they materially improve understanding. If text is unnecessary: `ZERO READABLE TEXT`.

## Google Flow prompt architecture — HARD LOCK

Follow `rules/FLOW_PROMPT_ARCHITECTURE.md` / `NATURAL_FLOW_MASTER_V2`.

Every YouTube project uses exactly one:

`02-google-flow/google-flow-prompt.txt`

Detailed planning remains in `99-intern/`. The final Flow prompt does not dump technical planning fields into each image block.

Final master order:
1. task/output
2. concise channel visual world
3. character/reference system
4. video world/continuity lock
5. cover + five-image generation workflow
6. global text rule
7. observable-scene prompting rule
8. `BILD 01` through `BILD NN` as natural direct prompts

A normal image prompt uses concrete camera/framing + subject + visible action/relation + relevant environment/props + light/local color + continuity when needed + exact planned text or no visible text.

Global style/anatomy/negative rules appear once near the top.

## Google Flow output — HARD LOCK FOR NEW VIDEOS

Follow `rules/FLOW_OUTPUT_MODE.md` / `FINAL_SEPARATE_IMAGE_ASSETS_V2`.

- Bild 01 first
- exactly 3 separate cover candidates
- stop for user approval
- chosen winner → `03-bilder/01.png`
- only after cover choice continue
- later generation uses exactly 5 image numbers per batch whenever at least 5 remain
- final remainder batch contains 1–4 images
- whole five-image batch is one batch operation, not deliberate image-by-image work
- every image number becomes its own standalone 16:9 image
- accepted images immediately renamed to matching `NN.png`
- all accepted images stay together in one flat `03-bilder/`
- regenerate only failures; after a passing batch continue automatically
- never combine several image numbers into storyboard/contact sheet/panel grid/collage
- never ask Flow to turn the image plan into a video

A single image may use split/contrast/montage only when all parts explain one inseparable beat.

**Existing/historical projects are not retroactively migrated.**

## Reference architecture

Follow `rules/IMAGE_REFERENCE_LOCK.md`.

Prefer a small approved reference set by role:
- `style-master.png`
- one or two approved images for a recurring Character A when needed
- one or two approved images for Character B when needed
- `character-group.png` when useful
- one optional schema/environment reference when needed

Until an image is actually approved, written rules remain authoritative.

## Visual clarity

One important visual thought per frame. No future information. Detail supports the current beat.

If one beat contains several independent actions/examples, split the visual beat rather than forcing a montage.

## Text rule

Google Flow only. Planned modes include cover, keyword, schema labels, comparison labels and short text illustrations.

Unplanned text: `ZERO READABLE TEXT`.
Speech context is never visible text.
Remotion visible YouTube text remains disabled.

## Cover

`01.png = BILD 01 + Cover/Thumbnail`.

All three initial cover candidates use the same approved thesis and exact cover text but may test meaningfully different strong compositions. Flow must stop for the user's choice.

## Script

Keep `HOOK_FIRST_EXPLAIN_EARLY_V1`:
- Hook scene 01
- core concept by scene 03
- concrete example by scene 05 when possible

## YouTube export package — HARD LOCK

Every new finished YouTube project contains:

```text
05-export/
├── final.mp4
├── thumbnail.png
└── youtube-upload.txt
```

`youtube-upload.txt` contains final title, description/caption, sources/links when relevant, chapters when useful, tags, hashtags, pinned comment or `NONE`, cleaned final German speaker text/captions and basic video data.

No separate normal-workflow `title.txt`, `description.txt`, `tags.txt` or `chapters.txt`.

## Required metadata for new projects

```json
{
  "visualSystem": "CINEMATIC_HUMAN_BEHAVIOR_V2",
  "characterSystem": "STYLIZED_STICKMAN_CAST_V2",
  "humanCharacterPolicy": "UNIFIED_STICKMAN_HUMANS_V2",
  "characterPresencePolicy": "OPTIONAL_HUMANS_MIXED_VISUALS_V1",
  "moodPolicy": "ADAPTIVE_PSYCHOLOGICAL_MOOD_V1",
  "environmentPolicy": "BELIEVABLE_ADAPTIVE_CINEMATIC_ENVIRONMENT_V2",
  "renderingPolicy": "SOFT_CEL_SHADED_FILM_FRAME_V2",
  "representationPolicy": "MIXED_HUMAN_BEHAVIOR_VISUALS_V2",
  "representationVarietyPolicy": "REPRESENTATION_VARIETY_V1",
  "visualPlanningPolicy": "SEMANTIC_OBSERVABLE_VISUALS_V1",
  "visualDirectorPolicy": "OBSERVABLE_SCENE_FIRST_V1",
  "socialScenePolicy": "SEMANTIC_SOCIAL_DENSITY_V1",
  "flowOutputPolicy": "FINAL_SEPARATE_IMAGE_ASSETS_V2",
  "flowPromptPolicy": "NATURAL_FLOW_MASTER_V2",
  "scriptHookPolicy": "HOOK_FIRST_EXPLAIN_EARLY_V1",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3"
}
```

## Retired standards

Not active for new production:
- `Universal Editorial Stickman World v1.3`
- `MINIMAL_EDITORIAL_STICKMAN_V2`
- `CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1`
- `FLOW_SCENE_PROMPT_CONTRACT_V1`
- `VARIED_COMPOSITION_V1` as a forced composition system
- `SOCIAL_VARIETY_V1` as a forced social-density system
- `NATURAL_FLOW_MASTER_V1`
- `FINAL_SEPARATE_IMAGE_ASSETS_V1`

Historical projects may retain old metadata.

## Hard fail for new production

- bare whiteboard/doodle drift
- cute/chibi/mascot drift
- normal cartoon or realistic human drift
- broad shoulders/thick limbs
- mixed human anatomy families
- 3D/Pixar/anime/photorealistic drift
- corporate-vector schema drift
- empty cream/off-white default world
- random readable text
- current beat is not visually clear
- final prompt asks Flow to interpret an abstract psychological state instead of describing observable evidence
- a named psychology effect is literalized only because of its name
- symbolic glow/ray/icon replaces a clearer real-world action
- unrelated examples are crammed into one image
- montage/group/split is forced to satisfy a quota
- later batches drift into another art style
- final Flow prompt becomes a repeated technical form
- several image numbers are combined into one asset
- post-cover generation falls back to deliberate one-image-at-a-time work while five remain
- accepted images are not renamed to `NN.png`
- accepted images are split across batch folders
- one video is split into multiple Flow master files
- finished project has no complete `05-export/youtube-upload.txt`
