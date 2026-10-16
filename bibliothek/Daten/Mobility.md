---
mobility:
  check:
    dauer_min: 5
    leitern:
      - g_mob_vorbeuge
      - g_mob_hocke
      - g_mob_schulter
      - g_mob_handgelenk
      - g_mob_sprunggelenk
    hinweis: "Mach den Check warm, am besten nach dem Aufwärmen oder als Ruhetag-Start. Reihenfolge: Vorbeuge, Schulter an der Wand, Handgelenk, Knee-to-Wall beidseitig, Hocke. Pro Leiter einen Versuch, jeweils die höchste saubere Stufe eintragen. Wert Beweglichkeit = Durchschnitt aus erreichter Stufe geteilt durch höchste Stufe, mal 100."
  routinen:
    - id: r_cooldown_tag1
      name: Cool-down Zug
      wann: cooldown
      tage: [1]
      dauer_min: 6
      ziel: Löst Lat, Bizeps und Unterarme nach dem Zugtag.
      bloecke: [{uebung: g_dead_hang, menge: "30", einheit: sek, je_seite: false, hinweis: "Locker hängen, Schultern nach oben gehen lassen"}, {uebung: g_prayer_stretch, menge: "60", einheit: sek, je_seite: false, hinweis: "Hüfte nach hinten, Brust sinkt"}, {uebung: g_wall_biceps_stretch, menge: "30", einheit: sek, je_seite: true, hinweis: "Arm gestreckt, langsam wegdrehen"}, {uebung: g_thread_needle, menge: "30", einheit: sek, je_seite: true, hinweis: "Langsam, mit der Ausatmung tiefer"}, {uebung: g_wrist_extension_stretch, menge: "30", einheit: sek, je_seite: false, hinweis: "Sanft, Handballen bleiben unten"}, {uebung: g_childs_pose, menge: "60", einheit: sek, je_seite: false, hinweis: Arme lang nach vorn}, {uebung: g_stack, menge: "10", einheit: atemzuege, je_seite: false, hinweis: "Lange Ausatmung, Puls runter"}]
    - id: r_cooldown_tag2
      name: Cool-down Lauf locker
      wann: cooldown
      tage: [2]
      dauer_min: 6
      ziel: Entspannt Waden, Hüftbeuger und Beinrückseite nach dem lockeren Lauf.
      bloecke: [{uebung: g_calf_wall_stretch, menge: "30", einheit: sek, je_seite: true, hinweis: Ferse bleibt unten}, {uebung: g_hip_flexor_stretch, menge: "30", einheit: sek, je_seite: true, hinweis: "Po anspannen, kein Hohlkreuz"}, {uebung: g_supine_hamstring, menge: "30", einheit: sek, je_seite: true, hinweis: "Knie gestreckt, Handtuch nutzen"}, {uebung: g_pigeon, menge: "45", einheit: sek, je_seite: true, hinweis: Oberkörper sinkt mit jeder Ausatmung}, {uebung: g_kneeling_shin, menge: "30", einheit: sek, je_seite: false, hinweis: "Kissen unter den Po, wenn nötig"}, {uebung: g_supine_twist, menge: "30", einheit: sek, je_seite: true, hinweis: Schultern bleiben am Boden}]
    - id: r_cooldown_tag3
      name: Cool-down Druck
      wann: cooldown
      tage: [3]
      dauer_min: 6
      ziel: Öffnet Brust und Schultern und entlastet die Handgelenke nach dem Drucktag.
      bloecke: [{uebung: g_doorway_pec, menge: "30", einheit: sek, je_seite: true, hinweis: "Brustbein hoch, Schulter hinten"}, {uebung: g_triceps_stretch, menge: "30", einheit: sek, je_seite: true, hinweis: Rippen unten lassen}, {uebung: g_puppy_pose, menge: "45", einheit: sek, je_seite: false, hinweis: Hüfte über den Knien}, {uebung: g_open_book, menge: "30", einheit: sek, je_seite: true, hinweis: Knie bleiben aufeinander}, {uebung: g_wrist_flexion_stretch, menge: "30", einheit: sek, je_seite: false, hinweis: "Handrücken am Boden, sanft"}, {uebung: g_wrist_extension_stretch, menge: "30", einheit: sek, je_seite: false, hinweis: "Handflächen flach, sanft"}, {uebung: g_childs_pose, menge: "45", einheit: sek, je_seite: false, hinweis: Ganz locker lassen}, {uebung: g_stack, menge: "5", einheit: atemzuege, je_seite: false, hinweis: Lange Ausatmung}]
    - id: r_cooldown_tag4
      name: Cool-down Intervalle
      wann: cooldown
      tage: [4]
      dauer_min: 7
      ziel: Bringt den Puls runter und löst Beine und Hüfte nach den Intervallen.
      bloecke: [{uebung: g_calf_wall_stretch, menge: "30", einheit: sek, je_seite: true, hinweis: "Erst gehen, bis der Atem ruhiger ist"}, {uebung: g_couch_stretch, menge: "45", einheit: sek, je_seite: true, hinweis: Po anspannen}, {uebung: g_supine_hamstring, menge: "30", einheit: sek, je_seite: true, hinweis: Anderes Bein bleibt am Boden}, {uebung: g_frog, menge: "60", einheit: sek, je_seite: false, hinweis: Langsam nach hinten schieben}, {uebung: g_pigeon, menge: "45", einheit: sek, je_seite: true, hinweis: Hüfte gerade halten}, {uebung: g_legs_up_wall, menge: "10", einheit: atemzuege, je_seite: false, hinweis: Ausatmung doppelt so lang wie Einatmung}]
    - id: r_cooldown_tag6
      name: Cool-down Ganzkörper
      wann: cooldown
      tage: [6]
      dauer_min: 8
      ziel: Kurzer Ganzkörper-Durchgang nach dem gemischten Krafttag.
      bloecke: [{uebung: g_wgs, menge: "30", einheit: sek, je_seite: true, hinweis: Langsam und fließend}, {uebung: g_doorway_pec, menge: "30", einheit: sek, je_seite: true, hinweis: Schulter bleibt unten}, {uebung: g_prayer_stretch, menge: "60", einheit: sek, je_seite: false, hinweis: Ellbogen eng}, {uebung: g_couch_stretch, menge: "45", einheit: sek, je_seite: true, hinweis: Becken aufrichten}, {uebung: g_pigeon, menge: "45", einheit: sek, je_seite: true, hinweis: Oberkörper ablegen}, {uebung: g_supine_hamstring, menge: "30", einheit: sek, je_seite: true, hinweis: Knie gestreckt}, {uebung: g_supine_twist, menge: "30", einheit: sek, je_seite: true, hinweis: Ruhig ausatmen}]
    - id: r_ruhetag_a
      name: Ruhetag Flow A
      wann: ruhetag
      tage: [5]
      dauer_min: 12
      ziel: Bewegt jedes Gelenk einmal durch den vollen Umfang, Schwerpunkt dynamisch.
      bloecke: [{uebung: g_cat_cow, menge: "45", einheit: sek, je_seite: false, hinweis: Mit dem Atem bewegen}, {uebung: g_shoulder_cars, menge: "30", einheit: sek, je_seite: true, hinweis: "Größter Kreis, Rumpf still"}, {uebung: g_hip_cars, menge: "30", einheit: sek, je_seite: true, hinweis: "Langsam, Richtung nach der Hälfte wechseln"}, {uebung: g_ninety_ninety, menge: "60", einheit: sek, je_seite: false, hinweis: Oberkörper aufrecht}, {uebung: g_cossack, menge: "45", einheit: sek, je_seite: false, hinweis: Abwechselnd links und rechts}, {uebung: g_wgs, menge: "30", einheit: sek, je_seite: true, hinweis: "Ellbogen zum Boden, dann aufdrehen"}, {uebung: g_knee_to_wall, menge: "30", einheit: sek, je_seite: true, hinweis: Ferse bleibt unten}, {uebung: g_deep_squat, menge: "60", einheit: sek, je_seite: false, hinweis: "Locker sitzen, Gewicht verlagern"}, {uebung: g_half_split, menge: "30", einheit: sek, je_seite: true, hinweis: Rücken lang}, {uebung: g_open_book, menge: "30", einheit: sek, je_seite: true, hinweis: Blick folgt der Hand}, {uebung: g_wrist_rocks, menge: "30", einheit: sek, je_seite: false, hinweis: Ganze Hand am Boden}, {uebung: g_cobra, menge: "30", einheit: sek, je_seite: false, hinweis: Schultern weg von den Ohren}, {uebung: g_childs_pose, menge: "30", einheit: sek, je_seite: false, hinweis: Ausruhen}, {uebung: g_stack, menge: "10", einheit: atemzuege, je_seite: false, hinweis: Ruhig zum Abschluss}]
    - id: r_ruhetag_b
      name: Ruhetag Flow B
      wann: ruhetag
      tage: [7]
      dauer_min: 12
      ziel: Längere Haltepositionen für Hüfte, Beinrückseite und Schultern.
      bloecke: [{uebung: g_inchworm, menge: "40", einheit: sek, je_seite: false, hinweis: "Langsam, Knie möglichst gestreckt"}, {uebung: g_wall_slide, menge: "40", einheit: sek, je_seite: false, hinweis: Rücken bleibt an der Wand}, {uebung: g_thread_needle, menge: "20", einheit: sek, je_seite: true, hinweis: Unten kurz halten}, {uebung: g_puppy_pose, menge: "60", einheit: sek, je_seite: false, hinweis: Brust sinkt mit der Ausatmung}, {uebung: g_sleeper_stretch, menge: "30", einheit: sek, je_seite: true, hinweis: Sanfter Druck}, {uebung: g_lizard, menge: "45", einheit: sek, je_seite: true, hinweis: Knie über dem Fuß}, {uebung: g_frog, menge: "60", einheit: sek, je_seite: false, hinweis: "Unterarme ablegen, wenn es geht"}, {uebung: g_butterfly, menge: "45", einheit: sek, je_seite: false, hinweis: Rücken lang}, {uebung: g_pancake, menge: "60", einheit: sek, je_seite: false, hinweis: Aus der Hüfte nach vorn kippen}, {uebung: g_ragdoll, menge: "45", einheit: sek, je_seite: false, hinweis: Kopf hängt locker}, {uebung: g_kneeling_shin, menge: "30", einheit: sek, je_seite: false, hinweis: Fußrücken flach}, {uebung: g_glute_bridge_hold, menge: "30", einheit: sek, je_seite: false, hinweis: Po anspannen}, {uebung: g_supine_twist, menge: "30", einheit: sek, je_seite: true, hinweis: Schultern am Boden}, {uebung: g_legs_up_wall, menge: "10", einheit: atemzuege, je_seite: false, hinweis: Zum Abschluss ganz ruhig werden}]
    - id: r_morgen
      name: Guten Morgen
      wann: morgen
      tage: []
      dauer_min: 5
      ziel: Sanft wach werden und alle großen Gelenke einmal bewegen.
      bloecke: [{uebung: g_stack, menge: "5", einheit: atemzuege, je_seite: false, hinweis: "Auf der Matte, tief in den Bauch"}, {uebung: g_cat_cow, menge: "60", einheit: sek, je_seite: false, hinweis: "Langsam, mit dem Atem"}, {uebung: g_roll_down, menge: "40", einheit: sek, je_seite: false, hinweis: "Wirbel für Wirbel, Knie weich"}, {uebung: g_side_bend, menge: "20", einheit: sek, je_seite: true, hinweis: Lang machen}, {uebung: g_shoulder_cars, menge: "20", einheit: sek, je_seite: true, hinweis: Kleine Kreise reichen am Morgen}, {uebung: g_leg_swings, menge: "15", einheit: sek, je_seite: true, hinweis: Locker schwingen}, {uebung: g_ankle_cars, menge: "15", einheit: sek, je_seite: true, hinweis: Langsame Kreise}, {uebung: g_deep_squat, menge: "30", einheit: sek, je_seite: false, hinweis: Ruhig sitzen und atmen}]
---
# Mobility

Beweglichkeits-Check und Routinen (Cool-down, Ruhetag, Morgen). Die Daten stehen in den Eigenschaften oben.
