# Spotlight-Effekt — Video v1

## Status

READY_FOR_GOOGLE_FLOW_COVER_TEST

## Thema

Warum sich kleine Fehler, Flecken oder peinliche Momente für uns oft viel auffälliger anfühlen, als sie für andere tatsächlich sind.

Kernbegriff: **Spotlight-Effekt**.

Arbeitstitel:

**Warum du glaubst, dass alle deinen Fehler sehen – Spotlight-Effekt erklärt**

Cover-Headline:

**SEHEN DAS WIRKLICH ALLE?**

## Ziel

Neues Psychologie-Video mit `PSYCHOLOGY_STICKMAN_WORLD_V1`, strengem Species-Lock, Representation-First, Staging-Varianz und Mobile-Readability.

Das Video vermeidet sowohl den alten Fehler `jede Szene = Figurenbild` als auch den neu erkannten Fehler `jede Erklärung = beige Tafel mit Pfeilen`. Reale Räume, Close-ups, Environment-Shots, Vergleiche, ein einfaches Schema und wenige Textmomente werden bewusst gemischt.

## Aktive Regeln

- `PSYCHOLOGY_STICKMAN_WORLD_V1`
- `OBSERVABLE_SCENE_FIRST_V1`
- `REPRESENTATION_VARIETY_V1`
- `HOOK_FIRST_EXPLAIN_EARLY_V1`
- `NATURAL_FLOW_MASTER_V2`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`

## Dateien

- `01-script/script.txt` — finales deutsches Voice-over-Script mit 16 Beats
- `02-google-flow/google-flow-prompt.txt` — einzige Flow-Masterdatei mit allen 16 Bildern
- `99-intern/phase1-scenes.json` — Observable-Evidence-, Representation- und Staging-Planung
- `99-intern/sources.md` — Quellen und Claim-Check

## Hook-Check

- Szene 01: direkte WHY_DOES-Hook
- Szene 02: Begriff `Spotlight-Effekt`
- Szene 03: einfache Definition
- Szene 04: konkretes Alltagsbeispiel mit Kaffeefleck vor einem Seminar

Damit wird der Kernbegriff vor Szene 03 genannt und das erste Alltagsbeispiel kommt vor Szene 05.

## Representation-Mix

Die 16 Beats verwenden:
- 4 `CHARACTER_SCENE`
- 2 `OBJECT_FOCUS`
- 4 `ENVIRONMENT_SCENE`
- 1 `SCHEMA_EXPLAINER`
- 3 `COMPARE_VISUAL`
- 2 `TEXT_ILLUSTRATION`

Das ist keine feste Quote. Pro Beat wurde die stärkste sichtbare Form gewählt.

## Geplanter sichtbarer Text

Nur drei BILDs enthalten lesbaren Text:
- BILD 01: `SEHEN DAS WIRKLICH ALLE?`
- BILD 02: `SPOTLIGHT-EFFEKT`
- BILD 14: `WÜRDE MIR DAS AUFFALLEN?`

Alle anderen BILDs: `NO VISIBLE TEXT`.

## Staging-Plan

Bewusst unterschiedliche Bildräume:
- Cover/soziale Spannung als Medium-Close
- Textmoment als integrierte Illustration
- Spiegel-vs-Raum-Vergleich
- reale Seminar-Situation
- Fleck als Close-up
- weiter Seminarraum mit vielen eigenen Aktivitäten
- frühe-2000er-Forschungsumgebung
- direkte Erwartung-vs-Beobachtung-Komposition
- Gruppengespräch
- einfaches Perspektiv-Schema
- Objekt-Close-up mit kurzem echten Blick
- falsche Antwort im Seminar
- Performance-Vergleich
- Textfrage im realen Schreibtisch-Kontext
- weiter Raum-Perspektivwechsel
- abschließender Flur-/Crowd-Shot

Keine drei flachen Explainer-Boards hintereinander.

## Flow-Ablauf

1. Die komplette `02-google-flow/google-flow-prompt.txt` in einen neuen Google-Flow-Agent-Chat geben.
2. Zuerst ausschließlich `BILD 01` erzeugen.
3. Genau **3 getrennte 16:9 Cover-Kandidaten**.
4. Danach STOP für Nutzerwahl.
5. Gewinner → `01.png` → `03-bilder/`.
6. Gewinner `01.png` als Episoden-Style-Referenz verwenden.
7. Danach exakt:
   - BILD 02–06
   - BILD 07–11
   - BILD 12–16
8. Jede Bildnummer bleibt eine separate 16:9-Datei.
9. Akzeptierte Bilder sofort `NN.png` benennen und direkt in `03-bilder/` halten.
10. Nur fehlgeschlagene Bilder regenerieren.

## Bildwelt-QA

PASS nur wenn:
- jede sichtbare Person eindeutig dieselbe Stickman-Spezies bleibt
- kein normaler Cartoon-Mensch entsteht, auch nicht in Forschungs-/Seminarszenen
- Kleidung keine realistischen Schultern, Hüften oder Körpervolumen erzeugt
- Objekt-, Environment-, Compare-, Schema- und Textbilder dieselbe Illustrator-Sprache verwenden
- der Spotlight-Effekt NICHT als echter Bühnen-Scheinwerfer dargestellt wird
- Bilder auf dem Handy sofort lesbar bleiben
- keine Folge aus wiederholten beigen Erklärtafeln entsteht
- jedes Bild einen dominanten sichtbaren Gedanken besitzt

## Inhaltliche Leitplanken

Das Video behauptet nicht, dass niemand unsere Fehler bemerkt. Der Spotlight-Effekt beschreibt eine Tendenz zur Überschätzung, keine Garantie.

Quellenbasis:
- Gilovich, Medvec & Savitsky (2000), DOI `10.1037/0022-3514.78.2.211`
- Gilovich & Savitsky (1999), DOI `10.1111/1467-8721.00039`
- Gilovich, Kruger & Medvec (2002), DOI `10.1006/jesp.2001.1490`

## Späterer Export

Upload-bereit ist das Projekt erst mit dem flachen Exportpaket:

```text
05-export/
├── final.mp4
├── thumbnail.png
├── captions.srt
└── youtube-upload.txt
```

Keine separaten Caption-/Subtitle-Unterordner.

## Noch nicht vorhanden

- keine finalen Flow-Bilder
- keine Voice-Datei
- kein Render
- kein `final.mp4`
- kein `thumbnail.png`
- keine `captions.srt`
- kein fertiges `youtube-upload.txt`

Diese Dateien entstehen erst in späteren Produktionsphasen.
