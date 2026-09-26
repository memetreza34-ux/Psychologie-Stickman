# TEXT LOCK — ALLE SICHTBAREN TEXTE AUS GOOGLE FLOW

**STATUS: VERBINDLICH — HARD LOCK**

Diese Regel gilt für alle neuen YouTube-Projekte unter `youtube/` und ergänzt `rules/COVER_LOCK.md` und `rules/FLOW_TEXT_STYLE_LOCK.md`.

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

## 4. Sprache, Korrektheit und Ästhetik

Sichtbarer Text ist ausschließlich Deutsch.

Korrektheit ist HARD FAIL bei:
- falscher Schreibweise
- fehlenden oder zusätzlichen Wörtern
- falschen Umlauten oder Satzzeichen
- englischen Wörtern ohne zwingenden Eigennamen
- KI-Pseudo-Schrift
- abgeschnittenem oder kaum lesbarem Text
- zusätzlichem zufälligem Text

Ästhetik ist ebenfalls verbindlich:
- professionelle integrierte Editorial-Typografie
- ruhige klare Buchstabenformen
- sichere Ränder zur Bildkante
- keine generische Meme-/Sticker-Schrift
- keine extrem dicke Outline als Standard
- Text soll zur Bildkomposition gehören statt wie nachträglich aufgeklebt wirken
- Text darf Hauptfigur, Gesicht, Hände oder Kernhandlung nicht verdecken
- Cover-Titel deutlich stärker als spätere Keywords
- Keywords visuell untergeordnet und unterstützend

Details: `rules/FLOW_TEXT_STYLE_LOCK.md`.

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
- use clean professional integrated editorial typography
- avoid meme/sticker lettering and oversized heavy outlines
- design the text into a calm intentional text zone
- central visual action must remain readable

Jeder neue YouTube-Flow-Prompt enthält zusätzlich den globalen Block:

`TYPOGRAPHY AESTHETIC — HARD LOCK`

## 6. Master-Referenz

`01.png` enthält den Cover-Titel und bleibt trotzdem Style-/Anatomie-Master.

Ab Szene 02:
- Titel aus `01.png` niemals automatisch kopieren
- wenn die aktuelle Szene **kein** geplantes Textmoment ist: ZERO READABLE TEXT
- wenn sie ein geplantes Textmoment ist: nur den für diese Szene exakt vorgegebenen deutschen Text rendern
- Stilgefühl der Typografie darf konsistent bleiben, der konkrete Text und seine Platzierung werden aber neu für die Szene komponiert

## 7. Metadaten — neuer Standard

Neue Projekte verwenden:

```json
{
  "visibleTextLanguage": "de",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3",
  "flowSourceImageTextPolicy": "PLANNED_EXACT_GERMAN_TEXT_ONLY",
  "flowTextStylePolicy": "EDITORIAL_INTEGRATED_V1",
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
- Text wirkt visuell integriert, nicht aufgeklebt
- keine billige Meme-/Sticker- oder übermäßig umrissene Blockschrift
- Typografie ist im selben Video stilistisch konsistent

Vor Export prüfen:
- Remotion rendert keine `sceneLabels`
- YouTube-Auto-Captions sind aus
- alle sichtbaren Texte stammen bereits aus den Google-Flow-Bildern

## 9. Priorität

Bei YouTube-Textfragen gilt:

**Google Flow erzeugt sämtlichen sichtbaren Text direkt im Bild. Remotion erzeugt keinen sichtbaren Text.**

Für die visuelle Ausführung gewinnt zusätzlich `rules/FLOW_TEXT_STYLE_LOCK.md`.
