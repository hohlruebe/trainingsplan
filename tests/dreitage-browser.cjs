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
window.tpTest = { kx: t => DAYS[t].kraft.map((x, i) => { var E = kraftEx(t, dr(t), kraftRounds(t), x, i); return { n: x.n, stage: E.stage, goal: E.goal, t: E.tpo && E.tpo.t }; }), state: () => S, logs: () => LOGS, plan: wkPlanC, fill: () => { FILL.k = null; return planFill(); }, coach: t => coachItems(t).map(x => x.h.replace(/<[^>]+>/g, '')).join(' | '), steps: () => stepsOf(dayCtx(S.tag)), go: to => ACT.step({ dataset: { to: String(to) } }),
  navigate: (tab) => { ui.tab = tab; ui.viewTag = null; ui.wkSel = null; ui.wkMon = null; render(); },
  profile: (v) => { ui.pview = v; ui.tab = 'profil'; render(); },
  set: (s, logs) => { S = Object.assign({}, DEF, s); if (!('morgen' in s)) { S.morgen = {}; for (var q = 0; q < 120; q++) S.morgen[isoAdd('2026-09-01', q)] = { h: 8, f: 4, ts: 1 }; } // Guten Morgen gilt im Test als beantwortet
  LOGS = logs || []; DRAFTS = {}; ui.tab = 'heute'; ui.viewTag = null; ui.wkSel = null; ui.wkMon = null; ensureOrte(); DAYS_K = null; invalidateDerived(); LS.set('tp.state', S); LS.set('tp.logs', LOGS); LS.set('tp.drafts', DRAFTS); render(); }
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
    assert.match(await page.locator('.kicker').first().innerText(), /^Heute · \d\d:\d\d Uhr · Kraft$/, "Abschnitt klein im Kopf (Durchgang 5 = Kraft)");
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
    // Vor dem Start: „Heute zum ersten Mal“ mit (i) für Übungen und Stufen, die es noch nie gab.
    assert.ok(await page.getByRole('heading', { name: 'Heute zum ersten Mal' }).isVisible());
    await page.getByRole('button', { name: /Training starten/ }).click();
    // Training immer im Vollbild: Schritt, Einzeln | Liste, (i) mit „So geht’s“, unten weiter.
    assert.ok(await page.locator('#fs .fs-tr').isVisible(), 'Training startet im Vollbild');
    // Körper-Check vor dem Start: Muskel antippen = Kater, nochmal = Schmerz; Schmerz ersetzt die belastende Übung.
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^Körper-Check · 1 von \d$/);
    await page.locator('#fs .kc [data-act="kc"][data-m="brust"]').first().click();
    assert.ok(await page.locator('#fs .kc-r', { hasText: 'Brust' }).locator('.kc-k').isVisible(), 'einmal = Muskelkater');
    await page.locator('#fs .kc [data-act="kc"][data-m="brust"]').first().click();
    await page.locator('#fs [data-act="kc-w"][data-m="brust"][data-v="s"]').click();
    const kc = await page.evaluate(() => { const d = window.tpTest.state(); return Object.values(JSON.parse(localStorage.getItem('tp.drafts')))[0]; });
    assert.equal(kc._kc, 'brust:s:s'); assert.ok(/m:brust:s/.test(Object.keys(kc).filter(k => /^_pk/.test(k)).map(k => kc[k]).join(',')), 'Schmerz wirkt auf eine Übung mit Brust');
    await page.locator('#fs .kc [data-act="kc"][data-m="brust"]').first().click();
    assert.equal(await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem('tp.drafts')))[0]._kc || ''), '', 'dreimal = wieder gut');
    await page.locator('#fs .fs-nav .btn.primary').click();
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^Aufwärmen · 2 von \d$/);
    await page.locator('#fs [data-act="fs-view"][data-v="list"]').click();
    assert.equal(await page.evaluate(() => window.tpTest.state().fsView), 'list', 'die Ansicht merkt sich die App');
    assert.ok(await page.locator('#fs .fs-rows .fs-row').count() >= 3, 'Liste wie ein Whiteboard');
    await page.locator('#fs .fs-nav .btn.primary').click();
    await page.reload();
    assert.ok(await page.locator('#fs .fs-tr .st-prog').isVisible(), 'nach dem Neuladen geht es beim Schritt im Vollbild weiter');
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().findIndex(s => s.id === 'kraft')));
    await page.locator('#fs .fs-side .fs-i').first().click();
    assert.ok(await page.locator('#sheet .ue-how ol.how li').count() >= 2, '(i) zeigt die genaue Durchführung');
    await page.getByRole('button', { name: 'Fertig', exact: true }).click();
    await page.locator('#fs [data-act="fs-view"][data-v="one"]').click();
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().length - 1));
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^Kardio locker/);
    await page.locator('#fs [data-act="save"]').click();
    await page.getByRole('button', { name: 'Nein, speichern', exact: true }).click(); // Cool-down bleibt eine Frage, kein stiller Zusatz
    // Wie hart war's? Regler 1–10, Speichern erst nach einer Wahl.
    assert.ok(await page.locator('#sheet #rpe.unset').isVisible(), 'Regler startet leer');
    assert.ok(await page.locator('#rpe-ok').isDisabled(), 'ohne Wahl kein Speichern');
    await page.locator('#sheet [data-rpe="7"]').click();
    assert.match(await page.locator('#rpe-t').innerText(), /7 · Hart/);
    await page.locator('#rpe-ok').click();
    // Warten auf den neuen Eintrag (die Testdaten haben schon 7 alte, „länger als 0“ war ein Wettlauf).
    await page.waitForFunction(() => window.tpTest.logs().some(x => x.pv === 2), null, { timeout: 8000 });
    const l = await page.evaluate(() => window.tpTest.logs().slice(-1)[0]);
    assert.equal(l.pv, 2); assert.equal(l.unit, 'A'); assert.equal(l.fin.k, 'easy');
    assert.equal(l.rpe, 7); assert.ok(l.min > 0 && l.soll > 100, 'echte Minuten und geplante Belastung im Eintrag');
    assert.ok(l.kraft.every(k => (k.pain && k.pain.skip) || (k.goal >= 3 && k.reps.every(r => r === k.goal))), 'ohne Meldung zählt die Vorgabe');
    await page.locator('#moment').evaluate(e => e.remove()).catch(() => {});
    assert.ok((await page.locator('.wkst [aria-current="date"]').innerText()).includes('✓A'));
    console.log('PASS: Ablauf mit Gesamtzeit, Zwischenstand nach Neuladen, Vorgabe im EMOM, gespeichert mit Planversion und Einheit');

    // Plan › Deine Woche und Arbeitszeiten: Wochenziel, Zeitlimit, kein Ausschalten.
    await page.evaluate(() => window.tpTest.navigate('plan'));
    assert.ok(await page.getByRole('heading', { name: '1 von 3 erledigt' }).isVisible());
    assert.ok(await page.getByRole('heading', { name: 'Belastung', exact: true }).isVisible(), 'Karte Belastung in Deine Woche');
    assert.ok(await page.locator('.ld .ld-a').count() >= 1 && await page.locator('.ld .ld-p').count() >= 1, 'gemacht als Balken, geplant gestrichelt');
    assert.match(await page.locator('.ld-mt').innerText(), /Plan der Woche \d+/);
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
    // Guten Morgen (Paket 59): jeden Tag, Schlaf als Zähler, Gefühl als Kapsel; der Coach entscheidet daraus.
    const nightM = Object.assign({}, night, { morgen: {} });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [nightM, logs()]);
    const m0 = await page.evaluate(() => window.tpTest.steps().reduce((a, s) => a + (s.opt ? 0 : s.dur || 0), 0));
    assert.ok(await page.locator('.mg .chip', { hasText: 'Nach dem Nachtdienst' }).isVisible(), 'Guten Morgen mit Anlass');
    assert.equal(await page.locator('.pn-ask').count(), 0, 'höchstens eine Frage');
    await page.locator('.mg [data-act="mg-f"][data-v="1"]').click();
    assert.match(await page.locator('.mg-res').innerText(), /Kurzversion/);
    await page.locator('[data-act="mg-ok"]').click();
    assert.ok(await page.evaluate(() => window.tpTest.steps().reduce((a, s) => a + (s.opt ? 0 : s.dur || 0), 0)) < m0, 'platt: kürzere Einheit');
    assert.ok(await page.getByText('Heute kürzer, weil du müde bist.').isVisible(), 'die Folge steht unter dem Titel');
    assert.match(await page.locator('.mg-row').innerText(), /Gefühl platt/);
    await page.locator('[data-act="mg-edit"]').click();
    for (let q = 0; q < 6; q++) await page.locator('.mg [data-act="mg-h"][data-d="-0.5"]').click();
    assert.match(await page.locator('.mg-res').innerText(), /nimm dir heute frei/);
    await page.locator('[data-act="mg-off"]').click();
    assert.ok(await page.getByRole('heading', { name: 'Heute frei', level: 1 }).isVisible());
    await page.locator('[data-act="mg-edit"]').click(); // bleibt änderbar
    await page.locator('.mg [data-act="mg-f"][data-v="4"]').click();
    for (let q = 0; q < 6; q++) await page.locator('.mg [data-act="mg-h"][data-d="0.5"]').click();
    await page.locator('[data-act="mg-ok"]').click();
    assert.ok(await page.getByRole('heading', { name: 'Ganzkörper A', level: 1 }).isVisible());
    assert.equal(await page.evaluate(() => window.tpTest.steps().reduce((a, s) => a + (s.opt ? 0 : s.dur || 0), 0)), m0, 'gut geschlafen: wie geplant');
    console.log('PASS: Guten Morgen nach dem Nachtdienst: Kurzversion, heute frei, änderbar');

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
    let bridge = { app: 'trainingsplan-kalender', v: 2, ts: Date.now(), von: t('2026-10-05', 0), bis: t('2026-11-03', 0),
      k: [{ id: 'haupt0000001', n: 'Dennis', f: '#4986E7', e: true, s: true, p: true }, { id: 'familie00001', n: 'Familie', f: '#F691B2', e: false, s: true }],
      w: [{ c: 0, k: 'n', a: t('2026-10-13', 22), b: t('2026-10-14', 6) }, { c: 0, k: 'n', a: t('2026-10-14', 22), b: t('2026-10-15', 6) }, { c: 0, k: 'f', a: t('2026-10-16', 6), b: t('2026-10-16', 14) }],
      b: [{ c: 0, a: t('2026-10-17', 1), b: t('2026-10-17', 9) }, { c: 0, a: t('2026-10-17', 10), b: t('2026-10-17', 13) }, { c: 1, a: t('2026-10-18', 9), b: t('2026-10-18', 21) }] };
    const posts = [];
    await page.route('https://script.google.com/**', r => {
      if (r.request().method() === 'POST') { posts.push(JSON.parse(r.request().postData())); return r.fulfill({ status: 200, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ app: 'trainingsplan-kalender', ok: true, neu: 1, weg: 0 }) }); }
      return r.fulfill({ status: 200, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(bridge) });
    });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [v2s(), logs()]);
    await page.evaluate(() => window.tpTest.navigate('woche'));
    await page.getByRole('button', { name: 'Kalender verbinden', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Google Kalender', level: 1 }).isVisible());
    await page.locator('#kal-url').fill('https://example.com/nicht');
    await page.getByRole('button', { name: 'Verbinden', exact: true }).click();
    assert.ok(await page.getByText('Das ist kein Web-App-Link.', { exact: false }).isVisible(), 'falscher Link wird erklärt');
    await page.locator('#kal-url').fill(BR + '?x=1');
    await page.getByRole('button', { name: 'Verbinden', exact: true }).click();
    await page.getByRole('heading', { name: 'Deine Tage' }).waitFor();
    assert.ok(await page.getByText('aus dem Kalender').isVisible());
    // Paket 64: mit Kalender nichts mehr von Hand eintragen, dafür je Tag die freie Zeit; Schlaf aus dem Kalender ersetzt die Annahme.
    assert.equal(await page.locator('[data-act="wk-day"], [data-act="wk-schicht"]').count(), 0, 'keine Früh-/Spätschicht von Hand, wenn der Kalender verbunden ist');
    assert.ok(await page.getByText('am Stück frei', { exact: false }).first().isVisible(), 'freie Zeit je Tag');
    assert.ok(await page.getByText('Nur wenn im Kalender keiner steht').isVisible());
    assert.ok(await page.evaluate(() => window.tpTest.plan().T.sleep.some(x => x[0] === 24 * 5 + 1 && x[1] === 24 * 5 + 9)), 'Schlaf aus dem Kalender (Sa 1–9 Uhr)');
    const st2 = await page.evaluate(() => [JSON.stringify(window.tpTest.state()), localStorage.getItem('tp.state'), JSON.parse(localStorage.getItem('tp.kal'))]);
    assert.ok(!st2[0].includes('script.google') && !st2[1].includes('script.google'), 'Link nicht im Stand (nicht in Export und Sync)');
    assert.equal(st2[2].url, BR, 'Link ohne Zusätze nur auf dem Gerät');
    assert.equal(await page.evaluate(() => window.tpTest.plan().days[2].tag), null, 'zwischen zwei Nächten aus dem Kalender kein Training');
    // Kalender einzeln: Hauptkalender an, geteilter Familien-Kalender zuerst aus; anschalten sperrt den Sonntag 9–21 Uhr.
    const sw = n => page.locator('.kal-list label', { hasText: n }).locator('input');
    assert.equal(await sw('Dennis').isChecked(), true); assert.equal(await sw('Familie').isChecked(), false);
    const sun = () => page.evaluate(() => window.tpTest.plan().days[6]);
    await sw('Familie').click({ force: true }); await page.waitForTimeout(400);
    assert.equal(await sw('Familie').isChecked(), true, 'Wahl bleibt nach dem Neuzeichnen');
    const s1 = await sun(); assert.ok(!s1.tag || s1.t >= 24 * 6 + 21 || s1.end <= 24 * 6 + 9, 'angeschalteter Kalender sperrt seine Termine');
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('tp.kal')).sel.familie00001), true, 'Wahl nur auf dem Gerät gemerkt');
    // Alte Brücke (v2): Hinweis zum Aktualisieren, nichts wird geschickt. Neue Brücke (v3): der Coach trägt die Trainings ein, Aus nimmt sie wieder heraus.
    assert.ok(await page.getByRole('button', { name: 'So aktualisierst du die Brücke' }).isVisible()); assert.equal(posts.length, 0);
    await page.getByRole('button', { name: 'So aktualisierst du die Brücke' }).click();
    assert.ok(await page.getByRole('heading', { name: 'Brücke aktualisieren', level: 1 }).isVisible());
    bridge.v = 3;
    await page.getByRole('button', { name: 'Jetzt abgleichen', exact: true }).click();
    await page.getByRole('heading', { name: 'Deine Tage' }).waitFor();
    await page.waitForFunction(n => window.tpTest && document.querySelector('[data-change="kal-push"]'), null);
    await page.waitForTimeout(500);
    assert.ok(posts.length >= 1, 'nach dem Abgleich trägt der Coach ein');
    const last = posts[posts.length - 1];
    assert.equal(last.app, 'trainingsplan'); assert.ok(last.t.length >= 1 && last.t.every(x => /^(Training|Zusatz): /.test(x.n) && x.b > x.a && x.a > Date.now() - 864e5 * 400), 'nur Trainings mit Zeit');
    assert.equal(await page.getByRole('button', { name: 'Alle in den Kalender' }).count(), 0, 'kein .ics-Knopf, wenn der Coach selbst einträgt');
    const n0 = posts.length;
    await page.locator('[data-change="kal-push"]').click({ force: true }); await page.waitForTimeout(500);
    assert.equal(posts.length, n0 + 1); assert.equal(posts[posts.length - 1].t.length, 0, 'Aus nimmt die Trainings aus dem Kalender');
    await page.locator('[data-change="kal-push"]').click({ force: true }); await page.waitForTimeout(500);
    assert.ok(posts[posts.length - 1].t.length >= 1, 'wieder an: Trainings wieder eingetragen');
    // Abgleich ohne Brücke: letzter Stand bleibt, Fehler wird erklärt.
    bridge = { nein: 1 };
    await page.getByRole('button', { name: 'Jetzt abgleichen', exact: true }).click();
    await page.getByText('Die Antwort passt nicht.', { exact: false }).waitFor();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('tp.kal')).w.length), 3, 'letzter Stand bleibt');
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('tp.kal')).sel.familie00001), true, 'Wahl bleibt beim Abgleich');
    await page.getByRole('button', { name: 'Trennen', exact: true }).click();
    const n1 = posts.length;
    await page.getByRole('button', { name: 'Sicher? Nochmal tippen', exact: true }).click();
    await page.waitForTimeout(300); assert.equal(posts.length, n1 + 1); assert.equal(posts[posts.length - 1].t.length, 0, 'Trennen nimmt die Trainings aus dem Kalender');
    await page.getByRole('button', { name: 'Kalender verbinden', exact: true }).waitFor();
    assert.equal(await page.evaluate(() => localStorage.getItem('tp.kal')), null, 'Trennen löscht Link und Daten');
    console.log('PASS: Google Kalender verbinden, Dienste als Schichtplan, Kalender einzeln an und aus, Trainings eintragen, Link nur auf dem Gerät, Fehler und Trennen');

    // Fußanker (Nordic Curls) nur, wo er angehakt ist: bisher galt das Sofa (Alltagsgegenstände) an jedem Ort.
    const anker = Object.assign(v2s(), { ort: 'o_gym', picks: { 'o1:3:3': 'g_nordic', 'o_gym:3:3': 'g_nordic' }, swapped: {},
      orte: [{ id: 'o1', k: 'zuhause', on: 1, zh: 1, lf: 1, eq: ['eq_zuhause', 'eq_band'] }, { id: 'o_gym', k: 'gym', on: 1, zh: 1, lf: 1, eq: ['eq_zuhause', 'eq_kettlebell', 'eq_laufstrecke'] }] });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [anker, logs()]);
    let so = await page.evaluate(() => window.tpTest.state().orte);
    assert.ok(so[0].eq.includes('eq_fussanker') && so[0].fa, 'Zuhause einmalig mit Fußanker (Sofa)');
    assert.ok(!so[1].eq.includes('eq_fussanker') && so[1].fa, 'im Gym nicht von selbst');
    let pf = await page.evaluate(() => window.tpTest.fill());
    assert.equal(pf.kraft[3][2].n, 'Deadlift', 'ohne Fußanker nimmt der Coach die nützlichste Übung, die hier geht');
    const fsw = await page.evaluate(() => window.tpTest.state().swapped['o_gym:3:3']);
    assert.equal(fsw.from, 'g_nordic'); assert.equal(fsw.why, 'eq'); assert.equal(fsw.eq, 'eq_fussanker');
    assert.match(await page.evaluate(() => window.tpTest.coach(3)), /Deadlift statt Nordic Curl, weil hier ein Gerät fehlt \(Fußanker\)\./);
    await page.evaluate(() => { window.tpTest.state().ort = 'o1'; });
    assert.equal((await page.evaluate(() => window.tpTest.fill())).kraft[3][2].n, 'Nordic Curl', 'zu Hause bleibt der Nordic Curl');
    await page.evaluate(() => { window.tpTest.state().ort = 'o_gym'; window.tpTest.navigate('uebungen'); });
    await page.locator('[data-act="eq-sheet"]').first().click();
    const fa = page.locator('#eq-sheet .eq-row', { has: page.locator('input[data-id="eq_fussanker"]') });
    assert.match(await fa.innerText(), /Fußanker[\s\S]*Sofa, Bett, Sprossenwand, Partner · 1 Übung/);
    await fa.locator('label.check').click(); await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Fertig', exact: true }).click();
    assert.equal((await page.evaluate(() => window.tpTest.fill())).kraft[3][2].n, 'Nordic Curl', 'mit Fußanker kommt die alte Wahl zurück, auch wenn Deadlift mehr Nutzen hat');
    assert.match(await page.evaluate(() => window.tpTest.coach(3)), /Nordic Curl statt Deadlift: das Gerät dafür ist jetzt da\./);
    assert.equal((await page.evaluate(() => window.tpTest.fill())).kraft[3][2].n, 'Nordic Curl', 'kein Hin und Her zum Ersatz');
    console.log('PASS: Fußanker je Ort, Ersatz mit Grund, Rückkehr zum Nordic Curl');

    // Verstellbare Kettlebell (Dennis, 22. Oktober): zählt als Kettlebell, Goblet Squat ist keine Sackgasse mehr, das Gewicht wächst.
    const kbSt = kb => Object.assign(old(), { planV: 2, tag: 1, umfang: { u: 4, ts: 0 }, planWk: '2026-10-12', planStart: { date: '2026-09-28', week: '2026-09-28', tag: 1, mode: 'week' }, planAsk: '2026-10-12',
      weight: 80, orte: [{ id: 'o1', k: 'zuhause', on: true, eq: ['eq_zuhause', 'eq_band', kb], fa: 1, lf: 1 }], ort: 'o1', picks: {} });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [kbSt('eq_kettlebell'), []]);
    const fest = (await page.evaluate(() => window.tpTest.fill())).kraft[1].map(x => x.n);
    assert.ok(!fest.includes('Back Squat'), 'feste Kettlebell: Goblet Squat wäre eine Sackgasse (' + fest + ')');
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [kbSt('eq_kb_verstellbar'), []]);
    const fill = await page.evaluate(() => window.tpTest.fill());
    assert.ok(fill.kraft[1].some(x => x.n === 'Back Squat'), 'verstellbar: Kniebeuge-Leiter mit Goblet Squat (' + fill.kraft[1].map(x => x.n) + ')');
    assert.ok((await page.evaluate(() => window.tpTest.kx(1))).some(x => x.stage === 'Goblet Squat' && !x.t), 'Goblet Squat ohne Tempo, das Gewicht steigt');
    await page.evaluate(() => window.tpTest.navigate('uebungen'));
    await page.locator('[data-act="eq-sheet"]').first().click();
    // Eine Zeile Kettlebell mit „Eine | Zwei“ und „Verstellbar“ (Dennis, 23. Oktober); Paar und verstellbar sind keine eigenen Zeilen mehr.
    const kbRow = page.locator('#eq-sheet .eq-row', { has: page.locator('input[data-id="eq_kb_verstellbar"]') });
    assert.match(await kbRow.innerText(), /Kettlebell[\s\S]*Eine[\s\S]*Zwei[\s\S]*Verstellbar/);
    assert.equal(await page.locator('#eq-sheet .eq-row input[data-id="eq_kb_paar"]').count(), 0, 'kein eigener Schalter für das Paar');
    await kbRow.getByRole('button', { name: 'Zwei', exact: true }).click();
    assert.ok((await page.evaluate(() => window.tpTest.state().orte[0].eq)).includes('eq_kb_paar'), 'Zwei = Paar am Ort');
    assert.ok((await page.evaluate(() => window.tpTest.fill())).kraft[3].some(x => x.n === 'Kettlebell Gorilla Row'), 'mit zwei Kettlebells rudert B die Gorilla Row');
    await page.locator('#eq-sheet .eq-row', { has: page.locator('input[data-id="eq_kettlebell"]') }).locator('label.check').first().click(); await page.waitForTimeout(500);
    assert.deepEqual((await page.evaluate(() => window.tpTest.state().orte[0].eq)).filter(x => /kb|kettle/.test(x)), [], 'Kettlebell aus nimmt Paar und verstellbar mit');
    await page.getByRole('button', { name: 'Fertig', exact: true }).click();
    console.log('PASS: Kettlebell eine oder zwei, verstellbar; verstellbar steigert über das Gewicht, zwei schalten Doppel-Übungen frei');

    // Schwerpunkt Kettlebell (Dennis, 24. Oktober): Plan & Challenges › Schwerpunkt, Kraftteil nimmt den Swing, Metcon mit Kettlebell, B endet mit Metcon.
    const spLogs = ['2026-09-28', '2026-09-30', '2026-10-02', '2026-10-05', '2026-10-07', '2026-10-09', '2026-10-12', '2026-10-14'].map((date, i) => {
      const tag = [1, 3, 6][i % 3];
      return { id: 'sp' + i, ts: Date.parse(date + 'T17:00:00Z'), date, durchgang: 4, tag, kind: 'kraft', pv: 2, name: 'Ganzkörper',
        kraft: tag === 3 ? [{ n: 'Deadlift', stage: 'Deadlift', goal: 5, reps: [5, 5, 5, 5], kg: [100, 100, 100, 100] }, { n: 'Glute Bridge', stage: 'Einbeinig', goal: 10, reps: [10, 10, 10, 10] }]
          : [{ n: 'Back Squat', stage: 'Back Squat', goal: 5, reps: [5, 5, 5, 5], kg: [80, 80, 80, 80] }] };
    });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign(kbSt('eq_kb_verstellbar'), { durchgang: 5, tag: 3, planWk: '2026-10-19' }), spLogs]);
    const ohne = await page.evaluate(() => window.tpTest.fill());
    assert.equal(ohne.kraft[3][2].n, 'Deadlift', 'ohne Schwerpunkt bleibt der Deadlift');
    await page.evaluate(() => window.tpTest.navigate('fokus'));
    await page.getByRole('group', { name: 'Schwerpunkt' }).getByRole('button', { name: 'Kettlebell', exact: true }).click();
    assert.equal(await page.evaluate(() => window.tpTest.state().schwerpunkt), 'kb');
    const mit = await page.evaluate(() => window.tpTest.fill());
    assert.equal(mit.kraft[3][2].n, 'Kettlebell Swing', 'Hüfte: Swing statt Deadlift (' + mit.kraft[3].map(x => x.n) + ')');
    assert.ok(mit.metcon[3].length >= 2 && mit.metcon[3].every(x => /Kettlebell|Dumbbell|High Pull|Swing|Clean|Snatch|Goblet|Thruster/.test(x.n)), 'Metcon mit Kettlebell (' + mit.metcon[3].map(x => x.n) + ')');
    assert.match(await page.evaluate(() => window.tpTest.coach(3)), /Kettlebell Swing statt Deadlift: dein Schwerpunkt ist Kettlebell\./);
    await page.evaluate(() => { const S = window.tpTest.state(); S.orte[0].eq = S.orte[0].eq.filter(x => !/kb|kettle/.test(x)); });
    assert.match(await page.evaluate(() => window.tpTest.coach(3)), /Hier gibt es keine Kettlebell/);
    await page.evaluate(() => window.tpTest.navigate('fokus'));
    assert.match(await page.locator('main').innerText(), /fehlt die Kettlebell, dort trainierst du wie sonst/);
    await page.getByRole('group', { name: 'Schwerpunkt' }).getByRole('button', { name: 'Keiner', exact: true }).click();
    assert.equal(await page.evaluate(() => window.tpTest.state().schwerpunkt), null);
    console.log('PASS: Schwerpunkt Kettlebell: Einstellung, Swing im Kraftteil, Kettlebell-Metcon, Hinweis ohne Kettlebell');

    // Leistung als Signal (Paket 58): zweimal hintereinander Vorgabe verfehlt → die nächste Einheit ist kürzer, mit Rückweg.
    await page.clock.setFixedTime(new Date('2026-10-14T10:00:00+02:00'));
    const kx = (id, date, tag, reps) => ({ id, ts: Date.parse(date + 'T17:00:00Z'), date, durchgang: 5, tag, kind: 'kraft', pv: 2, name: 'Ganzkörper',
      kraft: [{ n: 'Push-up', stage: 'Push-up', goal: 5, reps }, { n: 'Ring Row', stage: 'Ring Row', goal: 5, reps }] });
    const sigLogs = [kx('s1', '2026-09-28', 1, [5, 5, 5, 5]), kx('s2', '2026-09-30', 3, [5, 5, 5, 5]), kx('s3', '2026-10-09', 6, [5, 5, 3, 3]), kx('s4', '2026-10-12', 1, [5, 4, 3, 3])];
    const sigSt = Object.assign(old(), { planV: 2, tag: 3, umfang: { u: 4, ts: 0 }, planWk: '2026-10-12', planStart: { date: '2026-09-28', week: '2026-09-28', tag: 1, mode: 'week' }, tagSince: '2026-10-12', advBy: 'user' });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [sigSt, sigLogs]);
    assert.match(await page.locator('.h-sub').first().innerText(), /Heute kürzer: deine letzten zwei Einheiten/);
    const kr = async () => (await page.evaluate(() => window.tpTest.steps().find(s => s.id === 'kraft').sub));
    assert.match(await kr(), /^3 Runden/, 'gekürzt: Kraft 3 statt 4 Runden');
    await page.getByRole('button', { name: 'Heute anpassen', exact: true }).click();
    assert.ok(await page.getByText('Dein Coach hat heute gekürzt').isVisible());
    await page.locator('#sheet [data-act="sig-full"]').click();
    assert.match(await kr(), /^4 Runden/, 'Rückweg: volle Einheit');
    sigLogs[3] = kx('s4', '2026-10-12', 1, [5, 5, 5, 5]);
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [sigSt, sigLogs]);
    assert.match(await kr(), /^4 Runden/, 'eine Einheit ohne Signal setzt zurück');
    console.log('PASS: Leistung als Signal, nächste Einheit kürzer, Rückweg und Zurücksetzen');

    // Bereitschaft nur bei Anlass (Paket 59): ein Signal in der letzten Einheit, kurze Nacht zwischen Spät und Früh.
    const oneSig = [kx('s1', '2026-09-28', 1, [5, 5, 5, 5]), kx('s2', '2026-09-30', 3, [5, 5, 5, 5]), kx('s3', '2026-10-09', 6, [5, 5, 5, 5]), kx('s4', '2026-10-12', 1, [5, 4, 3, 3])];
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, sigSt, { morgen: {} }), oneSig]);
    assert.ok(await page.locator('.mg .chip', { hasText: 'Letzte Einheit schwer' }).isVisible(), 'ein Signal: Anlass am Guten Morgen');
    assert.match(await kr(), /^4 Runden/, 'ohne Antwort bleibt alles wie geplant');
    await page.locator('.mg [data-act="mg-f"][data-v="1"]').click();
    await page.locator('[data-act="mg-ok"]').click();
    assert.match(await kr(), /^3 Runden/, 'platt = Kurzversion');
    const shortN = Object.assign({}, sigSt, { morgen: {}, alltag: { on: true, schicht: true, bed: 22.5, wake: 6.5 }, arbeit: { '2026-10-12': [null, { k: 's', a: 14, b: 22 }, { k: 'f', a: 6, b: 14 }, null, null, null, null] } });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [shortN, sigLogs.slice(0, 2)]);
    const ch = page.locator('.mg .chip', { hasText: 'Kurze Nacht' });
    assert.ok(await page.evaluate(() => window.tpTest.plan().days[2].tag), 'Mittwoch bleibt ein Trainingstag (nach dem Frühdienst)');
    assert.ok(await ch.isVisible(), 'Spät auf Früh: der Coach fragt nach');
    assert.match(await page.locator('.mg-sub').innerText(), /Laut Plan waren etwa/);
    console.log('PASS: Guten Morgen mit Anlass: letzte Einheit schwer, kurze Nacht, platt kürzt');

    // Paket 61: Zeit unter Spannung. Unterwegs ohne Weste: Stufe darunter mit Tempo, fehlendes Muster mit Körpergewicht und Tempo, Taktgeber.
    const reise = Object.assign(v2s(), { ort: 'o2', sound: false, orte: [{ id: 'o1', k: 'zuhause', on: 1, zh: 1, lf: 1, fa: 1, eq: ['eq_zuhause', 'eq_weste', 'eq_klimmzug', 'eq_ringe'] }, { id: 'o2', k: 'reise', on: 1, zh: 1, lf: 1, fa: 1, eq: [] }] });
    const pist = (d, k) => ({ id: 'ps' + d, ts: 2e12 + d.length, date: d, durchgang: 4, tag: 6, kind: 'kraft', kraft: [k] });
    const wLogs = logs().concat([pist('2026-10-09', { n: 'Pistol Squat', stage: 'Weste', reps: [4, 4, 4, 4], goal: 4 })]);
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [reise, wLogs]);
    let tk = await page.evaluate(() => window.tpTest.kx(6));
    assert.deepEqual(tk[0], { n: 'Pistol Squat', stage: 'Frei', goal: 3, t: '3·1·1' }, 'eine Stufe darunter mit 3·1·1, Vorgabe unteres Ende');
    const ersatz = (await page.evaluate(() => window.tpTest.kx(1)))[0];
    assert.equal(ersatz.t, '4·1·1', 'ohne Gerät für Zug vertikal: Körpergewichtsübung mit 4·1·1, der Platz fällt nicht weg');
    assert.match(await page.locator('.h-sub').innerText(), new RegExp('Unterwegs ohne Gerät für Zug vertikal: ' + ersatz.n + ', dafür langsam \\(4 s runter\\)\\.'));
    // Mit Tempo alle Runden geschafft → 5·2·1, danach 1½ Wdh.; die eigentliche Stufe bleibt zu Hause „Weste“.
    const t1 = pist('2026-10-10', { n: 'Pistol Squat', stage: 'Frei', reps: [3, 3, 3, 3], goal: 3, tpo: { t: '3·1·1', lv: 0 } });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [reise, wLogs.concat([t1])]);
    assert.equal((await page.evaluate(() => window.tpTest.kx(6)))[0].t, '5·2·1');
    const t2 = pist('2026-10-11', { n: 'Pistol Squat', stage: 'Frei', reps: [3, 3, 3, 3], goal: 3, tpo: { t: '5·2·1', lv: 1 } });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [reise, wLogs.concat([t1, t2])]);
    assert.equal((await page.evaluate(() => window.tpTest.kx(6)))[0].t, '1½ Wdh.');
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, reise, { ort: 'o1' }), wLogs.concat([t1, t2])]);
    tk = await page.evaluate(() => window.tpTest.kx(6));
    assert.equal(tk[0].stage, 'Weste'); assert.ok(!tk[0].t, 'zu Hause wieder Weste ohne Tempo, Tempo-Einheiten ändern die Stufe nicht');
    // Im Trainer: Leiste Runter | Halten | Hoch, live mit Wdh.-Zähler, Ton abschaltbar.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [reise, wLogs]);
    await page.getByRole('button', { name: /Training starten/ }).click();
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().findIndex(s => s.id === 'kraft')));
    const bar = page.locator('#fs .tp3');
    assert.match(await bar.innerText(), /Tempo 4·1·1[\s\S]*Runter[\s\S]*4 s[\s\S]*Halten[\s\S]*1 s[\s\S]*Hoch[\s\S]*1 s/);
    const T0 = await page.evaluate(() => Date.now());
    await page.locator('#fs #fs-tg').click();
    await page.clock.setFixedTime(T0 + 15000); await page.waitForTimeout(450);
    assert.ok(await page.locator('#fs .tp3.live').isVisible(), 'läuft mit der Minute');
    assert.equal(await page.locator('#fs .tp2-b span.on').innerText().then(t => t.split('\n')[0]), 'Hoch', '5 s in der Minute: Wdh. 1, Hoch');
    assert.match(await page.locator('#fs .tp3-c').innerText(), /^Wdh\. 1 von 6$/);
    await page.clock.setFixedTime(T0 + 18000); await page.waitForTimeout(450);
    assert.match(await page.locator('#fs .tp3-c').innerText(), /^Wdh\. 2 von 6$/);
    assert.equal(await page.locator('#fs .tp2-b span.on').innerText().then(t => t.split('\n')[0]), 'Runter');
    await page.locator('#fs .tp3-m').click();
    assert.equal(await page.evaluate(() => window.tpTest.state().tpoCue), false, 'Ton und Vibration aus');
    assert.equal(await page.locator('#fs .tp3-m').getAttribute('aria-pressed'), 'false');
    await page.locator('#fs #fs-tg').click();
    await page.clock.setFixedTime(T0);
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().length - 1));
    await page.locator('#fs [data-act="save"]').click();
    await page.getByRole('button', { name: 'Nein, speichern', exact: true }).click();
    await page.locator('#sheet [data-rpe="6"]').click(); await page.locator('#rpe-ok').click();
    await page.waitForFunction(() => window.tpTest.logs().some(l => l.pv === 2 && l.date === '2026-10-14'), null, { timeout: 3000 });
    const tl = await page.evaluate(() => window.tpTest.logs().slice(-1)[0].kraft[0]);
    assert.deepEqual([tl.n, tl.goal, tl.tpo && tl.tpo.t], [ersatz.n, ersatz.goal, '4·1·1'], 'Tempo steht im Kraft-Eintrag');
    await page.locator('#moment').evaluate(e => e.remove()).catch(() => {});
    await page.evaluate(() => window.tpTest.navigate('einst'));
    assert.equal(await page.locator('input[data-change="tpoCue"]').count(), 1, 'Schalter in Einstellungen › Mehr');
    console.log('PASS: Zeit unter Spannung: Stufe darunter mit Tempo, Körpergewicht statt Wegfall, Steigerung 5·2·1 und 1½, Stufe bleibt, Taktgeber live und abschaltbar');

    // Paket 60: Ermüdung je Körperzone. Montag schwer für die Beine (Pistol, Split Squat, 40 Min Laufen, Härte 9), heute Mittwoch B.
    await page.clock.setFixedTime(new Date('2026-10-14T17:05:00+02:00'));
    const zst = Object.assign(old(), { planV: 2, tag: 1, umfang: { u: 4, ts: 0 }, planWk: '2026-10-12', planStart: { date: '2026-09-28', week: '2026-09-28', tag: 1, mode: 'week' } });
    const zk = (d, kr, x) => Object.assign({ id: 'z' + d, ts: new Date(d + 'T18:30:00+02:00').getTime(), date: d, durchgang: 4, tag: 1, kind: 'kraft', pv: 2, unit: 'A', rpe: 7, kraft: kr }, x || {});
    const zsq = { n: 'Pistol Squat', stage: 'Frei', reps: [4, 4, 4, 4], goal: 4 }, zpu = { n: 'Push-up', stage: 'Push-up', reps: [6, 6, 6, 6], goal: 6 };
    const zLogs = ['2026-09-29', '2026-10-02', '2026-10-06', '2026-10-09'].map(d => zk(d, [zsq, zpu])).concat([zk('2026-10-12', [zsq, { n: 'Bulgarian Split Squat', stage: 'Normal', reps: [6, 6, 6, 6], goal: 6 }, zpu], { rpe: 9, fin: { k: 'easy', dev: 'lauf', min: 40, done: true } })]);
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [zst, zLogs]);
    // Paket 62: der Planer legt B nicht auf den Tag mit müden Beinen, wenn ein anderer Tag passt.
    assert.equal(await page.evaluate(() => window.tpTest.plan().days.map(d => d.tag || '-').join('')), '----3-6', 'Mittwoch frei, B am Freitag, C am Sonntag');
    assert.match(await page.locator('.h-sub').first().innerText(), /^Beine noch müde von Montag: heute Erholung/);
    // Für den Rest: B per Verschieben fest auf Mittwoch.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, zst, { planOv: { '2026-10-14': { pin: 3 } } }), zLogs]);
    assert.match(await page.locator('.h-sub').innerText(), /^Beine noch müde von Montag: Nordic Curl heute 3 statt 4 Runden, Abschluss auf dem Ergometer, locker\. Erholung ansehen$/);
    await page.getByRole('button', { name: 'Erholung ansehen', exact: true }).click();
    const zc = page.locator('#zone-card');
    assert.ok(await zc.isVisible(), 'Tippen führt zur Karte Erholung in Deine Woche');
    assert.match(await zc.innerText(), /0\s*Beine\s*bis Fr[\s\S]*Zug\s*frisch[\s\S]*Beine: Pistol Squat und 40 Min Laufen am Montag, müde bis Freitag früh\./);
    await page.evaluate(() => window.tpTest.navigate('heute'));
    // Rückweg: Heute anpassen › Doch volle Runden.
    await page.getByRole('button', { name: 'Heute anpassen', exact: true }).click();
    assert.ok(await page.locator('#sheet .ad-sig', { hasText: 'Dein Coach hat heute gekürzt' }).isVisible());
    await page.getByRole('button', { name: 'Doch volle Runden', exact: true }).click();
    assert.ok(!(await page.locator('#view').innerText()).includes('Beine noch müde'), 'volle Runden: kein Satz mehr');
    await page.getByRole('button', { name: 'Heute anpassen', exact: true }).click();
    await page.getByRole('button', { name: 'Doch kürzen', exact: true }).click();
    // Training: Nordic Curl in Runde 4 frei, gespeichert ohne Wert, Abschluss auf dem Ergometer locker.
    await page.getByRole('button', { name: /Training starten/ }).click();
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().findIndex(s => s.id === 'kraft')));
    await page.locator('#fs [data-act="fs-view"][data-v="list"]').click();
    await page.locator('#fs .fs-krow[data-m="2"]').click();
    assert.match(await page.locator('#fs .co-card').innerText(), /Beine noch müde von Montag: Nordic Curl heute 3 statt 4 Runden[\s\S]*Vorgabe und Stufe bleiben\./);
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().length - 1));
    await page.locator('#fs [data-act="save"]').click();
    await page.getByRole('button', { name: 'Nein, speichern', exact: true }).click();
    await page.locator('#sheet [data-rpe="6"]').click(); await page.locator('#rpe-ok').click();
    await page.waitForFunction(() => window.tpTest.logs().some(l => l.date === '2026-10-14'), null, { timeout: 3000 });
    const zl = await page.evaluate(() => window.tpTest.logs().filter(l => l.date === '2026-10-14')[0]);
    const nc = zl.kraft.filter(k => k.n === 'Nordic Curl')[0];
    assert.deepEqual([nc.zcut, nc.reps.length, nc.reps[3]], ['beine', 4, null], 'Runde 4 frei');
    assert.ok(zl.kraft.filter(k => k.n !== 'Nordic Curl').every(k => k.reps.every(r => r != null)), 'die anderen Übungen volle Runden');
    assert.deepEqual([zl.fin.k, zl.fin.dev], ['easy', 'ergo']);
    await page.locator('#moment').evaluate(e => e.remove()).catch(() => {});
    console.log('PASS: Ermüdung je Körperzone: Satz auf Heute, Karte Erholung mit Ringen, Rückweg, freie Minute im EMOM, Abschluss ohne Laufen');

    // Paket 62: 2 bis 6 Trainingstage im Plan (Schieberegler). Ab 4 Tagen Split mit kurzem Kardio zum Schluss.
    await page.clock.setFixedTime(new Date('2026-10-12T17:05:00+02:00'));
    const tst = n => Object.assign(old(), { planV: 2, tage: n, tag: 1, umfang: { u: 4, ts: 0 }, planWk: '2026-10-12', planStart: { date: '2026-09-28', week: '2026-09-28', tag: 1, mode: 'week' }, planAsk: '2026-10-12' });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [tst(null), logs()]);
    await page.evaluate(() => window.tpTest.navigate('plan'));
    // Dennis: der Regler änderte sich aus Versehen. Jetzt Wert-Zeile → Blatt → „Übernehmen“; Abbrechen ändert nichts. Gilt für alle Wochen.
    const tgRow = page.locator('[data-act="tage-open"]');
    assert.match(await tgRow.innerText(), /Trainingstage[\s\S]*A, B und C\. Gilt für alle Wochen\.[\s\S]*3 pro Woche/);
    assert.equal(await page.locator('#view .tg-r').count(), 0, 'kein Regler direkt auf der Seite');
    await tgRow.click(); await page.locator('#sheet .tg-r').fill('6');
    await page.locator('#sheet [data-sh="x"]').click(); await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.tpTest.state().tage), null, 'Abbrechen ändert nichts');
    await tgRow.click(); await page.locator('#sheet [data-seg="5"]').click();
    assert.match(await page.locator('#tg-x').innerText(), /^Push, Pull, Beine, Oberkörper, Unterkörper, mit kurzem Kardio\./, 'Regler mit kurzer Info');
    assert.match(await page.locator('#sheet').innerText(), /alle folgenden Wochen/);
    await page.locator('#sheet [data-sh="ok"]').click(); await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.tpTest.state().tage), 5);
    await page.locator('#view [aria-label="Nächste Woche"]').first().click();
    assert.match(await page.locator('[data-act="tage-open"]').innerText(), /5 pro Woche/, 'nächste Woche ebenfalls 5');
    assert.equal(await page.locator('#view .pw .wkst .wd .wd-u').allInnerTexts().then(x => x.filter(t => t !== 'Frei').length), 5, 'nächste Woche mit 5 Einheiten');
    await page.locator('#view [aria-label="Woche davor"]').first().click();
    assert.ok(await page.getByRole('heading', { name: '0 von 5 erledigt' }).isVisible(), 'Wochenziel zählt bis 5');
    assert.equal(await page.evaluate(() => window.tpTest.plan().days.map(d => d.tag || '-').join('')), '1-345-6', 'Mo Push, Mi Pull, Do Beine, Fr Ober, So Unter');
    await page.evaluate(() => window.tpTest.navigate('heute'));
    assert.ok(await page.getByRole('heading', { name: 'Push', level: 1 }).isVisible(), 'heute Push');
    assert.equal(await page.locator('.wkst .wd.u .wd-u').allInnerTexts().then(x => x.join(' ')), 'Pu Pl Be O U');
    const sf = await page.evaluate(() => window.tpTest.fill());
    assert.deepEqual([sf.kraft[1].length, sf.kraft[3].length, sf.kraft[4].length, sf.kraft[5].length, sf.kraft[6].length], [3, 3, 3, 4, 4], 'Push, Pull, Beine je 3, Ober und Unter je 4 Übungen');
    const st5 = await page.evaluate(() => window.tpTest.steps().map(s => [s.id, s.dur]));
    const lastS = st5[st5.length - 1];
    assert.ok(['fin', 'metcon'].includes(lastS[0]) && lastS[1] <= 12, 'kurzes Kardio bzw. Metcon zum Schluss (höchstens 12 Min)');
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [tst(2), logs()]);
    const f2 = await page.evaluate(() => window.tpTest.fill());
    assert.deepEqual([f2.kraft[1].length, f2.kraft[3].length, !!f2.kraft[6]], [4, 4, false], '2 Tage: A und B je mit einer vierten Übung, kein C');
    console.log('PASS: 2 bis 6 Trainingstage: Schieberegler im Plan, Wochenziel, Split ab 4 Tagen mit kurzem Kardio, 2 Tage mit vierter Übung');

    // Paket 63: Blöcke. Aufbau (1–3), Kraft (5–7), Spitze (9–11); mit Lauf-Challenge Erhalt. Abschnitt klein im Kopf von Heute.
    await page.clock.setFixedTime(new Date('2026-10-12T17:05:00+02:00'));
    const bst = (dg, x) => Object.assign(old(), { durchgang: dg, planV: 2, tag: 1, umfang: { u: 4, ts: 0 }, planWk: '2026-10-12', planStart: { date: '2026-09-28', week: '2026-09-28', tag: 1, mode: 'week' }, planAsk: '2026-10-12' }, x || {});
    const blkOf = async (dg, x) => { await page.evaluate(a => window.tpTest.set(a[0], a[1]), [bst(dg, x), logs()]); return { k: await page.locator('.kicker').first().innerText(), st: await page.evaluate(() => window.tpTest.steps().map(s => [s.id, s.dur, s.title])) }; };
    const b2 = await blkOf(2), b10 = await blkOf(10), bE = await blkOf(10, { challenge: { id: 'k10', date: '2027-02-14', start: '2026-09-28', dg: 1 } });
    assert.match(b2.k, / · Aufbau$/); assert.match(b10.k, / · Spitze$/); assert.match(bE.k, / · Erhalt$/, 'Lauf-Challenge: Kraft im Erhalt');
    const krD = b => b.st.filter(s => s[0] === 'kraft')[0][1];
    assert.ok(krD(b10) < krD(b2), 'Spitze: eine Runde weniger');
    assert.match(b10.st.filter(s => s[0] === 'fin')[0][2], /Intervalle/, 'Spitze: Kardio kurz und intensiv');
    console.log('PASS: Blöcke: Aufbau, Spitze mit einer Runde weniger und Intervallen, Erhalt mit Lauf-Challenge, Abschnitt im Kopf');

    // Zuhause ohne Gewichte (Dennis): kein Thruster im Kraftteil (Metcon-Leiter, Prüfung 21. Oktober; vorher Sackgasse „Air Squat“); mit Bändern Band Squat.
    for (const band of [false, true]) {
      const hb = Object.assign(old(), { planV: 2, durchgang: 6, tag: 1, umfang: { u: 4, ts: 0 }, planWk: '2026-10-12', planStart: { date: '2026-09-28', week: '2026-09-28', tag: 1, mode: 'week' }, planAsk: '2026-10-12',
        picks: { 'o1:1:3': 'g_thruster' }, orte: [{ id: 'o1', k: 'zuhause', on: true, eq: ['eq_zuhause', 'eq_ringe'].concat(band ? ['eq_band'] : []) }], ort: 'o1' });
      await page.evaluate(a => window.tpTest.set(a[0], a[1]), [hb, []]);
      const hf = await page.evaluate(() => { const f = window.tpTest.fill(); return { k: f.kraft[1].map(x => x.n), neu: f.neu[1] }; });
      assert.equal(hf.k[2], band ? 'Band Squat' : 'Air Squat', 'Kniebeuge zuhause: ' + (band ? 'Band Squat' : 'Air Squat') + ' statt Thruster');
      assert.equal(hf.neu[0].why, 'metcon', 'Thruster ist eine Metcon-Leiter und kommt nicht in den Kraftteil');
    }
    console.log('PASS: Zuhause ohne Gewichte: kein Thruster als Sackgasse, mit Bändern Band Squat');

    // Muskeln in der Bibliothek (Dennis, B2, Stil S3): ganzer Körper, Antippen wählt nur aus, Wischen nicht, erst „Öffnen“ zeigt die Seite.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign(old(), { planV: 2, tag: 1, orte: [{ id: 'o1', k: 'zuhause', on: true, eq: ['eq_zuhause', 'eq_ringe', 'eq_band'] }], ort: 'o1' }), logs()]);
    // Eigene Seite unter Tools (kein Umschalter in der Bibliothek); auch mit großer Schrift steht der ganze Körper über der Reiterleiste.
    assert.equal(await page.evaluate(() => { window.tpTest.navigate('uebungen'); return document.querySelectorAll('[data-act="lib-view"]').length; }), 0);
    for (const ts of ['l', 'm']) {
      await page.evaluate(t => { document.documentElement.dataset.text = t; window.tpTest.navigate('muskeln'); }, ts);
      await page.waitForTimeout(100);
      const f0 = await page.locator('.mfig svg').boundingBox(), tb = await page.locator('.tabbar').boundingBox();
      assert.ok(f0.y >= 0 && f0.y + f0.height <= tb.y, 'ganzer Körper über der Reiterleiste (Schrift ' + ts + ')');
    }
    const fig = await page.locator('.mfig svg').boundingBox();
    // Seite heißt „Körper“; Figur bis zu den Füßen (viewBox 480, Fuß-Flächen), angedeutet räumlich (Verlauf darüber, fängt keine Taps).
    assert.equal(await page.locator('.hero h1').innerText(), 'Körper');
    assert.equal(await page.evaluate(() => document.querySelector('.mfig svg').getAttribute('viewBox')), '0 0 200 480');
    assert.ok(await page.evaluate(() => { var s = document.querySelector('.mfig svg'), b = [...s.querySelectorAll('path.sil')].map(p => p.getBBox()); return Math.max(...b.map(x => x.y + x.height)) > 470; }), 'Füße unten');
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.mfig .sh')).pointerEvents), 'none');
    await page.mouse.move(fig.x + fig.width * 0.4, fig.y + fig.height * 0.27); await page.mouse.down(); await page.mouse.move(fig.x + fig.width * 0.4, fig.y + fig.height * 0.27 + 40, { steps: 4 }); await page.mouse.up();
    assert.equal(await page.locator('.mus-sel').count(), 0, 'Wischen über die Figur wählt nichts aus');
    await page.mouse.click(fig.x + fig.width * 0.4, fig.y + fig.height * 0.27);
    assert.match(await page.locator('.mus-sel').innerText(), /Brust[\s\S]*Übungen hier[\s\S]*Öffnen/, 'Antippen wählt die Brust aus');
    assert.equal(await page.evaluate(() => document.querySelectorAll('.mfig path.mu.p1').length), 2, 'Brust blau (beide Seiten)');
    assert.ok(await page.evaluate(() => document.querySelectorAll('.mfig path.mu.p2').length) > 0, 'oft mitarbeitende hell');
    assert.equal(await page.locator('#view .mfig').count(), 1, 'noch keine Muskel-Seite');
    await page.getByRole('button', { name: 'Öffnen', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Brust', level: 2 }).isVisible());
    assert.ok(await page.getByRole('heading', { name: /^Trainiert sie vor allem/ }).isVisible());
    const nOrt = await page.locator('#view .ft-row').count();
    await page.getByRole('button', { name: 'Alle', exact: true }).click();
    assert.ok(await page.locator('#view .ft-row').count() > nOrt, 'Alle zeigt mehr Übungen');
    await page.locator('#view .ft-row').first().click();
    assert.ok(await page.locator('#sheet .ue-info').isVisible(), '(i) öffnet die Anleitung');
    assert.ok(await page.locator('#sheet .mus-ic').count() > 0, '(i) zeigt die Hauptmuskeln als Bild'); await page.locator('#sheet [data-sh]').first().click(); await page.waitForTimeout(300);
    console.log('PASS: Körper unter Tools: ganzer Körper mit Füßen, Antippen wählt aus, Wischen nicht, Öffnen zeigt Übungen je Ort und alle');

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
