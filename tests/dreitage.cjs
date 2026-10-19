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
    LOGS: [], ui: {}, WKP_C: { k: null }, DAYS_K: null, DAYS: V2, KOERPER: [], KAL: null,
    isoToday: () => now, parseISO: s => new Date(s + 'T12:00:00'), isoDate: d => d.toISOString().slice(0, 10),
    daysBetween: (a, b) => Math.round((b - a) / 86400000), pad: n => String(n).padStart(2, '0'),
    saveState() {}, render() {}, blockCheck() {}, sigHold: () => false, planDur: () => .7, missBlocked: () => false, missCarry: () => [],
    curPhase: () => Object.assign({ deload: false, test: false, taper: false }, phase), memList: () => c.KOERPER,
    ladderStates: () => ({}), ladFor: () => null, partScores: () => ({}), dayLabel: t => 'Ganzkörper ' + ({ 1: 'A', 3: 'B', 6: 'C' })[t], esc: String,
    SHIFT: { f: ['Früh', 6, 14], s: ['Spät', 14, 22], n: ['Nacht', 22, 6], t: ['12 h Tag', 6, 18], tn: ['12 h Nacht', 18, 6] }
  }, extra || {}));
  vm.runInContext('var UNIT = ' + constant('UNIT') + '; var UMF = ' + constant('UMF') + '; var RPE_W = ' + constant('RPE_W') + ';', c);
  for (const name of ['tageN', 'splitOn', 'isoAdd', 'wkMon', 'alltag', 'v2', 'planOn', 'wkEntry', 'arbeitOf', 'wkTimeline', 'dayCls', 'daySlot', 'slotWhy', 'planHard',
    'planPairOk', 'planDropOrder', 'trainingLog', 'wkDoneV2', 'wkPlan', 'doneToday0', 'umfMin', 'umfIdx', 'umfGrow', 'umfDiff', 'planRoll', 'snapName', 'isSecs', 'holdOf', 'repGoal', 'befCls', 'befOf', 'stepRi', 'stepsLoad', 'logLoad', 'rpeWord', 'longShift',
    'arbeitOf0', 'kalOn', 'kalCalOn', 'kalW', 'kalB', 'kalHas', 'kalShift', 'kalDays', 'kalDay', 'kalBlocks']) vm.runInContext(source(name), c);
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
// Belastung (Paket 57): geplant = Minuten je Schritt × beabsichtigte Härte, gemacht = Einschätzung × Minuten.
c = setup();
const stB = [{ id: 'warm', dur: 8 }, { id: 'hs', dur: 4 }, { id: 'kraft', dur: 15 }, { id: 'ausgl', dur: 4 }, { id: 'fin', dur: 12, ri: 8 }, { id: 'cool', dur: 10, opt: true }];
assert.deepEqual(JSON.parse(JSON.stringify(c.stepsLoad(stB))), { min: 45, soll: 273 }, 'Beispiel B: 24 + 16 + 112,5 + 20 + 96 + Wechsel, Cool-down auf Nachfrage zählt nicht');
phase = { deload: true }; assert.equal(c.stepRi({ id: 'kraft' }), 6, 'Entlastung: Kraft leichter geplant'); phase = {};
assert.equal(c.logLoad({ rpe: 7, min: 50 }), 350); assert.equal(c.logLoad({ min: 50 }), null, 'ohne Einschätzung keine Belastung');
assert.equal(c.rpeWord(7), 'Hart'); assert.equal(c.rpeWord(1), 'Sehr leicht'); assert.equal(c.rpeWord(10), 'Maximal');
console.log('PASS: Belastung geplant je Schritt, gemacht aus Einschätzung und Minuten');

// Halteübungen: Vorgabe in Sekunden, nicht Wdh. (Dennis: „L-Sit mit Wiederholungen statt Zeit“), Schritte zu 5 s.
c = setup(); c.S.base = {};
const HL = { n: 'L-Sit', target: '3 × 10–20 s halten', hi: 20 }, hlog = (reps, goal) => c.LOGS.push({ id: 'h' + c.LOGS.length, kind: 'kraft', date: '2026-10-02', kraft: [{ n: 'L-Sit', stage: 'Tuck L-Sit', reps, goal }] });
assert.equal(c.holdOf(HL), true); assert.equal(c.holdOf(X), false);
assert.equal(c.repGoal(HL, 'Tuck L-Sit'), 10, 'Start am unteren Ende der Haltezeit');
hlog([10, 12, 10, 11], 10); assert.equal(c.repGoal(HL, 'Tuck L-Sit'), 15, 'alles gehalten: 5 s mehr');
hlog([20, 20, 20, 20], 20); assert.equal(c.repGoal(HL, 'Tuck L-Sit'), 20, 'nie über das obere Ende');
assert.equal(c.repGoal({ n: 'Hollow Body Hold', target: '20 s pro Runde', hi: 6 }, 'Knie angezogen'), 20, 'feste Haltezeit statt 3 „Wdh.“');
console.log('PASS: Halteübungen mit Sekunden statt Wiederholungen');

// Arbeitsmodell: geregelte Zeiten = feste Woche mit Ausnahmen, Schichtarbeit = Wochenplan. Beide bleiben gespeichert.
now = '2026-10-12'; c = setup();
const D8 = { k: 'c', a: 8, b: 16 };
c.S.alltag = { on: true, bed: 23, wake: 7, schicht: false, weg: 0, std: [D8, D8, D8, D8, D8, null, null], ex: { '2026-10-14': { k: 'x' }, '2026-10-16': { k: 'c', a: 12, b: 20 } } };
c.S.arbeit = { '2026-10-12': [{ k: 'n', a: 22, b: 6 }, null, null, null, null, null, null] };
let W = c.arbeitOf('2026-10-12');
assert.equal(W[0].a, 8, 'geregelt: der Wochenplan der Schicht gilt nicht'); assert.equal(W[2], null, 'Ausnahme frei'); assert.equal(W[4].a, 12, 'Ausnahme andere Zeit');
assert.equal(c.arbeitOf('2026-10-19')[2].a, 8, 'Ausnahmen gelten nur an ihrem Datum');
c.S.alltag.schicht = true; assert.equal(c.arbeitOf('2026-10-12')[0].k, 'n', 'Schichtarbeit: der eingetragene Wochenplan, die feste Woche bleibt gespeichert');
console.log('PASS: geregelte Zeiten mit Ausnahmen und Schichtplan getrennt, nichts geht beim Wechsel verloren');

// Arbeitsweg, gesperrte Zeiten, Tagschlaf und zweiter Schlaf fließen in die Uhrzeit ein.
c = setup(); c.S.alltag = { on: true, bed: 23, wake: 7, schicht: false, weg: 0, wegA: 30, std: [D8, D8, D8, D8, D8, null, null] };
let T = c.wkTimeline('2026-10-12'), sl = c.daySlot(T, 0, .7, true);
assert.ok(sl.t >= 16 + .5 + 1.5 - 1e-9, 'Training frühestens 1,5 h nach dem Heimweg');
c.S.alltag.sperr = [{ n: 'Familie', d: [0, 1, 2, 3, 4], a: 17, b: 19 }];
T = c.wkTimeline('2026-10-12'); sl = c.daySlot(T, 0, .7, true);
assert.ok(sl.t >= 19 || sl.end <= 17, 'nie in einer gesperrten Zeit'); assert.ok(sl.why.some(w => /Familie/.test(w)), 'Grund nennt die Sperrzeit ohne Details');
c = setup(); c.S.alltag = { on: true, bed: 22.5, wake: 6.5, schicht: false, weg: 0, std: [null, { k: 'c', a: 22, b: 6 }, null, null, null, null, null], ts: { a: 8, b: 15 }, nap: { a: 14, b: 16 } };
T = c.wkTimeline('2026-10-12');
assert.ok(T.sleep.some(x => x[0] === 24 * 2 + 8 && x[1] === 24 * 2 + 15), 'fester Nachtdienst auch bei geregelten Zeiten: Tagschlaf wie eingetragen');
assert.ok(T.sleep.some(x => x[0] === 24 + 14 && x[1] === 24 + 16), 'zweiter Schlaf vor dem Nachtdienst');
sl = c.daySlot(T, 2, .7, true); assert.ok(sl.t >= 15, 'nach dem Tagschlaf');
console.log('PASS: Arbeitsweg, gesperrte Zeiten, Tagschlaf und zweiter Schlaf');

// Befinden: Tag zwischen zwei Nächten bleibt frei, „Erholt“ macht ihn zum möglichen Tag, nie bei 12-h-Dienst, unbekannt heißt nicht erholt.
c = setup(); c.S.alltag = { on: true, bed: 22.5, wake: 6.5, schicht: true, weg: 0 };
const N = { k: 'n', a: 22, b: 6 };
c.S.arbeit = { '2026-10-12': [T12, N, N, N, T12, T12, T12] };
assert.equal(units(c.wkPlan()), '-A-----', 'ohne Antwort nur der Übergangstag vor der ersten Nacht, nichts zwischen den Nächten');
c.S.befinden = { '2026-10-14': { v: 'tired' } }; assert.equal(units(c.wkPlan()), '-A-----', 'müde: weiter frei');
c.S.befinden = { '2026-10-14': { v: 'fit' } }; P = c.wkPlan();
assert.ok(P.days[2].tag, 'erholt: Training zwischen den Nächten möglich'); assert.equal(units(P).replace(/-/g, '').length, 2); assert.equal(P.days[0].tag, null, 'nie am 12-h-Tag');
c.S.befinden = { '2026-10-12': { v: 'fit' } }; assert.equal(c.wkPlan().days[0].tag, null, 'Erholt öffnet keinen 12-h-Dienst');
c = setup(); now = '2026-10-19';
for (let i = 0; i < 6; i++) c.LOGS.push(kraft(c.isoAdd(now, -13 + i * 2), 1));
c.S.befinden = { '2026-10-15': { v: 'tired' } }; assert.equal(c.umfGrow(), null, 'Müdigkeit in den letzten 2 Wochen: kein Umfang-Plus');
console.log('PASS: Befinden nach Nachtschichten');

// Google Kalender: Dienste „DD …“ werden der Schichtplan der abgeglichenen Tage, andere Termine nur belegt, Tage außerhalb wie eingetragen.
const isoDateL = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const parseISOL = s => { const p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
c = setup({ isoDate: isoDateL, parseISO: parseISOL }); now = '2026-10-12';
const at = (d, h, m) => new Date(d + 'T' + String(h).padStart(2, '0') + ':' + String(m || 0).padStart(2, '0') + ':00').getTime();
c.S.alltag = { on: true, bed: 22.5, wake: 6.5, schicht: true, weg: 0 };
c.S.arbeit = { '2026-10-12': [{ k: 'f', a: 6, b: 14 }, null, null, null, null, null, null] };
c.KAL = { url: 'https://script.google.com/macros/s/x/exec', ts: 1, von: parseISOL('2026-10-04').getTime(), bis: parseISOL('2026-11-02').getTime(),
  w: [{ k: 'n', a: at('2026-10-13', 22), b: at('2026-10-14', 6) }, { k: 'n', a: at('2026-10-14', 22), b: at('2026-10-15', 6) }, { k: 'f', a: at('2026-10-17', 6), b: at('2026-10-17', 18) }],
  b: [{ a: at('2026-10-16', 16), b: at('2026-10-16', 19, 30) }] };
let W2 = c.arbeitOf('2026-10-12');
assert.equal(W2[0], null, 'abgeglichener Tag ohne Dienst ist frei, auch wenn von Hand Früh eingetragen war');
assert.deepEqual(JSON.parse(JSON.stringify(W2[1])), { k: 'n', a: 22, b: 6, cal: 1 }, 'DD Nacht mit Uhrzeit aus dem Termin');
assert.equal(W2[5].k, 't', 'DD Früh über 11 h zählt als 12-h-Schicht');
P = c.wkPlan();
assert.equal(P.days[2].tag, null, 'zwischen zwei Nächten aus dem Kalender kein Training');
assert.equal(P.days[5].tag, null, 'nie am 12-h-Tag aus dem Kalender');
T = c.wkTimeline('2026-10-12');
assert.ok(T.block.some(b => b[0] === 24 * 4 + 16 && b[1] === 24 * 4 + 19.5 && b[2].n === 'Termin'), 'Termin als belegte Zeit ohne Titel');
const fr = P.days[4];
if (fr.tag) assert.ok(fr.end <= 24 * 4 + 16 + 1e-9 || fr.t >= 24 * 4 + 19.5 - 1e-9, 'kein Training im Termin');
c.KAL.bis = parseISOL('2026-10-15').getTime();
assert.equal(c.arbeitOf('2026-10-12')[0], null); assert.equal(c.arbeitOf('2026-10-19')[0].k, 'f', 'außerhalb des Zeitraums gilt der Schichtplan aus der App');
// Kalender einzeln: eigener sichtbarer Kalender und Kalender mit Diensten zählen von selbst, geteilte nicht; die eigene Wahl gewinnt.
c.KAL.bis = parseISOL('2026-11-02').getTime();
c.KAL.k = [{ id: 'haupt', e: true, s: true }, { id: 'dienst', e: false, s: true }, { id: 'partner', e: false, s: true }];
c.KAL.w.forEach(x => { x.c = 'dienst'; }); c.KAL.b = [{ c: 'haupt', a: at('2026-10-16', 16), b: at('2026-10-16', 19, 30) }, { c: 'partner', a: at('2026-10-16', 8), b: at('2026-10-16', 12) }];
T = c.wkTimeline('2026-10-12');
assert.ok(T.block.some(b => b[0] === 24 * 4 + 16), 'eigener Kalender zählt'); assert.ok(!T.block.some(b => b[0] === 24 * 4 + 8), 'geteilter Kalender zählt erst, wenn man ihn anschaltet');
assert.equal(c.arbeitOf('2026-10-12')[1].k, 'n', 'Kalender mit Diensten zählt von selbst');
c.KAL.sel = { partner: true, dienst: false };
assert.ok(c.wkTimeline('2026-10-12').block.some(b => b[0] === 24 * 4 + 8), 'angeschaltet: zählt');
assert.equal(c.arbeitOf('2026-10-12')[1], null, 'Dienst-Kalender aus: keine Dienste mehr aus dem Kalender');
c.KAL = null; assert.equal(c.arbeitOf('2026-10-12')[0].k, 'f', 'ohne Kalender wie bisher');
console.log('PASS: Google Kalender: Dienste, 12-h-Erkennung, belegte Zeiten, Zeitraum, Kalender einzeln an und aus, ohne Kalender wie bisher');

// Die Kalender-Brücke selbst (Apps Script) mit nachgestellten Google-Diensten: Dienste nach Titel, private Termine ohne Titel als belegt,
// ganztägige, abgelehnte, eigene Trainings, ausgeblendete und Feiertagskalender zählen nicht.
const GS = JSON.parse(html.match(/var KAL_GS = (".*?");\n/s)[1]);
const ev = (t, a, b, o) => Object.assign({ getTitle: () => t, isAllDayEvent: () => false, getMyStatus: () => 'OWNER', getStartTime: () => new Date(a), getEndTime: () => new Date(b) }, o || {});
const cal = (id, name, evs, o) => Object.assign({ getId: () => id, getName: () => name, getColor: () => '#4986E7', isHidden: () => false, isSelected: () => true, isOwnedByMe: () => true,
  isMyPrimaryCalendar: () => false, getEvents: () => evs }, o || {});
const H = (d, h) => new Date(2026, 9, d, h).getTime();
const gsCtx = vm.createContext({ Date, JSON,
  CalendarApp: { GuestStatus: { NO: 'NO' }, getAllCalendars: () => [
    cal('dennis@example.com', 'Dennis', [ev('DD früh', H(12, 6), H(12, 14)), ev('DD Spät', H(13, 14), H(13, 22)), ev('DD Nacht', H(14, 22), H(15, 6)),
      ev('DD Tag 12', H(16, 6), H(16, 18)), ev('DD Nacht 12', H(17, 18), H(18, 6)), ev('Zahnarzt', H(19, 9), H(19, 10)), ev('Essen bei Mama', H(19, 18), H(19, 21)),
      ev('Urlaub', H(20, 0), H(21, 0), { isAllDayEvent: () => true }), ev('Abgesagt', H(20, 10), H(20, 11), { getMyStatus: () => 'NO' }),
      ev('Training: Ganzkörper B', H(21, 17), H(21, 18)), ev('Zusatz: Kardio-Test', H(22, 17), H(22, 18))], { isMyPrimaryCalendar: () => true }),
    cal('de.german#holiday@group.v.calendar.google.com', 'Feiertage', [ev('Reformationstag', H(31, 10), H(31, 11))]),
    cal('versteckt@example.com', 'Versteckt', [ev('Geheim', H(19, 12), H(19, 13))], { isHidden: () => true }),
    cal('verein@example.com', 'Verein', [ev('Spiel', H(18, 10), H(18, 12))], { isOwnedByMe: () => false }),
    cal('tp@group.calendar.google.com', 'Trainingsplan', [ev('Nachgetragen', H(19, 15), H(19, 16))])], getOwnedCalendarsByName: () => [] },
  Utilities: { DigestAlgorithm: { MD5: 'MD5' }, computeDigest: (a, s) => Array.from(s).map(ch => ch.charCodeAt(0) % 256), base64EncodeWebSafe: b => Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_') },
  ContentService: { MimeType: { JSON: 'json' }, createTextOutput: t => ({ setMimeType: () => ({ text: t }) }) } });
vm.runInContext(GS, gsCtx);
const out = JSON.parse(vm.runInContext('doGet()', gsCtx).text);
assert.equal(out.app, 'trainingsplan-kalender'); assert.equal(out.v, 3);
assert.deepEqual(out.k.map(x => x.n), ['Dennis', 'Verein'], 'ohne Feiertags- und ausgeblendete Kalender');
assert.equal(out.k[0].p, true); assert.equal(out.k[1].e, false);
assert.deepEqual(out.w.map(x => x.k), ['f', 's', 'n', '', 'n'], 'DD früh/Spät/Nacht nach Titel, DD Tag 12 ohne Art');
assert.equal(JSON.stringify(out).includes('Zahnarzt') || JSON.stringify(out).includes('Mama'), false, 'keine Titel privater Termine');
assert.equal(out.b.filter(x => x.c === 0).length, 2, 'private Termine mit beliebigem Namen zählen als belegt; ganztägig, abgelehnt und eigene Trainings nicht');
assert.equal(out.b.filter(x => x.c === 1).length, 1, 'geteilter Kalender liefert seine Termine, die App entscheidet über den Schalter');
// In der App: DD Tag 12 und DD Nacht 12 werden 12-h-Schichten.
c = setup({ isoDate: isoDateL, parseISO: parseISOL });
c.KAL = { url: 'x', von: parseISOL('2026-10-04').getTime(), bis: parseISOL('2026-11-02').getTime(), k: [{ id: out.k[0].id, e: true, s: true }], w: out.w.map(x => Object.assign({}, x, { c: out.k[0].id })), b: [] };
const W3 = c.arbeitOf('2026-10-12');
assert.equal(JSON.stringify(W3.map(e => e && e.k)), JSON.stringify(['f', 's', 'n', null, 't', 'tn', null]), 'DD Tag 12 = 12 h Tag, DD Nacht 12 = 12 h Nacht');
console.log('PASS: Kalender-Brücke: Dienste nach Titel, private Termine ohne Titel, ohne eigene Trainings, 12-h-Dienste');

// Trainings eintragen (doPost): nur der eigene Kalender „Trainingsplan“, fehlende anlegen, gleiche lassen, verschobene/abgesagte löschen.
const now2 = Date.now(), F = (d, h) => now2 + d * 864e5 + h * 36e5;
const mk = (t, a, b, tag) => { const e = { t, a, b, tags: { tp: tag }, deleted: false, getTitle: () => t, getStartTime: () => new Date(a), getEndTime: () => new Date(b),
  getTag: k => e.tags[k], setTag: (k, v) => { e.tags[k] = v; }, addPopupReminder: m => { e.rem = m; }, deleteEvent: () => { e.deleted = true; } }; return e; };
let own = null; const evs = [mk('Training: Ganzkörper A', F(1, 2), F(1, 3), 'tp-a'), mk('Training: Ganzkörper B', F(2, 2), F(2, 3), 'tp-b'), mk('Training: Alt', F(-1, 0), F(-1, 1), 'tp-alt')];
const made = [];
gsCtx.CalendarApp.getOwnedCalendarsByName = n => own ? [own] : [];
gsCtx.CalendarApp.Color = { BLUE: '#2952A3' };
gsCtx.CalendarApp.createCalendar = n => (own = { name: n, setColor() {}, getEvents: (a, b) => evs.filter(e => !e.deleted && e.b > a.getTime() && e.a < b.getTime()),
  createEvent: (t, a, b, o) => { const e = mk(t, a.getTime(), b.getTime()); made.push(e); evs.push(e); return e; } });
const post = body => JSON.parse(vm.runInContext('doPost(' + JSON.stringify({ postData: { contents: JSON.stringify(body) } }) + ')', gsCtx).text);
assert.equal(post({ app: 'x', t: [] }).ok, false, 'fremde Anfragen ändern nichts');
assert.equal(post({ app: 'trainingsplan', bis: F(21, 0), t: [] }).neu, 0); assert.equal(own, null, 'ohne Trainings wird kein Kalender angelegt');
let r2 = post({ app: 'trainingsplan', bis: F(21, 0), t: [{ id: 'tp-a', n: 'Training: Ganzkörper A', a: F(1, 2), b: F(1, 3) }, { id: 'tp-c', n: 'Training: Ganzkörper C', a: F(3, 2), b: F(3, 3), d: 'Nach der Arbeit' },
  { id: 'tp-x', n: 'Party', a: F(4, 2), b: F(4, 3) }, { id: 'tp-v', n: 'Training: Vorbei', a: F(-2, 0), b: F(-2, 1) }] });
assert.equal(own.name, 'Trainingsplan', 'eigener Kalender wird angelegt');
assert.deepEqual([r2.neu, r2.weg], [1, 1], 'C neu, B (nicht mehr geplant) gelöscht, A bleibt');
assert.equal(evs[0].deleted, false); assert.equal(evs[1].deleted, true); assert.equal(evs[2].deleted, false, 'Vergangenes bleibt');
assert.equal(made.length, 1); assert.equal(made[0].tags.tp, 'tp-c'); assert.equal(made[0].rem, 30, 'Erinnerung 30 Min vorher');
r2 = post({ app: 'trainingsplan', bis: F(21, 0), t: [{ id: 'tp-a', n: 'Training: Ganzkörper A', a: F(1, 4), b: F(1, 5) }] });
assert.deepEqual([r2.neu, r2.weg], [1, 2], 'verschoben: alt weg, neu angelegt; C abgesagt');
assert.ok(!JSON.parse(vm.runInContext('doGet()', gsCtx).text).k.some(x => x.n === 'Trainingsplan'), 'der eigene Kalender zählt nie als belegt');
console.log('PASS: Kalender-Brücke trägt Trainings ein: eigener Kalender, neu, gleich, verschoben, abgesagt, Vergangenes bleibt');

// Paket 62: 2 bis 6 Trainingstage. Ab 4 Tagen Split (alle Einheiten Kraft), drei Krafttage in Folge erlaubt.
{
  const got = {};
  for (const n of [2, 3, 4, 5, 6]) {
    const K = { type: 'kraft' }, R = { type: 'rest' };
    const D = n === 2 ? { 1: K, 2: R, 3: K, 4: R, 5: R, 6: R, 7: R } : n === 3 ? V2 : n === 4 ? { 1: K, 2: R, 3: K, 4: K, 5: K, 6: R, 7: R } : n === 5 ? { 1: K, 2: R, 3: K, 4: K, 5: K, 6: K, 7: R } : { 1: K, 2: R, 3: K, 4: K, 5: K, 6: K, 7: K };
    const c2 = setup({ DAYS: D }); c2.S.tage = n;
    got[n] = c2.wkPlan().days.map(d => d.tag || '-').join('');
  }
  assert.deepEqual(got, { 2: '1-3----', 3: '1-3-6--', 4: '1-3-4-5', 5: '134-5-6', 6: '134-567' }, 'Split: drei Krafttage in Folge erlaubt, nie vier');
  const c3 = setup(); c3.S.tage = 6;
  assert.deepEqual(c3.planDropOrder([1, 3, 4, 5, 6, 7]), [7, 6, 5, 4, 3, 1], 'im Split fällt die letzte Einheit der Woche zuerst weg');
  c3.S.tage = null; assert.equal(c3.tageN(), 3, 'ohne Angabe drei'); assert.equal(c3.splitOn(), false);
  console.log('PASS: 2 bis 6 Trainingstage: Split ab 4 Tagen, Reihenfolge, Wegfall');
}
