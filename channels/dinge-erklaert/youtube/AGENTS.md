# Agent-Regeln — YouTube Longform

Gilt für `channels/dinge-erklaert/youtube/`.

## Harte Regeln

- neue YouTube-Videos mindestens **10:00 Minuten final**
- sinnvoller Zielbereich meist 11–14 Minuten
- kein Fülltext
- Themenfokus: Politik, Geopolitik, Geschichte, Ideologien, Staaten/Grenzen/politische Systeme
- 16:9 / 1920×1080 / 30 fps
- die Bildwelt wird **nicht** aus dem Quell-Repo geerbt
- solange `YOUTUBE_STYLE_LOCK.md` den Status `UNSET` trägt, keine finale Phase-2-Bildproduktion starten

## Verbindliche Projektstruktur

```text
01-script-audio/
  script.txt
  AUDIO_STANDARD.txt
  audio/
    final-voice.mp3
02-bilder/
  prompts/
  images/
  STYLE.txt
  CONTINUITY.txt
03-quellen/
  sources.txt
  claim-matrix.csv
04-schnitt/
  schnittplan.txt
05-export/
  upload-paket.txt
  final-v1.mp4
06-projektdateien/
  phase1-scenes.json
  word-timings.json
  scene-plan.json
  render-props.json
```

## Produktionsablauf

THEMA + QUELLEN + CLAIM-CHECK
→ finales `script.txt`
→ PHASE 1 semantische Szenen
→ PHASE-1-PASS
→ PHASE 2 Bilder + finales Audio
→ PHASE-2-PASS
→ PHASE 3 Wort-Timings / Mapping / Render
→ Final-QA

Keine Phase überspringen. Phase 2 darf keine Phase-1-Grenzen erfinden oder verschieben. Phase 3 darf Skript oder Szenengrenzen nicht kreativ umdeuten.

## Audio

YouTube-Voice-over:
- exakt 1,10×
- führende Stille entfernen
- lange interne Pausen straffen
- Wörter nicht anschneiden
- Timings erst aus dem final verarbeiteten Audio

## Bildwelt-Sperre

Das Quell-Repo verwendete eine eigene visuelle Welt. Diese wurde bei der Migration absichtlich entfernt.

Bis der Nutzer eine neue Bildwelt ausdrücklich festlegt:
- keine alte Bildwelt rekonstruieren
- keine neue Figurenart voraussetzen
- keine alten Google-Flow-Masterprompts wiederverwenden
- Phase 1 darf semantisch geplant werden; konkrete visuelle Ausgestaltung bleibt offen

## Schreibsicherheit

Analyse bleibt read-only. Änderungen nur bei aktueller ausdrücklicher Nutzerfreigabe und nur im freigegebenen Scope.