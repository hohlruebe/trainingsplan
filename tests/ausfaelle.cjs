// Regressions against the actual planner; run with: node tests/ausfaelle.cjs
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
let now = '2026-10-12';
function setup() {
  const c = vm.createContext({
    S: { started: true, durchgang: 3, tag: 1, planWk: '2026-10-05', alltag: { on: true, bed: 22.5, wake: 6.5, weg: 0 },
      planStart: { date: '2026-10-05', week: '2026-10-05', tag: 1 }, feldTs: {} },
    LOGS: [], ui: {}, WKP_C: { k: null }, DAYS_K: null, KAL: null,
    DAYS: { 1: { type: 'kraft' }, 2: { type: 'easy' }, 3: { type: 'kraft' }, 4: { type: 'rest' }, 5: { type: 'interval' }, 6: { type: 'kraft' }, 7: { type: 'rest' } },
    isoToday: () => now, parseISO: s => new Date(s + 'T12:00:00'), isoDate: d => d.toISOString().slice(0, 10),
    daysBetween: (a, b) => Math.round((b - a) / 86400000), pad: n => String(n).padStart(2, '0'),
    saveState() {}, render() {}, blockCheck() {}, planDur: () => .5,
    ladderStates: () => ({}), partScores: () => ({}),
    dayLabel: t => 'Tag ' + t, fmtDate: s => s, esc: String,
    DELETED: {}, LS: { get: () => 0, set() {} }, ensureOrte() {}, feldSnap: () => ({}),
    SYNC_KEYS: JSON.parse(html.match(/var SYNC_KEYS = (\[[^\n]+\]);/)[1].replace(/'/g, '"')),
    SHIFT: { f: ['Früh', 6, 14], n: ['Nacht', 22, 6], t: ['12 h Tag', 6, 18] }, UNIT: { 1: 'A', 3: 'B', 6: 'C' }
  });
  for (const name of ['isoAdd','wkMon','alltag','planOn','wkEntry','arbeitOf','wkTimeline','dayCls','daySlot','slotWhy','planHard','planPairOk','planDropOrder',
    'trainingLog','missDone','missPending','missCareDue','missBlocked','missCarry','missRemember','missSet','missChoose','missReady','missButtons','missQuestionHTML',
    'wkPlan','wkPlan0','wkPlanC','planRoll','planSyncTag','doneToday0','mergeRemote','v2','wkDoneV2','snapName','umfGrow','befCls','befOf','longShift','arbeitOf0','kalOn','kalCalOn','kalW','kalB','kalHas','kalShift','kalDays','kalDay','kalBlocks','kalSleepy']) vm.runInContext(source(name), c);
  vm.runInContext('var KFIT = 0; var UMF_HIT = 0.7;', c);
  return c;
}
function planned(c, date, tag, extras={}) {
  c.S.planDays = { ...c.S.planDays, [date]: { tag, dg: 3, time: 17, ts: 10, ...extras } };
}
let c = setup();
assert.equal(c.missPending(), null, 'old installs do not invent past workouts');
planned(c, '2026-10-10', 6); planned(c, '2026-10-11', null);
assert.equal(c.missPending().date, '2026-10-10', 'Saturday retained across Monday');
c.planRoll();
assert.equal(c.missPending().date, '2026-10-10');
c.LOGS.push({ kind: 'mobility', date: '2026-10-10', tag: 6 });
assert.ok(c.missPending(), 'mobility does not complete the workout');
c.LOGS.push({ kind: 'kraft', date: '2026-10-10', tag: 6 });
assert.equal(c.missPending(), null, 'a synced completion dismisses the question');
c = setup(); planned(c, '2026-10-10', 6);
c.S.planOv = { '2026-10-10': { off: 1 } };
assert.equal(c.missPending(), null, 'old Heute nicht answers are not asked again');
c.S.planOv = {}; c.missChoose('2026-10-10', 'hungover');
assert.equal(c.missPending(), null); assert.equal(c.missCareDue(), true);
assert.ok(c.missQuestionHTML().includes('Verkatert'));
c.missReady('hungover');
assert.equal(c.missBlocked(now), true); assert.equal(c.wkPlan().days[0].tag, null);
assert.equal(c.missCareDue(), false, 'ask at most once per day');
now = '2026-10-13'; assert.equal(c.missCareDue(), true, 'recheck the next day');
c.missReady('fit'); assert.equal(c.missBlocked(now), false); assert.equal(c.missCareDue(), false);
assert.ok(c.missCarry().includes(6));
c.LOGS.push({ kind: 'kraft', date: now, tag: 6 });
assert.equal(c.missCarry().length, 0, 'completed carry is removed, no training debt');
console.log('PASS: missing entries, rollover, completed/rest days, hangover and daily recheck');

now = '2026-10-12'; c = setup(); planned(c, '2026-10-10', 6);
c.missChoose('2026-10-10', 'ill');
assert.ok(c.wkPlan().days.every(d => !d.tag), 'illness blocks scheduling, including forced times');
c.S.planOv = { [now]: { t: 17 } };
assert.ok(c.wkPlan().days.every(d => !d.tag));
c.missReady('fit');
const p = c.wkPlan();
assert.ok(p.days.some(d => d.tag));
const tags = p.days.map(d => d.tag).filter(Boolean);
assert.equal(new Set(tags).size, tags.length, 'carry replaces same type rather than adding a second one');
for (let i = 1; i < 7; i++) assert.ok(c.planPairOk(p.days[i - 1].tag, p.days[i].tag));
c = setup();
c.LOGS.push({ kind: 'kraft', tag: 1, date: '2026-10-11' });
let monday = c.wkPlan().days[0];
assert.ok(!monday.tag || !c.planHard(monday.tag), 'Sunday workload protects Monday');
const next = c.wkPlan('2026-10-19'), sunday = c.wkPlan().days[6];
assert.ok(c.planPairOk(sunday.done || sunday.tag, next.days[0].tag), 'next week respects this Sunday');
c = setup();
c.S.arbeit = { '2026-10-12': Array(7).fill({ k: 't', a: 6, b: 18 }) };
assert.ok(c.wkPlan().days.every(d => !d.tag), '12-hour shifts do not get squeezed');
console.log('PASS: illness, workload across week boundaries, no duplicate training and shift constraints');

c = setup();
assert.equal(c.missRemember(), true);
const snapshot = JSON.stringify(c.S.planDays);
assert.equal(c.missRemember(), false, 'stable snapshots do not trigger endless saves');
assert.equal(JSON.stringify(c.S.planDays), snapshot);
const first = Object.keys(c.S.planDays).sort().find(d => c.S.planDays[d].tag);
now = c.isoAdd(first, 1);
assert.equal(c.missPending().date, first);
c.missRemember();
assert.equal(JSON.stringify(c.S.planDays), snapshot, 'pending question preserves the original plan');
now = '2026-11-10'; assert.equal(c.missPending(), null, 'long absence uses comeback rather than a backlog');
console.log('PASS: persistent original dates, stable snapshots, no retroactive assumptions or old backlog');

now = '2026-10-12'; c = setup();
planned(c, '2026-10-10', 6);
c.S.planMiss = { '2026-10-10': { status: 'missed', reason: 'hungover', ts: 30 } };
c.mergeRemote({ app: 'trainingsplan', standTs: 40, stand: { planMiss: {
  '2026-10-10': { status: 'missed', reason: 'time', ts: 20 },
  '2026-10-09': { status: 'logged', ts: 40 }
} } });
assert.equal(c.S.planMiss['2026-10-10'].reason, 'hungover');
assert.equal(c.S.planMiss['2026-10-09'].status, 'logged');
console.log('PASS: sync merges answers by date without overwriting newer answers');
