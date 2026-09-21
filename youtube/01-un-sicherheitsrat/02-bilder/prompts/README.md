# Bildprompts — UN-Sicherheitsrat Rebuild

Dieses Projekt hat **189 Visual Beats** und **189 szenenspezifische Promptquellen**. Die Zuordnung ist strikt 1:1:

- Szene 001 → `UNSC-001` → später `001.png`
- Szene 002 → `UNSC-002` → später `002.png`
- …
- Szene 189 → `UNSC-189` → später `189.png`

Die Promptquellen sind in vier Batches aufgeteilt:
- `image-prompts-001-050.json`
- `image-prompts-051-100.json`
- `image-prompts-101-150.json`
- `image-prompts-151-189.json`

Jeder Eintrag enthält den exakten gesprochenen Beat, den konkreten `visualTask`, den Visual-Modus und eine eindeutige Prompt-ID. Daraus wird der vollständige Zero-Context-Prompt mit kompletter Stickman-Style-DNA und Negativregeln deterministisch erzeugt:

```bash
npm run materialize:image-prompts -- \
  youtube/01-un-sicherheitsrat/06-projektdateien/phase1-scenes.json \
  /tmp/un-sicherheitsrat-image-prompts.json
```

`npm run qa:prompt-coverage` muss **189 Szenen = 189 Prompts** bestätigen.

Grundregel: Ein Prompt visualisiert ausschließlich seinen eigenen gesprochenen Beat. Keine spätere Information vorwegnehmen und niemals Beats zusammenlegen, nur um Bilder zu sparen.
