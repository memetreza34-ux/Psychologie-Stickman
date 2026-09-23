# STICKMAN DNA — CHANNEL VISUAL SOURCE OF TRUTH

**STATUS: HARD LOCK — v1.1**

Diese Datei ist die zentrale visuelle Source of Truth für alle Agenten, Prompts, Templates, Reels und YouTube-Videos.

Leitidee:

**Simple Stickmen. Rich World. One clear idea per image. German visual language.**

## 1. Figuren-DNA — STRICT STICKMAN ONLY

Jede sichtbare menschliche oder menschenähnliche Figur ist ein echter Stickman.

Verbindlich:
- einfacher runder oder ovaler flacher Kopf
- minimale Punkt-/Strichaugen
- einfacher kleiner Mund
- keine realistische Nase
- keine realistischen Ohren
- kein realistischer Hals
- kleiner stark vereinfachter Torso
- sehr dünne lineare Arme und Beine mit nahezu gleichbleibender Dicke
- keine fleischigen Oberarme, Unterarme, Oberschenkel oder Waden
- Hände nur als kleine Nubs, Punkte, Kreise oder simple Mitten
- keine Fingeranatomie
- Füße/Schuhe stark vereinfacht
- Kleidung darf Rolle, Beruf, Epoche und Persönlichkeit zeigen, darf aber niemals normale menschliche Anatomie erzeugen

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
- keine 3–5 konkurrierenden Teilbilder, wenn eine einzelne Szene genügt
- keine unnötigen Tabellen, Panels, Karten, Meter, Diagramme oder Textblöcke
- Zuschauer soll die Kernidee in ungefähr 1 Sekunde erfassen können
- mehrere neue Gedanken werden auf mehrere Visual Beats/Bilder verteilt
- Master sperrt Stil, nicht Kamera, Pose, Ort oder Komposition

Priorität:
**Klarheit > Informationsmenge pro Bild.**

## 4. Konkrete Szene vor abstrakter Infografik

Standardmäßig soll ein Beat als konkrete Stickman-Handlung in einer glaubwürdigen Umgebung visualisiert werden.

Bevorzugte Reihenfolge:
1. konkrete Handlung mit Stickman + passendem Ort/Requisit
2. einfache visuelle Metapher
3. Diagramm/Skala/Karte nur wenn Handlung oder Metapher die Aussage nicht sauber erklären kann

Vermeide eine Serie aus immer denselben `claim cards`, `truth meters`, `processing paths`, Waagen oder abstrakten UI-Flächen. Wiederkehrende Symbole sind erlaubt, aber sie dürfen nicht die visuelle Hauptsprache des ganzen Videos ersetzen.

Jede Szene soll bewusst variieren können:
- Kameradistanz
- Perspektive
- Pose
- Handlung
- Ort
- Requisiten
- Licht
- Bildtiefe

## 5. Sprache im Bild — FLOW QUELLBILDER STANDARDMÄSSIG TEXTFREI

Der Kanal ist deutschsprachig. Für Google-Flow-Quellbilder gilt trotzdem als Standard:

**ZERO READABLE TEXT IN GENERATED SOURCE IMAGES.**

Das bedeutet:
- keine lesbaren Buchstaben
- keine Wörter
- keine Zahlen, wenn sie nicht zwingend visuell notwendig sind
- keine UI-Texte
- keine Labels
- keine Untertitel
- keine Postertexte
- keine Bildschirmtexte
- keine Marken-/Logo-Texte
- keine zufälligen englischen Promptwörter im Bild

Warum: Bildmodelle übernehmen englische Promptbegriffe unzuverlässig als sichtbaren Text. Deutsche Labels werden deshalb standardmäßig erst kontrolliert in Remotion hinzugefügt.

Wenn ein Projekt ausnahmsweise Text direkt im generierten Bild zwingend benötigt, muss die Szene das ausdrücklich freigeben und den **exakten deutschen Text** nennen. Dann gilt:
- nur Deutsch
- möglichst 1–4 Wörter
- exakt vorgegebener Wortlaut
- kein weiterer lesbarer Text im Bild

Bei Konflikt gewinnt:
**textfreies Flow-Quellbild + späterer deutscher Remotion-Overlay.**

## 6. Hauptfigur-DNA

Wenn eine wiederkehrende Hauptfigur genutzt wird:
- Kopfgröße/-form konstant
- Gesichtsstil konstant
- Torso-Proportion konstant
- Arm-/Beindicke konstant
- Hände/Füße konstant vereinfacht
- Kleidung und Kernfarben konstant, solange kein bewusster Wechsel nötig ist
- Accessoires/Requisiten konsistent

Die konkrete Ausprägung wird durch Bild 01 als Master-Referenz festgelegt.

## 7. Master-Referenz-DNA

Für jedes Projekt:
1. Bild 01 allein generieren.
2. STOP und Nutzerfreigabe abwarten.
3. Nur freigeben, wenn Stickman-DNA, Welt-DNA, Textregel und Bildklarheit vollständig passen.
4. Bild 01 als Master speichern.
5. Ab Bild 02 immer Bild 01 als Referenz anhängen.
6. Master sperrt Anatomie, Linien, Farben, Shading und Gesamtästhetik.
7. Master sperrt NICHT Pose, Kamera, Ort, Licht oder Komposition.

Ein späteres Bild ersetzt den Master nicht automatisch.

## 8. Batch-DNA

Nach der einmaligen Freigabe von Bild 01:
- maximal 5 neue Bilder pro Batch
- nach jedem Batch interne QA automatisch durchführen
- gegen Master, untereinander und gegen den jeweiligen Visual Beat prüfen
- nur fehlerhafte Bilder regenerieren
- bestandene Bilder behalten
- nach vollständigem PASS automatisch den nächsten Batch starten
- keine Nutzer-Rückfrage nach normalen Batches
- nur bei einem schweren, nicht automatisch lösbaren Problem stoppen

**Nutzerfreigabe regulär nur einmal: nach Bild 01.**

## 9. Format-DNA

Format wird vom Projektpfad bestimmt:
- `reels/` → 9:16 / 1080×1920 / 30 fps
- `youtube/` → 16:9 / 1920×1080 / 30 fps

Nicht nachträglich aus dem falschen Format croppen, sondern direkt nativ komponieren.

## 10. Kompakter DNA-Promptblock

Dieser Block darf in Google-Flow-Prompts eingebettet werden:

`STRICT CHANNEL DNA: simple editorial 2D stickman characters inside rich detailed believable environments. EVERY visible human or human-like figure, including background people, screens, posters, photos, reflections and crowds, must use the same true stickman anatomy: simple round/oval flat head, tiny minimal eyes and mouth, no realistic nose or ears, small simplified torso, very thin line-like arms and legs, simple no-finger hands and simplified feet. No conventional cartoon humans, no semi-realistic people, no mixed human styles, no 3D/Pixar/anime/chibi. Environment may be detailed, modern, grounded and cinematic in 2D. ONE clear visual idea per image, one dominant subject, at most 1–2 supporting cues. Prefer a concrete stickman action in a believable setting over an abstract infographic. SOURCE IMAGE TEXT POLICY: render zero readable text, zero letters, zero labels, zero UI words and zero captions unless the scene explicitly supplies an exact German exception. German labels are normally added later in Remotion.`

## 11. Priorität

Bei Konflikten gilt:
- Format → `rules/FORMAT_LOCK.md`
- visuelle Identität → **diese DNA-Datei**
- exakte projektspezifische Ausprägung → freigegebene Master-Referenz
- Szeneninhalt → jeweiliger Visual Beat / Szenenprompt
- sichtbarer Text → textfreies Flow-Quellbild; deutsche Overlays kontrolliert in Remotion

Merksatz:

**DNA bestimmt WIE. Master zeigt WIE genau. Visual Beat bestimmt WAS. Remotion kontrolliert sichtbaren Text.**
