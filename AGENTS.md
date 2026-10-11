# Hinweise für KI-Agenten (Codex, ChatGPT und andere)

Dieses Projekt wird mit mehreren KI-Werkzeugen bearbeitet. Damit alle nach denselben Regeln arbeiten:

## Zuerst lesen
1. `CLAUDE.md`: was die App ist, wo was im Code steht, alle Regeln. Gilt für dich genauso wie für Claude.
2. `UEBERGABE.md`: aktueller Stand, offene Aufgaben, Rückmeldungen von Dennis.
3. `DESIGN.md`: vor jeder neuen Oberfläche (Kapsel-Konzept, fünf Grundsätze).

## Die wichtigsten Regeln in Kürze
- Die ganze App ist `index.html` (HTML, CSS, JavaScript in einer Datei, kein Build-Schritt). Die ersten beiden `<style>`-Blöcke (Schriften als Base64) nie bearbeiten.
- Die App muss offline laufen: keine CDNs, keine externen Schriften oder Skripte.
- Gespeicherte Daten nie brechen: neue Felder mit Standardwert in `DEF`, alte IDs, Namen und Stufen nie ändern, Export- und Sync-Format kompatibel halten.
- Ändert sich außer `index.html` eine Datei der App oder kommt eine dazu: `CACHE` in `sw.js` hochzählen und neue Dateien in `ASSETS` eintragen.
- Texte auf Deutsch, Übungsnamen auf Englisch, kurze klare Sätze. Handy zuerst (390 px), Tippflächen mindestens 44 px.
- Der Coach entscheidet, der Nutzer gibt nur Antworten.
- Den Sync-Token nie in Code, Export oder Logs schreiben.

## Zusammenarbeit
- Immer nur ein offener Pull Request zur Zeit. `index.html` ist sehr groß, parallele Änderungen führen fast sicher zu Konflikten.
- Arbeite auf einem eigenen Branch und öffne einen Pull Request gegen `main`. Beschreibung kurz auf Deutsch.
- Vor dem Abschluss: prüfen, dass `index.html` ohne JavaScript-Fehler lädt und alle drei Reiter (Tools, Coach, Profil) mit ihren Unterseiten funktionieren.
- Am Ende jeder Aufgabe `UEBERGABE.md` aktualisieren, damit die nächste Sitzung (egal mit welchem Werkzeug) weiß, was passiert ist.
- Neue Funktionen auch in `CLAUDE.md` beschreiben, dort steht die Dokumentation für alle.
