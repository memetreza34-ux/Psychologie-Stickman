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
- Bilder direkt für 9:16 planen und generieren

### YouTube-Longform
Für alles unter `youtube/` gilt:
- Seitenverhältnis: **16:9**
- Auflösung: **1920×1080**
- Framerate: **30 fps**
- Ausrichtung: horizontal / landscape
- Remotion-Komposition: `Phase3YouTube`
- Bilder direkt für 16:9 planen und generieren

## 2. Voice-over / Geschwindigkeit

Verbindlich für beide Formate:
- finales Voice-over: **exakt 1,10×**
- Tonhöhe erhalten
- führende Stille entfernen
- Wörter niemals abschneiden
- Pausen ab ungefähr 500 ms deutlich kürzen
- Ziel-Restpause nach Kürzung ungefähr 120 ms
- Timings und Bildwechsel erst aus dem final bearbeiteten Audio ableiten

## 3. Google-Flow-Quellbilder — textfrei

Für beide Formate gilt standardmäßig:
- keine lesbaren Wörter oder Buchstaben im generierten Quellbild
- keine UI-Texte, Labels, Untertitel, Poster- oder Bildschirmtexte
- keine englischen Promptwörter im Bild
- Karten, Screens und Dokumente mit abstrakten Linien/Formen/Icons darstellen

Deutsche Begriffe werden kontrolliert in Remotion über `sceneLabels` hinzugefügt.

Nur eine ausdrücklich begründete Szene darf Text direkt im Bild anfordern. Dann muss der exakte deutsche Wortlaut vorgegeben sein.

## 4. Jedes Bild individuell anpassen

Jeder Visual Beat bekommt eine eigene passende Bildidee.

Verbindlich:
- Bild zeigt exakt den aktuell gesprochenen Gedanken
- konkrete Stickman-Handlung in glaubwürdiger Umgebung bevorzugen
- abstrakte Infografik nur nutzen, wenn sie den Inhalt klarer macht
- Komposition, Kameradistanz, Handlung, Umgebung, Requisiten, Licht und Fokus pro Beat individuell wählen
- kein generisches Standardbild nur mit ausgetauschtem Gegenstand
- keine unnötige Wiederholung derselben Pose oder desselben Bildaufbaus
- Master-Referenz sperrt den Stil, nicht die Komposition
- keine späteren Informationen vorwegnehmen
- keine Füllbilder

Kurzform:
**Master bestimmt WIE. Visual Beat bestimmt WAS. Zielplattform bestimmt FORMAT. Remotion kontrolliert Text.**

## 5. Formatgerechte Komposition

### Reels 9:16
- Motive vertikal staffeln
- Hauptmotiv groß genug halten
- wichtige Inhalte nicht an äußerste Ober-/Unterkante setzen
- Close-ups, Halbtotalen und vertikale Environment Shots bewusst einsetzen

### YouTube 16:9
- horizontale Breite für Umgebung, Vergleiche und Abläufe nutzen
- Vordergrund, Mittelgrund und Hintergrund sinnvoll verteilen
- Raum für leichte Zooms/Pans und geplante Overlays lassen

## 6. Final-QA

Vor Export prüfen:
- Reel: **9:16 / 1080×1920 / 30 fps**
- YouTube: **16:9 / 1920×1080 / 30 fps**
- finales Audio tatsächlich 1,10×
- lange Pausen entfernt/gestrafft
- keine abgeschnittenen Wörter
- Flow-Quellbilder enthalten keinen unbeabsichtigten lesbaren Text
- deutsche Remotion-Labels sind korrekt geschrieben und bewusst gesetzt
- jedes Bild ist individuell auf seinen Sprechabschnitt angepasst
- alle Menschen weiterhin echte Stickmen
- Stil bleibt über Master-Referenz konsistent

**HARD FAIL:** Reel in 16:9 oder YouTube-Longform in 9:16.
