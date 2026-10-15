# CONTENT-FIRST VISUAL DIRECTION — Pflicht fuer neue Kopfarium-Videos

**Policy ID: `CONTENT_FIRST_VISUAL_QA_V2`** · Status: VERBINDLICH ab dem naechsten neuen Videoprojekt.
Die freigegebene `PSYCHOLOGY_STICKMAN_WORLD_V1` bleibt UNVERAENDERT. Diese Regel betrifft die **Bildentscheidung pro Szene**, nicht eine neue Aesthetik.

## Erkenntnis aus der Rueckschau zum Tuer-/Raumwechsel-Video

Das gesprochene Skript war tragfaehig; in den kontrollierten Video-Stichproben dominierten jedoch wiederholt aehnliche Ansichten von Tuer, Kueche, Karton und Figur. Es fehlten an Stellen mit *Abstraktion und Wissenschaft* staerkere Erklaerbilder. Ursache auf Planungsebene: Ein anderer Szenenname oder Kamerawinkel wurde teilweise bereits als neue Bildidee gewertet, obwohl Zuschauer fast dieselbe Information erhielten.

Diese qualitativen Beobachtungen sind **keine YouTube-Studio-Retention-Daten** und beweisen noch keinen Einfluss auf Views/Abos.

## 1. Sinn zuerst, Bildtyp danach — HARD

Vor jedem Bild den Sprecherabschnitt wortgenau lesen:
1. **Was NEUES soll der Zuschauer nach diesem Satz verstehen?** (nicht den Satz kopieren)
2. Geht es um eine Handlung / eine Sache / eine Ursache / einen Gegensatz / eine Studie / eine Botschaft?
3. Waehle die visuelle Form, die genau diesen Erkenntnisgewinn **am kuerzesten erklaert**.
4. Pruefe eine **echte Alternative** und halte fest, warum sie hier schwaecher waere.
5. Pruefe, ob die Szene anders aussieht **und** anders informiert als die vorherigen und die folgenden.

Moegliche primaere Darstellungen: `CHARACTER_SCENE`, `OBJECT_FOCUS`, `ENVIRONMENT_SCENE`, `SCHEMA_EXPLAINER`, `COMPARE_VISUAL`, `TEXT_ILLUSTRATION`.

**Kein festes Prozentverhaeltnis.** Auch 70 % Charaktere koennen bei einer Erzaehlung sinnvoll sein; in einem Mechanismus-Video koennen Schemata ueberwiegen. Figuren nur, wenn Koerpersprache oder Interaktion einen Erklaerzweck haben. Bilder ohne Figuren gehoeren weiterhin zur **gleichen** hochwertigen 2D-Zeichenwelt.

## 2. Mechanismen wirklich erKLAEREN — HARD

Bei Aussagen ueber Schritte, Ursachen, Gedachtnis-/Entscheidungsmechanismen, Versuchsanordnungen oder Forschungsbefunde pruefen:
- **Ablaufbild / einfaches Schema** mit wenigen grossen Elementen, klaren Pfeilen/Verbindungen, maximal zwei gegeneinandergestellten Zustaenden
- **Vorher/Nachher**, **Versuch vs. Kontrolle**, **Ursache -> Wirkung**, **3 Schritte auf DREI aufeinanderfolgenden Bildern** (nicht drei Mini-Panels auf einer einzigen Bildkarte)
- **beschriftete Illustration**, wenn die Information ohne kurze Worte nicht erkennbar ist
- **Diagramm** nur wenn Daten wirklich vorliegen; keine ausgedachten Prozentwerte, Balken, Achsen oder experimentellen Resultate

Text ist weiterhin **nur bewusst geplantes und exakt deutsches** Flow-Textmaterial: kurz, gross, gut lesbar; kein unerwarteter Text. Fuer beschriftete Schemata Texte im Plan `flowText` vorsehen und im Bildprompt EXAKT angeben. Etiketten gehoeren zur Illustration, nicht auf wahllose neutrale Schulfolien.

Beispiel Tuer-Effekt:
- Story: Person tritt mit offenem Karton im Ruecken in andere Umgebung -> konkrete Szene
- Mechanismus: `Ereignis A -> Kontextwechsel -> Ereignis B` als visuell klare, sparsam beschriftete Illustration
- Studie: `gleiche Strecke, anderer Raum` als 2-Zustaende-Versuchsanordnung
- Eingeschraenkter Befund: `einfache Bedingung` vs. `zusaetzliche Gedaechtnislast` als klares Vergleichsbild; **keine erfundenen Messwerte**
- Schluss: Rueckkehr zum Karton, aber mit veraenderter Handlung/Information statt erneut derselben Tuerpose

## 3. Bildfolgen statt Stichwort-Symbole — HARD

**Gleiches Thema oder Requisit ≠ neue Information.**
Eine Sequenz von „Figur an Tuer, Figur vor Tuer, Figur zeigt auf Tuer“ ist auch mit leicht anderen Bildprompts noch dieselbe Bildidee.

Vor Flow jeden Abschnitt als Folge von 6–8 Bildern lesen:
- Gleicher Hauptgegenstand + gleicher Schauplatz + gleiche Einstellung dreimal? **Neu konzipieren**, nicht nur umformulieren.
- Vier von sechs Bildern derselbe Hauptgegenstand mit gleicher Funktion und ohne neuen Erkenntnisgewinn? **Ein oder mehrere Bilder ersetzen** durch Mechanismus, Beweis, Detail, Gegenbeispiel oder klaren Vergleich.
- Charakter muss nur zeigen oder auf einen Gegenstand starren? **Objekt / Diagramm / beschriftete Illustration pruefen**.
- Bei einem **berechtigten erzahlerischen Callback** ist Wiederholung moeglich; der konkrete Fortschritt (anderer Zustand, sichtbare Konsequenz, andere Fragestellung) MUSS erklaert werden.
- Auch Schemata duerfen keine monotone Abfolge identischer Hintergruende, Boxen und Pfeile werden.

Aendere nie nur willkuerlich Farbe oder Kamera, um eine QA zu umgehen. Der Inhalt muss ebenfalls fortschreiten.

## 4. Felder fuer jedes kuenftige Phase-1-Bild

Neben den bisherigen `viewerTakeaway`, `observableEvidence`, `representationReason`, `motifKey` und `visualChangeReason`:

- `visualFunction`: `HOOK | STORY_ACTION | MECHANISM | RESEARCH | COMPARISON | EVIDENCE | TAKEAWAY | CALLBACK | TRANSITION`
- `focalSubjectKey`: normalisiertes Hauptmotiv **nach Bedeutung**, nicht abgeleitet vom ersten Wort des Prompts (z. B. `doorway`, `packing_box`, `event_boundary_model`)
- `settingKey`: bestaendiger Schauplatz oder `illustrated_schema`
- `cameraScale`: `wide | medium | close | macro | topdown | diagram | mixed`
- `informationGain`: **konkreter neuer Sachverhalt** in einem eigenen Satz, kein blosses Skript-Zitat
- `alternativeVisualType`: plausible ANDERE Darstellungsart, die ernsthaft ueberlegt wurde
- `alternativeRejectionReason`: warum die gewaehIte Darstellungsart genauer/einfacher ist
- `sequenceOverrideReason`: nur wenn derselbe visuelle Schwerpunkt nachweislich aus Story-/Versuchsgruenden oft wiederkehren MUSS
- `mechanismRenderingJustification`: falls ein Mechanismus mit Figur/Umgebung/Objekt statt Schema/Vergleich/Text erklaert wird

Der neue Plan traegt `creativeVisualPolicy: "CONTENT_FIRST_VISUAL_QA_V2"`. Die Vorlage ist entsprechend gesetzt. `npm run qa:creative-visuals` und `npm run phase1:links -- <WOCHE/PROJEKT>` muessen den neuen Plan pruefen, bevor er als fertige Phase 1 ausgegeben wird.

## 5. Zwei echte Qualitaetsgates, nicht nur Textpruefung

**Vor Google Flow:** Die automatischen Planpruefungen muessen bestehen. Bei Verstoss **konkrete Szenen neu planen** und Master-Prompt entsprechend korrigieren. Kein blosses Umetikettieren von `motifKey`, `sceneType` oder `cameraScale`.

**Nach Google Flow:** Planmetadaten erkennen keine falschen generierten Bilder. Deshalb bei den tatsaechlich entstandenen PNGs jede 5er-Serie auf **Satz-Bild-Passung, Variation, Figurendrift, Lesbarkeit, Schema-Klarheit und Wiederholungen** anschauen; nicht nur Dateinamen, Anzahl und Seitenverhaeltnis zaehlen. Fehlende/schlechte Bilder gezielt regenerieren, nicht einfach bestaetigen. Ein Review ueber das gesamte Video ist vor Upload notwendig; verstaerkte Schnitte oder zufaellige Zooms reparieren keine ungeeigneten Bildideen.

## 6. Bestandsschutz und Grenzen

Das vorhandene Tuer-Effekt-Video, seine 72 Prompts, Bilder, Audio und MP4 werden NICHT veraendert. Bestehende Phase-1-Projekte ohne V2 bleiben beim historischen Pruefmodus; die V2-Vorgaben gelten fuer **neu erstellte** Projekte und explizit auf V2 umgestellte Projekte.

Bestehende separate Thumbnail-/Szene-01-Regel, Google-Flow-Autonomie in Fuenfer-Batches, Wochenordner, Topic-Uniqueness, wissenschaftliche Genauigkeit und kontinuierliche Verbesserung gelten unveraendert. Weder Automatikchecks noch KI-Selbstkontrolle koennen perfekte Bildqualitaet oder mehr Views garantieren.
