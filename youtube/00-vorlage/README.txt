YOUTUBE LONGFORM — EINFACHE ARBEITSSTRUKTUR

Jedes neue YouTube-Projekt verwendet nur diese sichtbaren Arbeitsordner:

01-script/
- script.txt

02-google-flow/
- google-flow-prompt.txt

03-bilder/
- hier `01.png`, `02.png`, `03.png` usw. ablegen
- `01.png` ist IMMER gleichzeitig Szene 01 + Cover/Thumbnail + Style-/Anatomie-Master
- kein separates Pflicht-`cover.png`
- Google Flow rendert den exakten deutschen Cover-Titel direkt in `01.png`
- Cover-Titel: 2–7 Wörter, exakt geschrieben, sonst Szene 01 regenerieren
- außer dem Titel kein weiterer lesbarer Text in Szene 01
- ab Szene 02 bleiben Flow-Bilder ZERO READABLE TEXT
- ausgewählte spätere Szenen dürfen kurze deutsche Keyword-Overlays aus Remotion bekommen
- Remotion darf den Cover-Titel nicht duplizieren

04-audio/
- hier `final-voice.mp3` ablegen

05-export/
- `final.mp4` wird hier erzeugt
- bestehende Exporte werden nicht überschrieben

99-intern/
- `phase1-scenes.json`
- `word-timings.json` (wird bei Bedarf automatisch lokal aus final-voice.mp3 erzeugt)
- `scene-plan.json`
- `render-props.json`
- Quellen, QA, Style, Continuity und weitere Pipeline-Metadaten

Für die normale Arbeit braucht der Nutzer nur `script.txt`, `google-flow-prompt.txt`, Bilder und Audio zu öffnen.

Sobald Bilder und finales Audio fertig sind:
`npm run produce:youtube -- youtube/TT.MM.JJJJ-thema`

Fehlende Word Timings werden automatisch mit lokalem Whisper.cpp erzeugt und am finalen Skript ausgerichtet.
Remotion-Assets werden automatisch nach `public/` gestaged. Kein manuelles Doppelt-Kopieren.
