# IMAGE REFERENCE LOCK

**STATUS: VERBINDLICH FÜR BILDBASIERTE PRODUKTION**

## Geltungsbereich

Diese Regel gilt für Projekte, die tatsächlich eine Serie externer Bildassets erzeugen, insbesondere bildbasierte YouTube-Produktion.

**Sie gilt nicht als Produktionsvoraussetzung für programmatic Reels unter `reels/`.** Reels folgen `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md` und halten ihre visuelle Konsistenz über wiederverwendbare React/SVG-Komponenten und Design-Tokens.

Wenn der Nutzer für ein konkretes Reel ausdrücklich externe Bildassets verlangt, darf diese Regel ausnahmsweise auch dort aktiviert werden.

## 1. Master-Referenz zuerst

Vor der Seriengenerierung wird genau ein Bild als visuelle Master-Referenz festgelegt.

- Bild 01 oder ein explizites `00-master-reference` wird zuerst alleine generiert.
- Das Masterbild muss vor allen Folgeassets visuell geprüft und freigegeben werden.
- Folgeassets dürfen ohne die freigegebene Master-Referenz nicht final generiert werden.

## 2. Was die Referenz sperrt

Die Master-Referenz ist verbindlicher Anker für:
- Stickman-Grundanatomie
- Kopf-/Gesichtsvereinfachung
- Verhältnis von Kopf, Torso, Armen und Beinen
- Linienart und Linienstärke
- Flächenbehandlung
- Cel-/Illustrations-Shading
- Farbverhalten und Sättigungsniveau
- Detailgrad der Welt
- Verhältnis zwischen einfacher Figur und reichhaltigerer Umgebung
- allgemeine Illustrationsästhetik

## 3. Was sich ändern darf

Je Szene dürfen sich ändern:
- Pose und Handlung
- Kamerawinkel und Bildausschnitt
- Ort und Architektur
- Tageszeit und Lichtstimmung
- Requisiten
- Kleidung, wenn Handlung/Epoche es verlangt
- Epoche
- abstrakter oder konkreter Darstellungsmodus

## 4. Wiederkehrende Hauptfigur

Wenn dieselbe Figur wiederkehrt, konstant halten:
- Kopf-/Körperproportionen
- Kleidung, solange kein Wechsel vorgesehen ist
- Farbmerkmale
- Haare/Brille/Accessoires
- wichtige wiederkehrende Requisiten

## 5. Generierung in 5er-Batches

Nach Freigabe des Masterbilds werden höchstens fünf neue Bilder pro Batch erzeugt.

1. Masterbild alleine erzeugen und freigeben.
2. Maximal fünf neue Bilder generieren.
3. Jedes Bild erhält dieselbe Master-Referenz.
4. Batch einzeln gegen Master und untereinander prüfen.
5. Nur fehlerhafte Bilder neu generieren.
6. Nächster Batch erst nach vollständigem PASS.

## 6. Batch-QA

Prüfen:
- gleiche Stickman-Grundanatomie
- gleiche Linienlogik
- gleiche Flächen-/Shading-Logik
- vergleichbares Farbverhalten
- wiederkehrende Hauptfigur eindeutig konsistent
- alle Hintergrundmenschen ebenfalls Stickman
- keine 3D-, Anime- oder Fotorealismus-Drifts

## 7. HARD FAIL

Ein Bild wird verworfen, wenn:
- Stickman-Anatomie deutlich wechselt
- normale Cartoon-Menschen auftauchen
- Linien-/Shading-System kippt
- Farbwelt ohne inhaltlichen Grund komplett wechselt
- wiederkehrende Hauptfigur wie eine andere Figur wirkt
- die Umgebung in 3D, Anime oder Fotorealismus driftet

## 8. Priorität

Für bildbasierte Produktion gilt:
**Master-Referenz > generische Stilwörter im Szenenprompt.**

Für programmatic Reels gilt stattdessen `rules/REEL_PROGRAMMATIC_VISUAL_RULES.md`.
