---
type: konzept
---
# So pflegst du die Bibliothek

**Obsidian führt.** Was hier steht, kommt in die App. Die App-Daten (`lib-data`, `fam-data` in index.html) werden aus diesen Notizen gebaut.

## Was der Build liest
- **Übungen/**: die Eigenschaften oben (id, Muster, Bereich, Einheit, Rolle, Equipment, Nutzen, Level, Muskeln, Gelenke, Sehne, Ermüdung, Technik, Alias, Evidenz …) und diese Abschnitte: Zweck, Vorbereitung, So geht’s (nummeriert), Raus, Sauber wenn, Technik (Liste), Atmung, Häufige Fehler (`- Fehler` und darunter `  → Korrektur`), Leichter und schwerer, Wann aufhören, Trainiert.
- **Leitern/** und **Familien/**: nur die Eigenschaften. Der Text darunter ist zum Lesen und wird beim nächsten Export neu geschrieben.
- **Daten/**: Geräte, Metcon-Pool, Aufwärmen, Mobility, Familien-Entscheidungen (Eigenschaften).

Alles andere (Einordnung, Evidenz, Recherche, Diskussion, Evidenz/, Bereiche/, Quellen/) liest der Build nicht. Das ist Recherche und Gespräch.

## Regeln, damit die App weiter funktioniert
- **id nie ändern.** Gespeicherte Einheiten hängen daran. Namen nur nach Absprache, Stufennamen von Leitern nie.
- Neue Stufen einer Leiter nur **hinten** anhängen.
- Eine neue Übung bekommt eine neue id und `app: false`, bis Anleitung, Werte und eine Familie da sind. Dann `app: true`.
- Die Eigenschaft `evidenz` darf jeder ändern; die App zeigt sie kurz im (i)-Blatt.

## Ablauf
1. Du änderst Notizen in Obsidian und schreibst Fragen in `> [!dennis]`.
2. Claude holt den Ordner, baut mit `node design/bibliothek/bauen.js`, prüft (`node tests/bibliothek.cjs` und die anderen Tests) und macht einen Pull Request.
3. Ändert sich etwas in der App auf anderem Weg (z. B. ein Paket), schreibt `node design/bibliothek/export.js` es zurück nach Obsidian, ohne Evidenz, Recherche und Diskussion anzufassen.
