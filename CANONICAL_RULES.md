# CANONICAL RULES — STICKMAN

## Kanal

Thema: **Alltagspsychologie & menschliches Verhalten**.

Verbindlich:
- `rules/STICKMAN_DNA.md`
- `rules/FORMAT_LOCK.md`
- `rules/YOUTUBE_THEMEN_SYSTEM.md`
- `rules/YOUTUBE_STYLE_LOCK.md`
- `rules/IMAGE_REFERENCE_LOCK.md`
- `rules/COVER_LOCK.md`
- `rules/TEXT_OVERLAY_LOCK.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- `rules/PRODUCTION_FORMAT_RULES.md`

`rules/STICKMAN_DNA.md` ist die zentrale visuelle Source of Truth.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

Keine medizinischen Diagnosen, Therapieanweisungen oder pseudowissenschaftlichen Versprechen.

## Getrennte Formate

### YouTube
Pfad: `youtube/`
- 16:9 / 1920×1080 / 30 fps
- Remotion: `Phase3YouTube`
- sichtbare Struktur: `01-script/`, `02-google-flow/`, `03-bilder/`, `04-audio/`, `05-export/`, `99-intern/`

### Reels
Pfad: `reels/`
- 9:16 / 1080×1920 / 30 fps
- Remotion: `Phase3Reel`

YouTube und Reels werden nicht vermischt.

## Produktionsfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 Google-Flow-Bilder → finales Audio/Timings → Phase 3 Schnitt/Render → Final-QA.

## Visual-Beat-Prinzip

Ein wichtiger neuer visueller Gedanke bekommt grundsätzlich ein eigenes Bild.

Verbindlich:
- konkrete Szene vor generischer Infografik
- genau ein primärer visueller Gedanke pro Bild
- ein klares Hauptmotiv
- höchstens 1–2 unterstützende Hinweise
- keine Sammelbilder
- keine unnötige Wiederholung derselben Pose oder Komposition
- Master sperrt Stil, nicht Kamera oder Aufbau

Dichte:
- meist 10–16 Wörter pro Beat
- Zielwert 14
- normale Obergrenze 20
- 21–28 nur als geprüfte Ausnahme
- absolute Obergrenze 28
- durchschnittlich höchstens 16 Wörter pro Szene

## Bildwelt

**Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**

Jede sichtbare menschliche oder menschenähnliche Figur bleibt ein echter Stickman, auch im Hintergrund, auf Screens, Fotos, Postern, Werbung und Spiegelungen.

Verbindliche Anatomie:
- einfacher runder/ovaler Kopf
- minimale Gesichtszüge
- keine realistische Nase/Ohren
- kleiner vereinfachter Torso
- sehr dünne lineare Arme und Beine
- einfache Hände ohne Fingeranatomie
- stark vereinfachte Füße/Schuhe

Nicht erlaubt:
- normale Cartoon-Menschen
- semi-realistische oder realistische Menschen
- gemischte Human-/Stickman-Stile
- Photorealismus
- 3D/CGI
- Anime/Chibi

Die Umgebung darf glaubwürdig, farbig, detailreich und hochwertig illustriert sein.

## Textsystem — GOOGLE FLOW ONLY

Für **YouTube** gilt:

**Sämtlicher sichtbarer Text wird direkt von Google Flow in die jeweiligen Bilder gerendert. Remotion erzeugt keinen sichtbaren Text.**

### Geplante Textmomente
- Szene 01: exakter deutscher Cover-Titel, 2–7 Wörter
- ausgewählte spätere Szenen: exakte deutsche Keywords/Merksätze, maximal 5 Wörter
- typische Textdichte 15–25 %
- harte Obergrenze 30 %

### Nicht geplante Textmomente
**ZERO READABLE TEXT.**

Screens, Karten und Dokumente nutzen abstrakte Linien, Formen und Icons, sofern die Szene kein ausdrücklich geplantes Textmoment ist.

### Qualität
Jeder geplante Text wird im Flow-Prompt exakt vorgegeben. Falsche Schreibweise, abgeschnittene Buchstaben, Pseudo-Schrift oder zusätzliche Wörter führen zur Regeneration genau dieses Bildes.

### Remotion
Für neue YouTube-Projekte:
- `sceneLabels: []`
- keine YouTube-Auto-Captions
- `renderGermanLabelsInRemotion: false`
- Remotion übernimmt nur Schnitt, Audio, technische Bildbewegung und Export

Details: `rules/TEXT_OVERLAY_LOCK.md`.

## Scene 01 — Cover + Master + erster Visual Beat

Für jedes YouTube-Projekt gilt:

**`03-bilder/01.png` = SCENE 01 + COVER/THUMBNAIL + STYLE-/ANATOMY-MASTER.**

Szene 01 muss:
- den ersten gesprochenen Beat korrekt darstellen
- als starkes Cover funktionieren
- die Stickman-/Welt-DNA etablieren
- den exakten deutschen Cover-Titel direkt aus Google Flow enthalten
- außer diesem Titel keinen weiteren lesbaren Text enthalten

Ein separates Pflicht-`cover.png` wird nicht geführt.

## Master-Referenz + automatische 5er-Batches

- Bild 01 zuerst allein generieren
- Cover-Titel exakt prüfen
- STOP und Nutzerfreigabe
- Bild 01 bleibt Master
- ab Bild 02 Master bei jeder Generierung anhängen
- Titel aus Bild 01 nicht kopieren
- bei geplanten späteren Textmomenten nur deren eigenen exakten deutschen Text rendern
- nicht geplante Szenen bleiben textfrei
- danach höchstens 5 neue Bilder pro Batch
- interne QA nach jedem Batch
- nur fehlerhafte Bilder regenerieren
- nach vollständigem PASS automatisch weiter

**Regulär genau eine Nutzerfreigabe: nach Bild 01.**

## Neue Textmetadaten

Neue YouTube-Projekte verwenden:

```json
{
  "visibleTextLanguage": "de",
  "visibleTextRenderer": "GOOGLE_FLOW",
  "renderGermanLabelsInRemotion": false,
  "finalTextPolicy": "FLOW_VISIBLE_TEXT_ONLY_V3",
  "flowSourceImageTextPolicy": "PLANNED_EXACT_GERMAN_TEXT_ONLY",
  "flowTextMoments": [],
  "sceneLabels": []
}
```

## Einfache YouTube-Arbeitsfläche

Der Nutzer arbeitet regulär nur mit:
- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/`
- `05-export/`

Technische Hilfsdateien gehören nach `99-intern/`.

Die eine `google-flow-prompt.txt` enthält alle Szenenprompts, zentrale DNA, alle exakten geplanten deutschen Texte, die ZERO-READABLE-TEXT-Regel für alle übrigen Szenen und den Batch-Ablauf.

## Audio

- finales Voice-over exakt 1,10×
- Tonhöhe erhalten
- führende Stille entfernen
- lange Pausen straffen
- Wörter niemals anschneiden
- Timings aus final verarbeitetem Audio

## Qualitätssicherung

Bei Pipeline-/Strukturänderungen mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:flow-prompts`
- `npm run qa:text-overlays`
- relevante Format-/Produktionschecks

## Priorität

Bei Format-Widerspruch gewinnt `rules/FORMAT_LOCK.md`.

Bei visueller Identität gewinnt `rules/STICKMAN_DNA.md`.

Bei Cover-Widerspruch gewinnt `rules/COVER_LOCK.md`.

Bei Text-Widerspruch gewinnt `rules/TEXT_OVERLAY_LOCK.md`:
**Google Flow erzeugt sämtlichen sichtbaren YouTube-Text; Remotion erzeugt keinen sichtbaren Text.**

Beim Batch-Widerspruch gilt: nur Bild 01 braucht Nutzerfreigabe; danach automatische 5er-Batches mit interner QA.
