# GOOGLE FLOW OUTPUT — THUMBNAIL_SEPARATE_FROM_SCENE01_V1

## Independent thumbnail and actual scene 01 — THUMBNAIL_SEPARATE_FROM_SCENE01_V1 (binding override)

For every NEW YouTube video, and the opted-in Planungsfehlschluss project:
- Make 3 separate 16:9 thumbnail candidates FIRST. This is the ONLY approval pause.
- Winner goes to `05-export/thumbnail.png` (NOT `01.png`). Delete the other two rejected candidates only AFTER selection.
- The thumbnail is never part of the rendered video or the video-scene numbering; use it only as an illustrator/style reference.
- BILD 01 is the FIRST NORMAL VIDEO SHOT aligned with the first spoken words: no cover text, no thumbnail framing, no forced title.
- Automatically generate BILD 01–05, 06–10 and subsequent FIVE image batches; last remainder 1–4. No further questions or pauses after thumbnail selection.
- After every batch, regenerate failed/missing scenes only, number `01.png` … `NN.png`, keep all scene assets flat in `03-bilder/`.
- Final QA requires a separate `05-export/thumbnail.png`, ALL scene images 01–NN, exact filenames/count, 16:9, no leftover candidates or subfolders, visual-world and planned-text conformity. Incomplete sets are never marked DONE.
- Historical projects not opting in remain unchanged. This new rule OVERRIDES old "01.png is the cover" language wherever it conflicts for opted-in/new projects.

## Continuity and quality

One master prompt at 02-google-flow/google-flow-prompt.txt. After thumbnail approval generate all BILD scenes in 5-image operations starting with 01–05. Preserve PSYCHOLOGY_STICKMAN_WORLD_V1; people optional, identical species. Use approved thumbnail as style reference only. No contact sheets, collages, automatic video, batch folders, extra versions, unintended readable text, tiny labels or mixed anatomy. Every image is one separate 16:9 PNG, immediate NN.png rename, complete exact 01–NN validation. The only human STOP is thumbnail selection.

When local files are available, use `npm run flow:cover -- <project> <1|2|3>` to move selected thumbnail from 03-bilder/cover-candidate-XX.png to 05-export/thumbnail.png and delete the other two. Then use `npm run flow:verify -- <project>` to check all video frames and thumbnail separately.
