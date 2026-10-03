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
1. Eine Funktion `pose(p)` schreiben: `p` läuft von 0 bis 1 über eine Wiederholung. Am einfachsten mit `build({...})`:
   - `pc` Beckenmitte, `a` Rumpfwinkel (0 aufrecht, 90 bäuchlings mit Kopf nach vorn, -90 rücklings, 180 kopfüber),
     `nod` Kopf zur Brust in Grad.
   - `arms` und `legs` je Seite (`a` = linke Bildseite von vorn, `b` = rechte): `to` = wohin Handgelenk bzw. Knöchel soll,
     `pole` = Richtung, in die Ellbogen bzw. Knie zeigen, `dir` = Richtung von Hand bzw. Fuß.
   - Ellbogen und Knie rechnet `build` mit festen Längen aus (`ik3`), nie Punkte gerade überblenden.
     Längen: Oberschenkel 80, Unterschenkel 82, Oberarm 56, Unterarm 54, Hand 24, Fuß 24, Becken–Hals 126.
   - Koordinaten: x rechts, y unten, z nach vorn (Blickrichtung der Figur). Boden bei y = 397 (Zehen), Knöchel bei 384–390.
2. Ablauf mit `rep(p, runter, halten)` (runter, unten halten, hoch, oben halten) oder `sway(p, stärke)` für Halteübungen.
   Feste Kontaktpunkte (Hände am Boden, Füße am Boden, Hände an den Ringen) bleiben fest, der Körper bewegt sich darum.
3. Geräte als `props`: `rings(x, y, z, oben)`, `bench(z0, z1, y, breite)`, `wall(z)`, sonst `line`, `poly`, `circle`
   (Kreis in der y-z-Ebene, `hub` für Nabe). `layer`: `back` (hinter der Figur), `mid` (zwischen den Seiten), `front`.
   `keep: true` = gehört in den Bildausschnitt.
4. In `EXERCISES` mit der ID aus der Übungsbibliothek eintragen: `{ name, pose, yaw, dur, floor }`.
   `yaw`: 38 (halb gedreht) für Zug und Kniebeugen, 55–70 (eher seitlich) für Boden-Übungen.
   `floor: false`, wenn die Figur hängt oder stützt (Ringe), dann keine Bodenlinie.
5. Prüfen mit Standbildern (Start, Mitte, Umkehrpunkt), dann animiert. Dabei nachmessen, nicht nur schauen:
   - Geräte, die man hält (Rad, Hantel), werden aus den berechneten Handgelenken gesetzt, damit die Hände nie abheben.
   - Kniebeugen gehen unten **below parallel**: Hüftgelenk tiefer als das Knie.
   - **Volle Bewegung (Range of Motion):** wo der Arm oder das Bein gestreckt ist (toter Hang, Dip oben, Push-up oben,
     Handstand, gestreckte Beine), muss das Gelenk mindestens 175° haben. Schon 1 px zu kurz knickt sichtbar ein.
     Deshalb das Ziel für gestreckte Glieder 3–5 px über die volle Länge hinaus setzen (die Lücke zur Hand bleibt unsichtbar).
     Nachmessen mit `node design/maskottchen/pruefen.js`.
   - Die andere Seite ebenso: Pull-up oben Kinn über dem Ring, Dip unten Oberarm waagerecht, Push-up unten Brust etwa eine Faust über dem Boden.
   - Endpositionen sauber wie im Testtag-Text, z. B. Glute Bridge oben Schulter, Hüfte, Knie in einer Linie (kein Hohlkreuz).

Vorhanden: g_air, g_pullup, g_push, g_pistol, g_nordic, g_hollow, g_handstand, g_dip, g_bridge, g_chinup, g_bss, g_abwheel.

## Regeln für die Darstellung
- Der Bildausschnitt wird aus **allen** Bildern der Bewegung berechnet, plus 26 px Rand (`fitBox`).
  So wird nie etwas abgeschnitten (Kopf, Hände, Füße).
- 12 Bilder pro Sekunde. In der App zeichnet `play(el, übung)` live; im Canvas erzeugt `animatedSVG` eine SVG-Animation.
  `play` hört von selbst auf, wenn das Element nicht mehr auf der Seite ist, und zeigt bei „Bewegung reduzieren“ nur ein Standbild.
- In der App steckt eine Kopie dieser Datei in `index.html` (`<script id="maskottchen">`). Nach jeder Änderung hier die Kopie ersetzen.
- Die Figur steht in einer weißen Fläche, 200 px hoch über die ganze Kartenbreite (`.fig`), in Bibliothek und Training gleich.
