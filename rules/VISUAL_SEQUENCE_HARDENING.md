# VISUAL CONTINUITY + SEQUENCE HARDENING

**STATUS: BINDING HARD LOCK FOR NEW / REVISED YOUTUBE PROJECTS**

Policy ID: `VISUAL_SEQUENCE_HARDENING_V1`

This rule closes four recurring failure modes: mixed character anatomy, motif repetition, overloaded multi-panel explainers and accidental readable text.

## 1. Same-frame species lock — HARD FAIL

Whenever more than one person is visible, every person must use the exact same approved Psychology Stickman base construction:
- same oversized light/white round or soft-oval head construction
- same tiny black oval eye language
- same narrow clothed torso scale
- same very thin dark stick-like limb thickness
- same simplified hand/shoe language

Hair, clothing, age, role and era may vary, but they sit on top of the same base species.

Never accept a frame where one person is a normal cartoon human, skin-faced/full-bodied animated character or realistic-bodied figure while another person is a stickman.

Hair must not replace the light/white head construction with a normal human face. Clothing must not create realistic shoulders, chest, hips or thighs.

**Mixed species inside one frame = regenerate the frame.**

## 2. Motif progression — HARD REVIEW

A recurring story object may return for continuity, but repeated objects do not count as visual progression by themselves.

When the same motif returns in adjacent beats, at least one meaningful visual relation must change:
- action or consequence
- location/context
- camera distance or angle
- focal scale
- object state
- social relation
- foreground/background role

Example: headphones may recur as `store decision -> receipt/bag aftermath -> top-down choice -> macro feature inspection -> broken hinge`, but not as five near-identical product-display shots.

For plans using this policy, every scene should carry:
- `motifKey`
- `visualChangeReason`
- `panelCount`

Three or more adjacent scenes with the same `motifKey` are a QA fail unless the plan contains a specific `motifProgressionJustification` explaining why continuity genuinely requires it and the compositions still change materially.

## 3. Panel/state density — HARD LOCK

Default maximum: **2 distinct visual states/panels in one image**.

Do not create 3-part or 4-part explainer boards, timelines or mini-storyboards inside one BILD.

If a mechanism has three steps, prefer one of these:
1. split it across separate BILDs
2. show one coherent physical scene containing the decisive relation
3. reduce it to a two-state before/after comparison

A `SCHEMA_EXPLAINER` is not permission to create a presentation slide.

`panelCount > 2` requires an explicit exceptional justification and should normally be redesigned before Flow.

## 4. Readable-text contamination — HARD FAIL

If a BILD is not explicitly text-bearing, it must contain zero readable text.

Fail/regenerate for:
- unplanned English words
- invented headings
- labels on research boards
- readable packaging/brands
- readable UI/screens
- gibberish pseudo-text
- paragraph-like explanatory copy

For text-bearing BILDs, only the exact planned German wording is allowed.

## 5. Static-hold / visual pacing review

Visual beats should not remain unchanged longer than the visual idea can support.

Guidance for final planning/render review:
- simple object/text close-up: usually about 3–4.5 s
- normal action/environment beat: usually about 4–5.5 s
- complex research/environment frame: may hold about 5–6.5 s when there is real detail to inspect

If a simple frame would need a long hold because the spoken beat is long, split the spoken beat into two visual beats or add a second concrete cutaway. Do not solve pacing with random decorative motion.

## 6. Flow prompt requirements

For projects declaring `VISUAL_SEQUENCE_HARDENING_V1`, the master Flow prompt must explicitly state:
- same-base-species rule for all people in the same frame
- motif progression rule
- max 2 visible states/panels by default
- unplanned readable text / English = fail

## 7. QA summary

Reject/rewrite when:
- mixed human species appear in one image
- recurring props dominate several adjacent frames without meaningful progression
- one image contains 3+ explanatory panels/stages without exceptional justification
- any unplanned readable English/German/gibberish appears
- a simple static frame is held so long that the sequence feels frozen

## Merksatz

**Same species, progressing motif, max two states, zero accidental text.**
