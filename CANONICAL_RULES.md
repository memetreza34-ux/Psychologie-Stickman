# CANONICAL RULES — STICKMAN

## Kanal

Thema: **Alltagspsychologie & menschliches Verhalten**.

Verbindlich:
- `rules/FORMAT_LOCK.md`
- `rules/YOUTUBE_THEMEN_SYSTEM.md`
- `rules/YOUTUBE_STYLE_LOCK.md`
- `rules/IMAGE_REFERENCE_LOCK.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- `rules/PRODUCTION_FORMAT_RULES.md`

Kernversprechen: Warum Menschen denken, fühlen und handeln, wie sie es tun — verständlich, evidenzorientiert und visuell erklärt.

Keine medizinischen Diagnosen, Therapieanweisungen oder pseudowissenschaftlichen Versprechen.

## Getrennte Formate

### YouTube
Pfad: `youtube/`

- reguläre Longform-/Testvideo-Projekte
- Themen liegen direkt als eigene Projektordner unter `youtube/`
- kein zusätzlicher `longform/`-Zwischenordner
- Videolänge wird pro Projekt festgelegt; Testvideos dürfen bewusst ca. 4–6 Minuten lang sein
- **FORMAT HARD LOCK: 16:9 / 1920×1080 / 30 fps**
- technische Render-Komposition: `Phase3YouTube`
- einfache sichtbare Projektstruktur:
  - `01-script/`
  - `02-google-flow/`
  - `03-bilder/`
  - `04-audio/`
  - `05-export/`
  - `99-intern/`

### Reels
Pfad: `reels/`

- ausschließlich Reels/Shorts
- Wochenordner nach Muster `TT.MM.JJJJ-bis-TT.MM.JJJJ`
- darin `1-montag` bis `7-sonntag`
- **FORMAT HARD LOCK: 9:16 / 1080×1920 / 30 fps**
- technische Render-Komposition: `Phase3Reel`

YouTube und Reels dürfen strukturell oder beim Ausgabeformat nicht vermischt werden.

## Produktionsfolge

THEMA + QUELLEN + CLAIM-CHECK → finales Skript → Phase 1 Visual Beats → Phase 2 Bilder → Phase 3 Timings/Render → Final-QA.

## Visual-Beat-Prinzip

Ein wichtiger neuer visueller Gedanke bekommt grundsätzlich ein eigenes Bild. Keine langen Sammelbilder für mehrere Aussagen. Qualität vor bloßer Bildanzahl.

Jedes Bild wird individuell auf genau seinen gesprochenen Beat angepasst. Master-Referenzen halten nur die visuelle DNA konstant; sie dürfen nicht dazu führen, dass Komposition, Pose oder Umgebung unnötig wiederholt werden.

Das Bildformat wird durch den Projektpfad bestimmt:
- `reels/` → vertikale 9:16-Komposition
- `youtube/` → horizontale 16:9-Komposition

## Bildwelt

**Universal Editorial Stickman World v1.3 — STRICT STICKMAN ONLY**

Jede sichtbare menschliche oder menschenähnliche Figur bleibt ein echter Stickman. Das gilt auch für winzige Hintergrundpersonen, Menschenmengen, Forscher, historische Figuren, Passanten sowie Personen auf Screens, Fotos, Postern, Werbung, Spiegelungen und Illustrationen innerhalb der Szene.

Verbindliche Anatomie:
- einfacher runder/ovaler Kopf
- minimale Gesichtszüge
- keine realistische Nase/Ohren/Gesichtsmodellierung
- kleiner vereinfachter Torso
- sehr dünne lineare Arme und Beine ohne fleischige menschliche Volumen
- Hände nur als einfache Punkte/Mitten/Nubs, keine Fingeranatomie
- stark vereinfachte Füße/Schuhe
- Kleidung darf Rolle/Epoche zeigen, aber keine normale menschliche Anatomie erzeugen

Nicht erlaubt:
- normale Cartoon-Menschen
- semi-realistische oder realistische Menschen
- gemischte Human-/Stickman-Stile
- Photorealismus
- 3D/CGI
- Anime/Chibi

Die Umgebung darf dagegen glaubwürdig, farbig, detailreich und realitätsnah illustriert sein.

Sichtbarer Text im finalen Bild ist Deutsch, wenn Text inhaltlich nötig ist. Wenn Text nicht nötig ist, keinen Text erzwingen.

## Master-Referenz + 5er-Batches

- Bild 01 zuerst allein generieren und visuell freigeben
- Bild 01 bleibt Master-Referenz
- ab Bild 02 Master bei jeder Generierung anhängen
- danach höchstens 5 neue Bilder pro Batch
- nach jedem Batch STOP + QA
- alle Personen im Vorder-, Mittel- und Hintergrund auf echte Stickman-Anatomie prüfen
- nur fehlerhafte Bilder regenerieren
- erst nach vollständigem PASS weiter

## Einfache YouTube-Arbeitsfläche

Der Nutzer arbeitet bei YouTube regulär nur mit:
- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/`
- `05-export/`

Alle technischen Hilfsdateien gehören nach `99-intern/`.

Die eine `google-flow-prompt.txt` enthält alle Szenenprompts, Style-/Stickman-Regeln und den Batch-Ablauf.

## Audio

- finales Voice-over für Reels und YouTube: **exakt 1,10×**
- Tonhöhe erhalten
- führende Stille entfernen
- kurze natürliche Pausen dürfen bleiben
- Pausen ab ungefähr 500 ms deutlich straffen
- Ziel-Restpause nach Kürzung ungefähr 120 ms vor der 1,10×-Beschleunigung
- Wörter niemals anschneiden
- Timings erst aus final verarbeitetem Audio

## Priorität

Bei Format-Widerspruch:
**`rules/FORMAT_LOCK.md` gewinnt.**

Bei Figuren-/Stil-Widerspruch:
**STRICT STICKMAN ONLY + freigegebene Master-Referenz gewinnt.**