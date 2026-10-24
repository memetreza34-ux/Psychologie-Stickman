# WORKFLOW V2 — ein neues Video in 8 Schritten

**Für jedes NEUE Video ist das die einzige Startdatei.** Ältere Regeldateien in `rules/` sind Nachschlagewerk; wo sie V2 widersprechen, gilt V2.
Alte Videos werden nicht verändert.

| # | Schritt | Ergebnis | Prüfung |
|---|---|---|---|
| 1 | **Thema** prüfen | Eintrag in `TOPIC_REGISTRY.json` | `npm run qa:topic-uniqueness` |
| 2 | **Ordner** anlegen | `npm run youtube:week -- TT.MM.JJJJ`, dann `youtube/<Woche>/<TT.MM.JJJJ-thema>/` (Kopie von `youtube/00-vorlage/thema-vorlage`) | — |
| 3 | **Quellen** | `99-intern/quellen/sources.txt` + `claim-matrix.csv`: jede Zahl im Skript hat eine Quelle | — |
| 4 | **Skript** nach `rules/SKRIPT_METHODE_V2.md` | `01-script/script.txt`, `99-intern/script-plan.json` (APPROVED) | `npm run qa:script-style -- <script>` und `npm run qa:longform-script` |
| 5 | **Figuren** nach `rules/BILD_METHODE_V2.md` | Hauptfigur + Metapher festlegen (Vorlagen in `vorlagen/figuren/`) | — |
| 6 | **Shotliste** | `99-intern/shotlist.json` (eine Zeile pro Bild, siehe unten) | — |
| 7 | **Dateien erzeugen** | `npm run v2:build -- <projekt>` erzeugt `phase1-scenes.json`, `google-flow-prompt.txt`, `scene-plan.json` | `npm run qa:creative-visuals -- <projekt>` und `npm run phase1:links -- <projekt>` |
| 8 | **Produktion** | Flow-Bilder → Sprachaufnahme → `npm run produce:youtube` → Export | Bilder ansehen, Video ansehen |

Danach: Upload, nach 48 h / 7 Tagen Zahlen in `analytics/` eintragen, eine Erkenntnis ins nächste Video mitnehmen.

---

## Feste technische Regeln (bleiben)

- Ein Thema = ein Video (`TOPIC_REGISTRY.json`).
- Projektordner nur in ISO-Wochenordnern.
- 3 Thumbnail-Kandidaten zuerst → du wählst → `05-export/thumbnail.png`. Das Thumbnail ist nicht Bild 01.
- Danach alle Bilder ohne weitere Pause in 5er-Gruppen, Dateien `01.png … NN.png` flach in `03-bilder/`, alles 16:9.
- Stickman-Art: großer heller Kopf, kleine Augen, strichdünne Glieder; alle Figuren in einem Bild gleich gebaut.
- **KI-Bilder enthalten keinen Text.** Jeder Text im Video kommt aus dem Code (`infoCards`), Policy `CODE_TEXT_CARDS_V1`.
- Keine erfundenen Zahlen oder Studien.

---

## Shotliste (`99-intern/shotlist.json`)

Die Shotliste ist das Herz der Bildplanung. Pro Bild eine Zeile; aus ihr wird alles andere erzeugt.

```json
{
  "workflowVersion": "V2",
  "topicId": "dunning-kruger-effekt",
  "title": "…",
  "thumbnail": {"headline": "…", "candidates": ["…", "…", "…"]},
  "characters": [{"name": "Max", "look": "…"}],
  "metaphor": "…",
  "motion": {"motionStyle": "smooth", "transition": "fade"},
  "shots": [
    {
      "speech": "Exakter Skripttext, den dieses Bild begleitet.",
      "type": "CHARACTER_SCENE",
      "function": "HOOK",
      "camera": "medium",
      "subject": "max_karaoke",
      "setting": "karaoke_bar",
      "prompt": "50–80 Wörter Bildbeschreibung nach BILD_METHODE_V2 (endet mit: No text, no letters, no numbers.)",
      "gain": "Was der Zuschauer durch DIESES Bild neu versteht.",
      "alt": "COMPARE_VISUAL",
      "altWhyNot": "Warum die Alternative schlechter wäre.",
      "card": {"type": "keyword", "text": "Dunning-Kruger-Effekt"},
      "effect": "zoom-in"
    }
  ]
}
```

- `speech`: Alle `speech`-Texte hintereinander ergeben **exakt** das Skript (wird geprüft).
- `type`: `CHARACTER_SCENE`, `OBJECT_FOCUS`, `ENVIRONMENT_SCENE`, `SCHEMA_EXPLAINER`, `COMPARE_VISUAL`, `TEXT_ILLUSTRATION`. Die letzten drei brauchen eine `card` (Text kommt aus dem Code).
- `function`: `HOOK`, `STORY_ACTION`, `MECHANISM`, `RESEARCH`, `COMPARISON`, `EVIDENCE`, `TAKEAWAY`, `CALLBACK`, `TRANSITION`.
- `camera`: `wide`, `medium`, `close`, `macro`, `topdown`, `diagram`, `mixed`.
- `variantOf` (optional): Nummer eines früheren Bildes → Prompt wird als „Bearbeite BILD NN“ geschrieben.
- `extendedBeatReason` (optional): Begründung, wenn ein Bild über 20 gesprochene Wörter begleitet (max. 28).
- `mechanismWhy` (optional): Pflicht, wenn `function` = `MECHANISM` mit einer Figuren-/Objekt-/Umgebungsszene erklärt wird.
