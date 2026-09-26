# COMPOSITION VARIATION LOCK — MEHR VISUELLE ABWECHSLUNG

**STATUS: VERBINDLICH — HARD LOCK**

Diese Regel gilt für neue YouTube-Longform-Projekte.

## 1. Ziel

Die Bildwelt darf stilistisch konsistent sein, aber die Kompositionen dürfen sich nicht wie dieselbe Vorlage mit anderem Hintergrund anfühlen.

Verhindert werden insbesondere:
- zu viele Szenen mit `eine Figur + ein Objekt + Raum`
- immer gleiche mittlere Kameradistanz
- zu viele Einzelmotive hintereinander
- monotone, schematische Infografikbilder

## 2. Planungsmix

Für ein typisches 2–3-Minuten-Video gilt als **Planungsziel**, nicht als mathematischer Zwang:
- ungefähr 70 % normale konkrete Szenen
- ungefähr 20 % Vergleichs-/Split-/Kontrast-Kompositionen
- ungefähr 10 % Multi-Panel-/Montage-Kompositionen

Inhaltliche Klarheit gewinnt immer vor Prozentwerten. Der Mix dient als Anti-Monotonie-Regel.

## 3. Erlaubte Kompositionstypen

Jede Phase-1-Szene bekommt `compositionType` aus:
- `standard` — eine konkrete zusammenhängende Szene
- `split` — zwei klar getrennte Seiten desselben Gedankens
- `contrast` — zwei Zustände/Optionen im selben Frame gegenübergestellt
- `montage` — Hauptmotiv plus 1–2 unterstützende Teilmomente

`montage` bedeutet **nicht**, mehrere unabhängige Visual Beats in ein Bild zu pressen.

## 4. Multi-Bild-Regel

Mehrere Teilbilder in einem Frame sind ausdrücklich erlaubt, wenn sie **denselben gesprochenen Beat** erklären.

Gute Einsätze:
- Vorher/Nachher
- A/B-Vergleich
- Behauptung/Gegenbeispiel
- mehrere kurze Beispiele derselben Aussage
- Hauptsituation plus 1–2 unterstützende Detailausschnitte
- Ursache/Folge, wenn beides im selben gesprochenen Beat steckt

Nicht erlaubt:
- spätere Informationen vorwegnehmen
- drei unterschiedliche Aussagen nur aus Platzgründen zusammenquetschen
- unruhige Collage ohne klare Blickführung

## 5. Wiederholungsgrenze

- nicht dauerhaft dieselbe Bildformel verwenden
- möglichst keine lange Folge von mehr als 4 rein gleichartigen `standard`-Kompositionen
- Split/Montage nur einsetzen, wenn sie den Beat klarer oder informativer machen
- Kamerawinkel, Castgröße, Vorder-/Mittel-/Hintergrund und Objektanordnung bewusst variieren

## 6. Prompt-Hard-Lock

Jeder neue YouTube-Flow-Prompt enthält:

`VISUAL VARIETY — HARD LOCK`

Darin muss stehen:
- vary composition families across the video
- use split/contrast when comparison helps
- use multi-panel/montage when several examples of the SAME beat help
- do not default to one-stickman-in-room compositions
- one primary idea per final frame remains mandatory

## 7. QA

Für Videos mit mindestens 20 Szenen:
- WARN wenn keine Vergleichs-/Split-/Kontrast-Szene geplant ist
- WARN wenn keine Montage-/Multi-Panel-Szene geplant ist
- WARN wenn mehr als 85 % als `standard` geplant sind
- WARN wenn weniger als 55 % `standard` sind und das Video dadurch zu collage-lastig wird
- FAIL wenn `montage` mehrere unabhängige Beats zusammenzieht

## 8. Priorität

**Ein klarer Gedanke pro Bild bleibt bestehen.**

Visuelle Vielfalt bedeutet abwechslungsreiche Darstellung desselben Beat-Prinzips — nicht mehr Inhalt pro Szene um jeden Preis.
