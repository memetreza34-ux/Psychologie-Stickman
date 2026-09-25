# IMAGE REFERENCE LOCK

**STATUS: VERBINDLICH**

Ziel: Alle Bilder eines Videos müssen eindeutig wie dieselbe Bildwelt aussehen, ohne dadurch immer denselben Charakter, dieselbe Kleidung oder dieselbe Szene zu kopieren.

## 1. Master-Referenz zuerst

Für jedes YouTube-Projekt:
1. Bild 01 allein generieren.
2. Bild 01 enthält den **exakten deutschen Cover-Titel** direkt aus Google Flow.
3. STOP und Nutzerfreigabe abwarten.
4. Bild 01 visuell prüfen.
5. Nur freigeben, wenn STRICT STICKMAN ONLY, Welt-DNA, Cover-Klarheit und **exakte Titel-Schreibweise** erfüllt sind.
6. Bild 01 als Master speichern.
7. Bild 02 bis Ende immer mit der freigegebenen Master-Referenz generieren.

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
- allgemeine Illustrationsästhetik

**Nicht gesperrt** sind:
- Figurenidentität
- Kleidung und Farben einzelner Figuren
- Rolle/Beruf
- Anzahl der Figuren
- Pose und Handlung
- Kamera und Bildausschnitt
- Ort und Architektur
- Licht/Tageszeit
- Requisiten
- Komposition
- sichtbarer Cover-Titel: dieser gehört **nur zu Szene 01** und darf nicht in Folgebilder kopiert werden

Kurz:
**Master = Stil- und Anatomie-Referenz, nicht Charakter- oder Text-Klonvorlage.**

## 3. STRICT STICKMAN ONLY — auch im Hintergrund

Alle menschlichen oder menschenähnlichen Figuren müssen dieselbe Stickman-DNA wie der Master verwenden. Das bedeutet dieselbe Grundanatomie und denselben Zeichen-/Renderingstil, nicht dieselbe Person.

Das gilt auch für Nebenfiguren, Passanten, Menschenmengen, Forscher, historische Figuren, Personen in Fahrzeugen, entfernte Mini-Figuren, Screens, Fotos, Poster, Werbung, Spiegelungen und Erinnerungsbilder.

Nicht zulässig:
- normale Cartoon-Menschen
- semi-realistische Menschen
- fleischige menschliche Arme/Beine
- realistische Hände/Finger
- realistische Nasen/Ohren
- Mischstil zwischen Hauptfigur und Hintergrund

Wenn eine sichtbare Person nicht zur Master-Stickman-DNA gehört: **FAIL → neu generieren.**

## 4. FLOW-TEXTREGEL

### Szene 01 — COVER TITLE EXCEPTION

Google Flow rendert genau den vorher festgelegten deutschen `coverHeadline` direkt in das Cover.

Verbindlich:
- 2–7 Wörter
- exakter Wortlaut
- korrekte Umlaute/Satzzeichen
- gut lesbare Thumbnail-Typografie
- **kein weiterer lesbarer Text**

Wenn der Titel fehlt, falsch geschrieben oder unlesbar ist: **FAIL → Szene 01 neu generieren.**

### Szene 02+

Google-Flow-Quellbilder werden standardmäßig **ZERO READABLE TEXT** erzeugt:
- keine Buchstaben
- keine Wörter
- keine Labels
- keine UI-Texte
- keine Untertitel
- keine Poster-/Werbetexte
- keine Bildschirmtexte
- keine zufälligen englischen Promptwörter

Deutsche Keywords ausgewählter späterer Szenen werden in Remotion gesetzt.

QA-Fail:
- Szene 01: Cover-Titel nicht exakt oder zusätzlicher Text
- Szene 02+: irgendein unbeabsichtigter lesbarer Text
- englischer Text
- erfundene UI-/Poster-/Kartenwörter

## 5. Konkrete Szene vor generischer Infografik

Bevorzugt:
1. konkrete Stickman-Handlung in glaubwürdiger Umgebung
2. einfache visuelle Metapher
3. Diagramm/Skala/Karte nur, wenn klarer

Wiederkehrende Karten, Meter, Waagen oder Pfade dürfen nicht zur Standardkomposition werden.

## 6. CAST- UND SZENENVIELFALT — HARD LOCK

Vor jeder Szene bewusst entscheiden:
- Cast: 1, 2, 3 oder 4 Stickmen?
- Rolle: Wer passt inhaltlich?
- Ort: Welche Umgebung erklärt den Gedanken?
- Handlung: Was passiert sichtbar?
- Kamera: Welcher Blickwinkel macht den Beat klar?

Nicht als Default erlaubt:
- immer dieselbe Figur aus Bild 01
- immer derselbe Hoodie
- immer derselbe Schreibtisch
- immer derselbe Raum
- immer dieselbe neutrale Pose
- immer derselbe Medium Shot

Eine bestimmte Figur bleibt nur dann dieselbe, wenn echte Kontinuität nötig ist.

## 7. Lokale Figurenkontinuität

Bei ausdrücklich derselben Person innerhalb einer zusammenhängenden Sequenz konstant halten:
- Kopf-/Körperproportionen
- Gesichtsstil
- Arm-/Beindicke
- Hand-/Fußvereinfachung
- Kleidung/Farben
- relevante Accessoires

Diese Regel gilt lokal, nicht automatisch für das gesamte Video.

## 8. Generierung in 5er-Batches

1. Bild 01 allein erzeugen — inklusive exaktem Cover-Titel.
2. STOP.
3. Nutzer prüft Cover, Titel und Stil.
4. Danach maximal 5 neue Bilder pro Batch.
5. Für Bild 02+ dieselbe Master-Referenz anhängen.
6. Prompt ausdrücklich: **do not copy or recreate the cover title from the master reference.**
7. Nach jedem Batch interne Style-/Continuity-/Inhalts-/Text-QA.
8. Nur fehlerhafte Bilder regenerieren.
9. Nach PASS automatisch weiter.

## 9. Referenzklausel pro Bild ab Szene 02

`Use attached 01.png as STYLE AND ANATOMY REFERENCE ONLY, NOT as a character clone or text template. Match the approved true-stickman anatomy system, head/torso proportions, very thin line-like limbs, simple no-finger hands, linework, color treatment, shading, environment detail level and overall 2D illustration quality. Freely change character identity, clothing, cast size, role, pose, camera, environment, props and lighting to fit the current speech beat. Reuse the exact Scene-01 character only when narrative continuity requires it. IMPORTANT: do not copy, recreate or imitate the cover headline from 01.png. SOURCE IMAGE TEXT POLICY FOR SCENE 02+: ZERO READABLE TEXT, zero letters, zero labels, zero UI words and zero captions. German keyword overlays are added later in Remotion.`

## 10. Batch-QA

Nach jedem Batch intern prüfen:
- gleiche einfache Stickman-Grundanatomie
- keine realistische Nase/Ohren
- sehr dünne lineare Arme/Beine
- keine Fingeranatomie
- gleiche Linien-/Shading-Logik
- vergleichbares Farbverhalten und Weltqualität
- Cast passt zum Beat
- keine unnötige Figuren-/Raum-/Kamerawiederholung
- alle Hintergrundmenschen STRICT STICKMAN ONLY
- kein 3D-/Anime-/Fotorealismus-Drift
- Szene 02+ ohne lesbaren Text
- Cover-Titel aus 01.png nicht in Folgebilder kopiert
- Bild passt exakt zum Visual Beat

## 11. HARD FAIL

Ein Bild wird verworfen, wenn:
- Stickman-Anatomie sichtbar wechselt
- normale Cartoon-Menschen auftauchen
- realistische Hände/Finger, Nasen oder Ohren auftauchen
- Szene 01 den Titel falsch darstellt
- Szene 02+ unbeabsichtigten sichtbaren Text enthält
- englischer Text auftaucht
- Cover-Titel aus der Master-Referenz in spätere Szenen übernommen wird
- der Master unnötig als Charakter-/Raumkopie verwendet wird

## 12. Priorität

Bei Konflikt gilt:
**STRICT STICKMAN ONLY + Master als Style-/Anatomie-Referenz + exakter Flow-Cover-Titel nur in Szene 01 + ZERO READABLE TEXT ab Szene 02 + beat-passende Cast-/Szenenwahl > Charakter-, Text- oder Szenenklonen.**