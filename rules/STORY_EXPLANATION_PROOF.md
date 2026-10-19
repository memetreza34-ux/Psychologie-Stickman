# Geschichte und Erklärung gemeinsam prüfen

Policy: `STORY_EXPLANATION_PROOF_V1`. Gilt für neue YouTube-Projekte aus der aktualisierten Vorlage. Bestehende Projekte werden nicht rückwirkend umgestellt.

## Arbeitsgrundlage

Der Reel vom 19.10.2026 zeigt handwerkliche Fortschritte: unterschiedliche Bildaufgaben, konsistente Person und Räume, abgestimmte Bildwechsel. Die redaktionelle Selbstkritik bleibt: Die Erklärung unterbricht die Handlung; Kontextbilder erklären noch keinen Mechanismus; beschriftete Forschungsmappen vermitteln keinen Befund. Arman weist darauf hin, dass sich die Qualität eines längeren Videos mit diesem kurzen Test schwer beurteilen lässt. Keine Zuschauer- oder Wachstumsdaten vorhanden.

Grundlage ist außerdem die zuvor dokumentierte Recherche zu Sprouts und TED-Ed: Eine Erklärung beantwortet eine zuvor erlebte Frage, ein Vergleich macht die veränderte Bedingung sichtbar. Nachweise und Reichweite der Recherche stehen in `dokumentation/KOPFARIUM_REDAKTIONSWERKSTATT.md`. Das sind handwerkliche Ableitungen, keine Erfolgsgarantie.

## 1. Zuerst die Geschichte in sechs Sätzen

Vor dem vollständigen Skript beantworten:

1. Was möchte die Person konkret erreichen?
2. Was macht sie, und welches Hindernis tritt auf?
3. Welche Frage entsteht dadurch beim Zuschauer?
4. Welcher Zusammenhang erklärt gerade diese Beobachtung?
5. Was versteht oder entscheidet die Person mit diesem Wissen anders?
6. Wie löst der Schluss die Frage vom Anfang ein?

Die Geschichte darf alltäglich und klein sein. Keine erfundenen Bedrohungen, künstliche Dramatik oder angeblich realen Fallgeschichten. Beispiele als Beispiele behandeln.

## 2. Erklärung im Verlauf anwenden

Im Longform mindestens zwei konkrete Verbindungen in `script-plan.json` dokumentieren: **exakter Erklärungssatz → späterer exakter Anwendungssatz → verändertes Verständnis**. Beide Zitate müssen tatsächlich im Skript stehen und in dieser Reihenfolge vorkommen. Das ist ein Mindestnachweis, keine Schablone für jeden Absatz.

Nach einem Erklärblock zur offenen Frage oder Handlung zurückkehren, wenn dies den Zusammenhang verständlicher macht. Ein Begriff allein liefert noch keine Antwort. Der spätere Rückbezug muss mehr leisten als erneut denselben Gegenstand zu nennen.

Den Kernbegriff weiter früh nennen. Die kurze Erklärung in die laufende Situation einbetten; keine Begriffsankündigung, die die Handlung unnötig anhält. Die bestehenden Hook-Fristen bleiben bestehen.

## 3. Sprechertext redigieren

Den Text als zusammenhängende Ansprache durchgehen. Auf konkrete Verben, natürliche Satzlängen, verständliche Bezüge und verdiente Übergänge achten. Definitionen, Dopplungen und Forschungsdetails kürzen, wenn sie für die konkrete Frage nichts beitragen. Keine starre Schnittfrequenz und keine zusätzlichen Spannungsversprechen ohne Inhalt.

`editorialReview.method` ehrlich angeben: `CODEX_TEXT_REVIEW` ist eine Textprüfung; `HUMAN_READ_THROUGH` setzt eine tatsächliche menschliche Durchsicht voraus. Offene inhaltliche Probleme vor Freigabe beheben. Ein menschlicher Verständnistest bleibt `NOT_TESTED`, solange keine Rückmeldung vorliegt; fehlende Testpersonen blockieren die Produktion nicht.

## 4. Sichtbare Beziehung statt Schlagwortbild

Bei `MECHANISM`, `RESEARCH`, `COMPARISON` und `EVIDENCE` erhält jede Szene `visualProof`:

```json
{
  "kind": "STATE_CHANGE",
  "withoutLabels": "Welche konkrete Handlung oder Beziehung bleibt ohne Schrift sichtbar?",
  "relationship": "Welche Größe, Bedingung oder Beziehung verändert sich?",
  "viewerInference": "Welche begrenzte Schlussfolgerung unterstützt das Bild?",
  "limitation": "Welche weitergehende Behauptung darf daraus nicht entstehen?",
  "promptAnchor": "Exact English depiction phrase copied into this BILD prompt",
  "evidenceStatus": "ILLUSTRATIVE_MODEL",
  "sourceRef": ""
}
```

`kind`: `STATE_CHANGE`, `CONTROLLED_COMPARISON`, `PROCESS` oder `OBSERVATIONAL_DETAIL`.

`evidenceStatus`: `ILLUSTRATIVE_MODEL`, `RESEARCH_SETUP` oder `SOURCED_RESULT`. Für die beiden letzten ist ein Verweis auf geprüfte Quelle/Aussage Pflicht. Den Verweis und die Bildaussage redaktionell anhand der tatsächlichen Quelle prüfen; ein nichtleeres Feld bestätigt keine wissenschaftliche Richtigkeit.

Vor Freigabe alle Labels gedanklich abdecken: Bleiben nur Ordner, Glühbirnen, ratlose Personen oder zwei Ortsansichten ohne erklärende Beziehung, ist der Bildauftrag zu schwach. Kurze deutsche Labels dürfen eine sichtbare Beziehung präzisieren. Kein Zwang, jede wissenschaftliche Einschränkung in ein Vergleichsdiagramm zu verwandeln. Wenn keine darstellbaren Daten/Bedingungen vorliegen, nichts hinzuerfinden.

`promptAnchor` muss im zugehörigen BILD des einen englischen Flow-Prompts stehen. Interne Metadaten werden von Flow nicht automatisch gelesen. Nach jedem Fünfer-Batch die tatsächlichen Bilder anhand dieser Beziehung prüfen.

## 5. Abschlussprüfung vor Phase 1

- Bestehende Longform-Prüfung kontrolliert zusätzlich die Zitatverbindungen und den dokumentierten Textreview.
- Kreative Bildprüfung kontrolliert die Nachweise und ihre Übernahme in den jeweiligen Flow-Prompt.
- `phase1:links` blockiert eine Freigabe mit fehlenden Skriptnachweisen.
- `npm run qa:story-explanation-selftest` prüft gezielt ungültige und gültige Fälle; `npm run check` führt ihn mit aus.

Automatische Checks bestätigen strukturelle Vollständigkeit. Redaktionell selbst noch einmal prüfen: Warum folgt dieser Absatz? Was lernt man aus diesem Bild? Was verändert der Schluss? Ohne diese Antworten kein pauschales Qualitätsversprechen.

## 6. Bestehender Produktionsablauf

Codex übergibt einen englischen Flow-Prompt und deutschen Sprechertext. Flow erzeugt individuelle Figurenreferenzen und drei separate Cover. Eine Coverwahl, anschließend Szenen in Fünfer-Batches mit sofortiger Prüfung/Nummerierung, abschließender Vollständigkeits- und Bildprüfung sowie einem tatsächlich verifizierten Downloadpaket, soweit die Oberfläche den Export unterstützt. Kein zusätzliches Codex-Bild und keine weiteren Freigabestopps.
