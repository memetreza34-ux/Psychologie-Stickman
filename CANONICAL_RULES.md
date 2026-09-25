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

`rules/STICKMAN_DNA.md` ist die zentrale visuelle Source of Truth. Alle Style-, Prompt- und Projektregeln müssen mit dieser DNA kompatibel bleiben.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

Keine medizinischen Diagnosen, Therapieanweisungen oder pseudowissenschaftlichen Versprechen.

## Getrennte Formate

### YouTube
Pfad: `youtube/`
- reguläre Longform-/Testvideo-Projekte
- **16:9 / 1920×1080 / 30 fps**
- Remotion: `Phase3YouTube`
- sichtbare Projektstruktur: `01-script/`, `02-google-flow/`, `03-bilder/`, `04-audio/`, `05-export/`, `99-intern/`

### Reels
Pfad: `reels/`
- ausschließlich Reels/Shorts
- **9:16 / 1080×1920 / 30 fps**
- Remotion: `Phase3Reel`

YouTube und Reels dürfen strukturell oder beim Ausgabeformat nicht vermischt werden.

## Produktionsfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 Bilder → Phase 3 Timings/Render → Final-QA.

## Visual-Beat-Prinzip

Ein wichtiger neuer visueller Gedanke bekommt grundsätzlich ein eigenes Bild.

Verbindlich:
- konkrete Szene vor generischer Infografik
- genau ein primärer visueller Gedanke pro Bild
- ein klares Hauptmotiv
- höchstens 1–2 unterstützende Hinweise
- keine Sammelbilder für mehrere Aussagen
- keine unnötige Wiederholung derselben Pose oder Komposition
- Master sperrt Stil, nicht Kamera oder Aufbau

Dichte:
- meist 10–16 Wörter pro Beat
- automatischer Zielwert 14
- normale Obergrenze 20
- 21–28 Wörter nur als geprüfte Ausnahme mit `allowExtendedBeat: true`
- absolute Obergrenze 28
- durchschnittlich höchstens 16 Wörter pro Szene

## Bildwelt

**Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**

Jede sichtbare menschliche oder menschenähnliche Figur bleibt ein echter Stickman. Das gilt auch für Hintergrund, Menschenmengen, Forscher, historische Figuren, Screens, Fotos, Poster, Werbung und Spiegelungen.

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

## Textsystem

### Szene 01 — einzige reguläre Flow-Textausnahme

Google Flow rendert den **exakten deutschen Cover-Titel direkt in `03-bilder/01.png`**.

Verbindlich:
- `coverHeadline`: 2–7 deutsche Wörter
- `coverTextRenderer: "GOOGLE_FLOW"`
- exakte Schreibweise inkl. Umlauten/Satzzeichen
- kein zusätzlicher lesbarer Text in Szene 01
- Remotion rendert den Cover-Titel nicht erneut

### Szene 02+

Google-Flow-Quellbilder bleiben vollständig textfrei:
- keine Wörter oder Buchstaben
- keine Labels
- keine UI-Texte
- keine Untertitel
- keine Poster-/Bildschirmtexte
- keine zufälligen englischen Promptwörter

Screens, Karten und Dokumente nutzen abstrakte Linien, Formen und Icons.

### Finaler YouTube-Render

Kurzer deutscher Text darf gezielt als Verstärker genutzt werden:
- Szene 01: Cover-Titel ist bereits in Flow in `01.png` eingebrannt
- ausgewählte spätere Szenen: zentrale Begriffe/Merksätze, maximal 5 Wörter, `variant: "keyword"`, gerendert in Remotion
- keine langen Sätze
- keine Dauer-Untertitel
- Ziel meist ungefähr ein Textmoment alle 4–6 Bilder
- maximal 30 % der YouTube-Szenen mit sichtbaren Textmomenten inklusive Cover

Details: `rules/TEXT_OVERLAY_LOCK.md`.

## Scene 01 — Cover + Master + erster Visual Beat

Für jedes YouTube-Projekt gilt verbindlich:

**`03-bilder/01.png` = SCENE 01 + COVER/THUMBNAIL + STYLE-/ANATOMY-MASTER.**

Szene 01 muss gleichzeitig:
- den ersten gesprochenen Visual Beat korrekt darstellen,
- als starkes, schnell lesbares Cover funktionieren,
- die Stickman-/Welt-DNA als Master etablieren,
- den exakten deutschen Cover-Titel direkt aus Google Flow enthalten,
- außer diesem Titel keinen weiteren lesbaren Text enthalten.

Ein separates Pflicht-`cover.png` wird nicht geführt.

Details stehen in `rules/COVER_LOCK.md`.

## Master-Referenz + automatische 5er-Batches

- Bild 01 zuerst allein generieren
- Bild 01 ist zugleich Cover, erster Visual Beat und Master
- Cover-Titel in Bild 01 auf exakte Schreibweise prüfen
- STOP und Nutzerfreigabe abwarten
- Bild 01 nur bei vollständigem Style-/Stickman-/Cover-/Titel-PASS freigeben
- Bild 01 bleibt Master
- ab Bild 02 Master bei jeder Generierung anhängen
- ab Bild 02 Titel/Text aus Master **nicht kopieren**
- danach höchstens 5 neue Bilder pro Batch
- interne QA nach jedem Batch
- nur fehlerhafte Bilder regenerieren
- nach vollständigem PASS automatisch weiter
- keine Nutzer-Rückfrage nach normalen Batches

**Regulär genau eine Nutzerfreigabe: nach Bild 01.**

## Einfache YouTube-Arbeitsfläche

Der Nutzer arbeitet regulär nur mit:
- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/`
- `05-export/`

Technische Hilfsdateien gehören nach `99-intern/`.

Die eine `google-flow-prompt.txt` enthält alle Szenenprompts, zentrale DNA, die Scene-01-Cover-Titel-Ausnahme, die ZERO-READABLE-TEXT-Regel für Szene 02+ und den Batch-Ablauf.

## Audio

- finales Voice-over für Reels und YouTube: **exakt 1,10×**
- Tonhöhe erhalten
- führende Stille entfernen
- Pausen ab ungefähr 500 ms deutlich straffen
- Ziel-Restpause ungefähr 120 ms vor der 1,10×-Beschleunigung
- Wörter niemals anschneiden
- Timings erst aus final verarbeitetem Audio

## Qualitätssicherung

Bei Pipeline-/Strukturänderungen mindestens:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:flow-prompts`
- relevante Format-/Produktionschecks

## Priorität

Bei Format-Widerspruch:
**`rules/FORMAT_LOCK.md` gewinnt.**

Bei visueller Identität:
**`rules/STICKMAN_DNA.md` gewinnt.**

Bei Cover-Widerspruch:
**`rules/COVER_LOCK.md` gewinnt: `01.png = SCENE 01 + COVER + MASTER`, Titel direkt in Google Flow.**

Bei Text-Widerspruch:
**`rules/TEXT_OVERLAY_LOCK.md` gewinnt: Flow-Cover-Titel in Szene 01, Remotion-Keywords später.**

Bei exakter projektspezifischer Darstellung:
**freigegebene Master-Referenz gewinnt.**

Beim Batch-Widerspruch:
**Nur Bild 01 braucht Nutzerfreigabe; danach automatische 5er-Batches mit interner QA.**