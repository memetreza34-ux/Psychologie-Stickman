# 2-Dienstag — Warum denkst du, alle schauen dich an?

Datum: **22.09.2026**

Status: Inhaltlich vorbereitet — Skript, Quellen, Claim-Check und 24 Visual Beats vorhanden. Für die finale Produktion fehlen Nutzer-Audio, echte Worttimings, programmatic Scene Plan und Render.

## Thema

**Spotlight-Effekt:** Warum wir oft überschätzen, wie stark andere unser Aussehen und Verhalten bemerken.

## Verbindliches Ausgabeformat

- **9:16**
- **1080×1920**
- **30 fps**
- vertikal / Portrait
- Render-Komposition: `Phase3Reel`
- kein 16:9-Reel

## Reel-Visuals — PROGRAMMATIC HARD LOCK

Dieses Reel wird **nicht aus extern generierten Bildern** gebaut.

- kein Google Flow für Bildproduktion
- keine PNG/JPG-Serie
- kein Master-Referenzbild
- keine 5er-Bildbatches
- der Nutzer liefert nach Skriptfreigabe nur das Voice-over
- Stickmen, Bahn, Objekte, Spotlight, Diagramme, Übergänge und Bewegungen werden direkt in Remotion/React/SVG/CSS gebaut
- `02-bilder/` enthält nur ältere Vorarbeiten und ist für den programmatic Render **nicht die Produktionsquelle**

Verbindliche Regel: `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`

## Audio

- Nutzer liefert finales Voice-over
- finales Voice-over exakt 1,10×
- führende Stille entfernen
- Pausen ab ungefähr 500 ms deutlich kürzen
- Ziel-Restpause ungefähr 120 ms vor der 1,10×-Beschleunigung
- Wörter niemals abschneiden
- Timings erst aus final verarbeitetem Audio

## Untertitel

- aus den echten Worttimings
- kurze Wortgruppen
- übrige Wörter weiß
- aktuell gesprochenes Wort gelb `#FFD84D`
- Highlight bewegt sich Wort für Wort synchron mit dem Audio
- Untertitel in vertikaler Safe Area

## Animation

Jeder Visual Beat wird als eigene programmatic Szene bzw. Animationsaufgabe umgesetzt.

Wichtige Aktionen bekommen ein `actionWord`. Der Start dieses gesprochenen Wortes löst die zentrale Animation aus, z. B.:
- „verschüttest“ → Becher kippt / Kaffee fällt / Fleck erscheint
- „Jeder“ → gefühlte Blicklinien erscheinen
- „weniger“ → übertriebene Aufmerksamkeit schrumpft
- „Spotlight-Effekt“ → Spotlight-Metapher baut sich auf

## Umfang

- ca. 60–90 Sekunden
- 24 Visual Beats
- Universal Editorial Stickman World v1.2
- jede sichtbare menschliche Figur bleibt Stickman
- keine Füllanimationen
- jeder Beat zeigt genau den gerade gesprochenen Gedanken

## Technischer Test

Im Repo existiert zusätzlich die Remotion-Komposition `ProgrammaticReelTest`.

Render-Befehl:
`npm run render:reel:test`

Der Test läuft ohne externe Bilder und demonstriert:
- Stickman-Szenen
- Übergänge
- Audio-Wort-Cues
- Karaoke-Untertitel
- gelbes Active-Word-Highlight

## Struktur

- `01-script-audio/` — Skript und Nutzer-Audio
- `02-bilder/` — Legacy-Vorarbeit; für programmatic Reels nicht renderrelevant
- `03-export/` — finaler Reel-Export / Upload-Paket
- `04-projektdateien/` — Quellen, Claim-Check, Visual Beats, Worttimings, programmatic Scene Plan und Renderdaten
