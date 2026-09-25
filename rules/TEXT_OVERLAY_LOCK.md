# TEXT OVERLAY LOCK — DEUTSCHE KURZTEXTE

**STATUS: VERBINDLICH — HARD LOCK**

Diese Regel gilt für YouTube-Projekte unter `youtube/` und ergänzt `rules/COVER_LOCK.md`.

## 1. Grundprinzip

**Bild zuerst. Text verstärkt nur den wichtigsten Gedanken.**

Die Stickman-Szene muss grundsätzlich auch ohne zusätzliche Erklärung verständlich bleiben. Kurzer deutscher Text darf gezielt eingesetzt werden, wenn er die Kernaussage schneller erfassbar oder merkfähiger macht.

Nicht zurück zu textlastigen Slides.

## 2. Zwei Textwege

### A — Cover-Titel in Google Flow
Nur Szene 01.

- Szene 01 ist immer Cover + erster Visual Beat + Master.
- Google Flow rendert den **exakten deutschen Cover-Titel direkt in `01.png`**.
- Ziel: 2–7 Wörter.
- Darf eine kurze Frage sein.
- Muss zum Video und zum ersten Beat passen.
- Kein zusätzlicher lesbarer Text im Cover.
- Remotion rendert diesen Cover-Titel **nicht erneut**.

Beispiel:
`WARUM BLEIBT NEGATIVES HÄNGEN?`

### B — `keyword` in Remotion
Für ausgewählte Szenen ab Szene 02.

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
- Szene 01: immer sichtbarer Flow-Cover-Titel
- weitere Textmomente nur dort, wo sie echten Mehrwert bringen
- redaktioneller Zielwert: ungefähr ein Textmoment alle 4–6 Bilder
- typischer Gesamtbereich inklusive Cover: etwa 15–25 % der Szenen
- harte Obergrenze: 30 % der Szenen mit sichtbaren Cover-/Keyword-Textmomenten

Keine langen Serien aus Textkarten oder ständig eingeblendeten Begriffen.

## 4. Sprache

Sichtbarer Text ist ausschließlich Deutsch.

HARD FAIL:
- englische Überschrift
- englische UI-Begriffe
- gemischte Deutsch-/Englisch-Labels ohne zwingenden Eigennamen
- KI-Pseudo-Schrift
- Rechtschreibfehler

## 5. Flow-Textregel

Google Flow hat genau **eine reguläre Textausnahme**:

### Szene 01
Flow rendert exakt den vorgegebenen deutschen Cover-Titel.
Außer diesem Titel: **NO OTHER READABLE TEXT**.

### Szene 02+
**ZERO READABLE TEXT**.

Das bedeutet ab Szene 02:
- keine Überschrift
- keine Keywords
- keine UI-Texte
- keine Untertitel
- Poster, Screens und Dokumente textfrei bzw. abstrakt

Spätere deutsche Keywords werden in Remotion gesetzt.

Kurz:
**Flow setzt den Cover-Titel. Remotion setzt spätere Keywords.**

## 6. Bildkomposition für Textmomente

### Cover
- Titelzone bewusst einplanen
- Titel groß und klar
- Hauptmotiv darf nicht vom Titel verdeckt werden
- Titel soll auch in kleiner Thumbnail-Darstellung lesbar bleiben

### Keyword-Szenen
- ruhige Negativfläche einplanen
- Gesicht/Kopf, Hände und zentrale Handlung frei halten
- keine überladene Ecke hinter dem Text

Das Bild darf nicht leer wirken, nur damit Text Platz hat.

## 7. Metadaten

Neue Projekte verwenden für den Cover-Titel:

```json
{
  "coverHeadline": "WARUM BLEIBT NEGATIVES HÄNGEN?",
  "coverTextRenderer": "GOOGLE_FLOW",
  "flowSourceImageTextPolicy": "SCENE_01_EXACT_GERMAN_COVER_TITLE_ONLY"
}
```

`sceneLabels` enthält bei neuen Projekten nur Remotion-Keywords, zum Beispiel:

```json
{"scene": 4, "text": "NEGATIVITÄTSBIAS", "position": "top-left", "variant": "keyword"}
```

Neue Projekte legen **kein `variant: "cover"`-Remotion-Overlay** mehr an.

Alte Projekte mit Remotion-Cover dürfen als Legacy weiter bestehen, müssen aber vor einer neuen Bildproduktion auf die Google-Flow-Coverregel migriert werden.

## 8. Inhaltliche Auswahl für Keywords

Text besonders sinnvoll bei:
- Definition eines zentralen Effekts
- klarem Wendepunkt
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

Vor Freigabe von Szene 01 prüfen:
- exakter deutscher Cover-Titel sichtbar
- 2–7 Wörter
- jedes Wort korrekt geschrieben
- Satzzeichen korrekt
- keine zusätzlichen Wörter
- keine Pseudo-Schrift
- kein Englisch
- Titel verdeckt keine wichtige Handlung

Vor Export prüfen:
- Cover-Titel wird nicht zusätzlich in Remotion dupliziert
- Keywords haben höchstens 5 Wörter
- Text wiederholt nicht komplette Sprecher-Sätze
- Textdichte bleibt kontrolliert
- kein englischer sichtbarer Text
- Bild bleibt auch ohne spätere Keywords verständlich

## 10. Priorität

Bei Textfragen gilt:

**starke visuelle Szene + exakter Flow-Cover-Titel + gezielte deutsche Remotion-Keywords > komplett textfreies Endvideo > textlastige Slide.**