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

Das Thema war noch nicht verwendet und ist als `USED` registriert.

## Thema

Warum Menschen eine bereits getroffene Entscheidung nachträglich stärker verteidigen oder ihre Bewertung verändern können, wenn Verhalten, Entscheidung und eigene Einstellung schlecht zusammenpassen.

Kernbegriff: **Kognitive Dissonanz**.

Arbeitstitel:

**Kognitive Dissonanz: Warum wir uns Entscheidungen schönreden**

Cover-Headline:

**WARUM REDEN WIR UNS DAS SCHÖN?**

## Feedback-Revision

Die visuelle Planung wurde nach dem ersten Render-Feedback grundlegend verschärft.

Behobene Fehler:
- keine gemischte Figurenanatomie mehr: alle Menschen in einem Bild müssen exakt dieselbe Stickman-Basisspezies besitzen
- Cover jetzt mit nur **einer** Person, damit keine zweite Cartoon-Spezies entsteht
- die ersten Bilder wiederholen nicht mehr einfach fünfmal dieselben Kopfhörer; der Ablauf ist jetzt `Laden -> Bon/Tüte -> Zuhause/Rückgabe -> Top-down-Wahl -> Makro-Details -> historisches Labor`
- alte 3-Stufen-Schemata wurden entfernt
- BILD 12 ist jetzt **eine einzige reale Laborszene** statt eines überladenen Multi-Panel-Erklärbilds
- Default maximal **2 sichtbare States/Panels pro BILD**
- ungeplanter englischer/deutscher Text oder Gibberish ist ausdrücklich ein Hard Fail
- einfache Bilder sollen nicht künstlich lange gehalten werden; bei zu langen Voice-Beats wird künftig ein weiterer konkreter Visual Beat geplant

Aktive neue Schutzregel:
`VISUAL_SEQUENCE_HARDENING_V1`

## Ziel

Bewusst ein anderes Themenfeld als die zuletzt verwendeten Effekt-Videos: innere Rechtfertigung nach Entscheidungen und Forced Compliance statt Aufmerksamkeit, Framing, Reaktanz oder Gruppendruck.

Das Video nutzt `PSYCHOLOGY_STICKMAN_WORLD_V1`, strikten Same-Frame-Species-Lock, Representation-First, Motif-Progression, Staging-Varianz und Mobile-Readability.

## Aktive Regeln

- `TOPIC_UNIQUENESS_V1`
- `PSYCHOLOGY_STICKMAN_WORLD_V1`
- `OBSERVABLE_SCENE_FIRST_V1`
- `REPRESENTATION_VARIETY_V1`
- `VISUAL_SEQUENCE_HARDENING_V1`
- `HOOK_FIRST_EXPLAIN_EARLY_V1`
- `NATURAL_FLOW_MASTER_V2`
- `FINAL_SEPARATE_IMAGE_ASSETS_V2`

## Dateien

- `01-script/script.txt` — finales deutsches Voice-over-Script mit 16 Beats
- `02-google-flow/google-flow-prompt.txt` — einzige Flow-Masterdatei mit allen 16 Bildern
- `99-intern/phase1-scenes.json` — Observable-Evidence-, Representation-, Motif- und Staging-Planung
- `99-intern/sources.md` — Quellen und Claim-Check

## Hook-Check

- Szene 01: direkte WHY_DOES-Hook
- Szene 02: Begriff `Kognitive Dissonanz`
- Szene 03: einfache Erklärung
- Szene 04: konkretes Alltagsbeispiel mit zwei ähnlich guten Kopfhörern

Damit wird der Kernbegriff vor Szene 03 genannt und das erste Alltagsbeispiel kommt vor Szene 05.

## Representation-Mix nach Revision

Die 16 Beats verwenden:
- 3 `CHARACTER_SCENE`
- 5 `OBJECT_FOCUS`
- 4 `ENVIRONMENT_SCENE`
- 0 `SCHEMA_EXPLAINER`
- 2 `COMPARE_VISUAL`
- 2 `TEXT_ILLUSTRATION`

Die vorherigen 3-Stufen-Schemata wurden bewusst durch echte Räume, konkrete Objektbeziehungen oder maximal zweigeteilte Vergleiche ersetzt.

## Geplanter sichtbarer Text

Nur drei BILDs enthalten lesbaren Text:
- BILD 01: `WARUM REDEN WIR UNS DAS SCHÖN?`
- BILD 02: `KOGNITIVE DISSONANZ`
- BILD 16: `ÜBERZEUGT – ODER RECHTFERTIGT?`

Alle anderen BILDs: `NO VISIBLE TEXT`.

Ungeplante englische Überschriften, Labels, UI-/Packaging-Texte oder Gibberish führen zur Regeneration.

## Staging-/Motif-Plan

Bewusst unterschiedliche Bildräume und Motive:
- BILD 01: Laden / eine Person / Cover-Konflikt
- BILD 02: Bon + Tüte + Text, Top-down
- BILD 03: Zuhause / Rückgabe-Hesitation
- BILD 04: Top-down Produktwahl
- BILD 05: maximal zweigeteilte Makro-Detailprüfung
- BILD 06: weites 1950er Labor
- BILD 07: einzelner physischer Ranking-Moment, keine Timeline
- BILD 08: historischer Raum-Nachhall nach der Wahl
- BILD 09: anderes 1950er Forced-Compliance-Labor
- BILD 10: reale Tür-Interaktion
- BILD 11: maximal zweigeteilter Reward-Vergleich
- BILD 12: eine einzige tiefe Laborszene mit kleinem Reward + Aussage + langweiliger Aufgabe
- BILD 13: modernes Zuhause / Vergleich wird geschlossen
- BILD 14: extremer Defekt-Close-up
- BILD 15: weites modernes Forschungsumfeld
- BILD 16: klare Reflexions-Textszene

Jede Phase-1-Szene enthält jetzt `motifKey`, `visualChangeReason` und `panelCount`.

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
- bei mehreren Menschen im selben Frame identische helle/weiße Basisköpfe, Torso-Skala und dünne Gliedmaßen verwendet werden
- kein normaler Cartoon-Mensch entsteht, auch nicht in historischen Laborszenen
- Haare/Kleidung die Basisanatomie nicht ersetzen
- Objekt-, Environment-, Compare- und Textbilder dieselbe Illustrator-Sprache verwenden
- kognitive Dissonanz NICHT als gespaltener Kopf, Blitz, leuchtendes Gehirn oder abstrakte Energie dargestellt wird
- kein BILD mehr als zwei klar getrennte States/Panels enthält
- keine Kette fast identischer Kopfhörer-/Produktshots entsteht
- Bilder auf dem Handy sofort lesbar bleiben
- jedes Bild einen dominanten sichtbaren Gedanken besitzt
- ausschließlich exakt geplanter deutscher Text lesbar ist

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

- keine finalen Flow-Bilder im Repo
- keine Voice-Datei
- kein finaler Render im Repo
- kein `final.mp4`
- kein `thumbnail.png`
- keine `captions.srt`
- kein fertiges `youtube-upload.txt`

Der bereits begutachtete Test-Render ist nicht als finaler Export übernommen. Für die verbesserte Version müssen die Bilder mit dem revidierten Flow-Prompt neu erzeugt werden.
