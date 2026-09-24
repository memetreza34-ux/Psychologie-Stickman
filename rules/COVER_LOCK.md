# COVER LOCK — SCENE 01 IST IMMER COVER

**STATUS: VERBINDLICH — HARD LOCK**

Diese Regel gilt für jedes YouTube-Projekt unter `youtube/`.

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
- bei sinnvoller späterer Typografie genügend ruhige Negativfläche

Nicht erlaubt:
- kleinteilige Infografik als Cover
- überladene Collage
- viele gleich wichtige Motive
- generischer neutraler Stickman ohne erkennbare Aussage
- reines Titelbild, das den ersten Beat nicht mehr zeigt

## 4. Textregel

Google-Flow-Quellbild `01.png` bleibt standardmäßig **ZERO READABLE TEXT**.

Wenn das endgültige YouTube-Cover Text erhalten soll:
- Text erst kontrolliert nach der Bildgenerierung ergänzen
- ausschließlich Deutsch
- kurz und klar
- Flow darf keine englischen oder zufälligen Wörter in `01.png` rendern

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

Alle späteren Szenen:
- `isCover: false`

Automatisch erzeugte Visual Beats müssen diese Kennzeichnung selbst setzen.

## 7. Google-Flow-Prompt

Jeder neue YouTube-Flow-Prompt muss Szene 01 eindeutig als Cover/Master behandeln, z. B.:

`SCENE 01 — COVER + MASTER`

und im Prompt klar machen:
- erstes Bild allein generieren
- cover-taugliche, starke Komposition
- erster Beat muss korrekt dargestellt bleiben
- ZERO READABLE TEXT
- nach Freigabe als `03-bilder/01.png` speichern
- ab Szene 02 als STYLE-/ANATOMY-Referenz verwenden

## 8. QA-Fail

Ein neues YouTube-Projekt gilt als nicht fertig vorbereitet, wenn:
- Szene 01 nicht als Cover vorgesehen ist
- Szene 01 nur Master, aber kein Cover ist
- ein separates Cover geplant wird, während `01.png` als beliebige normale Szene behandelt wird
- Szene 01 nicht zum ersten gesprochenen Beat passt
- Szene 01 keine ausreichende Thumbnail-Klarheit besitzt
- Cover-Text direkt von Flow zufällig/englisch erzeugt wird

## 9. Priorität

Bei Cover-Fragen gilt:
**`01.png = SCENE 01 + COVER + STYLE-/ANATOMY-MASTER`.**

Dabei bleiben `FORMAT_LOCK`, `STICKMAN_DNA` und die ZERO-READABLE-TEXT-Regel unverändert verbindlich.
