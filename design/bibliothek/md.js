// Gemeinsame Bausteine für die Übungsbibliothek in Obsidian (Ordner bibliothek/).
// Obsidian führt: Jede Übung, Leiter und Familie ist eine Markdown-Notiz. Maschinenfelder stehen in den Eigenschaften
// (YAML-Frontmatter), die Anleitungstexte als feste Abschnitte im Text. export.js schreibt die Notizen aus der App,
// bauen.js baut daraus lib-data und fam-data. tests/bibliothek.cjs prüft, dass beides genau dieselben Daten ergibt.
'use strict';
const fs = require('fs');
const path = require('path');
const yaml = require('./js-yaml.min.js');

const ROOT = path.join(__dirname, '..', '..');
const VAULT = path.join(ROOT, 'bibliothek');
const HTML = path.join(ROOT, 'index.html');

// Abschnitte mit Daten (Überschrift → Feld). Alle anderen Abschnitte (Einordnung, Evidenz, Recherche, Diskussion) liest der Build nicht.
const TEXT = [
  ['Zweck', 'zweck', 'p'],
  ['Vorbereitung', 'vorbereitung', 'p'],
  ['So geht’s', 'schritte', 'ol'],
  ['Raus', 'ausstieg', 'p'],
  ['Sauber, wenn', 'sauber', 'p'],
  ['Technik', 'details', 'ul'],
  ['Atmung', 'atmung', 'p'],
  ['Häufige Fehler', 'fehler', 'fk'],
  ['Leichter und schwerer', 'skalierung', 'p'],
  ['Wann aufhören', 'grenzen', 'p'],
  ['Trainiert', 'trainiert', 'p'],
];
const TEXT_KEYS = TEXT.map((t) => t[1]);
// Reihenfolge der Felder einer Übung in lib-data (wie bisher; koerper und art nur bei Mobility).
const UE_ORDER = ['id', 'name', 'muster', 'bereich', 'koerper', 'art', 'einheit', 'seitig', 'rolle', 'equipment', 'nutzen', 'level', 'voraussetzung',
  'trainiert', 'schritte', 'sauber', 'fehler', 'skalierung', 'muskeln', 'gelenke', 'bewegt', 'sehne', 'ermuedung', 'technik', 'laut', 'rx', 'alias',
  'zweck', 'vorbereitung', 'ausstieg', 'details', 'atmung', 'grenzen', 'ev'];
// Nur in Obsidian, nicht in der App
const NUR_VAULT = ['pos', 'app', 'evidenz', 'status'];

const dump = (o, flow) => yaml.dump(o, { flowLevel: flow, lineWidth: -1, noRefs: true, quotingType: '"' });
function fileName(n) { return n.replace(/[\\/:*?"<>|#^[\]]/g, '-'); }

function readHtml() { return fs.readFileSync(HTML, 'utf8'); }
const blockRe = (id) => new RegExp('(<script id="' + id + '"[^>]*>)([\\s\\S]*?)(</script>)');
function appData(html) {
  html = html || readHtml();
  return { LIB: JSON.parse(blockRe('lib-data').exec(html)[2]), FAM: JSON.parse(blockRe('fam-data').exec(html)[2]) };
}

function split(md) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(md.replace(/\r\n/g, '\n'));
  if (!m) return { fm: {}, body: md };
  return { fm: yaml.load(m[1]) || {}, body: m[2] };
}
// „[[“ in den Eigenschaften würde Obsidian als Link lesen: verschachtelte Listen bekommen ein Leerzeichen („[ [“).
function note(fm, body, flow) {
  const y = dump(fm, flow === undefined ? 1 : flow).replace(/\[\[/g, '[ [').replace(/\]\]/g, '] ]');
  return '---\n' + y + '---\n' + body.replace(/\s+$/, '') + '\n';
}

// Abschnitte „## Titel“ → { Titel: [Zeilen] }
function sections(body) {
  const out = {}; let cur = null;
  body.split('\n').forEach((l) => {
    const h = /^##\s+(.+?)\s*$/.exec(l);
    if (h) { cur = h[1]; out[cur] = []; return; }
    if (/^#\s/.test(l)) { cur = null; return; }
    if (cur) out[cur].push(l);
  });
  return out;
}
function parseText(lines, kind) {
  const ls = lines.map((l) => l.replace(/\s+$/, ''));
  if (kind === 'p') return ls.filter((l) => l.trim()).map((l) => l.trim()).join(' ');
  if (kind === 'ol') return ls.map((l) => /^\s*\d+[.)]\s+(.*)$/.exec(l)).filter(Boolean).map((m) => m[1].trim());
  if (kind === 'ul') return ls.map((l) => /^\s*[-*]\s+(.*)$/.exec(l)).filter(Boolean).map((m) => m[1].trim());
  const out = [];
  ls.forEach((l) => {
    let m = /^[-*]\s+(.*)$/.exec(l);
    if (m) { out.push({ f: m[1].trim(), k: '' }); return; }
    m = /^\s+(?:→|->)\s*(.*)$/.exec(l);
    if (m && out.length) out[out.length - 1].k = (out[out.length - 1].k ? out[out.length - 1].k + ' ' : '') + m[1].trim();
  });
  return out;
}
function writeText(u) {
  return TEXT.map(([title, key, kind]) => {
    const v = u[key];
    if (v === undefined) return '';
    let s;
    if (kind === 'p') s = v;
    else if (kind === 'ol') s = v.map((x, i) => (i + 1) + '. ' + x).join('\n');
    else if (kind === 'ul') s = v.map((x) => '- ' + x).join('\n');
    else s = v.map((x) => '- ' + x.f + '\n  → ' + x.k).join('\n');
    return '## ' + title + '\n' + s + '\n';
  }).filter(Boolean).join('\n');
}

function listMd(dir) {
  const d = path.join(VAULT, dir);
  if (!fs.existsSync(d)) return [];
  return fs.readdirSync(d).filter((f) => f.endsWith('.md')).sort().map((f) => ({ file: path.join(d, f), ...split(fs.readFileSync(path.join(d, f), 'utf8')) }));
}
function ordered(o, order) {
  const r = {};
  order.forEach((k) => { if (o[k] !== undefined) r[k] = o[k]; });
  Object.keys(o).forEach((k) => { if (r[k] === undefined && o[k] !== undefined) r[k] = o[k]; });
  return r;
}

module.exports = { fs, path, yaml, ROOT, VAULT, HTML, TEXT, TEXT_KEYS, UE_ORDER, NUR_VAULT, dump, fileName, readHtml, blockRe, appData,
  split, note, sections, parseText, writeText, listMd, ordered };
