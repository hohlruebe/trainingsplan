---
type: rohdaten
bereich: 6
ki: "Claude Opus 5.5"
---
# Claude (eigener Chat) · Bereich 6 (Originalantwort)

```yaml
bereich: Bereich 6 – Beweglichkeit
hinweise:
- Dehnen verhindert keine Sportverletzungen (Q38); Krafttraining über vollen Bewegungsumfang bringt ähnliche ROM-Gewinne (Q40). Dehnen ist ein Werkzeug für Bewegungsumfang, nicht für Verletzungsschutz.
- 'SCHEMA-PROBLEM: Kein Endpunkt für Bewegungsumfang (ROM). ROM-Evidenz ist unter kraft_muskel eingetragen (als Leistung gelesen). Empfehlung: Endpunkt beweglichkeit ergänzen.'
- Gelenkspezifische Mobilisationen (Sprunggelenk, BWS, Hüfte) ohne eigene Quelle.
familien:
- name: Statisches Dehnen
  leitlinie: Keine WHO-Aussage. Statisches und PNF-Dehnen erzeugen langfristig mehr Bewegungsumfang als dynamisches Dehnen (Q41). Kein Schutz vor Sportverletzungen (Q38).
  gelenkmechanik: Passives Halten eines Muskels in Endposition, meist 15–60 s
  progressionsprinzip: Dauer und Häufigkeit; Position mit etwas mehr Amplitude, sobald die Dehnempfindung nachlässt
  gegenspieler: Kräftigung des Antagonisten in neuer Endposition
  rumpfanforderung: gering
  engpass: []
  gesundheitsnutzen: Mehr Bewegungsumfang (Q41). Lange Dehnungen ≥60 s direkt vor Leistung senken diese leicht (Q39).
  hauptrisiko: Leistungsabfall bei langem Dehnen unmittelbar vor Sprung/Sprint (Q39)
  quellen:
  - Q38
  - Q39
  - Q41
- name: Dynamisches Dehnen
  leitlinie: Kein Verletzungsschutz belegt; im Aufwärmen mit leicht positivem Leistungseffekt (Q39)
  gelenkmechanik: Kontrollierte, wiederholte Bewegung durch den Bewegungsumfang ohne Halten
  progressionsprinzip: Amplitude und Tempo schrittweise steigern
  gegenspieler: keiner (wechselseitig)
  rumpfanforderung: gering bis mittel
  engpass: []
  gesundheitsnutzen: Leicht bessere Leistung, wenn kurz vor der Belastung ausgeführt (Q39); langfristig weniger Bewegungsumfang als statisch/PNF (Q41)
  hauptrisiko: Ballistisches Wippen mit unkontrollierter Endposition
  quellen:
  - Q39
  - Q41
- name: PNF-Dehnen
  leitlinie: Langfristig mit statischem Dehnen gleichauf beim Bewegungsumfang (Q41)
  gelenkmechanik: Isometrische Anspannung des gedehnten Muskels, dann Entspannung und tiefere Dehnung
  progressionsprinzip: Anspannungsintensität und Zyklen; Partner oder Band zur Fixierung
  gegenspieler: Antagonist (bei Contract-Relax-Antagonist-Contract)
  rumpfanforderung: gering
  engpass: []
  gesundheitsnutzen: Bewegungsumfang (Q41); kein Verletzungsschutz (Q39)
  hauptrisiko: Leistungsabfall direkt danach (Q39)
  quellen:
  - Q39
  - Q41
- name: Gelenkmobilisation
  leitlinie: Keine Leitlinie; Krafttraining über vollen Bewegungsumfang erreicht ähnliche ROM-Gewinne wie Dehnen (Q40)
  gelenkmechanik: Aktive Bewegung eines Gelenks in seine Endpositionen, teils mit leichter Last
  progressionsprinzip: Aktiv ohne Last → mit Last in Endposition (Brücke zum Krafttraining)
  gegenspieler: gelenkabhängig
  rumpfanforderung: gering bis mittel
  engpass:
  - sprunggelenk
  - huefte
  - schulter
  gesundheitsnutzen: Nicht untersucht für die einzelnen Übungen
  hauptrisiko: Nicht untersucht
  quellen:
  - Q40
- name: Selbstmassage mit Rolle
  leitlinie: 'Keine Leitlinie; Metaanalyse: akut mehr Bewegungsumfang (Q43)'
  gelenkmechanik: Druck und Rollen auf Muskelgewebe, kein Gelenkbewegungsreiz
  progressionsprinzip: Dauer pro Muskel (≥90 s wirksamer als 30 s laut Einzelstudie, nicht als Quelle geprüft)
  gegenspieler: keiner
  rumpfanforderung: gering
  engpass: []
  gesundheitsnutzen: Akut mehr Bewegungsumfang, nicht besser als Dehnen (Q43)
  hauptrisiko: Gering; bei Männern möglicherweise geringerer Effekt (Q43)
  quellen:
  - Q43
- name: Beweglichkeitstests
  leitlinie: Keine Leitlinie; Validitäts-Metaanalyse zu Sit-and-Reach (Q42)
  gelenkmechanik: Rumpfvorbeuge im Langsitz mit gestreckten Knien
  progressionsprinzip: Testprotokoll standardisieren, Wiederholung unter gleichen Bedingungen
  gegenspieler: ''
  rumpfanforderung: gering
  engpass:
  - unterer_ruecken
  gesundheitsnutzen: Messinstrument, keine Übung
  hauptrisiko: 'Fehldeutung: misst die Lendenwirbelsäule kaum (Q42)'
  quellen:
  - Q42
uebungen:
- name: Hamstring Stretch
  name_deutsch: Dehnung der hinteren Oberschenkel
  alias:
  - Standing Toe Touch Stretch
  - Seated Forward Fold
  - Supine Strap Hamstring Stretch
  - Single-Leg Hamstring Stretch
  familie: Statisches Dehnen
  stufe: 1
  niveau: einsteiger
  equipment:
  - Körpergewicht
  - optional Gurt/Band
  muskeln_primaer:
  - biceps femoris
  - semitendinosus
  - semimembranosus
  muskeln_sekundaer:
  - gastrocnemius
  engpass:
  - unterer_ruecken
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: stark
      quellen:
      - Q41
    gesundheit:
      stufe: stark
      quellen:
      - Q38
  evidenz_bezug: familie
  begruendung: ROM-Gewinn durch statisches Dehnen metaanalytisch belegt (Q41; ROM unter kraft_muskel). Gesundheit stark bedeutet hier starke Evidenz für KEINEN Verletzungsschutz (Q38).
  kernhinweis: Kipp das Becken nach vorn statt den Rücken rund zu machen, und halt 30–60 Sekunden.
  ausweichbewegung: Rundrücken, Knie werden überstreckt
  gruppen: []
- name: Kneeling Hip Flexor Stretch
  name_deutsch: Hüftbeugerdehnung im Kniestand
  alias:
  - Half-Kneeling Hip Flexor Stretch
  - Couch Stretch
  - Lunge Stretch
  familie: Statisches Dehnen
  stufe: 1
  niveau: einsteiger
  equipment:
  - Körpergewicht
  - Matte
  muskeln_primaer:
  - iliopsoas
  - rectus femoris
  muskeln_sekundaer:
  - tensor fasciae latae
  engpass:
  - knie
  - unterer_ruecken
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: stark
      quellen:
      - Q41
    gesundheit:
      stufe: keine
      quellen: []
  evidenz_bezug: familie
  begruendung: Nur übertragen aus statischem Dehnen allgemein (Q41, ROM). Couch Stretch ist ein [Geraten] Alias mit stärkerer Kniebeugung, also mehr Rectus-femoris-Dehnung.
  kernhinweis: Spann das Gesäß der hinteren Seite an und kipp das Becken leicht nach hinten, bevor du nach vorn schiebst.
  ausweichbewegung: Hohlkreuz statt Hüftstreckung
  gruppen: []
- name: Wall Calf Stretch
  name_deutsch: Wadendehnung an der Wand
  alias:
  - Straight-Knee Calf Stretch
  - Bent-Knee Soleus Stretch
  - Step Calf Stretch
  familie: Statisches Dehnen
  stufe: 1
  niveau: einsteiger
  equipment:
  - Wand
  - oder Stufe
  muskeln_primaer:
  - gastrocnemius
  - soleus
  muskeln_sekundaer: []
  engpass:
  - sprunggelenk
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: stark
      quellen:
      - Q41
    gesundheit:
      stufe: keine
      quellen: []
  evidenz_bezug: familie
  begruendung: Nur übertragen aus statischem Dehnen allgemein (Q41, ROM).
  kernhinweis: Ferse bleibt am Boden, Fuß zeigt gerade nach vorn.
  ausweichbewegung: Fuß dreht nach außen, Fußgewölbe kollabiert
  gruppen: []
- name: Leg Swings
  name_deutsch: Beinpendel
  alias:
  - Front-to-Back Leg Swings
  - Lateral Leg Swings
  - Walking Knee Hugs
  familie: Dynamisches Dehnen
  stufe: 1
  niveau: einsteiger
  equipment:
  - Körpergewicht
  - Wand zum Abstützen
  muskeln_primaer:
  - ischiocrurale Gruppe
  - iliopsoas
  - adductor longus
  muskeln_sekundaer:
  - gluteus medius
  engpass:
  - huefte
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: mittel
      quellen:
      - Q39
      - Q41
    gesundheit:
      stufe: keine
      quellen: []
  evidenz_bezug: familie
  begruendung: Dynamisches Dehnen bringt kurz vor Belastung kleine Leistungsgewinne (Q39), aber langfristig weniger ROM als statisch/PNF (Q41). Zu Verletzungen liegen für dynamisches Dehnen keine Daten
    vor (Q39).
  kernhinweis: Schwing kontrolliert und steigere die Amplitude über 10–15 Wiederholungen.
  ausweichbewegung: Rumpf schwingt mit, Becken kippt
  gruppen: []
- name: World's Greatest Stretch
  name_deutsch: Ausfallschritt mit Rotation
  alias:
  - Lunge with Thoracic Rotation
  - Spiderman Lunge with Reach
  familie: Dynamisches Dehnen
  stufe: 2
  niveau: einsteiger
  equipment:
  - Körpergewicht
  muskeln_primaer:
  - iliopsoas
  - adductor magnus
  - Brustwirbelsäulen-Rotatoren
  muskeln_sekundaer:
  - ischiocrurale Gruppe
  - pectoralis major
  engpass:
  - huefte
  - schulter
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: mittel
      quellen:
      - Q39
    gesundheit:
      stufe: keine
      quellen: []
  evidenz_bezug: familie
  begruendung: '[Geraten] Aufnahme als verbreitete Aufwärm-Kombiübung; nur übertragen aus dynamischem Dehnen allgemein (Q39).'
  kernhinweis: Dreh aus der Brustwirbelsäule und folge der Hand mit dem Blick.
  ausweichbewegung: Rotation nur aus der Schulter, Becken dreht mit
  gruppen: []
- name: Contract-Relax Hamstring Stretch
  name_deutsch: PNF-Dehnung hintere Oberschenkel
  alias:
  - Hold-Relax
  - Contract-Relax-Antagonist-Contract
  - CRAC
  - PNF Stretch
  familie: PNF-Dehnen
  stufe: 1
  niveau: einsteiger
  equipment:
  - Partner
  - oder Gurt/Band
  muskeln_primaer:
  - biceps femoris
  - semitendinosus
  - semimembranosus
  muskeln_sekundaer:
  - quadriceps femoris (bei CRAC)
  engpass: []
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: stark
      quellen:
      - Q41
    gesundheit:
      stufe: schwach
      quellen:
      - Q39
  evidenz_bezug: familie
  begruendung: PNF gleichauf mit statischem Dehnen beim langfristigen ROM (Q41, unter kraft_muskel). Kein klarer Verletzungsschutz und akut −4,4 % Leistung (Q39).
  kernhinweis: Drück 5–6 Sekunden mäßig gegen den Widerstand, entspann und geh dann etwas tiefer in die Dehnung.
  ausweichbewegung: Maximale Anspannung, die zu Krampf oder Schmerz führt
  gruppen: []
- name: Knee-to-Wall Ankle Mobilization
  name_deutsch: Sprunggelenksmobilisation an der Wand
  alias:
  - Ankle Dorsiflexion Mobilization
  - Weight-Bearing Lunge Mobilization
  familie: Gelenkmobilisation
  stufe: 1
  niveau: einsteiger
  equipment:
  - Wand
  muskeln_primaer:
  - soleus
  - gastrocnemius
  muskeln_sekundaer:
  - tibialis anterior
  engpass:
  - sprunggelenk
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: keine
      quellen: []
    gesundheit:
      stufe: keine
      quellen: []
  evidenz_bezug: familie
  begruendung: '[Geraten] Keine Quelle geprüft. Aufnahme, weil eingeschränkte Dorsalextension die Kniebeugetiefe begrenzt – Lehrbuchwissen, keine Evidenz. Vor Nutzung Nachrecherche.'
  kernhinweis: Ferse bleibt am Boden, schieb das Knie über den zweiten Zeh Richtung Wand.
  ausweichbewegung: Ferse hebt ab, Knie fällt nach innen
  gruppen: []
- name: Thoracic Open Book
  name_deutsch: Brustwirbelsäulen-Rotation in Seitlage
  alias:
  - Side-Lying Thoracic Rotation
  - Quadruped Thoracic Rotation
  familie: Gelenkmobilisation
  stufe: 1
  niveau: einsteiger
  equipment:
  - Matte
  - Kissen unter dem Kopf
  muskeln_primaer:
  - Brustwirbelsäulen-Rotatoren
  - pectoralis major
  muskeln_sekundaer:
  - obliqui
  engpass:
  - schulter
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: keine
      quellen: []
    gesundheit:
      stufe: keine
      quellen: []
  evidenz_bezug: familie
  begruendung: '[Geraten] Keine Quelle geprüft. Platzhalter für BWS-Mobilität; vor Nutzung Nachrecherche oder verschieben.'
  kernhinweis: Halt die Knie aufeinander, damit sich nur der Oberkörper aufdreht.
  ausweichbewegung: Becken dreht mit, Rotation nur aus der Lendenwirbelsäule
  gruppen: []
- name: Foam Rolling
  name_deutsch: Faszienrolle
  alias:
  - Self-Myofascial Release
  - Roller Massage
  - Vibration Foam Rolling
  familie: Selbstmassage mit Rolle
  stufe: 1
  niveau: einsteiger
  equipment:
  - Schaumstoffrolle
  - oder Massageroller
  muskeln_primaer:
  - je nach Zielmuskel
  muskeln_sekundaer: []
  engpass: []
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: stark
      quellen:
      - Q43
    gesundheit:
      stufe: keine
      quellen: []
  evidenz_bezug: uebung
  begruendung: 'Multilevel-Metaanalyse: akut mehr Bewegungsumfang, bei Männern möglicherweise weniger (Q43; ROM unter kraft_muskel). Langfristige Wirkung und Verletzungsschutz nicht geprüft.'
  kernhinweis: Roll langsam über den Muskel und bleib auf empfindlichen Stellen kurz liegen.
  ausweichbewegung: Rollen über Gelenke oder Knochen
  gruppen: []
- name: Sit-and-Reach Test
  name_deutsch: Rumpfvorbeuge-Test im Sitzen
  alias:
  - Back-Saver Sit-and-Reach
  - Modified Sit-and-Reach
  - Toe Touch Test
  familie: Beweglichkeitstests
  stufe: 1
  niveau: einsteiger
  equipment:
  - Sit-and-Reach-Box
  - oder Maßband
  muskeln_primaer:
  - ischiocrurale Gruppe
  muskeln_sekundaer:
  - erector spinae
  engpass:
  - unterer_ruecken
  evidenz:
    aktivierung:
      stufe: keine
      quellen: []
    belastung:
      stufe: keine
      quellen: []
    kraft_muskel:
      stufe: keine
      quellen: []
    gesundheit:
      stufe: keine
      quellen: []
  evidenz_bezug: uebung
  begruendung: 'Validitäts-Metaanalyse (34 Studien): mäßige Validität für die Hamstrings (r 0,46–0,67), geringe für die Lendenwirbelsäule (r 0,16–0,35) (Q42). Endpunkt Messgüte passt in keine Evidenzspalte.
    Toe Touch ist ein [Wahrscheinlich] Alias mit eigener, nicht geprüfter Metaanalyse.'
  kernhinweis: Knie bleiben gestreckt, schieb langsam nach vorn und halt die Endposition zwei Sekunden.
  ausweichbewegung: Ruckartiges Vorschnellen, Knie beugen
  gruppen: []
nicht_aufgenommen:
- name: Ballistic Stretching
  grund: Langfristig weniger Bewegungsumfang als statisches und PNF-Dehnen (Q41); unkontrollierte Endpositionen
  quellen:
  - Q41
- name: Dehnen als Verletzungsprophylaxe
  grund: Kein Schutzeffekt in einer Metaanalyse über 25 RCTs (Q38) – als Ziel gestrichen, nicht als Übung
  quellen:
  - Q38
- name: Langes statisches Dehnen (≥60 s pro Muskel) direkt vor Sprung/Sprint
  grund: Messbarer Leistungsabfall von im Mittel 4,6 % (Q39); im Aufwärmen durch dynamische Formen ersetzen
  quellen:
  - Q39
- name: Hip 90/90 Mobilization
  grund: Verbreitet, aber keine Quelle geprüft
  quellen: []
- name: Shoulder Dislocates
  grund: Keine Quelle geprüft; hohe Schulterendbelastung
  quellen: []
```
