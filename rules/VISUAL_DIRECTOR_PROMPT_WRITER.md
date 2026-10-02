# VISUAL DIRECTOR + FLOW PROMPT WRITER — OBSERVABLE SCENE FIRST V1

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

Policy ID: `OBSERVABLE_SCENE_FIRST_V1`

This rule controls the creative step between the spoken script and the final Google-Flow image prompt.

It does NOT change the folder structure, the single-master-file rule, the three-cover gate or the five-image batch workflow.

## 1. Core principle

**Do not ask Google Flow to invent how an abstract psychological idea should look.**

Before a Flow prompt is written, translate the spoken beat into something directly observable:

```text
spoken meaning
→ what the viewer must understand
→ concrete visible evidence
→ best visual representation
→ one clear composition
→ final image prompt
```

The final prompt may describe people, objects, environment, text, mechanism, comparison, camera, light and color. Do not assume a person is required.

## 2. Observable-evidence test — HARD LOCK

For every beat, answer internally:

1. What should the viewer understand from this beat?
2. What could a camera or illustrator literally show that proves this idea?
3. Is the strongest proof a person, object, place, comparison, mechanism or exact text?
4. What is the single dominant relation/action in the frame?
5. Which details are essential and which are decoration?
6. Can the image be understood without Flow having to interpret a psychological term?

If the answer to question 2 or 3 is vague, the visual idea is not ready.

Weak:
- `show self-consciousness`
- `visualize social pressure`
- `show reactance with a person looking angry`

Strong:
- `Four people point to the same choice while one person hesitates and keeps their hand lowered.`
- `An ignored open book sits in the foreground while the restricted phone on a shelf dominates the person's line of sight.`
- `The exact phrase “DU MUSST” is the visual focus, integrated into the same illustrated world beside a rigid pointing hand.`

## 3. Representation gate — BEFORE character design

Choose one primary representation before writing character details:
- `CHARACTER_SCENE`
- `OBJECT_FOCUS`
- `ENVIRONMENT_SCENE`
- `SCHEMA_EXPLAINER`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`

A script containing `du`, `jemand`, `Person`, `Menschen`, `er` or `sie` does NOT automatically justify a character scene.

Use `CHARACTER_SCENE` when visible human behavior or relation is the evidence.
Use `OBJECT_FOCUS` when one concrete object/relation carries the point faster.
Use `ENVIRONMENT_SCENE` when place/layout/context is the evidence.
Use `SCHEMA_EXPLAINER` for a mechanism that truly benefits from structure.
Use `COMPARE_VISUAL` when two states must be seen together.
Use `TEXT_ILLUSTRATION` when wording itself is the mechanism.

Every chosen scene in active-world phase-1 planning should have a short `representationReason`.

## 4. Do not literalize effect names — HARD LOCK

A psychological term containing a physical object or metaphor must NOT automatically become that literal object in the image.

Examples:
- Spotlight-Effekt ≠ theatrical spotlight beam
- Ankereffekt ≠ ship anchor
- Halo-Effekt ≠ glowing halo
- Framing-Effekt ≠ picture frame
- Echo Chamber ≠ literal echo room
- Bandwagon Effect ≠ wagon

A literal metaphor is allowed only when a human art director deliberately chooses it because it explains the current beat more clearly than concrete visible evidence.

## 5. Concrete evidence before symbolic spectacle

Prefer, in this order when appropriate:
1. observable real action / relation
2. concrete object or environment relation
3. direct comparison
4. short exact text when language itself matters
5. simple mechanism/schema
6. symbolic metaphor only when the previous options are weaker

Do not use glowing cones, oversized symbols, floating icons, surreal rays, abstract energy fields or theatrical effects merely to make an invisible mental state visible.

## 6. One visible idea per image

One scene/image should normally contain:
- one dominant visual idea
- one primary focal subject/relation
- only supporting elements that clarify that idea

If a beat asks one image to show several independent examples/actions, split the beat instead of forcing a montage.

A montage/split/contrast is allowed only when all parts are required to explain ONE inseparable comparison or mechanism.

## 7. Human emotion when people are actually needed

Do not stop at emotional adjectives such as anxious, dominant, ashamed, skeptical or relieved.

Translate emotion into visible cues:
- gaze direction
- head angle
- shoulder posture
- distance from others
- hands/arms position
- walking/standing/sitting behavior
- who is looking at whom
- who is ignored
- who occupies foreground/background
- what the person is doing with a relevant object

Emotion may be secondary guidance, but visible cues are mandatory when human emotion is the evidence.

## 8. Objects, environments and text must do useful work

A location or prop is not filler.

Use a real environment when it clarifies:
- hierarchy/status
- privacy/public exposure
- choice/decision context
- restriction/access
- social spacing
- historical period

Use object-led or text-led frames when they communicate the beat more directly than another full-body interaction.

Examples:
- a closed door and an unobstructed alternative exit can show constrained choice
- an abandoned book plus a restricted phone can show attention shift
- a period laboratory table can establish research history without another generic researcher/participant pose
- exact text such as `DU MUSST` can become the main visual when controlling wording is the mechanism

All of these must remain inside the same Psychology Stickman World render language.

## 9. Prompt Writer formula

After the visual idea passes the gates, write the final English `BILD NN` prompt in this order when relevant:

1. representation + camera/framing
2. dominant subject/relation
3. exact visible action / object relation / mechanism / text
4. supporting behavior/objects only if needed
5. concrete environment
6. lighting and local color
7. continuity requirement if something returns
8. exact German visible text OR `No visible text.`
9. only 1–3 scene-specific negatives if a known failure mode needs blocking

Global visual-world negatives stay near the top of the master prompt and are not repeated in every image block.

## 10. Prompt language

Use concrete nouns and active visible verbs.

Prefer:
- looks down
- steps back
- points
- turns away
- phone rests on shelf
- door blocks path
- two choice cards lie on table
- phrase fills speech bubble
- one option is removed

Avoid relying on:
- symbolizes
- represents
- communicates
- embodies
- feels enormous
- psychologically intense
- visualize the concept of

## 11. Prompt length and density

A normal final image prompt should usually be compact enough that every sentence changes the image.

Target: roughly 45–110 English words for a normal image, longer only when continuity or exact typography genuinely requires it.

Remove sentences that only repeat the global style or restate the psychology without adding visible information.

## 12. Sequence-level anti-repetition

Before Phase 2, inspect the whole sequence.

Rewrite when the plan has become a repetitive chain of full character scenes even though several beats could be carried better by objects, text, environments, comparisons or schemas.

For 10+ scene videos, a character-heavy plan of roughly three quarters or more full `CHARACTER_SCENE`s requires explicit `characterHeavyJustification`. This is not a quota; it is an anti-default safeguard.

## 13. Cover-specific direction

BILD 01 still produces exactly three separate cover candidates and then stops for user selection.

All three candidates must express the same approved visual thesis and exact cover text, but they may test meaningfully different framing/composition choices.

The cover may use people, objects or a strong mixed conflict. It is not a command that later scenes must also be character scenes.

## 14. Google Flow Agent role

The Flow Agent may execute production:
- read the full master prompt
- generate the three separate cover candidates
- wait for user selection
- rename the chosen cover to `01.png`
- generate later images in five-image batches
- QA/regenerate failures
- rename accepted images to `NN.png`
- keep all accepted images in `03-bilder/`

But the Flow Agent must NOT invent the missing visual concept for an underspecified beat.

**Production agent ≠ autonomous art director.**

## 15. Final prompt QA

Reject/rewrite a `BILD NN` prompt if:
- the main instruction is an abstract mental state rather than visible evidence
- a named psychological effect is literalized only because of its name
- a full character scene was chosen merely because the spoken line mentions a person
- a person is present only to hold/point at an object that could carry the frame itself
- multiple unrelated examples/actions are crammed into one image
- Flow must invent the key relation
- the environment is generic filler
- a symbolic glow/ray/icon replaces clearer evidence
- the prompt repeats the global style paragraph instead of directing the scene
- there is no clear dominant visual idea

## 16. Merksatz

**First choose the clearest evidence and representation. Then write the prompt. People are one tool, not the default.**
