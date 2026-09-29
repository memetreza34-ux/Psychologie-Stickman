# CHANGE CONTROL LOCK

## Standardzustand: READ ONLY

Jeder neue Chat startet ohne Schreibfreigabe.

Nur lesen/analysieren bei Formulierungen wie:
- analysiere das Repo
- prüfe alles
- finde Bugs/Widersprüche
- ist die Struktur gut?

## Schreibfreigabe

Schreiben ist erlaubt, wenn der Nutzer im aktuellen Chat ausdrücklich eine Änderung verlangt. Die Freigabe gilt nur für den genannten Scope.

Beispiele:
- „erstelle das nächste YouTube-Video“ → nur dieses Projekt + notwendige Projektlisten
- „ändere die Bildwelt“ → Style-/Promptregeln dürfen innerhalb dieses Auftrags geändert werden
- „übertrage das Repo“ → Migrationsarbeiten im genannten Zielrepo sind erlaubt

## Grenzen

- keine ungefragten Neben-Cleanups
- vor Update bestehender Datei aktuellen SHA lesen
- fremde Änderungen nicht überschreiben
- Exporte nicht überschreiben
- bei struktureller Änderung relevante Checks ausführen

## Phasenschutz

YouTube:
THEMA + QUELLEN + CLAIM-CHECK → HOOK-/EINSTIEGSPLAN → FINALES SCRIPT → PHASE 1 VISUAL BEATS → MOOD-/FARBPLAN → PHASE 2 GOOGLE FLOW → PHASE 3 → FINAL-QA.

- Skriptänderung: Hook-Policy + Phase 1 neu prüfen/erstellen
- Hook-/Einstiegsänderung: Kernbegriffs- und frühes Alltagsbeispiel-Timing neu prüfen
- Bildweltänderung: Mood-/Farbplan + konkrete visuelle Phase-1-Aufgaben + Phase 2 neu erzeugen
- Mood-/Palette-Änderung: betroffene Flow-Bilder auf Konsistenz neu prüfen
- reine Audioänderung: Timings/Phase 3 neu erzeugen

## Google-Flow-Struktur — NICHT ÄNDERN

Pro Video bleibt die bestehende Struktur verbindlich:

`02-google-flow/google-flow-prompt.txt`

Diese **eine Datei enthält alle Szenen des Videos** zusammen mit den globalen Flow-/Bildwelt-Regeln.

Nicht in mehrere Master-Prompt-Dateien oder Batch-Prompt-Dateien aufteilen. Batches betreffen nur die Bildgenerierung, nicht die Dateistruktur.

## Aktive Visual-World-Sperre

Verbindliche Quellen:
1. `rules/VISUAL_SYSTEM.md`
2. `rules/visual-system.json`
3. `rules/STICKMAN_DNA.md`
4. `rules/YOUTUBE_STYLE_LOCK.md`
5. `rules/PREMIUM_VISUAL_LOCK.md`
6. `rules/IMAGE_REFERENCE_LOCK.md`

Aktueller Standard:
**Cinematic Human Behavior World v2 — `CINEMATIC_HUMAN_BEHAVIOR_V2` + `STYLIZED_STICKMAN_CAST_V2` + `ADAPTIVE_PSYCHOLOGICAL_MOOD_V1`.**

Der verbindliche Script-Einstieg für neue YouTube-Projekte bleibt:
**`HOOK_FIRST_EXPLAIN_EARLY_V1`**.

## Retired

Folgende Standards dürfen neue Produktionen nicht stillschweigend überschreiben:
- Universal Editorial Stickman World v1.3
- Minimal Editorial Stickman v2
- Cinematic Illustrated Psychology World v1

Historische Projekte dürfen alte Metadaten behalten, aber neue Regeln/Prompts dürfen sie nicht kopieren.
