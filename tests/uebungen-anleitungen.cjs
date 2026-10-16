// Übungs-Anleitungen (Oktober 2026): jede Übung der Bibliothek hat Zweck, Vorbereitung, Schritte, Ausstieg und den
// aufklappbaren Teil. Ausführen: node tests/uebungen-anleitungen.cjs (ohne Browser).
// Mit Playwright zusätzlich die Ansicht in Tools › Übungen am Handy (390 px) und Desktop (1366 px): TP_BROWSER=1.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const json = id => JSON.parse(html.match(new RegExp('<script id="' + id + '" type="application/json">([\\s\\S]*?)</script>'))[1]);
const lib = json('lib-data');
const ue = lib.uebungen;
assert.ok(ue.length >= 381, 'alle Übungen da');

// 1) Jede Übung hat alle Felder in der erwarteten Form.
for (const u of ue) {
  const at = ' bei ' + u.id;
  for (const k of ['zweck', 'sauber', 'atmung', 'skalierung'])
    assert.ok(typeof u[k] === 'string' && u[k].trim().length > 5, k + at);
  // Leer, wenn es nichts Eigenes zu sagen gibt (z. B. kein besonderer Ausstieg); die App lässt die Zeile dann weg.
  for (const k of ['vorbereitung', 'ausstieg', 'grenzen']) assert.equal(typeof u[k], 'string', k + at);
  assert.ok(Array.isArray(u.schritte) && u.schritte.length >= 3 && u.schritte.length <= 7, 'schritte' + at);
  assert.ok(Array.isArray(u.details), 'details' + at);
  assert.ok(Array.isArray(u.fehler) && u.fehler.length >= 1 && u.fehler.every(x => x.f && x.k), 'fehler als {f, k}' + at);
  assert.ok(/Leichter:/.test(u.skalierung) && /Schwerer:/.test(u.skalierung), 'skalierung Leichter/Schwerer' + at);
  assert.ok(!('pruefung' in u), 'Prüfnotizen bleiben in den Paketen' + at);
  assert.ok(!/[a-zäöüß,] (Sie|Ihr(e|en|em)?)\b/.test(u.schritte.join(' ')), 'du-Form (Sie am Satzanfang darf die Hantel sein)' + at);
}

// 2) Die Pakete in design/auftraege/texte (erste Fassung der Anleitungen) sind gültig, jede Übung höchstens einmal.
// Seit der Obsidian-Bibliothek (bibliothek/) werden die Texte dort gepflegt; tests/bibliothek.cjs prüft, dass die App genau daraus gebaut ist.
const dir = path.join(ROOT, 'design', 'auftraege', 'texte');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => path.join(dir, f));
execFileSync('node', [path.join(ROOT, 'design', 'auftraege', 'pruefen_bibliothek.js'), ...files], { stdio: 'pipe' });
const seen = {};
for (const f of files) for (const u of JSON.parse(fs.readFileSync(f, 'utf8')).uebungen) {
  assert.ok(!seen[u.id], 'doppelt: ' + u.id); seen[u.id] = 1;
  assert.ok(ue.find(x => x.id === u.id), 'unbekannte Übung ' + u.id);
}

// 3) IDs, Namen und Leiter-Stufen der Bibliothek bleiben gültig: jede Stufe einer Leiter zeigt auf eine Übung.
const ids = new Set(ue.map(u => u.id));
for (const l of lib.leitern || []) for (const s of l.stufen || []) if (s.ue) assert.ok(ids.has(s.ue), 'Leiter ' + l.id + ' → ' + s.ue);

// 4) Die App nimmt die neuen Schritte (Glossar aus plan-data wird überschrieben).
assert.match(html, /g\.steps = ueSteps\(u\)/);
assert.match(html, /function ueInfoHTML\(u\)/);
console.log('Übungs-Anleitungen: ' + ue.length + ' Übungen, ' + files.length + ' Pakete OK');

if (!process.env.TP_BROWSER) return;
const http = require('node:http');
const { chromium } = require(require.resolve('playwright', { paths: [process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || process.cwd()] }));
const page0 = html.replace('\napplyTheme();\nblockCheck();', `
window.tpX = { go: function (n, more) { ui.tab = 'uebungen'; ui.libAll = true; ui.glossQuery = n; ui.glossOpen = n; var u = Object.values(UE).find(function (x) { return x.name === n; }); if (more && u) ui.openSec['glm-' + u.id] = true; render(); },
  steps: function (n) { var u = Object.values(UE).find(function (x) { return x.name === n; }); return ueHow(u.id); } };
applyTheme();
blockCheck();`);
assert.notEqual(page0, html, 'Test-Haken');
const server = http.createServer((q, r) => { r.setHeader('Content-Type', 'text/html'); r.end(page0); });
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const b = await chromium.launch({ headless: true, ...(process.env.TP_CHROMIUM ? { executablePath: process.env.TP_CHROMIUM, args: ['--no-sandbox', '--disable-gpu'] } : {}) });
  try {
    for (const width of [390, 1366]) {
      const ctx = await b.newContext({ viewport: { width, height: 844 }, serviceWorkers: 'block' });
      await ctx.addInitScript(() => localStorage.setItem('tp.state', JSON.stringify({ started: true, durchgang: 3, tag: 1, startDate: '2026-09-01', blockStart: 1, name: 'Test', vollbild: false })));
      const p = await ctx.newPage(), errs = [];
      p.on('pageerror', e => errs.push(e.message));
      await p.goto('http://127.0.0.1:' + server.address().port + '/');
      for (const n of ['Ring Pull-up', 'Deadlift', 'Handstand', 'Pigeon Stretch']) {
        const u = ue.find(x => x.name === n); assert.ok(u, 'Übung ' + n);
        await p.evaluate(a => window.tpX.go(a[0], a[1]), [n, true]);
        const item = p.locator('details.gl-item[open]').first();
        await item.waitFor();
        const txt = await item.innerText();
        // Sichtbar nur Figur, Schritte und Leiter; der Rest steht hinter dem (i).
        assert.ok(txt.includes(u.schritte[0].slice(0, 30)), 'Schritt 1 sichtbar: ' + n);
        assert.ok(!txt.includes(u.fehler[0].f.slice(0, 20)), 'Fehler nicht in der Liste: ' + n);
        await item.locator('.gl-i').click();
        const sheet = p.locator('#sheet .ue-info');
        await sheet.waitFor(); await p.waitForTimeout(450);
        const info = await sheet.innerText();
        assert.ok(info.includes(u.zweck.slice(0, 30)), 'Zweck im Blatt: ' + n);
        assert.ok(info.includes(u.fehler[0].f.slice(0, 20)), 'Fehler im Blatt: ' + n);
        // Evidenz aus der Obsidian-Bibliothek: kurz, ohne Quellen
        if (u.ev) {
          assert.ok(info.includes('Was die Forschung sagt'), 'Evidenz im Blatt: ' + n);
          assert.ok(info.includes(u.ev.b === 'uebertragen' ? 'Keine eigenen Studien' : 'Vorläufig'), 'Evidenz-Art im Blatt: ' + n);
        }
        const sh = await sheet.evaluate(e => e.getBoundingClientRect().bottom <= innerHeight + 1);
        assert.ok(sh, 'Blatt passt in den Bildschirm (scrollt innen) bei ' + width + ' px');
        await p.locator('#sheet [data-sh="ok"]').click();
        await p.waitForTimeout(350);
        const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        assert.ok(over <= 1, 'kein seitliches Scrollen bei ' + width + ' px');
      }
      assert.deepEqual(errs, [], 'keine JS-Fehler bei ' + width + ' px');
      await ctx.close();
    }
    console.log('Übungs-Anleitungen im Browser: Handy und Desktop OK');
  } finally { await b.close(); server.close(); }
})().catch(e => { console.error(e); process.exit(1); });
