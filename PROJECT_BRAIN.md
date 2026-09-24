# PROJECT BRAIN

## Zweck

Eigenständiges Produktionsrepo für **Alltagspsychologie & menschliches Verhalten** mit zwei klar getrennten Formaten: YouTube-Longform/Testvideos und Reels/Shorts.

## Aktueller Status

- Themen-/Kanalpositionierung: **ALLTAGSPSYCHOLOGIE & MENSCHLICHES VERHALTEN**
- Themen-System: `rules/YOUTUBE_THEMEN_SYSTEM.md`
- Bildwelt: **LOCKED — UNIVERSAL EDITORIAL STICKMAN WORLD v1.3 — STRICT STICKMAN ONLY**
- Style-Lock: `rules/YOUTUBE_STYLE_LOCK.md`
- Referenz-Lock: `rules/IMAGE_REFERENCE_LOCK.md`
- Cover-Lock: `rules/COVER_LOCK.md`
- Text-Overlay-Lock: `rules/TEXT_OVERLAY_LOCK.md`
- Visual-Beat-Regeln: `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- YouTube-Produktionsfläche: `youtube/`
- Reel-Produktionsfläche: `reels/`
- aktueller YouTube-Praxistest: `youtube/24.09.2026-spotlight-effekt/`

## Strukturprinzip

### YouTube
Unter `youtube/` liegen Themen direkt als Projektordner. Kein zusätzlicher `longform/`-Zwischenordner.

Normale sichtbare Arbeitsfläche eines YouTube-Projekts:
1. `01-script/` — nur `script.txt`
2. `02-google-flow/` — nur `google-flow-prompt.txt`
3. `03-bilder/` — fertige `01.png`, `02.png`, ...; **`01.png` ist immer Szene 01 + Cover/Thumbnail-Basis + Master**
4. `04-audio/` — `final-voice.mp3`
5. `05-export/` — fertiger Export
6. `99-intern/` — alle technischen Dateien, Quellen, QA und Metadaten

Der Nutzer braucht für die Bildproduktion nur **eine einzige Google-Flow-Promptdatei**.

### Reels
Unter `reels/` wird nach Kalenderwochen organisiert:
`TT.MM.JJJJ-bis-TT.MM.JJJJ/`

Darin liegen `1-montag` bis `7-sonntag`.

## Scene 01 — Cover-Regel

Für jedes neue YouTube-Video gilt ohne Ausnahme:

**`03-bilder/01.png = SCENE 01 + COVER + STYLE-/ANATOMY-MASTER`.**

Das bedeutet:
- Szene 01 zeigt den ersten gesprochenen Visual Beat korrekt.
- Szene 01 wird gleichzeitig cover-tauglich komponiert: starkes Hauptmotiv, schnelle Lesbarkeit, klare Emotion/Handlung, wenig visuelles Rauschen.
- Szene 01 etabliert die Stickman-/Welt-DNA für alle Folgeassets.
- Flow erzeugt auch beim Cover ZERO READABLE TEXT.
- Szene 01 reserviert bewusst ruhige Fläche für die finale Überschrift.
- Das finale Cover erhält **immer eine kurze deutsche Remotion-Headline mit 2–7 Wörtern**.
- Es gibt kein separates Pflicht-`cover.png`; die erste Szene ist das Cover.

Strukturierte Phase-1-Pläne markieren Szene 01 mit `isCover: true` und `coverRole: "SCENE_01_COVER_MASTER"`.

## Bildwelt-Kern

- jede sichtbare menschliche oder menschenähnliche Figur ist ein echter Stickman
- runder/ovaler einfacher Kopf
- minimale Gesichtszüge ohne realistische Nase/Ohren
- kleiner vereinfachter Torso
- sehr dünne lineare Arme und Beine
- keine fleischigen Cartoon-Gliedmaßen
- keine realistischen Hände/Finger
- Kleidung darf Rolle und Persönlichkeit zeigen, darf aber nie normale menschliche Anatomie erzeugen
- Umgebungen dürfen realitätsnäher, detailreich und hochwertig illustriert sein
- natürliche, klare Farben, saubere organische Outlines, dezentes 2D-/Cel-Shading
- kein Photorealismus, keine normalen Cartoon-Menschen, kein 3D/CGI

### Style-Konsistenz ohne Charakter-Klonen

**Stickman-DNA ist keine Charakter-DNA.**

Bild 01 ist global Referenz für:
- Stickman-Anatomiesystem
- Linienart
- Rendering/Shading
- Farbverhalten
- Detailgrad und Qualität der Welt

Dass Bild 01 zugleich Cover ist, ändert daran nichts. Bild 01 sperrt global **nicht**:
- Figurenidentität
- Kleidung
- Castgröße
- Rolle
- Pose
- Kamera
- Ort
- Licht
- Komposition

Pro Visual Beat werden bewusst **Cast + Ort + Handlung + Kamera** gewählt. Exakt dieselbe Figur wird nur innerhalb einer echten zusammenhängenden Mini-Handlung wiederverwendet (`LOCAL CONTINUITY`).

Nicht als Default erlaubt:
- immer derselbe Hoodie-Stickman
- immer derselbe Schreibtisch oder Raum
- immer dieselbe neutrale Pose
- immer derselbe Medium Shot
- immer nur eine einzelne Figur, wenn der Beat sinnvoll mehrere Personen verlangt

## Textsystem

### Flow
Google-Flow-Quellbilder bleiben **ZERO READABLE TEXT**:
- keine lesbaren deutschen oder englischen Wörter
- keine UI-Texte, Labels, Untertitel, Poster-, Dokument- oder Bildschirmtexte
- Screens/Dokumente nur mit abstrakten Linien, Formen und Icons

### Finaler YouTube-Render
Das Endvideo ist **nicht mehr absichtlich komplett textfrei**. Kurzer deutscher Text wird gezielt als visueller Verstärker genutzt:
- Szene 01: verpflichtende Cover-Headline (`variant: "cover"`, 2–7 Wörter)
- weitere ausgewählte Szenen: wichtige Begriffe/Merksätze (`variant: "keyword"`, maximal 5 Wörter)
- Zielwert ungefähr ein Textmoment alle 4–6 Bilder
- typischer Bereich 15–25 % der Szenen
- harte Obergrenze 30 %
- keine langen Sätze und keine Dauer-Untertitel
- ausschließlich Deutsch

Flow plant bei Overlay-Szenen geeignete ruhige Negativfläche; Remotion setzt den Text.

## Referenz-Workflow

1. Bild 01 als **Cover + ersten Visual Beat + Master** allein erzeugen.
2. STOP und Nutzerfreigabe abwarten.
3. Bild 01 nur bei vollständigem Cover-/Style-/Stickman-/Text-PASS freigeben.
4. Bild 01 bleibt Style-/Anatomie-Master für das Video.
5. Danach höchstens 5 neue Bilder pro Batch.
6. Nach jedem Batch interne Style-/Continuity-/Inhalts-QA automatisch durchführen.
7. Nur fehlerhafte Bilder regenerieren; bestandene Bilder behalten.
8. Nach vollständigem PASS **automatisch mit dem nächsten Batch fortfahren**.
9. Nach normalen Batches keine weitere Nutzerfreigabe verlangen.
10. Nur bei einem schweren, nicht automatisch lösbaren Konsistenzfehler stoppen.

**Regulär genau eine Nutzerfreigabe: Bild 01.**

## Visual Beats

Ein wichtiger visueller Gedanke bekommt grundsätzlich ein eigenes starkes Bild.

Standard:
- konkrete Alltagsszene vor generischer Infografik
- meist 10–16 Wörter pro Beat
- automatischer Zielwert 14 Wörter
- normale Obergrenze 20 Wörter
- 21–28 nur als geprüfte Ausnahme
- genau ein primärer Gedanke pro Bild
- Cast, Ort, Handlung und Kamera werden pro Beat geplant
- keine unnötige Wiederholung derselben Figuren-/Raum-/Kameraformel
- Szene 01 zusätzlich immer cover-tauglich planen
- bei geplanten Textmomenten Negativfläche bewusst einplanen

Die automatische Phase-1-Erzeugung ist ein **redaktioneller Entwurf**, keine Ausrede für generische Szenen. Vor Phase 2 müssen die geplanten Cast-/Ort-/Handlungs-/Kameraentscheidungen zum gesprochenen Beat passen.

## Qualitätssicherung

Bei Pipeline-/Strukturänderungen mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:flow-prompts`
- relevante Format-/Produktionschecks

Die Flow-QA prüft zusätzlich auf:
- Character-Cloning ohne `LOCAL CONTINUITY`
- übermäßige Wiederholung derselben erkennbaren Ortsfamilie
- übermäßige Wiederholung derselben Kamerafamilie
- fehlende Szenen-/Castvariation bei längeren Videos

Die Phase-3-Props-Prüfung erzwingt bei YouTube zusätzlich:
- genau ein `cover`-Overlay auf Szene 01
- Cover-Headline 2–7 Wörter
- Keywords maximal 5 Wörter
- maximal ein Overlay pro Szene
- Overlay-Dichte maximal 30 %

## Aktueller Praxistest

YouTube, 24.09.2026: **„Warum du glaubst, dass alle dich beobachten“ — Spotlight-Effekt**.

Ziel: ca. 2,5-Minuten-End-to-End-Test der überarbeiteten Bildpipeline mit:
- 411 Wörtern und 35 kurzen Visual Beats
- **Szene 01 zugleich als Cover/Thumbnail-Basis und Style-/Anatomie-Master**
- verpflichtender deutscher Cover-Headline
- mehreren gezielt gesetzten deutschen Keyword-Overlays statt komplett textfreiem Endvideo
- 16:9 / 1920×1080
- STRICT-STICKMAN-DNA
- Style-Konsistenz ohne Charakter-Klonen
- stark wechselnden passenden Orten, Rollen und Kamerawinkeln
- ZERO READABLE TEXT in Flow-Quellbildern
- Master-/Coverfreigabe nach Bild 01 und danach automatischen 5er-Batches
- Quellen-/Claim-Check vor Script/Phase 1
- finaler Phase-3-Aufbau erst nach finalem 1,10x-Audio und echten Bildassets.
