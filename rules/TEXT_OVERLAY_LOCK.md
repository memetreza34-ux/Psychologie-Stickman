# TEXT LOCK — ALLE SICHTBAREN TEXTE AUS GOOGLE FLOW

**STATUS: VERBINDLICH — HARD LOCK**

Diese Regel gilt für alle neuen YouTube-Projekte unter `youtube/` und ergänzt `rules/COVER_LOCK.md`.

## 1. Grundprinzip

**Remotion erzeugt für YouTube keinen sichtbaren Text.**

Alle sichtbaren deutschen Texte werden bereits bei der Bildgenerierung direkt von **Google Flow** in das jeweilige Bild geschrieben.

Remotion ist nur für Schnitt, Audio, Bildwechsel, technische Effekte und Export zuständig.

## 2. Erlaubte Textmomente

### Cover — Szene 01
- Szene 01 ist immer Cover + erster Visual Beat + Master.
- Google Flow rendert den exakten deutschen Cover-Titel direkt in `01.png`.
- Ziel: 2–7 Wörter.
- außer diesem Titel kein weiterer lesbarer Text.

### Keyword-Szenen
Ausgewählte spätere Szenen dürfen einen kurzen deutschen Begriff oder Merksatz direkt im Google-Flow-Bild enthalten.

- ideal 1–4 Wörter
- harte Obergrenze: 5 Wörter
- exakt vorgegebener deutscher Wortlaut
- kein ganzer Erklärsatz
- kein zweiter zusätzlicher Text im selben Bild

Beispiele:
- `NEGATIVITÄTSBIAS`
- `NEGATIVES WIEGT SCHWERER`
- `AUFMERKSAMKEIT`
- `EIN DATENPUNKT`

### Alle anderen Szenen
**ZERO READABLE TEXT.**

## 3. Textdichte

Für YouTube-Longform:
- Szene 01 immer mit Cover-Titel
- weitere Textmomente nur bei echtem Mehrwert
- Ziel: ungefähr ein Textmoment alle 4–6 Bilder
- typischer Bereich inklusive Cover: 15–25 % der Szenen
- harte Obergrenze: 30 %

Keine Textkarten-Serie und keine Dauerbeschriftung.

## 4. Sprache und Qualität

Sichtbarer Text ist ausschließlich Deutsch.

HARD FAIL:
- falsche Schreibweise
- fehlende oder zusätzliche Wörter
- falsche Umlaute oder Satzzeichen
- englische Wörter ohne zwingenden Eigennamen
- KI-Pseudo-Schrift
- abgeschnittener oder kaum lesbarer Text
- zusätzlicher zufälliger Text

Bei einem Textfehler wird **nur das betroffene Google-Flow-Bild neu generiert**.

## 5. Google-Flow-Prompt pro Textszene

Jede geplante Textszene muss den exakten Wortlaut enthalten, zum Beispiel:

`EXACT GERMAN TEXT: "NEGATIVITÄTSBIAS"`

Dazu immer:
- render exactly this text
- preserve spelling, umlauts and punctuation
- NO OTHER READABLE TEXT
- typography must be fully inside the safe image area
- do not crop or clip letters
- central visual action must remain readable

## 6. Master-Referenz

`01.png` enthält den Cover-Titel und bleibt trotzdem Style-/Anatomie-Master.

Ab Szene 02:
- Titel aus `01.png` niemals automatisch kopieren
- wenn die aktuelle Szene **kein** geplantes Textmoment ist: ZERO READABLE TEXT
- wenn sie ein geplantes Textmoment ist: nur den für diese Szene exakt vorgegebenen deutschen Text rendern

## 7. Metadaten — neuer Standard

Neue Projekte verwenden:

```json
{
  "visibleTextLanguage": "de",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3",
  "flowSourceImageTextPolicy": "PLANNED_EXACT_GERMAN_TEXT_ONLY",
  "flowTextMoments": [
    {"scene": 1, "kind": "cover", "text": "WARUM BLEIBT NEGATIVES HÄNGEN?"},
    {"scene": 4, "kind": "keyword", "text": "NEGATIVITÄTSBIAS"}
  ],
  "sceneLabels": []
}
```

Für neue YouTube-Projekte gilt:
**`sceneLabels` muss leer bleiben.**

Es gibt keine YouTube-Cover-, Keyword- oder Caption-Typografie aus Remotion.

## 8. QA

Vor Bildfreigabe prüfen:
- geplante Textszene enthält exakt den vorgesehenen deutschen Text
- nicht geplante Textszene enthält gar keinen lesbaren Text
- kein Text ist abgeschnitten
- kein Text liegt außerhalb der Safe Area
- keine zusätzlichen Wörter oder Zeichen
- Text verdeckt keine zentrale Figur oder Handlung

Vor Export prüfen:
- Remotion rendert keine `sceneLabels`
- YouTube-Auto-Captions sind aus
- alle sichtbaren Texte stammen bereits aus den Google-Flow-Bildern

## 9. Priorität

Bei YouTube-Textfragen gilt:

**Google Flow erzeugt sämtlichen sichtbaren Text direkt im Bild. Remotion erzeugt keinen sichtbaren Text.**
