# Framing-Effekt — Video v1

## Status

READY_FOR_GOOGLE_FLOW_COVER_TEST

## Thema

Warum dieselbe Information anders wirken kann, wenn sie als Gewinn, Verlust oder Eigenschaft unterschiedlich formuliert wird.

Kernbegriff: **Framing-Effekt**.

Arbeitstitel:

**Warum dieselben Fakten anders wirken – Framing-Effekt erklärt**

Cover-Headline:

**GLEICHE INFO, ANDERE WAHL?**

## Ziel

Neues Psychologie-Video mit `PSYCHOLOGY_STICKMAN_WORLD_V1` und dem verbindlichen **Representation-First**-Ansatz.

Das Video ist bewusst nicht character-only. Je nach Beat werden direkte Vergleiche, Objekte, Forschungsumgebungen, Schemata, Textillustrationen oder Stickman-Szenen verwendet. Alles bleibt dieselbe handgezeichnete 2D-Welt.

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
- `99-intern/phase1-scenes.json` — Observable-Evidence- und Representation-Planung
- `99-intern/sources.md` — Quellen und Claim-Check

## Hook-Check

- Szene 01: direkte WHY_DOES-Hook
- Szene 02: Begriff `Framing-Effekt`
- Szene 03: einfache Erklärung
- Szene 04: konkretes Alltagsbeispiel mit `90 % fettfrei` vs. `10 % Fett`

Damit wird das Konzept früh genannt und das Alltagsbeispiel kommt vor Szene 05.

## Representation-Mix

Die 16 Beats verwenden:
- 4 `CHARACTER_SCENE`
- 3 `OBJECT_FOCUS`
- 2 `ENVIRONMENT_SCENE`
- 2 `SCHEMA_EXPLAINER`
- 3 `COMPARE_VISUAL`
- 2 `TEXT_ILLUSTRATION`

Das ist keine feste Quote für andere Videos. Pro Beat wurde die stärkste Darstellungsform gewählt.

## Geplanter sichtbarer Text

Nur fünf BILDs enthalten geplanten lesbaren Text:
- BILD 01: `GLEICHE INFO, ANDERE WAHL?`
- BILD 02: `FRAMING-EFFEKT`
- BILD 04: `90 % FETTFREI` / `10 % FETT`
- BILD 12: `RISIKO` / `EIGENSCHAFT` / `ZIEL`
- BILD 14: `GEWINN` / `VERLUST`

Alle anderen BILDs: `NO VISIBLE TEXT`.

## Flow-Ablauf

1. Komplette `02-google-flow/google-flow-prompt.txt` in einen neuen Google-Flow-Agent-Chat geben.
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

## Bildwelt-/Representation-QA

PASS, wenn:
- alle Bilder wie dieselbe hochwertige handgezeichnete 2D-Serie wirken
- Figuren nur dort erscheinen, wo menschliche Entscheidung/Reaktion wirklich die Evidenz ist
- Menschen exakt dieselbe Stickman-Spezies nutzen
- Objekt-, Environment-, Schema-, Vergleichs- und Textbilder dieselben Outlines, Shading, Textur und Qualitätsstandards nutzen
- der Framing-Effekt NICHT als wörtlicher Bilderrahmen visualisiert wird
- helle Produktbilder und historische Forschungsszenen trotzdem aus derselben Welt stammen
- sichtbarer Text exakt der Planung entspricht

## Inhaltliche Leitplanken

Keine Aussage, dass Framing immer funktioniert oder Menschen zuverlässig manipuliert.

Das Video unterscheidet bewusst zwischen:
- Risky-Choice-Framing
- Attribute-Framing
- Goal-Framing

Quellenbasis:
- Tversky & Kahneman (1981), DOI `10.1126/science.7455683`
- Kühberger (1998), DOI `10.1006/obhd.1998.2781`
- Levin, Schneider & Gaeth (1998), DOI `10.1006/obhd.1998.2804`

## Noch nicht vorhanden

- keine finalen Flow-Bilder
- keine Voice-Datei
- kein Render
- kein `final.mp4`
- kein `thumbnail.png`
- kein fertiges `youtube-upload.txt`

Diese Dateien entstehen erst in späteren Produktionsphasen.
