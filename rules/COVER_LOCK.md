# COVER LOCK — SCENE 01 IST IMMER COVER

**STATUS: VERBINDLICH — HARD LOCK**

Diese Regel gilt für jedes YouTube-Projekt unter `youtube/`.

Zusätzlich verbindlich: `rules/TEXT_OVERLAY_LOCK.md`.

## 1. Dreifachrolle von Bild 01

`03-bilder/01.png` ist immer gleichzeitig:
1. **SCENE 01** — erstes sichtbares Bild des Videos,
2. **COVER / THUMBNAIL-BASIS** — das zentrale Covermotiv des Videos,
3. **STYLE-/ANATOMY-MASTER** — Referenz für Stickman-DNA und Bildwelt aller Folgebilder.

Es wird kein separates Pflicht-`cover.png` benötigt. Die erste Szene ist das Cover.

Kurz:
**01.png = SCENE 01 + COVER + MASTER.**

## 2. Cover muss trotzdem zum ersten gesprochenen Beat passen

Szene 01 darf nicht nur ein dekoratives Thumbnail sein.
Sie muss den ersten gesprochenen Visual Beat korrekt darstellen und gleichzeitig als starkes Cover funktionieren.

Verbindlich:
- erstes gesprochenes Thema sofort visuell erkennbar
- ein starkes Hauptmotiv
- klare Emotion / Handlung / Konflikt
- sehr schnelle Lesbarkeit auch in kleiner Thumbnail-Darstellung
- keine spätere Information vorwegnehmen
- keine irreführende Übertreibung, die dem Video widerspricht
- 16:9 bei YouTube

## 3. Cover-Komposition

Bevorzugt:
- Hauptmotiv deutlich größer und klarer als in normalen Szenen
- starke Silhouette / klare Körperhaltung
- wenige, gezielte unterstützende Elemente
- sauberer Vordergrund/Mittelgrund/Hintergrund
- hohe visuelle Klarheit
- **bewusst geplante ruhige Negativfläche für die Cover-Überschrift**

Nicht erlaubt:
- kleinteilige Infografik als Cover
- überladene Collage
- viele gleich wichtige Motive
- generischer neutraler Stickman ohne erkennbare Aussage
- reines Titelbild, das den ersten Beat nicht mehr zeigt

## 4. Cover-Text — VERPFLICHTEND

Das Google-Flow-Quellbild `01.png` bleibt **ZERO READABLE TEXT**.

Das **finale Cover erhält aber immer eine kontrollierte deutsche Überschrift in Remotion**.

Verbindlich:
- `sceneLabels` enthält für Szene 01 genau ein Label mit `variant: "cover"`
- ausschließlich Deutsch
- Ziel: 2–7 Wörter
- groß, klar und schnell lesbar
- kurze Frage ist erlaubt
- Überschrift muss das Video korrekt versprechen
- kein ganzer Erklärungssatz
- keine von Flow generierte Schrift

Beispiel:
`ALLE SCHAUEN DICH AN?`

Flow baut die Bildkomposition mit passender Freifläche. Remotion setzt die Typografie.

## 5. Master-Referenz bleibt Style-/Anatomie-Referenz

Obwohl `01.png` das Cover ist, darf sein konkreter Charakter oder Raum nicht automatisch das ganze Video klonen.

Ab Szene 02 gilt weiterhin:
- gleiche Stickman-DNA
- gleiche Linien-/Renderingqualität
- gleiche Weltqualität
- aber Figurenidentität, Kleidung, Rolle, Ort, Pose, Kamera und Cast dürfen beat-passend wechseln

**Cover-Master bedeutet nicht Charakter-Klonvorlage.**

## 6. Phase-1-Metadaten

Szene 01 soll in strukturierten Szenenplänen ausdrücklich tragen:
- `isCover: true`
- `coverRole: "SCENE_01_COVER_MASTER"`

Projektmetadaten sollen zusätzlich enthalten:
- `coverHeadlineRequired: true`
- `coverTextRenderer: "REMOTION"`

Alle späteren Szenen:
- `isCover: false`

Automatisch erzeugte Visual Beats müssen die Cover-Kennzeichnung selbst setzen.

## 7. Google-Flow-Prompt

Jeder neue YouTube-Flow-Prompt muss Szene 01 eindeutig als Cover/Master behandeln, z. B.:

`SCENE 01 — COVER + MASTER`

und im Prompt klar machen:
- erstes Bild allein generieren
- cover-taugliche, starke Komposition
- erster Beat muss korrekt dargestellt bleiben
- ruhige Fläche für spätere deutsche Cover-Headline einplanen
- ZERO READABLE TEXT
- nach Freigabe als `03-bilder/01.png` speichern
- ab Szene 02 als STYLE-/ANATOMY-Referenz verwenden

## 8. QA-Fail

Ein neues YouTube-Projekt gilt als nicht fertig vorbereitet, wenn:
- Szene 01 nicht als Cover vorgesehen ist
- Szene 01 nur Master, aber kein Cover ist
- das finale Cover keine deutsche Überschrift vorsieht
- die Cover-Headline mehr als 7 Wörter hat
- ein separates Cover geplant wird, während `01.png` als beliebige normale Szene behandelt wird
- Szene 01 nicht zum ersten gesprochenen Beat passt
- Szene 01 keine ausreichende Thumbnail-Klarheit besitzt
- Cover-Text direkt von Flow zufällig/englisch erzeugt wird

## 9. Priorität

Bei Cover-Fragen gilt:
**`01.png = SCENE 01 + COVER + STYLE-/ANATOMY-MASTER` und das finale Cover erhält eine kurze deutsche Remotion-Headline.**

Dabei bleiben `FORMAT_LOCK`, `STICKMAN_DNA`, `TEXT_OVERLAY_LOCK` und die ZERO-READABLE-TEXT-Regel für Flow-Quellbilder verbindlich.
