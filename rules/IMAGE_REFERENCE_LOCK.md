# IMAGE REFERENCE LOCK

**STATUS: VERBINDLICH**

Ziel: Alle Bilder eines Videos müssen eindeutig wie dieselbe Bildwelt aussehen. Reine Textprompts reichen dafür nicht aus.

## 1. Master-Referenz zuerst

Für jedes Projekt:
1. Bild 01 allein generieren.
2. Danach STOP und Nutzerfreigabe abwarten.
3. Bild 01 visuell prüfen.
4. Nur freigeben, wenn STRICT STICKMAN ONLY, Welt-DNA, Textfreiheit und Bildklarheit erfüllt sind.
5. Bild 01 als Master speichern.
6. Bild 02 bis Ende immer mit der freigegebenen Master-Referenz generieren.

Für YouTube liegt der Master als `03-bilder/01.png`.

**Nur Bild 01 benötigt Nutzerfreigabe.** Danach läuft die Produktion automatisch in 5er-Batches mit interner QA.

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
- Verhältnis zwischen einfacher Figur und reichhaltiger Umgebung
- allgemeine Illustrationsästhetik

Nicht gesperrt sind Pose, Handlung, Kamera, Ort, Licht und Komposition.

## 3. STRICT STICKMAN ONLY — auch im Hintergrund

Alle menschlichen oder menschenähnlichen Figuren müssen dieselbe Stickman-DNA wie der Master verwenden. Das gilt auch für Nebenfiguren, Passanten, Menschenmengen, Forscher, historische Figuren, Personen in Fahrzeugen, entfernte Mini-Figuren, Screens, Fotos, Poster, Werbung, Spiegelungen und Erinnerungsbilder.

Nicht zulässig:
- normale Cartoon-Menschen
- semi-realistische Menschen
- fleischige menschliche Arme/Beine
- realistische Hände/Finger
- realistische Nasen/Ohren
- Mischstil zwischen Hauptfigur und Hintergrund

Wenn eine sichtbare Person nicht zur Master-Stickman-DNA gehört: **FAIL → neu generieren.**

## 4. FLOW-QUELLBILDER — ZERO READABLE TEXT

Google-Flow-Quellbilder werden standardmäßig **ohne lesbaren Text** erzeugt.

HARD LOCK:
- keine Buchstaben
- keine Wörter
- keine Labels
- keine UI-Texte
- keine Untertitel
- keine Poster-/Werbetexte
- keine Bildschirmtexte
- keine zufälligen englischen Promptwörter

Deutsche Begriffe werden standardmäßig **erst in Remotion** als kontrollierte Overlays gesetzt. Das ist zuverlässiger als generierter Bildtext.

Nur wenn Text physisch Teil der Szene sein muss und nicht sinnvoll als Overlay gesetzt werden kann, darf der Szenenplan eine Ausnahme definieren. Dann muss er den **exakten deutschen Wortlaut** enthalten und möglichst auf 1–4 Wörter begrenzt sein.

QA-Fail:
- irgendein unbeabsichtigter lesbarer Text im Flow-Quellbild
- englischer Text
- erfundene UI-/Poster-/Kartenwörter
- Text dominiert die Erklärung statt der visuellen Handlung

## 5. Konkrete Szene vor generischer Infografik

Die Master-Referenz darf nicht dazu führen, dass nur dieselbe abstrakte Komposition wiederholt wird.

Bevorzugt:
1. konkrete Stickman-Handlung in glaubwürdiger Umgebung
2. einfache visuelle Metapher
3. Diagramm/Skala/Karte nur, wenn sie inhaltlich klarer ist

Wiederkehrende Karten, Meter, Waagen oder Pfade dürfen nicht zur Standardkomposition des ganzen Videos werden.

## 6. Wiederkehrende Hauptfigur

Konstant halten:
- Kopf-/Körperproportionen
- Kopf-/Gesichtsstil
- Arm-/Beindicke
- Hand-/Fußvereinfachung
- Kleidung, solange kein Wechsel vorgesehen ist
- Farbmerkmale
- Haare/Brille/Accessoires
- wichtige wiederkehrende Requisiten

## 7. Generierung in 5er-Batches — AUTO AFTER MASTER

1. Bild 01 allein erzeugen.
2. STOP.
3. Bild 01 visuell prüfen und vom Nutzer freigeben lassen.
4. Danach maximal 5 neue Bilder pro Batch generieren.
5. Für jedes Bild dieselbe Master-Referenz anhängen.
6. Nach jedem Batch interne Style-/Continuity-/Inhalts-QA durchführen.
7. Nur fehlerhafte Bilder regenerieren; bestandene Bilder behalten.
8. Sobald der ganze Batch PASS erreicht, automatisch mit dem nächsten Batch fortfahren.
9. Bis zum letzten Bild wiederholen.
10. Bild 01 bleibt Master.

Keine Nutzerfreigabe nach normalen Batches.

## 8. Referenzklausel pro Bild

Für Bild 02 bis Ende:

`Match the attached master reference exactly for true stickman anatomy, character design, head/torso proportions, very thin line-like arms and legs, simple no-finger hands, linework, color treatment, shading and overall illustration style. Change only the scene content, pose, camera, environment, props and lighting required by this prompt. STRICT STICKMAN-ONLY CHECK: every person visible anywhere in foreground, midground, background, screens, posters, reflections, photos or illustrations must use the same stickman anatomy. Do not generate conventional cartoon humans or semi-realistic people. PREFER A CONCRETE STICKMAN ACTION IN A BELIEVABLE SETTING OVER A GENERIC INFOGRAPHIC. SOURCE IMAGE TEXT POLICY: render zero readable text, zero letters, zero labels, zero UI words and zero captions. German labels are normally added later in Remotion.`

## 9. Batch-QA

Nach jedem Batch intern prüfen:
- gleiche einfache Kopfform
- keine realistische Nase/Ohren
- gleicher kleiner Torso
- Arme/Beine sehr dünn und linear
- keine fleischigen Gliedmaßen
- keine Fingeranatomie
- gleiche Linien-/Shading-Logik
- vergleichbares Farbverhalten
- Hauptfigur eindeutig dieselbe Figur
- alle Hintergrundmenschen STRICT STICKMAN ONLY
- kein 3D-/Anime-/Fotorealismus-Drift
- **kein unbeabsichtigter lesbarer Text im Quellbild**
- Bildinhalt passt exakt zum Visual Beat
- Bild ist nicht unnötig infografikartig oder überladen

Wenn ein Bild durchfällt, wird nur dieses Bild neu generiert.

## 10. HARD FAIL

Ein Bild wird verworfen, wenn:
- Stickman-Anatomie sichtbar wechselt
- Kopf-/Torso-Proportionen deutlich wechseln
- normale Cartoon-Menschen auftauchen
- realistische Hände/Finger, Nasen oder Ohren auftauchen
- unbeabsichtigter sichtbarer Text auftaucht
- englischer Text auftaucht
- Linien/Shading/Farbwelt ohne Grund driften
- Hauptfigur wie eine andere Figur wirkt
- Umgebung nach 3D, Anime oder Fotorealismus kippt
- das Bild wie eine generische Infografik wirkt, obwohl eine klare konkrete Szene möglich wäre

## 11. Priorität

Bei Konflikt gilt:
**STRICT STICKMAN ONLY + Master-Referenz + textfreies Flow-Quellbild + konkrete Visualisierung > generische Stilwörter oder Textwünsche im Szenenprompt.**

Der Szenenprompt bestimmt **was** gezeigt wird. Der Master bestimmt **wie** Figuren und Bildwelt aussehen. Remotion kontrolliert sichtbare deutsche Texte.
