// Optional UI regression: npm install playwright; node tests/ausfaelle-browser.cjs
// TP_CHROMIUM can point to a local browser. No real account or training data is used.
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(require.resolve('playwright', { paths: [process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || process.cwd()] }));
let html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
// Test-only access inside the closure; never written into the application.
html = html.replace('\napplyTheme();\nblockCheck();', `
window.tpTest = { state: () => S, logs: () => LOGS, pending: missPending, plan: wkPlanC,
  navigate: (tab) => { ui.tab = tab; ui.viewTag = null; render(); },
  profile: (v) => { ui.pview = v; ui.tab = 'profil'; render(); },
  set: (s, logs) => { S = Object.assign({}, DEF, { tourSeen: 1 }, s); if (!('morgen' in s)) { S.morgen = {}; for (var q = 0; q < 120; q++) S.morgen[isoAdd('2026-09-01', q)] = { h: 8, f: 4, ts: 1 }; } // Guten Morgen gilt im Test als beantwortet
  LOGS = logs || []; DRAFTS = {}; ui.missLog = null; ui.fix = null; ui.tab = 'heute'; ui.viewTag = null; ensureOrte(); DAYS_K = null; invalidateDerived(); render(); }
};
applyTheme();
blockCheck();`);
const server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(html); });
const base = () => ({ started: true, durchgang: 3, tag: 6, startDate: '2026-09-28', blockStart: 1, picksV: 2, look: 2,
  vollbild: false, sound: false, haptik: false, feldTs: {}, name: 'Test', tagSince: '2026-10-10', advBy: 'auto',
  planWk: '2026-10-05', planStart: { date: '2026-10-05', week: '2026-10-05', tag: 1 },
  alltag: { on: true, bed: 22.5, wake: 6.5, weg: 0, schicht: false, std: Array(7).fill(null) },
  planDays: { '2026-10-10': { tag: 6, dg: 3, time: 17, ts: 10 }, '2026-10-11': { tag: null, dg: 3, time: null, ts: 10 } } });
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch({ headless: true, ...(process.env.TP_CHROMIUM ? { executablePath: process.env.TP_CHROMIUM, args: ['--no-sandbox', '--disable-gpu'] } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, timezoneId: 'Europe/Berlin', serviceWorkers: 'block' });
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.clock.setFixedTime(new Date('2026-10-12T12:00:00+02:00'));
    await page.goto('http://127.0.0.1:' + server.address().port);
    await page.evaluate(s => window.tpTest.set(s), base());
    await page.getByRole('button', { name: 'Verkatert', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Wie geht es dir heute?' }).isVisible());
    await page.getByRole('button', { name: 'Verkatert', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Heute bleibt frei' }).isVisible());
    await page.reload();
    assert.ok(await page.getByRole('heading', { name: 'Heute bleibt frei' }).isVisible(), 'answer survives reload');
    await page.getByRole('button', { name: 'Antwort ändern', exact: true }).click();
    await page.getByRole('button', { name: 'Erholt, beschwerdefrei und Zeit' }).click();
    assert.ok(await page.getByRole('heading', { name: 'Dein Plan ist angepasst' }).isVisible());
    assert.equal(await page.evaluate(() => window.tpTest.pending()), null);
    assert.ok(await page.evaluate(() => window.tpTest.plan().days.some(d => d.tag)));
    console.log('PASS: phone flow, hangover, reload, recovery and rescheduling');

    await page.evaluate(s => window.tpTest.set(s), base());
    await page.getByRole('button', { name: 'Trainiert, aber nicht eingetragen' }).click();
    assert.ok(await page.getByRole('heading', { name: 'Training nachtragen' }).isVisible());
    const plus = page.locator('[data-act="fix-step"][data-d="1"]').first();
    await plus.click();
    await page.getByRole('button', { name: 'Stufe angeben', exact: true }).first().click();
    await page.locator('#sheet [data-c]').first().click();
    await page.getByRole('button', { name: 'Training speichern', exact: true }).click();
    const logs = await page.evaluate(() => window.tpTest.logs());
    assert.equal(logs.length, 1); assert.equal(logs[0].date, '2026-10-10');
    assert.equal(logs[0].kraft[0].reps[0], 0); // First press turns unknown into explicit zero.
    assert.ok(logs[0].kraft[0].reps.slice(1).every(x => x === null));
    assert.equal(await page.evaluate(() => window.tpTest.pending()), null);
    assert.notEqual(await page.evaluate(() => window.tpTest.state().advBy), 'user', 'past entry does not complete today');
    console.log('PASS: retrospective entry, actual date, no auto-filled performance and no completion of today');

    await page.evaluate(s => window.tpTest.set(s), base());
    await page.getByRole('button', { name: 'Trainiert, aber nicht eingetragen' }).click();
    await page.getByRole('button', { name: 'Training speichern', exact: true }).click();
    const attendance = await page.evaluate(() => window.tpTest.logs()[0]);
    assert.equal(attendance.kind, 'attendance'); assert.equal(attendance.kraft, undefined);
    await page.evaluate(s => { s.alltag = null; s.planDays = null; s.planCare = null; s.tag = 3; s.planStart = null; window.tpTest.set(s); }, base());
    await page.getByRole('button', { name: 'Heute nicht', exact: true }).click();
    await page.getByRole('button', { name: 'Verkatert', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Heute bleibt frei' }).isVisible());
    assert.equal(await page.evaluate(() => window.tpTest.state().planMiss['2026-10-12'].reason), 'hungover');
    await page.clock.setFixedTime(new Date('2026-10-13T12:00:00+02:00'));
    await page.evaluate(() => window.tpTest.navigate('heute'));
    assert.ok(await page.getByRole('heading', { name: 'Wie geht es dir heute?' }).isVisible());
    assert.equal(await page.evaluate(() => window.tpTest.pending()), null, 'reported cancellation is not asked again');
    await page.clock.setFixedTime(new Date('2026-10-12T12:00:00+02:00'));
    console.log('PASS: unknown performance stays unknown, Heute nicht in sequential mode, next-day recheck');

    await page.evaluate(s => { s.planDays = null; s.planCare = null; s.tag = 1; window.tpTest.set(s); }, base());
    for (const width of [390, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      for (const tab of ['heute','plan','woche','fokus','timer','uebungen','routinen','rm','profil','einst','haptik','skill']) {
        await page.evaluate(t => window.tpTest.navigate(t), tab);
        assert.ok(await page.locator('#view').innerText(), tab);
      }
      for (const v of ['erfolge','verlauf','werte']) await page.evaluate(v => window.tpTest.profile(v), v);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(s => window.tpTest.set(s), base());
    await page.waitForTimeout(350);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: '/tmp/trainingsplan-ausfall-phone.png', fullPage: true });
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.evaluate(() => window.tpTest.navigate('heute'));
    await page.screenshot({ path: '/tmp/trainingsplan-ausfall-desktop.png', fullPage: true });
    assert.deepEqual(errors, []);
    console.log('PASS: all three tabs and subpages, phone/desktop, no JavaScript errors');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => server.close());
