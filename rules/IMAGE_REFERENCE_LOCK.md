# IMAGE REFERENCE LOCK

**STATUS: VERBINDLICH**

Ziel: Alle Bilder eines Videos müssen eindeutig wie dieselbe Bildwelt aussehen. Reine Textprompts reichen dafür nicht aus.

## 1. Master-Referenz zuerst

Vor der Seriengenerierung wird genau ein Bild als visuelle Master-Referenz festgelegt.

Für den aktuellen Reel-Pilot gilt:
- Szene/Bild 01 wird zuerst alleine generiert.
- Bild 01 muss vor allen anderen Bildern visuell geprüft und freigegeben werden.
- Erst nach Freigabe wird Bild 01 als `00-master-reference.png` gespeichert bzw. bei der Bildgenerierung als Referenz angehängt.
- Bild 02 bis Ende dürfen ohne die freigegebene Master-Referenz nicht final generiert werden.

Für zukünftige Projekte darf alternativ vor Szene 01 ein eigenes `00-master-reference` erzeugt werden, wenn Szene 01 stilistisch nicht genug von Figur und Welt zeigt.

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

Diese Eigenschaften dürfen zwischen Bildern nicht neu interpretiert werden.

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

Trotzdem muss das Ergebnis klar aus derselben Stickman-Welt stammen.

## 4. Wiederkehrende Hauptfigur

Wenn dieselbe Figur wiederkehrt, zusätzlich zur Stilreferenz konstant halten:
- Kopf-/Körperproportionen
- Kleidung, solange kein Wechsel vorgesehen ist
- Farbmerkmale
- Haare/Brille/Accessoires
- Smartphone bzw. wichtige wiederkehrende Requisiten

## 5. Generierungsregel

Für Bild 02 bis Ende:
1. Master-Referenz als Bildreferenz anhängen.
2. Szenenprompt verwenden.
3. Explizit verlangen: `Match the attached master reference exactly for character design, linework, color treatment, shading and overall illustration style. Change only the scene content, pose, camera and environment required by this prompt.`
4. Ergebnis gegen Master-Referenz prüfen.
5. Bei erkennbarem Stil-Drift neu generieren.

## 6. HARD FAIL

Ein Bild wird verworfen, wenn:
- Stickman plötzlich andere Anatomie hat
- Kopf-/Torso-Proportionen deutlich wechseln
- normale Cartoon-Menschen auftauchen
- Linien plötzlich dicker/dünner oder anders gezeichnet wirken
- Farbwelt ohne inhaltlichen Grund komplett kippt
- Shading/Rendering in einen anderen Stil driftet
- dasselbe Hauptmotiv wie eine andere Figur wirkt
- die Umgebung plötzlich nach 3D, Anime, Fotorealismus oder einem anderen Illustrationssystem aussieht

## 7. Priorität

Bei Konflikt gilt:
**Master-Referenz > generische Stilwörter im Szenenprompt.**

Der Szenenprompt bestimmt, was gezeigt wird. Die Master-Referenz bestimmt, wie es aussieht.
