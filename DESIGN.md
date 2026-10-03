# Designkonzept Trainingsplan

Gilt für jede Seite und alles Neue. Ruhig, an iOS angelehnt, Handy zuerst (390 px).
Kurzfassung der Regeln steht auch in `CLAUDE.md`.

## Grundlagen
- Schrift: Geist für alles. Die Schrift-Einstellung (Klar, Marker, Handschrift) gilt nur für Zahlen und Mengen (`--hand`).
- Titel: groß und fett mit Marker-Strich darunter. Darüber eine Kopfzeile in Großbuchstaben (`.kicker`), z. B. „TAG 1 · DURCHGANG 4 · CA. 35 MIN“.
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
- Werte sind Kacheln (`.tile` in `.pick-grid`), Tippen öffnet ein Blatt von unten.
- Zahlen, Stufen, Listen, Datum: Rad-Blatt (`openSheet`). Keine Klapp-Listen (`<select>`), kein System-Datumsfeld.
- Zeiten: Zeit-Blatt (`openTimeSheet`), Rad Min/Sek, nochmal auf die Zeit tippen = Zahlentastatur.
- Freitext nur, wo es wirklich Text ist (Name, Notizen, Suche).
- Schalter: alle Checkboxen in `.check` sind „Glas-Tropfen“: an grün mit Strich, aus rot mit Kreis.

## Hinweise
- Erst der Ablauf, dann die Aktion, dann Tipps. Hinweise sammeln sich in einer ruhigen Tipps-Karte (`tipsHTML`).
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

## Diagramme
- Netzdiagramm für die Bereiche, Linien für Verläufe, Akzentfarbe für „jetzt“, gestrichelt für den Vergleich.
- Jede Zahl im Diagramm ist antippbar und führt zur Aufschlüsselung.

## Fenster und Blätter
- Blätter von unten (`openSheet`, `openForm`, `openChoice`), Kopf mit „Abbrechen“ und Aktion.
- Gleichartige Fenster haben dieselbe Höhe, Knöpfe sitzen immer an derselben Stelle (z. B. Medaillen-Momente).
- Haptik bei jeder Interaktion (`haptic(kind)`).

## Arbeitsweise
- Neue Oberflächen zuerst als Entwurf im Canvas zeigen, Rückfragen stellen, erst nach Zustimmung einbauen.
- Entwürfe immer direkt im Stil dieses Konzepts bauen, am besten in der echten App (Bildschirmfoto mit eingesetzten Bausteinen),
  nie frei nachgezeichnet. Vor dem Zeigen jeden Bildschirm gegen die Bausteine-Tabelle prüfen (Tippflächen, Chips vs. Knöpfe, keine neuen Bedienelemente).
- Eine Hauptaktion pro Seite und kein doppelter Weg: Im Modus „Einzeln“ springt „Erledigt, weiter“ auf der letzten Übung direkt zum nächsten Schritt
  (vorher Chip „Danach: …“). Wo ein Ergebnis eingetragen wird, kommt „Weiter zu …“ erst nach der Eingabe bzw. nach „Stimmt dein Ergebnis?“.
- Vor jedem neuen Arbeitsschritt alte Canvas-Boards löschen, dann die neuen anlegen.
