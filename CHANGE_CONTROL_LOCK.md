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
THEMA + QUELLEN + CLAIM-CHECK → FINALES SCRIPT → PHASE 1 → PHASE 2 → PHASE 3 → FINAL-QA.

- Skriptänderung: Phase 1 neu prüfen/erstellen
- Bildweltänderung: konkrete visuelle Phase-1-Aufgaben und Phase 2 neu erzeugen
- reine Audioänderung: Timings/Phase 3 neu erzeugen

## Aktive Visual-World-Sperre

Die verbindliche Bildwelt ist in `rules/STICKMAN_DNA.md`, `rules/YOUTUBE_STYLE_LOCK.md` und `rules/IMAGE_REFERENCE_LOCK.md` festgelegt.

Aktueller Standard:
**Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**.

Keine frühere Bildwelt und keine alten Quellrepo-Prompts dürfen die aktuelle Stickman-DNA stillschweigend überschreiben.
