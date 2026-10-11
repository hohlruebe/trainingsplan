// Node-only regressions against the actual functions in the offline app.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
function source(name) {
  const start = html.indexOf('function ' + name + '(');
  assert.ok(start >= 0, name);
  const endLine = html.indexOf('\n', start);
  if (html.slice(start, endLine).trim().endsWith('}')) return html.slice(start, endLine);
  const end = html.indexOf('\n}', start);
  return html.slice(start, end + 2);
}
function context(values, names) {
  const c = vm.createContext(values);
  for (const n of names) vm.runInContext(source(n), c);
  return c;
}
for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/application\/json/.test(m[1])) JSON.parse(m[2]);
  else new vm.Script(m[2]);
}
console.log('PASS: all JavaScript and JSON blocks parse');

const syncKeys = JSON.parse(html.match(/var SYNC_KEYS = (\[[^\n]+\]);/)[1].replace(/'/g, '"'));
function merge(local, remote) {
  const c = context({ S: { feldTs: {}, standTs: 100, ...local }, LOGS: [], DELETED: {}, SYNC_KEYS: syncKeys,
    LS: { get: () => 0, set() {} }, ensureOrte() {}, feldSnap: () => ({}), wkMon: date => date < '2026-10-12' ? '2026-10-05' : '2026-10-12' }, ['mergeRemote']);
  c.mergeRemote({ app: 'trainingsplan', standTs: 50, stand: remote });
  return c.S;
}
const monday = { durchgang: 3, tag: 1, planWk: '2026-10-12', tagSince: '2026-10-12', posSet: 0 };
const sunday = { durchgang: 3, tag: 7, planWk: '2026-10-05', tagSince: '2026-10-11', posSet: 0 };
assert.equal(merge(monday, sunday).tag, 1);
assert.equal(merge(sunday, monday).tag, 1);
assert.equal(merge(sunday, monday).planWk, '2026-10-12');
assert.equal(merge(monday, { ...sunday, planWk: undefined }).tag, 1);
assert.equal(merge(monday, { ...monday, tag: 3 }).tag, 3);
assert.equal(merge(monday, { ...sunday, posSet: 200 }).tag, 7);
assert.equal(merge({ ...monday, posSet: 200 }, sunday).tag, 1);
assert.equal(merge({ durchgang: 3, tag: 4, posSet: 0 }, { durchgang: 3, tag: 2, posSet: 0 }).tag, 4);
console.log('PASS: week rollover, old clients, same-week progress and manual resets');

let failing = true, writes = [], disk = { 'tp.drafts': '{"reps":6}' };
const caches = { FILL: { k: 'old' }, EST_C: { k: 'old' }, PR_C: { k: 'old' }, MB_C: { k: 'old' }, PAIN_C: { k: 'old' }, WKP_C: { k: 'old' }, AS_C: {}, PD_C: { old: 1 } };
const st = context({ ...caches, storageNotice() {}, localStorage: {
  getItem: k => disk[k], setItem(k, v) { if (failing) throw new Error('QuotaExceededError'); writes.push(k); disk[k] = v; }
} }, ['invalidateDerived', 'whenStored']);
const lsStart = html.indexOf('var LS = {'), lsEnd = html.indexOf('\n};', lsStart) + 3;
vm.runInContext(html.slice(lsStart, lsEnd), st);
assert.equal(st.LS.set('tp.logs', [{ id: 'new' }]), false);
st.LS.set('tp.drafts', {}); st.LS.set('tp.state', { tag: 2 });
let acknowledged = false; st.whenStored(() => { acknowledged = true; });
assert.equal(acknowledged, false);
assert.equal(disk['tp.drafts'], '{"reps":6}');
assert.equal(st.LS.get('tp.logs', []).length, 1);
assert.equal(st.FILL.k, null); assert.equal(st.EST_C.k, null); assert.equal(st.PR_C.k, null);
assert.equal(st.MB_C.k, null); assert.equal(st.WKP_C.k, null); assert.equal(st.AS_C, null);
failing = false; assert.equal(st.LS.retry(), true);
assert.equal(acknowledged, true);
assert.deepEqual(writes, ['tp.logs', 'tp.state', 'tp.drafts']);
assert.equal(st.LS.notice, null); assert.equal(Object.keys(st.LS.pending).length, 0);
// A second write failure after one successful retry keeps the remaining updates.
failing = true; st.LS.set('tp.logs', [{ id: 'newest' }]);
assert.equal(st.LS.get('tp.logs', [])[0].id, 'newest');
failing = false; st.LS.retry(); assert.equal(JSON.parse(disk['tp.logs'])[0].id, 'newest');
console.log('PASS: failed saves preserve drafts and pending data; retry confirms only after persistence; caches invalidated');

async function checkSync(visibility, status = 200, disconnect = false) {
  const requests = [], connection = { owner: 'test', repo: 'data', token: 'test-only', path: 'trainingsplan.json' };
  const c = context({ API: 'https://example.test', SY: connection, LS: { notice: null, set() {} },
    syncBusy: false, syncAgain: false, navigator: { onLine: true }, syncSoon() {}, setSync(status, msg) { c.result = { status, msg }; },
    mergeRemote: () => false, localDoc: () => ({ app: 'trainingsplan' }), isoToday: () => '2026-10-11', b64enc: x => x,
    fetch: async (url, options) => {
      requests.push({ url, method: options.method || 'GET' });
      if (disconnect) c.SY = null;
      if (!url.includes('/contents/')) return { ok: status === 200, status, json: async () => ({ private: visibility.shift() }) };
      if (options.method === 'PUT') return { ok: true, json: async () => ({}) };
      return { status: 404 };
    }
  }, ['ghRepoUrl', 'ghUrl', 'ghHeaders', 'ghErr', 'ghPrivate', 'ghGet', 'ghPut', 'runSync']);
  await c.runSync(); return { c, requests };
}
(async () => {
  for (const value of [false, undefined]) {
    const { c, requests } = await checkSync([value]);
    assert.equal(requests.length, 1); assert.equal(c.result.status, 'error');
  }
  for (const status of [401, 403, 404]) {
    const { requests } = await checkSync([], status); assert.equal(requests.length, 1);
  }
  const good = await checkSync([true, true]);
  assert.equal(good.requests.filter(r => r.method === 'PUT').length, 1);
  assert.equal(good.c.result.status, 'ok');
  const changed = await checkSync([true, false]);
  assert.equal(changed.requests.filter(r => r.method === 'PUT').length, 0);
  const disconnected = await checkSync([true], 200, true);
  assert.equal(disconnected.requests.length, 1);
  console.log('PASS: public/unknown repositories and authorization errors block data access; visibility rechecked before upload; disconnect cancels');
})().catch(e => { console.error(e); process.exitCode = 1; });
