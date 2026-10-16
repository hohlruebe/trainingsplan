#!/usr/bin/env node
// Baut lib-data und fam-data der App aus der Obsidian-Bibliothek (bibliothek/) und schreibt sie in index.html
// und design/familien.json. Aufruf: node design/bibliothek/bauen.js   (mit --trocken: nur prüfen, nichts schreiben)
// Übungen mit app: false (z. B. neue Übungen aus der Recherche ohne fertige Anleitung) bleiben nur in Obsidian.
'use strict';
const M = require('./md.js');
const { fs, path } = M;

function fail(msg) { const e = new Error(msg); e.bib = true; throw e; }
function one(dir, name) {
  const n = M.listMd(dir).find((x) => path.basename(x.file) === name + '.md');
  if (!n) fail('fehlt: ' + dir + '/' + name + '.md');
  return n.fm;
}
const byPos = (a, b) => (a.fm.pos || 1e9) - (b.fm.pos || 1e9) || String(a.fm.id).localeCompare(String(b.fm.id));
const strip = (fm) => { const r = Object.assign({}, fm); M.NUR_VAULT.forEach((k) => delete r[k]); return r; };

function build() {
  const ver = one('Daten', 'Bibliothek');
  const ue = [];
  const seen = new Set();
  M.listMd('Übungen').sort(byPos).forEach((n) => {
    const fm = n.fm;
    if (!fm.id) fail(path.basename(n.file) + ': Eigenschaft id fehlt');
    if (seen.has(fm.id)) fail('id doppelt: ' + fm.id);
    seen.add(fm.id);
    if (fm.app === false) return;
    const sec = M.sections(n.body);
    const u = strip(fm);
    M.TEXT.forEach(([title, key, kind]) => {
      if (sec[title] !== undefined) u[key] = M.parseText(sec[title], kind);
      else if (kind === 'p') u[key] = '';
      else u[key] = [];
    });
    if (fm.evidenz) u.ev = evKurz(fm.evidenz);
    ue.push(M.ordered(u, M.UE_ORDER));
  });
  const lad = M.listMd('Leitern').sort(byPos).map((n) => strip(n.fm));
  const fam = M.listMd('Familien').sort(byPos).map((n) => strip(n.fm));
  const LIB = { v: ver.lib_v, equipment: one('Daten', 'Geräte').geraete, uebungen: ue, leitern: lad,
    metcon: one('Daten', 'Metcon-Pool').metcon, aufwaermen: one('Daten', 'Aufwärmen').aufwaermen, mobility: one('Daten', 'Mobility').mobility };
  const FAM = { v: ver.fam_v, familien: fam, entscheidungen: one('Daten', 'Familien-Entscheidungen').entscheidungen };
  // Verweise prüfen: jede Leiterstufe, Familienvariante und Voraussetzung zeigt auf eine Übung in der App
  const ids = new Set(ue.map((u) => u.id));
  lad.forEach((l) => (l.stufen || []).forEach((s) => { if (s.uebung && !ids.has(s.uebung)) fail('Leiter ' + l.id + ': Stufe zeigt auf ' + s.uebung + ', die nicht in der App ist'); }));
  fam.forEach((f) => (f.varianten || []).forEach((v) => { if (!ids.has(v.uebung)) fail('Familie ' + f.id + ': ' + v.uebung + ' nicht in der App'); }));
  return { LIB, FAM };
}

// Evidenz für die App (kurz): Stufen 0–3 je Endpunkt, Bezug, Gruppenhinweise. Quellen bleiben in Obsidian.
const EVS = { keine: 0, schwach: 1, mittel: 2, stark: 3 };
function evKurz(e) {
  const r = { b: e.bezug || 'uebung' };
  ['aktivierung', 'belastung', 'wirkung', 'gesundheit'].forEach((k) => { if (e[k] !== undefined && e[k] !== null) r[k[0] === 'w' ? 'w' : k.slice(0, 3)] = EVS[e[k]] !== undefined ? EVS[e[k]] : e[k]; });
  if (e.von) r.von = e.von;
  if (e.quellen_geprueft) r.q = true;
  if (e.muster) r.m = e.muster;
  if (e.gruppen && e.gruppen.length) r.gr = e.gruppen.map((g) => ({ g: g.gruppe, b: g.bewertung, h: g.hinweis }));
  return r;
}

module.exports = { build, evKurz };

if (require.main === module) {
  let out;
  try { out = build(); } catch (e) { if (e.bib) { console.log('Abbruch: ' + e.message); process.exit(1); } throw e; }
  const { LIB, FAM } = out;
  console.log('Bibliothek: ' + LIB.uebungen.length + ' Übungen in der App, ' + LIB.leitern.length + ' Leitern, ' + FAM.familien.length + ' Familien');
  if (process.argv.includes('--trocken')) process.exit(0);
  let html = M.readHtml();
  html = html.replace(M.blockRe('lib-data'), (m, a, b, c) => a + JSON.stringify(LIB) + c).replace(M.blockRe('fam-data'), (m, a, b, c) => a + JSON.stringify(FAM) + c);
  fs.writeFileSync(M.HTML, html);
  fs.writeFileSync(path.join(M.ROOT, 'design', 'familien.json'), require('../auftraege/familien_format.js')(FAM));
  console.log('Geschrieben: index.html (lib-data, fam-data) und design/familien.json');
}
