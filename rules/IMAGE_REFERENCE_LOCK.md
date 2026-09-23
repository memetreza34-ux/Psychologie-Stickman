# IMAGE REFERENCE LOCK

**STATUS: VERBINDLICH**

Ziel: Alle Bilder eines Videos müssen eindeutig wie dieselbe Bildwelt aussehen. Reine Textprompts reichen dafür nicht aus.

## 1. Master-Referenz zuerst

Vor der Seriengenerierung wird genau ein Bild als visuelle Master-Referenz festgelegt.

Verbindlicher Ablauf für jedes Projekt:
1. Bild 01 allein generieren.
2. Danach STOP und auf Nutzerfreigabe warten.
3. Bild 01 visuell prüfen.
4. Bild 01 nur freigeben, wenn es bereits **STRICT STICKMAN ONLY** erfüllt.
5. Bild 01 als Master speichern.
6. Bild 02 bis Ende dürfen ohne die freigegebene Master-Referenz nicht final generiert werden.

Für YouTube liegt die sichtbare Master-Datei direkt als `03-bilder/01.png`.

**Nur die Master-Referenz benötigt eine Nutzerfreigabe.** Nach Freigabe von Bild 01 läuft die weitere Bildproduktion automatisch in 5er-Batches mit interner QA weiter.

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

## 4. Sichtbarer Text — HARD LOCK

Der Kanal ist deutschsprachig. Prompts dürfen technisch auf Englisch geschrieben sein; das ändert niemals die Sprache im Bild.

Für jedes Bild gilt:
- wenn Text nicht zwingend nötig ist: **kein sichtbarer Text**
- wenn Text nötig ist: **ausschließlich Deutsch**
- niemals englische Überschriften, Labels, Buttons, Karten, Poster, Bildschirmtexte oder UI-Texte erzeugen
- Prompt-Anweisungen auf Englisch dürfen niemals als sichtbarer Bildtext übernommen werden
- pro Bild möglichst nur **ein kurzes Label / eine kurze Phrase**
- Richtwert: **1–4 sichtbare Wörter**, sofern der Inhalt nicht zwingend mehr benötigt
- keine Sätze, Absätze, Infokarten oder textlastigen Erklärtafeln, wenn dieselbe Aussage visuell darstellbar ist
- bei Konflikt zwischen Szenenprompt und dieser Regel: Text verkürzen, ins Deutsche übertragen oder ganz weglassen

QA-Fail:
- sichtbarer englischer Text
- unnötig langer deutscher Text
- mehrere Textblöcke konkurrieren mit dem Hauptmotiv
- Bild erklärt sich hauptsächlich über Text statt über visuelle Handlung

## 5. Was sich ändern darf

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

## 6. Wiederkehrende Hauptfigur

Wenn dieselbe Figur wiederkehrt, konstant halten:
- Kopf-/Körperproportionen
- Kopf-/Gesichtsstil
- Arm-/Beindicke
- Hand-/Fußvereinfachung
- Kleidung, solange kein Wechsel vorgesehen ist
- Farbmerkmale
- Haare/Brille/Accessoires
- wichtige wiederkehrende Requisiten

## 7. Generierung in 5er-Batches — AUTO AFTER MASTER

Nach der Freigabe von Bild 01 werden die restlichen Bilder **nicht alle gleichzeitig**, sondern automatisch in Blöcken von höchstens 5 neuen Bildern erzeugt.

Verbindlicher Ablauf:
1. Bild 01 allein erzeugen.
2. STOP.
3. Bild 01 visuell prüfen und vom Nutzer freigeben lassen.
4. Danach maximal **5 neue Bilder pro Batch** generieren.
5. Für jedes Bild des Batches dieselbe Master-Referenz anhängen.
6. Nach jedem Batch eine **interne Style-/Continuity-/Inhalts-QA** durchführen.
7. Nur fehlerhafte Bilder regenerieren; gute Bilder behalten.
8. Sobald der komplette Batch intern PASS erreicht, **automatisch und ohne Nutzer-Rückfrage** mit dem nächsten 5er-Batch fortfahren.
9. Diesen Ablauf bis zum letzten Bild wiederholen.
10. Bild 01 bleibt Master; spätere Bilder ersetzen ihn nicht.

**Keine Nutzerfreigabe nach jedem 5er-Batch.** Der Nutzer wird nach Bild 01 nicht erneut gefragt.

Nur wenn ein schwerer Fehler nach Regenerationsversuchen nicht automatisch lösbar ist und die Stil-/Kontinuitätskonsistenz gefährdet, darf die Automatik stoppen und nachfragen.

## 8. Generierungsregel pro Bild

Für Bild 02 bis Ende:
1. Master-Referenz anhängen.
2. Szenenprompt verwenden.
3. Diese Referenzklausel anwenden:

`Match the attached master reference exactly for true stickman anatomy, character design, head/torso proportions, very thin line-like arms and legs, simple no-finger hands, linework, color treatment, shading and overall illustration style. Change only the scene content, pose, camera, environment, props and lighting required by this prompt. STRICT STICKMAN-ONLY CHECK: every person visible anywhere in foreground, midground, background, screens, posters, reflections, photos or illustrations must use the same stickman anatomy. Do not generate conventional cartoon humans or semi-realistic people. VISIBLE TEXT RULE: prefer no readable text; when text is necessary it must be short and German only, never English.`

4. Ergebnis gegen Master prüfen.
5. Bei Style-/Anatomie-/Text-Drift neu generieren.

## 9. Batch-QA

Nach jedem Batch intern prüfen:
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
- sichtbarer Text entweder gar nicht vorhanden oder kurz und ausschließlich Deutsch
- keine unnötigen Textblöcke
- trotz verschiedener Perspektiven dieselbe Bildwelt
- Bildinhalt passt exakt zum vorgesehenen Visual Beat

Wenn ein Bild durchfällt, wird nur dieses Bild mit derselben Master-Referenz neu generiert. Wenn alle Bilder PASS sind, startet der nächste Batch automatisch.

## 10. HARD FAIL

Ein Bild wird verworfen, wenn:
- Stickman-Anatomie sichtbar wechselt
- Kopf-/Torso-Proportionen deutlich wechseln
- dicke normale Cartoon-Arme/-Beine auftauchen
- normale Cartoon-Menschen auftauchen
- Hintergrundfiguren menschlicher wirken als der Master
- realistische Hände/Finger, Nasen oder Ohren auftauchen
- sichtbarer Text Englisch ist
- unnötig viel Text die Szene dominiert
- Linien/Shading/Farbwelt ohne Grund in einen anderen Stil driften
- Hauptfigur wie eine andere Figur wirkt
- Umgebung nach 3D, Anime oder Fotorealismus kippt

## 11. Priorität

Bei Konflikt gilt:
**STRICT STICKMAN ONLY + Master-Referenz + Deutsch/Minimal-Text-Regel > generische Stilwörter oder Textwünsche im Szenenprompt.**

Der Szenenprompt bestimmt, **was** gezeigt wird. Die Master-Referenz bestimmt, **wie** Figuren und Bildwelt aussehen.