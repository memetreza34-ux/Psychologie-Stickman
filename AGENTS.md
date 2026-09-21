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
5. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`

## Themenwelt

Die Kanalnische ist **Alltagspsychologie & menschliches Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Bildwelt

Verbindlich ist **Universal Editorial Stickman World v1.1**. Jede sichtbare menschliche Figur bleibt Stickman; Umgebung und Gegenstände dürfen detailreicher und realitätsnäher sein.

## Zwei getrennte Produktionsflächen

- `youtube/` — ausschließlich reguläre YouTube-Longform-Projekte. Themen liegen direkt als eigene Ordner unter `youtube/`.
- `reels/` — ausschließlich Reels/Shorts. Organisation nach Wochenordnern und darin Montag bis Sonntag.

Reels dürfen niemals unter `youtube/` liegen und YouTube-Projekte niemals unter `reels/`.

## Reihenfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 → Phase 3 → Final-QA.

Keine Phase überspringen. Skriptänderung setzt nachgelagerte semantische/visuelle Planung zurück.
