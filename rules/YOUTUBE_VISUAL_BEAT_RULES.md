# YOUTUBE VISUAL BEAT RULES

**STATUS: VERBINDLICH**

## Grundregel

**Ein wichtiger visueller Gedanke = ein Visual Beat = grundsätzlich ein eigenes, individuell angepasstes Bild.**

Eine neue Szene beginnt insbesondere bei:
- neuem Fakt oder neuer Kernaussage
- neuem Ort, Akteur, Objekt oder System
- neuem Zeitbezug / Zeitsprung
- neuer wichtiger Zahl oder Größenordnung
- neuer Handlung
- Ursache → Folge
- Vergleich A → B
- Frage → Antwort
- neuem Schritt einer Mechanismus-/Metapher-Erklärung
- Wechsel von Problem → Konsequenz → Lösung

## Semantisch teilen, nicht nur nach Wortzahl

Der automatische Splitter ist nur die erste Stufe. Vor Phase 2 muss jeder Beat redaktionell auf seinen visuellen Inhalt geprüft werden.

Zusätzlich teilen bei mehreren eigenständigen Bildern, z. B.:
- `aber`, `doch`, `während`, `obwohl`, `deshalb`
- mehrere Orte oder Medien
- zwei unterschiedliche Handlungen
- Ursache und Folge
- Beispiel A und Beispiel B
- Wahrnehmung und anschließende Bewertung

## Individuelle Bildanpassung

Verbindlich:
- Komposition an genau diesen Beat anpassen
- Kameradistanz, Perspektive, Pose, Handlung, Requisiten, Umgebung, Licht und Fokus bewusst wählen
- konkrete Stickman-Handlung bevorzugen
- abstrakte Infografik nur wenn wirklich klarer
- keine generische Standardszene
- keine unnötige Wiederholung derselben Pose/Kamera
- Master hält Stickman-DNA, Linien, Farben und Shading konsistent; er sperrt nicht Komposition oder Figurenidentität

## Sichtbarer Text — GOOGLE FLOW ONLY

Für neue YouTube-Projekte:

**Alle sichtbaren Texte werden direkt von Google Flow in das jeweilige Bild gerendert. Remotion erzeugt keinen sichtbaren Text.**

### Geplante Textszene
Phase 1 trägt:
- `textPolicy: "FLOW_EXACT_COVER_TEXT"` für Szene 01
- `textPolicy: "FLOW_EXACT_KEYWORD_TEXT"` für spätere geplante Textmomente
- `flowText: "EXAKTER DEUTSCHER TEXT"`

Grenzen:
- Cover: 2–7 Wörter
- spätere Keywords: 1–5 Wörter
- genau der vorgegebene Text
- NO OTHER READABLE TEXT

### Nicht geplante Textszene
`textPolicy: "NONE"`

Das bedeutet:
- ZERO READABLE TEXT
- keine UI-Texte
- keine Labels
- keine Untertitel
- keine Textkopie aus Master 01

### Textdichte
- Ziel meist 15–25 % inklusive Cover
- harte Obergrenze 30 %

## Keine Sammelbilder

Nicht mehrere unterschiedliche Aussagen in ein einziges Bild quetschen, nur um Bildzahl zu sparen.

## Dichte

Für normale Erklärpassagen:
- bevorzugt ungefähr 4–8 Sekunden pro Bildidee
- 8–12 Sekunden nur wenn wirklich derselbe visuelle Gedanke weiter erklärt wird
- mehr als ungefähr 12 Sekunden nur bewusst und begründet

Vor finalem Audio:
- Zielbereich meist 10–16 Wörter pro Visual Beat
- Standard-Zielwert 14 Wörter
- normale Obergrenze 20
- 21–28 nur als bewusst markierte Ausnahme
- absolute Obergrenze 28
- Durchschnitt höchstens 16 Wörter pro Szene
- mindestens ungefähr `ceil(Gesamtwörter / 18)` Szenen

## Phase 1

Jeder Beat enthält mindestens:
- `startPhrase`
- `endWord`
- `speechSection`
- `visualTask`

Empfohlen:
- `visualIdea`
- `subject`
- `action`
- `environment`
- `camera`
- `textPolicy`
- bei Textszenen `flowText`

## Automatische Sicherung

`npm run qa:visual-density`

Der Check schlägt fehl, wenn:
- durchschnittlich mehr als 16 Wörter pro Szene entstehen
- normale Szene mehr als 20 Wörter enthält
- Ausnahme mehr als 28 Wörter enthält
- zu wenige Szenen vorhanden sind
- `visualTask` fehlt

## Phase 2 / Google Flow

Phase 2 darf:
- Stil auf den Visual Beat anwenden
- den Beat verständlich und individuell komponieren
- geplanten exakten deutschen Text direkt in das Bild rendern

Phase 2 darf nicht:
- mehrere Beats zusammenlegen
- Inhalte aus späteren Beats vorziehen
- alte Komposition nur aus Bequemlichkeit wiederverwenden
- ungeplanten Text erzeugen
- Text aus Bild 01 in spätere Bilder kopieren

## Final-QA

Prüfen:
- zentraler Inhalt des gesprochenen Satzes gleichzeitig sichtbar
- Bild individuell auf Beat zugeschnitten
- keine unnötig generische Infografik
- kein ungewöhnlich langer Bildstillstand ohne Grund
- keine spätere Information vorweggenommen
- geplante Flow-Texte exakt, vollständig und nicht abgeschnitten
- nicht geplante Textszenen vollständig textfrei
- kein sichtbarer Text aus Remotion

Bei Problemen geht das Video zurück zu Phase 1/2 statt den Fehler im Schnitt zu kaschieren.
