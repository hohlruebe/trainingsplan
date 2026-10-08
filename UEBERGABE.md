# Übergabe – Stand der Arbeit

Diese Datei ist das Übergabe-Protokoll zwischen Chat-Sitzungen. Zu Beginn jeder Sitzung lesen,
am Ende jeder Aufgabe aktualisieren (Stand, offene Aufgaben, Rückmeldungen von Dennis).
Regeln und Aufbau der App stehen in `CLAUDE.md`, das Designkonzept in `DESIGN.md`.

Stand: 7. Oktober 2026 (Cowork-Auftrag Bibliothek, Prüfprogramm)

## Arbeitsweise mit Dennis
- Neue Oberflächen erst als Entwurf im Canvas zeigen, Rückfragen stellen, erst nach Zustimmung einbauen.
- Canvas (Design-Entwürfe): https://claude.ai/artifact/ASD8ADh36QGDQ4FpuWTJvC
  Vor neuen Boards die alten löschen. Es gibt immer nur die aktuellen Boards.
- Jede Änderung als Pull Request – bei Entwürfen (z. B. Maskottchen) aber erst, wenn die finale Version gefunden ist, PR kurz auf Deutsch beschreiben, am Ende den vollständigen Link nennen.
- Texte auf Deutsch, Übungsnamen auf Englisch, kurze klare Sätze.
- Dennis schaut die App auf einem Google Pixel in Chrome (installierte App).

## Erledigt (in `main`)
- PR #20: freier Timer unter Tools.
- PR #21: Kapsel-Konzept, feste Orte mit Symbolen.
- PR #22: Paket 1 (Heute aufgeräumt, Bandnamen, Übungen nach Ort, Räder statt Klapp-Listen, `DESIGN.md`).
- PR #23: Paket 2 (Plan hinter Info-Knopf, Werte mit Netzdiagramm und 5 Bereichen, Bandfarben, Mobility mit
  Cool-down, Ruhetag-Flows, Routinen unter Tools, Beweglichkeits-Check).
- PR #24: Paket 3 (Tools › 1RM mit Epley und 2,5 kg, Körpergewicht in den Einstellungen, 1RM zählt relativ
  zum Körpergewicht, Erfolge = eine Medaille je Bereich plus 1RM-Archiv, Momente bei Aufstieg und 1RM-Bestwert).
- PR #25: dieses Übergabe-Protokoll, `design/` mit Maskottchen-Skripten und `mobility2.json`.
- PR #28: Trainingsmodi Einzeln/Liste, Wischen, Ergebnis prüfen, Figur in allen Schritten, Einstellungen in Abschnitten.

## Übungsbibliothek mit Cowork (7. Oktober)
- Cowork hat alle Pakete am Stück gemacht (Grenzfälle selbst entschieden, alles in `entscheidungen`). Teil 1 aller Muster eingebaut,
  ohne Fehler: alle 281 Übungen haben jetzt muskeln, gelenke, bewegt, sehne usw. Prüf- und Einbau-Programm kennen Geräte, Familien und
  Übungen über alle Dateien eines Aufrufs; `felder_isolation` darf leer sein.
- Mit Dennis: Kipping-Leiter Stufe „Chest-to-Bar“ → `g_kipping_c2b` (erledigt). `eq_laufband` als Alternative zu `eq_laufstrecke` bei `g_run`
  (kommt mit `neu_ausdauer`). Kein Nackentraining (keine neue Muskel-/Gelenk-ID).
- Alle `neu_`-Dateien eingebaut, ohne Fehler: 281 → 380 Übungen, 48 → 60 Familien, 13 neue Geräte (Score automatisch).
  `ab_rang` in 13 Verweisen mitgezogen (z. B. f_planche setzt weiter Decline Push-up und Ring Dip voraus).
  App: Muster-Name „Isolation“, Isolation/Mobility nicht im Skill-Baum, Ersatzübung im Kraftteil nur wdh/kg (vorher konnte z. B. eine Plank
  mit „6–10 Wdh.“ kommen), `g_run` auch mit Laufband, 1RM-Normen für Sumo/Trap-Bar-Deadlift, Barbell Hip Thrust, Leg Press.
- Offen: Grafiken für die neuen Übungen (Runden zu 20), Schmerzen-Funktion und Muskelausgleich bauen (Daten sind jetzt da),
  RDL/Hip Thrust/Glute Bridge/Single-Leg RDL gelten als isoliert (nur Hüfte bewegt), Dennis fragen, ob Knie ergänzt werden soll.
- 8. Oktober: `zug_vertikal` eingebaut (Teil 1 und 2, beide Pakete ohne Fehler). 24 Übungen mit neuen Feldern, 16 neue Übungen
  (265 → 281), Geräte `eq_kabelzug` und `eq_pegboard`. Neues Einbau-Programm `design/auftraege/einbauen_bibliothek.js`.
  f_pullup hat jetzt 11 Stufen; die Voraussetzung „f_pullup ab Rang 5“ (Weighted Pull-up) der sechs Folgefamilien steht jetzt auf Rang 7.
  1RM-Normen für Weighted Chin-up (0–1,1 × KG Zusatz) und Lat Pulldown (0,5–1,4 × KG). Suche findet `alias`.
  Offen: Grafiken für die 16 neuen Übungen (Runde zu 20 im Canvas), `druck_horizontal` läuft bei Cowork.
- PR #60 gemergt. `zug_vertikal` Teil 1 fertig (24 Übungen, 17 Entscheidungen), Teil 2 entschieden: alle Vorschläge außer
  Assisted Pull-up Machine (Unterstützung in kg liefe in der kg-Steigerung und im 1RM falsch herum). Neue Geräte `eq_kabelzug`,
  `eq_pegboard`. Weighted Chin-up: Zusatzgewicht beim Einbau im 1RM zählen wie beim Weighted Pull-up.
  Kipping Ring Muscle-up, Banded Muscle-up und Transition haben eigene `sehne`-Werte (keine Leitern, nicht in `SEHNE`).
- Mit Dennis: neues Feld `bewegt` (bewegte Gelenke, gleiche 7 IDs wie `gelenke`). Ein Gelenk = isoliert, mehrere = mehrgelenkig,
  keins = statisch; kein eigenes Feld `isoliert`. Neues Paket `isolation` (Curls, Seitheben, Waden …) vor `mobilitaet`, nur Teil 2;
  der Coach nimmt sie nur als Zusatz oder Ausweichübung. Idee für später: Sehnen-Anpassung je Gelenk aus `gelenke` und Verlauf
  statt je Leiter (Wechsel Pull-up → Chin-up fängt dann nicht von vorn an).
- `sehne` der Leitern steht jetzt im Auftrag (Werte aus `SEHNE`), das Prüfprogramm meldet Abweichungen. Weicht eine Entscheidung
  mit Dennis ab, `SEHNE` in `index.html` anpassen.
- PR #59 gemergt (Aufräumen, Wert-Zeilen, Geburtsjahr, Cowork-Auftrag).
- Rückfragen von Cowork beantwortet und in `design/auftraege/bibliothek.md` eingebaut:
  - Startpaket `zug_vertikal` als Testlauf, `mobilitaet` zuletzt.
  - Je Paket: Recherche, Grenzfälle im Chat, dann JSON als Datei (`felder_<muster>.json`, `neu_<muster>.json`).
  - Erst Teil 1, dann Teil 2 je Muster.
  - Anhang E listet alle 64 Leitern mit gültigen Stufennamen („Frei“ ist eine Stufe der Leiter `g_pullup`).
  - Anhang F enthält das Familien-Format direkt (kein Verweis mehr auf `familien.md`).
  - Gym-Geräte (Kabelzug, Latzug, Beinpresse …) dürfen über `geraete_neu` dazukommen.
- Neues Prüfprogramm `design/auftraege/pruefen_bibliothek.js`: `node design/auftraege/pruefen_bibliothek.js <datei.json> …`.
  - Prüft gegen `index.html`: IDs, Muskeln, Gelenke, Wertebereiche, Equipment, Leitern und Stufen, Familien-Zuordnung, Dubletten beim Namen.
  - Meldet jeden Fehler mit Übung und Grund.
- Wenn Pakete kommen:
  1. Prüfen.
  2. Fehlerliste an Cowork.
  3. Einbauen: Felder in `lib-data`, neue Übungen und Familien in `lib-data` und `fam-data`/`design/familien.json`, Grafiken in Runden zu 20.
  4. Danach Schmerzen (`gelenke`) und Muskelausgleich bauen.

## Code-Durchsicht (7. Oktober)
- Dennis: einmal den ganzen Code auf Funktion, Fehler und Unnötiges prüfen, damit es nicht zu groß wird.
- Geprüft: ESLint (keine undefinierten Namen, keine doppelten Definitionen), alle Tests, alter Stand mit anderem Schwerpunkt und
  alten Einträgen, Tempo mit einem Jahr Daten. Sync, Export und Import unverändert kompatibel.
- Entfernt: Schrift Barlow (6 Schnitte, ~176 KB, wurde nie geladen; mit Dennis abgesprochen, obwohl der Schriften-Block sonst
  unangetastet bleibt), 9 ungenutzte Funktionen, 47 ungenutzte CSS-Regeln, ungenutzte Variablen.
- Mit Dennis: die ausgeblendeten Schwerpunkte ganz gelöscht (Kraft, Calisthenics, CrossFit, Beweglichkeit, Laufen) samt allem, was nur
  sie brauchten: Laufziel- und Skillziel-Seite, Skill-Block, lange Dehn-Einheiten (`MOB_ART`, `mobRoutine`), Benchmarks, Sätze-Format,
  Krafttage mit Lauf, alter Intervall-Lauf mit Stufen (`IV`) und die alte Ergometer-Logik. Alte Einträge zeigt der Verlauf weiter an.
- Schneller: Medaillen-Berechnung (`areaStates`) rechnet beim Speichern nur noch ab dem letzten Tag neu (vorher alles, wurde jedes Jahr
  langsamer). Gefixt: „Wdh.. Ziel heute“ (doppelter Punkt) beim Metcon.
- App: 1165 KB → etwa 940 KB.
- Dennis: alten Speicherweg löschen, wenn er nichts bringt. Gelöscht (`window.claude`, `initDb`, `TP_BUILD`), er griff nur als
  Claude-Artifact. Export teilt die Datei oder lädt sie herunter.
- Dennis: Maximalpuls aus dem Alter berechnen. Geburtsjahr unter Einstellungen › Profil, Formel Tanaka (208 − 0,7 × Alter).
  Eigener Maximalpuls hat Vorrang, „–“ im Rad = wieder aus dem Alter.
- Gefixt: Die CSS-Bereinigung hatte einen Kommentar mit Komma zerschnitten. Der offene Kommentar hat die Regeln für Listenzeilen
  (`.gl-t`) verschluckt, Titel und Untertitel standen nebeneinander. Repariert und gegen `main` geprüft: nur die 47 gewollten Regeln fehlen.
- Dennis: Körpergewicht war eine breite Kachel, der Rest nicht. Er hat Variante C gewählt (Liste wie in den iOS-Einstellungen) und will
  sie auch an anderen passenden Stellen. Neuer Baustein Wert-Zeilen (`valRow`, `valRows`, in `DESIGN.md`): Profil (Gewicht, Geburtsjahr,
  Maximal- und Ruhepuls), Stand und Startdatum, erster Start, Challenge (Datum, FTP-Ziel), Körpergewicht unter 1RM.
  Eingaben im Training bleiben Kacheln.
- Dennis: Schmerz-Feld nicht in „Session anpassen“, sondern bei der jeweiligen Übung. Entwurf im Canvas: grauer Link „Schmerzen“ an
  jeder Übungskarte, Blatt „<Übung> · Schmerzen“ (wo: zwei Umschalter Ober-/Unterkörper, wie: unangenehm/Schmerz, darunter
  „Heute stattdessen …“), danach Hinweis an der Karte und „Schmerzen weg“ (Namen von Dennis). Einbau, sobald die Übungen das Feld `gelenke` haben.
- Cowork-Auftrag `design/auftraege/bibliothek.md`: neue Felder für alle Übungen (`muskeln`, `gelenke`, `sehne`, `ermuedung`, `technik`,
  `seitig`, `laut`, `rx`, `alias`) und neue Übungen in Paketen je Bewegungsmuster, mit Grenzfällen und Prüfliste. Anhänge aus den
  echten Daten erzeugt. Wenn die Pakete kommen: prüfen, einbauen, Grafiken in Runden zu 20.

## Kardio und Challenges (7. Oktober)
- Dennis: Allround soll ein Plan fürs Leben sein, Ziele bucht man auf Zeit dazu. Die anderen Schwerpunkte sind vorerst
  ausgeblendet (`FOKUS_IDS = ['allround']`, Daten und Code bleiben, alte Auswahl wird beim Laden zu Allround).
- Dennis: Laufen und Ergometer zusammenlegen. Tag 2 „Kardio locker“, Tag 5 „Kardio intensiv“, jeweils Laufen oder Ergometer.
  Ein Kernwert (`S.cardio`: FTP in Watt und Schwellentempo in s/km), alle Ziele in Prozent davon (locker 65 %, Tempo 88 %,
  Schwelle 95 %, VO2max 110 %, 30/30 125 %). Jede Einheit passt ihn an (Intervalle geschafft +1 %, sonst −1/−2 %, lockerer
  Tag nach Puls ±0,5 %), die Hälfte geht aufs andere Gerät. Tests in der Testwoche: Rampentest (FTP = 75 % der letzten vollen
  Minute) oder 5 km (Schwelle = 5-km-Tempo × 1,05). Startwert geschätzt (Gewicht × 2,4 W bzw. aus den bisherigen Läufen).
- Dennis: mehr Abwechslung. Intensiv im 4er-Takt: 4 × 4 VO2max, 30/30, Schwelle, Pyramide (Laufen) bzw. Over-Under (Ergometer);
  im mittleren Drittel Bergsprints statt 30/30 beim Laufen. Locker: Zone 2, mit Steigerungen (Ergometer: Trittfrequenz), lang.
  80/20 und `runCap` bleiben. Session anpassen: „Ich habe keine Steigung“ (flache Sprints, Entwurf `_flat`).
- Dennis: Challenges mit Datum: 5 km, 10 km, Hindernislauf, Halbmarathon, Marathon (mit Warnung), Hyrox, Murph auf Zeit,
  FTP-Ziel, Radtouristikfahrt, Duathlon. Schwimmen und Triathlon später. Rückwärts geplant, 2 Wochen Taper, Wettkampftag mit
  Ergebnis, danach weiter mit Allround.
- Dennis: Es braucht eine Option, in der der Plan einfach läuft, wenn kein Wettkampf ansteht. Oben auf „Plan & Challenges“
  steht jetzt „Worauf trainierst du?“ mit „Einfach trainieren“ (Standard, Haken) oder der aktiven Challenge.
- Offen: Rückmeldung von Dennis zu Prozentwerten, Steigerung (+1 % je geschafftem Intervall-Tag) und den Challenge-Metcons.
  Zielzeit für Lauf-Challenges noch nicht eingebaut (Tempo kommt aus dem Kernwert).

## One Rep Max und Gewicht im Training (6. Oktober)
- Dennis: Auf der 1RM-Seite alle Übungen zeigen, die ein 1RM haben können, Aktuell und Bestwert (mit Jahr). Titel „One Rep Max“.
  Wischen zum Leeren erst gewünscht, dann gestrichen (Aktuell + Bestwert reichen). Antippen = Prozent-Rechner mit den üblichen Werten,
  Farbverlauf Grün (leicht) nach dunklem Rot (schwer), ohne Umschalter, kompakt. „Neuer Wert“ als kleines Plus oben.
- Dennis: Gewicht gehört zum Fortschritt und wird im Training eingetragen, nicht danach (empfohlen und genommen), vor allem im
  Kraftteil und bei CrossFit. Bestwert sofort melden. Vollbild nur im Kraftteil mit Gewicht (man baut zwischen den Sätzen um),
  im EMOM/Metcon nicht nötig (dort baut man vorher auf).
- Logik mit Dennis abgestimmt: Gewichtsübungen steigen über kg (doppelte Progression mit Sehnen-Bremse), Stufe nur an festen
  Übergängen nach 1RM/Körpergewicht (`KG_UP`), vorher sprang z. B. Deadlift auf Sumo Deadlift High Pull. Stillstand = 10 % leichter,
  erst danach Übungswechsel. Metcon mit Ziel Rx, Schritt hoch nur bei mehr Runden.
- Offen: Werte in `KG_UP` und `RX` (Männer) bei Bedarf mit Dennis anpassen. Kein Gewicht für Frauen-Rx (bisher nicht nötig).

## Lauf-ABC und Ergometer-Timer (6. Oktober)
- Dennis: Handy hängt am Ergometer, deshalb Abschnitte live wie beim EMOM. Sein Ergometer stellt die Watt direkt ein (Watt-Modus),
  Hinweise auf Trittfrequenz/Widerstand entfernt.
- Dennis: Beim Intervall-Lauf war kein Ergometer-Plan zu sehen. Ursache: In der Vorschau eines späteren Tages landete der
  Umschalter Laufen/Ergometer beim aktuellen Tag. Jetzt gilt er für den angeschauten Tag (`ACT['run-mode']` mit `viewTag()`).
- Dennis: Laufen im Metcon nur, wo man laufen kann. Neues Gerät „Laufstrecke“ je Ort (Gym, Park, Unterwegs vorbelegt),
  „Run“ braucht es, dazu 400 m als zweite Strecke. Shuttle Run (5–10 m) bleibt ohne.
- Dennis: Warm-up für Lauftage. Laufen: Lauf-ABC (Fuß – Knie – Ferse – Hopser – Seit – Steigern), immer gleich, vor jedem Lauf,
  in den Einstellungen abschaltbar, keine Ansagen (beim Laufen schaut er nicht aufs Handy). Ergometer: zu Hause, deshalb
  Timer für die ganze Einheit mit Watt je Abschnitt (einfahren, Steigerungen, Intervalle, ausfahren).
- Dennis: Das Ergometer-Aufwärmen kommt erst nach „Training starten“, wie sonst auch. Ergometer-Lauftag ist jetzt ein Schritt-Tag
  (Einfahren, Hauptteil). Krafttage mit Lauf gibt es nur im Schwerpunkt Laufen (Tag 1 Intervalle + Kraft, Tag 4 Tempo/Test + Kraft).

## Pistol mit Halt, je Seite, Stoppuhr im Check (6. Oktober)
- Dennis: Pistol an den Ringen statt am Türrahmen, er kommt so tiefer (eher Beweglichkeit als Kraft begrenzt). Stufe heißt in der
  Anzeige „Mit Halt (Ringe oder Türrahmen)“. Links/rechts nicht getrennt eintragen: schwache Seite zuerst, sie zählt.
- Dennis: Beweglichkeits-Check braucht eine Uhr für Haltepositionen. Stoppuhr mit Ziel aus der Stufe eingebaut.
- Dennis: Am Lauftag auf dem Ergometer fehlte die Wattzahl (Widerstand magnetisch einstellbar). Ziel-Watt eingebaut.
- Dennis: Cool-down auch an Lauftagen (Laufen und Ergometer) als Frage nach dem Training, nicht in der Übersicht. Umgesetzt.
- Dennis: Im Check zeigte der Standing Forward Fold eine sitzende Figur (Pike Stretch). Neue Figur `g_forward_fold` (stehend,
  Knie gestreckt, Fingerspitzen Richtung Boden), `pruefen.js` geprüft.
- Dennis: Die Pistol-Leiter war falsch sortiert. Jetzt: Auf Stuhl absitzen (Vorstufe) → Mit Halt (Ringe oder Türrahmen, volle Tiefe)
  → Frei → Weste. Ausnahme von der Regel „Stufen nie umsortieren“ auf Dennis' Wunsch; gespeichert wird der Name, alte Einträge passen weiter.
  Geändert in plan-data, lib-data, fam-data und `design/familien.json` (Rang, Nutzen 66/70, Testtexte).

## Pausen-Timer auf den Testtagen, Sync je Feld (6. Oktober)
- Dennis: Auf den Testseiten die Pause zwischen den Versuchen direkt starten können. Umgesetzt; der Timer springt nicht weiter,
  weil die App nicht weiß, ob noch eine leichtere Stufe getestet wird.
- Dennis fragte, wie der Sync abgleicht, und merkte, dass das Foto nicht übertragen wird. Umgesetzt: Zeit je Feld (`feldTs`),
  Name und Foto werden mit abgeglichen. Der gewählte Ort bleibt pro Gerät (Dennis hat sich nicht festgelegt, ggf. nachfragen).

## Desktop-Ansicht (6. Oktober)
- Dennis trainiert zu Hause oft mit dem Mac (Chrome). Gleicher Link, erkennt Desktop selbst, manuell umstellbar. Alles auf einmal gebaut:
  Seitenleiste, Heute zweispaltig, Training mit großem Timer rechts (aus 2–3 m lesbar, keine Übergröße), Tastenkürzel, Übungen
  Liste + Familie, Blätter als Fenster. Sync am Mac: in den Einstellungen dieselben GitHub-Daten eintragen.
- Dennis: Zeitangabe in der aufgeklappten Übung klebte an der Ecke („nicht premium“) → mehr Innenabstand, gilt auch am Handy.
- Offen: Lesbarkeit aus 2–3 m am echten Mac prüfen lassen.
- Dennis hat am Handy „Desktop“ gewählt, es passierte nichts (Absicht: Desktop erst ab 900 px Breite). Jetzt mit Hinweis und Toast.

## Testtag-Eingabe (6. Oktober)
- Dennis: Auf dem Testtag fragte „Geschafft“ noch einmal das Band ab, obwohl die Kachel „Stufe“ das schon tut.
  Drei Varianten im Canvas, Dennis wählte C: Kachel „Stufe“ plus Zähler – / + für die Wiederholungen (Bestzeit in 5-s-Schritten).

## Sehnen-Bremse (6. Oktober)
- Dennis: Sehnen und Bänder passen sich langsamer an als Muskeln, Steigerungen bewusst verzögern. Nur Programm und Fortschritt
  entscheiden, nicht der Nutzer. Forschung (Arampatzis/Mersmann: Sehnen 8–12 Wochen und länger, Magnusson/Kjær: 48–72 h Erholung,
  Nielsen: große Sprünge im Laufumfang riskant) als Grundlage, Zahlen sind vorsichtige Schätzungen.
- Umgesetzt: Coach setzt die Stufe, Mindestzeit 2/4/6 Wochen je Klasse, 2× volle Wdh., eine Stufe pro Durchgang, keine in der Entlastung,
  nach Pause eine Stufe leichter, Rad nur nach unten. Laufen: Woche höchstens 1,3 × Schnitt der letzten 4 Wochen.
- Neu: Table Row und Towel Door Row (Zug mit Alltagsgegenständen, nur mit Häkchen „Alltagsgegenstände“ am Ort).
- Fehler aus #47 behoben: automatischer Übungswechsel sprang zwischen Stillstand-Wechsel und „mehr Nutzen“ hin und her.
- #47 wurde wegen einer Störung bei GitHub Pages nicht veröffentlicht (Build nach 15 Min abgebrochen). Der nächste Merge veröffentlicht neu.
- Offen: Klassen je Leiter mit Dennis prüfen. Intervalle steigen weiter nach festem Plan (`changeIv`), ggf. später auch bremsen.

## Session anpassen, Coach entscheidet (5. Oktober)
- Dennis: Der Nutzer soll nicht über sein Training entscheiden, nur Programm und Fortschritt. Deshalb:
  Kurzversion-Karte weg, statt dessen grauer Link „Session anpassen“ (Blatt wie in einer anderen App: „Sag deinem Coach …“).
  „Mir geht’s heute nicht gut“ ohne Schalter (nur heute), „Ich habe wenig Zeit“ mit < 45 / < 30 / < 15 Min (Coach kürzt selbst),
  „Ich trainiere woanders“ nur für diese Einheit. „Andere Session machen“ und „Ganzer Durchgang kurz“ hat Dennis gestrichen.
- Cool-down nicht mehr im Ablauf und keine Karte mehr, sondern die Frage „Möchtest du noch ein Cool-down?“ nach dem letzten Schritt.
- „Festgefahren“ gestrichen: bei Stillstand und bei neu freigeschalteten Leitern wechselt der Coach selbst (kein Übernehmen/Später).
  „Neu freigeschaltet“ steht nur bis zur ersten Einheit mit der Übung, zusammen mit „Als Nächstes freischalten“ unter dem Start.
- Karte „Wo trainierst du heute?“ weg (Ort kommt aus Tools › Übungen). Tipps-Karte auf Krafttagen weg, Hinweise am Schritt.
- Ohne Gerät keine Übung mit diesem Gerät: Ersatz ohne das Gerät. Ringhöhe nur bei Ring-Übungen und relativ zum Körper.

## Plan-Seite neu (5. Oktober)
- Dennis mochte die alte Textseite mit Akkordeons nicht. Freigegeben (Canvas „Plan in der App“): Überblick mit Woche zum Durchblättern,
  Tag antippen zeigt den Ablauf (Vorschau), Wissen als Liste mit eigenen Seiten. Erste Entwürfe wichen vom Design ab, deshalb direkt in der
  App mit den vorhandenen Bausteinen gebaut. „So läuft ein Krafttag“ hat Dennis verwirrt und ist raus.
- Wissens-Seiten gekürzt: je 3–6 nummerierte Schritte plus Tipps-Karte. Veraltetes entfernt (z. B. „Tag 6 leichter Zugtag“, „jeder 4. Durchgang Entlastung“).

## Bibliothek: Familie als eigene Seite (4. Oktober)
- Dennis: Übungs-Scores nicht mehr zeigen (nur für die Planung), Geräte-Scores bleiben. Familie öffnet eine eigene Seite statt aufzuklappen.
- Platzhalter „Grafik folgt“ überall, wo eine Übung zu sehen ist (auch Kraft-Karten und Mobility-Player). Neue Grafiken nur noch eintragen.

## Blätter scrollen den Hintergrund nicht mehr (4. Oktober)
- Dennis (Video): am Ende der Liste im Blatt „Zuhause · Equipment“ lief die Seite dahinter weiter. Behoben für alle Blätter.
- Familienliste (Tools › Übungen): jede Zeile 12 px Abstand oben/unten, Chips gleich weit von der Trennlinie, lange Chips brechen um (abgerundetes Rechteck).

## Countdown mit Stimme (4. Oktober)
- Wunsch von Dennis: „Three, two, one, Go!“ wählbar, Deutsch und Englisch, je Anlass einzeln an/aus (Start, Runde, Intervall, Ende).
- Stimme kommt aus der Sprachausgabe des Handys (keine Audiodateien). Offen: auf dem Pixel testen, ob die Stimme offline kommt und im Takt liegt.

## For Time (4. Oktober)
- „Auf Zeit“ heißt jetzt „For Time“, mit Umschalter „Time Cap“ (läuft herunter) / „Ohne Time Cap“ (läuft hoch). Das Ergebnis bleibt die gebrauchte Zeit.
  Alte Einstellung „Zeitlimit ohne“ wird zu „Ohne Time Cap“. Namen hat Dennis offen gelassen, ggf. noch anpassen.
  Murph (ohne Limit) zählt weiter hoch.

## Timer im Vollbild (4. Oktober)
- Entwurf im Canvas (Board „Timer im Vollbild“), von Dennis freigegeben: App-Design statt LED-Box-Timer, hochkant und quer,
  Minimieren-Knopf, Vollbild-Knopf in der Timer-Kapsel unten (nicht schwebend), kein Text „letzte 3 s piepen“,
  Intervall „Als Nächstes“ untereinander, Runden zählen mit drei Stufen, Timer je Trainingsart einstellbar.
- Der Rundenzähler unter „Start“ (Tools › Timer) erscheint nur noch, solange der Timer läuft.
- Offen/zu beobachten: Drehen per `screen.orientation.lock` klappt in Chrome nur im Vollbild der installierten App, sonst dreht die
  App den Inhalt per CSS. Dennis fragen, ob die Drehrichtung beim festen Querformat passt.

## Tools: Drop-down am Titel (4. Oktober)
- Die Kapsel Timer/Übungen/Routinen/1RM oben ist weg. Der Titel hat einen Pfeil, Tippen öffnet ein Drop-down (Variante A im Canvas, Größe wie im Entwurf: größere Version war Dennis auf dem Handy zu groß).
- Nochmal auf den Reiter Tools tippen öffnet es auch. „Routinen“ heißt jetzt „Mobility“ (interner Name `routinen` bleibt).

## In Arbeit: Maskottchen für Übungsgrafiken
Ziel: animierte Figur, die jede Übung zeigt. Gezeigt im Training (Schritt-Seiten), unter Tools › Übungen
und im Routinen-Player. Erste Probe: alle Übungen der drei Testtage (Ring Pull-up, Push-up, Pistol Squat,
Nordic Curl, Hollow Body Hold, Handstand, Ring Dip, Glute Bridge, Ring Chin-up, Bulgarian Split Squat,
Ab Wheel Rollout).

Weg bis jetzt (Rückmeldungen von Dennis):
1. Einfache Grafik-Stile → „lieber ein Maskottchen“.
2. Durchtrainierter Cthulhu → doch lieber Richtung muskulöse Gliederpuppe (Skizze).
3. Muskulöse Puppe → „hat keine Hände“, näher an die Vorlage; Seitenansicht „viel zu eckig“;
   „das Skizzenhafte behalten“; „noch etwas speckig“.
4. Neue Vorlage: Gesten-Gliederpuppen wie beim Figurenzeichnen (Ovale, Kugelgelenke, orange Line of Action).
   Blickrichtung muss sichtbar sein.
5. Brustkorb war ein Kreis statt eines Ovals, zu wenig dynamisch → erst die Figur ausarbeiten, dann animieren.
6. Drei Stile in Front-, Halb- und Seitenansicht → **Stil C „Geste“ gefällt am besten**
   (lockere Mehrfach-Striche, starke Line of Action).
7. Drei Varianten von C (C1 Fein, C2 Kräftig, C3 Mit Volumen) in 8 Positionen rundum
   plus animierte Probe (Air Squat) in einer nachgebauten Trainings-Seite → **C1 „Fein“ gefällt am besten.**
   Bei der Animation war oben ein Teil des Kopfes abgeschnitten → Bild kleiner, Ausschnitt begrenzen.
8. Jetzt im Canvas: drei Varianten von C1 (rundum und animiert):
   C1-A Fein (Striche stehen still), C1-B Lebendige Striche (Skizzenstriche zittern leicht),
   C1-C Arbeitende Muskeln (trainierte Teile blau, Bodenschatten) → **C1-B gefällt sehr gut, davon aus weiter verfeinern.**
9. Jetzt im Canvas: drei Verfeinerungen von C1-B (rundum und animiert):
   B1 Ruhiger (Striche zittern langsamer und feiner, schmalere Line of Action),
   B2 Hände und Füße (Hände mit Daumen, Füße mit Ferse und Spann),
   B3 Athletischer (breitere Schultern, schmalere Taille, Glieder verjüngen sich zum Gelenk).
   → **B3 gefällt am besten.**
10. Jetzt im Canvas: drei Verfeinerungen von B3 (rundum und animiert):
    B3-1 Definiert (feine Muskellinien: Brust, Bauch, Oberschenkel, Wade),
    B3-2 V-Form (noch breitere Schultern mit Schulterkappen),
    B3-3 Nacken und Kiefer (kräftiger Nacken mit Trapez, kantiges Kinn).
    → **B3-2 ist genau so, wie Dennis es sich vorstellt. Als feste Vorlage gespeichert.**

**Vorlage:** `design/maskottchen/maskottchen.js` (einzige Zeichenfunktion, für Canvas und App),
Beschreibung und Regeln in `design/maskottchen/VORLAGE.md`, Vorschau mit `node design/maskottchen/vorschau.js`.
Die früheren Python-Entwurfsskripte sind entfernt, damit es nur eine Quelle gibt.

11. Jetzt im Canvas: Probe aller 11 Testtag-Übungen (plus Air Squat) mit der Vorlage, animiert.
    Neu in der Vorlage: Posen-Baukasten `build` und Geräte (Ringe, Bank, Wand, Rad, Fersenhalter).
    Rückmeldung: Ab Wheel – Hände lösten sich vom Rad; Glute Bridge – oben zu weit durchgedrückt;
    Air Squat – muss wirklich below parallel gehen. Alles korrigiert und nachgemessen (Rad folgt den Händen,
    Bridge oben in einer Linie, Hüfte unten 14 px unter dem Knie). Danach: Ring Dip oben nicht ganz gestreckt → **volle Range of Motion immer korrekt darstellen**.
    Nachgemessen: bei allen Stütz- und Zugübungen waren die Arme am Endpunkt nicht gestreckt (123–153°).
    Jetzt überall 178°, Pull-up oben Kinn über dem Ring; Prüfskript `design/maskottchen/pruefen.js`.
12. Ähnliche Übungen (Pull-up/Chin-up) sollen über die Beschreibung unterscheidbar werden.
    Im Canvas: beide in Bibliothek und Training (echte App-Bilder, Figur an geplanter Stelle, Griff-Text blau).
    Vorschlag: Pull-up Schritt 1 „Im Obergriff hängen, Handflächen von dir weg“, im Training eine Griff-Zeile unter der Figur.
    Entschieden: Figur im Training **nur in der Karte der gerade laufenden EMOM-Übung**; Griff-Texte „perfekt“;
    Bildfeld **immer gleich groß** (keine Sonderformate für hohe Übungen).
13. Bibliothek: die Leiter unter der Beschreibung (heute Treppe aus Balken, `ladderHTML`) wirkt „krumm und schief“,
    nicht polished. Drei Entwürfe (A Kapsel-Leiste, B Liste mit Linie, C Treppe) → **B gewählt**, aber als Aufstieg:
    Stufe 1 unten, die schwerste oben. Jetzt im Canvas drei Variationen: B1 Glas-Kapsel (deine Stufe als weiße Pille),
    B2 Fortschrittslinie (bis zur eigenen Stufe blau gefüllt), B3 Liste mit Kacheln (Trenner, Nummer-Kachel, Chip).
    → **B1 Glas-Kapsel gewählt.** Dazu eine Markierung für die höchste je geschaffte Stufe (kann über der aktuellen liegen).
    Im Canvas drei Variationen in Gold (wie 1RM-Bestwert): M1 goldener Chip „Bestwert“, M2 goldener Ring + Stern am
    Nummernkreis, M3 goldene Marke links an der Kapsel → **M1**, aber als glänzende Medaille: holt die abgeschafften
    Leiter-Erfolge über Umwege zurück. Metall des Bestwerts per `tierOf(best, n)` (Bronze/Silber/Gold, letzte Stufe Platin),
    Farben aus `METAL`, Glanz wie `sheen`. Zu lange Stufennamen laufen als Laufschrift statt umzubrechen.
    Im Canvas drei Variationen: V1 Metall-Chip, V2 Mini-Medaille + Metallname, V3 Nummernkreis als Medaille.
    Text „Aktuelle Stufe“ (nicht „Deine Stufe“). Laufschrift nur, wenn der Name gemessen nicht passt
    (scrollWidth > clientWidth), Strecke = Überstand; Ablauf: stehen → einmal durchlaufen → ausblenden →
    am Anfang einblenden → von vorn (kein Endlosband).
    → **Medaillen weglassen.** Final: B1 Glas-Kapsel mit „Aktuelle Stufe“ und goldenem Chip „★ Bestwert“
    (gleich = nur goldener Stern neben „Aktuelle Stufe“).
    Laufschrift **nur beim Antippen**: zu lange Namen (gemessen) enden mit „…“; Tippen = einmal durchlaufen,
    ausblenden, wieder am Anfang mit „…“. Dauer 3 s + Überstand/45 s. Passende Namen reagieren nicht.

**Eingebaut (Pull Request, siehe unten):** Figur in Tools › Übungen und in der Karte der laufenden EMOM-Übung,
Griff-Zeile für Pull-up/Chin-up, Pull-up-Schritt 1 „Im Obergriff hängen, Handflächen von dir weg.“, neue Leiter.
Dunkelmodus: weiße Fläche ist nicht polished → eigener Farbsatz nötig. Vorlage kann jetzt Farbsätze (`PALETTES`, `pal`
an `frames`/`play`/`animatedSVG`), hell unverändert. Im Canvas drei Entwürfe: D1 Kreide auf Dunkel, D2 Nachtblau,
D3 gedämpfte helle Fläche → **D1 „Kreide auf Dunkel“ gewählt und eingebaut** (wechselt live mit Hell/Dunkel).
    Im Canvas: Pull-up, Nordic Curl und eine erfundene Leiter mit langen Namen. **Wartet auf Dennis' Freigabe.**

Technik: siehe `design/maskottchen/VORLAGE.md`. Kurz:
- Figur als 3D-Skelett, um die Hochachse gedreht, Bild für Bild aus Gelenkwinkeln gezeichnet.
- Bildausschnitt einer Animation über alle Bilder der Bewegung plus Rand, damit nichts abgeschnitten wird.
- In der App zeichnet `play()` live im Browser (offline, keine großen Dateien).

Nächste Schritte: Grafiken für weitere Übungen (Bibliothek, Aufwärmen, Metcon), Routinen-Player mit Figur.

## Danach: `mobility2.json` einbauen
Datei: `design/mobility2.json` (von Dennis aus Cowork, `v: 2`, 42 Übungen, 8 Leitern, Analyse mit 14 Tests und 8 Regionen, 4 Routinen: `r_lauf_abc`, `r_aufwaermen_kraft`, `r_yoga_flow`, `r_abend`).
Gewünscht (erst Entwurf im Canvas):
- Lauf-ABC als Aufwärmen vor Tag 2 und 4.
- Dynamisches Aufwärmen vor Tag 1, 3 und 6.
- Yoga-Flow an Tag 5 und 7.
- Abend-Routine.
- Ganzkörper-Beweglichkeitsanalyse, jederzeit und ohne Equipment (14 Tests, links/rechts getrennt,
  Regionen mit Empfehlungen).
Beim Einbau: `equipment` immer als Liste von Alternativen-Gruppen; alte IDs, Namen und Stufen nie ändern.

## App-Symbol und Dunkelmodus in Graphit (PR #29, gemergt)
- Dennis: Das alte Symbol (Ringe auf Whiteboard mit grauem Rahmen) passt nicht mehr zu „Emaille“.
- Runden im Canvas: 3 Vorschläge → 5 Konzepte ohne Ringe → minimalistisch Mensch oder Gerät → doch Ringe (R2 frei hängend)
  → dazu der Marker-Strich wie auf dem Whiteboard (links bündig, sonst wirkt es wie ein Gesicht) → Hintergrund Graphit wie die
  Übungsgrafik im Dunkelmodus → **D3**: Kreide-Ringe, hellblauer Strich, Graphit.
- Ein Symbol je Hell/Dunkel geht bei Web-Apps nicht (Chrome legt es beim Installieren fest). Dafür `icon-mono-512.png`
  (`purpose: monochrome`) für die Designsymbole von Android.
- Dunkelmodus der App ebenfalls in Graphit (Board P43, Alt neben Neu): Hintergrund #1E1F23, Karten #2A2B30, Glas #24252A,
  Pille #41424A, Grafik-Fläche #33343A, Linien #36373D, Statusleiste #1E1F23. Maskottchen-Farbsatz dunkel: Gelenke #2A2B30,
  Fläche #33343A, Boden #4A4B52 (Vorlage und Kopie gleich).
- Auf dem Handy: Chrome prüft das Manifest beim Öffnen und aktualisiert das Symbol selbst (kann etwas dauern, evtl. mit
  Nachfrage). Klappt das nicht: erst exportieren oder syncen, dann neu installieren.

## Bibliothek, Orte, Bewegung, Off-White (PR #30, gemergt)
- Tools › Übungen: „Alle“ ganz links in der Orte-Kapsel (jede Übung, egal wo). Ort gewählt → kleine Kapsel nur mit Orten plus Stift.
  Ort nochmal tippen → große Kapsel. Die Zeile „… brauchen anderes Equipment · Zeigen“ ist weg. Ort gilt sofort auch fürs Training.
- Orte und Equipment aus dem Profil in die Bibliothek verlagert (Dennis: Variante C, Blatt von unten). Profil hat nur noch
  Erfolge, Verlauf, Werte. Orte umbenennen und Symbol wählen (15 Symbole), synchronisiert. Bandfarben: Karte „Bänder“ in der Bibliothek.
- Bewegung als feste Regel in `DESIGN.md`: Pille gleitet, Drücken gibt nach, kein blaues Antipp-Leuchten (Board P44).
- Off-White (Board P46): Dennis will durchschalten → Einstellungen › Aussehen › Hintergrund: Weiß | Kreide | Leinen | Nebel
  (nur Hellmodus, nur auf dem Gerät). Offen: welche Variante Standard wird.

## Ort bearbeiten verbessert (PR offen)
- Dennis' Screenshot: Tastatur sprang sofort auf, Lücke zwischen Blatt und Tastatur, grauer Platzhalter wirkte wie ein Wert,
  Kettlebell-Symbol sah aus wie eine Schachfigur.
- Jetzt: Blatt öffnet ohne Tastatur (`openForm` mit `noFocus`), Vorschau oben zeigt live die Kapsel mit Symbol und Name,
  im Feld steht der echte Name, „Name“ und „Symbol“ gleich gestaltet, neues Kettlebell-Symbol.
- `fitKeyboard` hält das Blatt jetzt über Abstand unten direkt über der Tastatur, der dunkle Hintergrund deckt alles ab.
  Auf dem Handy prüfen (auch im Vollbild).

## Übungsfamilien (eingebaut, PR offen)
- Dennis: Varianten (z. B. 15× Pull-up) in der Bibliothek zu Familien zusammenfassen, erst beim Antippen aufklappen.
  Im Training automatisch die beste Variante nach Können und Geräten.
- Aufteilung: Cowork ordnet die Übungen Familien zu und rankt sie. Auftrag: `design/auftraege/familien.md`, Ergebnis `familien.json`.
  Claude Code prüft das Ergebnis, zeigt einen Entwurf im Canvas und baut dann ein.
- Arten je Variante: `stufe` (Steigerung, Rang nach Schwierigkeit), `variante` (gleichwertig), `tempo`
  (CrossFit-Schnelligkeit, Vermerk, ersetzt nie automatisch eine Stufe; Dennis: keine eigene Familie).
- Cowork soll Grenzfälle vorher mit Argumenten dafür und dagegen vorlegen. Offen: Chin-up eigene Familie oder Pull-up-Variante.
- Entwurf im Canvas (Board P47), Dennis: „wirklich cool“. Bibliothek mit Familien, Familie mit Skill-Pfad, Varianten und
  Tempo-Abschnitt, „Führt zu“, Skill-Baum je Bereich (eigene Seite, z. B. Profil › Werte), Karte „Als Nächstes freischalten“ auf Heute.
  Dafür im Cowork-Auftrag ergänzt: `bereich`, `ebene`, `voraussetzt` (mit `ab_rang`), `fuehrt_zu`, `ziel` je Stufe.
- Beim Einbau beachten: IDs und Namen nie ändern, Familie nur als neues Feld; Aufstieg weiter nur über die Leiter-Regel.
- **Eingebaut:** `familien.json` von Cowork (48 Familien, 207 Übungen, 20 Entscheidungen, u. a. Chin-up eigene Familie,
  neuer Bereich Gewichtheben) liegt geprüft in `design/familien.json` und in `index.html` (`fam-data`).
  Bibliothek mit Familien und Skill-Pfad, Skill-Baum (Profil › Werte), Karte „Als Nächstes freischalten“ auf Heute.
- **Noch offen:** Das Training wählt die Übung weiter über die Leitern und `planFill` wie bisher. Automatisch die höchste Stufe
  einer Familie nehmen (Können + Geräte, nie `tempo`) ist der nächste Schritt, erst nach Rückmeldung von Dennis.
  Suche muss Varianten direkt finden. Mobility (56 Übungen) bleibt außen vor.

## Trainingsaufbau und Schwerpunkte (eingebaut, PR offen)
- Dennis: neue Woche: Tag 1 Ganzkörper (Zug + Druck), Tag 3 Zug, Tag 6 Druck (Läufe und Ruhetage bleiben).
- Sechs Schwerpunkte mit eigenem Aufbau (Details `design/schwerpunkte.md`): Allround (Standard), Kraft & Muskelaufbau
  (Ober-/Unterkörper an 4 Tagen, Sätze mit Pause, Phasen), Calisthenics (Skill-Block mit 1–2 Skill-Zielen, Handstand an den
  kurzen Tagen), CrossFit (Kraft/Technik + WOD, Benchmarks Cindy, Mary, Chelsea in 1, 6, 12, Murph monatlich), Beweglichkeit
  (3 lange Einheiten à 35 Min, täglich kurz, Check in 1, 4, 8), Laufen (Ziel 5 km / 10 km / Halbmarathon, Puls-Zonen nach Karvonen).
- Entwurf im Canvas (P49) von Dennis freigegeben: „Wir bauen das jetzt so ein“.
- Eingebaut: Auswahl (Plan › Schwerpunkt ändern, Block-Karte auf Heute, Onboarding), Laufziel, Skill-Ziele, Block-Karte mit
  Fortschritt, Rückblick am Blockende (Weiter so / Nächste Stufe / Wechseln), Maximal- und Ruhepuls in Einstellungen › Profil.
- Schritt A eingebaut: automatische Übungswahl je Muster (begonnene Leiter vor neuer, dann Nutzen, nie Tempo-Varianten im
  Kraftteil), Stillstand nach 3 gleichen Einheiten schlägt eine andere Variante vor, Allround Tag 1 Platz 3 gleicht den
  schwächsten Kraft-Teil aus.
- Bestehende Daten: erster Block beginnt beim aktuellen Durchgang; gewählte Übungen der alten Woche wandern mit (`S.picksV`).
- Dennis: Test nicht jeden 4. Durchgang, sondern am Ende des Blocks. Umgesetzt: 4 und 8 nur Entlastung, 12 = Testwoche
  (Maxout, Beweglichkeits-Check, dann Rückblick). Laufen behält Testläufe, CrossFit Benchmarks 1/6/12, Beweglichkeit prüft in 1 und 8.
- Offen / zu beobachten: Rückmeldung von Dennis zu Tagesnamen, Länge der langen Dehn-Einheiten (Übungen laufen in Runden),
  Inhalte der WODs aus dem Metcon-Pool.

## Übungsgrafiken für die Bibliothek (Runde 1 eingebaut)
- Dennis: Übungen nach und nach mit Animationen bestücken, 20 pro Überprüfung im Canvas, dann Pull Request.
- Runde 1 (eingebaut): Ring Row, Pike Push-up, Reverse Lunge, Hanging Knee Raise, Burpee, Squat Jump, Skater Jump,
  Slider Knee Tuck, Ring Push-up, Strict Handstand Push-up, L-Sit, Mountain Climber, Plank, Hollow Rock, V-up,
  Slider Leg Curl, Hip Thrust, Scapular Push-up, Diamond Push-up, Split Squat.
- Rückmeldungen und Regeln (stehen in `design/maskottchen/VORLAGE.md`):
  Kniebeugen immer below parallel; Hände und Füße lösen sich nie von Boden, Ring oder Gerät (`ik3` dehnt bis 12 px,
  `pruefen.js` misst Kontakte); Ringe am unteren Rand greifen, Hand im Ring; Sprünge mit echter Flugphase ohne Pause;
  Plank mit Unterarmen flach am Boden; V-up mit gestreckten Armen; Scapular Push-up: Rumpf sackt zwischen die Schulterblätter
  („perfekt“). Pull-up, Chin-up, Dip wurden dafür am Griff korrigiert.
- Runde 2 (eingebaut, Dennis: „alle Sachen, die in den Testtagen vorkommen“): Stufen der Testübungen (Knee, Parallette,
  Decline, Banded, Weighted Push-up, Assisted Pistol, Box Pistol, Freestanding Handstand, Ring Support Hold, Shrimp Squat) und
  Beweglichkeits-Check (Ragdoll, Pike Stretch, Jefferson Curl, Deep Squat Hold, Overhead Deep Squat Hold, Wall Flexion Hold,
  Wall Slide, Wrist Extension Stretch, Planche Lean, Knee-to-Wall). Rückmeldungen: Geräte deutlich (breites grünes Band,
  Weste als dicke Platten), Hand hält den Fuß wirklich (Shrimp), Jefferson: erst Kinn zur Brust, Oberkörper hängt vor den Beinen
  und vor der Stufe, Füße flach nach vorn (Standard in `build`), Wände als glatte Fläche statt Schraffur, Handrichtung in der
  Beschreibung (Wrist Extension: Finger nach vorn; Planche Lean: Finger zur Seite oder schräg nach hinten).
  Canvas-Boards höchstens ~2 MB (6 Bilder/s in der Vorschau), sonst lädt der Canvas sie nicht zuverlässig.
- Offen aus dem Beweglichkeits-Check: Supine Hamstring Stretch, Assisted Deep Squat, Wall Flexion Lift-off, Wrist Rocks,
  Wall Calf Stretch. Frage an Dennis: Wand bei Handstand und HSPU auch glatt statt Schraffur?
- Danach: Runde 3 mit den nächsten 20 (z. B. Wall Walk, Box Jump, Kettlebell Swing, Goblet Squat, Thruster,
  Walking Lunge, Step-up, Hollow Hold-Varianten, Bear Crawl, Russian Twist, Wall Sit, Band-Übungen, Dragon Flag, Front Lever …).

## Allround: Rhythmus der Woche
- Dennis: lieber 2–1–3–1 oder 3–1–2–1 statt 4 Tage Training am Stück. Umgesetzt 3–1–2–1: Tag 4 Ruhetag (Flow A),
  Tag 5 Intervall-Lauf. So folgt auf den Zug-Tag (mit Beinen) ein Ruhetag, und die Intervalle laufen mit frischen Beinen.

## Figuren im Testtag und Beweglichkeits-Check
- Dennis: im Beweglichkeits-Check fehlten die Figuren; beim Stufenwechsel im Test soll die passende Übung animiert werden.
  Umgesetzt: Check als Karten je Test mit Figur der gewählten Stufe, Testtage zeigen die Figur der gewählten Stufe.

## Ideen für später
- Übungsgrafiken auch für alle übrigen Übungen der Bibliothek.

## Figur in allen Trainingsschritten und Trainingsmodi
- Wunsch: Animation während des ganzen Trainings, für Übungen ohne Grafik ein Platzhalter: winkendes Maskottchen
  mit Hinweis, dass noch etwas fehlt. Pose `_wave` ist in der Vorlage.
- Im Canvas (P33): Aufwärmen und Metcon mit Figur über der Liste (gewählte Zeile als weiße Pille, Tippen wechselt),
  Handstand und Testtag mit Figur oben in der Karte, Platzhalter „Grafik folgt“ hell und dunkel.
  → Dennis' neue Idee: **Trainingsmodus als Einstellung**. „Einzeln“ (eine Übung pro Bildschirm, wischen) oder
  „Liste“ (ganzes Training, Übung klappt mit Figur auf, läuft mit). Einstellung Training: Umschalter Standard |
  Benutzerdefiniert, erst bei Benutzerdefiniert je Trainingsart (Aufwärmen, Kraft, Metcon, Murph, Cool-down) wählbar.
  Gesten: „Wischen statt Tippen“ als Schalter (links = weiter, rechts = zurück, in der Liste rechts = abhaken).
  Rückmeldung: Wischen muss **immer dieselbe Richtung** haben → nach links = erledigt und weiter (einzeln und in
  der Liste), nach rechts = zurück. Kein eigenes Fenster für Trainingseinstellungen: Einstellungsseite in Abschnitte
  teilen (Aussehen · Training · Gerät · Daten, dazu Profil und Sync). Im Canvas (P34) aktualisiert.
  Danach ergänzt: Schalter „Wischen umkehren“; „Runden zählen beim Metcon“ (Zähler „+ Runde fertig“, tippen oder
  wischen, Runden stehen am Ende schon drin); EMOM: der Timer schaltet weiter, in der laufenden Karte unten
  „Als Nächstes · Min 2“ mit kleiner Figur und Countdown.
  Rückmeldung: Rundenzähler **nur in der Liste** (Einzeln zählt Übung für Übung und Wdh. mit), am Ende in beiden
  Modi **Ergebnis prüfen** (Blatt „Stimmt dein Ergebnis?“ mit vorausgefüllten Kacheln). Alles Neue strikt aus den
  Bausteinen: Zähler = `.stepper`, Infos = `.chip`/`.chip.blue`, Werte = `.tile`. EMOM-Vorschau als Chip mit
  Mini-Figur + blauer Countdown-Chip. Im Canvas (P34) mit echten App-Bildern.
  Dennis: auch der Rest wirkt nicht im Kapsel-Stil → alles geprüft, Alt neben Neu im Canvas (P35, Neu in der echten
  App gebaut): Umschalter 42 px; Einzeln mit Chip „Übung 2 von 9“ statt Punkten und `.bgrp` „‹ Zurück | Erledigt, weiter ›“
  statt Hinweis-Chips; Liste als Glas-Kapsel mit weißer Pille (wie Leiter), keine Abhak-Kreise, „Erledigt“ als
  `.btn.small`, erledigt = grüner Haken an der Menge. EMOM, Ergebnis-Blatt, Einstellungen Standard unverändert.
  → **Neu gefällt viel besser.** Regel (in DESIGN.md): Entwürfe ab jetzt immer direkt im besprochenen Stil bauen.
  Doppelung behoben: im Modus „Einzeln“ kein großer „Weiter zu …“-Knopf, solange Übungen offen sind; er erscheint nach
  beim Metcon erst nach „Stimmt dein Ergebnis?“. Aufwärmen: „Erledigt, weiter“ auf der letzten Übung springt direkt zum
  nächsten Schritt (Chip „Danach: Handstand“), kein zweiter Knopf. Board P36.
  Dennis: Knöpfe mit je einem Wort → „‹ Zurück | Erledigt ›“. Ergebnis-Eingabe bleibt Rad, nochmal tippen = Zahlenfeld.
- **Eingebaut (PR #28, gemergt):**
  - Einstellungen in Abschnitten: Profil, Sync, Aussehen, Training, Gerät, Daten. Training: Standard | Benutzerdefiniert,
    je Trainingsart Einzeln | Liste, Rundenzähler, Wischen statt Tippen, Wischen umkehren (alles nur auf dem Gerät).
  - Liste und Einzeln für Aufwärmen, Metcon, Murph (Runden), Cool-down (folgt der Uhr); Kraft einzeln = nur die laufende Karte.
  - Metcon: Zähler in der Liste (zählt beim Abhaken mit), Einzeln ohne Kacheln und Hauptaktion, solange der AMRAP läuft.
    Am Ende „Stimmt dein Ergebnis?“ (Stimmt, speichern | Ändern).
  - EMOM: Chip „Als Nächstes · Min 2 · Name“ mit Mini-Figur und Countdown in der laufenden Karte.
  - Figur oder winkender Platzhalter „Grafik folgt“ in allen Schritten (Handstand, Testtag, Abläufe).
  - Rad-Blätter mit Zahl: nochmal auf den großen Wert tippen = Zahlenfeld.
  - Getestet: alle Reiter hell und dunkel, alte Prüfskripte, neue Abläufe (Liste, Einzeln, Runden, Wischen, Ergebnis, Zahlenfeld).
  Offen: Rückmeldung von Dennis auf dem Handy, besonders Wischen und die Länge der Hinweise (erste zwei Sätze).

