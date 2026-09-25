# STICKMAN DNA — CHANNEL VISUAL SOURCE OF TRUTH

**STATUS: HARD LOCK — v1.3**

Diese Datei ist die zentrale visuelle Source of Truth für alle Agenten, Prompts, Templates, Reels und YouTube-Videos.

Leitidee:

**Simple Stickmen. Rich World. One clear idea per image. German visual language.**

## 1. Figuren-DNA — STRICT STICKMAN ONLY

Jede sichtbare menschliche oder menschenähnliche Figur ist ein echter Stickman.

Verbindlich:
- einfacher runder oder ovaler flacher Kopf
- minimale Punkt-/Strichaugen und kleiner Mund
- keine realistische Nase
- keine realistischen Ohren
- kein realistischer Hals
- kleiner stark vereinfachter Torso
- sehr dünne lineare Arme und Beine mit nahezu gleichbleibender Dicke
- keine fleischigen Oberarme, Unterarme, Oberschenkel oder Waden
- Hände nur als kleine Nubs, Punkte, Kreise oder simple Mitten
- keine Fingeranatomie
- Füße/Schuhe stark vereinfacht
- Kleidung darf Rolle, Beruf, Epoche und Persönlichkeit zeigen, aber niemals normale menschliche Anatomie erzeugen

Gilt ausnahmslos für Hauptfiguren, Nebenfiguren, Passanten, Menschenmengen, Forscher, historische Figuren, Personen in Fahrzeugen, entfernte Hintergrundfiguren sowie Personen auf Screens, Fotos, Postern, Werbung, Spiegelungen und Erinnerungs-/Diagrammebenen.

**HARD FAIL:** normale Cartoon-Menschen, semi-realistische Menschen, realistische Menschen, gemischte Figurenstile, dicke menschliche Gliedmaßen, realistische Hände/Finger, 3D/Pixar, Anime, Manga oder Chibi.

## 2. Welt-DNA — DETAILREICHE MODERNE 2D-WELT

Die Figuren bleiben sehr simpel. Die Welt darf deutlich reichhaltiger sein.

Erwünscht:
- glaubwürdige Wohnungen, Büros, Busse, Bahnen, Straßen, Cafés, Schulen und Labore
- klare Architektur und Perspektive
- echte räumliche Logik
- passende Möbel, Technik und Requisiten
- natürliche Objektfarben
- saubere dunkle organische Outlines
- moderate bis kräftige kontrollierte Sättigung
- weiches glaubwürdiges Licht
- dezentes 2D-/Cel-Shading
- hochwertige Editorial-/Dokumentationswirkung

Nicht erwünscht:
- Fotorealismus
- 3D-/CGI-Look
- leerer Whiteboard-Look als Standard
- permanentes Beige/Sepia/Pastell
- zufällige Dekoration ohne Erklärfunktion

**Detail gehört in die Welt, nicht in die menschliche Anatomie.**

## 3. Bild-DNA — EINE KLARE IDEE PRO BILD

Verbindlich:
- genau ein primärer visueller Gedanke pro Bild
- ein klares Hauptmotiv
- höchstens 1–2 unterstützende Hinweise, wenn wirklich nötig
- keine vollgestopften Infografiken
- keine konkurrierenden Teilbilder, wenn eine einzelne Szene genügt
- keine unnötigen Tabellen, Panels, Karten, Meter, Diagramme oder Textblöcke
- Zuschauer soll die Kernidee ungefähr in einer Sekunde erfassen können
- mehrere neue Gedanken werden auf mehrere Visual Beats verteilt
- Master sperrt Stil, nicht Kamera, Pose, Ort, Komposition oder Figurenidentität

Priorität:
**Klarheit > Informationsmenge pro Bild.**

## 4. Konkrete Szene vor abstrakter Infografik

Standardmäßig soll ein Beat als konkrete Stickman-Handlung in einer glaubwürdigen Umgebung visualisiert werden.

Bevorzugte Reihenfolge:
1. konkrete Handlung mit Stickman + passendem Ort/Requisit
2. einfache visuelle Metapher
3. Diagramm/Skala/Karte nur wenn Handlung oder Metapher die Aussage nicht sauber erklären kann

Keine langen Serien aus denselben Karten, Metern, Waagen, Pfaden oder abstrakten UI-Flächen.

Jede Szene darf bewusst variieren:
- Kameradistanz
- Perspektive
- Pose
- Handlung
- Ort
- Requisiten
- Licht
- Bildtiefe

## 5. Sprache im Bild — COVER-AUSNAHME + TEXTFREIE FOLGESZENEN

Der Kanal ist deutschsprachig.

### YouTube Szene 01

**Permanente Cover-Ausnahme:** Google Flow rendert den vorher festgelegten exakten deutschen Cover-Titel direkt in `01.png`.

Verbindlich:
- 2–7 Wörter
- exakter deutscher Wortlaut
- korrekte Umlaute und Satzzeichen
- große, gut lesbare Thumbnail-Typografie
- außer diesem Titel kein weiterer lesbarer Text
- bei falscher oder unlesbarer Schrift Szene 01 neu generieren
- Remotion darf diesen Cover-Titel nicht erneut rendern

### YouTube Szene 02+ und normale Quellbilder

**ZERO READABLE TEXT IN GENERATED SOURCE IMAGES.**

Das bedeutet:
- keine lesbaren Buchstaben
- keine Wörter
- keine unnötigen Zahlen
- keine UI-Texte
- keine Labels
- keine Untertitel
- keine Postertexte
- keine Bildschirmtexte
- keine Marken-/Logo-Texte
- keine zufälligen englischen Promptwörter
- den Cover-Titel aus der Master-Referenz niemals kopieren

Spätere ausgewählte deutsche Keywords werden kontrolliert in Remotion ergänzt.

Nur weitere ausdrücklich begründete Szenen dürfen zusätzlichen Text direkt im generierten Bild anfordern. Dann muss der exakte deutsche Wortlaut feststehen und so kurz wie möglich sein.

Bei Cover-Konflikten gewinnt `rules/COVER_LOCK.md`.

## 6. CAST-VARIATION — STIL GLEICH, FIGUREN NICHT GLEICH

**Stickman-DNA ist keine Charakter-DNA.** Alle Figuren gehören sichtbar zur gleichen Bildwelt, müssen aber nicht dieselbe Person sein.

Standard:
- pro Szene sinnvollsten Cast wählen
- 1 bis 4 Stickmen, wenn es der Inhalt unterstützt
- Hauptfigur nur wiederholen, wenn echte erzählerische Kontinuität nötig ist
- Nebenfiguren dürfen andere Kleidung, Farben, Accessoires, Rollen und Körpergrößen innerhalb der DNA haben
- Rollen passend zum Inhalt wählen
- nicht automatisch denselben Hoodie, dieselbe Farbe oder denselben Charakter aus Bild 01 kopieren

Vor jedem Bild vier Entscheidungen:
1. **Cast:** Wer oder wie viele Stickmen passen?
2. **Ort:** Welche Umgebung erklärt den Beat?
3. **Handlung:** Was tun die Figuren sichtbar?
4. **Kamera:** Welche Perspektive macht es klar?

Verbotener Default:
- immer derselbe einzelne Stickman
- immer derselbe Hoodie
- immer derselbe Schreibtisch
- immer dieselbe neutrale Pose
- immer derselbe Medium Shot

## 7. Wiederkehrende Figuren — NUR BEI ECHTER KONTINUITÄT

Wenn eine bestimmte Figur innerhalb einer zusammenhängenden Mini-Handlung dieselbe Person bleiben soll, konstant halten:
- Kopfgröße/-form
- Gesichtsstil
- Torso-Proportion
- Arm-/Beindicke
- Hände/Füße
- Kleidung und Kernfarben innerhalb dieser Mini-Handlung
- relevante Accessoires/Requisiten

Diese Kontinuität ist lokal, nicht automatisch für das ganze Video.

## 8. Master-Referenz-DNA — STYLE REFERENCE, NOT CHARACTER OR TEXT CLONE

Für YouTube:
1. Bild 01 allein generieren, inklusive exaktem Cover-Titel.
2. STOP und Nutzerfreigabe abwarten.
3. Nur freigeben, wenn Stickman-DNA, Welt-DNA, Titel, Cover-Klarheit und erster Beat passen.
4. Bild 01 als Master speichern.
5. Ab Bild 02 immer Bild 01 als Referenz anhängen.
6. Master sperrt **Anatomie-System, Linienart, Rendering, Shading, Farbverhalten, Detailgrad und Gesamtästhetik**.
7. Master sperrt **NICHT** Figurenidentität, Kleidung, Rollen, Anzahl der Figuren, Pose, Kamera, Ort, Licht oder Komposition.
8. Der Cover-Titel in Bild 01 gehört ausschließlich zu Szene 01 und darf nie in Folgeassets kopiert oder rekonstruiert werden.

Ein späteres Bild ersetzt den Master nicht automatisch.

## 9. Batch-DNA

Nach der einmaligen Freigabe von Bild 01:
- maximal 5 neue Bilder pro Batch
- interne QA automatisch durchführen
- gegen Master, untereinander und gegen Visual Beat prüfen
- nur fehlerhafte Bilder regenerieren
- bestandene Bilder behalten
- nach vollständigem PASS automatisch den nächsten Batch starten
- keine Nutzer-Rückfrage nach normalen Batches

**Nutzerfreigabe regulär nur einmal: nach Bild 01.**

## 10. Format-DNA

- `reels/` → 9:16 / 1080×1920 / 30 fps
- `youtube/` → 16:9 / 1920×1080 / 30 fps

Nicht nachträglich aus dem falschen Format croppen, sondern direkt nativ komponieren.

## 11. Kompakter DNA-Promptblock

`STRICT CHANNEL DNA: simple editorial 2D stickman characters inside rich detailed believable environments. EVERY visible human or human-like figure must use the same true stickman anatomy: simple round/oval flat head, tiny minimal eyes and mouth, no realistic nose or ears, small simplified torso, very thin line-like arms and legs, simple no-finger hands and simplified feet. No conventional cartoon humans, no semi-realistic people, no mixed human styles, no 3D/Pixar/anime/chibi. MASTER IMAGE IS A STYLE/ANATOMY REFERENCE, NOT A CHARACTER OR TEXT CLONE: preserve anatomy system, linework, rendering, color treatment and world quality, but freely vary character identity, clothing, cast size, pose, role, environment and camera to fit each beat. ONE clear visual idea per image. Prefer a concrete stickman action in a believable setting over an abstract infographic. YOUTUBE TEXT POLICY: Scene 01 renders the exact provided German cover title and no other readable text. Scene 02+ renders ZERO READABLE TEXT and must never copy the cover title from the master. Selected later German keyword overlays are added in Remotion.`

## 12. Priorität

Bei Konflikten gilt:
- Format → `rules/FORMAT_LOCK.md`
- visuelle Identität → **diese DNA-Datei**
- Cover-Titel → `rules/COVER_LOCK.md`
- Style-/Anatomie-Ausprägung → freigegebene Master-Referenz
- Figurenidentität/Cast → jeweiliger Visual Beat
- Szeneninhalt → jeweiliger Visual Beat
- spätere Keyword-Texte → `rules/TEXT_OVERLAY_LOCK.md`

Merksatz:

**DNA bestimmt WIE Stickmen aussehen. Master zeigt den Stil. Visual Beat bestimmt WER, WO und WAS. Google Flow setzt den Cover-Titel. Remotion setzt spätere Keywords.**
