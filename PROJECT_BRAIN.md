# PROJECT BRAIN

## Current direction

The production repo is for German psychology / human-behavior explainers.

Active world: **Cinematic Human Behavior World v2** (`CINEMATIC_HUMAN_BEHAVIOR_V2`).

The channel is allowed to range from ordinary cognitive effects to manipulation, power, status, money behavior, social pressure, deception, fear, trust, conflict and constructive solutions. The visual world must therefore be emotionally adaptive rather than permanently bright or permanently dark.

## Character target

Not bare stick figures and not normal cartoon humans.

Use `STYLIZED_STICKMAN_CAST_V2`:
- large simple round/oval head
- expressive minimal face
- compact clothed torso
- very slim shaped limbs with slight width
- simple hands/shoes
- individualized clothing/accessory/hair cue when useful
- strong readable posture and silhouette

Characters may look warm, neutral, vulnerable, anxious, exhausted, dominant, cold, manipulative, deceptive, intimidating, isolated or authoritative while keeping the same anatomy family.

## World target

Frames should feel like stills from the same polished cinematic 2D human-behavior film-world.

Locations may include normal everyday spaces and darker or status-heavy environments:
- homes, cafés, trains, shops, offices, schools, streets, parks
- negotiation rooms, corridors, stairwells, platforms, night streets, luxury/status environments, sparse rooms and institutional spaces

Dark scenes still need believable spatial logic and motivated light. Do not turn difficult topics into generic black horror backgrounds.

## Mood engine

Every scene plans:
- `moodMode`: `CLEAR`, `UNEASY`, `DARK`, `POWER`, `MONEY`, `ISOLATION`, or `HOPE`
- `moodIntensity`: `0–4`
- `powerDynamic`

Mood is communicated through light, framing, posture, negative space, saturation, temperature and environment.

## Mixed representations

Do not force a character into every frame.

Typical guidance:
- 45–60% character scenes
- 10–20% schemas
- 10–20% object metaphors
- 10–20% comparisons
- up to 10% text illustrations

The clearest representation for the spoken beat wins.

## Prompt architecture

Every Google Flow scene uses the exact same structure from `rules/FLOW_PROMPT_CONTRACT.md`.

This is not a style suggestion. It is a production contract:
- identical field order for every scene
- identical `PROMPT:` sub-block order
- `NONE` where a field does not apply
- exact German text only when planned
- `ZERO READABLE TEXT` otherwise

## Reference pack

Permanent path: `assets/cinematic-human-behavior-world/`.

The pack is multi-reference rather than one-image-dependent. It should cover neutral characters, emotional/dark roles, groups, clear/uneasy/dark/power lighting, day/night/dark environments, money/status, manipulation, schemas, metaphors and light/dark covers.

Scene 01 remains cover + first beat and is NOT the global style master.

## Production priority

Optimize for:
1. current-beat clarity
2. world consistency
3. psychological mood accuracy
4. readable body language and power relation
5. strong environment storytelling
6. representation variety
7. fixed prompt structure
8. clean exact Flow text when planned

## Current migration rule

Historical produced videos may remain legacy artifacts.

New templates, rules, QA and future projects use only:
- `CINEMATIC_HUMAN_BEHAVIOR_V2`
- `STYLIZED_STICKMAN_CAST_V2`
- `ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`
- `FLOW_SCENE_PROMPT_CONTRACT_V1`
