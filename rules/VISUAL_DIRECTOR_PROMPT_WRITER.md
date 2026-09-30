# VISUAL DIRECTOR + FLOW PROMPT WRITER — OBSERVABLE SCENE FIRST V1

**STATUS: BINDING FOR NEW YOUTUBE PROJECTS**

Policy ID: `OBSERVABLE_SCENE_FIRST_V1`

This rule controls the creative step between the spoken script and the final Google-Flow image prompt.

It does NOT change the folder structure, the single-master-file rule, the three-cover gate or the five-image batch workflow.

## 1. Core principle

**Do not ask Google Flow to invent how an abstract psychological idea should look.**

Before a Flow prompt is written, the Visual Director must translate the spoken beat into something directly observable:

```text
spoken meaning
→ what the viewer must understand
→ concrete visible evidence
→ one clear composition
→ final image prompt
```

The final prompt describes what can actually be drawn: people, posture, gaze, distance, action, objects, environment, camera, light, color and exact planned text.

## 2. Observable-evidence test — HARD LOCK

For every beat, answer internally:

1. What should the viewer understand from this beat?
2. What could a camera or illustrator literally see that proves this idea?
3. What is the single dominant relationship/action in the frame?
4. Which details are essential and which are decoration?
5. Can the image be understood without Flow having to interpret a psychological term?

If the answer to question 2 is vague, the visual idea is not ready.

Weak:
- `show self-consciousness`
- `visualize social pressure`
- `make attention feel huge`
- `show the psychology of conformity`

Strong:
- `A looks down at a small stain while everyone else continues talking, drinking or checking phones.`
- `Four people point to the same choice while one person hesitates and keeps their hand lowered.`
- `A manager remains standing while the employee sits farther back and avoids eye contact.`

## 3. Do not literalize effect names — HARD LOCK

A psychological term containing a physical object or metaphor must NOT automatically become that literal object in the image.

Examples:
- Spotlight-Effekt ≠ theatrical spotlight beam
- Ankereffekt ≠ ship anchor
- Halo-Effekt ≠ glowing halo
- Framing-Effekt ≠ picture frame
- Echo Chamber ≠ literal echo room
- Bandwagon Effect ≠ wagon

A literal metaphor is allowed only when a human art director deliberately chooses it because it explains the current beat more clearly than a concrete real-life situation.

The effect name itself is never sufficient justification.

## 4. Concrete behavior before symbolic spectacle

For human-behavior beats prefer, in this order:

1. observable human action / reaction / relationship
2. concrete object or environment relation
3. direct before/after or comparison
4. simple mechanism/schema when structure is genuinely needed
5. symbolic metaphor only when the previous options are weaker

Do not use glowing cones, oversized symbols, floating icons, surreal rays, abstract energy fields or theatrical visual effects merely to make an invisible mental state visible.

## 5. One visible idea per image

One scene/image should normally contain:
- one main action or relation
- one dominant focal subject
- at most a few supporting elements

If a beat asks one image to show several independent examples, actions or mini-scenes, split the beat instead of forcing a montage.

A montage/split/contrast is allowed only when all parts are required to explain ONE inseparable comparison or mechanism.

Do not use a montage just to create variety.

## 6. Representation selection is semantic, not quota-driven

Allowed representations remain:
- `CHARACTER_SCENE`
- `SCHEMA_EXPLAINER`
- `OBJECT_METAPHOR`
- `COMPARE_VISUAL`
- `TEXT_ILLUSTRATION`
- environment/object-only illustration

The percentage ranges in the visual system are guidance only.

Never force:
- a montage because the video has not used one yet
- a group scene because a quota expects one
- a split screen for artificial variety
- a character because the channel uses Stickmen
- a schema because the beat contains an abstract noun

Variation must emerge from the content.

## 7. Human emotion must be visible through behavior

Do not stop at emotional adjectives such as anxious, dominant, ashamed, skeptical or relieved.

Translate emotion into visible cues, for example:
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

The prompt may include the emotion word as secondary guidance, but the visible cues are mandatory when the emotion matters.

## 8. Environment must do useful work

A location is not filler.

Use a real environment when it clarifies:
- who is present
- what they are doing
- what competes for attention
- hierarchy/status
- privacy/public exposure
- choice/decision context

Use concrete environmental actions and props instead of generic `rich cinematic environment` wording.

Example:

Weak:
`rich modern café with psychological tension`

Strong:
`warm wood tables, daylight windows, two guests talking, one person checking a phone, cups and a coat on a chair; nobody is staring at A.`

## 9. Prompt Writer formula

After the visual idea passes the Observable-evidence test, write the final English `BILD NN` prompt in this order when relevant:

1. camera/framing
2. dominant subject(s)
3. exact visible action/relation
4. behavior of other people/objects
5. concrete environment and useful props
6. lighting and local color
7. continuity requirement if something returns
8. exact German visible text OR `No visible text.`
9. only 1–3 scene-specific negative instructions when a known failure mode needs blocking

Global visual-world anatomy/style negatives stay near the top of the master prompt and are not repeated in every image block.

## 10. Prompt language

Use concrete nouns and active visible verbs.

Prefer:
- looks down
- steps back
- points
- turns away
- continues talking
- checks a phone
- holds the price tag
- stands closer
- keeps distance
- sits alone
- compares two objects

Avoid relying on:
- symbolizes
- represents
- communicates
- embodies
- feels enormous
- psychologically intense
- visualize the concept of
- make the viewer understand that

Those may appear in internal planning, not as the main instructions Flow must interpret.

## 11. Prompt length and density

A normal final image prompt should usually be compact enough that every sentence changes the image.

Target: roughly 45–110 English words for a normal image, longer only when continuity or exact typography genuinely requires it.

Remove sentences that only repeat the global style or restate the psychology without adding visible information.

## 12. Cover-specific direction

BILD 01 still produces exactly three separate cover candidates and then stops for user selection.

All three candidates must express the same approved visual thesis and exact cover text, but they may test meaningfully different framing/composition choices.

Do not create three nearly identical candidates by changing only tiny pose details.

The cover should sell a concrete situation/conflict first; avoid abstract symbolic spectacle unless it is deliberately approved.

## 13. Google Flow Agent role

The Flow Agent may execute production:
- read the full master prompt
- generate the three separate cover candidates
- wait for user selection
- rename the chosen cover to `01.png`
- generate later images in five-image batches
- QA/regenerate failures
- rename accepted images to `NN.png`
- keep all accepted images in `03-bilder/`

But the Flow Agent must NOT be asked to invent the missing visual concept for an underspecified beat.

**Production agent ≠ autonomous art director.**

The repo must decide the concrete visible scene before sending the image prompt.

## 14. Final prompt QA

Reject/rewrite a `BILD NN` prompt if:
- the main instruction is an abstract mental state rather than visible evidence
- a named psychological effect is literalized only because of its name
- multiple unrelated examples/actions are crammed into one image
- Flow must invent the key relationship or behavior
- the environment is generic filler
- a symbolic glow/ray/icon replaces a clearer real-life action
- composition/social density is present only to satisfy a quota
- the prompt repeats the global style paragraph instead of directing the scene
- there is no clear dominant visual idea

## 15. Merksatz

**Do not prompt the psychology. Prompt the evidence of the psychology.**
