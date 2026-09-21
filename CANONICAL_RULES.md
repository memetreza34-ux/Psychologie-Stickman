# CANONICAL RULES — STICKMAN

## Kanal

Thema: **Alltagspsychologie & menschliches Verhalten**.

Verbindlich:
- `rules/YOUTUBE_THEMEN_SYSTEM.md`
- `rules/YOUTUBE_STYLE_LOCK.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`

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
- sichtbare Projektstruktur: `01-script-audio`, `02-bilder`, `03-quellen`, `04-schnitt`, `05-export`, `06-projektdateien`

### Reels
Pfad: `reels/`

- ausschließlich Reels/Shorts
- Wochenordner nach Muster `TT.MM.JJJJ-bis-TT.MM.JJJJ`
- darin `1-montag` bis `7-sonntag`
- jeder Tag: `01-script-audio`, `02-bilder`, `03-export`, `04-projektdateien`
- keine Longform-Mindestlänge

YouTube und Reels dürfen strukturell nicht ineinander verschachtelt werden.

## Produktionsfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 → Phase 3 → Final-QA.

## Visual-Beat-Prinzip

Ein wichtiger neuer visueller Gedanke bekommt grundsätzlich ein eigenes Bild. Keine langen Sammelbilder für mehrere Aussagen. Qualität vor bloßer Bildanzahl.

Für YouTube gilt zusätzlich ab Phase 2 eine harte 1:1-Zuordnung:
**eine Phase-1-Szene → ein eigener Bildprompt → ein eigenes nummeriertes Bild.**
Prompts dürfen keine Beats zusammenlegen oder spätere Aussagen vorwegnehmen. `npm run qa:prompt-coverage` muss für Phase-2-Projekte bestehen.

## Bildwelt

**Universal Editorial Stickman World v1.1**

- jede sichtbare menschliche Figur bleibt Stickman
- keine normalen Cartoon-Menschen oder semi-realistischen Menschen
- Umgebung darf glaubwürdig, farbig, detailreich und realitätsnah aufgebaut sein
- kein Photorealismus, kein 3D/CGI, kein Anime/Chibi
- moderne und historische Szenen bleiben Teil derselben Stickman-Welt

## Audio

- bestehender Voice-over-Workflow: 1,10×
- führende Stille entfernen
- lange Pausen straffen
- Wörter nicht anschneiden
- Timings erst aus final verarbeitetem Audio
