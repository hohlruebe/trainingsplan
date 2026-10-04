# Übergabe – Stand der Arbeit

Diese Datei ist das Übergabe-Protokoll zwischen Chat-Sitzungen. Zu Beginn jeder Sitzung lesen,
am Ende jeder Aufgabe aktualisieren (Stand, offene Aufgaben, Rückmeldungen von Dennis).
Regeln und Aufbau der App stehen in `CLAUDE.md`, das Designkonzept in `DESIGN.md`.

Stand: 3. Oktober 2026 (Schwerpunkte und Blöcke eingebaut)

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

