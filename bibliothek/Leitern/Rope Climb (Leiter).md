---
id: g_rope_climb
name: Rope Climb
pos: 21
muster: zug_vertikal
bereich: zug
ziel: 1–3 Aufstiege
nutzen: 70
voraussetzung:
  - {leiter: g_pullup, stufe: Frei}
test:
  finden: Einen Aufstieg mit Beintechnik versuchen.
  sauber: Sicherer Fußklemmgriff, kontrolliert hinunter.
  formel: Start = 3 × 1 Aufstieg.
stufen:
  - {name: Pull-up frei, uebung: g_pullup, equipment: [ [eq_ringe, eq_klimmzugstange] ], aufstieg: 5 freie Pull-ups → Rope Climb.}
  - {name: Rope Climb, uebung: g_rope_climb, equipment: [ [eq_kletterseil] ], aufstieg: 3 Aufstiege am Stück → Legless.}
  - {name: Legless, uebung: g_legless_rope_climb, equipment: [ [eq_kletterseil] ], aufstieg: Mehr Aufstiege.}
---
# Rope Climb (Leiter)

Ziel: 1–3 Aufstiege

## Stufen
1. Pull-up frei · [[Ring Pull-up]]
2. Rope Climb · [[Rope Climb]]
3. Legless · [[Legless Rope Climb]]

(Die Daten stehen oben in den Eigenschaften. Neue Stufen nur hinten anhängen, Namen nie ändern.)

## Diskussion
> [!dennis]
>
