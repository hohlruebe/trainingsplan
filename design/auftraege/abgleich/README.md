# Abgleich mit der freien Übungsdatenbank

Quelle der Kandidaten: free-exercise-db (876 Einträge, Lizenz „Unlicense“, gemeinfrei, keine Namensnennung nötig).
Nur die Namen und Eckdaten dienen als Kandidatenliste; Anleitungen schreiben wir selbst im Format `teil: 'texte'`.

`vorschlag.json`: je Kandidat `i` (Nummer in der Datenbank), `n` (Name dort), `s` (neu | var | dop | raus | spaeter),
`t` (Ziel: neuer Name bzw. bestehende Übung), `m` (Muster), `g` (Grund), `e`/`mu`/`lv` (Gerät, Hauptmuskeln, Level).

Regeln für Dopplungen:
- Gleiche Bewegung, gleiche Technik = eine Übung. Andere Widerstandsquelle (Band, Kabel, Maschine) bei Isolationsübungen
  = Gerät-Alternative derselben Übung. Langhantel und Kurzhantel bleiben getrennt, wenn sich die Technik unterscheidet.
- Griff- und Standvarianten (breit, eng, Untergriff, Multipresse) werden Variante oder Suchname (`alias`), keine eigene Übung.
- Raus: Strongman-Geräte, Ketten/Bänder an der Stange, Sprint- und Sprung-Drills ohne Anleitungswert, Drücken oder Ziehen
  hinter dem Kopf, seltene oder unklare Übungen. Faszienrolle später als eigenes Thema.

Stand 15. Oktober 2026: 52 neu, 410 Variante, 196 doppelt, 204 raus, 14 später. Dennis entscheidet im Artifact
„Übungs-Abgleich“ (https://claude.ai/artifact/BxMeSD2bhs7ySg1D9c1RyQ), danach Pakete `neu` und `texte` schreiben.
