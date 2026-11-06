# Designkonzept Trainingsplan

Gilt für jede Seite und alles Neue. Ziel (Dennis, 6. November): Die App soll aussehen wie eine von Apple selbst entwickelte App.
Handy zuerst (390 px). Kurzfassung der Regeln steht auch in `CLAUDE.md`.

## Prinzipien nach Apple (Grundlage, seit 6. November 2026)
Quelle: Apples Human Interface Guidelines, Seite „Design principles“ mit allem, worauf sie verweist; Auszüge und Tabellen in
`design/apple-hig.md`. Diese Prinzipien stehen über allen anderen Regeln dieser Datei. Was ihnen widerspricht, steht unten unter
„Entschieden mit Dennis“ bzw. „Noch offen“ und wird mit Dennis entschieden, nicht still geändert.

1. **Zweck**: Jede Seite hat eine Aufgabe, jede Funktion muss ihren Platz verdienen. Was der Coach selbst entscheiden kann, fragt die App nicht.
   Im Training zählt nur, was jetzt dran ist (Apple „Workouts“).
2. **Selbstbestimmung**: Direkt zur Aufgabe, nichts im Weg. Geführte Abläufe (Fragebogen, Tour) sind überspringbar. Alles lässt sich
   rückgängig machen; nachgefragt wird nur vor Zerstörerischem. Unterbrechungen (Momente, Nachfragen) sparsam.
3. **Verantwortung**: Die App sagt, was sie warum entscheidet („Warum?“-Zeilen, Coach-Hinweise). Daten bleiben auf dem Gerät bzw. im
   eigenen Repository; Token und Kalender-Link nie in Export oder Logs.
4. **Vertrautheit**: Bausteine verhalten sich wie auf dem iPhone: Tab-Leiste unten, Blätter von unten mit „Abbrechen“ links und „Fertig“ rechts,
   Listen mit Pfeil für „geht tiefer“, Schalter in Listenzeilen. Gleiches sieht überall gleich aus und steht an derselben Stelle.
5. **Anpassbarkeit**: Hell und Dunkel, Textgröße, „Bewegung reduzieren“, Kontrast 4,5:1, nie nur Farbe. Inhalt und Steuerung bleiben an festen Stellen.
6. **Einfachheit**: Einfach heißt klar, nicht leer. Hierarchie über Reihenfolge, Abstand und Kontrast: das Wichtigste ist das Auffälligste,
   und es gibt pro Bildschirm genau ein Auffälligstes. Knappe Worte.
7. **Handwerk**: Ein festes System statt Einzelwerten: Textstile, Abstände, Radien, Farben. Nichts verrutscht, nichts wird abgeschnitten,
   jede Zahl hat feste Ziffernbreiten.
8. **Freude**: Das Gefühl ist „Energie und Zuversicht“. Prägende Momente (Rekord, Woche geschafft, Medaille) bleiben, aber als Ergebnis,
   nicht als Dekoration. Die Animationen bleiben, wie sie sind (Dennis, 5. November).
9. **Das Ganze**: Jede neue Oberfläche wird an allen acht Punkten gemessen, nicht nur am schönsten.

### Systemregeln daraus
- **Textstile statt Einzelgrößen** (Apple, Geist statt SF Pro): Großer Titel 34/41 fett, Titel 1 28/34, Titel 2 22/28, Titel 3 20/25,
  Überschrift 17/22 halbfett, Text 17/22, Hinweis 16/21, Unterzeile 15/20, Fußnote 13/18, Beschriftung 12/16 (Untergrenze bei uns 13,
  im Training 15). Keine weiteren Größen außer der einen großen Anzeige-Zahl je Bildschirm. Gewichte nur 400, 500, 600, 700.
- **Eine Anzeige-Zahl je Bildschirm**: im Training ist das die Zeit. Alles andere (Vorgabe, Übung, Zähler) ordnet sich darunter in
  Textstilen ein. Zahlen mit festen Ziffernbreiten (`tabular-nums`).
- **Farbe hat genau eine Bedeutung**: Akzent = tippbar, gewählt, jetzt. Grün = geschafft bzw. an. Rot = Schmerz, Gefahr. Text in
  Abstufungen (primär `--ink`, sekundär `--ink2`, dazu tertiär für Platzhalter).
- **Ebenen**: Inhalt auf festen Flächen (Hintergrund, Karte, gruppierte Liste); Glas nur für schwebende Steuerung (Tab-Leiste, Werkzeugknöpfe,
  Trainer-Kopf und -Fuß).
- **Abstände und Radien aus einem Raster**: Abstände 4, 8, 12, 16, 20, 24, 32; Seitenrand 16 bzw. 20; Radien: Kapsel (voll rund), Karte,
  Liste innen, klein. Keine Zwischenwerte.
- **Hervorgehoben höchstens ein bis zwei Knöpfe je Ansicht**, Unterschiede über den Stil, nie über die Größe. Knöpfe mit Verb.

### Entschieden mit Dennis (Schritt 0, 6. November 2026, Vergleich https://claude.ai/artifact/KBuHu6doTBGVrsMKLAQH8i)
- **Schalter**: Standard wie Apple, aus grau, an grün, runder Knopf (51 × 31). Einstellung „Farbige Schalter“ holt den alten Stil zurück
  (aus rot mit Kreis, an grün mit Strich; Dennis: „das Rot ist auch bei Apple in den Bedienungshilfen“, Apple: Ein/Aus-Beschriftungen).
- **Reiterleiste**: jeder Reiter immer mit Namen (Symbol, darunter ein Wort), die Leiste ändert beim Wechseln ihre Breite nicht.
- **Glas**: nur für schwebende Steuerung (Reiterleiste, Kopfleisten, Steuerung im Trainer). Im Inhalt feste Flächen (leicht graue Füllung,
  kein Schatten, keine Unschärfe): Umschalter, Wochenleiste, Nebenknöpfe, runde Knöpfe, Wert-Zeilen.
- **Aussehen** (Variante C): Hell/Dunkel folgt immer dem Handy, keine Wahl Hell | System | Dunkel mehr, keine Farbpaletten mehr, eine feste
  Akzentfarbe. Die Textgröße bleibt (im Browser gibt es kein Dynamic Type). Gespeichertes `S.theme`, `S.palette`, `S.color`, `S.paper` bleibt in `DEF`, wird nicht mehr benutzt.
- **Reiter wie bei Apple**: Heute, Plan, Tools, Profil (Wichtigstes links). „Coach“ heißt „Heute“, der Plan ist ein eigener Reiter statt hinter
  dem (i). Einstellungen bleiben hinter dem Regler im Profil (wie Apple Fitness).

### Schritt 1 Fundament (6. November 2026, Vergleich https://claude.ai/artifact/2478AiQNqFKHbLGDWeMGxP)
- Textstile als Variablen `--fs-lt` 34, `--fs-t1` 28, `--fs-t2` 22, `--fs-t3` 20, `--fs-body` 17, `--fs-co` 16, `--fs-sub` 15, `--fs-fn` 13, `--fs-cap` 12; `--h1` 34; Grundtext 17.
  Neue Regeln nehmen nur diese Variablen. Gewicht höchstens 700.
- Radien `--r-s` 8, `--r-m` 14, `--r-l` 20 (Karte), `--r-cap` 999; Kreise bleiben 50 %. Abstände nur 4, 8, 12, 16, 20, 24, 32 (2 px nur als Feinkorrektur).
- Ausgenommen bis Schritt 3: Trainer (`#fs`, `.fs-*`, `#tbar`) und die großen Anzeige-Zahlen.

### Noch offen (Schritt 2 und folgende)
- Trainer (gemessen bei 390 px): Zeit 66 px, Vorgabe 47 px blau, Zähler-Wert 36 px, Übungsname 33 px, „Geschafft“ 20 px, alles außer dem Zähler
  in Gewicht 800 – vier fast gleich laute Größen statt einer Anzeige-Zahl (Dennis: „der Timer in Relation zu allen anderen Feldern“).

## Fünf Grundsätze (älter, gehen in den Prinzipien oben auf)
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

## Farbe und Betonung (Dennis, 5. November, nach den „14 Rules of Design“)
Blau (`--acc`) ist ein Hinweis, kein Schmuck. Es steht nur für zwei Dinge:
1. **Jetzt und hier**: heute in der Wochenleiste, der laufende Schritt bzw. die laufende Minute, die gewählte Pille in einer Kapsel,
   die aktuelle Stufe, die eigene Linie im Diagramm.
2. **Die eine Hauptaktion** einer Seite (`.btn.primary`) und im Training die Vorgabe („3 Wdh.“, Watt, Gewicht).
Alles andere ist `--ink` bzw. `--ink2`: Werte in Wert-Zeilen, Mengen in Listen, Schritt-Nummern, Zähler-Knöpfe, Runden-Punkte,
Fortschrittsbalken, erledigte Tage und Stufen, (i)-Knöpfe, Kopfzeilen, Aufzählungspunkte, Infos. Geschafft ist ein Haken (grün nur bei Erfolg, `--green`).
- Betonung über Größe und Lage, nicht über Farbe: das Wichtigste groß und oben, die Hauptaktion im ersten Bildschirm.
- Ohne Daten keine große „0“: sagen, wodurch der Wert entsteht („Gesamtwert entsteht“).
- „Neu“ und ähnliche Hinweise sind kleine Chips in der Zeile (`.tl-neu`), keine großen Knöpfe.
- Gründe und Erklärungen stehen hinter einer aufklappbaren Zeile („Warum 17:00?“), wenn sie den Ablauf nach unten drücken.
- Eine Frage am Rand (Arbeitszeiten, Sicherung) ist eine ruhige Zeile unten, keine große Karte über dem Inhalt.
- Animationen (gleitende Pille, Nachgeben, Medaillen, Momente) bleiben, wie sie sind (Dennis).
- Farbpaletten (Einstellungen › Aussehen › Farben, `PALETTES`): Klar, Wald, Ozean, Beere, Graphit, dazu Limette, Karamell, Kiefer, Mokka, Koralle,
  Retro, Ton, Bauhaus (Dennis' Bilder) mit eigenem Dunkelmodus. Akzent hell immer mindestens 4,5:1 auf Hintergrund und Karte (darum dunkler als die Bildfarbe). Neue Farben nie fest als Blau
  schreiben, immer `--acc`, damit jede Palette passt; Hintergründe über `--board`/`--paper`/`--fill`.

## Grundlagen
- Hellmodus je Farbpalette mit eigenem Hintergrund und Karten (`data-pal`; früher Weiß/Kreide/Leinen/Nebel über `data-paper`), Hintergrund je eine Stufe dunkler.
- Dunkelmodus in Graphit, passend zum App-Symbol: Hintergrund `#1E1F23`, Karten `#2A2B30`, Kapseln `#24252A`, Pille `#41424A`,
  Grafik-Fläche `#33343A`, Linien `#36373D`. Jede Ebene eine Stufe heller als die darunter.
- Schrift: Geist für alles. Die Schrift-Einstellung (Klar, Marker, Handschrift) gilt nur für Zahlen und Mengen (`--hand`).
- Titel: groß und fett mit Marker-Strich darunter. Darüber eine Kopfzeile in normaler Schreibung (`.kicker`), z. B. „Tag 1 · Durchgang 4 · ca. 35 Min“.
- Karten: weiß (`--paper`), runde Ecken (22 px), weicher Schatten. Nichts Verspieltes.
- Farben nur über Variablen: `--acc` (Akzent, vom Nutzer wählbar), `--ink`, `--ink2`, `--board`, `--paper`, `--fill`, `--line`, `--red`, `--green`, `--on`, `--off`, `--pill`.
  Dunkelmodus über `data-theme`. Neue Farben immer für Hell und Dunkel festlegen.
- Oben und unten keine harten Kanten: Hintergrund läuft durch, Inhalte blenden weich aus.
- Tippflächen mindestens 44 px.
- Zeilenumbruch (Dennis): Ein Zusatz hinter dem Punkt („Zug · Ring Pull-up“, „3 Wdh. · 1RM 132 kg“) bleibt zusammen. Passt er nicht mehr
  in die Zeile, rutscht er mit dem Punkt komplett in die nächste (`dotSub()`, Klasse `.nobr`). Nie mitten im Zusatz trennen.

## Schaltflächen: Kapsel-Konzept
Keine eckigen grauen Knöpfe. Jede Schaltfläche ist genau einer dieser Bausteine:

| # | Baustein | Wann | Klassen |
|---|----------|------|---------|
| 1 | Umschalter | eine Wahl aus wenigen (2–5) | `.seg` mit `.seg-btn`, Wahl als weiße Pille (`--pill`, Text `--acc` = „gewählt“) |
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
  der Vorschlag, Tippen auf die Zahl übernimmt ihn. Hat die App einen Vorschlag selbst eingesetzt (EMOM-Minute vorbei), bleibt er grau mit
  „Vorschlag übernommen“, bis er bestätigt oder geändert ist; so sieht der Coach nie eine Zahl als geschafft, die keiner bestätigt hat. Ein Wert, den schon etwas anderes zählt (Runden über das Abhaken), steht nicht noch einmal da.
- Ausnahme: Werte von der Uhr oder vom Gerät (Dauer, Puls, Strecke, Watt) bleiben Kacheln (`.tile` in `.pick-grid`) mit Rad-Blatt,
  weil man sie abliest und auf einmal einträgt. Ebenso die Stufe im Beweglichkeits-Check.
- Stufen setzt der Coach: grüner Chip (`kStageChip`, `coachStageHTML`), nicht wählbar, neben der Spanne in einer Reihe („3–6 Wdh.“,
  „✓ Stufe 4 ● Leichtes Band“). Bei neuen Übungen schätzt er den Start und sagt grau darunter, woraus. Testtage wählen die Stufe als Wert-Zeile, denn dort wird sie gemessen.
- Einstellungswerte, die man selten ändert (Profil, Stand, Startdatum, Challenge-Datum und -Ziel), sind **Wert-Zeilen**
  (`valRows([valRow(…)])`, `.vrows`/`.vrow`): eine Glas-Fläche in `--board`, je Zeile Name links (darunter grau ein Zusatz),
  Wert rechts in `--ink` (geschätzt grau), dann der Pfeil. Feine Trenner, Zeilen mindestens 56 px. Tippen öffnet das Rad-Blatt.
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
- Stufen mit Band werden ausgeschrieben („Normales Band“) in Bandfarbe, ohne Punkt davor (`stageHTML`, `.bst` mit `--bc`); gespeichert bleibt der kurze Name.
  Der Punkt sitzt mittig auf Höhe der Großbuchstaben und hat davor und danach denselben Abstand, auch in Chips. Immer `stageHTML` benutzen.
- Bandfarben: Standard in `BANDS`, je Band aus 10 Farben (`BAND_PAL`) wählbar, passend zu den echten Bändern (`bandColor()`).

## Leitern
- Eine Leiter ist ein Aufstieg: Stufe 1 unten, die schwerste oben, darüber „↑ Schwerer“, darunter „Leichter“.
- Stufen liegen in einer Glas-Kapsel, jede Zeile mindestens 44 px, Nummer im Kreis (Bandfarbe, Weste schwarz, erreichte Stufen grau `--ink2`).
- „Aktuelle Stufe“ ist die weiße Pille wie die Wahl in jeder Kapsel. Die höchste je geschaffte Stufe trägt den goldenen Chip „★ Bestwert“.
- Text bricht nicht um: zu lange Namen enden mit „…“ und laufen beim Antippen einmal durch, blenden aus und stehen wieder am Anfang.

## Übungsgrafiken
- Immer die Maskottchen-Vorlage (`design/maskottchen/VORLAGE.md`). Bildfeld überall gleich groß, Figur in einer eigenen Fläche (`--fig`):
  hell weiß mit dunkler Figur, dunkel „Kreide auf Dunkel“ (helle Striche, Fläche knapp heller als die Karte).
- Im Training nur bei der Übung, die gerade dran ist. Ähnliche Übungen werden über den Text unterschieden (z. B. Griff).
- Fehlt eine Animation: Platzhalter mit winkendem Maskottchen (`_wave`), daneben „Grafik folgt“ und ein kurzer Satz (`figBox`).

## Ablauf im Training
- Jede Übung erklärt sich („So geht’s“). Halteübungen und Skills sagen zusätzlich, wie man hineinkommt und wieder heraus
  („So kommst du rein“, „Raus: …“), immer sichtbar, nicht aufklappbar.
- Zwei Modi je Trainingsart (Einstellungen › Training): **Liste** und **Einzeln**. Standard: Liste, nur Cool-down einzeln.
- Liste: alle Übungen in einer Glas-Kapsel wie die Leiter. Die aktuelle Übung ist die offene weiße Pille mit Figur, Hinweis und `.btn.small` „Erledigt“.
  Erledigt = grüner Haken an der Menge, Text grau. Keine Abhak-Kreise.
- Einzeln: eine Karte mit Chip „Übung 2 von 9“ (bei Runden zusätzlich „Runde 3“), Figur, Menge und Name, Hinweis,
  darunter `.bgrp` „‹ Zurück | Erledigt ›“. Auf der letzten Übung Chip „Danach: …“, „Erledigt“ springt direkt weiter.
- Wischen immer gleich: nach links = erledigt / weiter / +, nach rechts = zurück / rückgängig / – (umkehrbar).
- Zähler (`.stepper`) nur in der Liste. Am Ende eines AMRAP immer „Stimmt dein Ergebnis?“ mit den gezählten Werten.
- EMOM: der Timer schaltet weiter. In der laufenden Karte Chip „Als Nächstes · Min 2 · Name“ mit Mini-Figur und Countdown-Chip.

## Diagramme
- Netzdiagramm für die Bereiche, Linien für Verläufe, Akzentfarbe für „jetzt“, gestrichelt für den Vergleich.
- Jede Zahl im Diagramm ist antippbar und führt zur Aufschlüsselung.

## Auswahl-Karten und Fortschritt
- Eine Wahl aus mehreren ausführlichen Möglichkeiten (z. B. Schwerpunkt): ganze Karte tippbar, Symbol in runder Kachel,
  Name, ein Satz, kleine Kennzahlen darunter. Gewählt = blaue Umrandung und gefüllte Symbol-Kachel. Darunter eine Hauptaktion.
- Fortschritt über einen Block: flache Balken je Durchgang in einer Zeile. Geschafft = `--ink`, aktuell `--acc` mit leichtem Ring,
  leichtere Wochen (Entlastung, Test) heller.
- Puls-Zonen als Liste: farbiger Strich, Zone, Name, Bereich rechtsbündig in bpm.
- Fragen (Fragebogen beim Start): oben Zurück, Fortschritt als Striche, „Überspringen“; Kopfzeile grau (`--ink2`), große Frage, ein Satz.
  Antworten als Leiter-Kapsel (`.ob-cap`, Zeilen mit Figur, schwerste oben, „↑ Schwerer“/„Leichter“): ein Tippen wählt und geht weiter.
  Mehrfachwahl als Kacheln (`.ob-tile`), Zahlen als große Kacheln mit Rad. Haupt- bzw. Nebenaktion immer unten an derselben Stelle (`.ob-foot`).

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
