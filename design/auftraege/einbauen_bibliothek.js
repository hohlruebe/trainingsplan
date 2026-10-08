#!/usr/bin/env node
// Baut geprüfte Pakete von Cowork in die App ein: lib-data und fam-data in index.html, dazu design/familien.json.
// Aufruf: node design/auftraege/einbauen_bibliothek.js felder_zug_vertikal.json neu_zug_vertikal.json …
// Prüft zuerst mit pruefen_bibliothek.js und bricht bei Fehlern ab. Die Pakete werden in design/auftraege/pakete/ abgelegt.
// - felder: neue Felder an bestehende Übungen (nichts Bestehendes wird überschrieben außer diesen Feldern)
// - neu: neue Übungen, Geräte und Familien; Stufen werden nach „nach“ eingereiht, alle Ränge neu gezählt und
//   „ab_rang“ in anderen Familien mitgezogen, damit dieselbe Übung vorausgesetzt bleibt.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const HTML = path.join(ROOT, 'index.html');
const FAM_JSON = path.join(ROOT, 'design', 'familien.json');
const ABLAGE = path.join(__dirname, 'pakete');
const FELDER = ['muskeln', 'gelenke', 'bewegt', 'sehne', 'ermuedung', 'technik', 'seitig', 'laut', 'rx', 'alias'];
const UE_KEYS = ['id', 'name', 'muster', 'bereich', 'einheit', 'rolle', 'equipment', 'nutzen', 'level', 'voraussetzung',
  'trainiert', 'schritte', 'sauber', 'fehler', 'skalierung'].concat(FELDER);

const dateien = process.argv.slice(2);
if (!dateien.length) { console.log('Aufruf: node design/auftraege/einbauen_bibliothek.js <datei.json> …'); process.exit(2); }
try { execFileSync('node', [path.join(__dirname, 'pruefen_bibliothek.js')].concat(dateien), { stdio: 'inherit' }); }
catch (e) { console.log('Abbruch: erst die Fehler beheben.'); process.exit(1); }

let html = fs.readFileSync(HTML, 'utf8');
const re = (id) => new RegExp('(<script id="' + id + '"[^>]*>)([\\s\\S]*?)(</script>)');
const LIB = JSON.parse(re('lib-data').exec(html)[2]);
const FAM = JSON.parse(re('fam-data').exec(html)[2]);
const UE = {}; LIB.uebungen.forEach((u) => { UE[u.id] = u; });
const FAMS = {}; FAM.familien.forEach((f) => { FAMS[f.id] = f; });
const pick = (o, keys) => { const r = {}; keys.forEach((k) => { if (o[k] !== undefined) r[k] = o[k]; }); return r; };

// Felder pro Paket teil: felder
function felder(d) {
  d.uebungen.forEach((u) => { Object.assign(UE[u.id], pick(u, FELDER)); });
  console.log('  ' + d.uebungen.length + ' Übungen mit neuen Feldern');
}

// Gerät: Kosten aus dem höchsten Preis, Nutzen aus der Zahl der Übungen, die es brauchen (wächst mit jedem Paket).
function kostenAus(preis) {
  const n = (String(preis).match(/\d[\d.]*/g) || ['0']).map((x) => Number(x.replace(/\./g, '')));
  const max = Math.max.apply(null, n);
  return max <= 30 ? 1 : max <= 100 ? 2 : max <= 200 ? 3 : max <= 600 ? 4 : 5;
}
function geraeteNeuWerten() {
  LIB.equipment.filter((e) => e.auto).forEach((e) => {
    const n = LIB.uebungen.filter((u) => (u.equipment || []).some((g) => g.includes(e.id))).length;
    e.nutzen = n <= 1 ? 1 : n <= 3 ? 2 : n <= 7 ? 3 : n <= 15 ? 4 : 5;
    e.score = Math.round(100 - (e.kosten - 1) * 20 / 3 - (5 - e.nutzen) * 40 / 3);
  });
  LIB.equipment.sort((a, b) => b.score - a.score);
}

// Ränge aller Stufen einer Familie als Liste von Übungs-IDs
const stufen = (f) => f.varianten.filter((v) => v.art === 'stufe').sort((a, b) => a.rang - b.rang);

// Phase 1 (alle Dateien): neue Übungen, Geräte und Familien anlegen
function neuAnlegen(d) {
  d.uebungen.forEach((u) => { const x = pick(u, UE_KEYS); LIB.uebungen.push(x); UE[x.id] = x; });
  (d.geraete_neu || []).forEach((g) => {
    LIB.equipment.push({ id: g.id, name: g.name, kosten: kostenAus(g.preis), nutzen: 1, score: 0, preis: g.preis, platz: g.platz, warum: g.warum, ersetzt: [], auto: true });
  });
  (d.familien_neu || []).forEach((f) => { FAM.familien.push(f); FAMS[f.id] = f; });
  console.log('  ' + d.uebungen.length + ' neue Übungen, ' + (d.geraete_neu || []).length + ' neue Geräte, ' + (d.familien_neu || []).length + ' neue Familien');
}
// Phase 2 (alle Dateien): Rückverweise der neuen Familien, Varianten in bestehende Familien einreihen
function neuEinreihen(d) {
  (d.familien_neu || []).forEach((f) => (f.voraussetzt || []).forEach((p) => {
    const z = FAMS[p.familie]; if (z && !z.fuehrt_zu.includes(f.id)) { z.fuehrt_zu.push(f.id); z.fuehrt_zu.sort(); }
  }));
  (d.familien_ergaenzt || []).forEach((e) => {
    const f = FAMS[e.familie];
    e.varianten.forEach((v) => {
      const x = { uebung: v.uebung, art: v.art, rang: null, effekt: v.effekt };
      if (v.art === 'stufe') x.ziel = v.ziel;
      x.grund = v.grund;
      if (v.auch_in) x.auch_in = v.auch_in;
      if (v.art === 'tempo') x.vermerk = v.vermerk;
      if (v.art === 'stufe') {
        const st = stufen(f), i = v.nach === null ? 0 : st.findIndex((s) => s.uebung === v.nach) + 1;
        st.splice(i, 0, x); st.forEach((s, k) => { s.rang = k + 1; });
        // Stufen vorn, dann Varianten, dann Tempo – in dieser Reihenfolge neu ablegen
        const rest = f.varianten.filter((s) => s.art !== 'stufe');
        f.varianten = st.concat(rest);
      } else {
        const last = f.varianten.map((s) => s.art).lastIndexOf(v.art);
        const vor = v.art === 'variante' ? f.varianten.map((s) => s.art).lastIndexOf('stufe') : f.varianten.length - 1;
        f.varianten.splice((last >= 0 ? last : vor) + 1, 0, x);
      }
    });
  });
}
// ab_rang mitziehen: gleiche Übung bleibt vorausgesetzt
function rangeNachziehen(vorher) {
  FAM.familien.forEach((f) => (f.voraussetzt || []).forEach((p) => {
    const alt = vorher[p.familie] && vorher[p.familie][p.ab_rang - 1];
    if (!alt) return;
    const nr = stufen(FAMS[p.familie]).findIndex((s) => s.uebung === alt) + 1;
    if (nr && nr !== p.ab_rang) { console.log('  ' + f.id + ': ' + p.familie + ' ab Rang ' + p.ab_rang + ' → ' + nr + ' (' + alt + ')'); p.ab_rang = nr; }
  }));
}

if (!fs.existsSync(ABLAGE)) fs.mkdirSync(ABLAGE);
const pakete = dateien.map((datei) => JSON.parse(fs.readFileSync(datei, 'utf8')));
const vorher = {};
FAM.familien.forEach((f) => { vorher[f.id] = stufen(f).map((v) => v.uebung); });
pakete.forEach((d) => { console.log(d.teil + '_' + d.muster + ':'); if (d.teil === 'felder') felder(d); else neuAnlegen(d); });
pakete.filter((d) => d.teil === 'neu').forEach(neuEinreihen);
rangeNachziehen(vorher);
pakete.forEach((d) => fs.writeFileSync(path.join(ABLAGE, d.teil + '_' + d.muster + '.json'), JSON.stringify(d, null, 2) + '\n'));
geraeteNeuWerten();

html = html.replace(re('lib-data'), (m, a, b, c) => a + JSON.stringify(LIB) + c).replace(re('fam-data'), (m, a, b, c) => a + JSON.stringify(FAM) + c);
fs.writeFileSync(HTML, html);
fs.writeFileSync(FAM_JSON, require('./familien_format.js')(FAM));
console.log('Fertig: index.html und design/familien.json aktualisiert.');
