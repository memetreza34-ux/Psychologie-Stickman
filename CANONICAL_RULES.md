# CANONICAL RULES — STICKMAN

## Kanal

Thema: **Alltagspsychologie & menschliches Verhalten**.

Verbindlich:
- `rules/STICKMAN_DNA.md`
- `rules/FORMAT_LOCK.md`
- `rules/YOUTUBE_THEMEN_SYSTEM.md`
- `rules/YOUTUBE_STYLE_LOCK.md`
- `rules/IMAGE_REFERENCE_LOCK.md`
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

## Google-Flow-Quellbilder — ZERO READABLE TEXT

Google-Flow-Quellbilder werden standardmäßig vollständig textfrei erzeugt:
- keine Wörter oder Buchstaben
- keine Labels
- keine UI-Texte
- keine Untertitel
- keine Poster-/Bildschirmtexte
- keine zufälligen englischen Promptwörter

Screens, Karten und Dokumente nutzen abstrakte Linien, Formen und Icons.

Deutsche Labels werden standardmäßig erst in **Remotion** über `sceneLabels` hinzugefügt. Dadurch bleiben Schreibweise, Sprache und Typografie kontrollierbar.

Nur wenn Text physisch zwingend Teil einer Szene sein muss, darf eine explizite Ausnahme den exakten kurzen deutschen Wortlaut freigeben.

## Master-Referenz + automatische 5er-Batches

- Bild 01 zuerst allein generieren
- STOP und Nutzerfreigabe abwarten
- Bild 01 nur bei vollständigem Style-/Stickman-/Textfreiheits-PASS freigeben
- Bild 01 bleibt Master
- ab Bild 02 Master bei jeder Generierung anhängen
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

Die eine `google-flow-prompt.txt` enthält alle Szenenprompts, zentrale DNA, ZERO-READABLE-TEXT-Regel und Batch-Ablauf.

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

Bei exakter projektspezifischer Darstellung:
**freigegebene Master-Referenz gewinnt.**

Bei Text-Widerspruch:
**textfreies Flow-Quellbild + deutscher Remotion-Overlay gewinnt.**

Beim Batch-Widerspruch:
**Nur Bild 01 braucht Nutzerfreigabe; danach automatische 5er-Batches mit interner QA.**
