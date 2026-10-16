---
id: f_pullup
name: Pull-up
pos: 1
muster: zug_vertikal
bereich: zug
ebene: 2
kurz: Vertikaler Zug am Körpergewicht für Rücken und Bizeps, vom Hängen bis zum einarmigen Klimmzug.
leiter: g_pullup
voraussetzt:
  - {familie: f_row, ab_rang: 1}
fuehrt_zu:
  - f_back_lever
  - f_bar_muscle_up
  - f_front_lever
  - f_human_flag
  - f_ring_muscle_up
  - f_rope_climb
  - f_toes_to_bar
varianten:
  - {uebung: g_dead_hang, art: stufe, rang: 1, effekt: 55, ziel: 3 × 30 s sauber gehangen., grund: "Einstieg: baut Griffkraft und Schulterstabilität im Hang auf."}
  - {uebung: g_scap_pull, art: stufe, rang: 2, effekt: 60, ziel: Alle Runden mit 6 Wdh. bei RIR 2., grund: "Lehrt die Schulterblattbewegung, mit der jeder saubere Klimmzug beginnt."}
  - {uebung: g_jackknife_pullup, art: stufe, rang: 3, effekt: 62, ziel: "3 Sätze mit 8 sauberen Wiederholungen, die Beine nur zur Unterstützung.", grund: "Erste Stufe mit voller Zugbewegung, die Beine nehmen einen Teil des Gewichts ab."}
  - {uebung: g_flexed_arm_hang, art: stufe, rang: 4, effekt: 64, ziel: 30 Sekunden mit dem Kinn über der Stange halten., grund: "Volles Körpergewicht in der Endposition, bevor das Absenken im Negativ-Klimmzug kommt."}
  - {uebung: g_pullup_negative, art: stufe, rang: 5, effekt: 70, ziel: Alle Runden mit 6 Wdh. bei RIR 2., grund: Exzentrisches Absenken baut die Kraft für den ersten freien Klimmzug auf.}
  - {uebung: g_pullup, art: stufe, rang: 6, effekt: 95, ziel: "Leiterstufe „Weste“ geschafft: alle Runden mit 6 Wdh. bei RIR 2.", grund: Grundübung der Familie; die Pull-up-Leiter steigert von Band bis Weste., auch_in: [f_rope_climb]}
  - {uebung: g_weighted_pullup, art: stufe, rang: 7, effekt: 92, ziel: Alle Runden mit 6 Wdh. bei RIR 2., grund: "Gleiche Bewegung mit Zusatzlast, klassische Steigerung für Maximalkraft."}
  - {uebung: g_archer_pullup, art: stufe, rang: 8, effekt: 78, ziel: Alle Runden mit 6 Wdh. bei RIR 2., grund: "Verlagert die Last auf einen Arm, erste Stufe der One-Arm-Leiter."}
  - {uebung: g_typewriter_pullup, art: stufe, rang: 9, effekt: 80, ziel: "3 Sätze mit 4 sauberen Wiederholungen, das Kinn bleibt immer über der Stange.", grund: "Mehr einseitige Last als der Archer, aber noch beide Hände an der Stange."}
  - {uebung: g_one_arm_pullup_assisted, art: stufe, rang: 10, effekt: 72, ziel: Alle Runden mit 6 Wdh. bei RIR 2., grund: "Einarmig mit Bandhilfe, letzte Stufe vor dem freien One-Arm Pull-up."}
  - {uebung: g_one_arm_pullup, art: stufe, rang: 11, effekt: 82, ziel: "Erhalten: einmal pro Woche 3 × 1 je Arm sauber.", grund: "Höchste Stufe: der ganze Körper wird mit einem Arm gezogen."}
  - {uebung: g_chest_to_bar, art: variante, rang: null, effekt: 78, grund: Größere Range of Motion bis zur Brust als eigener Reiz und Grundlage für den Bar Muscle-up., auch_in: [f_bar_muscle_up]}
  - {uebung: g_explosive_pullup, art: variante, rang: null, effekt: 80, grund: Schnellkraftvariante für mehr Zughöhe und Grundlage für den Bar Muscle-up., auch_in: [f_bar_muscle_up]}
  - {uebung: g_band_lat_pulldown, art: variante, rang: null, effekt: 55, grund: "Ersatz ohne Stange oder Ringe, gleiche Zugrichtung mit geringerem Reiz."}
  - {uebung: g_lsit_pullup, art: variante, rang: null, effekt: 82, grund: Gleicher Zug mit zusätzlicher Arbeit für Bauch und Hüftbeuger.}
  - {uebung: g_towel_pullup, art: variante, rang: null, effekt: 76, grund: Gleicher Zug mit deutlich höherer Griffanforderung.}
  - {uebung: g_one_arm_hang, art: variante, rang: null, effekt: 60, grund: Bereitet Griff und Schulter einseitig auf den einarmigen Klimmzug vor.}
  - {uebung: g_lat_pulldown, art: variante, rang: null, effekt: 80, grund: "Gleicher Zug mit frei wählbarer Last in kg, unabhängig vom Körpergewicht."}
  - {uebung: g_single_arm_pulldown, art: variante, rang: null, effekt: 70, grund: Einseitiger Zug zum Vergleichen und Ausgleichen beider Seiten.}
  - {uebung: g_straight_arm_pulldown, art: variante, rang: null, effekt: 62, grund: Trainiert den Latissimus ohne Ellbogenbeugung und eignet sich so als Ausweichübung bei Ellbogenschmerzen.}
  - {uebung: g_kipping_pullup, art: tempo, rang: null, effekt: 68, grund: "Schwung erlaubt mehr Wiederholungen, aber weniger Muskelarbeit pro Wiederholung.", vermerk: "Auf Tempo ausgelegt (wie im CrossFit), nicht auf saubere Range of Motion oder Effizienz."}
  - {uebung: g_butterfly_pullup, art: tempo, rang: null, effekt: 62, grund: "Schnellste Klimmzugtechnik im CrossFit, die Zugmuskulatur arbeitet nur teilweise.", vermerk: "Auf Tempo ausgelegt (wie im CrossFit), nicht auf saubere Range of Motion oder Effizienz."}
  - {uebung: g_kip_swing, art: tempo, rang: null, effekt: 55, grund: Technikdrill für den Kipping-Schwung mit kaum Zugkraftreiz., vermerk: "Auf Tempo ausgelegt (wie im CrossFit), nicht auf saubere Range of Motion oder Effizienz.", auch_in: [f_toes_to_bar]}
  - {uebung: g_kipping_c2b, art: tempo, rang: null, effekt: 70, grund: Metcon-Version der strikt bewerteten Chest-to-Bar., vermerk: "Für Tempo und Wiederholungen im Metcon, ersetzt nie den strikten Chest-to-Bar."}
  - {uebung: g_jumping_pullup, art: tempo, rang: null, effekt: 50, grund: "Offizielle CrossFit-Skalierung, wenn Klimmzüge im Metcon noch nicht sauber gehen.", vermerk: "Nur als Metcon-Skalierung, ersetzt nie eine Kraftstufe wie den Negativ-Klimmzug."}
---
# Pull-up (Familie)

Vertikaler Zug am Körpergewicht für Rücken und Bizeps, vom Hängen bis zum einarmigen Klimmzug.

## Varianten
- Stufe 1: [[Dead Hang]]
- Stufe 2: [[Scapular Pull-up]]
- Stufe 3: [[Jackknife Pull-up]]
- Stufe 4: [[Flexed-Arm Hang]]
- Stufe 5: [[Negative Pull-up]]
- Stufe 6: [[Ring Pull-up]]
- Stufe 7: [[Weighted Pull-up]]
- Stufe 8: [[Archer Pull-up]]
- Stufe 9: [[Typewriter Pull-up]]
- Stufe 10: [[Assisted One-Arm Pull-up]]
- Stufe 11: [[One-Arm Pull-up]]
- Variante: [[Chest-to-Bar Pull-up]]
- Variante: [[Explosive Pull-up]]
- Variante: [[Band Lat Pulldown]]
- Variante: [[L-Sit Pull-up]]
- Variante: [[Towel Pull-up]]
- Variante: [[One-Arm Dead Hang]]
- Variante: [[Lat Pulldown]]
- Variante: [[Single-Arm Lat Pulldown]]
- Variante: [[Straight-Arm Pulldown]]
- Auf Tempo: [[Kipping Pull-up]]
- Auf Tempo: [[Butterfly Pull-up]]
- Auf Tempo: [[Kip Swing]]
- Auf Tempo: [[Kipping Chest-to-Bar]]
- Auf Tempo: [[Jumping Pull-up]]

## Baut auf
- [[Row (Familie)]] ab Rang 1

## Führt zu
- [[Back Lever (Familie)]]
- [[Bar Muscle-up (Familie)]]
- [[Front Lever (Familie)]]
- [[Human Flag (Familie)]]
- [[Ring Muscle-up (Familie)]]
- [[Rope Climb (Familie)]]
- [[Toes to Bar (Familie)]]

(Die Daten stehen oben in den Eigenschaften.)

## Diskussion
> [!dennis]
>
