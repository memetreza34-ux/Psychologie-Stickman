# SCRIPT HOOK LOCK — DIRECT HOOK + EARLY EXPLANATION + EARLY REAL-LIFE EXAMPLE

**STATUS: VERBINDLICH — HARD LOCK FÜR NEUE YOUTUBE-PROJEKTE**

Diese Regel verhindert langsame, abstrakte oder unklare Einstiege.

Policy:
- `scriptHookPolicy: "HOOK_FIRST_EXPLAIN_EARLY_V1"`

## 1. Ziel

Die ersten Sekunden müssen dem Zuschauer sofort sagen, **worum es geht und warum es interessant ist**.

Bevorzugte Reihenfolge für Psychologie-Erklärvideos:
1. klare Hook-Frage oder überraschende direkte Aussage
2. Begriff/Thema früh nennen
3. in einem einfachen Satz erklären
4. sofort ein konkretes Alltagsbeispiel
5. erst danach Experiment, Mechanismus, Vertiefung und Nuancen

## 2. Erlaubte Hook-Typen

Bevorzugt:
- `WHAT_IS` — „Was ist der Ankereffekt?“
- `WHY_DOES` — „Warum wirkt ein Preis plötzlich günstig, nur weil vorher ein höherer dastand?“
- `HAVE_YOU_WONDERED` — „Hast du dich schon gefragt, warum …?“
- `DIRECT_SURPRISE` — kurze überraschende Aussage, die das Thema sofort öffnet
- `DIRECT_PROBLEM` — konkretes Alltagsproblem ohne lange Einleitung

Nicht als Standard:
- langsames „Stell dir vor …“ über mehrere Sätze
- allgemeine philosophische Vorrede
- mehrere Beispiele, bevor der Begriff überhaupt genannt wird
- abstrakte Definition ohne Hook
- Clickbait-Frage, die der Inhalt nicht sauber beantwortet

## 3. Zeitliche Grenzen

Für typische 2–3-Minuten-Videos:
- Hook: **Szene 01**
- Kernbegriff/Konzept: spätestens **Szene 03**
- einfache Erklärung/Definition: direkt mit oder unmittelbar nach der Begriffseinführung
- erstes konkretes Alltagsbeispiel: spätestens **Szene 05**

Richtwert im Text:
- Kernbegriff innerhalb der ersten ungefähr 50 gesprochenen Wörter
- erstes konkretes Beispiel innerhalb der ersten ungefähr 80 gesprochenen Wörter

Inhaltliche Klarheit gewinnt, aber ein später Einstieg braucht eine bewusste redaktionelle Begründung.

## 4. Hook muss eigenständig funktionieren

Szene 01 soll ohne Vorwissen verständlich sein.

Gut:
- „Was ist der Ankereffekt?“
- „Warum bleibt eine einzige negative Bemerkung länger hängen als zehn positive?“
- „Hast du dich schon gefragt, warum du einen Fehler viel stärker bemerkst als alle anderen?“

Schwach:
- „Manchmal passieren Dinge, die unser Denken beeinflussen.“
- „Unser Gehirn ist kompliziert.“
- „Es gibt viele interessante Effekte in der Psychologie.“

## 5. Frühe Definition

Die frühe Erklärung darf Teil der laufenden Handlung sein. Kein zusätzlicher Definitionsabsatz nötig, wenn ein kurzer Satz das beobachtete Problem bereits verständlich erklärt. Neue Longforms verbinden Erklärung und spätere konkrete Anwendung nach `rules/STORY_EXPLANATION_PROOF.md`; die zeitlichen Grenzen dieser Hook-Regel bleiben bestehen.

Die Definition soll:
- in Alltagssprache funktionieren
- möglichst nur einen Hauptsatz enthalten
- kein Fachjargon-Feuerwerk sein
- den Effekt nicht übertreiben

Muster:
`[Begriff] bedeutet vereinfacht, dass ...`

## 6. Frühes Alltagsbeispiel

Das erste Beispiel soll:
- konkret sein
- visuell stark sein
- sofort nachvollziehbar sein
- zum Kernmechanismus passen

Bevorzugt echte Situationen statt abstrakter Zahlen-/Symbolerklärung.

Beispiele:
- Preisetikett / Rabatt
- Bewerbungsgespräch
- Restaurantwahl
- Gruppenreaktion
- Präsentation
- Nachricht / Social Media
- Einkauf / Gebrauchtkauf

## 7. Script-Struktur danach

Nach dem Einstieg typischerweise:
- Mechanismus / warum passiert es?
- Experiment oder Evidenz
- 2–3 abwechslungsreiche Alltagsbeispiele
- Grenzen/Nuance
- kurze praktische Schlussfolgerung oder Denkfrage
- prägnanter Endsatz

Kein Zwang zu exakt dieser Reihenfolge, aber Hook und frühe Klarheit sind Pflicht.

## 8. Metadaten neuer Projekte

Neue Projekte tragen mindestens:

```json
{
  "scriptHookPolicy": "HOOK_FIRST_EXPLAIN_EARLY_V1",
  "hookType": "WHAT_IS",
  "coreConceptTerm": "Ankereffekt",
  "coreConceptIntroducedByScene": 2,
  "realLifeExampleByScene": 4,
  "realLifeExampleSummary": "Ein höherer erster Preis lässt den zweiten Preis günstiger wirken."
}
```

## 9. QA

HARD FAIL bei neuen Projekten, wenn:
- `scriptHookPolicy` fehlt
- Hook-Typ fehlt
- Kernbegriff leer ist
- Kernbegriff laut Plan erst nach Szene 3 kommt
- erstes Alltagsbeispiel laut Plan erst nach Szene 5 kommt
- `realLifeExampleSummary` fehlt

Zusätzliche automatische Prüfung:
- Kernbegriff muss tatsächlich früh im Skript vorkommen
- WHAT_IS / WHY_DOES / HAVE_YOU_WONDERED sollten mit einer klaren Frage starten

## 10. Merksatz

**Hook first. Name the concept early. Explain it simply. Show a real-life example fast. Then go deeper.**


## 11. Longform-Erweiterung

Für neue `LONGFORM_STANDARD_V1`-Videos gilt zusätzlich:
`rules/YOUTUBE_LONGFORM_SCRIPT_QUALITY.md` / `LONGFORM_STORY_RETENTION_V1`.

Die frühe Hook-Regel bleibt unverändert, aber bei 6–7 Minuten reicht ein guter Einstieg allein nicht. Das Skript braucht zusätzlich einen Story-Spine, Midpoint-Re-Engagement, kontrollierte Research-Dichte, wenige stärkere Beispiele und einen gesprochenen Callback im Schluss.
