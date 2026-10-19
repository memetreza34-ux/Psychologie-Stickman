# GOOGLE FLOW OUTPUT — THUMBNAIL_SEPARATE_FROM_SCENE01_V1

## YouTube handoff clarification — 2026-10-19

For new YouTube productions, Codex supplies one complete English Google Flow prompt. Google Flow itself generates the character references, three covers and all scene images. No externally generated Codex reference image is required. Visible image text and narration remain German.

Initial output is limited to individually designed, script-specific character references and exactly three separate 16:9 cover candidates. Keep only the stickman species and illustrator language fixed across videos; do not reuse a permanent character, outfit or identity. Within this video, use the same character references for matching roles in all covers and relevant scenes. Character references are separate assets, never video scenes. The cover stage is the only approval pause and remains open until the user explicitly finishes/approves the final cover AND authorizes scene generation. Selection alone is insufficient.

After explicit final cover approval and scene-start authorization, the winner is the separate thumbnail and only the rejected covers are deleted. Attach/select the approved cover as style reference for EVERY subsequent image, including diagrams and object-only scenes. Add character references only for identifiable recurring people actually visible in that scene. Generate actual scenes in five-image batches, immediately QA and rename accepted files `01.png` through `NN.png`; regenerate only failed/missing files and continue without asking. Final remainder may contain 1–4 scenes.

After full file AND visual QA, collect the final thumbnail, character references and all numbered scenes into one flat download folder `google-flow/` and provide `google-flow.zip` IF the Flow interface can actually create/export that folder and archive. Inspect the archive contents before claiming ZIP delivery. If export/naming/ZIP is unavailable, state the precise limitation and provide the separate images; never claim an archive exists when it does not.

The download package is an exchange format. On local import, numbered scenes go to `03-bilder/`, the winner to `05-export/thumbnail.png`, and character references to `99-intern/reference-notes/`. Do not put reference images or thumbnails among the numbered scenes. Existing local renderer paths remain unchanged; historical projects are not retroactively regenerated.

## Independent thumbnail and actual scene 01 — THUMBNAIL_SEPARATE_FROM_SCENE01_V1 (binding override)

For every NEW YouTube video, and the opted-in Planungsfehlschluss project:
- Before any video scene, generate script-specific character references and 3 separate 16:9 thumbnail candidates inside Google Flow. The ONLY approval pause lasts until the user finishes/approves the final cover and authorizes starting scenes; selection alone does not release scenes.
- Winner goes to `05-export/thumbnail.png` (NOT `01.png`). Delete the other two rejected candidates only AFTER explicit final cover approval and scene-start authorization.
- The thumbnail is never part of the rendered video or the video-scene numbering; use it only as an illustrator/style reference.
- BILD 01 is the FIRST NORMAL VIDEO SHOT aligned with the first spoken words: no cover text, no thumbnail framing, no forced title.
- Automatically generate BILD 01–05, 06–10 and subsequent FIVE image batches; last remainder 1–4. No further questions or pauses after explicit final cover approval and scene-start authorization.
- After every batch, regenerate failed/missing scenes only, number `01.png` … `NN.png`, keep all scene assets flat in `03-bilder/`.
- Final QA requires a separate `05-export/thumbnail.png`, ALL scene images 01–NN, exact filenames/count, 16:9, no leftover candidates or subfolders, visual-world and planned-text conformity. Incomplete sets are never marked DONE.
- Historical projects not opting in remain unchanged. This new rule OVERRIDES old "01.png is the cover" language wherever it conflicts for opted-in/new projects.

## Continuity and quality

One master prompt at 02-google-flow/google-flow-prompt.txt. After explicit final cover approval and a scene-start instruction generate all BILD scenes in 5-image operations starting with 01–05. Preserve PSYCHOLOGY_STICKMAN_WORLD_V1; people optional, identical species. Use approved thumbnail as style reference only. No contact sheets, collages, automatic video, batch folders, extra versions, unintended readable text, tiny labels or mixed anatomy. Every image is one separate 16:9 PNG, immediate NN.png rename, complete exact 01–NN validation. The only human STOP is the cover stage, until explicit final approval and a scene-start instruction.

Only after explicit final cover approval and scene-start authorization, when local files are available, use `npm run flow:cover -- <project> <1|2|3>` to move selected thumbnail from 03-bilder/cover-candidate-XX.png to 05-export/thumbnail.png and delete the other two. Then use `npm run flow:verify -- <project>` to check all video frames and thumbnail separately.
