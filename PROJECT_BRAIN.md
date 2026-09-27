# PROJECT BRAIN

## Zweck

Produktionsrepo für **Alltagspsychologie & menschliches Verhalten** mit YouTube-Longform/Testvideos und Reels/Shorts.

## Aktueller Status

- aktive Bildwelt: **Minimal Editorial Stickman World v2**
- Policy: `MINIMAL_EDITORIAL_STICKMAN_V2`
- Source of truth: `rules/VISUAL_SYSTEM.md`
- maschinenlesbar: `rules/visual-system.json`
- Anatomie: `rules/STICKMAN_DNA.md`
- Referenzpack: `assets/style-v2/`
- Script-Policy: `HOOK_FIRST_EXPLAIN_EARLY_V1`
- Kompositionsplanung: `VARIED_COMPOSITION_V1`
- Social-Scene-Policy: `SOCIAL_VARIETY_V1`
- Textpolicy bleibt zunächst `FLOW_VISIBLE_TEXT_ONLY_V3`

Die frühere `Universal Editorial Stickman World v1.3` mit `PREMIUM_EDITORIAL_CINEMATIC_V1` ist für neue Produktionen retired.

## Warum v2

Die v1.3-Praxistests zeigten einen strukturellen Konflikt:
- extrem simple Stickman-Anatomie
- gleichzeitig detailreiche, räumliche, beleuchtete Premium-Welt
- viele Art-Direction-Regeln pro Szene

Das führte zu Style-Drift, zu hoher Prompt-Komplexität und Bildern, die trotz vieler Regeln nicht eindeutig genug nach einer Kanalwelt aussahen.

v2 reduziert deshalb die Bildsprache bewusst:
- feste Anatomie
- feste Kanalpalette
- reduzierte Umgebung
- wenig Rendering
- große Negativflächen
- ein klarer Gedanke pro Bild
- einfache Alltagsszene oder starke Psychologie-Metapher

## v2 Kanalpalette

- Background `#F6F3EA`
- Ink `#202124`
- Blue `#3F6EDB`
- Coral / Problem `#E7684A`
- Green / Lösung `#4E9B78`
- optional Amber `#D6A23D`

Normale Szene: meistens nur eine dominante Akzentfarbe.
Keine neue Projektpalette pro Video.

## Umgebungsprinzip

**Suggest, do not render.**

Typisch 1–5 relevante Requisiten.
Beispiel Kino:
- wenige Sitze
- Screen/Tür-Hinweis
- Ticket
- Figur

Nicht mehr nötig:
- komplette Kinoarchitektur
- Materialtexturen
- cinematic lighting
- komplexe Tiefenstaffelung

## Szenenfamilien

Richtmix:
- 60% `EVERYDAY_MINIMAL`
- 25% `CONCEPT_METAPHOR`
- 10% `COMPARE_CHANGE`
- max. 5% Diagramm/Chart

## Referenzsystem

Scene 01 ist nicht mehr die globale Style-Source-of-Truth.

Permanentes Referenzpack:
`assets/style-v2/`

Ziel:
- style master
- anatomy sheet
- environment examples
- metaphor examples
- thumbnail reference

Bis die PNGs erstellt/freigegeben sind, gelten die textuelle und JSON-v2-Spezifikation.

Scene 01 kann aus Pipeline-Kompatibilität weiterhin Cover + erster Visual Beat bleiben.

## YouTube-Struktur

1. `01-script/` — `script.txt`
2. `02-google-flow/` — `google-flow-prompt.txt`
3. `03-bilder/` — `01.png`, `02.png`, ...
4. `04-audio/` — `final-voice.mp3`
5. `05-export/` — fertiger Export
6. `99-intern/` — technische Dateien, Quellen, QA und Metadaten

## Script-Einstieg

Neue YouTube-Projekte:
- Szene 01 = klare Hook-Frage oder direkte überraschende Aussage
- Kernbegriff spätestens Szene 03
- einfache Erklärung direkt danach
- konkretes Alltagsbeispiel spätestens Szene 05
- erst danach Mechanismus/Experiment/Vertiefung

## Visual Beats

- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- ein primärer visueller Gedanke pro Bild
- pro Beat bewusst wählen:
  - scene family
  - cast
  - action
  - minimal props
  - framing
  - accent role
  - text policy

## Textsystem

Bleibt bei dieser Migration unverändert:
- geplante sichtbare Texte direkt aus Google Flow
- nicht geplante Szenen `ZERO READABLE TEXT`
- Remotion erzeugt keine sichtbaren YouTube-Texte

## QA

Neue v2-Projekte müssen insbesondere prüfen:
- `visualSystem === MINIMAL_EDITORIAL_STICKMAN_V2`
- feste Kanalpalette vorhanden
- sparse environment policy aktiv
- one-dominant-accent policy aktiv
- keine v1-Cinematic-Hard-Locks im neuen Flow-Prompt
- Stickman-DNA korrekt
- Bild in ungefähr einer Sekunde verständlich

## Aktuelle Migration

Bestehende Videos/Prompts bleiben historische Legacy-Projekte und werden nicht automatisch umgeschrieben.
Neue Projekte und neue Style-Tests müssen v2 verwenden.
