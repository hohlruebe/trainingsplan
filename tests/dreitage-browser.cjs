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
window.tpTest = { ev: f => eval('(' + f + ')()'), grn: () => { var a0 = TM.acc; TM.acc = 15; var o = []; for (var q = 0; q < 4; q++) { fsPaint(undefined, true); o.push(document.getElementById('fs-ring').classList.contains('grn')); } TM.acc = a0; fsPaint(undefined, true); return o.join(','); }, know: i => stgKnow(DAYS[S.tag].kraft[i]), kx: t => DAYS[t].kraft.map((x, i) => { var E = kraftEx(t, dr(t), kraftRounds(t), x, i); return { n: x.n, stage: E.stage, goal: E.goal, t: E.tpo && E.tpo.t }; }), state: () => S, logs: () => LOGS, plan: wkPlanC, fill: () => { FILL.k = null; return planFill(); }, coach: t => coachItems(t).map(x => x.h.replace(/<[^>]+>/g, '')).join(' | '), steps: () => stepsOf(dayCtx(S.tag)), go: to => ACT.step({ dataset: { to: String(to), force: '1' } }),
  notice: () => { MOMENTS = []; var o = document.getElementById('moment'); if (o) o.remove(); chainNotice(); o = document.getElementById('moment'); return o ? o.innerText : ''; },
  saveNow: () => { saveDay(); var M = document.getElementById('moment'); if (M) M.remove(); MOMENTS = []; return LOGS[LOGS.length - 1]; },
  finishTimer: () => finish(),
  draft: (k, v) => { setDraft(k, v); render(); },
  tagWarm: t => warmFlow(t).items.map(x => x.n).join(','), phases: () => TM.phases.map(p => ({ l: p.label, d: p.dur, m: p.m, z: !!p.zr })), tmSet: (t, run) => { TM.acc = t; TM.running = !!run; if (run) TM.t0 = Date.now(); fsPaint(undefined, true); }, tmStop: () => { timerStop(); },
  stepId: () => { var T = trainCtx(); return T ? T.s.id : null; },
  goStep: id => { var i = stepsOf(dayCtx(S.tag)).findIndex(s => s.id === id); setDraft('_step', i); setDraft('_at', Date.now()); render(); return i; },
  chain: () => { var C = chainState(); return { n: C.n, st: C.weeks.map(w => w.st), need: chainNeed(), risk: chainRisk(), bank: C.bank, pend: C.pend, jk: S.chainJk }; },
  navigate: (tab) => { ui.tab = tab; ui.viewTag = null; ui.wkSel = null; ui.wkMon = null; render(); },
  profile: (v) => { ui.pview = v; ui.tab = 'profil'; render(); },
  set: (s, logs) => { S = Object.assign({}, DEF, { tourSeen: 1 }, s); if (!('morgen' in s)) { S.morgen = {}; for (var q = 0; q < 120; q++) S.morgen[isoAdd('2026-09-01', q)] = { h: 8, f: 4, ts: 1 }; } // Guten Morgen gilt im Test als beantwortet
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
    // Vor dem Start: neue Übungen stehen als „Neu“ am Kraftschritt (Impeccable-Kritik 24. Oktober), keine eigene Karte mehr.
    assert.match(await page.locator('.tl-card .tl-neu').first().getAttribute('aria-label'), /neu|ansehen/); // Design-Regeln: kleiner Chip „3 neu ›“
    // Vorschau eines Schritts (2. November): gedrückt halten zeigt die Übungen, loslassen schließt; mit der Maus beim Darüberfahren.
    await page.evaluate(() => window.scrollTo(0, 0));
    const pvTouch = async (id, ms) => page.evaluate(a => new Promise(r => { const li = document.querySelector('li[data-pv="' + a[0] + '"]'), b = li.getBoundingClientRect(), o = { bubbles: true, pointerType: 'touch', clientX: b.left + 40, clientY: b.top + 10 };
      li.dispatchEvent(new PointerEvent('pointerdown', o)); setTimeout(() => { const p = document.querySelector('.pv-pop'); r(p ? p.innerText : ''); }, a[1]); }), [id, ms]);
    assert.equal(await pvTouch('kraft', 100), '', 'kurzes Tippen zeigt noch nichts');
    await page.evaluate(() => document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch' })));
    const pvK = await pvTouch('kraft', 450);
    assert.ok(/Kraft · EMOM/.test(pvK) && /Stufe \d/.test(pvK) && / × \d/.test(pvK), 'Vorschau Kraft mit Stufe und Menge: ' + pvK);
    assert.ok(await page.locator('.pv-pop .mini-fig').count() >= 1, 'mit Figur');
    const pvPos = await page.evaluate(() => { const li = document.querySelector('li[data-pv="kraft"]').getBoundingClientRect(), p = document.querySelector('.pv-pop').getBoundingClientRect(); return [p.top, p.bottom, li.top + 10, innerHeight]; });
    assert.ok(pvPos[0] >= 0 && pvPos[1] <= pvPos[3] && (Math.abs((pvPos[0] + pvPos[1]) / 2 - pvPos[2]) < 2 || pvPos[0] <= 13 || pvPos[1] >= pvPos[3] - 13), 'Vorschau mittig zum Finger und ganz sichtbar: ' + pvPos);
    if (process.env.TP_SHOT) await page.screenshot({ path: process.env.TP_SHOT + '/pv-kraft.png' });
    await page.evaluate(() => document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch' })));
    assert.equal(await page.locator('.pv-pop').count(), 0, 'loslassen schließt');
    assert.ok(/Aufwärmen[\s\S]*Ergometer/.test(await pvTouch('warm', 450)), 'Vorschau Aufwärmen');
    if (process.env.TP_SHOT) await page.screenshot({ path: process.env.TP_SHOT + '/pv-warm.png' });
    await page.evaluate(() => document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch' })));
    assert.ok(/W/.test(await pvTouch('fin', 450)), 'Vorschau Abschluss');
    assert.ok(await page.evaluate(() => { const p = document.querySelector('.pv-pop').getBoundingClientRect(); return p.top >= 0 && p.bottom <= innerHeight; }), 'auch weiter unten ganz sichtbar');
    await page.evaluate(() => document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch' })));
    await page.hover('li[data-pv="warm"]'); await page.waitForTimeout(250);
    assert.ok(await page.locator('.pv-pop.open').isVisible(), 'Maus darüber zeigt die Vorschau');
    await page.mouse.move(5, 5); await page.waitForTimeout(100);
    assert.equal(await page.locator('.pv-pop').count(), 0, 'Maus weg schließt');
    // Andere Tage dieser Woche (Dennis, 5. November): die Vorschau der Einheit hat dieselbe Vorschau je Schritt.
    {
      const other = await page.evaluate(() => { const t = document.querySelector('.wkst [aria-current]'); return [...document.querySelectorAll('.wkst [data-act="wk-sel"]')].filter(b => b !== t && !b.disabled && /^(A|B|C)$/.test((b.innerText.split('\n').pop() || '').trim())).map(b => b.dataset.d)[0] || null; });
      assert.ok(other, 'ein anderer geplanter Tag in der Woche');
      await page.locator('.wkst [data-act="wk-sel"][data-d="' + other + '"]').click(); await page.waitForTimeout(200);
      assert.ok(await page.locator('li[data-pv="kraft"][data-dg]').count() === 1, 'Schritte des anderen Tages mit Vorschau');
      const pvO = await pvTouch('kraft', 450);
      assert.ok(/Kraft/.test(pvO) && /Stufe \d/.test(pvO), 'Vorschau am anderen Tag: ' + pvO);
      await page.evaluate(() => document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch' })));
      await page.getByRole('button', { name: 'Zurück zu heute' }).click(); await page.waitForTimeout(150);
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    const goY = (await page.getByRole('button', { name: /Training starten/ }).boundingBox()).y;
    assert.ok(goY + 56 < 844, 'Training starten im ersten Bildschirm (' + goY + ')');
    await page.getByRole('button', { name: /Training starten/ }).click();
    // Training immer im Vollbild: Schritt, Einzeln | Liste, (i) mit „So geht’s“, unten weiter.
    assert.ok(await page.locator('#fs .fs-tr').isVisible(), 'Training startet im Vollbild');
    // Körper-Check vor dem Start: Muskel antippen = Kater, nochmal = Schmerz; Schmerz ersetzt die belastende Übung.
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^1\/\d · Körper-Check$/);
    await page.locator('#fs .kc [data-act="kc"][data-m="brust"]').first().click();
    assert.ok(await page.locator('#fs .kc-r', { hasText: 'Brust' }).locator('.kc-k').isVisible(), 'einmal = Muskelkater');
    await page.locator('#fs .kc [data-act="kc"][data-m="brust"]').first().click();
    await page.locator('#fs [data-act="kc-w"][data-m="brust"][data-v="s"]').click();
    const kc = await page.evaluate(() => { const d = window.tpTest.state(); return Object.values(JSON.parse(localStorage.getItem('tp.drafts')))[0]; });
    assert.equal(kc._kc, 'brust:s:s'); assert.ok(/m:brust:s/.test(Object.keys(kc).filter(k => /^_pk/.test(k)).map(k => kc[k]).join(',')), 'Schmerz wirkt auf eine Übung mit Brust');
    await page.locator('#fs .kc [data-act="kc"][data-m="brust"]').first().click();
    assert.equal(await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem('tp.drafts')))[0]._kc || ''), '', 'dreimal = wieder gut');
    // Dennis, 2. November: Weiter und Zurück im Trainer nur mit langem Druck und Nachfrage.
    const fsHold = async (sel, ok) => { const bb = await page.locator(sel).boundingBox(); await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.mouse.down(); await page.waitForTimeout(850); await page.mouse.up(); await page.locator('#sheet [data-c="' + (ok === false ? 'stay' : 'go') + '"]').click(); await page.waitForTimeout(200); };
    // Dennis, 6. November: „Keine Beschwerden“ geht direkt weiter, der Körper-Check sperrt Weiter nicht.
    await page.locator('#fs .kc-ok').click();
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^2\/\d · Aufwärmen$/, 'Keine Beschwerden = weiter');
    await page.locator('#fs .fs-nav .btn.primary').click();
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^2\/\d · /, 'ein Tippen auf Weiter bleibt, solange der Schritt nicht fertig ist');
    await fsHold('#fs .fs-nav .fs-back');
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^1\/\d · Körper-Check$/, 'lange drücken und bestätigen geht zurück');
    await page.locator('#fs .fs-nav .btn.primary').click();
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^2\/\d · Aufwärmen$/, 'am Körper-Check ist Weiter frei');
    await page.locator('#fs .fs-nav .fs-back').click();
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^2\/\d · /, 'Zurück nicht mit einem Tippen');
    await fsHold('#fs .fs-nav .fs-back', false);
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^2\/\d · /, 'Hier bleiben');

    assert.equal(await page.locator('#fs .fs-seg').count(), 0, 'kein Einzeln | Liste mehr unter dem Ring (Dennis, 28. Oktober)');
    await page.locator('#fs .fs-top [data-act="fs-view"][data-v="list"]').click();
    assert.equal(await page.evaluate(() => window.tpTest.state().fsView), 'list', 'die Ansicht merkt sich die App');
    assert.ok(await page.locator('#fs .fs-rows .fs-row').count() >= 3, 'Liste wie ein Whiteboard');
    assert.equal(await page.locator('#fs .fs-rows [data-act="fl-done"]').count(), 0, 'Liste ohne eigenen Erledigt-Knopf');
    // Dennis, 30. Oktober: Antippen der Zeile hakt ab, nochmal nimmt es zurück; das (i) öffnet nur die Anleitung.
    await page.locator('#fs .fs-rows .fs-row.tap').nth(1).click();
    assert.equal(await page.locator('#fs .fs-rows .fs-row.done').count(), 1, 'Zeile antippen = abgehakt');
    await page.locator('#fs .fs-rows .fs-row.tap').nth(1).click();
    assert.equal(await page.locator('#fs .fs-rows .fs-row.done').count(), 0, 'nochmal = zurück');
    await page.locator('#fs .fs-rows .fs-row .fs-i').first().click();
    assert.ok(await page.locator('#sheet').isVisible(), '(i) öffnet die Anleitung');
    assert.equal(await page.locator('#fs .fs-rows .fs-row.done').count(), 0, '(i) hakt nichts ab');
    await page.getByRole('button', { name: 'Fertig', exact: true }).click();
    await fsHold('#fs .fs-nav .btn.primary');
    await page.reload();
    assert.ok(await page.locator('#fs .fs-tr .st-prog').isVisible(), 'nach dem Neuladen geht es beim Schritt im Vollbild weiter');
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().findIndex(s => s.id === 'kraft')));
    await page.locator('#fs .fs-side .fs-i').first().click();
    assert.ok(await page.locator('#sheet .ue-how ol.how li').count() >= 2, '(i) zeigt die genaue Durchführung');
    await page.getByRole('button', { name: 'Fertig', exact: true }).click();
    await page.locator('#fs [data-act="fs-view"][data-v="one"]').click();
    // Impeccable-Kritik 25. Oktober: Zähler bleibt auf seiner Minute, „Weiter“ erst nach der Uhr, Schmerzen-Knopf im Trainer.
    const lbl0 = await page.locator('#fs .fs-side .fs-lbl').first().innerText();
    await page.locator('#fs [data-act="k-rep"][data-d^="-"]').first().click();
    await page.locator('#fs [data-act="k-rep"][data-d^="-"]').first().click();
    assert.equal(await page.locator('#fs .fs-side .fs-lbl').first().innerText(), lbl0, 'zweimal „–“ bleibt auf derselben Minute');
    assert.ok(await page.locator('#fs .fs-top [data-act="pain-s"]').isVisible(), 'roter Schmerzen-Knopf im Kopf des Trainers');
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^\d\/\d · /, 'Kopf zeigt „x/n“ zuerst');
    // Figur drehen (Dennis, 1. November): Ziehen im Trainer dreht sie, die Ansicht bleibt je Übung gemerkt, Doppeltippen setzt zurück.
    const fg = page.locator('#fs .fig[data-fig]:not([data-fig="_wave"])').first();
    assert.ok(await fg.count(), 'Figur im Trainer');
    {
      const fkey = await fg.getAttribute('data-fig'), bb = await fg.boundingBox();
      await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.mouse.down();
      await page.mouse.move(bb.x + bb.width / 2 + 60, bb.y + bb.height / 2 + 20, { steps: 6 });
      assert.match(await fg.getAttribute('data-rot'), /°/, 'beim Ziehen steht die Gradzahl in der Figur');
      await page.mouse.up(); await page.waitForTimeout(150);
      const cam = await page.evaluate(k => (window.tpTest.state().figCam || {})[k], fkey);
      assert.ok(cam && typeof cam.yaw === 'number' && cam.tilt > 0, 'Ansicht gemerkt: ' + JSON.stringify(cam));
      assert.equal(await page.locator('#fs .fig[data-fig="' + fkey + '"] svg').count(), 1, 'Figur läuft weiter');
      await fg.dblclick(); await page.waitForTimeout(150);
      assert.ok(!(await page.evaluate(k => (window.tpTest.state().figCam || {})[k], fkey)), 'Doppeltippen setzt zurück');
    }
    // Stufe im Training (Dennis, 28. Oktober): Coach-Stufe und bis zu zwei darunter/darüber, nur für heute.
    await page.locator('#fs .fs-side .fs-stg[data-act="k-stg"]').first().click();
    // Dennis, 1. November: Auswahlrad, schwerere oben, die des Coachs („heute“) in der Mitte, leichtere unten.
    // Ein Rad: oben die Stufen nach Wissensstand (stgKnow: sicher ±1, mittel ±2, neu alle Stufen am Ort), dann „— Andere Übung —“ und die anderen Übungen.
    const allT = await page.locator('#sheet .wi').allInnerTexts(), sepI = allT.findIndex(t => /Andere Übung/.test(t)), stgN = sepI < 0 ? allT.length : sepI;
    const kn = await page.evaluate(() => window.tpTest.know(0));
    assert.ok(stgN >= 2 && stgN <= (kn === 'sicher' ? 3 : kn === 'mittel' ? 5 : 99), 'Stufen nach Wissensstand ' + kn + ' (' + stgN + ')');
    assert.ok((await page.locator('#sheet .sh-note').innerText()).length > 10, 'Satz unter dem Rad');
    assert.ok(sepI > 0 && allT.length > sepI + 1, 'unter den Stufen die anderen Übungen');
    assert.equal(await page.locator('#sheet [data-sg]').count(), 0, 'kein Umschalter mehr');
    assert.equal(await page.locator('#sheet .wi', { hasText: '· heute' }).count(), 1);
    const wiT = (await page.locator('#sheet .wi').allInnerTexts()).slice(0, stgN), hi = wiT.findIndex(t => /· heute/.test(t));
    assert.ok(wiT.slice(0, hi).every(t => /schwerer/.test(t)) && wiT.slice(hi + 1).every(t => /leichter/.test(t)), 'schwerer oben, leichter unten: ' + wiT.join(' | '));
    const oi = hi > 0 ? hi - 1 : hi + 1, stgTxt = wiT[oi].replace(/ · (schwerer|leichter)$/, '').replace(/^\s+/, '');
    await page.locator('#sheet .wi').nth(oi).click(); await page.waitForTimeout(700); await page.locator('#sheet [data-sh="ok"]').click();
    assert.ok((await page.locator('#fs .fs-side .fs-stg[data-act="k-stg"]').first().innerText()).includes(stgTxt), 'gewählte Stufe steht in der Karte');
    await page.locator('#fs .fs-side .fs-stg[data-act="k-stg"]').first().click();
    await page.locator('#sheet .wi', { hasText: '· heute' }).click(); await page.waitForTimeout(700); await page.locator('#sheet [data-sh="ok"]').click();
    await page.locator('#fs #fs-ring').click();
    await page.waitForTimeout(300);
    assert.match(await page.locator('#fs-nav').getAttribute('class'), /lock/, 'Tippen auf die Kapsel startet die Uhr, Weiter gesperrt');
    assert.doesNotMatch(await page.locator('#fs-pl').innerText(), /^noch /, 'keine zweite Restzeit neben der Uhr');
    // Dennis, 6. November (Video): die Kapsel flackerte in der EMOM-Minute zwischen Blau und Grün (toggle mit undefined).
    const grn = await page.evaluate(() => window.tpTest.grn());
    assert.equal(grn, 'false,false,false,false', 'Kapsel bleibt in der Arbeitsminute blau');
    const kk = await page.locator('#fs .fs-kick').innerText();
    await page.locator('#fs .fs-nav [data-act="step"]').last().click();
    assert.equal(await page.locator('#fs .fs-kick').innerText(), kk, 'ein Tippen auf Weiter bleibt beim laufenden EMOM');
    await page.locator('#fs #fs-ring').click();
    await page.waitForTimeout(300);
    assert.match(await page.locator('#fs-nav').getAttribute('class'), /lock/, 'angehalten bleibt Weiter gesperrt, bis der Schritt fertig ist');
    await page.evaluate(() => window.tpTest.finishTimer()); await page.waitForTimeout(200);
    assert.doesNotMatch(await page.locator('#fs-nav').getAttribute('class'), /lock/, 'nach der Uhr ist Weiter frei');
    await page.evaluate(() => { const o = JSON.parse(localStorage.getItem('tp.drafts')); for (const k in o) for (const f in o[k]) if (/^k\dr\d$/.test(f)) delete o[k][f]; localStorage.setItem('tp.drafts', JSON.stringify(o)); });
    await page.reload();
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().length - 1));
    assert.match(await page.locator('#fs .fs-kick').innerText(), /^\d\/\d · Kardio locker/);
    await page.locator('#fs [data-act="save"]').click();
    // Impeccable-Kritik 25. Oktober: ist die Uhr des letzten Schritts nie gelaufen, fragt der Trainer erst nach.
    assert.match(await page.locator('#sheet').innerText(), /Kardio locker noch nicht gemacht/);
    await page.getByRole('button', { name: 'Trotzdem speichern', exact: true }).click();
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
    // Belastung und Erholung als eine Zeile: ohne Signal zu, auf Tippen auf (Impeccable-Kritik Plan, 26. Oktober).
    // Schritt 5 (Dennis, 6. November): jede Zeile der Wochen-Liste öffnet ein Blatt von unten wie „In den Kalender“.
    const ldz = page.locator('[data-act="psh"][data-k="body"]');
    // Nach dem Training ist eine Zone müde: die Zeile sagt welche.
    assert.equal(await ldz.getAttribute('data-sig'), '1', 'Zeile mit Signal');
    assert.match(await ldz.innerText(), /Belastung und Erholung[\s\S]*müde/);
    await ldz.click(); await page.waitForTimeout(300);
    assert.ok(await page.locator('#sheet .psh').isVisible(), 'Blatt von unten');
    assert.ok(await page.getByRole('heading', { name: 'Belastung', exact: true }).isVisible(), 'Karte Belastung in Deine Woche');
    assert.ok(await page.locator('.ld .ld-a').count() >= 1 && await page.locator('.ld .ld-p').count() >= 1, 'gemacht als Balken, geplant gestrichelt');
    assert.match(await page.locator('.ld-mt').innerText(), /\d+ % vom Plan der Woche/);
    assert.ok(!/~\d/.test(await page.locator('.ld').innerText()), 'keine Zahlen ohne Einheit');
    await page.locator('#sheet [data-sh="ok"]').click(); await page.waitForTimeout(300);
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
    // Guten Morgen ist weg (Dennis, 26. Oktober): auch nach dem Nachtdienst keine Karte, der Ablauf steht wie geplant.
    const nightM = Object.assign({}, night, { morgen: {} });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [nightM, logs()]);
    assert.equal(await page.locator('.mg, .mg-row').count(), 0, 'kein Guten Morgen');
    assert.ok(await page.getByRole('heading', { name: 'Ganzkörper A', level: 1 }).isVisible());
    console.log('PASS: kein Guten Morgen nach dem Nachtdienst');

    // Dennis, 28. Oktober: kürzt der Coach selbst (Wiedereinstieg), ist „Mir geht’s heute nicht gut“ nicht angehakt; der Grund steht in einer eigenen Karte.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign(v2s(), { comeback: { from: '2026-10-01', n: 1, dl: null } }), logs()]);
    await page.getByRole('button', { name: 'Heute anpassen', exact: true }).click();
    assert.ok(!(await page.locator('#sheet .ad-it[data-k="int"]').getAttribute('class')).includes('sel'), 'nicht selbst gewählt: kein Haken');
    assert.match(await page.locator('#sheet .ad-sig').innerText(), /Dein Coach hat heute gekürzt[\s\S]*Wiedereinstieg nach der Pause, noch 1 Einheit kürzer/);
    await page.locator('#sheet .ad-it[data-k="int"] .gl-row').click();
    assert.ok((await page.locator('#sheet .ad-it[data-k="int"]').getAttribute('class')).includes('sel'), 'selbst gewählt: Haken');
    await page.locator('#sheet .ad-it[data-k="int"] .gl-row').click();
    await page.locator('#sheet [data-act="sig-full"]').click();
    await page.getByRole('button', { name: 'Heute anpassen', exact: true }).click();
    assert.match(await page.locator('#sheet .ad-sig').innerText(), /Heute die volle Einheit/);
    await page.keyboard.press('Escape');
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
    // Schritt 5: der Vorschlag ist eine Zeile der Wochen-Liste in Plan.
    await page.locator('.pw-list [data-act="psh"][data-k="zusatz"]', { hasText: 'Zusätzlich' }).click();
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
    // Kein automatisches Eintragen mehr (1. November): auch mit Brücke v3 schickt die App nichts. Eine Brücke, die schon eingetragen hat, bekommt einmal eine leere Liste.
    assert.equal(await page.getByRole('button', { name: 'So aktualisierst du die Brücke' }).count(), 0, 'kein Hinweis zum Aktualisieren');
    bridge.v = 3;
    await page.getByRole('button', { name: 'Jetzt abgleichen', exact: true }).click();
    await page.getByRole('heading', { name: 'Deine Tage' }).waitFor(); await page.waitForTimeout(4600);
    assert.equal(posts.length, 0, 'nichts wird eingetragen');
    await page.evaluate(() => { const k = JSON.parse(localStorage.getItem('tp.kal')); k.pushN = 3; k.pushTs = Date.now(); localStorage.setItem('tp.kal', JSON.stringify(k)); });
    await page.reload(); await page.waitForFunction(() => window.tpTest); await page.evaluate(() => window.tpTest.navigate('woche')); await page.waitForTimeout(4600);
    assert.ok(posts.length >= 1 && posts[posts.length - 1].t.length === 0, 'alte Einträge einmal herausgenommen');
    const np = posts.length; await page.evaluate(() => window.tpTest.navigate('woche')); await page.waitForTimeout(4600);
    assert.equal(posts.length, np, 'nur einmal');
    // Woche in den Kalender: Blatt mit je Training einem Google-Link, danach „eingetragen“.
    await page.getByRole('button', { name: 'Woche in den Kalender' }).click();
    await page.locator('#sheet.open .cal-row').first().waitFor();
    const ln = page.locator('#sheet .cal-row a').first(), href = await ln.getAttribute('href');
    assert.ok(/^https:\/\/calendar\.google\.com\/calendar\/render\?action=TEMPLATE&text=Training/.test(href) && /&dates=\d{8}T\d{6}\/\d{8}T\d{6}/.test(href), 'Google-Link mit Zeit');
    await page.context().route('https://calendar.google.com/**', r => r.fulfill({ status: 200, body: 'ok' }));
    const [pop] = await Promise.all([page.waitForEvent('popup'), ln.click()]); await pop.close(); await page.waitForTimeout(600);
    assert.ok(await page.locator('#sheet .cal-row').first().getByText('eingetragen').isVisible(), 'als eingetragen markiert');
    assert.ok(await page.evaluate(() => Object.keys(window.tpTest.state().calAdd || {}).length === 1), 'gemerkt');
    assert.ok(await page.locator('#sheet').getByRole('button', { name: 'Als Datei (.ics)' }).isVisible());
    await page.locator('#sheet [data-sh="ok"]').click(); await page.waitForTimeout(400);
    // Abgleich ohne Brücke: letzter Stand bleibt, Fehler wird erklärt.
    bridge = { nein: 1 };
    await page.getByRole('button', { name: 'Jetzt abgleichen', exact: true }).click();
    await page.getByText('Die Antwort passt nicht.', { exact: false }).waitFor();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('tp.kal')).w.length), 3, 'letzter Stand bleibt');
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('tp.kal')).sel.familie00001), true, 'Wahl bleibt beim Abgleich');
    await page.getByRole('button', { name: 'Trennen', exact: true }).click();
    const n1 = posts.length;
    await page.getByRole('button', { name: 'Sicher? Nochmal tippen', exact: true }).click();
    await page.waitForTimeout(300); assert.equal(posts.length, n1, 'Trennen schickt nichts mehr');
    await page.getByRole('button', { name: 'Kalender verbinden', exact: true }).waitFor();
    assert.equal(await page.evaluate(() => localStorage.getItem('tp.kal')), null, 'Trennen löscht Link und Daten');
    console.log('PASS: Google Kalender verbinden, Dienste als Schichtplan, Kalender einzeln an und aus, Woche in den Kalender, Link nur auf dem Gerät, Fehler und Trennen');

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
    // Figur drehen auch in der Bibliothek (Dennis, 1. November): Familien-Seite, waagerecht ziehen dreht und wird gemerkt.
    await page.evaluate(() => window.tpTest.navigate('uebungen'));
    await page.locator('[data-act="fam-open"]').first().click(); await page.waitForTimeout(300);
    {
      if (!(await page.locator('#view .fig[data-fig]:not([data-fig="_wave"]):visible').count())) { // eine Übung mit Grafik aufklappen
        await page.locator('#view details.gl-item', { has: page.locator('.fig[data-fig]:not([data-fig="_wave"])') }).first().locator('summary').click(); await page.waitForTimeout(300); }
      const lf = page.locator('#view .fig[data-fig]:not([data-fig="_wave"]):visible').first();
      assert.ok(await lf.count(), 'Figur auf der Familien-Seite');
      const lk = await lf.getAttribute('data-fig'), bb = await lf.boundingBox();
      await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.mouse.down();
      await page.mouse.move(bb.x + bb.width / 2 + 80, bb.y + bb.height / 2, { steps: 6 }); await page.mouse.up(); await page.waitForTimeout(150);
      const lc = await page.evaluate(k => (window.tpTest.state().figCam || {})[k], lk);
      assert.ok(lc && typeof lc.yaw === 'number', 'Bibliothek: Ansicht gemerkt ' + JSON.stringify(lc));
      await lf.dblclick();
    }
    console.log('PASS: Figur in der Bibliothek drehbar');
    // Familien-Seite (Dennis, 1. November, Optik 3): Stufe im Skill-Pfad antippen wechselt die Bühne oben, kein Blatt; „So geht’s“ klappt auf und bleibt offen;
    // das (i)-Blatt bleibt unter dem oberen Rand (vorher wuchs es über den Rand, „Fertig“ war verdeckt).
    await page.evaluate(() => window.tpTest.navigate('uebungen'));
    await page.locator((await page.locator('[data-act="fam-open"][data-id="f_pullup"]').count()) ? '[data-act="fam-open"][data-id="f_pullup"]' : '[data-act="fam-open"]').first().click(); await page.waitForTimeout(300);
    {
      const stg = page.locator('.fam-stage .fst-t b'), st0 = await stg.innerText(), rows = page.locator('.fam-path .lad-row');
      assert.ok((await rows.count()) > 1, 'Skill-Pfad mit Stufen');
      const other = page.locator('.fam-path .lad-row:not(.sel)').last(); // die leichteste Stufe ganz unten: dafür muss die Seite scrollen
      await other.scrollIntoViewIfNeeded(); await other.click(); await page.waitForTimeout(250);
      assert.equal(await page.locator('#sheet').count(), 0, 'Stufe antippen öffnet kein Blatt');
      assert.notEqual(await stg.innerText(), st0, 'Bühne zeigt die angetippte Stufe');
      assert.equal(await page.locator('.fam-path .lad-row.sel').count(), 1, 'eine Stufe markiert');
      const by = (await page.locator('.fam-stage').boundingBox()).y; assert.ok(by >= 0 && by < 60, 'Bühne bleibt oben stehen: y ' + by);
      await page.locator('[data-act="fam-how"]').click(); await page.waitForTimeout(150);
      assert.ok(await page.locator('.fst-how ol.how li').count() >= 2, 'So geht’s klappt auf');
      await page.mouse.wheel(0, 300); await page.waitForTimeout(200);
      assert.equal(await page.locator('.fst-how').count(), 1, 'beim Scrollen bleibt es offen');
      await page.locator('.fst-how [data-act="ue-info"]').click(); await page.waitForTimeout(400);
      const sh = await page.locator('#sheet .sheet').boundingBox(); assert.ok(sh.y >= 27, 'Blatt beginnt unter dem oberen Rand: y ' + sh.y);
      assert.ok(await page.getByRole('button', { name: 'Fertig', exact: true }).isVisible(), '„Fertig“ sichtbar');
      await page.getByRole('button', { name: 'Fertig', exact: true }).click(); await page.waitForTimeout(300);
    }
    console.log('PASS: Familien-Seite mit Bühne: Stufe antippen wechselt Bild und Erklärung, kein Blatt; (i)-Blatt unter dem Rand');
    // Bibliothek (Dennis, 1. November): heißt „Bibliothek“, Mobility ist eine Familie mit Liste nach Körperteil, jede Mobility-Übung genau einmal.
    await page.evaluate(() => window.tpTest.navigate('uebungen'));
    assert.equal((await page.locator('#view .hero h1').innerText()).trim(), 'Bibliothek', 'Seite heißt Bibliothek');
    assert.equal(await page.locator('[data-act="fam-open"][data-id="f_neck_mobility"], [data-act="fam-open"][data-id="f_foot_mobility"]').count(), 0, 'keine einzelnen Mobilitäts-Familien mehr');
    await page.locator('[data-act="fam-open"][data-id="_mob"]').click(); await page.waitForTimeout(300);
    assert.equal((await page.locator('#view .hero h1').innerText()).trim(), 'Mobility');
    {
      const ids = await page.locator('#view .mob-k ~ .fam-page details.gl-item').evaluateAll(l => l.map(d => d.id));
      assert.ok(ids.length >= 50 && new Set(ids).size === ids.length, 'jede Mobility-Übung genau einmal: ' + ids.length);
      const ks = await page.locator('#view .mob-k').allInnerTexts(); assert.match(ks[0], /^Nacken/); assert.match(ks.join('|'), /Hüfte/);
      assert.ok(!ks.some(k => /^Weitere/.test(k)), 'alle Übungen einem Körperteil zugeordnet: ' + ks.join(', '));
      const sy0 = await page.evaluate(() => scrollY); await page.locator('[data-act="mob-jump"][data-k="huefte"]').click(); await page.waitForTimeout(1200);
      const y = (await page.locator('#mob-huefte').boundingBox()).y; assert.ok(y >= 0 && y < 120, 'Sprung zu Hüfte: y ' + y);
      await page.locator('#mob-huefte + .fam-page details.gl-item > summary').first().click(); await page.waitForTimeout(300);
      assert.ok(await page.locator('#mob-huefte + .fam-page details.gl-item[open] .fig').count(), 'Übung klappt mit Figur auf');
    }
    console.log('PASS: Bibliothek mit Familie Mobility nach Körperteil');

    // Ausfall annehmen (Impeccable-Kritik 24. Oktober): kein Fragenblock vor dem Tag, eine Zeile mit „Stimmt nicht“, die Leiste zeigt „A ×“.
    await page.clock.setFixedTime(new Date('2026-10-14T08:30:00+02:00'));
    const msSt = Object.assign(old(), { planV: 2, tag: 1, umfang: { u: 4, ts: 0 }, planWk: '2026-10-12', planAsk: '2026-10-12', planStart: { date: '2026-09-28', week: '2026-09-28', tag: 1, mode: 'week' },
      planDays: { '2026-10-13': { tag: 1, dg: 5, time: 17, ts: 1, pv: 2, n: 'Ganzkörper A' } } });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [msSt, []]);
    assert.equal(await page.getByText('Kurze Rückfrage').count(), 0, 'keine Rückfrage vor dem Tag');
    assert.match(await page.locator('.h-sub').first().innerText(), /^Gestern ist ausgefallen, dein Coach hat die Woche neu verteilt\. Stimmt nicht/);
    assert.equal(await page.evaluate(() => window.tpTest.state().planMiss['2026-10-13'].reason), 'auto');
    assert.match(await page.locator('.pill.wd.miss').first().innerText(), /Di\s*13\s*A ×/);
    await page.locator('[data-act="miss-wrong"]').click();
    assert.ok(await page.locator('#sheet').getByRole('button', { name: 'Krank / Beschwerden' }).isVisible(), '„Stimmt nicht“ fragt nach');
    await page.locator('#sheet').getByRole('button', { name: 'Trainiert, aber nicht eingetragen' }).isVisible();
    await page.keyboard.press('Escape');
    console.log('PASS: Ausfall angenommen: Zeile unter dem Titel, Stimmt nicht, A × in der Wochenleiste');

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
    // Schwerpunkt und Ziele sind vorläufig aus (Dennis, 6. November): gespeichert wirkt „kb“ nicht. Die Logik bleibt für später geprüft.
    await page.evaluate(() => { window.tpTest.state().schwerpunkt = 'kb'; });
    assert.equal(await page.evaluate(() => window.tpTest.fill()).then(f => f.kraft[3][2].n), 'Deadlift', 'Schwerpunkt aus: gespeichertes „kb“ wirkt nicht');
    await page.evaluate(() => { window.tpTest.state().schwerpunkt = null; window.TP_GOALS_ON = true; });
    await page.evaluate(() => window.tpTest.navigate('fokus'));
    await page.locator('button.card.fk[data-act="sp-set"]', { hasText: 'Kettlebell' }).click();
    assert.equal(await page.locator('button.card.fk.on').innerText().then(x => /Kettlebell[\s\S]*Aktiv/.test(x)), true, 'gewählte Karte mit „Aktiv“');
    assert.equal(await page.evaluate(() => window.tpTest.state().schwerpunkt), 'kb');
    const mit = await page.evaluate(() => window.tpTest.fill());
    assert.equal(mit.kraft[3][2].n, 'Kettlebell Swing', 'Hüfte: Swing statt Deadlift (' + mit.kraft[3].map(x => x.n) + ')');
    assert.ok(mit.metcon[3].length >= 2 && mit.metcon[3].every(x => /Kettlebell|Dumbbell|High Pull|Swing|Clean|Snatch|Goblet|Thruster/.test(x.n)), 'Metcon mit Kettlebell (' + mit.metcon[3].map(x => x.n) + ')');
    assert.match(await page.evaluate(() => window.tpTest.coach(3)), /Kettlebell Swing statt Deadlift: dein Schwerpunkt ist Kettlebell\./);
    await page.evaluate(() => { const S = window.tpTest.state(); S.orte[0].eq = S.orte[0].eq.filter(x => !/kb|kettle/.test(x)); });
    assert.match(await page.evaluate(() => window.tpTest.coach(3)), /Hier gibt es keine Kettlebell/);
    await page.evaluate(() => window.tpTest.navigate('fokus'));
    assert.match(await page.locator('main').innerText(), /fehlt die Kettlebell, dort trainierst du wie sonst/);
    await page.locator('button.card.fk[data-act="sp-set"]', { hasText: 'Keiner' }).click();
    assert.equal(await page.evaluate(() => window.tpTest.state().schwerpunkt), null);
    await page.evaluate(() => { window.TP_GOALS_ON = false; });
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

    // Guten Morgen ist weg (Dennis, 26. Oktober): auch mit Anlass keine Karte, Heute bleibt wie geplant.
    const oneSig = [kx('s1', '2026-09-28', 1, [5, 5, 5, 5]), kx('s2', '2026-09-30', 3, [5, 5, 5, 5]), kx('s3', '2026-10-09', 6, [5, 5, 5, 5]), kx('s4', '2026-10-12', 1, [5, 4, 3, 3])];
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, sigSt, { morgen: {} }), oneSig]);
    assert.equal(await page.locator('.mg, .mg-row').count(), 0, 'kein Guten Morgen mehr');
    assert.match(await kr(), /^4 Runden/, 'ein Signal allein ändert nichts');
    console.log('PASS: kein Guten Morgen, auch mit Anlass');

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
    await page.getByRole('button', { name: 'Trotzdem speichern', exact: true }).click();
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
    await page.locator('#fs .fs-krow[data-m="2"]').click({ position: { x: 12, y: 12 } });
    assert.match(await page.locator('#fs .fs-co').innerText(), /Beine noch müde von Montag: Nordic Curl heute 3 statt 4 Runden[\s\S]*Vorgabe und Stufe bleiben\./);
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().length - 1));
    await page.locator('#fs [data-act="save"]').click();
    await page.getByRole('button', { name: 'Trotzdem speichern', exact: true }).click();
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
    // Dennis, 25. Oktober: Trainingstage stehen in Plan & Challenges (Allround läuft im Hintergrund), nicht mehr in Deine Woche.
    await page.evaluate(() => window.tpTest.navigate('plan'));
    // Schritt 5 (Dennis, 6. November): Trainingstage als Zeile der Wochen-Liste, kein „Dein Ziel“ mehr, kein „Warum 17:00?“, Wissen als häufige Fragen.
    assert.match(await page.locator('.pw-list .tg-row').innerText(), /Trainingstage pro Woche[\s\S]*A, B und C\./);
    assert.equal(await page.locator('.pw-list .tg-row [data-act="tage-set"][aria-pressed="true"]').innerText(), '3');
    assert.equal(await page.locator('#view [data-act="fk-open"], #view [data-act="pw-why"], #view [data-act="plan-sec"]').count(), 0, 'kein Ziel, kein Warum, keine Wissens-Seiten');
    await page.locator('.faq [data-act="faq"]').first().click();
    assert.match(await page.locator('#sheet .faq-a').innerText(), /Arbeit, Schlaf/, 'Frage im Blatt');
    await page.locator('#sheet [data-sh="ok"]').click(); await page.waitForTimeout(300);
    // Arbeitszeiten im Blatt; ein Rad darin (Schlaf) schließt es nicht für immer, danach kommt das Blatt zurück.
    await page.locator('.pw-list [data-act="psh"][data-k="woche"]').click(); await page.waitForTimeout(300);
    assert.match(await page.locator('#sheet .psh').innerText(), /Schlaf/);
    await page.locator('#sheet .psh .vrow', { hasText: 'Schlaf' }).first().click(); await page.waitForTimeout(300);
    assert.equal(await page.locator('#sheet .psh').count(), 0, 'Rad über dem Blatt');
    await page.locator('#sheet [data-sh="x"]').first().click(); await page.waitForTimeout(700);
    assert.equal(await page.locator('#sheet .psh').count(), 1, 'Arbeitszeiten-Blatt kommt zurück');
    await page.locator('#sheet [data-sh="ok"]').click(); await page.waitForTimeout(500);
    assert.equal(await page.locator('#sheet').count(), 0, 'Fertig schließt');
    // Dennis, 6. November: Trainingstage ohne eigenes Blatt, ein Tippen auf die Zahl in der Zeile (kein Regler, der sich beim Scrollen ändert).
    assert.equal(await page.locator('#view .tg-r').count(), 0, 'kein Regler auf der Seite');
    await page.locator('.pw-list [data-act="tage-set"][data-v="5"]').click(); await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.tpTest.state().tage), 5);
    assert.equal(await page.locator('#sheet.open, .sheet-bg.open').count(), 0, 'kein Blatt');
    assert.match(await page.locator('.pw-list .tg-row').innerText(), /Push, Pull, Beine, Oberkörper, Unterkörper, mit kurzem Kardio\./);
    await page.evaluate(() => window.tpTest.navigate('plan'));
    await page.locator('#view [aria-label="Nächste Woche"]').first().click();
    assert.equal(await page.locator('#view .pw-top .wkst .wd .wd-u').allInnerTexts().then(x => x.filter(t => t !== 'Frei').length), 5, 'nächste Woche mit 5 Einheiten');
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
    const b2 = await blkOf(2), b10 = await blkOf(10);
    await page.evaluate(() => { window.TP_GOALS_ON = true; });
    const bE = await blkOf(10, { challenge: { id: 'k10', date: '2027-02-14', start: '2026-09-28', dg: 1 } });
    await page.evaluate(() => { window.TP_GOALS_ON = false; });
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

    // Wochen-Kette (Dennis, 25. Oktober): Wochen statt Tage, gehalten ab zwei Dritteln des Ziels, Joker, 15-Minuten-Rettung, Karte in Erfolge.
    await page.clock.setFixedTime(new Date('2026-10-15T09:00:00+02:00'));
    const chLogs = ['2026-09-28', '2026-09-30', '2026-10-02', '2026-10-05', '2026-10-07', '2026-10-09', '2026-10-12'].map((d, i) => kx('c' + i, d, [1, 3, 6][i % 3], [5, 5, 5, 5]));
    const chSt = Object.assign(old(), { planV: 2, tag: 3, umfang: { u: 4, ts: 0 }, planWk: '2026-10-12', planStart: { date: '2026-09-28', week: '2026-09-28', tag: 1, mode: 'week' }, tagSince: '2026-10-12', advBy: 'auto',
      planOv: { '2026-10-16': { off: 1, reason: 'time' }, '2026-10-17': { off: 1, reason: 'time' }, '2026-10-18': { off: 1, reason: 'time' } } });
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [chSt, chLogs]);
    let wc = await page.evaluate(() => window.tpTest.chain());
    assert.deepEqual(wc.st, ['full', 'full', 'open'], 'zwei volle Wochen, diese läuft');
    assert.equal(wc.n, 2); assert.equal(wc.need, 2, 'bei 3 Tagen gehalten ab 2');
    assert.ok(wc.risk && wc.risk.tight && wc.risk.today, 'nur noch heute geplant, eine fehlt: eng');
    assert.match(await page.locator('.ch-row').innerText(), /2 Wochen in Folge · noch 1 für diese Woche, auch 15 Minuten zählen/);
    const full0 = await page.evaluate(() => window.tpTest.steps().reduce((a, s) => a + (s.opt ? 0 : s.dur || 0), 0));
    await page.locator('[data-act="chain-short"]').click();
    const short = await page.evaluate(() => window.tpTest.steps().reduce((a, s) => a + (s.opt ? 0 : s.dur || 0), 0));
    assert.ok(short <= 16 && short < full0, '15 Minuten: kurze Einheit (' + short + ' statt ' + full0 + ' Min)');
    await page.getByRole('button', { name: 'Heute anpassen' }).click();
    await page.locator('#sheet [data-act="adapt-off"]').click();
    await page.getByRole('button', { name: '15 Minuten statt gar nicht' }).waitFor();
    await page.getByRole('button', { name: 'Heute trotzdem nicht' }).click();
    await page.getByText('Was soll dein Coach berücksichtigen?').waitFor();
    await page.keyboard.press('Escape'); await page.evaluate(() => { const s = document.getElementById('sheet'); if (s) s.remove(); });
    // Gehalten mit der zweiten Einheit; Krank ist Pause, eine leere Woche ohne Grund kostet den Joker, die nächste reißt die Kette.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [chSt, chLogs.concat([kx('c9', '2026-10-14', 3, [5, 5, 5, 5])])]);
    assert.equal((await page.evaluate(() => window.tpTest.chain())).st[2], 'held');
    // Joker (Dennis, 26. Oktober): verdient mit 4 geschafften Wochen, nur von Hand eingesetzt bis Sonntag der Woche danach.
    const jkLogs = chLogs.concat(['2026-09-21', '2026-09-23', '2026-09-25', '2026-10-14', '2026-10-16'].map((d, i) => kx('j' + i, d, [1, 3, 6][i % 3], [5, 5, 5, 5])));
    const jkSt = Object.assign({}, chSt, { planWk: '2026-10-26', planOv: {} });
    await page.clock.setFixedTime(new Date('2026-10-28T09:00:00+01:00'));
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [jkSt, chLogs]);
    wc = await page.evaluate(() => window.tpTest.chain());
    assert.deepEqual(wc.st, ['full', 'full', 'miss', 'miss', 'open'], 'ohne verdienten Joker reißt die Kette, nichts geschieht von selbst');
    assert.equal(wc.n, 0);
    // Beim Öffnen: Riss mit etwas Mut, nur einmal.
    let nt = await page.evaluate(() => window.tpTest.notice());
    assert.match(nt, /Deine Kette ist gerissen/); assert.match(nt, /Nach 2 Wochen/); assert.match(nt, /Deine Stufen und Werte bleiben/);
    await page.locator('#moment [data-act="mo-next"]').click();
    assert.equal(await page.evaluate(() => window.tpTest.notice()), '', 'nur einmal');
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [jkSt, jkLogs]);
    nt = await page.evaluate(() => window.tpTest.notice());
    assert.match(nt, /Letzte Woche hat nicht gereicht/); assert.match(nt, /Joker einsetzen/);
    await page.locator('#moment [data-act="mo-next"]').click();
    assert.equal(await page.evaluate(() => window.tpTest.notice()), '', 'Nicht jetzt: kommt nicht wieder');
    wc = await page.evaluate(() => window.tpTest.chain());
    assert.deepEqual(wc.st, ['full', 'full', 'full', 'full', 'pend', 'open'], 'vier geschaffte Wochen: Joker verdient, letzte Woche offen');
    assert.equal(wc.n, 4); assert.equal(wc.bank, 1);
    assert.match(await page.locator('.ch-row').innerText(), /letzte Woche fehlt, Joker in Erfolge/);
    await page.evaluate(() => window.tpTest.profile('erfolge'));
    assert.match(await page.locator('.ch-card').innerText(), /hat nicht gereicht/);
    await page.locator('[data-act="chain-jk"]').click();
    wc = await page.evaluate(() => window.tpTest.chain());
    assert.deepEqual(wc.st.slice(-2), ['joker', 'open'], 'von Hand eingesetzt'); assert.equal(wc.n, 4); assert.equal(wc.bank, 0);
    assert.equal(await page.locator('.ch-card .cr.joker .jk').count(), 1, 'Joker als Schild');
    assert.match(await page.locator('.ch-card').innerText(), /4 geschafften Wochen verdienst du einen neuen/);
    const jkUsed = (await page.evaluate(() => window.tpTest.chain())).jk;
    // Nicht eingesetzt: nach Sonntag der Woche danach reißt die Kette. Krank ist Pause.
    await page.clock.setFixedTime(new Date('2026-11-12T09:00:00+01:00'));
    await page.evaluate(a => window.tpTest.set(Object.assign({}, a[0], { planWk: '2026-11-09' }), a[1]), [jkSt, jkLogs]);
    assert.deepEqual((await page.evaluate(() => window.tpTest.chain())).st.slice(4), ['miss', 'miss', 'miss', 'open'], 'zu spät: kein Joker mehr');
    await page.evaluate(a => window.tpTest.set(Object.assign({}, a[0], { planWk: '2026-11-09', chainJk: a[2], planMiss: { '2026-10-28': { status: 'missed', reason: 'ill', ts: 1 } } }), a[1]), [jkSt, jkLogs, jkUsed]);
    wc = await page.evaluate(() => window.tpTest.chain());
    assert.deepEqual(wc.st.slice(4), ['joker', 'pause', 'miss', 'open'], 'Joker, dann Pause wegen Krankheit, dann Riss');
    assert.equal(wc.n, 0);
    await page.evaluate(() => window.tpTest.profile('erfolge'));
    assert.equal(await page.locator('.mv1 .medal.md').count(), 5, 'fünf geprägte Medaillen');
    assert.match(await page.locator('.mv1 .m-cell').first().getAttribute('aria-label'), /^Ausdauer, /);
    console.log('PASS: Wochen-Kette: gehalten nach Ziel, 15-Minuten-Rettung, Joker, Pause, Riss; Erfolge mit Ringen und geprägten Medaillen');

    // Mehr Zeit (Dennis, 26. Oktober): Heute anpassen › „Ich habe mehr Zeit“, +15 = Accessory, +30 = dazu eine Kraftrunde und längerer Abschluss.
    await page.clock.setFixedTime(new Date('2026-10-15T09:00:00+02:00'));
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, chSt, { zeitMax: 45 }), chLogs]);
    const stp = () => page.evaluate(() => window.tpTest.steps().map(s => ({ id: s.id, dur: s.dur || 0, opt: s.opt })));
    const sum = L => L.reduce((a, s) => a + (s.opt ? 0 : s.dur), 0);
    const mz0 = await stp();
    assert.ok(!mz0.some(s => s.id === 'acc'), 'ohne Wunsch kein Accessory');
    await page.getByRole('button', { name: 'Heute anpassen' }).click();
    await page.locator('#sheet .ad-it[data-k="mehr"] .gl-row').click();
    await page.locator('#sheet [data-act="adapt-mehr"][data-m="15"]').click();
    let mz1 = await stp(), acc = mz1.find(s => s.id === 'acc');
    assert.ok(acc && acc.dur === 12, 'Accessory mit 3 Übungen, 12 Min');
    assert.equal(sum(mz1) - sum(mz0), 12, 'nur das Accessory kommt dazu, das Zeitlimit gilt heute nicht');
    assert.match(await page.locator('#sheet .ad-mehr').innerText(), /Accessory mit /);
    await page.locator('#sheet [data-act="adapt-mehr"][data-m="30"]').click();
    let mz2 = await stp(), k0 = mz0.find(s => s.id === 'kraft'), k2 = mz2.find(s => s.id === 'kraft');
    assert.equal(mz2.find(s => s.id === 'acc').dur, 16, '+30: vier Übungen');
    assert.ok(k2.dur > k0.dur, '+30: eine Kraftrunde mehr');
    assert.ok(sum(mz2) - sum(mz0) >= 22 && sum(mz2) - sum(mz0) <= 32, '+30: etwa eine halbe Stunde mehr (' + (sum(mz2) - sum(mz0)) + ')');
    await page.locator('#sheet .ad-it[data-k="zeit"] .gl-row').click();
    await page.locator('#sheet [data-act="adapt-zeit"][data-z="45"]').click();
    assert.ok(!(await stp()).some(s => s.id === 'acc'), 'wenig Zeit nimmt mehr Zeit zurück');
    await page.locator('#sheet .ad-it[data-k="mehr"] .gl-row').click();
    await page.locator('#sheet [data-act="adapt-mehr"][data-m="15"]').click();
    await page.keyboard.press('Escape'); await page.evaluate(() => { const s = document.getElementById('sheet'); if (s) s.remove(); });
    assert.match(await page.locator('.adj').innerText(), /15 Min länger/);
    const sv = await page.evaluate(() => window.tpTest.saveNow());
    assert.equal(sv.acc.length, 3); assert.deepEqual(sv.acc[0].reps.length, 3); assert.equal(sv.mehr, 15);
    // Trainer (Dennis, 28. Oktober): Handstand-Zeit beim Pausieren, Stelle bleibt beim Zählen, nach der Uhr von selbst weiter.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, chSt, { fsView: 'one' }), chLogs]);
    await page.evaluate(() => window.tpTest.go(window.tpTest.steps().findIndex(s => s.id === 'hs')));
    assert.equal(await page.evaluate(() => window.tpTest.stepId()), 'hs');
    await page.locator('#fs #fs-tg').click();
    // Seit 2. November ein Intervall: Halten 20 s, dann Pause (Dennis: „Arbeit, Pause, Arbeit“).
    assert.match(await page.evaluate(() => window.tpTest.steps().find(s => s.id === 'hs').timer.mode), /hiit/);
    await page.clock.setFixedTime(new Date('2026-10-15T09:00:28+02:00'));
    await page.locator('#fs #fs-tg').click();
    assert.equal(await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem('tp.drafts')))[0].hsSec), '18', 'Pause im Halten nimmt 18 s (28 s minus 10 s Vorlauf)');
    await page.locator('#fs #fs-tg').click();
    await page.clock.setFixedTime(new Date('2026-10-15T09:00:40+02:00'));
    await page.locator('#fs #fs-tg').click();
    assert.equal(await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem('tp.drafts')))[0].hsSec), '18', 'Pause in der Pause zählt nicht');
    assert.ok(await page.evaluate(() => { const b = document.getElementById('fs-side'); return b.scrollHeight <= b.clientHeight + 2; }), 'Handstand passt ohne Scrollen');
    await page.setViewportSize({ width: 360, height: 430 }); await page.waitForTimeout(600);
    await page.evaluate(() => { const b = document.getElementById('fs-side'); b.scrollTop = b.scrollHeight; });
    await page.waitForTimeout(100); const sc0 = await page.evaluate(() => document.getElementById('fs-side').scrollTop);
    assert.ok(sc0 > 5, 'auf kleinem Bildschirm lässt sich scrollen');
    await page.locator('#fs [data-act="k-rep"][data-f="hsSec"][data-d^="-"]').click();
    assert.ok(Math.abs(await page.evaluate(() => document.getElementById('fs-side').scrollTop) - sc0) < 5, '„–5 s“ bleibt an der Stelle');
    await page.setViewportSize({ width: 390, height: 844 });
    // Dennis, 28. Oktober: „alles, was man braucht, auf einer Seite ohne Scrollen“ (390 × 844, beide Ansichten).
    for (const vw of ['one', 'list']) {
      const over = await page.evaluate(vw => { window.tpTest.state().fsView = vw; const o = []; window.tpTest.steps().forEach((s, i) => { window.tpTest.goStep(s.id); const b = document.getElementById('fs-side'); if (b && b.scrollHeight > b.clientHeight + 2) o.push(s.id + ' +' + (b.scrollHeight - b.clientHeight)); }); return o; }, vw);
      assert.deepEqual(over, [], 'ohne Scrollen (' + vw + ')');
    }
    await page.evaluate(() => { window.tpTest.state().fsView = 'one'; window.tpTest.goStep('hs'); });
    await page.evaluate(() => window.tpTest.finishTimer());
    await page.waitForTimeout(2600);
    assert.equal(await page.evaluate(() => window.tpTest.stepId()), 'kraft', 'nach der Uhr von selbst weiter');
    await page.clock.setFixedTime(new Date('2026-11-12T09:00:00+01:00'));
    console.log('PASS: Trainer: Handstand-Zeit beim Pausieren, Stelle bleibt, nach der Uhr weiter');
    console.log('PASS: Mehr Zeit: +15 Accessory, +30 dazu Kraftrunde und Abschluss, wenig Zeit hebt es auf, Accessory gespeichert');

    // Muskeln in der Bibliothek (Dennis, B2, Stil S3): ganzer Körper, Antippen wählt nur aus, Wischen nicht, erst „Öffnen“ zeigt die Seite.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign(old(), { planV: 2, tag: 1, orte: [{ id: 'o1', k: 'zuhause', on: true, eq: ['eq_zuhause', 'eq_ringe', 'eq_band'] }], ort: 'o1' }), logs()]);
    // Schritt 6 (Variante A): Reiter „Bibliothek“ mit Übungen | Mobility, kein Timer; Körper und One Rep Max im Profil › Werte als Blatt von unten.
    assert.equal(await page.evaluate(() => { window.tpTest.navigate('uebungen'); return document.querySelector('.tab[data-group="tools"]').innerText.trim(); }), 'Bibliothek');
    assert.deepEqual(await page.evaluate(() => [...document.querySelectorAll('.sub-seg .seg-btn')].map(b => b.innerText.trim())), ['Übungen', 'Mobility']);
    await page.locator('.sub-seg [data-tab="routinen"]').click();
    assert.equal(await page.evaluate(() => document.getElementById('view').dataset.tab), 'routinen', 'Umschalter wechselt zu Mobility');
    assert.equal(await page.evaluate(() => { window.tpTest.navigate('timer'); return document.getElementById('view').dataset.tab; }), 'uebungen', 'alter Timer führt zur Bibliothek');
    await page.evaluate(() => window.tpTest.profile('werte'));
    await page.locator('.pf-tools [data-k="rm"]').click();
    assert.ok(await page.locator('#sheet .psh-rm').isVisible(), 'One Rep Max als Blatt');
    if (!await page.locator('#sheet .psh-rm [data-act="rm-open"]').count()) await page.locator('#sheet [data-act="rm-all"]').click();
    await page.locator('#sheet .psh-rm [data-act="rm-open"]').first().click();
    assert.ok(await page.locator('#sheet .psh-rm .rm-pct, #sheet .psh-rm table, #sheet .psh-rm [data-act="rm-new"]').count() > 0, 'Prozent-Rechner im Blatt');
    assert.ok(await page.locator('#sheet .psh-rm').isVisible(), 'Prozent-Rechner bleibt im Blatt');
    assert.equal(await page.evaluate(() => document.getElementById('view').dataset.tab), 'profil');
    await page.locator('#sheet [data-sh="ok"]').click(); await page.waitForTimeout(350);
    for (const ts of ['l', 'm']) {
      await page.evaluate(t => { document.documentElement.dataset.text = t; window.tpTest.profile('werte'); }, ts);
      await page.locator('.pf-tools [data-k="koerper"]').click(); await page.waitForTimeout(350);
      const f0 = await page.locator('#sheet .mfig svg').boundingBox(), vh = page.viewportSize().height;
      assert.ok(f0.y >= 0 && f0.y + f0.height <= vh, 'ganzer Körper im Blatt sichtbar (Schrift ' + ts + ')');
      if (ts === 'l') { await page.locator('#sheet [data-sh="ok"]').click(); await page.waitForTimeout(350); }
    }
    const fig = await page.locator('#sheet .mfig svg').boundingBox();
    // Blatt heißt „Körper“; Figur bis zu den Füßen (viewBox 480, Fuß-Flächen), angedeutet räumlich (Verlauf darüber, fängt keine Taps).
    assert.match(await page.locator('#sheet').innerText(), /^[\s\S]{0,40}Körper/);
    assert.equal(await page.evaluate(() => document.querySelector('.mfig svg').getAttribute('viewBox')), '0 0 200 480');
    assert.ok(await page.evaluate(() => { var s = document.querySelector('.mfig svg'), b = [...s.querySelectorAll('path.sil')].map(p => p.getBBox()); return Math.max(...b.map(x => x.y + x.height)) > 470; }), 'Füße unten');
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.mfig .sh')).pointerEvents), 'none');
    await page.mouse.move(fig.x + fig.width * 0.4, fig.y + fig.height * 0.27); await page.mouse.down(); await page.mouse.move(fig.x + fig.width * 0.4, fig.y + fig.height * 0.27 + 40, { steps: 4 }); await page.mouse.up();
    assert.equal(await page.locator('.mus-sel').count(), 0, 'Wischen über die Figur wählt nichts aus');
    await page.mouse.click(fig.x + fig.width * 0.4, fig.y + fig.height * 0.27);
    assert.match(await page.locator('.mus-sel').innerText(), /Brust[\s\S]*Übungen hier[\s\S]*Öffnen/, 'Antippen wählt die Brust aus');
    assert.equal(await page.evaluate(() => document.querySelectorAll('.mfig path.mu.p1').length), 2, 'Brust blau (beide Seiten)');
    assert.ok(await page.evaluate(() => document.querySelectorAll('.mfig path.mu.p2').length) > 0, 'oft mitarbeitende hell');
    assert.equal(await page.locator('#sheet .mfig').count(), 1, 'noch keine Muskel-Seite');
    await page.getByRole('button', { name: 'Öffnen', exact: true }).click();
    assert.ok(await page.getByRole('heading', { name: 'Brust', level: 2 }).isVisible());
    assert.ok(await page.getByRole('heading', { name: /^Trainiert sie vor allem/ }).isVisible());
    const nOrt = await page.locator('#view .ft-row').count();
    await page.getByRole('button', { name: 'Alle', exact: true }).click();
    assert.ok(await page.locator('#view .ft-row').count() > nOrt, 'Alle zeigt mehr Übungen');
    await page.locator('#view .mu-i').first().click();
    assert.ok(await page.locator('#sheet .ue-info').isVisible(), '(i) öffnet die Anleitung');
    assert.ok(await page.locator('#sheet .mus-ic').count() > 0, '(i) zeigt die Hauptmuskeln als Bild'); await page.locator('#sheet [data-sh]').first().click(); await page.waitForTimeout(300);
    await page.locator('#view .mu-row .ft-row').first().click();
    assert.equal(await page.evaluate(() => window.tpTest.state() && document.querySelector('#view .fam-path') != null), true, 'Zeile öffnet die Familie');
    await page.locator('#view .rbtn.back').first().click();
    assert.ok(await page.getByRole('heading', { name: 'Brust', level: 2 }).isVisible(), 'Zurück führt zum Muskel');
    await page.locator('#view .rbtn.back').first().click(); await page.waitForTimeout(350);
    assert.ok(await page.locator('#sheet .psh-koerper').isVisible(), 'Zurück vom Muskel öffnet wieder das Blatt Körper');
    await page.locator('#sheet [data-sh="ok"]').click(); await page.waitForTimeout(350);
    console.log('PASS: Bibliothek als Reiter, 1RM als Blatt; Körper als Blatt im Profil: ganzer Körper mit Füßen, Antippen wählt aus, Wischen nicht, Öffnen zeigt Übungen je Ort und alle');

    // Dennis, 2. November: Accessory zum Abhaken (3 Runden) mit Band in Farbe; Mini-Band ist ein eigenes Gerät; ohne Uhr hakt die Kapsel ab.
    await page.clock.setFixedTime(new Date('2026-10-15T09:00:00+02:00'));
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, chSt, { zeitMax: 45, fsView: 'one' }), chLogs]);
    await page.evaluate(() => window.tpTest.draft('_mehr', '15'));
    const accI = await page.evaluate(() => window.tpTest.steps().findIndex(s => s.id === 'acc'));
    assert.ok(accI > 0, 'Accessory dabei');
    {
      await page.evaluate(i => window.tpTest.go(i), accI); await page.waitForTimeout(300);
      assert.match(await page.locator('#fs .fs-side').innerText(), /Runde 1 von 3/, 'Accessory in Runden');
      assert.equal(await page.evaluate(() => window.tpTest.steps().filter(s => s.id === 'acc').length), 1);
      await page.locator('#fs .fs-side [data-act="fl-done"]').click();
      assert.match(await page.locator('#fs .fs-side').innerText(), /Übung 2 von/, 'Erledigt hakt ab');
      assert.ok(await page.locator('#fs .fs-top [data-act="fs-view"]').isVisible(), 'Liste oder Karte auch im Accessory');
      // Ohne Uhr (Uhr noch nicht gestartet ist hier ein Block, darum über das Aufwärmen): Kapsel hakt ab.
      await page.evaluate(() => window.tpTest.go(window.tpTest.steps().findIndex(s => s.id === 'warm'))); await page.waitForTimeout(200);
      await page.locator('#fs .fs-side [data-act="fl-done"]').click(); await page.waitForTimeout(200);
      const pl = await page.locator('#fs-pl').innerText();
      if (/Tippen hakt/.test(pl)) { const t0 = await page.locator('#fs .fs-side').innerText(); await page.locator('#fs #fs-ring').click(); await page.waitForTimeout(200); assert.notEqual(await page.locator('#fs .fs-side').innerText(), t0, 'Tippen auf die Kapsel hakt ab'); }
    }
    assert.ok(await page.evaluate(() => !Object.values(window.tpTest.state().orte).some(o => o.eq.indexOf('eq_miniband') >= 0)), 'Mini-Band ist nicht einfach angehakt');
    console.log('PASS: Accessory zum Abhaken in Runden, Liste oder Karte, Mini-Band als eigenes Gerät');

    // Dennis, 2. November: Abwechslung im Kraftteil (Durchgang 2, 6, 10 Zirkel, sonst EMOM), Lateral Hop statt Skater Jump, Band ohne Punkt, Umschalter bei laufender Uhr.
    // Dennis, 6. November: Zirkel je Abschnitt in einem zufälligen Durchgang (fest je Startdatum und Block), nie in Entlastung und Testwoche.
    await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, chSt, { durchgang: 5 }), chLogs]);
    const zkL = await page.evaluate(() => window.tpTest.ev('function () { var o = []; for (var b = 1; b <= 12; b++) if (zkDg(b)) o.push(b); return o; }'));
    assert.equal(zkL.length, 3, 'je Abschnitt genau ein Zirkel-Durchgang: ' + zkL);
    assert.ok(zkL[0] <= 3 && zkL[1] >= 5 && zkL[1] <= 7 && zkL[2] >= 9 && zkL[2] <= 11, 'nicht in Entlastung (4, 8) und Testwoche (12): ' + zkL);
    const ZKD = zkL[1], EMD = ZKD === 5 ? 6 : 5;
    for (const dg of [EMD, ZKD]) {
      await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, chSt, { durchgang: dg, fsView: 'one' }), chLogs]);
      const st = await page.evaluate(() => window.tpTest.steps().map(s => ({ id: s.id, t: s.title, w: s.desc })));
      const kr = st.find(s => s.id === 'kraft');
      assert.match(kr.t, dg === ZKD ? /Zirkel/ : /EMOM/, 'Format in Durchgang ' + dg);
      if (dg === ZKD) {
        { const w = await page.evaluate(() => { try { return window.tpTest.tagWarm(1); } catch (e) { return 'ERR ' + e.message; } }); assert.ok(w.includes('Lateral Hop'), 'Lateral Hop im Aufwärmen von A: ' + w); }
        await page.evaluate(() => window.tpTest.go(window.tpTest.steps().findIndex(s => s.id === 'kraft'))); await page.waitForTimeout(200);
        const ph = await page.evaluate(() => window.tpTest.phases());
        const n = ph.filter(p => p.m === 0 && !p.z).length;
        assert.equal(n, 1, 'jeder Platz einmal');
        assert.ok(ph.some(p => p.z && p.l === 'Pause'), 'Pause nach jeder Runde');
        assert.equal(ph.slice(1).reduce((a, p) => a + p.d, 0) <= ph.filter(p => !p.z && p.m != null).length * 60, true, 'nicht länger als das EMOM');
        await page.evaluate(() => window.tpTest.tmSet(15, true)); await page.waitForTimeout(150);
        assert.ok(await page.locator('#fs .fs-top [data-act="fs-view"]').isVisible(), 'Einzeln | Liste auch bei laufender Uhr');
        assert.match(await page.locator('#fs .fs-side').innerText(), /Runde 1 · Übung 1/);
        await page.evaluate(() => window.tpTest.tmStop());
        assert.equal(await page.locator('#fs .bdot').count(), 0, 'Bandstufe ohne Farbpunkt');
      }
    }
    console.log('PASS: Zirkel in einem zufälligen Durchgang je Abschnitt, sonst EMOM, Umschalter bei laufender Uhr, Band ohne Punkt');

    // Dennis, 6. November, aus dem Training: Stufe statt Grundübung, eine Ringhöhe für die Einheit, Zirkel vorher erkennbar, Strecke im Abschluss.
    {
      const r = await page.evaluate(() => window.tpTest.ev(`function () {
        var pk = function (ns) { return ringPick(ns.map(function (n, i) { return { i: i, r: ringRange(n) }; })); };
        var a = pk(['Ring Row', 'Ring Support Hold']), b = pk(['Ring Push-up', 'Ring Row']), c = pk(['Ring Pull-up', 'Ring Support Hold']);
        return { show: kShow('Ring Dip', 'Support Hold, 20 s'), band: kShow('Ring Dip', 'Normal'), knee: kShow('Push-up', 'Auf Knien'),
          a: [a.lv, a.m[0].t, a.m[1].t], b: [b.lv, b.m[0].own, b.m[1].own], c: [c.lv, c.m[0].own, c.m[0].t],
          km: finResHTML({ k: 'easy', min: 20, dev: { id: 'ergo', n: 'Ergometer' } }, {}).replace(/<[^>]+>/g, ' ') };
      }`));
      assert.equal(r.show, 'Ring Support Hold', 'Ring Dip auf „Support Hold“ zeigt die Übung der Stufe');
      assert.equal(r.band, 'Ring Dip', 'Bandstufe bleibt Ring Dip');
      assert.equal(r.knee, 'Knee Push-up');
      assert.equal(r.a[0], 4, 'Ring Row und Support: beide auf Brusthöhe');
      assert.match(r.a[2], /Brusthöhe · Knie anwinkeln, Beine in der Luft/);
      assert.ok(r.b[1] !== r.b[2], 'Push-up und Row passen nicht auf eine Höhe, eine muss umhängen: ' + r.b.join(' | '));
      assert.ok(r.c[1] === true && /frei hängst \(umhängen\)/.test(r.c[2]), 'Pull-up passt nicht zur Support-Höhe, die App sagt „umhängen“: ' + r.c.join(' | '));
      assert.ok(/Strecke/.test(r.km) && /Puls Ø/.test(r.km) && /Watt Ø/.test(r.km), 'Ergebnis im Abschluss: Strecke, Puls, Watt: ' + r.km);
      await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, chSt, { durchgang: ZKD, fsView: 'one' }), chLogs]);
      const kr = await page.evaluate(() => window.tpTest.steps().find(s => s.id === 'kraft').sub);
      assert.match(kr, /^Zirkel statt EMOM: je Übung \d+ s, dann Pause/, 'Zirkel steht vor dem Start im Ablauf: ' + kr);
    }
    console.log('PASS: Stufe statt Grundübung, eine Ringhöhe je Einheit, Zirkel vorher erkennbar, Ergebnis im Abschluss');

    // Dennis, 6. November: Form verloren (ein Knopf, Grund), Kraft plus statt Kardio bei erreichtem Wochenziel, Geräte im Wechsel, Metcon leichter.
    {
      await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, chSt, { durchgang: 5, fsView: 'one' }), chLogs]);
      const f = await page.evaluate(() => window.tpTest.ev(`function () {
        var L0 = LOGS, o = {}, key = 'g_dip';
        var mk = function (d, st, form, x) { return Object.assign({ id: 'f' + d, ts: 1, date: d, durchgang: 5, tag: 3, kind: 'kraft', pv: 2, kraft: [{ n: 'Ring Dip', stage: st, reps: [6, 6, 6, 6], goal: 6, form: form }] }, x || {}); };
        var run = function (L, fn) { LOGS = L0.concat(L); invalidateDerived(); FILL.k = null; var r = fn(); LOGS = L0; invalidateDerived(); FILL.k = null; return r; };
        o.one = run([mk('2026-10-05', 'Normal', null), mk('2026-10-08', 'Normal', ['k', null, null, null])], function () { var c = coachStage0(key); return [c.idx, c.form || '', !!c.formDown]; });
        o.two = run([mk('2026-10-05', 'Normal', ['k']), mk('2026-10-08', 'Normal', [null, 'k'])], function () { var c = coachStage0(key); return [c.idx, !!c.formDown, brakeNote('Ring Dip', c).replace(/<[^>]+>/g, '')]; });
        o.mob = run([mk('2026-10-12', 'Normal', ['b'])], function () { var m = formMob(S.tag); return m ? [m.id, m.mob] : null; });
        o.goal = [formGoal({ k0f0: 'k' }, 0, 1, 6, false), formGoal({ k0f0: 'k' }, 0, 0, 6, false), formGoal({ k0f1: 'k' }, 0, 2, 20, true)];
        o.fin0 = (finOf(6, 0) || {}).k;
        o.plus = run([mk('2026-10-12', 'Normal', null, { fin: { k: 'easy', dev: 'ergo', min: 55 } })], function () {
          var F = finOf(6, 0), st = stepsOf(dayCtx(6)).map(function (x) { return x.id + ':' + x.title; });
          return [F && F.k, cardioWkDone(), st.join(' | ')];
        });
        o.dev0 = finDev().id;
        o.dev2 = run([mk('2026-10-08', 'Normal', null, { fin: { k: 'easy', dev: finDev().id, min: 10 } }), mk('2026-10-09', 'Normal', null, { fin: { k: 'easy', dev: finDev().id, min: 10 } })], function () { return finDev().id; });
        o.mc = mcEasier(S.tag, { n: 'Burpee', r: '10' }, 0, {});
        // Vom Coach gestrichene Runden (müde Zone, im Eintrag null) zählen beim Umfang nicht als verfehlt.
        var uu = ['2026-10-01', '2026-10-03', '2026-10-05', '2026-10-07', '2026-10-09', '2026-10-11'].map(function (d) { return { id: 'u' + d, ts: 1, date: d, durchgang: 5, tag: 1, kind: 'kraft', pv: 2, unit: 'A',
          kraft: [{ n: 'Ring Dip', stage: 'Normal', reps: [6, 6, null, null], goal: 6, zcut: 'druck' }, { n: 'Ring Row', stage: 'Flacher', reps: [6, 6, 6, 5], goal: 6 }] }; });
        LOGS = uu; invalidateDerived(); var u0 = S.umfang; S.umfang = { u: 4, ts: 0 }; var g0 = umfGrow(); o.umf = g0 ? g0.u : null; S.umfang = u0; LOGS = L0; invalidateDerived(); FILL.k = null;
        return o;
      }`));
      assert.deepEqual(f.one, [3, 'k', false], 'einmal Form verloren: Stufe bleibt, kein Aufstieg');
      assert.equal(f.two[0], 2, 'zweimal Form verloren (Kraft): eine Stufe leichter'); assert.ok(f.two[1] && /zweimal die Form verloren/.test(f.two[2]), f.two[2]);
      assert.ok(f.mob && f.mob[1] === 'Ring Dip', 'Beweglichkeit fehlte: Ausgleich mit Mobility für das Muster: ' + JSON.stringify(f.mob));
      assert.deepEqual(f.goal, [5, 6, 15], 'nach Form verloren (Kraft) die restlichen Runden eine Wdh. bzw. 5 s weniger');
      assert.equal(f.plus[0], 'plus', 'Wochenziel fast erreicht: Kraft plus statt Kardio (' + f.plus[1] + ' Min)');
      assert.match(f.plus[2], /acc:Kraft plus/); assert.doesNotMatch(f.plus[2], /fin:/);
      assert.equal(f.dev0, 'ergo'); assert.equal(f.dev2, 'lauf', 'nach zwei Abschlüssen auf dem Ergometer wird zu Hause gelaufen');
      assert.ok(f.mc && f.mc.t && f.mc.how, 'Metcon: bei Form verloren sagt der Coach, was stattdessen');
      assert.equal(f.umf, 5, 'gestrichene Runden (Minute frei) bremsen den Umfang nicht');
    }
    console.log('PASS: Form verloren (Stufe bleibt, zweimal leichter, Mobility), Kraft plus ab 50 Min Kardio, Geräte im Wechsel, Metcon leichter');

    // Dennis, 2. November: Kardio am freien Tag, vom Coach vorbereitet, anpassbar (Laufen/Rad, Zeit/Strecke, Intervalle), läuft als Zusatz.
    {
      await page.clock.setFixedTime(new Date('2026-10-14T10:00:00+02:00'));
      const aLog = { id: 'kd-a', ts: Date.parse('2026-10-13T18:00:00+02:00'), date: '2026-10-13', durchgang: 6, tag: 1, pv: 2, unit: 'A', kind: 'kraft', name: 'Ganzkörper', kraft: [{ n: 'Push-up', stage: 'Push-up', reps: [5, 5, 5, 5] }] };
      await page.evaluate(a => window.tpTest.set(a[0], a[1]), [Object.assign({}, chSt, { durchgang: 6, tag: 3, tage: 2 }), chLogs.concat([aLog])]);
      await page.locator('[data-act="kd-open"]').click(); await page.waitForTimeout(200);
      assert.match(await page.locator('.kd-card').innerText(), /Vom Coach/);
      assert.match(await page.locator('.kd-card').innerText(), /locker/);
      await page.locator('[data-act="kd-set"][data-v="lauf"]').click();
      await page.locator('[data-act="kd-set"][data-v="iv"]').click();
      await page.locator('[data-act="kd-set"][data-v="3030"]').click();
      await page.locator('[data-act="kd-n"][data-d="1"]').click();
      assert.match(await page.locator('.kd-card').innerText(), /Angepasst/);
      assert.match(await page.locator('.kd-card h2').innerText(), /Laufen · 3 × 8 × 30\/30/);
      await page.locator('[data-act="kd-set"][data-v="easy"]').click();
      await page.locator('[data-act="kd-set"][data-v="km"]').click();
      await page.locator('[data-act="kd-n"][data-d="1"]').click();
      assert.match(await page.locator('.kd-card h2').innerText(), /5,5 km locker/);
      await page.locator('[data-act="kd-go"]').click(); await page.waitForTimeout(300);
      const z = await page.evaluate(() => window.tpTest.state().zusatz);
      assert.equal(z.c.km, 5.5); assert.equal(z.c.dev, 'lauf');
      assert.equal(await page.evaluate(() => window.tpTest.state().tag), 2);
      assert.match(await page.locator('#view').innerText(), /5,5 km locker/);
      const lg = await page.evaluate(() => window.tpTest.saveNow());
      assert.equal(lg.unit, 'Z');
      assert.notEqual(await page.evaluate(() => window.tpTest.state().tag), 2, 'danach zurück zur Woche');
    }
    console.log('PASS: Kardio am freien Tag: Vorschlag, Laufen/Rad, Intervalle, Strecke, Start als Zusatz, gespeichert mit Z');

    for (const width of [320, 390, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      for (const tab of ['heute', 'plan', 'woche', 'kalender', 'zusatz', 'kardio', 'fokus', 'uebungen', 'routinen', 'profil', 'einst', 'skill']) {
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
