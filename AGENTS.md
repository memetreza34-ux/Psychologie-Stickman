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
8. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
9. `rules/PRODUCTION_FORMAT_RULES.md`

`rules/STICKMAN_DNA.md` ist die zentrale visuelle Source of Truth. Andere Style-/Prompt-Dateien konkretisieren diese DNA, dürfen ihr aber nicht widersprechen.

## Themenwelt

Die Kanalnische ist **Alltagspsychologie & menschliches Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Bildwelt — HARD LOCK

Verbindlich ist **Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**.

Jede sichtbare menschliche oder menschenähnliche Figur muss dieselbe echte Stickman-Grundanatomie benutzen. Das gilt ohne Ausnahme für Hauptfiguren, Nebenfiguren, Menschenmengen, Hintergrundpersonen, Forscher, historische Figuren, Passanten sowie Personen auf Screens, Fotos, Postern, Werbung, Spiegelungen oder Illustrationen innerhalb der Szene.

Echte Stickman-DNA:
- einfacher runder/ovaler Kopf
- keine realistische Nase, Ohren oder Gesichtsmodellierung
- minimale Augen/Mund/Augenbrauen
- kleiner stark vereinfachter Torso
- sehr dünne, lineare Arme und Beine ohne fleischige Volumen
- Hände nur als einfache Punkte/Mitten/Nubs, keine Fingeranatomie
- Füße/Schuhe stark vereinfacht
- Kleidung darf Rolle und Epoche zeigen, darf aber niemals normale menschliche Anatomie erzeugen

**Normale Cartoon-Menschen, halb-realistische Menschen oder Mischstile sind HARD FAIL.** Die Umgebung darf dagegen deutlich detailreicher, räumlich glaubwürdig und hochwertig illustriert sein.

## Sichtbarer Text — HARD LOCK

Der Kanal ist deutschsprachig.

- Prompts dürfen Englisch sein.
- Sichtbarer Text im Bild ist trotzdem **immer Deutsch**.
- Wenn Text nicht nötig ist: keinen Text erzeugen.
- Wenn Text nötig ist: möglichst nur **ein kurzes deutsches Label / eine kurze Phrase**.
- Richtwert: **1–4 sichtbare Wörter**.
- Keine englischen Labels, Überschriften, Bildschirmtexte, Buttons, UI-Texte, Poster oder Karten.
- Keine Textwände, langen Sätze oder Infotafeln, wenn die Aussage visuell erklärt werden kann.
- Englische Promptwörter dürfen niemals automatisch im finalen Bild erscheinen.
- Bei Konflikt gilt: visuell erklären, Text verkürzen/übersetzen oder weglassen.

## Bildklarheit — HARD LOCK

- genau ein primärer visueller Gedanke pro Bild
- ein klares Hauptmotiv
- höchstens 1–2 unterstützende visuelle Hinweise, wenn wirklich nötig
- keine überladenen Multi-Panel-/Infografik-Kompositionen, wenn eine einfache Szene genügt
- wenn ein Sprechabschnitt mehrere neue Gedanken enthält, in mehrere Visual Beats/Bilder aufteilen
- Zuschauer soll die Kernaussage sehr schnell erfassen können

## Verbindlicher Referenz-Workflow

Bei Serienbildern gilt:
1. zuerst Bild 01 bzw. ein explizites Masterbild alleine generieren,
2. danach STOP und auf Nutzerfreigabe warten,
3. dieses Bild nur bei vollständigem PASS als Master-Referenz freigeben,
4. danach höchstens 5 neue Bilder pro Batch erzeugen,
5. nach jedem Batch interne Style-/Continuity-/Inhalts-QA durchführen,
6. nur fehlerhafte Bilder regenerieren,
7. nach vollständigem PASS **automatisch ohne Nutzer-Rückfrage** mit dem nächsten Batch fortfahren,
8. nur bei einem nicht automatisch lösbaren schweren Fehler stoppen.

**Die einzige reguläre Nutzerfreigabe ist Bild 01.** Nach Freigabe des Masters soll die Bildproduktion bis zum letzten Batch automatisch weiterlaufen.

Kein Folgeasset darf die Master-Referenz eigenmächtig ersetzen. Details stehen in `rules/IMAGE_REFERENCE_LOCK.md`.

## FORMAT HARD LOCK

Der Projektpfad entscheidet zwingend das Format.

### Unter `reels/`
- **9:16**
- **1080×1920**
- **30 fps**
- vertikale Bildkomposition
- Remotion: `Phase3Reel`
- niemals als 16:9 planen oder final rendern

### Unter `youtube/`
- **16:9**
- **1920×1080**
- **30 fps**
- horizontale Bildkomposition
- Remotion: `Phase3YouTube`
- niemals als 9:16 planen oder final rendern

Ein Bild wird direkt für sein Zielformat erzeugt. Falsches Seitenverhältnis anschließend nur zu croppen ist keine Standardlösung.

## Audio

Für beide Formate:
- finales Voice-over exakt 1,10×
- führende Stille entfernen
- lange Pausen straffen; Pausen ab ca. 500 ms auf ungefähr 120 ms Restpause kürzen
- Wörter niemals abschneiden
- Timings erst aus final verarbeitetem Audio

## Bildsprache und Individualisierung

- jedes Bild individuell auf den aktuellen Sprechabschnitt/Visual Beat zuschneiden
- Master-Referenz bestimmt den Stil, nicht die Komposition
- keine generischen Wiederholungen derselben Pose oder desselben Bildaufbaus als Füllmaterial
- Reels vertikal komponieren; YouTube horizontal komponieren
- jedes Bild intern auf Stickman-only prüfen, einschließlich winziger Hintergrundpersonen
- visuelle Erklärung hat Vorrang vor Text

## Zwei getrennte Produktionsflächen

- `youtube/` — reguläre YouTube-Longform-/Testvideo-Projekte als eigene Themenordner
- `reels/` — Reels/Shorts nach Wochenordnern und Wochentagen

Reels dürfen niemals unter `youtube/` liegen und YouTube-Projekte niemals unter `reels/`.

## Einfache YouTube-Arbeitsfläche — HARD LOCK

Für jedes neue YouTube-Projekt bleibt die normale Nutzeransicht bewusst einfach:

- `01-script/` → enthält nur `script.txt`
- `02-google-flow/` → enthält nur `google-flow-prompt.txt`
- `03-bilder/` → `01.png`, `02.png`, `03.png` usw.; `01.png` ist zugleich Master-Referenz
- `04-audio/` → finales `final-voice.mp3`
- `05-export/` → fertiger Videoexport
- `99-intern/` → Quellen, Style-/Continuity-Regeln, QA, Phase-1/Phase-3-Dateien und sonstige Technik

Der Nutzer soll für die normale Produktion **nur ein Skript und eine einzige Prompt-Datei** öffnen müssen.

`02-google-flow/google-flow-prompt.txt` ist die einzige nutzerseitige Prompt-Datei für die komplette Bildproduktion. Sie muss enthalten:
- zentrale DNA aus `rules/STICKMAN_DNA.md`
- Format und Stil
- STRICT-STICKMAN-ONLY-Gate
- Deutsch/Minimal-Text-Gate
- Ein-Gedanke-pro-Bild-Gate
- Master-Referenz-Regel
- konkreten 5er-Batch-Plan
- **STOP nur nach Bild 01**
- automatische interne QA und automatisches Fortsetzen nach jedem bestandenen 5er-Batch
- keine Nutzerfreigabe nach normalen Batches
- Dateinamen
- alle individuellen Szenen-/Bildprompts des Videos

Keine zusätzlichen Prompt-/Style-Dateien in der normalen sichtbaren Arbeitsfläche anlegen. Technische Dateien gehören ausschließlich nach `99-intern/`.

## Reihenfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 Bilder → Phase 3 Timings/Render → Final-QA.

Keine Phase überspringen. Skriptänderung setzt nachgelagerte semantische/visuelle Planung zurück.

## Priorität

Bei Formatkonflikten gilt ohne Ausnahme:
**`rules/FORMAT_LOCK.md` gewinnt.**

Bei visueller Identität gilt:
**`rules/STICKMAN_DNA.md` gewinnt.**

Bei der exakten projektspezifischen Darstellung gilt innerhalb der DNA:
**freigegebene Master-Referenz gewinnt.**

Bei Textkonflikten gilt:
**Deutsch + minimaler sichtbarer Text + visuelle Erklärung gewinnt.**

Beim Batch-Ablauf gilt:
**Masterfreigabe einmalig nach Bild 01; danach automatische 5er-Batches mit interner QA ohne weitere Nutzer-Rückfragen.**
