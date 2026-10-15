# PHASE 1 HANDOFF — TABLET DIRECT LINKS (HARD PROCESS)

Policy ID: `PHASE1_TABLET_HANDOFF_LINKS_V1`

## Ziel

Der Nutzer produziert seine Bilder und das Voice-over auf einem Tablet und soll nach **jeder fertiggestellten Phase 1** ohne Dateisuche direkt auf die zwei finalen GitHub-Dateien zugreifen und den gesamten Text kopieren koennen.

## Verpflichtender Abschluss jeder Phase 1

**Erst nach erfolgreichem Speichern/Committen in GitHub und pruefbarer Verfuegbarkeit** den Abschluss melden. Jede Phase-1-Fertigmeldung und jede abschliessende Antwort, die Phase 1 fertigstellt, zeigt IMMER diese zwei **direkt anklickbaren Dateilinks** (keinen Repo-Root und keine Ordnerlinks):

1. **Google Flow: ALLE Bildprompts** — `youtube/<PROJEKT>/02-google-flow/google-flow-prompt.txt`
2. **Sprecher-Skript: kompletter finaler Text** — `youtube/<PROJEKT>/01-script/script.txt`

Linkformat: `https://github.com/memetreza34-ux/Psychologie-Stickman/blob/main/youtube/<PROJEKT>/02-google-flow/google-flow-prompt.txt` bzw. `.../01-script/script.txt`. Bei einer anderen freigegebenen Zielbranch statt `main` deren echte Branch verwenden und kenntlich machen. Pfadbestandteile URL-kodieren. Exakte Projektpfade, nicht die Vorlage, verwenden.

**Beispiel fuer die Antwort an den Nutzer:**

- `Google Flow – alle Bildprompts: [Direkt oeffnen & kopieren](<VERIFIZIERTER-GITHUB-FILE-LINK>)`
- `Sprecher-Skript: [Direkt oeffnen & kopieren](<VERIFIZIERTER-GITHUB-FILE-LINK>)`

Hinweis: Auf dem Tablet bei privatem Repository mit dem berechtigten GitHub-Konto anmelden, Datei aufrufen, bei Bedarf **Raw** oder die Kopierfunktion nutzen. Kein umstaendlicher Verweis auf den Repository-Start, keinen nicht verifizierten Link ausgeben.

## Was als fertig gilt

- `01-script/script.txt` ist das **vollstaendige finale** Voice-over-Skript, kein Platzhalter.
- `02-google-flow/google-flow-prompt.txt` ist der **eine zentrale fertige Google-Flow-Master-Prompt**, der alle geplanten `BILD 01` bis `BILD NN` enthaelt, inkl. der geltenden Thumbnail- und Bildweltregeln. Kein gesplittetes Sammelsurium aus mehreren Prompts.
- `99-intern/phase1-scenes.json` enthaelt den passenden fertig geplanten Szenensatz. Prompt und Plan sind konsistent (Anzahl, Reihenfolge und Zuordnung).
- Die beiden angezeigten GitHub-Dateien sind tatsaechlich auf der verlinkten Branch **hochgeladen** und ueber den GitHub-Connector gegengeprueft. Lokal gespeicherte, nicht gepushte Dateien reichen nicht.
- Vor dem Abschluss, falls lokal verfuegbar: `npm run phase1:links -- youtube/<PROJEKT>` ausfuehren. Das Werkzeug prueft die lokale Vollstaendigkeit und erzeugt die Ziel-URLs; der Agent muss vor dem Teilen zusaetzlich die GitHub-Verfuegbarkeit pruefen.
- Wenn etwas fehlt, **Phase 1 als unvollstaendig** kennzeichnen, konkret sagen was fehlt und keine falsche Fertigmeldung oder erfundenen Links ausgeben.

## Wann Links geschickt werden

**Automatisch beim Abschluss der Phase 1**, auch wenn der Nutzer nicht nochmals danach fragt. Nicht erst nach Flow-Bildern, Remotion-Render oder Videoexport. Bei erneutem Phase-1-Update die aktuelle, tatsaechlich gespeicherte Dateiversion verlinken.

Der Nutzer soll auf dem Tablet genau zwei Dateien oeffnen koennen: 1) Google-Flow-Bildprompts kopieren/einfuegen, 2) Skript fuer Voice-over kopieren/einfuegen. Keine Aenderungen an der Bildwelt, am Prompt-Inhalt oder am freigegebenen Workflow allein zur Implementierung dieser Linkregel.

## Kompatibilitaet

`CONTINUOUS_IMPROVEMENT_P1_V1` bleibt die hoechste allgemeine Lern- und Verbesserungsprioritaet. Dieser Tablet-Handoff ist ein zusaetzlicher verbindlicher Bedienungsstandard. `CHANGE_CONTROL_LOCK.md`, `THUMBNAIL_SEPARATE_FROM_SCENE01_V1` und `PSYCHOLOGY_STICKMAN_WORLD_V1` bleiben unveraendert gueltig.
