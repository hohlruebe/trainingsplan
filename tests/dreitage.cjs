// Plan 2 (drei Einheiten A, B, C): Wochenplaner, Umfang und Umstellung, ohne Browser. Ausführen: node tests/dreitage.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
function source(name) {
  const start = html.indexOf('function ' + name + '(');
  assert.ok(start >= 0, name);
  const line = html.indexOf('\n', start);
  return html.slice(start, html.slice(start, line).trim().endsWith('}') ? line : html.indexOf('\n}', start) + 2);
}
function constant(name) { const m = html.match(new RegExp('var ' + name + ' = ([\\s\\S]*?);\\n')); assert.ok(m, name); return m[1]; }
let now = '2026-10-12', phase = {};
const V2 = { 1: { type: 'kraft' }, 2: { type: 'rest' }, 3: { type: 'kraft' }, 4: { type: 'rest' }, 5: { type: 'rest' }, 6: { type: 'kraft' }, 7: { type: 'rest' } };
function setup(extra) {
  const c = vm.createContext(Object.assign({
    S: { started: true, durchgang: 5, tag: 1, planWk: '2026-10-12', planV: 2, umfang: { u: 4, ts: 0 }, feldTs: {} },
    LOGS: [], ui: {}, WKP_C: { k: null }, DAYS_K: null, DAYS: V2, KOERPER: [],
    isoToday: () => now, parseISO: s => new Date(s + 'T12:00:00'), isoDate: d => d.toISOString().slice(0, 10),
    daysBetween: (a, b) => Math.round((b - a) / 86400000), pad: n => String(n).padStart(2, '0'),
    saveState() {}, render() {}, blockCheck() {}, planDur: () => .7, missBlocked: () => false, missCarry: () => [],
    curPhase: () => Object.assign({ deload: false, test: false, taper: false }, phase), memList: () => c.KOERPER,
    ladderStates: () => ({}), partScores: () => ({}), dayLabel: t => 'Ganzkörper ' + ({ 1: 'A', 3: 'B', 6: 'C' })[t], esc: String,
    SHIFT: { f: ['Früh', 6, 14], s: ['Spät', 14, 22], n: ['Nacht', 22, 6], t: ['12 h Tag', 6, 18], tn: ['12 h Nacht', 18, 6] }
  }, extra || {}));
  vm.runInContext('var UNIT = ' + constant('UNIT') + '; var UMF = ' + constant('UMF') + ';', c);
  for (const name of ['isoAdd', 'wkMon', 'alltag', 'v2', 'planOn', 'wkEntry', 'arbeitOf', 'wkTimeline', 'dayCls', 'daySlot', 'slotWhy', 'planHard',
    'planPairOk', 'planDropOrder', 'trainingLog', 'wkDoneV2', 'wkPlan', 'doneToday0', 'umfMin', 'umfIdx', 'umfGrow', 'umfDiff', 'planRoll', 'snapName', 'repGoal']) vm.runInContext(source(name), c);
  return c;
}
const units = P => P.days.map(d => d.tag ? ({ 1: 'A', 3: 'B', 6: 'C' })[d.tag] : '-').join('');
const kraft = (date, tag, extra) => Object.assign({ id: date + tag, kind: 'kraft', pv: 2, tag, date, durchgang: 5, kraft: [{ n: 'Push-up', reps: [5, 5, 5, 5] }] }, extra || {});

// Ohne Arbeitszeiten: drei Einheiten mit einem Tag Pause dazwischen, A zuerst.
let c = setup();
assert.equal(c.planOn(), true, 'Plan 2 plant immer in Kalenderwochen');
assert.equal(units(c.wkPlan()), 'A-B-C--');
// Heute nicht → der Rest der Woche wird mit Pausen dazwischen neu verteilt.
c.S.planOv = { '2026-10-12': { off: 1 } };
assert.equal(units(c.wkPlan()), '-A-B-C-');
// Nur Di, Mi, Do frei (sonst 12-h-Dienste): drei hintereinander nie, also A und B mit Pause, C fällt weg.
c = setup();
const T12 = { k: 't', a: 6, b: 18 };
c.S.arbeit = { '2026-10-12': [T12, null, null, null, T12, T12, T12] };
let P = c.wkPlan();
assert.equal(units(P), '-A-B---', 'höchstens zwei Einheiten hintereinander, lieber mit Pause');
assert.equal(JSON.stringify(P.dropped), '[6]', 'C fällt zuerst weg, A und B decken alle Hauptmuster ab');
// Nur Di und Mi frei: zwei Einheiten hintereinander sind erlaubt.
c.S.arbeit = { '2026-10-12': [T12, null, null, T12, T12, T12, T12] };
assert.equal(units(c.wkPlan()), '-AB----', 'zwei in Folge sind erlaubt');
// Letzte Woche Sa und So trainiert → Montag keine dritte Einheit in Folge.
c = setup(); now = '2026-10-12';
c.LOGS.push(kraft('2026-10-10', 3), kraft('2026-10-11', 6));
assert.notEqual(c.wkPlan().days[0].tag, 1, 'Sonntag und Samstag zählen über die Wochengrenze');
// Nächste Woche schaut auf die Planung dieser Woche (Sa, So geplant).
c = setup(); now = '2026-10-15';
c.S.tag = 1; c.S.planOv = { '2026-10-15': { off: 1 }, '2026-10-16': { off: 1 } };
const cur = c.wkPlan(), nxt = c.wkPlan('2026-10-19');
if (cur.days[5].tag && cur.days[6].tag) assert.equal(nxt.days[0].tag, null, 'kein drittes Training am Montag nach Sa und So');
console.log('PASS: Wochenplan ohne Arbeitszeiten, Heute nicht, höchstens zwei in Folge, C fällt zuerst weg, Wochengrenze');

// Schicht: Übergangstage (vor der ersten, nach der letzten Nacht) nur, wenn es nicht anders geht.
now = '2026-10-13'; c = setup();
c.S.alltag = { on: true, bed: 22.5, wake: 6.5, schicht: true, weg: 15 };
c.S.arbeit = { '2026-10-12': [{ k: 'f', a: 6, b: 14 }, { k: 'f', a: 6, b: 14 }, { k: 's', a: 14, b: 22 }, { k: 's', a: 14, b: 22 }, { k: 'n', a: 22, b: 6 }, { k: 'tn', a: 18, b: 6 }, null] };
P = c.wkPlan();
assert.equal(P.days[1].tag, 1, 'A am Dienstag nach der Frühschicht');
assert.ok(P.days[2].tag || P.days[3].tag, 'B vor einer Spätschicht statt am Übergangstag');
assert.equal(P.days[4].tag, null, 'kein Training direkt vor der ersten Nacht, wenn andere Tage passen');
console.log('PASS: Schichtwoche mit Übergangstagen');

// Woche der Umstellung: frühere Krafttage zählen als erledigte Einheiten, alte Läufe nicht.
now = '2026-10-14'; c = setup();
c.LOGS.push({ id: 'o1', kind: 'kraft', tag: 3, date: '2026-10-12', kraft: [] }, { id: 'o2', kind: 'easy', tag: 2, date: '2026-10-13' });
const done = c.wkDoneV2('2026-10-12', {});
assert.equal(JSON.stringify(done), JSON.stringify({ '2026-10-12': 1 }));
assert.equal(units(c.wkPlan()).replace(/-/g, '').length, 2, 'nur noch B und C diese Woche');
console.log('PASS: Umstellung mitten in der Woche ohne doppelte Einheiten');

// Umfang: Zeitlimit deckelt die Stufe, 90 Min sind hart.
now = '2026-10-12'; c = setup();
assert.equal(c.umfMin(c.UMF[0]), 25, 'Einstieg 25 Min mit Vorlauf und Wechseln');
c.S.umfang = { u: 12 }; assert.ok(c.umfMin(c.UMF[c.umfIdx()]) + 8 <= 90);
c.S.zeitMax = 30; assert.ok(c.umfMin(c.UMF[c.umfIdx()]) + 8 <= 30 || c.umfIdx() === 0, 'Zeitlimit 30 Min gilt auch nach einer Erhöhung');
// Wachsen: 6 vollständige Einheiten in 2 Wochen → eine Stufe mehr, einmal.
c = setup(); now = '2026-10-19';
for (let i = 0; i < 6; i++) c.LOGS.push(kraft(c.isoAdd(now, -13 + i * 2), [1, 3, 6][i % 3]));
c.S.umfang = { u: 4, ts: Date.parse('2026-09-01') };
assert.equal(c.umfGrow().u, 5, 'eine Stufe mehr');
assert.equal(c.umfGrow(), null, 'frühestens nach 14 Tagen wieder');
// Nicht bei Kurzversion, fehlenden Runden, Beschwerden, Entlastung.
c = setup(); now = '2026-10-19';
for (let i = 0; i < 6; i++) c.LOGS.push(kraft(c.isoAdd(now, -13 + i * 2), 1, i === 0 ? { kurz: true } : {}));
assert.equal(c.umfGrow(), null, 'Kurzversion zählt nicht als vollständig');
c = setup(); now = '2026-10-19';
for (let i = 0; i < 6; i++) c.LOGS.push(kraft(c.isoAdd(now, -13 + i * 2), 1, { kraft: [{ n: 'Push-up', goal: 5, reps: [5, 3, 3, 3] }] }));
assert.equal(c.umfGrow(), null, 'gemeldete Runden unter der Vorgabe halten den Umfang');
c = setup(); now = '2026-10-19';
for (let i = 0; i < 6; i++) c.LOGS.push(kraft(c.isoAdd(now, -13 + i * 2), 1));
c.KOERPER.push({ k: 'j', id: 'knie' }); assert.equal(c.umfGrow(), null, 'akute Beschwerde hält den Umfang');
c.KOERPER.length = 0; phase = { deload: true }; assert.equal(c.umfGrow(), null, 'nicht vor der Entlastung'); phase = {};
c.S.zeitMax = 30; c.S.umfang = { u: 0, ts: 0 }; assert.equal(c.umfGrow(), null, 'nie über das Zeitlimit');
assert.equal(c.umfDiff(1, 2), 'Kraft 4 statt 3 Runden');
console.log('PASS: Umfang mit Zeitlimit, Wachsen nur nach geschafften Wochen, Halten bei Beschwerden und Entlastung');

// Gemerkte Termine behalten ihren Namen über die Umstellung.
c = setup();
assert.equal(c.snapName({ tag: 3, pv: 1 }), 'Ein Training', 'alter Tag 3 heißt nicht plötzlich B');
assert.equal(c.snapName({ tag: 3, pv: 2 }), 'Ganzkörper B');
assert.equal(c.snapName({ tag: 3, pv: 1, n: 'Zug' }), 'Zug');
console.log('PASS: Termine aus dem alten Plan behalten ihre Bedeutung');

// Vorgabe im EMOM: der Coach gibt die Wdh. vor, gemeldet wird nur, was nicht geklappt hat.
c = setup({ S: { base: { 'Ring Dip': { stage: 'Stark', start: 4 } } } });
const X = { n: 'Ring Dip', target: '3–6', hi: 6 }, log = (reps, extra) => c.LOGS.push({ id: 'g' + c.LOGS.length, kind: 'kraft', date: '2026-10-01', kraft: [Object.assign({ n: 'Ring Dip', stage: 'Stark', reps }, extra || {})] });
assert.equal(c.repGoal(X, 'Stark'), 4, 'ohne Verlauf der Startwert');
log([4, 4, 5, 4], { goal: 4 }); assert.equal(c.repGoal(X, 'Stark'), 5, 'alles geschafft: 1 Wdh. mehr');
log([5, 4, 5, 5], { goal: 5 }); assert.equal(c.repGoal(X, 'Stark'), 5, 'eine Runde verfehlt: gleich bleiben');
log([6, 6, 6, 6], { goal: 6 }); assert.equal(c.repGoal(X, 'Stark'), 6, 'nie über das obere Ende, dann kommt die nächste Stufe');
assert.equal(c.repGoal(X, 'Mittel'), 3, 'neue Stufe: unteres Ende');
log([5, 5, 4, 4]); assert.equal(c.repGoal(X, 'Stark'), 5, 'alte Einträge ohne Vorgabe: die schwächste Runde gilt als Vorgabe');
phase = { deload: true }; assert.equal(c.repGoal(X, 'Stark'), 4, 'Entlastung 1 Wdh. weniger'); phase = {};
console.log('PASS: Vorgabe im EMOM steigt nur nach geschafften Runden');
