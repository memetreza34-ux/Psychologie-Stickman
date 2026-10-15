## Wochenordnung — gültig ab 15.10.2026

YouTube-Videos liegen unter `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/<TT.MM.JJJJ-thema>/` (ISO-Woche Montag bis Sonntag). Vollständige Dateilinks/Projektpfade verwenden diesen Präfix. Siehe `rules/YOUTUBE_WEEK_FOLDERS.md`.

# YOUTUBE THEMEN SYSTEM — PSYCHOLOGIE & MENSCHLICHES VERHALTEN

**STATUS: VERBINDLICH**

## Kanalpositionierung

Der Kanal erklärt **Psychologie und menschliches Verhalten**.

Kernversprechen:

> Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

Der Kanal darf von normaler Alltagspsychologie bis zu dunkleren menschlichen Verhaltensmustern reichen. Gemeinsamer Nenner bleibt immer ein klarer psychologischer oder verhaltensbezogener Mechanismus.

Der Kanal ist kein allgemeiner Wissenskanal, kein medizinischer Beratungs- oder Therapiekanal und kein reiner Finanz-/News-/Politikkanal.

## Themen-Einmaligkeit — HARD GATE

Verbindlich: `TOPIC_UNIQUENESS_V1` aus `rules/TOPIC_UNIQUENESS_LOCK.md`.

Vor jeder neuen YouTube-Themenwahl:
- `TOPIC_REGISTRY.json` vollständig lesen
- vorhandene `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/TT.MM.JJJJ-*` Projekte prüfen
- deutsche/englische Synonyme und alternative Schreibweisen vergleichen
- den eigentlichen psychologischen Kernmechanismus vergleichen, nicht nur den Titel

**Ein kanonisches Thema / ein Kernmechanismus darf nur einmal als neues YouTube-Video-Projekt verwendet werden.**

Ein anderer Titel, Hook, Beispiel, visueller Winkel, `v2`, `Part 2` oder eine andere Verpackung macht dasselbe Thema nicht neu.

Wenn das Thema bereits registriert ist: Thema ablehnen und ein anderes wählen.

Ein wirklich neues Thema wird gleichzeitig mit dem neuen Projekt als neuer `USED`-Eintrag in `TOPIC_REGISTRY.json` registriert.

Historische Duplikate mit Status `LEGACY_DUPLICATE_LOCKED` bleiben nur als Altbestand erhalten und dürfen niemals um ein weiteres Projekt ergänzt werden.

## Feste Content-Säulen

### 1. Denken, Wahrnehmung & Denkfehler
- kognitive Verzerrungen
- Aufmerksamkeit und Wahrnehmung
- Erinnerung und Fehleinschätzungen
- Erwartungseffekte
- erste Eindrücke
- typische Denkfallen

### 2. Entscheidungen & Selbststeuerung
- Prokrastination
- Gewohnheiten
- Selbstkontrolle
- Motivation als Mechanismus
- kurzfristige vs. langfristige Entscheidungen
- Impulsivität und Aufschub

### 3. Einfluss, Überzeugung & Manipulation
- Überzeugung
- Framing
- Schuld- und Druckmechanismen
- soziale Einflussnahme
- Manipulationsmuster
- Täuschung und Vertrauensaufbau
- Abhängigkeit und schrittweise Kontrolle
- Schutzfaktoren und Grenzen

### 4. Macht, Status & Gruppendynamik
- Konformität
- Gruppendruck
- Status und Hierarchien
- Autorität
- Gehorsam
- soziale Kontrolle
- Kooperation und Konflikt
- Ausgrenzung
- Dehumanisierung und moralische Distanz, wenn seriös belegbar

### 5. Kommunikation & Beziehungen
- Körpersprache
- Missverständnisse
- Sympathie
- Vertrauen
- Gesprächsdynamiken
- Erwartungen
- soziale Signale
- Konflikte
- Bindungs- und Distanzverhalten ohne Ferndiagnosen

### 6. Geld, Konsum & Verhalten
Erlaubt, wenn der psychologische Mechanismus im Mittelpunkt steht:
- Konsumpsychologie
- Preiswahrnehmung
- Verhandlung
- Statussymbole
- Verlustaversion
- Risiko
- Gier
- Herdenverhalten
- finanzielle Denkfehler
- Betrugspsychologie
- Verhalten von Käufern, Verkäufern und Anlegern

Nicht gemeint sind reine Aktienanalysen, Kaufempfehlungen, Börsennews oder Finanzberatung ohne psychologischen Schwerpunkt.

### 7. Dunkle Seiten menschlichen Verhaltens
- Betrug
- Ausnutzung
- Machtmissbrauch
- Manipulation
- Grausamkeit und moralische Rechtfertigung
- sektenartige oder kontrollierende Gruppendynamiken
- Einschüchterung
- Anonymität und Enthemmung

Darstellung bleibt erklärend und evidenzorientiert. Der Kanal romantisiert oder lehrt keine schädliche Manipulation als Anleitung.

### 8. Digitale Psychologie
- Social Media
- Aufmerksamkeitssysteme
- Likes und soziale Bestätigung
- parasoziale Beziehungen
- Online-Mobs
- Doomscrolling
- Anonymität
- Vergleich mit anderen
- persuasive Interfaces als Verhaltensmechanismus

### 9. Psychologische Effekte, Experimente & Gedankenmodelle
- bekannte psychologische Effekte und Experimente, wenn belastbar belegt
- Gedankenexperimente
- Mechanismen hinter überraschendem Verhalten
- Replikationsprobleme und Unsicherheit transparent nennen

## Themen-Gate

Ein Thema wird angenommen, wenn:
1. Das Topic-Uniqueness-Gate bestanden ist und das Kernthema noch nicht im Register steht.
2. Es beantwortet eine klare Frage über menschliches Denken, Fühlen, Entscheiden, Kommunizieren, sozialen Einfluss oder Verhalten.
3. Der psychologische Mechanismus der eigentliche Kern ist.
4. Seriöse Quellen/Forschung oder belastbare Daten verfügbar sind.
5. Unsicherheit und umstrittene Forschung transparent dargestellt werden.
6. Das Thema genügend Tiefe für das Format bietet.
7. Es mehrere klar unterscheidbare Visual Beats ermöglicht.
8. Es sich in `PSYCHOLOGY_STICKMAN_WORLD_V1` sinnvoll visualisieren lässt.

## Erlaubte Grenzthemen

Finanzen, Geschichte, Politik, Technik, KI, Werbung oder Kriminalität dürfen behandelt werden, **wenn die zentrale Frage menschliches Verhalten erklärt**.

Passend:
- Warum halten Anleger Verluste zu lange?
- Warum wirken teure Statussymbole kompetent?
- Wie erzeugen Betrüger Vertrauen?
- Warum folgen Menschen Autoritäten?
- Warum machen soziale Plattformen variable Belohnungen so wirksam?

Nicht passend als eigenständiger Kern:
- Welche Aktie steigt morgen?
- Die Geschichte eines Krieges ohne Verhaltensfrage
- Parteipolitischer Kommentar
- reine Produktnews
- reine Technik-Erklärung ohne Verhaltensbezug

## Bevorzugte Video-Fragen

- Warum machen Menschen X, obwohl Y objektiv besser wäre?
- Warum glauben wir X?
- Wie verändert Macht Verhalten?
- Wie entsteht sozialer Druck?
- Warum vertrauen wir bestimmten Menschen schneller?
- Wie beeinflusst Geld unser Urteil?
- Wie erkennen wir psychologische Einflussmechanismen?
- Warum handeln Gruppen anders als Einzelne?
- Was passiert psychologisch, wenn X geschieht?

## Redaktionsprinzip

Der Kanal **erklärt Verhalten** statt Menschen aus der Ferne zu diagnostizieren.

Bevorzugt werden:
- Ursache → Wirkung
- sichtbare Alltagssituationen
- soziale Dynamiken
- konkrete Experimente/Forschung
- Gegenbeispiele und Grenzen
- überraschende, aber belastbare Erkenntnisse
- praktische Schutz- oder Reflexionspunkte bei Manipulation und schädlichem Einfluss
- kein pseudowissenschaftliches Mind-Reading
