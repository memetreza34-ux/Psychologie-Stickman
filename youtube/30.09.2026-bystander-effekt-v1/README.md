# Bystander-Effekt — Testvideo v1

## Status

READY_FOR_GOOGLE_FLOW_COVER_TEST

## Ziel

Erster neuer Test nach Verschärfung der Figuren-Anatomie mit:
- `GEOMETRIC_STICKMAN_ANATOMY_V1`
- `OBSERVABLE_SCENE_FIRST_V1`
- `NATURAL_FLOW_MASTER_V2`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`

Der Test soll insbesondere prüfen, ob Google Flow nun echte hochwertige Stickman-Figuren statt dünner normaler Cartoon-Menschen erzeugt — auch bei Gruppen und Hintergrundfiguren.

## Thema

Warum kann die Anwesenheit anderer Zuschauer Hilfe verzögern oder unwahrscheinlicher machen?

Kernbegriff: Bystander-Effekt.

## Dateien

- `01-script/script.txt` — finales Testskript mit 16 Beats
- `02-google-flow/google-flow-prompt.txt` — einzige Flow-Masterdatei mit allen 16 Bildern
- `99-intern/phase1-scenes.json` — semantische Observable-Evidence-Planung
- `99-intern/sources.md` — Quellen und Claim-Check

## Flow-Testablauf

1. Die komplette `02-google-flow/google-flow-prompt.txt` in einen neuen Flow-Agent-Chat geben.
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

## Anatomie-Test — wichtigste PASS-Bedingung

Jede Person muss sofort wie eine echte illustrierte Stickman-Figur wirken:
- einfacher Kreis-/Ovalkopf
- winzige Gesichtszüge
- kein Hals
- winziger schmaler Torso deutlich unter halber Kopfbreite
- ultra-dünne linienartige Arme und Beine
- keine Ärmel-/Hosenbein-Körpermasse
- keine Brust, Taille, Hüften, Oberschenkel oder Waden
- Hintergrundfiguren benutzen dieselbe Geometrie

**Wenn eine Figur auch als „dünner Cartoon-Mensch“ durchgehen könnte, ist das Bild FAIL.**

## Weitere Testkriterien

PASS wenn:
- keine Storyboard-/Kontaktbogen-Ausgabe entsteht
- alle drei Cover getrennte Dateien sind
- Cover-Kompositionen wirklich unterschiedlich sind
- keine Chibi-/Mascot-Figuren entstehen
- Hintergrundmenschen nicht zu normalen Cartoon-Silhouetten werden
- Bahnhof und wiederkehrende Figuren konsistent bleiben
- Szenen durch konkrete Handlung/Blickrichtung/Abstand verständlich sind
- keine abstrakten Pfeile, Halos, Glow-Effekte oder Psychologie-Symbole erfunden werden
- nur BILD 01 sichtbaren Text enthält
- spätere Bilder als echte 5er-Batches erzeugt werden

## Noch nicht vorhanden

- keine finalen Bilder
- keine Voice-Datei
- kein Render
- kein `final.mp4`
- kein `thumbnail.png`
- kein fertiges `youtube-upload.txt`

Diese Dateien entstehen erst in späteren Produktionsphasen.
