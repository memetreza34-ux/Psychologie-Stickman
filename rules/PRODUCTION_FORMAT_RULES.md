# PRODUCTION FORMAT RULES

**STATUS: VERBINDLICH**

Zusätzlich gilt `rules/FORMAT_LOCK.md` mit höchster Format-Priorität.

## 1. Zwei getrennte Ausgabeformate

### Reels / Shorts

Für alles unter `reels/` gilt:
- Seitenverhältnis: **9:16**
- Auflösung: **1080×1920**
- Framerate: **30 fps**
- Ausrichtung: vertikal / portrait
- Remotion-Komposition: `Phase3Reel`
- jedes Bild bereits als 9:16-Komposition planen und generieren
- 16:9-Bilder nicht als Standardlösung nachträglich auf 9:16 croppen

### YouTube-Longform

Für alles unter `youtube/` gilt:
- Seitenverhältnis: **16:9**
- Auflösung: **1920×1080**
- Framerate: **30 fps**
- Ausrichtung: horizontal / landscape
- Remotion-Komposition: `Phase3YouTube`
- jedes Bild bereits als 16:9-Komposition planen und generieren

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
- Timings und Bildwechsel erst aus dem final bearbeiteten Audio ableiten

Die 1,10×-Beschleunigung erfolgt erst nach der Pausenbereinigung.

## 3. Sprache in Bildern

- Wenn sichtbarer Text notwendig ist, muss er **Deutsch** sein.
- Keine englischen Überschriften, Labels, Buttons, Schilder oder erklärenden Wörter im finalen Bild, sofern kontrollierbar.
- Wenn Text nicht nötig ist: **gar keinen sichtbaren Text** erzeugen.
- Markenlogos und unnötige UI-Texte vermeiden.
- Bildprompts selbst dürfen auf Englisch formuliert sein.

## 4. Jedes Bild individuell anpassen

Jeder Visual Beat bekommt eine eigene, inhaltlich passende Bildidee.

Verbindlich:
- Bild zeigt exakt den aktuell gesprochenen Gedanken.
- Komposition, Kameradistanz, Handlung, Umgebung, Requisiten, Licht und Fokus werden pro Beat individuell gewählt.
- Kein generisches Standardbild nur mit ausgetauschtem Gegenstand.
- Keine unnötige Wiederholung derselben Pose oder desselben Bildaufbaus.
- Master-Referenz sperrt den **Stil**, nicht die Komposition.
- Keine späteren Informationen vorwegnehmen.
- Keine Füllbilder.

Kurzform:
**Master-Referenz bestimmt WIE. Visual Beat bestimmt WAS. Zielplattform bestimmt das BILDFORMAT.**

## 5. Formatgerechte Komposition

### Reels 9:16
- Motive vertikal staffeln.
- Hauptmotiv ausreichend groß halten.
- wichtige Inhalte nicht an äußerste Ober-/Unterkante setzen.
- bei Gruppen Tiefe und vertikale Ebenen nutzen statt alles horizontal nebeneinanderzustellen.
- Close-ups, Halbtotalen und vertikale Environment Shots bewusst einsetzen.

### YouTube 16:9
- horizontale Breite für Umgebung, Vergleiche und Abläufe nutzen.
- Vordergrund, Mittelgrund und Hintergrund sinnvoll verteilen.
- Raum für leichte Zooms/Pans lassen.

## 6. Final-QA

Vor Export prüfen:
- Reel: **9:16 / 1080×1920 / 30 fps**
- YouTube: **16:9 / 1920×1080 / 30 fps**
- finales Audio tatsächlich 1,10×
- lange Pausen entfernt/gestrafft
- keine abgeschnittenen Wörter
- sichtbarer Text ausschließlich Deutsch oder bewusst gar kein Text
- jedes Bild individuell auf seinen Sprechabschnitt angepasst
- alle Menschen weiterhin Stickman
- Stil bleibt über Master-Referenz konsistent

**HARD FAIL:** Reel in 16:9 oder YouTube-Longform in 9:16.