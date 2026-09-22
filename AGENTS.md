# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Analyse bedeutet keine Schreibfreigabe. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Regeln

Danach lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/YOUTUBE_THEMEN_SYSTEM.md`
4. `rules/YOUTUBE_STYLE_LOCK.md`
5. `rules/IMAGE_REFERENCE_LOCK.md`
6. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
7. `rules/PRODUCTION_FORMAT_RULES.md`

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
4. danach höchstens **5 neue Bilder pro Batch** erzeugen,
5. jeden Batch gegen die Master-Referenz und untereinander prüfen,
6. bei Style-Drift nur fehlerhafte Bilder neu generieren,
7. erst nach vollständigem PASS mit dem nächsten 5er-Batch fortfahren.

Kein Folgeasset darf die Master-Referenz eigenmächtig ersetzen. Details stehen verbindlich in `rules/IMAGE_REFERENCE_LOCK.md`.

## Format und Audio

Für **Reels und YouTube** gilt gleichermaßen:
- 16:9
- 1920×1080
- 30 fps
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

## Zwei getrennte Produktionsflächen

- `youtube/` — ausschließlich reguläre YouTube-Longform-Projekte. Themen liegen direkt als eigene Ordner unter `youtube/`.
- `reels/` — ausschließlich Reels/Shorts. Organisation nach Wochenordnern und darin Montag bis Sonntag.

Reels dürfen niemals unter `youtube/` liegen und YouTube-Projekte niemals unter `reels/`.

## Reihenfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 → Phase 3 → Final-QA.

Keine Phase überspringen. Skriptänderung setzt nachgelagerte semantische/visuelle Planung zurück.
