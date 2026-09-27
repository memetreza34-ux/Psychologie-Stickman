# COVER LOCK — TOPIC-EXPLICIT PSYCHOLOGY THUMBNAILS

**STATUS: BINDING — HARD LOCK**

`03-bilder/01.png` is always:
1. Scene 01 / first hook beat
2. Cover / thumbnail source

It is **not** the global channel style master. Global style comes from `rules/VISUAL_SYSTEM.md` and approved files in `assets/cinematic-psychology-world/`.

## 1. Core rule: the cover must explain the topic

A cover is not approved merely because it is attractive.

The viewer must understand the central psychology topic or mechanism in roughly one second, even before hearing the narration.

Every new project must define:
- `coverSemanticPolicy: "TOPIC_EXPLICIT_VISUAL_THESIS_V1"`
- `coverTopicTerm`: the exact psychological topic/concept
- `coverVisualThesis`: one concrete sentence describing what the image must visibly prove/show
- `coverMechanismVisible: true`
- `coverLayoutPolicy: "INTEGRATED_THUMBNAIL_COMPOSITION_V1"`
- `coverTitlePlacementPolicy: "COMPOSITION_FIRST_NO_TOP_BANNER_V1"`

Example for the endowment effect:
- topic term: `BESITZTUMSEFFEKT`
- visual thesis: `The same object is valued higher by its owner than by a non-owner.`

Bad cover thesis:
- person holding an object
- person looking worried
- generic money conflict

Good cover thesis:
- the SAME mug is clearly valued differently by owner and buyer

## 2. Topic naming

For named psychology effects/concepts, the exact `coverTopicTerm` must appear visibly somewhere in Scene 01.

It may be:
- the main title,
- a smaller integrated topic kicker,
- or a short secondary label.

The topic name must not be omitted in favor of a vague curiosity headline alone.

A curiosity line may support the topic name, for example:
- `BESITZTUMSEFFEKT`
- `WARUM DEINS MEHR WERT IST`

## 3. Visual mechanism before decoration

Scene 01 must show the mechanism, relationship, contrast or behavior that defines the topic.

Prefer:
- same object / different valuation
- thought vs reality
- before vs after
- owner vs non-owner
- person vs group reaction
- cause vs consequence
- clear symbolic mechanism when a real-life situation is impossible

Avoid as the main cover idea:
- generic worried character
- unrelated cinematic room
- random object + facial expression
- decorative symbolism that requires explanation
- atmosphere without mechanism

## 4. Thumbnail composition

Use the same `CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1` world as normal scenes, but compose more strongly:
- one dominant visual thesis
- one primary focal conflict/relationship
- large readable subjects
- strong silhouette and role contrast
- stronger but believable color/light separation
- meaningful props only
- clean title zone chosen from the composition
- readable at small thumbnail size

The cover may use split/contrast composition when it explains the concept faster.

## 5. Typography layout — NO TOP BANNER DEFAULT

Text and illustration must be designed together.

Do NOT default to:
- one long full-width headline squeezed across the top edge
- a generic top banner detached from the illustration
- text pasted over faces or focal objects
- title centered at the top merely because space exists there

Instead choose the title position from the visual composition:
- left negative-space zone
- right negative-space zone
- integrated two-level title block
- scene surface/card/sign that belongs to the illustration
- deliberately reserved asymmetric safe zone

Use 1–2 lines when possible. Keep clear outer margins. The visual subject and title should balance each other.

## 6. Cover text

Google Flow renders all cover text. Remotion adds none.

Allowed:
- one main curiosity/title line, normally 2–7 words
- optionally one short secondary topic kicker, usually the exact psychology concept

No random additional readable text.

## 7. Scene-01 planning requirements

Scene 01 must contain:
- a concrete `visualIdea`
- a concrete `visualTask`
- the topic-defining visual relationship
- exact planned German cover text
- explicit title placement direction

The prompt must say what is visibly different between the compared roles/states. `Make it emotional` or `make the conflict clear` is not sufficient by itself.

## 8. Approval

Scene 01 approval checks:
- exact topic is identifiable
- central mechanism is visible without narration
- visual thesis is concrete, not generic
- world/character quality matches the channel
- cover works at thumbnail size
- topic term is visible for named concepts
- typography is integrated into the composition
- no full-width top-banner default
- exact German text, safe margins, no accidental text

If any item fails, regenerate Scene 01 before generating later images.

## 9. Metadata

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

## 10. Priority

**Topic clarity > visual beauty > decorative atmosphere.**

A beautiful cover that does not explain the psychology topic is a FAIL.
