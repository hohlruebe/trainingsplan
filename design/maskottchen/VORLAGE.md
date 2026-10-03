# Maskottchen-Vorlage „B3-2 · V-Form“

Von Dennis festgelegt am 3. Oktober 2026. Gilt für **jede** Übungsgrafik, im Canvas wie in der App.
Den Stil nur ändern, wenn Dennis es ausdrücklich will.

## Eine Quelle für alles
- `maskottchen.js` ist die einzige Zeichenfunktion. Entwürfe (`vorschau.js`) und später die App benutzen genau diese Datei.
  So sieht jede Animation gleich aus wie die Skizze. Früher sahen Animationen anders aus, weil sie einen eigenen Weg
  hatten (fertige Formen verschoben und gestreckt). Das gibt es nicht mehr.
- Für die App wird der Inhalt von `maskottchen.js` in `index.html` übernommen (keine eigene Datei nötig, offline).
  Ändert sich die Vorlage, beide Stellen gleich halten.
- Vorschau: `node design/maskottchen/vorschau.js` → `design/maskottchen/out/vorschau.html` (nicht im Repository).

## Der Stil
- Gliederpuppe als lockere Skizze: jede Form mit drei Strichen (Hauptstrich 1,1 px, zwei versetzte Nebenstriche).
- **Lebendige Striche:** Die Nebenstriche wechseln alle 2 Bilder leicht ihre Lage, als würde neu gezeichnet.
- **V-Form:** breite Schultern mit Schulterkappen, schmale Taille, Brustkorb als Ei, Becken als Oval.
- Glieder verjüngen sich zum Gelenk hin. Gelenke als weiße Kreise. Hände und Füße als kleine Ovale.
- Kopf als Ei mit Mittellinie und Augenlinie. Augen, Nase und Mund nur, wenn das Gesicht zum Betrachter zeigt.
  Von hinten ohne Gesicht, die Mittellinie wird zur Wirbelsäule. So ist die Blickrichtung immer klar.
- Orange Line of Action vom Kopf über die Wirbelsäule bis zum Standbein.
- Farben: vorn `#34327E`, hintere Seite in der Drehung `#A8A7CC`, Line of Action `#E8963A`, Boden `#DADAD3`.
- Alle festen Werte stehen oben in `maskottchen.js` unter `STYLE`.

## Eine neue Übung anlegen
1. Eine Funktion `pose(p)` schreiben: `p` läuft von 0 bis 1 über eine Wiederholung, Rückgabe sind die 3D-Gelenke
   wie in `STAND` (x rechts, y unten, z zum Betrachter; `a` = linke Bildseite von vorn).
2. Gelenke immer über Winkel und feste Längen berechnen (z. B. `ik2` für Knie und Ellbogen), nie Punkte gerade
   überblenden. Sonst werden Glieder in der Bewegung kürzer oder länger.
   Längen: Oberschenkel 80, Unterschenkel 82, Oberarm 56, Unterarm 54, Hand 24, Wirbelsäule Becken–Hals 126.
3. Halte- und Umkehrpunkte mit `ease` weich machen, oben und unten kurz halten.
4. In `EXERCISES` eintragen: `{ pose, yaw, dur }`. `yaw` = Blickwinkel (0 von vorn, 90 von der Seite);
   Standard 38° (halb gedreht), Seitenansicht nur, wenn man die Bewegung sonst nicht sieht (z. B. Push-up).
5. Geräte (Ringe, Stange, Bank, Wand) als eigene Formen im selben Strich, sie bewegen sich mit.

## Regeln für die Darstellung
- Der Bildausschnitt wird aus **allen** Bildern der Bewegung berechnet, plus 26 px Rand (`fitBox`).
  So wird nie etwas abgeschnitten (Kopf, Hände, Füße).
- 12 Bilder pro Sekunde. In der App zeichnet `play(el, übung)` live; im Canvas erzeugt `animatedSVG` eine SVG-Animation.
- Die Figur steht in einer weißen Karte, etwa 270 × 250 px auf dem Handy.
