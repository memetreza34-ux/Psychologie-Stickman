# IMAGE REFERENCE LOCK

**STATUS: VERBINDLICH**

Ziel: Alle Bilder eines Videos müssen eindeutig wie dieselbe Bildwelt aussehen. Reine Textprompts reichen dafür nicht aus.

## 1. Master-Referenz zuerst

Vor der Seriengenerierung wird genau ein Bild als visuelle Master-Referenz festgelegt.

Verbindlicher Ablauf für jedes Projekt:
1. Bild 01 allein generieren.
2. Bild 01 visuell prüfen.
3. Bild 01 nur freigeben, wenn es bereits **STRICT STICKMAN ONLY** erfüllt.
4. Bild 01 als Master speichern.
5. Bild 02 bis Ende dürfen ohne die freigegebene Master-Referenz nicht final generiert werden.

Für YouTube liegt die sichtbare Master-Datei direkt als `03-bilder/01.png`.

## 2. Was die Referenz sperrt

Die Master-Referenz ist verbindlicher Anker für:
- Stickman-Grundanatomie
- Kopf-/Gesichtsvereinfachung
- Verhältnis von Kopf, Torso, Armen und Beinen
- sehr dünne lineare Arme/Beine
- Hand-/Fußvereinfachung
- Linienart und Linienstärke
- Flächenbehandlung
- Cel-/Illustrations-Shading
- Farbverhalten und Sättigungsniveau
- Detailgrad der Welt
- Verhältnis zwischen sehr einfacher Figur und reichhaltigerer Umgebung
- allgemeine Illustrationsästhetik

Diese Eigenschaften dürfen zwischen Bildern nicht neu interpretiert werden.

## 3. STRICT STICKMAN ONLY — auch im Hintergrund

Alle menschlichen oder menschenähnlichen Figuren müssen dieselbe Stickman-DNA wie der Master verwenden.

Das gilt auch für:
- Nebenfiguren
- Menschenmengen
- Passanten
- Forscher/Versuchspersonen
- historische Figuren
- Personen in Fahrzeugen
- entfernte Mini-Figuren
- Personen auf Screens, Fotos, Postern, Werbung und Plakaten
- Spiegelungen
- Figuren in Erinnerungs-/Gedankenebenen

Nicht zulässig:
- normale Cartoon-Menschen
- semi-realistische Menschen
- fleischige menschliche Arme/Beine
- realistische Hände/Finger
- realistische Nasen/Ohren
- Mischstil: Hauptfigur Stickman, Hintergrund normale Menschen

Wenn auch nur eine sichtbare Person nicht zur Master-Stickman-DNA gehört: **FAIL → neu generieren.**

## 4. Was sich ändern darf

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

## 5. Wiederkehrende Hauptfigur

Wenn dieselbe Figur wiederkehrt, konstant halten:
- Kopf-/Körperproportionen
- Kopf-/Gesichtsstil
- Arm-/Beindicke
- Hand-/Fußvereinfachung
- Kleidung, solange kein Wechsel vorgesehen ist
- Farbmerkmale
- Haare/Brille/Accessoires
- wichtige wiederkehrende Requisiten

## 6. Generierung in 5er-Batches — HARD LOCK

Nach der Freigabe von Bild 01 werden die restlichen Bilder **niemals alle auf einmal** erzeugt.

Verbindlicher Ablauf:
1. Bild 01 allein erzeugen.
2. STOP.
3. Bild 01 visuell prüfen und freigeben.
4. Danach maximal **5 neue Bilder pro Batch** generieren.
5. Für jedes Bild des Batches dieselbe Master-Referenz anhängen.
6. Nach jedem Batch **STOP**.
7. Alle Bilder einzeln gegen Bild 01 und zusätzlich untereinander prüfen.
8. Nur fehlerhafte Bilder regenerieren; gute Bilder behalten.
9. Erst nach vollständigem PASS darf der nächste Batch starten.
10. Bild 01 bleibt Master; spätere Bilder ersetzen ihn nicht.

Ein Agent darf einen nächsten Batch nicht automatisch starten, wenn der aktuelle Batch noch nicht geprüft/freigegeben ist.

## 7. Generierungsregel pro Bild

Für Bild 02 bis Ende:
1. Master-Referenz anhängen.
2. Szenenprompt verwenden.
3. Diese Referenzklausel anwenden:

`Match the attached master reference exactly for true stickman anatomy, character design, head/torso proportions, very thin line-like arms and legs, simple no-finger hands, linework, color treatment, shading and overall illustration style. Change only the scene content, pose, camera, environment, props and lighting required by this prompt. STRICT STICKMAN-ONLY CHECK: every person visible anywhere in foreground, midground, background, screens, posters, reflections, photos or illustrations must use the same stickman anatomy. Do not generate conventional cartoon humans or semi-realistic people.`

4. Ergebnis gegen Master prüfen.
5. Bei Style-/Anatomie-Drift neu generieren.

## 8. Batch-QA

Nach jedem Batch prüfen:
- gleiche runde/ovale einfache Kopfform
- keine realistische Nase/Ohren
- gleicher kleiner vereinfachter Torso
- Arme/Beine weiterhin sehr dünn und linear
- keine fleischigen Gliedmaßen
- keine Fingeranatomie
- gleiche Linienart/-stärke
- gleiche Flächen-/Shading-Logik
- vergleichbares Farbverhalten
- Hauptfigur eindeutig dieselbe Figur
- alle Hintergrundmenschen STRICT STICKMAN ONLY
- keine normale Cartoon-Person auf Screens/Postern/Reflexionen
- trotz verschiedener Perspektiven dieselbe Bildwelt

Wenn ein Bild durchfällt, wird nur dieses Bild mit derselben Master-Referenz neu generiert.

## 9. HARD FAIL

Ein Bild wird verworfen, wenn:
- Stickman-Anatomie sichtbar wechselt
- Kopf-/Torso-Proportionen deutlich wechseln
- dicke normale Cartoon-Arme/-Beine auftauchen
- normale Cartoon-Menschen auftauchen
- Hintergrundfiguren menschlicher wirken als der Master
- realistische Hände/Finger, Nasen oder Ohren auftauchen
- Linien/Shading/Farbwelt ohne Grund in einen anderen Stil driften
- Hauptfigur wie eine andere Figur wirkt
- Umgebung nach 3D, Anime oder Fotorealismus kippt

## 10. Priorität

Bei Konflikt gilt:
**STRICT STICKMAN ONLY + Master-Referenz > generische Stilwörter im Szenenprompt.**

Der Szenenprompt bestimmt, **was** gezeigt wird. Die Master-Referenz bestimmt, **wie** Figuren und Bildwelt aussehen.