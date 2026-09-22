# PRODUCTION FORMAT RULES

**STATUS: VERBINDLICH**

Zusätzlich gilt `rules/FORMAT_LOCK.md` mit höchster Format-Priorität. Für Reels gilt außerdem `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`.

## 1. Zwei getrennte Ausgabeformate

### Reels / Shorts

Für alles unter `reels/` gilt:
- Seitenverhältnis: **9:16**
- Auflösung: **1080×1920**
- Framerate: **30 fps**
- Ausrichtung: vertikal / portrait
- Remotion-Komposition: `Phase3Reel`
- visuelle Ebene standardmäßig vollständig programmatic in Remotion
- keine externe PNG/JPG-Serie als Voraussetzung
- keine 16:9-Bilder nachträglich auf 9:16 croppen

### YouTube-Longform

Für alles unter `youtube/` gilt:
- Seitenverhältnis: **16:9**
- Auflösung: **1920×1080**
- Framerate: **30 fps**
- Ausrichtung: horizontal / landscape
- Remotion-Komposition: `Phase3YouTube`
- bildbasierte Visuals werden bereits als 16:9-Komposition geplant/generiert

## 2. Voice-over / Geschwindigkeit

Verbindlich für beide Formate:
- finales Voice-over: **exakt 1,10×**
- Tonhöhe erhalten
- führende Stille entfernen
- Wörter niemals abschneiden
- keine langen Leerstellen zwischen Sätzen
- kurze natürliche Pausen bleiben erhalten
- Pausen ab ungefähr **500 ms** deutlich kürzen
- Ziel-Restpause nach Kürzung: ungefähr **120 ms**, bevor 1,10× angewendet wird
- Timings erst aus dem final bearbeiteten Audio ableiten

Die 1,10×-Beschleunigung erfolgt erst nach der Pausenbereinigung.

## 3. Sichtbarer Text

- Erklärender sichtbarer Text muss **Deutsch** sein.
- Keine unnötigen englischen Labels, Buttons oder Schilder.
- Markenlogos und unnötige UI-Texte vermeiden.
- Reel-Untertitel sind davon ausgenommen: sie geben den deutschen Sprechtext wieder und werden timinggenau gerendert.

## 4. Visual Beats individuell umsetzen

Jeder Visual Beat bekommt eine eigene, inhaltlich passende Darstellung.

### Reels
- Visual Beat = eigene programmatic Remotion-Szene oder klarer Animationsschritt.
- Komposition, Pose, Handlung, Requisiten, Layer, Fokus und Bewegung werden pro Beat angepasst.
- `actionWord` koppelt wichtige Animationen an konkrete Worttimings.
- keine reine Zoom-/Pan-Slideshow als Standard.
- keine Füllanimationen ohne Erklärfunktion.

### YouTube
- Visual Beat darf als eigenes Bild umgesetzt werden.
- Master-Referenz hält bei bildbasierter Produktion den Stil konsistent.
- keine späteren Informationen vorwegnehmen.

## 5. Reel-Untertitel

- standardmäßig eingebrannt
- kurze Wortgruppen, standardmäßig 4 Wörter
- aktuell gesprochenes Wort: **gelb `#FFD84D`**
- übrige Wörter: weiß
- Wechsel exakt aus `word-timings.json`
- Safe Area oberhalb der unteren Plattform-UI
- hoher Kontrast auf dunklem halbtransparentem Hintergrund

## 6. Formatgerechte Komposition

### Reels 9:16
- Motive vertikal staffeln.
- Hauptmotiv ausreichend groß halten.
- wichtige Inhalte nicht an äußerste Ober-/Unterkante setzen.
- bei Gruppen Tiefe und vertikale Ebenen nutzen.
- Close-ups, Halbtotalen und vertikale Environment Shots bewusst einsetzen.

### YouTube 16:9
- horizontale Breite für Umgebung, Vergleiche und Abläufe nutzen.
- Vordergrund, Mittelgrund und Hintergrund sinnvoll verteilen.
- Raum für leichte Zooms/Pans lassen.

## 7. Final-QA

Vor Export prüfen:
- Reel: **9:16 / 1080×1920 / 30 fps**
- YouTube: **16:9 / 1920×1080 / 30 fps**
- finales Audio tatsächlich 1,10×
- lange Pausen entfernt/gestrafft
- keine abgeschnittenen Wörter
- Reel-Untertitel timinggenau; Active Word gelb
- zentrale Reel-Animationen folgen den vorgesehenen Audio-Cues
- alle Menschen weiterhin Stickman
- Reel benutzt standardmäßig keine extern generierte Bildserie

**HARD FAIL:** Reel in 16:9, YouTube-Longform in 9:16 oder ein Reel, das entgegen dem Programmatic-Lock wieder von externen Serienbildern abhängt.
