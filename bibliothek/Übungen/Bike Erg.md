---
id: g_bike_erg
name: Bike Erg
pos: 199
muster: ausdauer
bereich: ausdauer
einheit: kalorien
rolle: [metcon, aufwaermen, kraft]
equipment: [ [eq_ergometer] ]
nutzen: 76
level: 1
voraussetzung: []
muskeln: {primaer: [quadrizeps, gesaess], sekundaer: [waden, beinbeuger]}
gelenke: {schulter: 0, ellbogen: 0, handgelenk: 0, ruecken: 0, huefte: 1, knie: 2, fuss: 1}
bewegt: [huefte, knie, fuss]
sehne: 0
ermuedung: 2
technik: 1
seitig: false
laut: false
rx: null
alias: [Ergometer, Fahrrad-Ergometer, Radfahren drinnen]
evidenz: {muster: Radfahren, bezug: uebung, aktivierung: keine, belastung: keine, wirkung: keine, gesundheit: mittel, ki: [GPT-6, Claude (eigener Chat)], gruppen: [{gruppe: aeltere, bewertung: geeignet, hinweis: Ergometertraining wurde bei älteren Menschen mit positiven Anpassungen untersucht.}, {gruppe: bluthochdruck_herz, bewertung: geeignet, hinweis: Ausdauertraining senkt den Ruheblutdruck; Ergometer erlaubt feine Intensitätssteuerung}, {gruppe: knie_huefte_arthrose, bewertung: geeignet, hinweis: Sitzposition und Widerstand symptomorientiert anpassen. Die direkte Vergleichsstudie schloss Menschen mit Arthrose ein.}, {gruppe: schwangerschaft_wochenbett, bewertung: angepasst, hinweis: "[Wahrscheinlich] Stationär statt Straße wegen Sturzrisiko; Leitlinie empfiehlt Aktivität allgemein, nicht Radfahren spezifisch"}], quellen_geprueft: false}
---
# Bike Erg

## Einordnung
- Familie: [[Erg (Familie)]]

## Zweck
Radfahren am Ergometer: Ausdauer ohne Stöße für die Gelenke, mit genau messbarer Leistung in Watt.

## Vorbereitung
Sattelhöhe so einstellen, dass das Knie unten im Pedal noch leicht gebeugt ist. Watt nach Plan einstellen.

## So geht’s
1. Setz dich auf den Sattel, die Füße auf den Pedalen.
2. Tritt gleichmäßig rund, der Oberkörper bleibt ruhig.
3. Halt die Watt, die der Plan vorgibt.

## Raus
Am Ende ein paar Minuten locker ausfahren.

## Sauber, wenn
Gleichmäßiger Tritt, ruhiger Oberkörper.

## Technik
- Bei gleicher Wattzahl sind deine Einheiten vergleichbar.

## Atmung
Gleichmäßig weiteratmen.

## Häufige Fehler
- Die Wattzahl ständig ändern.
  → Für Vergleiche fest lassen.
- Sattel zu tief, die Knie drücken.
  → Sattel höher.

## Leichter und schwerer
Leichter: weniger Watt. Schwerer: mehr Watt oder Sprints.

## Wann aufhören
Abbrechen bei Schwindel oder Brustschmerz.

## Trainiert
Herz-Kreislauf, Beine

## Evidenz
Bewegungsmuster: [[Radfahren]].

| Was ist belegt | Abgleich |
|---|---|
| Aktivierung (EMG) | **keine** |
| Gelenkbelastung | **keine** |
| Trainingswirkung | **keine** |
| Gesundheit, Schmerz, Verletzung | **mittel** |

**Hinweise für Gruppen** (vorsichtigste Bewertung der KIs):
- aeltere: **geeignet**, Ergometertraining wurde bei älteren Menschen mit positiven Anpassungen untersucht.
- bluthochdruck_herz: **geeignet**, Ausdauertraining senkt den Ruheblutdruck; Ergometer erlaubt feine Intensitätssteuerung
- knie_huefte_arthrose: **geeignet**, Sitzposition und Widerstand symptomorientiert anpassen. Die direkte Vergleichsstudie schloss Menschen mit Arthrose ein.
- schwangerschaft_wochenbett: **angepasst**, [Wahrscheinlich] Stationär statt Straße wegen Sturzrisiko; Leitlinie empfiehlt Aktivität allgemein, nicht Radfahren spezifisch

Quellen noch nicht geprüft (siehe [[Quellen-Übersicht]]). Die Werte stehen oben in der Eigenschaft `evidenz`.

## Recherche
Recherche zur Übung „Cycling“ (Radfahren), Bereich [[5 Ausdauer]], Bewegungsmuster [[Radfahren]].

| Was ist belegt | GPT-6 | Claude | Abgleich |
|---|---|---|---|
| Aktivierung (EMG) | keine | keine | **keine** |
| Gelenkbelastung | keine | keine | **keine** |
| Trainingswirkung | schwach ([[Lovell 2010]]) | keine | **keine** |
| Gesundheit, Schmerz, Verletzung | mittel ([[Lovell 2010]], [[Alkatan 2016]]) | stark ([[Nordengen 2019]]) | **mittel** |

Genannt von 2 von 2 KIs: GPT-6, Claude (eigener Chat).

Namen bei den KIs: Commuter Cycling, Cycle Ergometer, E-Bike, Indoor Cycling, Recumbent Cycling, Road Cycling, Spin Bike, Spinning, Stationary Bike, Stationary Cycling

| Gruppe | KI | Bewertung | Hinweis | Quelle |
|---|---|---|---|---|
| aeltere | GPT-6 | **geeignet** | Ergometertraining wurde bei älteren Menschen mit positiven Anpassungen untersucht. | [[Lovell 2010]], [[Bouaziz 2018]] |
| knie_huefte_arthrose | GPT-6 | **geeignet** | Sitzposition und Widerstand symptomorientiert anpassen. Die direkte Vergleichsstudie schloss Menschen mit Arthrose ein. | [[Alkatan 2016]] |
| bluthochdruck_herz | Claude (eigener Chat) | **geeignet** | Ausdauertraining senkt den Ruheblutdruck; Ergometer erlaubt feine Intensitätssteuerung | [[Cornelissen 2013]] |
| schwangerschaft_wochenbett | Claude (eigener Chat) | **angepasst** | [Wahrscheinlich] Stationär statt Straße wegen Sturzrisiko; Leitlinie empfiehlt Aktivität allgemein, nicht Radfahren spezifisch | [[Mottola 2018]] |

> [!quote]- GPT-6: Cycling · Akt keine, Bel keine, Wirk schwach, Ges mittel (familie)
> **Begründung:** Eine Studie bei zuvor inaktiven älteren Männern fand nach 16 Wochen Ergometertraining höhere Beinkraft, Beinleistung und Oberschenkelmuskelmasse. Eine weitere randomisierte Studie bei Arthrose zeigte Verbesserungen von Beschwerden und Funktion. Die Ergebnisse hängen von Population und Trainingsdosierung ab.
> **Kernhinweis:** Stell Sattel und Lenker passend ein, tritt rund und kontrolliert und wähle einen Widerstand, bei dem du die gewünschte Intensität ohne starke Ausweichbewegungen halten kannst.
> **Ausweichbewegung:** Mit zu hohem Widerstand und unkontrollierter Körperbewegung pedalieren.
> **Muskeln:** Quadriceps femoris, Gluteus maximus, Soleus · mit: Gastrocnemius, Biceps femoris, Iliopsoas
> **Equipment:** Fahrrad oder stationäres Fahrradergometer
> **Engpass:** huefte, knie, sprunggelenk
> **Stufe bei GPT-6:** 1 · einsteiger

> [!quote]- Claude (eigener Chat): Cycling · Akt keine, Bel keine, Wirk keine, Ges stark (uebung)
> **Begründung:** Metaanalyse von Kohorten: 22 % niedrigeres kombiniertes Herz-Kreislauf-Risiko (Q37). Überwiegend Pendelradfahren. E-Bike ist ein [Geraten] Alias – geringere Intensität, nicht gesondert untersucht.
> **Kernhinweis:** Stell den Sattel so ein, dass das Knie unten leicht gebeugt bleibt.
> **Ausweichbewegung:** Sattel zu tief, Knie stark gebeugt unter Last
> **Muskeln:** quadriceps femoris, gluteus maximus · mit: triceps surae, ischiocrurale Gruppe
> **Equipment:** Fahrrad, oder Ergometer
> **Engpass:** knie
> **Stufe bei Claude (eigener Chat):** 1 · einsteiger

## Diskussion
> [!dennis]
>
