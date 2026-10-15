# YouTube-Videos — ISO-Kalenderwochen

Jedes Videoprojekt gehört in einen **Wochenordner (Montag bis Sonntag)**. Alle internen Video-Unterordner `01-script/`, `02-google-flow/`, `03-bilder/`, `04-audio/`, `05-export/`, `99-intern/` bleiben unverändert.

**Vor JEDEM neuen Video:** `npm run youtube:week -- DD.MM.JJJJ` ausführen; dann das datierte Projekt in diesem Wochenordner anlegen. Themenregister und GitHub-Dateilinks müssen den vollständigen Wochenpfad verwenden.

**Vorlage:** [00-vorlage](00-vorlage)

- [2026-KW39_21.09-27.09](2026-KW39_21.09-27.09/) — 21.09.2026 bis 27.09.2026, 9 Projekte
- [2026-KW40_28.09-04.10](2026-KW40_28.09-04.10/) — 28.09.2026 bis 04.10.2026, 10 Projekte
- [2026-KW41_05.10-11.10](2026-KW41_05.10-11.10/) — 05.10.2026 bis 11.10.2026, 2 Projekte
- [2026-KW42_12.10-18.10](2026-KW42_12.10-18.10/) — 12.10.2026 bis 18.10.2026, 1 Projekte

**Lokale Daten schützen:** Bilder, Sprecher-Audio und gerenderte MP4-Dateien sind oft nicht in Git eingecheckt. Vor dem nächsten `git pull` lokale Daten sichern. Git verschiebt nur nachverfolgte Dateien mit der Ordnerumstellung; ungetrackte Medien bei Bedarf in die neuen Wochenordner übernehmen. Die Umstellung löscht keine binären Medien aus GitHub und erzeugt keine neuen.
