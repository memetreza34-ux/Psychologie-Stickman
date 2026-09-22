# CANONICAL RULES — STICKMAN

## Kanal

Thema: **Alltagspsychologie & menschliches Verhalten**.

Verbindlich:
- `rules/FORMAT_LOCK.md`
- `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`
- `rules/YOUTUBE_THEMEN_SYSTEM.md`
- `rules/YOUTUBE_STYLE_LOCK.md`
- `rules/IMAGE_REFERENCE_LOCK.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- `rules/PRODUCTION_FORMAT_RULES.md`

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

Keine medizinischen Diagnosen, Therapieanweisungen oder pseudowissenschaftlichen Versprechen.

## Getrennte Formate

### YouTube
Pfad: `youtube/`

- ausschließlich Longform
- Themen liegen direkt als eigene Projektordner unter `youtube/`
- kein zusätzlicher `longform/`-Zwischenordner
- mindestens 10:00 Minuten, sofern das Thema die Länge sinnvoll trägt
- Ziel meist 11–14 Minuten
- sichtbare Projektstruktur: `01-script-audio`, `02-bilder`, `03-quellen`, `04-schnitt`, `06-projektdateien`
- **FORMAT HARD LOCK: 16:9 / 1920×1080 / 30 fps**
- technische Render-Komposition: `Phase3YouTube`
- bildbasierte Produktion darf `IMAGE_REFERENCE_LOCK.md` verwenden

### Reels
Pfad: `reels/`

- ausschließlich Reels/Shorts
- Wochenordner nach Muster `TT.MM.JJJJ-bis-TT.MM.JJJJ`
- darin `1-montag` bis `7-sonntag`
- keine Longform-Mindestlänge
- **FORMAT HARD LOCK: 9:16 / 1080×1920 / 30 fps**
- technische Render-Komposition: `Phase3Reel`
- **keine externe Bildgenerierung als Standard**
- **keine PNG/JPG-Serie als Produktionsgrundlage**
- Visuals werden direkt mit Remotion + React + SVG/CSS/programmatischen 2D-Komponenten gebaut
- der Nutzer liefert nach Skriptfreigabe nur das finale Voice-over
- `word-timings.json` steuert Szenen, Untertitel und Animationen
- Details: `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`

YouTube und Reels dürfen strukturell oder beim Ausgabeformat nicht vermischt werden.

## Produktionsfolge

### YouTube
THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 Bildproduktion → Phase 3 → FINAL-QA.

### Reels
THEMA + QUELLEN + CLAIM-CHECK → finales Skript → **Nutzer-Audio** → finales 1,10×-Audio → Worttimings → Programmatic Scene Plan → Remotion-Animation + Karaoke-Untertitel → Render → FINAL-QA.

## Visual-Beat-Prinzip

Ein wichtiger neuer visueller Gedanke bekommt grundsätzlich einen eigenen Visual Beat.

Für YouTube kann dieser Beat als eigenes Bild umgesetzt werden. Für Reels wird derselbe Grundsatz als eigene programmatische Remotion-Szene oder klarer Animationsschritt umgesetzt.

Keine späteren Informationen vorwegnehmen. Qualität und Synchronität vor bloßer Bild-/Szenenzahl.

## Bild-/Animationswelt

**Universal Editorial Stickman World v1.2**

- jede sichtbare menschliche Figur bleibt Stickman
- keine normalen Cartoon-Menschen oder semi-realistischen Menschen
- Umgebung darf glaubwürdig, farbig, detailreich und realitätsnah aufgebaut sein
- kein Photorealismus, kein 3D/CGI, kein Anime/Chibi
- moderne und historische Szenen bleiben Teil derselben Stickman-Welt
- sichtbarer erklärender Text ist Deutsch, wenn Text inhaltlich nötig ist

Für programmatic Reels wird die Konsistenz durch feste React/SVG-Komponenten und Design-Tokens gehalten; ein Master-Referenzbild ist dafür nicht erforderlich.

## Audio

- finales Voice-over für Reels und YouTube: **exakt 1,10×**
- Tonhöhe erhalten
- führende Stille entfernen
- kurze natürliche Pausen dürfen bleiben
- Pausen ab ungefähr 500 ms deutlich straffen
- Ziel-Restpause nach Kürzung ungefähr 120 ms vor der 1,10×-Beschleunigung
- Wörter niemals anschneiden
- Timings erst aus final verarbeitetem Audio

## Reel-Untertitel

- standardmäßig eingebrannt
- kurze Wortgruppen
- aktuelles gesprochenes Wort: **gelb `#FFD84D`**
- übrige Wörter: weiß
- Highlight exakt aus Worttimings ableiten
- Animationen dürfen über `actionWord` an konkrete Wörter gekoppelt werden

## Priorität

Bei Widerspruch gilt:
1. `rules/FORMAT_LOCK.md`
2. für Reels zusätzlich `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`
3. danach die übrigen Regeldateien

Ein Reel in 16:9, ein reguläres YouTube-Video in 9:16 oder ein standardmäßig bildgeneriertes Reel ist ein Produktionsfehler.
