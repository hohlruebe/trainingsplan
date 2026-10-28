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
window.tpTest = { state: () => S, logs: () => LOGS, localSave: () => { S.tage = 3; S.schwerpunkt = null; saveState(); return S.feldTs.tage; } };
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
    const dlg = page.getByRole('dialog', { name: 'Anmelden' });
    await dlg.waitFor({ state: 'visible', timeout: 3000 });
    assert.ok(await page.getByRole('heading', { name: /Hallo, ich bin/ }).count(), 'darunter die Begrüßung');
    console.log('PASS: neues Gerät: das Anmeldefenster geht von selbst auf');

    await dlg.getByRole('button', { name: 'Ich bin neu' }).click();
    await dlg.waitFor({ state: 'detached' });
    await page.waitForTimeout(500);
    assert.equal(await page.getByRole('dialog').count(), 0, 'geht nicht noch einmal von selbst auf');
    const again = page.getByRole('button', { name: 'Ich nutze die App schon · Anmelden' });
    assert.ok(await again.isVisible(), 'Begrüßung behält den Weg zum Anmelden');
    console.log('PASS: „Ich bin neu“ schließt, die Begrüßung bietet Anmelden weiter an');

    // Das Gerät hat inzwischen Standardwerte gespeichert (neuer als der Stand in GitHub): sie dürfen den echten Stand nicht verdrängen.
    assert.ok(await page.evaluate(() => window.tpTest.localSave()) > 1.7e12);
    await again.click();
    await dlg.waitFor({ state: 'visible' });
    await dlg.getByRole('button', { name: 'Anmelden', exact: true }).click();
    assert.equal(await dlg.locator('#lg-msg').innerText(), 'Bitte GitHub-Namen und Token eintragen.');
    await dlg.getByLabel('GitHub-Name').fill('dennis-test');
    await dlg.getByLabel('Token').fill('github_pat_falsch');
    await dlg.getByRole('button', { name: 'Anmelden', exact: true }).click();
    await page.waitForFunction(() => /Token ist ungültig/.test(document.getElementById('lg-msg').textContent));
    assert.equal(await page.evaluate(() => localStorage.getItem('tp.sync')), null, 'falscher Token wird nicht gespeichert');
    console.log('PASS: leere Felder und falscher Token: Hinweis im Fenster, nichts gespeichert');

    await dlg.getByLabel('Token').fill('github_pat_gut');
    await dlg.getByRole('button', { name: 'Anmelden', exact: true }).click();
    await dlg.waitFor({ state: 'detached', timeout: 5000 });
    const st = await page.evaluate(() => { const s = window.tpTest.state(); return { started: s.started, name: s.name, dg: s.durchgang, tage: s.tage, sp: s.schwerpunkt, n: window.tpTest.logs().length }; });
    assert.deepEqual(st, { started: true, name: 'Dennis', dg: 3, tage: 4, sp: 'kb', n: 1 }, 'der Stand aus GitHub gilt ganz');
    assert.equal(await page.getByRole('heading', { name: /Hallo, ich bin/ }).count(), 0, 'kein Fragebogen mehr');
    assert.ok(/Angemeldet\. Dein Stand von heute ist da\./.test(await page.locator('#toast').innerText()));
    const last = puts[puts.length - 1];
    assert.ok(!last || (last.stand.name === 'Dennis' && last.stand.tage === 4), 'hochgeladen wird der echte Stand, nicht die Standardwerte');
    assert.ok(!(await page.evaluate(() => localStorage.getItem('tp.state'))).includes('github_pat_'), 'Token nicht im Stand');
    console.log('PASS: Anmelden holt den Stand von heute (Name, Durchgang, Tage, Schwerpunkt, Einheiten), Heute statt Fragebogen');

    await page.reload();
    await page.waitForTimeout(600);
    assert.equal(await page.getByRole('dialog').count(), 0, 'angemeldet: kein Fenster mehr');
    assert.equal(errors.length, 0, errors.join('\n'));
    console.log('PASS: nach dem Neuladen kein Anmeldefenster, keine JavaScript-Fehler');
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); process.exit(1); });
