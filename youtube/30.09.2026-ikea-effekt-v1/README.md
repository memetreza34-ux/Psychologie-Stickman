# IKEA-Effekt — Testvideo v1

## Status

READY_FOR_GOOGLE_FLOW_COVER_TEST

## Ziel

Erster neuer Test nach Einführung von:
- `OBSERVABLE_SCENE_FIRST_V1`
- `NATURAL_FLOW_MASTER_V2`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`

Der Test soll insbesondere prüfen, ob Google Flow mit konkreten beobachtbaren Handlungen bessere und weniger künstliche Bilder erzeugt als mit abstrakten Psychologie-Metaphern.

## Thema

Warum kann ein Gegenstand subjektiv wertvoller wirken, nachdem man selbst Arbeit in seine Herstellung gesteckt hat?

Kernbegriff: IKEA-Effekt.

## Dateien

- `01-script/script.txt` — finales Testskript
- `02-google-flow/google-flow-prompt.txt` — einzige Flow-Masterdatei mit allen 16 Bildern
- `99-intern/phase1-scenes.json` — semantische Visual-Planung mit Observable Evidence
- `99-intern/sources.md` — Quellen und Claim-Check

## Flow-Testablauf

1. Die komplette `02-google-flow/google-flow-prompt.txt` in den Flow-Agent geben.
2. Flow darf zunächst NUR `BILD 01` erzeugen.
3. Genau 3 getrennte 16:9-Cover-Kandidaten.
4. Danach STOP für Nutzerwahl.
5. Gewähltes Cover → `01.png` → `03-bilder/`.
6. Danach exakt:
   - Batch 1: BILD 02–06
   - Batch 2: BILD 07–11
   - Batch 3: BILD 12–16
7. Jedes Bild bleibt eine eigene 16:9-Datei und wird sofort `NN.png` benannt.
8. Alle akzeptierten Bilder gehören zusammen in den flachen Ordner `03-bilder/`.

## Testkriterien

PASS wenn:
- keine Storyboard-/Kontaktbogen-Ausgabe entsteht
- Figuren mature strict-stickman bleiben
- kein chibi-/normal-cartoon-human Drift entsteht
- die Wohnung, Character A und die zwei Hocker bei Wiederkehr konsistent bleiben
- keine abstrakten Glow-/Halo-/Value-Meter-Effekte erfunden werden
- Szenen über sichtbare Handlung verständlich sind
- Forschungsbilder nicht wie PowerPoint/Corporate Vector wirken
- nur das Cover sichtbaren Text enthält
- spätere Bilder als echte 5er-Batches erzeugt werden

## Noch nicht vorhanden

- keine finalen Bilder
- keine Voice-Datei
- kein Render
- kein `final.mp4`
- kein `thumbnail.png`
- kein fertiges `youtube-upload.txt`

Diese Dateien entstehen erst in den späteren Produktionsphasen.
