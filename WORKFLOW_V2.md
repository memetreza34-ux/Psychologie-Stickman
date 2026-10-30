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
| 7 | **Dateien erzeugen** | `npm run v2:build -- <projekt>` erzeugt `phase1-scenes.json` und `google-flow-prompt.txt` | `npm run qa:v2`, `npm run qa:creative-visuals -- <projekt>` und `npm run phase1:links -- <projekt>` |
| 8 | **Bilder** | Google Flow erzeugt Cover + alle Bilder in `03-bilder/`. Schnitt, Ton und Musik machst du selbst (kein Remotion). | `npm run flow:verify -- <projekt>`, Bilder ansehen |

Danach: Schnitt und Sprecher-Audio **extern** fertigstellen, fertige MP4 als `05-export/final.mp4` ablegen, gewähltes Cover `03-bilder/00-cover.png` als `05-export/thumbnail.png` kopieren (keine vorhandenen Dateien überschreiben). Anschließend `npm run finalize:youtube -- <projekt>`: ergänzt Untertitel und Upload-Daten anhand tatsächlicher Wort-Timings. Nach Upload YouTube Studio nach 48 h / 7 d / 28 d auswerten.

**V2-Schutz:** `produce:youtube` ist ausschließlich der alte Remotion-Weg und wird für V2-Projekte abgelehnt. `qa:v2` verhindert stille Textverluste im Google-Flow-Prompt. `flow:verify` kontrolliert vollständige PNG-Struktur, Daten und Nummerierung; die tatsächliche Bildwirkung, Figurendrift, Lesbarkeit und Satz-Bild-Passung werden weiterhin visuell geprüft.

---

## Feste technische Regeln (bleiben)

- Ein Thema = ein Video (`TOPIC_REGISTRY.json`).
- Projektordner nur in ISO-Wochenordnern.
- **Cover:** 3 Kandidaten zuerst → du wählst (die **einzige** Frage im ganzen Ablauf) → Gewinner wird `03-bilder/00-cover.png`, **die anderen zwei werden sofort gelöscht**. Das Cover ist nie Bild 01.
- **Danach komplett selbstständig:** alle Bilder ohne Rückfrage bis zum Ende erzeugen. 5er-Gruppen nur zum Prüfen, nie zum Pausieren. Fehlende oder fehlerhafte Bilder ohne Frage neu machen.
- **Ein Ordner:** Cover und alle Bilder zusammen in `03-bilder/`: `00-cover.png`, `01.png … NN.png`, alles 16:9, keine Unterordner. Prüfung: `npm run flow:verify -- <projekt>`.
- Das Cover trägt die Überschrift schon im Bild (von Google Flow). Es ist gleichzeitig das YouTube-Thumbnail.
- Stickman-Art: großer heller Kopf, kleine Augen, strichdünne Glieder; alle Figuren in einem Bild gleich gebaut.
- **Nur Skript + Bilder, kein Remotion.** Normale Bilder sind textfrei. Kurze exakte deutsche Texte (Begriff, Zahl, Vergleich) schreibt Google Flow direkt ins Bild, Policy `FLOW_EXACT_TEXT_V2`.
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
- `type`: `CHARACTER_SCENE`, `OBJECT_FOCUS`, `ENVIRONMENT_SCENE`, `SCHEMA_EXPLAINER`, `COMPARE_VISUAL`, `TEXT_ILLUSTRATION`. Die letzten drei brauchen eine `card` (kurzer exakter Text, den Google Flow ins Bild schreibt).
- `function`: `HOOK`, `STORY_ACTION`, `MECHANISM`, `RESEARCH`, `COMPARISON`, `EVIDENCE`, `TAKEAWAY`, `CALLBACK`, `TRANSITION`.
- `camera`: `wide`, `medium`, `close`, `macro`, `topdown`, `diagram`, `mixed`.
- `variantOf` (optional): Nummer eines früheren Bildes → Prompt wird als „Bearbeite BILD NN“ geschrieben.
- `extendedBeatReason` (optional): Begründung, wenn ein Bild über 20 gesprochene Wörter begleitet (max. 28).
- `mechanismWhy` (optional): Pflicht, wenn `function` = `MECHANISM` mit einer Figuren-/Objekt-/Umgebungsszene erklärt wird.
