# Übergabe – Stand der Arbeit

Diese Datei ist das Übergabe-Protokoll zwischen Chat-Sitzungen. Zu Beginn jeder Sitzung lesen,
am Ende jeder Aufgabe aktualisieren (Stand, offene Aufgaben, Rückmeldungen von Dennis).
Regeln und Aufbau der App stehen in `CLAUDE.md`, das Designkonzept in `DESIGN.md`.

Stand: 3. Oktober 2026 (nach PR #25)

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
    nicht polished. Im Canvas drei Entwürfe: A Kapsel-Leiste, B Liste mit Linie, C Treppe aufgeräumt.
    **Wartet auf Dennis' Wahl.**

Technik: siehe `design/maskottchen/VORLAGE.md`. Kurz:
- Figur als 3D-Skelett, um die Hochachse gedreht, Bild für Bild aus Gelenkwinkeln gezeichnet.
- Bildausschnitt einer Animation über alle Bilder der Bewegung plus Rand, damit nichts abgeschnitten wird.
- In der App zeichnet `play()` live im Browser (offline, keine großen Dateien).

Nächste Schritte: Rückmeldung zur Probe einarbeiten → Einbau in Training, Übungen und Routinen-Player → erst dann Pull Request.

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

## Ideen für später
- Übungsgrafiken auch für alle übrigen Übungen der Bibliothek.
