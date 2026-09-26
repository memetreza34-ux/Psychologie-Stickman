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
THEMA + QUELLEN + CLAIM-CHECK → HOOK-/EINSTIEGSPLAN → FINALES SCRIPT → PHASE 1 VISUAL BEATS → PREMIUM-/FARBPLAN → PHASE 2 GOOGLE FLOW → PHASE 3 → FINAL-QA.

- Skriptänderung: Hook-Policy + Phase 1 neu prüfen/erstellen
- Hook-/Einstiegsänderung: Kernbegriffs- und frühes Alltagsbeispiel-Timing neu prüfen
- Bildweltänderung: Premium-/Farbplan + konkrete visuelle Phase-1-Aufgaben + Phase 2 neu erzeugen
- Projektpalette ändern: Bild-01-Master und bestehende Flow-Bilder auf Farbkonsistenz neu prüfen
- reine Audioänderung: Timings/Phase 3 neu erzeugen

## Aktive Visual-World-Sperre

Die verbindliche Bildwelt ist in `rules/STICKMAN_DNA.md`, `rules/YOUTUBE_STYLE_LOCK.md`, `rules/PREMIUM_VISUAL_LOCK.md` und `rules/IMAGE_REFERENCE_LOCK.md` festgelegt.

Aktueller Standard:
**Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY + PREMIUM_EDITORIAL_CINEMATIC_V1 + INTENTIONAL_COLOR_STORY_V1**.

Der verbindliche Script-Einstieg für neue YouTube-Projekte ist:
**HOOK_FIRST_EXPLAIN_EARLY_V1**.

Keine frühere Bildwelt, graue/sterile Default-Ästhetik, langsame abstrakte Hook-Struktur oder alte Quellrepo-Prompts dürfen diese Standards stillschweigend überschreiben.
