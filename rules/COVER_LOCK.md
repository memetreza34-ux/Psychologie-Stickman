# COVER LOCK — TOPIC-EXPLICIT HUMAN-BEHAVIOR THUMBNAILS

**STATUS: BINDING — HARD LOCK**

`03-bilder/01.png` is always:
1. BILD/Scene 01 / first hook beat
2. Cover / thumbnail source

It is not the global channel style master. Global style comes from `rules/VISUAL_SYSTEM.md` and approved files in `assets/cinematic-human-behavior-world/`.

## 1. Core rule

A cover is not approved merely because it is attractive.

The viewer should understand the central behavioral conflict/question in roughly one second, preferably before reading the headline.

Every new project defines internally:
- `coverSemanticPolicy: "TOPIC_EXPLICIT_VISUAL_THESIS_V1"`
- `coverTopicTerm`
- `coverVisualThesis`
- `coverMechanismVisible: true`
- `coverLayoutPolicy: "INTEGRATED_THUMBNAIL_COMPOSITION_V1"`
- `coverTitlePlacementPolicy: "COMPOSITION_FIRST_NO_TOP_BANNER_V1"`
- `visualDirectorPolicy: "OBSERVABLE_SCENE_FIRST_V1"`
- `flowPromptPolicy: "NATURAL_FLOW_MASTER_V2"`

These fields belong in `99-intern/`; the final Flow prompt expresses them naturally inside `BILD 01`.

## 2. Observable cover thesis — HARD LOCK

The cover thesis must be expressed through concrete visible evidence, not an abstract psychology instruction.

Before BILD 01 is written:

```text
hook meaning
→ what must viewer understand?
→ what can literally be seen that proves it?
→ strong thumbnail composition
```

Prefer visible behavior/relations:
- who looks at whom
- who ignores whom
- posture and distance
- group vs individual
- same object / different valuation
- before vs after
- cause vs consequence
- concrete choice/decision conflict

Avoid as the main cover idea:
- generic worried character
- unrelated cinematic room
- decorative glow/rays/icons
- an effect name converted into a literal object
- symbolism that needs explanation
- atmosphere without behavior/mechanism

## 3. Do not literalize effect names

A psychology term is not an art instruction.

Examples:
- Spotlight-Effekt does not automatically mean a theatrical spotlight
- Ankereffekt does not automatically mean a ship anchor
- Halo-Effekt does not automatically mean a glowing halo
- Framing does not automatically mean a picture frame

Use such a metaphor only after deliberate editorial review and only if it communicates the actual mechanism more clearly than a concrete situation.

## 4. Topic term is internal metadata

`coverTopicTerm` identifies the topic for planning and QA.

The exact technical term does not have to be visible when headline + visual thesis already make the topic clear. Adding redundant technical text should be avoided.

## 5. Thumbnail composition

Use the same `CINEMATIC_HUMAN_BEHAVIOR_V2` world as normal scenes, but compose more strongly:
- one dominant visual thesis
- one primary focal conflict/relationship
- large readable subjects
- strong silhouette/role contrast
- believable useful color/light separation
- meaningful props only
- deliberately reserved title zone
- readable at small thumbnail size

The cover may use CLEAR, UNEASY, DARK, POWER, MONEY, ISOLATION or HOPE according to the actual beat. Do not force darkness or a signature color treatment.

## 6. Typography layout — NO TOP BANNER DEFAULT

Text and illustration are designed together.

Do not default to:
- long full-width headline across the top
- detached banner
- text over faces or focal objects
- technical kicker + headline + multiple labels when one headline is enough

Prefer a compact asymmetric title block in calm negative space with strong real-background contrast.

## 7. Cover text

Google Flow renders the cover text. Remotion adds none.

Default:
- one main title/curiosity line, normally 2–7 words
- mechanism labels only when genuinely necessary
- optional technical term only if it materially improves clarity

No random readable text.

## 8. Internal planning vs final Flow prompt

Intern, BILD 01 defines:
- `viewerTakeaway`
- `observableEvidence`
- `dominantRelation`
- concrete visual idea/task
- mood/power when relevant
- exact German cover text
- title-safe composition
- literal-metaphor warning when relevant

New videos use `OBSERVABLE_SCENE_FIRST_V1` + `NATURAL_FLOW_MASTER_V2`.

Therefore the final `google-flow-prompt.txt` does not dump these as technical labels. BILD 01 is a natural direct art-direction paragraph built from concrete camera/framing, visible subjects, exact action/relation, relevant environment, believable light/color and exact cover text.

## 9. Three-cover gate — HARD LOCK

For new videos:
1. Read the complete master prompt.
2. Generate BILD 01 only.
3. Generate exactly 3 separate standalone 16:9 cover candidates.
4. Never combine them into one sheet/grid.
5. All three use the same approved visual thesis and exact cover text.
6. The three should test meaningfully different strong compositions, not tiny near-duplicate pose changes.
7. STOP and wait for the user to choose one.
8. Keep exactly the chosen candidate.
9. Rename it immediately to `01.png`.
10. Place it directly in `03-bilder/`.
11. Only then may regular five-image batches begin.

## 10. Approval

BILD 01 passes only when:
- central question/mechanism is identifiable
- observable evidence is concrete
- Flow did not invent a literal effect-name gimmick
- world/character quality matches V2
- body language/social relation is readable when relevant
- cover works at thumbnail size
- typography is integrated and high-contrast
- no full-width top-banner default
- no redundant/random text
- exact planned German text only

If any item fails, regenerate BILD 01 before later images.

## 11. Required metadata

- `isCover: true`
- `coverRole: "SCENE_01_COVER"`
- `coverHeadlineRequired: true`
- `coverTextRenderer: "GOOGLE_FLOW"`
- `coverSemanticPolicy: "TOPIC_EXPLICIT_VISUAL_THESIS_V1"`
- `coverTopicTerm: "..."`
- `coverVisualThesis: "..."`
- `coverMechanismVisible: true`
- `coverLayoutPolicy: "INTEGRATED_THUMBNAIL_COMPOSITION_V1"`
- `coverTitlePlacementPolicy: "COMPOSITION_FIRST_NO_TOP_BANNER_V1"`
- `visualDirectorPolicy: "OBSERVABLE_SCENE_FIRST_V1"`
- `flowPromptPolicy: "NATURAL_FLOW_MASTER_V2"`

## 12. Priority

**Concrete topic clarity > observable behavior/mechanism > text quantity > decoration.**

A beautiful cover that does not explain the topic is a FAIL.
