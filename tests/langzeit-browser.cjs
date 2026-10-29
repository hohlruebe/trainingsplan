// Langzeit-Simulation (Prüfung 21. Oktober 2026): die echte App trainiert Tag für Tag über Monate, ausgewertet wird, was der Coach plant.
// Fängt Fehler, die einzelne Regeln nicht zeigen (Dauer-Kurzversion, Tausch bei voller Leistung, Leitern ohne Weiterkommen, Split-Kürzung).
// Optional (Playwright): node tests/langzeit-browser.cjs, TP_CHROMIUM kann auf einen lokalen Browser zeigen. Dauert einige Minuten.
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(require.resolve('playwright', { paths: [process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || process.cwd()] }));
let html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
// Zugriff nur im Test, nie in der App gespeichert.
html = html.replace('\napplyTheme();\nblockCheck();', `
window.tpSim = {
  start: (o) => {
    S = Object.assign({}, DEF, { tourSeen: 1, started: true, planV: 2, durchgang: 1, tag: 1, startDate: o.mon, blockStart: 1, umfang: { u: 4, ts: 0 }, planWk: o.mon,
      planStart: { date: o.mon, week: o.mon, tag: 1, mode: 'week' }, planAsk: o.mon, name: 'Sim', sex: 'm', weight: 80, birthYear: 1994, tage: o.tage || 3,
      vollbild: false, sound: false, haptik: false, feldTs: {}, tagSince: isoAdd(o.mon, -1), advBy: 'auto', orte: [{ id: 'o1', k: 'zuhause', on: true, eq: o.eq, fa: 1, lf: 1, zh: 1 }], ort: 'o1', morgen: {} });
    LOGS = []; DRAFTS = {}; window.SIMA = {}; ensureOrte(); DAYS_K = null; invalidateDerived(); render();
  },
  // Ein Kalendertag: trainiert, wenn der Plan heute eine Krafteinheit vorsieht. perf: top = jede Runde die Vorgabe, mix = mal eine weniger, mal mehr.
  day: (o) => {
    var today = isoToday(); S.morgen[today] = { h: 8, f: 4, ts: Date.now() };
    render();
    if (S.review) { ui.rv = 'weiter'; ACT['rv-go'](); }
    var P = wkPlanC(), pd = P.today >= 0 ? P.days[P.today] : null;
    if (!pd || !pd.tag || doneToday0()) return null;
    syncDays(); var tag = S.tag, d = DAYS[tag]; if (!d || d.type !== 'kraft') return null;
    var key = draftKey(tag), D = DRAFTS[key] = DRAFTS[key] || {}, rounds = kraftRounds(tag), info = [];
    if (o.rpe) D._rpe = String(o.rpe);
    d.kraft.forEach(function (x, i) {
      var E = kraftEx(tag, D, rounds, x, i), zr = E.zr != null ? E.zr : rounds;
      // real: Fähigkeit je Leiter wächst mit jedem Training; auf Stufe i schafft man, was die Fähigkeit hergibt, jede Runde etwas weniger.
      var lk = E.lad ? E.lad.key : x.n, rg = E.lad ? rangeOf(E.lad) : null, lo = rg ? rg.lo : 3, hi = rg ? rg.hi : 6, si = E.si >= 0 ? E.si + 1 : 1;
      if (window.SIMA[lk] == null) window.SIMA[lk] = 1.6;
      var cap = E.sec ? lo + (hi - lo + 15) * (window.SIMA[lk] - si) : lo + (hi - lo + 4) * (window.SIMA[lk] - si) - (E.tpo ? 2 : 0);
      for (var r = 0; r < zr; r++) { var h = (o.n * 7 + i * 3 + r) % 10, can = Math.max(0, Math.floor(cap - r * (E.sec ? 2 : 0.5)));
        D['k' + i + 'r' + r] = o.perf === 'mix' ? (h < 6 ? E.goal : h < 8 ? E.goal - 1 : E.goal + (E.sec ? 5 : 1)) : o.perf === 'real' ? (E.test && r === 0 ? can : Math.min(E.goal, can)) : E.goal; }
      if (o.perf === 'real') window.SIMA[lk] += 0.04;
      info.push({ n: x.n, lad: E.lad ? E.lad.key : null, si: E.si, stage: E.stage, goal: E.goal, done: [0, 1, 2, 3, 4, 5, 6].map(function (r) { return num(D['k' + i + 'r' + r]); }).filter(function (v) { return v != null; }), hi: hi, tpo: !!E.tpo, kid: E.kid || null, kg: E.K && E.K.rec ? E.K.rec.kg : null });
    });
    var F = finOf(tag, zeitLv(tag)), kurz = isKurz(tag);
    saveDay();
    var L = LOGS[LOGS.length - 1];
    return { day: today, unit: L.unit, dg: L.durchgang, kurz: kurz, k: info, fin: F ? { k: F.k, dev: F.dev ? F.dev.id : '', min: F.min } : null, aus: !!L.ausgleich };
  },
  end: () => ({ swapped: S.swapped || {}, umf: S.umfang && S.umfang.u }),
  // Daten: jede Gewichtsstufe einer Leiter hat eine Norm (sonst kein Startgewicht), keine Metcon-Leiter in einem Kraftplatz.
  check: () => {
    var noNorm = [], mc = [];
    Object.keys(LAD).forEach(function (k) { var L = LAD[k].lib; if (L) L.stufen.forEach(function (s) { if (UE[s.uebung] && UE[s.uebung].einheit === 'kg' && !RM_STD[s.uebung]) noNorm.push(k + ':' + s.uebung); }); });
    syncDays(); var F = planFill(); Object.keys(F.kraftKeys).forEach(function (k) { if (METCON_LAD(k)) mc.push(k); });
    return { noNorm: noNorm, mc: mc };
  }
};
applyTheme();
blockCheck();`);
const server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(html); });
const HOME = ['eq_zuhause', 'eq_ringe', 'eq_band', 'eq_fussanker'];
const LIB = JSON.parse(html.split('<script id="lib-data" type="application/json">')[1].split('</script>')[0]), GYM = LIB.equipment.map(e => e.id);

async function run(browser, o) {
  const page = await (await browser.newContext({ timezoneId: 'Europe/Berlin', serviceWorkers: 'block' })).newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const t0 = new Date(o.mon + 'T17:00:00+01:00');
  await page.clock.install({ time: t0 });
  await page.goto('http://127.0.0.1:' + server.address().port);
  await page.evaluate(a => window.tpSim.start(a), o);
  const out = [];
  for (let n = 0; n < o.weeks * 7; n++) {
    await page.clock.setSystemTime(new Date(t0.getTime() + n * 864e5));
    const r = await page.evaluate(a => window.tpSim.day(a), Object.assign({ n }, o)); if (r) out.push(r);
  }
  const end = await page.evaluate(() => window.tpSim.end());
  await page.context().close();
  assert.deepEqual(errors, [], 'keine JavaScript-Fehler');
  return { out, end };
}
const stageOf = (out, lad) => Math.max(0, ...out.flatMap(r => r.k.filter(k => k.lad === lad).map(k => k.si + 1)));

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch({ headless: true, ...(process.env.TP_CHROMIUM ? { executablePath: process.env.TP_CHROMIUM, args: ['--no-sandbox', '--disable-gpu'] } : {}) });
  try {
    // 1. Ehrliche Einschätzung 7 von 10 bei jeder Einheit: das ist normal, keine Dauer-Kurzversion, der Umfang wächst.
    let R = await run(browser, { mon: '2026-11-02', weeks: 8, eq: HOME, perf: 'mix', rpe: 7 });
    const kurz = R.out.filter(r => r.kurz).length;
    assert.ok(kurz <= 2, 'Einschätzung 7 macht keine Dauer-Kurzversion (' + kurz + ' von ' + R.out.length + ')');
    assert.ok(R.end.umf > 4, 'Umfang wächst');
    assert.ok(R.out.filter(r => r.dg >= 3 && r.dg !== 4 && r.dg !== 8).every(r => r.aus), 'Ausgleich wird ohne Antippen mit der Vorgabe gespeichert');
    console.log('PASS: Einschätzung 7 ist normal: ' + kurz + ' Kurzversionen in ' + R.out.length + ' Einheiten, Umfang ' + R.end.umf);

    // 2. Zu Hause, jede Runde geschafft, 26 Wochen: kein Tausch wegen Stillstand, Push-up überspringt Parallettes, Sackgasse steigert über Tempo,
    //    Gehen im Abschluss höchstens 20 Min, in der Testwoche keine neue Stufe.
    R = await run(browser, { mon: '2026-11-02', weeks: 26, eq: HOME, perf: 'top', rpe: 7 });
    const reiz = Object.values(R.end.swapped).filter(s => s.why === 'reiz');
    assert.deepEqual(reiz, [], 'bei voller Leistung kein Tausch wegen Stillstand');
    assert.ok(stageOf(R.out, 'g_push') >= 4, 'Push-up kommt zu Hause über „Boden“ hinaus (Parallettes übersprungen)');
    assert.ok(R.out.some(r => r.k.some(k => k.lad === 'g_push' && k.tpo)), 'oben ohne Weste: Tempo statt Warten');
    assert.ok(R.out.every(r => !r.fin || r.fin.dev !== 'geh' || r.fin.min <= 20), 'zügig gehen höchstens 20 Min');
    const test = R.out.filter(r => r.dg === 12), before = R.out.filter(r => r.dg === 11);
    test.forEach(t => t.k.forEach(k => { const b = before.find(x => x.unit === t.unit); const bk = b && b.k.find(y => y.lad === k.lad); if (bk && !k.tpo) assert.ok(k.si <= bk.si, 'Testwoche: keine neue Stufe (' + k.n + ')'); }));
    console.log('PASS: volle Leistung zu Hause: kein falscher Tausch, Push-up bis Stufe ' + stageOf(R.out, 'g_push') + ', Tempo in der Sackgasse, Gehen ≤ 20 Min');

    // 3. Split mit 5 Tagen im Gym: Pull nach Push wird nicht gekürzt, Gewichtsstufen bekommen ein Startgewicht.
    R = await run(browser, { mon: '2026-11-02', weeks: 4, eq: GYM, perf: 'top', rpe: 7, tage: 5 });
    assert.ok(R.out.filter(r => r.unit === 'Pl').length >= 3);
    assert.ok(R.out.filter(r => r.unit === 'Pl').every(r => !r.kurz), 'Pull-Tag im Split nicht gekürzt');
    const kgs = R.out.flatMap(r => r.k.filter(k => k.kid));
    assert.ok(kgs.length && kgs.every(k => k.kg > 0), 'jede Gewichtsstufe mit Startgewicht (Goblet Squat, Kettlebell Deadlift)');
    console.log('PASS: Split 5 Tage: Pull nach Push ohne Kurzversion, Gewichtsstufen mit Startgewicht');

    // 4. Realistischer Athlet (wird langsam stärker, Runden werden müde): Stufe nur, wenn die Vorgabe wirklich geschafft war (auch bei
    //    festen Vorgaben wie „10 pro Runde“ und Haltestufen wie „Support Hold, 20 s“), der Umfang wächst, keine Dauer-Kurzversion.
    R = await run(browser, { mon: '2026-11-02', weeks: 20, eq: HOME, perf: 'real', rpe: 7 });
    const byLad = {};
    R.out.forEach(r => r.k.forEach(k => { if (k.lad) (byLad[k.lad] = byLad[k.lad] || []).push(k); }));
    Object.keys(byLad).forEach(l => byLad[l].forEach((k, j, a) => {
      if (j < 2 || k.si <= a[j - 1].si || a[j - 1].si < 0) return;
      // Aufstieg nach der Einstufung: die zwei Einheiten davor hatten alle Runden auf dem oberen Ende (bzw. Maxout).
      const ok = [a[j - 1], a[j - 2]].every(p => p.si === a[j - 1].si && p.done.length && Math.min(...p.done) >= p.goal) || a[j - 1].done[0] >= a[j - 1].hi + 3
        || (j === 2 && Math.min(...a[1].done) >= a[1].goal); // Einstufung: in den ersten 2 Einheiten reicht einmal alles oben
      assert.ok(ok, 'Stufe hoch nur nach geschaffter Vorgabe: ' + l + ' ' + JSON.stringify(a.slice(j - 2, j + 1).map(p => [p.si, p.goal, p.done])));
    }));
    assert.ok(R.end.umf >= 6, 'Umfang wächst auch mit echter Leistung (' + R.end.umf + ')');
    assert.ok(R.out.filter(r => r.kurz).length <= 3, 'keine Dauer-Kurzversion');
    console.log('PASS: realistischer Athlet: Stufen erst nach geschaffter Vorgabe, Umfang ' + R.end.umf);

    // 5. Daten: Normen für jede Gewichtsstufe, keine Metcon-Leiter im Kraftteil.
    const pg = await (await browser.newContext({ serviceWorkers: 'block' })).newPage();
    await pg.goto('http://127.0.0.1:' + server.address().port);
    await pg.evaluate(o => window.tpSim.start(o), { mon: '2026-11-02', eq: GYM });
    const C = await pg.evaluate(() => window.tpSim.check());
    assert.deepEqual(C.noNorm, [], 'Gewichtsstufen ohne Norm'); assert.deepEqual(C.mc, [], 'Metcon-Leiter im Kraftteil');
    console.log('PASS: jede Gewichtsstufe hat eine Norm, keine Metcon-Leiter im Kraftteil');
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); process.exit(1); });
