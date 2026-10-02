# Psychologische Reaktanz — Video v1

## Status

READY_FOR_GOOGLE_FLOW_COVER_TEST

## Thema

Warum Verbote, Druck und stark kontrollierende Botschaften Widerstand auslösen können.

Kernbegriff: **psychologische Reaktanz**.

Arbeitstitel:

**Warum Verbote uns manchmal reizen – Psychologische Reaktanz erklärt**

Cover-Headline:

**WARUM REIZEN VERBOTE?**

## Ziel

Erstes neues Video mit der aktiven Bildwelt `PSYCHOLOGY_STICKMAN_WORLD_V1`.

Das Video soll bewusst zeigen, dass die neue Welt sowohl helle Alltags-/Erklärungsszenen als auch dunklere, emotional angespannte Psychologie-Szenen tragen kann, ohne dass die Stickman-Spezies oder der Illustratorstil wechseln.

## Aktive Regeln

- `PSYCHOLOGY_STICKMAN_WORLD_V1`
- `OBSERVABLE_SCENE_FIRST_V1`
- `HOOK_FIRST_EXPLAIN_EARLY_V1`
- `REPRESENTATION_VARIETY_V1`
- `NATURAL_FLOW_MASTER_V2`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`

## Dateien

- `01-script/script.txt` — finales deutsches Voice-over-Script mit 16 Beats
- `02-google-flow/google-flow-prompt.txt` — einzige Flow-Masterdatei mit allen 16 Bildern
- `99-intern/phase1-scenes.json` — Observable-Evidence-/Visual-Beat-Planung
- `99-intern/sources.md` — Quellen und Claim-Check

## Hook-Check

- Szene 01: direkte WHY_DOES-Hook
- Szene 02: Begriff `psychologische Reaktanz`
- Szene 03: einfache Definition
- Szene 04: erstes konkretes Alltagsbeispiel

Damit liegt der Kernbegriff vor Szene 03 und das erste Alltagsbeispiel vor Szene 05.

## Flow-Ablauf

1. Die komplette `02-google-flow/google-flow-prompt.txt` in einen neuen Google-Flow-Agent-Chat geben.
2. Zunächst ausschließlich `BILD 01` erzeugen.
3. Genau **3 getrennte 16:9 Cover-Kandidaten**.
4. Danach STOP für Nutzerwahl.
5. Gewinner → `01.png` → `03-bilder/`.
6. Gewinner `01.png` als Episoden-Style-Referenz verwenden.
7. Danach exakt:
   - BILD 02–06
   - BILD 07–11
   - BILD 12–16
8. Jeder BILD-Index bleibt eine separate 16:9-Datei.
9. Akzeptierte Bilder sofort `NN.png` benennen und direkt in `03-bilder/` halten.
10. Nur fehlgeschlagene Bilder regenerieren.

## Bildwelt-Test

PASS, wenn:
- alle Menschen sofort zur selben hochwertigen Stickman-Spezies gehören
- große helle Rund-/Ovalköpfe, kleine schwarze Augen, schmale bekleidete Körper und sehr dünne dunkle Gliedmaßen stabil bleiben
- Kleidung, Haare und Rollen passend zur jeweiligen Szene variieren
- helle, neutrale, historische und dunkle Szenen trotzdem vom selben Illustrator wirken
- die Figuren weder zu normalen Cartoon-Menschen noch zu nackten Whiteboard-Strichmännchen driften
- Emotion über Blick, Haltung, Hände, Abstand und Blocking sichtbar wird
- Räume und Gegenstände dieselbe 2D-Zeichensprache wie die Figuren verwenden

## Inhaltliche Leitplanken

Das Script sagt bewusst nicht, dass Verbote Menschen immer zum Gegenteil bringen.

Verwendete Formulierungen bleiben vorsichtig: `kann`, `können`, `manchmal`, `nicht jede Trotzreaktion`.

Quellenbasis:
- Steindl et al. (2015), DOI `10.1027/2151-2604/a000222`
- Rosenberg & Siegel (2018), DOI `10.1037/mot0000091`
- Reynolds-Tylus (2019), DOI `10.3389/fcomm.2019.00056`

## Noch nicht vorhanden

- keine finalen Flow-Bilder
- keine Voice-Datei
- kein Render
- kein `final.mp4`
- kein `thumbnail.png`
- kein fertiges `youtube-upload.txt`

Diese Dateien entstehen erst in den späteren Produktionsphasen.
