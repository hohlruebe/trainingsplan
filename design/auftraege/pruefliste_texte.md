# Prüfliste Übungs-Anleitungen

Stand: 15. Oktober 2026, Branch `uebungen-anleitungen`. Erzeugt aus den `pruefung`-Feldern der Pakete in `design/auftraege/texte/`
(die Prüfnotizen stehen nur dort, nicht in der App).

## Zahlen

- Übungen geprüft und neu geschrieben: 381 (alle in `lib-data`)
- Fehlende Erklärung: 154
- Missverständlich: 41
- Fachlicher Fehler: 3
- Legitime Variante (bewusst so gelassen): 0
- Inhaltlich in Ordnung, nur ins neue Schema gebracht: 191
- Eine Übung kann mehrere Arten haben.

## Grundsatzentscheidungen

- **handstand_skill**: Für den Handstand-Skill-Block bleiben die Ein- und Ausstiege je Stufe in SKILL_IN (index.html) maßgeblich. Die Bibliothekstexte beschreiben dieselben Wege und widersprechen ihnen nicht.
- **huefte**: „Rücken gerade“ wird überall in Handlung übersetzt: Brust heraus, Abstand Brustbein–Bauchnabel bleibt gleich. „Neutral“ allein steht nicht mehr da.
- **kniebeuge**: Knie dürfen bei der Kniebeuge über die Zehen hinausgehen. Die Hinweise sagen deshalb überall: Knie zeigen in Richtung der Fußspitzen, nicht: Knie hinter den Zehen halten.
- **mobilitaet**: Mobility-Übungen sind meist Halte- oder Lockerungsübungen. Für sie bleibt der Text bewusst kürzer; die Routinen (Cool-down, Ruhetag, Morgen) ergänzen eigene kurze Hinweise je Block.
- **olympisch**: Die olympischen Lifts sind schwer allein aus Text zu lernen. Jede Anleitung nennt deshalb den sicheren Fehlversuch (Stange nach vorn fallen lassen) und empfiehlt den Einstieg mit Stab oder leerer Stange.
- **rumpf_anti_streckung**: „Stack“ wird in jeder Übung in eigenen Worten erklärt: Rippen nach unten Richtung Becken ziehen, so dass Brustkorb und Becken übereinander stehen.
- **sprung**: Sprünge im Plan immer ohne Weste: so steht es seit jeher im Glossar und bleibt als Regel des Plans (keine allgemeine Behauptung, dass Sprünge mit Weste schädlich sind).

## Entschieden mit Dennis

- Quellen gelöscht (15. Oktober 2026): `quelle` aus lib-data, mobility und fam-data entfernt, der Prüfer verlangt das Feld nicht mehr.

## Offene Fragen an Dennis

- Die neue Ansicht (sichtbarer Teil plus „Fehler, Varianten und Technik“ zum Aufklappen) ist ohne Canvas-Entwurf gebaut. Bitte am Handy ansehen.
- Mobility-Übungen haben oft keinen eigenen Ausstieg oder keine Grenzen-Zeile. Das ist Absicht; die Zeile fehlt dann in der App.

## ausdauer

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Run (`g_run`) | fehlende Erklärung | Armhaltung und Leiterstufen fehlten. | Ergänzt. | geklärt |
| Shuttle Run (`g_shuttle_run`) | ok | Abbremsen ungenau. | Ergänzt. | geklärt |
| Bike Erg (`g_bike_erg`) | missverständlich | „Sattel auf Hüfthöhe“ ungenau. | Über den Kniewinkel unten beschrieben. | geklärt |
| Row (`g_row_erg`) | fehlende Erklärung | Fußgurt und Startposition fehlten. | Ergänzt. | geklärt |
| Ski Erg (`g_ski_erg`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Step-back Burpee (`g_burpee_stepback`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Burpee (`g_burpee`) | fehlende Erklärung | Weg nach unten fehlte. | Ergänzt. | geklärt |
| Burpee Pull-up (`g_burpee_pullup`) | ok | Stangenhöhe fehlte. | Ergänzt. | geklärt |
| Burpee Box Jump Over (`g_burpee_box_jump_over`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Mountain Climber (`g_mountain_climber`) | ok | Zählweise fehlte. | Ergänzt. | geklärt |
| Ball Slam (`g_ball_slam`) | ok | Balltyp fehlte. | Ergänzt. | geklärt |
| Stair Climb (`g_stair_climb`) | ok | Text war verständlich. | Sicherheit beim Abstieg ergänzt. | geklärt |
| Air Bike (`g_air_bike`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Burpee Broad Jump (`g_burpee_broad_jump`) | missverständlich | „belastet Knie und Sprunggelenk“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Incline Walk (`g_incline_walk`) | missverständlich | „bis zur Hälfte der Arbeit“ als unbelegte Zahl. | Zahl gestrichen. | geklärt |
| Freestyle Swim (`g_freestyle_swim`) | fehlende Erklärung | Pull-Buoy unerklärt. | Erklärt. | geklärt |
| Elliptical Trainer (`g_elliptical`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Battle Rope Waves (`g_battle_rope_waves`) | missverständlich | „verlagert die Arbeit in den unteren Rücken“ als Behauptung. | Als Korrektur formuliert. | geklärt |

## beinbeuger

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Nordic Curl (`g_nordic`) | fehlende Erklärung | Ankersicherheit und Leiterstufen nur im Glossar. | Ein gemeinsamer Text mit Anker, Stufen und Muskelkater-Hinweis. | geklärt |
| Slider Leg Curl (`g_slider_curl`) | ok | Unterlage für Teppich fehlte. | Ergänzt. | geklärt |
| Single-Leg Slider Curl (`g_single_slider_curl`) | fehlende Erklärung | „Wie der Slider Leg Curl“. | Eigenständiger Ablauf. | geklärt |
| Ring Leg Curl (`g_ring_leg_curl`) | ok | Ein- und Ausstieg fehlten. | Ergänzt. | geklärt |
| Glute-Ham Raise (`g_glute_ham_raise`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Leg Curl Machine (`g_leg_curl_machine`) | ok | Drehachse fehlte. | Ergänzt. | geklärt |
| Band Leg Curl (`g_band_leg_curl`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |

## druck_horizontal

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Push-up (`g_push`) | fehlende Erklärung, missverständlich | Fester 45-Grad-Winkel als universelle Regel; Glossar und Bibliothek mit verschiedenen Angaben (schulterbreit vs. etwas breiter). | Winkel als Richtung beschrieben, eine gemeinsame Angabe zur Handbreite, Spannung und Zählregel ergänzt. | geklärt |
| Knee Push-up (`g_push_knee`) | fehlende Erklärung | Polster und Linie unklar. | Ergänzt. | geklärt |
| Incline Push-up (`g_push_incline`) | fehlende Erklärung | Stabilität der Ablage fehlte. | Ergänzt. | geklärt |
| Negative Push-up (`g_push_negative`) | ok | Text war verständlich. | In du-Form, Tempo-Hilfe. | geklärt |
| Parallette Push-up (`g_push_parallettes`) | fehlende Erklärung | „Schulterblätter kontrolliert führen“ unklar. | Durch konkrete Anweisung ersetzt. | geklärt |
| Decline Push-up (`g_push_decline`) | fehlende Erklärung | Ein- und Ausstieg fehlten. | Ergänzt. | geklärt |
| Banded Push-up (`g_push_band`) | fehlende Erklärung | Verweis „Push-up ausführen“. | Eigenständiger Ablauf. | geklärt |
| Weighted Push-up (`g_push_weighted`) | fehlende Erklärung | Verweis „Push-up wie gewohnt“. | Eigenständiger Ablauf. | geklärt |
| Diamond Push-up (`g_diamond_push`) | fehlende Erklärung | Lage der Hände ungenau. | Ergänzt, mit Ausweichvariante. | geklärt |
| Hand-Release Push-up (`g_hand_release_push`) | ok | Startete mit „Push-up bis ganz auf den Boden“. | Eigenständig beschrieben. | geklärt |
| Ring Push-up (`g_ring_push`) | fehlende Erklärung | „nach außen drehen“ ohne Erklärung. | Ergänzt. | geklärt |
| Archer Push-up (`g_archer_push`) | fehlende Erklärung | Handposition des Streckarms fehlte. | Ergänzt. | geklärt |
| Pseudo Planche Push-up (`g_pseudo_planche_push`) | fehlende Erklärung | „Lehne halten“ unklar, kein Aufwärmhinweis für die Handgelenke. | Ergänzt. | geklärt |
| Incline One-Arm Push-up (`g_one_arm_push_incline`) | ok | Handposition ungenau. | Ergänzt. | geklärt |
| One-Arm Push-up (`g_one_arm_push`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Plyo Push-up (`g_plyo_push`) | ok | Satzlänge fehlte. | Ergänzt. | geklärt |
| Dumbbell Floor Press (`g_floor_press`) | fehlende Erklärung | Wie man mit Hanteln in die Rückenlage kommt und wieder heraus, fehlte. | Einrollen und seitliches Ablegen ergänzt. | geklärt |
| Bench Press (`g_bench_press`) | fehlende Erklärung | „Immer mit Sicherung“ ohne Erklärung, Griff, Ausheben und Ablegen fehlten. | Rackhöhe, Sicherung, Griff, Ablauf und Notausstieg ergänzt. | geklärt |
| Planche Lean (`g_planche_lean`) | fehlende Erklärung | „Rücken leicht rund“ ohne Erklärung. | In Handlung übersetzt. | geklärt |
| Tuck Planche (`g_tuck_planche`) | fehlende Erklärung | Einstieg aus der Hocke fehlte. | Ergänzt. | geklärt |
| Advanced Tuck Planche (`g_adv_tuck_planche`) | fehlende Erklärung | Startete aus einer anderen Übung. | Eigenständiger Einstieg. | geklärt |
| Straddle Planche (`g_straddle_planche`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Full Planche (`g_planche`) | fehlende Erklärung | Verweis auf Straddle Planche ohne Beschreibung. | Position in Schritt 1 beschrieben. | geklärt |
| Wall Push-up (`g_wall_push`) | ok | Text war verständlich. | Fehlerkorrektur ergänzt. | geklärt |
| Typewriter Push-up (`g_typewriter_push`) | ok | Text war verständlich. | Fehlerkorrektur ergänzt. | geklärt |
| Ring Fly (`g_ring_fly`) | missverständlich | „überlastet Schulter und Bizepssehne“ als feste Aussage. | Als Abbruchsignal formuliert. | geklärt |
| Medicine Ball Chest Pass (`g_med_ball_chest_pass`) | ok | Text war verständlich. | Schritte getrennt, Korrektur ergänzt. | geklärt |
| Tuck Planche Push-up (`g_tuck_planche_push`) | ok | Text war verständlich. | Position der Tuck Planche im Schritt erklärt. | geklärt |
| Dumbbell Bench Press (`g_db_bench_press`) | fehlende Erklärung | Wie man mit schweren Hanteln auf die Bank kommt und wieder hoch, fehlte. | Einstieg über die Oberschenkel und Ausstieg ergänzt. | geklärt |
| Incline Dumbbell Press (`g_incline_db_press`) | ok | Einstieg fehlte. | Ergänzt. | geklärt |
| Close-Grip Bench Press (`g_close_grip_bench`) | fehlende Erklärung | Sicherung und Ablegen fehlten. | Ergänzt. | geklärt |
| Single-Arm Dumbbell Bench Press (`g_single_arm_db_bench`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Cable Fly (`g_cable_fly`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |

## druck_vertikal

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Ring Dip (`g_dip`) | fehlende Erklärung | Ringhöhe, Band und Ausstieg fehlten; Glossar mit eigenem Text und Voraussetzung, die nicht zur Leiter passt. | Vorbereitung mit Band, Ablauf, Abbruchsignal, sicherer Ausstieg; ein Text für Glossar und Bibliothek. | geklärt |
| Ring Support Hold (`g_support_hold`) | fehlende Erklärung | Abkürzung RTO in der Skalierung nicht erklärt. | Verweis auf eigene Übung mit Erklärung. | geklärt |
| RTO Support Hold (`g_rto_support`) | fehlende Erklärung | RTO nicht aufgelöst, Drehrichtung unklar. | Abkürzung erklärt, Daumen- und Ellbogenrichtung ergänzt. | geklärt |
| Bench Dip (`g_bench_dip`) | missverständlich | „Schultern schonen“ ohne konkrete Anweisung. | Richtwert für die Tiefe und klares Abbruchsignal. | geklärt |
| Parallel Bar Dip (`g_bar_dip`) | fehlende Erklärung | Griff, Band und Ausstieg fehlten. | Ergänzt. | geklärt |
| Weighted Dip (`g_weighted_dip`) | fehlende Erklärung, missverständlich | „Dip wie gewohnt“; Voraussetzung „10–12 Dips“ passte nicht zur Leiter (Stufe Weste). | Eigenständiger Ablauf; Voraussetzung steht über die Leiter in der App. | geklärt |
| Straight Bar Dip (`g_straight_bar_dip`) | fehlende Erklärung | Ein- und Ausstieg fehlten. | Ergänzt. | geklärt |
| Pike Push-up (`g_pike`) | fehlende Erklärung | Glossar und Bibliothek mit verschiedenen Texten. | Gemeinsamer Text mit Einstieg aus dem Liegestütz. | geklärt |
| Wall Walk (`g_wall_walk`) | fehlende Erklärung | Endposition und Zählregel fehlten. | Ergänzt. | geklärt |
| Negative Handstand Push-up (`g_hspu_negative`) | fehlende Erklärung | Einstieg und Ausstieg fehlten. | Ergänzt. | geklärt |
| Strict Handstand Push-up (`g_hspu`) | fehlende Erklärung, missverständlich | „Kick-up“ unerklärt, 45 Grad als feste Regel, kein Ausstieg. | Einstieg beschrieben, Ellbogenwinkel als Richtung, Ausstieg ergänzt. | geklärt |
| Kipping Handstand Push-up (`g_kipping_hspu`) | fehlende Erklärung | Kopfaufsatz und Ausstieg fehlten. | Ergänzt. | geklärt |
| Deficit Handstand Push-up (`g_deficit_hspu`) | ok | Einstieg fehlte. | Ergänzt. | geklärt |
| Freestanding Handstand Push-up (`g_freestanding_hspu`) | fehlende Erklärung | Sicheres Fallen fehlte. | Ausstieg mit Herausdrehen ergänzt. | geklärt |
| Band Overhead Press (`g_band_press`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Dumbbell Shoulder Press (`g_db_press`) | ok | Griff und Ablegen fehlten. | Ergänzt. | geklärt |
| Strict Press (`g_strict_press`) | fehlende Erklärung | Startposition, Kopfbewegung und Rack fehlten. | Ergänzt. | geklärt |
| Push Press (`g_push_press`) | fehlende Erklärung | Dip und Drive als Fachbegriffe ohne Erklärung. | Erklärt. | geklärt |
| Push Jerk (`g_push_jerk`) | fehlende Erklärung | Verweis „wie beim Push Press“, kein sicherer Fehlversuch. | Eigenständiger Ablauf und Abwurf nach vorn ergänzt. | geklärt |
| Split Jerk (`g_split_jerk`) | fehlende Erklärung | Dip und Drive, Fußfolge beim Zurückkommen und Abwurf fehlten. | Ergänzt. | geklärt |
| Landmine Press (`g_landmine_press`) | ok | Ablegen fehlte. | Ergänzt. | geklärt |
| Single-Arm Dumbbell Press (`g_single_arm_db_press`) | ok | Text war verständlich. | Ablegen ergänzt. | geklärt |
| Z Press (`g_z_press`) | missverständlich | „zeigt fehlende Beweglichkeit“ als Diagnose. | Als Korrektur mit Ausweichposition formuliert. | geklärt |
| Wall-Facing Handstand Push-up (`g_wall_facing_hspu`) | missverständlich | „Kopf senkrecht zwischen den Händen“ widersprach dem Dreieck bei den anderen HSPU-Stufen. | Kleines Dreieck beschrieben; Hände näher an der Wand als schwerere Variante. | geklärt |
| Negative Dip (`g_dip_negative`) | missverständlich | „überlastet die vordere Schulter“ als feste Aussage. | Als Korrektur und Abbruchsignal formuliert. | geklärt |

## einbein

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Pistol Squat (`g_pistol`) | fehlende Erklärung, fachlicher Fehler | „Knie über den Zehen“ missverständlich; Glossar und Bibliothek verschieden. | Kniebahn als Richtung, Gleichgewichtshilfe, sicheres Fallen. | geklärt |
| Assisted Pistol Squat (`g_pistol_assisted`) | ok | Ringhöhe fehlte. | Ergänzt. | geklärt |
| Box Pistol Squat (`g_pistol_box`) | ok | Text war knapp. | Stuhl und Ablauf ergänzt. | geklärt |
| Bulgarian Split Squat (`g_bss`) | fehlende Erklärung | Abstand und Seitenfolge nur im Glossar. | Ein gemeinsamer Text. | geklärt |
| Shrimp Squat (`g_shrimp`) | ok | Polster fehlte. | Ergänzt. | geklärt |
| Reverse Lunge (`g_lunge`) | fehlende Erklärung | Schrittlänge ungenau. | Richtwert über die Kniewinkel. | geklärt |
| Split Squat (`g_split_squat`) | ok | Fußstellung fehlte. | Ergänzt. | geklärt |
| Walking Lunge (`g_walking_lunge`) | ok | Zählweise fehlte. | Ergänzt. | geklärt |
| Step-up (`g_step_up`) | ok | Abstieg fehlte. | Ergänzt. | geklärt |
| Cossack Squat (`g_cossack`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Lateral Step-Down (`g_lateral_step_down`) | missverständlich | „belastet die Knieinnenseite“ als feste Aussage. | Als Korrektur formuliert. | geklärt |
| Skater Squat (`g_skater_squat`) | ok | Text war verständlich. | Reihenfolge der Schritte geordnet. | geklärt |
| Sandbag Lunge (`g_sandbag_lunge`) | missverständlich | „belasten das vordere Knie stark“ als feste Aussage, Ablegen fehlte. | Korrektur mit Richtwert, Ablegen ergänzt. | geklärt |
| Overhead Walking Lunge (`g_overhead_lunge`) | ok | Ablegen fehlte. | Ergänzt. | geklärt |

## handstand_skill

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Back-to-Wall Handstand (`g_wall_handstand_back`) | fehlende Erklärung | Einstieg ohne Arm- und Fußposition, kein Ausstieg im Bibliothekstext (nur in SKILL_IN). | Ein- und Ausstieg wie in SKILL_IN, Handposition ergänzt. | geklärt |
| Handstand (`g_handstand`) | missverständlich, fehlende Erklärung | Glossar sagte „Liegestütz mit dem Rücken zur Wand“, gemeint war Bauch zur Wand; „Stack“ unerklärt. | Eindeutig beschrieben, Stack als Rippen nach innen, Leiterstufen ergänzt. | geklärt |
| Crow Pose (`g_crow`) | ok | Knieposition ungenau. | Ergänzt. | geklärt |
| Handstand Kick-up (`g_kick_up`) | fehlende Erklärung | „abdrehen“ nicht erklärt. | Seitliches Herausdrehen beschrieben. | geklärt |
| Freestanding Handstand (`g_free_handstand`) | fehlende Erklärung | Balance über die Finger und Ausstieg zu knapp. | Ergänzt. | geklärt |
| Handstand Walk (`g_handstand_walk`) | ok | Richtung der Gewichtsverlagerung fehlte. | Ergänzt wie in SKILL_IN. | geklärt |
| Box Pike Hold (`g_box_pike_hold`) | missverständlich | „verlagern die Last in die Gelenke“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Parallette Handstand (`g_parallette_handstand`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Wall Handstand Shoulder Tap (`g_handstand_shoulder_tap`) | missverständlich | „belastet das Gelenk“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Press to Handstand (`g_press_to_handstand`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |

## huefte

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Single-Leg Romanian Deadlift (`g_single_leg_rdl`) | fehlende Erklärung | Tiefe und Hüftstellung fehlten. | Ergänzt. | geklärt |
| Glute Bridge (`g_bridge`) | fehlende Erklärung | Fußabstand und Varianten der Leiter nur im Glossar. | Ein gemeinsamer Text mit Leiterstufen. | geklärt |
| Hip Thrust (`g_hip_thrust`) | fehlende Erklärung | Position auf der Kante und Fußstellung fehlten. | Ergänzt. | geklärt |
| Kettlebell Deadlift (`g_kb_deadlift`) | fehlende Erklärung | Stand und Bahn der Kettlebell fehlten. | Ergänzt. | geklärt |
| Kettlebell Swing (`g_kb_swing`) | fehlende Erklärung | Start, Ende und Rolle der Knie fehlten. | Ergänzt. | geklärt |
| American Kettlebell Swing (`g_american_swing`) | fehlende Erklärung | Startete mit „Wie der Kettlebell Swing“. | Eigenständiger Ablauf. | geklärt |
| Single-Arm Kettlebell Swing (`g_single_arm_swing`) | fehlende Erklärung | „Swing wie beidarmig“. | Eigenständiger Ablauf. | geklärt |
| Dumbbell Swing (`g_db_swing`) | fehlende Erklärung | Verweis auf Kettlebell Swing. | Eigenständiger Ablauf. | geklärt |
| Romanian Deadlift (`g_rdl`) | fehlende Erklärung | Tiefe und Knie unklar. | Ergänzt. | geklärt |
| Deadlift (`g_deadlift`) | fehlende Erklärung | Griff, Spannung, Atmung, Ablegen fehlten. | Ergänzt. | geklärt |
| Sumo Deadlift High Pull (`g_sdhp`) | fehlende Erklärung | Ablauf zu knapp. | Ergänzt. | geklärt |
| Band Good Morning (`g_band_good_morning`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Band Pull-Through (`g_band_pull_through`) | ok | Abstand fehlte. | Ergänzt. | geklärt |
| Superman Hold (`g_superman`) | ok | Text war verständlich. | Fehler ergänzt. | geklärt |
| GHD Hip Extension (`g_ghd_hip_ext`) | fehlende Erklärung | Einstellung des Geräts fehlte. | Ergänzt. | geklärt |
| Barbell Hip Thrust (`g_barbell_hip_thrust`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Sumo Deadlift (`g_sumo_deadlift`) | missverständlich | „neutral“ unerklärt, feste Aussage zur Knieinnenseite. | In Handlung übersetzt. | geklärt |
| Trap Bar Deadlift (`g_trap_bar_deadlift`) | missverständlich | „verschiebt die Last in die Wirbelsäule“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| 45-Degree Back Extension (`g_back_extension_45`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Good Morning (`g_good_morning`) | missverständlich | „überlastet die Lendenwirbelsäule“ als Behauptung. | Als Korrektur formuliert, Tiefe an Beweglichkeit gekoppelt. | geklärt |
| PVC Hip Hinge (`g_pvc_hip_hinge`) | ok | Handposition fehlte. | Ergänzt. | geklärt |
| Weighted Single-Leg Romanian Deadlift (`g_weighted_single_leg_rdl`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |

## isolation

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Band Curl (`g_band_curl`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Biceps Curl (`g_biceps_curl`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Hammer Curl (`g_hammer_curl`) | ok | Text war verständlich. | Neutralgriff erklärt. | geklärt |
| Ring Biceps Curl (`g_ring_curl`) | ok | Ringhöhe fehlte. | Ergänzt. | geklärt |
| Triceps Pushdown (`g_triceps_pushdown`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Overhead Triceps Extension (`g_overhead_triceps_extension`) | missverständlich | „verlagert die Last in den unteren Rücken“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Skull Crusher (`g_skull_crusher`) | missverständlich | „belastet sie stark“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Ring Triceps Extension (`g_ring_triceps_extension`) | ok | Höhe fehlte. | Ergänzt. | geklärt |
| Band Lateral Raise (`g_band_lateral_raise`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Lateral Raise (`g_lateral_raise`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Calf Raise (`g_calf_raise`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Single-Leg Calf Raise (`g_single_leg_calf_raise`) | missverständlich | „belastet das Sprunggelenk“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Seated Calf Raise (`g_seated_calf_raise`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Wrist Curl (`g_wrist_curl`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Reverse Wrist Curl (`g_reverse_wrist_curl`) | missverständlich | „überlastet die Sehnen“ als Behauptung. | Als Korrektur mit Abbruchsignal formuliert. | geklärt |
| Shrug (`g_shrug`) | missverständlich | „belastet das Gelenk“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Leg Extension (`g_leg_extension`) | ok | Drehachse fehlte. | Ergänzt. | geklärt |
| Reverse Nordic (`g_reverse_nordic`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Clamshell (`g_clamshell`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Lateral Band Walk (`g_lateral_band_walk`) | missverständlich | „belastet die Knieinnenseite“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Band External Rotation (`g_band_external_rotation`) | ok | Text war verständlich. | Handtuch als Selbstkontrolle. | geklärt |

## kniebeuge

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Air Squat (`g_air`) | fachlicher Fehler | Korrektur „Knie über die Zehen schieben“ unklar und widersprüchlich zum verbreiteten Mythos „Knie nie über die Zehen“; Tiefe in Glossar und Bibliothek verschieden. | Knie zeigen in Richtung der Fußspitzen, über die Zehen hinaus ist normal; Tiefe mit Bedingung gerader Rücken. | geklärt |
| Box Squat (`g_box_squat`) | fehlende Erklärung | Abstand und Stabilität des Stuhls fehlten. | Ergänzt. | geklärt |
| Wall Sit (`g_wall_sit`) | fehlende Erklärung | Fußabstand und Aufstehen fehlten. | Ergänzt. | geklärt |
| Goblet Squat (`g_goblet_squat`) | fehlende Erklärung | Griff und Fußstellung fehlten. | Ergänzt. | geklärt |
| Front Squat (`g_front_squat`) | fehlende Erklärung | Ablage der Stange, Rack und Fehlversuch fehlten. | Ergänzt. | geklärt |
| Back Squat (`g_back_squat`) | fehlende Erklärung | Rack, Sicherung, Atmung und Ablage fehlten. | Ergänzt. | geklärt |
| Overhead Squat (`g_overhead_squat`) | fehlende Erklärung | Griffbreite und sicherer Abwurf fehlten. | Ergänzt. | geklärt |
| Thruster (`g_thruster`) | fehlende Erklärung | Verweis auf Front Squat ohne eigene Erklärung. | Eigenständig beschrieben. | geklärt |
| Wall Ball Shot (`g_wall_ball`) | fehlende Erklärung | Abstand und Zielhöhe fehlten. | Übliche Zielhöhen als Richtwert ergänzt. | geklärt |
| Leg Press (`g_leg_press`) | fehlende Erklärung | Sicherungshebel fehlten; feste 90 Grad als Regel. | Sicherung ergänzt, Tiefe an das Becken gekoppelt. | geklärt |
| Sissy Squat (`g_sissy_squat`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Spanish Squat (`g_spanish_squat`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |

## mobilitaet

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Stack Breathing (`g_stack`) | fehlende Erklärung | Glossar und Bibliothek verschieden, Selbstkontrolle fehlte. | Gemeinsamer Text mit Hand-Test. | geklärt |
| World's Greatest Stretch (`g_wgs`) | ok | Glossar und Bibliothek verschieden. | Gemeinsamer Text. | geklärt |
| Scapular Push-up (`g_scap`) | fehlende Erklärung | Serratus unerklärt, Glossar mit eigenem Text. | Gemeinsamer Text. | geklärt |
| Band Pass-Through (`g_passthrough`) | ok | Glossar und Bibliothek verschieden. | Gemeinsamer Text. | geklärt |
| Wrist Prep (`g_wrist_prep`) | fehlende Erklärung | Positionen nur angedeutet. | Ergänzt. | geklärt |
| Cat-Cow (`g_cat_cow`) | ok | Text war verständlich. | Ausgangsposition genauer. | geklärt |
| Thoracic Rotation (`g_thoracic_rotation`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Deep Squat Hold (`g_deep_squat`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Couch Stretch (`g_couch_stretch`) | fehlende Erklärung | Einstieg und Ausstieg fehlten. | Ergänzt. | geklärt |
| Pike Stretch (`g_pike_stretch`) | ok | Text war verständlich. | Atmung ergänzt. | geklärt |
| Pancake Stretch (`g_pancake`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Jefferson Curl (`g_jefferson_curl`) | ok | Abbruchsignal fehlte. | Ergänzt. | geklärt |
| Inchworm (`g_inchworm`) | ok | Text war verständlich. | Leicht angepasst. | geklärt |
| Wall Slide (`g_wall_slide`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Wall Flexion Hold (`g_wall_flexion_hold`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Wall Flexion Lift-off (`g_wall_flexion_liftoff`) | fehlende Erklärung | „Wand-Position“ verwies auf andere Übung. | Position beschrieben. | geklärt |
| Puppy Pose (`g_puppy_pose`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Doorway Pec Stretch (`g_doorway_pec`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Shoulder CARs (`g_shoulder_cars`) | fehlende Erklärung | CARs unerklärt. | Erklärt. | geklärt |
| Sleeper Stretch (`g_sleeper_stretch`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Prayer Stretch (`g_prayer_stretch`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Wall Biceps Stretch (`g_wall_biceps_stretch`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Overhead Triceps Stretch (`g_triceps_stretch`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Towel Shoulder Stretch (`g_towel_stretch`) | ok | Zusammenhang mit dem Test fehlte. | Ergänzt. | geklärt |
| Open Book (`g_open_book`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Thread the Needle (`g_thread_needle`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Wrist Extension Stretch (`g_wrist_extension_stretch`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Wrist Flexion Stretch (`g_wrist_flexion_stretch`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Wrist Rocks (`g_wrist_rocks`) | missverständlich | Fehler „Finger krallen sich nicht fest“ war unklar formuliert. | Klar formuliert. | geklärt |
| 90/90 Hip Switch (`g_ninety_ninety`) | fehlende Erklärung | Ausgangsposition schwer vorstellbar. | Beinlage beschrieben. | geklärt |
| Pigeon Stretch (`g_pigeon`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Frog Stretch (`g_frog`) | ok | „Rücken neutral“ unerklärt. | Als flach beschrieben. | geklärt |
| Half-Kneeling Hip Flexor Stretch (`g_hip_flexor_stretch`) | ok | Halbkniestand unerklärt. | Erklärt. | geklärt |
| Hip CARs (`g_hip_cars`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Butterfly Stretch (`g_butterfly`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Lizard Stretch (`g_lizard`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Assisted Deep Squat (`g_assisted_squat`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Overhead Deep Squat Hold (`g_overhead_squat_hold`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Ragdoll Hang (`g_ragdoll`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Half Split (`g_half_split`) | ok | Text war verständlich. | Hilfsmittel ergänzt. | geklärt |
| Front Split Hold (`g_front_split`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Supine Hamstring Stretch (`g_supine_hamstring`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Leg Swings (`g_leg_swings`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Legs-Up-the-Wall (`g_legs_up_wall`) | fehlende Erklärung | Einstieg und Ausstieg fehlten. | Ergänzt. | geklärt |
| Knee-to-Wall Mobilization (`g_knee_to_wall`) | ok | Bezug zum Test fehlte. | Ergänzt. | geklärt |
| Wall Calf Stretch (`g_calf_wall_stretch`) | ok | Text war verständlich. | Detail ergänzt. | geklärt |
| Ankle CARs (`g_ankle_cars`) | ok | Text war verständlich. | Richtungswechsel ergänzt. | geklärt |
| Kneeling Shin Stretch (`g_kneeling_shin`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Cobra Stretch (`g_cobra`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Child's Pose (`g_childs_pose`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Supine Spinal Twist (`g_supine_twist`) | ok | Text war verständlich. | Keine inhaltliche Änderung. | geklärt |
| Standing Roll Down (`g_roll_down`) | ok | Text war verständlich. | Atmung ergänzt. | geklärt |
| Standing Side Bend (`g_side_bend`) | ok | Text war verständlich. | Hüfte in Schritte übernommen. | geklärt |
| Glute Bridge Hold (`g_glute_bridge_hold`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Elevated Bridge (`g_elevated_bridge`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Full Bridge (`g_full_bridge`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Neck CARs (`g_neck_cars`) | missverständlich | „staucht die Halswirbelsäule“ als Behauptung. | Als Korrektur formuliert, Abbruchsignal ergänzt. | geklärt |
| Kneeling Toe Stretch (`g_kneeling_toe_stretch`) | missverständlich | „überdehnt die Zehengelenke“ als Behauptung. | Als Korrektur formuliert. | geklärt |

## olympisch

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Burgener Warm-up (`g_burgener`) | fehlende Erklärung | Englische Teilnamen ohne Erklärung. | Jeder Teil in einem Satz erklärt. | geklärt |
| Hang Power Clean (`g_hang_power_clean`) | fehlende Erklärung | Griff, Startposition und Fehlversuch fehlten. | Ergänzt. | geklärt |
| Power Clean (`g_power_clean`) | fehlende Erklärung | „wie beim Kreuzheben“ ohne eigene Erklärung. | Eigenständig. | geklärt |
| Squat Clean (`g_squat_clean`) | fehlende Erklärung | „Wie Power Clean“. | Eigenständig. | geklärt |
| Clean and Jerk (`g_clean_and_jerk`) | fehlende Erklärung | Teile nur benannt. | Teile kurz beschrieben. | geklärt |
| Hang Power Snatch (`g_hang_power_snatch`) | fehlende Erklärung | Reißgriff und Fehlversuch fehlten. | Ergänzt. | geklärt |
| Power Snatch (`g_power_snatch`) | ok | Fehlversuch fehlte. | Ergänzt. | geklärt |
| Squat Snatch (`g_squat_snatch`) | fehlende Erklärung | „Wie Power Snatch“. | Eigenständig. | geklärt |
| Dumbbell Snatch (`g_db_snatch`) | ok | Ablegen fehlte. | Ergänzt. | geklärt |
| Dumbbell Clean and Jerk (`g_db_clean_jerk`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Kettlebell Clean (`g_kb_clean`) | fehlende Erklärung | Rack-Position unerklärt. | Erklärt. | geklärt |
| Kettlebell Snatch (`g_kb_snatch`) | ok | Text war verständlich. | Ergänzt. | geklärt |
| Devil Press (`g_devil_press`) | fehlende Erklärung | Ablauf zu knapp. | Ergänzt. | geklärt |
| Medicine Ball Clean (`g_med_ball_clean`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Clean Pull (`g_clean_pull`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Snatch Balance (`g_snatch_balance`) | ok | Fehlversuch fehlte. | Ergänzt. | geklärt |
| Muscle Snatch (`g_muscle_snatch`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Sandbag Clean (`g_sandbag_clean`) | missverständlich | „überlastet Bizeps und Rücken“ als Behauptung. | Als Korrektur formuliert. | geklärt |

## rumpf_anti_streckung

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Hollow Body Hold (`g_hollow`) | fehlende Erklärung | „Stack aufbauen“ ohne Erklärung, Glossar und Bibliothek verschieden. | Stack in Handlung übersetzt, Hand-Test als Selbstkontrolle. | geklärt |
| Hollow Rock (`g_hollow_rock`) | fehlende Erklärung | „In die Hollow-Position“ ohne Erklärung. | Position im ersten Schritt beschrieben. | geklärt |
| Plank (`g_plank`) | fehlende Erklärung | „Spiegel oder Video nutzen“ als Korrektur ohne Richtung. | Konkrete Korrektur und Besenstiel-Test. | geklärt |
| Dead Bug (`g_dead_bug`) | ok | Text war verständlich. | Ausgangsposition genauer. | geklärt |
| Ab Wheel Rollout (`g_abwheel`) | fehlende Erklärung | Glossar und Bibliothek verschieden, Wand-Stufe nicht erklärt. | Gemeinsamer Text, Wand-Stufe beschrieben. | geklärt |
| Standing Ab Wheel Rollout (`g_abwheel_standing`) | fehlende Erklärung | Sicherer Abbruch fehlte. | Ergänzt. | geklärt |
| Ring Fallout (`g_ring_fallout`) | ok | Ringhöhe fehlte. | Ergänzt. | geklärt |
| Body Saw (`g_body_saw`) | ok | Text war verständlich. | Unterlage ergänzt. | geklärt |
| Bear Crawl (`g_bear_crawl`) | fehlende Erklärung | „gegengleich“ ohne Beispiel. | Beispiel ergänzt. | geklärt |
| Tuck Dragon Flag (`g_dragon_flag_tuck`) | fehlende Erklärung | Last auf Nacken vs. Schulter nicht geklärt. | Ergänzt. | geklärt |
| Dragon Flag Raise (`g_dragon_flag_raise`) | fehlende Erklärung | „Festhalten wie beim Tuck Dragon Flag“. | Eigenständig. | geklärt |
| Dragon Flag (`g_dragon_flag`) | fehlende Erklärung | „Aus dem Raise“ ohne eigene Erklärung. | Eigenständig. | geklärt |
| RKC Plank (`g_rkc_plank`) | ok | „eingerollt“ unerklärt. | Erklärt. | geklärt |
| Bird Dog (`g_bird_dog`) | ok | Höhe von Arm und Bein fehlte. | Ergänzt. | geklärt |
| Dragon Flag Negative (`g_dragon_flag_negative`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |

## rumpf_beugung

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Hanging Knee Raise (`g_kneeraise`) | fehlende Erklärung | Glossar und Bibliothek verschieden, Becken nicht erwähnt. | Gemeinsamer Text mit Beckeneinrollen. | geklärt |
| Hanging Leg Raise (`g_leg_raise`) | ok | Text war knapp. | Ausstieg ergänzt. | geklärt |
| Toes to Bar (`g_toes_to_bar`) | ok | Technik des Einrollens fehlte. | Ergänzt. | geklärt |
| Kipping Toes to Bar (`g_kipping_t2b`) | fehlende Erklärung | Kip Swing vorausgesetzt. | Bogen und Hohlkörper kurz erklärt. | geklärt |
| Knees to Elbows (`g_knees_to_elbows`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Slider Knee Tuck (`g_tuck`) | ok | Glossar und Bibliothek verschieden. | Gemeinsamer Text. | geklärt |
| Slider Pike (`g_slider_pike`) | ok | Text war verständlich. | Unterlage ergänzt. | geklärt |
| AbMat Sit-up (`g_sit_up`) | fehlende Erklärung | AbMat nicht erklärt. | Ersatz Handtuch ergänzt. | geklärt |
| V-up (`g_v_up`) | ok | Text war verständlich. | Schritte getrennt. | geklärt |
| Tuck-up (`g_tuck_up`) | ok | Ausgangsposition fehlte. | Ergänzt. | geklärt |
| GHD Sit-up (`g_ghd_sit_up`) | fehlende Erklärung | Wie die Beine helfen, fehlte. | Ergänzt. | geklärt |
| Compression Leg Lift (`g_compression`) | fehlende Erklärung | Kompression nicht erklärt. | Erklärt. | geklärt |
| Tuck L-Sit (`g_tuck_lsit`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| L-Sit (`g_lsit`) | fehlende Erklärung | „wie beim Tuck L-Sit“. | Eigenständig. | geklärt |
| Ring L-Sit (`g_ring_lsit`) | ok | Ringhöhe fehlte. | Ergänzt. | geklärt |
| V-Sit (`g_v_sit`) | fehlende Erklärung | Aus dem L-Sit ohne Beschreibung. | L-Sit im Schritt beschrieben. | geklärt |
| Crunch (`g_crunch`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Reverse Crunch (`g_reverse_crunch`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Cable Crunch (`g_cable_crunch`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Hanging L-Sit (`g_hanging_lsit`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |

## rumpf_rotation

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Side Plank (`g_side_plank`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Pallof Press (`g_pallof`) | ok | Ablauf zu knapp. | Ergänzt. | geklärt |
| Russian Twist (`g_russian_twist`) | ok | Zählweise fehlte. | Ergänzt. | geklärt |
| Turkish Get-up (`g_turkish_getup`) | fehlende Erklärung | „Schritt für Schritt“ ohne Schritte. | Phasen beschrieben, sicheres Ablegen ergänzt. | geklärt |
| Tuck Human Flag (`g_flag_tuck`) | fehlende Erklärung | Griff der Hände ungenau. | Ober- und Untergriff mit Abstand beschrieben. | geklärt |
| Human Flag (`g_human_flag`) | fehlende Erklärung | „Griff wie beim Tuck Human Flag“. | Eigenständig. | geklärt |
| Cable Woodchop (`g_cable_woodchop`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Landmine Rotation (`g_landmine_rotation`) | missverständlich | „überlastet die Lendenwirbelsäule“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Plank Shoulder Tap (`g_plank_shoulder_tap`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Copenhagen Plank (`g_copenhagen_plank`) | ok | Text war verständlich. | Hebel erklärt, Abbruchsignal ergänzt. | geklärt |
| Hanging Windshield Wiper (`g_windshield_wiper`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Medicine Ball Rotational Throw (`g_med_ball_rotational_throw`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Bicycle Crunch (`g_bicycle_crunch`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Kettlebell Windmill (`g_kb_windmill`) | missverständlich | „überlastet die Schulter“ als Behauptung. | Als Korrektur und Abbruchsignal formuliert. | geklärt |

## sprung

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Squat Jump (`g_squatjump`) | fehlende Erklärung, fachlicher Fehler | „Knie über die Zehen“ als Korrektur missverständlich; Glossar und Bibliothek verschieden. | Kniebahn als Richtung, ein gemeinsamer Text. | geklärt |
| Skater Jump (`g_skater`) | fehlende Erklärung | Zählweise und Bewegung des freien Beins nur im Glossar. | Ein gemeinsamer Text. | geklärt |
| Broad Jump (`g_broad_jump`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Tuck Jump (`g_tuck_jump`) | ok | Text war knapp. | Ergänzt. | geklärt |
| Jumping Lunge (`g_jumping_lunge`) | ok | Text war verständlich. | Ergänzt. | geklärt |
| Box Jump (`g_box_jump`) | missverständlich | „belastet die Achillessehne“ als feste Behauptung. | Als Empfehlung formuliert. | geklärt |
| Box Jump Over (`g_box_jump_over`) | ok | Text war verständlich. | Leicht umformuliert. | geklärt |
| Pogo Hop (`g_pogo`) | ok | Text war verständlich. | Abbruchsignal ergänzt. | geklärt |
| Jumping Jack (`g_jumping_jack`) | ok | Text war verständlich. | Ergänzt. | geklärt |
| Single-Under (`g_single_under`) | fehlende Erklärung | Seillänge fehlte. | Ergänzt. | geklärt |
| Double-Under (`g_double_under`) | fehlende Erklärung | Lernweg fehlte. | Ergänzt. | geklärt |
| Snap Down (`g_snap_down`) | missverständlich | „Knie über die Zehen“ und „belastet das Kniegelenk“. | Kniebahn als Richtung, Korrektur statt Behauptung. | geklärt |
| Depth Jump (`g_depth_jump`) | fehlende Erklärung | Reaktivkraft unerklärt, Pausen fehlten. | Ergänzt. | geklärt |
| Single-Leg Hop (`g_single_leg_hop`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Triple-Under (`g_triple_under`) | ok | Text war verständlich. | Korrektur ergänzt. | geklärt |
| Bounding (`g_bounding`) | ok | Text war verständlich. | Strecke ergänzt. | geklärt |

## tragen

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Backpack Carry (`g_backpack_carry`) | ok | Beschwerung fehlte. | Ergänzt. | geklärt |
| Farmer's Carry (`g_farmers_carry`) | fehlende Erklärung | Aufnehmen und Absetzen fehlten. | Ergänzt. | geklärt |
| Suitcase Carry (`g_suitcase_carry`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Overhead Carry (`g_overhead_carry`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Sandbag Bear Hug Carry (`g_sandbag_carry`) | fehlende Erklärung | Aufnehmen fehlte. | Ergänzt. | geklärt |
| Sandbag Shoulder Carry (`g_sandbag_shoulder_carry`) | ok | Aufnehmen fehlte. | Ergänzt. | geklärt |
| Sled Push (`g_sled_push`) | ok | Text war verständlich. | Ausstieg ergänzt. | geklärt |
| Sled Pull (`g_sled_pull`) | missverständlich | „überlastet den unteren Rücken“ als Behauptung. | Als Korrektur formuliert. | geklärt |
| Backward Sled Drag (`g_backward_sled_drag`) | ok | Text war verständlich. | Sicherheitshinweis ergänzt. | geklärt |
| Front Rack Carry (`g_front_rack_carry`) | fehlende Erklärung | Front-Rack unerklärt. | Erklärt. | geklärt |

## zug_horizontal

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Ring Row (`g_row`) | fehlende Erklärung | Griff, Neigung als Stellschraube und Ausstieg fehlten; Glossar mit eigenem Text. | Neutralgriff, Ringhöhe, Körperspannung und Rückweg ergänzt. | geklärt |
| Australian Pull-up (`g_australian_pullup`) | fehlende Erklärung | Stangenhöhe und Griff fehlten. | Ergänzt. | geklärt |
| Archer Ring Row (`g_archer_row`) | fehlende Erklärung | Startete mit „Wie die Ring Row starten“. | Eigenständiger Ablauf. | geklärt |
| One-Arm Ring Row (`g_one_arm_row`) | fehlende Erklärung | Fußstellung und Griff fehlten. | Ergänzt. | geklärt |
| Band Row (`g_band_row`) | fehlende Erklärung | Abstand und Ausstieg fehlten. | Ergänzt. | geklärt |
| Band Pull-Apart (`g_pullapart`) | ok | Glossar und Bibliothek mit verschiedenen Texten. | Ein gemeinsamer Text in der Bibliothek. | geklärt |
| Band Face Pull (`g_face_pull`) | fehlende Erklärung | Griff und Endposition ungenau. | Ergänzt. | geklärt |
| Dumbbell Row (`g_db_row`) | fehlende Erklärung | Stütz- und Fußposition fehlten. | Ergänzt. | geklärt |
| Barbell Row (`g_barbell_row`) | fehlende Erklärung | Griff, Winkel und sicheres Ablegen fehlten. | Ergänzt; Winkel als Richtwert, nicht als Pflicht. | geklärt |
| Renegade Row (`g_renegade_row`) | fehlende Erklärung | Rutschgefahr der Hanteln, Ausstieg fehlte. | Ergänzt. | geklärt |
| Tuck Front Lever Row (`g_tuck_fl_row`) | fehlende Erklärung | Startposition nur über den Namen erklärt. | Gehockte Hangwaage beschrieben. | geklärt |
| German Hang (`g_german_hang`) | fehlende Erklärung | Einstieg mit Fußhilfe und klarer Abbruchpunkt fehlten. | Einstieg über Sitzposition, Rückweg, Abbruchsignal ergänzt. | geklärt |
| Tuck Back Lever (`g_back_lever_tuck`) | fehlende Erklärung | German Hang als bekannt vorausgesetzt, Rückweg fehlte. | Weg über den umgekehrten Hang beschrieben. | geklärt |
| Advanced Tuck Back Lever (`g_back_lever_adv`) | fehlende Erklärung | Startete mit „Wie der Tuck Back Lever“. | Eigenständiger Ablauf. | geklärt |
| Back Lever (`g_back_lever`) | fehlende Erklärung | Weg in die Position verkürzt. | Weg über den umgekehrten Hang und Ausstieg ergänzt. | geklärt |
| Tuck Front Lever (`g_front_lever_tuck`) | fehlende Erklärung | Ausstieg fehlte. | Ergänzt. | geklärt |
| Advanced Tuck Front Lever (`g_front_lever_adv`) | fehlende Erklärung | Startete mit „Wie der Tuck Front Lever“. | Eigenständiger Ablauf. | geklärt |
| One-Leg Front Lever (`g_front_lever_one_leg`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Front Lever (`g_front_lever`) | fehlende Erklärung | Ausstieg fehlte. | Ergänzt. | geklärt |
| Table Row (`g_table_row`) | ok | Text war verständlich. | In du-Form und mit Ausstieg. | geklärt |
| Towel Door Row (`g_towel_door_row`) | ok | Fußstellung zur Tür fehlte. | Ergänzt. | geklärt |
| Seated Cable Row (`g_seated_cable_row`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Chest-Supported Dumbbell Row (`g_chest_supported_row`) | ok | Bankwinkel fehlte. | Richtwert ergänzt. | geklärt |
| Prone Y-T-W Raise (`g_ytw_raise`) | ok | Text war verständlich. | Positionen klarer getrennt. | geklärt |
| Front Lever Raise (`g_front_lever_raise`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Straddle Front Lever (`g_straddle_front_lever`) | ok | Ausstieg fehlte. | Ergänzt. | geklärt |
| Straddle Back Lever (`g_straddle_back_lever`) | ok | German Hang als bekannt vorausgesetzt. | Weg über den umgekehrten Hang beschrieben. | geklärt |
| Skin the Cat (`g_skin_the_cat`) | missverständlich | „überlastet die Schulter“ als feste Aussage. | Als Ausführungshinweis mit klarem Abbruchsignal formuliert. | geklärt |

## zug_vertikal

| Übung | Art | Problem | Korrektur | Status |
|---|---|---|---|---|
| Ring Pull-up (`g_pullup`) | fehlende Erklärung, missverständlich | Obergriff nicht erklärt, keine Vorbereitung für Ringe und Band, kein Ausstieg; Glossar (Plan) und Bibliothek mit unterschiedlichen Texten. | Griff, Bandbefestigung, Startposition, Zählregel und Absprung ergänzt; Glossar zeigt jetzt den Bibliothekstext. | geklärt |
| Ring Chin-up (`g_chinup`) | fehlende Erklärung | Untergriff knapp erklärt, keine Vorbereitung, kein Ausstieg, Glossar mit eigenem Text. | Griff, Ellbogenführung, Band, Absprung ergänzt. | geklärt |
| Dead Hang (`g_dead_hang`) | missverständlich | „Krampfhaft hochgezogene Schultern“ als Fehler widersprach dem Cool-down-Hinweis „Schultern nach oben gehen lassen“. | Passiver (Cool-down) und aktiver Hang (Kraft) als zwei richtige Varianten erklärt. | geklärt |
| Scapular Pull-up (`g_scap_pull`) | fehlende Erklärung | Startposition (lockerer Hang) und Bewegungsgröße fehlten. | Ablauf von locker zu aktiv, Größe der Bewegung und Bild für die Richtung ergänzt. | geklärt |
| Negative Pull-up (`g_pullup_negative`) | fehlende Erklärung | Wie man oben ankommt und die Füße sicher löst, fehlte. | Stuhl, Einstieg, Tempo-Hilfe und Rückweg ergänzt. | geklärt |
| Band Lat Pulldown (`g_band_lat_pulldown`) | fehlende Erklärung | Befestigung, Abstand und sicheres Loslassen fehlten. | Anker, Abstand als Stellschraube und Ausstieg ohne Zurückschnellen ergänzt. | geklärt |
| Weighted Pull-up (`g_weighted_pullup`) | fehlende Erklärung, missverständlich | Schritte verwiesen nur auf „Pull-up wie gewohnt“, Voraussetzung „3 × 10“ passte nicht zur Leiter (Stufe Weste). | Eigenständige Anleitung, Gewicht anlegen, Absprung erst ohne Abnehmen des Gewichts. Voraussetzung steht in der App über die Leiter. | geklärt |
| Chest-to-Bar Pull-up (`g_chest_to_bar`) | fehlende Erklärung | „Pull-up starten“ setzte Kenntnis einer anderen Übung voraus. | Eigenständiger Ablauf mit Griff, Zugrichtung und Abgrenzung zur Kipping-Variante. | geklärt |
| Kip Swing (`g_kip_swing`) | fehlende Erklärung | Hollow und Arch nicht erklärt. | Beide Positionen in einfachen Worten beschrieben, sicherer Ausstieg ergänzt. | geklärt |
| Kipping Pull-up (`g_kipping_pullup`) | fehlende Erklärung | Ablauf des Schwungs und Ausstieg unklar. | Ablauf in Phasen beschrieben, Voraussetzung begründet, sicherer Ausstieg ergänzt. | geklärt |
| Butterfly Pull-up (`g_butterfly_pullup`) | fehlende Erklärung | Richtung des Kreises unklar. | Bewegungsrichtung und Kopfhaltung beschrieben. | geklärt |
| Explosive Pull-up (`g_explosive_pullup`) | fehlende Erklärung | Wiederholungszahl und Sicherheit beim Lösen der Hände fehlten. | Satzlänge, Spannung und Bedingung für die Klatsch-Variante ergänzt. | geklärt |
| Archer Pull-up (`g_archer_pullup`) | fehlende Erklärung | Griffbreite und Seitenwechsel ungenau. | Breite, Rolle des Streckarms, Seitenfolge ergänzt. | geklärt |
| False Grip Hang (`g_false_grip_hang`) | fehlende Erklärung | Handposition des False Grip schwer vorstellbar. | Lage des Rings in der Hand und Gewichtsübernahme beschrieben. | geklärt |
| False Grip Chin-up (`g_false_grip_chinup`) | fehlende Erklärung | False Grip als bekannt vorausgesetzt. | Griff in der Übung selbst erklärt. | geklärt |
| Ring Muscle-up Transition (`g_ring_mu_transition`) | fehlende Erklärung | Ausgangsposition und Richtung des Übergangs fehlten. | Sitzposition, Richtung von Brust und Ellbogen, Ausstieg ergänzt. | geklärt |
| Banded Ring Muscle-up (`g_ring_mu_band`) | fehlende Erklärung | Befestigung des Bandes und sicherer Ausstieg fehlten. | Bandschlaufe, Ablauf und Abstieg aus dem Band ergänzt. | geklärt |
| Ring Muscle-up (`g_ring_muscle_up`) | fehlende Erklärung | False Grip und Ausstieg nicht erklärt. | Griff, Ablauf und kontrollierter Weg zurück in den Hang ergänzt. | geklärt |
| Kipping Ring Muscle-up (`g_kipping_ring_mu`) | fehlende Erklärung | „Chicken Wing“ nicht erklärt. | Begriff erklärt, Ablauf des Hüftimpulses beschrieben. | geklärt |
| Bar Muscle-up (`g_bar_muscle_up`) | fehlende Erklärung | Griff, Kip und Ausstieg fehlten. | Ablauf in Phasen mit Griff und sicherem Abstieg ergänzt. | geklärt |
| Assisted One-Arm Pull-up (`g_one_arm_pullup_assisted`) | fehlende Erklärung | Wie viel Hilfe und wo sie hängt, war unklar. | Befestigung, Greifhöhe als Stellschraube und Seitenfolge ergänzt. | geklärt |
| One-Arm Pull-up (`g_one_arm_pullup`) | fehlende Erklärung | „Schulter aktiv“ unerklärt, kein Ausstieg. | In Handlung übersetzt und sicheren Ausstieg mit zweiter Hand ergänzt. | geklärt |
| Rope Climb (`g_rope_climb`) | fehlende Erklärung | J-Hook und S-Wrap nur als Stichworte, Abstieg unklar. | Fußklemme beschrieben, beide Namen erklärt, sicherer Abstieg ergänzt. | geklärt |
| Legless Rope Climb (`g_legless_rope_climb`) | fehlende Erklärung | L-Sitz nicht erklärt, Abstieg unsicher. | L-Sitz erklärt, Notabstieg mit Fußklemme ergänzt. | geklärt |
| Jackknife Pull-up (`g_jackknife_pullup`) | ok | Text war schon gut, Sicherheit des Stuhls fehlte. | Stuhl sichern und Abstieg ergänzt. | geklärt |
| Flexed-Arm Hang (`g_flexed_arm_hang`) | ok | Abbruch ohne Fallen fehlte. | Kontrolliertes Absenken als Ausstieg ergänzt. | geklärt |
| Typewriter Pull-up (`g_typewriter_pullup`) | ok | Zählweise fehlte. | Eine Wiederholung definiert. | geklärt |
| L-Sit Pull-up (`g_lsit_pullup`) | ok | Ausstieg fehlte. | Beine erst senken, dann loslassen. | geklärt |
| Towel Pull-up (`g_towel_pullup`) | ok | Befestigung der Handtücher fehlte. | Befestigung und Greifhöhe ergänzt. | geklärt |
| One-Arm Dead Hang (`g_one_arm_hang`) | missverständlich | Behauptung „belastet die Schulterbänder statt die Muskeln“ als absolute Aussage nicht gut begründet. | Als Ausführungshinweis ohne Verletzungsbehauptung formuliert. | geklärt |
| Kipping Chest-to-Bar (`g_kipping_c2b`) | missverständlich | „Hohlkreuz“ als Name des Bogens ist für Anfänger missverständlich (klingt nach Fehlhaltung). | Begriffe Hohlkörper und Bogen erklärt. | geklärt |
| Jumping Pull-up (`g_jumping_pullup`) | ok | Landung und Stangenhöhe ungenau. | Höhe und weiche Landung ergänzt. | geklärt |
| Lat Pulldown (`g_lat_pulldown`) | fehlende Erklärung | Einstellung des Polsters und sicheres Ablegen fehlten. | Einstellung, Zugrichtung vor dem Kopf und Ausstieg ergänzt. | geklärt |
| Single-Arm Lat Pulldown (`g_single_arm_pulldown`) | ok | Text war verständlich, Ausstieg fehlte. | Ausstieg und Hinweis zur Schulter ergänzt. | geklärt |
| Straight-Arm Pulldown (`g_straight_arm_pulldown`) | ok | Text war verständlich, Rückenhaltung ungenau. | Hüftbeuge und gerader Rücken ergänzt. | geklärt |
| Weighted Chin-up (`g_weighted_chinup`) | ok | Ausstieg mit Gewicht fehlte. | Erst landen, dann Gewicht abnehmen. | geklärt |
| Low Bar Muscle-up (`g_low_bar_mu`) | ok | Ausstieg fehlte. | Rückweg aus dem Stütz ergänzt. | geklärt |
| Strict Bar Muscle-up (`g_strict_bar_mu`) | ok | Falscher Griff unerklärt. | Begriff erklärt. | geklärt |
| Rope Pull-to-Stand (`g_rope_pull_to_stand`) | ok | Körperhaltung ungenau. | Gerader Körper beschrieben. | geklärt |
| Peg Board Climb (`g_peg_board`) | ok | Sicherheit beim Umstecken. | Pflock prüfen und Abstieg ergänzt. | geklärt |
