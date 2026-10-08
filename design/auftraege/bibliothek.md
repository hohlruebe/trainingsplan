# Auftrag für Claude Cowork: die größte Übungsbibliothek

Du hilfst mir, die Übungsbibliothek meiner Trainings-App auszubauen. Die App programmiert danach Claude Code. Dein Ergebnis wird direkt von einem Programm eingelesen und geprüft. Halte dich deshalb exakt an das Format unten.

## Hintergrund
- Die App ist ein Coach. Sie plant mein Training selbst, ich entscheide nicht, welche Übung dran ist.
- Plan „Allround“, ein Leben lang, 7-Tage-Durchgänge:
  - Tag 1 Ganzkörper (Zug, Druck, Ausgleich)
  - Tag 2 Kardio locker (Laufen oder Ergometer)
  - Tag 3 Zug
  - Tag 4 frei
  - Tag 5 Kardio intensiv
  - Tag 6 Druck
  - Tag 7 frei
- Krafttage: Aufwärmen, Handstand, Kraft als EMOM (3–6 Wdh. bei RIR 2), danach ein Metcon (AMRAP).
- Für begrenzte Zeit kann ich Ziele dazubuchen (Challenges), z. B. Hyrox, Hindernislauf, Halbmarathon.
- Trainiert wird an verschiedenen Orten (Zuhause, Gym, Park …). Je Ort ist hinterlegt, welche Geräte es gibt. Die App nimmt nur Übungen, für die das Gerät da ist.
- Heute gibt es 265 Übungen (davon 56 Mobility) in 48 Familien. Jede Familie hat Stufen von leicht nach schwer, dazu gleichwertige Varianten und Tempo-Varianten (CrossFit).

## Ziel
1. **Jede Übung bekommt neue Felder,** damit der Coach besser planen kann:
   - Muskeln ausgleichen
   - Gelenke schonen, wenn mir etwas wehtut
   - isolierte, mehrgelenkige und statische Übungen unterscheiden
   - Ermüdung und Technik einschätzen
   - leise Übungen für die Wohnung finden
2. **Die Bibliothek wird die größte, die es in einer Fitness-App gibt.**
   - Ziel ist Vollständigkeit ohne Dubletten: jede echte, verschiedene Übung, jede vollständig beschrieben.
   - Die Masse kommt über viele Pakete und über Geräte, die heute noch fehlen. Typische Gym-Geräte dürfen dazukommen (`geraete_neu`), z. B. Kabelzug, Latzug, Beinpresse, Multipresse, Rudermaschine mit Sitz, Hyperextension-Bank.
   - Qualität geht vor Menge. Sag mir ehrlich, wenn ein Vorschlag nur eine Dublette wäre.

## Neu in der App: „Schmerzen“
An jeder Übung im Training gibt es den Punkt „Schmerzen“. Dort sage ich, wo es wehtut und wie stark:
- **Wo:** Schulter, Ellbogen, Handgelenk, Rücken, Hüfte, Knie, Fuß
- **Wie:** unangenehm oder Schmerz

Der Coach tauscht dann für heute diese Übung gegen eine Variante derselben Familie mit wenig Belastung an dieser Stelle. Gibt es keine, fällt die Übung heute weg. „Schmerzen weg“ nimmt das zurück. Dafür braucht jede Übung das Feld `gelenke`.

## Die Felder einer Übung

### Schon vorhanden (bei neuen Übungen alle ausfüllen)
| Feld | Inhalt |
|------|--------|
| `id` | `g_` + Kleinbuchstaben, Ziffern, `_`. Einmalig, bestehende IDs **nie** ändern |
| `name` | englisch, wie im Sport üblich |
| `muster` | Bewegungsmuster, siehe Anhang A |
| `bereich` | siehe Anhang A |
| `einheit` | `wdh`, `sek`, `kg`, `meter`, `kalorien`, `atemzuege` |
| `rolle` | Liste aus `kraft`, `metcon`, `aufwaermen`, `cooldown`, `ruhetag`, `morgen`, `test` |
| `equipment` | Liste von Gruppen, aus jeder Gruppe reicht ein Gerät. `[]` = ohne Gerät. Nur IDs aus Anhang B |
| `nutzen` | 0–100, Trainingswert für Kraft und Muskelaufbau |
| `level` | 1–5, wie schwer für Einsteiger |
| `voraussetzung` | Liste `{ "leiter": "g_…", "stufe": "Stufenname" }` oder `[]`. Leiter und Stufenname exakt aus Anhang E (z. B. Leiter `g_pullup`, Stufe `Frei` = Pull-up ohne Band) |
| `trainiert` | kurzer Text, z. B. „Rücken, Bizeps, Griff“ |
| `schritte` | 2–4 kurze Sätze, wie es geht |
| `sauber` | ein Satz: woran man saubere Ausführung erkennt |
| `fehler` | ein Satz: häufigster Fehler und Folge |
| `skalierung` | „Leichter: … Schwerer: …“ |

### Neu (für alle 265 bestehenden und alle neuen Übungen)
| Feld | Werte | Bedeutung |
|------|-------|-----------|
| `muskeln` | `{ "primaer": [...], "sekundaer": [...] }` | nur IDs aus der Muskelliste unten, primär 1–3, sekundär 0–4 |
| `gelenke` | `{ "schulter": 0–3, "ellbogen": 0–3, "handgelenk": 0–3, "ruecken": 0–3, "huefte": 0–3, "knie": 0–3, "fuss": 0–3 }` | Belastung bei sauberer Ausführung: 0 kaum, 1 leicht, 2 deutlich, 3 hoch. Immer alle sieben Schlüssel |
| `bewegt` | Liste aus denselben sieben Gelenken, z. B. `["schulter", "ellbogen"]` | Gelenke, die sich in der Übung sichtbar bewegen. Halteübungen `[]`. Daraus leitet die App ab: genau ein Gelenk = isoliert, mehrere = mehrgelenkig, keins = statisch |
| `sehne` | 0, 1 oder 2 | wie lange Sehnen und Bänder zum Anpassen brauchen: 0 normal (2 Wochen je Stufe), 1 erhöht (4 Wochen, z. B. Ringe, Sprünge), 2 hoch (6 Wochen, z. B. Planche, Front Lever, Nordic Curl) |
| `ermuedung` | 1, 2 oder 3 | wie sehr die Übung den ganzen Körper ermüdet (1 kaum, 3 stark, z. B. Thruster, Burpee, Deadlift schwer) |
| `technik` | 1–5 | wie viel Technik nötig ist, unabhängig von der Kraft (Snatch 5, Push-up 1) |
| `seitig` | `true` / `false` | `true` = einseitig, wird je Seite gemacht |
| `laut` | `true` / `false` | `true` = Sprünge, Gewicht fallen lassen, Stampfen; nicht für die Wohnung am Abend |
| `rx` | `{ "m": kg, "w": kg }` oder `null` | nur bei Metcon-Übungen mit Gewicht: übliches CrossFit-Rx-Gewicht für Männer und Frauen |
| `alias` | Liste | deutsche und gängige andere Namen für die Suche, z. B. `["Klimmzug", "Klimmzüge"]`, sonst `[]` |

**Muskeln (nur diese IDs):**
`brust`, `schulter_vorn`, `schulter_seite`, `schulter_hinten`, `trizeps`, `bizeps`, `unterarm` (Griff), `latissimus`, `oberer_ruecken` (Trapez, Rhomboiden), `rueckenstrecker`, `bauch_gerade`, `bauch_schraeg`, `hueftbeuger`, `gesaess`, `quadrizeps`, `beinbeuger`, `adduktoren`, `abduktoren`, `waden`, `ganzkoerper` (nur bei Kardio-Übungen wie Rudern oder Burpee)

**Gelenke, Hilfe zur Einschätzung:**
- `schulter` 3: Dips tief, Planche, Muscle-up, Snatch, Handstand-Push-up
- `handgelenk` 3: Planche, Handstand, Front Rack mit schwerem Gewicht
- `ruecken` 3: Deadlift schwer, Good Morning, Toes-to-Bar mit Kipping
- `knie` 3: Pistol, Sissy Squat, Box Jump hoch, Jumping Lunge
- `fuss` (Sprunggelenk, Achillessehne) 3: Sprints, Seilspringen lange, Bergsprints
- Mobility-Übungen: Belastung meist 0–1. Die gedehnte Stelle zählt nicht als Belastung.

**Bewegte Gelenke (`bewegt`), Hilfe zur Einschätzung:**
- Nur deutliche, gewollte Bewegungen, keine kleinen Ausgleichsbewegungen.
- `ruecken` nur, wenn sich die Wirbelsäule gewollt beugt, streckt oder dreht (Crunch, Russian Twist, Jefferson Curl), nicht bei neutralem Rücken (Deadlift, Kniebeuge).
- `bewegt` sagt, was sich bewegt; `gelenke` sagt, was belastet wird. Ein Gelenk kann belastet sein, ohne sich zu bewegen (Ellbogen im Front Lever).
- Beispiele: Bizeps-Curl `["ellbogen"]`, Wadenheben `["fuss"]`, Nordic Curl `["knie"]`, Pull-up `["schulter", "ellbogen"]`, Kniebeuge `["huefte", "knie", "fuss"]`, Plank `[]`, Dead Hang `[]`.

**Sehne, Werte aus der App:** Für Leitern gibt es schon eine Tabelle. Übernimm diese Werte unverändert, Abweichungen nur als Grenzfall. Alle anderen Übungen bewertest du selbst nach der Konvention oben.
- 1: `g_pullup`, `g_chinup`, `g_pike`, `g_pistol`, `g_dragon_flag`, `g_lsit`, `g_box_jump`, `g_broad_jump`, `g_double_under`, `g_kneeraise`, `g_abwheel`, `g_kipping_pullup`, `g_kipping_t2b`, `g_handstand`, `g_handstand_walk`, `g_rope_climb`, `g_bar_dip`, `g_one_arm_row`
- 2: `g_dip`, `g_ring_muscle_up`, `g_bar_muscle_up`, `g_front_lever`, `g_back_lever`, `g_planche`, `g_hspu`, `g_nordic`, `g_one_arm_pullup`, `g_one_arm_push`, `g_human_flag`

## Deine Aufgabe

### Ablauf je Paket
- **Ein Paket = ein Bewegungsmuster.** Erst Teil 1 (Felder), dann Teil 2 (neue Übungen) für dasselbe Muster, dann das nächste Muster.
- **Startpaket:** `zug_vertikal` (24 Übungen) als Testlauf. Danach die Reihenfolge aus Anhang D, dann `isolation` (nur Teil 2, siehe Regeln), `mobilitaet` zuletzt.
- **Schritte:**
  1. Recherche: Quellen zu Muskelaktivität und Gelenkbelastung für das Paket.
  2. Grenzfälle hier im Chat vorlegen und auf meine Entscheidung warten.
  3. Erst dann das JSON.
- **Ausgabe:** als Datei zum Herunterladen, Name `felder_<muster>.json` bzw. `neu_<muster>.json`. Nur wenn keine Datei geht: ein einziger Codeblock.
- **Prüfung:** Ich lasse jede Datei durch ein Prüfprogramm laufen. Es meldet jeden Fehler mit Übung und Grund, z. B. „Stufe „Pull-up frei“ gibt es in g_pullup nicht. Gültig: Sehr stark, Stark, Normal, Leicht, Sehr leicht, Frei, Weste“. Dann bekommst du die Liste und korrigierst.

### Teil 1: Neue Felder für die bestehenden Übungen
Für jedes Paket:

1. **Grenzfälle zuerst.**
   - Ein Grenzfall ist z. B. eine Gelenkbelastung zwischen 2 und 3 oder eine unklare Haupt- und Hilfsmuskulatur.
   - Leg mir jeden Grenzfall vor: die Frage in einem Satz, 2–3 Argumente dafür, 2–3 dagegen, deine Empfehlung mit einem Satz Begründung.
   - Warte dann auf meine Entscheidung.
2. **Danach genau ein JSON-Block** `felder_<muster>.json`:

```json
{
  "v": 1,
  "teil": "felder",
  "muster": "zug_vertikal",
  "quelle": "Kurz, worauf die Einschätzung beruht",
  "uebungen": [
    {
      "id": "g_pullup",
      "muskeln": { "primaer": ["latissimus", "bizeps"], "sekundaer": ["oberer_ruecken", "unterarm", "bauch_gerade"] },
      "gelenke": { "schulter": 2, "ellbogen": 2, "handgelenk": 1, "ruecken": 0, "huefte": 0, "knie": 0, "fuss": 0 },
      "bewegt": ["schulter", "ellbogen"],
      "sehne": 1, "ermuedung": 2, "technik": 2, "seitig": false, "laut": false, "rx": null,
      "alias": ["Klimmzug", "Klimmzüge"]
    }
  ],
  "entscheidungen": [ { "frage": "…", "entscheidung": "…", "folge": "…" } ]
}
```

### Teil 2: Neue Übungen
Wieder in Paketen je Bewegungsmuster, erst nach Teil 1.

1. **Vorschlagsliste ohne JSON.**
   - Je Übung: Name, Familie (bestehende `f_…` aus Anhang C oder „neue Familie: Name“), Art (`stufe` mit Platz in der Reihenfolge, `variante` oder `tempo`), Geräte, ein Satz, warum sie fehlt.
   - Dazu Grenzfälle wie in Teil 1, z. B.: Ist das wirklich eine eigene Übung oder nur eine Ausführungsvariante? Neue Familie oder Variante einer bestehenden?
   - Warte auf meine Auswahl.
2. **Danach genau ein JSON-Block** `neu_<muster>.json`:

```json
{
  "v": 1,
  "teil": "neu",
  "muster": "zug_vertikal",
  "quelle": "…",
  "uebungen": [
    { "id": "g_typewriter_pullup", "name": "Typewriter Pull-up", "muster": "zug_vertikal", "bereich": "zug", "einheit": "wdh",
      "rolle": ["kraft"], "equipment": [["eq_klimmzugstange"]], "nutzen": 80, "level": 4, "voraussetzung": [{ "leiter": "g_pullup", "stufe": "Frei" }],
      "trainiert": "Rücken, Bizeps, einseitige Kraft", "schritte": ["…", "…"], "sauber": "…", "fehler": "…", "skalierung": "Leichter: … Schwerer: …",
      "muskeln": { "primaer": ["latissimus"], "sekundaer": ["bizeps", "oberer_ruecken"] },
      "gelenke": { "schulter": 2, "ellbogen": 2, "handgelenk": 1, "ruecken": 0, "huefte": 0, "knie": 0, "fuss": 0 },
      "bewegt": ["schulter", "ellbogen"],
      "sehne": 1, "ermuedung": 2, "technik": 3, "seitig": false, "laut": false, "rx": null, "alias": [] }
  ],
  "familien_ergaenzt": [
    { "familie": "f_pullup", "varianten": [ { "uebung": "g_typewriter_pullup", "art": "stufe", "nach": "g_archer_pullup", "effekt": 82, "ziel": "…", "grund": "…" } ] }
  ],
  "familien_neu": [],
  "geraete_neu": [],
  "entscheidungen": []
}
```

- `familien_ergaenzt`: neue Varianten in bestehenden Familien.
  - Bei `stufe` sagt `nach`, hinter welcher bestehenden Stufe sie einsortiert wird (`null` = ganz vorn). Bestehende Ränge änderst du nicht, die App sortiert neu.
  - Bei `variante` und `tempo`: kein `nach`. Bei `tempo` zusätzlich ein `vermerk`.
- `familien_neu`: ganz neue Familien im Format aus Anhang F.
- `geraete_neu`: nur wenn ein Gerät wirklich fehlt.
  - Format wie in Anhang B: `id` mit `eq_`, `name`, `preis`, `platz`, `warum`.
  - Erst vorschlagen, dann aufnehmen.

## Regeln
- **Bestehendes nie ändern:** IDs, Namen, Stufen, Familien-Zuordnung und Ränge bleiben. Neues kommt nur dazu.
- **Vollständig:** Jedes Feld ausgefüllt, keine Platzhalter wie „…“, keine Kommentare im JSON.
- **Keine Dubletten:**
  - Prüfe Name und Alias gegen Anhang D.
  - Eine andere Griffbreite, ein anderes Tempo oder eine Pause ist nur dann eine eigene Übung, wenn sie im Training wirklich etwas anderes bewirkt.
- **Jede neue Übung steht in genau einer Familie.**
- **Paket `isolation`:** eingelenkige Übungen ohne passendes Muster, z. B. Curls, Trizepsdrücken, Seitheben, Reverse Fly, Wadenheben, Unterarm, Nacken. Jede hat in `bewegt` genau ein Gelenk. Es gibt keine bestehenden Übungen, also nur Teil 2 mit neuen Familien. Der Coach nutzt sie nur als Zusatz oder Ausweichübung, nie als Hauptübung im Kraftteil. Isolationsübungen, die klar zu einem bestehenden Muster gehören (z. B. Nordic Curl in `beinbeuger`), bleiben dort.
- **Equipment:** nur IDs aus Anhang B (oder aus `geraete_neu`). Lieber Alternativen in einer Gruppe als zu viele Pflichtgeräte.
- **Sprache:** `name` englisch, alle anderen Texte deutsch, kurze klare Sätze.
- **Nutzen und Effekt:** an den bestehenden Werten orientieren (Anhang D). Ähnliche Übungen bekommen ähnliche Werte.
- **Quellen:** anerkannt, z. B.
  - Overcoming Gravity, Convict Conditioning, CrossFit Movement Standards
  - NSCA-Grundlagen, Studien zu Muskelaktivität und Gelenkbelastung
  - Kurz nennen in `quelle`.
- **Mobility** (Muster `mobilitaet`): in Teil 1 mit Feldern versehen. Neue Mobility-Übungen in Teil 2 nur, wenn eine Region fehlt.
- **Medizin:** Keine Diagnosen, keine Heilversprechen. `gelenke` beschreibt Belastung, nicht Eignung bei Verletzungen.

## Prüfe vor jeder Ausgabe
- [ ] Jede ID kommt genau einmal vor, keine bestehende ID ist geändert.
- [ ] `muskeln` nur mit IDs aus der Liste, primär 1–3, sekundär 0–4, keine Überschneidung.
- [ ] `gelenke` hat immer alle sieben Schlüssel mit 0–3.
- [ ] `bewegt` ist eine Liste aus diesen sieben Gelenken ohne Doppelte, `[]` bei Halteübungen, im Paket `isolation` genau eines.
- [ ] `sehne` bei Leitern wie in der Tabelle aus der App.
- [ ] `sehne` 0–2, `ermuedung` 1–3, `technik` 1–5, `seitig` und `laut` als `true`/`false`.
- [ ] `rx` nur bei Einheit `kg` und Rolle `metcon`, sonst `null`.
- [ ] Neue Übungen: alle Felder aus beiden Tabellen, `equipment` nur mit vorhandenen IDs.
- [ ] Jede neue Übung steht in genau einer Familie (`familien_ergaenzt` oder `familien_neu`).
- [ ] Jede `voraussetzung` nutzt Leiter und Stufenname exakt aus Anhang E.
- [ ] Alle Grenzfälle sind mir vorgelegt, meine Entscheidungen stehen in `entscheidungen`.

## Anhang A: Werte für `muster` und `bereich`
- `muster`: `mobilitaet`, `zug_vertikal`, `druck_horizontal`, `zug_horizontal`, `druck_vertikal`, `rumpf_beugung`, `huefte`, `olympisch`, `rumpf_anti_streckung`, `ausdauer`, `sprung`, `einbein`, `kniebeuge`, `tragen`, `rumpf_rotation`, `handstand_skill`, `beinbeuger`, `isolation` (neu, nur für neue Übungen)
- `bereich`: `ausdauer`, `beine`, `beweglichkeit`, `druck`, `rumpf`, `skill`, `zug`
- `einheit`: `wdh`, `sek`, `kg`, `meter`, `kalorien`, `atemzuege`

## Anhang B: Geräte
- `eq_zuhause` Zuhause (Stuhl, Sofa, Türrahmen, Wand, Handtuch)
- `eq_laufstrecke` Laufstrecke
- `eq_ringe` Gymnastikringe
- `eq_klimmzugstange` Klimmzugstange
- `eq_kettlebell` Kettlebell
- `eq_band` Widerstandsbänder
- `eq_parallettes` Parallettes
- `eq_springseil` Springseil
- `eq_langhantel` Langhantel mit Scheiben
- `eq_weste` Gewichtsweste
- `eq_kurzhanteln` Kurzhanteln (verstellbar)
- `eq_abwheel` Ab Wheel
- `eq_ergometer` Ergometer-Fahrrad
- `eq_box` Plyo-Box
- `eq_wallball` Medizinball (Wall Ball)
- `eq_sandsack` Sandsack
- `eq_barren` Dip-Barren oder Dipstation
- `eq_dipguertel` Dip-Gürtel
- `eq_rudergeraet` Rudergerät
- `eq_pvc` PVC-Stab
- `eq_rack` Kniebeugenständer oder Rack
- `eq_slamball` Slam Ball
- `eq_skierg` Ski-Ergometer
- `eq_kletterseil` Kletterseil
- `eq_bank` Hantelbank
- `eq_sprossenwand` Sprossenwand
- `eq_schlitten` Schlitten (Sled)
- `eq_ghd` GHD (Glute-Ham-Developer)

## Anhang C: Familien (48)
- `f_pullup` Pull-up · zug_vertikal · Stufen: Dead Hang → Scapular Pull-up → Negative Pull-up → Ring Pull-up → Weighted Pull-up → Archer Pull-up → Assisted One-Arm Pull-up → One-Arm Pull-up
- `f_chinup` Chin-up · zug_vertikal · Stufen: Ring Chin-up
- `f_ring_muscle_up` Ring Muscle-up · zug_vertikal · Stufen: False Grip Hang → False Grip Chin-up → Ring Muscle-up Transition → Banded Ring Muscle-up → Ring Muscle-up
- `f_bar_muscle_up` Bar Muscle-up · zug_vertikal · Stufen: Bar Muscle-up
- `f_rope_climb` Rope Climb · zug_vertikal · Stufen: Rope Climb → Legless Rope Climb
- `f_row` Row · zug_horizontal · Stufen: Ring Row → Archer Ring Row → One-Arm Ring Row → Tuck Front Lever Row
- `f_bent_over_row` Bent-over Row · zug_horizontal · Stufen: Dumbbell Row → Barbell Row
- `f_front_lever` Front Lever · zug_horizontal · Stufen: Tuck Front Lever → Advanced Tuck Front Lever → One-Leg Front Lever → Front Lever
- `f_back_lever` Back Lever · zug_horizontal · Stufen: German Hang → Tuck Back Lever → Advanced Tuck Back Lever → Back Lever
- `f_face_pull` Face Pull · zug_horizontal · Stufen: –
- `f_pushup` Push-up · druck_horizontal · Stufen: Incline Push-up → Knee Push-up → Negative Push-up → Push-up → Parallette Push-up → Decline Push-up → Banded Push-up → Weighted Push-up → Archer Push-up → Incline One-Arm Push-up → One-Arm Push-up
- `f_planche` Planche · druck_horizontal · Stufen: Planche Lean → Pseudo Planche Push-up → Tuck Planche → Advanced Tuck Planche → Straddle Planche → Full Planche
- `f_bench_press` Bench Press · druck_horizontal · Stufen: Dumbbell Floor Press → Bench Press
- `f_dip` Dip · druck_vertikal · Stufen: Bench Dip → Ring Support Hold → RTO Support Hold → Ring Dip → Weighted Dip
- `f_hspu` Handstand Push-up · druck_vertikal · Stufen: Pike Push-up → Wall Walk → Negative Handstand Push-up → Strict Handstand Push-up → Deficit Handstand Push-up → Freestanding Handstand Push-up
- `f_overhead_press` Overhead Press · druck_vertikal · Stufen: Band Overhead Press → Dumbbell Shoulder Press → Strict Press
- `f_squat` Squat · kniebeuge · Stufen: Box Squat → Air Squat → Goblet Squat → Front Squat → Back Squat → Overhead Squat
- `f_thruster` Thruster · kniebeuge · Stufen: Wall Ball Shot → Thruster
- `f_pistol` Pistol Squat · einbein · Stufen: Box Pistol Squat → Assisted Pistol Squat → Pistol Squat
- `f_split_squat` Split Squat · einbein · Stufen: Split Squat → Reverse Lunge → Bulgarian Split Squat
- `f_deadlift` Deadlift · huefte · Stufen: Kettlebell Deadlift → Romanian Deadlift → Deadlift
- `f_kettlebell_swing` Kettlebell Swing · huefte · Stufen: Kettlebell Swing → American Kettlebell Swing → Single-Arm Kettlebell Swing
- `f_hip_thrust` Hip Thrust · huefte · Stufen: Glute Bridge → Hip Thrust
- `f_back_extension` Back Extension · huefte · Stufen: Superman Hold → GHD Hip Extension
- `f_leg_curl` Leg Curl · beinbeuger · Stufen: Slider Leg Curl → Single-Leg Slider Curl → Ring Leg Curl → Nordic Curl
- `f_ab_rollout` Ab Rollout · rumpf_anti_streckung · Stufen: Plank → Body Saw → Ring Fallout → Ab Wheel Rollout → Standing Ab Wheel Rollout
- `f_hollow_body` Hollow Body · rumpf_anti_streckung · Stufen: Dead Bug → Hollow Body Hold
- `f_dragon_flag` Dragon Flag · rumpf_anti_streckung · Stufen: Tuck Dragon Flag → Dragon Flag Raise → Dragon Flag
- `f_lsit` L-Sit · rumpf_beugung · Stufen: Compression Leg Lift → Tuck L-Sit → L-Sit → Ring L-Sit → V-Sit
- `f_toes_to_bar` Toes to Bar · rumpf_beugung · Stufen: Hanging Knee Raise → Hanging Leg Raise → Toes to Bar
- `f_slider_pike` Slider Pike · rumpf_beugung · Stufen: Slider Knee Tuck → Slider Pike
- `f_situp` Sit-up · rumpf_beugung · Stufen: AbMat Sit-up → Tuck-up → V-up → GHD Sit-up
- `f_human_flag` Human Flag · rumpf_rotation · Stufen: Side Plank → Tuck Human Flag → Human Flag
- `f_turkish_getup` Turkish Get-up · rumpf_rotation · Stufen: Pallof Press → Turkish Get-up
- `f_russian_twist` Russian Twist · rumpf_rotation · Stufen: Russian Twist
- `f_handstand` Handstand · handstand_skill · Stufen: Crow Pose → Handstand → Handstand Kick-up → Freestanding Handstand → Handstand Walk
- `f_jump_rope` Jump Rope · sprung · Stufen: Single-Under → Double-Under
- `f_box_jump` Box Jump · sprung · Stufen: Box Jump → Box Jump Over
- `f_jump` Jump · sprung · Stufen: Squat Jump → Broad Jump → Tuck Jump
- `f_clean` Clean · olympisch · Stufen: Medicine Ball Clean → Hang Power Clean → Power Clean → Squat Clean → Clean and Jerk
- `f_snatch` Snatch · olympisch · Stufen: Burgener Warm-up → Hang Power Snatch → Power Snatch → Squat Snatch
- `f_db_snatch` Dumbbell Snatch · olympisch · Stufen: Dumbbell Clean and Jerk → Dumbbell Snatch
- `f_farmers_carry` Farmer's Carry · tragen · Stufen: Backpack Carry → Farmer's Carry → Suitcase Carry → Overhead Carry
- `f_sandbag_carry` Sandbag Carry · tragen · Stufen: Sandbag Bear Hug Carry → Sandbag Shoulder Carry
- `f_run` Run · ausdauer · Stufen: Run
- `f_erg` Erg · ausdauer · Stufen: –
- `f_burpee` Burpee · ausdauer · Stufen: Step-back Burpee → Burpee → Burpee Pull-up
- `f_ball_slam` Ball Slam · ausdauer · Stufen: Ball Slam

## Anhang D: Alle Übungen (265), je Bewegungsmuster
Format: ID | Name | Bereich | Einheit | Nutzen | Level | Equipment | Rolle | Familie

### mobilitaet (56)
- g_overhead_squat_hold | Overhead Deep Squat Hold | beweglichkeit | sek | 85 | 3 | [] | test | –
- g_wall_flexion_liftoff | Wall Flexion Lift-off | beweglichkeit | sek | 80 | 4 | [["eq_zuhause"]] | test | –
- g_shoulder_cars | Shoulder CARs | beweglichkeit | wdh | 80 | 1 | [] | aufwaermen,ruhetag,morgen | –
- g_wrist_extension_stretch | Wrist Extension Stretch | beweglichkeit | sek | 80 | 1 | [] | cooldown,aufwaermen,test | –
- g_knee_to_wall | Knee-to-Wall Mobilization | beweglichkeit | wdh | 80 | 1 | [["eq_zuhause"]] | aufwaermen,ruhetag,test | –
- g_full_bridge | Full Bridge | beweglichkeit | sek | 80 | 4 | [] | test | –
- g_wall_flexion_hold | Wall Flexion Hold | beweglichkeit | sek | 75 | 2 | [["eq_zuhause"]] | test | –
- g_puppy_pose | Puppy Pose | beweglichkeit | sek | 75 | 1 | [] | cooldown,ruhetag | –
- g_prayer_stretch | Prayer Stretch | beweglichkeit | sek | 75 | 1 | [["eq_zuhause"]] | cooldown | –
- g_open_book | Open Book | beweglichkeit | wdh | 75 | 1 | [] | aufwaermen,cooldown,ruhetag | –
- g_ninety_ninety | 90/90 Hip Switch | beweglichkeit | wdh | 75 | 1 | [] | aufwaermen,ruhetag | –
- g_pigeon | Pigeon Stretch | beweglichkeit | sek | 75 | 2 | [] | cooldown | –
- g_hip_cars | Hip CARs | beweglichkeit | wdh | 75 | 2 | [] | aufwaermen,ruhetag | –
- g_half_split | Half Split | beweglichkeit | sek | 75 | 1 | [] | ruhetag,test | –
- g_wall_slide | Wall Slide | beweglichkeit | wdh | 70 | 1 | [["eq_zuhause"]] | aufwaermen,ruhetag,test | –
- g_doorway_pec | Doorway Pec Stretch | beweglichkeit | sek | 70 | 1 | [["eq_zuhause"]] | cooldown | –
- g_thread_needle | Thread the Needle | beweglichkeit | wdh | 70 | 1 | [] | cooldown,ruhetag | –
- g_wrist_rocks | Wrist Rocks | beweglichkeit | wdh | 70 | 1 | [] | aufwaermen,ruhetag,test | –
- g_frog | Frog Stretch | beweglichkeit | sek | 70 | 2 | [] | cooldown,ruhetag | –
- g_hip_flexor_stretch | Half-Kneeling Hip Flexor Stretch | beweglichkeit | sek | 70 | 1 | [] | cooldown | –
- g_lizard | Lizard Stretch | beweglichkeit | sek | 70 | 2 | [] | ruhetag | –
- g_assisted_squat | Assisted Deep Squat | beweglichkeit | sek | 70 | 1 | [["eq_zuhause"]] | test | –
- g_ragdoll | Ragdoll Hang | beweglichkeit | sek | 70 | 1 | [] | ruhetag,test | –
- g_front_split | Front Split Hold | beweglichkeit | sek | 70 | 4 | [["eq_zuhause"]] | test | –
- g_supine_hamstring | Supine Hamstring Stretch | beweglichkeit | sek | 70 | 1 | [["eq_zuhause"]] | cooldown,test | –
- g_calf_wall_stretch | Wall Calf Stretch | beweglichkeit | sek | 70 | 1 | [["eq_zuhause"]] | cooldown,test | –
- g_elevated_bridge | Elevated Bridge | beweglichkeit | sek | 70 | 2 | [["eq_zuhause"]] | test | –
- g_sleeper_stretch | Sleeper Stretch | beweglichkeit | sek | 65 | 2 | [] | ruhetag | –
- g_wrist_flexion_stretch | Wrist Flexion Stretch | beweglichkeit | sek | 65 | 1 | [] | cooldown | –
- g_leg_swings | Leg Swings | beweglichkeit | wdh | 65 | 1 | [] | aufwaermen,morgen | –
- g_wgs | World's Greatest Stretch | skill | wdh | 62 | 1 | [] | aufwaermen | –
- g_stack | Stack Breathing | rumpf | wdh | 60 | 1 | [] | aufwaermen | –
- g_wall_biceps_stretch | Wall Biceps Stretch | beweglichkeit | sek | 60 | 1 | [["eq_zuhause"]] | cooldown | –
- g_triceps_stretch | Overhead Triceps Stretch | beweglichkeit | sek | 60 | 1 | [] | cooldown,test | –
- g_towel_stretch | Towel Shoulder Stretch | beweglichkeit | sek | 60 | 1 | [["eq_zuhause"]] | test | –
- g_butterfly | Butterfly Stretch | beweglichkeit | sek | 60 | 1 | [] | ruhetag | –
- g_ankle_cars | Ankle CARs | beweglichkeit | wdh | 60 | 1 | [] | aufwaermen,morgen | –
- g_cobra | Cobra Stretch | beweglichkeit | sek | 60 | 1 | [] | ruhetag | –
- g_supine_twist | Supine Spinal Twist | beweglichkeit | sek | 60 | 1 | [] | cooldown,ruhetag | –
- g_roll_down | Standing Roll Down | beweglichkeit | wdh | 60 | 1 | [] | morgen | –
- g_glute_bridge_hold | Glute Bridge Hold | beweglichkeit | sek | 60 | 1 | [] | ruhetag,test | –
- g_deep_squat | Deep Squat Hold | skill | sek | 58 | 1 | [] | aufwaermen | –
- g_jefferson_curl | Jefferson Curl | skill | wdh | 58 | 2 | [] | aufwaermen,kraft | –
- g_passthrough | Band Pass-Through | skill | wdh | 56 | 1 | [["eq_band", "eq_pvc"]] | aufwaermen | –
- g_couch_stretch | Couch Stretch | skill | sek | 56 | 1 | [["eq_zuhause"]] | aufwaermen | –
- g_pancake | Pancake Stretch | skill | sek | 56 | 2 | [] | aufwaermen | –
- g_legs_up_wall | Legs-Up-the-Wall | beweglichkeit | atemzuege | 55 | 1 | [["eq_zuhause"]] | cooldown,ruhetag | –
- g_kneeling_shin | Kneeling Shin Stretch | beweglichkeit | sek | 55 | 1 | [] | cooldown,ruhetag | –
- g_childs_pose | Child's Pose | beweglichkeit | sek | 55 | 1 | [] | cooldown,ruhetag | –
- g_scap | Scapular Push-up | druck | wdh | 54 | 1 | [] | aufwaermen | –
- g_wrist_prep | Wrist Prep | skill | sek | 54 | 1 | [] | aufwaermen | –
- g_pike_stretch | Pike Stretch | skill | sek | 54 | 1 | [] | aufwaermen | –
- g_inchworm | Inchworm | skill | wdh | 52 | 1 | [] | aufwaermen,metcon | –
- g_thoracic_rotation | Thoracic Rotation | skill | wdh | 50 | 1 | [] | aufwaermen | –
- g_side_bend | Standing Side Bend | beweglichkeit | wdh | 50 | 1 | [] | morgen | –
- g_cat_cow | Cat-Cow | skill | wdh | 46 | 1 | [] | aufwaermen | –

### zug_vertikal (24)
- g_pullup | Ring Pull-up | zug | wdh | 95 | 2 | [["eq_ringe", "eq_klimmzugstange"]] | kraft,metcon,test | f_pullup
- g_weighted_pullup | Weighted Pull-up | zug | kg | 92 | 4 | [["eq_ringe", "eq_klimmzugstange"], ["eq_weste", "eq_dipguertel"]] | kraft,test | f_pullup
- g_chinup | Ring Chin-up | zug | wdh | 90 | 2 | [["eq_ringe", "eq_klimmzugstange"]] | kraft,metcon,test | f_chinup
- g_ring_muscle_up | Ring Muscle-up | zug | wdh | 88 | 5 | [["eq_ringe"]] | kraft,metcon | f_ring_muscle_up
- g_bar_muscle_up | Bar Muscle-up | zug | wdh | 84 | 5 | [["eq_klimmzugstange"]] | kraft,metcon | f_bar_muscle_up
- g_one_arm_pullup | One-Arm Pull-up | zug | wdh | 82 | 5 | [["eq_klimmzugstange"]] | kraft | f_pullup
- g_explosive_pullup | Explosive Pull-up | zug | wdh | 80 | 4 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_pullup
- g_chest_to_bar | Chest-to-Bar Pull-up | zug | wdh | 78 | 3 | [["eq_klimmzugstange"]] | kraft,metcon | f_pullup
- g_archer_pullup | Archer Pull-up | zug | wdh | 78 | 4 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_pullup
- g_false_grip_chinup | False Grip Chin-up | zug | wdh | 76 | 4 | [["eq_ringe"]] | kraft | f_ring_muscle_up
- g_ring_mu_band | Banded Ring Muscle-up | zug | wdh | 74 | 4 | [["eq_ringe"], ["eq_band"]] | kraft | f_ring_muscle_up
- g_legless_rope_climb | Legless Rope Climb | zug | wdh | 74 | 5 | [["eq_kletterseil"]] | metcon | f_rope_climb
- g_one_arm_pullup_assisted | Assisted One-Arm Pull-up | zug | wdh | 72 | 5 | [["eq_klimmzugstange"], ["eq_band"]] | kraft | f_pullup
- g_pullup_negative | Negative Pull-up | zug | wdh | 70 | 1 | [["eq_ringe", "eq_klimmzugstange"], ["eq_zuhause"]] | kraft | f_pullup
- g_kipping_ring_mu | Kipping Ring Muscle-up | zug | wdh | 70 | 5 | [["eq_ringe"]] | metcon | f_ring_muscle_up
- g_rope_climb | Rope Climb | zug | wdh | 70 | 3 | [["eq_kletterseil"]] | metcon | f_rope_climb
- g_kipping_pullup | Kipping Pull-up | zug | wdh | 68 | 3 | [["eq_klimmzugstange"]] | metcon | f_pullup
- g_ring_mu_transition | Ring Muscle-up Transition | zug | wdh | 66 | 3 | [["eq_ringe"]] | kraft | f_ring_muscle_up
- g_butterfly_pullup | Butterfly Pull-up | zug | wdh | 62 | 4 | [["eq_klimmzugstange"]] | metcon | f_pullup
- g_false_grip_hang | False Grip Hang | zug | sek | 62 | 3 | [["eq_ringe"]] | kraft | f_ring_muscle_up
- g_scap_pull | Scapular Pull-up | zug | wdh | 60 | 1 | [["eq_ringe", "eq_klimmzugstange"]] | aufwaermen,kraft | f_pullup
- g_dead_hang | Dead Hang | zug | sek | 55 | 1 | [["eq_ringe", "eq_klimmzugstange"]] | aufwaermen,cooldown,kraft | f_pullup
- g_band_lat_pulldown | Band Lat Pulldown | zug | wdh | 55 | 1 | [["eq_band"]] | kraft,metcon | f_pullup
- g_kip_swing | Kip Swing | zug | wdh | 55 | 2 | [["eq_klimmzugstange"]] | aufwaermen,metcon | f_pullup

### druck_horizontal (23)
- g_planche | Full Planche | skill | sek | 94 | 5 | [] | kraft | f_planche
- g_push | Push-up | druck | wdh | 90 | 1 | [] | kraft,metcon,test | f_pushup
- g_straddle_planche | Straddle Planche | skill | sek | 90 | 5 | [] | kraft | f_planche
- g_one_arm_push | One-Arm Push-up | druck | wdh | 86 | 5 | [] | kraft | f_pushup
- g_adv_tuck_planche | Advanced Tuck Planche | skill | sek | 86 | 5 | [] | kraft | f_planche
- g_ring_push | Ring Push-up | druck | wdh | 84 | 3 | [["eq_ringe"]] | kraft,metcon | f_pushup
- g_push_weighted | Weighted Push-up | druck | wdh | 82 | 3 | [["eq_weste"]] | kraft | f_pushup
- g_pseudo_planche_push | Pseudo Planche Push-up | druck | wdh | 82 | 4 | [] | kraft | f_planche
- g_tuck_planche | Tuck Planche | skill | sek | 82 | 4 | [] | kraft | f_planche
- g_push_parallettes | Parallette Push-up | druck | wdh | 80 | 2 | [["eq_parallettes"]] | kraft,metcon | f_pushup
- g_push_decline | Decline Push-up | druck | wdh | 80 | 2 | [["eq_zuhause"]] | kraft,metcon | f_pushup
- g_push_band | Banded Push-up | druck | wdh | 78 | 3 | [["eq_band"]] | kraft | f_pushup
- g_archer_push | Archer Push-up | druck | wdh | 78 | 3 | [] | kraft | f_pushup
- g_diamond_push | Diamond Push-up | druck | wdh | 76 | 2 | [] | kraft,metcon | f_pushup
- g_planche_lean | Planche Lean | skill | sek | 74 | 3 | [] | aufwaermen,kraft,test | f_planche
- g_plyo_push | Plyo Push-up | druck | wdh | 72 | 3 | [] | kraft,metcon | f_pushup
- g_hand_release_push | Hand-Release Push-up | druck | wdh | 70 | 2 | [] | metcon | f_pushup
- g_one_arm_push_incline | Incline One-Arm Push-up | druck | wdh | 70 | 3 | [["eq_zuhause"]] | kraft | f_pushup
- g_bench_press | Bench Press | druck | kg | 70 | 3 | [["eq_langhantel"], ["eq_bank"], ["eq_rack"]] | kraft | f_bench_press
- g_floor_press | Dumbbell Floor Press | druck | kg | 66 | 2 | [["eq_kurzhanteln"]] | kraft | f_bench_press
- g_push_knee | Knee Push-up | druck | wdh | 60 | 1 | [] | kraft,metcon | f_pushup
- g_push_negative | Negative Push-up | druck | wdh | 60 | 1 | [] | kraft | f_pushup
- g_push_incline | Incline Push-up | druck | wdh | 58 | 1 | [["eq_zuhause"]] | kraft,metcon | f_pushup

### zug_horizontal (21)
- g_front_lever | Front Lever | skill | sek | 90 | 5 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_front_lever
- g_front_lever_one_leg | One-Leg Front Lever | skill | sek | 86 | 5 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_front_lever
- g_front_lever_adv | Advanced Tuck Front Lever | skill | sek | 84 | 4 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_front_lever
- g_row | Ring Row | zug | wdh | 82 | 1 | [["eq_ringe"]] | kraft,metcon | f_row
- g_back_lever | Back Lever | skill | sek | 82 | 5 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_back_lever
- g_front_lever_tuck | Tuck Front Lever | skill | sek | 80 | 3 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_front_lever
- g_one_arm_row | One-Arm Ring Row | zug | wdh | 78 | 3 | [["eq_ringe"]] | kraft | f_row
- g_tuck_fl_row | Tuck Front Lever Row | skill | wdh | 78 | 4 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_row
- g_australian_pullup | Australian Pull-up | zug | wdh | 76 | 1 | [["eq_klimmzugstange", "eq_barren"]] | kraft,metcon | f_row
- g_back_lever_adv | Advanced Tuck Back Lever | skill | sek | 76 | 4 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_back_lever
- g_archer_row | Archer Ring Row | zug | wdh | 74 | 3 | [["eq_ringe"]] | kraft | f_row
- g_back_lever_tuck | Tuck Back Lever | skill | sek | 72 | 3 | [["eq_ringe", "eq_klimmzugstange"]] | kraft | f_back_lever
- g_barbell_row | Barbell Row | zug | kg | 70 | 3 | [["eq_langhantel"]] | kraft | f_bent_over_row
- g_db_row | Dumbbell Row | zug | kg | 68 | 2 | [["eq_kurzhanteln", "eq_kettlebell"]] | kraft | f_bent_over_row
- g_renegade_row | Renegade Row | zug | wdh | 64 | 3 | [["eq_kurzhanteln", "eq_kettlebell"]] | metcon | f_bent_over_row
- g_table_row | Table Row | zug | wdh | 62 | 1 | [["eq_zuhause"]] | kraft,metcon | f_row
- g_german_hang | German Hang | skill | sek | 58 | 2 | [["eq_ringe", "eq_klimmzugstange"]] | aufwaermen,kraft | f_back_lever
- g_band_row | Band Row | zug | wdh | 55 | 1 | [["eq_band"]] | kraft,metcon | f_row
- g_face_pull | Band Face Pull | zug | wdh | 52 | 1 | [["eq_band"]] | aufwaermen,kraft | f_face_pull
- g_towel_door_row | Towel Door Row | zug | wdh | 52 | 1 | [["eq_zuhause"]] | kraft,metcon | f_row
- g_pullapart | Band Pull-Apart | zug | wdh | 50 | 1 | [["eq_band"]] | aufwaermen | f_face_pull

### druck_vertikal (20)
- g_dip | Ring Dip | druck | wdh | 92 | 3 | [["eq_ringe"]] | kraft,metcon,test | f_dip
- g_weighted_dip | Weighted Dip | druck | kg | 90 | 4 | [["eq_ringe", "eq_barren"], ["eq_weste", "eq_dipguertel"]] | kraft,test | f_dip
- g_hspu | Strict Handstand Push-up | druck | wdh | 90 | 4 | [] | kraft,metcon,test | f_hspu
- g_bar_dip | Parallel Bar Dip | druck | wdh | 88 | 3 | [["eq_barren"]] | kraft,metcon | f_dip
- g_freestanding_hspu | Freestanding Handstand Push-up | druck | wdh | 88 | 5 | [] | kraft | f_hspu
- g_deficit_hspu | Deficit Handstand Push-up | druck | wdh | 86 | 5 | [["eq_parallettes"]] | kraft | f_hspu
- g_pike | Pike Push-up | druck | wdh | 80 | 2 | [] | kraft,metcon | f_hspu
- g_hspu_negative | Negative Handstand Push-up | druck | wdh | 78 | 4 | [] | kraft | f_hspu
- g_strict_press | Strict Press | druck | kg | 78 | 3 | [["eq_langhantel"]] | kraft,test | f_overhead_press
- g_push_jerk | Push Jerk | druck | kg | 78 | 4 | [["eq_langhantel"]] | kraft,metcon | f_overhead_press
- g_push_press | Push Press | druck | kg | 76 | 3 | [["eq_langhantel", "eq_kurzhanteln"]] | kraft,metcon | f_overhead_press
- g_split_jerk | Split Jerk | druck | kg | 76 | 4 | [["eq_langhantel"]] | kraft | f_overhead_press
- g_straight_bar_dip | Straight Bar Dip | druck | wdh | 74 | 3 | [["eq_klimmzugstange"]] | kraft | f_dip
- g_rto_support | RTO Support Hold | druck | sek | 72 | 3 | [["eq_ringe"]] | kraft | f_dip
- g_wall_walk | Wall Walk | skill | wdh | 72 | 2 | [] | metcon | f_hspu
- g_kipping_hspu | Kipping Handstand Push-up | druck | wdh | 72 | 4 | [] | metcon | f_hspu
- g_support_hold | Ring Support Hold | druck | sek | 70 | 1 | [["eq_ringe"]] | kraft,aufwaermen | f_dip
- g_db_press | Dumbbell Shoulder Press | druck | kg | 68 | 2 | [["eq_kurzhanteln", "eq_kettlebell"]] | kraft | f_overhead_press
- g_band_press | Band Overhead Press | druck | wdh | 52 | 1 | [["eq_band"]] | kraft,metcon | f_overhead_press
- g_bench_dip | Bench Dip | druck | wdh | 45 | 1 | [["eq_zuhause"]] | kraft,metcon | f_dip

### rumpf_beugung (16)
- g_lsit | L-Sit | rumpf | sek | 84 | 3 | [["eq_parallettes", "eq_barren", "eq_zuhause"]] | kraft,metcon,test | f_lsit
- g_ring_lsit | Ring L-Sit | rumpf | sek | 82 | 4 | [["eq_ringe"]] | kraft | f_lsit
- g_toes_to_bar | Toes to Bar | rumpf | wdh | 80 | 4 | [["eq_ringe", "eq_klimmzugstange"]] | kraft,metcon | f_toes_to_bar
- g_v_sit | V-Sit | rumpf | sek | 80 | 5 | [["eq_parallettes", "eq_zuhause"]] | kraft | f_lsit
- g_leg_raise | Hanging Leg Raise | rumpf | wdh | 76 | 3 | [["eq_ringe", "eq_klimmzugstange"]] | kraft,metcon | f_toes_to_bar
- g_kneeraise | Hanging Knee Raise | rumpf | wdh | 72 | 2 | [["eq_ringe", "eq_klimmzugstange"]] | kraft,metcon | f_toes_to_bar
- g_slider_pike | Slider Pike | rumpf | wdh | 70 | 2 | [["eq_zuhause"]] | kraft,metcon | f_slider_pike
- g_tuck_lsit | Tuck L-Sit | rumpf | sek | 68 | 2 | [["eq_parallettes", "eq_barren", "eq_zuhause"]] | kraft | f_lsit
- g_kipping_t2b | Kipping Toes to Bar | rumpf | wdh | 66 | 3 | [["eq_klimmzugstange"]] | metcon | f_toes_to_bar
- g_knees_to_elbows | Knees to Elbows | rumpf | wdh | 64 | 3 | [["eq_ringe", "eq_klimmzugstange"]] | metcon | f_toes_to_bar
- g_compression | Compression Leg Lift | rumpf | sek | 64 | 1 | [] | aufwaermen,kraft | f_lsit
- g_tuck | Slider Knee Tuck | rumpf | wdh | 62 | 1 | [["eq_zuhause"]] | kraft,metcon | f_slider_pike
- g_v_up | V-up | rumpf | wdh | 62 | 2 | [] | metcon | f_situp
- g_ghd_sit_up | GHD Sit-up | rumpf | wdh | 58 | 3 | [["eq_ghd"]] | metcon | f_situp
- g_tuck_up | Tuck-up | rumpf | wdh | 54 | 1 | [] | metcon | f_situp
- g_sit_up | AbMat Sit-up | rumpf | wdh | 50 | 1 | [] | metcon | f_situp

### huefte (15)
- g_deadlift | Deadlift | beine | kg | 92 | 3 | [["eq_langhantel"]] | kraft,test | f_deadlift
- g_kb_swing | Kettlebell Swing | beine | wdh | 85 | 2 | [["eq_kettlebell"]] | metcon,kraft | f_kettlebell_swing
- g_rdl | Romanian Deadlift | beine | kg | 78 | 2 | [["eq_langhantel", "eq_kurzhanteln", "eq_kettlebell"]] | kraft | f_deadlift
- g_hip_thrust | Hip Thrust | beine | wdh | 76 | 2 | [["eq_zuhause"]] | kraft,metcon | f_hip_thrust
- g_american_swing | American Kettlebell Swing | beine | wdh | 74 | 3 | [["eq_kettlebell"]] | metcon | f_kettlebell_swing
- g_single_arm_swing | Single-Arm Kettlebell Swing | beine | wdh | 72 | 3 | [["eq_kettlebell"]] | metcon | f_kettlebell_swing
- g_single_leg_rdl | Single-Leg Romanian Deadlift | beine | wdh | 70 | 2 | [] | kraft,aufwaermen | f_deadlift
- g_bridge | Glute Bridge | beine | wdh | 70 | 1 | [] | kraft,metcon | f_hip_thrust
- g_sdhp | Sumo Deadlift High Pull | beine | kg | 70 | 3 | [["eq_langhantel", "eq_kettlebell"]] | metcon | f_deadlift
- g_kb_deadlift | Kettlebell Deadlift | beine | kg | 66 | 1 | [["eq_kettlebell", "eq_kurzhanteln"]] | kraft,metcon | f_deadlift
- g_db_swing | Dumbbell Swing | beine | wdh | 66 | 2 | [["eq_kurzhanteln"]] | metcon | f_kettlebell_swing
- g_ghd_hip_ext | GHD Hip Extension | beine | wdh | 60 | 2 | [["eq_ghd"]] | metcon,kraft | f_back_extension
- g_band_pull_through | Band Pull-Through | beine | wdh | 54 | 1 | [["eq_band"]] | aufwaermen,metcon | f_kettlebell_swing
- g_band_good_morning | Band Good Morning | beine | wdh | 52 | 1 | [["eq_band"]] | aufwaermen,kraft | f_deadlift
- g_superman | Superman Hold | rumpf | sek | 48 | 1 | [] | aufwaermen,kraft | f_back_extension

### olympisch (14)
- g_clean_and_jerk | Clean and Jerk | beine | kg | 90 | 5 | [["eq_langhantel"]] | kraft,test | f_clean
- g_squat_clean | Squat Clean | beine | kg | 88 | 4 | [["eq_langhantel"]] | kraft,metcon | f_clean
- g_squat_snatch | Squat Snatch | beine | kg | 88 | 5 | [["eq_langhantel"]] | kraft | f_snatch
- g_power_clean | Power Clean | beine | kg | 86 | 3 | [["eq_langhantel"]] | kraft,metcon | f_clean
- g_power_snatch | Power Snatch | beine | kg | 86 | 4 | [["eq_langhantel"]] | kraft,metcon | f_snatch
- g_hang_power_clean | Hang Power Clean | beine | kg | 82 | 3 | [["eq_langhantel"]] | kraft,metcon | f_clean
- g_hang_power_snatch | Hang Power Snatch | beine | kg | 82 | 3 | [["eq_langhantel"]] | kraft,metcon | f_snatch
- g_db_snatch | Dumbbell Snatch | beine | kg | 80 | 2 | [["eq_kurzhanteln", "eq_kettlebell"]] | metcon | f_db_snatch
- g_kb_snatch | Kettlebell Snatch | beine | kg | 78 | 3 | [["eq_kettlebell"]] | metcon | f_db_snatch
- g_db_clean_jerk | Dumbbell Clean and Jerk | beine | kg | 76 | 2 | [["eq_kurzhanteln"]] | metcon | f_db_snatch
- g_devil_press | Devil Press | beine | kg | 74 | 4 | [["eq_kurzhanteln"]] | metcon | f_db_snatch
- g_kb_clean | Kettlebell Clean | beine | kg | 70 | 2 | [["eq_kettlebell"]] | metcon | f_clean
- g_med_ball_clean | Medicine Ball Clean | beine | wdh | 60 | 1 | [["eq_wallball", "eq_sandsack"]] | metcon | f_clean
- g_burgener | Burgener Warm-up | skill | wdh | 56 | 1 | [["eq_pvc", "eq_langhantel"]] | aufwaermen | f_snatch

### rumpf_anti_streckung (12)
- g_abwheel_standing | Standing Ab Wheel Rollout | rumpf | wdh | 86 | 5 | [["eq_abwheel"]] | kraft | f_ab_rollout
- g_dragon_flag | Dragon Flag | rumpf | sek | 84 | 5 | [["eq_zuhause", "eq_sprossenwand", "eq_bank"]] | kraft | f_dragon_flag
- g_abwheel | Ab Wheel Rollout | rumpf | wdh | 82 | 2 | [["eq_abwheel"]] | kraft,test | f_ab_rollout
- g_dragon_flag_raise | Dragon Flag Raise | rumpf | wdh | 80 | 4 | [["eq_zuhause", "eq_sprossenwand", "eq_bank"]] | kraft | f_dragon_flag
- g_hollow | Hollow Body Hold | rumpf | sek | 78 | 1 | [] | kraft,metcon,test,aufwaermen | f_hollow_body
- g_ring_fallout | Ring Fallout | rumpf | wdh | 76 | 2 | [["eq_ringe"]] | kraft | f_ab_rollout
- g_dragon_flag_tuck | Tuck Dragon Flag | rumpf | wdh | 74 | 3 | [["eq_zuhause", "eq_sprossenwand", "eq_bank"]] | kraft | f_dragon_flag
- g_hollow_rock | Hollow Rock | rumpf | wdh | 70 | 2 | [] | metcon | f_hollow_body
- g_body_saw | Body Saw | rumpf | wdh | 66 | 2 | [["eq_zuhause"]] | kraft,metcon | f_ab_rollout
- g_bear_crawl | Bear Crawl | rumpf | meter | 62 | 1 | [] | metcon,aufwaermen | f_ab_rollout
- g_dead_bug | Dead Bug | rumpf | wdh | 60 | 1 | [] | aufwaermen,kraft | f_hollow_body
- g_plank | Plank | rumpf | sek | 58 | 1 | [] | kraft,metcon,aufwaermen | f_ab_rollout

### ausdauer (12)
- g_run | Run | ausdauer | meter | 82 | 1 | [["eq_laufstrecke"]] | metcon,kraft,test | f_run
- g_row_erg | Row | ausdauer | kalorien | 80 | 1 | [["eq_rudergeraet"]] | metcon,kraft | f_erg
- g_bike_erg | Bike Erg | ausdauer | kalorien | 76 | 1 | [["eq_ergometer"]] | metcon,aufwaermen,kraft | f_erg
- g_burpee | Burpee | ausdauer | wdh | 74 | 2 | [] | metcon | f_burpee
- g_ski_erg | Ski Erg | ausdauer | kalorien | 72 | 1 | [["eq_skierg"]] | metcon | f_erg
- g_burpee_pullup | Burpee Pull-up | ausdauer | wdh | 72 | 3 | [["eq_ringe", "eq_klimmzugstange"]] | metcon | f_burpee
- g_burpee_box_jump_over | Burpee Box Jump Over | ausdauer | wdh | 68 | 3 | [["eq_box"]] | metcon | f_burpee
- g_shuttle_run | Shuttle Run | ausdauer | meter | 60 | 1 | [] | metcon | f_run
- g_ball_slam | Ball Slam | ausdauer | wdh | 60 | 1 | [["eq_slamball", "eq_sandsack"]] | metcon | f_ball_slam
- g_burpee_stepback | Step-back Burpee | ausdauer | wdh | 56 | 1 | [] | metcon | f_burpee
- g_stair_climb | Stair Climb | ausdauer | meter | 56 | 1 | [["eq_zuhause"]] | metcon | f_run
- g_mountain_climber | Mountain Climber | ausdauer | wdh | 52 | 1 | [] | metcon,aufwaermen | f_burpee

### sprung (11)
- g_double_under | Double-Under | ausdauer | wdh | 74 | 3 | [["eq_springseil"]] | metcon | f_jump_rope
- g_box_jump | Box Jump | beine | wdh | 72 | 2 | [["eq_box", "eq_zuhause"]] | metcon | f_box_jump
- g_broad_jump | Broad Jump | beine | wdh | 70 | 2 | [] | metcon,kraft | f_jump
- g_box_jump_over | Box Jump Over | beine | wdh | 68 | 3 | [["eq_box"]] | metcon | f_box_jump
- g_squatjump | Squat Jump | beine | wdh | 66 | 1 | [] | aufwaermen,metcon | f_jump
- g_skater | Skater Jump | beine | wdh | 64 | 1 | [] | aufwaermen,metcon | f_jump
- g_jumping_lunge | Jumping Lunge | beine | wdh | 64 | 2 | [] | metcon | f_jump
- g_single_under | Single-Under | ausdauer | wdh | 64 | 1 | [["eq_springseil"]] | aufwaermen,metcon | f_jump_rope
- g_tuck_jump | Tuck Jump | beine | wdh | 62 | 2 | [] | metcon | f_jump
- g_pogo | Pogo Hop | beine | wdh | 50 | 1 | [] | aufwaermen | f_jump_rope
- g_jumping_jack | Jumping Jack | ausdauer | wdh | 40 | 1 | [] | aufwaermen,metcon | f_jump_rope

### einbein (10)
- g_pistol | Pistol Squat | beine | wdh | 86 | 3 | [] | kraft,metcon | f_pistol
- g_bss | Bulgarian Split Squat | beine | wdh | 84 | 2 | [["eq_zuhause"]] | kraft,metcon | f_split_squat
- g_shrimp | Shrimp Squat | beine | wdh | 82 | 3 | [] | kraft | f_pistol
- g_lunge | Reverse Lunge | beine | wdh | 72 | 1 | [] | kraft,metcon | f_split_squat
- g_walking_lunge | Walking Lunge | beine | wdh | 72 | 2 | [] | metcon | f_split_squat
- g_pistol_assisted | Assisted Pistol Squat | beine | wdh | 70 | 2 | [["eq_zuhause", "eq_ringe"]] | kraft | f_pistol
- g_pistol_box | Box Pistol Squat | beine | wdh | 66 | 2 | [["eq_zuhause"]] | kraft | f_pistol
- g_step_up | Step-up | beine | wdh | 66 | 1 | [["eq_zuhause", "eq_box"]] | kraft,metcon | f_split_squat
- g_cossack | Cossack Squat | beine | wdh | 66 | 2 | [] | aufwaermen,kraft,ruhetag | f_pistol
- g_split_squat | Split Squat | beine | wdh | 64 | 1 | [] | kraft,metcon | f_split_squat

### kniebeuge (9)
- g_back_squat | Back Squat | beine | kg | 88 | 3 | [["eq_langhantel"], ["eq_rack"]] | kraft,test | f_squat
- g_front_squat | Front Squat | beine | kg | 86 | 3 | [["eq_langhantel"]] | kraft,test | f_squat
- g_thruster | Thruster | beine | kg | 82 | 3 | [["eq_langhantel", "eq_kurzhanteln", "eq_kettlebell"]] | metcon | f_thruster
- g_goblet_squat | Goblet Squat | beine | kg | 80 | 2 | [["eq_kettlebell", "eq_kurzhanteln", "eq_wallball", "eq_sandsack"]] | kraft,metcon | f_squat
- g_overhead_squat | Overhead Squat | beine | kg | 80 | 4 | [["eq_langhantel", "eq_pvc"]] | kraft | f_squat
- g_wall_ball | Wall Ball Shot | beine | wdh | 78 | 2 | [["eq_wallball"]] | metcon | f_thruster
- g_air | Air Squat | beine | wdh | 75 | 1 | [] | kraft,metcon,aufwaermen | f_squat
- g_box_squat | Box Squat | beine | wdh | 55 | 1 | [["eq_zuhause"]] | kraft,metcon | f_squat
- g_wall_sit | Wall Sit | beine | sek | 45 | 1 | [] | metcon | f_squat

### tragen (7)
- g_farmers_carry | Farmer's Carry | rumpf | meter | 76 | 1 | [["eq_kettlebell", "eq_kurzhanteln", "eq_sandsack"]] | metcon,kraft | f_farmers_carry
- g_suitcase_carry | Suitcase Carry | rumpf | meter | 74 | 2 | [["eq_kettlebell", "eq_kurzhanteln"]] | metcon,kraft | f_farmers_carry
- g_overhead_carry | Overhead Carry | rumpf | meter | 72 | 3 | [["eq_kettlebell", "eq_kurzhanteln"]] | metcon,kraft | f_farmers_carry
- g_sandbag_carry | Sandbag Bear Hug Carry | rumpf | meter | 72 | 2 | [["eq_sandsack"]] | metcon,kraft | f_sandbag_carry
- g_sandbag_shoulder_carry | Sandbag Shoulder Carry | rumpf | meter | 70 | 3 | [["eq_sandsack"]] | metcon,kraft | f_sandbag_carry
- g_sled_push | Sled Push | beine | meter | 64 | 2 | [["eq_schlitten"]] | metcon | f_sandbag_carry
- g_backpack_carry | Backpack Carry | rumpf | meter | 52 | 1 | [["eq_zuhause"]] | metcon | f_farmers_carry

### rumpf_rotation (6)
- g_human_flag | Human Flag | skill | sek | 80 | 5 | [["eq_sprossenwand", "eq_klimmzugstange"]] | kraft | f_human_flag
- g_turkish_getup | Turkish Get-up | rumpf | wdh | 78 | 3 | [["eq_kettlebell", "eq_kurzhanteln"]] | kraft | f_turkish_getup
- g_flag_tuck | Tuck Human Flag | skill | sek | 72 | 4 | [["eq_sprossenwand", "eq_klimmzugstange"]] | kraft | f_human_flag
- g_pallof | Pallof Press | rumpf | wdh | 62 | 1 | [["eq_band"]] | kraft,aufwaermen | f_turkish_getup
- g_side_plank | Side Plank | rumpf | sek | 60 | 1 | [] | kraft,aufwaermen | f_human_flag
- g_russian_twist | Russian Twist | rumpf | wdh | 50 | 1 | [] | metcon | f_russian_twist

### handstand_skill (5)
- g_free_handstand | Freestanding Handstand | skill | sek | 88 | 4 | [] | kraft,test | f_handstand
- g_handstand | Handstand | skill | sek | 85 | 2 | [] | kraft,test | f_handstand
- g_handstand_walk | Handstand Walk | skill | meter | 76 | 4 | [] | metcon | f_handstand
- g_kick_up | Handstand Kick-up | skill | wdh | 72 | 3 | [] | kraft | f_handstand
- g_crow | Crow Pose | skill | sek | 52 | 1 | [] | kraft,aufwaermen | f_handstand

### beinbeuger (4)
- g_nordic | Nordic Curl | beine | wdh | 86 | 2 | [["eq_zuhause"]] | kraft | f_leg_curl
- g_single_slider_curl | Single-Leg Slider Curl | beine | wdh | 76 | 2 | [["eq_zuhause"]] | kraft | f_leg_curl
- g_ring_leg_curl | Ring Leg Curl | beine | wdh | 74 | 2 | [["eq_ringe"]] | kraft | f_leg_curl
- g_slider_curl | Slider Leg Curl | beine | wdh | 70 | 1 | [["eq_zuhause"]] | kraft,metcon | f_leg_curl

## Anhang E: Leitern und gültige Stufennamen (64)
Für `voraussetzung`: `leiter` = ID links, `stufe` = einer der Namen rechts, exakt so geschrieben. Reihenfolge von leicht nach schwer.

- `g_pullup` Ring Pull-up: „Sehr stark“ → „Stark“ → „Normal“ → „Leicht“ → „Sehr leicht“ → „Frei“ → „Weste“
- `g_chinup` Ring Chin-up: „Sehr stark“ → „Stark“ → „Normal“ → „Leicht“ → „Sehr leicht“ → „Frei“ → „Weste“
- `g_row` Ring Row: „Körper steil“ → „Flacher“ → „Füße erhöht“ → „Weste“
- `g_push` Push-up: „Auf Knien“ → „Boden“ → „Parallettes“ → „Füße erhöht“ → „Band“ → „Weste“
- `g_dip` Ring Dip: „Support Hold, 20 s“ → „Stark“ → „Normal“ → „Leicht“ → „Frei“ → „Weste“
- `g_pike` Pike Push-up: „Füße am Boden“ → „Füße auf Stuhl“ → „Weste“
- `g_pistol` Pistol Squat: „Auf Stuhl absitzen“ → „Am Türrahmen“ → „Frei“ → „Weste“
- `g_bss` Bulgarian Split Squat: „Normal“ → „3 s absenken“ → „Shrimp Squat“ → „Weste“
- `g_lunge` Reverse Lunge: „Normal“ → „3 s absenken“ → „Weste“
- `g_nordic` Nordic Curl: „Früh abfangen“ → „Tiefer absenken“ → „Volle Bewegung“ → „Weste“
- `g_bridge` Glute Bridge: „Beidbeinig“ → „Einbeinig“ → „Oben 2 s halten“ → „Band“ → „Weste auf Hüfte“
- `g_hollow` Hollow Body Hold: „Knie angezogen“ → „Beine gestreckt“ → „Arme über Kopf“ → „30 s sauber“
- `g_kneeraise` Hanging Knee Raise: „Knee Raise“ → „Leg Raise“ → „Toes to Rings“
- `g_abwheel` Ab Wheel Rollout: „Bis zur Wand“ → „Voller Weg“ → „Weste“
- `g_tuck` Slider Knee Tuck: „Knee Tuck“ → „Slider Pike“ → „Weste“
- `g_handstand` Handstand: „Face-to-Wall“ → „1 Fußlänge, 30 s“ → „Fuß-Taps“ → „Frei“
- `g_ring_muscle_up` Ring Muscle-up: „False Grip Hang“ → „False Grip Chin-up“ → „Transition“ → „Banded Ring Muscle-up“ → „Ring Muscle-up“
- `g_bar_muscle_up` Bar Muscle-up: „Chest-to-Bar“ → „Explosive Pull-up“ → „Straight Bar Dip“ → „Bar Muscle-up“
- `g_one_arm_pullup` One-Arm Pull-up: „Archer Pull-up“ → „Assisted One-Arm Pull-up“ → „One-Arm Pull-up“
- `g_kipping_pullup` Kipping Pull-up: „Kip Swing“ → „Kipping Pull-up“ → „Chest-to-Bar“ → „Butterfly“
- `g_rope_climb` Rope Climb: „Pull-up frei“ → „Rope Climb“ → „Legless“
- `g_front_lever` Front Lever: „Tuck“ → „Advanced Tuck“ → „Einbeinig“ → „Voll“
- `g_back_lever` Back Lever: „German Hang“ → „Tuck“ → „Advanced Tuck“ → „Voll“
- `g_one_arm_row` One-Arm Ring Row: „Archer Ring Row“ → „One-Arm Ring Row“ → „Tuck Front Lever Row“
- `g_one_arm_push` One-Arm Push-up: „Archer Push-up“ → „Incline One-Arm Push-up“ → „One-Arm Push-up“
- `g_planche` Planche: „Planche Lean“ → „Pseudo Planche Push-up“ → „Tuck“ → „Advanced Tuck“ → „Straddle“ → „Full Planche“
- `g_hspu` Strict Handstand Push-up: „Wall Walk“ → „Negative“ → „Strict Handstand Push-up“ → „Deficit“ → „Freestanding“
- `g_bar_dip` Parallel Bar Dip: „Bench Dip“ → „Parallel Bar Dip“ → „Weighted Dip“
- `g_strict_press` Strict Press: „Band Press“ → „Dumbbell Press“ → „Strict Press“ → „Push Press“ → „Push Jerk“ → „Split Jerk“
- `g_air` Air Squat: „Box Squat“ → „Air Squat“ → „Weste“ → „Goblet Squat“
- `g_back_squat` Back Squat: „Goblet Squat“ → „Front Squat“ → „Back Squat“ → „Overhead Squat“
- `g_thruster` Thruster: „Air Squat“ → „Wall Ball Shot“ → „Thruster“
- `g_kb_swing` Kettlebell Swing: „Kettlebell Deadlift“ → „Kettlebell Swing“ → „American Swing“ → „Single-Arm Swing“ → „Kettlebell Snatch“
- `g_deadlift` Deadlift: „Kettlebell Deadlift“ → „Romanian Deadlift“ → „Deadlift“ → „Sumo Deadlift High Pull“
- `g_hip_thrust` Hip Thrust: „Hip Thrust“ → „Einbeinig“ → „Weste“
- `g_slider_curl` Slider Leg Curl: „Slider Leg Curl“ → „Single-Leg Slider Curl“ → „Ring Leg Curl“
- `g_dragon_flag` Dragon Flag: „Tuck Dragon Flag“ → „Dragon Flag Raise“ → „Dragon Flag“
- `g_ring_fallout` Ring Fallout: „Plank“ → „Body Saw“ → „Ring Fallout“
- `g_lsit` L-Sit: „Compression Leg Lift“ → „Tuck L-Sit“ → „L-Sit“ → „Ring L-Sit“ → „V-Sit“
- `g_kipping_t2b` Kipping Toes to Bar: „Kip Swing“ → „Knees to Elbows“ → „Kipping Toes to Bar“
- `g_v_up` V-up: „Tuck-up“ → „V-up“ → „GHD Sit-up“
- `g_human_flag` Human Flag: „Side Plank“ → „Tuck Human Flag“ → „Human Flag“
- `g_turkish_getup` Turkish Get-up: „Pallof Press“ → „Side Plank“ → „Turkish Get-up“
- `g_handstand_walk` Handstand Walk: „Kick-up“ → „Freestanding Handstand“ → „Handstand Walk“
- `g_double_under` Double-Under: „Single-Under“ → „Double-Under“
- `g_box_jump` Box Jump: „Step-up“ → „Box Jump“ → „Box Jump Over“ → „Burpee Box Jump Over“
- `g_broad_jump` Broad Jump: „Squat Jump“ → „Broad Jump“ → „Tuck Jump“
- `g_clean_and_jerk` Clean and Jerk: „Medicine Ball Clean“ → „Hang Power Clean“ → „Power Clean“ → „Squat Clean“ → „Clean and Jerk“
- `g_squat_snatch` Squat Snatch: „Burgener Warm-up“ → „Overhead Squat“ → „Hang Power Snatch“ → „Power Snatch“ → „Squat Snatch“
- `g_db_snatch` Dumbbell Snatch: „Dumbbell Clean and Jerk“ → „Dumbbell Snatch“ → „Devil Press“
- `g_farmers_carry` Farmer's Carry: „Backpack Carry“ → „Farmer's Carry“ → „Suitcase Carry“ → „Overhead Carry“
- `g_sandbag_carry` Sandbag Carry: „Sandbag Bear Hug Carry“ → „Sandbag Shoulder Carry“ → „Sled Push“
- `g_burpee` Burpee: „Step-back Burpee“ → „Burpee“ → „Burpee Pull-up“
- `g_run` Run: „Gehen und Laufen“ → „20 Min am Stück“ → „45 Min am Stück“ → „Intervalle“
- `g_passthrough` Band Pass-Through: „Weiter Griff“ → „Enger Griff“ → „German Hang“
- `g_pancake` Pancake Stretch: „Pike Stretch“ → „Pancake Stretch“ → „Jefferson Curl“
- `g_mob_vorbeuge` Standing Forward Fold: „Fingerspitzen bis Knie“ → „Fingerspitzen bis Schienbeinmitte“ → „Fingerspitzen bis Knöchel“ → „Fingerspitzen am Boden“ → „Handflächen flach am Boden“
- `g_mob_hocke` Deep Squat Test: „Hocke mit Halt, 30 s“ → „Freie Hocke, 30 s“ → „Freie Hocke aufrecht, 60 s“ → „Overhead-Hocke, 30 s“ → „Overhead-Hocke, Füße parallel, 30 s“
- `g_mob_schulter` Wall Shoulder Flexion: „Arme senkrecht über den Schultern“ → „Hände eine Handbreite vor der Wand“ → „Daumen berühren die Wand“ → „Handrücken flach an der Wand“ → „Hände 5 s aktiv von der Wand abheben“
- `g_mob_bruecke` Bridge Progression: „Glute Bridge in einer Linie“ → „Brücke mit Händen auf Sofa“ → „Brücke am Boden, Arme gebeugt“ → „Brücke am Boden, Arme gestreckt“ → „Brücke, Schultern über Handgelenken“
- `g_mob_spagat` Front Split Progression: „Half Split, Fingerspitzen neben dem Fuß“ → „Becken eine Unterarmlänge über dem Boden“ → „Becken eine Faust über dem Boden“ → „Becken am Boden, Hände stützen“ → „Spagat aufrecht ohne Hände, 30 s“
- `g_mob_handgelenk` Wrist Extension Test: „Schultern hinter den Händen“ → „Schultern über den Handgelenken“ → „Schultern eine Handbreite vor den Handgelenken“ → „Schultern über den Fingerspitzen“
- `g_mob_sprunggelenk` Knee-to-Wall Test: „Zehen an der Wand“ → „Zwei Fingerbreit Abstand“ → „Handbreite ohne Daumen“ → „Handbreite mit Daumen“ → „Handbreite plus zwei Finger“
- `g_mob_rueckenkratzen` Back Scratch Reach: „Lücke kleiner als zwei Handlängen“ → „Lücke kleiner als anderthalb Handlängen“ → „Lücke kleiner als eine Handlänge“ → „Fingerspitzen berühren sich“ → „Finger haken ineinander“

## Anhang F: Format für neue Familien (`familien_neu`)
```json
{
  "id": "f_cable_row",
  "name": "Cable Row",
  "muster": "zug_horizontal",
  "bereich": "zug",
  "ebene": 1,
  "kurz": "Ein Satz, was die Familie trainiert.",
  "leiter": null,
  "voraussetzt": [ { "familie": "f_row", "ab_rang": 1 } ],
  "fuehrt_zu": [],
  "varianten": [
    { "uebung": "g_seated_cable_row", "art": "stufe", "rang": 1, "effekt": 75, "ziel": "Messbares Ziel für die nächste Stufe.", "grund": "Ein Satz, warum dieser Platz." },
    { "uebung": "g_single_arm_cable_row", "art": "variante", "rang": null, "effekt": 72, "grund": "…" }
  ]
}
```
- `id` beginnt mit `f_`, nur Kleinbuchstaben, Ziffern und `_`. `name` englisch, alle anderen Texte deutsch.
- `bereich`: `zug`, `druck`, `beine`, `rumpf`, `skill`, `ausdauer` oder `gewichtheben`.
- `ebene`: 1 = Grundlage ohne Voraussetzung bis 6 = schwerster Skill. Immer mindestens eine Ebene über den Familien in `voraussetzt`.
- `voraussetzt`: höchstens 3 echte Voraussetzungen für Kraft und Technik, mit `ab_rang` (Stufe in der Vorgänger-Familie). Leer `[]` bei Grundlagen.
- `fuehrt_zu`: passt genau zu `voraussetzt` (steht A in `voraussetzt` von B, steht B in `fuehrt_zu` von A). Betrifft eine bestehende Familie, nenn es mir in `entscheidungen`, ich trage es dort nach.
- `leiter`: bei neuen Familien immer `null`.
- `varianten`:
  - `art: "stufe"` mit `rang` 1, 2, 3 … ohne Lücke (1 = leichteste) und `ziel` (ein Satz, messbar ohne Hilfsmittel).
  - `art: "variante"`: gleichwertige Abwandlung mit anderem Reiz, `rang: null`.
  - `art: "tempo"`: auf Schnelligkeit ausgelegt wie im CrossFit, `rang: null`, dazu `vermerk`. Ersetzt im Training nie eine Stufe.
  - `effekt` 0–100, Trainingswirkung bei sauberer Ausführung, am `nutzen` orientiert.
