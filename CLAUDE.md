# Trainingsplan – Projektinfos für Claude Code

## Was das ist
Offline-Web-App (PWA) für Dennis' Trainingsplan „Calisthenics × CrossFit“
(Tag 1–7, dann von vorn). Gehostet über GitHub Pages aus dem Branch `main`,
Ordner `/`. Genutzt vor allem auf einem Android-Handy in Chrome, als installierte App.

## Dateien
- `index.html`: die komplette App (HTML, CSS, JavaScript in einer Datei, kein Build-Schritt)
  - erster `<style>`-Block: nur Schriften als Base64 – nicht bearbeiten
  - zweiter `<style>`-Block: nur die Schrift Geist als Base64 – nicht bearbeiten
  - dritter `<style>`-Block: Design (Stil A „Emaille“: ruhig, an iOS angelehnt, Whiteboard nur als Akzent)
  - `<script id="plan-data">`: Glossar, Leitern, Testtage als JSON
  - `<script id="lib-data">`: Übungsbibliothek (Equipment mit Score, 263 Übungen, Leitern, Metcon-Pool, Aufwärmen, Plätze) als JSON,
    dazu `mobility` (Beweglichkeits-Check und Routinen, aus Cowork). `equipment` ist immer eine Liste von Alternativen-Gruppen.
    Wird beim Start in `GL`/`LAD` gemischt; alte IDs, Namen und Stufen nie ändern, neue Stufen nur hinten anhängen.
  - Haupt-`<script>`: Logik für Heute, Timer, Verlauf, Übungen, Plan, Einstellungen, Sync
- Reiter von links nach rechts: Tools (Timer, Übungen, Routinen), Coach (nur Heute), Profil.
  Der Plan (Regeln, Methode, Tests) ist eine versteckte Seite `plan` hinter dem runden Info-Knopf oben rechts auf Heute.
  Unterseiten über den Umschalter oben (`GROUPS` im Skript). Einstellungen und Sync sind eine
  versteckte Seite `einst` (Regler-Symbol oben rechts im Profil, `HIDDEN` im Skript).
- Profil: Kopfkarte mit rundem Foto, Fortschrittsring (Gesamtwert 0–99), Stufe Bronze/Silber/Gold/Platin,
  Name und „Diese Woche“. Darunter eine Kapsel wie die Reiterleiste (nur die aktive Ansicht zeigt ihren Namen):
  Equipment, Erfolge, Verlauf, Werte (`PVIEWS`).
  Werte: fünf Bereiche nach den motorischen Grundfähigkeiten, alphabetisch: Ausdauer, Beweglichkeit, Koordination, Kraft
  (Teile Zug, Druck, Beine, Rumpf), Schnellkraft (`AREAS`, Zuordnung je Leiter in `areaOf`). Netzdiagramm (`radarSVG`) mit
  Stand vor 4 Wochen, darunter jeder Bereich mit Verlaufslinie; Tippen öffnet die Aufschlüsselung (`areaDetailHTML`) mit Kurve,
  Teil-Filter, Leitern (Tippen zeigt ihre Stufen-Kurve `devLadderHTML`) und bei Ausdauer/Schnellkraft den Lauf (`devRunHTML`).
  Jede Leiter zählt 40 + 59 × ((Stufe − 1) + Anteil der Wdh. in der Zielspanne) / Stufenzahl; Bereich = Mittel der begonnenen
  Leitern, Gesamtwert = Mittel der Bereiche mit Daten. Alles wird aus den Einheiten berechnet (`ladderStates`).
  Beweglichkeit kommt aus den Mobility-Leitern (`g_mob_*`), gemessen im Beweglichkeits-Check (`log.mob`).
- Mobility (`MOB`, `ROUT`): Cool-down passend zum Tag als optionaler letzter Schritt an Krafttagen (`coolStep`, Schalter `S.cooldown`,
  `log.cool`), auf Lauftagen als Karte nach dem Lauf. Ruhetag-Flow A (Tag 5) und B (Tag 7) auf dem Ruhetag. Tools › Routinen startet
  alle Routinen frei, auch „Guten Morgen“. Der Player (versteckte Seite `routine`, Timer-Art `routine`, `paintRoutine`) führt Übung für
  Übung, „je Seite“ erst links, dann rechts. Fertige Routinen außerhalb des Trainings sind Einträge `kind: 'mobility'` und stehen unter
  Profil › Verlauf › Mobility; sie zählen nicht als Training (Pause, „Diese Woche“).
  Beweglichkeits-Check: letzter Schritt an Tag 1 im Einstiegstest und im Test-Durchgang (`mobCheckStep`).
  Erfolge: je Leiter eine Metall-Medaille mit Lorbeerkranz (ein Blattpaar pro Stufe), letzte Stufe Platin.
  Nach dem Speichern zeigt `showMoment()` neue Stufen: Geschenk (erste Medaille), Glühen (Aufstieg),
  Anlaufen mit aufmunterndem Spruch (Abstieg), mit Vibrationsmuster (`buzz`).
- Coach › Heute: zuerst eine kurze Übersicht (`renderHeute`, Ablauf als nummerierte Schritte) mit „Training starten“.
  Danach Schritt für Schritt (`stepsOf`, `stepPageHTML`): Krafttag Aufwärmen, Handstand, Kraft, Metcon; Testtag eine Übung
  pro Schritt; Murph ein Schritt. Der aktuelle Schritt steht im Entwurf (`_step`, `_at` in `tp.drafts`).
  Im Training (Schritt-Seiten) ist die Reiterleiste ausgeblendet (`body.focus`); oben rechts ein kleines X (`ACT.quit`)
  fragt nach: Zwischenspeichern (weiter beim Schritt), Training abbrechen (Entwurf weg) oder Weiter trainieren.
  Lauftage haben keine Schritte und keinen Timer, nur „Ergebnis von der Uhr“: Dauer, Puls Ø, Strecke (km, 3 Nachkommastellen), Tempo errechnet.
  Tempo und Puls werden mit den Läufen der gleichen Art der letzten 6 Wochen (mindestens 3) verglichen (`runVerdict`).
- Stufen und Wiederholungen wählt man mit dem Rad-Blatt von unten (`openSheet`, `ACT.pick`), nicht mit Textfeldern.
  Stufen-Listen bleiben in der Reihenfolge der Leiter (nicht alphabetisch). Im EMOM zeigt jedes Feld seine Minute.
- Jeder Schritt bringt seinen Timer fertig eingestellt mit (helle Glas-Leiste `#tbar`, `paintMini`), Timer-Art `block`
  für Aufwärmen und Handstand. Die laufende EMOM-Übung ist blau umrandet. Vorlagen aus dem Plan gibt es nur dort.
- Tools › Timer ist frei einstellbar: EMOM (Alle, Runden), AMRAP (Dauer), Intervall (Arbeit, Pause, Runden), Auf Zeit
  (Zeitlimit oder ohne), immer mit 10 s Vorlauf. Einstellung je Art in `S.tmr` (`tmr()`, nur auf dem Gerät).
  Zeiten wählt man im Zeit-Blatt (`openTimeSheet`): Rad Min/Sek in 1er-Schritten, nochmal auf die Zeit tippen = Zahlentastatur
  (Ziffern laufen von rechts ein). Auch die große Zeit lässt sich antippen.
- Metcon-Übungen ohne eigene Kraftleiter (`metconLad`) haben eine Stufe, gespeichert in `metcon.stages`.
- Orte: sechs feste Orte mit Symbol (`ORTE_FIX`: Zuhause, Gym, Park, Garage, Arbeit, Unterwegs), je eigene Equipment-Liste.
  In `S.orte` je `{id, k, on, eq, zh}`; angezeigt werden nur eingeschaltete (`on`), mindestens einer bleibt an.
  Einschalten über den Stift neben der Orte-Kapsel unter Profil › Equipment (`ACT.orte`). Früher frei benannte Orte
  ordnet `ensureOrte()` einem festen Ort zu (IDs, Geräte und `S.picks` bleiben). Auch Alltagsgegenstände (`eq_zuhause`) werden je Ort angekreuzt.
  Blätter mit Textfeld passen sich an die Tastatur an (`fitKeyboard`, `interactive-widget=resizes-content`).
  Der Plan füllt die Plätze (`LIB.plaetze`) für den gewählten Ort (`planFill`): Kraft bleibt bei der gewählten Leiter (`S.picks`),
  eine Leiter mit mehr Nutzen wird als „Neu freigeschaltet“ vorgeschlagen (Später = bis zum nächsten Durchgang, `S.pickSkip`).
  Metcon wechselt pro Durchgang aus den 4 nützlichsten passenden Einträgen. Lauftage: Laufen oder Ergometer (Watt), getrennt verglichen.
- Listen nach Nutzen sortieren (höchster zuerst), Equipment nach Score. Nur wo es keinen Nutzen gibt (Profil-Menü, Bereiche), alphabetisch.
  Reiterleiste: schwebende Glas-Kapsel ohne Glanz, nur der aktive Reiter zeigt seinen Namen.
  Alle Umschalter sind Kapseln in diesem Stil (`.seg`, `.cap`).
- Haptik bei allen Interaktionen (`haptic(kind)`): Einstellungen › Haptik (versteckte Seite `haptik`) mit Hauptschalter
  und je Aktion Aus/Leicht/Mittel/Stark (`HAPT_KINDS`, pro Gerät in `S.hapt`, nicht synchronisiert). Ändern spielt die Stärke sofort ab.
- Manifest `display: standalone`. Ist `vollbild` an (Einstellung, Standard an), wechselt die
  installierte App beim ersten Tippen per `requestFullscreen` ins Vollbild (`goFullscreen()`).
  Nach dem Minimieren holt das nächste Tippen es zurück.
  Manifest-Vollbild nicht verwenden: Chrome lässt dort den Kamera-Bereich oben nach dem Start schwarz.
  Auf dem iPhone zeichnet sie bis unter Statusleiste und Home-Balken (`black-translucent`).
  Oben und unten keine harten Kanten: Hintergrund läuft durch, Inhalte blenden weich aus.
- `sw.js`: Service Worker für den Offline-Betrieb
- `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`

## Regeln
- Die App muss offline laufen: keine CDNs, keine externen Schriften oder Skripte.
- Ändert sich außer `index.html` eine Datei oder kommt eine neue dazu:
  `CACHE` in `sw.js` hochzählen und neue Dateien in `ASSETS` eintragen.
- Gespeicherte Daten nie brechen. localStorage-Schlüssel: `tp.state`, `tp.logs`,
  `tp.drafts`, `tp.deleted`, `tp.sync`, `tp.foto` (Profilfoto, nur auf dem Gerät). Neue Felder mit Standardwert in `DEF` ergänzen.
- Export-Format `{exportiert, stand, einheiten}` muss importierbar bleiben.
- Sync: Datei `trainingsplan.json` im privaten Daten-Repository des Nutzers,
  Format `{app, v, standTs, stand, einheiten, geloescht}` kompatibel halten.
  Den Token nie in Code, Export oder Logs schreiben.
- Aussehen (Farbe, Schrift, Hell/Dunkel) bleibt pro Gerät und wird nicht synchronisiert.
- Texte auf Deutsch, Übungsnamen auf Englisch, kurze klare Sätze.
- Handy zuerst (390 px Breite), Tippflächen mindestens 44 px.
- Design: Geist für alles. Große fette Titel mit Marker-Strich darunter, weiße Karten
  mit runden Ecken und weichem Schatten, nichts Verspieltes. Die Schrift-Einstellung
  (Klar, Marker, Handschrift) gilt nur für Zahlen und Mengenangaben.
  Farben über CSS-Variablen (`--acc`, `--ink`, `--board`, `--paper`, `--fill`),
  Dunkelmodus über `data-theme`.
- Schalter: alle Checkboxen (`.check input`) sind Schalter „Glas-Tropfen“: an = grün mit Strich
  (`--on` #4DBF79), aus = rot mit Kreis (`--off` #EE6A5C). Beim Umschalten wächst der Knopf
  kurz an und setzt sich weich ab (Klasse `live` nach Änderung).

## Kapsel-Konzept (gilt für alles Neue)
Ausführlich in `DESIGN.md` (vor jeder neuen Oberfläche lesen). Keine eckigen grauen Knöpfe. Jede Schaltfläche ist einer dieser Bausteine:
1. Umschalter (eine Wahl aus wenigen): Glas-Kapsel `.seg` mit `.seg-btn`, Wahl als weiße Pille (`--pill`, Text `--acc`).
2. Kapsel mit Symbolen (viele Ziele, wenig Platz): `capHTML()` / `.cap` mit `.cap-btn`, nur die Wahl zeigt ihren Namen
   (Reiterleiste, Profil-Ansichten, Orte). Tage 1–7 auf Heute: Kapsel `.pills`, dran = gefüllt in `--acc`, angeschaut = weiße Pille.
3. Hauptaktion: `.btn.primary` (volle Kapsel in `--acc`), eine pro Seite, meist `.block` über die ganze Breite. Speichern: `.btn.save` (grün).
4. Nebenaktion: `.btn` (Glas-Kapsel, dunkle Schrift), klein `.btn.small`.
5. Gruppe zusammengehöriger Nebenaktionen: `.bgrp` mit Knöpfen darin, feine Trenner (z. B. Exportieren | Importieren).
6. Gefährlich: `.btn.red` bzw. `.bgrp button.red` (rote Schrift), immer mit Nachfrage (`twoStep` oder `openChoice`).
7. Zähler: `.stepper` mit runden – / + und dem Wert in der Mitte.
8. Zurück und Werkzeuge: runde Glas-Knöpfe nur mit Symbol (`.rbtn`, Zurück mit Chevron, Stift, Regler).
Textlinks nur im Fließtext und in Blatt-Köpfen (Abbrechen / Fertig). Reine Infos bleiben Chips (`.chip`, nicht tippbar).
Eingabewerte sind Kacheln (`.tile`) mit Rad-Blatt, keine `<select>` und kein Datumsfeld. Hinweise: erst Ablauf, dann Aktion, dann Tipps-Karte (`tipsHTML`).
Bandstufen ausgeschrieben mit Farbpunkt (`stageHTML`); Farbe je Band wählbar unter Profil › Equipment (`S.bandCol`, synchronisiert). Tippflächen mindestens 44 px.

## Trainingslogik (Kurzfassung)
- Tag 1 Lift Off (Kraft Zug), Tag 2 Base Builder (Lauf locker), Tag 3 Push Through (Kraft Druck), Tag 4 Redline (Intervall-Lauf),
  Tag 5 Rest Day, Tag 6 Full Circle (Kraft Zug + Druck, leichter), Tag 7 Rest Day. Der Name (`name` in `DAYS`) verrät nicht den Inhalt.
- Krafteinheit: 8 Min Aufwärmen, 5 Min Handstand, EMOM 12 (4 Runden, 3–6 Wdh., RIR 2),
  Metcon AMRAP 8.
- Erster Tag 1 im Monat (frühestens 4 Wochen nach Start) = Murph.
  Beginnt ein Durchgang in den letzten 7 Tagen des Monats: Test-Durchgang.
- Durchgang 1 und 2 nach dem Einstiegstest: Kurzversion (Kraft 3 Runden, Metcon 5 Min).

## Vor dem Abschluss
- Prüfen, dass `index.html` ohne JavaScript-Fehler lädt und alle drei Reiter mit ihren Unterseiten funktionieren.
- Die Änderung im Pull Request kurz auf Deutsch beschreiben.
- Dem Nutzer am Ende immer den vollständigen Link zum Pull Request nennen.
