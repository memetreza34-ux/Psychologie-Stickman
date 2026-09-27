# VISUAL QUALITY LOCK — v2 COMPATIBILITY FILE

**STATUS: ACTIVE COMPATIBILITY LOCK**

The former `PREMIUM_EDITORIAL_CINEMATIC_V1` direction is retired for new productions.
The active visual system is `MINIMAL_EDITORIAL_STICKMAN_V2` in `rules/VISUAL_SYSTEM.md`.

This file remains only because existing tools and documents reference its path.

## What quality means in v2

Quality is created by:
- immediate readability
- strong pose and silhouette
- clean spacing
- one visual thought
- restrained color
- sparse meaningful props
- a precise psychology metaphor when needed
- consistent anatomy and line language

Quality is NOT created by:
- cinematic lighting
- rich environments
- detailed material rendering
- complex perspective
- elaborate fashion
- foreground/midground/background depth for its own sake
- detailed cel shading

## Color

Use the fixed channel palette from `rules/VISUAL_SYSTEM.md`.
Do not create a new project palette for every video.

Normal frame:
- warm off-white + charcoal
- usually one dominant accent
- second accent only for a necessary comparison/cause-effect distinction

## Environment

Use the fewest visual cues that still make the place and action obvious.
Typical target: 1–5 relevant props.

A café does not need a rendered café interior.
A cinema does not need full cinema architecture.
An office does not need decorative office detail.

## Prompt rule

New Flow prompts use:
- `VISUAL SYSTEM: MINIMAL_EDITORIAL_STICKMAN_V2`
- one short global v2 style block
- scene prompts focused on content

Do not require the old blocks:
- `PREMIUM VISUAL QUALITY — HARD LOCK`
- `PREMIUM CHARACTER DESIGN — HARD LOCK`
- `COLOR STORY — HARD LOCK`

## QA

Regenerate when:
- the environment competes with the idea
- the figure becomes a conventional cartoon human
- realism/rendering complexity increases
- multiple colors compete without explanatory need
- the frame cannot be understood quickly
- decorative detail is present without explanatory value

## Priority

`rules/VISUAL_SYSTEM.md` is authoritative.
