# Arbeitsanweisung für Agenten

## Höchste Regel

Vor Änderungen zuerst `CHANGE_CONTROL_LOCK.md` lesen.

Ein neuer Chat startet read-only. Analyse bedeutet keine Schreibfreigabe. Geschrieben wird nur bei ausdrücklicher aktueller Nutzerfreigabe und nur im genannten Scope.

## Verbindliche Regeln

Danach lesen:
1. `CANONICAL_RULES.md`
2. `PROJECT_BRAIN.md`
3. `rules/STICKMAN_DNA.md`
4. `rules/FORMAT_LOCK.md`
5. `rules/YOUTUBE_THEMEN_SYSTEM.md`
6. `rules/YOUTUBE_STYLE_LOCK.md`
7. `rules/IMAGE_REFERENCE_LOCK.md`
8. `rules/COVER_LOCK.md`
9. `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
10. `rules/PRODUCTION_FORMAT_RULES.md`

`rules/STICKMAN_DNA.md` ist die zentrale visuelle Source of Truth. Andere Style-/Prompt-Dateien konkretisieren diese DNA, dürfen ihr aber nicht widersprechen.

## Themenwelt

Die Kanalnische ist **Alltagspsychologie & menschliches Verhalten**.

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

## Bildwelt — HARD LOCK

Verbindlich ist **Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**.

Jede sichtbare menschliche oder menschenähnliche Figur muss dieselbe echte Stickman-Grundanatomie benutzen. Das gilt ohne Ausnahme für Hauptfiguren, Nebenfiguren, Menschenmengen, Hintergrundpersonen, Forscher, historische Figuren, Passanten sowie Personen auf Screens, Fotos, Postern, Werbung, Spiegelungen oder Illustrationen innerhalb der Szene.

Echte Stickman-DNA:
- einfacher runder/ovaler Kopf
- keine realistische Nase, Ohren oder Gesichtsmodellierung
- minimale Augen/Mund/Augenbrauen
- kleiner stark vereinfachter Torso
- sehr dünne, lineare Arme und Beine ohne fleischige Volumen
- Hände nur als einfache Punkte/Mitten/Nubs, keine Fingeranatomie
- Füße/Schuhe stark vereinfacht
- Kleidung darf Rolle und Epoche zeigen, darf aber niemals normale menschliche Anatomie erzeugen

**Normale Cartoon-Menschen, halb-realistische Menschen oder Mischstile sind HARD FAIL.** Die Umgebung darf dagegen deutlich detailreicher, räumlich glaubwürdig und hochwertig illustriert sein.

## Bildlogik — KONKRETE SZENE VOR INFOGRAFIK

Für jeden Visual Beat zuerst prüfen, ob eine konkrete Stickman-Handlung in einer glaubwürdigen Umgebung die Aussage verständlich machen kann.

Priorität:
1. konkrete Handlung / Alltagsszene
2. einfache visuelle Metapher
3. Diagramm, Skala, Karte oder abstrakter Pfad nur wenn wirklich besser

Keine langen Serien aus denselben `claim cards`, `truth meters`, Waagen, Pfaden oder Dashboard-Kompositionen. Wiederkehrende Symbole dürfen unterstützen, aber nicht das ganze Video dominieren.

## Google-Flow-Quellbilder — ZERO READABLE TEXT HARD LOCK

Der Kanal ist deutschsprachig, aber Google-Flow-Quellbilder werden standardmäßig **vollständig textfrei** erzeugt.

Verbindlich:
- keine lesbaren Wörter oder Buchstaben
- keine UI-Texte
- keine Labels
- keine Untertitel
- keine Poster-/Werbetexte
- keine Bildschirmtexte
- keine Marken-/Logo-Texte
- Dokumente/Screens nur mit abstrakten Linien, Formen und Icons
- englische Promptwörter niemals ins Bild übernehmen
- deutsche Sprechtexte niemals ins Bild schreiben

Deutsche Labels werden standardmäßig kontrolliert in **Remotion** hinzugefügt (`sceneLabels`).

Nur wenn Text physisch zwingend Teil der Szene sein muss und nicht sinnvoll als Overlay gesetzt werden kann, darf eine explizite Ausnahme den exakten kurzen deutschen Wortlaut definieren.

Bei Konflikt gilt:
**textfreies Flow-Quellbild + späterer deutscher Remotion-Overlay gewinnt.**

## Bildklarheit — HARD LOCK

- genau ein primärer visueller Gedanke pro Bild
- ein klares Hauptmotiv
- höchstens 1–2 unterstützende visuelle Hinweise, wenn wirklich nötig
- keine überladenen Multi-Panel-/Infografik-Kompositionen
- wenn ein Sprechabschnitt mehrere neue Gedanken enthält, in mehrere Visual Beats/Bilder aufteilen
- Zuschauer soll die Kernaussage sehr schnell erfassen können

## Scene 01 — COVER + MASTER HARD LOCK

Für jedes YouTube-Projekt gilt:

**`03-bilder/01.png` = SCENE 01 + COVER/THUMBNAIL-BASIS + STYLE-/ANATOMY-MASTER.**

Szene 01 muss gleichzeitig:
- den ersten gesprochenen Visual Beat korrekt darstellen,
- als starkes Cover funktionieren,
- die Stickman-/Welt-DNA als Master etablieren,
- ZERO READABLE TEXT in Flow einhalten.

Cover-Komposition: klares großes Hauptmotiv, starke lesbare Körperhaltung/Emotion/Handlung, wenig visuelles Rauschen, schnelle Thumbnail-Lesbarkeit und bei Bedarf ruhige Negativfläche für späteren deutschen Covertext.

Kein separates Pflicht-`cover.png`. Wenn Covertext verwendet wird, erst nach der Flow-Generierung kontrolliert und ausschließlich auf Deutsch ergänzen.

Strukturierte Phase-1-Pläne: Szene 01 trägt `isCover: true` und `coverRole: "SCENE_01_COVER_MASTER"`; alle späteren Szenen `isCover: false`.

Details: `rules/COVER_LOCK.md`.

## Visual-Beat-Dichte

Standard für skriptbasierte YouTube-Projekte:
- Ziel meist 10–16 Wörter pro Beat
- automatischer Zielwert 14
- normale Obergrenze 20
- 21–28 Wörter nur als ausdrücklich geprüfte Ausnahme mit `allowExtendedBeat: true`
- absolute Obergrenze 28
- durchschnittlich höchstens 16 Wörter pro Szene

Nicht nur nach Wortzahl teilen. Auch kurze Sätze mit mehreren Orten, Handlungen, Vergleichen oder Ursache-Folge-Schritten redaktionell trennen.

## Verbindlicher Referenz-Workflow

Bei Serienbildern gilt:
1. zuerst Bild 01 als **Cover + erster Visual Beat + Style-/Anatomy-Master** alleine generieren,
2. danach STOP und auf Nutzerfreigabe warten,
3. dieses Bild nur bei vollständigem Cover-/Style-/Stickman-/Text-PASS als Master-Referenz freigeben,
4. danach höchstens 5 neue Bilder pro Batch erzeugen,
5. nach jedem Batch interne Style-/Continuity-/Inhalts-QA durchführen,
6. nur fehlerhafte Bilder regenerieren,
7. nach vollständigem PASS automatisch ohne Nutzer-Rückfrage mit dem nächsten Batch fortfahren,
8. nur bei einem nicht automatisch lösbaren schweren Fehler stoppen.

**Die einzige reguläre Nutzerfreigabe ist Bild 01.**

Kein Folgeasset darf die Master-Referenz eigenmächtig ersetzen. Details stehen in `rules/IMAGE_REFERENCE_LOCK.md`.

## FORMAT HARD LOCK

Der Projektpfad entscheidet zwingend das Format.

### Unter `reels/`
- **9:16**
- **1080×1920**
- **30 fps**
- vertikale Bildkomposition
- Remotion: `Phase3Reel`

### Unter `youtube/`
- **16:9**
- **1920×1080**
- **30 fps**
- horizontale Bildkomposition
- Remotion: `Phase3YouTube`

Ein Bild wird direkt für sein Zielformat erzeugt. Falsches Seitenverhältnis anschließend nur zu croppen ist keine Standardlösung.

## Audio

Für beide Formate:
- finales Voice-over exakt 1,10×
- führende Stille entfernen
- lange Pausen straffen; Pausen ab ca. 500 ms auf ungefähr 120 ms Restpause kürzen
- Wörter niemals abschneiden
- Timings erst aus final verarbeitetem Audio

## Zwei getrennte Produktionsflächen

- `youtube/` — reguläre YouTube-Longform-/Testvideo-Projekte als eigene Themenordner
- `reels/` — Reels/Shorts nach Wochenordnern und Wochentagen

Reels dürfen niemals unter `youtube/` liegen und YouTube-Projekte niemals unter `reels/`.

## Einfache YouTube-Arbeitsfläche — HARD LOCK

Für jedes neue YouTube-Projekt bleibt die normale Nutzeransicht bewusst einfach:

- `01-script/` → enthält nur `script.txt`
- `02-google-flow/` → enthält nur `google-flow-prompt.txt`
- `03-bilder/` → `01.png`, `02.png`, `03.png` usw.; **`01.png` ist zugleich Scene 01 + Cover + Master-Referenz**
- `04-audio/` → finales `final-voice.mp3`
- `05-export/` → fertiger Videoexport
- `99-intern/` → Quellen, Style-/Continuity-Regeln, QA, Phase-1/Phase-3-Dateien und sonstige Technik

Der Nutzer soll für die normale Produktion **nur ein Skript und eine einzige Prompt-Datei** öffnen müssen.

`02-google-flow/google-flow-prompt.txt` ist die einzige nutzerseitige Prompt-Datei für die komplette Bildproduktion. Sie muss enthalten:
- zentrale DNA aus `rules/STICKMAN_DNA.md`
- Format und Stil
- STRICT-STICKMAN-ONLY-Gate
- ZERO-READABLE-TEXT-Gate für Flow-Quellbilder
- **Scene-01-Cover-Hard-Lock**
- Ein-Gedanke-pro-Bild-Gate
- konkrete Szene vor generischer Infografik
- Master-Referenz-Regel
- konkreten 5er-Batch-Plan
- STOP nur nach Bild 01
- automatische interne QA und automatisches Fortsetzen
- Dateinamen
- alle individuellen Szenen-/Bildprompts des Videos

Deutsche Labels gehören als Metadaten nach `99-intern/` und werden durch Phase 3/Remotion gerendert, nicht durch Flow.

Keine zusätzlichen Prompt-/Style-Dateien in der normalen sichtbaren Arbeitsfläche anlegen.

## QA vor Abschluss

Bei strukturellen oder Pipeline-Änderungen mindestens ausführen:
- `npm run typecheck`
- `npm run qa:visual-density`
- `npm run qa:auto-visual-planning`
- `npm run qa:flow-prompts`
- relevante Format-/Produktionschecks

## Reihenfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 Bilder → Phase 3 Timings/Render → Final-QA.

Keine Phase überspringen. Skriptänderung setzt nachgelagerte semantische/visuelle Planung zurück.

## Priorität

Bei Formatkonflikten gilt ohne Ausnahme:
**`rules/FORMAT_LOCK.md` gewinnt.**

Bei visueller Identität gilt:
**`rules/STICKMAN_DNA.md` gewinnt.**

Bei Cover-Fragen gilt:
**`rules/COVER_LOCK.md` gewinnt: `01.png = SCENE 01 + COVER + MASTER`.**

Bei der exakten projektspezifischen Darstellung gilt innerhalb der DNA:
**freigegebene Master-Referenz gewinnt.**

Bei Textkonflikten gilt:
**textfreies Flow-Quellbild + deutscher Remotion-Overlay gewinnt.**

Beim Batch-Ablauf gilt:
**Master-/Coverfreigabe einmalig nach Bild 01; danach automatische 5er-Batches mit interner QA ohne weitere Nutzer-Rückfragen.**
