# VISUAL SYSTEM — CINEMATIC ILLUSTRATED PSYCHOLOGY WORLD v1

**STATUS: ACTIVE CHANNEL SOURCE OF TRUTH**

Policy ID: `CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1`

This system fully replaces the former active Minimal Editorial Stickman v2 direction for NEW productions.

## 1. Core idea

**A consistent colorful 2D psychology film-world: stylized stickman-inspired characters, believable locations, cinematic framing, soft cel shading and mixed visual storytelling.**

The channel is not a whiteboard channel and not a normal-cartoon-human channel. It should feel like frames from the same modern 2D animated psychology film.

## 2. Character system

Characters are **stylized stickman-inspired figures**, not bare line stickmen.

Required:
- large simple round or slightly oval head
- minimal expressive face: simple eyes, eyebrows when useful, small mouth
- compact simplified torso with visible clothing
- very slim simplified arms and legs with slight illustrated width; not bare one-pixel lines and not realistic fleshy limbs
- simplified hands
- clear simplified shoes/feet
- readable pose and body language
- clothing, small hairstyle cue, glasses, bag, jacket, hoodie or role accessory may individualize a person
- different people may look different while remaining inside the same anatomy family

Avoid:
- pure black-line stick figures on empty white backgrounds
- conventional full cartoon humans
- realistic anatomy, muscles, detailed fingers or realistic faces
- chibi, anime, manga
- 3D/Pixar/CGI
- photorealistic people

## 3. World and environment

Locations should feel real enough to support the story:
- bedroom, apartment, café, train, supermarket, cinema, office, school, street, waiting room, restaurant, park and similar everyday places
- recognizable furniture, architecture and props
- small meaningful environmental details
- foreground, midground and background when useful
- natural perspective and spatial logic
- background may be simplified or softly subdued so it never competes with the main idea

The environment is allowed to be visually rich. It must not become random decoration.

## 4. Rendering and film feeling

Use:
- polished 2D animated-film illustration
- clean slightly organic dark outlines
- soft cel shading
- controlled texture
- believable shadows
- natural depth
- purposeful camera angle
- warm/cool light contrast when useful
- cinematic but still clearly illustrated lighting
- rich controlled colors

Never drift into:
- photorealism
- 3D rendering
- glossy CGI
- painterly concept art that no longer matches the channel
- flat corporate vector stock art
- whiteboard/doodle aesthetics

## 5. Color system

No forced monochrome channel palette.

Use believable scene colors with a controlled recurring channel character:
- deep navy / dark blue for night, depth and calm
- warm amber for lamps, safety and attention
- muted teal/blue for neutral focus
- coral/red for tension, warning or conflict
- natural local object colors

Rules:
- colorful, but not candy-colored
- warm/cool contrast may support emotion
- key object or character gets strongest contrast
- backgrounds may be quieter
- different locations may have different local colors while still sharing the same rendering and lighting language

## 6. Visual representation families

The same visual world may explain a beat in different ways.

### A — CHARACTER_SCENE
Default for relatable everyday psychology.
One or more stylized stickman characters acting inside a believable location.

### B — SCHEMA_EXPLAINER
A clean illustrated schema with arrows, short labels, icons, cards or pathways. A character is optional. It must look illustrated inside the same world, never like a corporate slide.

### C — OBJECT_METAPHOR
No character required. Use a symbolic object or environment to explain an invisible psychological mechanism: tangled knot, glowing phone, ticket, door, magnet, loop, scale, mirror, spotlight, etc.

### D — COMPARE_VISUAL
Two states or choices shown in one coherent frame or clean split composition: before/after, belief/evidence, stay/leave, thought/reality.

### E — TEXT_ILLUSTRATION
A short term or statement integrated into a strong illustration. Used sparingly for definitions, chapter-like moments or memorable concepts.

## 7. Target mix

For a typical psychology video, use variety without forcing exact math:
- ~55% CHARACTER_SCENE
- ~15% SCHEMA_EXPLAINER
- ~15% OBJECT_METAPHOR
- ~10% COMPARE_VISUAL
- ~5% TEXT_ILLUSTRATION

A strong video should not require a stickman in every frame.

## 8. One clear beat per frame

Every image still communicates one main thought.

Required:
- clear focal subject or visual relation
- scene matches the current spoken beat
- environmental details support the point
- no unrelated future information
- no visual clutter merely to look expensive

## 9. Character individuality and continuity

Same world does NOT mean same person.

Individualize scene-appropriate characters through:
- clothing color/style
- simple hair cue
- glasses
- bag/accessory
- height/proportion variation within the same simplified family
- posture and expression

When the same person continues across nearby scenes, preserve their clothing, head design, accessory and proportions.

## 10. Reference architecture

Permanent channel reference pack:
`assets/cinematic-psychology-world/`

Target references:
- `style-master.png`
- `character-sheet.png`
- `environment-sheet.png`
- `schema-example.png`
- `object-metaphor-example.png`
- `cover-reference.png`

Scene 01 is a video cover/first beat, not the global style source of truth.

## 11. Compact global prompt

`Create a cinematic 2D illustrated frame for a modern psychology YouTube channel. Keep one consistent visual world: stylized stickman-inspired characters with large simple round heads, minimal expressive faces, compact clothed torsos, very slim simplified limbs, simple hands and shoes; characters are clearly simplified but not bare line stickmen and not normal cartoon humans. Use colorful believable environments, clean slightly organic outlines, soft cel shading, natural depth, purposeful cinematic framing, controlled colors, warm/cool lighting and small meaningful details. When no character is needed, diagrams, text schemas, objects, comparisons and metaphors must use the exact same illustration, line, color, shading and lighting language. No photorealism, no 3D/Pixar, no anime, no corporate vector look, no whiteboard doodle style.`

## 12. Text inside the world

Normal character/object scenes should remain text-free unless text is necessary.

Planned text modes:
- cover title
- keyword
- schema title + up to three short labels
- comparison labels
- text-illustration phrase

All wording is exact German text from the scene plan. No random readable background text.

## 13. Cover rule

Cover uses the same world but stronger composition:
- one dominant emotional conflict or question
- stronger contrast
- clearer silhouette
- more deliberate lighting
- large safe title area
- still looks like the same illustrator/world as normal frames

Do not switch to a separate comic/poster/cartoon style just for the cover.

## 14. Hard fail

Regenerate if:
- figure becomes a bare line-stickman/whiteboard doodle
- figure becomes a normal full cartoon or realistic human
- 3D/CGI/Pixar/anime drift
- environment becomes photorealistic
- frame looks like corporate stock vector art
- schema looks like a PowerPoint instead of part of the illustrated world
- rendering/line language changes materially between scenes
- random readable text appears
- current speech beat is not visually clear

## 15. Priority

1. `rules/VISUAL_SYSTEM.md`
2. approved `assets/cinematic-psychology-world/` references
3. `rules/STICKMAN_DNA.md`
4. current Visual Beat
5. compatibility lock files
