# Apple Human Interface Guidelines – Nachschlagewerk für den Trainingsplan

Stand: 6. November 2026. Gelesen: „Design principles“ (https://developer.apple.com/design/human-interface-guidelines/design-principles),
alles, worauf sie verlinkt („Getting started“, die Startseite der HIG mit Foundations, Patterns, Components), das Video
„Principles of great design“ (WWDC26, Sitzung 250) und daraus die Seiten, die für eine iPhone-App gelten (84 Seiten).
Seiten nur für Mac, Watch, TV, Vision Pro und Spiele sind ausgelassen.

Die verbindlichen Regeln für die App stehen in `DESIGN.md` › „Prinzipien nach Apple“. Hier stehen die Quellen dazu: was Apple
sagt, kurz und auf Deutsch, damit wir bei jeder Frage nachsehen können, ohne die Seiten neu zu lesen.

## Die neun Prinzipien (Seite „Design principles“, Video WWDC26/250)
1. **Purpose (Zweck)**: Wert schaffen, fokussiert bleiben, das Problem auf eigene Art lösen. Bei jeder Funktion fragen, wofür sie da ist.
   Jede Funktion kostet Zeit, Aufmerksamkeit und Vertrauen; zu entscheiden, was man weglässt, ist genauso wichtig.
2. **Agency (Selbstbestimmung)**: nicht im Weg stehen, direkt zur Aufgabe führen. Freiheit zum Erkunden, geführte Abläufe überspringbar.
   Fehler verzeihen: Rückgängig, Bestätigung nur bei Zerstörerischem. Unterbrechungen sparsam.
3. **Responsibility (Verantwortung)**: offen sagen, was die App tut und warum. Nur Daten erheben, die nötig sind, im richtigen Moment fragen.
   Fragen, wie etwas schaden könnte, und Schutz einbauen (Vorschau, Bestätigung, Hinweis).
4. **Familiarity (Vertrautheit)**: bekannte Konzepte und Metaphern. Gleiches sieht gleich aus und verhält sich gleich, Aktionen stehen auf
   jeder Seite an derselben Stelle. Bekannte Symbole nicht umdeuten. Klares Feedback mit System-Mustern.
5. **Flexibility (Anpassbarkeit)**: für alle gestalten, Barrierefreiheit von Anfang an. Kontext bewahren: Inhalt und Steuerung an festen,
   vorhersehbaren Stellen, natürliche Übergänge. Verschiedene Eingaben (Touch, Tastatur, Stimme). Jede Plattform mit derselben Sorgfalt.
6. **Simplicity (Einfachheit)**: nur, was nötig ist. Einfach ist nicht minimal: etwas zu verstecken macht eine Seite leer, aber nicht einfach.
   Knapp formulieren. Hierarchie über Reihenfolge, Abstand und Kontrast: das Wichtigste ist das Auffälligste. Manchmal heißt einfach, Kontext dazuzugeben.
7. **Craft (Handwerk)**: Qualität setzt den Ton. Typografie, Farben für Hell und Dunkel, klare Grafiken, flüssige Animationen, präzise Worte,
   durchdachter Ton. Wackeliges Scrollen, verrutschte Symbole, kaputte Layouts lassen Software zerbrechlich wirken. Immer weiter verfeinern.
8. **Delight (Freude)**: das Gefühl festlegen, das die App auslösen soll (eine Fitness-App darf Energie geben), und es überall stützen.
   Prägende Momente schaffen. Freude ist keine Dekoration, sie entsteht aus allem anderen.
9. **Consider the whole**: Freude ist die Summe: Freiheit zu handeln, Sicherheit beim Erkunden, vertraute Metaphern, Wechsel ohne Bruch.

## Typografie (Seite „Typography“)
- iPhone: Standardgröße 17 pt, Minimum 11 pt. Keine dünnen Schnitte (Ultralight, Thin, Light); Regular, Medium, Semibold, Bold.
- Hierarchie über Größe, Gewicht und Farbe; wenige Schriften. Bei größerer Schrift die Hierarchie behalten, Wichtiges wächst zuerst.
- Textstile iOS (Größe „Large“, Standard):

| Stil | Gewicht | Größe pt | Zeilenhöhe pt | Betont |
|---|---|---|---|---|
| Large Title | Regular | 34 | 41 | Bold |
| Title 1 | Regular | 28 | 34 | Bold |
| Title 2 | Regular | 22 | 28 | Bold |
| Title 3 | Regular | 20 | 25 | Semibold |
| Headline | Semibold | 17 | 22 | Semibold |
| Body | Regular | 17 | 22 | Semibold |
| Callout | Regular | 16 | 21 | Semibold |
| Subhead | Regular | 15 | 20 | Semibold |
| Footnote | Regular | 13 | 18 | Semibold |
| Caption 1 | Regular | 12 | 16 | Semibold |
| Caption 2 | Regular | 11 | 13 | Semibold |

- Dynamic Type: Layout muss bei jeder Schriftgröße funktionieren, nebeneinander Liegendes stapelt sich bei großer Schrift, möglichst nichts abschneiden.
- Systemschrift ist SF Pro (Rounded als Variante für weiche, runde Oberflächen). SF darf nicht eingebettet werden.

## Layout (Seite „Layout“)
- Wichtigstes oben und vorne. Ausrichten, um Zusammengehöriges zu zeigen; Einrücken zeigt Unterordnung.
- Zusammengehöriges gruppieren (Abstand, Fläche, Trennlinie). Schrittweise zeigen statt alles auf einmal.
- Steuerung vom Inhalt trennen: Bedienelemente schweben als eigene Ebene (Liquid Glass) über dem Inhalt.
- Sichere Bereiche (Notch, Home-Balken) einhalten. Größenklassen statt Gerätetyp.

## Farbe (Seiten „Color“, „Dark Mode“)
- Dieselbe Farbe nie für zwei Bedeutungen. Wenn die Markenfarbe „tippbar“ heißt, kein Text in dieser Farbe, der nicht tippbar ist.
- Jede Farbe für Hell, Dunkel und erhöhten Kontrast. Nie nur Farbe zur Unterscheidung (Text oder Form dazu).
- Semantische Farben: Label, Secondary, Tertiary, Quaternary Label; Hintergründe primär, sekundär, tertiär (bzw. gruppiert).
- Liquid Glass: Farbe sparsam, nur für Hervorhebung (Status, Hauptaktion), dann auf dem Hintergrund, nicht auf Text oder Symbol.
- Dark Mode: keine eigene Hell/Dunkel-Einstellung in der App, dem System folgen. Kontrast mindestens 4,5:1.
  Dunkel hat zwei Ebenen: Basis (dunkler) und erhöht (heller, für Blätter und Popover).

## Materialien (Seite „Materials“)
- Liquid Glass ist die Ebene für Steuerung und Navigation (Tab-Leiste, Werkzeugleisten, Seitenleisten), nicht für den Inhalt.
- Im Inhalt Standard-Materialien bzw. feste Flächen. Ausnahme: Regler und Schalter werden beim Bedienen kurz zu Glas.
- Glas-Effekte bei eigenen Elementen sparsam, nur für die wichtigsten Funktionen.

## Bewegung und Haptik (Seiten „Motion“, „Playing haptics“, „Feedback“)
- Bewegung mit Zweck, nie um der Bewegung willen. Bei häufigen Aktionen keine zusätzliche Animation. Animationen abbrechbar, kurz und präzise.
- Bewegung nie als einziger Träger einer Information, „Bewegung reduzieren“ beachten.
- Haptik nach ihrer Bedeutung (Auswahl, Aufprall, Erfolg/Warnung/Fehler), sparsam, abschaltbar, immer zusammen mit Bild und Ton.
- Feedback passend zur Wichtigkeit: Status still und nah am Inhalt, Warnung nur bei unerwartetem, nicht umkehrbarem Verlust.

## Bedienelemente (Components)
- **Buttons**: Tippfläche mindestens 44 × 44 pt. Immer ein gedrückter Zustand. Höchstens ein bis zwei hervorgehobene Knöpfe je Ansicht.
  Unterschiede über den Stil, nicht über die Größe. Beschriftung mit Verb. Zerstörerisches nie als Hauptknopf.
- **Toggles**: Schalter nur in einer Listenzeile, Standardfarbe Grün (oder Akzent), aus = grau. Außerhalb von Listen ein Knopf, der hervorgehoben wird.
  Zustand nicht nur über Farbe zeigen.
- **Segmented control**: höchstens etwa 5 Segmente auf dem iPhone, alle gleich breit, entweder nur Text oder nur Symbole, Nomen als Beschriftung.
- **Stepper**: steht neben dem Wert, den er ändert; bei großen Sprüngen zusätzlich Eingabe.
- **Sheets**: links Abbrechen, rechts Fertig; nie Fertig allein. Griff oben, Wischen nach unten schließt (bei ungesicherten Änderungen nachfragen).
  Immer nur ein Blatt. Mittlere Höhe für schrittweises Zeigen.
- **Tab bar**: nur Navigation, keine Aktionen. Immer sichtbar (außer unter modalen Ansichten). **Jeder Tab mit Beschriftung**, ein Wort,
  gefüllte Symbole. Tabs nie verstecken oder deaktivieren.
- **Lists and tables**: Text in Listen, knapp. Gruppierter Stil mit Abstand zwischen Gruppen. Pfeil (Disclosure) nur, wenn es tiefer geht; (i) nur für Infos.
- **Progress indicators**: wenn möglich mit bekanntem Fortschritt, gleichmäßig, immer an derselben Stelle.
- **Alerts**: sparsam, nur für Kritisches mit Handlung, nie beim Start, nicht bei üblichen, rückgängig machbaren Aktionen.
- **Modality**: nur mit klarem Nutzen, kurz, Titel nennt die Aufgabe, immer ein klarer Ausweg, nie zwei modale Ansichten übereinander.
- **Activity rings**: nur Apples Bewegen/Trainieren/Stehen, nie nachbauen, nie andere Daten in ähnlichen Ringen.

## Muster (Patterns)
- **Workouts**: während des Trainings nur, was jetzt zählt. Aktive Einheit auf einen Blick erkennbar. Pause/Weiter/Ende leicht zu finden und zu treffen,
  klares Feedback bei Start und Stopp. Am Ende eine Zusammenfassung. Sehr kurze Einheiten verwerfen bzw. nachfragen.
  **Text in Bewegung lesbar: große Schrift, hoher Kontrast, das Wichtigste am leichtesten zu lesen.**
- **Onboarding**: kurz, überspringbar, lieber Tipps im Kontext; Einstellungen mit vernünftigen Standardwerten statt Fragen.
- **Loading**: sofort etwas zeigen, Fortschritt ehrlich.
- **Writing**: Stimme festlegen, Ton zur Lage passend, klar und knapp. Knöpfe mit Verb („Speichern“, nicht „Los geht’s!“).
  Possessivpronomen sparsam („Favoriten“ statt „Deine Favoriten“), kein „wir“. Fehlermeldungen nah am Problem, ohne Schuld, mit Lösung.
  Leere Seiten sagen, was als Nächstes zu tun ist.
- **Accessibility**: Kontrast 4,5:1, nie nur Farbe, 44-pt-Ziele mit etwa 12 pt Abstand (ohne Rahmen 24 pt), Alternativen zu Gesten,
  keine Elemente, die sich nach Zeit selbst schließen, „Bewegung reduzieren“ (Federn straffer, Überblenden statt Bewegen, nicht in Unschärfe animieren).

## Plattform-Grenzen (warum wir nicht alles 1:1 übernehmen können)
- Die App ist eine Web-App (PWA) und läuft vor allem auf Android in Chrome. SF Pro darf nicht eingebettet und nicht auf Nicht-Apple-Geräten
  verwendet werden; wir brauchen eine eingebettete Schrift (offline). Darum Geist mit Apples Textstilen (Größen, Gewichte, Zeilenhöhen).
- Liquid Glass und Dynamic Type gibt es im Browser nicht als System-Baustein; wir bilden sie nach (Glas über `backdrop-filter`, Textgröße über die eigene Einstellung).
