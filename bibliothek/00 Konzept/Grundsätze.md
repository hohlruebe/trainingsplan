---
type: konzept
status: entwurf
---
# Grundsätze der Übungsbibliothek

**Ziel:** Eine Bibliothek für langfristig gesundes Training für alle: die Übungen und Leitern der App, dazu für jede Übung, was belegt ist und für wen sie passt.

**Zwei Schichten:**
1. **Übungen, Leitern, Familien** (aus der App): Damit plant der Coach. Sie bleiben, auch wenn es keine eigenen Studien gibt.
2. **Evidenz** (aus der Recherche mehrerer KIs): Je Übung die Eigenschaft `evidenz`, je Bewegungsmuster eine Notiz in Evidenz/. Gestrichen wird nur, was Belege **gegen** sich hat, nicht was unerforscht ist.

## Evidenz je Übung (Eigenschaft `evidenz`)
- `muster`: Bewegungsmuster in Evidenz/ (z. B. Vertikaler Zug)
- `bezug`: **uebung** (eigene Recherche), **variante** (belegt für eine verwandte Übung, `von`), **uebertragen** (nur das Bewegungsmuster ist untersucht)
- `aktivierung`, `belastung`, `wirkung`, `gesundheit`: stark, mittel, schwach, keine
- `gruppen`: Hinweise für Gruppen (vorsichtigste Bewertung der KIs)
- `strittig`: Endpunkte, bei denen die KIs zwei Stufen oder mehr auseinander liegen
- `quellen_geprueft`: ob die Quellen dahinter geprüft sind

Skala: **stark** = Leitlinie, Übersichtsarbeit oder Metaanalyse zu genau diesem Endpunkt · **mittel** = mehrere übereinstimmende Studien · **schwach** = eine Studie oder widersprüchlich · **keine** = nicht untersucht.

Endpunkte: **Aktivierung** (EMG, sagt nicht, ob Training wirkt) · **Gelenkbelastung** · **Trainingswirkung** (Kraft, Muskel, Schnellkraft, Ausdauer, Beweglichkeit, Gleichgewicht, je nach Bereich) · **Gesundheit** (Verletzungen, Stürze, Schmerz, Knochen, Krankheitsrisiken).

## Abgleich-Regel (Vorschlag Claude)
- Je Endpunkt gilt die **niedrigere** Bewertung der KIs.
- Zwei Stufen oder mehr Abstand = **strittig**, wird einzeln geprüft.
- Nennt nur eine KI die Übung, gilt ihre Bewertung mit Vermerk.
- Fällt eine Quelle bei der Prüfung durch, fällt die Bewertung, die auf ihr steht.

**Achtung:** „Claude (eigener Chat)“ ist dasselbe Modell, das hier zusammenführt. Übereinstimmung zwischen beiden ist keine unabhängige Bestätigung.

## Quellen
- Zählen: Leitlinien und Positionspapiere, systematische Übersichtsarbeiten und Metaanalysen, begutachtete Einzelstudien.
- Zählen nicht: Fachbücher, Blogs, Influencer, Foren, Videos, Hersteller- und Shopseiten.
- Jede Quelle wird geprüft: Gibt es sie, und steht die Aussage im Abstract?

## Status
`entwurf` (zusammengeführt) · `besprochen` (Dennis hat kommentiert) · `freigegeben` (setzt nur Dennis)

## Mitarbeiten
> [!dennis] Deine Anmerkung

Claude antwortet darunter mit `> [!claude]`.
