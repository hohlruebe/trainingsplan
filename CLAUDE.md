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
  - `<script id="lib-data">`: Übungsbibliothek (Equipment mit Score, 380 Übungen, Leitern, Metcon-Pool, Aufwärmen) als JSON,
    dazu `mobility` (Beweglichkeits-Check und Routinen, aus Cowork). `equipment` ist immer eine Liste von Alternativen-Gruppen.
    Wird beim Start in `GL`/`LAD` gemischt; alte IDs, Namen und Stufen nie ändern, neue Stufen nur hinten anhängen (Ausnahmen mit Dennis: Pistol Squat Stuhl → Mit Halt → Frei → Weste; Handstand neue erste Stufe „Rücken zur Wand“ (`g_wall_handstand_back`, in der Familie als Variante) vor Face-to-Wall; dann plan-data, lib-data und fam-data gleich halten. Gespeichert werden Stufennamen, nicht Nummern, darum bleiben alte Einträge gültig).
  - `<script id="fam-data">`: Übungsfamilien von Cowork (Kopie von `design/familien.json`, beide gleich halten). 60 Familien (auch Isolation und zwei Mobility-Familien),
    jede Übung (ohne Mobility) genau einmal; je Variante `art` (`stufe` mit `rang` und `ziel`, `variante`, `tempo` mit `vermerk`),
    je Familie `bereich`, `ebene`, `voraussetzt` (`familie`, `ab_rang`), `fuehrt_zu`, `leiter`. Nur ergänzend, IDs der Übungen bleiben.
  - `<script id="maskottchen">`: Kopie von `design/maskottchen/maskottchen.js` (Übungsgrafiken), beide gleich halten
  - Haupt-`<script>`: Logik für Heute, Timer, Verlauf, Übungen, Plan, Einstellungen, Sync
- Reiter von links nach rechts: Tools (Timer, Übungen, Mobility, 1RM = One Rep Max), Coach (nur Heute), Profil.
  Der Plan ist eine versteckte Seite `plan` hinter dem runden Info-Knopf oben rechts auf Heute (`renderPlan`): „Dein Plan“ mit
  Schwerpunkt-Karte, Karte „Woche“ (‹ › blättert durch die Durchgänge des Blocks, `ui.planDg`; Block-Leiste und Tage-Kapsel wie auf Heute,
  `ui.planTag`; darunter der Ablauf des Tages als nummerierte Schritte, `planDayHTML`/`tlHTML`, berechnet über `planPreview`, das
  `S.durchgang` nur kurz umstellt; künftige Tage mit Hinweis „Vorschau“). Darunter „Wissen“ als Liste (`PLAN_SUB`), jeder Punkt eine
  eigene Seite (`ui.planSec`, `plan-sec`): Regeln, Methode, Grundmuster (`GRUND`, `grundHTML`: fünf Figuren Squat/Hinge/Push/Pull/Carry
  in einer Reihe, je Muster eine Karte mit Figur, Satz, Muskeln und „Bei dir“ = zuletzt trainierte Übungen im Muster, `grundMine`), Steigerung, Bänder, Pause, Murph und Test-Durchgang, Einstiegstest, Skill-Ziele.
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
- Geschlecht (`S.sex` 'm'/'w'/'d', ohne Angabe wie männlich, Einstellungen › Profil oben, `sexRow`, in `DEF` und `SYNC_KEYS`; `sexT()` 0/0,5/1,
  `sexMix(m, w)`, divers = Mitte): 1RM-Normen `rmStd` (Frauen Oberkörper 60 %, Beine/Hüfte 75 %, olympisch 70 %, `rmSexF`), Schwellen `KG_UP`
  mit denselben Anteilen, Rx `rxOf` (`RX_W`), `cardioScore` und `cardioKw`-Schätzung 12 % niedriger, erstes Gewicht aus dem 1RM (Epley mit 34
  statt 30), Maximalpuls Frauen 206 − 0,88 × Alter. Figur: `bodyOf(t)` verzieht `BODY_SIL`/`BODY_F`/`BODY_B` über `BODY_WARP` (`bodyPt`,
  Arme schlanker und nach innen), weiblich mit `BODY_BRUST_W` und langen Haaren (`BODY_HAIR_F/B`), männlich Kurzhaarschnitt
  (`BODY_HAIR_MF/MB`), divers ohne Haare. Gelenkpunkte `JOINT_XY` laufen über `bodyPt` mit.
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
  die Familie. Heute zeigt unter „Training starten“ den Block Fortschritt (`progressHTML`): nur „Als Nächstes freischalten“
  (`nextUnlockHTML`). Neu freigeschaltet / Neuer Reiz (`planFill().neu`) und Sehnen-Pause stehen nur in der Coach-Karte (`coachCardHTML`).
- Muskeln (`MUS_NAME`, Figur `bodySVG`/`musFigHTML` aus `BODY_SIL`, `BODY_F`, `BODY_B`: graue anatomische Figur vorn/hinten, Umrisse in
  Kartenfarbe; Teile mit „_“ zählen nicht). Bibliothek: aufgeklappte Übung zeigt `musOfHTML` (Hauptmuskeln `--acc`, mitarbeitend hellblau,
  aus `muskeln.primaer/sekundaer`). Muskelausgleich (`musVol`, `musBalance`, gemerkt in `MB_C`): Sätze je Muskel der letzten 4 Wochen
  (Hauptmuskel 1, mitarbeitend ½, Metcon halbe Runden bis 4, Murph 10, `ausgleich` zählt mit), geteilt durch das Soll `MUS_W`, gemessen am
  mittleren Muskel → Stufe 0–3 (Rot `--mb0` vernachlässigt … Grün `--mb3` im Gleichgewicht, über 2,2× wieder gelb). Gegenspieler-Paare
  `MUS_PAIRS` als Balken (Abstand von 50:50 bis 6/10/16 Punkte = grün/gelb/orange, sonst rot). `need` = was zu kurz kommt (ab 3 Kraft-
  einheiten in 4 Wochen). Karte `musCardHTML` in Profil › Werte unter den Bereichen. Der Coach gleicht aus: (A) `planFill` tauscht einmal
  am Tag eine Metcon-Übung gegen eine aus denselben 4 Kandidaten, die `need` trifft (`musHit`, grauer Grund `out.mwhy` am Metcon-Schritt);
  der Kraftteil bleibt. (B) Schritt „Ausgleich“ (`ausgleichStep`, `ausgleichUe`, 4 Min, 2 Sätze, Kacheln `a0`/`a1`) am Ende der Krafttage
  ab Durchgang 3, nicht in Entlastung, Testwoche, Taper, Kurzversion und bei „wenig Zeit“; leichte Übung (ermüdung ≤ 1, Technik ≤ 2, nicht
  Mobility/Ausdauer/Sprung/Tragen) für den größten Rückstand. Gespeichert als `ausgleich: {ue, reps}` im Kraft-Eintrag, im Verlauf sichtbar.
- Schmerzen (`painApply` im Getter `DAYS[t].kraft`, `painApplyM` im Getter `DAYS[t].metcon`, `painFlow` in `warmFlow`/`coolFlow`/`murphFlow`,
  `painForUe`, `painSubUe`, `painBody`): roter Fahnen-Knopf „Schmerzen“ in jeder Kraft-Karte (`kFlag`, `ACT.pain`) und bei jedem anderen Schritt oben im Kopf neben dem X
  (`.st-flag`, `ACT['pain-s']`; `painStepLinkHTML` wird nicht mehr benutzt, `PAIN_STEPS`: Aufwärmen, Handstand, Metcon, Ausgleich, Cool-down, Murph), Blatt „<Übung bzw. Schritt> · Schmerzen“,
  bei mehreren Übungen zuerst „Bei welcher Übung?“ (`painItems`, `ui.painSlot`). Dann „Wo zwickt es?“ Gelenk | Muskel (`ui.painK`, `ACT['pain-k']`),
  darunter nur die Gelenke bzw. Muskeln, die diese Übung belastet (Link „Andere Gelenke“ = alle, `ui.painAll`), dann erst die Stärke. Metcon: Ersatz aus dem Metcon-Pool mit dessen Menge;
  Aufwärmen, Cool-down, Murph: betroffene Übung „heute auslassen“ bzw. „leichter“; Handstand: ab mittel heute keiner; Ausgleich: andere Übung
  ohne Last auf der Stelle (`painBlocks`), sonst Schritt mit Hinweis ohne Speichern (`A.skip`). Stelle = Gelenk (`PAIN_J`, Last aus `gelenke` 0–3) oder Muskel der Übung (höchstens 3, Last
  Hauptmuskel 2, mitarbeitend 1, `siteLoad`). Stärke nach dem Schmerz-Ampel-Modell (`PAIN_W`): leicht 1–3 = Übung bleibt, leichter (`soft`);
  mittel 4–6 = Ersatz mit weniger Last (gleiche Familie zuerst, sonst gleicher Bereich ohne Last, sonst wie stark); stark 7–10 = andere
  Muskelgruppe ohne Last (`other`, bevorzugt `need` aus dem Muskelausgleich und ein Bereich, der heute nicht dran ist); sonst Pause (`skip`).
  Muskelkater (`k`) ändert nichts und wird nicht gemerkt. Entwurf je Platz `_p<slot>` = 'j:knie:m' / 'm:quadrizeps:s' (Plätze `k<i>` Kraft,
  `m<i>` Metcon, `a` Ausgleich, `h` Handstand, `w<i>`/`c<i>` Auf-/Abwärmen, `u<i>` Murph); Muskel-Kurznamen `MUS_SHORT`. Training ist Training:
  Der Ersatz zählt unter seinem eigenen Namen (Leiter, Gewicht, 1RM, Familie, Muskeln); nur ein Tag „leichter“ (`k.pain.soft`) zählt nicht als
  Stillstand (`stallOf`). Kraft-Einträge tragen `pain`, der Verlauf zeigt „statt … (Knie)“.
  Gedächtnis `S.koerper` (in `DEF` und `SYNC_KEYS`) je Stelle `{k, id, w, since, last, ask, free, n, s, hist}` (`memRecord` beim Speichern,
  `memState`: akut / back / gut). Heute fragt `painAskHTML` je akuter Stelle „Wie geht’s deinem Knie?“ (Weg/Leicht/Mittel/Stark, `ACT['pn-ask']`);
  bis zur Antwort gilt der letzte Stand, und zwar für alle Übungen, die die Stelle belasten (`src: 'mem'`). „Weg“ (oder „Schmerzen weg“ an
  einer Übung aus dem Gedächtnis) startet die Rückkehr: Woche 1 Last bis 1, Woche 2 bis 2, dann wieder alles (`src: 'back'`, `cap`).
  Muster (`memAvoid`): dreimal dieselbe Übung an derselben Stelle in 12 Wochen → der Coach nimmt eine Weile eine andere (`src: 'meiden'`).
  Hinweis zum Abklären (`memDoc`): seit 14 Tagen akut oder dreimal stark. Profil › Werte: Karte „Beschwerden“ (`painCardHTML`, Figur mit
  Gelenk-Punkten `JOINT_XY` und Muskeln, je Stelle eine Wert-Zeile, gemiedene Übungen), nur wenn es etwas gibt.
  Knopf „Für die Physio“ (`ACT['pn-physio']`, `physioData`): Blatt mit Skala-Legende und je Stelle einer Karte (Status-Chip, Wert-Zeilen seit/zuletzt, Verlauf als Farbpunkte, Chips „Aufgetreten bei“, Liste „Im Training angepasst“, `physioHTML`); geteilt wird derselbe Inhalt als Text mit Aufzählung (`physioText`) über
  `navigator.share`, sonst Kopieren. Wird nur auf dem Gerät erstellt.
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
  „Möchtest du noch ein Cool-down?“ (Ja = Schritt `coolStep` kommt dazu, Entwurf `_cd` '1'/'0'; `S.cooldown` wird nicht mehr genutzt, `log.cool`), auf Lauftagen (Laufen und Ergometer) ebenfalls als Frage beim Speichern (`saveAsk`): Ja speichert den Lauf und öffnet das Cool-down im Player, keine Karte mehr in der Übersicht. Ruhetag-Flow A (erster Ruhetag) und B (zweiter) auf dem Ruhetag. Tools › Mobility (früher Routinen, Seite `routinen`) startet
  alle Routinen frei, auch „Guten Morgen“. Der Player (versteckte Seite `routine`, Timer-Art `routine`, `paintRoutine`) führt Übung für
  Übung, „je Seite“ erst links, dann rechts. Fertige Routinen außerhalb des Trainings sind Einträge `kind: 'mobility'` und stehen unter
  Profil › Verlauf › Mobility; sie zählen nicht als Training (Pause, „Diese Woche“).
  Einträge im Verlauf (und auf „Heute erledigt“ bzw. einem erledigten Tag): „Korrigieren“ immer (`fixable`, versteckte Seite `fix`, `renderFix`,
  Zähler je Wert `fixStep`, Pfad wie `kraft.0.reps.2`; gespeichert als neuer Eintrag mit neuer ID und `fixed`, alter als Löschvermerk, damit der Sync
  es mitnimmt; Testtage rechnen `S.base` neu), „Löschen“ nur am Tag selbst (`logBtns`). Nach dem Speichern 10 s „Rückgängig“ (`showUndo`, `#undo`,
  `UNDO` mit Stand, Entwurf und neuen IDs; setzt `S.posSet`). 1RM-Einträge in Tools › 1RM bleiben jederzeit löschbar.
  Beweglichkeits-Check: letzter Schritt an Tag 1 im Einstiegstest und in der Testwoche am Blockende (`mobCheckStep`).
  Je Test eine Karte mit Figur der gewählten Stufe (`mobCheckHTML`; ohne Grafik die nächste Stufe mit Grafik). Auch die Testtage
  zeigen die Figur der gewählten Stufe (`testStepHTML`, z. B. Knee Push-up bei „Auf Knien“); Stufe wechseln = Figur wechselt.
  Eingabe am Testtag: Kachel „Stufe“ (Rad) und darunter Zähler „Wiederholungen“ bzw. „Bestzeit“ in 5-s-Schritten (`ACT['t-rep']`, `.t-rep`).
  Beweglichkeits-Check: Tests mit Haltezeit im Stufennamen (Hocke, Schulter) haben eine Stoppuhr in der Karte (`mcSwHTML`, `MCSW`,
  `ACT['mc-sw']`): Zeit groß, Ziel der gewählten Stufe als Chip (`mcGoal`), beim Erreichen `cue(true)` und grüner Chip.
  Tests mit fester Position zeigen immer dieselbe Figur (`MC_FIG`, Vorbeuge = `g_forward_fold`, stehend mit gestreckten Knien).
  Angezeigte Stufennamen über `STAGE_LABEL` in `stageText` (z. B. „Am Türrahmen“ → „Mit Halt (Ringe oder Türrahmen)“), gespeichert
  bleibt der alte Name. Übungen „je Seite“: Hinweis „Schwache Seite zuerst, sie zählt“ an der Kraft-Karte. Pistol mit Halt und Ringen
  am Ort bekommt die Ringhöhe (`ringNotes`).
  Jede Testseite hat einen Pausen-Timer (Timer-Art `block`, `cfg.again`): Pause aus dem Test-Text („3 Min Pause“), sonst 3 Min, Halteübungen
  2 Min; ohne Vorlauf, „Danach: nächster Versuch“, nach Ablauf „Pause vorbei“ (Tippen setzt zurück), kein Sprung zur nächsten Übung.
  Erfolge: eine Metall-Medaille je Bereich (`AREA_LAD`, `areaStates`, gemerkt in `AS_C`: beim Speichern wird nur ab dem letzten Tag neu gerechnet): Bronze ab Start, Silber ab 65, Gold ab 75, Platin ab 85;
  darunter das 1RM-Archiv mit den Bestwerten. Nach dem Speichern zeigt `showMoment()` Aufstiege eines Bereichs: Geschenk (erste Medaille),
  Glühen (Aufstieg), Anlaufen mit aufmunterndem Spruch (Abstieg), und einen neuen 1RM-Bestwert, mit Vibrationsmuster (`buzz`).
- Plan (`FOKUS`, `S.fokus`): nur noch Allround (`FOKUS_IDS`). Die anderen Schwerpunkte (Kraft, Calisthenics, CrossFit, Beweglichkeit,
  Laufen) sind mit Dennis gelöscht; ihre Beschreibung steht noch in `design/schwerpunkte.md`. Alte Stände mit anderem `S.fokus` setzt
  `render()` auf Allround, alte Einträge (Skill, lange Dehn-Einheit `mobl`, Benchmark, Intervall-Stufe) zeigt der Verlauf weiter an.
  `FOKUS.allround` hat Woche (`days(phase)`), Länge (`len` 12), Phasen (`phase`: `deload`, `test`, `check`, `taper`, `lab`) und „Nächste
  Stufe“ (`next`, `S.lvl`). `syncDays()` baut daraus `DAYS` (in `render()` und `saveDay()`); die frühere feste Woche heißt `DAYS0` und
  liefert nur noch Rückfall-Übungen. Gezählt wird in Blöcken: `S.blockStart`, `blockD()`, `blockN()`, `curPhase()`. Am Blockende setzt
  `blockCheck()` `S.review`, Heute zeigt dann „Block geschafft“ (`reviewHTML`, Weiter so / Nächste Stufe / Challenge, `startBlock`).
  Heute zeigt die Block-Karte (`blockCardHTML`) mit Fortschritt je Durchgang.
  Krafttage (`kday`) sind Schritt-Tage aus Bausteinen: `warm`, `hs`, `kslots` (Kraft als EMOM, `kraftRounds`), `mslots`/`mmin` (Metcon),
  `cmc` (Metcon einer Challenge). Kardio-Tage siehe unten (`runSpec` = `kardioSpec`), verglichen nur mit der gleichen Art (`runsOf(kind, ergo, art)`).
  Puls-Zonen nach Karvonen (`ZONES`, `zoneRange`, `S.hrMax`, `S.hrRest`, Einstellungen › Profil). Ohne eigenen Maximalpuls aus dem
  Geburtsjahr (`S.birthYear`, synchronisiert, `hrMaxEst`: Tanaka 208 − 0,7 × Alter, nie unter dem höchsten gemessenen Puls), sonst 185.
  `hrKnown()`: Maximalpuls eingetragen oder aus dem Alter; nur dann ändert ein lockerer Kardio-Tag den Kernwert.
  Übungswahl (`planFill`): Plätze nennen nur Muster; gewählte Leiter (`S.picks`, Schlüssel je Ort, Tag und Platz `slotKey`) bleibt,
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
  am Kraft-Schritt (3 s absenken, 1 s Pause) und mit Datum in der Coach-Karte. Volle Wdh. beim Warten sind kein Stillstand.
  Neue Leiter ohne Verlauf und Test: der Coach schätzt den Start (`stageEst`, `EST_C`, `cs.est`, `estWhy`), kein „Erstes Mal · Stufe wählen“ mehr:
  gleiche Familie (eine Stufe der Leiter schon im Metcon/als Ersatz gemacht) → deren Stufe − 1; sonst Teil-Wert des Musters (`partScores`,
  Zug/Druck/Beine/Rumpf) rückwärts: Stufe = ⌊(Wert − 40) / 59 × Stufen⌋ + 1, dann − 1; sonst Stufe 1 (Gewichtsleitern immer 1). Hinweis grau unter
  den Chips (`.k-est`) und in der Coach-Karte. Einstufung (`cs.cal`): in den ersten 2 Einheiten ohne Test alle Runden oben → sofort eine Stufe
  höher, ohne Sehnen-Wartezeit, nie zurück auf eine Stufe, die schon zu schwer war. Zu schwer (`cs.hard`): in der letzten Einheit mindestens
  2 Runden unter dem unteren Ende der Spanne → nächstes Mal eine Stufe leichter (nicht an Tagen „leichter“ wegen Schmerzen, `ladHist().soft`,
  nicht bei Gewichtsleitern). Metcon und Handstand ohne Verlauf nehmen dieselbe Schätzung (`lastMetconStage`, `lastHsStage`).
  Pause (`partPause`, `partLastDate`): zählt je Teil (Zug, Druck, Beine, Rumpf), nicht je Übung: eine Leiter, die nur woanders oder eine Woche
  nicht dran war, verliert keine Stufe. Gewicht: 10 % leichter nach 14 Tagen ohne den Teil oder 21 Tagen ohne genau diese Übung.
  Maxout (Testwoche, `k.max`, alte Einträge: `l.test` und erste Übung): Runde 1 ≥ obere Spanne + 3 zählt wie zwei Einheiten oben (`cs.mx`),
  unter der Spanne eine Stufe leichter (`cs.hard.mx`). Metcon-Stufe (`lastMetconStage`) folgt dem Kraftstand: Kraft-Stufe − 1 (Gewichtsleitern
  gleich), ohne Kraftverlauf die Schätzung `stageEst`; Metcon-Stände sind keine Quelle mehr für `stageEst`.
  Gewicht ohne eigenes 1RM (`rmEst` in `kgRec`): gleicher Anteil zwischen den Normen (`rmStd`) wie die 1RM im selben Muster, sonst
  Einsteiger-Norm × Körpergewicht, jeweils 10 % weniger.
  Laufen (`runCap`): lockerer Lauf heute höchstens so lang, dass die Woche 1,3 × Schnitt der letzten 4 Wochen nicht übersteigt (ab 3 Wochen Laufdaten).
- Kardio (Allround Tag 2 „Kardio locker“, Tag 5 „Kardio intensiv“, `kardio: true`): Laufen oder Ergometer, ein Kernwert `S.cardio`
  (`ftp`, `thr` in s/km, `ftpT`/`thrT` = Datum des Tests, synchronisiert; ohne Wert schätzt `cardioKw`). Ziele in Prozent (`kW`, `kP`,
  Faktor `f` für Watt, `pf` für Tempo). `kardioSpec(d, {kurz})` wählt das Format (`KF`): locker im 4er-Takt `locker`, `strides`
  (Ergometer `kadenz`), `lang`, `locker`; intensiv `vo2`, `3030` (im mittleren Drittel beim Laufen `hill`), `thr`, `pyr` (Ergometer `ou`);
  Testwoche `k5`/`ramp`. Umfang steigt je Drittel des Blocks, Entlastung/Taper weniger. Ergebnis: `main` (Abschnitte), `list` (Text),
  `iv.reps` für „Intervalle geschafft“. `ergoSeq` baut daraus den Ergometer-Timer, `kardioRunListHTML` die Laufliste mit Tempo,
  `kardioTargetHTML` den Ziel-Kasten. `kardioUpdate` nach dem Speichern (Snapshot `log.kw`), Pseudo-Leiter `cardio` in Ausdauer
  (`cardioScore`: W/kg 1,5–4,5 und Schwelle 8:00–3:30), Kurve `kardioDevHTML`. `S.ivStage`/`ivReps`/`ivBumpD`, `S.lauf`, `S.ziele` bleiben
  nur für alte Daten in `DEF`, nicht mehr in `SYNC_KEYS` (ebenso `pickSkip`, `cooldown`, `rmLifts`).
- Challenges (`CHAL`, `CHAL_GRP`, `S.challenge {id, date, start, dg, goal}`, synchronisiert): versteckte Seite `fokus` heißt jetzt
  „Plan & Challenges“ (oben „Worauf trainierst du?“: „Einfach trainieren“ = kein Wettkampf, Allround läuft ohne Datum, `ACT['ch-none']`;
  mit Challenge fragt es, ob sie enden soll), je Challenge die Seite `challenge` (`renderChallenge`, Datum als Räder Tag/Monat/Jahr `ch-date`, FTP-Ziel W/kg).
  Während der Challenge: Kardio-Rotation aus `ints`/`easy`, lange Einheit wächst (`lang`, `chalProg`), Wettkampftempo `rp`, eigene
  Formate `tempo`, `hyrox`, `brick`; Metcon an Tag 1 aus `mc` (`cmc`, `chalMetcon`); letzte 14 Tage Taper (`p.taper`: Kraft 3 Runden,
  Metcon kürzer, Kardio −40 %). Am Datum zeigt Heute `raceHTML` (Ergebnis, Log `kind: 'race'`, setzt den Kernwert), danach Allround.
  Block-Karte zeigt `chalLabel()`. Standard-Modus der Kardio-Tage kommt aus der Challenge (`runMode`).
- Skill-Block (Schritt `hs`, `skillKey`, `skillStage`, `skillHist`, `hsStepHTML`, `SKILL_IN`, `SKILL_KEYS`): Handstand (Rücken zur Wand → Face-to-Wall → 1 Fußlänge → Fuß-Taps → Frei) bis „Frei“ 2× am oberen
  Ende (`hsDone`), dann Handstand Walk. Freigeschaltete Skills (Familie `voraussetzt` erfüllt, Gerät da, nicht im Kraftteil, `skillOk`: Front Lever,
  Back Lever, Planche, Human Flag) im Wechsel: ungerade Durchgänge Handstand, gerade reihum ein Skill. Steigerung über die Haltezeit (Walk: Meter):
  2× obere Spanne → nächste Stufe (Sehnen-Bremse, eine pro Durchgang, nicht in Entlastung), 2× unter der halben unteren Spanne → leichter; Pause
  = Tage ohne Krafttraining. Karte: Figur der Stufe, Ziel, grüner Chip, „So kommst du rein“ (Handstand und Walk je Stufe aus `SKILL_IN` mit „Raus“,
  sonst `schritte` der Übung), Zähler „Beste Zeit“/„Beste Strecke“ (`hsSec`). Gespeichert als `sb: {lad, stage, sec}` (Name `skill` ist bei alten
  Einträgen eine Liste!), Handstand zusätzlich weiter als `hs`-Text. Coach-Karte und Ausblick über `skillNote`. Wissen › Skill-Ziele zeigt den Stand je Skill.
- Sprünge (`jumps.lad`, Tag 3: `g_broad_jump` Squat Jump → Broad Jump → Tuck Jump; Tag 1 bleibt Skater Jump): im Aufwärmen die Stufe vom Coach
  (`jumpN`, `jumpStage`, `jumpHist`), abgehakt = sauber (`jump: {lad, stage, ok}`), 2× sauber + Sehnen-Zeit → nächste Stufe. Zählt in Schnellkraft.
- Kurz-Check am Ruhetag (`restCheckIdx`, `mobCheckHTML(D, i)`): reihum ein Test aus dem Beweglichkeits-Check, zwei pro Woche (nicht in der Check-Woche);
  „Ruhetag abhaken“ speichert ihn als `kind: 'mobility'`, `check: true`, `mob`. Cool-down zeigt einen Hinweis, wenn ein Test unter dem Bestwert liegt (`mobDecline`).
- Heute anpassen (`adaptLineHTML`, `ACT.adapt`): kleiner Knopf `.btn.small` „Heute anpassen“ unter dem Ablauf (Krafttag) bzw. dem Lauf (Intervall). Blatt von unten
  „Sag deinem Coach, worauf er heute achten soll.“, nur „Fertig“, gilt nur für heute und sofort, Aktives grau hinterlegt (`.ad-it.sel/.open`):
  „Mir geht’s heute nicht gut“ (Antippen = Kurzversion bzw. lockerer Lauf statt Intervalle, Entwurf `_kurz`), „Ich habe wenig Zeit“
  (< 45 / < 30 / < 15 Min, `_zeit`; `zeitLv` kürzt in Stufen: ohne Handstand/Skill, Kraft und Metcon kürzer, ohne Metcon, Aufwärmen 4 Min),
  „Ich trainiere woanders“ (`_ort`, `trainOrt()`, nur diese Einheit; `S.ort` bleibt), am Bergsprint-Tag „Ich habe keine Steigung“
  (`_flat`, flache Sprints). Kein Ort-Feld mehr auf Heute.
- UX-Check Pakete 3, 4, 5: Heute zeigt den Ablauf in einer Karte mit „ca. X Min · N Schritte“ und „Training starten“ darin (`.tl-card`), darunter
  „Dein Coach hat heute angepasst“ (`coachCardHTML`: getauschte Leiter `planFill().neu`, Ersatz `why`, Stufe `brakeNote`, Metcon-Tausch `mwhy`, fehlendes
  Gerät, automatisch gezählter Ruhetag `S.autoRest`, Wiedereinstieg, nachgeholter Kardio-Test; Zeichen `coachItem`/`CI`), dann „Heute anpassen“,
  Block-Karte und Fortschritt. Am Schritt bleiben nur Übungs-Hinweise (Ringhöhe). „Heute erledigt“ beginnt mit „Was dein Coach daraus macht“
  (`outlookHTML`: nächste Stufe, Sehne wartet, Gewicht, Stillstand, gleiche Stufe). Lesbarkeit: keine Großbuchstaben-Zeilen, kleine Schriften im
  Design-Block mindestens 14 px, Muskelausgleich-Balken mit Zeichen ✓ ! ×.
- Hinweise auf Heute stehen dort, wo sie hingehören: Phase (Einstieg, Entlastung, Testwoche, Willkommen zurück) in der Block-Karte,
  Übungs-Hinweise grau unter dem Schritt (`notes`, `.tl-x`). Ringhöhe nur bei Ring-Übungen, in Bezug auf den Körper (`ringNotes`, `RING_H`).
  Tipps-Karte nur noch an Testtagen, beim Murph und bei optionalen Läufen.
- Start (Fragebogen statt Testtage, Dennis): ohne `S.started` zeigt Heute den Fragebogen (`onboardingHTML` → `fbPage`, ohne Reiterleiste).
  Begrüßung „Hallo, ich bin dein Coach“ mit „Los geht’s“, darunter „Lieber messen“ (alte Testtage, `start-test`) | „Schon mittendrin“ (Seite `mitten`,
  Durchgang/Tag, `start-at`). Fragen `FB_PAGES`: Über dich (Geschlecht, Jahrgang, Gewicht direkt in `S`), Orte (Kacheln, Gym bekommt einmalig `FB_GYM`),
  Erfahrung, Zug, Druck, Beine, Rumpf, Skill (`FB_Q`: Leiter-Kapsel, ein Tippen = weiter), Bestwerte (`FB_RM`, „+ Übung“ aus `RM_ALL`), 5 km bzw.
  20-Min-Watt, Schmerzen (Figur mit Gelenk-Punkten, Rücken als Knopf). Antworten in `S.fb {p, a}` (in `DEF`, nicht in `SYNC_KEYS`). „Dein Start“
  (`fbStartHTML`) zeigt Stufen, Arbeitsgewichte, lockeres Tempo und „Ich achte auf“. „Training starten“ (`ACT['fb-start']`): `S.base` mit
  `src: 'fb'` (`fbBase`: Stufe der Antwort minus `FB_OFF` je Erfahrung, ohne Angabe 1), 1RM-Einträge `src: 'fb'`, `S.cardio.thr`/`ftp` ohne
  Testdatum, Beschwerde über `memRecord`, dann Durchgang 1, Tag 1 (Kurzversion wie nach dem Test). Startstufen aus dem Fragebogen sind
  eine Angabe: `baseOf` meldet `fb`, `coachStage` stuft in den ersten 2 Einheiten nach (`cs.cal`), Hinweis „aus deinem Fragebogen“
  (`brakeNote`, `skillNote`); `skillStage` nimmt die Startstufe aus `S.base`. Zusätze hinter „·“ brechen nur als Ganzes um (`dotSub`, `.nobr`).
- Wiedereinstieg (Dennis): ab 15 Tagen Pause (`S.comeback.ask`, `days`) zeigt Heute am Krafttag vor dem ersten Training die Karte „Willkommen zurück“
  (`wbDue`, `wbCardHTML`, „Kurz einschätzen“, `ACT['wb-go']`); „Training starten“ wird dann „Ohne Einschätzung starten“. Sechs Seiten `WB_PAGES`
  (Zug, Druck, Beine, Rumpf, Skill, Schmerzen) aus dem Fragebogen, Stand in `S.wb {on, p, a, pre, prev}` (in `DEF`, nicht synchronisiert; `fb()` und
  `fbList()` schalten um). Stand vor der Pause je Leiter aus `ladHist`/`skillHist` (`wbPre`), markiert „Vor der Pause“, unten „Wie vor der Pause“.
  „Dein Wiedereinstieg“ (`wbStartHTML`, hellblau bis zum Stand vor der Pause). `ACT['wb-start']`: `S.base` mit `src: 'wb'`, `date`, `pre`
  (`wbStage`: Einschätzung, höchstens der Stand vor der Pause; nur beantwortete Fragen), Beschwerde über `memRecord`, `S.comeback.done`.
  `baseOf` liefert `date`/`pre`/`wb`, `sinceBase` blendet den Verlauf vor dem Datum aus (`coachStage`, `skillStage`); in den ersten 2 Einheiten alle
  Runden oben → sofort eine Stufe hoch bis zum Stand vor der Pause (`cs.cal`). Übersprungen = Pausen-Regel (eine Stufe leichter). Kurzversion,
  Entlastung ab 29 Tagen und Gewichte −10 % bleiben.
- Coach › Heute: zuerst eine kurze Übersicht (`renderHeute`, Ablauf als nummerierte Schritte) mit „Training starten“.
  Ein Tag vor dem aktuellen, der in diesem Durchgang schon gespeichert ist (`dayLog`), zeigt nur die Karte „Ergebnis“ (`logLines` wie im
  Verlauf) und „Zurück“, kein „Tag machen“ und kein Start.
  Danach Schritt für Schritt (`stepsOf`, `stepPageHTML`): Krafttag Aufwärmen, Handstand, Kraft, Metcon; Testtag (Einstiegstest, `isTestDay`)
  Aufwärmen, eine Übung pro Schritt, an Tag 1 der Beweglichkeits-Check, zum Schluss Metcon AMRAP 8 (`testMetcon`, `testMetconStep`,
  `testMetconHTML`): je Muster aus `TEST_MC_ORDER`, das heute nicht getestet wurde, die Metcon-Übung mit der kleinsten Überschneidung der
  Hauptmuskeln mit den getesteten (Ganzkörper zählt als 2, ab 2 fällt der Platz weg), gespeichert als `metcon` im Test-Eintrag; Murph ein Schritt. Der aktuelle Schritt steht im Entwurf (`_step`, `_at` in `tp.drafts`).
  Im Training (Schritt-Seiten) ist die Reiterleiste ausgeblendet (`body.focus`); oben rechts ein kleines X (`ACT.quit`)
  fragt nach: Zwischenspeichern (weiter beim Schritt), Training abbrechen (Entwurf weg) oder Weiter trainieren.
  Lauftage haben keine Schritte, nur „Ergebnis von der Uhr“: Dauer, Puls Ø, Strecke (km, 3 Nachkommastellen), Tempo errechnet.
  Laufen: vor jedem Lauf das Lauf-ABC (`laufAbcHTML`, `LAUF_ABC`, immer gleich, keine Ansagen; es beginnt mit 5 Min Einlaufen, darum startet die
  Laufliste `kardioRunListHTML` direkt mit dem Hauptteil, Dennis). Pulsuhr: Start direkt nach dem Lauf-ABC, Stopp nach dem Auslaufen
  (erste und letzte Zeile der Laufliste, Satz im Lauf-ABC und unter „Ergebnis von der Uhr“); `kardioSec` = Hauptteil + 5 Min Auslaufen, abschaltbar unter Einstellungen ›
  Training › Laufen (`S.laufAbc`, nur auf dem Gerät). Ergometer am Lauftag = Schritt-Tag wie ein Krafttag (`stepsOf`): Übersicht mit
  Umschalter (`runSegHTML`), Ziel-Watt und „Training starten“, Schritt 1 `ewarm` Einfahren (Stufen 50/70/85 % bzw. 3 Min 60 %, vor
  Intervallen 3 × 10 s schnell), Schritt 2 `ergo` Hauptteil (Intervalle/Pause bzw. Ziel-Watt, ausfahren) mit Ergebnis und Speichern.
  Timer-Art `seq` (`ergoSeq` mit `warm`-Kennung, `ergoPart`, `ergoTimer`, Abschnitte mit `watt`), Vollbild zeigt Watt groß.
  Im Training stehen alle Abschnitte als Zeilen wie beim EMOM (`seqRowsHTML`, `.sq-row`, `ergoListHTML`): der laufende blau umrandet
  mit Restzeit (nur er zählt herunter), erledigte blass, die Liste rollt mit (`paintSeq` in `paintMini`). Dennis' Ergometer läuft im
  Watt-Modus: Texte sagen „Watt einstellen“, nicht „Widerstand für 80–90 U/min“.
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
  Liste mit Runden (Metcon, Murph): keine Zeile automatisch offen, je Zeile der kurze Hinweis (`.fl-x`); Antippen klappt auf und zu (`_o_<id>`).
  Jede Übung erklärt sich: aufgeklappt bzw. einzeln „So geht’s“ aus `schritte` (`flowItem.how`, `howHTML`), Aufwärmen ohne Bibliothek mit `h` in `WARMUP`;
  Testschritte zeigen „So geht’s“ der gewählten Stufe. Metcon: jeder Zähler-Schritt schreibt `mr`/`mw` mit (`flowSave`, `amrapCount`),
  die Kacheln Runden/Extra-Wdh. sind dann schon gefüllt und nur zum Korrigieren (`mcCountHint`).
  Wischen (`data-swipe`, `swipeDo`): links = erledigt / weiter / +, rechts = zurück / rückgängig / –, umkehrbar.
  Metcon: Rundenzähler (`.stepper`) nur in der Liste; Einzeln ohne Kacheln und Hauptaktion, solange der AMRAP läuft.
  Am Ende des AMRAP fragt `amrapCheck` „Stimmt dein Ergebnis?“ mit gezählten Runden und Wdh. (`amrapCount`).
  Kraftschritt (`kraftStepHTML`) mit Umschalter „Übung | Minuten“ oben (`S.kraftView` 'ex'/'min', nur auf dem Gerät, `ACT['k-view']`; Kraft steht nicht mehr
  in `TRAIN_TYPES`): „Übung“ = nur die laufende Übung als Karte (Punkte `.k-dot` wechseln, Runden `.k-r`, Zähler `kCounter`), „Minuten“ = jede
  EMOM-Minute eine Zeile (`.k-min`), die laufende offen mit Mini-Figur und Zähler. Dran ist die Minute der Uhr, sonst die gewählte (`ui.kSel`,
  `ACT['k-sel']`) oder die erste ohne Eintrag (`kraftNow`). Die Stufe setzt der Coach (grüner Chip `kStageChip`, nicht wählbar); ohne Verlauf
  schätzt er den Start (`stageEst`, „Erstes Mal“ nur noch als Rückfall `E.first`). Zähler `ACT['k-rep']` (Vorschlag `defRep`, Tippen auf die Zahl übernimmt), Gewicht `ACT['k-kg']`
  in `kgStep`-Schritten. Wechselt die Minute, bekommt die fertige Minute ohne Eintrag den Vorschlag (`kraftAutoFill` in `paintMini`, zeichnet neu), markiert mit
  `_a<feld>` im Entwurf: grau „Vorschlag übernommen, tippen zum Bestätigen“, in „Minuten“ ohne Haken; Tippen oder Ändern bestätigt. Chips „3–6 Wdh.“ und „✓ Stufe N <Stufe>“.
  „Schmerzen“ als roter Fahnen-Knopf in der Karte (`kFlag`, `.pn-flag`).
  EMOM: Chip „Als Nächstes“ mit Mini-Figur und Countdown (`emomNext`, `miniFig`).
  Figur oder Platzhalter (`figBox`, winkendes `_wave` mit „Grafik folgt“) überall, wo eine Übung gezeigt wird: Schritte, Kraft-Karten,
  Bibliothek (Familien-Seite, jede Übung), Mobility-Player (`#rp-fig`). Neue Grafik = nur in `Maskottchen.EXERCISES` eintragen.
- Einstellungen „Mittel“ (Dennis): Karte „Über dich“ (Name, Geschlecht, Gewicht, Geburtsjahr, Foto), Karte „Aussehen“ (Hell/System/Dunkel und
  Textgröße A/A/A, `S.textSize` 's'/'m'/'l' nur auf dem Gerät, `html[data-text]` mit `zoom` auf `body`, `lookHTML`), dann „Sync über GitHub“, „Mehr“
  (`moreHTML`: Hintergrund, Markerfarbe, Zahlen-Schrift, Countdown, Haptik, Gesten, Maximal-/Ruhepuls, Ansicht, Vollbild) und „Daten“ (Startdatum,
  Export/Import, Zurücksetzen; `settingsHTML`). Trainings-Entscheidungen trifft der Coach: `modeOf` = `TRAIN_STD`, `roundMode()` = 'ex',
  `timerModeOf` = `TIMER_STD`, Vollbild dreht immer mit, Lauf-ABC immer; „Stand setzen“ ist weg. Alte Werte bleiben in `S`, werden nicht mehr benutzt.
  Aussehen › Hintergrund (nur Hellmodus, `S.paper`, `PAPERS`): Weiß, Kreide, Leinen, Nebel. `applyTheme` setzt `data-paper` nur im Hellen.
- Rad-Blätter mit Zahl (`openSheet` mit `num`): nochmal auf den großen Wert tippen = Zahlentastatur.
- Ist ein Blatt offen, scrollt der Hintergrund nicht (`html:has(.sheet-bg.open)`), Listen im Blatt haben `overscroll-behavior: contain`.
- Bewegung: kein blaues Antipp-Leuchten (`-webkit-tap-highlight-color`), gedrückte Kapseln geben nach (96 %, Umschalter 92 %).
  Wechselt die Wahl in `.seg`, `.cap` oder `.pills`, gleitet die weiße Pille (`.glide`), Kapsel-Knöpfe rutschen, neue blenden ein
  (Block „Bewegung“ im Skript, merkt sich die Lage beim `pointerdown` und animiert nach dem Neuzeichnen). Bei „Bewegung reduzieren“ aus.
- Jeder Schritt bringt seinen Timer fertig eingestellt mit (helle Glas-Leiste `#tbar`, `paintMini`), Timer-Art `block`
  für Aufwärmen und Handstand. Aufwärmen: jede Übung mit Zeitangabe („5 Min“, „30 s“, `flowSecs`) bekommt ihren eigenen Timer, sobald sie dran ist
  (`warmTimer`, `cfg.warmItem`, Ergometer bei < 15 Min Zeit 2 Min); nach Ablauf ist sie abgehakt und die nächste dran. Übungen ohne Zeit
  hakt man ab, dann gibt es keine Timer-Leiste. Die laufende EMOM-Übung ist blau umrandet. Vorlagen aus dem Plan gibt es nur dort.
- Tools › Timer ist frei einstellbar: EMOM (Alle, Runden), AMRAP (Dauer), Intervall (Arbeit, Pause, Runden), For Time
  (Umschalter „Time Cap“ / „Ohne Time Cap“, `S.tmr.zeit.open`; mit Time Cap läuft die Zeit herunter, ohne hoch; Ergebnis ist immer die gebrauchte Zeit), immer mit 10 s Vorlauf. Einstellung je Art in `S.tmr` (`tmr()`, nur auf dem Gerät).
  Rundenzähler auf der Timer-Seite nur, solange der Timer läuft (`#t-rrow`).
- Countdown (`countdownHTML`, Einstellungen › Training, kurz auch unter Tools › Timer): Piepen oder Stimme (`S.cdVoice`), Sprache
  Deutsch/Englisch (`S.cdLang`, `CD_WORDS`: „Drei, zwei, eins, los!“ / „Three, two, one, Go!“, Pause „Pause!/Rest!“, Ende „Zeit!/Time!“),
  je Anlass an/aus (`S.cdWhen`, `CD_WHEN`: Start nach dem Vorlauf, jede neue Runde, Intervall Arbeit/Pause, Ende; aus = Piepen).
  Stimme über die Sprachausgabe des Handys (`say`, `cdVoice`, `cdEvent` in `tick`/`finish`); ohne passende Stimme piept es. Nur auf dem Gerät.
- Timer im Vollbild (`#fs`, `fsOpen`/`fsClose`/`fsPaint`, `fsSide`): große Zeit in Geist, rechts (quer) bzw. unten (hochkant) eine Karte:
  Runden (Tools AMRAP/For Time, Tippen = +1), Übungen der Runde (Metcon/Murph im Training, `fsFlowHTML`), Aufwärmen mit aktueller Übung, Figur, „‹ Zurück | Erledigt ›“ und „Als Nächstes“ (`fsWarmHTML`), laufende EMOM-Übung mit
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
  Laufstrecke (`eq_laufstrecke`) ist ein Gerät je Ort: nur damit kommt „Run“ (200/400 m) in den Metcon. Einmalig angekreuzt bei Gym,
  Park und Unterwegs (Kennung `lf` je Ort).
  Blätter mit Textfeld passen sich an die Tastatur an (`fitKeyboard`, `interactive-widget=resizes-content`).
  Der Plan füllt die Plätze (`kslots`/`mslots` in `FOKUS.allround`) für den gewählten Ort (`planFill`): Kraft bleibt bei der gewählten Leiter (`S.picks`),
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
- Speichern nur auf dem Gerät (localStorage) plus Sync über GitHub. Der frühere Weg über `window.claude` (App als Claude-Artifact,
  `initDb`, `TP_BUILD`) ist gelöscht.
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
- Export-Format `{exportiert, stand, einheiten}` muss importierbar bleiben (dazu `foto: {ts, data}`, `exportData`, Import übernimmt es).
  „Als Tabelle“ (`exportCSV`, Semikolon, BOM) ein Satz pro Zeile; `shareFile` teilt oder lädt herunter. Ohne Sync auf Heute einmal im Monat
  „Daten sichern“ (`backupHTML`, `S.exportTs`, `S.backupAsk`, nur auf dem Gerät).
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
Zahlen im Training sind Zähler (`cntRow`/`kCounter`, `.k-cnt`, `ACT['k-rep']`: Metcon Extra-Wdh. und Runden (Runden nur, wenn die Liste
sie nicht schon zählt, `mcResultHTML`), Handstand-Zeit, Ausgleich-Sätze, Testtag-Wdh./Bestzeit, Intervalle geschafft). Werte von der Uhr
(Dauer, Puls, Strecke, Watt) und die Stufe im Beweglichkeits-Check bleiben Kacheln (`.tile`) mit Rad-Blatt. Stufen setzt der Coach auch in Metcon und
Handstand (grüner Chip `coachStageHTML`, ohne Verlauf geschätzt wie bei neuen Leitern); am Testtag ist die Stufe eine Wert-Zeile. Fünf Grundsätze in `DESIGN.md`. Einstellungswerte (Profil, Stand, Startdatum, Challenge) Wert-Zeilen
(`valRows`/`valRow`, `.vrows`, Name links, Wert rechts, Pfeil). Keine `<select>` und kein Datumsfeld. Hinweise: erst Ablauf, dann Aktion; Hinweise am passenden Schritt, Tipps-Karte (`tipsHTML`) nur für echte Anleitungen.
Bandstufen ausgeschrieben mit Farbpunkt (`stageHTML` = `.bst` mit `.bdot`, Punkt in em, mittig auf Höhe der Großbuchstaben, davor und danach .32em; in Chips `.chip:has(> .bst)` mit `gap`; nie `bdot` + Name von Hand zusammensetzen); Farbe je Band wählbar unter Tools › Übungen › Bänder (`S.bandCol`, synchronisiert). Tippflächen mindestens 44 px.

## Trainingslogik (Kurzfassung)
- Allround (Standard): Tag 1 Ganzkörper (Zug, Druck, Ausgleich), Tag 2 Kardio locker, Tag 3 Zug, Tag 4 Ruhetag, Tag 5 Kardio intensiv,
  Tag 6 Druck, Tag 7 Ruhetag (3 Training, 1 frei, 2 Training, 1 frei; Dennis). Der Tagesname zeigt den Inhalt. Die gelöschten Schwerpunkte stehen noch in `design/schwerpunkte.md`.
- Allround-Krafteinheit: 8 Min Aufwärmen, 5 Min Skill-Block (Handstand, später im Wechsel mit freigeschalteten Skills), EMOM 12 (4 Runden, 3–6 Wdh., RIR 2), Metcon AMRAP 8, Ausgleich 4 Min (wenn etwas zu kurz kommt).
  Durchgang 4 und 8 im Block: Entlastung (Kurzversion, kein Maxout). Letzter Durchgang (12) = Testwoche: Maxout in Runde 1 der
  Hauptübung, Beweglichkeits-Check an Tag 1, danach der Rückblick. Getestet wird immer am Blockende
  (Kardio: Rampentest oder 5 km am Tag 5).
- Kein Murph mehr im Plan (mit Dennis, `FOKUS.allround.murph: false`); alte Murph-Einträge bleiben im Verlauf, Murph-Challenge bleibt.
- Ein Trainingstag pro Kalendertag: `advance()` merkt `S.tagSince` und `S.advBy` ('user' = heute gespeichert/abgehakt, 'auto'). `doneToday0()` →
  Heute zeigt „Heute erledigt“ mit dem Ergebnis von heute, der nächste Tag ist nur Vorschau. In der Tage-Kapsel bleibt bis Mitternacht der erledigte Tag gefüllt (`doneTag`). Tage vorziehen gibt es nicht mehr: der Coach entscheidet die Reihenfolge (Dennis). `dayCheck()` (in `render()`):
  Ruhetag zählt von selbst, sobald sein Kalendertag vorbei ist (nach Training am Vortag ist er der nächste Tag).
  Wiedereinstieg `S.comeback {from, n, dl}`: 8–14 Tage Pause = 2 Einheiten kürzer, ab 15 Tagen 5, ab 29 Tagen ist der Durchgang Entlastung
  („Wiedereinstieg“ in `curPhase`) und eine fällige Testwoche rutscht nach hinten (`S.blockStart` + 1).
  Gewicht steigt höchstens alle 7 Tage (`kgUpHere`). Kardio-Grenze 1,3× gilt für Laufen und Ergometer. Verpasster Kardio-Test →
  nächster intensiver Tag wird Test (`cardioTestDue`). Sync: Tag/Durchgang laufen nie zurück, außer von Hand gesetzt (`S.posSet`).
- Durchgang 1 und 2 nach dem Fragebogen bzw. Einstiegstest: Kurzversion (Kraft 3 Runden, Metcon 5 Min).

## Übergabe zwischen Sitzungen
- Zu Beginn jeder Sitzung `UEBERGABE.md` lesen (Stand, offene Aufgaben, Rückmeldungen von Dennis).
- Am Ende jeder Aufgabe `UEBERGABE.md` im selben Pull Request aktualisieren.
- `design/` enthält nur Entwürfe und Rohdaten (Maskottchen, `mobility2.json`), nicht Teil der App und nicht in `sw.js`.
- Aufträge für Cowork liegen in `design/auftraege/` (`familien.md` erledigt, `bibliothek.md` läuft). Pakete von Cowork immer zuerst mit
  `node design/auftraege/pruefen_bibliothek.js <datei.json>` prüfen, dann mit `node design/auftraege/einbauen_bibliothek.js <dateien>`
  einbauen (prüft selbst noch einmal, schreibt lib-data, fam-data und `design/familien.json` im alten Format über `familien_format.js`,
  reiht Stufen nach `nach` ein, zählt Ränge neu und zieht `ab_rang` anderer Familien mit, legt die Pakete in `design/auftraege/pakete/` ab).
  Neue Geräte aus Paketen tragen `auto: true`: Kosten aus dem Preis, Nutzen aus der Zahl der Übungen, Score wird bei jedem Einbau neu gerechnet.
  Erledigt: alle Pakete (Teil 1 und 2 aller Muster), 380 Übungen mit allen Feldern, 13 neue Geräte (`auto`). Leiter `g_kipping_pullup`: Stufe „Chest-to-Bar“ zeigt auf `g_kipping_c2b` (Name bleibt). Die Suche in Tools › Übungen findet auch `alias` (deutsche Namen).
  Neue Felder je Übung: `muskeln`, `gelenke` (Belastung), `bewegt` (bewegte Gelenke: eins = isoliert, keins = statisch), `sehne`,
  `ermuedung`, `technik`, `seitig`, `laut`, `rx`, `alias`. Muster `isolation` (`MUSTER.isolation`): steht in keinem Platz, kommt also nie in den Kraftteil; Isolation und Mobility fehlen im Skill-Baum (`SKILL_OHNE`).
  Ersatz-Einzelübung in `planFill` nur mit Einheit wdh oder kg (keine Halte- oder Streckenübung mit „6–10 Wdh.“). `g_run` geht auch mit `eq_laufband`.
- Übungsgrafiken: immer die Maskottchen-Vorlage `design/maskottchen/maskottchen.js` benutzen, Regeln in `design/maskottchen/VORLAGE.md`.
  Neue Grafiken in Runden zu 20 im Canvas zeigen, nach Freigabe in `index.html` kopieren. Vorher `node design/maskottchen/pruefen.js`
  (gestreckte Gelenke, Kontaktpunkte halten).

## Vor dem Abschluss
- Prüfen, dass `index.html` ohne JavaScript-Fehler lädt und alle drei Reiter mit ihren Unterseiten funktionieren.
- Die Änderung im Pull Request kurz auf Deutsch beschreiben.
- Dem Nutzer am Ende immer den vollständigen Link zum Pull Request nennen.
