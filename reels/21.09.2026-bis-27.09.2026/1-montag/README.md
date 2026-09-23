# 1-Montag — Warum greifen wir automatisch zum Handy?

Datum: **21.09.2026**

Status: Style-/Dichte-Pilot in Vorbereitung.

## Inhalt

Kurzer Psychologie-Reel-Test zur Frage, warum Smartphone-Checking teilweise automatisch bzw. habitualisiert ablaufen kann.

## Verbindliches Ausgabeformat

- **9:16**
- **1080×1920**
- **30 fps**
- vertikal / Portrait
- Render-Komposition: `Phase3Reel`
- kein 16:9-Reel

## Audio

- finales Voice-over exakt 1,10×
- führende Stille entfernen
- Pausen ab ungefähr 500 ms deutlich kürzen
- Ziel-Restpause ungefähr 120 ms vor der 1,10×-Beschleunigung
- Wörter niemals abschneiden
- Timings erst aus final verarbeitetem Audio

## Umfang

- ca. 60–90 Sekunden
- 26 Visual Beats / 26 geplante Bilder
- Universal Editorial Stickman World v1.2
- jede sichtbare menschliche Figur bleibt Stickman
- Bild 01 wird zuerst allein in **9:16** erzeugt und als Master-Referenz freigegeben
- Bild 02–26 werden ausschließlich mit Bild 01 als visueller Referenz erzeugt
- Generierung in kontrollierten 5er-Batches

## Bildregeln

- jedes Bild individuell an den aktuell gesprochenen Beat anpassen
- jedes Bild nativ für die vertikale 9:16-Fläche komponieren
- nicht dieselbe Komposition nur leicht verändert wiederholen
- Master-Referenz hält Stil/Stickman-DNA konstant, nicht Pose oder Kamerabild
- sichtbarer Text im Bild nur wenn nötig und dann ausschließlich Deutsch
- wenn Text nicht nötig ist, keinen Text erzwingen
- kein 16:9-Bild nur nachträglich auf 9:16 croppen

## Verbindlicher Bildablauf

1. Bild 01 allein in 9:16 generieren und prüfen.
2. Bild 01 als `00-master-reference.png` freigeben.
3. Batch 1: Bild 02–06 → QA.
4. Batch 2: Bild 07–11 → QA.
5. Batch 3: Bild 12–16 → QA.
6. Batch 4: Bild 17–21 → QA.
7. Batch 5: Bild 22–26 → QA.
8. Kein nächster Batch, solange der vorherige nicht vollständig PASS ist.

Bei jedem Bild 02–26 muss die Master-Referenz mitgegeben werden. Der Szenenprompt bestimmt den Inhalt; Bild 01 bestimmt Figuren-DNA, Linien, Farben, Shading und allgemeinen Illustrationsstil.

## Struktur

- `01-script-audio/` — Skript und Audio
- `02-bilder/` — Bildprompts, Master-Referenz, Bilder, Style-/Continuity-QA
- `03-export/` — Export-/Uploaddaten
- `04-projektdateien/` — Phase-Planung, Timings, Quellen, Claim-Check und Schnittdaten
