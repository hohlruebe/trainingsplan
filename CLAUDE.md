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
  - Haupt-`<script>`: Logik für Heute, Timer, Verlauf, Übungen, Plan, Einstellungen, Sync
- Reiter von links nach rechts: Tools (Timer, Übungen), Coach (Heute, Plan), Profil.
  Unterseiten über den Umschalter oben (`GROUPS` im Skript). Einstellungen und Sync sind eine
  versteckte Seite `einst` (Regler-Symbol oben rechts im Profil, `HIDDEN` im Skript).
- Profil: Kopfkarte mit rundem Foto, Fortschrittsring (Gesamtwert 0–99), Stufe Bronze/Silber/Gold/Platin,
  Name und „Diese Woche“. Darunter Auswahl-Kachel mit Menü (alphabetisch): Entwicklung, Erfolge, Verlauf, Werte.
  Werte: sechs Bereiche Ausdauer, Beine, Druck, Rumpf, Skill, Zug (`AREAS`). Jede Leiter zählt
  40 + 59 × ((Stufe − 1) + Anteil der Wdh. in der Zielspanne) / Stufenzahl; Bereich = Mittel der begonnenen
  Leitern, Gesamtwert = Mittel aller sechs. Alles wird aus den Einheiten berechnet (`ladderStates`).
  Erfolge: je Leiter eine Metall-Medaille mit Lorbeerkranz (ein Blattpaar pro Stufe), letzte Stufe Platin.
  Nach dem Speichern zeigt `showMoment()` neue Stufen: Geschenk (erste Medaille), Glühen (Aufstieg),
  Anlaufen mit aufmunterndem Spruch (Abstieg), mit Vibrationsmuster (`buzz`).
- Listen und Menüs immer alphabetisch sortieren.
  Reiterleiste: schwebende Glas-Kapsel ohne Glanz, nur der aktive Reiter zeigt seinen Namen.
  Beim Wechseln kurzes haptisches Feedback (`haptic()`, abschaltbar in den Einstellungen).
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

## Trainingslogik (Kurzfassung)
- Tag 1 Kraft A (Pull), Tag 2 Lauf locker, Tag 3 Kraft B (Push), Tag 4 Intervall-Lauf,
  Tag 5 frei, Tag 6 Kraft C (Pull + Push), Tag 7 frei.
- Krafteinheit: 8 Min Aufwärmen, 5 Min Handstand, EMOM 12 (4 Runden, 3–6 Wdh., RIR 2),
  Metcon AMRAP 8.
- Erster Tag 1 im Monat (frühestens 4 Wochen nach Start) = Murph.
  Beginnt ein Durchgang in den letzten 7 Tagen des Monats: Test-Durchgang.
- Durchgang 1 und 2 nach dem Einstiegstest: Kurzversion (Kraft 3 Runden, Metcon 5 Min).

## Vor dem Abschluss
- Prüfen, dass `index.html` ohne JavaScript-Fehler lädt und alle drei Reiter mit ihren Unterseiten funktionieren.
- Die Änderung im Pull Request kurz auf Deutsch beschreiben.
- Dem Nutzer am Ende immer den vollständigen Link zum Pull Request nennen.
