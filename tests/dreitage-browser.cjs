// Plan 2 im Browser: Umstellung, Wochenleiste, Training mit Neuladen und Speichern, alle Reiter. Optional (Playwright):
// node tests/dreitage-browser.cjs, TP_CHROMIUM kann auf einen lokalen Browser zeigen. Nur Testdaten, kein echtes Konto.
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(require.resolve('playwright', { paths: [process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || process.cwd()] }));
let html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
// Zugriff nur im Test, nie in der App gespeichert.
html = html.replace('\napplyTheme();\nblockCheck();', `
window.tpTest = { state: () => S, logs: () => LOGS, plan: wkPlanC, steps: () => stepsOf(dayCtx(S.tag)), go: to => ACT.step({ dataset: { to: String(to) } }),
  navigate: (tab) => { ui.tab = tab; ui.viewTag = null; ui.wkSel = null; ui.wkMon = null; render(); },
  profile: (v) => { ui.pview = v; ui.tab = 'profil'; render(); },
  set: (s, logs) => { S = Object.assign({}, DEF, s); LOGS = logs || []; DRAFTS = {}; ui.tab = 'heute'; ui.viewTag = null; ui.wkSel = null; ui.wkMon = null; ensureOrte(); DAYS_K = null; invalidateDerived(); LS.set('tp.state', S); LS.set('tp.logs', LOGS); LS.set('tp.drafts', DRAFTS); render(); }
};
applyTheme();
blockCheck();`);
const server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(html); });
// Bisheriger Plan (Tag 1–7), Durchgang 5, regelmäßig trainiert: 7 Krafttage in den letzten Wochen.
const old = () => ({ started: true, durchgang: 5, tag: 3, startDate: '2026-08-03', blockStart: 1, picksV: 2, look: 2, vollbild: false, sound: false, haptik: false,
  feldTs: {}, name: 'Test', tagSince: '2026-10-11', advBy: 'auto', picks: { 'o1:1:1': 'g_pullup', 'o1:6:2': 'g_dip' } });
const logs = () => Array.from({ length: 7 }, (_, i) => ({ id: 'k' + i, ts: 1e12 + i, date: '2026-10-0' + (1 + i), durchgang: 4, tag: [1, 3, 6][i % 3], kind: 'kraft', name: 'Ganzkörper',
  kraft: [{ n: 'Push-up', stage: 'Push-up', reps: [5, 5, 5, 5] }] }));
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch({ headless: true, ...(process.env.TP_CHROMIUM ? { executablePath: process.env.TP_CHROMIUM, args: ['--no-sandbox', '--disable-gpu'] } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, timezoneId: 'Europe/Berlin', serviceWorkers: 'block' });
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.clock.setFixedTime(new Date('2026-10-13T10:00:00+02:00'));
    await page.goto('http://127.0.0.1:' + server.address().port);
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [old(), logs()]);
    // Vor der Umstellung: Hinweis mit Datum, der alte Plan läuft weiter.
    assert.equal(await page.evaluate(() => window.tpTest.state().planVFrom), '2026-10-19');
    assert.ok(await page.getByRole('heading', { name: 'Neuer Plan ab Montag' }).isVisible());
    await page.getByRole('button', { name: 'Schon jetzt starten', exact: true }).click();
    const st = await page.evaluate(() => window.tpTest.state());
    assert.equal(st.planV, 2); assert.equal(st.umfang.u, 4, 'wer regelmäßig trainiert, behält seinen Umfang');
    assert.equal(st.picks['o1:1:1'], 'g_pullup', 'A behält den Klimmzug'); assert.equal(st.picks['o1:3:2'], 'g_dip', 'der Dip wandert zu B (Druck vertikal)');
    console.log('PASS: Umstellung mit Hinweis, Umfang und übernommenen Übungen');

    // Wochenleiste: 7 Tage, heute markiert, A heute, zwei weitere Einheiten.
    const cells = page.locator('.wkst .wd');
    assert.equal(await cells.count(), 7);
    assert.equal(await page.locator('.wkst [aria-current="date"]').getAttribute('data-d'), '2026-10-13');
    assert.match(await page.locator('.wkst [aria-current="date"]').getAttribute('aria-label'), /Dienstag, 13\. Oktober, heute, Einheit A/);
    assert.equal((await page.locator('.wkst .wd.u').allInnerTexts()).length, 3);
    assert.ok(await page.getByRole('heading', { name: 'Ganzkörper A', level: 1 }).isVisible());
    // Anderen Tag wählen: Vorschau, Start gibt es dort nicht, zurück zu heute.
    const later = page.locator('.wkst .wd.u:not(.cur)').first();
    await later.click();
    assert.match(await page.locator('.kicker').first().innerText(), /Vorschau/);
    assert.equal(await page.getByRole('button', { name: /Training starten/ }).count(), 0, 'Auswählen startet nichts');
    await page.getByRole('button', { name: 'Zurück zu heute', exact: true }).click();
    // Heute schlank: kein Blättern, keine Karten für Uhrzeit, Coach, Block und Woche; die Uhrzeit steht oben.
    assert.equal(await page.getByRole('button', { name: 'Woche davor', exact: true }).count(), 0, 'Wochen blättern nur im Plan');
    for (const h of ['Training heute', 'Dein Coach hat heute angepasst', 'Deine Woche', 'Allround']) assert.equal(await page.getByRole('heading', { name: h, exact: true }).count(), 0, h + ' läuft im Hintergrund');
    assert.match(await page.locator('.kicker').first().innerText(), /^Heute · \d\d:\d\d Uhr$/);
    // Andere Uhrzeit und Heute nicht stehen in „Heute anpassen“.
    await page.getByRole('button', { name: 'Heute anpassen', exact: true }).click();
    assert.ok(await page.locator('.ad-it[data-k="time"]').isVisible() && await page.locator('.ad-it[data-k="off"]').isVisible());
    await page.getByRole('button', { name: 'Fertig', exact: true }).click();
    // Vergangene Woche im Plan: zeigt die Einträge.
    await page.evaluate(() => window.tpTest.navigate('plan'));
    await page.getByRole('button', { name: 'Woche davor', exact: true }).click();
    assert.ok((await page.locator('.wkst').innerText()).includes('✓'));
    await page.evaluate(() => window.tpTest.navigate('heute'));
    console.log('PASS: Wochenleiste mit Heute, Auswahl, Vorschau, Heute ohne Ballast, Wochenwechsel im Plan');

    // Training: die Dauer in der Übersicht ist die Summe der Schritte plus 2 Min, Abschluss ist Kardio.
    const steps = await page.evaluate(() => window.tpTest.steps().map(s => [s.id, s.dur]));
    const total = steps.reduce((a, s) => a + (s[1] || 0), 0) + 2;
    assert.ok(steps.some(s => s[0] === 'fin') && !steps.some(s => s[0] === 'metcon'), 'A endet mit Kardio');
    assert.ok((await page.locator('.tl-top').first().innerText()).includes('ca. ' + total + ' Min'));
    assert.ok(total <= 90);
    await page.getByRole('button', { name: /Training starten/ }).click();
    await page.getByRole('button', { name: /Weiter zu/ }).first().click();
    await page.reload();
    assert.ok(await page.locator('.st-prog').isVisible(), 'nach dem Neuladen geht es beim Schritt weiter');
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().length - 1));
    assert.ok(await page.getByRole('heading', { name: 'Kardio locker', level: 1 }).isVisible());
    await page.getByRole('button', { name: /Training speichern/ }).click();
    await page.getByRole('button', { name: 'Nein, speichern', exact: true }).click(); // Cool-down bleibt eine Frage, kein stiller Zusatz
    const l = await page.evaluate(() => window.tpTest.logs().slice(-1)[0]);
    assert.equal(l.pv, 2); assert.equal(l.unit, 'A'); assert.equal(l.fin.k, 'easy');
    assert.ok(l.kraft.every(k => (k.pain && k.pain.skip) || (k.goal >= 3 && k.reps.every(r => r === k.goal))), 'ohne Meldung zählt die Vorgabe');
    await page.locator('#moment').evaluate(e => e.remove()).catch(() => {});
    assert.ok((await page.locator('.wkst [aria-current="date"]').innerText()).includes('✓A'));
    console.log('PASS: Ablauf mit Gesamtzeit, Zwischenstand nach Neuladen, Vorgabe im EMOM, gespeichert mit Planversion und Einheit');

    // Plan › Deine Woche und Arbeitszeiten: Wochenziel, Zeitlimit, kein Ausschalten.
    await page.evaluate(() => window.tpTest.navigate('plan'));
    assert.ok(await page.getByRole('heading', { name: '1 von 3 erledigt' }).isVisible());
    await page.evaluate(() => window.tpTest.navigate('woche'));
    assert.ok(await page.getByText('Zeit pro Training').isVisible());
    assert.equal(await page.getByRole('button', { name: 'Planung ausschalten' }).count(), 0);
    console.log('PASS: Plan mit Wochenziel, Arbeitszeiten mit Zeitlimit');

    // Arbeitszeiten: Wahl steuert die Eingabe, Einstellungen führen hin.
    const v2s = () => Object.assign(old(), { planV: 2, tag: 1, umfang: { u: 4, ts: 0 }, planWk: '2026-10-12', planStart: { date: '2026-10-13', week: '2026-10-12', tag: 1, mode: 'week' } });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [v2s(), logs()]);
    await page.evaluate(() => window.tpTest.navigate('einst'));
    await page.getByRole('button', { name: /Arbeitszeiten/ }).first().click();
    await page.getByRole('button', { name: 'Geregelte Zeiten', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Deine Arbeitswoche' }).isVisible());
    await page.getByRole('button', { name: 'Schichtarbeit', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Dein Schichtplan' }).isVisible());
    assert.ok(await page.getByRole('button', { name: /Tagschlaf/ }).isVisible() && await page.getByRole('button', { name: /Gesperrte Zeiten/ }).isVisible());
    console.log('PASS: Arbeitszeiten mit Geregelte Zeiten / Schichtarbeit, Tagschlaf und Sperrzeiten');

    // Befinden nach der Nacht (Montag Nachtdienst, danach nur 12-h-Dienste, A heute nach der Nacht): Müde = kürzer, Sehr müde = heute frei.
    const T12 = { k: 't', a: 6, b: 18 };
    const night = Object.assign(v2s(), { alltag: { on: true, bed: 22.5, wake: 6.5, schicht: true, weg: 0 }, arbeit: { '2026-10-12': [{ k: 'n', a: 22, b: 6 }, null, T12, T12, T12, T12, T12] } });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [night, logs()]);
    const m0 = await page.evaluate(() => window.tpTest.steps().reduce((a, s) => a + (s.opt ? 0 : s.dur || 0), 0));
    assert.ok(await page.getByRole('button', { name: 'Müde', exact: true }).isVisible(), 'Frage nach dem Nachtdienst');
    assert.equal(await page.locator('.pn-ask').count(), 1, 'höchstens eine Frage');
    await page.getByRole('button', { name: 'Müde', exact: true }).click();
    assert.ok(await page.evaluate(() => window.tpTest.steps().reduce((a, s) => a + (s.opt ? 0 : s.dur || 0), 0)) < m0, 'müde: kürzere Einheit');
    assert.ok(await page.getByText('Heute kürzer, weil du müde bist.').isVisible(), 'die Folge steht unter dem Titel');
    assert.equal(await page.getByRole('button', { name: 'Sehr müde', exact: true }).count(), 0, 'beantwortet: die Frage tritt zur Seite');
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [night, logs()]);
    await page.getByRole('button', { name: 'Sehr müde', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Heute frei', level: 1 }).isVisible());
    await page.getByRole('button', { name: 'Erholt', exact: true }).click(); // „Sehr müde“ bleibt änderbar
    assert.ok(await page.getByRole('heading', { name: 'Ganzkörper A', level: 1 }).isVisible());
    console.log('PASS: Befinden nach dem Nachtdienst, eine Frage auf einmal');

    // Verschieben: Heute anpassen › Training verschieben › Vorschlag des Coachs.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [v2s(), logs()]);
    await page.getByRole('button', { name: 'Heute anpassen', exact: true }).click();
    await page.locator('.ad-it[data-k="move"] .gl-row').click();
    const opt = page.locator('[data-act="mv-go"]').first(), to = await opt.getAttribute('data-d');
    await opt.click();
    assert.ok(await page.getByRole('heading', { name: 'Heute frei', level: 1 }).isVisible());
    assert.equal(await page.evaluate(d => window.tpTest.plan().days.filter(x => x.date === d)[0].tag, to), 1, 'A liegt am neuen Tag');
    assert.ok(await page.getByText('Dein Training ist verschoben, heute ist frei.').isVisible());
    // Freier Tag: eine Karte mit Flow und Kurz-Check, der Kurz-Check klappt auf.
    assert.ok(await page.getByRole('heading', { name: 'Für deinen freien Tag' }).isVisible());
    await page.locator('[data-act="rc-open"]').click();
    assert.ok(await page.getByRole('button', { name: 'Kurz-Check speichern' }).isVisible());
    console.log('PASS: Training verschieben auf einen Vorschlag des Coachs, freier Tag mit einer Karte');

    // Zusatztag: Vorschlag mit Grund, Dauer, planen, Z in der Wochenleiste, zählt nicht ins Wochenziel.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [v2s(), logs()]);
    await page.evaluate(() => window.tpTest.navigate('plan'));
    await page.getByRole('button', { name: 'Vorschlag ansehen', exact: true }).click();
    await page.getByRole('button', { name: '45 Min', exact: true }).click();
    await page.getByRole('button', { name: 'Einheit planen', exact: true }).click();
    const z = await page.evaluate(() => window.tpTest.state().zusatz);
    assert.equal(z.min, 45); assert.ok(z.date);
    assert.ok((await page.locator('.wkst .wd.z').count()) === 1 || z.date === '2026-10-13');
    assert.ok(await page.getByRole('heading', { name: '0 von 3 erledigt' }).isVisible());
    console.log('PASS: Zusatztag vorgeschlagen, geplant und in der Wochenleiste');

    // Google Kalender: Link einfügen, Brücke antwortet (nachgestellt), Dienste werden der Schichtplan, Link bleibt nur auf dem Gerät.
    const BR = 'https://script.google.com/macros/s/AKfycbTestTestTestTestTest123/exec';
    const t = (d, h) => new Date(d + 'T' + String(h).padStart(2, '0') + ':00:00+02:00').getTime();
    let bridge = { app: 'trainingsplan-kalender', v: 1, ts: Date.now(), von: t('2026-10-05', 0), bis: t('2026-11-03', 0),
      w: [{ k: 'n', a: t('2026-10-13', 22), b: t('2026-10-14', 6) }, { k: 'n', a: t('2026-10-14', 22), b: t('2026-10-15', 6) }, { k: 'f', a: t('2026-10-16', 6), b: t('2026-10-16', 14) }],
      b: [{ a: t('2026-10-17', 10), b: t('2026-10-17', 13) }] };
    await page.route('https://script.google.com/**', r => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(bridge) }));
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [v2s(), logs()]);
    await page.evaluate(() => window.tpTest.navigate('woche'));
    await page.getByRole('button', { name: 'Kalender verbinden', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Google Kalender', level: 1 }).isVisible());
    await page.locator('#kal-url').fill('https://example.com/nicht');
    await page.getByRole('button', { name: 'Verbinden', exact: true }).click();
    assert.ok(await page.getByText('Das ist kein Web-App-Link.', { exact: false }).isVisible(), 'falscher Link wird erklärt');
    await page.locator('#kal-url').fill(BR + '?x=1');
    await page.getByRole('button', { name: 'Verbinden', exact: true }).click();
    await page.getByRole('heading', { name: 'Deine Dienste' }).waitFor();
    assert.ok(await page.getByText('aus dem Kalender').isVisible());
    const st2 = await page.evaluate(() => [JSON.stringify(window.tpTest.state()), localStorage.getItem('tp.state'), JSON.parse(localStorage.getItem('tp.kal'))]);
    assert.ok(!st2[0].includes('script.google') && !st2[1].includes('script.google'), 'Link nicht im Stand (nicht in Export und Sync)');
    assert.equal(st2[2].url, BR, 'Link ohne Zusätze nur auf dem Gerät');
    assert.equal(await page.evaluate(() => window.tpTest.plan().days[2].tag), null, 'zwischen zwei Nächten aus dem Kalender kein Training');
    // Abgleich ohne Brücke: letzter Stand bleibt, Fehler wird erklärt.
    bridge = { nein: 1 };
    await page.getByRole('button', { name: 'Jetzt abgleichen', exact: true }).click();
    await page.getByText('Die Antwort passt nicht.', { exact: false }).waitFor();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('tp.kal')).w.length), 3, 'letzter Stand bleibt');
    await page.getByRole('button', { name: 'Trennen', exact: true }).click();
    await page.getByRole('button', { name: 'Sicher? Nochmal tippen', exact: true }).click();
    await page.getByRole('button', { name: 'Kalender verbinden', exact: true }).waitFor();
    assert.equal(await page.evaluate(() => localStorage.getItem('tp.kal')), null, 'Trennen löscht Link und Daten');
    console.log('PASS: Google Kalender verbinden, Dienste als Schichtplan, Link nur auf dem Gerät, Fehler und Trennen');

    for (const width of [320, 390, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      for (const tab of ['heute', 'plan', 'woche', 'kalender', 'zusatz', 'fokus', 'timer', 'uebungen', 'routinen', 'rm', 'profil', 'einst', 'skill']) {
        await page.evaluate(t => window.tpTest.navigate(t), tab);
        assert.ok(await page.locator('#view').innerText(), tab);
        if (width < 1000) { const wide = await page.evaluate(() => [].filter.call(document.querySelectorAll('body *'), e => e.getBoundingClientRect().right > innerWidth + .5).map(e => e.tagName + ' ' + (e.textContent || '').slice(0, 30))); assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'kein Überlauf ' + tab + ' ' + width + ' ' + wide.join(' | ')); }
      }
      for (const v of ['erfolge', 'verlauf', 'werte']) await page.evaluate(v => window.tpTest.profile(v), v);
    }
    assert.deepEqual(errors, []);
    console.log('PASS: alle drei Reiter und Unterseiten bei 320, 390 und 1366 px ohne JavaScript-Fehler');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => server.close());
