# YOUTUBE VISUAL BEAT RULES

**STATUS: VERBINDLICH**

Dieses Format lebt von vielen präzisen Bildern. Ein Bild darf nicht 15–30 Sekunden lang mehrere verschiedene Aussagen gleichzeitig tragen.

## Grundregel

**Ein wichtiger visueller Gedanke = ein Visual Beat = grundsätzlich ein eigenes, individuell angepasstes Bild.**

Eine neue Szene beginnt insbesondere bei:
- neuem Fakt oder neuer Kernaussage
- neuem Ort, Akteur, Objekt oder System
- neuem Zeitbezug / Zeitsprung
- neuer wichtigen Zahl oder Größenordnung
- neuer Handlung
- Ursache → Folge
- Vergleich A → B
- Frage → Antwort
- neuem Schritt einer Mechanismus-/Metapher-Erklärung
- Wechsel von Problem → Konsequenz → Lösung

Wenn im Audio ein konkretes Objekt, ein bestimmter Ort, eine Person, ein Vorgang oder ein anderer zentraler Inhalt wichtig wird, muss genau dieser Inhalt im zugehörigen Beat sichtbar bzw. eindeutig visualisiert werden.

## Individuelle Bildanpassung

Jeder Beat wird als eigene visuelle Aufgabe behandelt.

Verbindlich:
- Komposition an genau diesen Beat anpassen.
- Kameradistanz, Perspektive, Pose, Handlung, Requisiten, Umgebung, Licht und Fokus bewusst wählen.
- Keine generische Standardszene nur mit ausgetauschtem Gegenstand.
- Keine unnötige Wiederholung derselben Pose/Kamera, wenn eine andere Darstellung den Inhalt besser erklärt.
- Master-Referenz hält Figuren-DNA, Linien, Farben und Shading konsistent; sie sperrt **nicht** die Komposition.
- sichtbarer Text nur bei echter Erklärfunktion und dann **Deutsch**.
- wenn Text nicht nötig ist, keinen Text generieren.

## Keine Sammelbilder

Verbotenes Muster:
- 20–30 Sekunden Audio
- 5–8 unterschiedliche Aussagen
- ein einziges Bild, das alles gleichzeitig vorwegnehmen soll

Ein Bild darf **keine spätere Information vorwegnehmen**, nur damit weniger Bilder benötigt werden.

## Dichte

Für normale Erklärpassagen:
- bevorzugt ungefähr 4–8 Sekunden pro Bildidee
- 8–12 Sekunden nur, wenn wirklich derselbe visuelle Gedanke weiter erklärt wird
- mehr als ungefähr 12 Sekunden nur bewusst und begründet
- 20–30 Sekunden auf demselben statischen Bild sind für dieses Format grundsätzlich ein Fehler

Vor dem finalen Audio wird diese Dichte über gesprochene Wörter angenähert:
- Ziel: meist 8–18 gesprochene Wörter pro Visual Beat
- Durchschnitt über das ganze Video: höchstens 18 Wörter pro Szene
- harte Obergrenze: 28 Wörter pro Szene
- mindestens ungefähr `ceil(Gesamtwörter / 20)` Szenen

Für 10–14 Minuten entstehen dadurch häufig ungefähr **90–150 Bilder**. Das ist kein starres Quotenziel: Entscheidend ist die Zahl der echten visuellen Gedanken.

## Phase 1

Phase 1 ist **Visual-Beat-Planung**, nicht grobe Kapitelplanung.

Jeder Beat enthält:
- `startPhrase`
- `endWord`
- `speechSection`
- `visualTask`

`visualTask` beschreibt ausschließlich, was während genau dieses gesprochenen Beats sichtbar sein muss. Stilfragen werden davon getrennt behandelt.

## Automatische Sicherung

`npm run qa:visual-density`

Der Check schlägt fehl, wenn ein Produktionsprojekt wieder zu wenige bzw. zu große Szenen enthält.

Für skriptbasierte Longform-Projekte kann `autoFromScript` genutzt werden. Der Splitter trennt Absätze in Sätze und lange Sätze zusätzlich in kleinere visuelle Beats. Vor Phase 2 müssen die Beats trotzdem redaktionell geprüft werden.

## Phase 2

Phase 2 darf:
- Stil auf den vorhandenen Visual Beat anwenden
- den konkreten Beat verständlich und individuell komponieren

Phase 2 darf nicht:
- mehrere Beats zusammenlegen, um Bildzahl zu sparen
- Inhalte aus späteren Beats vorziehen
- den gesprochenen Inhalt durch ein nur dekoratives Bild ersetzen
- eine alte Komposition nur aus Bequemlichkeit wiederverwenden

## Final-QA

Nach dem Render muss geprüft werden:
- Ist der zentrale Inhalt des gerade gesprochenen Satzes gleichzeitig sichtbar?
- Ist das Bild individuell auf diesen Beat zugeschnitten?
- Bleibt ein Bild ungewöhnlich lange stehen?
- zeigt das Bild schon Informationen, die das Audio erst später erklärt?
- gibt es einen wichtigen Satz, für den keine passende visuelle Darstellung existiert?
- ist eventuell sichtbarer Text Deutsch?

Wenn eine dieser Fragen problematisch ist, geht das Video zurück zu Phase 1/2 statt nur den Schnitt zu kaschieren.
