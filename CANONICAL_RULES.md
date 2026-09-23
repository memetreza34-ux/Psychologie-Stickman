# CANONICAL RULES — STICKMAN

## Kanal

Thema: **Alltagspsychologie & menschliches Verhalten**.

Verbindlich:
- `rules/STICKMAN_DNA.md`
- `rules/FORMAT_LOCK.md`
- `rules/YOUTUBE_THEMEN_SYSTEM.md`
- `rules/YOUTUBE_STYLE_LOCK.md`
- `rules/IMAGE_REFERENCE_LOCK.md`
- `rules/YOUTUBE_VISUAL_BEAT_RULES.md`
- `rules/PRODUCTION_FORMAT_RULES.md`

`rules/STICKMAN_DNA.md` ist die zentrale visuelle Source of Truth. Alle Style-, Prompt- und Projektregeln müssen mit dieser DNA kompatibel bleiben.

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

Zusätzlich gilt die DNA-Regel:
- genau ein primärer visueller Gedanke pro Bild
- ein klares Hauptmotiv
- höchstens 1–2 unterstützende Hinweise, wenn nötig
- keine überladenen Multi-Panel-/Infografik-Bilder, wenn eine einfache Szene reicht
- mehrere neue Gedanken werden auf mehrere Visual Beats verteilt

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

## Sichtbarer Text — DEUTSCH + MINIMAL

Der Kanal ist deutschsprachig. Die Prompts dürfen technisch Englisch sein; sichtbare Bildsprache bleibt trotzdem Deutsch.

- visuelle Erklärung vor Text
- wenn Text nicht nötig ist: kein sichtbarer Text
- wenn Text nötig ist: ausschließlich Deutsch
- möglichst nur ein kurzes Label / eine kurze Phrase pro Bild
- Richtwert: 1–4 sichtbare Wörter
- keine englischen Labels, Buttons, Poster, Screens oder UI-Texte
- keine Textwände oder langen Erklärsätze, wenn die Aussage visuell darstellbar ist
- bei Konflikt: englischen/zu langen Text übersetzen, verkürzen oder weglassen

## Master-Referenz + automatische 5er-Batches

- Bild 01 zuerst allein generieren
- danach STOP und auf Nutzerfreigabe warten
- Bild 01 nur bei vollständigem Style-/Stickman-PASS als Master freigeben
- Bild 01 bleibt Master-Referenz
- ab Bild 02 Master bei jeder Generierung anhängen
- danach höchstens 5 neue Bilder pro Batch
- nach jedem Batch **interne QA** gegen Master, untereinander und gegen den Visual Beat
- alle Personen im Vorder-, Mittel- und Hintergrund auf echte Stickman-Anatomie prüfen
- sichtbaren Text auf Deutsch + Minimalität prüfen
- Bildklarheit / Ein-Gedanke-pro-Bild prüfen
- nur fehlerhafte Bilder regenerieren
- nach vollständigem PASS **automatisch und ohne Nutzer-Rückfrage** mit dem nächsten Batch fortfahren
- nur bei einem nicht automatisch lösbaren schweren Fehler stoppen

**Es gibt regulär genau eine Nutzerfreigabe: nach Bild 01.**

## Einfache YouTube-Arbeitsfläche

Der Nutzer arbeitet bei YouTube regulär nur mit:
- `01-script/script.txt`
- `02-google-flow/google-flow-prompt.txt`
- `03-bilder/`
- `04-audio/`
- `05-export/`

Alle technischen Hilfsdateien gehören nach `99-intern/`.

Die eine `google-flow-prompt.txt` enthält alle Szenenprompts, die zentrale Stickman-DNA, Deutsch/Minimal-Text-Regeln und den Batch-Ablauf.

Für Google Flow gilt:
- Scene 01 allein
- Nutzerfreigabe für Scene 01
- anschließend automatische 5er-Batches
- interne QA nach jedem Batch
- keine Rückfrage nach normalen Batches

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

Bei visueller Identität:
**`rules/STICKMAN_DNA.md` gewinnt.**

Bei exakter projektspezifischer Darstellung innerhalb der DNA:
**freigegebene Master-Referenz gewinnt.**

Bei Text-Widerspruch:
**Deutsch + minimaler sichtbarer Text + visuelle Erklärung gewinnt.**

Beim Batch-Widerspruch:
**Nur Bild 01 braucht Nutzerfreigabe; danach automatische 5er-Batches mit interner QA.**
