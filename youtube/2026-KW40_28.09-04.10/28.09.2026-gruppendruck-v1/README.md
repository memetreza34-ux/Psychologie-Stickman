# Gruppendruck / Konformität — Flow-Test v1

Kurzer YouTube-Test für die neue Stickman-Bildwelt.

## Stand

- Skript: fertig
- 9 Visual Beats: fertig
- Google Flow: **eine** Master-Datei mit allen 9 Szenen
- Output-Modus: einzelne finale 16:9-Bilder, kein Storyboard/Kontaktbogen
- Quellen/Claim-Check: fertig
- Bilder: noch zu generieren
- Audio: noch offen
- Final-Render: noch offen

## Flow-Datei

`02-google-flow/google-flow-prompt.txt`

Diese eine Datei enthält:
- komplette Bildweltregeln
- strikte mature Stickman-Anatomie
- Ausgabe-/Batchregeln
- Textregeln
- alle Szenen 01–09

Es gibt **keine zweite Flow-Prompt-Datei**.

## Flow-Ablauf

1. Die komplette `google-flow-prompt.txt` einmal in Google Flow geben.
2. Flow muss zunächst **nur Scene 01** bearbeiten.
3. Scene 01 wird als **3 getrennte 16:9-Cover-Kandidaten** erzeugt — niemals als 3er-Panel/Storyboard.
4. Einen Gewinner auswählen und als `03-bilder/01.png` übernehmen.
5. Danach aus derselben Master-Datei:
   - Batch 1: Scene 02–04 → 3 getrennte Bilder
   - Batch 2: Scene 05–07 → 3 getrennte Bilder
   - Batch 3: Scene 08–09 → 2 getrennte Bilder
6. Nur fehlerhafte Einzelbilder regenerieren.
7. Flow soll **kein Video** aus den Szenen bauen. Das Video entsteht später in unserer Pipeline.

## Bildwelt-QA

Ablehnen, wenn:
- mehrere Szenen in einem Storyboard/Kontaktbogen landen
- Figuren cute/chibi/mascot-artig aussehen
- Figuren normale Cartoon-Körper, breite Schultern oder dicke Gliedmaßen bekommen
- normale Szenen auf leerem cremefarbenem Hintergrund landen
- Umgebungen steril/generisch wirken
- Gruppe und Einzelperson dieselbe visuelle Gewichtung haben, obwohl sozialer Druck gezeigt werden soll

Ziel: **mature cinematic 2D psychology documentary — simple strict Stickmen inside a rich believable world.**
