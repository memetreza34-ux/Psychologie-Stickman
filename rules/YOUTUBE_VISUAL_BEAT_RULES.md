# YOUTUBE VISUAL BEAT RULES

**STATUS: VERBINDLICH**

Dieses Format lebt von vielen präzisen Bildern. Ein Bild darf nicht mehrere unterschiedliche Aussagen gleichzeitig tragen.

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

Wenn im Audio ein konkretes Objekt, ein Ort, eine Person oder ein Vorgang wichtig wird, muss genau dieser Inhalt im zugehörigen Beat sichtbar werden.

## Semantisch teilen, nicht nur nach Wortzahl

Der automatische Splitter ist nur die erste Stufe. Vor Phase 2 muss jeder Beat redaktionell auf seinen visuellen Inhalt geprüft werden.

Ein Beat wird zusätzlich getrennt, wenn ein Satz zwar kurz ist, aber mehrere eigenständige Bilder verlangt. Typische Signale:
- `aber`, `doch`, `während`, `obwohl`, `deshalb`
- mehrere Orte oder Medien in einer Aufzählung
- zwei unterschiedliche Handlungen
- Ursache und Folge im selben Satz
- Beispiel A und Beispiel B
- erst Wahrnehmung, dann Bewertung

## Individuelle Bildanpassung

Jeder Beat wird als eigene visuelle Aufgabe behandelt.

Verbindlich:
- Komposition an genau diesen Beat anpassen
- Kameradistanz, Perspektive, Pose, Handlung, Requisiten, Umgebung, Licht und Fokus bewusst wählen
- konkrete Stickman-Handlung in einer glaubwürdigen Szene bevorzugen
- abstrakte Infografik nur nutzen, wenn sie den Inhalt wirklich besser erklärt
- keine generische Standardszene nur mit ausgetauschtem Gegenstand
- keine unnötige Wiederholung derselben Pose/Kamera
- Master-Referenz hält Stickman-DNA, Linien, Farben und Shading konsistent; sie sperrt nicht die Komposition oder Figurenidentität
- **Szene 01:** exakten deutschen Cover-Titel direkt in Google Flow rendern
- **Szene 02+:** Google-Flow-Quellbilder ohne lesbaren Text generieren
- spätere deutsche Keywords, falls geplant, kontrolliert in Remotion hinzufügen

## Keine Sammelbilder

Verbotenes Muster:
- 20–30 Sekunden Audio
- 5–8 unterschiedliche Aussagen
- ein einziges Bild, das alles gleichzeitig vorwegnehmen soll

Ein Bild darf keine spätere Information vorwegnehmen, nur damit weniger Bilder benötigt werden.

## Dichte

Für normale Erklärpassagen:
- bevorzugt ungefähr 4–8 Sekunden pro Bildidee
- 8–12 Sekunden nur, wenn wirklich derselbe visuelle Gedanke weiter erklärt wird
- mehr als ungefähr 12 Sekunden nur bewusst und begründet

Vor dem finalen Audio wird diese Dichte über gesprochene Wörter angenähert:
- Zielbereich: meist **10–16 Wörter pro Visual Beat**
- automatischer Standard-Zielwert: **14 Wörter**
- empfohlene Obergrenze: **20 Wörter**
- 21–28 Wörter nur als bewusst markierte Ausnahme
- absolute Obergrenze: **28 Wörter**
- Durchschnitt über das ganze Video: höchstens **16 Wörter pro Szene**
- mindestens ungefähr `ceil(Gesamtwörter / 18)` Szenen

Die Bildzahl ist kein Selbstzweck. Entscheidend ist die Zahl der echten visuellen Gedanken.

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

`visualTask` beschreibt ausschließlich, was während genau dieses gesprochenen Beats sichtbar sein muss.

## Text-Policy pro Bild

### Szene 01

`textPolicy: "EXACT_GERMAN_COVER_TITLE_ONLY"`

Verbindlich:
- `coverHeadline` ist vorher festgelegt
- 2–7 deutsche Wörter
- Google Flow rendert exakt diesen Titel direkt in Bild 01
- außer diesem Titel kein weiterer lesbarer Text
- bei Schreibfehlern oder Pseudo-Schrift Szene 01 regenerieren
- Remotion darf den Titel nicht erneut rendern

### Szene 02+

Standard:
`textPolicy: "NONE"`

Das bedeutet für Google Flow:
- keine lesbaren Buchstaben
- keine Wörter
- keine UI-Texte
- keine Labels
- keine Untertitel
- Cover-Titel aus der Master-Referenz nicht kopieren

Geplante spätere deutsche Keywords werden vorzugsweise in Remotion gerendert.

## Automatische Sicherung

`npm run qa:visual-density`

Der Check schlägt fehl, wenn:
- durchschnittlich mehr als 16 Wörter pro Szene entstehen
- eine normale Szene mehr als 20 Wörter enthält
- eine Ausnahme mehr als 28 Wörter enthält
- zu wenige Szenen für die Skriptmenge vorhanden sind
- `visualTask` fehlt

Eine Szene mit 21–28 Wörtern muss explizit `allowExtendedBeat: true` tragen.

## Phase 2

Phase 2 darf:
- Stil auf den vorhandenen Visual Beat anwenden
- den konkreten Beat verständlich und individuell komponieren
- abstrakte Formulierung in eine konkrete passende Stickman-Handlung übersetzen
- in Szene 01 den exakt festgelegten Cover-Titel als Teil der Cover-Komposition rendern

Phase 2 darf nicht:
- mehrere Beats zusammenlegen, um Bildzahl zu sparen
- Inhalte aus späteren Beats vorziehen
- gesprochenen Inhalt durch dekoratives Füllmaterial ersetzen
- eine alte Komposition nur aus Bequemlichkeit wiederverwenden
- ab Szene 02 englische oder deutsche Promptbegriffe als Bildtext übernehmen
- den Titel aus Bild 01 in spätere Bilder kopieren

## Final-QA

Nach dem Render prüfen:
- Ist der zentrale Inhalt des gerade gesprochenen Satzes gleichzeitig sichtbar?
- Ist das Bild individuell auf diesen Beat zugeschnitten?
- Ist eine konkrete Szene möglich, wo aktuell nur eine generische Infografik steht?
- Bleibt ein Bild ungewöhnlich lange stehen?
- zeigt das Bild schon Informationen, die das Audio erst später erklärt?
- gibt es einen wichtigen Satz, für den keine passende visuelle Darstellung existiert?
- Szene 01: ist der exakte deutsche Cover-Titel korrekt und ohne zusätzlichen lesbaren Text gerendert?
- Szene 02+: enthält ein Flow-Quellbild unerwünschten lesbaren Text oder eine Kopie des Cover-Titels?
- sind spätere deutsche Remotion-Keywords korrekt und absichtlich gesetzt?

Wenn eine dieser Fragen problematisch ist, geht das Video zurück zu Phase 1/2 statt nur den Schnitt zu kaschieren.
