// Anmelden beim ersten Start (Dennis, 28. Oktober): auf einem neuen Gerät geht das Fenster von selbst auf, Name und Token holen den Stand
// aus dem privaten Daten-Repository, auch wenn das Gerät schon Standardwerte gespeichert hat. GitHub ist nachgestellt, kein echtes Konto.
// node tests/anmelden-browser.cjs (Playwright, TP_CHROMIUM kann auf einen lokalen Browser zeigen).
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(require.resolve('playwright', { paths: [process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || process.cwd()] }));
let html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
html = html.replace('\napplyTheme();\nblockCheck();', `
window.tpTest = { state: () => S, logs: () => LOGS, localSave: () => { S.tage = 3; S.schwerpunkt = null; saveState(); return S.feldTs.tage; },
  // Zweites Gerät, Fall Dennis 28. Oktober: Fragebogen schon durch (Durchgang 1, von Hand gesetzt, 1RM aus dem Fragebogen), Sync noch nicht verbunden.
  fbDone: () => { S.started = true; S.durchgang = 1; S.tag = 1; S.startDate = isoToday(); S.posSet = Date.now(); S.tage = 3; saveState();
    LOGS = [{ id: 'fb1', ts: Date.now(), date: isoToday(), kind: 'rm', lift: 'g_deadlift', kg: 100, reps: 1, e1: 100, src: 'fb' }]; LS.set('tp.logs', LOGS); ui.tab = 'einst'; render(); } };
applyTheme();
blockCheck();`);
const server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(html); });
const OLD = 1.7e12; // älter als alles, was das neue Gerät speichert
const stand = { started: true, planV: 2, durchgang: 3, tag: 3, name: 'Dennis', tage: 4, schwerpunkt: 'kb', startDate: '2026-09-01', blockStart: 1, tagSince: '2026-10-27', advBy: 'user' };
const feldTs = {}; Object.keys(stand).forEach(k => { feldTs[k] = OLD; });
const remote = { app: 'trainingsplan', v: 1, standTs: OLD, stand, feldTs, geloescht: {},
  einheiten: [{ id: 'r1', ts: OLD, date: '2026-10-27', durchgang: 3, tag: 1, unit: 'A', pv: 2, kind: 'kraft', name: 'Ganzkörper A', kraft: [{ n: 'Push-up', stage: 'Push-up', reps: [8, 8, 8, 8] }] }] };
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch({ headless: true, ...(process.env.TP_CHROMIUM ? { executablePath: process.env.TP_CHROMIUM, args: ['--no-sandbox', '--disable-gpu'] } : {}) });
  let puts = [];
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, timezoneId: 'Europe/Berlin', serviceWorkers: 'block' });
    await context.route('https://api.github.com/**', async route => {
      const req = route.request(), auth = req.headers().authorization || '';
      if (auth !== 'Bearer github_pat_gut') return route.fulfill({ status: 401, body: '{}' });
      if (/\/contents\//.test(req.url())) {
        if (req.method() === 'PUT') { puts.push(JSON.parse(Buffer.from(JSON.parse(req.postData()).content, 'base64').toString('utf8'))); return route.fulfill({ status: 200, contentType: 'application/json', body: '{"content":{"sha":"s2"}}' }); }
        return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ sha: 's1', encoding: 'base64', content: Buffer.from(JSON.stringify(remote)).toString('base64') }) });
      }
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"private":true}' });
    });
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:' + server.address().port);
    const dlg = page.locator('.ob');
    await page.getByRole('heading', { name: /Schön, dass/ }).waitFor({ timeout: 3000 });
    assert.equal(await page.getByRole('heading', { name: /Hallo, ich bin/ }).count(), 0, 'Fragebogen erst danach');
    assert.equal(await page.getByRole('dialog').count(), 0, 'eine Seite, kein Fenster darüber');
    console.log('PASS: neues Gerät: Anmelden ist die erste Seite, noch kein Fragebogen');

    await page.getByRole('button', { name: 'Ich bin neu' }).click();
    await page.getByRole('heading', { name: /Hallo, ich bin/ }).waitFor();
    await page.reload();
    await page.getByRole('heading', { name: /Hallo, ich bin/ }).waitFor({ timeout: 3000 });
    const again = page.getByRole('button', { name: 'Ich nutze die App schon · Anmelden' });
    assert.ok(await again.isVisible(), 'Begrüßung behält den Weg zum Anmelden');
    console.log('PASS: „Ich bin neu“ führt zur Begrüßung mit Fragebogen (auch nach dem Neuladen), Anmelden bleibt erreichbar');

    // Das Gerät hat inzwischen Standardwerte gespeichert (neuer als der Stand in GitHub): sie dürfen den echten Stand nicht verdrängen.
    assert.ok(await page.evaluate(() => window.tpTest.localSave()) > 1.7e12);
    await again.click();
    await page.getByRole('heading', { name: /Schön, dass/ }).waitFor();
    await dlg.getByRole('button', { name: 'Anmelden', exact: true }).click();
    assert.equal(await dlg.locator('#lg-msg').innerText(), 'Bitte GitHub-Namen und Token eintragen.');
    await dlg.getByLabel('GitHub-Name').fill('dennis-test');
    await dlg.getByLabel('Token').fill('github_pat_falsch');
    await dlg.getByRole('button', { name: 'Anmelden', exact: true }).click();
    await page.waitForFunction(() => /Token ist ungültig/.test(document.getElementById('lg-msg').textContent));
    assert.equal(await page.evaluate(() => localStorage.getItem('tp.sync')), null, 'falscher Token wird nicht gespeichert');
    console.log('PASS: leere Felder und falscher Token: Hinweis auf der Seite, nichts gespeichert');

    await dlg.getByLabel('Token').fill('github_pat_gut');
    await dlg.getByRole('button', { name: 'Anmelden', exact: true }).click();
    await page.getByRole('heading', { name: /Schön, dass/ }).waitFor({ state: 'detached', timeout: 5000 });
    const st = await page.evaluate(() => { const s = window.tpTest.state(); return { started: s.started, name: s.name, dg: s.durchgang, tage: s.tage, sp: s.schwerpunkt, n: window.tpTest.logs().length }; });
    assert.deepEqual(st, { started: true, name: 'Dennis', dg: 3, tage: 4, sp: 'kb', n: 1 }, 'der Stand aus GitHub gilt ganz');
    assert.equal(await page.getByRole('heading', { name: /Hallo, ich bin/ }).count(), 0, 'kein Fragebogen mehr');
    assert.ok(/Angemeldet\. Dein Stand von heute ist da\./.test(await page.locator('#toast').innerText()));
    const last = puts[puts.length - 1];
    assert.ok(!last || (last.stand.name === 'Dennis' && last.stand.tage === 4), 'hochgeladen wird der echte Stand, nicht die Standardwerte');
    assert.ok(!(await page.evaluate(() => localStorage.getItem('tp.state'))).includes('github_pat_'), 'Token nicht im Stand');
    console.log('PASS: Anmelden holt den Stand von heute (Name, Durchgang, Tage, Schwerpunkt, Einheiten), Heute statt Fragebogen');

    // App-Tour: kommt nach dem Anmelden einmal, 6 Karten, letzte Karte erklärt das Installieren, Überspringen geht jederzeit.
    const tour = page.getByRole('dialog', { name: 'Dein Coach plant für dich' });
    await tour.waitFor({ state: 'visible', timeout: 5000 });
    assert.match(await page.locator('#tour .tr-n').innerText(), /^1 von 6$/);
    for (let k = 0; k < 5; k++) await page.locator('#tour .tr-next').click();
    assert.equal(await page.locator('#tr-t').innerText(), 'Als App speichern');
    assert.match(await page.locator('#tour .tr-steps').innerText(), /Chrome oder Edge[\s\S]*Installieren/, 'am Computer: Installieren in der Adressleiste');
    assert.equal(await page.locator('#tour .tr-skip').count(), 0, 'letzte Karte ohne Überspringen');
    await page.locator('#tour [data-d="-1"]').click();
    assert.equal(await page.locator('#tr-t').innerText(), 'Tools und Profil');
    await page.locator('#tour .tr-skip').click();
    assert.equal(await page.locator('#tour').count(), 0);
    assert.ok(await page.evaluate(() => window.tpTest.state().tourSeen > 0));
    console.log('PASS: App-Tour nach dem Anmelden: 6 Karten, Zurück, Installieren je Gerät, Überspringen merkt sich das Gerät');
    await page.reload();
    await page.waitForTimeout(900);
    assert.equal(await page.getByRole('dialog').count(), 0, 'angemeldet und Tour gesehen: kein Fenster mehr');
    // Später über Plan › Wissen.
    await page.locator('[data-tab="plan"]').first().click();
    await page.getByRole('button', { name: /So funktioniert die App/ }).click();
    assert.equal(await page.locator('#tr-t').innerText(), 'Dein Coach plant für dich');
    await page.locator('#tour .tr-skip').click();
    console.log('PASS: Tour erneut über Plan › Wissen › „So funktioniert die App“');
    assert.equal(errors.length, 0, errors.join('\n'));
    console.log('PASS: nach dem Neuladen kein Anmeldefenster, keine JavaScript-Fehler');

    // Zweites Gerät: erst Fragebogen, dann in den Einstellungen verbunden. Der echte Stand gewinnt, die 1RM aus dem Fragebogen bleiben dabei.
    const c2 = await browser.newContext({ viewport: { width: 390, height: 844 }, timezoneId: 'Europe/Berlin', serviceWorkers: 'block' });
    await c2.route('https://api.github.com/**', async route => {
      const req = route.request();
      if (/\/contents\//.test(req.url())) {
        if (req.method() === 'PUT') { puts.push(JSON.parse(Buffer.from(JSON.parse(req.postData()).content, 'base64').toString('utf8'))); return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }); }
        return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ sha: 's1', encoding: 'base64', content: Buffer.from(JSON.stringify(remote)).toString('base64') }) });
      }
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"private":true}' });
    });
    const p2 = await c2.newPage(); p2.on('pageerror', e => errors.push(e.message));
    await p2.goto('http://127.0.0.1:' + server.address().port);
    await p2.getByRole('button', { name: 'Ich bin neu' }).click();
    await p2.evaluate(() => window.tpTest.fbDone());
    await p2.waitForTimeout(700); assert.equal(await p2.locator('#tour').count(), 0, 'keine Tour auf den Einstellungen');
    await p2.locator('details[data-sec="Sync über GitHub"] summary').click();
    await p2.locator('#sy-owner').fill('dennis-test'); await p2.locator('#sy-token').fill('github_pat_gut');
    await p2.locator('[data-act="sync-connect"]').click();
    await p2.waitForFunction(() => window.tpTest.state().durchgang === 3, null, { timeout: 5000 });
    const s2 = await p2.evaluate(() => { const s = window.tpTest.state(); return { dg: s.durchgang, tag: s.tag, start: s.startDate, tage: s.tage, logs: window.tpTest.logs().map(l => l.id).sort().join(',') }; });
    assert.deepEqual(s2, { dg: 3, tag: 3, start: '2026-09-01', tage: 4, logs: 'fb1,r1' });
    const up = puts[puts.length - 1];
    assert.equal(up.stand.durchgang, 3, 'hochgeladen wird der echte Stand, nicht der Start des zweiten Geräts');
    console.log('PASS: zweites Gerät nach dem Fragebogen verbunden: der echte Stand gewinnt (Durchgang, Einheit, Start, Tage), 1RM aus dem Fragebogen bleiben');
    assert.equal(errors.length, 0, errors.join('\n'));
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); process.exit(1); });
