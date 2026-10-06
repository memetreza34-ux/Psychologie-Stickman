# YOUTUBE LONGFORM SCRIPT QUALITY — STORY / RETENTION HARD LOCK

**STATUS: BINDING FOR NEW LONGFORM YOUTUBE PROJECTS**

Policy ID: `LONGFORM_STORY_RETENTION_V1`

Applies to:
`productionMode: "LONGFORM_STANDARD_V1"`

Default target:
- 6–7 minutes
- roughly 850–1100 spoken words
- German psychology / human-behavior explainers

## 1. Goal

Research depth stays high, but the voice-over must feel like a compelling YouTube story, not a school report or bibliography.

Core flow:

```text
HOOK / CONFLICT
→ SIMPLE EXPLANATION
→ MAIN STORY / STRONG EXAMPLE
→ SELECTED RESEARCH AS EVIDENCE
→ APPLICATION / CONSEQUENCE
→ NUANCE
→ CALLBACK / PAYOFF
→ SHORT STRONG ENDING
```

Research serves the story. The story does not exist to list research.

## 2. Narrative spine — HARD

Every longform needs one concrete opening anchor: situation, conflict, decision, mistake, question or object.

Requirements:
- introduced in the opening
- understandable without prior knowledge
- useful for the core mechanism
- returns in the SPOKEN SCRIPT in the second half/final third
- final callback changes or deepens how the opening is understood

A visual-only callback is not enough.

## 3. Research density — HARD REVIEW

Prefer:
- "In einem klassischen Experiment ..."
- "Eine spätere Studie zeigte ..."
- only name researchers when the name genuinely adds value

Defaults:
- maximum 6 individual researcher names spoken in a 6–7 minute video
- maximum 4 explicit four-digit year mentions
- maximum 2 named research blocks directly back-to-back
- after a research block, translate the result into plain everyday language
- detailed citations/sources belong in the YouTube description / `youtube-upload.txt`

Do NOT:
- stack author names + year + study + another author + another year repeatedly
- read the source list aloud
- keep names that add no viewer value

## 4. Examples — FEWER, STRONGER

Use examples as mini-stories, not as a rapid list.

Requirements:
- at least 2 substantial examples/experiments that are developed enough to be memorable
- no more than 3 short micro-examples in a row
- after a run of short examples: synthesize, deepen one, or return to the narrative anchor
- avoid "office → restaurant → school → interview → social media" as a flat checklist unless some are cut or grouped around one stronger idea

## 5. Midpoint retention — HARD

The middle of a 6–7 minute video needs a re-engagement beat.

Examples:
- "Aber genau hier wird es interessant ..."
- a reversal
- a surprising limitation
- a return to the opening situation with new information
- a stronger experiment
- a concrete question that changes the viewer's interpretation

It must add new tension/information, not merely announce the next chapter.

## 6. Structure

The internal plan must explicitly cover:
- HOOK
- EINLEITUNG / simple concept explanation
- HAUPTTEIL / story + evidence + mechanism + application
- SCHLUSS / payoff + practical takeaway + final line

These are planning sections; they do not need to be spoken as headings.

## 7. Ending

The conclusion should:
1. pay off or reframe the opening
2. give one useful takeaway/question
3. end on the strongest concise thought

Do not add another paragraph after the strongest final line.

## 8. Required internal file

Every new longform uses:

`99-intern/script-plan.json`

Required policy:
`LONGFORM_STORY_RETENTION_V1`

The file records:
- structure plan
- exact opening anchor phrase
- exact spoken callback phrase
- exact midpoint re-engagement phrase
- spoken researcher-name list
- research density QA
- strong example list
- micro-example sequence QA
- practical takeaway
- exact final line

## 9. Automatic QA

Run:
`node scripts/check-longform-script-quality.mjs`

HARD FAIL when an active new longform:
- has no approved script plan
- misses the narrative anchor/callback
- callback is only visual and not found in narration
- has no midpoint re-engagement phrase in the script
- exceeds 6 listed spoken researcher names
- exceeds 4 explicit year mentions
- records more than 2 consecutive named research blocks
- records more than 3 consecutive micro-examples
- has fewer than 2 substantial examples/experiments
- has no practical takeaway or final line
- does not actually end on the approved final line
- falls outside the normal 850–1100 word band without explicit `wordCountJustification`

## 10. Legacy

Projects produced before this policy may be marked:
`LEGACY_PRE_LONGFORM_STORY_RETENTION_V1`

They are not retroactively rewritten unless the user requests it.

## 11. Core sentence

**Research-backed, story-first: fewer names, fewer shallow examples, stronger anchor, stronger callback, stronger ending.**
