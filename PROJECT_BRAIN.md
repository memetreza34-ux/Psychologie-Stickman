# PROJECT BRAIN

## Zweck

Eigenständiges YouTube-Longform-Produktionsrepo, abgeleitet aus `faceless-erklaerkanal`, aber ohne dessen Bildwelt.

## Aktueller Status

- Repo-Struktur: aufgebaut
- Themenfokus: übernommen
- YouTube-Audio-Standard: übernommen
- Remotion/Phase-3-Grundengine: vorhanden
- Bildwelt: **UNSET**
- erstes Projekt: `01-un-sicherheitsrat`
- finales Skript/Quellen/Claim-Check: übernommen
- alte visuelle Round-Ball-Phase 1/Flow-Prompts: bewusst nicht übernommen
- alte 43-Bild-Longform-Logik: **verworfen**
- neue Phase-1-Logik: **Visual Beats** mit hoher Bilddichte

## Dauerhafte Visual-Beat-Entscheidung

Dieses Content-Format lebt von vielen Bildern. Ein wichtiger neuer visueller Gedanke bekommt grundsätzlich ein eigenes Bild.

Verbindlich:
`channels/dinge-erklaert/youtube/YOUTUBE_VISUAL_BEAT_RULES.md`

Kernwerte:
- meist 8–18 gesprochene Wörter pro Beat
- Durchschnitt maximal 18 Wörter pro Szene
- harte Obergrenze 28 Wörter
- 10–14 Minuten führen häufig zu ungefähr 90–150 Bildern
- kein 20–30-Sekunden-Sammelbild für mehrere Aussagen
- das Bild muss zum aktuell gesprochenen Inhalt passen und darf spätere Aussagen nicht vorwegnehmen
- `npm run qa:visual-density` ist Teil des Repo-Checks

## Aktuelles UN-Sicherheitsrat-Video

Der frühere 43-Bild-Ansatz gilt als fehlerhaft und wird neu aufgebaut. `phase1-scenes.json` nutzt jetzt `autoFromScript`, um das finale Skript satz-/gedankenweise in viele Visual Beats zu zerlegen. Vor Phase 2 müssen die Beats redaktionell geprüft werden.

## Nächster visueller Meilenstein

Erst nach ausdrücklicher Nutzerentscheidung eine neue Bildwelt definieren. Danach:
1. `YOUTUBE_STYLE_LOCK.md` festlegen
2. Template-STYLE/CONTINUITY synchronisieren
3. UN-Sicherheitsrat-Visual-Beats materialisieren und redaktionell prüfen
4. neue Phase-2-Prompts für jeden Beat erstellen
5. neue Bilder erzeugen und alten 43-Bild-Render ersetzen

## Audio

1,10×, führende Stille weg, lange Pausen straffen, Timings erst danach.
