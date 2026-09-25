# PROJECT BRAIN

## Zweck

Eigenständiges Produktionsrepo für **Alltagspsychologie & menschliches Verhalten** mit getrennten Formaten: YouTube-Longform/Testvideos und Reels/Shorts.

## Aktueller Status

- Themen-/Kanalpositionierung: **ALLTAGSPSYCHOLOGIE & MENSCHLICHES VERHALTEN**
- Bildwelt: **LOCKED — UNIVERSAL EDITORIAL STICKMAN WORLD v1.3 — STRICT STICKMAN ONLY**
- Themen-System: `rules/YOUTUBE_THEMEN_SYSTEM.md`
- Style-Lock: `rules/YOUTUBE_STYLE_LOCK.md`
- Referenz-Lock: `rules/IMAGE_REFERENCE_LOCK.md`
- Cover-Lock: `rules/COVER_LOCK.md`
- Text-Lock: `rules/TEXT_OVERLAY_LOCK.md`
- aktueller YouTube-Praxistest: `youtube/24.09.2026-negativitaetsbias/`

## YouTube-Struktur

Normale sichtbare Arbeitsfläche:
1. `01-script/` — `script.txt`
2. `02-google-flow/` — `google-flow-prompt.txt`
3. `03-bilder/` — `01.png`, `02.png`, ...
4. `04-audio/` — `final-voice.mp3`
5. `05-export/` — fertiger Export
6. `99-intern/` — technische Dateien, Quellen, QA und Metadaten

Der Nutzer braucht für die Bildproduktion nur **eine Google-Flow-Promptdatei**.

## Scene 01 — Cover-Regel

Für jedes neue YouTube-Video gilt:

**`03-bilder/01.png = SCENE 01 + COVER + STYLE-/ANATOMY-MASTER`.**

Szene 01:
- zeigt den ersten gesprochenen Beat korrekt
- funktioniert als starkes Thumbnail
- etabliert Stickman-/Welt-DNA
- enthält den **exakten deutschen Cover-Titel direkt aus Google Flow**
- enthält außer diesem Titel keinen weiteren lesbaren Text
- bekommt den Titel **nicht zusätzlich in Remotion**

Cover-Headline:
- 2–7 Wörter
- exakter deutscher Wortlaut
- korrekte Umlaute/Satzzeichen
- bei Fehlern Szene 01 neu generieren

Ab Szene 02 gilt wieder **ZERO READABLE TEXT** in Google Flow.

## Bildwelt-Kern

- jede sichtbare menschliche Figur ist ein echter Stickman
- einfacher runder/ovaler Kopf
- minimale Gesichtszüge
- kleiner vereinfachter Torso
- sehr dünne lineare Arme und Beine
- keine realistischen Hände/Finger, Nasen oder Ohren
- Kleidung darf Rolle zeigen, aber keine normale Human-Anatomie erzeugen
- Umgebungen dürfen detailreich und hochwertig illustriert sein
- natürliche Farben, saubere organische Outlines, dezentes 2D-/Cel-Shading
- kein Photorealismus, keine normalen Cartoon-Menschen, kein 3D/CGI

## Style-Konsistenz ohne Charakter-Klonen

**Stickman-DNA ist keine Charakter-DNA.**

Bild 01 ist Referenz für Anatomiesystem, Linienart, Rendering/Shading, Farbverhalten und Weltqualität. Nicht global gesperrt sind Figurenidentität, Kleidung, Castgröße, Rolle, Pose, Kamera, Ort, Licht oder Komposition.

Wichtig: Der sichtbare Cover-Titel in Bild 01 gehört nur zum Cover und darf ab Szene 02 nicht kopiert werden.

Pro Visual Beat bewusst **Cast + Ort + Handlung + Kamera** wählen. Exakt dieselbe Figur nur bei echter `LOCAL CONTINUITY`.

## Textsystem

### Google Flow
- Szene 01: exakter deutscher Cover-Titel, sonst kein lesbarer Text
- Szene 02+: ZERO READABLE TEXT
- Screens/Dokumente ab Szene 02 nur mit abstrakten Linien, Formen und Icons

### Remotion
- Cover-Titel **nicht** erneut rendern
- ausgewählte spätere Szenen dürfen `keyword`-Overlays mit maximal 5 Wörtern erhalten
- Ziel ungefähr ein Textmoment alle 4–6 Bilder
- typische Gesamtdichte inklusive Cover 15–25 %
- harte Obergrenze 30 %
- ausschließlich Deutsch

## Referenz-Workflow

1. Bild 01 als Cover + ersten Beat + Master inklusive Titel allein erzeugen.
2. STOP und Nutzerfreigabe.
3. Nutzer prüft besonders exakte Titel-Schreibweise, Coverstärke und Stickman-DNA.
4. Bild 01 bleibt Master.
5. Danach höchstens 5 neue Bilder pro Batch.
6. Ab Szene 02 Titel aus dem Master nicht kopieren.
7. Nach jedem Batch interne QA.
8. Nur fehlerhafte Bilder regenerieren.
9. Nach PASS automatisch fortfahren.

**Regulär genau eine Nutzerfreigabe: Bild 01.**

## Visual Beats

- konkrete Alltagsszene vor generischer Infografik
- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- 21–28 nur als geprüfte Ausnahme
- genau ein primärer Gedanke pro Bild
- Cast, Ort, Handlung und Kamera pro Beat planen
- Szene 01 zusätzlich cover-tauglich mit integrierter Titelzone planen

## Qualitätssicherung

Bei Pipeline-/Strukturänderungen mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:flow-prompts`
- `npm run qa:text-overlays`
- relevante Produktionschecks

Die Flow-QA prüft bei neuen Projekten:
- exakten Flow-Cover-Titel in Szene 01
- keinen zusätzlichen lesbaren Cover-Text
- ZERO READABLE TEXT ab Szene 02
- kein Kopieren des Cover-Titels aus der Master-Referenz
- Character-Cloning ohne `LOCAL CONTINUITY`
- übermäßige Orts-/Kamerawiederholung

Phase 3 sorgt dafür, dass ein Flow-gerenderter Cover-Titel **nicht als Remotion-Coverlabel dupliziert** wird.

## Aktueller Praxistest

YouTube: **„Warum das Negative stärker hängen bleibt“ — Negativitätsbias**.

- 412 Wörter / 35 Visual Beats
- Szene 01 = Cover + erster Beat + Master
- exakter Flow-Cover-Titel: **WARUM BLEIBT NEGATIVES HÄNGEN?**
- spätere Remotion-Keywords: Szenen 04, 09, 15, 21, 25, 31, 34
- insgesamt 8 sichtbare Textmomente auf 35 Szenen
- 16:9 / 1920×1080
- STRICT STICKMAN ONLY
- Szene 02+ ZERO READABLE TEXT in Flow
- Masterfreigabe nach Bild 01, danach automatische 5er-Batches
