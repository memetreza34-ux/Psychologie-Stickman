# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Analyse bedeutet keine Schreibfreigabe. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Produktionsregeln

Danach lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `channels/dinge-erklaert/youtube/AGENTS.md`
4. `channels/dinge-erklaert/youtube/YOUTUBE_STYLE_LOCK.md`
5. `channels/dinge-erklaert/youtube/YOUTUBE_VISUAL_BEAT_RULES.md`

## Themenwelt

Es gibt aktuell keine geerbte Themen-Nische. Themen-/Kanalpositionierung bleibt `UNSET`, bis der Nutzer sie ausdrücklich festlegt. Keine frühere Themenliste oder Priorisierung aus dem Quell-Repository rekonstruieren.

## Bildwelt

Die alte Bildwelt des Quell-Repositories wurde absichtlich nicht migriert. Solange der YouTube-Style-Lock `UNSET` ist, darf kein Agent alte Charakter-/Promptregeln rekonstruieren oder eine neue Bildwelt ohne ausdrückliche Nutzerentscheidung festlegen.

## Reihenfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 → Phase 3 → Final-QA.

Keine Phase überspringen. Skriptänderung setzt nachgelagerte semantische/visuelle Planung zurück.
