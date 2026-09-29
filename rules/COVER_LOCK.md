# COVER LOCK — TOPIC-EXPLICIT HUMAN-BEHAVIOR THUMBNAILS

**STATUS: BINDING — HARD LOCK**

`03-bilder/01.png` is always:
1. Scene/Bild 01 / first hook beat
2. Cover / thumbnail source

It is **not** the global channel style master. Global style comes from `rules/VISUAL_SYSTEM.md` and approved files in `assets/cinematic-human-behavior-world/`.

## 1. Core rule: the cover must explain the topic

A cover is not approved merely because it is attractive.

The viewer should understand the central mechanism, conflict or behavioral question in roughly one second, preferably even before reading the headline.

Every new project defines internally:
- `coverSemanticPolicy: "TOPIC_EXPLICIT_VISUAL_THESIS_V1"`
- `coverTopicTerm`: internal exact topic/concept name
- `coverVisualThesis`: one concrete sentence describing what the image must visibly show
- `coverMechanismVisible: true`
- `coverLayoutPolicy: "INTEGRATED_THUMBNAIL_COMPOSITION_V1"`
- `coverTitlePlacementPolicy: "COMPOSITION_FIRST_NO_TOP_BANNER_V1"`

These planning fields belong in `99-intern/`; the final Flow prompt expresses them naturally inside `BILD 01`.

## 2. Topic term is internal metadata, not mandatory extra text

`coverTopicTerm` identifies the topic for planning and QA.

For a named psychology effect, the exact technical term **does not have to be visible** if:
- the main curiosity headline is clear,
- the visual mechanism is unmistakable,
- adding the technical term would create unnecessary text or weaken the thumbnail.

Example:
- internal topic: `ANKEREFFEKT`
- visible title: `WARUM EINE ZAHL DICH LENKT`
- visual thesis: same headphones shown through the 199 € → 129 € perception shift

This is preferred over forcing both a technical kicker and a curiosity headline when the frame becomes text-heavy.

Use the exact topic term visibly only when it materially improves instant understanding.

## 3. Visual mechanism before decoration

Bild 01 must show the mechanism, relationship, contrast or behavior that defines the topic.

Prefer:
- same object / different valuation
- thought vs reality
- before vs after
- person vs group
- dominant vs target
- cause vs consequence
- price/reference contrast
- clear symbolic mechanism when a concrete situation would be weaker

Avoid as the main cover idea:
- generic worried character
- unrelated cinematic room
- random object + facial expression
- decorative symbolism that requires explanation
- atmosphere without mechanism

## 4. Thumbnail composition

Use the same `CINEMATIC_HUMAN_BEHAVIOR_V2` world as normal scenes, but compose more strongly:
- one dominant visual thesis
- one primary focal conflict/relationship
- large readable subjects
- strong silhouette and role contrast
- stronger but believable color/light separation
- meaningful props only
- one deliberately reserved title zone
- readable at small thumbnail size

The cover may be CLEAR, UNEASY, DARK, POWER, MONEY, ISOLATION or HOPE according to the actual topic. Do not force a generic dark thumbnail.

## 5. Typography layout — NO TOP BANNER DEFAULT

Text and illustration must be designed together.

Do NOT default to:
- long full-width headline across the top
- generic detached banner
- text pasted over faces or focal objects
- technical kicker + headline + multiple labels when one headline is enough

Prefer:
- left/right negative-space zone
- compact asymmetric title block
- one or two lines when possible
- strong contrast against the actual background
- dark text on sufficiently bright areas
- light text on sufficiently dark areas

## 6. Cover text

Google Flow renders all cover text. Remotion adds none.

Default:
- one main title/curiosity line, normally 2–7 words
- mechanism labels such as prices only when necessary to make the visual thesis clear
- optional technical topic term only when it improves clarity

No random additional readable text.

Text economy matters: fewer strong words are preferred over redundant labeling.

## 7. Internal planning vs final Flow prompt

Intern, Bild 01 must still define:
- concrete visual idea
- concrete visual task
- topic-defining visual relationship
- mood mode/intensity
- power dynamic when relevant
- exact planned German cover text
- title-safe composition direction

But new videos use `NATURAL_FLOW_MASTER_V1`.

Therefore the final `google-flow-prompt.txt` does **not** dump these as technical form fields. `BILD 01` is a natural direct art-direction paragraph that visibly communicates the mechanism, composition, environment/light and exact cover text.

## 8. Cover generation gate — HARD LOCK

For new videos:
1. Read the complete master prompt.
2. Generate **BILD 01 only**.
3. Generate exactly **3 separate 16:9 cover candidates**.
4. Never combine the three candidates into one panel/contact sheet.
5. STOP and wait for the user to choose one.
6. Keep exactly the chosen candidate.
7. Rename it immediately to `01.png`.
8. Place it directly in `03-bilder/`.
9. Only then may the regular 5-image batches begin.

## 9. Approval

Bild 01 approval checks:
- central mechanism/question is identifiable
- visual thesis is concrete, not generic
- world/character quality matches v2
- mood fits the topic
- cover works at thumbnail size
- typography is integrated
- text contrasts with its real background
- no full-width top-banner default
- no redundant text
- exact planned German text only

If any item fails, regenerate Bild 01 before later images.

## 10. Metadata

Required for new projects:
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

## 11. Priority

**Topic/mechanism clarity > text quantity > visual decoration.**

A beautiful cover that does not explain the topic is a FAIL. A text-heavy cover that repeats what the image already shows should be simplified.
