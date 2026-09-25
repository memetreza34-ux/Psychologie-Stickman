# COVER LOCK — SCENE 01 IST IMMER COVER

**STATUS: VERBINDLICH — HARD LOCK**

Diese Regel gilt für jedes YouTube-Projekt unter `youtube/`.
Zusätzlich verbindlich: `rules/TEXT_OVERLAY_LOCK.md`.

## 1. Dreifachrolle von Bild 01

`03-bilder/01.png` ist immer gleichzeitig:
1. **SCENE 01** — erstes sichtbares Bild des Videos,
2. **COVER / THUMBNAIL** — das zentrale Covermotiv des Videos,
3. **STYLE-/ANATOMY-MASTER** — Referenz für Stickman-DNA und Bildwelt aller Folgebilder.

Es wird kein separates Pflicht-`cover.png` benötigt.

Kurz:
**01.png = SCENE 01 + COVER + MASTER.**

## 2. Cover muss zum ersten gesprochenen Beat passen

Szene 01 darf nicht nur ein dekoratives Thumbnail sein. Sie muss den ersten gesprochenen Visual Beat korrekt darstellen und gleichzeitig als starkes Cover funktionieren.

Verbindlich:
- erstes gesprochenes Thema sofort visuell erkennbar
- ein starkes Hauptmotiv
- klare Emotion / Handlung / Konflikt
- schnelle Lesbarkeit auch als kleines Thumbnail
- keine spätere Information vorwegnehmen
- keine irreführende Übertreibung
- YouTube 16:9

## 3. Cover-Komposition

Bevorzugt:
- Hauptmotiv deutlich größer und klarer als in normalen Szenen
- starke Silhouette / klare Körperhaltung
- wenige gezielte unterstützende Elemente
- sauberer Vordergrund/Mittelgrund/Hintergrund
- hohe visuelle Klarheit
- klare Typografiezone für den Titel, ohne das Motiv zu verdecken

Nicht erlaubt:
- kleinteilige Infografik als Cover
- überladene Collage
- viele gleich wichtige Motive
- generischer neutraler Stickman ohne Aussage
- reines Titelbild, das den ersten Beat nicht mehr zeigt

## 4. Cover-Titel — GOOGLE FLOW HARD LOCK

**Der sichtbare Cover-Titel wird direkt von Google Flow in `01.png` gerendert.**

Das ist die verbindliche Ausnahme von der sonstigen ZERO-READABLE-TEXT-Regel.

Verbindlich:
- jedes YouTube-Cover besitzt einen vorab festgelegten deutschen `coverHeadline`
- Ziel: **2–7 Wörter**
- Google Flow erhält den **exakten deutschen Wortlaut**
- Flow muss genau diesen Titel sichtbar, groß und gut lesbar in Szene 01 rendern
- Rechtschreibung, Umlaute, Satzzeichen und Groß-/Kleinschreibung müssen stimmen
- außer diesem Cover-Titel darf Szene 01 keinen weiteren lesbaren Text enthalten
- **Remotion darf den Cover-Titel nicht ein zweites Mal darüberlegen**
- kurze Frage als Titel ist erlaubt
- kein ganzer Erklärungssatz

Beispiel:
`WARUM BLEIBT NEGATIVES HÄNGEN?`

HARD FAIL für Szene 01:
- Titel fehlt
- Titel ist falsch geschrieben
- Wörter fehlen oder wurden ergänzt
- englischer oder zusätzlicher lesbarer Text erscheint
- Pseudo-Schrift / unlesbare Buchstaben
- Titel verdeckt Kopf, Hände oder zentrale Handlung

Bei einem solchen Fehler wird **nur Szene 01 neu generiert**, bevor sie als Master freigegeben wird.

## 5. Textregel ab Szene 02

Ab Szene 02 gilt wieder standardmäßig:
**ZERO READABLE TEXT.**

Kurze deutsche Keywords ausgewählter späterer Szenen werden kontrolliert in Remotion ergänzt. Flow rendert diese Keywords nicht selbst.

Kurz:
- **Szene 01:** exakter deutscher Cover-Titel direkt in Google Flow
- **Szene 02+:** Flow standardmäßig textfrei
- **spätere Keywords:** Remotion

## 6. Master-Referenz bleibt Style-/Anatomie-Referenz

Obwohl `01.png` Cover und Titel enthält, darf sein konkreter Charakter oder Raum nicht automatisch das ganze Video klonen.

Ab Szene 02 gilt weiterhin:
- gleiche Stickman-DNA
- gleiche Linien-/Renderingqualität
- gleiche Weltqualität
- Figurenidentität, Kleidung, Rolle, Ort, Pose, Kamera und Cast dürfen beat-passend wechseln
- der Cover-Titel aus Bild 01 darf **nicht** in spätere Bilder übernommen oder nachgeahmt werden

**Cover-Master bedeutet nicht Charakter- oder Text-Klonvorlage.**

## 7. Metadaten

Neue YouTube-Projekte sollen enthalten:
- `coverHeadlineRequired: true`
- `coverHeadline: "..."`
- `coverTextRenderer: "GOOGLE_FLOW"`
- `flowSourceImageTextPolicy: "SCENE_01_EXACT_GERMAN_COVER_TITLE_ONLY"`

Szene 01 trägt:
- `isCover: true`
- `coverRole: "SCENE_01_COVER_MASTER"`

Alle späteren Szenen:
- `isCover: false`

`sceneLabels` dient bei neuen Projekten nur noch den späteren Remotion-Keywords. Der Cover-Titel gehört nicht mehr als Remotion-Overlay in `sceneLabels`.

## 8. Google-Flow-Prompt

Jeder neue YouTube-Flow-Prompt muss Szene 01 eindeutig als Cover/Master behandeln und enthalten:
- `SCENE 01 — COVER + MASTER`
- den exakten deutschen `coverHeadline`
- klare Anweisung, diesen Titel direkt im Bild zu rendern
- `NO OTHER READABLE TEXT`
- Prüfung auf exakte Schreibweise
- erstes Bild allein generieren
- nach Szene 01 STOP und Nutzerfreigabe
- ab Szene 02 `ZERO READABLE TEXT`
- ab Szene 02 Bild 01 nur als STYLE-/ANATOMY-Referenz verwenden

## 9. QA-Fail

Ein neues YouTube-Projekt gilt als nicht fertig vorbereitet, wenn:
- Szene 01 nicht als Cover vorgesehen ist
- kein exakter deutscher Cover-Titel festgelegt ist
- der Flow-Prompt den Titel nicht direkt in Szene 01 rendern lässt
- Remotion denselben Cover-Titel zusätzlich rendern würde
- die Cover-Headline mehr als 7 Wörter hat
- Szene 01 nicht zum ersten gesprochenen Beat passt
- Szene 01 keine ausreichende Thumbnail-Klarheit besitzt
- Szene 02+ unbeabsichtigten lesbaren Text enthält

## 10. Priorität

Bei Cover-Fragen gilt:
**`01.png = SCENE 01 + COVER + STYLE-/ANATOMY-MASTER`, und Google Flow rendert den exakten deutschen Cover-Titel direkt in Bild 01.**

Die ZERO-READABLE-TEXT-Regel gilt ab Szene 02 weiterhin vollständig.