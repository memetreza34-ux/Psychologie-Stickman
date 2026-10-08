# GOOGLE FLOW PROMPT ARCHITECTURE — THUMBNAIL_SEPARATE_FROM_SCENE01_V1

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

## Master prompt order

1. Topic, format, active illustration world/species and representation choices.
2. Motif progression, observable scenes, staging variety, mobile readability, zero accidental text, max 2 states/panels.
3. Independent `THUMBNAIL CANDIDATES` (3 separate 16:9 designs; exact short cover phrase). STOP only here.
4. Winner saved as 05-export/thumbnail.png, losers deleted; use winner for style reference.
5. BILD 01 through BILD NN are numbered REAL video scenes from narration, not thumbnails. Generate 01–05, 06–10 etc automatically, QA each batch without approval pause, regenerate failures only.
6. Final count/name/size/style/text check: 03-bilder/01.png … NN.png and a separate 05-export/thumbnail.png.

Video scenes need short concrete depiction prompts: camera and framing, actual observable event or object, dominant relation, environment/light, exact German text only if planned. Real humans MUST stay in the approved stickman species, not ordinary cartoon people. No default beige-slide aesthetic, no random labels, no storyboards, no 3–4-panel collages.
