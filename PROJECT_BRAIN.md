# PROJECT BRAIN

## Zweck

Eigenständiges Produktionsrepo für **Alltagspsychologie & menschliches Verhalten** mit zwei klar getrennten Formaten: YouTube-Longform und Reels/Shorts.

## Aktueller Status

- Themen-/Kanalpositionierung: **ALLTAGSPSYCHOLOGIE & MENSCHLICHES VERHALTEN**
- Themen-System: `rules/YOUTUBE_THEMEN_SYSTEM.md`
- Bild-/Animationswelt: **LOCKED — UNIVERSAL EDITORIAL STICKMAN WORLD v1.2**
- Style-Lock: `rules/YOUTUBE_STYLE_LOCK.md`
- Reel-Programmatic-Lock: `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`
- Visual-Beat-Regeln: `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- YouTube-Produktionsfläche: `youtube/`
- Reel-Produktionsfläche: `reels/`
- technischer Reel-Test: Remotion-Komposition `ProgrammaticReelTest`

## Strukturprinzip

### YouTube
Unter `youtube/` liegen Themen direkt als Projektordner. Kein zusätzlicher `longform/`-Zwischenordner.

YouTube darf bildbasiert produzieren und verwendet `Phase3YouTube` in 16:9.

### Reels
Unter `reels/` wird nach Kalenderwochen organisiert:
`TT.MM.JJJJ-bis-TT.MM.JJJJ/`

Darin liegen:
`1-montag` bis `7-sonntag`.

Reels werden **nicht als Bild-Slideshow produziert**. Der Nutzer liefert nach Skriptfreigabe nur das finale Voice-over. Aus finalem Audio + Worttimings + programmatic Scene Plan baut Remotion die komplette visuelle Ebene selbst.

Technische Kernkomponente:
- `src/reels/ProgrammaticReel.tsx`

Testkomposition:
- `ProgrammaticReelTest`
- Render: `npm run render:reel:test`

## Bild-/Animationswelt-Kern

- jede sichtbare menschliche Figur bleibt Stickman
- realitätsnähere, detailreiche 2D-Umgebungen erlaubt
- natürliche, klare Farben
- kein Photorealismus, keine normalen Cartoon-Menschen, kein 3D/CGI
- Reels halten die Stilkontinuität über wiederverwendbare React/SVG-Komponenten und Design-Tokens

## Visual Beats

Ein wichtiger visueller Gedanke bekommt grundsätzlich einen eigenen Visual Beat.

- YouTube: Visual Beat kann ein eigenes Bild sein.
- Reels: Visual Beat wird als eigene Remotion-Szene oder klarer Animationsschritt umgesetzt.

## Reel-Synchronität

Worttimings aus dem finalen Voice-over steuern:
- Szenenwechsel
- Karaoke-Untertitel
- gelbes Active-Word-Highlight `#FFD84D`
- wichtige `actionWord`-Animationen

## Aktueller Test

Der technische Beispieltest zeigt vier programmatic Szenen zum Spotlight-Effekt:
1. Kaffee verschütten
2. gefühlte Blicke
3. reale geringere Aufmerksamkeit
4. Spotlight-Metapher

Der Test benötigt keine externen Bilder und kann zunächst ohne Audio gerendert werden. Für einen echten Audio-Sync-Test wird anschließend das Nutzer-Voice-over mit echten Worttimings eingesetzt.
