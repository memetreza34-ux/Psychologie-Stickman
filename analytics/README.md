# Kopfarium Analytics & Verbesserungszyklus — Prioritaet 1

Verbindliche Regel: [`CONTINUOUS_IMPROVEMENT_P1_V1`](../rules/GROWTH_LEARNING_LOOP.md).

## Ziel

Mit jedem veroeffentlichten Video und jedem Produktionsdurchlauf lernen: echte Zuschauerreaktionen messen, Schwachstellen erkennen, eine konkrete Massnahme im naechsten Video testen und spaeter nachpruefen. Keine pauschalen Wachstumsgarantien.

## Welche Datei ist wofuer da?

| Datei | Zweck |
| --- | --- |
| `videos.csv` | Bestehendes einfaches Video-Verzeichnis (historische Spalten beibehalten) |
| `performance_snapshots.csv` | Messzeitpunkte nach ca. 48h / 7d / 28d, eine Zeile pro Video UND Messzeitpunkt |
| `experiments.csv` | Beobachtung, Hypothese, getestete Verbesserung, Messziel, Status und Ergebnis |
| `channel-learnings.md` | Dauerhafte, belegte Erkenntnisse und offene Fragen |
| `templates/video-review.md` | Vorlage fuer den ausfuehrlichen Vor-/Nach-Review je Video |
| `youtube/00-vorlage/thema-vorlage/99-intern/learning-review.md` | Schon vorbereitete neue Video-Vorlage |

## Der praktische Ablauf

**Vor der Themenwahl:** `channel-learnings.md` und `experiments.csv` lesen, verfuegbare YouTube-Studio-Zahlen mit vergleichbaren vorherigen Videos heranziehen. In `99-intern/learning-review.md` *mindestens eine* begruendete Verbesserungshypothese samt geplanter Aenderung und erwarteter Messung eintragen.

**Nach Export:** Titel, Thumbnail-Versprechen, Hook, Story, Tempo, Audio, visuelle Qualitaet und Upload-Paket pruefen; Produktionsprobleme und vermeidbare Handarbeit im Review festhalten.

**Nach Upload:** Video in YouTube Studio bei 48h / 7d / 28d ansehen; jede Messung als neue Zeile in `performance_snapshots.csv` erfassen. `measured_at` als ISO-Datum mit Zeitangabe, `age_hours` als Alter des Videos zum Messzeitpunkt. Prozentwerte als reine Zahlen (z. B. 42.5 ohne `%`), Sekundenwerte als Zahlen; fehlende Werte bleiben leer. Pro Zeitpunkt CTR, Impressionen, Views, Bindung/30s, Watchtime und Abos soweit vorhanden uebernehmen. Bei manuell geaendertem Titel/Thumbnail eine neue Variantenkennung setzen.

**Nach Auswertung:** Fakten von Hypothesen trennen; eine kleine, nachvollziehbare Verbesserung in `experiments.csv` anlegen. Zielmetrik und vergleichbares Messfenster festlegen. Im Folgevideo gezielt testen. Nur datenbasierte Erkenntnisse in `channel-learnings.md` als bestaetigt dokumentieren, unsichere Befunde als `INCONCLUSIVE` kennzeichnen.

## Diagnosehilfe

- Genuegend Impressionen, schwache CTR: erst Titel/Thumbnail/Themenversprechen im Kontext der Traffic-Quelle untersuchen.
- Hohe Klickrate, schlechter Einstieg: Versprechen vs. erste 30 Sekunden pruefen.
- Zuschauerabfall im Mittelteil: Story-Fortschritt, Pacing, Wiederholungen, konkrete Bildfolge pruefen.
- Gute Bindung, wenige Impressionen: keine vorschnelle Aussage ueber Thumbnail-Qualitaet.
- Viele Views, kaum neue Abos: Kanalnutzen, Themenfolge und passende Anschlussvideos pruefen.

Vergleiche vorzugsweise gleiches Format, aehnliche Laenge, gleiche Messdauer seit Upload und aehnliche Traffic-Quellen. Einzelne kleine Stichproben rechtfertigen keine starken Kausalbehauptungen.

## Wenn noch keine YouTube-Analytics vorliegen

- Keine Zahlen erfinden oder Beispielwerte in die echten CSV-Dateien schreiben.
- Im Videoreview `NO_DATA` dokumentieren und den naechsten Pruefzeitpunkt notieren.
- Die naechste Produktion darf weitergehen, wenn die bisherigen qualitativen Lernpunkte dokumentiert wurden.
- Ein in YouTube Studio sichtbares Ergebnis ist noch keine nachgewiesene Ursache. Deshalb kleine Hypothesen testen statt gleichzeitig alles zu aendern.

`EXPORT_READY` ist nicht gleich `LEARNING_REVIEW_COMPLETE`. Medien/Exporte niemals im Zuge der Analytics-Auswertung ungefragt ueberschreiben.
