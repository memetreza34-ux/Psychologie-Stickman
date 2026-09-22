# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Analyse bedeutet keine Schreibfreigabe. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Regeln

Danach lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/FORMAT_LOCK.md`
4. `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`
5. `rules/YOUTUBE_THEMEN_SYSTEM.md`
6. `rules/YOUTUBE_STYLE_LOCK.md`
7. `rules/IMAGE_REFERENCE_LOCK.md`
8. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
9. `rules/PRODUCTION_FORMAT_RULES.md`

## Themenwelt

Die Kanalnische ist **Alltagspsychologie & menschliches Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Bild-/Animationswelt

Verbindlich ist **Universal Editorial Stickman World v1.2**. Jede sichtbare menschliche Figur bleibt Stickman; Umgebung und Gegenstände dürfen detailreicher und realitätsnäher sein.

### YouTube: bildbasierter Referenz-Workflow

Wenn ein YouTube-Projekt Serienbilder nutzt, gilt der Referenz-Workflow aus `rules/IMAGE_REFERENCE_LOCK.md`.

### Reels: programmatic only

Für alles unter `reels/` gilt standardmäßig:
- keine Google-Flow-/externe Bildgenerierung
- keine PNG/JPG-Serie als visuelle Produktionsgrundlage
- kein Master-Referenzbild nötig
- der Nutzer liefert nach Skriptfreigabe nur das finale Voice-over
- Visuals werden direkt in Remotion mit React + SVG/CSS/programmatischen 2D-Komponenten gebaut
- Worttimings steuern Szenen, Untertitel und Action-Cues
- aktuell gesprochenes Untertitelwort ist gelb `#FFD84D`, übrige Wörter weiß
- zentrale Animationen dürfen über `actionWord` exakt an ein gesprochenes Wort gekoppelt werden

Details stehen in `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`.

## FORMAT HARD LOCK

Der Projektpfad entscheidet zwingend das Format.

### Unter `reels/`
- **9:16**
- **1080×1920**
- **30 fps**
- vertikale Komposition
- Remotion: `Phase3Reel`
- niemals als 16:9 planen oder final rendern

### Unter `youtube/`
- **16:9**
- **1920×1080**
- **30 fps**
- horizontale Komposition
- Remotion: `Phase3YouTube`
- niemals als 9:16 planen oder final rendern

## Audio

Für beide Formate:
- finales Voice-over exakt 1,10×
- führende Stille entfernen
- lange Pausen straffen; Pausen ab ca. 500 ms auf ungefähr 120 ms Restpause kürzen
- Wörter niemals abschneiden
- Timings erst aus final verarbeitetem Audio

## Individualisierung

- sichtbarer erklärender Text ausschließlich Deutsch, wenn Text überhaupt nötig ist
- jeder Visual Beat wird individuell auf den aktuellen Sprechabschnitt zugeschnitten
- keine generischen Wiederholungen derselben Pose oder desselben Aufbaus als Füllmaterial
- Reels vertikal programmieren; YouTube horizontal komponieren

## Zwei getrennte Produktionsflächen

- `youtube/` — ausschließlich reguläre YouTube-Longform-Projekte
- `reels/` — ausschließlich Reels/Shorts, Organisation nach Wochenordnern und Montag bis Sonntag

Reels dürfen niemals unter `youtube/` liegen und YouTube-Projekte niemals unter `reels/`.

## Reihenfolge

### YouTube
THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 → Phase 2 → Phase 3 → FINAL-QA.

### Reels
THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Nutzer-Audio → Audio-Normalisierung → Worttimings → Programmatic Scene Plan → Remotion-Animation + Untertitel → Render → FINAL-QA.

Keine Phase überspringen. Skriptänderung setzt nachgelagerte Timings/Visuals zurück.

## Priorität

Bei Konflikten gilt:
**`rules/FORMAT_LOCK.md` zuerst; für Reels zusätzlich `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`.**
