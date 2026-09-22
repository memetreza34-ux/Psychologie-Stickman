# REEL PROGRAMMATIC VISUAL RULES

**STATUS: HARD LOCK — VERBINDLICH FÜR `reels/`**

## Grundprinzip

Reels dieses Kanals werden **nicht aus extern generierten Bildern zusammengesetzt**.

Der Nutzer liefert nach Freigabe des Skripts ausschließlich das finale Voice-over. Die visuelle Ebene wird vollständig im Repository mit **Remotion + React + SVG/CSS/programmatischen 2D-Komponenten** aufgebaut und animiert.

Standardmäßig verboten für Reels:
- Google Flow / externe Bildgenerierung
- Bild 01 als Master-Referenz
- Serienproduktion von PNG/JPG-Visuals
- `imageBasePath` als Voraussetzung für ein Reel
- statische Slideshow als Standard-Reel

Eine externe Rastergrafik darf nur verwendet werden, wenn der Nutzer sie für ein konkretes Reel ausdrücklich verlangt.

## Produktionsfluss für Reels

1. Thema + Quellen + Claim-Check
2. finales Skript
3. Nutzer liefert finales Voice-over
4. Voice-over auf verbindlichen Audio-Standard bringen
5. Worttimings aus genau diesem finalen Audio ableiten
6. Programmatic Scene Plan erstellen
7. Remotion-Szenen, Animationen, Übergänge und Untertitel aus den Timings bauen
8. `Phase3Reel` in 9:16 rendern
9. Final-QA

Der Nutzer muss keine Bilder liefern.

## Format

- 9:16
- 1080×1920
- 30 fps
- Remotion-Komposition: `Phase3Reel`

## Visuelle Sprache

Die verbindliche Figuren-DNA bleibt **Universal Editorial Stickman World v1.2**:
- alle sichtbaren Menschen sind Stickman-/Minimalfiguren
- runder einfacher Kopf
- minimale Gesichtszüge
- dünne dunkle Gliedmaßen
- kleiner vereinfachter Torso
- klare natürliche Farben
- 2D, kein 3D/CGI, kein Photorealismus

Konsistenz entsteht bei Reels durch wiederverwendbare Komponenten, Design-Tokens und feste Figurenproportionen — nicht durch ein Master-Referenzbild.

## Audio-Synchronität

`word-timings.json` aus dem finalen Audio ist die Zeitquelle für:
- Szenenbeginn
- Szenenende
- Untertitel
- Wort-Highlight
- wichtige Objekt-/Figurenanimationen
- definierte Action-Cues

Ein `actionWord` verweist 1-basiert auf das Wort, bei dessen Start die zentrale Animation eines Beats beginnen soll.

## Untertitel — HARD LOCK

Untertitel sind bei Reels standardmäßig eingebrannt.

- kurze Wortgruppen, standardmäßig 4 Wörter pro Page
- nicht gesprochenes / übriges Wort: weiß
- aktuell gesprochenes Wort: **gelb `#FFD84D`**
- Highlight wechselt anhand der echten Worttimings
- aktuelles Wort darf leicht skalieren/anheben
- hoher Kontrast mit dunklem halbtransparentem Hintergrund
- Safe Area oberhalb der unteren Plattform-UI beachten
- kein zufälliger Farbwechsel

## Animation

Animationen werden mit Remotion-Frametiming gebaut (`useCurrentFrame`, `interpolate`, `spring`).

Bevorzugt:
- klare Character Actions
- Objektbewegungen
- Spotlight/Fokus
- Diagramm-/Vergleichsaufbau
- kleine Kamera-/Layerbewegungen
- Crossfades/Slides zwischen Beats

Nicht verwenden:
- CSS `transition` oder CSS-Keyframe-Animationen als Renderlogik
- hektische Daueranimation ohne Erklärfunktion
- reine Zoom-/Pan-Slideshow als Standard

## Programmatic Scene Plan

Jede Szene enthält mindestens:
- `kind`
- `startWord`
- `endWord`

Optional:
- `actionWord`
- `label`
- `accent`

Unterstützte Basis-Kinds für den aktuellen Test:
- `coffee-spill`
- `crowd-gaze`
- `reality`
- `spotlight`
- `phone`
- `comparison`
- `generic`

Neue Kinds dürfen ergänzt werden, wenn ein neuer Visual Beat eine eigene Darstellung benötigt.

## Test-Komposition

`ProgrammaticReelTest` ist die feste Smoke-/Design-Testkomposition.

Render:
`npm run render:reel:test`

Sie muss ohne externe Bilder funktionieren und mindestens zeigen:
- mehrere programmatische Stickman-Szenen
- sichtbare Übergänge
- wortgenaue Karaoke-Untertitel
- gelbes Active-Word-Highlight
- mindestens eine Animation, die über `actionWord` an ein Worttiming gekoppelt ist

## Priorität

Für `reels/` gilt bei Widersprüchen:

**`rules/FORMAT_LOCK.md` + `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md` > ältere bildbasierte Reel-Texte, Promptreste oder Master-Referenz-Anweisungen.**

`rules/IMAGE_REFERENCE_LOCK.md` gilt weiterhin für bildbasierte Produktion, aber nicht als Voraussetzung für programmatic Reels.
