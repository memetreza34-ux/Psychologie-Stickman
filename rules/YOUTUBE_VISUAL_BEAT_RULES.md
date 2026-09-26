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
- Kameradistanz, Perspektive, Pose, Handlung, Requisiten, Umgebung, Licht, Farbe und Fokus bewusst wählen
- konkrete Alltagshandlung bevorzugen
- abstrakte Infografik nur wenn wirklich klarer
- keine generische Standardszene
- keine unnötige Wiederholung derselben Pose/Kamera
- Master hält Stickman-DNA, Premium-Qualitätsniveau, Linien, Farbverhalten und Shading konsistent; er sperrt nicht Komposition oder Figurenidentität

Zusätzlich verbindlich:
- `rules/PREMIUM_VISUAL_LOCK.md`
- `rules/COMPOSITION_VARIATION_LOCK.md`
- `rules/SOCIAL_SCENE_LOCK.md`

## Premium-Felder pro Beat

Bei neuen Projekten mit `PREMIUM_EDITORIAL_CINEMATIC_V1` trägt jede Szene zusätzlich:
- `colorDirection`
- `premiumCharacterDirection`

`colorDirection` beschreibt:
- welche Projektfarbe den Fokus trägt
- Hintergrund-/Neutralrolle
- Lichttemperatur / Kontrast
- wie graue/beige Monotonie vermieden wird

`premiumCharacterDirection` beschreibt:
- Pose/Körpersprache
- Emotion
- Kleidung/Rolle
- relevante Requisiten
- Interaktion bei Duo/Gruppe

Premium bedeutet niemals realistischere Anatomie.

## Real-Life Scene Priority

Bei Alltagspsychologie gilt:
1. echte erkennbare Alltagsszene
2. visuelle Metapher
3. abstrakte Lehrgrafik nur wenn sie klarer ist

Vermeiden:
- riesige schwebende Zahlen als Universalbild
- endlose Skalen/Karten/Waagen/Pfeile
- sterile Büroserien
- neutrale Figur vor Symbol

Wenn ein Einkauf, Gespräch, Café, ÖPNV, Arbeitsplatz, Schule, Wohnung, Verhandlung oder soziale Situation denselben Punkt zeigen kann, gewinnt die konkrete Szene.

## Kompositionsplanung

Jede neue Phase-1-Szene trägt:
- `compositionType`: `standard`, `split`, `contrast` oder `montage`
- `socialDensity`: `solo`, `duo` oder `group`

Planungsziel für typische 2–3-Minuten-Videos:
- ungefähr 70 % `standard`
- ungefähr 20 % `split`/`contrast`
- ungefähr 10 % `montage`

Das ist eine Anti-Monotonie-Richtlinie, keine starre Quote. Inhaltliche Klarheit gewinnt immer.

## Mehrere Teilbilder in einem Frame

Multi-Panel-/Montage-Bilder sind erlaubt und ausdrücklich erwünscht, wenn sie **denselben gesprochenen Beat** verständlicher machen.

Geeignet für:
- Vorher/Nachher
- A/B-Vergleich
- Behauptung/Gegenbeispiel
- mehrere kurze Beispiele derselben Aussage
- Hauptszene + 1–2 unterstützende Detailausschnitte

Nicht erlaubt:
- mehrere unabhängige Beats zusammenpressen
- spätere Inhalte vorwegnehmen
- unruhige Collage ohne klare Blickführung

## Soziale Szenen

Bei sozialen Beats Castgröße aktiv nutzen.

Bevorzugt `duo` oder `group` bei:
- Feedback
- Gesprächen
- Zustimmung/Widerspruch
- Gruppeneinfluss
- Beobachtung
- Publikum
- Freundschaft/Familie/Kollegen
- sozialem Vergleich
- Experimenten mit Teilnehmenden

Keine Zwangsgruppen bei klar inneren Solo-Beats.

## Sichtbarer Text — GOOGLE FLOW ONLY

Für neue YouTube-Projekte:

**Alle sichtbaren Texte werden direkt von Google Flow in das jeweilige Bild gerendert. Remotion erzeugt keinen sichtbaren Text.**

Zusätzlich gilt `rules/FLOW_TEXT_STYLE_LOCK.md`.

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
- Text ästhetisch in die Komposition integrieren
- keine Meme-/Sticker-Standardtypografie

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
- `compositionType`
- `socialDensity`

Bei Premium-Projekten zusätzlich:
- `colorDirection`
- `premiumCharacterDirection`

Empfohlen:
- `visualIdea`
- `subject`
- `action`
- `environment`
- `camera`
- `textPolicy`
- bei Textszenen `flowText`

## Automatische Sicherung

Mindestens:
- `npm run qa:visual-density`
- `npm run qa:visual-variety`
- `npm run qa:premium-content`

Die Checks sichern unter anderem:
- sinnvolle Beat-Dichte
- geplante Kompositionsvariation
- Social-Density-Felder
- Premium-/Color-Projektmetadaten
- Script-Hook-Plan
- keine vollständig monotone Einzelbildserie
- neue Zukunftsmarker für künftige Projekte

## Phase 2 / Google Flow

Phase 2 darf:
- Stil auf den Visual Beat anwenden
- den Beat verständlich und individuell komponieren
- Premium-Figurenführung und Farbrolle umsetzen
- geplanten exakten deutschen Text direkt in das Bild rendern
- Split-/Kontrast-/Montage-Kompositionen verwenden, wenn sie denselben Beat unterstützen

Phase 2 darf nicht:
- mehrere unabhängige Beats zusammenlegen
- Inhalte aus späteren Beats vorziehen
- alte Komposition nur aus Bequemlichkeit wiederverwenden
- Premium durch realistischere Human-Anatomie ersetzen
- graue/beige Monotonie als Standard erzeugen
- Lehrgrafik wählen, wenn eine konkrete Alltagsszene klarer wäre
- ungeplanten Text erzeugen
- Text aus Bild 01 in spätere Bilder kopieren

## Final-QA

Prüfen:
- zentraler Inhalt des gesprochenen Satzes gleichzeitig sichtbar
- Bild individuell auf Beat zugeschnitten
- Premium-Figur statt generischer Platzhalterfigur
- Farbe/Licht bewusst statt Einheitswash
- echte Alltagsszene bevorzugt, wo sinnvoll
- keine unnötig generische Infografik
- keine monotone Serie aus `eine Figur + Raum`
- Split/Montage dort eingesetzt, wo sie echten Mehrwert bringen
- soziale Beats zeigen ausreichend Interaktion
- kein ungewöhnlich langer Bildstillstand ohne Grund
- keine spätere Information vorweggenommen
- geplante Flow-Texte exakt, vollständig, ästhetisch und nicht abgeschnitten
- nicht geplante Textszenen vollständig textfrei
- kein sichtbarer Text aus Remotion

Bei Problemen geht das Video zurück zu Phase 1/2 statt den Fehler im Schnitt zu kaschieren.
