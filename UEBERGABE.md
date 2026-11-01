# Übergabe – Stand der Arbeit

Diese Datei ist das Übergabe-Protokoll zwischen Chat-Sitzungen. Zu Beginn jeder Sitzung lesen,
am Ende jeder Aufgabe aktualisieren (Stand, offene Aufgaben, Rückmeldungen von Dennis).
Regeln und Aufbau der App stehen in `CLAUDE.md`, das Designkonzept in `DESIGN.md`.

Stand: 28. Oktober 2026 (Trainer-Feinschliff aus dem Training; davor Mehr Zeit mit Accessory; davor Joker verdienen und selbst einsetzen; Guten Morgen weg, keine blockierende Rückfrage; davor Woche besser verteilt, Training vorziehen; davor Plan nach der Impeccable-Kritik; davor Profil P2/P3 nach der Impeccable-Kritik; davor Profil nach der Impeccable-Kritik; davor Tools nach der Impeccable-Kritik, Körper und Equipment; davor Wochen-Kette und neue Medaillen; davor Guten Morgen ohne Schlafstunden; davor Trainer neu sortiert nach Impeccable-Kritik; davor Heute neu sortiert nach Impeccable-Kritik; davor Schwerpunkt als Karten nach Impeccable-Audit; davor Impeccable eingerichtet, `PRODUCT.md`; davor Schwerpunkt Kettlebell; davor Eine oder zwei Kettlebells, 13 weitere Übungen, Kettlebell-Grafiken Runde 1 im Canvas; davor Mehr Kettlebell, verstellbare Kettlebell; davor Ausfall nicht mehr aufs Wochenende gequetscht; davor Prüfung 2 der Trainingsplanung; davor Muskel-Bilder und neue Übungen für seitliche Schulter/Abduktoren; davor Prüfung der Trainingsplanung mit Korrekturen; davor Körper unter Tools; davor Trainingstage nur über ein Blatt; davor Kalender als einzige Quelle; davor Blöcke Aufbau/Kraft/Spitze; davor 2 bis 6 Trainingstage; davor Ermüdung je Körperzone; davor Zeit unter Spannung mit Taktgeber; davor Guten Morgen und Körper-Check; davor Leistung als Signal; davor Belastung „Wie hart war’s?“; davor Training immer im Vollbild; davor Halteübungen in Sekunden, Übungs-Anleitungen neu; davor Aufwärmen und Vollbild am Laptop, Nordic Curls nur mit Fußanker, Trainings im Google Kalender)



## Grafiken Runde 6 (1. November 2026, Claude)
- Platz 62–80 aus `REIHENFOLGE.md` (Ausgleich): Lat Pulldown (Kabelzug mit Sitz, Knie-Polster, Seil, Gewichtsblock), Shrug, Reverse Nordic,
  Leg Extension (Beinstrecker mit Hebel), Single-Leg Slider Curl, Ring Leg Curl, Ring Triceps Extension, Skull Crusher (auf der Flachbank),
  Ring Biceps Curl, Biceps Curl, Lateral Raise, Band Lateral Raise, Band External Rotation, Band Face Pull, 45-Degree Back Extension, Bird Dog,
  Pallof Press, Single-Leg Calf Raise, Seated Calf Raise. Board: https://claude.ai/artifact/KHBbRLJkm868GKYHburxa4
  Neu in der Vorlage: `dumbbellZ` (Kurzhantel längs, Kreis mit `ax: 'z'`), `dbX`, `padBench` (Bank längs oder quer), `solve` (Haltung über einen Abstand
  bestimmen, z. B. Schulter zum Ring), `anchor` (Bandanker). `pruefen.js`: Kontakte und Schleifen halten. **Offen: Freigabe.**
- Noch nicht in `index.html`: Runde 4–6, Kettlebell-Runde, deckend, Schulterpartie, ruhige Geräte (Kopie nach Freigabe).

## Grafiken Runde 5 (1. November 2026, Claude)
- Platz 42–61 aus `REIHENFOLGE.md`: Dead Hang, Wall Biceps Stretch, Overhead Triceps Stretch, Wrist Flexion Stretch, Bench Dip, Body Saw, Band Row, AbMat Sit-up,
  Russian Twist, Wall Ball Shot, Shuttle Run, Push Press, Stair Climb, Bike Erg, Row, Band Lat Pulldown, Box Jump, Lateral Band Walk, Clamshell, Copenhagen Plank.
  Board: https://claude.ai/artifact/7LwtySa61xCfyN5xsNazsu (deckend, drehbar). Neu in der Vorlage: Ball (`type: 'ball'`, immer rund), `bar`, `box`, `runPose`/`blendJ`.
  Treppe läuft mit (Figur bleibt im Bild), Shuttle Run dreht an der Linie um. `pruefen.js`: Kontakte halten. **Offen: Freigabe**, dann Kopie nach `index.html`.
- Dennis' Rückmeldung (Fassung 2): Wall Biceps Wand seitlich, Hand flach daran; Trizeps: andere Hand drückt den Ellbogen nach unten; Bench Dip tiefer (Oberarm
  waagerecht); AbMat gezeichnet; Wall Ball eine flüssige Bewegung (Fangen im Absenken); Shuttle Run Fingerspitzen am Boden (hinteres Bein über `legVia`);
  Stair Climb mit Becken, Oberkörper, gebeugten Armen und Drehung; Bike Erg ganzes Rad und tritt vorwärts; Box Jump Plyo-Box 61 × 51 × 76 cm (`plyoBox`,
  Figur ≈ 2 px/cm); Copenhagen unteres Bein frei unter der Bank. Body Saw und Band Lat Pulldown (Kniestand laut Anleitung) unverändert, nur erklärt.
- Fassung 3 (Dennis): Trizeps Ellbogen hinter dem Kopf, Stützhand über den Kopf darauf (Ansicht von hinten); Bench Dip mit Flachbank (`flatBench`);
  AbMat rund in echter Größe, Rücken im Bogen (`_bend`); Shuttle Run Hand zur Kamera vor dem Bein; Bike Erg und Row Erg ausgestaltet (`ergBike`, `ergRow`);
  Box Jump Absprung vor der Box, rückwärts herunter, Ende = Anfang. Russian Twist bleibt ohne Gewicht (Hände vor der Brust, laut Anleitung).
  **Neue Regel für alle Animationen: endlose Schleife** (`pruefen.js` meldet Sprünge). Dabei repariert: Nordic Curl (war 1,1 Zyklen lang), Skater Jump,
  Thread the Needle, Lateral Band Walk, Treppe (läuft jetzt wie ein Laufband), Inchworm (Bild läuft mit, Striche am Boden).
- Fassung 4 (Dennis): Thruster (Runde 4, Platz 22) als flüssige Bewegung ohne Halt (zwei weiche Kurven statt Schlüsselbilder); Trizeps Handfläche wirklich
  auf dem Ellbogen (`reArm` auf `J.ela`); Bank und Box beim Drehen nicht durchsichtig (nur die Oberseite liegt immer unten, Seiten nach Tiefe);
  AbMat ganze Wiederholung (Schultern am Boden, `AL` −94°); Treppe: Stufen wachsen an festen Grenzen herein (`clipLine`), Arme ruhiger.
  Geräte ruhig gezeichnet: `S(…, so)` mit festem Startwert je Gerät (kein Wechsel der Nebenstriche von Bild zu Bild) und eigener Breite `o.w`
  (Nebenstriche 0,6 davon); Linien von Bike Erg, Row Erg, Bank und Box etwa halb so breit.

## Grafiken Runde 4 (1. November 2026, Claude)
- Dennis: „fang an, alle Grafiken zu bauen, die noch fehlen“. Stand: 115 Grafiken in `design/maskottchen/maskottchen.js` für 415 Übungen. Es fehlen also noch 302.
  Davon warten 21 Kettlebell-Grafiken weiter auf Freigabe; bis dahin hat `index.html` 94 Grafiken.
- Runde 4 = Platz 21–41 aus `REIHENFOLGE.md` (Cossack, Thruster, Cat-Cow, Shoulder/Hip CARs, 90/90, Half Split, Wrist Rocks, Cobra, Inchworm, Sleeper, Lizard,
  Butterfly, Pancake, Glute Bridge Hold, Band/Dumbbell Press, Run, Strict Press, Hip Flexor Stretch). Board: https://claude.ai/artifact/QdT7dqH3WtRRqQQKrEA4r2
  `pruefen.js` misst Gelenke und Kontakte, alle halten. **Offen: Freigabe von Dennis**, danach Kopie nach `index.html` (zusammen mit der Kettlebell-Runde).
- Unsicher: Sleeper Stretch und Pancake sind klein bzw. schwer zu lesen (liegende bzw. gegrätschte Figur), Hip CARs von schräg vorn.
- Dennis' Rückmeldung (Fassung 2): Cat-Cow Rücken oben und unten runder (neu in der Vorlage: `J._bend` mit eigener Achse für Brustkorb und Becken und
  verschobenem Brustkorb, nur wenn gesetzt), Shoulder CARs mit dem Arm zum Bildschirm, 90/90 mit festen Füßen (Knie wie Scheibenwischer), Half Split ohne
  springendes Bein (Fuß fest, Bein streckt sich mit der Hüfte), ein Band unter beiden Füßen (`poly` kann jetzt `w`), Butterfly von vorn, Dumbbell Press
  Ellbogen leicht vor dem Körper, Run lockerer. Lizard: hinteres Knie bleibt am Boden, angewinkelt (laut Anleitung).
- Fassung 3: Cobra oben mit ganz gestreckten Armen (Hände dort, wo der gestreckte Arm den Boden erreicht), Cat-Cow Bogen über die Brustkorb-Mitte
  (die orange Linie geht mit), Butterfly mit Händen an den Füßen und Ellbogen auf den Knien, Run mit pendelnden Armen (vorn enger, hinten offener) und
  federndem Knie. Dumbbell Press: Ellbogen etwa 30° vor dem Körper (Schulterblatt-Ebene), so bleibt es.
- Fassung 4: Cobra im Bogen (`_bend`: Becken flach, Brustkorb steiler), Butterfly deckend (neu: `solid: true` in `EXERCISES`, `figure` zeichnet dann Rumpf,
  Kopf und jedes Glied nach Tiefe und füllt sie mit der Fläche; ohne `solid` bleibt alles wie bisher). Offen: deckend für alle Grafiken?
- Fassung 5: deckend ist jetzt Standard für alle Grafiken (`solid` aus nur mit `solid: false`), auch Geräte nach Tiefe (vorderes Ring-Seil vor dem Körper),
  Schulterpartie verbindet Schultern und Brustkorb (Lücke weg, Dennis). Vergleich aller Grafiken: https://claude.ai/artifact/4LE5pmYn8umzP24nPZRxU8
  Noch nicht in `index.html` (wartet mit Runde 4 und Kettlebell auf Freigabe).
- Drehen in der App eingebaut (CLAUDE.md „Figur drehen“), mit der bisherigen Grafik-Kopie in `index.html`.
- Dennis' Idee: Grafik in der App um 360° drehen, im (i) und im Training, das Training merkt sich die letzte Ansicht. Im Board zum Ausprobieren
  (ziehen = drehen, senkrecht = von oben, doppeltippen = zurück). Offen: Freigabe der Bedienung, dann Einbau in der App.
- Nächste Runde 5: Platz 41–60 aus `REIHENFOLGE.md` (Dehnungen Cool-down, Bench Dip, Body Saw, Band Row, Sit-up, Russian Twist, Wall Ball, Push Press …).

## Rückmeldung aus dem Training (1. November 2026, Claude)
- Erledigt: (i) = Übung der Stufe, Bandstufe in Bandfarbe auch in der Liste (nicht mehr abgeschnitten), Seiten-Zeile bei einseitigen Übungen,
  Ringhöhe an jeder Ring-Übung, Stufen-Rad (schwerer oben, heute Mitte, leichter unten).
- Danach (Dennis' Antworten): Ringhöhe und Stufe nur im (i); „je Seite · nacheinander/alternierend“; Blatt-Kopf nicht mehr unter der Statusleiste
  (iPhone-Screenshot „Fertig“ verwischt); Schrift in der Liste (Pfeil über dem Text) behoben; L-Sit als Skill ab Vorbeuge „Fingerspitzen am Boden“,
  Rumpf im Kraftteil Hanging Knee Raise bzw. (ohne freien Pull-up) Ab Wheel Rollout; Übung tauschen im Training über das Rad (Name oder Pille antippen), kein Knopf am Ende mehr.
- Danach: ein Rad (V1, Dennis: Umschalter braucht es nicht): Stufen, Trennzeile „Andere Übung“, andere Übungen; Stufen nach Wissensstand (neu alle, mittel ±2, sicher ±1, Satz unter dem Rad);
  andere Übungen alle am Ort, ohne gesperrte (z. B. Muscle-up), nützlichste zuerst, ohne Limit.
- Offen: auf dem iPhone prüfen, ob der Blatt-Kopf jetzt frei ist.

## Prozent-Bezug im Training (31. Oktober 2026, Claude)
- Dennis: neben jeder Vorgabe steht, wovon sie wie viel Prozent ist. Watt „% FTP“, Laufen „% Schwelle“, Gewicht „% 1RM“ (≈ = geschätzt), Metcon „% Rx“.
- Runde 2 nach Dennis' Rückmeldung: % FTP in eigener Zeile, in der Liste alles klein unter der Zahl (auch „je Seite“), feste Spalte, aktive Zeile wie die
  anderen, „Als Nächstes“ ohne FTP, keine Zeile „FTP 180 W · deine Angabe“. Board: https://claude.ai/artifact/EGbo8eKrksNS3qtCD7VPoW
- Danach: Abschluss mit Figur links, Zusätze und „Als Nächstes“ je eigene Zeile; Zeit-Kapsel Variante C (112 px, Zeit 66 px, gestapelt),
  Board https://claude.ai/artifact/AksBu2LJyZsMpvEUUt7nou.
- Metcon zeigt im Trainer jetzt Gewicht und % Rx (Getter-Vergleich in `metconFlow` war immer falsch). „Läuft“ aus der Zeit-Kapsel entfernt.

## Trainer aus dem Test im Chat (30. Oktober 2026, Claude)
- Testversion der App im Chat mit Handy-Rahmen: https://claude.ai/artifact/8pRvPRdMmKG1GDgHR9zqUW (Kopie von Dennis' Stand, ohne Sync, „Auf Anfang setzen“).
- Dennis' fünf Punkte umgesetzt: Einzeln ohne Leere (Inhalt mittig), Kapsel ohne doppelte Restzeit, Kapsel antippen = Start/Pause, automatisch weiter auch nach
  Intervallen, Metcon und abgehaktem Aufwärmen, Liste: Zeile antippen = erledigt. Offen: ob ihm die mittige Einzeln-Ansicht reicht oder die Figur größer soll.
- Dennis (31. Oktober, Bild vom iPhone): beim Ergometer im Aufwärmen fehlte die Wattzahl. Jetzt „2 Min“ und darunter „100 W“ (55 % der Schwelle).

## Ton und Haptik, alle Trainingsansichten (29. Oktober 2026, Claude)
- Dennis: Haptik auf iOS geht nicht mehr, im Training fehlte der Ton. Im Code hatte sich nichts geändert, in Chromium kommen alle Töne und Vibrationen.
  Abgehärtet für das iPhone: `audioWake` (Ton nach Sperre/App-Wechsel wieder an, bei jedem Tippen), `iosTick` mit frischem Schalter je Klick.
  OFFEN: auf Dennis' iPhone prüfen (Einstellungen › Haptik, Training mit Ton). Am iPhone vibriert die Uhr selbst nie (Apple lässt das nicht zu).
  Falls weiter kein Ton: Stummschalter am iPhone (Web-Töne folgen ihm) und welches Gerät es war.
- Board mit allen Trainingsansichten (94 Bilder, nummeriert): https://claude.ai/artifact/PmpkPr3J2kQP2cgqguhcSk, nur EMOM: https://claude.ai/artifact/8zQWXyEYDjLEL77vpjXJkb.
  Dennis beschreibt je Nummer, was stört; Ziel: alle Ansichten vereinheitlichen. Auffällig schon jetzt: Zusatz-Ergometer und Zusatz-Lauf laufen noch nicht im
  Trainer (alte Schritt-Seite bzw. lange Lauf-Seite), Mobility-Player und Tools-Timer haben eigene Darstellungen, nach dem letzten Schritt ist der Trainer
  hinter der Cool-down-Frage leer und das Blatt ragt unten heraus.

## Trainer-Feinschliff aus dem Training (28. Oktober 2026, Claude)
- Dennis nach einem Training: Einzeln | Liste zu groß (weg unter dem Ring, jetzt Symbol im Kopf), Handstand-Zeit beim Pausieren automatisch,
  „+/–5 s“ sprang an den Seitenanfang (behoben), nach der Uhr direkt weiter (automatisch, wo nichts einzutragen ist), „nächster Punkt“ unten zu groß
  (Fuß kompakt), Stufen/Bänder im Training anpassbar (Coach-Stufe ±2). Details CLAUDE.md „Trainer-Feinschliff“.
- Danach Dennis: „auf dem Timer nicht scrollen müssen“: jeder Schritt passt bei 390 × 844 (Test prüft es); bei 360 × 740 bleiben Aufwärmen als Liste
  und Accessory mit 4 Übungen knapp drüber (rund 50 px).
- Danach Dennis: „weg von der runden Timer-Anzeige?“ Boards: vier Varianten (https://claude.ai/artifact/CEncwapwAn3XkwMTBbyV1F), Kapsel an vier Stellen
  (https://claude.ai/artifact/EnNbPiTr59GxvprNxEuYbU), drei Umrisse (https://claude.ai/artifact/9bdz8KndiXYr8J3sf12y76). Gewählt: Kapsel oben, Zeit in der Mitte,
  Umriss fein in Blau, Vorlauf ohne Text in der Kapsel. Offen: Querformat und Tools › Timer zeigen weiter den Ring.
- Zuletzt Vergleich oben | in der Karte (https://claude.ai/artifact/9ytRHHGNG1e2oDdEQuJ4UG), Dennis: „So machen wir das“ (verstanden als „in der Karte“):
  die Kapsel ist jetzt die erste Zeile der weißen Trainer-Karte. Dabei behoben: Intervalle zeigten bei laufender Uhr „Als Erstes“ statt „Jetzt“.
- Zwei Geräte zeigten verschiedene Pläne (Dennis, 28. Oktober): das zweite Gerät hatte erst den Fragebogen (Durchgang 1, von Hand gesetzt) und dann den Sync
  verbunden und so in GitHub Durchgang 2 → 1, B → A und Start 17. → 28. Oktober überschrieben (Einheiten unberührt). Schutz eingebaut (`join` in `mergeRemote`).
  Keine Reparatur der Datei im Daten-Repository (Dennis, 29. Oktober: „Du musst nichts reparieren“).
- App-Tour mit 6 Karten (überspringbar, einmal je Gerät, später Plan › Wissen), letzte Karte „Als App speichern“ je Gerät.
- Anmelden beim ersten Start (Dennis: „Name plus Token und ich bekomme den Stand von heute“; 29. Oktober: „erst Sync falls vorhanden, dann Fragebogen
  falls man nichts hat“): neues Gerät = erste Seite „Anmelden“ (`loginPageHTML`), erst „Ich bin neu“ oder ein leerer Stand führt zur Begrüßung mit Fragebogen;
  die Begrüßung behält „Ich nutze die App schon · Anmelden“. Dennis fragte, ob man das nächste Training auf heute vorziehen kann: ja, an einem freien Tag
  „Heute trainieren“ in „Für deinen freien Tag“ (nur wenn es heute passt). Ein frisches Gerät übernimmt den Stand aus GitHub ganz (vorher hätten gespeicherte Standardwerte gewonnen).
  Lokal mit Dennis' echten Daten geprüft (nachgestelltes GitHub, nichts hochgeladen): danach Heute mit „Ganzkörper B“. Test `tests/anmelden-browser.cjs`.
- Stufen-Pille im Trainer: nur der Stufenname („Körper steil“), einzeilig, wenn er passt. Lange Namen („Mit Halt (Ringe oder Türrahmen)“) erst 14 px, dann zwei Zeilen,
  nie abgeschnitten (Dennis: mit „…“ konnte man nicht mehr alles lesen; `fsStgFit`).
- Dennis: „Mir geht’s nicht gut“ war an jedem Trainingstag angehakt. Der Haken zeigte auch die eigene Kürzung des Coachs (bei Dennis der Wiedereinstieg nach
  8 Tagen Pause, noch 1 Einheit). Jetzt nur noch bei eigener Wahl; die Kürzung des Coachs steht mit Grund in einer Karte (`kurzAuto`) mit „volle Einheit“.
- Dennis: grauer Fuß bei laufender Uhr „zu viel Text, zu gequetscht“: Weiter jetzt einzeilig mit Schloss, der Hinweis „lange drücken“ kommt beim Antippen.
- Tests: `tests/dreitage-browser.cjs` (Stufenwahl, Handstand-Pause, Scrollen, automatisches Weiter); alle Tests grün.

## Mehr Zeit mit Accessory (26. Oktober 2026, Claude)
- Dennis: „Können wir auch die Möglichkeit einbauen, ein Training zu verlängern?“ Auf die Frage: „Punkt 1 (vorher ‚Ich habe mehr Zeit‘), aber vielleicht noch
  Accessory work, also Muskelgruppen, die normalerweise zu kurz kommen, wird um CrossFit oft gemacht.“ Umgesetzt: + 15 Min = Accessory (3 Übungen),
  + 30 Min = 4 Übungen, eine Kraftrunde mehr, längerer Abschluss. Details CLAUDE.md „Mehr Zeit und Accessory“.
- Test: neuer Fall in `tests/dreitage-browser.cjs`; alle Tests grün (auch Langzeit).

## Joker verdienen und selbst einsetzen (26. Oktober 2026, Claude)
- Dennis (Bild): „2 Wochen in Folge, dabei habe ich letzte Woche nicht trainiert … Wird ein Joker automatisch gesetzt? Das sollte nicht sein. Und wie
  verdient man sich überhaupt einen Joker?“ Bisher: einer je 12 Wochen, von selbst. Jetzt (seine Wahl „Verdienen, selbst einsetzen“): 4 geschaffte Wochen
  = 1 Joker, Einsetzen von Hand in Profil › Erfolge bis Sonntag der Woche danach. Seine Kette steht damit bei 0 (noch kein Joker verdient).
- Dennis danach: „Benachrichtigung beim nächsten Öffnen … Angebot, den vorhandenen Joker einzusetzen. Ist keiner vorhanden, die Benachrichtigung über den
  Riss und ein bisschen Motivation.“ Umgesetzt als Moment beim Öffnen, einmal je Woche (CLAUDE.md „Wochen-Kette“).
- Test: Wochen-Kette in `tests/dreitage-browser.cjs` neu (ohne Joker Riss, verdient, offen, eingesetzt, zu spät, Pause, Nachricht beim Öffnen).
 (26. Oktober 2026, Claude)
- Dennis (Bild „Heute bleibt frei“): „Das morgendliche Check-up führt manchmal dazu, dass man den Tab überhaupt nicht mehr nutzen kann … bringt es
  wirklich so einen großen Nutzen?“ Antwort: „Ganz weglassen“. Ursache des gesperrten Tabs war die Rückfrage nach „Heute nicht“ (`planCare`), nicht
  Guten Morgen selbst; beides ist jetzt in Plan 2 weg, Krank/Beschwerden pausieren weiter. Details CLAUDE.md „Guten Morgen ist weg“.
- Tests: neuer Fall in `tests/ausfaelle.cjs`, Guten-Morgen-Fälle in `tests/dreitage-browser.cjs` prüfen jetzt, dass keine Karte kommt; alle Tests grün.
 (26. Oktober 2026, Claude)
- Dennis (Bild): „gestern nicht trainiert und trotzdem ist heute kein Training. Dann sind zwei Trainings direkt nacheinander.“ Ursache: der gemerkte
  Plan vom 20. Oktober (Vorschau) gab Di/Mi je +50, Montag (Berufsschule bis 13 Uhr, sonst frei) blieb leer. Jetzt zählt der Bonus nur für Planungen
  dieser Woche und heute: Mo A, Mi B, Sa C. Dazu „Heute trainieren“ an freien Tagen mit Rückweg. Details CLAUDE.md „Gemerkter Plan“.
- Tests: zwei neue Fälle in `tests/ausfaelle.cjs`; `langzeit-browser` und `dreitage-browser` unverändert grün (erste Fassung „nur heute“ ließ Einheiten
  nach hinten rutschen, darum die Grenze am Wochenbeginn).

## Plan nach der Impeccable-Kritik (26. Oktober 2026, Claude)
- Dennis: „nächster Bereich“. Kritik (zwei Agenten) 25/40. P1: ausgefallener Tag zeigte „Kein Training an diesem Tag.“, „0 von 1 erledigt“ neben
  „3 Tage pro Woche“. P2: Wissen veraltet/widersprüchlich, Belastung/Erholung ohne Aussage. P3: Ziel zuerst, „Kardio locker“ als Abschlussname.
- Dennis' Antworten: alle fünf Punkte, einmal × und danach „weiter“, Belastung und Erholung als eine Zeile zum Aufklappen.
- Umgesetzt siehe CLAUDE.md „Plan nach der Impeccable-Kritik“. Tests: neuer Fall in `tests/ausfaelle.cjs`, `dreitage-browser` angepasst.
- Offen: Freigabe; danach nie geprüft: Arbeitszeiten/Kalender, Einstellungen im Detail, Fragebogen/Wiedereinstieg, Testtage, Lauf-/Ergometer-Tage,
  Blätter „Heute anpassen“/„Schmerzen“, Momente.

## Profil nach der Impeccable-Kritik (25. Oktober 2026, Claude)
- Dennis: „dann jetzt das Profil“. Kritik (zwei Agenten) 24/40. P1: 59 ohne Beschriftung und BRONZE neben Silber-Medaillen, „Als Nächstes freischalten“
  mit drei Zahlen und Ziel ohne Gerät, Verlauf als Textwand mit Jargon, Netzdiagramm mit falschem Vergleich. P2: Woche im Kopf doppelt zur Kette, sinkende
  Werte ohne Grund, Rekorde (Halte-Stufe als Wdh., leeres 1RM-Archiv, Gold/Grün-Kontrast). P3: Bereich öffnet unter dem Rand, Skill-Baum gesperrt halb
  durchsichtig, Einstellungen „Schrift für Zahlen“.
- Dennis' Antworten: die vier P1, ein Satz vom Coach oben, Gesamtwert behalten und erklären, Verlauf als Wochen-Tagebuch.
- Board https://claude.ai/artifact/X1noYNxatusLDMrFzXTN5f. Umgesetzt siehe CLAUDE.md „Profil nach der Impeccable-Kritik“.
- P1 als PR https://github.com/hohlruebe/trainingsplan/pull/131. P2/P3 danach (Dennis: „Und weiter“): Kopf wie die Kette, Grund bei sinkenden Werten,
  Rekorde in Sekunden und dunklere Farben, leeres 1RM-Archiv weg, Bereich oben, Skill-Baum gesperrt gestrichelt, Schrift für Zahlen als Kapsel, Haptik als
  Wert-Zeile, Korrigieren mit h2, „Foto“ dunkler (Details CLAUDE.md).
- Offen: Freigabe P2/P3; außerdem nie geprüft: Plan/Deine Woche, Arbeitszeiten/Kalender, Einstellungen im Detail, Fragebogen/Wiedereinstieg,
  Testtage, Lauf-/Ergometer-Tage, Blätter „Heute anpassen“/„Schmerzen“, Momente.

## Tools nach der Impeccable-Kritik (25. Oktober 2026, Claude)
- Dennis: „kümmere dich um den Tools-Tab, der ist noch nicht von Impeccable geprüft“. Kritik (zwei Agenten): 25/40, P1 Mobility-Start versteckt, 1RM als Wand aus
  „noch kein Wert“, „Als Nächstes“ auf gesperrter Stufe. P2: leere Karte im Vollbild-Timer (Tools), Familie mit doppelter Stufenliste, Kontrast gesperrter Stufen
  (1,9–3,4:1) und 28-px-Chips, Körper ohne Daten. P3: Equipment-Blatt rot, Bänder am Listenende.
- Dennis' Antworten: erst die drei P1; Körper nach Muskelausgleich einfärben; 1RM bleibt in Tools; Equipment-Blatt mit Gruppe „Hast du“ oben.
- Board https://claude.ai/artifact/R2kB1VTkkjPF27mCG9z23F. Umgesetzt siehe CLAUDE.md „Tools nach der Impeccable-Kritik“.
- PR #129 gemergt. Danach Körper nach Muskelausgleich und Equipment-Blatt „Hast du“, Board https://claude.ai/artifact/SChJQsjh1H23waLBvt3hpJ
  (Dennis' Daten: 2 Krafteinheiten in 4 Wochen, darum noch grau; das Board zeigt ein Beispiel mit einer Einheit mehr).
- PR #130 (Körper, Equipment). Danach die übrigen P2, Board https://claude.ai/artifact/5zaGxCzDoHFrozAo8mQcSZ (Dennis: „Timer lassen wie zuvor“, also nur die Familie):
  Familie ohne doppelte Stufenliste, gesperrte Stufen lesbar mit Grund, Knöpfe 44 px.
- Feinschliff, Board https://claude.ai/artifact/SPLex83FXcewWodYFbzo8d: Muskel-Seite (Zeile = Familie, (i) eigener Knopf), 1RM ohne doppeltes „+“, Mobility-Text.
- Offen aus der Kritik: Timer-Vorlagen, Sprungleiste in der Übungsliste (beides neue Funktionen, mit Dennis klären).
- Starter-Challenges (30 Tage Plank usw.) wurden gebaut und auf Dennis' Wunsch wieder entfernt (PR #128 geschlossen): „da reden wir noch drüber“.

## Wochen-Kette und neue Medaillen (25. Oktober 2026, Claude)
- Dennis: „zurück zum Motivationspart, um den User langfristig sportlicher zu machen“. Vorschlag: Wochen-Kette mit 10-Minuten-Rettung (Konzepte A + E),
  dann Monatsrückblick, Block beginnt, später Teilen. Dennis: „fang mit der Wochenkette an“.
- Boards: Vorher/Nachher https://claude.ai/artifact/9KtJMJGxBnzz95KyHR4piM, drei Darstellungen https://claude.ai/artifact/WpLfvADTuHBoHthqf2wmPh
  (Dennis: blaue Glieder gefallen nicht, Ringe „cool“), Ring-Optionen und Medaillen https://claude.ai/artifact/L7VtNGW5qZYCS9goqNLpoS (Dennis: A2 und M1),
  Medaillen mit Prägung https://claude.ai/artifact/2uvNrV7zRykQvEPQypBui1 (Impeccable 18/32; Dennis: D2 Lorbeerzweig), Symbole
  https://claude.ai/artifact/R6bFUUF9vQXVoQNV41JnP1 (Dennis: Zeichen, Kraft braucht ein anderes), Kraft-Zeichen https://claude.ai/artifact/E5rSWWRzGMBPeubvLZKVsq.
- Regel: gehalten ab zwei Dritteln des eigenen Ziels (Dennis: „an das persönliche Ziel geknüpft“), Joker von selbst, Rettung 15 Min (kürzeste Stufe, die
  der Coach schon baut). Umgesetzt siehe CLAUDE.md „Wochen-Kette“ und „Medaillen neu“.
- Im selben PR (Dennis: „Ja, perfekt“): Plan & Challenges ohne Allround-Karte, Trainingstage oben, Dein Plan mit Karte „Dein Ziel“,
  Board https://claude.ai/artifact/Qjt5tzLauHHZdwMeULggG5.
- Offen: Kraft-Zeichen wählen (Entwurf: Langhantel, `KRAFT_SYM.lang`; Kurzhantel und Gewicht liegen bereit); Monatsrückblick, Block beginnt, Teilen.

## Guten Morgen ohne Schlafstunden (25. Oktober 2026, Claude)
- Dennis: die Eingabe „Geschlafen 9 h“ raus, sie „gibt usern eher eine Ausrede als einen Nutzen“. Die Schlafzeiten in den Arbeitszeiten (Ins Bett/Aufstehen) bleiben.
- Entfernt: Schlaf-Kachel mit – / + (`mg-h`), „Laut Plan waren etwa …“, Stufe 3 mit „Heute frei nehmen“ (`mg-off`), Satz „Wenig Schlaf und erschöpft“,
  Schlaf-Faktor × 1,25 in der Zonen-Erholung, `morgenSleep`, `fmtH`, CSS `.mg-tile`. Platt = Kurzversion, Müde = locker, wie bisher. Alte Einträge mit `h` bleiben.
- Tests: Guten-Morgen-Prüfungen im Browser-Test auf „nur Gefühl“ umgestellt.
 (25. Oktober 2026, Claude)
- Dennis: „schau dir jetzt die Trainingsansichten innerhalb der App an“. Kritik mit seinen Daten (Sa 24. Okt., Ganzkörper A): 22/40,
  Board https://claude.ai/artifact/VDawHexGmXDQnzyT1HKVse. P0: „Weiter“ stoppte ein laufendes EMOM still. P1: Liste verrutscht, Zähler traf die falsche Minute,
  kein Schmerzen-Knopf, Querformat mit 8,5-px-Texten. P2: Kopf abgeschnitten, Speichern ohne Kardio ohne Warnung, Ende mit Ausfall-Zeile.
- Dennis' Antworten: Fehler zuerst, „Weiter erst nach der Uhr“ (lang drücken überspringt), alle sechs Punkte. Entwurf: https://claude.ai/artifact/KLFWj56UeUgCcgZCWadbji
- Dennis danach: in der Liste nichts abhaken, das Ergebnis wird danach eingetragen („Erledigt“ in der Liste entfernt).
- Umgesetzt siehe CLAUDE.md „Trainer neu sortiert“. Tests: Browser-Test mit Prüfungen für Zähler, Sperre, Schmerzen-Knopf und die Nachfrage beim Speichern.
- Offen: Freigabe für den PR; „Grafik folgt“ bei Handstand/Kardio bleibt, bis die Grafiken da sind; quer passen „Als Nächstes“ und die Rundenpunkte noch nicht in die Karte;
  „Trotzdem speichern“ trägt den Abschluss weiter mit den geplanten Minuten ein.

## Heute neu sortiert (24. Oktober 2026, Claude)
- Dennis: „schau dir jetzt den home tab an“. Impeccable-Kritik mit seinen Sync-Daten (Sa 24. Okt. 8:30): 27/40, Board https://claude.ai/artifact/LUaYAPCUmMJ7rzcYCqm5wX.
  Hauptbefunde: Start bei 1.360 px, drei Fragen hintereinander, Wochenleiste „Frei“ für ausgefallene Tage, Guten Morgen mit Vorwahl „Okay“, Kleinkram.
- Dennis' Antworten: Training nach oben, Ausfall annehmen und kurz sagen, alle fünf Punkte. Entwurf in der echten App: https://claude.ai/artifact/AoxfQcEoeWHYrMDHeMY1Fa
- Umgesetzt (siehe CLAUDE.md „Heute neu sortiert“): Start bei 668 px, Ausfall-Zeile mit „Stimmt nicht“, Guten Morgen mit einem Tippen, „A ×“ in der Leiste, Neu-Knopf am Schritt,
  Zähler 44 px. Detektor auf der Seite: hell 1 statt 10, dunkel 3 statt 11 Funde. Tests angepasst (Guten Morgen, Neu-Knopf, neuer Test „Ausfall angenommen“).
- Offen: Freigabe von Dennis für den PR; Plan 1 fragt weiter vor dem Tag; die Kritik liegt in `.impeccable/critique/`.

## Schwerpunkt als Karten, Impeccable-Audit (24. Oktober 2026, Claude)
- Dennis: Impeccable laufen lassen, dann „ja bau es um“ nach dem Board https://claude.ai/artifact/5MbvhrubvHqo7a15xS8e1r (Vorher/Nachher hell und dunkel).
- Audit „Plan & Challenges“: 18/20. Befunde: Schwerpunkt war ein Umschalter, `DESIGN.md` verlangt Auswahl-Karten; Umschalter 42 statt 44 px;
  einzelne Wörter in der letzten Zeile. Kontrast des Chips „Aktiv“ nachgemessen 4,9 : 1 (hell) bzw. 5,4 : 1 (dunkel), passt.
- Umgesetzt: Schwerpunkt als Karten (Keiner, Kettlebell; Platz für CrossFit und Hyrox) direkt unter der Allround-Karte, danach „Worauf trainierst du?“
  und die Challenges. `.seg-btn` überall mindestens 44 px. `text-wrap: pretty` für Untertitel und Erklärtexte.
- Impeccable in der Cloud-Sitzung: Kontext lädt, der Detektor braucht `IMPECCABLE_BROWSER` mit einem Chromium-Wrapper (`--no-sandbox`, als root).
  Der Detektor über `index.html` meldet nur Bekanntes: Geist (in `DESIGN.md` festgelegt), Schraffur der gesperrten Zeiten (gewollt), Leuchten/Halo der Momente.
- Offen: Dennis' zwei Fragen aus dem Board blieben ohne Antwort (Stichworte unter Kettlebell, „Keiner“ als eigene Karte); umgesetzt wie im Entwurf.

## Impeccable eingerichtet (24. Oktober 2026, Claude)
- Dennis: `$impeccable init`, dann `hooks on`, Installation im Projekt und `doctor`.
- Neu: `PRODUCT.md` (Produkt-Wissen für Design-Arbeit: Nutzer, Kern, Regeln, Grundsätze; aus `CLAUDE.md`, `AGENTS.md`, `DESIGN.md` und
  Dennis' Antworten: zuerst Dennis, später andere; Kern = Coach entscheidet, plant um den Schichtdienst, offline ohne Konto).
  `DESIGN.md` bleibt unverändert und verbindlich.
- Impeccable liegt im Projekt unter `.claude/skills/impeccable/` (dazu `.claude/agents/impeccable-*`), Einstellungen in `.impeccable/config.json`
  (Design-Hook an). Die Programmdatei (`scripts/bin/`, 16 MB) und `.claude/settings.local.json` mit den Hooks sind in `.gitignore`;
  auf einem anderen Gerät lädt der Launcher die Programmdatei beim ersten Aufruf, die Hooks kommen mit
  `.claude/skills/impeccable/scripts/impeccable hooks on` dazu.
- Kein Teil der App: nicht in `sw.js`, `CACHE` unverändert.
- Offen: `doctor` meldet, dass `DESIGN.md` keine Abschnitte zu Farben, Schrift und Bausteinen in Impeccable-Form hat. `$impeccable document`
  könnte sie aus dem CSS ergänzen, nur mit Dennis.

## Schwerpunkt Kettlebell (24. Oktober 2026, Claude)
- Dennis: „können wir beim Allround-Plan Trainingsschwerpunkte legen? Z. B. Kettlebell, CrossFit, Hyrox?“, dann „leg los“.
- Konzept: ein Schwerpunkt färbt Allround ein. Aufbau, Blöcke, Tests und Stufen bleiben gleich. Einstellung in Plan & Challenges › Schwerpunkt
  (Keiner | Kettlebell, `S.schwerpunkt`, synchronisiert).
- Kettlebell, nur wo am Ort eine Kettlebell ist (`spKb`):
  - Im Kraftteil bekommen Leitern, deren Stufe hier mit Kettlebell geht, 10 Punkte Bonus (`SP_BONUS`, `kbLad`). Zum Beispiel nimmt die Hüfte den Swing statt Deadlift,
    sobald die Voraussetzung (Glute Bridge „Einbeinig“) da ist. Hinweis: „X statt Y: dein Schwerpunkt ist Kettlebell.“ (`why: 'fokus'`).
  - Im Metcon kommen Kettlebell-Übungen zuerst; statt Kardio steht ein Swing oder Clean im Metcon, im Rumpf auch Rotation (Halo, Around the World).
  - B endet immer mit dem Metcon. Hat Dennis eine Challenge, hat das Ziel beim Abschluss Vorrang.
  - Ohne Kettlebell am Ort trainiert er wie sonst, Hinweis in der Coach-Karte.
- Offen: Skill-Block mit Turkish Get-up/Windmill im Wechsel, Snatch-Test (100 in 5 Min) in der Testwoche, Gewichtsschritte der eigenen Kettlebell,
  danach die Schwerpunkte CrossFit und Hyrox. Die Kettlebell-Grafiken (Runde 1) warten weiter auf Freigabe.

## Eine oder zwei Kettlebells, weitere Übungen, Grafiken Runde 1 (23. Oktober 2026, Claude)
- Dennis: „noch mehr Kettlebell-Übungen, zwischen einer und zwei Kettlebells auswählen, dann mit den Animationen anfangen“.
- Auswahl: im Equipment-Blatt unter „Kettlebell“ der Umschalter Eine | Zwei und der Schalter „Verstellbar“ (statt eigener Zeilen). Zwei = Gerät `eq_kb_paar`.
- 13 neue Übungen (8 mit zwei Kettlebells, 5 mit einer), alle mit Anleitung, Normen, Rx, 10 im Metcon-Pool. Bibliothek jetzt 415 Übungen.
  Zu Hause mit zwei Kettlebells nimmt der Coach in B die Gorilla Row und in C Dumbbell Row statt Table Row im Tempo; im Metcon stehen 22 Kettlebell-Übungen zur Wahl.
- Grafiken Runde Kettlebell: 20 Animationen in `design/maskottchen/maskottchen.js`, Board im Canvas: https://claude.ai/artifact/9v1pkgmVa2wTgAKosuM2Rz
  (hell/dunkel). Nachgemessen: Kontakte halten, Kniebeugen below parallel, Kugel setzt am Boden auf. **Offen: Freigabe von Dennis**, danach Kopie nach
  `index.html` (`<script id="maskottchen">`), bis dahin zeigt die App für Kettlebell-Übungen weiter „Grafik folgt“.
- Dennis (24. Oktober): „Kettlebell Swing american oder russian? … benenne die Übung richtig, Russian und American jeweils als Variation“.
  `g_kb_swing` heißt jetzt „Russian Kettlebell Swing“ (Stufen- und Leitername bleiben gespeichert, nur angezeigt neu), American Swing hat eine Grafik
  im Board (jetzt 21).
- Offen danach: Runde 2 (Single-Arm Swing, Farmer's/Suitcase/Overhead/Front Rack Carry, Goblet BSS, Cossack, Pullover, Bottoms-up, Seesaw,
  Thruster, Step-up, Figure 8, Around the World, Plank Pull-Through, Double Clean, Rack Lunge, Dumbbell Row, Turkish Get-up, Windmill, Single-Arm Press).
  Gewichtsschritte der eigenen Kettlebell (2 oder 4 kg) kennt der Coach noch nicht.

## Mehr Kettlebell, verstellbare Kettlebell (22. Oktober 2026, Claude)
- Dennis: „mehr Kettlebell-Übungen, damit lässt sich zu Hause eine riesige Variation umsetzen, vor allem mit einer verstellbaren Kettlebell“.
- Bestand: 30 Übungen gingen mit Kettlebell, echte Kettlebell-Klassiker fehlten. Zu Hause nur mit Kettlebell endeten die Leitern bei Goblet Squat bzw.
  Dumbbell Press (nächste Stufe Langhantel) und der Coach wich auf Tempo oder Band Squat aus, obwohl das Gewicht hätte wachsen können.
- Neu: 15 Übungen mit Anleitung (Front Squat, Suitcase Deadlift, Glute Bridge, Push Press, Bottoms-up Press, Halo, Pullover, Goblet Reverse Lunge,
  Goblet Bulgarian Split Squat, Goblet Cossack Squat, Clean and Press, High Pull, Around the World, Figure 8, Plank Pull-Through), 8 davon im Metcon-Pool.
  Zu Hause mit Kettlebell stehen im Metcon jetzt 12 statt 4 Kettlebell-Übungen zur Wahl. Floor Press und Push Press auch mit Kettlebell.
- Gerät „Kettlebell (verstellbar)“: zählt als Kettlebell; damit steigert der Coach Goblet Squat & Co. über das Gewicht statt auf Tempo zu wechseln.
  Test in `tests/dreitage-browser.cjs` (feste Kettlebell: keine Kniebeuge-Leiter mit Goblet; verstellbar: Goblet Squat ohne Tempo).
- Offen: Grafiken (Maskottchen) für die 15 neuen Übungen (zeigen „Grafik folgt“). Gewichtssprünge der eigenen Kettlebell (z. B. 2 oder 4 kg) kennt der
  Coach noch nicht, er empfiehlt in 2,5- bzw. 5-kg-Schritten.

## Ausfall nicht mehr aufs Wochenende gequetscht (22. Oktober 2026, Claude)
- Dennis (Screenshot Do 22.): „Ich habe einen Tag Training ausfallen lassen, bis zum Ende der Woche wäre noch genug Zeit, aber es wird einfach ans Ende
  gequetscht.“ Heute frei, Sa A, So B, C fiel weg.
- Nachgestellt mit seinem echten Stand (Sync-Datei) und seinem Kalender: A war auf Mi verschoben und fiel aus („keine Zeit“), heute „Erholt“.
  Ursache: Frühdienst 6–14 + 1 h Heimweg, Schlaf laut Kalender ab 20:15. Die festen Abstände (1,5 h nach der Arbeit, 3 h vor dem Schlafen, 2 × 15 Min Weg)
  brauchen 5,4 h, frei waren 5 h; Fr nach der Küche fehlten 5 Min. Also blieben nur Sa und So.
- Jetzt: passt eine Einheit mit den üblichen Abständen nicht, plant der Coach knapper (1 h nach der Arbeit, 2 h vor dem Schlafen) statt den Tag zu verlieren,
  mit Grund am Termin. Ergebnis für diese Woche: Do 17:00 A, Sa B, So C. Wo es mit den üblichen Abständen geht, ändert sich nichts.
- Test in `tests/dreitage.cjs` (schlägt mit dem alten Stand fehl). Der Paket-64-Test hatte morgens 2,5 h frei, dort passt jetzt die ganze Einheit statt der
  gekürzten; der Termin im Test beginnt darum um 8 statt 9 Uhr.
- Nebenbei gesehen, nicht geändert: die Uhrzeit von heute bleibt im Plan, auch wenn sie schon vorbei ist (z. B. um 21 Uhr „heute 17:00“).

## Prüfung 2 der Trainingsplanung (21. Oktober 2026, Claude)
- Dennis: „Wie kannst du den fehlerhaften Test beheben? Findest du andere Fehler? Das A und O ist die Trainingsplanung, die muss optimal funktionieren.“
- Test: Nach „Speichern“ legt die App den Eintrag mit kurzer Verzögerung an (`setTimeout` in `rpeThen`); der Test wartete auf „mehr als 0 Einträge“, die
  Testdaten haben aber 7. Behoben in #115 (wartet auf den neuen Eintrag).
- Neue Simulation mit realistischem Athleten (Fähigkeit je Leiter wächst langsam, schwere Stufen gehen schlechter, Runden werden müde, Maxout = alles):
  1. Feste Vorgaben („10 pro Runde“: Ring Row, Air Squat, Pike, Lunge, Hollow u. a., 9 Leitern) hatten keine Spanne: Stufe schon bei 6 von 10. Jetzt `rangeOf` mit `fix`.
  2. Haltestufe in Wdh.-Leiter („Support Hold, 20 s“): Sekunden mit 3–6 Wdh. verglichen, 7 s galten als oben. Jetzt `stageRange`.
  3. Umfang wuchs mit echter Leistung nie (jede Einheit einzeln ≥ 75 % verlangt). Jetzt im Schnitt 70 % über 2 Wochen.
  4. „Mehr Mühe als sonst“ war fest gezählt (fast jedes vierte Mal). Jetzt gegen den eigenen Schnitt.
  5. Rauf-runter: eine neue Stufe flog nach der ersten holprigen Einheit wieder raus. Jetzt zweite Chance.
  6. Metcon-Leitern (Thruster, V-up) konnten in den Kraftteil kommen (im Gym nach Stillstand Thruster ab „Air Squat“). Jetzt ausgeschlossen.
  7. Übergang Goblet Squat 32,5 kg → Front Squat 62,5 kg (Normen zu niedrig). Jetzt 40 kg.
- Ergebnis Simulation zu Hause, 26 Wochen: Runden unter der Vorgabe 37 % → 23 %, Umfang wächst wieder (4 → 12), keine Dauer-Kurzversion.
- `tests/langzeit-browser.cjs` um den realistischen Athleten und eine Datenprüfung erweitert; mit dem alten Stand schlägt er fehl.
- Offen: Simulation ist ein Modell. Dennis' echte Rückmeldung im Training ist wichtiger (fühlen sich Aufstiege und Vorgaben richtig an?).

## Muskel-Bilder, seitliche Schulter und Abduktoren (21. Oktober 2026, Claude)
- Dennis nach dem Merge der Prüfung: „kümmer dich jetzt um die restlichen Sachen“ = die offenen Ideen aus „Körper unter Tools“.
- Muskel-Bilder (`musChipsHTML`): im (i) jeder Übung „Trainiert vor allem“ mit Stand bei dir, in der Karte Muskelausgleich „Kommt zu kurz“ mit % vom Soll.
  Tippen öffnet die Muskel-Seite, Zurück führt zurück; im Training nur ein Hinweis (kein Sprung aus dem Training).
- Zu Hause (Ringe, Band, Alltag) hatte die seitliche Schulter nur Band Lateral Raise (und Shoulder CARs), die Abduktoren 3 Übungen. Neu: Cross-Body Band Lateral Raise,
  Band Y-Raise, Doorframe Lateral Raise Hold, Side-Lying Hip Abduction, Fire Hydrant (Muster Isolation, also für Ausgleich, nicht im Kraftteil).
  Eingebaut über `einbauen_bibliothek.js`; das Paket liegt als `pakete/neu_isolation_2.json` (das alte `neu_isolation.json` bleibt). Ohne Grafik (Platzhalter).
- Test: der Speicher-Test in `dreitage-browser` wartete auf „mehr als 0 Einträge“, obwohl die Testdaten schon 7 haben (Wettlauf, 2 von 6 Läufen rot). Jetzt
  wartet er auf den neuen Eintrag.
- Offen: Grafiken für die 5 neuen Übungen (Maskottchen, Runde im Canvas).

## Prüfung der Trainingsplanung (21. Oktober 2026, Claude)
- Dennis: „Überprüfe, ob unsere Trainingsplanung wirklich gut funktioniert … eine umfassende Bugprüfung“, danach „korrigiere das“.
- Geprüft: Daten (Leitern, Stufen, Geräte, Familien, Voraussetzungen: sauber), Simulation der echten App Tag für Tag (zu Hause, Gym, 2/3/5 Tage,
  Leistung voll/gemischt/schwach, bis 26 Wochen), Code der Planung.
- Gefunden und behoben:
  1. „Härter als geplant“ verglich die Einschätzung mit dem Zeitschnitt der Schritte (≈ 4,8): jede 6 löste es aus, ab der 3. Einheit nur noch Kurzversion,
     Umfang wuchs nie. Jetzt „Härter als sonst“ gegen die eigenen letzten Einschätzungen; geplante Belastung neu kalibriert (`stepsLoad`, `logSoll`).
  2. Stillstand verglich die Summe der Wdh. über verschieden viele Runden (Entlastung, Kurzversion, Spitze): Tausch selbst bei voller Leistung. Jetzt je Runde
     gegen die Vorgabe.
  3. Leitern warteten ewig auf ein fehlendes Gerät (Push-up zu Hause auf Parallettes; ohne Weste Air Squat, Pike, Ring Row, Lunge). Jetzt Stufen ohne Gerät
     überspringen (`nextStage`), oben bzw. in der Sackgasse über Tempo weiter; Tausch-Ziel zuerst eine Leiter mit Luft.
  4. Im Split wurde der Pull-Tag nach Push jede Woche gekürzt (müde Zonen, die heute gar nicht dran sind). Jetzt zählen nur Zonen der Einheit.
  5. Keine Gewichtsempfehlung für Goblet Squat, Kettlebell Deadlift u. a. (fehlende Normen). Ergänzt.
  6. Ausgleich und Skill-Block wurden ohne Antippen nicht gespeichert. Jetzt zählt die Vorgabe (Skill mit `d: 1`, kein Rekord/Signal).
  7. Zügig gehen wuchs bis 36 Min. Jetzt höchstens 20 Min.
  8. In der Testwoche konnte eine neue Stufe kommen (Maxout auf ungewohnter Stufe). Jetzt bleibt die Stufe.
  9. Hollow Body „30 s sauber“ gab 20 s vor; Push-up-Ziel „an Tag 3“ (Altlast).
- Neu: `tests/langzeit-browser.cjs` (8 s). Mit dem alten Stand schlägt er fehl (22 von 24 Einheiten Kurzversion).
- Offen: Dennis testet. Danach beobachten, ob „Härter als sonst“ (≥ 8 und +2) im Alltag passt.

## Körper unter Tools (21. Oktober 2026, Claude)
- Dennis zeigte Muskel-Icons von Gymjourneys „zur Orientierung“. Konzept im Canvas mit Varianten (Übersicht A Raster, B Figur antippen, C Liste;
  Muskel-Seite M1/M2; Bild-Stile S1–S4). Dennis: B, dann drei B-Varianten; „aufpassen, dass man beim Hoch- und Runterwischen nicht aus Versehen einen
  Muskel öffnet“; S3 gefällt; gewählt B2 „aber zeige wirklich den ganzen Körper“.
- Umgesetzt: siehe CLAUDE.md „Muskeln in der Bibliothek“. Statt Doppeltippen: Tippen wählt aus, „Öffnen“ öffnet (Doppeltippen ist unsichtbar und stört das Zoomen).
  Bilder aus der eigenen Figur (19 Muskelgruppen), keine fremden Grafiken.
- Geprüft: `tests/dreitage-browser.cjs` (ganzer Körper im Bild, Wischen wählt nichts, Antippen Brust, Öffnen, Ort | Alle, (i)), alle übrigen Tests.
- Dennis danach: „Die Beine sind immer noch nicht komplett drauf“ und „das Umschalten zwischen Mustern und Muskeln gefällt mir nicht“. Jetzt eigene Seite
  Tools › Muskeln, Höhe der Figur nach dem Zeichnen gemessen (`musFit`), getestet auch mit großer Schrift.
- Dennis danach: „Statt Muskeln, Körper, und es fehlt immer noch alles unterhalb der Knie sowie die Füße. Kannst du es außerdem so angedeutet in 3D machen?“
  Seite heißt jetzt „Körper“ (interne ID bleibt `muskeln`). Figur neu bis zu den Füßen (viewBox 480: Wade, Knöchel, Fuß, hinten Achillessehne und Ferse),
  dazu ein schwacher Verlauf über jeder Fläche. Gilt für alle Figuren (Körper-Check, Muskelausgleich, Beschwerden, Grundmuster).
  Dennis: „nur ganz leicht angedeutet und näher am Original“: Verlauf deutlich schwächer, ohne Boden-Schatten und ohne eigene Fuß-Flächen.
  Dann: „nur an der Form der Muskeln ganz leicht angedeutet“: Verlauf nur noch über den Muskeln, Ränder 7–8 % dunkler.
  Dann: „orientiere dich an den Screenshots (Gymjourneys), damit es organischer und nicht so klinisch aussieht“: alle Muskeln neu als Blattformen,
  die den Körper fast ganz füllen (Brust als Fächer zur Achsel, Bauch als Kissen, Oberschenkel als Spindeln, Wade mit zwei Köpfen und Soleus, Schulterblatt, Flanke).
  Namen der 19 Muskelgruppen bleiben, nur Füllteile mit „_“ sind neu.
- Erledigt (siehe oben): Muskel-Bilder im (i) und in der Muskelausgleich-Karte, Übungen für die seitliche Schulter zu Hause.

## Trainingstage nur über ein Blatt (21. Oktober 2026, Claude)
- Dennis (Screenshot Plan › Deine Woche): „Die Änderung der Anzahl der Trainingstage geht zu leicht, manchmal passiert das aus Versehen, außerdem sollen
  die gewählten Tage auch für die nächsten Wochen gelten.“
- Umgesetzt: Wert-Zeile „Trainingstage · 3 pro Woche“ mit „Gilt für alle Wochen.“, der Regler sitzt im Blatt, „Übernehmen“ setzt, Abbrechen ändert nichts.
  `S.tage` galt schon für alle Wochen (eine Zahl, synchronisiert); das Blatt sagt es jetzt ausdrücklich, und die Zeile steht in jeder Woche gleich.
- Geprüft: `tests/dreitage-browser.cjs` (kein Regler auf der Seite, Abbrechen ändert nichts, Übernehmen 5, nächste Woche ebenfalls 5 Einheiten), alle übrigen Tests.

## Kalender als einzige Quelle (21. Oktober 2026, Claude, Paket 64)
- Dennis: „im Moment kann man trotzdem noch Früh- und Spätschicht eingeben, obwohl die Kalender-Integration in der App ist. Alle Termine, egal wie sie
  heißen, blocken die Zeit fürs Training, ich pflege meinen Kalender sehr gut, auch Schlaf. Herausfinden, wie viel Zeit am Tag übrig ist, und das
  Training in die freien Stellen planen.“
- Umgesetzt: siehe CLAUDE.md „Kalender als einzige Quelle“. Schlaf wird ohne Titel an der Uhrzeit erkannt (die Brücke schickt keine Titel, darum kein
  Update der Brücke nötig). Ein kurzer Mittagsschlaf unter 3 h zählt als normaler Termin (ohne Abstand davor und danach).
- Kein Konzept-Board vorab: Dennis wollte direkt weitermachen, es ist vor allem Logik. Screenshots im PR-Text bzw. in der Antwort.
- Geprüft: `tests/dreitage.cjs` (Schlaf aus dem Kalender, Annahme in Nächten ohne Eintrag, 60 Min in der einzigen Lücke, keine Zeit an einem vollen Tag,
  keine Schicht außerhalb des Zeitraums), `tests/dreitage-browser.cjs` (keine Schicht-Eingabe mit Kalender, freie Zeit je Tag, Schlaf Sa 1–9 Uhr), alle übrigen Tests.
- Zurückgestellt: Wochen-Kette mit 10-Minuten-Rettung (Motivation A + E). Entwurfsbilder liegen im Scratchpad, noch nicht im Canvas, Dennis hat sie nicht gesehen.
- Offen: Dennis testet mit seinem echten Kalender (erkennt der Coach jede Schlaf-Eintragung?).
- Im selben PR (Dennis mit Screenshot): Zuhause stand „Thruster“, das (i) zeigte „Air Squat“. Das (i) war richtig (Stufe 1 der Thruster-Leiter ist
  der Air Squat), aber die Leiter geht zuhause ohne Wall Ball/Hantel nicht weiter. Jetzt: Sackgassen-Leitern meidet der Coach (`ladRoom`, `why: 'weiter'`),
  neue Leiter Band Squat (Dennis: „Variationen mit den Widerstandsbändern“), Stufen-Übung wird mit ihrem Namen angezeigt (`kShow`). Weitere Band-Varianten
  (z. B. Band Row, Band Press) wären ein nächster Schritt, wenn Dennis sie möchte.

## Blöcke Aufbau, Kraft, Spitze (19. Oktober 2026, Claude, Paket 63)
- Dennis: 1. „ja“ zu Aufbau/Kraft/Spitze, 2. mit Challenge „wir machen das, was nötig ist, um auf das jeweilige Ziel bestmöglich hinzuarbeiten“,
  3. „Hinweis kann auch dauerhaft irgendwo in klein stehen“.
- Umgesetzt: siehe CLAUDE.md „Blöcke“. Abweichungen vom Konzept: Spitze = eine Runde weniger und kurzer intensiver Abschluss (keine „letzte Runde
  so viele wie möglich“); der Kraft-Block wirkt nur auf Gewichtsübungen; Erhalt nur bei Lauf-/Rad-Challenges. Kein eigener Satz auf Heute, nur der
  Abschnittsname im Kopf und der Chip im Plan.
- Geprüft: `tests/dreitage-browser.cjs` (Kopf „· Kraft“ in Durchgang 5, Aufbau in 2, Spitze in 10 mit weniger Kraft-Minuten und Intervallen,
  Erhalt mit Lauf-Challenge), alle übrigen Tests.
- Offen: Dennis testet. Danach weitere Ziele (Hyrox, CrossFit, Marathon) als Challenges.

## 2 bis 6 Trainingstage (19. Oktober 2026, Claude, Paket 62)
- Erste Fassung (Hybrid: Zusatztage Ausdauer locker, intensiv, Beweglichkeit) wieder ersetzt. Dennis: Schieberegler statt Auswahlblatt, „was dahinter
  steht entscheidet der Coach, kurze Info reicht“; keine getrennten Wege Hybrid/Kraft, „Worauf trainierst du?“ (Challenges) bleibt wie bisher;
  „ab 4 Tagen direkt auf den Split und eine kurze Kardio-Session hinten dran“, Training 20–90 Min, langsam steigern.
- Umgesetzt: siehe CLAUDE.md „2 bis 6 Trainingstage“. Blockperiodisierung (Aufbau/Kraft/Spitze) und weitere Wege (Marathon, Hyrox, CrossFit) sind nicht
  gebaut; das Board „Wege und Blöcke“ im Canvas ist damit überholt. Untergrenze bleibt Umfangsstufe 0 = 25 Min.
- Geprüft: `tests/dreitage.cjs` (Muster je Tagezahl, Wegfall), `tests/dreitage-browser.cjs` (Schieberegler, Wochenziel, Split mit kurzem Abschluss,
  2 Tage mit vierter Übung, Planer meidet müde Beine), alle übrigen Tests.
- Offen: Dennis testet.

## Ermüdung je Körperzone (19. Oktober 2026, Claude, Paket 60)
- Reihenfolge mit Dennis: erst 60, dann 62 (2–6 Tage), dann 63 (Ziele). Im Canvas wählte er Z1 (Karte mit Figur), dann aus vier Varianten
  Z1d (Figur vorn, Ringe je Zone). Wichtig: „der Coach-Tab soll nicht zu voll werden“ → Karte nur in Plan › Deine Woche, auf Heute nur ein Satz,
  wenn der Coach etwas ändert. Kürzen: „ja darf er, wenn er es für nötig befindet“.
- Umgesetzt: siehe CLAUDE.md „Ermüdung je Körperzone“. Grenzen (0,4 / 0,8), Halbwertszeiten und Gewichte sind Startwerte.
- Geprüft: `tests/dreitage-browser.cjs` (schwerer Beintag Montag → Mittwoch Satz auf Heute, Karte Erholung, Rückweg „Doch volle Runden“,
  Nordic Curl Runde 4 frei und gespeichert ohne Wert, Abschluss Ergometer locker), alle übrigen Tests.
- Nicht automatisch getestet: zwei müde Zonen (Kurzversion) und Muskelkater aus dem Körper-Check.
- Offen: Dennis testet.

## Zeit unter Spannung statt fehlender Last (19. Oktober 2026, Claude, Paket 61)
- Dennis wählte im Canvas T3 (Leiste Runter | Halten | Hoch, live) „mit Ton und Vibration, aber auch abschaltbar“.
- Umgesetzt: siehe CLAUDE.md „Zeit unter Spannung“. Fehlt am Ort das Gerät der Stufe, nimmt der Coach die Stufe darunter mit Tempo
  (3·1·1 bzw. 4·1·1, dann 5·2·1, dann 1½ Wdh.); ein Muster ohne Gerät fällt nicht mehr weg (Körpergewichtsübung mit 4·1·1). Tempo-Einheiten
  ändern die eigentliche Stufe nicht. Ton und Vibration: Knopf an der Leiste und Einstellungen › Mehr › Tempo (nur auf dem Gerät).
- Geprüft: `tests/dreitage-browser.cjs` (Stufe darunter, Ersatz statt Wegfall, Steigerung, Stufe bleibt zu Hause, Taktgeber live mit
  Wdh.-Zähler, Ton aus, `tpo` im Eintrag, Schalter in den Einstellungen), alle übrigen Tests.
- Bekannt, nicht Teil des Pakets: der Ersatz für „Zug vertikal“ ohne jedes Gerät ist die Prone Y-T-W Raise (nach Nutzen aus der Bibliothek).
- Offen: Dennis testet.

## Guten Morgen und Körper-Check (19. Oktober 2026, Claude, Paket 59)
- Erste Fassung (mehr Anlässe für Erholt | Müde | Sehr müde) gefiel Dennis nicht („Aussehen und Möglichkeiten“). Neu nach Varianten im Canvas,
  gerendert mit echten App-Bausteinen: Dennis wählte S3 (Schlaf-Zähler, Gefühl-Kapsel) und K1 (Muskeln auf der eingebauten Figur antippen).
  „Guten Morgen kann jeden Tag kommen.“ Ruhepuls und Tracker bleiben draußen.
- Umgesetzt: siehe CLAUDE.md „Guten Morgen und Körper-Check“. Körper-Check vor jedem Krafttraining (Dennis hat das nicht ausdrücklich
  entschieden; mit „Alles gut? Einfach weiter“ ist es ein Tipp). Grenzen 5 h / 6 h sind Startwerte.
- Geprüft: `tests/dreitage-browser.cjs` (Guten Morgen nach Nachtdienst: Kurzversion, heute frei, Ändern; Anlass-Chips; Körper-Check Kater →
  Schmerz → gut, Ersatz an der Übung), alle übrigen Tests. In den Browser-Tests gilt „Guten Morgen“ als beantwortet, außer der Test setzt `morgen`.
- Offen: Dennis testet; danach Paket 61 (Zeit unter Spannung), 60, 62, 63.

## Leistung als Signal (19. Oktober 2026, Claude, Paket 58)
- Dennis: „Der Coach soll selbst aktiv werden und evtl. kürzen, er soll den richtigen Trainingsreiz selbst ermitteln.“ Darum kürzt der Coach ohne
  Nachfrage, Rückweg „Ich fühle mich fit, volle Einheit“ in Heute anpassen.
- Umgesetzt: siehe CLAUDE.md „Leistung als Signal“. Grenzen (2 Runden, 6 %, 25 %, 15 %) sind Startwerte.
- Geprüft: `tests/dreitage-browser.cjs` (Signal → kürzer, Rückweg, Zurücksetzen), alle übrigen Tests, Screenshots.
- Offen: Dennis testet; danach Paket 59 (Bereitschaft nur bei Anlass, optional Ruhepuls).

## Belastung: „Wie hart war’s?“ (19. Oktober 2026, Claude, Paket 57)
- Ausgangspunkt: Dennis’ Konzept „adaptive Hybrid-Trainingsapp“ (State Engine, Readiness, 2–6 Tage, Ziele). Entscheidung: Ausbau in Paketen statt Neubau,
  keine Tracker-Schnittstelle (Web-App kommt nicht an Health Connect), keine ausgedachten Scores. Fahrplan:
  57 Belastung → 58 Leistung als Signal (Vorgabe verfehlt, Puls bei gleichem Tempo, Haltezeit) → 59 Bereitschaft nur bei Anlass (+ optional Ruhepuls)
  → 60 Ermüdung je Zone → 61 Zeit unter Spannung statt fehlender Last → 62 2–6 Tage → 63 Ziele mit Blockperiodisierung; später evtl. Tracker-Brücke.
  Jedes Paket einzeln, App funktioniert dazwischen, der Coach bremst nur.
- Dennis: Regler 1–10, Belastung nur in „Deine Woche“, gestrichelt = was der Coach plant, grün im Rahmen, rot darüber.
- Umgesetzt: siehe CLAUDE.md „Belastung“. Startwerte (Härte je Schritt, 15 %) sind Festlegungen, bei Bedarf mit Dennis anpassen.
- Geprüft: `tests/dreitage.cjs` (geplante Belastung), `tests/dreitage-browser.cjs` (Regler, Eintrag, Karte), alle übrigen Tests.
- Offen: Dennis testet; danach Paket 58.

## Training immer im Vollbild (18. Oktober 2026, Claude, Paket 56)
- Dennis: Ansichten im Training unübersichtlich; immer automatisch ins Vollbild, ein kleines (i) mit der Durchführung, Umschalter Übung für Übung |
  Liste (Whiteboard), vorher Hinweis „Diese Übungen machst du heute zum ersten Mal“. Antworten: zuletzt gewählte Ansicht gilt überall; neue Stufen
  bekannter Übungen zählen auch als neu.
- Umgesetzt: Trainer `FS.train` für Plan-2-Krafttage, `S.fsView`, (i) mit Figur und Schritten, Karte „Heute zum ersten Mal“. Testtage, Murph und
  Lauftage bleiben wie bisher. Bekannte Grenze: in der Liste bestimmt bei laufender Uhr die Uhr die Minute.
- Geprüft: alle Tests (`dreitage`, `ausfaelle`, `stabilisierung`, `uebungen-anleitungen` mit Browser, `dreitage-browser` mit neuem Trainer-Ablauf),
  Screenshots 390 × 844 und quer.
- Offen: Dennis testet im nächsten Training.

## Halteübungen in Sekunden (18. Oktober 2026, Claude)
- Dennis: L-Sit stand im Training mit Wiederholungen statt Haltezeit. Grund: `repGoal` kannte nur Wdh.; bei „20 s pro Runde“ (Hollow Body Hold)
  wurde daraus sogar 3. Jetzt: `holdOf` erkennt Halteübungen, Vorgabe in Sekunden (5-s-Schritte), Zähler, Minuten-Kacheln und Vollbild mit „s“.
- Geprüft: `tests/dreitage.cjs` (neuer Test), Browser-Tests, Kraftschritt mit Hollow Body Hold nachgespielt.
## Übungs-Anleitungen neu (15. Oktober 2026, Claude, Branch `uebungen-anleitungen`)
- Dennis' Auftrag (zuerst an Gemini, das an der Dateigröße scheiterte): alle Übungen so erklären, dass Anfänger sie verstehen (Vorbereitung, Einstieg,
  Ausführung, Ausstieg), du-Form, englische Namen bleiben, Prüfliste. Quellen raus, weil es die eigene Bibliothek ist. Auftrag als Dokument zum
  Kommentieren: https://claude.ai/artifact/Fs7FUcmCThEg1Yrbpq1MCW
- Umgesetzt: alle 381 Übungen neu geschrieben (19 Pakete in `design/auftraege/texte/`, Prüfer und Einbau können `teil: 'texte'`), Glossar aus plan-data
  wird nicht mehr angezeigt (Bibliothek ist die einzige Quelle). Tools › Übungen zeigt Zweck, Schritte, Raus, Sauber; Rest aufklappbar.
  Prüfliste: `design/auftraege/pruefliste_texte.md` (154 fehlende Erklärung, 41 missverständlich, 3 fachliche Fehler: „Knie über die Zehen“ bei
  Air Squat, Pistol, Squat Jump).
- Geprüft: neuer Test `tests/uebungen-anleitungen.cjs` (mit `TP_BROWSER=1` 390 und 1366 px), dazu alle bisherigen Tests.
- Quellen gelöscht (Dennis: eigene Bibliothek, Recherche im Netz plus eigene Erfahrung): `quelle` aus lib-data, mobility, fam-data und
  `design/familien.json`, Prüfer verlangt es nicht mehr, `bibliothek.md` angepasst.
- Dennis gefiel der lange Text nicht: jetzt nur Figur, Schritte, Leiter sichtbar, der Rest hinter einem (i) als Blatt (Entwurf, Screenshots im Chat).
- Offen: Dennis prüft den Entwurf vor dem Merge. Idee von Dennis: Bibliothek mit freien Datenbanken erweitern (free-exercise-db, Unlicense;
  wger nur mit Namensnennung), Bodybuilding-Übungen dazu, Dopplungen über Namen/Alias und Muster vermeiden.

## Aufwärmen und Vollbild am Laptop (Claude, nach Dennis' Training)
- Dennis: 3 × 5 Squat Jumps passen nicht ins Aufwärmen (eine Übung nach der anderen); im Vollbild sah er nicht, wie viele Wdh. dran sind,
  und konnte im EMOM nicht eintragen, was er geschafft hat; „30 s Handgelenke“ ist keine Übung.
- Umgesetzt: Sprünge im Aufwärmen ein Satz (`jumpQty`), Wrist Rocks statt Handgelenke, EMOM im Vollbild mit Vorgabe groß und Zähler
  „Geschafft“ (`fsReps`, schreibt denselben Entwurf `k<i>r<r>` wie der Kraftschritt). Board „Paket 53“ im Canvas.
- Danach: Vollbild-Timer neu (Dennis: Übung bzw. Liste zu klein). Konzept Paket 54, Dennis wählte A, dann A2 „Zeit im Ring“: Zeit im Ring,
  Übung groß daneben (hochkant darunter), Größen wachsen mit dem Bildschirm.
- GitHub Pages läuft wieder (Workflow „Pages entsperren“ hat geholfen; Läufe 101/102 hängen weiter ohne Wirkung).
- Offen: Dennis prüft, ob die Brücke Version 3 meldet (Arbeitszeiten › Google Kalender › „Deine Trainings“).

## Nordic Curls nur mit Fußanker (14. Oktober 2026, Claude)
- Dennis: „Warum sind Nordic Curls einfach im Plan? Dafür brauche ich doch Equipment.“ Grund: `g_nordic` brauchte nur „Alltagsgegenstände“
  (`eq_zuhause`, Sofa als Fußanker), und die sind an jedem Ort angehakt. Rückfrage: Einen Fußanker gibt es nur an manchen Orten.
- Umgesetzt: neues Gerät „Fußanker“ (`eq_fussanker`), Nordic Curl braucht Fußanker, GHD oder Sprossenwand. Einmalig nur Zuhause angehakt.
  Fehlt er am Ort, nimmt der Coach die nützlichste Übung, die dort geht, und sagt es einmal am Kraft-Schritt; angehakt = alte Wahl zurück.
  Board „Paket 52 · Nordic Curls nur mit Fußanker“ im Canvas.
- Geprüft: `tests/dreitage-browser.cjs` (Zuhause mit, Gym ohne Fußanker, Ersatz mit Grund, Anhaken im Equipment-Blatt, Rückkehr ohne Hin und Her),
  dazu `dreitage`, `ausfaelle`, `ausfaelle-browser`, `stabilisierung`.
- Offen: Dennis prüft unter Tools › Übungen › Stift, wo er einen Fußanker hat (Zuhause ist angehakt, Gym/Park/Arbeit nicht).
- GitHub Pages hängt seit dem Merge von #95: Veröffentlichung c9ffe83 gilt bei GitHub als „in progress“, darum scheitert jede neue
  („Please cancel c9ffe839… first“); die Läufe 101 und 102 (und ein alter Lauf 72 vom 8. Oktober) stehen ohne Job auf „queued“ und lassen sich
  über die normale API nicht abbrechen. Neu: Workflow „Pages entsperren“ (`.github/workflows/pages-entsperren.yml`, nur von Hand). Nach dem Merge
  einmal starten: Actions › Pages entsperren › Run workflow. Danach prüfen, ob „pages build and deployment“ grün wird und die App den neuen Stand zeigt.

## Trainings im Google Kalender (14. Oktober 2026, Claude)
- Dennis hat die Brücke eingerichtet (Test-URL lieferte die Daten). Rückmeldung: „Wenn ich die Termine hinzufügen möchte, tauchen sie nicht in meinem
  Google Kalender auf.“ Grund: Die Google-Kalender-App auf Android importiert keine .ics-Dateien (Knöpfe „Kalender“/„Alle in den Kalender“).
- Außerdem: Die Veröffentlichung von PR #95 auf GitHub Pages ist auf GitHubs Seite nach 10 Min abgebrochen (Timeout „updating_pages“), die App lief
  noch mit dem Stand von #94. Lauf neu gestartet; der nächste Merge veröffentlicht ohnehin neu.
- Umgesetzt: Brücke Version 3 mit `doPost`, eigener Kalender „Trainingsplan“, die App trägt diese und nächste Woche selbst ein (Details in `CLAUDE.md`).
  Dennis muss die Brücke einmal aktualisieren: Code ersetzen, „einrichten“ ausführen (Erlaubnis, legt den Kalender an), Bereitstellen ›
  Bereitstellungen verwalten › Stift › Neue Version. Die App zeigt dazu die Seite „Brücke aktualisieren“.
- Geprüft: `tests/dreitage.cjs` (Brücke `doPost` mit nachgestellten Google-Diensten: neu, gleich, verschoben, abgesagt, Vergangenes bleibt, fremde
  Anfragen und falsche Titel ändern nichts, eigener Kalender zählt nie als belegt), `tests/dreitage-browser.cjs` (alte Brücke = Hinweis, neue = POST mit
  Trainings, Aus und Trennen = leere Liste, keine .ics-Knöpfe), dazu `ausfaelle`, `ausfaelle-browser`, `stabilisierung`.
- Offen: echte Rückmeldung von Dennis, ob die Trainings im Kalender „Trainingsplan“ erscheinen (in der Google-Kalender-App ggf. links anhaken).

## Google Kalender verbinden (14. Oktober 2026, Claude)
- Dennis: „Könnten wir die App mit dem Kalender verbinden, damit sie automatisch sieht, wann noch freie Spots sind?“ Antworten: Google Kalender,
  Dienste heißen „DD früh“, „DD Spät“, „DD Nacht“, Einrichtung mit Anleitung ist okay. Board „Paket 51 · Google Kalender verbinden“ im Canvas.
- Weg: Kalender-Brücke als Google-Apps-Script im eigenen Konto (Code in der App, `KAL_GS`), bereitgestellt als Web-App. Kein Server, keine
  Google-Cloud-Anmeldung, die nach 1 h bzw. 7 Tagen abläuft. Die Brücke gibt nur Dienste mit Uhrzeit und „belegt von–bis“ ohne Titel weiter.
- Einrichten (Arbeitszeiten › Kalender verbinden): script.new öffnen, Code einfügen, Bereitstellen › Neue Bereitstellung › Web-App
  (Ausführen als: Ich, Zugriff: Jeder), Zugriff erlauben („App nicht überprüft“ › Erweitert › Weiter), Web-App-URL in der App einfügen.
  Ändert sich der Code später, braucht es in Apps Script eine neue Version der Bereitstellung (Bereitstellungen verwalten › Bearbeiten › Neue Version).
- Planung: Dienste der abgeglichenen Tage ersetzen den Schichtplan (frei, wenn kein Dienst), Termine sind gesperrte Zeiten „Termin“. Nachtdienste
  bekommen wie bisher Tagschlaf und Befinden-Frage. Außerhalb des Zeitraums (über 3 Wochen) gilt der Schichtplan der App.
- Dennis fragte nach mehreren Kalendern: jeder Kalender steht einzeln in Arbeitszeiten › Google Kalender (Farbe, Name, was drinsteht) mit Schalter.
  Von selbst an: eigene sichtbare Kalender und alle mit Diensten; geteilte ohne Dienste sind zuerst aus. Die Wahl bleibt nur auf dem Gerät.
- Dennis' Dienste stehen mit Uhrzeit im Kalender, dazu „DD Tag 12“ und „DD Nacht 12“ (werden über die Länge 12-h-Schichten). Private Termine
  ohne festen Namen zählen als belegt (ohne Titel). Die eigenen Trainings der App im Kalender („Training:“, „Zusatz:“) zählen nicht.
  Die Brücke selbst ist jetzt mit nachgestellten Google-Diensten getestet (`tests/dreitage.cjs`).
- Sicherheit: Link, Wahl und Daten nur in `tp.kal` auf dem Gerät, nicht in Stand, Export, Sync oder Meldungen. Auf einem zweiten Gerät neu einfügen
  (Dennis gefragt: Einrichten am PC gilt für Google, den Link fügt man auf dem Handy einmal ein; Sync des Links nur, wenn er das möchte).
- Geprüft: `tests/dreitage.cjs` (Kalender-Dienste, 12-h-Erkennung, Termine, Zeitraum, ohne Kalender wie bisher), `tests/dreitage-browser.cjs`
  (verbinden mit nachgestellter Brücke, falscher Link, Antwort passt nicht, letzter Stand bleibt, Trennen, Link nicht im Stand), dazu `ausfaelle`,
  `ausfaelle-browser`, `stabilisierung`. Das Skript selbst konnte hier nicht gegen Google laufen; das erste echte Verbinden zeigt, ob alles passt.
- Offen: Rückmeldung von Dennis nach dem ersten echten Verbinden (erkannte Dienste und Termine stimmen?).

## Coach-Tab ohne Ballast (14. Oktober 2026, Claude)
- Dennis: „der Coach-Tab ist sehr voll geworden, viele Dinge können doch im Hintergrund laufen.“ Konzept als Board „Paket 50 · Coach-Tab
  ohne Ballast“ im Canvas (Vorher/Nachher mit denselben Testdaten, Tabelle „Was wohin wandert“).
- Regel für Heute in Plan 2 (`lean` in `renderHeute`): was heute dran ist (Titel, ein Satz darunter `heuteSub`, Wochenleiste ohne Blättern),
  höchstens eine Frage (`heuteAskHTML`: Befinden, Schmerzen, „Dein Plan ist angepasst“, Arbeitszeiten, Daten sichern), der Ablauf mit Start
  und „Heute anpassen“. Trainingstag vorher 7 Karten, jetzt 1–2; freier Tag vorher 8, jetzt 1–3.
- Wohin: Uhrzeit in die Kopfzeile, Gründe der Uhrzeit in Plan › Deine Woche; Andere Uhrzeit und Heute nicht in „Heute anpassen“; Coach-Karte
  an den Schritt (`coachItems`, `stepCoachHTML`, auch die Ringhöhe); Fast geschafft nach Profil › Erfolge; Als Nächstes freischalten nach
  Profil › Werte; Block-Karte und 24-h-Woche nur noch im Plan bzw. in den Arbeitszeiten; freier Tag eine Karte „Für deinen freien Tag“
  (`freeDayHTML`, Flow und aufklappbarer Kurz-Check); Zusatz-Vorschlag im Plan, auf Heute nur heute geplant oder als fälliger Kardio-Test.
- Ein beantwortetes Befinden tritt zur Seite (die Folge steht unter dem Titel), nur „Sehr müde“ bleibt am freien Tag änderbar.
- Nichts wird anders berechnet. Alte Stände vor der Umstellung (Plan 1) sehen Heute wie bisher. Desktop: eine Spalte (880 px).
- Geprüft: `tests/dreitage-browser.cjs` angepasst (Wochen blättern im Plan, keine Ballast-Karten, Andere Uhrzeit/Heute nicht im Blatt, eine Frage
  auf einmal, „Sehr müde“ zurücknehmen, Karte am freien Tag), dazu `dreitage`, `ausfaelle`, `ausfaelle-browser`, `stabilisierung`.
- Offen: Dennis schaut das Board an; was er doch auf Heute haben will (z. B. Fast geschafft), kommt im selben Pull Request zurück.

## Drei Einheiten: die restlichen Pakete (14. Oktober 2026, Claude)
- Dennis wollte alle restlichen Pakete in einem Pull Request. Umgesetzt (Details in `CLAUDE.md` unter „Plan 2“):
  1. Arbeitszeiten nach den ChatGPT-Bildern: Wahl Geregelte Zeiten / Schichtarbeit, feste Woche mit Ausnahmen, Schichtplan wie bisher,
     Arbeitsweg getrennt vom Weg zum Training, Tagschlaf und zweiter Schlaf vor dem Nachtdienst, gesperrte Zeiten (Familie, Termin,
     Betreuung). Zugang auch über Einstellungen › Alltag. Beim Wechsel bleiben feste Woche und Schichtwochen gespeichert.
  2. Befinden nach Nachtschichten: Erholt / Müde / Sehr müde, nur wenn es heute etwas zu entscheiden gibt. Müde = kürzer, Sehr müde = heute frei,
     Erholt öffnet einen Tag zwischen zwei Nächten. Unbekannt bleibt unbekannt. Müdigkeit hält den Umfang.
  3. Training verschieben (Heute anpassen): der Coach schlägt Termine dieser Woche vor, man wählt einen. Zwischenstand bleibt.
     Bewusst nur innerhalb der Woche (sonst gäbe es über Montag doppelte oder verlorene Einheiten).
  4. Freiwilliger Zusatztag mit Grund und Zeitwahl, „Z“ in der Wochenleiste, zählt nicht ins Wochenziel. In der Testwoche (oder wenn er fehlt)
     ist er der Kardio-Test (5 km bzw. Rampe), der den Kardio-Wert neu setzt.
  5. Kurz-Check (Beweglichkeit) an freien Tagen, zwei pro Woche.
- Nicht umgesetzt aus dem Konzept, mit Grund: angenommene Zwei-Einheiten-Woche zum Bestätigen (der Coach entscheidet selbst und zeigt
  „C passt diese Woche nicht rein“), Verschieben über die Wochengrenze, eigener Tages-Check-in jeden Tag (nur nach Nachtdienst und an Übergangstagen).
- Geprüft: `node tests/dreitage.cjs` (9 × PASS), `node tests/dreitage-browser.cjs` (9 × PASS, alle Reiter bei 320/390/1366 px ohne Fehler),
  `tests/stabilisierung.cjs`, `tests/ausfaelle.cjs` (um `befCls`, `befOf`, `longShift` ergänzt), `tests/ausfaelle-browser.cjs` und alle
  bisherigen Playwright-Skripte ohne Fehler.
- Offen: Zusatz in der 24-Stunden-Wochenkarte noch ohne eigenen Balken; Grafik für das Ergometer im Kardio-Abschluss („Grafik folgt“).

## Drei Einheiten A, B, C (13. Oktober 2026, Kernumbau, Claude)
- Grundlage: Konzept von Dennis mit ChatGPT (`CLAUDE-AUFTRAG.md`, Bilder Einstieg, Woche, Zusatztraining, Arbeitszeiten). Claude hat Bedenken
  genannt, Dennis hat entschieden: umbauen, mit dem Kern anfangen. Antworten von Dennis: Metcon bleibt als Abschluss im Wechsel (bei B),
  Kardio-Test wird ein freiwilliger Zusatztag, höchstens 2 Einheiten in Folge. Die Frage „2 von 3 oder 3 von 3 für den nächsten Durchgang“
  war unklar und ist erklärt; eingebaut ist 2 von 3 (wie bisher ab 2 Krafttagen). Dennis kann das noch ändern.
- Umgesetzt (Details in `CLAUDE.md`, Abschnitt „Plan 2“): A, B, C auf den internen Tagen 1, 3, 6, Kardio-Abschluss statt Metcon,
  Umfangsstufen `UMF` (Einstieg 25 Min, Stufe 4 = bisheriger Krafttag), Zeitlimit pro Training (`S.zeitMax`, höchstens 90 Min),
  Umfang wächst frühestens alle 14 Tage nach 6 vollständigen Einheiten (`umfGrow`), Wochenplaner immer an (ohne Arbeitszeiten ist jeder
  Tag frei), höchstens 2 Einheiten in Folge, Pause dazwischen bevorzugt, Übergangstage vor und nach Nachtschichten nur, wenn es nicht
  anders geht, C fällt zuerst weg. Wochenleiste Mo–So auf Heute und im Plan, Tage antippen zeigt Ergebnis bzw. Vorschau.
- Umstellung: neue Nutzer sofort, bestehende am nächsten Montag (`S.planVFrom`) oder vorher über „Schon jetzt starten“, nie während ein
  Training läuft. Alte Einträge bleiben, neue tragen `pv: 2` und `unit`. Gewählte Leitern werden nach Muster übernommen (`picksMigrate`).
  Wer in den letzten 8 Wochen mindestens 6 Krafteinheiten hatte, startet mit Umfangsstufe 4 (wie bisher, mit „Nächster Stufe“ 6).
- Nebenbei behoben: Profil › Werte war bei 320 px 10 px zu breit (`.a-row`).
- Geprüft: `node tests/dreitage.cjs` (5 × PASS, Planer, Umfang, Umstellung), `node tests/dreitage-browser.cjs` (5 × PASS: Umstellung mit
  Hinweis, Wochenleiste, Training mit Neuladen und Speichern, Plan und Arbeitszeiten, alle Reiter bei 320/390/1366 px ohne Fehler),
  `node tests/stabilisierung.cjs`, `node tests/ausfaelle.cjs` (um die neuen Hilfsfunktionen ergänzt), `tests/ausfaelle-browser.cjs` und alle
  bisherigen Playwright-Skripte ohne Fehler. Hell und dunkel angesehen.
- Offen (nächste Pakete aus dem Konzept; inzwischen umgesetzt, siehe oben):
  1. Arbeitszeiten unter Einstellungen: Wahl „Geregelte Zeiten“ / „Schichtarbeit“, Sperrzeiten (Familie, Termine), Tagschlaf korrigierbar,
     zweiter Schlafblock. Heute steckt das Arbeitsmodell nur in `S.alltag.schicht`.
  2. Freiwilliger Zusatztag (Vorschlag mit Grund, Zeitwahl, „Zusatz“ in der Wochenleiste) mit dem Kardio-Test in der Testwoche.
     Bis dahin gibt es keinen Kardio-Test, der Kardio-Wert bleibt, wie er ist.
  3. Befinden nach Nachtschichten („Erholt / Müde / Sehr müde“), zusammengelegt mit der Ausfälle-Rückfrage und „Heute anpassen“;
     Tag zwischen zwei Nächten dann als Kandidat nach Rückmeldung. Angenommene Zwei-Einheiten-Woche („Angepasst: 2 Einheiten“).
  4. Training verschieben auf einen anderen Tag (heute nur „Andere Zeit“ und „Heute nicht“, der Coach plant neu).
  5. Freie Tage zeigen die Ruhetag-Routine, aber noch keinen Kurz-Check (Beweglichkeit) wie früher an den Ruhetagen 4 und 7.
- Entschieden mit Dennis: „Training abbrechen“ bleibt wie es ist (Zwischenspeichern oder Abbrechen wählt er selbst). Im EMOM gibt der Coach
  die Wdh. vor (`repGoal`), die Vorgabe zählt als geschafft, Dennis meldet nur, was nicht klappt (statt grauem Vorschlag zum Bestätigen).
  Steigerung: alle Runden geschafft → nächstes Mal 1 Wdh. mehr bis zum oberen Ende, dann die nächste Stufe über die Sehnen-Bremse.

## Ausfälle und Nachfragen (12. Oktober 2026, Codex)
- Dennis hat den Navigations-/Heute-Umbau verworfen: Bestehende Navigation beibehalten. Stattdessen automatische Planung bei ausgefallenen
  Einheiten besprochen, antippbaren Entwurf gezeigt und ausdrücklich zum Einbau freigegeben. Ergänzungswunsch: eigener Grund „Verkatert“.
- Branch `codex/ausgefallene-trainings`: ursprüngliche Planungstage speichern, fehlende Abschlüsse auf Heute abfragen, danach Befinden und
  Verfügbarkeit. Erholt = Coach verteilt offene Einheiten unter den bestehenden Regeln; erschöpft/verkatert/keine Zeit = heute frei;
  krank/Beschwerden = Pause bis zur Antwort auf die erneute Rückfrage. „Heute nicht“ speichert den Grund direkt, keine doppelte Frage.
- Wochenplanung berücksichtigt die letzte tatsächliche Einheit über die Wochengrenze; Ausfälle der letzten 7 Tage werden bevorzugt, ohne
  zusätzliche doppelte Einheiten. Vorhandene Termine werden bei der Verteilung bevorzugt. Ohne Wochenplanung bleibt die Reihenfolge bestehen.
- Nachtrag für tatsächlich absolviertes Training über das Ergebnisformular: Datum der Einheit, keine vorausgefüllten Leistungswerte,
  Stufe selbst angeben. Ohne Werte nur Teilnahmebestätigung; zählt nicht als heutiges Training und erzeugt keine erfundenen Rekorde.
- Wichtig: Erkennung beginnt mit gespeicherten Planungstagen ab dem ersten Öffnen der neuen Version. Vergangene Ausfälle vor dem Update
  werden nicht geraten. Beschwerden führen hier konservativ zur Pause; die differenzierte Anpassung einzelner Übungen bleibt im bestehenden
  Schmerz-Dialog. Leichteres Training bleibt separat unter „Heute anpassen“; „Heute nicht“ bedeutet kompletter Ausfall.
- Speicherung, Export und Sync umfassen die neuen Felder, Antworten/Snapshots mit Zusammenführung je Datum. Details in `CLAUDE.md`.
- Geprüft: bestehende Stabilisierungstests, neue Node-Regressionen (Wochenwechsel, Snapshot-Erhalt, kein Doppeltraining, Krankheit, Schichten,
  Verkatert, Rückfragen, Sync), Playwright mit echten App-Seiten in 390/1366 px (alle drei Reiter/Unterseiten, Rückfrage, Nachtrag, Neuladen).
- Dennis möchte erklärt bekommen, wie er den Pull Request erstellt; Branch bereitstellen und den Vergleich gegen `main` verlinken.

## Stabilisierung mit Codex (11. Oktober 2026, Draft-PR, von Claude geprüft)
- Dennis hat nach der App-Prüfung das erste Stabilisierungspaket freigegeben („leg los“). Codex hat es vorbereitet, Claude hat den Patch
  auf den aktuellen `main` (mit „Deine Woche“ und AGENTS.md) übernommen: ohne Konflikte, Branch `codex/stabilisierung-speichern-sync`.
- Speicherfehler werden sichtbar; offene Änderungen bleiben im Arbeitsspeicher, Wiederholen und JSON-Sicherung sind möglich.
  Erfolgsmeldungen beim Speichern warten auf die erfolgreiche Speicherung; der Sync wartet ebenfalls.
- Wochenwechsel und Sync: neuere Kalenderwoche vor höherem Tag; Woche und Trainingsposition werden zusammen übernommen.
  Manuelle Rücksetzungen bleiben vorrangig, ältere Dateien ohne Wochenfeld werden anhand des Positionsdatums eingeordnet.
- Nach Korrekturen werden Coach, Rekorde, Muskelbalance und Planung neu berechnet, auch bei unveränderter Eintragsanzahl.
- Privatheit des Daten-Repositories wird vor dem Lesen und vor dem Upload geprüft; öffentliche/unbekannte Repositories sind blockiert.
- Geprüft (Claude): `node tests/stabilisierung.cjs` (4 × PASS), alle bisherigen Playwright-Tests ohne Fehler, Browser auf Handy (390 px) und
  Desktop (1366 px): alle drei Reiter mit Unterseiten (Heute, Plan, Deine Woche, Plan & Challenges, Timer, Übungen, Mobility, 1RM, Profil
  Erfolge/Verlauf/Werte, Einstellungen, Haptik, Skill-Baum) ohne JavaScript-Fehler; Fehlerkarte mit simuliertem vollem Speicher: Karte
  erscheint, „Sicherung herunterladen“ lädt die JSON-Datei, „Erneut speichern“ bleibt bei weiterem Fehler stehen und speichert danach.
  Korrektur mit gleicher Eintragsanzahl ändert den Rekord sofort.
- Von Claude behoben: Fehlerkarte stand auf dem Desktop versetzt (Abstand der Seitenleiste doppelt), jetzt bündig mit dem Inhalt;
  auf dem Handy klebte sie am oberen Rand (`scroll-margin-top`).
- Nicht Teil dieses Pakets, aufgefallen: Im Netzdiagramm (Profil › Werte, Desktop) wird „Beweglichkeit“ abgeschnitten.
- Kein Navigationsumbau: Heute/Navigation und Fortschrittsdarstellung sind der nächste Konzeptschritt und noch nicht umgesetzt.
- Bei vollem/gesperrtem Browserspeicher schützt der Arbeitsspeicher nur die laufende Sitzung; App offen lassen oder Sicherung herunterladen.

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

## AGENTS.md für ChatGPT/Codex (11. Oktober)
- Dennis möchte auch ChatGPT (Codex) am Projekt arbeiten lassen. `AGENTS.md` fasst die Regeln zusammen und verweist auf `CLAUDE.md`,
  `UEBERGABE.md` und `DESIGN.md`. Wichtig: immer nur ein offener Pull Request, sonst Konflikte in `index.html`.

## Deine Woche: Schichten, Uhrzeiten, Kalender (11. Oktober)
- Dennis ist Schichtarbeiter (Früh 6–14, Spät 14–22, Nacht 22–6, am Wochenende 12 h 6–18 / 18–6), bekommt den Plan jede Woche neu und
  wünscht sich einen festen Rhythmus. Wichtig (Dennis): der Nutzer entscheidet nicht, er gibt nur Antworten; Zeiten frei wählbar, nicht nur Blöcke.
- Umgesetzt (siehe CLAUDE.md „Deine Woche“): Montag = Tag 1 einer Woche, Arbeitszeiten je Woche, Coach plant Tage und Uhrzeiten in 24 Stunden,
  Gründe am Training, „Andere Zeit“ / „Heute nicht“ planen neu, Kalender als .ics oder Google-Link. Ohne Einrichtung läuft alles wie bisher.
- Konzept-Board „Deine Woche · 24 Stunden“ im Canvas. Offen: Rückmeldung von Dennis aus dem Alltag (Zeitfenster, Regeln nach Nachtschichten),
  Erinnerung ohne Kalender erst mit nativer App.

## Motivation: Rekorde, Fast geschafft, Ansagen (10. Oktober)
- Dennis fragte nach Gamification und Nudging. Konzepte im Canvas (Board „Motivation · Konzepte“, 8 Bausteine A–H). Auf die Frage nach der
  motivierendsten Methode: spürbarer Fortschritt plus festes Einplanen. Dennis: „ok baue das ein“ (Rekorde und Fast geschafft), dazu Timer-Ansagen
  „Halfway there“, „30 seconds left“ und „5, 4, 3, 2, 1, Done!“.
- Umgesetzt (siehe CLAUDE.md): Rekorde mit Moment und Liste in Profil › Erfolge, Karte „Fast geschafft“ auf Heute, Ansagen im Timer (Stimme muss an sein).
- Rekorde-Design: drei Varianten (A Kacheln, B Liste vorher → jetzt, C Highlight + Filter) im Canvas. Dennis wählte C, aber die dunkle Karte im Hellmodus
  war schlecht, und die Karte nach dem Speichern gefiel nicht. Jetzt: C hell (weiße Karte mit goldenem Schimmer) und Moment M3 (Kurve der Rekorde
  mit goldenem Stern, Gewinn-Chip). Board „Rekorde · C und der Moment“.
- Offen aus den Konzepten: D Nächstes Training festhalten (Erinnerungen erst sinnvoll mit nativer App), A Wochen-Kette mit E 10-Minuten-Rettung,
  F Monatsrückblick, G Block beginnt, H Teilen. Idee Android-App mit Capacitor (Erinnerungen, Health Connect) besprochen, noch nicht begonnen.
- Canvas: das Design-Format nimmt keine eingebetteten Bilder (data-URIs) mehr; Bilder als Assets hochladen und mit `/_blob/<id>` einbinden,
  erstes Board heißt `Main.dc.html`.

## Mobility-Player (9. Oktober)
- Dennis (Ruhetag-Flow am Mac): keine Anleitung je Übung, keine Zeit zum Wechseln, Links/Rechts nur als Kapsel, Haken am Ende verdreht.
  Umgesetzt: „So geht’s“ unter dem Ring, 5 s Wechsel vor jeder Übung und jedem Seitenwechsel (in der Dauer mitgerechnet, Ruhetag Flow A jetzt
  14 statt 12 Min), Kapsel Links | Rechts, Haken gerade. Gilt auch fürs Handy und fürs Cool-down im Training (gleicher Timer).
- Dennis: „Bei jeder Übung, egal ob Mobility, Kraft oder anderes, soll dabeistehen, wie sie durchzuführen ist, außer in der Listenansicht.“
  Ergänzt: Kraftschritt (beide Ansichten, Schritte der aktuellen Stufe), Ausgleich, Lauf-ABC (kurzer Satz je Übung). Aufwärmen, Metcon,
  Cool-down, Skill, Testtage und Bibliothek hatten es schon.

## Lauf-ABC und Einlaufen (9. Oktober)
- Dennis: Im Lauf-ABC steht zuerst „5 Min einlaufen“, im Lauf darunter „Nach dem Lauf-ABC 5 Min locker einlaufen“, also falsch herum und doppelt.
  Behoben: Eingelaufen wird nur im Lauf-ABC, die Laufliste beginnt direkt mit dem Hauptteil, endet mit 5 Min Auslaufen.
- Dennis: „Schreib dazu, ab wann man die Pulsuhr starten soll.“ Laufliste: „Pulsuhr starten, direkt nach dem Lauf-ABC“ und am Ende
  „Pulsuhr stoppen“; dazu ein Satz im Lauf-ABC und unter „Ergebnis von der Uhr“. Die vorgeschlagene Dauer zählt ab dann (ohne Lauf-ABC).
- Dennis: „Hast du das auch beim Ergometer eingebaut?“ Jetzt ja: Pulsuhr und Anzeige am Ergometer starten mit dem Hauptteil (Schritt 2),
  Stopp nach dem Ausfahren; die vorgeschlagene Dauer zählt ohne Einfahren (`clockSec`).

## Wiedereinstieg: Welchen Stand siehst du bei dir? (9. Oktober)
- Dennis fragte, ob man den Fragebogen manuell starten kann, und schlug vor, ihn nach langer Pause als Ergänzung zu nehmen („Welchen Stand siehst
  du bei dir aktuell?“). Konzept im Canvas (Board „Wiedereinstieg“), Dennis: „PR erstellen“.
- Umgesetzt (siehe CLAUDE.md, „Wiedereinstieg“): ab 15 Tagen Pause Karte auf Heute, sechs Fragen, „Dein Wiedereinstieg“, höchstens der Stand
  vor der Pause, schneller zurück in den ersten 2 Einheiten.
- Offen: Rückmeldung von Dennis zur Schwelle (15 Tage) und ob auch Bestwerte/5 km abgefragt werden sollen. Kein manueller Start des Fragebogens.

## Fragebogen statt Testtage (9. Oktober)
- Dennis: „Statt Testtage einen Fragebogen zum aktuellen Fitnessstand, bestehende 1RMs eintragen und alles was dazugehört, für leichteres
  Onboarding?“ Entwurf 1 im Canvas gefiel noch nicht, Entwurf 2 (Board „Fragebogen statt Testtage · Entwurf 2“) ja. Dazu: „alles was hinter
  dem · steht, wenn es nicht passt, komplett mit Punkt in die Zeile darunter“ → Regel in `DESIGN.md` (Grundlagen), `dotSub()`. „Starte den PR.“
- Umgesetzt (siehe CLAUDE.md, „Start“): Begrüßung, 11 Fragen, „Dein Start“, „Training starten“ geht direkt in Durchgang 1. Testtage bleiben
  über „Lieber messen“, „Schon mittendrin“ wie bisher. Startstufen aus dem Fragebogen stuft der Coach in den ersten 2 Einheiten nach.
- Offen: Rückmeldung von Dennis, ob die Zuordnung der Antworten zu Stufen passt (`FB_Q`, `FB_OFF`). Die Grafik „Rücken zur Wand“ fehlt noch
  (dort steht ein Symbol).

## Handstand: Rücken zur Wand als erste Stufe (9. Oktober)
- Dennis: Ist es mit dem Rücken zur Wand nicht einfacher (hochkicken, die Wand fängt ab)? Vereinbart: beides. Neue erste Stufe „Rücken zur Wand“
  (eigene Übung `g_wall_handstand_back`, Grafik folgt), danach Bauch zur Wand wie bisher. „So kommst du rein“ und „Raus“ für die Stufe,
  Wissen › Skill-Ziele erklärt die Reihenfolge und den Ausstieg (Hand versetzen, seitlich herausdrehen). Bestehende Stände bleiben auf ihrer Stufe.
- Entwürfe der 20 Skill-Grafiken liegen im Canvas (Paket 41) und in der Historie von PR 82 (Commit „Entwurf: 20 Skill-Grafiken“), auf Dennis'
  Wunsch noch nicht in der App und wieder aus dem Pull Request genommen.

## Progression ohne Bremsen, Skill-Block, Export (9. Oktober)
- Dennis fragte nach Regeln, die Progression hemmen, und Dingen ohne Mehrwert. Alle neun Punkte freigegeben („Alles umsetzen“), dazu:
  „Beim Handstand ist unklar, wie man in die Position kommt, schreib das immer dazu.“
- Umgesetzt: Handstand steigt über die Haltezeit, „So kommst du rein“ und „Raus“ je Stufe; Metcon-Stufe folgt dem Kraftstand; Pause je Teil
  statt je Übung; Maxout zählt; Sprünge als Leiter (Schnellkraft); Kurz-Check am Ruhetag (Beweglichkeit) mit Cool-down-Hinweis; Skill-Block
  (Handstand im Wechsel mit freigeschalteten Skills); alte Sync-Felder und Platz-Liste raus; Export mit Foto, CSV, Hinweis „Daten sichern“.
- Offen: Rückmeldung von Dennis. Grafiken für die Skill-Stufen (Front Lever usw.) fehlen noch, dort steht „Grafik folgt“.

## Neue Übungen: der Coach stuft ein (9. Oktober)
- Dennis fragte, wie neue Übungen eingestuft werden und wie der Coach merkt, dass eine Stufe nicht geschafft wurde. Konzept im Canvas
  (Board „Neue Übungen · Coach stuft ein“), Dennis: „Baue das so um“. Variante B (nur der Coach, kein „Zu leicht | Zu schwer“).
- Umgesetzt: Start-Schätzung (Familie, Teil-Wert, sonst Stufe 1), Einstufung in den ersten 2 Einheiten, eine Stufe leichter bei 2 Runden unter
  der Spanne, Gewicht ohne 1RM aus verwandten 1RM bzw. Einsteiger-Norm, automatisch übernommene Vorschläge grau bis bestätigt,
  Chips „3–6 Wdh.“ und „✓ Stufe N …“ in einer Reihe. Alte Übungstexte mit Tag-Nummern (Chin-up, Pull-up, Push-up) entfernt.
- Dennis: Band-Farbpunkt oft nicht mittig und ungleicher Abstand. Behoben: Punkt in em (passt zu jeder Schriftgröße), Wort und Punkt
  in einer Einheit `.bst`, in Chips gleicher Abstand über `gap`.
- Offen: Rückmeldung von Dennis, ob die Schätzungen passen (z. B. Ring Chin-up aus Zug-Wert 74 → „Leichtes Band“).

## Fünf Grundsätze und Angleichung (9. Oktober)
- Dennis fragte, ob die UI/UX-Grundsätze im Designkonzept stehen. Jetzt in `DESIGN.md` als „Fünf Grundsätze“ (Konsistenz, Feedback,
  Einfachheit, Barrierefreiheit, Kontrolle); Abschnitt „Eingaben“ korrigiert: Zahlen im Training = Zähler, Werte von der Uhr = Rad.
- App angeglichen: Zähler statt Kachel/Rad in Metcon (Extra-Wdh., Runden nur ohne Listen-Zähler), Handstand, Ausgleich, Testtag, Intervalle;
  „Schmerzen“ überall als roter Fahnen-Knopf (im Schritt-Kopf neben dem X); „Heute anpassen“ als kleiner Knopf; Stufe in Metcon und
  Handstand setzt der Coach (Chip); Fortschritt-Block wiederholt die Coach-Karte nicht mehr; letzte Schriften unter 14 px angehoben.
- Offen: Rückmeldung von Dennis auf dem Handy.

## UX-Check, Paket 1: Rückgängig und Korrigieren (9. Oktober)
- Dennis zeigte die „UI/UX Design Principles 2026“. Bewertung im Canvas (Board „UX-Check“): Feedback gut, Konsistenz größtenteils,
  Einfachheit schwach, Barrierefreiheit und Kontrolle teils. Plan in sechs Paketen: 1 Rückgängig/Korrigieren, 2 Kraftschritt (eine Übung,
  Coach setzt Stufe), 3 Coach erklärt sich, 4 Heute aufräumen, 5 Einstellungen und Lesbarkeit, 6 Whiteboard-Grafiken.
- Dennis: „Korrigieren immer. Löschen aber nur am gleichen Tag.“ Umgesetzt (siehe CLAUDE.md), dazu 10 s „Rückgängig“ nach dem Speichern.
- Dennis: „Mach gleich alles und zeig mir die Konzepte dafür.“ Pakete 3, 4 und Rest von 5 umgesetzt (siehe CLAUDE.md), Bildschirme im Canvas
  (Board „Umgesetzt“). Paket 6 (Whiteboard-Grafiken, Phasen statt Animation) war nur ein Test (Dennis): nicht einbauen, Animation bleibt.
- Paket 5 (Einstellungen): Dennis wählte „Mittel“. Umgesetzt (siehe CLAUDE.md), dazu Textgröße in drei Stufen. Offen aus Paket 5: Mindestschrift
  14 px, keine Großbuchstaben-Zeilen, Zustände mit Symbol. Offen: Paket 3 (Coach erklärt sich), 4 (Heute aufräumen), 6 (Whiteboard-Grafiken).
- Paket 2: Board „Kraftschritt A/B/C“. Dennis: „A und C sind beide gut, genau so wollte ich die Möglichkeit zu wechseln.“ Umgesetzt als
  Umschalter „Übung | Minuten“ im Kraftschritt (siehe CLAUDE.md). Fertige Minuten bekommen den Vorschlag automatisch, korrigieren mit dem Zähler. Paket 5: Dennis ist unsicher, welche Einstellungen der
  Coach übernehmen soll; Empfehlung im Canvas.

## Verlauf ohne Löschen (8. Oktober)
- Dennis: „Ich möchte nicht die Möglichkeit, einzelne Trainings zu löschen.“ Löschen-Knopf in Profil › Verlauf (Training und Mobility) entfernt.
  1RM-Einträge in Tools › 1RM lassen sich weiter löschen (Tippfehler beim Wert).

## Planung nach Kalender (8. Oktober)
- Dennis fragte, wie die Planung funktioniert, und nach Schwachstellen. Danach: „Murph brauchen wir nicht“, „ist ein Tag gemacht, ist er für
  heute geloggt, es kann nicht direkt der nächste Tag gestartet werden“, „leg los“.
- Umgesetzt: Murph raus, ein Trainingstag pro Kalendertag („Heute erledigt“), Ruhetage zählen von selbst, Wiedereinstieg wie im Text
  (2 bzw. 5 Einheiten kürzer, ab 4 Wochen Entlastung, Testwoche rutscht), Gewicht höchstens alle 7 Tage, Ergometer unter der Kardio-Grenze,
  verpasster Kardio-Test wird nachgeholt, Sync ohne Rücksprung.
- Dennis: „sollte ich so etwas selbst entscheiden? ich will doch ein automatisiertes Programm bauen.“ → „Tag X machen“ ganz entfernt,
  die Reihenfolge entscheidet der Coach. Grundsatz: keine Entscheidungen an Dennis abgeben, die der Coach aus den Daten treffen kann.
- Dennis (Screenshot): nach dem Speichern war Tag 4 schon gefüllt. Jetzt bleibt bis Mitternacht der erledigte Tag gefüllt (`doneTag`).
- RIR-Frage verworfen: Aufstieg nur bei 2 Einheiten in Folge mit allen Runden oben ist schon das Signal, keine Extra-Eingabe.

## Erledigte Tage zeigen ihr Ergebnis (8. Oktober)
- Dennis: Beim Zurückblättern auf Heute die Ergebnisse des absolvierten Trainings sehen, nicht wieder starten können.
  Umgesetzt mit `dayLog` (Eintrag mit gleichem Tag und Durchgang): Karte „Ergebnis“ wie im Verlauf, nur „Zurück“.

## Grafiken Runde 3 in der App (8. Oktober)
- Dennis: „ja alles passt jetzt“ (auch der neue World's Greatest Stretch). `design/maskottchen/maskottchen.js` in `index.html` kopiert
  (74 Grafiken, `pruefen.js`: Kontakte halten). Nächste Runden nach `design/maskottchen/REIHENFOLGE.md`.

## Testtag-Rückmeldung (8. Oktober)
- Dennis: „Bei jeder Übung sollte dabei stehen wie genau diese durchzuführen ist“ (Testtag), Metcon als Liste trotzdem erste Übung
  aufgeklappt (am Mac), Rundenzähler doppelt (mitgedrückt, am Ende trotzdem Runden eingeben).
- Umgesetzt: „So geht’s“ (Schritte) an jeder Übung im Ablauf und an jedem Testschritt (Stufe passend), Aufwärmen-Hinweise für
  Ergometer und Handgelenke. Metcon/Murph als Liste: alles zu, je Zeile der kurze Hinweis, Antippen klappt auf. Zähler und Abhaken
  füllen Runden/Extra-Wdh. direkt, am Ende nur noch bestätigen.

## Aufwärmen-Timer (8. Oktober)
- Dennis am zweiten Testtag: beim Aufwärmen lief ein 8-Minuten-Timer. Dennis: „immer wenn eine Zeit bei einer Übung steht ein Timer, sonst zum Abhaken“ (Ergometer 5 Min, Handgelenke 30 s; auch an Krafttagen).
- PR #70 gemergt, aber GitHub Pages hat nicht veröffentlicht (Build-Job blieb in der Warteschlange, Neustart hing ebenfalls).
- Grafiken Runde 3 (nur `design/`): drei Rückmelderunden. Brustkorb und Becken drehen sich bei gedrehten/liegenden Figuren mit (dort keine
  V-Verschiebung), Kamera von oben (`tilt`, `mat`), Kopf-Blickrichtung `J._hf`. Dennis: „bis auf den World's Greatest Stretch ist alles gut“;
  WGS neu animiert (Arm im Bogen, Oberkörper dreht, Blick zur Hand). Freigegeben und eingebaut.

## Geschlecht im Profil (8. Oktober)
- PR #67 (Aufwärmen im Vollbild) gemergt.
- Dennis (Anlass: Bild mit Muskelfiguren je Bewegungsmuster): Geschlecht im Profil wählen, alles passt sich an („alles anpassen“).
  Einstellungen › Profil: Geschlecht –/Männlich/Weiblich/Divers. Normen, Rx, Kardio-Wert, Maximalpuls, Figur. Divers = Mitte.
- Figur: Dennis fand die erste weibliche Version „nicht weiblich genug“ → stärkere Taille/Hüfte, schlankere Arme, Brust, lange Haare.
  Danach auch beim Mann eine Frisur (Kurzhaarschnitt). Canvas „Paket 33 · Geschlecht“ (Board P89).
- PR #68 gemergt. Danach Seite „Grundmuster“ unter Plan › Wissen (fünf Figuren wie im FortisTracking-Bild, je Muster Karte mit
  „Bei dir“). Dennis: „kann nicht schaden, bau es ein“. Canvas „Paket 34 · Grundmuster“ (Board P90).

## Grafiken Runde 3 und Testtage (8. Oktober)
- PR #65 (Schmerzen) gemergt.
- Grafiken: Reihenfolge aus einer Plan-Simulation (`design/maskottchen/REIHENFOLGE.md`, 83 Übungen im Plan ohne Grafik, Runden zu 20).
  Runde 3 (20 Figuren, vor allem Aufwärmen, Cool-down, Ruhetag, dazu Deadlift und Back Squat) liegt im Canvas („Paket 32“, zwei Boards),
  nur in `design/maskottchen/maskottchen.js`, noch nicht in `index.html`. Dennis schaut sie am Mac an, dann Freigabe und Übernahme.
  Neue Hilfen in der Vorlage: `twist`, `reArm`, `turnAll`, `supine`, `quad`, `barbell`, `breathe`. Schwer lesbar: Supine Twist, Frog, Doorway Pec.
- Dennis: Testtage waren nach 10 Minuten vorbei. Jetzt mit Aufwärmen am Anfang und Metcon AMRAP 8 am Ende (Bewegungen, die heute
  nicht getestet wurden; erster Metcon-Wert).
- PR #66 gemergt. Dennis: Im Vollbild sah man beim Aufwärmen nicht, welche Übung dran ist (galt an allen Tagen). Jetzt zeigt
  das Vollbild die aktuelle Übung mit Figur, Menge, „‹ Zurück | Erledigt ›“ und „Als Nächstes“ (`fsWarmHTML`), hochkant und quer.

## Schmerzen mit Gedächtnis (8. Oktober)
- PR #64 (Muskelausgleich) gemergt.
- Mit Dennis: Schmerz-Skala in drei Stufen (Schmerz-Ampel-Modell: leicht 1–3, mittel 4–6, stark 7–10), feiner bringt keine andere Handlung.
  Bei „stark“ kein Ersatz in derselben Bewegung, sondern eine andere Muskelgruppe ohne Last auf der Stelle.
- Mit Dennis: auch Muskeln (nur die der Übung), Muskelkater ist kein Grund zum Tauschen. Gedächtnis 1–4 (nachfragen, ganze Stelle
  schonen, stufenweise zurück, Hinweis zum Abklären), dazu 5 (Muster: 3× dieselbe Übung → Pause) und 6 (Übersicht im Profil).
  Canvas „Paket 31 · Schmerzen mit Gedächtnis“.
- Dennis: „Training ist Training“: Ersatz zählt normal (eigene Leiter, Gewicht, Familie); nur „leichter“ ist kein Stillstand.
  Schmerzen überall melden (Aufwärmen, Handstand, Kraft, Metcon, Ausgleich, Cool-down, Murph), das Gedächtnis gilt in allen Schritten.
- Dennis: Übersicht für die Physio als Text mit eingebaut (Teilen bzw. Kopieren aus der Karte „Beschwerden“).

## Muskelausgleich (8. Oktober)
- Mit Dennis entworfen (Canvas „Paket 29 · Muskelausgleich“): eine Karte mit anatomischer Figur (grau, Muskeln einzeln, Umrisse auch im
  Dunkelmodus klar) und darunter Balken der Gegenspieler-Paare; Farbe von Rot (vernachlässigt) über Orange und Gelb bis Grün (im
  Gleichgewicht). In der Bibliothek dieselbe Figur in Blau: Hauptmuskeln kräftig, mitarbeitende hell (Rot/Grün nur für den Ausgleich).
- Eingebaut: Wertung je Muskel aus 4 Wochen, Karte in Profil › Werte, Metcon-Tausch mit grauem Grund (A), Schritt „Ausgleich“ am Ende
  der Krafttage (B, fällt bei wenig Zeit, Kurzversion, Entlastung, Testwoche und Taper weg), Figur in jeder aufgeklappten Übung.
  Der Kraftteil wird bewusst nicht umgestellt (Leitern bleiben stabil, `schwach`-Platz gleicht dort schon nach Teilen aus).
- Offen: Rückmeldung von Dennis, ob die Sollwerte `MUS_W` passen (z. B. Waden, Adduktoren). Nächster PR: Schmerzen (`gelenke`).

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

