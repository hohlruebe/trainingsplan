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
window.tpTest = { state: () => S, logs: () => LOGS, plan: wkPlanC, fill: () => { FILL.k = null; return planFill(); }, coach: t => coachItems(t).map(x => x.h.replace(/<[^>]+>/g, '')).join(' | '), steps: () => stepsOf(dayCtx(S.tag)), go: to => ACT.step({ dataset: { to: String(to) } }),
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
    // Vor dem Start: „Heute zum ersten Mal“ mit (i) für Übungen und Stufen, die es noch nie gab.
    assert.ok(await page.getByRole('heading', { name: 'Heute zum ersten Mal' }).isVisible());
    await page.getByRole('button', { name: /Training starten/ }).click();
    // Training immer im Vollbild: Schritt, Einzeln | Liste, (i) mit „So geht’s“, unten weiter.
    assert.ok(await page.locator('#fs .fs-tr').isVisible(), 'Training startet im Vollbild');
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^Aufwärmen · 1 von \d$/);
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
    await page.waitForFunction(() => window.tpTest.logs().length > 0, null, { timeout: 3000 });
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
    let bridge = { app: 'trainingsplan-kalender', v: 2, ts: Date.now(), von: t('2026-10-05', 0), bis: t('2026-11-03', 0),
      k: [{ id: 'haupt0000001', n: 'Dennis', f: '#4986E7', e: true, s: true, p: true }, { id: 'familie00001', n: 'Familie', f: '#F691B2', e: false, s: true }],
      w: [{ c: 0, k: 'n', a: t('2026-10-13', 22), b: t('2026-10-14', 6) }, { c: 0, k: 'n', a: t('2026-10-14', 22), b: t('2026-10-15', 6) }, { c: 0, k: 'f', a: t('2026-10-16', 6), b: t('2026-10-16', 14) }],
      b: [{ c: 0, a: t('2026-10-17', 10), b: t('2026-10-17', 13) }, { c: 1, a: t('2026-10-18', 9), b: t('2026-10-18', 21) }] };
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
    await page.getByRole('heading', { name: 'Deine Dienste' }).waitFor();
    assert.ok(await page.getByText('aus dem Kalender').isVisible());
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
    await page.getByRole('heading', { name: 'Deine Dienste' }).waitFor();
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
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [sigSt, oneSig]);
    assert.ok(await page.locator('.pn-ask .chip', { hasText: 'Letzte Einheit schwer' }).isVisible(), 'ein Signal: der Coach fragt nach');
    assert.match(await kr(), /^4 Runden/, 'ohne Antwort bleibt alles wie geplant');
    await page.locator('.pn-ask [data-act="bef"][data-v="tired"]').click();
    assert.match(await kr(), /^3 Runden/, 'Müde = Kurzversion');
    const shortN = Object.assign({}, sigSt, { alltag: { on: true, schicht: true, bed: 22.5, wake: 6.5 }, arbeit: { '2026-10-12': [null, { k: 's', a: 14, b: 22 }, { k: 'f', a: 6, b: 14 }, null, null, null, null] } });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [shortN, sigLogs.slice(0, 2)]);
    const ch = page.locator('.pn-ask .chip', { hasText: 'Kurze Nacht' });
    assert.ok(await page.evaluate(() => window.tpTest.plan().days[2].tag), 'Mittwoch bleibt ein Trainingstag (nach dem Frühdienst)');
    assert.ok(await ch.isVisible(), 'Spät auf Früh: der Coach fragt nach');
    assert.match(await page.locator('.pn-ask').innerText(), /Gestern Arbeit bis 22:00, heute ab 6:00: nur 8 Stunden dazwischen/);
    console.log('PASS: Bereitschaft bei Anlass: letzte Einheit schwer, kurze Nacht, Müde kürzt');

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
