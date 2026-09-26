# PREMIUM VISUAL LOCK — PREMIUM FIGURES + COLOR STORY + EDITORIAL DEPTH

**STATUS: VERBINDLICH — HARD LOCK FÜR NEUE YOUTUBE-PROJEKTE**

Diese Regel verhindert sterile, graue, lehrbuchartige oder billig wirkende Bilder. Sie ergänzt `STICKMAN_DNA`, `YOUTUBE_STYLE_LOCK`, `COMPOSITION_VARIATION_LOCK` und `SOCIAL_SCENE_LOCK`.

## 1. Ziel

Jedes neue YouTube-Video soll wie eine **hochwertige moderne Editorial-Illustrationsserie** wirken — nicht wie Whiteboard-Unterricht, eine generische Präsentation oder eine Folge zufälliger KI-Symbole.

Policy:
- `premiumVisualPolicy: "PREMIUM_EDITORIAL_CINEMATIC_V1"`
- `colorStoryPolicy: "INTENTIONAL_COLOR_STORY_V1"`

## 2. Premium-Figuren — HARD LOCK

Die Anatomie bleibt STRICT STICKMAN ONLY. Premium bedeutet **nicht** realistischere Anatomie.

Premium entsteht durch:
- klare ausdrucksstarke Pose und Körpersprache
- lesbare, aber minimalistische Mimik
- bewusst gewählte Kleidung passend zu Rolle, Ort und Situation
- charakteristische Silhouette
- passende Accessoires/Requisiten, wenn sie die Rolle erklären
- glaubwürdige Interaktion mit Umgebung und anderen Figuren
- saubere Staffelung im Raum und klare visuelle Hierarchie

Vermeiden:
- identische generische Beige-/Grau-Outfits in vielen Szenen
- neutrale stehende Figur ohne Handlung
- immer gleiche Kopf-/Körperhaltung
- Figuren, die nur als Platzhalter vor einem Symbol stehen
- normal-cartoonige oder realistische Anatomie

Merksatz: **Simple anatomy, premium character direction.**

## 3. Farbdramaturgie — HARD LOCK

Jedes neue Video bekommt vor der Bildgenerierung eine bewusste `projectPalette`.

Mindestens:
- `primary`
- `secondary`
- `accent`
- `neutral`
- `avoid`

Die Palette muss zum Thema passen. Es gibt **keine universelle feste Kanalfarbe**, die jede Szene dominiert.

Verbindlich:
- Farben tragen Stimmung und Blickführung
- 1–2 wiederkehrende Akzentfarben schaffen Zusammenhalt
- reale Objektfarben bleiben glaubwürdig
- warme/kühle Kontraste dürfen gezielt genutzt werden
- wichtige Figur/Objekt darf farblich hervorgehoben werden
- Hintergrund darf ruhiger sein als Fokusmotiv
- Szenen dürfen unterschiedliche Lichtstimmungen haben, solange die Projektpalette erkennbar bleibt

HARD FAIL / Regeneration:
- grauer oder beiger Einheitswash über große Teile des Videos
- dauerhaft entsättigte sterile Büroästhetik ohne inhaltlichen Grund
- zufällige Bonbonfarben ohne Hierarchie
- jede Szene mit fast identischer Farbverteilung
- Akzentfarbe konkurriert mit dem Hauptmotiv statt es zu führen

## 4. Premium Editorial / Cinematic 2D

Jedes wichtige Bild plant bewusst:
- Vordergrund, Mittelgrund und Hintergrund, wenn räumlich sinnvoll
- Lichtquelle / Lichtstimmung
- klare Fokuszone
- Material-/Objektvielfalt in der Umgebung
- glaubwürdige Perspektive
- saubere organische Outlines
- dezentes Cel-Shading
- kontrollierte Tiefe statt flachem Whiteboard-Look

Nicht erwünscht:
- sterile leere Räume als Default
- generische Office-Szene als Universalantwort
- riesige schwebende Zahl/Symbol als Hauptmotiv, wenn ein echtes Alltagsbeispiel möglich ist
- endlose Reihen aus Karten, Waagen, Skalen, Pfeilen und Diagrammen
- Unterrichtsfolie statt Szene

## 5. Real-Life Scene Priority

Für Alltagspsychologie gilt:

**Konkretes echtes Alltagsbeispiel > visuelle Metapher > abstrakte Lehrgrafik.**

Geeignete Orte je nach Thema können sein:
- Laden / Online-Shopping-Situation
- Café / Restaurant
- Wohnung
- Straße / ÖPNV
- Schule / Uni
- Arbeitsplatz
- Bewerbung / Gespräch
- Gebrauchtkauf / Verhandlung
- Freizeit / Freundeskreis / Familie

Abstrakte Darstellung nur, wenn sie den Mechanismus klarer erklärt als eine echte Situation.

## 6. Bildserie statt Einheitslook

Premium bedeutet **konsistente Qualität, nicht identische Bilder**.

Innerhalb eines Videos aktiv variieren:
- Tageszeit / Lichttemperatur
- Innen/Außen
- Nähe/Weite der Kamera
- Solo/Duo/Gruppe
- Standard/Split/Contrast/Montage
- ruhige Szene vs. dynamische Handlung

Die Palette hält die Serie zusammen; sie darf die Variation nicht zerstören.

## 7. Flow-Prompt — Pflichtblöcke

Jeder neue moderne Flow-Prompt enthält:
- `PREMIUM VISUAL QUALITY — HARD LOCK`
- `PREMIUM CHARACTER DESIGN — HARD LOCK`
- `COLOR STORY — HARD LOCK`
- `REAL-LIFE SCENE PRIORITY — HARD LOCK`

Jeder Szenenprompt enthält mindestens:
- `COLOR DIRECTION:`
- `PREMIUM CHARACTER DIRECTION:`

## 8. QA

Vor Freigabe eines Bildes prüfen:
- wirkt die Figur bewusst inszeniert statt generisch?
- trägt die Farbe Fokus und Stimmung?
- wirkt das Bild hochwertig und räumlich?
- ist die Szene konkreter und interessanter als eine mögliche Lehrgrafik?
- wiederholt sie nicht unnötig Grau/Beige, Büro, Pose oder Symbolsprache?

Wenn mehrere Antworten `nein` sind: Bild neu planen/regenerieren statt im Schnitt kaschieren.

## 9. Priorität

Bei Konflikt:
- Anatomie bleibt `STICKMAN_DNA`
- Premium-Look und Farbe folgen dieser Datei
- Kompositionsmix folgt `COMPOSITION_VARIATION_LOCK`
- Text folgt `TEXT_OVERLAY_LOCK` + `FLOW_TEXT_STYLE_LOCK`

**Simple Stickman anatomy. Premium character direction. Intentional color. Rich believable world.**
