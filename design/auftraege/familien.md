# Auftrag für Claude Cowork: Übungsfamilien

Du hilfst mir, die Übungsbibliothek meiner Trainings-App aufzuräumen. Die App programmiert danach Claude Code. Dein Endergebnis wird direkt von einem Programm eingelesen. Halte dich deshalb exakt an das Format unten.

## Hintergrund
- Mein Plan „Calisthenics × CrossFit“ läuft in 7-Tage-Durchgängen:
  - Tag 1 Kraft Zug
  - Tag 2 Lauf locker
  - Tag 3 Kraft Druck
  - Tag 4 Intervall-Lauf
  - Tag 5 frei
  - Tag 6 Kraft Zug + Druck
  - Tag 7 frei
- Krafteinheiten:
  - EMOM mit 3–6 Wdh. bei RIR 2
  - danach ein Metcon (AMRAP)
- Die Bibliothek hat 263 Übungen. Viele davon sind Varianten derselben Grundübung. Allein zum Pull-up gibt es über 15 Einträge (Ring Pull-up, Chin-up, Negative, Weighted, Archer, One-Arm, Kipping, Butterfly …). Heute steht jede einzeln in der Liste, das ist unübersichtlich.
- Die App kennt schon **Leitern** (Anhang B): Stufen einer Übung von leicht nach schwer, z. B. Ring Pull-up mit Band → frei → mit Weste. Die App merkt sich, auf welcher Stufe ich bin. Ein Aufstieg passiert nur über Leistung (alle Runden mit 6 Wdh. bei RIR 2).
- Jede Übung hat `nutzen` (0–100, Trainingswert), `level` (1–5) und `equipment` (Liste von Gruppen, aus jeder Gruppe reicht ein Gerät).

## Ziel
Jede Übung gehört zu genau einer **Familie** (z. B. „Pull-up“).
- **Bibliothek:** Die App zeigt nur noch die Familie. Erst wenn ich sie antippe, sehe ich die Varianten, nach Rang sortiert.
- **Training:** Die App nimmt automatisch die beste Variante, die zu meinem Können und den Geräten am Ort passt.

## Deine Aufgabe

### Schritt 1: Vorschlag und Grenzfälle (noch kein JSON)
1. Ordne alle Übungen aus Anhang A Familien zu.
   - Zeig mir die Familien als kurze Liste: Familienname, dann die Varianten in Rangfolge.
2. Teile jede Variante einer dieser drei **Arten** zu:
   - `stufe`: Teil einer echten Steigerung derselben Bewegung, leicht → schwer.
     - Beispiel: Negative Pull-up → Pull-up mit Band → Pull-up frei → Weighted Pull-up → Archer → One-Arm.
     - Diese bekommen einen Rang nach Schwierigkeit.
   - `variante`: gleichwertige Abwandlung mit anderem Reiz, aber nicht „besser“ oder „schwerer“.
     - Beispiele: Chin-up statt Pull-up, Ring statt Stange, False Grip.
   - `tempo`: auf Schnelligkeit ausgelegt, wie im CrossFit wichtig. Nicht auf saubere Range of Motion oder maximale Effizienz.
     - Beispiele: Kipping, Butterfly, Burpee Pull-up.
     - **Keine eigene Familie**, sie bleiben in ihrer Familie, aber mit Vermerk.
     - Sie dürfen im Training **nie** automatisch eine `stufe` ersetzen.
3. **Grenzfälle: Frag mich, bevor du entscheidest.** Grenzfälle sind z. B.:
   - Gehört eine Übung in Familie A oder B?
   - Ist sie `stufe` oder `variante`?
   - Ist sie eine eigene Familie?
   Für **jeden** Grenzfall nennst du:
   - die Frage in einem Satz
   - 2–3 gute Argumente **dafür** und 2–3 **dagegen**, sachlich, mit Blick auf Trainingswirkung, Übersicht in der App und Equipment
   - deine Empfehlung mit einem Satz Begründung

   Dann wartest du auf meine Entscheidung. Erster Grenzfall, bitte auf jeden Fall vorlegen:
   - **Ist der Chin-up eine Variante der Familie Pull-up oder eine eigene Familie?**
4. Ich antworte auf die Grenzfälle. Erst danach kommt Schritt 2.

### Schritt 2: Endergebnis als JSON
Erst nach meinen Entscheidungen gibst du **genau eine** Datei `familien.json` aus. Gültiges JSON in UTF-8, in einem einzigen Codeblock:

```json
{
  "v": 1,
  "quelle": "Kurz, worauf das Ranking beruht",
  "familien": [
    {
      "id": "f_pullup",
      "name": "Pull-up",
      "muster": "zug_vertikal",
      "kurz": "Ein Satz, was die Familie trainiert.",
      "leiter": "g_pullup",
      "varianten": [
        { "uebung": "g_pullup_negative", "art": "stufe", "rang": 1, "effekt": 70, "grund": "Ein Satz, warum dieser Platz." },
        { "uebung": "g_pullup", "art": "stufe", "rang": 2, "effekt": 95, "grund": "…" },
        { "uebung": "g_chinup", "art": "variante", "rang": null, "effekt": 90, "grund": "…" },
        { "uebung": "g_kipping_pullup", "art": "tempo", "rang": null, "effekt": 68, "grund": "…", "vermerk": "Auf Tempo ausgelegt (wie im CrossFit), nicht auf saubere Range of Motion oder Effizienz." }
      ]
    }
  ],
  "entscheidungen": [
    { "frage": "Ist der Chin-up eine eigene Familie?", "entscheidung": "Was ich entschieden habe", "folge": "Was das in der Datei bedeutet" }
  ]
}
```

## Regeln
- **Vollständig:**
  - Jede Übung aus Anhang A kommt in genau **einer** Familie genau **einmal** vor.
  - Keine fehlt, keine ist doppelt, keine neue erfunden.
- **IDs und Namen unverändert:**
  - Übungs-IDs exakt wie in Anhang A.
  - Nichts umbenennen, nichts an Übungen oder Leitern ändern.
- **Familien:**
  - `id` beginnt mit `f_`, nur Kleinbuchstaben, Ziffern und `_`.
  - `name` auf Englisch wie im Sport üblich (z. B. „Pull-up“, „Push-up“, „Squat“).
  - Alle anderen Texte auf Deutsch, kurze klare Sätze.
  - Eine Familie darf aus einer einzigen Übung bestehen, wenn es wirklich keine Varianten gibt.
- **`muster`:** das Bewegungsmuster der Familie, aus Anhang A übernommen.
- **`leiter`:** die passende Leiter aus Anhang B, wenn es eine gibt, sonst `null`.
  - Die Reihenfolge der `stufe`-Varianten soll zur Leiter passen und darf ihr nicht widersprechen.
- **Rang und Effekt:**
  - `rang`: nur bei `art: "stufe"`, 1 = leichteste. Bei `variante` und `tempo` ist `rang` `null`.
  - `effekt` (0–100): Trainingswirkung für Kraft und Muskelaufbau bei sauberer Ausführung.
    - Orientier dich am bestehenden `nutzen`.
    - Weich nur mit Grund ab und schreib den Grund in `grund`.
- **`vermerk`:** Pflicht bei `art: "tempo"`, sonst weglassen.
- **Quellen:** Begründe das Ranking mit anerkannten Quellen, z. B. Calisthenics-Progressionen (Overcoming Gravity, Convict Conditioning), CrossFit-Bewegungsstandards, Krafttrainingsforschung. Nenn sie kurz in `quelle`.
- **Mobility nicht einbeziehen:** Die 56 Mobility-Übungen sind nicht in Anhang A und bleiben, wie sie sind.
- **Formales:** Keine Kommentare im JSON, keine Platzhalter wie „…“, alles ausgefüllt.

## Prüfe vor der Ausgabe
- [ ] Anzahl der Varianten über alle Familien = Anzahl der Übungen in Anhang A (207).
- [ ] Jede ID aus Anhang A kommt genau einmal vor.
- [ ] Jede Familie mit `stufe`-Varianten hat Ränge 1, 2, 3 … ohne Lücke.
- [ ] Jede `tempo`-Variante hat einen `vermerk`.
- [ ] Alle Grenzfälle hast du mir vorgelegt und meine Entscheidung steht in `entscheidungen`.

## Anhang A: Alle Übungen ohne Mobility (207)

### zug_vertikal (24)
- g_pullup | Ring Pull-up | Nutzen 95 | Level 2 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft,metcon,test
- g_weighted_pullup | Weighted Pull-up | Nutzen 92 | Level 4 | Equipment [["eq_ringe","eq_klimmzugstange"],["eq_weste","eq_dipguertel"]] | Rolle kraft,test
- g_chinup | Ring Chin-up | Nutzen 90 | Level 2 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft,metcon,test
- g_ring_muscle_up | Ring Muscle-up | Nutzen 88 | Level 5 | Equipment [["eq_ringe"]] | Rolle kraft,metcon
- g_bar_muscle_up | Bar Muscle-up | Nutzen 84 | Level 5 | Equipment [["eq_klimmzugstange"]] | Rolle kraft,metcon
- g_one_arm_pullup | One-Arm Pull-up | Nutzen 82 | Level 5 | Equipment [["eq_klimmzugstange"]] | Rolle kraft
- g_explosive_pullup | Explosive Pull-up | Nutzen 80 | Level 4 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_chest_to_bar | Chest-to-Bar Pull-up | Nutzen 78 | Level 3 | Equipment [["eq_klimmzugstange"]] | Rolle kraft,metcon
- g_archer_pullup | Archer Pull-up | Nutzen 78 | Level 4 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_false_grip_chinup | False Grip Chin-up | Nutzen 76 | Level 4 | Equipment [["eq_ringe"]] | Rolle kraft
- g_ring_mu_band | Banded Ring Muscle-up | Nutzen 74 | Level 4 | Equipment [["eq_ringe"],["eq_band"]] | Rolle kraft
- g_legless_rope_climb | Legless Rope Climb | Nutzen 74 | Level 5 | Equipment [["eq_kletterseil"]] | Rolle metcon
- g_one_arm_pullup_assisted | Assisted One-Arm Pull-up | Nutzen 72 | Level 5 | Equipment [["eq_klimmzugstange"],["eq_band"]] | Rolle kraft
- g_pullup_negative | Negative Pull-up | Nutzen 70 | Level 1 | Equipment [["eq_ringe","eq_klimmzugstange"],["eq_zuhause"]] | Rolle kraft
- g_kipping_ring_mu | Kipping Ring Muscle-up | Nutzen 70 | Level 5 | Equipment [["eq_ringe"]] | Rolle metcon
- g_rope_climb | Rope Climb | Nutzen 70 | Level 3 | Equipment [["eq_kletterseil"]] | Rolle metcon
- g_kipping_pullup | Kipping Pull-up | Nutzen 68 | Level 3 | Equipment [["eq_klimmzugstange"]] | Rolle metcon
- g_ring_mu_transition | Ring Muscle-up Transition | Nutzen 66 | Level 3 | Equipment [["eq_ringe"]] | Rolle kraft
- g_butterfly_pullup | Butterfly Pull-up | Nutzen 62 | Level 4 | Equipment [["eq_klimmzugstange"]] | Rolle metcon
- g_false_grip_hang | False Grip Hang | Nutzen 62 | Level 3 | Equipment [["eq_ringe"]] | Rolle kraft
- g_scap_pull | Scapular Pull-up | Nutzen 60 | Level 1 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle aufwaermen,kraft
- g_dead_hang | Dead Hang | Nutzen 55 | Level 1 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle aufwaermen,cooldown,kraft
- g_band_lat_pulldown | Band Lat Pulldown | Nutzen 55 | Level 1 | Equipment [["eq_band"]] | Rolle kraft,metcon
- g_kip_swing | Kip Swing | Nutzen 55 | Level 2 | Equipment [["eq_klimmzugstange"]] | Rolle aufwaermen,metcon

### zug_horizontal (19)
- g_front_lever | Front Lever | Nutzen 90 | Level 5 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_front_lever_one_leg | One-Leg Front Lever | Nutzen 86 | Level 5 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_front_lever_adv | Advanced Tuck Front Lever | Nutzen 84 | Level 4 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_row | Ring Row | Nutzen 82 | Level 1 | Equipment [["eq_ringe"]] | Rolle kraft,metcon
- g_back_lever | Back Lever | Nutzen 82 | Level 5 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_front_lever_tuck | Tuck Front Lever | Nutzen 80 | Level 3 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_one_arm_row | One-Arm Ring Row | Nutzen 78 | Level 3 | Equipment [["eq_ringe"]] | Rolle kraft
- g_tuck_fl_row | Tuck Front Lever Row | Nutzen 78 | Level 4 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_australian_pullup | Australian Pull-up | Nutzen 76 | Level 1 | Equipment [["eq_klimmzugstange","eq_barren"]] | Rolle kraft,metcon
- g_back_lever_adv | Advanced Tuck Back Lever | Nutzen 76 | Level 4 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_archer_row | Archer Ring Row | Nutzen 74 | Level 3 | Equipment [["eq_ringe"]] | Rolle kraft
- g_back_lever_tuck | Tuck Back Lever | Nutzen 72 | Level 3 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft
- g_barbell_row | Barbell Row | Nutzen 70 | Level 3 | Equipment [["eq_langhantel"]] | Rolle kraft
- g_db_row | Dumbbell Row | Nutzen 68 | Level 2 | Equipment [["eq_kurzhanteln","eq_kettlebell"]] | Rolle kraft
- g_renegade_row | Renegade Row | Nutzen 64 | Level 3 | Equipment [["eq_kurzhanteln","eq_kettlebell"]] | Rolle metcon
- g_german_hang | German Hang | Nutzen 58 | Level 2 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle aufwaermen,kraft
- g_band_row | Band Row | Nutzen 55 | Level 1 | Equipment [["eq_band"]] | Rolle kraft,metcon
- g_face_pull | Band Face Pull | Nutzen 52 | Level 1 | Equipment [["eq_band"]] | Rolle aufwaermen,kraft
- g_pullapart | Band Pull-Apart | Nutzen 50 | Level 1 | Equipment [["eq_band"]] | Rolle aufwaermen

### druck_horizontal (23)
- g_planche | Full Planche | Nutzen 94 | Level 5 | Equipment [] | Rolle kraft
- g_push | Push-up | Nutzen 90 | Level 1 | Equipment [] | Rolle kraft,metcon,test
- g_straddle_planche | Straddle Planche | Nutzen 90 | Level 5 | Equipment [] | Rolle kraft
- g_one_arm_push | One-Arm Push-up | Nutzen 86 | Level 5 | Equipment [] | Rolle kraft
- g_adv_tuck_planche | Advanced Tuck Planche | Nutzen 86 | Level 5 | Equipment [] | Rolle kraft
- g_ring_push | Ring Push-up | Nutzen 84 | Level 3 | Equipment [["eq_ringe"]] | Rolle kraft,metcon
- g_push_weighted | Weighted Push-up | Nutzen 82 | Level 3 | Equipment [["eq_weste"]] | Rolle kraft
- g_pseudo_planche_push | Pseudo Planche Push-up | Nutzen 82 | Level 4 | Equipment [] | Rolle kraft
- g_tuck_planche | Tuck Planche | Nutzen 82 | Level 4 | Equipment [] | Rolle kraft
- g_push_parallettes | Parallette Push-up | Nutzen 80 | Level 2 | Equipment [["eq_parallettes"]] | Rolle kraft,metcon
- g_push_decline | Decline Push-up | Nutzen 80 | Level 2 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon
- g_push_band | Banded Push-up | Nutzen 78 | Level 3 | Equipment [["eq_band"]] | Rolle kraft
- g_archer_push | Archer Push-up | Nutzen 78 | Level 3 | Equipment [] | Rolle kraft
- g_diamond_push | Diamond Push-up | Nutzen 76 | Level 2 | Equipment [] | Rolle kraft,metcon
- g_planche_lean | Planche Lean | Nutzen 74 | Level 3 | Equipment [] | Rolle aufwaermen,kraft,test
- g_plyo_push | Plyo Push-up | Nutzen 72 | Level 3 | Equipment [] | Rolle kraft,metcon
- g_hand_release_push | Hand-Release Push-up | Nutzen 70 | Level 2 | Equipment [] | Rolle metcon
- g_one_arm_push_incline | Incline One-Arm Push-up | Nutzen 70 | Level 3 | Equipment [["eq_zuhause"]] | Rolle kraft
- g_bench_press | Bench Press | Nutzen 70 | Level 3 | Equipment [["eq_langhantel"],["eq_bank"],["eq_rack"]] | Rolle kraft
- g_floor_press | Dumbbell Floor Press | Nutzen 66 | Level 2 | Equipment [["eq_kurzhanteln"]] | Rolle kraft
- g_push_knee | Knee Push-up | Nutzen 60 | Level 1 | Equipment [] | Rolle kraft,metcon
- g_push_negative | Negative Push-up | Nutzen 60 | Level 1 | Equipment [] | Rolle kraft
- g_push_incline | Incline Push-up | Nutzen 58 | Level 1 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon

### druck_vertikal (20)
- g_dip | Ring Dip | Nutzen 92 | Level 3 | Equipment [["eq_ringe"]] | Rolle kraft,metcon,test
- g_weighted_dip | Weighted Dip | Nutzen 90 | Level 4 | Equipment [["eq_ringe","eq_barren"],["eq_weste","eq_dipguertel"]] | Rolle kraft,test
- g_hspu | Strict Handstand Push-up | Nutzen 90 | Level 4 | Equipment [] | Rolle kraft,metcon,test
- g_bar_dip | Parallel Bar Dip | Nutzen 88 | Level 3 | Equipment [["eq_barren"]] | Rolle kraft,metcon
- g_freestanding_hspu | Freestanding Handstand Push-up | Nutzen 88 | Level 5 | Equipment [] | Rolle kraft
- g_deficit_hspu | Deficit Handstand Push-up | Nutzen 86 | Level 5 | Equipment [["eq_parallettes"]] | Rolle kraft
- g_pike | Pike Push-up | Nutzen 80 | Level 2 | Equipment [] | Rolle kraft,metcon
- g_hspu_negative | Negative Handstand Push-up | Nutzen 78 | Level 4 | Equipment [] | Rolle kraft
- g_strict_press | Strict Press | Nutzen 78 | Level 3 | Equipment [["eq_langhantel"]] | Rolle kraft,test
- g_push_jerk | Push Jerk | Nutzen 78 | Level 4 | Equipment [["eq_langhantel"]] | Rolle kraft,metcon
- g_push_press | Push Press | Nutzen 76 | Level 3 | Equipment [["eq_langhantel","eq_kurzhanteln"]] | Rolle kraft,metcon
- g_split_jerk | Split Jerk | Nutzen 76 | Level 4 | Equipment [["eq_langhantel"]] | Rolle kraft
- g_straight_bar_dip | Straight Bar Dip | Nutzen 74 | Level 3 | Equipment [["eq_klimmzugstange"]] | Rolle kraft
- g_rto_support | RTO Support Hold | Nutzen 72 | Level 3 | Equipment [["eq_ringe"]] | Rolle kraft
- g_wall_walk | Wall Walk | Nutzen 72 | Level 2 | Equipment [] | Rolle metcon
- g_kipping_hspu | Kipping Handstand Push-up | Nutzen 72 | Level 4 | Equipment [] | Rolle metcon
- g_support_hold | Ring Support Hold | Nutzen 70 | Level 1 | Equipment [["eq_ringe"]] | Rolle kraft,aufwaermen
- g_db_press | Dumbbell Shoulder Press | Nutzen 68 | Level 2 | Equipment [["eq_kurzhanteln","eq_kettlebell"]] | Rolle kraft
- g_band_press | Band Overhead Press | Nutzen 52 | Level 1 | Equipment [["eq_band"]] | Rolle kraft,metcon
- g_bench_dip | Bench Dip | Nutzen 45 | Level 1 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon

### kniebeuge (9)
- g_back_squat | Back Squat | Nutzen 88 | Level 3 | Equipment [["eq_langhantel"],["eq_rack"]] | Rolle kraft,test
- g_front_squat | Front Squat | Nutzen 86 | Level 3 | Equipment [["eq_langhantel"]] | Rolle kraft,test
- g_thruster | Thruster | Nutzen 82 | Level 3 | Equipment [["eq_langhantel","eq_kurzhanteln","eq_kettlebell"]] | Rolle metcon
- g_goblet_squat | Goblet Squat | Nutzen 80 | Level 2 | Equipment [["eq_kettlebell","eq_kurzhanteln","eq_wallball","eq_sandsack"]] | Rolle kraft,metcon
- g_overhead_squat | Overhead Squat | Nutzen 80 | Level 4 | Equipment [["eq_langhantel","eq_pvc"]] | Rolle kraft
- g_wall_ball | Wall Ball Shot | Nutzen 78 | Level 2 | Equipment [["eq_wallball"]] | Rolle metcon
- g_air | Air Squat | Nutzen 75 | Level 1 | Equipment [] | Rolle kraft,metcon,aufwaermen
- g_box_squat | Box Squat | Nutzen 55 | Level 1 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon
- g_wall_sit | Wall Sit | Nutzen 45 | Level 1 | Equipment [] | Rolle metcon

### einbein (10)
- g_pistol | Pistol Squat | Nutzen 86 | Level 3 | Equipment [] | Rolle kraft,metcon
- g_bss | Bulgarian Split Squat | Nutzen 84 | Level 2 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon
- g_shrimp | Shrimp Squat | Nutzen 82 | Level 3 | Equipment [] | Rolle kraft
- g_lunge | Reverse Lunge | Nutzen 72 | Level 1 | Equipment [] | Rolle kraft,metcon
- g_walking_lunge | Walking Lunge | Nutzen 72 | Level 2 | Equipment [] | Rolle metcon
- g_pistol_box | Box Pistol Squat | Nutzen 70 | Level 2 | Equipment [["eq_zuhause"]] | Rolle kraft
- g_pistol_assisted | Assisted Pistol Squat | Nutzen 66 | Level 2 | Equipment [["eq_zuhause","eq_ringe"]] | Rolle kraft
- g_step_up | Step-up | Nutzen 66 | Level 1 | Equipment [["eq_zuhause","eq_box"]] | Rolle kraft,metcon
- g_cossack | Cossack Squat | Nutzen 66 | Level 2 | Equipment [] | Rolle aufwaermen,kraft,ruhetag
- g_split_squat | Split Squat | Nutzen 64 | Level 1 | Equipment [] | Rolle kraft,metcon

### huefte (15)
- g_deadlift | Deadlift | Nutzen 92 | Level 3 | Equipment [["eq_langhantel"]] | Rolle kraft,test
- g_kb_swing | Kettlebell Swing | Nutzen 85 | Level 2 | Equipment [["eq_kettlebell"]] | Rolle metcon,kraft
- g_rdl | Romanian Deadlift | Nutzen 78 | Level 2 | Equipment [["eq_langhantel","eq_kurzhanteln","eq_kettlebell"]] | Rolle kraft
- g_hip_thrust | Hip Thrust | Nutzen 76 | Level 2 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon
- g_american_swing | American Kettlebell Swing | Nutzen 74 | Level 3 | Equipment [["eq_kettlebell"]] | Rolle metcon
- g_single_arm_swing | Single-Arm Kettlebell Swing | Nutzen 72 | Level 3 | Equipment [["eq_kettlebell"]] | Rolle metcon
- g_single_leg_rdl | Single-Leg Romanian Deadlift | Nutzen 70 | Level 2 | Equipment [] | Rolle kraft,aufwaermen
- g_bridge | Glute Bridge | Nutzen 70 | Level 1 | Equipment [] | Rolle kraft,metcon
- g_sdhp | Sumo Deadlift High Pull | Nutzen 70 | Level 3 | Equipment [["eq_langhantel","eq_kettlebell"]] | Rolle metcon
- g_kb_deadlift | Kettlebell Deadlift | Nutzen 66 | Level 1 | Equipment [["eq_kettlebell","eq_kurzhanteln"]] | Rolle kraft,metcon
- g_db_swing | Dumbbell Swing | Nutzen 66 | Level 2 | Equipment [["eq_kurzhanteln"]] | Rolle metcon
- g_ghd_hip_ext | GHD Hip Extension | Nutzen 60 | Level 2 | Equipment [["eq_ghd"]] | Rolle metcon,kraft
- g_band_pull_through | Band Pull-Through | Nutzen 54 | Level 1 | Equipment [["eq_band"]] | Rolle aufwaermen,metcon
- g_band_good_morning | Band Good Morning | Nutzen 52 | Level 1 | Equipment [["eq_band"]] | Rolle aufwaermen,kraft
- g_superman | Superman Hold | Nutzen 48 | Level 1 | Equipment [] | Rolle aufwaermen,kraft

### beinbeuger (4)
- g_nordic | Nordic Curl | Nutzen 86 | Level 2 | Equipment [["eq_zuhause"]] | Rolle kraft
- g_single_slider_curl | Single-Leg Slider Curl | Nutzen 76 | Level 2 | Equipment [["eq_zuhause"]] | Rolle kraft
- g_ring_leg_curl | Ring Leg Curl | Nutzen 74 | Level 2 | Equipment [["eq_ringe"]] | Rolle kraft
- g_slider_curl | Slider Leg Curl | Nutzen 70 | Level 1 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon

### rumpf_anti_streckung (12)
- g_abwheel_standing | Standing Ab Wheel Rollout | Nutzen 86 | Level 5 | Equipment [["eq_abwheel"]] | Rolle kraft
- g_dragon_flag | Dragon Flag | Nutzen 84 | Level 5 | Equipment [["eq_zuhause","eq_sprossenwand","eq_bank"]] | Rolle kraft
- g_abwheel | Ab Wheel Rollout | Nutzen 82 | Level 2 | Equipment [["eq_abwheel"]] | Rolle kraft,test
- g_dragon_flag_raise | Dragon Flag Raise | Nutzen 80 | Level 4 | Equipment [["eq_zuhause","eq_sprossenwand","eq_bank"]] | Rolle kraft
- g_hollow | Hollow Body Hold | Nutzen 78 | Level 1 | Equipment [] | Rolle kraft,metcon,test,aufwaermen
- g_ring_fallout | Ring Fallout | Nutzen 76 | Level 2 | Equipment [["eq_ringe"]] | Rolle kraft
- g_dragon_flag_tuck | Tuck Dragon Flag | Nutzen 74 | Level 3 | Equipment [["eq_zuhause","eq_sprossenwand","eq_bank"]] | Rolle kraft
- g_hollow_rock | Hollow Rock | Nutzen 70 | Level 2 | Equipment [] | Rolle metcon
- g_body_saw | Body Saw | Nutzen 66 | Level 2 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon
- g_bear_crawl | Bear Crawl | Nutzen 62 | Level 1 | Equipment [] | Rolle metcon,aufwaermen
- g_dead_bug | Dead Bug | Nutzen 60 | Level 1 | Equipment [] | Rolle aufwaermen,kraft
- g_plank | Plank | Nutzen 58 | Level 1 | Equipment [] | Rolle kraft,metcon,aufwaermen

### rumpf_beugung (16)
- g_lsit | L-Sit | Nutzen 84 | Level 3 | Equipment [["eq_parallettes","eq_barren","eq_zuhause"]] | Rolle kraft,metcon,test
- g_ring_lsit | Ring L-Sit | Nutzen 82 | Level 4 | Equipment [["eq_ringe"]] | Rolle kraft
- g_toes_to_bar | Toes to Bar | Nutzen 80 | Level 4 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft,metcon
- g_v_sit | V-Sit | Nutzen 80 | Level 5 | Equipment [["eq_parallettes","eq_zuhause"]] | Rolle kraft
- g_leg_raise | Hanging Leg Raise | Nutzen 76 | Level 3 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft,metcon
- g_kneeraise | Hanging Knee Raise | Nutzen 72 | Level 2 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle kraft,metcon
- g_slider_pike | Slider Pike | Nutzen 70 | Level 2 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon
- g_tuck_lsit | Tuck L-Sit | Nutzen 68 | Level 2 | Equipment [["eq_parallettes","eq_barren","eq_zuhause"]] | Rolle kraft
- g_kipping_t2b | Kipping Toes to Bar | Nutzen 66 | Level 3 | Equipment [["eq_klimmzugstange"]] | Rolle metcon
- g_knees_to_elbows | Knees to Elbows | Nutzen 64 | Level 3 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle metcon
- g_compression | Compression Leg Lift | Nutzen 64 | Level 1 | Equipment [] | Rolle aufwaermen,kraft
- g_tuck | Slider Knee Tuck | Nutzen 62 | Level 1 | Equipment [["eq_zuhause"]] | Rolle kraft,metcon
- g_v_up | V-up | Nutzen 62 | Level 2 | Equipment [] | Rolle metcon
- g_ghd_sit_up | GHD Sit-up | Nutzen 58 | Level 3 | Equipment [["eq_ghd"]] | Rolle metcon
- g_tuck_up | Tuck-up | Nutzen 54 | Level 1 | Equipment [] | Rolle metcon
- g_sit_up | AbMat Sit-up | Nutzen 50 | Level 1 | Equipment [] | Rolle metcon

### rumpf_rotation (6)
- g_human_flag | Human Flag | Nutzen 80 | Level 5 | Equipment [["eq_sprossenwand","eq_klimmzugstange"]] | Rolle kraft
- g_turkish_getup | Turkish Get-up | Nutzen 78 | Level 3 | Equipment [["eq_kettlebell","eq_kurzhanteln"]] | Rolle kraft
- g_flag_tuck | Tuck Human Flag | Nutzen 72 | Level 4 | Equipment [["eq_sprossenwand","eq_klimmzugstange"]] | Rolle kraft
- g_pallof | Pallof Press | Nutzen 62 | Level 1 | Equipment [["eq_band"]] | Rolle kraft,aufwaermen
- g_side_plank | Side Plank | Nutzen 60 | Level 1 | Equipment [] | Rolle kraft,aufwaermen
- g_russian_twist | Russian Twist | Nutzen 50 | Level 1 | Equipment [] | Rolle metcon

### handstand_skill (5)
- g_free_handstand | Freestanding Handstand | Nutzen 88 | Level 4 | Equipment [] | Rolle kraft,test
- g_handstand | Handstand | Nutzen 85 | Level 2 | Equipment [] | Rolle kraft,test
- g_handstand_walk | Handstand Walk | Nutzen 76 | Level 4 | Equipment [] | Rolle metcon
- g_kick_up | Handstand Kick-up | Nutzen 72 | Level 3 | Equipment [] | Rolle kraft
- g_crow | Crow Pose | Nutzen 52 | Level 1 | Equipment [] | Rolle kraft,aufwaermen

### sprung (11)
- g_double_under | Double-Under | Nutzen 74 | Level 3 | Equipment [["eq_springseil"]] | Rolle metcon
- g_box_jump | Box Jump | Nutzen 72 | Level 2 | Equipment [["eq_box","eq_zuhause"]] | Rolle metcon
- g_broad_jump | Broad Jump | Nutzen 70 | Level 2 | Equipment [] | Rolle metcon,kraft
- g_box_jump_over | Box Jump Over | Nutzen 68 | Level 3 | Equipment [["eq_box"]] | Rolle metcon
- g_squatjump | Squat Jump | Nutzen 66 | Level 1 | Equipment [] | Rolle aufwaermen,metcon
- g_skater | Skater Jump | Nutzen 64 | Level 1 | Equipment [] | Rolle aufwaermen,metcon
- g_jumping_lunge | Jumping Lunge | Nutzen 64 | Level 2 | Equipment [] | Rolle metcon
- g_single_under | Single-Under | Nutzen 64 | Level 1 | Equipment [["eq_springseil"]] | Rolle aufwaermen,metcon
- g_tuck_jump | Tuck Jump | Nutzen 62 | Level 2 | Equipment [] | Rolle metcon
- g_pogo | Pogo Hop | Nutzen 50 | Level 1 | Equipment [] | Rolle aufwaermen
- g_jumping_jack | Jumping Jack | Nutzen 40 | Level 1 | Equipment [] | Rolle aufwaermen,metcon

### olympisch (14)
- g_clean_and_jerk | Clean and Jerk | Nutzen 90 | Level 5 | Equipment [["eq_langhantel"]] | Rolle kraft,test
- g_squat_clean | Squat Clean | Nutzen 88 | Level 4 | Equipment [["eq_langhantel"]] | Rolle kraft,metcon
- g_squat_snatch | Squat Snatch | Nutzen 88 | Level 5 | Equipment [["eq_langhantel"]] | Rolle kraft
- g_power_clean | Power Clean | Nutzen 86 | Level 3 | Equipment [["eq_langhantel"]] | Rolle kraft,metcon
- g_power_snatch | Power Snatch | Nutzen 86 | Level 4 | Equipment [["eq_langhantel"]] | Rolle kraft,metcon
- g_hang_power_clean | Hang Power Clean | Nutzen 82 | Level 3 | Equipment [["eq_langhantel"]] | Rolle kraft,metcon
- g_hang_power_snatch | Hang Power Snatch | Nutzen 82 | Level 3 | Equipment [["eq_langhantel"]] | Rolle kraft,metcon
- g_db_snatch | Dumbbell Snatch | Nutzen 80 | Level 2 | Equipment [["eq_kurzhanteln","eq_kettlebell"]] | Rolle metcon
- g_kb_snatch | Kettlebell Snatch | Nutzen 78 | Level 3 | Equipment [["eq_kettlebell"]] | Rolle metcon
- g_db_clean_jerk | Dumbbell Clean and Jerk | Nutzen 76 | Level 2 | Equipment [["eq_kurzhanteln"]] | Rolle metcon
- g_devil_press | Devil Press | Nutzen 74 | Level 4 | Equipment [["eq_kurzhanteln"]] | Rolle metcon
- g_kb_clean | Kettlebell Clean | Nutzen 70 | Level 2 | Equipment [["eq_kettlebell"]] | Rolle metcon
- g_med_ball_clean | Medicine Ball Clean | Nutzen 60 | Level 1 | Equipment [["eq_wallball","eq_sandsack"]] | Rolle metcon
- g_burgener | Burgener Warm-up | Nutzen 56 | Level 1 | Equipment [["eq_pvc","eq_langhantel"]] | Rolle aufwaermen

### tragen (7)
- g_farmers_carry | Farmer's Carry | Nutzen 76 | Level 1 | Equipment [["eq_kettlebell","eq_kurzhanteln","eq_sandsack"]] | Rolle metcon,kraft
- g_suitcase_carry | Suitcase Carry | Nutzen 74 | Level 2 | Equipment [["eq_kettlebell","eq_kurzhanteln"]] | Rolle metcon,kraft
- g_overhead_carry | Overhead Carry | Nutzen 72 | Level 3 | Equipment [["eq_kettlebell","eq_kurzhanteln"]] | Rolle metcon,kraft
- g_sandbag_carry | Sandbag Bear Hug Carry | Nutzen 72 | Level 2 | Equipment [["eq_sandsack"]] | Rolle metcon,kraft
- g_sandbag_shoulder_carry | Sandbag Shoulder Carry | Nutzen 70 | Level 3 | Equipment [["eq_sandsack"]] | Rolle metcon,kraft
- g_sled_push | Sled Push | Nutzen 64 | Level 2 | Equipment [["eq_schlitten"]] | Rolle metcon
- g_backpack_carry | Backpack Carry | Nutzen 52 | Level 1 | Equipment [["eq_zuhause"]] | Rolle metcon

### ausdauer (12)
- g_run | Run | Nutzen 82 | Level 1 | Equipment [] | Rolle metcon,kraft,test
- g_row_erg | Row | Nutzen 80 | Level 1 | Equipment [["eq_rudergeraet"]] | Rolle metcon,kraft
- g_bike_erg | Bike Erg | Nutzen 76 | Level 1 | Equipment [["eq_ergometer"]] | Rolle metcon,aufwaermen,kraft
- g_burpee | Burpee | Nutzen 74 | Level 2 | Equipment [] | Rolle metcon
- g_ski_erg | Ski Erg | Nutzen 72 | Level 1 | Equipment [["eq_skierg"]] | Rolle metcon
- g_burpee_pullup | Burpee Pull-up | Nutzen 72 | Level 3 | Equipment [["eq_ringe","eq_klimmzugstange"]] | Rolle metcon
- g_burpee_box_jump_over | Burpee Box Jump Over | Nutzen 68 | Level 3 | Equipment [["eq_box"]] | Rolle metcon
- g_shuttle_run | Shuttle Run | Nutzen 60 | Level 1 | Equipment [] | Rolle metcon
- g_ball_slam | Ball Slam | Nutzen 60 | Level 1 | Equipment [["eq_slamball","eq_sandsack"]] | Rolle metcon
- g_burpee_stepback | Step-back Burpee | Nutzen 56 | Level 1 | Equipment [] | Rolle metcon
- g_stair_climb | Stair Climb | Nutzen 56 | Level 1 | Equipment [["eq_zuhause"]] | Rolle metcon
- g_mountain_climber | Mountain Climber | Nutzen 52 | Level 1 | Equipment [] | Rolle metcon,aufwaermen

## Anhang B: Bestehende Leitern
- g_pullup | Ring Pull-up | Stufen: Sehr stark (g_pullup) → Stark (g_pullup) → Normal (g_pullup) → Leicht (g_pullup) → Sehr leicht (g_pullup) → Frei (g_pullup) → Weste (g_pullup)
- g_chinup | Ring Chin-up | Stufen: Sehr stark (g_chinup) → Stark (g_chinup) → Normal (g_chinup) → Leicht (g_chinup) → Sehr leicht (g_chinup) → Frei (g_chinup) → Weste (g_chinup)
- g_row | Ring Row | Stufen: Körper steil (g_row) → Flacher (g_row) → Füße erhöht (g_row) → Weste (g_row)
- g_push | Push-up | Stufen: Auf Knien (g_push_knee) → Boden (g_push) → Parallettes (g_push_parallettes) → Füße erhöht (g_push_decline) → Band (g_push_band) → Weste (g_push_weighted)
- g_dip | Ring Dip | Stufen: Support Hold, 20 s (g_support_hold) → Stark (g_dip) → Normal (g_dip) → Leicht (g_dip) → Frei (g_dip) → Weste (g_dip)
- g_pike | Pike Push-up | Stufen: Füße am Boden (g_pike) → Füße auf Stuhl (g_pike) → Weste (g_pike)
- g_pistol | Pistol Squat | Stufen: Am Türrahmen (g_pistol_assisted) → Auf Stuhl absitzen (g_pistol_box) → Frei (g_pistol) → Weste (g_pistol)
- g_bss | Bulgarian Split Squat | Stufen: Normal (g_bss) → 3 s absenken (g_bss) → Shrimp Squat (g_shrimp) → Weste (g_shrimp)
- g_lunge | Reverse Lunge | Stufen: Normal (g_lunge) → 3 s absenken (g_lunge) → Weste (g_lunge)
- g_nordic | Nordic Curl | Stufen: Früh abfangen (g_nordic) → Tiefer absenken (g_nordic) → Volle Bewegung (g_nordic) → Weste (g_nordic)
- g_bridge | Glute Bridge | Stufen: Beidbeinig (g_bridge) → Einbeinig (g_bridge) → Oben 2 s halten (g_bridge) → Band (g_bridge) → Weste auf Hüfte (g_bridge)
- g_hollow | Hollow Body Hold | Stufen: Knie angezogen (g_hollow) → Beine gestreckt (g_hollow) → Arme über Kopf (g_hollow) → 30 s sauber (g_hollow)
- g_kneeraise | Hanging Knee Raise | Stufen: Knee Raise (g_kneeraise) → Leg Raise (g_leg_raise) → Toes to Rings (g_toes_to_bar)
- g_abwheel | Ab Wheel Rollout | Stufen: Bis zur Wand (g_abwheel) → Voller Weg (g_abwheel) → Weste (g_abwheel)
- g_tuck | Slider Knee Tuck | Stufen: Knee Tuck (g_tuck) → Slider Pike (g_slider_pike) → Weste (g_slider_pike)
- g_handstand | Handstand | Stufen: Face-to-Wall (g_handstand) → 1 Fußlänge, 30 s (g_handstand) → Fuß-Taps (g_handstand) → Frei (g_free_handstand)
- g_ring_muscle_up | Ring Muscle-up | Stufen: False Grip Hang (g_false_grip_hang) → False Grip Chin-up (g_false_grip_chinup) → Transition (g_ring_mu_transition) → Banded Ring Muscle-up (g_ring_mu_band) → Ring Muscle-up (g_ring_muscle_up)
- g_bar_muscle_up | Bar Muscle-up | Stufen: Chest-to-Bar (g_chest_to_bar) → Explosive Pull-up (g_explosive_pullup) → Straight Bar Dip (g_straight_bar_dip) → Bar Muscle-up (g_bar_muscle_up)
- g_one_arm_pullup | One-Arm Pull-up | Stufen: Archer Pull-up (g_archer_pullup) → Assisted One-Arm Pull-up (g_one_arm_pullup_assisted) → One-Arm Pull-up (g_one_arm_pullup)
- g_kipping_pullup | Kipping Pull-up | Stufen: Kip Swing (g_kip_swing) → Kipping Pull-up (g_kipping_pullup) → Chest-to-Bar (g_chest_to_bar) → Butterfly (g_butterfly_pullup)
- g_rope_climb | Rope Climb | Stufen: Pull-up frei (g_pullup) → Rope Climb (g_rope_climb) → Legless (g_legless_rope_climb)
- g_front_lever | Front Lever | Stufen: Tuck (g_front_lever_tuck) → Advanced Tuck (g_front_lever_adv) → Einbeinig (g_front_lever_one_leg) → Voll (g_front_lever)
- g_back_lever | Back Lever | Stufen: German Hang (g_german_hang) → Tuck (g_back_lever_tuck) → Advanced Tuck (g_back_lever_adv) → Voll (g_back_lever)
- g_one_arm_row | One-Arm Ring Row | Stufen: Archer Ring Row (g_archer_row) → One-Arm Ring Row (g_one_arm_row) → Tuck Front Lever Row (g_tuck_fl_row)
- g_one_arm_push | One-Arm Push-up | Stufen: Archer Push-up (g_archer_push) → Incline One-Arm Push-up (g_one_arm_push_incline) → One-Arm Push-up (g_one_arm_push)
- g_planche | Planche | Stufen: Planche Lean (g_planche_lean) → Pseudo Planche Push-up (g_pseudo_planche_push) → Tuck (g_tuck_planche) → Advanced Tuck (g_adv_tuck_planche) → Straddle (g_straddle_planche) → Full Planche (g_planche)
- g_hspu | Strict Handstand Push-up | Stufen: Wall Walk (g_wall_walk) → Negative (g_hspu_negative) → Strict Handstand Push-up (g_hspu) → Deficit (g_deficit_hspu) → Freestanding (g_freestanding_hspu)
- g_bar_dip | Parallel Bar Dip | Stufen: Bench Dip (g_bench_dip) → Parallel Bar Dip (g_bar_dip) → Weighted Dip (g_weighted_dip)
- g_strict_press | Strict Press | Stufen: Band Press (g_band_press) → Dumbbell Press (g_db_press) → Strict Press (g_strict_press) → Push Press (g_push_press) → Push Jerk (g_push_jerk) → Split Jerk (g_split_jerk)
- g_air | Air Squat | Stufen: Box Squat (g_box_squat) → Air Squat (g_air) → Weste (g_air) → Goblet Squat (g_goblet_squat)
- g_back_squat | Back Squat | Stufen: Goblet Squat (g_goblet_squat) → Front Squat (g_front_squat) → Back Squat (g_back_squat) → Overhead Squat (g_overhead_squat)
- g_thruster | Thruster | Stufen: Air Squat (g_air) → Wall Ball Shot (g_wall_ball) → Thruster (g_thruster)
- g_kb_swing | Kettlebell Swing | Stufen: Kettlebell Deadlift (g_kb_deadlift) → Kettlebell Swing (g_kb_swing) → American Swing (g_american_swing) → Single-Arm Swing (g_single_arm_swing) → Kettlebell Snatch (g_kb_snatch)
- g_deadlift | Deadlift | Stufen: Kettlebell Deadlift (g_kb_deadlift) → Romanian Deadlift (g_rdl) → Deadlift (g_deadlift) → Sumo Deadlift High Pull (g_sdhp)
- g_hip_thrust | Hip Thrust | Stufen: Hip Thrust (g_hip_thrust) → Einbeinig (g_hip_thrust) → Weste (g_hip_thrust)
- g_slider_curl | Slider Leg Curl | Stufen: Slider Leg Curl (g_slider_curl) → Single-Leg Slider Curl (g_single_slider_curl) → Ring Leg Curl (g_ring_leg_curl)
- g_dragon_flag | Dragon Flag | Stufen: Tuck Dragon Flag (g_dragon_flag_tuck) → Dragon Flag Raise (g_dragon_flag_raise) → Dragon Flag (g_dragon_flag)
- g_ring_fallout | Ring Fallout | Stufen: Plank (g_plank) → Body Saw (g_body_saw) → Ring Fallout (g_ring_fallout)
- g_lsit | L-Sit | Stufen: Compression Leg Lift (g_compression) → Tuck L-Sit (g_tuck_lsit) → L-Sit (g_lsit) → Ring L-Sit (g_ring_lsit) → V-Sit (g_v_sit)
- g_kipping_t2b | Kipping Toes to Bar | Stufen: Kip Swing (g_kip_swing) → Knees to Elbows (g_knees_to_elbows) → Kipping Toes to Bar (g_kipping_t2b)
- g_v_up | V-up | Stufen: Tuck-up (g_tuck_up) → V-up (g_v_up) → GHD Sit-up (g_ghd_sit_up)
- g_human_flag | Human Flag | Stufen: Side Plank (g_side_plank) → Tuck Human Flag (g_flag_tuck) → Human Flag (g_human_flag)
- g_turkish_getup | Turkish Get-up | Stufen: Pallof Press (g_pallof) → Side Plank (g_side_plank) → Turkish Get-up (g_turkish_getup)
- g_handstand_walk | Handstand Walk | Stufen: Kick-up (g_kick_up) → Freestanding Handstand (g_free_handstand) → Handstand Walk (g_handstand_walk)
- g_double_under | Double-Under | Stufen: Single-Under (g_single_under) → Double-Under (g_double_under)
- g_box_jump | Box Jump | Stufen: Step-up (g_step_up) → Box Jump (g_box_jump) → Box Jump Over (g_box_jump_over) → Burpee Box Jump Over (g_burpee_box_jump_over)
- g_broad_jump | Broad Jump | Stufen: Squat Jump (g_squatjump) → Broad Jump (g_broad_jump) → Tuck Jump (g_tuck_jump)
- g_clean_and_jerk | Clean and Jerk | Stufen: Medicine Ball Clean (g_med_ball_clean) → Hang Power Clean (g_hang_power_clean) → Power Clean (g_power_clean) → Squat Clean (g_squat_clean) → Clean and Jerk (g_clean_and_jerk)
- g_squat_snatch | Squat Snatch | Stufen: Burgener Warm-up (g_burgener) → Overhead Squat (g_overhead_squat) → Hang Power Snatch (g_hang_power_snatch) → Power Snatch (g_power_snatch) → Squat Snatch (g_squat_snatch)
- g_db_snatch | Dumbbell Snatch | Stufen: Dumbbell Clean and Jerk (g_db_clean_jerk) → Dumbbell Snatch (g_db_snatch) → Devil Press (g_devil_press)
- g_farmers_carry | Farmer's Carry | Stufen: Backpack Carry (g_backpack_carry) → Farmer's Carry (g_farmers_carry) → Suitcase Carry (g_suitcase_carry) → Overhead Carry (g_overhead_carry)
- g_sandbag_carry | Sandbag Carry | Stufen: Sandbag Bear Hug Carry (g_sandbag_carry) → Sandbag Shoulder Carry (g_sandbag_shoulder_carry) → Sled Push (g_sled_push)
- g_burpee | Burpee | Stufen: Step-back Burpee (g_burpee_stepback) → Burpee (g_burpee) → Burpee Pull-up (g_burpee_pullup)
- g_run | Run | Stufen: Gehen und Laufen (g_run) → 20 Min am Stück (g_run) → 45 Min am Stück (g_run) → Intervalle (g_run)
