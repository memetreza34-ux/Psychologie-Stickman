# BILD-METHODE V2 — bessere Bilder mit weniger Aufwand

Policy: `BILD_METHODE_V2` · Text-Policy für neue Videos: `finalTextPolicy: "CODE_TEXT_CARDS_V1"`

Die Bildwelt `PSYCHOLOGY_STICKMAN_WORLD_V1` bleibt (großer heller Kopf, kleine Augen, dünne Strichglieder).
Neu ist, **wie** Bilder geplant, gepromptet und mit Code kombiniert werden.

---

## 1. Was bisher schiefgeht

| Problem | Beleg | Folge |
|---|---|---|
| Master-Prompt zu lang | Türschwellen: 34 KB, voller Policy-IDs („VISUAL_SEQUENCE_HARDENING_V1“) | Bildmodell versteht Policy-IDs nicht; lange Prompts verwässern jede Einzelanweisung |
| Satz wird wörtlich bebildert | „Als hätte jemand den Gedanken gezogen“ → leerer Türrahmen | 24 von 72 Bildern sind leere Räume ohne Figur und ohne Aussage |
| Keine Referenzbilder | Figur wird jedes Mal neu aus Text beschrieben | Figur sieht in jedem Bild etwas anders aus |
| Text im KI-Bild | „TÜRSCHWELLEN-EFFEKT“ soll Google Flow schreiben | Schreibfehler, Pseudo-Text, Neu-Generieren |
| 72 Einzelmotive | jedes Bild ein neuer Aufbau | viel Arbeit, wenig Kontinuität |
| Remotion: harte Schnitte, lineare Zooms | `Phase3ImageReel.tsx` | wirkt wie Diashow |

---

## 2. Das neue Prinzip: drei Ebenen

```
EBENE A  KI-BILD (Google Flow)   = Bühne + Figur + Gefühl. IMMER textfrei.
EBENE B  CODE (Remotion)         = jeder deutsche Text, Schemata, Zahlen, Vergleiche (infoCards)
EBENE C  CODE (Remotion)         = Bewegung (smooth), Überblendungen (fade), Musik mit Ducking
```

Warum: Bildmodelle sind stark bei Stimmung und Figuren, schwach bei Schrift und exakten Diagrammen.
Code ist perfekt bei Schrift und Diagrammen. Jede Ebene macht, was sie gut kann.

---

## 3. Figuren-System (vor jedem Video, 10 Minuten)

1. **Stil-Referenz** einmalig für den Kanal erzeugen (`vorlagen/figuren/01-stil-referenz.txt`). Bestes Bild als `assets/images/stil-referenz.png` sichern und **bei jedem Bild als Referenz/Zutat mitgeben**.
2. **Figuren-Sheet** für die Hauptfigur des Videos (`vorlagen/figuren/02-figuren-sheet.txt`): 4 Ansichten + 6 Gesichtsausdrücke auf einem Blatt. Als `99-intern/figur-<name>.png` speichern.
3. Die Figur bekommt einen **Namen** (z. B. „Lena“) – im Skript und im Prompt. Das hilft dem Zuschauer und dem Modell.
4. Jede Szene mit Figur: Stil-Referenz + Figuren-Sheet als Referenzbilder anhängen (in Flow: „Zutaten“/Bild hinzufügen; Funktionsname kann je nach Flow-Version abweichen).
5. Nebenfiguren (Forscher, Freund) bekommen nur ein eigenes Sheet, wenn sie in ≥ 3 Bildern vorkommen.

---

## 4. Prompt-Formel für jedes Bild (50–80 Wörter, natürliche Sätze)

```
[STIL]      Hand-drawn 2D illustration in the style of the reference image: dark organic outlines, soft cel shading, subtle paper texture.
[FIGUR]     Lena, the stickman from the character sheet (large white round head, tiny black oval eyes, very thin dark stick limbs, teal sweater),
[HANDLUNG]  freezes in the middle of the kitchen with one hand on an open drawer, eyebrows raised, mouth a small "o".
[ORT/LICHT] Cool morning light from the window, plates on the counter.
[KAMERA]    Medium shot, eye level, Lena in the left third.
[PLATZ]     Keep the upper right area calm and empty (space for an on-screen card).
[ENDE]      No text, no letters, no numbers anywhere.
```

Regeln:
- **Eine Handlung, ein Gefühl pro Bild.** Gefühl über Körper zeigen (Schultern, Hände, Blick), nicht nur über das Gesicht.
- **Keine Policy-IDs, keine Großbuchstaben-Befehle, kein „HARD/FAIL“** im Prompt. Das Modell braucht Bildbeschreibung, keine Regeln.
- **Platz für Karten einplanen**, wenn auf diesem Bild eine `infoCard` erscheinen soll („keep the upper third empty“).
- Prüfregeln (Dateinamen, Batches, QA) gehören in eine **kurze Arbeitsanweisung am Anfang**, nicht in jeden Bildprompt.

---

## 5. Sequenzen statt Einzelbilder

Statt 72 komplett neuen Motiven: **ca. 25–30 Grundszenen, jede mit 2–3 Varianten** per Bearbeiten-Funktion:

```
BILD 07  Grundszene: Lena am Tisch, greift nach dem Klebeband – Lücke, wo es liegen sollte.
BILD 08  Bearbeite BILD 07: gleiche Szene, Kamera näher an Lenas Gesicht, sie runzelt die Stirn.
BILD 09  Bearbeite BILD 07: gleiche Szene von oben, nur Tisch, Karton, Schere und die leere Stelle.
```

Vorteile: gleiche Figur, gleiches Licht, wirkt wie ein Film mit Schnitt statt Diashow. Weniger Ausschuss.

---

## 6. Psychologie sichtbar machen: Metaphern statt leerer Räume

Wenn ein Satz etwas Unsichtbares beschreibt (Gedanke, Erinnerung, Gefühl), **eine Bild-Metapher wählen und durchs Video ziehen**:

| Unsichtbares | Bild-Metapher (im Stickman-Stil) |
|---|---|
| Absicht / Plan | leuchtender Faden von Lenas Hand zum Ziel; an der Tür reißt er |
| Erinnerung abrufen | Schubladen-Schrank im Kopf, eine klemmt |
| Gruppendruck | alle Figuren zeigen in eine Richtung, eine zögert |
| Angst / Sorge | Schatten der Figur ist größer als sie selbst |
| Verzerrte Wahrnehmung | Lupe, die einen kleinen Fleck riesig macht |
| Selbstbild | Spiegelbild trägt anderen Gesichtsausdruck |

Metapher im Figuren-Sheet-Schritt festlegen und im ganzen Video gleich zeichnen lassen.

**Leere Räume nur als kurze Orientierung** (max. 1 pro Abschnitt). Sonst: Figur, Objekt in Großaufnahme oder Metapher.

---

## 7. Text, Schemata, Zahlen → `infoCards` im Code

In `99-intern/scene-plan.json` (neue Felder, alle optional):

```json
{
  "finalTextPolicy": "CODE_TEXT_CARDS_V1",
  "motionStyle": "smooth",
  "transition": "fade",
  "transitionMs": 400,
  "music": {"src": "assets/music/ruhig-01.mp3", "volume": 0.18, "duckedVolume": 0.06},
  "infoCards": [
    {"scene": 5,  "type": "keyword", "text": "Türschwellen-Effekt", "sub": "Ortswechsel stört den Abruf"},
    {"scene": 18, "type": "steps",   "steps": ["Absicht", "Tür", "neues Ereignis", "Lücke"]},
    {"scene": 24, "type": "compare", "title": "Experiment", "left": "Gleicher Raum", "right": "Neuer Raum", "leftSub": "weniger Fehler", "rightSub": "mehr Fehler"},
    {"scene": 33, "type": "stat",    "value": "4", "label": "Experimente – kein klarer Effekt", "delayMs": 600}
  ]
}
```

| Typ | Wofür | Max. Wörter |
|---|---|---|
| `keyword` | Fachbegriff einführen | 4 (+ Untertitel) |
| `stat` | eine Zahl zählt hoch | 6 im Label |
| `compare` | Gruppe A vs. B, vorher/nachher | 8 |
| `steps` | Mechanismus als Kette (2–4 Schritte) | 12 |

Richtwert: **eine Karte pro Kernaussage, Zahl oder Vergleich** – bei 6–7 Minuten meist 15–25 Karten, vor allem bei Begriff, Studie, Wendepunkt und Tipps. Zwischen zwei mittigen Karten mindestens ein Bild ohne Karte.
Musik: lizenzfreie Datei nach `public/assets/music/` legen (Pfad relativ zu `public/`).

---

## 8. Beispiel: Türschwellen BILD 01–04 neu geschrieben

**Alt BILD 04:** „Low-angle physical wooden doorframe joining two ordinary rooms; sharp trim in foreground …“ → leerer Türrahmen, keine Aussage.

**Neu BILD 01** (Hook „Du stehst in der Küche. Und weißt nicht mehr, warum.“)
> Hand-drawn 2D illustration in the style of the reference image. Lena, the stickman from the character sheet, stands in the middle of a bright kitchen, completely still, one thin arm half raised as if she forgot what she was reaching for. Her big white head is tilted, tiny eyes looking at nothing. Cool morning light, a kettle on the counter. Medium-wide shot, Lena slightly left of center. No text, no letters, no numbers.

**Neu BILD 02** („Zehn Sekunden vorher war es noch glasklar. Klebeband. Für den Karton.“)
> Same style. Lena sits at a warm-lit oak living-room table next to a torn brown parcel and black scissors. Above her hand floats a small glowing golden thread leading towards the doorway — her intention. She looks determined. Close-medium shot, warm afternoon light. Keep the upper right third calm. No text.

**Neu BILD 03** („Dazwischen: eine Tür.“)
> Same style. Over-the-shoulder view from behind Lena as she steps through a wooden doorway into the cooler kitchen. The golden thread from her hand stretches back into the warm living room and becomes thin and frayed exactly at the door frame. Strong warm/cool light contrast between the two rooms. No text.

**Neu BILD 04** („Forscher haben genau das im Labor nachgebaut …“)
> Same style. A researcher stickman with glasses and a lab coat watches a simple computer screen showing a virtual room with a door, while a participant stickman sits in front of it holding a mouse. Calm lab lighting, plants, cables. Medium shot. Leave the top area empty. No text, the screen shows only shapes.

Der goldene Faden ist die durchgehende Metapher – er kehrt beim Tipp am Ende zurück („Sag laut, was du holst“ → Faden wird dick und hält).

---

## 9. Arbeitsablauf in Google Flow (kurz)

1. Stil-Referenz + Figuren-Sheet laden (einmal pro Video).
2. 3 Cover-Kandidaten → du wählst (einzige Frage). Gewinner wird `03-bilder/00-cover.png`, die anderen zwei werden sofort gelöscht.
3. Danach ohne Rückfrage durcharbeiten bis alle Bilder fertig sind: Grundszenen, dann Varianten über „Bearbeiten“. Nie nach einer 5er-Gruppe pausieren.
4. Jedes Bild kurz prüfen: Figur gleich? Text im Bild? Gefühl erkennbar? Sonst nur dieses Bild neu – ohne zu fragen.
5. Alles in einen Ordner: `00-cover.png` und `01.png … NN.png` zusammen in `03-bilder/`.
