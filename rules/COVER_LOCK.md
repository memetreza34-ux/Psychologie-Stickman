# COVER LOCK — SCENE 01 IST IMMER COVER

**STATUS: VERBINDLICH — HARD LOCK**

Diese Regel gilt für jedes YouTube-Projekt unter `youtube/`.
Zusätzlich verbindlich: `rules/TEXT_OVERLAY_LOCK.md` und `rules/FLOW_TEXT_STYLE_LOCK.md`.

## 1. Dreifachrolle von Bild 01

`03-bilder/01.png` ist immer gleichzeitig:
1. **SCENE 01** — erstes sichtbares Bild des Videos,
2. **COVER / THUMBNAIL** — zentrales Covermotiv,
3. **STYLE-/ANATOMY-MASTER** — Referenz für Stickman-DNA und Bildwelt aller Folgebilder.

Es wird kein separates Pflicht-`cover.png` benötigt.

Kurz:
**01.png = SCENE 01 + COVER + MASTER.**

## 2. Cover muss zum ersten gesprochenen Beat passen

Szene 01 muss den ersten gesprochenen Visual Beat korrekt darstellen und gleichzeitig als starkes Cover funktionieren.

Verbindlich:
- erstes gesprochenes Thema sofort visuell erkennbar
- ein dominantes Hauptmotiv
- klare Emotion / Handlung / Konflikt
- schnelle Lesbarkeit als kleines Thumbnail
- keine spätere Information vorwegnehmen
- keine irreführende Übertreibung
- 16:9

## 3. Cover-Komposition — STRENGTH LOCK

Das Cover darf nicht nur „cover-fähig“ sein, sondern muss bewusst **stärker als eine normale Szene** komponiert werden.

Bevorzugt:
- Hauptmotiv deutlich größer und klarer als in normalen Szenen
- starke Silhouette / klare Körperhaltung
- sofort lesbarer visueller Konflikt, Kontrast oder emotionale Spannung
- wenige gezielte unterstützende Elemente
- sauberer Vordergrund/Mittelgrund/Hintergrund
- klare sichere Typografiezone
- Titel und Hauptmotiv als gemeinsame Komposition
- genug Negativraum für gute Lesbarkeit

Nicht erlaubt:
- flache neutrale Alltagsszene ohne Cover-Spannung
- überladene Collage
- kleinteilige Infografik
- viele gleich wichtige Motive
- generischer neutraler Stickman ohne Aussage
- reines Titelbild ohne Bezug zum ersten Beat
- Text, der Hauptmotiv oder Gesicht überlagert

## 4. Cover-Titel — GOOGLE FLOW HARD LOCK

Der sichtbare Cover-Titel wird **direkt von Google Flow in `01.png` gerendert**.

Verbindlich:
- deutscher `coverHeadline`
- 2–7 Wörter
- exakter Wortlaut im Flow-Prompt
- Rechtschreibung, Umlaute, Satzzeichen und Groß-/Kleinschreibung exakt
- Titel groß, klar, vollständig innerhalb der Safe Area
- professioneller integrierter Editorial-Look
- keine generische Meme-/Sticker-Schrift
- keine übermäßig dicke Outline als Standard
- außer diesem Titel kein weiterer lesbarer Text
- bei Fehlern Szene 01 regenerieren
- Remotion darf den Titel **niemals** zusätzlich rendern

Beispiel:
`WARUM BLEIBT NEGATIVES HÄNGEN?`

## 5. Alle weiteren Textmomente ebenfalls aus Google Flow

Ausgewählte spätere Szenen dürfen kurze deutsche Keywords direkt im Google-Flow-Bild enthalten.

- exakt vorgegebener Wortlaut
- maximal 5 Wörter
- keine zusätzlichen lesbaren Wörter
- Text vollständig im Bild, nicht angeschnitten
- Typografie ästhetisch in die jeweilige Szene integrieren

Nicht ausgewählte Szenen bleiben **ZERO READABLE TEXT**.

**Remotion erzeugt im YouTube-Video keinerlei sichtbare Typografie.**

## 6. Master-Referenz bleibt Style-/Anatomie-Referenz

Ab Szene 02 gilt:
- gleiche Stickman-DNA
- gleiche Linien-/Renderingqualität
- gleiche Weltqualität
- Figurenidentität, Kleidung, Rolle, Ort, Pose, Kamera, Cast und Komposition dürfen wechseln
- Cover-Titel aus `01.png` niemals automatisch kopieren
- nur bei einer ausdrücklich geplanten Textszene deren eigenen exakten deutschen Text rendern

**Cover-Master bedeutet nicht Charakter-, Kompositions- oder Text-Klonvorlage.**

## 7. Metadaten

Neue YouTube-Projekte:
- `coverHeadlineRequired: true`
- `coverHeadline: "..."`
- `coverTextRenderer: "GOOGLE_FLOW"`
- `visibleTextRenderer: "GOOGLE_FLOW"`
- `renderGermanLabelsInRemotion: false`
- `finalTextPolicy: "FLOW_VISIBLE_TEXT_ONLY_V3"`
- `flowSourceImageTextPolicy: "PLANNED_EXACT_GERMAN_TEXT_ONLY"`
- `flowTextStylePolicy: "EDITORIAL_INTEGRATED_V1"`
- `visualPlanningPolicy: "VARIED_COMPOSITION_V1"`
- `flowTextMoments: [...]`
- `sceneLabels: []`

Szene 01:
- `isCover: true`
- `coverRole: "SCENE_01_COVER_MASTER"`

Alle späteren Szenen:
- `isCover: false`

## 8. Google-Flow-Prompt

Jeder neue YouTube-Flow-Prompt muss enthalten:
- Scene 01 als COVER + MASTER
- `COVER STRENGTH — HARD LOCK`
- exakten deutschen Cover-Titel
- `TYPOGRAPHY AESTHETIC — HARD LOCK`
- klare Anweisung, den Titel direkt in Bild 01 zu rendern
- Liste aller weiteren geplanten Flow-Textmomente
- für jede Textszene den exakten deutschen Wortlaut
- für alle anderen Szenen ZERO READABLE TEXT
- STOP nach Bild 01
- danach 5er-Batches
- ab Szene 02 Master nur als STYLE-/ANATOMY-Referenz

## 9. QA-Fail

FAIL wenn:
- Szene 01 nicht Cover + Master ist
- Cover nur wie eine normale flache Szene wirkt
- kein dominanter Fokus / keine klare Cover-Hierarchie erkennbar ist
- Titel fehlt, falsch oder abgeschnitten ist
- Typografie sichtbar unpassend, billig oder wie aufgeklebt wirkt
- zusätzliche Schrift erscheint
- eine geplante Keyword-Szene falschen Text enthält
- eine textfreie Szene lesbaren Text enthält
- Remotion für YouTube `sceneLabels` oder Captions rendert

## 10. Priorität

**`01.png = SCENE 01 + COVER + STYLE-/ANATOMY-MASTER`, bewusst als starkes Thumbnail komponiert, und sämtlicher sichtbarer YouTube-Text wird direkt von Google Flow in die jeweiligen Bilder gerendert.**
