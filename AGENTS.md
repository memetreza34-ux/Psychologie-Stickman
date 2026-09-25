# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Analyse bedeutet keine Schreibfreigabe. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Regeln

Danach lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/STICKMAN_DNA.md`
4. `rules/FORMAT_LOCK.md`
5. `rules/YOUTUBE_THEMEN_SYSTEM.md`
6. `rules/YOUTUBE_STYLE_LOCK.md`
7. `rules/IMAGE_REFERENCE_LOCK.md`
8. `rules/COVER_LOCK.md`
9. `rules/TEXT_OVERLAY_LOCK.md`
10. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
11. `rules/PRODUCTION_FORMAT_RULES.md`

`rules/STICKMAN_DNA.md` ist die zentrale visuelle Source of Truth. Für die besondere YouTube-Cover-Textfrage gewinnt `rules/COVER_LOCK.md`.

## Themenwelt

Die Kanalnische ist **Alltagspsychologie & menschliches Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Bildwelt — HARD LOCK

Verbindlich ist **Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**.

Jede sichtbare menschliche oder menschenähnliche Figur benutzt echte Stickman-Grundanatomie:
- einfacher runder/ovaler Kopf
- keine realistische Nase/Ohren/Gesichtsmodellierung
- minimale Augen/Mund
- kleiner vereinfachter Torso
- sehr dünne lineare Arme und Beine
- einfache Hände ohne Fingeranatomie
- stark vereinfachte Füße/Schuhe

Normale Cartoon-Menschen, halb-realistische Menschen, Mischstile, 3D/Pixar/Anime sind HARD FAIL. Umgebungen dürfen deutlich detailreicher, räumlich glaubwürdig und hochwertig illustriert sein.

## Bildlogik

Priorität:
1. konkrete Handlung / Alltagsszene
2. einfache visuelle Metapher
3. Diagramm/Skala/Karte nur wenn wirklich klarer

Keine langen Serien aus denselben Karten, Waagen, Pfaden oder Dashboard-Kompositionen.

## Textsystem — HARD LOCK

### Szene 01 / Cover

Google Flow rendert den **exakten deutschen Cover-Titel direkt in `03-bilder/01.png`**.

Verbindlich:
- 2–7 Wörter
- exakter vorgegebener Wortlaut
- korrekte Umlaute/Satzzeichen
- große, gut lesbare Thumbnail-Typografie
- außer diesem Titel **kein weiterer lesbarer Text**
- bei Schreibfehler/Pseudo-Schrift: Szene 01 regenerieren
- Remotion darf den Cover-Titel **nicht duplizieren**

### Szene 02+

Google-Flow-Quellbilder bleiben **ZERO READABLE TEXT**:
- keine Wörter/Buchstaben
- keine UI-Texte, Labels, Untertitel
- keine Poster-/Werbe-/Bildschirmtexte
- Dokumente/Screens nur abstrakt
- englische Promptwörter niemals ins Bild übernehmen
- Cover-Titel aus 01.png nicht kopieren

### Spätere Textmomente

Ausgewählte YouTube-Szenen dürfen kurze deutsche `keyword`-Overlays in Remotion erhalten:
- maximal 5 Wörter
- ungefähr ein Textmoment alle 4–6 Bilder
- maximal 30 % sichtbare Textmomente inklusive Cover
- keine ganzen Erklärsätze und keine Dauer-Untertitel

Kurz:
**Google Flow setzt den Cover-Titel. Remotion setzt spätere Keywords.**

## Bildklarheit — HARD LOCK

- genau ein primärer visueller Gedanke pro Bild
- ein klares Hauptmotiv
- höchstens 1–2 unterstützende Hinweise
- keine überladenen Multi-Panel-Kompositionen
- mehrere neue Gedanken auf mehrere Visual Beats aufteilen

## Scene 01 — COVER + MASTER HARD LOCK

Für jedes YouTube-Projekt:

**`03-bilder/01.png` = SCENE 01 + COVER/THUMBNAIL + STYLE-/ANATOMY-MASTER.**

Szene 01 muss gleichzeitig:
- den ersten gesprochenen Visual Beat korrekt darstellen
- als starkes Cover funktionieren
- die Stickman-/Welt-DNA etablieren
- den exakten deutschen Cover-Titel direkt aus Google Flow enthalten
- außer diesem Titel keinen weiteren lesbaren Text enthalten

Kein separates Pflicht-`cover.png`.

Phase-1-Metadaten neuer Projekte:
- `isCover: true`
- `coverRole: "SCENE_01_COVER_MASTER"`
- `coverHeadline: "..."`
- `coverTextRenderer: "GOOGLE_FLOW"`
- `flowSourceImageTextPolicy: "SCENE_01_EXACT_GERMAN_COVER_TITLE_ONLY"`

## Visual-Beat-Dichte

- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- 21–28 nur ausdrücklich geprüft
- durchschnittlich höchstens 16 Wörter pro Szene

Nicht nur nach Wortzahl teilen; neue Orte, Handlungen, Vergleiche oder Ursache-Folge-Schritte redaktionell trennen.

## Referenz-Workflow

1. Bild 01 als Cover + erster Beat + Master **inklusive exaktem Titel** allein generieren.
2. STOP und Nutzerfreigabe.
3. Nur freigeben, wenn Cover, Titel, Stickman-DNA und Inhalt PASS sind.
4. Danach höchstens 5 neue Bilder pro Batch.
5. Bild 01 ab Szene 02 nur als STYLE-/ANATOMY-Referenz verwenden, nicht als Charakter- oder Textvorlage.
6. Nach jedem Batch interne QA.
7. Nur fehlerhafte Bilder regenerieren.
8. Nach PASS automatisch fortsetzen.

**Die einzige reguläre Nutzerfreigabe ist Bild 01.**

## FORMAT HARD LOCK

### `reels/`
- 9:16
- 1080×1920
- 30 fps
- Remotion: `Phase3Reel`

### `youtube/`
- 16:9
- 1920×1080
- 30 fps
- Remotion: `Phase3YouTube`

## Audio

Für beide Formate:
- finales Voice-over exakt 1,10×
- führende Stille entfernen
- lange Pausen straffen
- Wörter niemals abschneiden
- Timings erst aus final verarbeitetem Audio

## Zwei getrennte Produktionsflächen

- `youtube/` — YouTube-Longform/Testvideos
- `reels/` — Reels/Shorts

Nicht vermischen.

## Einfache YouTube-Arbeitsfläche — HARD LOCK

- `01-script/` → `script.txt`
- `02-google-flow/` → einzige `google-flow-prompt.txt`
- `03-bilder/` → `01.png`, `02.png`, ...; `01.png` ist Cover + Scene 01 + Master
- `04-audio/` → `final-voice.mp3`
- `05-export/` → fertiger Videoexport
- `99-intern/` → Quellen, QA und Pipeline-Metadaten

Die Google-Flow-Datei muss enthalten:
- zentrale Stickman-DNA
- Format/Stil
- Scene-01-Cover-Hard-Lock
- **exakten deutschen Flow-Cover-Titel**
- `NO OTHER READABLE TEXT` für Szene 01
- `ZERO READABLE TEXT` für Szene 02+
- Verbot, den Titel aus Master in spätere Bilder zu kopieren
- Ein-Gedanke-pro-Bild-Gate
- Master-Referenz-Regel
- konkreten 5er-Batch-Plan
- STOP nur nach Bild 01
- automatische QA/Fortsetzung
- alle individuellen Szenenprompts

Bei neuen Projekten gehört der Cover-Titel **nicht** als Remotion-`cover`-Label in `sceneLabels`. `sceneLabels` enthält nur spätere `keyword`-Overlays.

## QA vor Abschluss

Bei strukturellen oder Pipeline-Änderungen mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:flow-prompts`
- `npm run qa:text-overlays`
- relevante Produktionschecks

## Reihenfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 Bilder → Phase 3 Timings/Render → Final-QA.

## Priorität

Bei Formatkonflikten: **`rules/FORMAT_LOCK.md` gewinnt.**

Bei visueller Identität: **`rules/STICKMAN_DNA.md` gewinnt.**

Bei Cover-Fragen: **`rules/COVER_LOCK.md` gewinnt: Szene 01 enthält den exakten Google-Flow-Cover-Titel.**

Bei späteren Textmomenten: **`rules/TEXT_OVERLAY_LOCK.md` gewinnt.**

Beim Batch-Ablauf: **Freigabe einmal nach Bild 01; danach automatische 5er-Batches.**
