# PRODUCTION FORMAT RULES

**STATUS: VERBINDLICH**

Zusätzlich gilt `rules/FORMAT_LOCK.md` mit höchster Format-Priorität.
Für YouTube-Text gilt `rules/TEXT_OVERLAY_LOCK.md`.

## 1. Zwei getrennte Ausgabeformate

### Reels / Shorts
- 9:16
- 1080×1920
- 30 fps
- Remotion: `Phase3Reel`

### YouTube-Longform
- 16:9
- 1920×1080
- 30 fps
- Remotion: `Phase3YouTube`

## 2. Voice-over

- finales Voice-over exakt 1,10×
- Tonhöhe erhalten
- führende Stille entfernen
- Wörter niemals abschneiden
- lange Pausen deutlich straffen
- Timings erst aus final bearbeitetem Audio ableiten

## 3. YouTube-Textregel — GOOGLE FLOW ONLY

Für neue YouTube-Projekte:

**Sämtlicher sichtbarer Text wird direkt von Google Flow in die Bilder gerendert. Remotion erzeugt keinen sichtbaren Text.**

### Szene 01
- exakter deutscher Cover-Titel direkt in `01.png`
- 2–7 Wörter
- kein weiterer lesbarer Text

### Ausgewählte spätere Szenen
- exakter deutscher Keyword-/Merksatz direkt im Google-Flow-Bild
- maximal 5 Wörter
- kein zusätzlicher lesbarer Text

### Alle anderen Szenen
- ZERO READABLE TEXT
- keine UI-Texte, Labels, Untertitel, Poster- oder Bildschirmtexte
- Karten, Screens und Dokumente abstrakt

### Dichte
- Ziel meist 15–25 % sichtbare Textmomente inklusive Cover
- harte Obergrenze 30 %

### Remotion
- `sceneLabels: []`
- keine YouTube-Auto-Captions
- `renderGermanLabelsInRemotion: false`
- nur Schnitt, Audio, technische Bildbewegung und Export

## 4. Jedes Bild individuell anpassen

- exakt den aktuell gesprochenen Gedanken zeigen
- konkrete Stickman-Handlung bevorzugen
- abstrakte Infografik nur wenn klarer
- Kamera, Handlung, Umgebung, Requisiten, Licht und Fokus pro Beat individuell wählen
- keine unnötige Wiederholung
- Master sperrt Stil, nicht Komposition oder Figurenidentität
- keine späteren Informationen vorwegnehmen
- bei Textszenen sichere Typografiezone direkt für Flow einplanen

Kurzform:
**Master bestimmt WIE. Visual Beat bestimmt WAS. Google Flow erzeugt Bild UND alle sichtbaren YouTube-Texte. Remotion schneidet und rendert nur.**

## 5. Formatgerechte Komposition

### Reels 9:16
- Motive vertikal staffeln
- Hauptmotiv groß genug halten

### YouTube 16:9
- horizontale Breite nutzen
- Vordergrund, Mittelgrund und Hintergrund sinnvoll verteilen
- Szene 01 mit klarer Thumbnail-Hierarchie und integrierter Titelzone komponieren

## 6. Final-QA

Vor Export prüfen:
- Reel: 9:16 / 1080×1920 / 30 fps
- YouTube: 16:9 / 1920×1080 / 30 fps
- finales Audio 1,10×
- keine abgeschnittenen Wörter im Audio
- alle geplanten deutschen Flow-Texte exakt, vollständig und lesbar
- keine zusätzlichen oder englischen Wörter
- alle nicht geplanten Textszenen textfrei
- Remotion enthält keine YouTube-Labels/Captions
- Textdichte maximal 30 %
- alle Menschen echte Stickmen
- Stil bleibt über Master konsistent

**HARD FAIL:** Reel in 16:9 oder YouTube-Longform in 9:16.
