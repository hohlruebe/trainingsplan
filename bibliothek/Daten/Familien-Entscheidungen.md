---
entscheidungen:
  - {frage: "Wie werden Übungen behandelt, die zu mehreren Familien passen oder in mehreren Leitern stehen?", entscheidung: Jede Übung hat genau eine Heimatfamilie nach ihrer Bewegung und darf als Verweis in weiteren Familien erscheinen. Basisübungen als Grundlage für mehrere Skills sind erwünscht., folge: "Optionales Feld auch_in an der Variante mit Familien-IDs. Dort zeigt die App die Übung zusätzlich, ohne Rang. Jede Übung steht nur einmal in der Datei. Leitern bleiben unverändert."}
  - {frage: Ist der Chin-up eine Variante der Familie Pull-up oder eine eigene Familie?, entscheidung: "Eigene Familie, weil er deutlich mehr auf den Bizeps abzielt.", folge: Familie f_chinup mit Leiter g_chinup; der False Grip Chin-up verweist darauf.}
  - {frage: Ist der Muscle-up eine Familie oder zwei?, entscheidung: "Zwei Familien: Ring Muscle-up und Bar Muscle-up.", folge: f_ring_muscle_up und f_bar_muscle_up mit eigener Leiter.}
  - {frage: Gehören Chest-to-Bar und Explosive Pull-up zu Pull-up oder zu Bar Muscle-up?, entscheidung: Zu beiden., folge: "Heimat Pull-up als variante, Verweis auf f_bar_muscle_up. Der Straight Bar Dip aus Dip verweist ebenfalls dorthin."}
  - {frage: "Sind Leiterschritte, die eine andere Bewegung sind (Push Press, Push Jerk, Split Jerk, SDHP, Devil Press, Sled Push), stufe oder variante?", entscheidung: variante., folge: "Kein Rang, die App ersetzt damit keine Stufe automatisch. Die Leitern bleiben unverändert."}
  - {frage: Bekommen Freihantelübungen eigene Familien?, entscheidung: Ja., folge: f_bent_over_row und f_bench_press ohne Leiter.}
  - {frage: "Kommen Row, Bike Erg und Ski Erg in eine Familie?", entscheidung: Ja., folge: f_erg mit drei Varianten ohne Rang; die App wählt nach Gerät am Ort.}
  - {frage: Bekommen Thruster und Wall Ball eine eigene Familie?, entscheidung: Ja., folge: "f_thruster: Wall Ball Rang 1, Thruster Rang 2."}
  - {frage: Ist der Pike Push-up eine Stufe von Handstand Push-up?, entscheidung: "Ja, Stufe 1.", folge: g_pike ist Rang 1 in f_hspu.}
  - {frage: Wo ist die Heimat des Shrimp Squat?, entscheidung: Pistol Squat., folge: Variante in f_pistol mit Verweis auf f_split_squat.}
  - {frage: Wo ist die Heimat des Burpee Pull-up?, entscheidung: Burpee., folge: Rang 3 in f_burpee mit Verweis auf f_pullup.}
  - {frage: Kommen Band Face Pull und Band Pull-Apart in eine Familie?, entscheidung: Ja., folge: f_face_pull mit beiden als variante.}
  - {frage: "Wohin kommen Front Lever, Back Lever, Planche, Human Flag und die Muscle-ups?", entscheidung: "In ihren Bereich, nicht in skill.", folge: "Sie bilden die Spitzen der Bäume zug, druck und rumpf. Bereich skill enthält nur f_handstand."}
  - {frage: "Welcher Bereich gilt für Clean, Snatch und Dumbbell Snatch?", entscheidung: Ein neuer Bereich für olympisches Gewichtheben., folge: "Neuer Wert bereich \"gewichtheben\" für f_clean, f_snatch und f_db_snatch. Die App muss diesen Bereich zusätzlich kennen."}
  - {frage: Welcher Bereich gilt für Farmer's Carry und Sandbag Carry?, entscheidung: rumpf., folge: Beide Familien haben bereich "rumpf".}
  - {frage: Welcher Bereich gilt für die Sprünge?, entscheidung: "Jump und Box Jump in beine, Jump Rope in ausdauer.", folge: "f_jump und f_box_jump haben bereich \"beine\", f_jump_rope hat \"ausdauer\"."}
  - {frage: Ab welchem Rang gelten Pull-up und Dip als „frei“ (Bodyweight)?, entscheidung: "Ab Rang 5, also Leiter inklusive Weste geschafft.", folge: Voraussetzungen auf Bodyweight-Niveau nutzen ab_rang 5 bei f_pullup und f_dip.}
  - {frage: Setzt Pull-up den Row voraus?, entscheidung: Ja., folge: f_pullup und f_chinup setzen f_row ab Rang 1 voraus und liegen auf Ebene 2.}
  - {frage: Setzt Handstand den Push-up voraus?, entscheidung: Ja., folge: f_handstand setzt f_pushup ab Rang 4 voraus; f_hspu folgt auf Ebene 3.}
  - {frage: Welche unsicheren Verbindungen kommen in den Skill-Baum?, entscheidung: "Alle vier: Back Lever nach Ring Dip, Human Flag nach Pull-up und Dip, Planche nach Ring Dip, Toes to Bar nach Dead Hang.", folge: "f_back_lever und f_planche setzen f_dip ab Rang 4 voraus, f_human_flag f_pullup ab Rang 5 und f_dip ab Rang 4, f_toes_to_bar f_pullup ab Rang 1."}
---
# Familien-Entscheidungen

Festgehaltene Entscheidungen zu den Familien. Die Daten stehen in den Eigenschaften oben.
