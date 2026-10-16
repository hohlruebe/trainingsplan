// Obsidian-Bibliothek (bibliothek/): Obsidian führt, die App wird daraus gebaut.
// Prüft: (1) lib-data und fam-data in index.html sind genau das, was design/bibliothek/bauen.js aus den Notizen baut,
// (2) Ein- und Auslesen verliert nichts (Export → Build), (3) Notizen bleiben lesbar, wenn Obsidian die Eigenschaften
// umformatiert, (4) Evidenz-Feld ev ist gültig, (5) neue Übungen mit app: false kommen nicht in die App.
// Ausführen: node tests/bibliothek.cjs (ohne Browser)
const assert = require('node:assert/strict');
const M = require('../design/bibliothek/md.js');
const { build } = require('../design/bibliothek/bauen.js');

const app = M.appData();
const b = build();

// 1) Die App ist genau aus Obsidian gebaut
assert.deepEqual(b.LIB, app.LIB, 'lib-data = Build aus bibliothek/ (node design/bibliothek/bauen.js ausführen)');
assert.deepEqual(b.FAM, app.FAM, 'fam-data = Build aus bibliothek/');
assert.equal(M.fs.readFileSync(M.path.join(M.ROOT, 'design', 'familien.json'), 'utf8'), require('../design/auftraege/familien_format.js')(app.FAM), 'design/familien.json gleich fam-data');

// 2) Jede Übung der App hat genau eine Notiz, ids und Namen eindeutig; Texte kommen aus den Abschnitten
const notes = M.listMd('Übungen');
const ids = new Set(), names = new Set();
for (const n of notes) {
  assert.ok(n.fm.id, 'id in ' + n.file);
  assert.ok(!ids.has(n.fm.id), 'id doppelt: ' + n.fm.id); ids.add(n.fm.id);
  assert.ok(!names.has(n.fm.name), 'Name doppelt: ' + n.fm.name); names.add(n.fm.name);
}
for (const u of app.LIB.uebungen) assert.ok(ids.has(u.id), 'Notiz für ' + u.id);
const neu = notes.filter((n) => n.fm.app === false);
for (const n of neu) assert.ok(!app.LIB.uebungen.some((u) => u.id === n.fm.id), 'app: false bleibt draußen: ' + n.fm.id);
const pull = notes.find((n) => n.fm.id === 'g_pullup');
const sec = M.sections(pull.body);
assert.deepEqual(M.parseText(sec['So geht’s'], 'ol'), app.LIB.uebungen.find((u) => u.id === 'g_pullup').schritte, 'Schritte aus dem Abschnitt');

// 3) Obsidian schreibt Eigenschaften gern als Block-YAML um: dasselbe Ergebnis
const blockFm = M.yaml.load(M.yaml.dump(pull.fm, { flowLevel: -1, lineWidth: -1 }));
assert.deepEqual(blockFm, pull.fm, 'Block-YAML liest sich gleich');
assert.deepEqual(M.parseText(['- Fehler eins.', '  → Korrektur eins.', '- Fehler zwei.', '  -> Korrektur zwei.'], 'fk'),
  [{ f: 'Fehler eins.', k: 'Korrektur eins.' }, { f: 'Fehler zwei.', k: 'Korrektur zwei.' }], 'Fehler und Korrektur');
assert.deepEqual(M.parseText(['1. Eins', '2) Zwei', '', '3. Drei'], 'ol'), ['Eins', 'Zwei', 'Drei'], 'nummerierte Schritte');
assert.equal(M.parseText(['', 'Ein Satz.', 'Noch einer.', ''], 'p'), 'Ein Satz. Noch einer.', 'Absatz über zwei Zeilen');

// 4) Evidenz: gültig und kurz
const LEV = (v) => v === undefined || [0, 1, 2, 3].includes(v);
let mit = 0, ueb = 0;
for (const u of app.LIB.uebungen) {
  if (!u.ev) continue;
  mit++; if (u.ev.b === 'uebertragen') ueb++;
  assert.ok(['uebung', 'variante', 'uebertragen'].includes(u.ev.b), 'ev.b bei ' + u.id);
  assert.ok(u.ev.m, 'Bewegungsmuster bei ' + u.id);
  for (const k of ['akt', 'bel', 'w', 'ges']) assert.ok(LEV(u.ev[k]), 'ev.' + k + ' 0–3 bei ' + u.id);
  for (const g of u.ev.gr || []) assert.ok(g.g && ['geeignet', 'angepasst', 'meiden'].includes(g.b), 'Gruppe bei ' + u.id);
  assert.ok(!('quellen' in u.ev), 'Quellen bleiben in Obsidian: ' + u.id);
}
assert.ok(mit >= 300, 'fast jede Übung hat ein Bewegungsmuster');

// 5) Export → Build verliert nichts (in einem Arbeitsordner, bibliothek/ bleibt unberührt)
const os = require('node:os');
const tmp = M.fs.mkdtempSync(M.path.join(os.tmpdir(), 'bib-'));
const { execFileSync } = require('node:child_process');
const copy = (src, dst) => { M.fs.mkdirSync(dst, { recursive: true }); for (const f of M.fs.readdirSync(src)) { const s = M.path.join(src, f), d = M.path.join(dst, f); if (M.fs.statSync(s).isDirectory()) copy(s, d); else M.fs.copyFileSync(s, d); } };
copy(M.path.join(M.ROOT, 'design'), M.path.join(tmp, 'design'));
M.fs.copyFileSync(M.HTML, M.path.join(tmp, 'index.html'));
execFileSync('node', [M.path.join(tmp, 'design', 'bibliothek', 'export.js')], { stdio: 'pipe' });
const M2 = require(M.path.join(tmp, 'design', 'bibliothek', 'md.js'));
const b2 = require(M.path.join(tmp, 'design', 'bibliothek', 'bauen.js')).build();
const noEv = (L) => ({ ...L, uebungen: L.uebungen.map((u) => { const r = { ...u }; delete r.ev; return r; }) });
assert.deepEqual(noEv(b2.LIB), noEv(app.LIB), 'Export aus der App und wieder gebaut: gleich');
assert.deepEqual(b2.FAM, app.FAM, 'Familien: Export und Build gleich');
M2.fs.rmSync(tmp, { recursive: true, force: true });

console.log('Bibliothek: ' + app.LIB.uebungen.length + ' Übungen aus Obsidian gebaut, ' + mit + ' mit Evidenz (' + ueb + ' übertragen), ' + neu.length + ' neue nur in Obsidian. OK');
