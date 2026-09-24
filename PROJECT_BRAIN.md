# PROJECT BRAIN

## Zweck

Eigenständiges Produktionsrepo für **Alltagspsychologie & menschliches Verhalten** mit zwei klar getrennten Formaten: YouTube-Longform/Testvideos und Reels/Shorts.

## Aktueller Status

- Themen-/Kanalpositionierung: **ALLTAGSPSYCHOLOGIE & MENSCHLICHES VERHALTEN**
- Themen-System: `rules/YOUTUBE_THEMEN_SYSTEM.md`
- Bildwelt: **LOCKED — UNIVERSAL EDITORIAL STICKMAN WORLD v1.3 — STRICT STICKMAN ONLY**
- Style-Lock: `rules/YOUTUBE_STYLE_LOCK.md`
- Referenz-Lock: `rules/IMAGE_REFERENCE_LOCK.md`
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
3. `03-bilder/` — fertige `01.png`, `02.png`, ...; `01.png` ist Master
4. `04-audio/` — `final-voice.mp3`
5. `05-export/` — fertiger Export
6. `99-intern/` — alle technischen Dateien, Quellen, QA und Metadaten

Der Nutzer braucht für die Bildproduktion nur **eine einzige Google-Flow-Promptdatei**.

### Reels
Unter `reels/` wird nach Kalenderwochen organisiert:
`TT.MM.JJJJ-bis-TT.MM.JJJJ/`

Darin liegen `1-montag` bis `7-sonntag`.

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

Bild 01 ist global nur Referenz für:
- Stickman-Anatomiesystem
- Linienart
- Rendering/Shading
- Farbverhalten
- Detailgrad und Qualität der Welt

Bild 01 sperrt global **nicht**:
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

## Sprache im Bild

Google-Flow-Quellbilder sind standardmäßig **ZERO READABLE TEXT**:
- keine lesbaren deutschen oder englischen Wörter
- keine UI-Texte, Labels, Untertitel, Poster-, Dokument- oder Bildschirmtexte
- Screens/Dokumente nur mit abstrakten Linien, Formen und Icons

Wenn sichtbarer Text gebraucht wird, wird er standardmäßig später kontrolliert in **Remotion auf Deutsch** gesetzt. Nur eine ausdrücklich begründete Ausnahme darf direkten Bildtext verwenden; dann muss der exakte kurze deutsche Wortlaut vorgegeben sein. Englischer sichtbarer Text ist nicht erlaubt.

## Referenz-Workflow

1. Bild 01 allein erzeugen.
2. STOP und Nutzerfreigabe abwarten.
3. Bild 01 nur bei vollständigem Style-/Stickman-/Text-PASS freigeben.
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

## Aktueller Praxistest

YouTube, 24.09.2026: **„Warum du glaubst, dass alle dich beobachten“ — Spotlight-Effekt**.

Ziel: ca. 2,5-Minuten-End-to-End-Test der überarbeiteten Bildpipeline mit:
- 411 Wörtern und 35 kurzen Visual Beats
- 16:9 / 1920×1080
- STRICT-STICKMAN-DNA
- Style-Konsistenz ohne Charakter-Klonen
- stark wechselnden passenden Orten, Rollen und Kamerawinkeln
- ZERO READABLE TEXT in Flow-Quellbildern
- deutschen Texten ausschließlich kontrolliert über Remotion bzw. explizite deutsche Ausnahme
- Masterfreigabe nach Bild 01 und danach automatischen 5er-Batches
- Quellen-/Claim-Check vor Script/Phase 1
- finaler Phase-3-Aufbau erst nach finalem 1,10x-Audio und echten Bildassets.
