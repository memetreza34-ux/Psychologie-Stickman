# IMAGE REFERENCE LOCK

**STATUS: VERBINDLICH**

Ziel: Alle Bilder eines Videos müssen eindeutig wie dieselbe Bildwelt aussehen, ohne dass dadurch immer derselbe Charakter, dieselbe Kleidung oder dieselbe Szene kopiert wird.

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

Kurz:
**Master = Stil- und Anatomie-Referenz, nicht Charakter-Klonvorlage.**

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

Deutsche Begriffe werden standardmäßig **erst in Remotion** als kontrollierte Overlays gesetzt.

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

## 6. CAST- UND SZENENVIELFALT — HARD LOCK

Vor jeder Szene bewusst entscheiden:
- **Cast:** 1, 2, 3 oder 4 Stickmen?
- **Rolle:** Wer passt inhaltlich zum Beat?
- **Ort:** Welche Umgebung erklärt den Gedanken am besten?
- **Handlung:** Was passiert sichtbar?
- **Kamera:** Welcher Blickwinkel macht den Beat klar?

Erlaubt und erwünscht:
- verschiedene Stickmen innerhalb derselben DNA
- andere Kleidung/Farben
- andere Rollen und Accessoires
- wechselnde Orte
- verschiedene Kameradistanzen und Perspektiven
- Einzelperson, Duo, kleine Gruppe oder Crowd je nach Aussage

Nicht als Default erlaubt:
- immer dieselbe einzelne Figur aus Bild 01
- immer derselbe Hoodie
- immer derselbe Schreibtisch
- immer derselbe Raum
- immer dieselbe neutrale Pose
- immer derselbe Medium Shot

Eine bestimmte Figur bleibt nur dann dieselbe, wenn die Szene echte Kontinuität braucht, z. B. „später dieselbe Person“ oder eine zusammenhängende Mini-Geschichte.

## 7. Lokale Figurenkontinuität

Wenn eine Szene ausdrücklich dieselbe Person wie eine frühere Szene verlangt, konstant halten:
- Kopf-/Körperproportionen
- Kopf-/Gesichtsstil
- Arm-/Beindicke
- Hand-/Fußvereinfachung
- Kleidung und Farben innerhalb dieser zusammenhängenden Sequenz
- relevante Accessoires

Diese Regel gilt **lokal für die Sequenz**, nicht automatisch für das gesamte Video.

## 8. Generierung in 5er-Batches — AUTO AFTER MASTER

1. Bild 01 allein erzeugen.
2. STOP.
3. Bild 01 visuell prüfen und vom Nutzer freigeben lassen.
4. Danach maximal 5 neue Bilder pro Batch generieren.
5. Für jedes Bild dieselbe Master-Referenz anhängen.
6. Nach jedem Batch interne Style-/Continuity-/Inhalts-QA durchführen.
7. Nur fehlerhafte Bilder regenerieren; bestandene Bilder behalten.
8. Sobald der ganze Batch PASS erreicht, automatisch mit dem nächsten Batch fortfahren.
9. Bis zum letzten Bild wiederholen.
10. Bild 01 bleibt Master für **Stil und Anatomie**.

Keine Nutzerfreigabe nach normalen Batches.

## 9. Referenzklausel pro Bild

Für Bild 02 bis Ende:

`Use attached 01.png as STYLE AND ANATOMY REFERENCE ONLY, NOT as a character clone template. Match the approved true-stickman anatomy system, head/torso proportions, very thin line-like limbs, simple no-finger hands, linework, color treatment, shading, environment detail level and overall 2D illustration quality. Freely change character identity, clothing, cast size, role, pose, camera, environment, props and lighting to fit the current speech beat. Reuse the exact Scene-01 character only when this scene explicitly requires narrative continuity. Do not default to the same lone hoodie character, same desk, same room or same framing. STRICT STICKMAN-ONLY CHECK: every person visible anywhere must use the same stickman DNA, but they may be different people. Prefer a concrete stickman action in a believable setting over a generic infographic. SOURCE IMAGE TEXT POLICY: render zero readable text, zero letters, zero labels, zero UI words and zero captions. German labels are normally added later in Remotion.`

## 10. Batch-QA

Nach jedem Batch intern prüfen:
- gleiche einfache Stickman-Grundanatomie
- keine realistische Nase/Ohren
- kleiner vereinfachter Torso
- Arme/Beine sehr dünn und linear
- keine fleischigen Gliedmaßen
- keine Fingeranatomie
- gleiche Linien-/Shading-Logik
- vergleichbares Farbverhalten und Weltqualität
- Cast passt zum jeweiligen Beat
- Figurenidentität wurde nur dort wiederholt, wo Kontinuität sinnvoll ist
- nicht mehrere Szenen unnötig mit gleichem Hoodie/Raum/Framing wiederholt
- alle Hintergrundmenschen STRICT STICKMAN ONLY
- kein 3D-/Anime-/Fotorealismus-Drift
- kein unbeabsichtigter lesbarer Text im Quellbild
- Bildinhalt passt exakt zum Visual Beat
- Bild ist nicht unnötig infografikartig oder überladen

Wenn ein Bild durchfällt, wird nur dieses Bild neu generiert.

## 11. HARD FAIL

Ein Bild wird verworfen, wenn:
- Stickman-Anatomie sichtbar wechselt
- normale Cartoon-Menschen auftauchen
- realistische Hände/Finger, Nasen oder Ohren auftauchen
- unbeabsichtigter sichtbarer Text auftaucht
- englischer Text auftaucht
- Linien/Shading/Farbwelt ohne Grund driften
- das Bild wie eine generische Infografik wirkt, obwohl eine klare konkrete Szene möglich wäre
- der Master unnötig als Charakter-/Raumkopie verwendet wird
- mehrere aufeinanderfolgende Szenen ohne inhaltlichen Grund denselben Stickman, dieselbe Kleidung, denselben Raum und ähnliche Kamera wiederholen

## 12. Priorität

Bei Konflikt gilt:
**STRICT STICKMAN ONLY + Master als Style-/Anatomie-Referenz + textfreies Flow-Quellbild + beat-passende Cast-/Szenenwahl > Charakterkopie oder generische Wiederholung.**

Der Visual Beat bestimmt **wer, wo und was** gezeigt wird. Der Master bestimmt **wie die Bildwelt und Stickman-Anatomie aussehen**. Remotion kontrolliert sichtbare deutsche Texte.
