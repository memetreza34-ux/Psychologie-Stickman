# Agent-Regeln — YouTube Longform

Gilt für `channels/dinge-erklaert/youtube/`.

## Harte Regeln

- Kanalnische: **Alltagspsychologie & menschliches Verhalten**
- verbindlich: `YOUTUBE_THEMEN_SYSTEM.md`
- neue YouTube-Videos mindestens **10:00 Minuten final**, sofern das gewählte Thema diese Länge sinnvoll trägt
- sinnvoller Zielbereich meist 11–14 Minuten
- kein Fülltext
- psychologische Aussagen sauber belegen und wissenschaftliche Unsicherheit transparent machen
- keine medizinischen Diagnosen, Therapieanweisungen oder pseudowissenschaftlichen Versprechen
- 16:9 / 1920×1080 / 30 fps
- die Bildwelt wird **nicht** aus dem Quell-Repo geerbt
- solange `YOUTUBE_STYLE_LOCK.md` den Status `UNSET` trägt, keine finale Phase-2-Bildproduktion starten
- `YOUTUBE_VISUAL_BEAT_RULES.md` ist für jede Phase-1-Planung verbindlich

## Themen-Grenze

Der zentrale Inhalt jedes Videos muss menschliches Denken, Wahrnehmen, Entscheiden, Fühlen, Kommunizieren oder Verhalten erklären.

Medizin/Biologie, Politik/Geopolitik/Geschichte, Finanzen und KI/Technik sind keine eigenständigen Hauptnischen dieses Kanals. Sie dürfen nur als Beispiele vorkommen, wenn der psychologische Mechanismus klar im Mittelpunkt bleibt.

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
→ PHASE 1 Visual Beats
→ `npm run qa:visual-density`
→ PHASE-1-PASS
→ PHASE 2 Bilder + finales Audio
→ PHASE-2-PASS
→ PHASE 3 Wort-Timings / Mapping / Render
→ Final-QA

Keine Phase überspringen. Phase 2 darf keine Phase-1-Grenzen erfinden, verschieben oder zusammenlegen. Phase 3 darf Skript oder Szenengrenzen nicht kreativ umdeuten.

## Phase 1 = Visual Beats, nicht Kapitel

Ein wichtiger visueller Gedanke bekommt grundsätzlich ein eigenes Bild.

Neue Beats insbesondere bei:
- neuem Fakt
- neuem Ort, Akteur, Objekt oder System
- neuem Zeitbezug oder Zeitsprung
- neuer relevanter Zahl
- neuer Handlung
- Ursache → Folge
- Vergleich
- Frage → Antwort
- neuem Schritt einer Metapher oder Mechanismus-Erklärung

Wenn ein konkretes Objekt, ein Ort, eine Person oder ein anderer zentraler Inhalt im gesprochenen Satz wichtig wird, muss genau dieser Inhalt im zugehörigen Bild sichtbar bzw. eindeutig repräsentiert sein. Das Bild darf nicht schon den Inhalt späterer Sätze zeigen.

Dichte:
- Ziel meist 8–18 gesprochene Wörter pro Beat
- Durchschnitt maximal 18 Wörter pro Szene
- harte Obergrenze 28 Wörter
- 10–14 Minuten führen häufig zu ungefähr 90–150 Bildern
- nie Szenen zusammenlegen, nur um Bilder zu sparen

Für skriptbasierte Projekte darf `autoFromScript` in `phase1-scenes.json` verwendet werden. Vor Phase 2 muss die daraus entstehende Beat-Liste redaktionell geprüft werden.

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
- Phase 1 darf inhaltlich/visuell als Beat geplant werden; konkrete Stil-DNA bleibt offen

## Schreibsicherheit

Analyse bleibt read-only. Änderungen nur bei aktueller ausdrücklicher Nutzerfreigabe und nur im freigegebenen Scope.
