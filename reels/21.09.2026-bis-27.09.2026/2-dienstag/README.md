# 2-Dienstag — Warum denkst du, alle schauen dich an?

Datum: **22.09.2026**

Status: Reel vorbereitet — Skript, Quellen, Claim-Check, 24 Visual Beats und Bildprompts vorhanden. Audio/Bilder/Render noch ausstehend.

## Thema

**Spotlight-Effekt:** Warum wir oft überschätzen, wie stark andere unser Aussehen und Verhalten bemerken.

## Verbindliches Ausgabeformat

- **9:16**
- **1080×1920**
- **30 fps**
- vertikal / Portrait
- Render-Komposition: `Phase3Reel`
- kein 16:9-Reel

## Audio

- finales Voice-over exakt 1,10×
- führende Stille entfernen
- Pausen ab ungefähr 500 ms deutlich kürzen
- Ziel-Restpause ungefähr 120 ms vor der 1,10×-Beschleunigung
- Wörter niemals abschneiden
- Timings erst aus final verarbeitetem Audio

## Umfang

- ca. 60–90 Sekunden
- 24 Visual Beats / 24 geplante Bilder
- Universal Editorial Stickman World v1.2
- jede sichtbare menschliche Figur bleibt Stickman
- Bild 01 wird zuerst allein in 9:16 erzeugt und als Master-Referenz freigegeben
- Bild 02–24 werden ausschließlich mit Bild 01 als visueller Referenz erzeugt

## 5er-Batch-Ablauf

1. Bild 01 allein in 9:16 generieren und prüfen.
2. Bild 01 als `00-master-reference.png` freigeben.
3. Batch 1: Bild 02–06 → QA.
4. Batch 2: Bild 07–11 → QA.
5. Batch 3: Bild 12–16 → QA.
6. Batch 4: Bild 17–21 → QA.
7. Batch 5: Bild 22–24 → QA.
8. Kein nächster Batch, solange der vorherige nicht vollständig PASS ist.

## Bildregeln

- jedes Bild individuell auf den gesprochenen Beat anpassen
- jedes Bild nativ für die vertikale 9:16-Fläche komponieren
- Master-Referenz hält Stil, Figuren-DNA, Linien, Farbverhalten und Shading konstant
- Pose, Kamera, Perspektive, Umgebung, Requisiten und Licht pro Beat sinnvoll ändern
- keine Füllbilder
- sichtbarer Text nur wenn nötig und dann ausschließlich Deutsch
- wenn Text nicht nötig ist, keinen Text erzwingen
- kein 16:9-Bild nur nachträglich auf 9:16 croppen

## Struktur

- `01-script-audio/` — Skript und Audio-Standard
- `02-bilder/` — Bildprompts, Style, Continuity, Referenz und QA
- `03-export/` — Upload-Paket
- `04-projektdateien/` — Phase-1-Plan, Quellen, Claim-Check, Schnitt, Timings und Renderdaten
