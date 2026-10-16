---
type: rohdaten
bereich: 5
ki: "Claude Opus 5.5"
---
# Claude (eigener Chat) · Bereich 5 (Originalantwort)

```yaml
bereich: Bereich 5 – Ausdauer
hinweise:
- Fast die gesamte Gesundheitsevidenz zu Gehen, Laufen und Radfahren ist BEOBACHTEND (Kohorten) – Selbstselektion möglich, keine Kausalität.
- Randomisierte Daten vor allem für Fitness-Endpunkte (VO2peak, Q34) und Blutdruck (Q19).
- Rudern, Ski-Ergometer, Air Bike und Schwimmen ohne eigene Quelle; Einstufung ist Übertragung aus der WHO-Empfehlung (Q1).
- '[Wahrscheinlich] Q37: Autoren 3 und 4 aus dem Schwesterartikel (Teil 2), Autorenliste prüfen.'
familien:
- name: Gehen
  leitlinie: 'WHO: 150–300 min moderate oder 75–150 min intensive aerobe Aktivität pro Woche; etwas ist besser als nichts (Q1)'
  gelenkmechanik: Zyklische Hüft-, Knie- und Sprunggelenksbewegung mit dauerhaftem Bodenkontakt eines Fußes
  progressionsprinzip: Schritte pro Tag → Tempo → Steigung oder Gewicht (Rucksack, Nordic Walking)
  gegenspieler: keiner (zyklisch)
  rumpfanforderung: gering
  engpass:
  - huefte
  - knie
  - sprunggelenk
  gesundheitsnutzen: Mehr Schritte gehen mit niedrigerer Gesamtsterblichkeit einher; Plateau bei ≥60-Jährigen etwa 6000–8000, bei Jüngeren 8000–10000 Schritte (Q33)
  hauptrisiko: Gering; bei Gelenkschmerz Umfang vor Tempo anpassen
  quellen:
  - Q1
  - Q33
- name: Laufen
  leitlinie: WHO allgemein (Q1); Laufen ist mit niedrigerer Sterblichkeit assoziiert, schon einmal pro Woche (Q32)
  gelenkmechanik: Zyklische Bewegung mit Flugphase; höhere Bodenreaktionskräfte als beim Gehen
  progressionsprinzip: Geh-Lauf-Intervalle → durchgehend locker → Umfang → zuletzt Tempo
  gegenspieler: keiner (zyklisch)
  rumpfanforderung: gering bis mittel
  engpass:
  - knie
  - sprunggelenk
  - huefte
  gesundheitsnutzen: 27 % niedrigere Gesamtsterblichkeit (Kohorten) ohne klaren Dosiseffekt (Q32). Freizeitläufer haben seltener Arthrose als Inaktive, Wettkampfläufer häufiger (Q36).
  hauptrisiko: Hohe Umfänge und Intensitäten über viele Jahre sind mit mehr Hüft-/Kniearthrose assoziiert (Q36)
  quellen:
  - Q1
  - Q32
  - Q36
- name: Radfahren
  leitlinie: WHO allgemein (Q1); jede Form des Radfahrens ist mit geringerem Herz-Kreislauf-Risiko assoziiert (Q37)
  gelenkmechanik: Zyklische Hüft- und Kniestreckung ohne Stoßbelastung, Körpergewicht getragen
  progressionsprinzip: Dauer → Widerstand → Intervalle
  gegenspieler: keiner (zyklisch)
  rumpfanforderung: gering
  engpass:
  - knie
  - huefte
  gesundheitsnutzen: 22 % niedrigeres kombiniertes Herz-Kreislauf-Risiko gegenüber passivem Transport (Q37, Kohorten)
  hauptrisiko: Verkehrsunfälle beim Straßenradfahren (nicht durch die geprüften Quellen quantifiziert)
  quellen:
  - Q1
  - Q37
- name: Ganzkörper-Ergometer und Schwimmen
  leitlinie: WHO zählt jede aerobe Aktivität moderater oder hoher Intensität (Q1); keine modalitätsspezifische Quelle geprüft
  gelenkmechanik: Zyklische Arm- und Beinarbeit, gelenkschonend ohne Stoßbelastung
  progressionsprinzip: Technik → Dauer → Intensität
  gegenspieler: keiner (zyklisch)
  rumpfanforderung: mittel (Rudern, Ski-Ergometer)
  engpass:
  - schulter
  - unterer_ruecken
  gesundheitsnutzen: Nur übertragen aus der aeroben Aktivität allgemein (Q1)
  hauptrisiko: Rücken beim Rudern mit Rundrücken; Schulter bei hohem Schwimmumfang (nicht durch Quelle belegt)
  quellen:
  - Q1
- name: Belastungsformate
  leitlinie: 'WHO: moderat und intensiv sind gleichwertig kombinierbar (Q1)'
  gelenkmechanik: abhängig von der gewählten Modalität
  progressionsprinzip: Grundlage zuerst → Intervalle ergänzen; Intensität erst nach stabilem Umfang erhöhen
  gegenspieler: keiner
  rumpfanforderung: abhängig von der Modalität
  engpass: []
  gesundheitsnutzen: HIIT steigert die VO2peak bei kardiometabolischen Erkrankungen fast doppelt so stark wie moderates Dauertraining (Q34). Dauertraining und HIIT senken den Ruheblutdruck (Q19).
  hauptrisiko: Kardiale Ereignisse bei ungewohnter Intensität in Risikogruppen; Studien liefen supervidiert (Q34)
  quellen:
  - Q1
  - Q19
  - Q34
uebungen:
- name: Walking
  name_deutsch: Gehen
  alias:
  - Brisk Walking
  - Nordic Walking
  - Incline Walking
  - Hiking
  - Rucking
  familie: Gehen
  stufe: 1
  niveau: einsteiger
  equipment:
  - keine
  - optional Stöcke, Laufband, Rucksack
  muskeln_primaer:
  - gluteus maximus
  - quadriceps femoris
  - triceps surae
  muskeln_sekundaer:
  - ischiocrurale Gruppe
  - tibialis anterior
  - gluteus medius
  engpass:
  - huefte
  - knie
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
      stufe: stark
      quellen:
      - Q1
      - Q33
  evidenz_bezug: uebung
  begruendung: 'Leitlinie plus Metaanalyse aus 15 Kohorten: mehr Schritte, niedrigere Sterblichkeit bis zu einem altersabhängigen Plateau (Q33). Beobachtungsdaten, keine Kausalität.'
  kernhinweis: Geh so zügig, dass du noch sprechen, aber nicht mehr singen kannst.
  ausweichbewegung: Zu langsames Tempo ohne Belastungsreiz
  gruppen:
  - gruppe: aeltere
    bewertung: geeignet
    hinweis: Bei ≥60-Jährigen sinkt das Risiko bis etwa 6000–8000 Schritte pro Tag
    quellen:
    - Q33
  - gruppe: schwangerschaft_wochenbett
    bewertung: geeignet
    hinweis: Mindestens 150 min moderate Aktivität pro Woche, wenn keine Kontraindikation vorliegt
    quellen:
    - Q35
  - gruppe: bluthochdruck_herz
    bewertung: geeignet
    hinweis: Ausdauertraining senkt den Ruheblutdruck
    quellen:
    - Q19
  - gruppe: knie_huefte_arthrose
    bewertung: angepasst
    hinweis: Übungstherapie allgemein lindert Kniearthroseschmerz; Umfang nach Beschwerden steuern
    quellen:
    - Q9
- name: Running
  name_deutsch: Laufen
  alias:
  - Jogging
  - Walk-Run Intervals
  - Trail Running
  - Treadmill Running
  familie: Laufen
  stufe: 2
  niveau: einsteiger
  equipment:
  - Laufschuhe
  - optional Laufband
  muskeln_primaer:
  - triceps surae
  - quadriceps femoris
  - gluteus maximus
  muskeln_sekundaer:
  - ischiocrurale Gruppe
  - iliopsoas
  - gluteus medius
  engpass:
  - knie
  - sprunggelenk
  - huefte
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
      stufe: stark
      quellen:
      - Q32
      - Q36
  evidenz_bezug: uebung
  begruendung: 'Metaanalyse von Kohorten: 27 % niedrigere Gesamtsterblichkeit, ohne Mehrnutzen durch höhere Dosis (Q32). Freizeitlaufen geht mit weniger, Wettkampflaufen mit mehr Arthrose einher (Q36).
    Alles Beobachtungsdaten.'
  kernhinweis: Fang mit Geh-Lauf-Wechseln an und steigere zuerst den Umfang, nie Umfang und Tempo gleichzeitig.
  ausweichbewegung: Zu schnelles Steigern des Wochenumfangs
  gruppen: []
- name: Cycling
  name_deutsch: Radfahren
  alias:
  - Commuter Cycling
  - Stationary Bike
  - Spinning
  - Indoor Cycling
  - E-Bike
  familie: Radfahren
  stufe: 1
  niveau: einsteiger
  equipment:
  - Fahrrad
  - oder Ergometer
  muskeln_primaer:
  - quadriceps femoris
  - gluteus maximus
  muskeln_sekundaer:
  - triceps surae
  - ischiocrurale Gruppe
  engpass:
  - knie
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
      stufe: stark
      quellen:
      - Q37
  evidenz_bezug: uebung
  begruendung: 'Metaanalyse von Kohorten: 22 % niedrigeres kombiniertes Herz-Kreislauf-Risiko (Q37). Überwiegend Pendelradfahren. E-Bike ist ein [Geraten] Alias – geringere Intensität, nicht gesondert untersucht.'
  kernhinweis: Stell den Sattel so ein, dass das Knie unten leicht gebeugt bleibt.
  ausweichbewegung: Sattel zu tief, Knie stark gebeugt unter Last
  gruppen:
  - gruppe: bluthochdruck_herz
    bewertung: geeignet
    hinweis: Ausdauertraining senkt den Ruheblutdruck; Ergometer erlaubt feine Intensitätssteuerung
    quellen:
    - Q19
  - gruppe: schwangerschaft_wochenbett
    bewertung: angepasst
    hinweis: '[Wahrscheinlich] Stationär statt Straße wegen Sturzrisiko; Leitlinie empfiehlt Aktivität allgemein, nicht Radfahren spezifisch'
    quellen:
    - Q35
- name: Rowing Ergometer
  name_deutsch: Rudergerät
  alias:
  - Indoor Rowing
  - Concept2 Rower
  familie: Ganzkörper-Ergometer und Schwimmen
  stufe: 2
  niveau: einsteiger
  equipment:
  - Rudergerät
  muskeln_primaer:
  - quadriceps femoris
  - gluteus maximus
  - latissimus dorsi
  muskeln_sekundaer:
  - erector spinae
  - biceps brachii
  - rhomboidei
  engpass:
  - unterer_ruecken
  - griff
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
      stufe: mittel
      quellen:
      - Q1
  evidenz_bezug: familie
  begruendung: 'Gesundheitseinstufung nur übertragen: WHO zählt jede aerobe Aktivität (Q1). Keine rudergerätspezifische Studie geprüft.'
  kernhinweis: Reihenfolge Beine – Rumpf – Arme beim Zug, umgekehrt zurück.
  ausweichbewegung: Zug mit Armen zuerst, Rundrücken
  gruppen: []
- name: Swimming
  name_deutsch: Schwimmen
  alias:
  - Freestyle
  - Breaststroke
  - Aqua Jogging
  - Wassergymnastik
  familie: Ganzkörper-Ergometer und Schwimmen
  stufe: 1
  niveau: einsteiger
  equipment:
  - Schwimmbad
  muskeln_primaer:
  - latissimus dorsi
  - deltoideus
  - pectoralis major
  muskeln_sekundaer:
  - triceps brachii
  - gluteus maximus
  - quadriceps femoris
  engpass:
  - schulter
  - nacken
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
      stufe: mittel
      quellen:
      - Q1
  evidenz_bezug: familie
  begruendung: Nur übertragen aus der WHO-Empfehlung (Q1). Fehlende Stoßbelastung heißt vermutlich auch geringer Knochenreiz – hier nicht durch Quelle belegt.
  kernhinweis: Atme rhythmisch aus ins Wasser, damit du nicht nach Luft schnappen musst.
  ausweichbewegung: Kopf dauerhaft über Wasser beim Brustschwimmen (Nackenbelastung)
  gruppen: []
- name: Air Bike
  name_deutsch: Luftwiderstandsrad
  alias:
  - Assault Bike
  - Echo Bike
  - Fan Bike
  - Ski Erg
  familie: Ganzkörper-Ergometer und Schwimmen
  stufe: 2
  niveau: fortgeschritten
  equipment:
  - Air Bike
  - oder Ski-Ergometer
  muskeln_primaer:
  - quadriceps femoris
  - gluteus maximus
  - deltoideus
  - latissimus dorsi
  muskeln_sekundaer:
  - triceps brachii
  - pectoralis major
  - obliqui
  engpass:
  - knie
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
      stufe: mittel
      quellen:
      - Q1
  evidenz_bezug: familie
  begruendung: '[Geraten] Ski-Ergometer ist als Alias geführt, weil beide als Intervallgerät dienen; die Bewegung unterscheidet sich aber deutlich. Gesundheit nur übertragen (Q1).'
  kernhinweis: Erhöhe die Intensität über das Tempo, der Widerstand steigt automatisch mit.
  ausweichbewegung: Nur Arme oder nur Beine arbeiten
  gruppen: []
- name: Moderate Continuous Training
  name_deutsch: Grundlagenausdauer
  alias:
  - MICT
  - Zone 2
  - Long Slow Distance
  - GA1
  familie: Belastungsformate
  stufe: 1
  niveau: einsteiger
  equipment:
  - jede Ausdauermodalität
  muskeln_primaer: []
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
      stufe: keine
      quellen: []
    gesundheit:
      stufe: stark
      quellen:
      - Q1
      - Q19
  evidenz_bezug: uebung
  begruendung: Leitlinienbasis der WHO-Empfehlung (Q1). Ausdauertraining senkt den Blutdruck systolisch um im Mittel 3,5 mmHg (Q19). Für VO2peak bei Kranken schwächer als HIIT (Q34).
  kernhinweis: Bleib in einem Tempo, bei dem du in ganzen Sätzen sprechen kannst.
  ausweichbewegung: Jede Einheit schleichend zu intensiv
  gruppen:
  - gruppe: bluthochdruck_herz
    bewertung: geeignet
    hinweis: Senkung von systolischem und diastolischem Blutdruck
    quellen:
    - Q19
- name: Threshold Training
  name_deutsch: Schwellentraining
  alias:
  - Tempo Run
  - Sweet Spot
  - Cruise Intervals
  familie: Belastungsformate
  stufe: 2
  niveau: fortgeschritten
  equipment:
  - jede Ausdauermodalität
  muskeln_primaer: []
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
      stufe: keine
      quellen: []
    gesundheit:
      stufe: mittel
      quellen:
      - Q1
  evidenz_bezug: familie
  begruendung: Zählt als intensive Aktivität im Sinne der WHO (Q1). Keine Quelle zum Schwellentraining als eigenes Format geprüft.
  kernhinweis: Halt ein Tempo, das du etwa 20–40 Minuten durchhalten könntest – anstrengend, aber kontrolliert.
  ausweichbewegung: Start zu schnell, Einbruch in der zweiten Hälfte
  gruppen: []
- name: High-Intensity Interval Training
  name_deutsch: Hochintensives Intervalltraining
  alias:
  - HIIT
  - 4x4 Intervals
  - Aerobic Interval Training
  familie: Belastungsformate
  stufe: 3
  niveau: fortgeschritten
  equipment:
  - jede Ausdauermodalität, bevorzugt Ergometer
  muskeln_primaer: []
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
      stufe: keine
      quellen: []
    gesundheit:
      stufe: stark
      quellen:
      - Q34
  evidenz_bezug: uebung
  begruendung: 'Metaanalyse (10 Studien, 273 Patienten mit KHK, Herzinsuffizienz, Hypertonie, metabolischem Syndrom, Adipositas): HIIT steigert die VO2peak fast doppelt so stark wie moderates Dauertraining
    (Q34). Endpunkt Fitness, nicht Ereignisse.'
  kernhinweis: Arbeitsphasen so hart, dass Sprechen kaum möglich ist; die Pausen aktiv locker halten.
  ausweichbewegung: Zu kurze Pausen, Intervalle werden zu Dauerbelastung
  gruppen:
  - gruppe: bluthochdruck_herz
    bewertung: angepasst
    hinweis: Wirksam in kardiologischen Gruppen, aber in Studien supervidiert und nach ärztlicher Freigabe
    quellen:
    - Q34
  - gruppe: uebergewicht
    bewertung: angepasst
    hinweis: Adipöse waren eingeschlossen; Ergometer statt Laufen senkt Gelenklast (Ableitung, nicht belegt)
    quellen:
    - Q34
nicht_aufgenommen:
- name: Sprint Interval Training
  grund: Keine Quelle geprüft; extrem hohe Intensität ohne geprüften Gesundheitsnutzen über HIIT hinaus
  quellen: []
- name: Marathon-/Ultradistanz als Gesundheitsformat
  grund: Kein Mehrnutzen höherer Laufdosis für die Sterblichkeit (Q32); langjähriges Wettkampflaufen mit mehr Arthrose assoziiert (Q36)
  quellen:
  - Q32
  - Q36
- name: Stair Climber
  grund: Keine Quelle geprüft
  quellen: []
```
