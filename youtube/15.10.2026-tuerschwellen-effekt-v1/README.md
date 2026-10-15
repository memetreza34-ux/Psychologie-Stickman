# Kopfarium — Warum du vergisst, was du im anderen Zimmer wolltest

**Projekt:** 15.10.2026 / Türschwellen-Effekt (Doorway Effect)
**Status:** PHASE_1_COMPLETE / AWAITING_THUMBNAIL_SELECTION_AND_GOOGLE_FLOW_IMAGES
**Format:** 6–7 min deutscher YouTube-Longform, 16:9, 1920×1080, 30 fps
**Skript:** 1.141 gesprochene Wörter / 72 genaue Bildabschnitte (geplante Audio-Dauer um 6:40 bei der kanalüblichen 1,10× Nachbearbeitung; tatsächliche Dauer nach Voice-over prüfen)
**Visuelle Welt:** `PSYCHOLOGY_STICKMAN_WORLD_V1` (bestehende Bildwelt unverändert)
**Thumbnail:** Separat aus drei 16:9 Kandidaten; **niemals** das erste Video-Bild.
**Kanal:** Kopfarium

## Direktlinks zum Kopieren auf dem Tablet

- **Google Flow – alle 72 Bildprompts inklusive drei Thumbnail-Kandidaten:** [google-flow-prompt.txt](https://github.com/memetreza34-ux/Psychologie-Stickman/blob/main/youtube/15.10.2026-tuerschwellen-effekt-v1/02-google-flow/google-flow-prompt.txt)
- **Finales Sprecher-Skript:** [script.txt](https://github.com/memetreza34-ux/Psychologie-Stickman/blob/main/youtube/15.10.2026-tuerschwellen-effekt-v1/01-script/script.txt)

Hinweis: Das Repository ist privat. Auf dem Tablet mit dem GitHub-Konto anmelden, das Zugriff hat, die Datei öffnen und `Raw` / Kopierfunktion verwenden.

## Was abgeschlossen ist
- Kanonischer Themenregister-Eintrag mit Uniqueness-Check.
- Erzählerisches Skript mit direktem Hook, Karton-/Klebeband-Rückbezug, wissenschaftlicher Gegenprüfung und praktischem Schluss.
- 72 gesonderte Bildideen in `99-intern/phase1-scenes.json`, plus kompakte Shot-Quelle `99-intern/visual-shots.json`.
- Ein Google-Flow-Master-Prompt mit 72 `BILD NN`-Abschnitten und 3 **separaten** Cover-Kandidaten.
- Fakten-/Quellenprüfung `99-intern/quellen/`; `99-intern/script-plan.json`.
- Uploadvorbereitung `99-intern/youtube-upload.json`: Titel, Beschreibung, Quellen, Tags, **fünf Hashtags**, angehefteter Kommentar.
- `99-intern/learning-review.md`: Verbesserungs-Hypothese und spätere Messung statt erfundener Zahlen.

## Nächste Schritte — noch NICHT abgeschlossen
1. Google Flow den einen Master-Prompt geben, 3 separate Thumbnail-Kandidaten generieren. **Einmalige Nutzerwahl**.
2. Gewählten Kandidaten als `05-export/thumbnail.png` sichern, beide abgelehnten Kandidaten erst nach Wahl entfernen.
3. Danach Bilder **01–72**, in Fünfer-Batches ohne weitere Pausen erzeugen, jede einzelne Datei und Bildwelt/Text prüfen, nummeriert in `03-bilder/NN.png` speichern. Keine Unterordner oder Sammelbilder.
4. Sprechertext auf dem Tablet vertonen; finale Voice-over-Datei nach `04-audio/final-voice.mp3`, anschließend exakte Wort-Timings aus dem echten Audio.
5. Mit Remotion rendern und **erst danach** das endgültige `05-export/` mit `final.mp4`, `thumbnail.png`, `captions.srt`, `subtitle-script.txt`, `youtube-upload.txt` vervollständigen. Nicht vorab leere oder falsche Dateien als fertig markieren.
6. Nach Veröffentlichung die Analytics 48h / 7d / 28d nach `rules/GROWTH_LEARNING_LOOP.md` prüfen.

## Leitgedanke und Forschungsgrenzen
- Reale Forschung: Radvansky & Copeland 2006, Radvansky et al. 2011.
- Kritische Nuance: McFadyen et al. 2021 fanden **keinen robusten generellen Effekt in allen vier Experimenten**; unter zusätzlicher Gedächtnisbelastung gab es einen besonderen Effekt bei Erkennungsurteilen.
- Ein Ortswechsel ist kein magischer Gedächtnisreset, und das Zurückgehen in den ersten Raum funktioniert nicht garantiert.

## Qualitätsstatus
`PHASE_1_COMPLETE` beschreibt **nur Text, Recherche, Quellen, Visualplanung und Flow-Prompt**. Es gibt noch **kein freigegebenes Thumbnail, keine 72 endgültigen Bilddateien, keine fertige Sprachspur und kein MP4**. `UPLOAD_READY` erst nach echter Medien- und Export-QA.
