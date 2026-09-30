# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Quellen

Danach mindestens lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/VISUAL_SYSTEM.md`
4. `rules/visual-system.json`
5. `rules/STICKMAN_DNA.md`
6. `rules/PREMIUM_VISUAL_LOCK.md`
7. `rules/FLOW_OUTPUT_MODE.md`
8. `rules/VISUAL_DIRECTOR_PROMPT_WRITER.md`
9. `rules/FLOW_PROMPT_ARCHITECTURE.md`
10. `rules/REPRESENTATION_VARIETY_LOCK.md`
11. `rules/YOUTUBE_STYLE_LOCK.md`
12. `rules/IMAGE_REFERENCE_LOCK.md`
13. relevante Script-/Format-/Exportregeln

## Kanal

Nische: **Psychologie & menschliches Verhalten**.

## Bildwelt — HARD LOCK

Aktiv: `CINEMATIC_HUMAN_BEHAVIOR_V2` + `STYLIZED_STICKMAN_CAST_V2`.

Ziel:
- polierte handgezeichnete 2D-Stickman-Illustration
- einfache runde/ovale Köpfe
- minimale ausdrucksstarke Gesichter
- schlanke vereinfachte Körper
- dünne, klar gezeichnete Arme und Beine
- einfache Kleidung, Hände und Schuhe
- saubere dunkle Konturen
- flache kontrollierte Farben
- weiche grafische/Cel-Schattierung
- Figuren, Objekte und Umgebungen im selben Illustrationsstil

Nicht mathematisch überdefinieren. Keine langen Anatomie-Negativlisten in Flow-Prompts.

Minimaler Hard Fail:
- photorealistische/realistische Menschen
- 3D/Pixar/Anime
- cute/chibi/mascot
- nackte Whiteboard-/Klassenzimmer-Strichmännchen
- realistischer Raum + Doodle-Figur als Mischstil

## Jedes Thema bekommt eine eigene lokale Welt

Der Zeichenstil bleibt gleich, aber Stimmung/Farbwelt dürfen wechseln:
- hell/offen
- kühl/unsicher
- dunkel/Macht
- warm/hoffnungsvoll
- Geld/Status
- Isolation

Nicht jedes Video automatisch rot/dunkel oder teal/creme machen.

## Visual Director

Neue Projekte verwenden `OBSERVABLE_SCENE_FIRST_V1`.

**Do not prompt the psychology. Prompt the evidence of the psychology.**

```text
gesprochene Bedeutung
→ Viewer Takeaway
→ Observable Evidence
→ konkrete sichtbare Komposition
→ finaler Flow-Prompt
```

Psychologische Effekt-Namen nicht automatisch wörtlich visualisieren.

## Bildlogik

Ein primärer visueller Gedanke pro Bild.

Nicht jedes Bild braucht eine Figur. Character Scene, Objekt-/Umgebungsbild, Vergleich, Schema oder kurze geplante Text-Illustration sind erlaubt.

Keine Variety-Quoten erzwingen.

## Google Flow — eine Master-Datei

Pro Video genau:

`02-google-flow/google-flow-prompt.txt`

Keine `prompt-1.txt`, `batch-1.txt` oder mehrere Master-Prompts.

## Flow-Prompt — KURZ UND DIREKT

Neue Projekte verwenden `NATURAL_FLOW_MASTER_V2`.

Interne Planung darf ausführlich sein. Der finale Flow-Prompt bleibt kompakt.

Globaler Stil einmal am Anfang. Jeder `BILD NN` beginnt nur mit dem kurzen Style-Anchor:

`Same polished hand-drawn 2D Stickman world as this video: simple round/oval heads, slim simplified bodies, thin drawn limbs, clean dark outlines, flat controlled colors and soft graphic shading.`

Danach nur:
- Kamera/Framing
- Hauptmotiv
- sichtbare Handlung/Relation
- notwendige Umgebung/Props
- Licht/lokale Farbe wenn nützlich
- Continuity wenn nötig
- exakter Text oder `No visible text.`

Normalziel: etwa **35–80 Wörter**.

Keine langen Negativ-Prompt-Listen. Global nur:
`No photorealism. No 3D/Pixar/anime. No chibi. No bare whiteboard stick figures.`

## Cover — HARD LOCK

1. `BILD 01 ONLY`
2. genau **3 getrennte 16:9 Cover-Kandidaten**
3. STOP für Nutzerwahl
4. Nutzer wählt Gewinner
5. Gewinner → `01.png` → `03-bilder/`
6. gewähltes `01.png` wird die **video-lokale visuelle Referenz** für alle späteren Batches

Aus dem Cover übernehmen:
- Stickman-Konstruktion
- Linework
- flache Farbsprache
- grafische Schattierung
- Textur/Detailgrad
- Qualitätsniveau

Nicht automatisch übernehmen:
- exakte Pose
- exakter Raum
- exakte Komposition
- exakte Palette

## Danach — 5er-Batches

Erst nach Cover-Auswahl:
- 02–06
- 07–11
- 12–16
- usw.

Regeln:
- kompletten 5er-Batch in einem Batch-Schritt erzeugen
- jede Bildnummer = eigene 16:9-Datei
- akzeptierte Bilder sofort `NN.png`
- alles direkt in denselben flachen Ordner `03-bilder/`
- keine Batch-Unterordner
- nur Fehler einzeln regenerieren
- nach PASS automatisch nächster Batch
- niemals Storyboard/Kontaktbogen/3x3/Collage/fertiges Video

**Bestandsschutz:** bestehende YouTube-Projekte nur auf ausdrücklichen Nutzerwunsch migrieren.

## Text

Nur explizit geplanter deutscher Text. Sonst `ZERO READABLE TEXT`.

## Format

### `reels/`
- 9:16
- 1080×1920
- 30 fps

### `youtube/`
- 16:9
- 1920×1080
- 30 fps

## Audio

- finales Voice-over 1,10×
- führende Stille entfernen
- lange Pausen straffen
- Wörter nicht abschneiden
- Timings erst aus final verarbeitetem Audio

## YouTube-Arbeitsfläche

- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/final-voice.mp3`
- `05-export/`
- `99-intern/`

## Export

`05-export/` ist vollständig mit:
- `final.mp4`
- `thumbnail.png`
- `youtube-upload.txt`

Alle kopierbaren Upload-Daten gehören in `youtube-upload.txt`.

## QA

Bei strukturellen/Pipeline-Änderungen relevante vorhandene Checks ausführen. Keine bestandenen Tests behaupten, wenn sie nicht tatsächlich gelaufen sind.
