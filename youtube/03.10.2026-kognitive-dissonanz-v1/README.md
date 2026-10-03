# Kognitive Dissonanz — Video v1

## Status

READY_FOR_GOOGLE_FLOW_COVER_TEST

## Topic-Uniqueness-Preflight

**PASS.**

Neues kanonisches Thema:
**Kognitive Dissonanz / Cognitive Dissonance**

Vor Erstellung geprüft:
- `TOPIC_REGISTRY.json`
- deutsche und englische Synonyme
- vorhandene `youtube/TT.MM.JJJJ-*` Projekte
- Repo-Suche nach `kognitive dissonanz` und `cognitive dissonance`

Das Thema war noch nicht verwendet und wird in demselben Commit als `USED` registriert.

## Thema

Warum Menschen eine bereits getroffene Entscheidung nachträglich stärker verteidigen oder ihre Bewertung verändern können, wenn Verhalten, Entscheidung und eigene Einstellung schlecht zusammenpassen.

Kernbegriff: **Kognitive Dissonanz**.

Arbeitstitel:

**Kognitive Dissonanz: Warum wir uns Entscheidungen schönreden**

Cover-Headline:

**WARUM REDEN WIR UNS DAS SCHÖN?**

## Ziel

Bewusst ein anderes Themenfeld als die zuletzt verwendeten Effekt-Videos: innere Rechtfertigung nach Entscheidungen und Forced Compliance statt Aufmerksamkeit, Framing, Reaktanz oder Gruppendruck.

Das Video nutzt `PSYCHOLOGY_STICKMAN_WORLD_V1`, strikten Species-Lock, Representation-First, Staging-Varianz und Mobile-Readability.

## Aktive Regeln

- `TOPIC_UNIQUENESS_V1`
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
- Szene 02: Begriff `Kognitive Dissonanz`
- Szene 03: einfache Erklärung
- Szene 04: konkretes Alltagsbeispiel mit zwei ähnlich guten Kopfhörern

Damit wird der Kernbegriff vor Szene 03 genannt und das erste Alltagsbeispiel kommt vor Szene 05.

## Representation-Mix

Die 16 Beats verwenden:
- 2 `CHARACTER_SCENE`
- 3 `OBJECT_FOCUS`
- 3 `ENVIRONMENT_SCENE`
- 3 `SCHEMA_EXPLAINER`
- 3 `COMPARE_VISUAL`
- 2 `TEXT_ILLUSTRATION`

Das ist keine feste Quote. Pro Beat wurde die stärkste sichtbare Form gewählt.

## Geplanter sichtbarer Text

Nur drei BILDs enthalten lesbaren Text:
- BILD 01: `WARUM REDEN WIR UNS DAS SCHÖN?`
- BILD 02: `KOGNITIVE DISSONANZ`
- BILD 16: `ÜBERZEUGT – ODER RECHTFERTIGT?`

Alle anderen BILDs: `NO VISIBLE TEXT`.

## Staging-Plan

Bewusst unterschiedliche Bildräume:
- Elektronikladen als emotionaler Cover-Konflikt
- Text-Objekt-Illustration
- einfaches Entscheidungs-Schema
- Top-down Produktwahl
- Produkt-Close-up-Vergleich
- 1950er Konsumentscheidungs-Labor
- physische Before/After-Ranking-Anordnung
- late-1950s Forced-Compliance-Labor
- echte soziale Interaktion an der Labortür
- Reward-Vergleich
- kompakter Mechanismus
- moderner Schreibtisch / Post-Choice-Szene
- reales Gegenbeispiel mit defektem Produkt
- moderner Forschungsraum
- reflektierende Text-Endszene

Keine Kette aus beigen Erklärtafeln und keine unnötigen Figuren in jedem Bild.

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
- kein normaler Cartoon-Mensch entsteht, auch nicht in historischen Laborszenen
- Kleidung keine realistischen Schultern, Hüften oder Körpervolumen erzeugt
- Objekt-, Environment-, Compare-, Schema- und Textbilder dieselbe Illustrator-Sprache verwenden
- kognitive Dissonanz NICHT als gespaltener Kopf, Blitz, leuchtendes Gehirn oder abstrakte Energie dargestellt wird
- Bilder auf dem Handy sofort lesbar bleiben
- jedes Bild einen dominanten sichtbaren Gedanken besitzt

## Inhaltliche Leitplanken

Das Video behandelt die klassische Dissonanztheorie nicht als universelle Diagnose.

Es unterscheidet:
- klassische post-decision-Befunde
- klassische Forced-Compliance-Befunde
- dissonanztheoretische Interpretation
- moderne methodische und konzeptuelle Einschränkungen

Quellenbasis:
- Brehm (1956), DOI `10.1037/h0041006`
- Festinger & Carlsmith (1959), DOI `10.1037/h0041593`
- Vaidis & Bran (2019), DOI `10.3389/fpsyg.2019.01189`

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
