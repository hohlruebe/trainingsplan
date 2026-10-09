# Designkonzept Trainingsplan

Gilt für jede Seite und alles Neue. Ruhig, an iOS angelehnt, Handy zuerst (390 px).
Kurzfassung der Regeln steht auch in `CLAUDE.md`.

## Fünf Grundsätze
Jede neue Oberfläche wird an diesen fünf Punkten gemessen. Passt etwas nicht, wird es angeglichen, nicht als Ausnahme gelassen.
1. **Konsistenz**: Gleiches sieht gleich aus und funktioniert gleich. Eine Zahl im Training ist immer ein Zähler,
   „Schmerzen“ immer der rote Fahnen-Knopf, eine Stufe immer der grüne Chip vom Coach. Bausteine nur aus dem Kapsel-Konzept.
2. **Feedback**: Jede Aktion antwortet sofort: Haptik, gleitende Pille, Zähler springt, „Rückgängig“ nach dem Speichern,
   „Was dein Coach daraus macht“ nach der Einheit. Nichts passiert still.
3. **Einfachheit**: Eine Hauptaktion pro Seite. Der Coach entscheidet, was er aus den Daten entscheiden kann (Stufe, Gewicht,
   Übung, Ablauf); Dennis trägt nur ein, was nur er weiß. Jede Meldung steht genau einmal (keine Wiederholung zwischen Karten).
4. **Barrierefreiheit**: Tippflächen mindestens 44 px, Schrift mindestens 14 px, keine Zeilen in Großbuchstaben,
   Farbe nie allein (Zeichen ✓ ! × dazu), Textgröße wählbar, „Bewegung reduzieren“ wird beachtet, `aria-label` an Symbol-Knöpfen.
5. **Kontrolle**: Nichts geht verloren. Zwischenspeichern und Abbrechen im Training, „Rückgängig“ nach dem Speichern,
   „Korrigieren“ für jeden Eintrag, Gefährliches nur mit Nachfrage, „Heute anpassen“ gilt nur für heute.

## Grundlagen
- Hellmodus wählbar in Weiß oder Off-White (Kreide `#FAF9F5`, Leinen `#F8F5EF`, Nebel `#F7F8F6` für Karten), Hintergrund je eine Stufe dunkler.
- Dunkelmodus in Graphit, passend zum App-Symbol: Hintergrund `#1E1F23`, Karten `#2A2B30`, Kapseln `#24252A`, Pille `#41424A`,
  Grafik-Fläche `#33343A`, Linien `#36373D`. Jede Ebene eine Stufe heller als die darunter.
- Schrift: Geist für alles. Die Schrift-Einstellung (Klar, Marker, Handschrift) gilt nur für Zahlen und Mengen (`--hand`).
- Titel: groß und fett mit Marker-Strich darunter. Darüber eine Kopfzeile in normaler Schreibung (`.kicker`), z. B. „Tag 1 · Durchgang 4 · ca. 35 Min“.
- Karten: weiß (`--paper`), runde Ecken (22 px), weicher Schatten. Nichts Verspieltes.
- Farben nur über Variablen: `--acc` (Akzent, vom Nutzer wählbar), `--ink`, `--ink2`, `--board`, `--paper`, `--fill`, `--line`, `--red`, `--green`, `--on`, `--off`, `--pill`.
  Dunkelmodus über `data-theme`. Neue Farben immer für Hell und Dunkel festlegen.
- Oben und unten keine harten Kanten: Hintergrund läuft durch, Inhalte blenden weich aus.
- Tippflächen mindestens 44 px.

## Schaltflächen: Kapsel-Konzept
Keine eckigen grauen Knöpfe. Jede Schaltfläche ist genau einer dieser Bausteine:

| # | Baustein | Wann | Klassen |
|---|----------|------|---------|
| 1 | Umschalter | eine Wahl aus wenigen (2–5) | `.seg` mit `.seg-btn`, Wahl als weiße Pille (`--pill`, Text `--acc`) |
| 2 | Kapsel mit Symbolen | viele Ziele, wenig Platz; nur die Wahl zeigt ihren Namen | `capHTML()` → `.cap` / `.cap-btn` (Reiterleiste, Profil-Ansichten, Orte) |
| 3 | Hauptaktion | eine pro Seite, meist ganze Breite | `.btn.primary` (+ `.block`, `.go`); Speichern grün `.btn.save` |
| 4 | Nebenaktion | alles Weitere | `.btn` (Glas-Kapsel), klein `.btn.small` |
| 5 | Gruppe | zusammengehörige Nebenaktionen | `.bgrp` mit Knöpfen, feine Trenner |
| 6 | Gefährlich | Löschen, Zurücksetzen, Trennen | `.btn.red` / `.bgrp button.red`, immer mit Nachfrage (`twoStep`, `openChoice`) |
| 7 | Zähler | Wert schrittweise ändern | `.stepper`: runde – / + und Wert in der Mitte |
| 8 | Zurück und Werkzeuge | Navigation, Bearbeiten | runder Glas-Knopf nur mit Symbol `.rbtn` (Chevron, Stift, Regler) |

Die Tage 1–7 auf „Heute“ sind eine Kapsel (`.pills`): fälliger Tag gefüllt in `--acc`, angeschauter Tag als weiße Pille, Ruhetage blasser.

Textlinks nur im Fließtext (Übungsnamen) und in Blatt-Köpfen („Abbrechen“ / „Fertig“).

## Eingaben
- Zahlen im Training (Wiederholungen, Gewicht, Runden, Extra-Wdh., Haltezeit, Sätze im Ausgleich, Intervalle geschafft) sind **Zähler**
  (`cntRow` bzw. `kCounter`, `.k-cnt` mit `.stepper`): Name links, darunter grau der Zusatz, rechts – Wert +. Ohne Eintrag steht grau
  der Vorschlag, Tippen auf die Zahl übernimmt ihn. Ein Wert, den schon etwas anderes zählt (Runden über das Abhaken), steht nicht noch einmal da.
- Ausnahme: Werte von der Uhr oder vom Gerät (Dauer, Puls, Strecke, Watt) bleiben Kacheln (`.tile` in `.pick-grid`) mit Rad-Blatt,
  weil man sie abliest und auf einmal einträgt. Ebenso die Stufe im Beweglichkeits-Check.
- Stufen setzt der Coach: grüner Chip (`kStageChip`, `coachStageHTML`), nicht wählbar. Nur ohne Verlauf einmal „Erstes Mal · Stufe“
  als Wert-Zeile. Testtage wählen die Stufe als Wert-Zeile, denn dort wird sie gemessen.
- Einstellungswerte, die man selten ändert (Profil, Stand, Startdatum, Challenge-Datum und -Ziel), sind **Wert-Zeilen**
  (`valRows([valRow(…)])`, `.vrows`/`.vrow`): eine Glas-Fläche in `--board`, je Zeile Name links (darunter grau ein Zusatz),
  Wert rechts in `--acc` (geschätzt grau), dann der Pfeil. Feine Trenner, Zeilen mindestens 56 px. Tippen öffnet das Rad-Blatt.
  Errechnete Werte ohne Pfeil (`valRow` ohne `attrs`). Zahlen in `--hand`, Text (Datum, „Einstiegstest“) in Geist 600.
- Zahlen, Stufen, Listen, Datum: Rad-Blatt (`openSheet`). Keine Klapp-Listen (`<select>`), kein System-Datumsfeld.
- Rad-Blätter mit Zahl zeigen den Wert groß darüber: nochmal tippen öffnet die Zahlentastatur (wie beim Zeit-Blatt).
- Zeiten: Zeit-Blatt (`openTimeSheet`), Rad Min/Sek, nochmal auf die Zeit tippen = Zahlentastatur.
- Freitext nur, wo es wirklich Text ist (Name, Notizen, Suche).
- Schalter: alle Checkboxen in `.check` sind „Glas-Tropfen“: an grün mit Strich, aus rot mit Kreis.

## Hinweise
- Erst der Ablauf, dann die Aktion. Hinweise stehen dort, wo sie hingehören: grau unter dem Schritt (`.tl-x`), Phase in der Block-Karte.
  Eine Tipps-Karte (`tipsHTML`) nur für echte Anleitungen (Testtag, Murph).
- Anpassungen für heute: kleiner Knopf „Heute anpassen“ (`.btn.small`), Blatt mit Liste der Anliegen, Aktives grau hinterlegt, gilt sofort, nur „Fertig“.
- Schmerzen: überall der rote Fahnen-Knopf (`.pn-flag`), in der Kraft-Karte und oben im Schritt-Kopf neben dem X (`.st-flag`), nie ein Textlink.
- Farbige Hinweise (gelb `.flag`) nur für echte Warnungen im Moment des Handelns.
- Reine Infos sind Chips (`.chip`), nicht tippbar. Zustände nur zeigen, wenn etwas nicht stimmt (z. B. „Sync-Fehler“).

## Bänder
- Stufen mit Band werden ausgeschrieben („Normales Band“) mit Farbpunkt davor (`stageHTML`, `bdot`); gespeichert bleibt der kurze Name.
- Bandfarben: Standard in `BANDS`, je Band aus 10 Farben (`BAND_PAL`) wählbar, passend zu den echten Bändern (`bandColor()`).

## Leitern
- Eine Leiter ist ein Aufstieg: Stufe 1 unten, die schwerste oben, darüber „↑ Schwerer“, darunter „Leichter“.
- Stufen liegen in einer Glas-Kapsel, jede Zeile mindestens 44 px, Nummer im Kreis (Bandfarbe, Weste schwarz, erreichte Stufen `--acc`).
- „Aktuelle Stufe“ ist die weiße Pille wie die Wahl in jeder Kapsel. Die höchste je geschaffte Stufe trägt den goldenen Chip „★ Bestwert“.
- Text bricht nicht um: zu lange Namen enden mit „…“ und laufen beim Antippen einmal durch, blenden aus und stehen wieder am Anfang.

## Übungsgrafiken
- Immer die Maskottchen-Vorlage (`design/maskottchen/VORLAGE.md`). Bildfeld überall gleich groß, Figur in einer eigenen Fläche (`--fig`):
  hell weiß mit dunkler Figur, dunkel „Kreide auf Dunkel“ (helle Striche, Fläche knapp heller als die Karte).
- Im Training nur bei der Übung, die gerade dran ist. Ähnliche Übungen werden über den Text unterschieden (z. B. Griff).
- Fehlt eine Animation: Platzhalter mit winkendem Maskottchen (`_wave`), daneben „Grafik folgt“ und ein kurzer Satz (`figBox`).

## Ablauf im Training
- Zwei Modi je Trainingsart (Einstellungen › Training): **Liste** und **Einzeln**. Standard: Liste, nur Cool-down einzeln.
- Liste: alle Übungen in einer Glas-Kapsel wie die Leiter. Die aktuelle Übung ist die offene weiße Pille mit Figur, Hinweis und `.btn.small` „Erledigt“.
  Erledigt = grüner Haken an der Menge, Text grau. Keine Abhak-Kreise.
- Einzeln: eine Karte mit Chip „Übung 2 von 9“ (bei Runden zusätzlich „Runde 3“), Figur, Menge und Name, Hinweis,
  darunter `.bgrp` „‹ Zurück | Erledigt ›“. Auf der letzten Übung Chip „Danach: …“, „Erledigt“ springt direkt weiter.
- Wischen immer gleich: nach links = erledigt / weiter / +, nach rechts = zurück / rückgängig / – (umkehrbar).
- Zähler (`.stepper`) nur in der Liste. Am Ende eines AMRAP immer „Stimmt dein Ergebnis?“ mit den gezählten Werten.
- EMOM: der Timer schaltet weiter. In der laufenden Karte Chip „Als Nächstes · Min 2 · Name“ mit Mini-Figur und blauer Countdown-Chip.

## Diagramme
- Netzdiagramm für die Bereiche, Linien für Verläufe, Akzentfarbe für „jetzt“, gestrichelt für den Vergleich.
- Jede Zahl im Diagramm ist antippbar und führt zur Aufschlüsselung.

## Auswahl-Karten und Fortschritt
- Eine Wahl aus mehreren ausführlichen Möglichkeiten (z. B. Schwerpunkt): ganze Karte tippbar, Symbol in runder Kachel,
  Name, ein Satz, kleine Kennzahlen darunter. Gewählt = blaue Umrandung und gefüllte Symbol-Kachel. Darunter eine Hauptaktion.
- Fortschritt über einen Block: flache Balken je Durchgang in einer Zeile. Geschafft = `--acc`, aktuell mit leichtem Ring,
  leichtere Wochen (Entlastung, Test) heller.
- Puls-Zonen als Liste: farbiger Strich, Zone, Name, Bereich rechtsbündig in bpm.

## Fenster und Blätter
- Blätter von unten (`openSheet`, `openForm`, `openChoice`), Kopf mit „Abbrechen“ und Aktion.
- Gleichartige Fenster haben dieselbe Höhe, Knöpfe sitzen immer an derselben Stelle (z. B. Medaillen-Momente).
- Haptik bei jeder Interaktion (`haptic(kind)`).

## Unterseiten
Seiten mit Unterseiten (heute Tools) zeigen keine Kapsel oben. Der Titel trägt einen kleinen Pfeil; Tippen öffnet ein Drop-down
(Karte 236 px, Zeilen 48 px, Symbol und Name, aktuelle Seite blau hinterlegt mit Haken), die Seite dahinter dunkelt leicht ab.
Wahl, Tippen daneben oder Scrollen schließt.

## Timer im Vollbild
Hintergrund `--board`, Zeit in Geist 800 mit festen Ziffernbreiten (Arbeit `--ink`, Vorlauf und Pause `--green`), Fortschritt als
Kapsel-Leiste in `--acc`, rechts bzw. unten eine weiße Karte. Werkzeuge oben als runde Glas-Knöpfe (Drehen, Minimieren, Pause, ✕).
In der Timer-Leiste bilden Pause und Vollbild eine Kapsel mit feinem Trenner, nichts schwebt zusätzlich über dem Inhalt.

## Bewegung (gilt für alles Neue)
- Jede Zustandsänderung bewegt sich weich, nichts springt hart um. Dauer etwa 0,3 s, Kurve `cubic-bezier(.3,.9,.4,1)` wie der Glas-Tropfen der Schalter.
- Wahl wechseln: die weiße Pille gleitet zur neuen Wahl. Knöpfe in einer Kapsel rutschen an ihren Platz, neue blenden mit kurzem Wachsen ein.
- Drücken: jede Kapsel und jeder Knopf gibt leicht nach (96 %, Umschalter 92 %) und federt zurück. Kein blaues Antipp-Leuchten.
- Aufklappen: Inhalt gleitet von oben ein. Blätter fahren von unten hoch.
- Zusammen mit der Haptik. Bei „Bewegung reduzieren“ im System keine Animation.

## Arbeitsweise
- Neue Oberflächen zuerst als Entwurf im Canvas zeigen, Rückfragen stellen, erst nach Zustimmung einbauen.
- Entwürfe immer direkt im Stil dieses Konzepts bauen, am besten in der echten App (Bildschirmfoto mit eingesetzten Bausteinen),
  nie frei nachgezeichnet. Vor dem Zeigen jeden Bildschirm gegen die Bausteine-Tabelle prüfen (Tippflächen, Chips vs. Knöpfe, keine neuen Bedienelemente).
- Eine Hauptaktion pro Seite und kein doppelter Weg: Im Modus „Einzeln“ springt „Erledigt“ auf der letzten Übung direkt zum nächsten Schritt
  (vorher Chip „Danach: …“). Wo ein Ergebnis eingetragen wird, kommt „Weiter zu …“ erst nach der Eingabe bzw. nach „Stimmt dein Ergebnis?“.
- Vor jedem neuen Arbeitsschritt alte Canvas-Boards löschen, dann die neuen anlegen.
