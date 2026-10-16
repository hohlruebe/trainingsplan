---
id: g_handstand
name: Handstand
pos: 16
muster: handstand_skill
bereich: skill
ziel: 20–30 s halten
nutzen: 85
voraussetzung:
  - {leiter: g_push, stufe: Boden}
test:
  finden: "Unsicher kopfüber: mit dem Rücken zur Wand starten. Ab 3–5 Push-ups: Face-to-Wall mit Abstand in Fußlängen testen. Über 40 s bei 1 Fußlänge → Fuß-Taps."
  sauber: Gerader Körper, Schultern bei den Ohren, kein Hohlkreuz.
  formel: Start = Stufe mit 20–30 s, SIR 2.
stufen:
  - {name: Rücken zur Wand, uebung: g_wall_handstand_back, equipment: [], aufstieg: 3 × 30 s ruhig → Bauch zur Wand (Face-to-Wall).}
  - {name: Face-to-Wall, uebung: g_handstand, equipment: [], aufstieg: 3 × 30 s → näher an die Wand.}
  - {name: "1 Fußlänge, 30 s", uebung: g_handstand, equipment: [], aufstieg: 3 × 30 s → Fuß-Taps.}
  - {name: Fuß-Taps, uebung: g_handstand, equipment: [], aufstieg: 2–5 s frei → frei.}
  - {name: Frei, uebung: g_free_handstand, equipment: [], aufstieg: Weiter mit der Leiter Handstand Walk.}
---
# Handstand (Leiter)

Ziel: 20–30 s halten

## Stufen
1. Rücken zur Wand · [[Back-to-Wall Handstand]]
2. Face-to-Wall · [[Handstand]]
3. 1 Fußlänge, 30 s · [[Handstand]]
4. Fuß-Taps · [[Handstand]]
5. Frei · [[Freestanding Handstand]]

(Die Daten stehen oben in den Eigenschaften. Neue Stufen nur hinten anhängen, Namen nie ändern.)

## Diskussion
> [!dennis]
>
