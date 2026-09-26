# IMAGE REFERENCE LOCK

**STATUS: VERBINDLICH**

Ziel: Alle Bilder eines Videos müssen eindeutig wie dieselbe hochwertige Bildwelt aussehen, ohne dadurch immer denselben Charakter, dieselbe Kleidung, dieselbe Szene oder denselben Text zu kopieren.

Zusätzlich verbindlich:
- `rules/PREMIUM_VISUAL_LOCK.md`
- `rules/STICKMAN_DNA.md`

## 1. Master-Referenz zuerst

Für jedes YouTube-Projekt:
1. Bild 01 allein generieren.
2. Bild 01 enthält den exakten deutschen Cover-Titel direkt aus Google Flow.
3. Bild 01 etabliert Premium-Figurenqualität + Projekt-Farbwelt.
4. STOP und Nutzerfreigabe.
5. Nur freigeben, wenn STRICT STICKMAN ONLY, Premium Character Direction, Color Story, Welt-DNA, Cover-Klarheit und exakte Titel-Schreibweise erfüllt sind.
6. Bild 01 als Master speichern.
7. Bild 02 bis Ende immer mit der freigegebenen Master-Referenz generieren.

Für YouTube liegt der Master als `03-bilder/01.png`.

**Nur Bild 01 benötigt Nutzerfreigabe.** Danach automatische 5er-Batches mit interner QA.

## 2. Was die Referenz sperrt

Die Master-Referenz sperrt:
- Stickman-Grundanatomie
- Kopf-/Gesichtsvereinfachung
- Proportionen
- sehr dünne lineare Arme/Beine
- Hand-/Fußvereinfachung
- Linienart und Linienstärke
- Flächenbehandlung
- Cel-/Illustrations-Shading
- Premium-Qualitätsniveau
- Farbverhalten / Projektpalette
- Detailgrad der Welt
- allgemeine Illustrationsästhetik

Nicht gesperrt sind:
- Figurenidentität
- Kleidung
- Rolle/Beruf
- Anzahl der Figuren
- Pose und Handlung
- Kamera
- Ort
- Licht/Tageszeit
- konkrete Farbverteilung einer Szene
- Requisiten
- Komposition
- sichtbarer Text anderer Szenen

Kurz:
**Master = Stil-, Anatomie-, Qualitäts- und Farbwelt-Referenz, nicht Charakter-, Kompositions- oder Text-Klonvorlage.**

## 3. PREMIUM CHARACTER + COLOR HARD LOCK

Ab Szene 02 muss die Qualität von Bild 01 gehalten werden:
- ausdrucksstarke Pose statt neutraler Platzhalterfigur
- rollenbezogene Kleidung/Requisiten
- lesbare minimalistische Emotion
- klare Silhouette
- hochwertige glaubwürdige Umgebung
- bewusstes Licht
- Projektpalette erkennbar, aber nicht identisch verteilt

Nicht erlaubt:
- Premium-Level fällt nach Bild 01 sichtbar ab
- grauer/beiger Einheitswash
- sterile Büro-Serie
- Figuren werden generischer als im Master
- jede Szene kopiert dieselbe Farbaufteilung des Masters

## 4. STRICT STICKMAN ONLY — auch im Hintergrund

Alle menschlichen oder menschenähnlichen Figuren müssen dieselbe Stickman-DNA wie der Master verwenden. Das gilt auch für Nebenfiguren, Passanten, Menschenmengen, Forscher, historische Figuren, Personen in Fahrzeugen, Screens, Fotos, Poster, Werbung, Spiegelungen und Erinnerungsbilder.

Nicht zulässig:
- normale Cartoon-Menschen
- semi-realistische Menschen
- fleischige menschliche Arme/Beine
- realistische Hände/Finger
- realistische Nasen/Ohren
- Mischstil zwischen Hauptfigur und Hintergrund

## 5. FLOW-TEXTREGEL — ALLE SICHTBAREN TEXTE DIREKT AUS FLOW

Für neue YouTube-Projekte:

### Geplante Textszene
- Google Flow rendert exakt den vorher festgelegten deutschen Text direkt in das Bild
- Cover: 2–7 Wörter
- späteres Keyword: maximal 5 Wörter
- exakter Wortlaut, korrekte Umlaute/Satzzeichen
- alle Buchstaben vollständig innerhalb der Safe Area
- **NO OTHER READABLE TEXT**

### Nicht geplante Textszene
- **ZERO READABLE TEXT**
- keine Wörter/Buchstaben
- keine Labels
- keine UI-Texte
- keine Untertitel
- keine Poster-/Werbetexte
- keine Bildschirmtexte

### Remotion
- keine YouTube-Cover-, Keyword-, Label- oder Caption-Typografie
- sichtbarer Text wird nicht nachträglich erzeugt

## 6. Konkrete Szene vor generischer Infografik

Bevorzugt:
1. konkrete Alltagshandlung in glaubwürdiger Umgebung
2. einfache visuelle Metapher
3. Diagramm/Skala/Karte nur wenn klarer

Riesige schwebende Zahlen, Waagen, Skalen, Karten oder Symbole sind kein Premium-Default.

## 7. CAST- UND SZENENVIELFALT — HARD LOCK

Vor jeder Szene bewusst entscheiden:
- Cast
- Rolle
- Ort
- Handlung
- Kamera
- Farbe/Licht
- Premium-Figurenwirkung

Nicht als Default erlaubt:
- immer dieselbe Figur aus Bild 01
- immer derselbe Hoodie
- immer derselbe Schreibtisch
- immer derselbe Raum
- immer dieselbe neutrale Pose
- immer derselbe Medium Shot
- immer dieselbe graue Lichtstimmung

Eine bestimmte Figur bleibt nur dann dieselbe, wenn echte Kontinuität nötig ist.

## 8. Lokale Figurenkontinuität

Bei derselben Person innerhalb einer zusammenhängenden Sequenz konstant halten:
- Kopf-/Körperproportionen
- Gesichtsstil
- Arm-/Beindicke
- Hand-/Fußvereinfachung
- Kleidung/Farben
- relevante Accessoires

## 9. Generierung in 5er-Batches

1. Bild 01 allein erzeugen — inklusive exaktem Cover-Titel.
2. STOP.
3. Nutzer prüft Cover, Titel, Premium-Figur, Farbwelt und Stil.
4. Danach maximal 5 neue Bilder pro Batch.
5. Für Bild 02+ Master anhängen.
6. Prompt ausdrücklich: **do not copy text from the master reference.**
7. Nur wenn die aktuelle Szene eigenen geplanten Text besitzt, genau diesen Text rendern.
8. Sonst ZERO READABLE TEXT.
9. Nach jedem Batch interne Style-/Premium-/Color-/Continuity-/Inhalts-/Text-QA.
10. Nur fehlerhafte Bilder regenerieren.
11. Nach PASS automatisch weiter.

## 10. Referenzklausel ab Szene 02

`Use attached 01.png as STYLE, ANATOMY, PREMIUM QUALITY AND COLOR-STORY REFERENCE ONLY, NOT as a character, composition or text clone. Match the approved true-stickman anatomy system, proportions, very thin line-like limbs, simple no-finger hands, linework, premium character direction, color treatment, shading, environment detail level and overall 2D editorial quality. Preserve the project palette logic without copying the exact same color layout. Freely change character identity, clothing, cast size, role, pose, camera, environment, props and lighting to fit the current speech beat. Prefer a concrete real-life scene over an abstract teaching graphic when possible. Do not copy or recreate readable text from 01.png. Only render readable text when the CURRENT scene explicitly provides EXACT GERMAN TEXT; then render exactly that text and NO OTHER READABLE TEXT. Otherwise ZERO READABLE TEXT.`

## 11. Batch-QA

Nach jedem Batch prüfen:
- gleiche Stickman-Grundanatomie
- Premium-Figurenqualität bleibt erhalten
- Projektpalette wirkt zusammenhängend, nicht monoton
- keine graue/beige Einheitsästhetik
- keine unnötige Lehrgrafik-Serie
- keine realistische Nase/Ohren
- sehr dünne lineare Arme/Beine
- keine Fingeranatomie
- gleiche Linien-/Shading-Logik
- vergleichbare Weltqualität
- Cast passt zum Beat
- keine unnötige Figuren-/Raum-/Kamerawiederholung
- alle Hintergrundmenschen STRICT STICKMAN ONLY
- kein 3D-/Anime-/Fotorealismus-Drift
- geplante Textszenen exakt richtig
- nicht geplante Textszenen vollständig textfrei
- kein Textklonen aus Master

## 12. HARD FAIL

Ein Bild wird verworfen, wenn:
- Stickman-Anatomie sichtbar wechselt
- normale Cartoon-Menschen auftauchen
- Premium-Figurenwirkung deutlich abfällt
- grauer/beiger Monotonie-Look ohne Grund entsteht
- realistische Hände/Finger, Nasen oder Ohren auftauchen
- geplanter Text falsch, unlesbar oder abgeschnitten ist
- eine textfreie Szene lesbaren Text enthält
- englischer Text auftaucht
- Text aus der Master-Referenz ungewollt übernommen wird
- der Master unnötig als Charakter-/Raumkopie verwendet wird

## 13. Priorität

**STRICT STICKMAN ONLY + Premium Quality + Project Color Story + Master als Style-/Anatomie-Referenz + szenenspezifischer exakter Google-Flow-Text + beat-passende Cast-/Szenenwahl > Charakter-, Text-, Farb- oder Szenenklonen.**
