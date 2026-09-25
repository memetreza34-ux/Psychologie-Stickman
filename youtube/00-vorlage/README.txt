YOUTUBE LONGFORM — EINFACHE ARBEITSSTRUKTUR

Jedes neue YouTube-Projekt verwendet nur diese sichtbaren Arbeitsordner:

01-script/
- script.txt

02-google-flow/
- google-flow-prompt.txt

03-bilder/
- hier `01.png`, `02.png`, `03.png` usw. ablegen
- `01.png` ist IMMER gleichzeitig Szene 01 + Cover/Thumbnail-Basis + Style-/Anatomie-Master
- kein separates Pflicht-`cover.png`; die erste Szene ist das Cover
- Flow-Bilder bleiben textfrei
- die finale Szene 01 bekommt immer eine kurze deutsche Cover-Headline in Remotion
- ausgewählte weitere Szenen dürfen kurze deutsche Keyword-Overlays bekommen

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
