# Besitztumseffekt — Testvideo

Ziel: maximal 2 Minuten, deutscher Psychologie-Explainer im aktiven `CINEMATIC_ILLUSTRATED_PSYCHOLOGY_V1`.

- Skript: 209 Wörter
- Geplante Szenen: 16
- Cover: `WARUM DEINS MEHR WERT IST`
- Visual-Mix: Character Scene + Schema + Object Metaphor + Compare Visual + Text Illustration
- Status: Flow-Bilder und finales Voice-over fehlen noch.

Produktionsfolge:
1. `02-google-flow/google-flow-prompt.txt` in Flow verwenden.
2. Zuerst nur Szene 01 generieren und freigeben.
3. Danach maximal 5 Bilder pro Batch.
4. Bilder als `03-bilder/01.png`, `02.png` usw. speichern.
5. Finales Voice-over als `04-audio/final-voice.mp3` ablegen.
6. `npm run produce:youtube -- youtube/27.09.2026-besitztumseffekt`

Die finale MP4 kann erst gerendert werden, wenn Bilder und Audio vorhanden sind.
