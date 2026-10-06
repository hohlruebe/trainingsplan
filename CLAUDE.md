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
  - `<script id="lib-data">`: Übungsbibliothek (Equipment mit Score, 265 Übungen, Leitern, Metcon-Pool, Aufwärmen, Plätze) als JSON,
    dazu `mobility` (Beweglichkeits-Check und Routinen, aus Cowork). `equipment` ist immer eine Liste von Alternativen-Gruppen.
    Wird beim Start in `GL`/`LAD` gemischt; alte IDs, Namen und Stufen nie ändern, neue Stufen nur hinten anhängen.
  - `<script id="fam-data">`: Übungsfamilien von Cowork (Kopie von `design/familien.json`, beide gleich halten). 48 Familien,
    jede Übung (ohne Mobility) genau einmal; je Variante `art` (`stufe` mit `rang` und `ziel`, `variante`, `tempo` mit `vermerk`),
    je Familie `bereich`, `ebene`, `voraussetzt` (`familie`, `ab_rang`), `fuehrt_zu`, `leiter`. Nur ergänzend, IDs der Übungen bleiben.
  - `<script id="maskottchen">`: Kopie von `design/maskottchen/maskottchen.js` (Übungsgrafiken), beide gleich halten
  - Haupt-`<script>`: Logik für Heute, Timer, Verlauf, Übungen, Plan, Einstellungen, Sync
- Reiter von links nach rechts: Tools (Timer, Übungen, Mobility, 1RM = One Rep Max), Coach (nur Heute), Profil.
  Der Plan ist eine versteckte Seite `plan` hinter dem runden Info-Knopf oben rechts auf Heute (`renderPlan`): „Dein Plan“ mit
  Schwerpunkt-Karte, Karte „Woche“ (‹ › blättert durch die Durchgänge des Blocks, `ui.planDg`; Block-Leiste und Tage-Kapsel wie auf Heute,
  `ui.planTag`; darunter der Ablauf des Tages als nummerierte Schritte, `planDayHTML`/`tlHTML`, berechnet über `planPreview`, das
  `S.durchgang` nur kurz umstellt; künftige Tage mit Hinweis „Vorschau“). Darunter „Wissen“ als Liste (`PLAN_SUB`), jeder Punkt eine
  eigene Seite (`ui.planSec`, `plan-sec`): Regeln, Methode, Steigerung, Bänder, Pause, Murph und Test-Durchgang, Einstiegstest, Skill-Ziele.
  Jede Wissens-Seite: Karte mit nummerierten Schritten (`W(steps, extra, tips, pre)` in `renderPlan`, `tlHTML`), ggf. Tabelle, dann Tipps-Karte.
  Unterseiten über den Titel: Pfeil neben dem Titel, Tippen (oder nochmal auf den Reiter) öffnet ein Drop-down mit Symbol je Seite,
  aktuelle blau mit Haken (`subTitle`, `SUB_IC`, `ui.subOpen`, `GROUPS` im Skript). Keine Kapsel oben mehr; Scrollen oder daneben tippen schließt. Einstellungen und Sync sind eine
  versteckte Seite `einst` (Regler-Symbol oben rechts im Profil, `HIDDEN` im Skript).
- Desktop-Ansicht (`deskOn`, Klasse `html.desk`): automatisch ab 1024 px mit Maus/Trackpad (`MQ_DESK`), oder fest über Einstellungen ›
  Gerät › Ansicht Automatisch/Handy/Desktop (`S.layout`, nur auf dem Gerät, nicht in `SYNC_KEYS`). Seitenleiste links (`#side`, `sideHTML`,
  `SIDE`) statt Reiter-Kapsel und Titel-Drop-down. Heute in zwei Spalten (`.dk2`: Ablauf/Start links, Block, Fortschritt und
  `weekCardHTML` rechts). Training ohne Seitenleiste (`body.focus`), Inhalt etwas größer (`zoom`), rechts `.dk-side` mit großem Timer
  (`#tbar` als Karte, Zeit im Ring, aus 2–3 m lesbar) und Ablauf (`.dk-steps`). Tastenkürzel: Leertaste Timer, → Erledigt/Weiter,
  ← Zurück, F Vollbild. Übungen: Liste links, Familie rechts (`.dk-lib`). Blätter als Fenster in der Mitte. Am Handy ändert sich nichts.
- Profil: Kopfkarte mit rundem Foto, Fortschrittsring (Gesamtwert 0–99), Stufe Bronze/Silber/Gold/Platin,
  Name und „Diese Woche“. Darunter eine Kapsel wie die Reiterleiste (nur die aktive Ansicht zeigt ihren Namen):
  Erfolge, Verlauf, Werte (`PVIEWS`). Orte und Equipment liegen in Tools › Übungen.
  Werte: fünf Bereiche nach den motorischen Grundfähigkeiten, alphabetisch: Ausdauer, Beweglichkeit, Koordination, Kraft
  (Teile Zug, Druck, Beine, Rumpf), Schnellkraft (`AREAS`, Zuordnung je Leiter in `areaOf`). Netzdiagramm (`radarSVG`) mit
  Stand vor 4 Wochen, darunter jeder Bereich mit Verlaufslinie; Tippen öffnet die Aufschlüsselung (`areaDetailHTML`) mit Kurve,
  Teil-Filter, Leitern (Tippen zeigt ihre Stufen-Kurve `devLadderHTML`) und bei Ausdauer/Schnellkraft den Lauf (`devRunHTML`).
  Jede Leiter zählt 40 + 59 × ((Stufe − 1) + Anteil der Wdh. in der Zielspanne) / Stufenzahl; Bereich = Mittel der begonnenen
  Leitern, Gesamtwert = Mittel der Bereiche mit Daten. Alles wird aus den Einheiten berechnet (`ladderStates`).
  Beweglichkeit kommt aus den Mobility-Leitern (`g_mob_*`), gemessen im Beweglichkeits-Check (`log.mob`).
  1RM zählt in Kraft (bzw. Schnellkraft bei olympischen Lifts) als Pseudo-Leiter `rm:<id>`: 40 + 59 × Anteil zwischen Einsteiger- und
  Spitzen-Norm (1RM / Körpergewicht, `RM_STD`). Ohne Körpergewicht (`S.weight`, Einstellungen › Profil, synchronisiert) zählt es nicht.
- Tools › Übungen (`renderUebungen`): Orte-Kapsel `libCapHTML`. Groß mit „Alle“ ganz links (`ui.libAll`, jede Übung, ändert den
  Trainingsort nicht), klein nur mit den Orten zum schnellen Umschalten plus Stift. Den gewählten Ort nochmal tippen = große Kapsel
  (`ui.libOpen`). Ein Ort gilt sofort auch fürs Training (`S.ort`, dieselbe Wahl wie auf Heute). Der Stift öffnet das Blatt
  „<Ort> · Equipment“ (`ACT['eq-sheet']`, `eqSheetBody`, Ort oben umschaltbar, Änderungen gelten sofort). „Orte wählen“ (`ACT.orte`)
  schaltet Orte ein/aus, der Stift je Zeile (`ACT['ort-edit']`) gibt einen eigenen Namen (`nm`) und ein Symbol aus `ORT_IC` (`ic`).
  `ortName(o)`, `ortIc(o)` überall benutzen. Unten die Karte „Bänder“: Band antippen = Farbe wählen (Blatt).
  Ohne Suche zeigt die Liste Familien (`famListHTML`, `famItemHTML`), gruppiert nach Bewegungsmuster: Chips „Du: …“, „Als Nächstes: …“
  oder gesperrt mit Grund. Keine Scores bei Familien und Übungen (nur intern für die Planung, Geräte zeigen ihren Score weiter).
  Antippen öffnet die eigene Seite der Familie (versteckte Seite `fam`, `renderFam`, `famOpen`, `ui.famId`, Zurück zu `ui.famBack`):
  Karte oben Figur, Skill-Pfad (`famPathHTML`, Leiter-Stil, aktuelle Stufe als weiße Pille, Ziel für die
  nächste), darunter die Übungen als Unterpunkte (`glItemHTML`, Klasse `sub`) nach Stufen, Varianten, „Auf Tempo (CrossFit)“ mit Vermerk,
  dazu „Gehört auch dazu“ (`auch_in`), „Baut auf“ und „Führt zu“ (`ACT['fam-go']`). Mit Suche: Einzelübungen wie bisher.
  Stand je Familie (`famLevel`, `famStatus`): höchste Stufe, die trainiert wurde (Leiterstand oder Eintrag mit dem Namen).
- Skill-Baum (versteckte Seite `skill`, Zugang über Profil › Werte, `renderSkill`, `drawTree`): je Bereich Zug, Druck, Beine, Rumpf,
  Mehr; Zeilen nach `ebene`, Linien aus `voraussetzt`; Knoten geschafft, aktuell (weiße Pille), als Nächstes, gesperrt. Antippen öffnet
  die Familie. Heute zeigt unter „Training starten“ den Block Fortschritt (`progressHTML`): „Neu freigeschaltet“ / „Neuer Reiz“
  (`planFill().neu`, bis die neue Übung einmal trainiert ist) und „Als Nächstes freischalten“ (`nextUnlockHTML`).
- Tools › 1RM (`renderRM`): Titel „One Rep Max“, alle Übungen mit Einheit kg (`RM_ALL`, nach Nutzen), oben „Deine Werte“, darunter
  die übrigen. Umschalter Aktuell/Bestwert nur in der Liste (`ui.rmBest`, `ACT['rm-view']`), Bestwert mit Jahr (`dateY`).
  Antippen öffnet den Prozent-Rechner (`rmDetailHTML`, `ui.rmLift`): Basis immer der aktuelle Wert, Bestwert golden darunter,
  Tabelle `RM_PCT` (100–50 %, Zweck, Wdh., auf 2,5 kg gerundet), Farbe je Zeile von Grün (leicht) nach dunklem Rot (schwer) über
  `--hue/--sat/--lt/--mx` und `color-mix` mit `--ink`. Neuer Wert über das kleine Plus oben rechts (`ACT['rm-new']`, Rad kg, ,0/,5,
  Wdh. 1–10, Epley `e1rm`), darunter Verlauf und Einträge (Löschen mit Nachfrage). `S.rmLifts` bleibt in `DEF`, wird nicht mehr genutzt.
  Einträge `kind: 'rm'` (`lift, kg, reps, e1, bw`, aus dem Training zusätzlich `src: 'training'`), zählen nicht als Training.
  Bei Weighted Pull-up/Dip zählt das Zusatzgewicht.
- Gewicht im Training (`kgUe`: Übung der Stufe mit Einheit kg): Kraftteil zeigt unter der Stufe „Empfohlen“ (`.kg-rec`, `kgRec`), jeder
  Satz Wdh. und kg (`.kgv`, Entwurf `k<i>kg<r>`, `kgOfEx`: eingetragen, sonst wie der Satz davor, sonst Empfehlung). Das Rad des Satzes hat
  kg, ,0/,5 und Wdh. und zeigt live das geschätzte 1RM; liegt es über dem Bestwert, kommt sofort „★ Neuer Bestwert“ mit Vibration
  (`kgBest`, einmal je Wert, `_rmb_<id>`). Gespeichert als `ue` und `kg` (Liste je Satz) im Kraft-Eintrag; der beste Satz bis 10 Wdh.
  wird zum 1RM-Eintrag, wenn er über dem aktuellen Wert liegt. Vollbild-Timer im Kraftteil zeigt das Gewicht des Satzes groß
  (`fsKg`, `.fs-kg`, in der Pause schon den nächsten Satz); Metcon und WOD nicht.
  Fortschritt mit Gewicht: doppelte Progression (`kgRec`, `kgHist`): alle Sätze am oberen Ende → +2,5 kg (Kniebeuge/Hüfte +5,
  `kgStep`), höchstens einmal pro Durchgang (`kgUpHere`), nicht in der Entlastung, nach über 14 Tagen Pause und bei Stillstand
  (`kgStallN`: 3× gleiches Gewicht ohne mehr Wdh.) 10 % leichter. Ohne Verlauf aus dem 1RM (Epley rückwärts mit RIR).
  Gewichtsstufen steigen nicht über Wdh.: `coachStage` wechselt sie nur an Übergängen in `KG_UP` (z. B. Goblet → Front Squat,
  RDL → Deadlift), wenn das 1RM der Stufe das Vielfache vom Körpergewicht erreicht (Hinweis `kgGate` am Schritt), nach Pause keine
  Stufe zurück. `stallOf` wechselt die Übung erst, wenn es nach dem 10-%-Neuaufbau wieder stehen bleibt (`kgDeloaded`).
  Metcon: Gewicht je Übung (`mKg`, Zeile `.kg-row`, im Ablauf „10 · 32,5 kg“, gespeichert in `metcon.kg` als `{n, ue, kg}`), Ziel ist
  das Rx-Gewicht (`RX`). `kgRecM`: mehr geschafft als zuletzt mit denselben Übungen (oder ohne Vergleich zweimal mit dem Gewicht)
  → ein Schritt Richtung Rx (Kettlebell 4 kg, sonst 2,5, `kgStepM`), sonst gleich; Start 50 % 1RM (über 10 Wdh. 40 %) oder 60 % Rx.
- Mobility (`MOB`, `ROUT`): Cool-down passend zum Tag an Krafttagen: nicht im Ablauf, nach dem letzten Schritt fragt `saveAsk`
  „Möchtest du noch ein Cool-down?“ (Ja = Schritt `coolStep` kommt dazu, Entwurf `_cd` '1'/'0'; `S.cooldown` wird nicht mehr genutzt, `log.cool`), auf Lauftagen als Karte nach dem Lauf. Ruhetag-Flow A (erster Ruhetag) und B (zweiter) auf dem Ruhetag. Tools › Mobility (früher Routinen, Seite `routinen`) startet
  alle Routinen frei, auch „Guten Morgen“. Der Player (versteckte Seite `routine`, Timer-Art `routine`, `paintRoutine`) führt Übung für
  Übung, „je Seite“ erst links, dann rechts. Fertige Routinen außerhalb des Trainings sind Einträge `kind: 'mobility'` und stehen unter
  Profil › Verlauf › Mobility; sie zählen nicht als Training (Pause, „Diese Woche“).
  Beweglichkeits-Check: letzter Schritt an Tag 1 im Einstiegstest und in der Testwoche am Blockende (`mobCheckStep`).
  Je Test eine Karte mit Figur der gewählten Stufe (`mobCheckHTML`; ohne Grafik die nächste Stufe mit Grafik). Auch die Testtage
  zeigen die Figur der gewählten Stufe (`testStepHTML`, z. B. Knee Push-up bei „Auf Knien“); Stufe wechseln = Figur wechselt.
  Eingabe am Testtag: Kachel „Stufe“ (Rad) und darunter Zähler „Wiederholungen“ bzw. „Bestzeit“ in 5-s-Schritten (`ACT['t-rep']`, `.t-rep`).
  Beweglichkeits-Check: Tests mit Haltezeit im Stufennamen (Hocke, Schulter) haben eine Stoppuhr in der Karte (`mcSwHTML`, `MCSW`,
  `ACT['mc-sw']`): Zeit groß, Ziel der gewählten Stufe als Chip (`mcGoal`), beim Erreichen `cue(true)` und grüner Chip.
  Angezeigte Stufennamen über `STAGE_LABEL` in `stageText` (z. B. „Am Türrahmen“ → „Mit Halt (Ringe oder Türrahmen)“), gespeichert
  bleibt der alte Name. Übungen „je Seite“: Hinweis „Schwache Seite zuerst, sie zählt“ an der Kraft-Karte. Pistol mit Halt und Ringen
  am Ort bekommt die Ringhöhe (`ringNotes`).
  Jede Testseite hat einen Pausen-Timer (Timer-Art `block`, `cfg.again`): Pause aus dem Test-Text („3 Min Pause“), sonst 3 Min, Halteübungen
  2 Min; ohne Vorlauf, „Danach: nächster Versuch“, nach Ablauf „Pause vorbei“ (Tippen setzt zurück), kein Sprung zur nächsten Übung.
  Erfolge: eine Metall-Medaille je Bereich (`AREA_LAD`, `areaStates`): Bronze ab Start, Silber ab 65, Gold ab 75, Platin ab 85;
  darunter das 1RM-Archiv mit den Bestwerten. Nach dem Speichern zeigt `showMoment()` Aufstiege eines Bereichs: Geschenk (erste Medaille),
  Glühen (Aufstieg), Anlaufen mit aufmunterndem Spruch (Abstieg), und einen neuen 1RM-Bestwert, mit Vibrationsmuster (`buzz`).
- Schwerpunkte (`FOKUS`, `S.fokus`, Standard `allround`): Allround, Kraft & Muskelaufbau, Calisthenics, CrossFit, Beweglichkeit,
  Laufen. Jeder hat eine eigene Woche (`days(phase)`), Länge (`len`, Laufen nach Ziel 8/10/14), Phasen (`phase`: `deload`, `test`,
  `check`, `lab`) und „Nächste Stufe“ (`next`, `S.lvl`). `syncDays()` baut daraus `DAYS` (in `render()` und `saveDay()`); die frühere
  feste Woche heißt `DAYS0` und liefert nur noch Rückfall-Übungen. Gezählt wird in Blöcken: `S.blockStart`, `blockD()`, `blockN()`,
  `curPhase()`. Am Blockende setzt `blockCheck()` `S.review`, Heute zeigt dann „Block geschafft“ (`reviewHTML`, Weiter so /
  Nächste Stufe / Wechseln, `startBlock`). Versteckte Seiten `fokus` (Auswahl), `laufziel` (Strecke, Zielzeit, Puls-Zonen),
  `skillziel` (1–2 Skill-Ziele, `S.ziele`). Heute zeigt die Block-Karte (`blockCardHTML`) mit Fortschritt je Durchgang.
  Tage vom Typ `kraft` sind Schritt-Tage aus Bausteinen: `run` (Lauf als erster Schritt), `warm`, `mobl` (lange/kurze Dehn-Einheit,
  `mobRoutine`, `MOB_ART` A/B/C/K/S/L, Haltezeit aus der Phase, C = schwächste Regionen aus dem Check), `hs`, `skill`
  (`skillOf`: Ziel oder seine offene Voraussetzung), `kslots` (Kraft, `kfmt` `emom` oder `saetze` mit `sets`, `reps`, `rest`),
  `mslots`/`mmin` (Metcon/WOD), `bench` (CrossFit-Benchmarks Cindy, Mary, Chelsea in Durchgang 1, 6, 12).
  Lauftage: `runSpec(d)` (locker, lang, Tempo, Test, Ziel-Lauf, Intervalle mit `iv`), verglichen nur mit der gleichen Art (`runsOf(kind, ergo, art)`).
  Puls-Zonen nach Karvonen (`ZONES`, `zoneRange`, `S.hrMax`, `S.hrRest`, Einstellungen › Profil; ohne Wert geschätzt).
  Übungswahl (`planFill`): Plätze nennen nur Muster; gewählte Leiter (`S.picks`, Schlüssel je Ort und Schwerpunkt `slotKey`) bleibt,
  sonst begonnene Leiter vor neuer, dann Nutzen. Tempo-Varianten (`TEMPO_KEYS`) nie im Kraftteil. Platz `{ schwach: [...] }` nimmt den
  schwächsten Kraft-Teil (`partScores`). Der Coach entscheidet, nicht der Nutzer: eine neu freigeschaltete Leiter mit mehr Nutzen
  und bei Stillstand (`stallOf`: 3× gleiche Stufe ohne mehr Wdh.) eine andere Variante werden sofort übernommen (`S.picks`, `S.swapped`
  je Platz `{from, to, why: 'neu'|'reiz', ts}`). Fehlt am Ort das Gerät für ein Muster, nimmt `planFill` einen Ersatz ohne dieses Gerät
  (erst Leiter aus nahem Muster `MUSTER_NEAR`, sonst Einzelübung mit Rolle `kraft`, z. B. Table Row / Towel Door Row mit `eq_zuhause`);
  gibt es keinen, fällt der Platz weg (Hinweis am Schritt). Neu nur auf höheren Nutzen wechseln, nie auf eine Leiter, die ein anderer
  Platz am Ort hält oder die wegen Stillstand verlassen wurde (sonst springt die Wahl hin und her).
- Sehnen-Bremse (`coachStage`, `ladHist`, `brakeNote`): die Stufe setzt der Coach (`stageDef`), das Rad zeigt nur Stufen bis dahin (`cmax`).
  Aufstieg nur, wenn 2 Einheiten in Folge alle Runden am oberen Ende der Spanne liegen UND die Mindestzeit auf der Stufe um ist
  (`SEHNE` Klasse 0/1/2 je Leiter, `SEHNE_TAGE` 14/28/42). Höchstens eine Stufe pro Durchgang, keine in der Entlastung, keine ohne Gerät
  für die nächste Stufe. Nach einer Pause über `SEHNE_PAUSE` (14, hoch 10 Tage) eine Stufe leichter. Wartet die Sehne, steht der Hinweis
  am Kraft-Schritt (3 s absenken, 1 s Pause) und „Bald freigeschaltet“ mit Datum im Fortschritt-Block. Volle Wdh. beim Warten sind kein Stillstand.
  Laufen (`runCap`): lockerer Lauf heute höchstens so lang, dass die Woche 1,3 × Schnitt der letzten 4 Wochen nicht übersteigt (ab 3 Wochen Laufdaten).
- Session anpassen (`adaptLineHTML`, `ACT.adapt`): grauer Link unter dem Ablauf (Krafttag) bzw. dem Lauf (Intervall). Blatt von unten
  „Sag deinem Coach, worauf er heute achten soll.“, nur „Fertig“, gilt nur für heute und sofort, Aktives grau hinterlegt (`.ad-it.sel/.open`):
  „Mir geht’s heute nicht gut“ (Antippen = Kurzversion bzw. lockerer Lauf statt Intervalle, Entwurf `_kurz`), „Ich habe wenig Zeit“
  (< 45 / < 30 / < 15 Min, `_zeit`; `zeitLv` kürzt in Stufen: ohne Handstand/Skill, Kraft und Metcon kürzer, ohne Metcon, Aufwärmen 4 Min),
  „Ich trainiere woanders“ (`_ort`, `trainOrt()`, nur diese Einheit; `S.ort` bleibt). Kein Ort-Feld mehr auf Heute.
- Hinweise auf Heute stehen dort, wo sie hingehören: Phase (Einstieg, Entlastung, Testwoche, Willkommen zurück) in der Block-Karte,
  Übungs-Hinweise grau unter dem Schritt (`notes`, `.tl-x`). Ringhöhe nur bei Ring-Übungen, in Bezug auf den Körper (`ringNotes`, `RING_H`).
  Tipps-Karte nur noch an Testtagen, beim Murph und bei optionalen Läufen.
- Coach › Heute: zuerst eine kurze Übersicht (`renderHeute`, Ablauf als nummerierte Schritte) mit „Training starten“.
  Danach Schritt für Schritt (`stepsOf`, `stepPageHTML`): Krafttag Aufwärmen, Handstand, Kraft, Metcon; Testtag eine Übung
  pro Schritt; Murph ein Schritt. Der aktuelle Schritt steht im Entwurf (`_step`, `_at` in `tp.drafts`).
  Im Training (Schritt-Seiten) ist die Reiterleiste ausgeblendet (`body.focus`); oben rechts ein kleines X (`ACT.quit`)
  fragt nach: Zwischenspeichern (weiter beim Schritt), Training abbrechen (Entwurf weg) oder Weiter trainieren.
  Lauftage haben keine Schritte und keinen Timer, nur „Ergebnis von der Uhr“: Dauer, Puls Ø, Strecke (km, 3 Nachkommastellen), Tempo errechnet.
  Tempo und Puls werden mit den Läufen der gleichen Art der letzten 6 Wochen (mindestens 3) verglichen (`runVerdict`).
- Übungsgrafiken (Maskottchen): animierte Figur aus `Maskottchen.EXERCISES[id]` (`figHTML`, `startFig`/`stopFig`), Bildfeld immer gleich groß.
  Tools › Übungen: oben in der aufgeklappten Übung (`wakeGloss`). Training: nur in der Karte der EMOM-Übung, die gerade läuft,
  vor dem Start in der ersten (`syncFig`), darunter der Griff bei ähnlichen Übungen (`GRIP`, Pull-up/Chin-up).
  Dunkelmodus in Graphit (Hintergrund `#1E1F23`, Karten `#2A2B30`, Grafik-Fläche `#33343A`, passend zum App-Symbol).
  Dunkelmodus: Farbsatz „Kreide auf Dunkel“ (`Maskottchen.PALETTES.dark`, Fläche `--fig`), Wechsel über `applyTheme` → `refreshFigs`.
- Leiter in Tools › Übungen (`ladderHTML(lad, state)`): Glas-Kapsel als Aufstieg (Stufe 1 unten, schwerste oben),
  „Aktuelle Stufe“ als weiße Pille, höchste geschaffte Stufe mit goldenem Chip „★ Bestwert“ (gleich = nur Stern).
  Zu lange Stufennamen enden mit „…“ (gemessen, `fitLadders`), Antippen lässt sie einmal durchlaufen.
- Stufen und Wiederholungen wählt man mit dem Rad-Blatt von unten (`openSheet`, `ACT.pick`), nicht mit Textfeldern.
  Stufen-Listen bleiben in der Reihenfolge der Leiter (nicht alphabetisch). Im EMOM zeigt jedes Feld seine Minute.
- Ablauf im Training (`flowHTML`, Abläufe `warmFlow`, `metconFlow`, `murphFlow`, `coolFlow`): je Trainingsart „Liste“ (Glas-Kapsel,
  aktuelle Übung offen mit Figur und „Erledigt“) oder „Einzeln“ (eine Karte, `.bgrp` „‹ Zurück | Erledigt ›“, letzte Übung springt
  zum nächsten Schritt, Chip „Danach: …“). Einstellung unter Einstellungen › Training: `S.trainCustom`, `S.trainModes` (Standard
  `TRAIN_STD`: Liste, Cool-down einzeln, `modeOf`), `S.roundCounter`, `S.swipe`, `S.swipeRev`, nur auf dem Gerät.
  Stand im Entwurf: `_c_<id>` aktuelle Übung, `_d_<id>` abgehakt (Liste), `_r_<id>` Runde. Metcon und Murph laufen in Runden (`loop`).
  Wischen (`data-swipe`, `swipeDo`): links = erledigt / weiter / +, rechts = zurück / rückgängig / –, umkehrbar.
  Metcon: Rundenzähler (`.stepper`) nur in der Liste; Einzeln ohne Kacheln und Hauptaktion, solange der AMRAP läuft.
  Am Ende des AMRAP fragt `amrapCheck` „Stimmt dein Ergebnis?“ mit gezählten Runden und Wdh. (`amrapCount`).
  Kraft einzeln zeigt nur die laufende Karte. EMOM: Chip „Als Nächstes“ mit Mini-Figur und Countdown (`emomNext`, `miniFig`).
  Figur oder Platzhalter (`figBox`, winkendes `_wave` mit „Grafik folgt“) überall, wo eine Übung gezeigt wird: Schritte, Kraft-Karten,
  Bibliothek (Familien-Seite, jede Übung), Mobility-Player (`#rp-fig`). Neue Grafik = nur in `Maskottchen.EXERCISES` eintragen.
- Einstellungen in Abschnitten: Profil, Sync, Aussehen, Training, Gerät, Daten (`settingsHTML`, `trainingHTML`).
  Aussehen › Hintergrund (nur Hellmodus, `S.paper`, `PAPERS`): Weiß, Kreide, Leinen, Nebel. `applyTheme` setzt `data-paper` nur im Hellen.
- Rad-Blätter mit Zahl (`openSheet` mit `num`): nochmal auf den großen Wert tippen = Zahlentastatur.
- Ist ein Blatt offen, scrollt der Hintergrund nicht (`html:has(.sheet-bg.open)`), Listen im Blatt haben `overscroll-behavior: contain`.
- Bewegung: kein blaues Antipp-Leuchten (`-webkit-tap-highlight-color`), gedrückte Kapseln geben nach (96 %, Umschalter 92 %).
  Wechselt die Wahl in `.seg`, `.cap` oder `.pills`, gleitet die weiße Pille (`.glide`), Kapsel-Knöpfe rutschen, neue blenden ein
  (Block „Bewegung“ im Skript, merkt sich die Lage beim `pointerdown` und animiert nach dem Neuzeichnen). Bei „Bewegung reduzieren“ aus.
- Jeder Schritt bringt seinen Timer fertig eingestellt mit (helle Glas-Leiste `#tbar`, `paintMini`), Timer-Art `block`
  für Aufwärmen und Handstand. Die laufende EMOM-Übung ist blau umrandet. Vorlagen aus dem Plan gibt es nur dort.
- Tools › Timer ist frei einstellbar: EMOM (Alle, Runden), AMRAP (Dauer), Intervall (Arbeit, Pause, Runden), For Time
  (Umschalter „Time Cap“ / „Ohne Time Cap“, `S.tmr.zeit.open`; mit Time Cap läuft die Zeit herunter, ohne hoch; Ergebnis ist immer die gebrauchte Zeit), immer mit 10 s Vorlauf. Einstellung je Art in `S.tmr` (`tmr()`, nur auf dem Gerät).
  Rundenzähler auf der Timer-Seite nur, solange der Timer läuft (`#t-rrow`).
- Countdown (`countdownHTML`, Einstellungen › Training, kurz auch unter Tools › Timer): Piepen oder Stimme (`S.cdVoice`), Sprache
  Deutsch/Englisch (`S.cdLang`, `CD_WORDS`: „Drei, zwei, eins, los!“ / „Three, two, one, Go!“, Pause „Pause!/Rest!“, Ende „Zeit!/Time!“),
  je Anlass an/aus (`S.cdWhen`, `CD_WHEN`: Start nach dem Vorlauf, jede neue Runde, Intervall Arbeit/Pause, Ende; aus = Piepen).
  Stimme über die Sprachausgabe des Handys (`say`, `cdVoice`, `cdEvent` in `tick`/`finish`); ohne passende Stimme piept es. Nur auf dem Gerät.
- Timer im Vollbild (`#fs`, `fsOpen`/`fsClose`/`fsPaint`, `fsSide`): große Zeit in Geist, rechts (quer) bzw. unten (hochkant) eine Karte:
  Runden (Tools AMRAP/For Time, Tippen = +1), Übungen der Runde (Metcon/Murph im Training, `fsFlowHTML`), laufende EMOM-Übung mit
  Figur und „Als Nächstes“, Intervall „Als Nächstes“. Oben Drehen (`fs-rot`, hält die Ansicht, lange drücken = automatisch), Minimieren
  (`fs-min`, Timer läuft weiter), Pause, ✕ nur in Tools (mit Nachfrage). Vorlauf und Intervall-Pause grün, letzte 3 s pulsieren.
  Öffnen: Pfeil-Knopf in der Timer-Leiste (mit Pause in einer Kapsel `.tb-grp`), Tippen auf die Zeit, Pfeil-Knopf auf der Timer-Seite,
  Handy quer drehen, während ein Timer läuft (`fsTurn`; zurück hochkant schließt wieder). Ansicht weicht vom Handy ab = CSS-Drehung
  (`.turn`), dazu `screen.orientation.lock`, wo erlaubt. Einstellungen › Training › Timer: Standard oder je Trainingsart Leiste/Vollbild
  (`TIMER_TYPES`, `TIMER_STD`: nur Tools › Timer im Vollbild, `S.timerCustom`, `S.timerModes`, `timerModeOf`), Vollbild-Ansicht
  Automatisch/Hochkant/Quer (`S.timerView`). Runden zählen (`S.roundMode`, `roundMode()`): Übung für Übung (wie bisher), Nur Runden
  (Workout ohne Abhaken plus Zähler, `flowStaticHTML`), Aus (nur Workout, am Ende „Ergebnis eintragen?“). Alles nur auf dem Gerät.
  Zeiten wählt man im Zeit-Blatt (`openTimeSheet`): Rad Min/Sek in 1er-Schritten, nochmal auf die Zeit tippen = Zahlentastatur
  (Ziffern laufen von rechts ein). Auch die große Zeit lässt sich antippen.
- Metcon-Übungen ohne eigene Kraftleiter (`metconLad`) haben eine Stufe, gespeichert in `metcon.stages`.
- Orte: sechs feste Orte mit Symbol (`ORTE_FIX`: Zuhause, Gym, Park, Garage, Arbeit, Unterwegs), je eigene Equipment-Liste.
  In `S.orte` je `{id, k, on, eq, zh}`; angezeigt werden nur eingeschaltete (`on`), mindestens einer bleibt an.
  Einschalten, Umbenennen und Symbol über Tools › Übungen › Stift › „Orte wählen“ (`ACT.orte`). Früher frei benannte Orte
  ordnet `ensureOrte()` einem festen Ort zu (IDs, Geräte und `S.picks` bleiben). Auch Alltagsgegenstände (`eq_zuhause`) werden je Ort angekreuzt.
  Blätter mit Textfeld passen sich an die Tastatur an (`fitKeyboard`, `interactive-widget=resizes-content`).
  Der Plan füllt die Plätze (`LIB.plaetze`) für den gewählten Ort (`planFill`): Kraft bleibt bei der gewählten Leiter (`S.picks`),
  eine Leiter mit mehr Nutzen übernimmt der Coach selbst (`S.pickSkip` wird nicht mehr genutzt).
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
- `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `icon-mono-512.png`.
  App-Symbol „D3“: Turnringe frei hängend in Kreide (#E4E3F7) auf Graphit, darunter links der Marker-Strich in Hellblau (#8DB8FF).
  `icon-mono-512.png` (weiß auf transparent, `purpose: monochrome`) für die Designsymbole von Android. Vorlagen: `design/symbol/`.

## Regeln
- Die App muss offline laufen: keine CDNs, keine externen Schriften oder Skripte.
- Ändert sich außer `index.html` eine Datei oder kommt eine neue dazu:
  `CACHE` in `sw.js` hochzählen und neue Dateien in `ASSETS` eintragen.
- Gespeicherte Daten nie brechen. localStorage-Schlüssel: `tp.state`, `tp.logs`,
  `tp.drafts`, `tp.deleted`, `tp.sync`, `tp.foto` (Profilfoto, mit `tp.fotoTs`, wird abgeglichen). Neue Felder mit Standardwert in `DEF` ergänzen.
- Export-Format `{exportiert, stand, einheiten}` muss importierbar bleiben.
- Sync: Datei `trainingsplan.json` im privaten Daten-Repository des Nutzers,
  Format `{app, v, standTs, stand, einheiten, geloescht}` kompatibel halten, dazu `feldTs` (Zeit je Feld in `SYNC_KEYS`, `S.feldTs`)
  und `foto` (`{ts, data}`). Einheiten nach ID zusammenführen, Löschvermerke gewinnen, Stand Feld für Feld (neuere Zeit gewinnt,
  ohne `feldTs` gilt `standTs` für alle Felder). Name (`S.name`) wird mit abgeglichen; der gewählte Ort `S.ort` bleibt pro Gerät.
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
Eingabewerte sind Kacheln (`.tile`) mit Rad-Blatt, keine `<select>` und kein Datumsfeld. Hinweise: erst Ablauf, dann Aktion; Hinweise am passenden Schritt, Tipps-Karte (`tipsHTML`) nur für echte Anleitungen.
Bandstufen ausgeschrieben mit Farbpunkt (`stageHTML`); Farbe je Band wählbar unter Tools › Übungen › Bänder (`S.bandCol`, synchronisiert). Tippflächen mindestens 44 px.

## Trainingslogik (Kurzfassung)
- Allround (Standard): Tag 1 Ganzkörper (Zug, Druck, Ausgleich), Tag 2 Lauf locker, Tag 3 Zug, Tag 4 Ruhetag, Tag 5 Intervall-Lauf,
  Tag 6 Druck, Tag 7 Ruhetag (3 Training, 1 frei, 2 Training, 1 frei; Dennis). Der Tagesname zeigt den Inhalt. Die anderen Schwerpunkte stehen in `design/schwerpunkte.md`.
- Allround-Krafteinheit: 8 Min Aufwärmen, 5 Min Handstand, EMOM 12 (4 Runden, 3–6 Wdh., RIR 2), Metcon AMRAP 8.
  Durchgang 4 und 8 im Block: Entlastung (Kurzversion, kein Maxout). Letzter Durchgang (12) = Testwoche: Maxout in Runde 1 der
  Hauptübung, Beweglichkeits-Check an Tag 1, danach der Rückblick. Getestet wird immer am Blockende (Laufen: Testläufe auch
  zwischendurch, CrossFit: Benchmarks in 1, 6, 12, Beweglichkeit: Check in Durchgang 1 und 8).
- Erster Tag 1 im Monat (frühestens 4 Wochen nach Start) = Murph, nur bei Allround, Calisthenics und CrossFit.
- Durchgang 1 und 2 nach dem Einstiegstest: Kurzversion (Kraft 3 Runden, Metcon 5 Min).

## Übergabe zwischen Sitzungen
- Zu Beginn jeder Sitzung `UEBERGABE.md` lesen (Stand, offene Aufgaben, Rückmeldungen von Dennis).
- Am Ende jeder Aufgabe `UEBERGABE.md` im selben Pull Request aktualisieren.
- `design/` enthält nur Entwürfe und Rohdaten (Maskottchen, `mobility2.json`), nicht Teil der App und nicht in `sw.js`.
- Übungsgrafiken: immer die Maskottchen-Vorlage `design/maskottchen/maskottchen.js` benutzen, Regeln in `design/maskottchen/VORLAGE.md`.
  Neue Grafiken in Runden zu 20 im Canvas zeigen, nach Freigabe in `index.html` kopieren. Vorher `node design/maskottchen/pruefen.js`
  (gestreckte Gelenke, Kontaktpunkte halten).

## Vor dem Abschluss
- Prüfen, dass `index.html` ohne JavaScript-Fehler lädt und alle drei Reiter mit ihren Unterseiten funktionieren.
- Die Änderung im Pull Request kurz auf Deutsch beschreiben.
- Dem Nutzer am Ende immer den vollständigen Link zum Pull Request nennen.
