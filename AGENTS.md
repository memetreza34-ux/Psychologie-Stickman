# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Analyse bedeutet keine Schreibfreigabe. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Regeln

Danach lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/FORMAT_LOCK.md`
4. `rules/YOUTUBE_THEMEN_SYSTEM.md`
5. `rules/YOUTUBE_STYLE_LOCK.md`
6. `rules/IMAGE_REFERENCE_LOCK.md`
7. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
8. `rules/PRODUCTION_FORMAT_RULES.md`

## Themenwelt

Die Kanalnische ist **Alltagspsychologie & menschliches Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Bildwelt

Verbindlich ist **Universal Editorial Stickman World v1.2**. Jede sichtbare menschliche Figur bleibt Stickman; Umgebung und Gegenstände dürfen detailreicher und realitätsnäher sein.

### Verbindlicher Referenz-Workflow

Bei Serienbildern gilt:
1. zuerst Bild 01 bzw. ein explizites Masterbild alleine generieren,
2. visuell prüfen und freigeben,
3. dieses Bild als Master-Referenz für alle Folgeassets verwenden,
4. danach höchstens 5 neue Bilder pro Batch erzeugen,
5. jeden Batch gegen die Master-Referenz und untereinander prüfen,
6. bei Style-Drift nur fehlerhafte Bilder neu generieren,
7. erst nach vollständigem PASS mit dem nächsten 5er-Batch fortfahren.

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

- sichtbarer Text im finalen Bild ausschließlich Deutsch, wenn Text überhaupt nötig ist
- sonst lieber kein sichtbarer Text
- jedes Bild individuell auf den aktuellen Sprechabschnitt/Visual Beat zuschneiden
- Master-Referenz bestimmt den Stil, nicht die Komposition
- keine generischen Wiederholungen derselben Pose oder desselben Bildaufbaus als Füllmaterial
- Reels vertikal komponieren; YouTube horizontal komponieren

## Zwei getrennte Produktionsflächen

- `youtube/` — ausschließlich reguläre YouTube-Longform-Projekte. Themen liegen direkt als eigene Ordner unter `youtube/`.
- `reels/` — ausschließlich Reels/Shorts. Organisation nach Wochenordnern und darin Montag bis Sonntag.

Reels dürfen niemals unter `youtube/` liegen und YouTube-Projekte niemals unter `reels/`.

## Einfache YouTube-Arbeitsfläche — HARD LOCK

Für jedes neue reguläre YouTube-Projekt soll die normale Nutzeransicht bewusst einfach bleiben. Auf Projektebene werden nur diese Arbeitsordner angelegt:

- `01-script/` → enthält nur `script.txt`
- `02-google-flow/` → enthält nur `google-flow-prompt.txt`
- `03-bilder/` → hier kommen `01.png`, `02.png`, `03.png` usw. direkt hinein; `01.png` ist zugleich die Master-Referenz
- `04-audio/` → hier kommt das finale `final-voice.mp3` hinein
- `05-export/` → hier kommt der fertige Videoexport hinein
- `99-intern/` → alle Quellen, Style-/Continuity-Regeln, QA, Phase-1/Phase-3-Dateien und sonstige technische Metadaten

Der Nutzer soll für die normale Produktion **nur ein Skript und eine einzige Prompt-Datei** öffnen müssen.

`02-google-flow/google-flow-prompt.txt` ist die einzige nutzerseitige Prompt-Datei für die komplette Bildproduktion eines Videos. Sie muss in sich enthalten:
- Format und Stil
- Master-Referenz-Regel
- 5er-Batch-Workflow
- Dateinamen
- Sprachregel für sichtbaren Text
- alle individuellen Szenen-/Bildprompts des Videos

Keine zusätzlichen `STYLE.txt`, `CONTINUITY.txt`, `PRODUCTION_RULES.txt`, `visual-qa.md` oder weiteren Prompt-Dateien in der normalen sichtbaren Arbeitsfläche anlegen. Solche technischen Dateien gehören ausschließlich nach `99-intern/`.

## Reihenfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 → Phase 3 → Final-QA.

Keine Phase überspringen. Skriptänderung setzt nachgelagerte semantische/visuelle Planung zurück.

## Priorität

Bei Formatkonflikten gilt ohne Ausnahme:
**`rules/FORMAT_LOCK.md` gewinnt.**
