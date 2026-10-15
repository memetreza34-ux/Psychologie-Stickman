# YOUTUBE-WOCHENORDNER — VERBINDLICHE ORDNUNG

Policy ID: `YOUTUBE_ISO_WEEK_FOLDERS_V1`

## Ziel

Nutzer soll in GitHub und im Finder sofort erkennen, **welche Videos zu welcher Kalenderwoche (Montag bis Sonntag)** gehören. Überflüssige Hauptverzeichnis-Dokumente liegen in `dokumentation/`. Alle Video-Projektunterordner bleiben unverändert.

## Zwingender Workflow vor JEDEM neuen Video

1. Datum des geplanten Videoprojekts festlegen (`TT.MM.JJJJ`).
2. ISO-Kalenderwoche mit dem Befehl `npm run youtube:week -- TT.MM.JJJJ` ausrechnen und den Wochenordner bei Bedarf **VOR Skript/Prompt-Erstellung** erzeugen.
3. Projekt darin anlegen: `youtube/<JJJJ-KWNN_TT.MM-TT.MM>/<TT.MM.JJJJ-thema>/`.
4. Ein einziges Themenprojekt pro psychologischem Mechanismus. Exakten vollständigen Pfad sofort in `TOPIC_REGISTRY.json` registrieren.
5. Dann bisheriger Videoprozess mit unveränderten Unterordnern (Skript / Flow / Bilder / Audio / Export / Intern).
6. Beim Phase-1-Handoff direkt die beiden **vollständigen neuen Wochenpfad-Links** zum Skript und zum Google-Flow-Masterprompt geben.
7. Nachher Analytics und Lernreview je Videoprojekt unverändert weiterführen.

Beispiel: `15.10.2026` = **2026, KW 42, Montag 12.10.2026 – Sonntag 18.10.2026**. Projektpfad: `youtube/2026-KW42_12.10-18.10/15.10.2026-tuerschwellen-effekt-v1/`.

## Harte Regeln

- Kein neuer `youtube/TT.MM.JJJJ-thema/` Direktordner. Es muss **immer** erst die passende Kalenderwoche existieren.
- Kein künstlicher zweiter Videoordner oder Kopie: Jede Produktion liegt **einmal** im Wochenordner.
- Die Template-Basis `youtube/00-vorlage/` bleibt für alle Wochen erhalten.
- Die internen `01-script/`, `02-google-flow/`, `03-bilder/`, `04-audio/`, `05-export/`, `99-intern/` dürfen NICHT umbenannt oder anders geordnet werden.
- Alle Pfade in Planungsdateien, Topic-Register, Tablet-Links und Produktionsbefehlen müssen die Woche berücksichtigen.
- Der Strukturcheck `scripts/check-topic-uniqueness.mjs` scannt Wochenordner und lehnt falsch eingeordnete oder doppelte Projekte ab.
- `YOUTUBE_ISO_WEEK_FOLDERS_V1` ist nur eine Organisationsregel, **keine** Bildwelt-, Script- oder Exportrichtlinie. Der etablierte Flow bleibt unverändert.

## Historische Projektdaten und Finder

Die 22 am 15.10.2026 vorhandenen Projekte wurden **nur als Git-getrackte Verzeichnisstruktur** wochenweise eingeordnet, ohne Skripte oder Bilder neu zu generieren. Frühere lokale `03-bilder`, `04-audio`, `05-export` können nicht eingecheckte Medien enthalten. Vor `git pull` die lokalen Ordner sichern und anschließend lokale nicht versionierte PNG-/MP3-/MP4-Dateien ggf. händisch in den jeweiligen neuen Wochen-Projektordner übertragen. Nie historische Medien löschen oder überschreiben, nur um Ordner aufzuräumen.

## Root-Verzeichnis

Nur nicht unmittelbar notwendige Übersichtsdokumente nach `dokumentation/` auslagern (bisher: `ASSET_QUELLEN.md`, `CHANNELS.md`, `MIGRATION_NOTE.md`, `THEMEN_SYSTEM.md`). **AGENTS.md, CANONICAL_RULES.md, PROJECT_BRAIN.md, CHANGE_CONTROL_LOCK.md, README.md, TOPIC_REGISTRY.json, package.json, tsconfig.json, .github/** bleiben bewusst im Root. Auch `src/`, `scripts/`, `rules/`, `analytics/`, `assets/`, `public/`, `reels/` und `exports/` sind echte Arbeitsverzeichnisse, keine überflüssigen Dateien.

## Lokale Medien nach Git-Synchronisierung sicher mitnehmen

Lokale, durch `.gitignore` nicht mitgeführte Dateien (z. B. fertige PNG/MP3/MP4) können nach der Git-Umstellung noch in den alten flachen Ordnern liegen. **Zuerst eine Sicherheitskopie des lokalen `youtube/`-Ordners erstellen.** Nach `git pull` im Repository:

```bash
npm run youtube:local-media
npm run youtube:local-media -- --apply
```

Der erste Befehl zeigt nur, welche fehlenden Mediendateien kopiert würden; der zweite kopiert sie ohne vorhandene Ziele zu überschreiben und ohne Quellen zu löschen. Nur von dir vorhandene lokale Daten werden so mitgenommen, keine neuen Videos gerendert. Bei Git-Konflikten zuerst den Repository-Status prüfen, nicht blind `git reset --hard` verwenden.
