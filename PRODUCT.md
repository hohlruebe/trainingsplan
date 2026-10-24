# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

Installierte PWA, vor allem auf einem Android-Handy in Chrome (Hochformat, 390 px zuerst). Läuft auch am Laptop (eine Spalte, Training im Vollbild).

## Users
Zuerst Dennis: trainiert Calisthenics × CrossFit drei Einheiten (A, B, C) pro Kalenderwoche, zu Hause, im Gym oder geteilt, und arbeitet zum Teil im Schichtdienst mit Nachtdiensten. Er öffnet die App, um zu sehen, was heute dran ist, das Training Schritt für Schritt durchzuziehen und Werte einzutragen, die nur er kennt.

Später auch andere Nutzer (Fragebogen und Einstieg für neue Nutzer gibt es schon). Neue Funktionen dürfen nicht nur mit Dennis' Daten funktionieren.

## Product Purpose
Ein persönlicher Coach, der die Trainingswoche plant und jede Einheit vorgibt: Stufe, Gewicht, Übung, Umfang und Ablauf (Aufwärmen, Skill, Kraft als EMOM, Ausgleich, Abschluss). Erfolg heißt: Dennis trainiert regelmäßig, wird messbar stärker, und der Plan überlebt Dienste, Müdigkeit und Ausfälle, ohne dass er selbst umplanen muss.

## Positioning
- **Der Coach entscheidet.** Was sich aus den Daten ableiten lässt, entscheidet die App. Der Nutzer gibt nur Antworten und trägt nur ein, was nur er weiß.
- **Plant um den Schichtdienst.** Die Woche richtet sich nach Diensten, Schlaf, Tagschlaf nach Nachtdienst, Arbeitsweg, gesperrten Zeiten, Befinden und dem Google Kalender. Ausfälle werden nachgefragt und sinnvoll verteilt.
- **Offline, ohne Konto.** Eine Datei, kein Server, keine externen Quellen. Die Daten bleiben auf dem Gerät; Sync über GitHub und die Kalender-Brücke sind optional und gehören dem Nutzer.

## Operating Context
- Benutzt mit einer Hand am Handy, oft mitten im Training (zwischen Sätzen, mit Timer, verschwitzt) oder nach einem Dienst, müde.
- Orte: zu Hause (z. B. Kettlebell, Ringe, Band), Gym, Split. Geräte bestimmen, welche Übungen der Coach wählt.
- Google Kalender über eine eigene Apps-Script-Brücke: liest Dienste („DD …“) und Termine, schreibt Trainings in einen eigenen Kalender „Trainingsplan“.
- Bereiche: Reiter Tools, Coach (Heute, Plan, Wissen), Profil (Werte, Erfolge, Einstellungen).
- Arbeit mit mehreren KI-Werkzeugen. Regeln in `AGENTS.md`, Doku in `CLAUDE.md`, Stand in `UEBERGABE.md`, Gestaltung in `DESIGN.md`.

## Capabilities and Constraints
- Die ganze App ist `index.html` (HTML, CSS, JS, kein Build). Die ersten beiden `<style>`-Blöcke (Schriften als Base64) nie bearbeiten.
- Muss offline laufen: keine CDNs, keine externen Schriften oder Skripte. Ändern sich andere App-Dateien: `CACHE` in `sw.js` hochzählen, `ASSETS` ergänzen.
- Gespeicherte Daten nie brechen: neue Felder mit Standardwert in `DEF` (und `SYNC_KEYS`), alte IDs, Namen, Stufen und Tag-Bedeutungen bleiben, Export- und Sync-Format kompatibel.
- Sync-Token und Kalender-Link (`tp.kal`) nie in Code, Export, Sync oder Logs.
- Plan 2 (A, B, C auf Tag 1, 3, 6) ist Standard; Einträge tragen `pv: 2` und `unit`.
- Bibliothek mit rund 415 Übungen, Anleitungen, Normen und Maskottchen-Animationen (`design/maskottchen/`); fehlende Grafiken zeigen „Grafik folgt“.
- Coach › Heute bleibt schlank: nur was heute dran ist, höchstens eine Frage, der Ablauf mit Start. Neue Hinweise gehören an den Schritt, in den Plan oder ins Profil.
- Keine medizinischen Freigaben: „Erholt, beschwerdefrei“ ist eine Antwort des Nutzers, keine Diagnose.
- Tests: `node tests/*.cjs`, Browser-Tests mit Playwright.

## Brand Commitments
- Name „Trainingsplan“, App-Symbol in `design/symbol/` (farbig und mono), Maskottchen für Übungsgrafiken.
- Sprache: Texte auf Deutsch, Übungsnamen auf Englisch, kurze klare Sätze, keine Zeilen in Großbuchstaben.
- Die Gestaltung ist in `DESIGN.md` festgelegt (Kapsel-Konzept, fünf Grundsätze) und gilt verbindlich.

## Evidence on Hand
- Echte Trainingsdaten von Dennis (über Sync-Datei), Screenshots in `fst/`, Muskel-Bilder in `zv/`.
- Keine Erfahrungsberichte, Nutzerzahlen oder Studien. Nichts davon erfinden.

## Product Principles
1. **Der Coach entscheidet, der Nutzer antwortet.** Jede Eingabe, die die App selbst ableiten kann, ist eine zu viel.
2. **Der Plan passt sich dem Leben an, nicht umgekehrt.** Dienste, Schlaf, Müdigkeit und Ausfälle sind normale Eingaben, keine Ausnahmen.
3. **Nichts geht verloren.** Speichern, Rückgängig, Korrigieren und Sync sind zuverlässiger als jede neue Funktion.
4. **Eine Sache pro Moment.** Heute zeigt nur heute; jede Meldung steht genau einmal.
5. **Ehrliche Zahlen.** Kein Rekord, keine Stufe und kein geschaffter Wert, den niemand bestätigt hat.

## Accessibility & Inclusion
Tippflächen mindestens 44 px, Schrift mindestens 14 px, Farbe nie allein (✓ ! × dazu), Textgröße wählbar, „Bewegung reduzieren“ wird beachtet, `aria-label` an Symbol-Knöpfen, Haptik als Rückmeldung.
