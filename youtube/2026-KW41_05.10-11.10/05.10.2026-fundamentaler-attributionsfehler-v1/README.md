# Fundamentaler Attributionsfehler — Longform v1

## Status

READY_FOR_GOOGLE_FLOW_COVER_TEST

## Produktionsmodus

**LONGFORM_STANDARD_V1**

Erstes reguläres Video nach der Testphase.

Ziel:
- **6–7 Minuten**
- ca. **989 gesprochene Wörter**
- Zielwert etwa **6:30 Minuten**, abhängig von finaler Stimme und der verbindlichen 1,10×-Verarbeitung
- **72 Visual Beats**
- 16:9 / 1920×1080 / 30 fps

## Topic-Uniqueness-Preflight

**PASS.**

Neues kanonisches Thema:
**Fundamentaler Attributionsfehler / Correspondence Bias**

Geprüft:
- `TOPIC_REGISTRY.json`
- `rules/TOPIC_UNIQUENESS_LOCK.md`
- vorhandene `youtube/TT.MM.JJJJ-*` Projekte
- Repo-Suche nach `fundamentaler Attributionsfehler`
- Repo-Suche nach `correspondence bias`

Keine bestehende YouTube-Produktion mit diesem Kernmechanismus gefunden.

Neuer Registry-Eintrag:
`fundamentaler-attributionsfehler`

## Thema

Warum wir das Verhalten anderer oft zu schnell mit ihrem Charakter erklären und den Einfluss von Situation, Rolle, Zeitdruck oder Kontext unterschätzen.

## Arbeitstitel

**Warum du Menschen falsch einschätzt – Der fundamentale Attributionsfehler**

## Cover

Exact headline:

**DU KENNST DEN GRUND NICHT**

Visual thesis:
Ein Fahrer wird wegen eines sichtbaren Spurwechsels sofort beurteilt, während die breitere Straßensituation eine mögliche Erklärung zeigt, die der Beobachter zunächst nicht vollständig sehen kann.

## Script-Struktur

### Hook / Einstieg
- Straßenverkehr: fremder Fehler = „rücksichtslos“, eigener Fehler = „Stress“
- Kernbegriff bereits in Szene 02
- einfache Definition in Szene 03
- erstes konkretes Alltagsbeispiel in Szene 04

### Hauptteil 1 — Was der Fehler bedeutet
- Verspätung
- knappe Kollegin
- Persönlichkeit ist nicht bedeutungslos
- Problem = zu starke Personen- und zu schwache Kontextgewichtung

### Hauptteil 2 — Klassische Forschung
- Jones & Harris (1967)
- Ross, Amabile & Steinmetz (1977)
- Quiz-Rollen als besonders anschauliches Kernexperiment

### Hauptteil 3 — Warum das Urteil entsteht
- Aufmerksamkeit / Salienz
- unbekannte Situationsfaktoren
- falsche Einschätzung ihrer Stärke
- unvollständige Korrektur
- kognitive Belastung

### Hauptteil 4 — Alltag
- Meeting / Hierarchie
- Restaurant / Arbeitslast
- Schule / Ausbildung
- Bewerbungsgespräch
- Social Media
- Macht und Rollen

### Hauptteil 5 — Grenzen und Nuance
- Korrespondenzbias als präzisere Beschreibung des beobachteten Musters
- mehrere mögliche Prozesse statt eines einzigen universellen Fehlers
- kulturelle Unterschiede
- stabile Eigenschaften können real sein, wenn Verhalten sich über Kontexte wiederholt

### Schluss
Drei Reflexionsfragen:
1. Welche Situationsinformation fehlt mir?
2. Würde ich dieselbe Handlung gleich beurteilen, wenn ich selbst in dieser Rolle wäre?
3. Würde die Person bei anderem Zeitdruck, anderen Machtverhältnissen oder anderen Erwartungen anders handeln?

Endgedanke:
**Wir sehen meistens die Person. Die Situation müssen wir bewusst dazudenken.**

## Hook-Check

- `scriptHookPolicy`: `HOOK_FIRST_EXPLAIN_EARLY_V1`
- `hookType`: `WHY_DOES`
- Kernbegriff: Szene 02
- einfache Definition: Szene 03
- erstes Alltagsbeispiel: Szene 04

## Bildstrategie

72 Beats, bewusst nicht Character-only.

Representation-Mix:
- 15 `CHARACTER_SCENE`
- 15 `OBJECT_FOCUS`
- 20 `ENVIRONMENT_SCENE`
- 16 `COMPARE_VISUAL`
- 6 `TEXT_ILLUSTRATION`
- 0 `SCHEMA_EXPLAINER`

Damit liegt der Character-Anteil deutlich unter dem 75%-Grenzwert.

## Visuelle Leitidee

Das Video arbeitet immer wieder mit einem Muster:

**enger Blick auf die Person → breiter Blick auf die Situation**

Aber nicht als identische Wiederholung. Die Motive wechseln über:
- Straße
- Büro
- 1960er Forschung
- 1970er Quiz-Labor
- moderne Meetings
- Restaurant
- Unterricht
- Bewerbung
- Social Media
- Hierarchie
- Kultur-/Medienvergleich

Jede Szene besitzt:
- `motifKey`
- `visualChangeReason`
- `panelCount`
- maximal 2 sichtbare States/Panels

## Geplanter sichtbarer Text

Nur:
- BILD 01: `DU KENNST DEN GRUND NICHT`
- BILD 02: `FUNDAMENTALER ATTRIBUTIONSFEHLER`
- BILD 36: `UNSICHER? UNVORBEREITET? DESINTERESSIERT?`
- BILD 47: `ARROGANT? DUMM? AGGRESSIV?`
- BILD 56: `KORRESPONDENZBIAS`
- BILD 65: `3 FRAGEN VOR DEM URTEIL`
- BILD 72: `DU SIEHST NIE ALLES.`

Alle anderen Bilder:
**ZERO READABLE TEXT**

## Flow-Ablauf

1. komplette `02-google-flow/google-flow-prompt.txt` in einen neuen Flow-Agent-Chat geben
2. zuerst nur BILD 01
3. exakt 3 getrennte 16:9 Cover-Kandidaten
4. STOP für Nutzerwahl
5. Gewinner -> `03-bilder/01.png`
6. `01.png` als Episoden-Style-Referenz verwenden
7. danach 5er-Batches:
   - 02–06
   - 07–11
   - 12–16
   - 17–21
   - 22–26
   - 27–31
   - 32–36
   - 37–41
   - 42–46
   - 47–51
   - 52–56
   - 57–61
   - 62–66
   - 67–71
   - 72 Rest-Batch
8. jedes BILD bleibt eine separate Datei
9. akzeptierte Bilder sofort `NN.png`
10. alles flach in `03-bilder/`

## Quellen

Siehe:
`99-intern/sources.md`

Kernquellen:
- Jones & Harris (1967)
- Ross, Amabile & Steinmetz (1977)
- Gilbert, Pelham & Krull (1988)
- Morris & Peng (1994)
- Gilbert & Malone (1995)
- Gawronski (2004)

## Noch nicht vorhanden

- keine finalen Flow-Bilder
- keine Voice-Datei
- kein finaler Render
- kein `final.mp4`
- kein `thumbnail.png`
- keine `captions.srt`
- kein `subtitle-script.txt`
- kein fertiges `youtube-upload.txt`

## Späterer Export

```text
05-export/
├── final.mp4
├── thumbnail.png
├── captions.srt
├── subtitle-script.txt
└── youtube-upload.txt
```

Keine separaten Caption-/Subtitle-Unterordner.

## Export-Metadaten V2

Dieses Projekt nutzt `YOUTUBE_EXPORT_PACKAGE_V2`.

Interne Quelle:
`99-intern/youtube-upload.json`

Beim finalen Produktionslauf werden automatisch erzeugt:
- `05-export/captions.srt` — direkt bei YouTube hochladbar
- `05-export/subtitle-script.txt` — lesbare Zeitstempel + Sprechertext zum Kopieren
- `05-export/youtube-upload.txt` — finaler Titel, Beschreibung und restliche Upload-Daten
