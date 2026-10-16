#!/usr/bin/env node
// Schreibt die Übungsbibliothek der App (lib-data, fam-data aus index.html) als Obsidian-Notizen nach bibliothek/.
// Aufruf: node design/bibliothek/export.js
// Nur nötig, wenn sich die App-Daten anders als über Obsidian geändert haben (z. B. ein Paket mit einbauen_bibliothek.js).
// Bestehende Notizen behalten alles, was nur in Obsidian steht: Eigenschaften evidenz, status, app und die Abschnitte
// Evidenz, Recherche, Diskussion usw. Neu geschrieben werden nur die Daten aus der App und der Abschnitt „Einordnung“.
'use strict';
const M = require('./md.js');
const { fs, path, VAULT } = M;

const { LIB, FAM } = M.appData();
const UE = {}; LIB.uebungen.forEach((u) => { UE[u.id] = u; });
const LADN = {}; LIB.leitern.forEach((l) => { LADN[l.id] = l.name + ' (Leiter)'; });
const FAMN = {}; FAM.familien.forEach((f) => { FAMN[f.id] = f.name + ' (Familie)'; });
const UEN = (id) => (UE[id] ? M.fileName(UE[id].name) : id);
const famOf = {}; FAM.familien.forEach((f) => (f.varianten || []).forEach((v) => { (famOf[v.uebung] = famOf[v.uebung] || []).push(f.id); }));
const ladOf = {}; LIB.leitern.forEach((l) => (l.stufen || []).forEach((s) => { if (s.uebung) (ladOf[s.uebung] = ladOf[s.uebung] || new Set()).add(l.id); }));

// Bestehende Notizen einlesen (nach id), um Obsidian-eigene Inhalte zu behalten
function existing(dir) {
  const out = {};
  M.listMd(dir).forEach((n) => { if (n.fm && n.fm.id) out[n.fm.id] = n; });
  return out;
}
function keepSections(n, drop) {
  if (!n) return '';
  const parts = n.body.split(/\n(?=## )/);
  return parts.filter((p) => /^## /.test(p) && !drop.includes(/^## (.+)/.exec(p)[1].trim())).map((p) => p.replace(/\s+$/, '')).join('\n\n');
}
function write(rel, txt) { const p = path.join(VAULT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, txt); }
const DISK = '## Diskussion\n> [!dennis]\n>\n';

// Übungen
const oldUe = existing('Übungen');
const DATA_TITLES = M.TEXT.map((t) => t[0]).concat(['Einordnung']);
LIB.uebungen.forEach((u, i) => {
  const o = oldUe[u.id];
  const fm = { id: u.id, name: u.name, pos: i + 1 };
  Object.keys(u).forEach((k) => { if (!M.TEXT_KEYS.includes(k) && !['id', 'name', 'ev'].includes(k)) fm[k] = u[k]; });
  if (o) M.NUR_VAULT.forEach((k) => { if (k !== 'pos' && o.fm[k] !== undefined) fm[k] = o.fm[k]; });
  const links = [];
  (famOf[u.id] || []).forEach((f) => links.push('Familie: [[' + FAMN[f] + ']]'));
  [...(ladOf[u.id] || [])].forEach((l) => links.push('Leiter: [[' + LADN[l] + ']]'));
  (u.voraussetzung || []).forEach((v) => { if (v.uebung) links.push('Setzt voraus: [[' + UEN(v.uebung) + ']]'); });
  const rest = keepSections(o, DATA_TITLES);
  const body = '# ' + u.name + '\n\n## Einordnung\n' + (links.map((x) => '- ' + x).join('\n') || '- (keine Familie, keine Leiter)') + '\n\n'
    + M.writeText(u) + '\n' + (rest ? rest + '\n' : DISK);
  write('Übungen/' + M.fileName(u.name) + '.md', M.note(fm, body));
});

// Leitern
const oldLad = existing('Leitern');
LIB.leitern.forEach((l, i) => {
  const fm = Object.assign({ id: l.id, name: l.name, pos: i + 1 }, l);
  const rest = keepSections(oldLad[l.id], ['Stufen']);
  const body = '# ' + l.name + ' (Leiter)\n\n' + (l.ziel ? 'Ziel: ' + l.ziel + '\n\n' : '') + '## Stufen\n'
    + (l.stufen || []).map((s, j) => (j + 1) + '. ' + s.name + (s.uebung ? ' · [[' + UEN(s.uebung) + ']]' : '')).join('\n')
    + '\n\n(Die Daten stehen oben in den Eigenschaften. Neue Stufen nur hinten anhängen, Namen nie ändern.)\n\n' + (rest ? rest + '\n' : DISK);
  write('Leitern/' + M.fileName(l.name) + ' (Leiter).md', M.note(fm, body, 2));
});

// Familien (fam-data)
const oldFam = existing('Familien');
FAM.familien.forEach((f, i) => {
  const fm = Object.assign({ id: f.id, name: f.name, pos: i + 1 }, f);
  const rest = keepSections(oldFam[f.id], ['Varianten', 'Baut auf', 'Führt zu']);
  const art = { stufe: 'Stufe', variante: 'Variante', tempo: 'Auf Tempo' };
  const body = '# ' + f.name + ' (Familie)\n\n' + (f.kurz || '') + '\n\n## Varianten\n'
    + (f.varianten || []).map((v) => '- ' + (art[v.art] || v.art) + (v.rang ? ' ' + v.rang : '') + ': [[' + UEN(v.uebung) + ']]').join('\n')
    + '\n\n## Baut auf\n' + ((f.voraussetzt || []).map((p) => '- [[' + FAMN[p.familie] + ']] ab Rang ' + p.ab_rang).join('\n') || '- nichts')
    + '\n\n## Führt zu\n' + ((f.fuehrt_zu || []).map((x) => '- [[' + (FAMN[x] || x) + ']]').join('\n') || '- nichts')
    + '\n\n(Die Daten stehen oben in den Eigenschaften.)\n\n' + (rest ? rest + '\n' : DISK);
  write('Familien/' + M.fileName(f.name) + ' (Familie).md', M.note(fm, body, 2));
});

// Daten
const daten = [
  ['Bibliothek', { lib_v: LIB.v, fam_v: FAM.v }, 1, 'Versionsnummern der Datenblöcke in der App. Nicht ändern.'],
  ['Geräte', { geraete: LIB.equipment }, 2, 'Geräte mit Kosten, Nutzen und Score. Je Gerät eine Zeile.'],
  ['Metcon-Pool', { metcon: LIB.metcon }, 2, 'Einträge für den Metcon-Teil. Je Eintrag eine Zeile.'],
  ['Aufwärmen', { aufwaermen: LIB.aufwaermen }, 2, 'Aufwärm-Übungen mit Menge und den Mustern, für die sie passen.'],
  ['Mobility', { mobility: LIB.mobility }, 4, 'Beweglichkeits-Check und Routinen (Cool-down, Ruhetag, Morgen).'],
  ['Familien-Entscheidungen', { entscheidungen: FAM.entscheidungen }, 2, 'Festgehaltene Entscheidungen zu den Familien.'],
];
daten.forEach(([n, fm, flow, txt]) => write('Daten/' + n + '.md', M.note(fm, '# ' + n + '\n\n' + txt + ' Die Daten stehen in den Eigenschaften oben.\n', flow)));
console.log('Export: ' + LIB.uebungen.length + ' Übungen, ' + LIB.leitern.length + ' Leitern, ' + FAM.familien.length + ' Familien nach bibliothek/');
