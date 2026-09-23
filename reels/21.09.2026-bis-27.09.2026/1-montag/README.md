# 1-Montag — Warum greifen wir automatisch zum Handy?

Datum: **21.09.2026**

Status: Style-/Dichte-Pilot in Vorbereitung.

## Inhalt

Kurzer Psychologie-Reel-Test zur Frage, warum Smartphone-Checking teilweise automatisch bzw. habitualisiert ablaufen kann.

## Umfang

- ca. 60–90 Sekunden
- 26 Visual Beats / 26 geplante Bilder
- Universal Editorial Stickman World v1.2
- jede sichtbare menschliche Figur bleibt Stickman
- Bild 01 wird zuerst allein erzeugt und als Master-Referenz freigegeben
- Bild 02–26 werden ausschließlich mit Bild 01 als visueller Referenz erzeugt
- Generierung in kontrollierten 5er-Batches

## Verbindlicher Bildablauf

1. Bild 01 allein generieren und prüfen.
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
