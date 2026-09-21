# CANONICAL RULES — STICKMAN YOUTUBE

## Kanal

YouTube-Longform-Erklärkanal.

**Themen-/Kanalpositionierung: UNSET.**

Keine frühere Themen-Nische aus dem Quell-Repository voraussetzen oder rekonstruieren. Neue Themenregeln werden erst durch ausdrückliche Nutzerentscheidung festgelegt.

## Longform

- mindestens 10:00 Minuten final, sofern das gewählte Thema diese Länge sinnvoll trägt
- Ziel meist 11–14 Minuten
- kein Fülltext
- eine klare Leitfrage pro Video
- konkrete Beispiele bevorzugen, wenn sie das Verständnis verbessern
- sensible oder umstrittene Fakten sauber belegen

## Skript

- starker Einstieg statt Begrüßungsfloskel
- wenn möglich konkrete Situation / Konsequenz statt leerer Einleitung
- klare Einleitung, Hauptteil, Schluss
- Ursache → Wirkung erklären
- Kontraste, Callbacks und Metaphern gezielt einsetzen
- keine künstlichen Cliffhanger oder unbelegten Superlative

## Audio

- final 1,10×
- führende Stille entfernen
- Pausen ab ungefähr 500 ms deutlich straffen
- Wörter nicht anschneiden
- Wort-Timings ausschließlich aus final verarbeitetem Audio

## Phasen

1. Thema + Quellen + Claim-Check
2. finales `script.txt`
3. Phase 1: **Visual Beats**
4. Phase 1 Density-QA
5. Phase 2: finale Assets + finales Audio
6. Phase 3: Timings, Mapping, Render
7. Final-QA

## Visual-Beat-Prinzip

Verbindlich: `channels/dinge-erklaert/youtube/YOUTUBE_VISUAL_BEAT_RULES.md`

Dieses Format lebt von vielen präzisen Bildern:
- ein wichtiger visueller Gedanke = grundsätzlich ein eigenes Bild
- neuer Fakt, Ort, Akteur, Objekt, relevante Zahl, Handlung, Ursache-Folge-Schritt oder Mechanismusschritt = neuer Beat, wenn sich das Bild inhaltlich ändern muss
- keine 20–30-Sekunden-Sammelbilder für mehrere Aussagen
- Bilder dürfen spätere Informationen nicht vorwegnehmen
- Ziel meist 8–18 gesprochene Wörter pro Beat
- Durchschnitt höchstens 18 Wörter pro Szene
- harte Obergrenze 28 Wörter pro Szene
- bei 10–14 Minuten sind häufig ungefähr 90–150 Bilder sinnvoll; Inhalt entscheidet, nicht eine starre Quote

`npm run qa:visual-density` muss für Produktionsprojekte bestehen.

## Bildwelt

**Noch nicht festgelegt.**

Die alte Bildwelt des Quell-Repos ist ausdrücklich nicht kanonisch. Keine konkrete Figurenart, Farblogik, Prompt-DNA oder Bildsprache voraussetzen, bevor der Nutzer sie festlegt.

Technisch bereits fest:
- 16:9 / 1920×1080 / 30 fps
- filmische Kontinuität
- Bilder erklären den aktuell gesprochenen Inhalt statt nur zu dekorieren
- sachlich, verständlich und nicht irreführend visualisieren

## Schluss-Hold

Standard: ungefähr 1,0 Sekunde nach dem letzten gesprochenen Wort.
