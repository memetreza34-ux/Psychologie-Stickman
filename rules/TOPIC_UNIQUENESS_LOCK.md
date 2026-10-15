## Wochenordnung — gültig ab 15.10.2026

YouTube-Videos liegen unter `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/<TT.MM.JJJJ-thema>/` (ISO-Woche Montag bis Sonntag). Vollständige Dateilinks/Projektpfade verwenden diesen Präfix. Siehe `rules/YOUTUBE_WEEK_FOLDERS.md`.

# TOPIC UNIQUENESS LOCK — ONE TOPIC, ONE YOUTUBE VIDEO

**STATUS: BINDING HARD LOCK**

Policy ID: `TOPIC_UNIQUENESS_V1`

## Core rule

The channel may create **only one YouTube video per canonical topic / core psychological mechanism**.

If a topic has already been used, do **not** create another YouTube project for the same topic.

A different:
- title
- hook
- example
- visual angle
- thumbnail
- wording
- language
- version number (`v2`, `v3`)
- `Part 2`

still counts as the **same topic** when the core psychological mechanism is the same.

## Source of truth

Before choosing or creating a new YouTube topic, read:

1. `TOPIC_REGISTRY.json`
2. the dated projects inside ISO-week folders `youtube/<WOCHE>/<PROJEKT>/`
3. this rule

`TOPIC_REGISTRY.json` is the canonical used-topic register.

## Preflight — HARD GATE

Before creating any new video project:

1. Define the proposed **core mechanism** in one short phrase.
2. Normalize obvious German/English synonyms and alternative spellings.
3. Compare the proposal against every `canonicalTopic` and every `alias` in `TOPIC_REGISTRY.json`.
4. Also inspect existing `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/TT.MM.JJJJ-*` project folders for older/historical projects.
5. If the same core topic/mechanism already exists: **STOP and choose a different topic.**
6. Only after uniqueness is confirmed may sources, script, visual beats or a new project folder be created.

## Semantic duplicate rule

Do not evade the lock by renaming the same mechanism.

Examples that count as the same topic:
- `Ankereffekt` = `Anchoring` = `Anchoring Bias`
- `Bestätigungsfehler` = `Confirmation Bias`
- `Spotlight-Effekt` = `Spotlight Effect`
- `Aufschieben` = `Prokrastination`

Related but genuinely different mechanisms may still be separate topics if their core question and evidence are distinct.

## Registry update

When a genuinely new topic is approved and a new YouTube project is created:

- add exactly one new canonical entry to `TOPIC_REGISTRY.json`
- include useful aliases/synonyms
- include the exact new project path
- use status `USED`
- update the registry in the **same change/commit** as the new project

A new project without a registry entry is a QA failure.

## Existing historical duplicates

Duplicates that already existed before this lock are not deleted automatically.

They are recorded as `LEGACY_DUPLICATE_LOCKED` in the registry.

That status means:
- keep the historical projects
- do not create another project for that topic
- do not treat the old duplication as permission for future duplication

## Updating an existing topic

If the user wants improvements to a topic already used, improve the existing project rather than creating a second topic project, unless the user explicitly changes this global rule.

## QA fail

Fail topic planning when:
- the proposed topic already exists in the registry
- an obvious synonym/translation of the same mechanism already exists
- a new `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/TT.MM.JJJJ-*` project is not registered
- an existing `USED` topic has more than one project
- another project is added to a `LEGACY_DUPLICATE_LOCKED` topic
- an agent chooses a topic before checking the register

## Merksatz

**One canonical psychology topic = one YouTube video project. Check the register before creating anything.**
