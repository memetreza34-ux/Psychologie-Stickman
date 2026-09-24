# TEXT OVERLAY LOCK — DEUTSCHE KURZTEXTE

**STATUS: VERBINDLICH — HARD LOCK**

Diese Regel gilt für YouTube-Projekte unter `youtube/` und ergänzt `rules/COVER_LOCK.md`.

## 1. Grundprinzip

**Bild zuerst. Text verstärkt nur den wichtigsten Gedanken.**

Die Stickman-Szene muss auch ohne Text verständlich bleiben. Kurzer deutscher Text darf gezielt eingesetzt werden, wenn er die Kernaussage schneller erfassbar, merkfähiger oder thumbnail-tauglicher macht.

Nicht zurück zu textlastigen Slides: Text ist Verstärker, nicht Hauptinhalt.

## 2. Zwei erlaubte Overlay-Typen

### `cover`
Nur für Szene 01.

- Szene 01 ist immer Cover + erster Visual Beat + Master.
- Das finale Cover erhält **verpflichtend eine starke deutsche Überschrift**.
- Ziel: 2–7 Wörter.
- Darf als kurze Frage formuliert sein.
- Muss zum Video und zum ersten Beat passen.
- Keine irreführende Clickbait-Aussage.

Beispiel:
`ALLE SCHAUEN DICH AN?`

### `keyword`
Für ausgewählte Szenen im Video.

- ideal 1–4 Wörter
- harte Obergrenze: 5 Wörter
- wichtiger Begriff, Mechanismus oder Merksatz
- kein ganzer Erklärsatz
- keine Untertitel-Funktion

Beispiele:
- `SPOTLIGHT-EFFEKT`
- `ICH-FOKUS`
- `ÜBERSCHÄTZT`
- `WENIGER ALS DU DENKST`

## 3. Textdichte

Für YouTube-Longform:

- Szene 01: **immer ein `cover`-Overlay**
- weitere Textmomente nur dort, wo sie echten Mehrwert bringen
- redaktioneller Zielwert: ungefähr **ein Textmoment alle 4–6 Bilder**
- typischer Bereich: etwa **15–25 % der Szenen** mit Text inklusive Cover
- harte Obergrenze: **30 % der Szenen** mit Overlays, außer ein ausdrücklich begründetes Format verlangt mehr

Keine langen Serien aus Textkarten oder ständig eingeblendeten Begriffen.

## 4. Sprache

Sichtbarer Overlay-Text ist **ausschließlich Deutsch**.

HARD FAIL:
- englische Überschrift
- englische UI-Begriffe
- gemischte Deutsch-/Englisch-Labels ohne zwingenden Eigennamen
- KI-Pseudo-Schrift
- Rechtschreibfehler

## 5. Flow bleibt textfrei

Google-Flow-Quellbilder bleiben **ZERO READABLE TEXT**.

Das bedeutet:
- Flow rendert keine Überschrift
- Flow rendert keine Keywords
- Screens, Poster und Dokumente bleiben textfrei bzw. abstrakt
- der Flow-Prompt plant bei Overlay-Szenen lediglich geeignete ruhige Negativfläche

Der sichtbare Text wird anschließend kontrolliert in **Remotion** gesetzt.

Kurz:
**Flow baut das Bild. Remotion setzt die deutsche Typografie.**

## 6. Bildkomposition für Textmomente

Wenn eine Szene ein geplantes Overlay erhält:

- Motiv und Text dürfen sich nicht gegenseitig verdecken
- Gesicht/Kopf, Hände und zentrale Handlung bleiben frei
- ruhige Negativfläche gezielt einplanen
- keine überladene Ecke mit Requisiten hinter dem Text
- Text soll auch auf kleinerer Darstellung schnell lesbar sein

Das Bild darf nicht leer wirken, nur damit Text Platz hat.

## 7. Remotion-Metadaten

`sceneLabels` unterstützt zwei Varianten:

```json
{"scene": 1, "text": "ALLE SCHAUEN DICH AN?", "position": "top-left", "variant": "cover"}
```

```json
{"scene": 4, "text": "SPOTLIGHT-EFFEKT", "position": "top-left", "variant": "keyword"}
```

Für YouTube gilt:
- genau ein `cover`-Label auf Szene 01
- andere Labels verwenden `keyword`
- `cover` ist außerhalb von Szene 01 nicht erlaubt

## 8. Inhaltliche Auswahl

Text besonders sinnvoll bei:
- Definition eines zentralen Effekts
- klarer Wendepunkt
- wichtigem Mechanismus
- Ergebnis eines Experiments
- zentraler Erkenntnis
- Schluss-Merksatz

Text meist unnötig bei:
- einfachen Übergangsszenen
- rein atmosphärischen Bildern
- Mini-Handlungen, die sofort verständlich sind
- mehreren direkt aufeinanderfolgenden Szenen mit derselben Aussage

## 9. QA

Vor Export prüfen:
- Szene 01 hat eine starke deutsche Cover-Headline
- Cover-Headline hat höchstens 7 Wörter
- Keywords haben höchstens 5 Wörter
- Text wiederholt nicht einfach komplette Sprecher-Sätze
- Overlay-Dichte bleibt kontrolliert
- kein englischer sichtbarer Text
- Text verdeckt keine wichtige Bildhandlung
- Bild bleibt auch ohne Overlay verständlich

## 10. Priorität

Bei Textfragen gilt:

**starke visuelle Szene + gezielter kurzer deutscher Remotion-Text > komplett textfreies Endvideo > textlastige Slide.**

Das Flow-Quellbild bleibt trotzdem standardmäßig textfrei.
