/* Maskottchen-Vorlage „B3-2 · V-Form“ (von Dennis festgelegt am 3. Oktober 2026).
   Einzige Zeichenfunktion für alle Übungsgrafiken: Entwürfe im Canvas und später die App
   nutzen genau diesen Code, damit jede Animation gleich aussieht. Stil nicht ändern,
   ohne Dennis zu fragen. Beschreibung und Regeln: VORLAGE.md */
(function (root) {
  'use strict';

  // ---- Feste Werte des Stils ----
  var STYLE = {
    ink: '#34327E',      // vordere Seite
    far: '#A8A7CC',      // hintere Seite (in der Drehung)
    action: '#E8963A',   // Line of Action
    floor: '#DADAD3',
    joint: '#FFFFFF',    // Füllung der Gelenkkreise
    panel: '#FFFFFF',    // Fläche hinter der Figur (in der App `--fig`)
    passes: 3,           // Skizzenstriche je Form
    sw: 1.1,             // Hauptstrich
    jit: 1.4,            // Versatz der Nebenstriche (px)
    boilStep: 2,         // alle 2 Bilder neue Nebenstriche („lebendige Striche“)
    loa: 4,              // Breite der Line of Action
    shoulder: { sh: 7, el: 7.5, wr: 7, ha: 7 },  // V-Form: Schultern und Arme so weit nach außen (px)
    ribW: 33, ribD: 26, ribH: 42,  // Brustkorb: Breite, Tiefe, halbe Höhe
    pelW: 26, pelD: 23, pelH: 19,  // Becken
    waist: .55,          // Taille schmal
    fps: 12              // Bilder pro Sekunde in der App
  };

  // Farbsätze: hell ist der Standard (STYLE).
  // Dunkel = „Kreide auf Dunkel“ (D1, von Dennis gewählt): helle Striche auf einer Fläche knapp heller als die Karte.
  var PALETTES = { dark: { ink: '#E4E3F7', far: '#6D6B9C', action: '#F0A04B', floor: '#4A4B52', joint: '#2A2B30', panel: '#33343A' } };

  // ---- Grundhaltung: 3D-Gelenke (x rechts, y unten, z zum Betrachter), a = linke Bildseite von vorn ----
  var STAND = {
    nb: [0, 96, 2], hc: [0, 58, 7], pc: [0, 222, -4],
    sha: [-31, 110, -2], shb: [31, 110, -2], ela: [-39, 166, -6], elb: [38, 166, -3],
    wra: [-41, 220, 6], wrb: [40, 218, 9], haa: [-42, 244, 10], hab: [41, 242, 13],
    hia: [-18, 228, -4], hib: [18, 228, -4], kna: [-19, 308, 3], knb: [22, 306, 10],
    ana: [-20, 390, -3], anb: [24, 388, 2], toa: [-22, 397, 22], tob: [27, 395, 26]
  };
  var FLOOR_Y = 401;

  // ---- Helfer ----
  var R = Math.PI / 180;
  function n1(v) { return (Math.round(v * 10) / 10).toString(); }
  function dist(a, b) { return Math.hypot(b[0] - a[0], b[1] - a[1]); }
  function ang(a, b) { return Math.atan2(b[1] - a[1], b[0] - a[0]) / R; }
  function loc(c, a, p) {
    var r = a * R;
    return [c[0] + p[0] * Math.cos(r) - p[1] * Math.sin(r), c[1] + p[0] * Math.sin(r) + p[1] * Math.cos(r)];
  }
  function sub3(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function rng(seed) { // mulberry32, damit die Striche bei gleichem Bild gleich bleiben
    var t = seed >>> 0;
    return function () {
      t = (t + 0x6D2B79F5) >>> 0; var x = t;
      x = Math.imul(x ^ (x >>> 15), x | 1); x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }
  function mer(rx, ry, f) { // Mittellinie auf einem Oval, f = Drehung (-1 … 1)
    if (Math.abs(f) < .04) return 'M0 ' + n1(-ry) + ' L0 ' + n1(ry);
    return 'M0 ' + n1(-ry) + ' A' + n1(Math.abs(f) * rx) + ' ' + n1(ry) + ' 0 0 ' + (f > 0 ? 1 : 0) + ' 0 ' + n1(ry);
  }
  function equ(rx, ry, y, b) { // Querlinie
    var w = rx * Math.sqrt(Math.max(0, 1 - y * y));
    return 'M' + n1(-w) + ' ' + n1(y * ry) + ' Q0 ' + n1(y * ry + b * ry * 2) + ' ' + n1(w) + ' ' + n1(y * ry);
  }
  function egg(rx, ry) {
    var t = 1.25, b = .8;
    return '<path fill="none" d="M0 ' + n1(-ry) + ' C' + n1(rx * t * 1.1) + ' ' + n1(-ry) + ' ' + n1(rx * b * 1.25) + ' ' + n1(ry * .95) +
      ' 0 ' + n1(ry) + ' C' + n1(-rx * b * 1.25) + ' ' + n1(ry * .95) + ' ' + n1(-rx * t * 1.1) + ' ' + n1(-ry) + ' 0 ' + n1(-ry) + ' Z"/>';
  }
  function smooth(P) {
    var s = 'M' + n1(P[0][0]) + ' ' + n1(P[0][1]);
    for (var i = 1; i < P.length; i++) {
      var p0 = P[Math.max(i - 2, 0)], p1 = P[i - 1], p2 = P[i], p3 = P[Math.min(i + 1, P.length - 1)];
      s += ' C' + n1(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + n1(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
        n1(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + n1(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + n1(p2[0]) + ' ' + n1(p2[1]);
    }
    return s;
  }

  /* Zeichnet die Figur.
     J: Gelenke in 3D (wie STAND), yaw: Drehung um die Hochachse in Grad (0 = von vorn, 90 = schaut nach rechts),
     frame: Bildnummer (für die lebendigen Striche), opt.floor: Bodenlinie zeichnen (Standard ja).
     Gibt {svg: Inhalt ohne <svg>, ext: alle Punkte für den Bildausschnitt} zurück. */
  function figure(J, yaw, frame, opt) {
    opt = opt || {};
    var st = opt.pal ? Object.assign({}, STYLE, opt.pal) : STYLE, INK = st.ink;
    var c = Math.cos(yaw * R), s = Math.sin(yaw * R), f = s;
    // Kamera von schräg oben (opt.tilt in Grad, 0 = genau von der Seite): Näheres rutscht nach unten, der Boden wird zur Fläche.
    var tc = Math.cos((opt.tilt || 0) * R), ts = Math.sin((opt.tilt || 0) * R);
    function prj(v) { return [160 + v[0] * c + v[2] * s, FLOOR_Y + (v[1] - FLOOR_Y) * tc + (-v[0] * s + v[2] * c) * ts]; }
    var boil = Math.floor((frame || 0) / st.boilStep) * 1009;
    // V-Form: Schultern und Arme nach außen
    var K = {}, k;
    for (k in J) if (k.charAt(0) !== '_') K[k] = J[k].slice();
    var props = J._props || [];
    [['a', -1], ['b', 1]].forEach(function (q) {
      for (var j in st.shoulder) K[j + q[0]][0] += q[1] * st.shoulder[j];
    });
    var P = {}, Z = {}, ext = [];
    for (k in K) { var v = K[k]; P[k] = prj(v); Z[k] = -v[0] * s + v[2] * c; ext.push(P[k]); }
    var near = (Z.sha + Z.hia >= Z.shb + Z.hib) ? 'a' : 'b', farr = near === 'a' ? 'b' : 'a';
    var side = Math.abs(s) > .35;
    var count = 0;
    function S(shape, col) { // Skizzenstrich: Hauptlinie und zwei leicht versetzte Nebenlinien
      count++;
      var r = rng(count * 7 + boil), out = '';
      for (var i = 0; i < st.passes; i++) {
        var tr = '';
        if (i > 0) tr = ' transform="translate(' + n1((r() * 2 - 1) * st.jit) + ' ' + n1((r() * 2 - 1) * st.jit) + ') rotate(' + n1((r() * 2 - 1) * .8) + ')"';
        out += '<g stroke-width="' + (i === 0 ? st.sw : st.sw * .6) + '" opacity="' + (i === 0 ? 1 : .5) + '"' + tr + '>' + shape + '</g>';
      }
      return '<g fill="none" stroke="' + col + '" stroke-linecap="round" stroke-linejoin="round">' + out + '</g>';
    }
    function segm(a, b, wd, col, ext_) { // Glied: verjüngt zum Gelenk hin (ab 6 px Breite), sonst Oval
      var L = dist(a, b), cx = (a[0] + b[0]) / 2, cy = (a[1] + b[1]) / 2;
      if (wd > 6 && L > wd) {
        var h = L / 2 * (1 + ext_), w1 = wd * 1.12, w2 = wd * .62, m = (w1 + w2) / 2;
        var d = 'M' + n1(-h) + ' 0 C' + n1(-h) + ' ' + n1(-w1 * .9) + ' ' + n1(-h * .5) + ' ' + n1(-w1) + ' 0 ' + n1(-m) +
          ' C' + n1(h * .5) + ' ' + n1(-w2) + ' ' + n1(h) + ' ' + n1(-w2 * .8) + ' ' + n1(h) + ' 0' +
          ' C' + n1(h) + ' ' + n1(w2 * .8) + ' ' + n1(h * .5) + ' ' + n1(w2) + ' 0 ' + n1(m) +
          ' C' + n1(-h * .5) + ' ' + n1(w1) + ' ' + n1(-h) + ' ' + n1(w1 * .9) + ' ' + n1(-h) + ' 0 Z';
        return S('<path d="' + d + '" transform="translate(' + n1(cx) + ' ' + n1(cy) + ') rotate(' + n1(ang(a, b)) + ')"/>', col);
      }
      return S('<ellipse rx="' + n1(Math.max(L / 2 * (1 + ext_), wd)) + '" ry="' + n1(wd) + '" transform="translate(' + n1(cx) + ' ' + n1(cy) +
        ') rotate(' + n1(L > .5 ? ang(a, b) : 0) + ')"/>', col);
    }
    function jnt(p, r, col) {
      return '<circle cx="' + n1(p[0]) + '" cy="' + n1(p[1]) + '" r="' + r + '" fill="' + st.joint + '" stroke="' + col + '" stroke-width="1.3"/>';
    }
    function limbs(sd, col) {
      var g = segm(P['hi' + sd], P['kn' + sd], 11, col, .1) + segm(P['kn' + sd], P['an' + sd], 8.5, col, .1) + segm(P['an' + sd], P['to' + sd], 5, col, .25);
      g += segm(P['sh' + sd], P['el' + sd], 8, col, .1) + segm(P['el' + sd], P['wr' + sd], 6.5, col, .1);
      // Schulterkappe
      g += S('<ellipse rx="11" ry="8.5" transform="translate(' + n1(P['sh' + sd][0]) + ' ' + n1(P['sh' + sd][1]) + ') rotate(' +
        n1(ang(P['sh' + sd], P['el' + sd])) + ') translate(5 0)"/>', col);
      g += segm(P['wr' + sd], P['ha' + sd], 4.6, col, .2);
      [['hi', 5.5], ['kn', 5.2], ['an', 4], ['sh', 5.5], ['el', 4.5], ['wr', 3.4]].forEach(function (q) { g += jnt(P[q[0] + sd], q[1], col); });
      return g;
    }
    function pr(p) { return prj(p); }
    function prop(o) { // Geräte im selben Skizzenstrich
      var col = o.col === STYLE.far ? st.far : o.col || INK, sh = '';
      if (o.type === 'line') { var a = pr(o.a), b = pr(o.b); sh = '<path d="M' + n1(a[0]) + ' ' + n1(a[1]) + ' L' + n1(b[0]) + ' ' + n1(b[1]) + '"' + (o.w ? ' stroke-width="' + o.w + '"' : '') + '/>'; }
      else if (o.type === 'poly') { sh = '<path d="M' + o.pts.map(function (p) { p = pr(p); return n1(p[0]) + ' ' + n1(p[1]); }).join(' L') + (o.open ? '' : ' Z') + '"/>'; }
      else if (o.type === 'circle') { // Kreis in der y-z-Ebene (Ring, Rad, Rolle)
        var m = pr(o.c), rx = Math.max(o.r * Math.abs(s), o.r * .3);
        sh = '<ellipse cx="' + n1(m[0]) + '" cy="' + n1(m[1]) + '" rx="' + n1(rx) + '" ry="' + o.r + '"/>';
        if (o.hub) sh += '<ellipse cx="' + n1(m[0]) + '" cy="' + n1(m[1]) + '" rx="' + n1(rx * .3) + '" ry="' + n1(o.r * .3) + '"/>';
      }
      if (o.keep) (o.type === 'circle' ? [o.c] : o.type === 'line' ? [o.a, o.b] : o.pts).forEach(function (p) { ext.push(pr(p)); });
      return S(sh, col);
    }
    function layer(l) { return props.filter(function (o) { return (o.layer || 'back') === l; }).map(prop).join(''); }
    var g = opt.floor === false ? '' : opt.tilt ? '' : '<line x1="-400" x2="720" y1="' + FLOOR_Y + '" y2="' + FLOOR_Y + '" stroke="' + st.floor + '" stroke-width="2" stroke-linecap="round"/>';
    if (opt.mat) { // Matte am Boden (bei Kamera von oben statt der Bodenlinie)
      var mt = opt.mat, mp = [[mt[0], FLOOR_Y, mt[2]], [mt[1], FLOOR_Y, mt[2]], [mt[1], FLOOR_Y, mt[3]], [mt[0], FLOOR_Y, mt[3]]].map(prj);
      g += '<path d="M' + mp.map(function (q) { return n1(q[0]) + ' ' + n1(q[1]); }).join(' L') + ' Z" fill="' + st.floor + '" fill-opacity=".35" stroke="' + st.floor + '" stroke-width="2" stroke-linejoin="round"/>';
      mp.forEach(function (q) { ext.push(q); });
    }
    var fc = side ? st.far : INK;
    g += layer('back');
    g += limbs(farr, fc);
    // Rumpf: Winkel und Verkürzung aus der Wirbelsäule
    var sp = sub3(K.nb, K.pc), L3 = Math.hypot(sp[0], sp[1], sp[2]) || 1;
    var dx = P.nb[0] - P.pc[0], dy = P.nb[1] - P.pc[1], th = Math.atan2(dx, -dy) / R, ratio = Math.max(.55, Math.hypot(dx, dy) / L3);
    var RX = Math.hypot(st.ribW * c, st.ribD * s), RY = st.ribH * ratio, PX = Math.hypot(st.pelW * c, st.pelD * s);
    var nb = P.nb, rc = loc(nb, th, [0, RY]), pc = P.pc;
    var hth = Math.atan2(P.hc[0] - P.nb[0], -(P.hc[1] - P.nb[1])) / R;
    var hb = loc(P.hc, hth, [0, 18]);
    var a1 = loc(hb, hth, [-6, 0]), a2 = loc(nb, th, [-7, 4]), b1 = loc(hb, hth, [6, 0]), b2 = loc(nb, th, [7, 4]);
    g += S('<path d="M' + n1(a1[0]) + ' ' + n1(a1[1]) + ' L' + n1(a2[0]) + ' ' + n1(a2[1]) + ' M' + n1(b1[0]) + ' ' + n1(b1[1]) + ' L' + n1(b2[0]) + ' ' + n1(b2[1]) + '"/>', INK);
    var wl = [loc(rc, th, [-RX * .8, RY * .55]), loc(rc, th, [-RX * st.waist, RY * 1.15]), loc(pc, th, [-PX * .85, -8])];
    var wr = [loc(rc, th, [RX * .8, RY * .55]), loc(rc, th, [RX * st.waist, RY * 1.15]), loc(pc, th, [PX * .85, -8])];
    function q3(w) { return 'M' + n1(w[0][0]) + ' ' + n1(w[0][1]) + ' Q' + n1(w[1][0]) + ' ' + n1(w[1][1]) + ' ' + n1(w[2][0]) + ' ' + n1(w[2][1]); }
    g += S('<path d="' + q3(wl) + ' ' + q3(wr) + '"/>', INK);
    var mf = c > -.2 ? f * .9 : -f * .9;
    var pel = '<ellipse rx="' + n1(PX) + '" ry="' + st.pelH + '"/><path d="' + mer(PX, st.pelH, mf) + '"/><path d="' + equ(PX, st.pelH, -.1, .12) + '" opacity=".7"/>';
    g += '<g transform="translate(' + n1(pc[0]) + ' ' + n1(pc[1]) + ') rotate(' + n1(th) + ')">' + S(pel, INK) + '</g>';
    var rib = egg(RX, RY) + '<path d="' + mer(RX * .95, RY, mf) + '"/>';
    [[-.3, .07], [.42, .12]].forEach(function (q) { rib += '<path d="' + equ(RX * 1.02, RY, q[0], q[1]) + '" opacity=".7"/>'; });
    g += '<g transform="translate(' + n1(rc[0]) + ' ' + n1(rc[1]) + ') rotate(' + n1(th) + ')">' + S(rib, INK) + '</g>';
    // Kopf: Augen, Nase und Mund nur, wenn das Gesicht zum Betrachter zeigt
    var hx = Math.hypot(15.5 * c, 18.5 * s), hy = 20;
    var hd = '<path d="M0 ' + (-hy) + ' C' + n1(hx * 1.35) + ' ' + (-hy) + ' ' + n1(hx * 1.1) + ' ' + n1(hy * .9) + ' 0 ' + hy +
      ' C' + n1(-hx * 1.1) + ' ' + n1(hy * .9) + ' ' + n1(-hx * 1.35) + ' ' + (-hy) + ' 0 ' + (-hy) + ' Z"/>';
    hd += '<path d="' + mer(hx, hy, c > -.2 ? f * .95 : -f * .95) + '"/><path d="' + equ(hx, hy, .05, .06) + '"/>';
    [-.55, .55].forEach(function (e) {
      var a = yaw * R + e;
      if (Math.cos(a) > .15) hd += '<path d="M' + n1(Math.sin(a) * hx * 1.05 - 2.5) + ' -1 q2.5 -2.6 5 0"/>';
    });
    if (c > -.2) {
      var nx = f * hx * 1.02, sx = f >= 0 ? 1 : -1, nl = 1 + 4 * Math.abs(f);
      hd += '<path d="M' + n1(nx) + ' 1 l' + n1(sx * nl) + ' 6 l' + n1(-sx * nl) + ' 2"/>';
      if (c > .4) hd += '<path d="M' + n1(nx - 3) + ' 12 q3 1.5 6 0"/>';
    }
    g += '<g transform="translate(' + n1(P.hc[0]) + ' ' + n1(P.hc[1]) + ') rotate(' + n1(hth) + ')">' + S(hd, INK) + '</g>';
    var top = loc(P.hc, hth, [c > -.2 ? f * 4 : 0, -22]); ext.push(top);
    g += '<path d="' + smooth([top, nb, rc, pc, P.kna, P.ana]) + '" fill="none" stroke="' + st.action + '" stroke-width="' + st.loa + '" stroke-linecap="round" opacity=".85"/>';
    g += layer('mid');
    g += limbs(near, INK);
    g += layer('front');
    return { svg: g, ext: ext };
  }

  /* Bildausschnitt über alle Bilder einer Bewegung, damit nie etwas abgeschnitten wird. */
  function fitBox(exts, floor, margin) {
    margin = margin == null ? 26 : margin;
    var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    exts.forEach(function (e) { e.forEach(function (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }); });
    x0 -= margin; x1 += margin; y0 -= margin; y1 = floor === false ? y1 + margin : FLOOR_Y + 9;
    return [Math.round(x0), Math.round(y0), Math.round(x1 - x0), Math.round(y1 - y0)];
  }

  /* Eine Übung = Funktion pose(p) mit p von 0 bis 1 über eine Wiederholung, liefert 3D-Gelenke.
     ex = {pose, yaw, dur (s)}. Liefert alle Bilder und den gemeinsamen Ausschnitt. */
  function frames(ex, pal) {
    var n = Math.round(ex.dur * STYLE.fps), list = [], exts = [], P = pal ? PALETTES[pal] || pal : null;
    for (var i = 0; i < n; i++) { var r = figure(ex.pose(i / n), ex.yaw, i, { floor: ex.floor, pal: P, tilt: ex.tilt, mat: ex.mat }); list.push(r.svg); exts.push(r.ext); }
    return { frames: list, box: fitBox(exts, ex.tilt ? false : ex.floor), n: n, dur: ex.dur };
  }

  /* Für Entwürfe: eine SVG-Datei mit SMIL-Animation (läuft ohne Skript). */
  function animatedSVG(ex, w, h, pal) {
    var F = frames(ex, pal), N = F.n, out = '';
    F.frames.forEach(function (svg, i) {
      var vals, kt;
      if (i === 0) { vals = '1;0'; kt = '0;' + (1 / N).toFixed(4); }
      else if (i === N - 1) { vals = '0;1'; kt = '0;' + (i / N).toFixed(4); }
      else { vals = '0;1;0'; kt = '0;' + (i / N).toFixed(4) + ';' + ((i + 1) / N).toFixed(4); }
      out += '<g opacity="' + (i ? 0 : 1) + '"><animate attributeName="opacity" calcMode="discrete" values="' + vals + '" keyTimes="' + kt + '" dur="' + F.dur + 's" repeatCount="indefinite"/>' + svg + '</g>';
    });
    return '<svg viewBox="' + F.box.join(' ') + '" width="' + w + '" height="' + h + '" preserveAspectRatio="xMidYMid meet">' + out + '</svg>';
  }

  /* Für die App: zeichnet live in ein Element, Bild für Bild. Gibt eine Stopp-Funktion zurück.
     Hört von selbst auf, wenn das Element nicht mehr auf der Seite ist. Bei „Bewegung reduzieren“ nur ein Standbild. */
  function play(el, ex, pal) {
    var C = ex._F || (ex._F = {}), F = C[pal || 'light'] || (C[pal || 'light'] = frames(ex, pal)), i = 0, stop = false, last = 0;
    el.innerHTML = '<svg viewBox="' + F.box.join(' ') + '" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + (ex.name || '') + '"></svg>';
    var svg = el.firstChild;
    svg.innerHTML = F.frames[0];
    if (root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches) return function () {};
    function tick(t) {
      if (stop || !el.isConnected) return;
      if (t - last >= 1000 / STYLE.fps) { last = t; svg.innerHTML = F.frames[i]; i = (i + 1) % F.n; }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    return function () { stop = true; };
  }

  // ---- Baukasten für Posen ----
  // Vektoren
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function len(a) { return Math.hypot(a[0], a[1], a[2]); }
  function norm(a) { var l = len(a) || 1; return mul(a, 1 / l); }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function lerp(a, b, t) { return typeof a === 'number' ? a + (b - a) * t : [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  // Zwei Glieder (Oberschenkel/Unterschenkel, Oberarm/Unterarm) mit festen Längen zum Ziel; pole = Richtung, in die das Gelenk zeigt.
  // Ist das Ziel bis 12 px weiter als das gestreckte Glied, wird es minimal gedehnt: Hand bzw. Fuß bleibt am Kontaktpunkt
  // (Boden, Ring, Gerät), das Gelenk ganz gestreckt. Die Dehnung sieht man nicht, eine schwebende Hand schon.
  function ik3(root, target, l1, l2, pole) {
    var d = sub3(target, root), T = len(d), dir = norm(d);
    if (T >= l1 + l2 && T <= l1 + l2 + 12) return [add(root, mul(dir, T * l1 / (l1 + l2))), target.slice()];
    var D = Math.min(T, l1 + l2 - .01);
    var b = norm(sub3(pole, mul(dir, dot(pole, dir))));
    var a = (l1 * l1 + D * D - l2 * l2) / (2 * D), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
    return [add(add(root, mul(dir, a)), mul(b, h)), add(root, mul(dir, D))];
  }
  var LEN = { thigh: 80, shin: 82, upper: 56, fore: 54, hand: 24, foot: 24, spine: 126 };
  /* Ganze Figur aus wenigen Angaben:
     pc = Beckenmitte, a = Rumpfwinkel (0 aufrecht, 90 bäuchlings mit Kopf nach vorn, -90 rücklings, 180 kopfüber),
     nod = Kopf zur Brust (Grad), arms/legs je Seite {to: Ziel für Handgelenk/Knöchel, pole, dir: Richtung Hand/Fuß}. */
  function build(o) {
    var a = o.a * R, u = [0, -Math.cos(a), Math.sin(a)], fw = [0, Math.sin(a), Math.cos(a)], r = [1, 0, 0];
    var pc = o.pc, J = { pc: pc.slice() };
    J.nb = add(add(pc, mul(u, LEN.spine)), mul(fw, 6));
    var n = (o.nod || 0) * R, hd = norm(add(mul(u, Math.cos(n)), mul(fw, Math.sin(n))));
    J.hc = o.hc || add(add(J.nb, mul(hd, 37)), mul(fw, 5));
    [['a', -1], ['b', 1]].forEach(function (q) {
      var sd = q[0], x = q[1], A = o.arms[sd], L = o.legs[sd];
      var sh = add(add(add(pc, mul(u, 112)), mul(r, 31 * x)), mul(fw, -2));
      var hi = add(add(pc, mul(u, -6)), mul(r, 18 * x));
      var ar = ik3(sh, A.to, LEN.upper, LEN.fore, A.pole), lg = ik3(hi, L.to, LEN.thigh, LEN.shin, L.pole);
      J['sh' + sd] = sh; J['el' + sd] = ar[0]; J['wr' + sd] = ar[1];
      J['ha' + sd] = add(ar[1], mul(norm(A.dir || sub3(ar[1], ar[0])), LEN.hand));
      J['hi' + sd] = hi; J['kn' + sd] = lg[0]; J['an' + sd] = lg[1];
      J['to' + sd] = add(lg[1], mul(norm(L.dir || [0, .28, 1]), LEN.foot)); // Fuß flach nach vorn, auch wenn sich der Rumpf neigt
    });
    J._props = o.props || [];
    J._to = { wra: o.arms.a.to, wrb: o.arms.b.to, ana: o.legs.a.to, anb: o.legs.b.to }; // Ziele, zum Nachmessen der Kontaktpunkte
    return J;
  }
  function side(x, v) { return [v[0] * x, v[1], v[2]]; } // Wert für Seite a (x=-1) oder b (x=1)
  function both(f) { return { a: f(-1), b: f(1) }; }
  // Ablauf einer Wiederholung: runter, unten halten, hoch, oben halten → 0…1…0
  function rep(p, down, hold) {
    down = down || .42; hold = hold || .08;
    if (p < down) return ease(p / down);
    if (p < down + hold) return 1;
    if (p < 2 * down + hold) return 1 - ease((p - down - hold) / down);
    return 0;
  }
  function sway(p, amp) { return Math.sin(p * 2 * Math.PI) * amp; } // für Halteübungen
  function ease(x) { return .5 - .5 * Math.cos(Math.PI * x); }
  function ik2(h, a, l1, l2) { // alte Hilfe für den Air Squat
    var dy = a[1] - h[1], dz = a[2] - h[2], D = Math.min(Math.hypot(dy, dz), l1 + l2 - .01);
    var base = Math.atan2(dz, dy), k = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + D * D - l2 * l2) / (2 * l1 * D))));
    var t = base + k;
    return [h[0] + (a[0] - h[0]) * .4, h[1] + l1 * Math.cos(t), h[2] + l1 * Math.sin(t)];
  }
  // Geräte
  function rings(x, y, z, top) {
    return [-1, 1].reduce(function (l, s) {
      return l.concat([{ type: 'line', a: [s * x, top, z], b: [s * x, y - 12, z] }, { type: 'circle', c: [s * x, y, z], r: 11, layer: 'mid', keep: true }]);
    }, []);
  }
  function bench(z0, z1, y, w) {
    return [{ type: 'poly', pts: [[-w, y, z0], [w, y, z0], [w, y, z1], [-w, y, z1]], keep: true },
      { type: 'poly', pts: [[-w, y, z0], [-w, y + 8, z0], [w, y + 8, z0], [w, y, z0]], open: true },
      { type: 'line', a: [-w + 6, y + 8, z0 + 6], b: [-w + 6, FLOOR_Y, z0 + 6] }, { type: 'line', a: [w - 6, y + 8, z0 + 6], b: [w - 6, FLOOR_Y, z0 + 6] },
      { type: 'line', a: [-w + 6, y + 8, z1 - 6], b: [-w + 6, FLOOR_Y, z1 - 6] }, { type: 'line', a: [w - 6, y + 8, z1 - 6], b: [w - 6, FLOOR_Y, z1 - 6] }];
  }

  function wall(z) { // Wand von der Seite: Linie mit Schraffur dahinter
    var l = [{ type: 'line', a: [0, -60, z], b: [0, FLOOR_Y, z] }];
    for (var y = -40; y < FLOOR_Y; y += 34) l.push({ type: 'line', a: [0, y, z], b: [0, y + 14, z - 12], col: STYLE.far });
    return l;
  }

  // Platzhalter: winkt, solange eine Übung noch keine eigene Animation hat.
  function wave(p) {
    var J = {}, k; for (k in STAND) J[k] = STAND[k].slice();
    var sh = J.shb, u = 128 * R, f = (180 + Math.sin(p * 4 * Math.PI) * 24) * R;
    var el = [sh[0] + 56 * Math.sin(u), sh[1] + 56 * Math.cos(u), sh[2] + 4];
    var wr = [el[0] + 54 * Math.sin(f), el[1] + 54 * Math.cos(f), el[2] + 2];
    J.elb = el; J.wrb = wr; J.hab = [wr[0] + 24 * Math.sin(f), wr[1] + 24 * Math.cos(f), wr[2]];
    J.hc = [J.hc[0] + 3, J.hc[1], J.hc[2]];
    return J;
  }

  // ---- Übungen (Schlüssel = ID in der Übungsbibliothek) ----
  function air(t) { // Air Squat
    var J = {}, k; for (k in STAND) J[k] = STAND[k].slice();
    var pc = [0, 222 + 100 * t, -4 - 46 * t]; J.pc = pc; // unten: Hüfte unter Kniehöhe (below parallel)
    var lean = 44 * t * R;
    function up(d, dx, ex) { return [dx, pc[1] - d * Math.cos(lean), pc[2] + d * Math.sin(lean) + ex]; }
    J.nb = up(126, 0, 2); var hc = up(164, 0, 7 - 4 * t); J.hc = [0, hc[1] + 6 * t, hc[2] - 10 * t];
    [['a', -1], ['b', 1]].forEach(function (q) {
      var sd = q[0], x = q[1], sh = up(112, 31 * x, -2); J['sh' + sd] = sh;
      var b = (4 + 86 * t) * R;
      function arm(L) { return [sh[0] + x * (2 - 2 * t) * L / 56, sh[1] + L * Math.cos(b), sh[2] + L * Math.sin(b)]; }
      J['el' + sd] = arm(56); J['wr' + sd] = arm(110); J['ha' + sd] = arm(134);
      var hi = [18 * x + 2 * x * t, pc[1] + 6, pc[2]]; J['hi' + sd] = hi;
      var an = [21 * x, 390, -1]; J['an' + sd] = an; J['to' + sd] = [26 * x, 397, 24];
      var kn = ik2(hi, an, 80, 82); kn[0] += x * 8 * t; J['kn' + sd] = kn;
    });
    return J;
  }
  function hang(p, chin) { // Ring Pull-up und Ring Chin-up
    var t = rep(p, .4, .1), RY = 22, gx = chin ? 22 : 28;
    var pc = [0, lerp(266, 149, t), lerp(13.7, 6, t)], a = lerp(-6, -12, t); // unten toter Hang: Arme ganz gestreckt
    return build({ pc: pc, a: a, nod: lerp(0, -10, t),
      arms: both(function (x) { return { to: [x * gx, RY + 20, 0], pole: [x * (chin ? .3 : .8), .5, chin ? .9 : .4], dir: [0, -1, 0] }; }), // Hand im Ring am unteren Rand
      legs: both(function (x) { return { to: add(pc, [x * 12, 168, 26]), pole: [0, 0, 1], dir: [0, .7, .7] }; }), // Beine gestreckt, leicht vor dem Körper
      props: rings(gx, RY, 0, -200) });
  }
  function pushup(p) {
    var t = rep(p), A = [0, 384, -268], S = [0, lerp(271, 336, t), lerp(0, 10, t)]; // oben Arme ganz gestreckt
    var L = norm(sub3(S, A)), pc = add(A, mul(L, 172)), a = Math.atan2(L[2], -L[1]) / R; // Körper gerade, Beine gestreckt
    return build({ pc: pc, a: a, nod: -10,
      arms: both(function (x) { return { to: [x * 32, 386, 0], pole: [x * .45, -.2, -1], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 11, 384, -268], pole: [0, 1, 0], dir: [0, .55, .85] }; }) });
  }
  function pistol(p) {
    var t = rep(p, .42, .08), pc = [0, lerp(224, 338, t), lerp(-4, -46, t)], a = lerp(4, 42, t);
    var hb = add(pc, [18, 6, 0]), ang_ = lerp(25, 84, t) * R;
    return build({ pc: pc, a: a, nod: lerp(0, -20, t),
      arms: both(function (x) { var b = lerp(15, 92, t) * R, sh = [x * 31, 0, 0]; return { to: add(add(pc, [x * 28, -112 * Math.cos(a * R), 112 * Math.sin(a * R)]), [0, 108 * Math.cos(b), 108 * Math.sin(b)]), pole: [0, 1, -.4] }; }),
      legs: { a: { to: [-15, 390, 0], pole: [0, 0, 1] }, b: { to: add(hb, [2, 166 * Math.cos(ang_), 166 * Math.sin(ang_)]), pole: [0, -.3, 1], dir: [0, -.3, 1] } } });
  }
  function nordic(p) {
    var t = rep(p, .5, .1), q = lerp(0, 68, t) * R, K = [0, 384, 0];
    var hip = add(K, [0, -80 * Math.cos(q), 80 * Math.sin(q)]), u = [0, -Math.cos(q), Math.sin(q)], pc = add(hip, mul(u, 6));
    var sh = add(pc, mul(u, 112));
    return build({ pc: pc, a: q / R, nod: -8,
      arms: both(function (x) {
        var top = add(add(pc, mul(u, 80)), [-x * 10, 0, 0]); top = add(top, mul([0, Math.sin(q), Math.cos(q)], 26));
        var low = [x * 30, 386, sh[2] + 30];
        return { to: lerp(top, low, Math.max(0, t * 1.4 - .4)), pole: [x * .6, .5, -.5] };
      }),
      legs: both(function (x) { return { to: [x * 14, 384, -82], pole: [0, .6, 1], dir: [0, .3, -1] }; }),
      props: [{ type: 'circle', c: [0, 376, -84], r: 7, hub: true }, { type: 'line', a: [-34, 376, -84], b: [34, 376, -84], w: 2 },
        { type: 'poly', pts: [[-34, 394, -16], [34, 394, -16], [34, 394, 18], [-34, 394, 18]] }] });
  }
  function hollow(p) {
    var e = 14 + sway(p, 2.5), pc = [0, 380, 0], a = -72 + sway(p, 1.5);
    var u = [0, -Math.cos(a * R), Math.sin(a * R)];
    return build({ pc: pc, a: a, nod: 18,
      arms: both(function (x) { var sh = add(add(pc, mul(u, 112)), [x * 31, 0, 0]); return { to: add(sh, mul(norm([0, -.32, -1]), 114)), pole: [0, -1, 0] }; }),
      legs: both(function (x) { var hi = add(pc, [x * 10, 6, 0]); return { to: add(hi, [0, -176 * Math.sin(e * R), 176 * Math.cos(e * R)]), pole: [0, -1, 0], dir: [0, -.4, 1] }; }) });
  }
  function handstand(p) {
    var a = 172 + sway(p, 1.2), u = [0, -Math.cos(a * R), Math.sin(a * R)];
    var S = [0, 273, -1], pc = sub3(S, mul(u, 112)); // Arme ganz gestreckt
    var hb = add(pc, [0, 6, 0]), wallZ = add(hb, mul(u, -165))[2] - 12;
    return build({ pc: pc, a: a, nod: -12,
      arms: both(function (x) { return { to: [x * 30, 386, 0], pole: [x, 0, .3], dir: [0, .1, -1] }; }),
      legs: both(function (x) { return { to: add(add(pc, [x * 16, 0, 0]), mul(u, -175)), pole: [0, 0, -1], dir: [0, -1, .15] }; }),
      props: wall(wallZ) });
  }
  function dip(p) {
    var t = rep(p), RY = 158, pc = [0, lerp(144, 205, t), lerp(-9.7, -20, t)], a = lerp(6, 26, t); // oben Arme ganz gestreckt, unten Oberarm waagerecht
    return build({ pc: pc, a: a, nod: lerp(0, -8, t),
      arms: both(function (x) { return { to: [x * 27, RY - 12, 0], pole: [x * .25, 0, -1], dir: [0, 1, .15] }; }), // Hand im Ring, drückt auf den unteren Rand
      legs: both(function (x) { return { to: add(pc, [x * 8, 112, -78]), pole: [0, .2, 1], dir: [0, .6, -.8] }; }),
      props: rings(27, RY, 0, -200) });
  }
  function bridge(p) {
    var t = rep(p, .38, .16), S = [0, 384, -150], py = lerp(372, 340, t); // oben: Schulter, Hüfte, Knie in einer Linie
    var pz = S[2] + Math.sqrt(Math.max(0, 112 * 112 - Math.pow(py - S[1], 2))), pc = [0, py, pz];
    var u = norm(sub3(S, pc)), a = Math.atan2(u[2], -u[1]) / R;
    return build({ pc: pc, a: a, hc: [0, 380, -195],
      arms: both(function (x) { return { to: [x * 40, 388, S[2] + 118], pole: [x, -.5, 0], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 16, 388, 40], pole: [0, -1, .3], dir: [0, .35, 1] }; }) });
  }
  function bss(p) {
    var t = rep(p), pc = [0, lerp(232, 304, t), lerp(-14, -22, t)], a = lerp(4, 14, t);
    return build({ pc: pc, a: a, nod: -4,
      arms: both(function (x) { return { to: add(pc, [x * 38, 2, 12]), pole: [x * .3, 0, -1] }; }),
      legs: { a: { to: [-14, 390, 46], pole: [0, 0, 1] }, b: { to: [14, 324, -92], pole: [0, 1, .3], dir: [0, .2, -1] } },
      props: bench(-128, -64, 332, 34) });
  }
  function abwheel(p) { // Hände bleiben immer am Rad: das Rad sitzt dort, wo die Hände sind
    var t = rep(p, .44, .06), q = lerp(14, 64, t) * R, K = [0, 386, 0];
    var hip = add(K, [0, -80 * Math.cos(q), 80 * Math.sin(q)]), a = lerp(74, 86, t), u = [0, -Math.cos(a * R), Math.sin(a * R)];
    var pc = add(hip, mul(u, 6)), sh = add(pc, mul(u, 112)), wy = 380;
    var reach = Math.sqrt(109.6 * 109.6 - 13 * 13), dy = wy - sh[1]; // Arme gestreckt
    var wz = sh[2] + Math.sqrt(Math.max(0, reach * reach - dy * dy));
    var J = build({ pc: pc, a: a, nod: lerp(-14, 4, t),
      arms: both(function (x) { return { to: [x * 18, wy, wz], pole: [x * .4, .3, -1], dir: [0, .2, 1] }; }),
      legs: both(function (x) { return { to: [x * 14, 384, -82], pole: [0, .6, 1], dir: [0, .3, -1] }; }) });
    var c = [0, (J.wra[1] + J.wrb[1]) / 2 + 3, (J.wra[2] + J.wrb[2]) / 2];
    J._props = [{ type: 'circle', c: c, r: 14, hub: true, layer: 'mid', keep: true }, { type: 'line', a: [-26, c[1], c[2]], b: [26, c[1], c[2]], w: 2, layer: 'mid' }];
    return J;
  }


  // ---- Zweite Runde (Oktober 2026): Hilfen für Bewegungen mit mehreren Phasen ----
  // Werte (Zahlen, Punkte, verschachtelte Objekte) gleichmäßig mischen. Ellbogen und Knie rechnet danach build().
  function mix(A, B, t) {
    if (typeof A === 'number') return A + (B - A) * t;
    if (Array.isArray(A)) return A.map(function (v, i) { return mix(v, B[i], t); });
    var o = {}; for (var k in A) o[k] = k === 'props' ? A[k] : mix(A[k], B[k], t); return o;
  }
  // Schlüsselbilder [[Zeitpunkt, Werte], …] mit weichem Übergang; Werte sind Funktionen von x (Seite) oder fest.
  function keys(p, K) {
    for (var i = 0; i < K.length - 1; i++) if (p <= K[i + 1][0]) return mix(K[i][1], K[i + 1][1], ease((p - K[i][0]) / (K[i + 1][0] - K[i][0] || 1)));
    return K[K.length - 1][1];
  }
  function limbs(o) { // {pc, a, nod, ta, tb, pa, pb, da, db, la, lb, qa, qb, ea, eb} → build
    return build({ pc: o.pc, a: o.a, nod: o.nod || 0, props: o.props,
      arms: { a: { to: o.ta, pole: o.pa, dir: o.da }, b: { to: o.tb, pole: o.pb, dir: o.db } },
      legs: { a: { to: o.la, pole: o.qa, dir: o.ea }, b: { to: o.lb, pole: o.qb, dir: o.eb } } });
  }
  // Gerader Körper zwischen Knöchel A und Schulter S (Liegestütz, Planke): Becken auf der Linie, Winkel daraus.
  function line(A, S) { var L = norm(sub3(S, A)); return { pc: add(A, mul(L, 172)), a: Math.atan2(L[2], -L[1]) / R }; }
  // Schnittpunkt zweier Kreise in der y-z-Ebene (Becken zwischen Füßen und Schultern), die obere Lösung.
  function meet(A, rA, B, rB) {
    var dy = B[1] - A[1], dz = B[2] - A[2], d = Math.min(Math.hypot(dy, dz), rA + rB - .01), a = (rA * rA - rB * rB + d * d) / (2 * d), h = Math.sqrt(Math.max(0, rA * rA - a * a));
    var my = A[1] + a * dy / d, mz = A[2] + a * dz / d, s1 = [0, my - h * dz / d, mz + h * dy / d], s2 = [0, my + h * dz / d, mz - h * dy / d];
    return s1[1] < s2[1] ? s1 : s2;
  }
  function trunkTo(pc, S) { var u = norm(sub3(S, pc)); return Math.atan2(u[2], -u[1]) / R; }
  function rotYZ(J, c, deg) { // ganze Figur um einen Punkt kippen (Hollow Rock)
    var r = deg * R, cs = Math.cos(r), sn = Math.sin(r), O = {}, k;
    function f(v) { var y = v[1] - c[1], z = v[2] - c[2]; return [v[0], c[1] + y * cs - z * sn, c[2] + y * sn + z * cs]; }
    for (k in J) O[k] = k.charAt(0) === '_' ? J[k] : f(J[k]);
    return O;
  }
  var UP = [0, -1, 0], DOWN = [0, 1, 0], FWD = [0, 0, 1], BACK = [0, 0, -1];
  function stand(x) { return [x * 20, 390, 0]; }

  function ringRow(p) { // Körper gerade schräg unter den Ringen, Fersen am Boden
    var t = rep(p, .4, .1), A = [0, 386, 240], Sy = lerp(322, 254, t), S = [0, Sy, 240 - Math.sqrt(284 * 284 - Math.pow(386 - Sy, 2))], L = line(A, S);
    return build({ pc: L.pc, a: L.a, nod: lerp(4, -6, t),
      arms: both(function (x) { return { to: [x * 26, 210, 0], pole: [x * .7, .7, -.3], dir: UP }; }), // Hand im Ring am unteren Rand
      legs: both(function (x) { return { to: [x * 11, 386, 240], pole: UP, dir: [0, -.6, .8] }; }),
      props: rings(26, 190, 0, -200) });
  }
  function pikePush(p) { // Hüfte hoch, Kopf zwischen die Hände zum Boden
    var t = rep(p), F = [0, 386, -240], S = [0, lerp(306, 340, t), lerp(-86, -28, t)], pc = meet(F, 168, S, 112);
    return build({ pc: pc, a: trunkTo(pc, S), nod: lerp(-30, -10, t),
      arms: both(function (x) { return { to: [x * 30, 386, 0], pole: [x * .5, -.2, 1], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 12, 386, -240], pole: [0, -1, .2], dir: [0, .4, -.9] }; }) });
  }
  function lunge(p) { // Schritt nach hinten, hinteres Knie knapp über dem Boden
    var t = rep(p, .42, .1), pc = [0, lerp(222, 300, t), lerp(-4, -58, t)];
    return build({ pc: pc, a: lerp(0, 6, t), nod: -2,
      arms: both(function (x) { return { to: add(pc, [x * 40, 12, 8]), pole: [x * .3, 0, -1] }; }),
      legs: { a: { to: [-16, 390, 8], pole: FWD },
        b: { to: [16, lerp(390, 366, t) - 16 * Math.sin(Math.PI * t), lerp(0, -172, t)], pole: [0, .9, .5], dir: mix([0, .28, 1], [0, .95, .3], t) } } });
  }
  function kneeRaise(p) { // toter Hang, Oberschenkel bis waagerecht
    var t = rep(p, .38, .14), RY = 22, pc = [0, 266, lerp(13.7, 18, t)];
    return build({ pc: pc, a: lerp(-6, -14, t), nod: -4,
      arms: both(function (x) { return { to: [x * 28, RY + 20, 0], pole: [x * .8, .5, .4], dir: UP }; }),
      legs: both(function (x) { return { to: add(pc, [x * 12, lerp(168, 92, t), lerp(26, 74, t)]), pole: FWD, dir: [0, .7, .7] }; }),
      props: rings(28, RY, 0, -200) });
  }
  function plankAt(Sz, Sy, Az) { var A = [0, 384, Az], S = [0, Sy, Sz], L = line(A, S); return { pc: L.pc, a: L.a, A: A }; }
  function burpee(p) {
    var hz = 40, P1 = plankAt(hz, 276, -228), P2 = plankAt(hz + 8, 334, -228);
    function stand0(lift, up) {
      var pc = [0, 222 - lift, -4];
      return { pc: pc, a: 0, nod: 0,
        ta: up ? add(pc, [-34, -236, 6]) : add(pc, [-40, 12, 8]), tb: up ? add(pc, [34, -236, 6]) : add(pc, [40, 12, 8]),
        pa: up ? [-1, 0, 0] : [-.3, 0, -1], pb: up ? [1, 0, 0] : [.3, 0, -1], da: up ? UP : DOWN, db: up ? UP : DOWN,
        la: [-20, 390 - lift, 0], lb: [20, 390 - lift, 0], qa: FWD, qb: FWD, ea: [0, .28 + lift / 60, 1], eb: [0, .28 + lift / 60, 1] };
    }
    function floor(P, sq) {
      return { pc: sq ? [0, 332, -40] : P.pc, a: sq ? 46 : P.a, nod: -12, // Hocke: Hüfte unter dem Knie
        ta: [-32, 386, hz], tb: [32, 386, hz], pa: [-.45, -.2, -1], pb: [.45, -.2, -1], da: [0, .1, 1], db: [0, .1, 1],
        la: sq ? [-20, 390, 0] : [-11, 384, -228], lb: sq ? [20, 390, 0] : [11, 384, -228], qa: sq ? FWD : DOWN, qb: sq ? FWD : DOWN,
        ea: sq ? [0, .28, 1] : [0, .55, .85], eb: sq ? [0, .28, 1] : [0, .55, .85] };
    }
    var o = limbs(keys(p, [[0, stand0(0)], [.14, floor(P1, true)], [.26, floor(P1)], [.38, floor(P2)], [.5, floor(P1)], [.62, floor(P1, true)], [.76, stand0(26, true)], [.88, stand0(0)], [1, stand0(0)]]));
    return o;
  }
  function squatJump(p) {
    function st(y, lift, arms) {
      var k = (y - 222) / 102, pc = [0, y - lift, lerp(-4, -52, k)], a = k * 42;
      return { pc: pc, a: a, nod: -4,
        ta: arms === 'up' ? add(pc, [-30, -230, 20]) : arms === 'back' ? add(pc, [-34, 30, -70]) : add(pc, [-40, 12, 8]),
        tb: arms === 'up' ? add(pc, [30, -230, 20]) : arms === 'back' ? add(pc, [34, 30, -70]) : add(pc, [40, 12, 8]),
        pa: [-.3, 0, -1], pb: [.3, 0, -1], la: [-20, 390 - lift, 0], lb: [20, 390 - lift, 0], qa: [-.2, 0, 1], qb: [.2, 0, 1],
        ea: [0, .28 + lift / 40, 1], eb: [0, .28 + lift / 40, 1] };
    }
    var deep = st(324, 0, 'back'); // unten: Hüfte tiefer als das Knie
    return limbs(keys(p, [[0, deep], [.16, st(222, 0, 'up')], [.28, st(222, 34, 'up')], [.42, st(232, 0, 'up')], [.64, deep], [1, deep]]));
  }
  function skater(p) { // weit seitlich springen, kurz ganz in der Luft, auf einem Bein landen, das andere kreuzt hinten
    var X = 170;
    function land(x) {
      var pc = [x * X, 288, -24];
      return { pc: pc, a: 22, nod: -6, ta: add(pc, [x * 56, 40, 40]), tb: add(pc, [x * 10, 30, 70]), pa: [x, 0, -.5], pb: [x * .2, 0, -1],
        la: x < 0 ? [-X - 8, 390, 6] : [X - 46, 352, -86], lb: x < 0 ? [-X + 46, 352, -86] : [X + 8, 390, 6],
        qa: x < 0 ? FWD : [0, .3, 1], qb: x < 0 ? [0, .3, 1] : FWD, ea: x < 0 ? [0, .28, 1] : [0, .6, -.7], eb: x < 0 ? [0, .6, -.7] : [0, .28, 1] };
    }
    // Halbe Runde: erst auf dem Bein abfangen und laden (40 %), dann Flug ohne Halt (60 %): seitlich gleichmäßig, Höhe als Bogen.
    var half = p < .5 ? 0 : 1, h = (p - half * .5) * 2, from = half ? 1 : -1, to = -from;
    if (h < .4) { var c = Math.sin(h / .4 * Math.PI) * 14, L = land(from); L.pc = add(L.pc, [0, c, 0]); return limbs(L); }
    var s = (h - .4) / .6, arc = Math.sin(s * Math.PI), o = mix(land(from), land(to), s);
    o.pc = [lerp(from, to, s) * X, 288 - 84 * arc, -24 + 10 * arc]; o.a = 22 - 12 * arc;
    var lift = Math.min(1, arc * 3); // Füße sofort vom Boden, beide Beine unter dem Körper
    o.la = mix(o.la, add(o.pc, [-20, 128, -18]), lift); o.lb = mix(o.lb, add(o.pc, [20, 128, -18]), lift); // Knie leicht angezogen
    o.ea = o.eb = [0, .6, .8]; o.qa = o.qb = FWD;
    return limbs(o);
  }
  function slideFeet(z, w, y) { w = w || 11; y = y || 397; return [-1, 1].map(function (x) { return { type: 'poly', pts: [[x * w - 9, y, z - 14], [x * w + 9, y, z - 14], [x * w + 9, y, z + 10], [x * w - 9, y, z + 10]], keep: true }; }); }
  function kneeTuck(p) { // Liegestütz, Füße auf dem Handtuch, Knie zur Brust
    var t = rep(p, .4, .1), P = plankAt(0, 276, -268), Az = lerp(-268, -116, t), S = [0, 274, 2];
    var pc = mix(P.pc, [0, 264, -108], t), a = lerp(P.a, trunkTo([0, 264, -108], S), t);
    var J = build({ pc: pc, a: a, nod: lerp(-10, -22, t),
      arms: both(function (x) { return { to: [x * 32, 386, 0], pole: [x * .45, -.2, -1], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 11, 384, Az], pole: mix(DOWN, [0, .6, 1], t), dir: [0, .55, -.85] }; }) });
    J._props = slideFeet((J.toa[2] + J.tob[2]) / 2 + 4); // Handtuch bleibt unter den Zehen
    return J;
  }
  function ringPush(p) { // Liegestütz an tiefen Ringen
    var t = rep(p), A = [0, 384, -240], Sy = lerp(222, 292, t), S = [0, Sy, -240 + Math.sqrt(286 * 286 - Math.pow(384 - Sy, 2))], L = line(A, S);
    return build({ pc: L.pc, a: L.a, nod: -10,
      arms: both(function (x) { return { to: [x * 30, 334, 0], pole: [x * .45, -.2, -1], dir: [0, 1, .15] }; }),
      legs: both(function (x) { return { to: [x * 11, 384, -240], pole: DOWN, dir: [0, .55, .85] }; }),
      props: rings(30, 346, 0, -200) });
  }
  function hspu(p) { // Handstand an der Wand, Kopf bis zum Boden
    var t = rep(p, .45, .06), a = 172, u = [0, -Math.cos(a * R), Math.sin(a * R)];
    var S = [0, lerp(273, 326, t), lerp(-1, -4, t)], pc = sub3(S, mul(u, 112));
    var top = sub3([0, 273, -1], mul(u, 112)), wallZ = add(add(top, [0, 6, 0]), mul(u, -165))[2] - 12;
    return build({ pc: pc, a: a, nod: -12,
      arms: both(function (x) { return { to: [x * 32, 386, 0], pole: [x * .7, 0, .7], dir: [0, .1, -1] }; }),
      legs: both(function (x) { return { to: add(add(pc, [x * 16, 0, 0]), mul(u, -175)), pole: [0, 0, -1], dir: [0, -1, .15] }; }),
      props: wall(wallZ) });
  }
  function lsit(p) { // Stütz auf Parallettes, Beine waagerecht nach vorn
    var pc = [0, 338 + sway(p, 1.5), 4], a = -6, hi = add(pc, [0, 6, 0]);
    var par = [-1, 1].reduce(function (l, x) {
      return l.concat([{ type: 'line', a: [x * 32, 344, -26], b: [x * 32, 344, 26], w: 2, keep: true }, { type: 'line', a: [x * 32, 344, -20], b: [x * 32, 397, -28] }, { type: 'line', a: [x * 32, 344, 20], b: [x * 32, 397, 28] }]);
    }, []);
    return build({ pc: pc, a: a, nod: -6,
      arms: both(function (x) { return { to: [x * 32, 342, 2], pole: [x * .3, 0, -1], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: add(hi, [x * 9, -3 + sway(p, 2), 168]), pole: UP, dir: [0, -.5, .85] }; }),
      props: par });
  }
  function climber(p) { // Liegestütz oben, Knie im Wechsel zur Brust
    var P = plankAt(0, 276, -268), s = Math.sin(p * 2 * Math.PI), da = Math.max(0, s), db = Math.max(0, -s);
    function leg(x, d) { return { to: mix([x * 11, 384, -268], [x * 11, 362, -150], ease(d)), pole: mix(DOWN, [0, .4, 1], d), dir: [0, .55, .85] }; }
    return build({ pc: P.pc, a: P.a, nod: -12,
      arms: both(function (x) { return { to: [x * 32, 386, 0], pole: [x * .45, -.2, -1], dir: [0, .1, 1] }; }),
      legs: { a: leg(-1, da), b: leg(1, db) } });
  }
  function plank(p) { // Unterarmstütz: Ellbogen unter den Schultern
    var S = [0, 330 + sway(p, 1), 0], A = [0, 384, -262], L = line(A, S), J;
    J = build({ pc: L.pc, a: L.a, nod: -8,
      arms: both(function (x) { return { to: [x * 16, 388, 48], pole: [x * .05, 1, -.2], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 11, 384, -262], pole: DOWN, dir: [0, .55, .85] }; }) });
    ['a', 'b'].forEach(function (sd) { J['el' + sd] = [J['el' + sd][0], 384, J['sh' + sd][2] + 2]; J['wr' + sd] = [J['wr' + sd][0], 387, J['el' + sd][2] + 52]; J['ha' + sd] = add(J['wr' + sd], [0, 1, 24]); }); // Unterarme flach am Boden
    return J;
  }
  function hollowRock(p) { return rotYZ(hollow(p * 0), [0, 384, 0], Math.sin(p * 2 * Math.PI) * 9); }
  function vup(p) { // flach liegen, dann zum V falten und die Zehen berühren
    var t = rep(p, .4, .12), pc = [0, 380, 0], a = lerp(-90, -38, t), e = lerp(4, 58, t) * R;
    var u = [0, -Math.cos(a * R), Math.sin(a * R)], hi = add(pc, [0, 6, 0]);
    return build({ pc: pc, a: a, nod: lerp(0, 22, t),
      arms: both(function (x) {
        var sh = add(add(pc, mul(u, 112)), [x * 31, 0, 0]), toe = add(hi, [x * 12, -150 * Math.sin(e) - 6, 150 * Math.cos(e) - 26]);
        var d = norm(mix(u, norm(sub3(toe, sh)), t)); // Arm immer ganz gestreckt: von über dem Kopf zu den Füßen
        return { to: add(sh, mul(d, 114)), pole: mix(DOWN, UP, t), dir: d };
      }),
      legs: both(function (x) { return { to: add(hi, [x * 10, -176 * Math.sin(e), 176 * Math.cos(e)]), pole: UP, dir: [0, -.4, 1] }; }) });
  }
  function legCurl(p) { // Brücke halten, Fersen auf dem Handtuch heranziehen
    var t = rep(p, .42, .1), S = [0, 384, -150], Fz = lerp(128, 40, t), py = lerp(356, 340, t);
    var pz = S[2] + Math.sqrt(Math.max(0, 112 * 112 - Math.pow(py - S[1], 2))), pc = [0, py, pz];
    var J = build({ pc: pc, a: trunkTo(pc, S), hc: [0, 380, -195],
      arms: both(function (x) { return { to: [x * 40, 388, S[2] + 118], pole: [x, -.5, 0], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 16, 391, Fz], pole: [0, -1, .3], dir: [0, -.45, .9] }; }) });
    J._props = slideFeet((J.ana[2] + J.anb[2]) / 2 + 2, 16, 397); // Ferse liegt auf dem Handtuch // Handtuch bleibt unter den Fersen
    return J;
  }
  function hipThrust(p) { // Schultern auf der Bank, Hüfte nach oben bis zur Linie
    var t = rep(p, .38, .16), S = [0, 300, -120], py = lerp(362, 296, t);
    var pz = S[2] + Math.sqrt(Math.max(0, 112 * 112 - Math.pow(py - S[1], 2))), pc = [0, py, pz];
    return build({ pc: pc, a: trunkTo(pc, S), nod: lerp(-30, 6, t),
      arms: both(function (x) { return { to: [x * 46, 300, -160], pole: [x, -.3, 0], dir: [0, .1, -1] }; }),
      legs: both(function (x) { return { to: [x * 16, 388, 64], pole: [0, -1, .4], dir: [0, .3, 1] }; }),
      props: bench(-240, -128, 306, 34) });
  }
  function scapPush(p) { // Liegestütz oben, Arme bleiben gestreckt, nur die Schulterblätter bewegen sich
    var t = rep(p, .4, .1), S = [0, 276, 0], A = [0, 384, -268], L = line(A, S), d = lerp(-6, 16, t);
    var J = build({ pc: L.pc, a: L.a, nod: -10,
      arms: both(function (x) { return { to: [x * 32, 386, 0], pole: [x * .45, -.2, -1], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 11, 384, -268], pole: DOWN, dir: [0, .55, .85] }; }) });
    [['nb', 1], ['hc', 1], ['pc', .55], ['hia', .5], ['hib', .5], ['kna', .25], ['knb', .25]].forEach(function (q) { J[q[0]] = add(J[q[0]], [0, d * q[1], 0]); });
    return J;
  }
  function diamond(p) { // Hände unter der Brust, Ellbogen eng nach hinten
    var t = rep(p), A = [0, 384, -268], S = [0, lerp(276, 336, t), lerp(0, 8, t)], L = line(A, S);
    return build({ pc: L.pc, a: L.a, nod: -10,
      arms: both(function (x) { return { to: [x * 8, 386, 4], pole: [x * .2, -.3, -1], dir: [-x * .5, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 11, 384, -268], pole: DOWN, dir: [0, .55, .85] }; }) });
  }
  function splitSquat(p) { // feste Schrittstellung, hinterer Fuß auf den Zehen
    var t = rep(p), pc = [0, lerp(238, 302, t), lerp(-30, -40, t)];
    return build({ pc: pc, a: lerp(2, 6, t), nod: -3,
      arms: both(function (x) { return { to: add(pc, [x * 38, 4, 12]), pole: [x * .3, 0, -1] }; }),
      legs: { a: { to: [-15, 390, 40], pole: FWD }, b: { to: [15, 370, -142], pole: [0, .8, .6], dir: [0, .92, .38] } } });
  }


  // ---- Runde 2 (Oktober 2026): alles aus den Testtagen (Stufen der Testübungen, Beweglichkeits-Check) ----
  // Schulter auf einem Kreis um einen Drehpunkt (Knie oder Füße), damit der Körper gerade und gleich lang bleibt.
  function onCircle(P, R, Sy) { return [0, Sy, P[2] + Math.sqrt(Math.max(0, R * R - Math.pow(P[1] - Sy, 2)))]; }
  function trunkU(a) { return [0, -Math.cos(a * R), Math.sin(a * R)]; }
  function trunkF(a) { return [0, Math.sin(a * R), Math.cos(a * R)]; }
  function mid(a, b) { return lerp(a, b, .5); }
  function pushBase(p, o) { // Liegestütz mit Drehpunkt an den Füßen (oder Knien) und festen Händen
    var t = rep(p), P = o.pivot, Sy = lerp(o.top, o.bottom, t), S = onCircle(P, o.R, Sy), L = norm(sub3(S, P));
    var pc = sub3(S, mul(L, 112)), a = Math.atan2(L[2], -L[1]) / R;
    return build({ pc: pc, a: a, nod: -10,
      arms: both(function (x) { return { to: [x * (o.hx || 32), o.hy, o.hz], pole: [x * .45, -.2, -1], dir: o.hdir || [0, .1, 1] }; }),
      legs: both(function (x) { return o.legs(x, pc, a); }), props: o.props });
  }
  function pushKnee(p) { // Knie am Boden, Hüfte gestreckt, Unterschenkel schräg nach oben
    var K = [0, 386, -164];
    return pushBase(p, { pivot: K, R: 198, top: 273, bottom: 338, hy: 386, hz: 0,
      legs: function (x) { return { to: add([x * 12, 0, 0], add(K, [0, -30, -76])), pole: DOWN, dir: [0, .6, -.8] }; } });
  }
  function pushPar(p) { // Hände auf den Parallettes, Brust geht tiefer als die Griffe
    var A = [0, 384, -268], bars = [-1, 1].reduce(function (l, x) {
      return l.concat([{ type: 'line', a: [x * 34, 344, -24], b: [x * 34, 344, 24], w: 2, keep: true }, { type: 'line', a: [x * 34, 344, -18], b: [x * 34, 397, -26] }, { type: 'line', a: [x * 34, 344, 18], b: [x * 34, 397, 26] }]);
    }, []);
    return pushBase(p, { pivot: A, R: 286, top: 230, bottom: 304, hx: 34, hy: 342, hz: 0, hdir: [0, 1, .1], props: bars,
      legs: function (x) { return { to: [x * 11, 384, -268], pole: DOWN, dir: [0, .55, .85] }; } });
  }
  function pushDecline(p) { // Füße auf dem Stuhl
    var A = [0, 300, -262];
    return pushBase(p, { pivot: A, R: 286, top: 274, bottom: 336, hy: 386, hz: 22, props: bench(-300, -232, 306, 34),
      legs: function (x) { return { to: [x * 11, 300, -262], pole: DOWN, dir: [0, .4, .9] }; } });
  }
  function pushStd(p, extra) { // Liegestütz wie g_push, Füße als Drehpunkt; extra(J) ergänzt Geräte aus den Gelenken
    var A = [0, 384, -268], J = pushBase(p, { pivot: A, R: 286, top: 274, bottom: 336, hy: 386, hz: 2,
      legs: function (x) { return { to: [x * 11, 384, -268], pole: DOWN, dir: [0, .55, .85] }; } });
    J._props = extra(J); return J;
  }
  function pushBand(p) { // Band über den oberen Rücken, Enden unter den Händen
    return pushStd(p, function (J) {
      var top = add(mid(J.sha, J.shb), [0, -14, -10]);
      var P = [J.wra, add(J.sha, [-6, -12, -6]), top, add(J.shb, [6, -12, -6]), J.wrb], out = [];
      for (var i = 0; i < P.length - 1; i++) out.push({ type: 'line', a: P[i], b: P[i + 1], col: '#4E9C78', w: 9, layer: 'front' }); // breites grünes Band
      return out;
    });
  }
  function pushVest(p) { // Weste um den Brustkorb
    return pushStd(p, function (J) {
      var u = norm(sub3(J.nb, J.pc)), f = norm([0, u[2], -u[1]]), c1 = add(J.nb, mul(u, -10)), c2 = add(J.nb, mul(u, -70)), V = '#7C7B98';
      var out = [];
      [-1, 1].forEach(function (x) { // Weste vorn und hinten, von der Seite als zwei dicke Platten mit Trägern über die Schulter
        [-26, 24].forEach(function (d) { out.push({ type: 'line', a: add(add(c1, mul(f, d * .85)), [x * 20, 0, 0]), b: add(add(c2, mul(f, d)), [x * 20, 0, 0]), col: V, w: 7, layer: 'front' }); });
        out.push({ type: 'poly', pts: [add(add(c1, mul(f, -22)), [x * 20, 0, 0]), add(J.nb, [x * 22, 0, 0]), add(add(c1, mul(f, 20)), [x * 20, 0, 0])], open: true, col: V, w: 3, layer: 'front' });
      });
      return out;
    });
  }
  function pistolAt(t, low, hands) { // Pistol-Ablauf mit wählbarer Tiefe und Armen
    var pc = [0, lerp(224, low[0], t), lerp(-4, low[1], t)], a = lerp(4, low[2], t);
    var hb = add(pc, [18, 6, 0]), ang_ = lerp(25, 84, t) * R;
    return build({ pc: pc, a: a, nod: lerp(0, -18, t), arms: hands(pc, a),
      legs: { a: { to: [-15, 390, 0], pole: [0, 0, 1] }, b: { to: add(hb, [2, 166 * Math.cos(ang_), 166 * Math.sin(ang_)]), pole: [0, -.3, 1], dir: [0, -.3, 1] } } });
  }
  function pistolDoor(p) { // am Türrahmen festhalten, die Hände bleiben, wo sie greifen
    var J = pistolAt(rep(p, .42, .08), [338, -40, 32], function () { return both(function (x) { return { to: [x * 9, 170, 80], pole: [x * .6, .6, -.2], dir: [-x * .3, 0, 1] }; }); });
    J._props = [{ type: 'line', a: [-4, -40, 98], b: [-4, 401, 98], keep: true }, { type: 'line', a: [10, -40, 98], b: [10, 401, 98] }];
    return J;
  }
  function pistolBox(p) { // einbeinig auf einen Stuhl absitzen
    var J = pistolAt(rep(p, .42, .14), [304, -52, 26], function (pc, a) { return both(function (x) { return { to: add(pc, [x * 26, -40, 120]), pole: [x * .3, 1, -.4] }; }); });
    J._props = bench(-118, -36, 320, 30); // Sitzfläche direkt unter dem Becken
    return J;
  }
  function freeHand(p) { // freier Handstand: Balance über die Finger
    var a = 180 + sway(p, 1.6), u = trunkU(a), S = [0, 273, 0], pc = sub3(S, mul(u, 112));
    return build({ pc: pc, a: a, nod: -14,
      arms: both(function (x) { return { to: [x * 30, 386, 0], pole: [x, 0, .3], dir: [0, .1, -1] }; }),
      legs: both(function (x) { return { to: add(add(pc, [x * 14, 0, 0]), mul(u, -175)), pole: [0, 0, -1], dir: [0, -1, .2] }; }) });
  }
  function support(p) { // Stütz auf den Ringen, ruhig halten
    var RY = 158, pc = [0, 144 + sway(p, 1.2), -9.7], a = 6 + sway(p, 1);
    return build({ pc: pc, a: a, nod: 0,
      arms: both(function (x) { return { to: [x * 27, RY - 12, 0], pole: [x * .25, 0, -1], dir: [0, 1, .15] }; }),
      legs: both(function (x) { return { to: add(pc, [x * 8, 166, 10]), pole: FWD, dir: [0, .8, .5] }; }),
      props: rings(27, RY, 0, -200) });
  }
  function shrimp(p) { // hinteren Fuß festhalten, hinteres Knie bis zum Boden
    var t = rep(p, .44, .08), pc = [0, lerp(226, 336, t), lerp(-6, -18, t)], a = lerp(6, 32, t);
    var ankB = add(pc, [20, lerp(-30, -20, t), -50]); // Ferse nah am Po, damit die Hand den Fuß halten kann
    var o = { pc: pc, a: a, nod: -6,
      arms: { a: { to: add(pc, [-20, -170, 120]), pole: [-.4, 1, 0] }, b: { to: ankB, pole: [.4, 0, -1] } },
      legs: { a: { to: [-14, 390, 22], pole: FWD, dir: [0, .28, 1] }, b: { to: ankB, pole: [0, 1, .15], dir: [0, -.2, -1] } } };
    var J0 = build(o), d = sub3(J0.anb, J0.shb), L = len(d);
    if (L > 108) { o.legs.b.to = add(J0.shb, mul(d, 108 / L)); J0 = build(o); } // Fuß bleibt in Reichweite der Hand
    o.arms.b.to = J0.anb.slice(); // die Hand greift den Fuß dort, wo er wirklich ist
    return build(o);
  }
  // Beweglichkeits-Check
  function ragdoll(p) { // Oberkörper hängt locker, Hände greifen die Ellbogen
    var a = 148 + sway(p, 3), pc = [0, 232, -30], u = trunkU(a), sh = add(pc, mul(u, 112));
    return build({ pc: pc, a: a, nod: 30,
      arms: both(function (x) { return { to: add(sh, [-x * 22, 62, 30]), pole: [x * .6, .6, -.2] }; }),
      legs: both(function (x) { return { to: [x * 20, 390, 0], pole: FWD, dir: [0, .28, 1] }; }) }); // Knie leicht gebeugt
  }
  function forwardFold(p) { // Standing Forward Fold (Beweglichkeits-Check): Knie gestreckt, Arme hängen, Fingerspitzen Richtung Boden
    var a = 99 + 8 * (1 - Math.cos(p * 2 * Math.PI)) / 2, pc = [0, 228, -30], u = trunkU(a), sh = add(pc, mul(u, 112)); // ausatmen = tiefer
    return build({ pc: pc, a: a, nod: 18,
      arms: both(function (x) { return { to: add(sh, [x * 4, 114, 2]), pole: [x * .3, 0, -1], dir: DOWN }; }), // gestreckt, hängt senkrecht
      legs: both(function (x) { return { to: [x * 20, 392, 0], pole: FWD }; }) }); // Knie gestreckt
  }
  function pikeStretch(p) { // Langsitz, mit geradem Rücken zu den Füßen
    var a = 64 + sway(p, 4), pc = [0, 372, -10], hi = add(pc, [0, 6, 0]), u = trunkU(a);
    return build({ pc: pc, a: a, nod: 10,
      arms: both(function (x) { return { to: add(add(pc, mul(u, 112)), [x * 4, 30 + sway(p, 4), 104]), pole: [x * .5, -.3, -1] }; }),
      legs: both(function (x) { return { to: add(hi, [x * 10, 8, 166]), pole: UP, dir: [0, -.8, .4] }; }) });
  }
  function jefferson(p) { // auf einer Stufe, Wirbel für Wirbel abrollen, Gewicht hängt vor den Zehen
    var t = rep(p, .45, .1), k = Math.max(0, (t - .22) / .78), a = lerp(0, 135, k), pc = [0, 222 + 10 * k, lerp(-4, -20, k)], u = trunkU(a), sh = add(pc, mul(u, 112));
    var J = build({ pc: pc, a: a, nod: Math.min(1, t / .22) * 62, // zuerst Kinn zur Brust, dann abrollen
      arms: both(function (x) { return { to: add(sh, [x * 6, 113, lerp(4, 10, t)]), pole: [x * .4, 0, -1], dir: DOWN }; }),
      legs: both(function (x) { return { to: [x * 20, 390, 0], pole: FWD }; }) });
    // Rücken rund: der obere Rücken und der Kopf rollen weiter ein als das Becken (Brustwirbelsäule krümmt sich)
    var curl = k * 12 * R, piv = add(pc, mul(u, 40)), cs = Math.cos(curl), sn = Math.sin(curl); // Kopf bleibt vor den Schienbeinen
    ['nb', 'hc', 'sha', 'shb', 'ela', 'elb', 'wra', 'wrb', 'haa', 'hab'].forEach(function (q) {
      var y = J[q][1] - piv[1], z = J[q][2] - piv[2]; J[q] = [J[q][0], piv[1] + y * cs + z * sn, piv[2] - y * sn + z * cs];
    });
    var hm = mid(J.haa, J.hab);
    J._props = [{ type: 'poly', pts: [[-46, 401, -120], [46, 401, -120], [46, 401, 16], [-46, 401, 16]], keep: true },
      { type: 'poly', pts: [[-46, 401, 16], [-46, 470, 16], [46, 470, 16], [46, 401, 16]], open: true, keep: true },
      { type: 'line', a: [0, 401, -120], b: [0, 470, -120], col: STYLE.far },
      { type: 'line', a: [0, 470, -160], b: [0, 470, 200], keep: true, col: '#DADAD3' },
      { type: 'circle', c: add(hm, [0, 14, 0]), r: 10, layer: 'front', keep: true }, { type: 'line', a: add(J.haa, [0, -2, 0]), b: add(J.hab, [0, -2, 0]), layer: 'front' }];
    return J;
  }
  function deepSquat(p) { // tiefe Hocke, Fersen unten, Ellbogen drücken die Knie auseinander
    var pc = [0, 352 + sway(p, 2), -46], a = 28;
    return build({ pc: pc, a: a, nod: -4,
      arms: both(function (x) { return { to: add(pc, [x * 6, -86, 76]), pole: [x, .6, 0], dir: [0, -1, .2] }; }),
      legs: both(function (x) { return { to: [x * 24, 390, 0], pole: [x * .45, -.2, 1], dir: [x * .3, .28, 1] }; }) });
  }
  function ohSquat(p) { // tiefe Hocke, Arme gestreckt über dem Kopf, Stab in den Händen
    var pc = [0, 342 + sway(p, 2), -42], a = 22, u = trunkU(a), sh = add(pc, mul(u, 112));
    var J = build({ pc: pc, a: a, nod: -6,
      arms: both(function (x) { return { to: add(add(sh, [x * 31, 0, 0]), mul(norm([x * .35, -1, -.12]), 114)), pole: [x, 0, 0], dir: UP }; }),
      legs: both(function (x) { return { to: [x * 24, 390, 0], pole: [x * .45, -.2, 1], dir: [x * .3, .28, 1] }; }) });
    J._props = [{ type: 'line', a: add(J.wra, [-30, -6, 0]), b: add(J.wrb, [30, -6, 0]), w: 2, layer: 'front', keep: true }];
    return J;
  }
  function wallBig(z) { // Wand als Fläche: Vorderkante, Rückseite und Schraffur dazwischen
    var l = [{ type: 'line', a: [0, -70, z], b: [0, 401, z], keep: true }, { type: 'line', a: [0, -70, z - 30], b: [0, 401, z - 30], col: STYLE.far }];
    for (var y = -60; y < 401; y += 22) l.push({ type: 'line', a: [0, y, z], b: [0, y + 20, z - 30], col: STYLE.far });
    return l;
  }
  function wallPlane(z) { return [{ type: 'poly', pts: [[-110, -40, z], [110, -40, z], [110, 401, z], [-110, 401, z]], col: STYLE.far, keep: true }]; }
  function armsIn(J, d) { ['sh', 'el', 'wr', 'ha'].forEach(function (q) { J[q + 'a'][0] += d; J[q + 'b'][0] -= d; }); return J; } // Arme näher an den Rumpf
  function wallFlex(p) { // Rücken an der Wand, gestreckte Arme so weit wie möglich nach hinten
    var t = rep(p, .4, .2), pc = [0, 222, -4], sh = add(pc, [0, -112, 0]);
    var d = norm([0, lerp(.1, -1, t), lerp(1, -.2, t)]);
    var J = build({ pc: pc, a: 0, nod: 0,
      arms: both(function (x) { return { to: add(add(sh, [x * 31, 0, 0]), mul(d, 114)), pole: [x, 0, 0], dir: d }; }),
      legs: both(function (x) { return { to: [x * 20, 390, 30], pole: FWD }; }) });
    J._props = wallPlane(-40);
    return armsIn(J, 6);
  }
  function wallSlide(p) { // Unterarme und Handrücken an der Wand, von W nach Y schieben
    var t = rep(p, .42, .08), pc = [0, 222, -4], sh = add(pc, [0, -112, 0]);
    var J = build({ pc: pc, a: 0, nod: 0,
      arms: both(function (x) { return { to: add(sh, [x * lerp(40, 30, t), lerp(-50, -104, t), -24]), pole: [x, lerp(.8, .2, t), -.3], dir: UP }; }),
      legs: both(function (x) { return { to: [x * 20, 390, 30], pole: FWD }; }) });
    J._props = wallPlane(-40);
    return armsIn(J, 12);
  }
  function wristExt(p) { // Vierfüßler, Finger nach vorn, Schultern über die Handgelenke schieben
    var t = rep(p, .4, .16), K = [0, 386, -116], S = [0, lerp(276, 280, t), lerp(-22, 34, t)], pc = [0, 296, lerp(-112, -82, t)];
    return build({ pc: pc, a: trunkTo(pc, S), nod: -12,
      arms: both(function (x) { return { to: [x * 30, 386, 0], pole: [x * .3, -.2, -1], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: add([x * 12, 0, 0], add(K, [0, -14, -80])), pole: DOWN, dir: [0, .3, -1] }; }) });
  }
  function plancheLean(p) { // Liegestütz, Schultern weit vor die Hände, Arme gestreckt
    var t = rep(p, .4, .2), W = [0, 386, 0], ang = lerp(0, 34, t) * R, S = [0, W[1] - 113 * Math.cos(ang), 113 * Math.sin(ang)];
    var Az = S[2] - Math.sqrt(286 * 286 - Math.pow(384 - S[1], 2)), A = [0, 384, Az], L = norm(sub3(S, A)), pc = sub3(S, mul(L, 112));
    return build({ pc: pc, a: Math.atan2(L[2], -L[1]) / R, nod: -8,
      arms: both(function (x) { return { to: [x * 32, 386, 0], pole: [x * .45, -.2, -1], dir: [x * .7, .1, -.3] }; }),
      legs: both(function (x) { return { to: [x * 11, 384, Az], pole: DOWN, dir: [0, .55, .85] }; }) });
  }
  function kneeWall(p) { // vorderes Knie Richtung Wand, Ferse bleibt am Boden
    var t = rep(p, .4, .14), pc = [0, lerp(244, 296, t), lerp(-34, 34, t)];
    var J = build({ pc: pc, a: lerp(2, 8, t), nod: -4,
      arms: both(function (x) { return { to: add(pc, [x * 36, -8, 8]), pole: [x * .5, 0, -1], dir: [0, .4, .6] }; }), // Hände an der Hüfte
      legs: { a: { to: [-14, 390, 58], pole: FWD, dir: [0, .28, 1] }, b: { to: [16, 386, -100], pole: [0, .2, 1], dir: [0, .7, .7] } } });
    J._props = [{ type: 'poly', pts: [[-90, 60, 114], [90, 60, 114], [90, 401, 114], [-90, 401, 114]], col: STYLE.far }]; // Wand als Fläche wie beim Wall Flexion Hold
    return J;
  }


  // ---- Runde 3 (Oktober 2026): die häufigsten Übungen ohne Grafik (Aufwärmen, Cool-down, Ruhetag, Kraft) ----
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function rotAround(v, c, k, deg) { // Punkt v um die Achse k durch c drehen (Rodrigues)
    var t = deg * R, d = sub3(v, c), cs = Math.cos(t), sn = Math.sin(t);
    return add(c, add(add(mul(d, cs), mul(cross(k, d), sn)), mul(k, dot(k, d) * (1 - cs))));
  }
  var UPPER = ['nb', 'hc', 'sha', 'shb', 'ela', 'elb', 'wra', 'wrb', 'haa', 'hab'];
  // Oberkörper um die Wirbelsäule drehen (Rotation aus dem oberen Rücken). Positive Gradzahl: Schulter b geht nach unten bzw. hinten.
  function twist(J, deg) { var k = norm(sub3(J.nb, J.pc)); UPPER.forEach(function (q) { J[q] = rotAround(J[q], J.pc, k, deg); }); return J; }
  // Arm neu an ein Ziel legen (nach dem Drehen), Hand bleibt am Kontaktpunkt.
  function reArm(J, sd, to, pole, dir) {
    var ar = ik3(J['sh' + sd], to, LEN.upper, LEN.fore, pole);
    J['el' + sd] = ar[0]; J['wr' + sd] = ar[1]; J['ha' + sd] = add(ar[1], mul(norm(dir || sub3(ar[1], ar[0])), LEN.hand));
    if (J._to) J._to['wr' + sd] = to;
    return J;
  }
  // Ganze Figur um eine Achse durch c drehen (auf die Seite legen), danach so verschieben, dass der tiefste Punkt bei y liegt.
  function turnAll(J, c, k, deg, lowY) {
    var O = {}, q, lo = -1e9;
    for (q in J) if (q.charAt(0) !== '_') { O[q] = rotAround(J[q], c, k, deg); lo = Math.max(lo, O[q][1]); }
    var dy = lowY == null ? 0 : lowY - lo;
    for (q in O) O[q] = add(O[q], [0, dy, 0]);
    O._props = J._props || [];
    if (J._to) { O._to = {}; for (q in J._to) O._to[q] = add(rotAround(J._to[q], c, k, deg), [0, dy, 0]); }
    return O;
  }
  function breathe(p) { return (1 - Math.cos(p * 2 * Math.PI)) / 2; } // 0 → 1 → 0, ruhiges Ein- und Ausatmen
  var BAND = '#4E9C78';
  function bandLine(a, b) { return { type: 'line', a: a, b: b, col: BAND, w: 4, layer: 'front', keep: true }; }

  function stack(p) { // Stack Breathing: aufrecht, eine Hand auf der Brust, eine auf dem Bauch, Ellbogen locker unten; Brustkorb sinkt beim Ausatmen
    var b = breathe(p), pc = [0, 222, -4];
    return build({ pc: pc, a: 0, nod: 0,
      arms: { a: { to: add(pc, [-6, -84 + 2 * b, 27 - 2 * b]), pole: [-.3, 1, -.3], dir: [.9, -.1, .3] }, b: { to: add(pc, [6, -30, 25 - 3 * b]), pole: [.3, 1, -.3], dir: [-.9, .1, .3] } },
      legs: both(function (x) { return { to: stand(x), pole: FWD }; }) });
  }


  function wgs(p) { // World's Greatest Stretch: tiefer Ausfallschritt, hinteres Bein gestreckt. Ellbogen zum vorderen Fuß, dann aufdrehen:
    // beide Arme gestreckt in einer Linie, Brust öffnet zur Seite. Danach Hüfte zurück, vorderes Bein gestreckt (Beinrückseite).
    var k = keys(p, [[0, { d: 0, tw: 0, h: 0 }], [.12, { d: 1, tw: 0, h: 0 }], [.2, { d: 1, tw: 0, h: 0 }], [.36, { d: 0, tw: 1, h: 0 }], [.5, { d: 0, tw: 1, h: 0 }],
      [.62, { d: 0, tw: 0, h: 0 }], [.76, { d: 0, tw: 0, h: 1 }], [.88, { d: 0, tw: 0, h: 1 }], [1, { d: 0, tw: 0, h: 0 }]]);
    var FA = [-22, 390, 96], HB = [26, 395, 104], RB = [18, 377, -150];
    var pc = add(lerp([0, 302, 2], [0, 272, -15], k.h), [0, 10 * k.d, 0]);
    function shB(a) { var J0 = build({ pc: pc, a: a, arms: both(function () { return { to: pc, pole: FWD }; }), legs: both(function () { return { to: pc, pole: FWD }; }) }); twist(J0, 84 * k.tw); return J0.shb; }
    var best = 60, err = 1e9;
    for (var a0 = 30; a0 <= 110; a0 += .5) { var e = Math.abs(len(sub3(shB(a0), HB)) - 112); if (e < err && shB(a0)[1] < HB[1]) { err = e; best = a0; } }
    best += 16 * k.d; // Ellbogen zum Fuß: Brust sinkt tief, die Stützhand bleibt
    var J = build({ pc: pc, a: best, nod: lerp(6, -4, k.tw),
      arms: { a: { to: [-2, 395, 108], pole: [-.3, -.2, -1], dir: [0, .12, 1] }, b: { to: HB, pole: [.4, -.2, -1], dir: [0, .12, 1] } },
      legs: { a: { to: FA, pole: [0, -.3, 1] }, b: { to: RB, pole: DOWN, dir: [0, .88, .48] } } });
    twist(J, 84 * k.tw);
    reArm(J, 'b', HB, [.6, -.2, -1], [0, .12, 1]);
    var floorA = [-2, 395, 108], elbowDown = [-10, 395, 58], up = add(J.sha, mul(norm(sub3(J.sha, J.shb)), 116));
    var to = k.tw > 0 ? lerp(floorA, up, k.tw) : lerp(floorA, elbowDown, k.d);
    return reArm(J, 'a', to, k.tw > 0 ? [0, 0, 1] : [0, .5, 1], k.tw > .5 ? norm(sub3(J.sha, J.shb)) : [0, .12, 1]);
  }

  function pullApart(p) { // Band Pull-Apart: gestreckte Arme vor der Brust, Band bis zur Brust auseinanderziehen
    var t = rep(p, .38, .12), pc = [0, 222, -4], J = build({ pc: pc, a: 0, nod: 0,
      arms: both(function (x) { var sh = add(pc, [x * 31, -112, -2]), f = lerp(0, 86, t) * R; return { to: add(sh, mul([x * Math.sin(f), .05, Math.cos(f)], 114)), pole: [0, 1, 0], dir: [x * Math.sin(f), 0, Math.cos(f)] }; }),
      legs: both(function (x) { return { to: stand(x), pole: FWD }; }) });
    J._props = [bandLine(J.haa, J.hab)];
    return J;
  }
  function passThrough(p) { // Band Pass-Through: weiter Griff, gestreckte Arme von vorn über den Kopf nach hinten
    var t = rep(p, .42, .08), pc = [0, 222, -4], f = lerp(28, 332, t) * R, J = build({ pc: pc, a: 0, nod: 0,
      arms: both(function (x) { var d = norm([x * .62, Math.cos(f), Math.sin(f)]); return { to: add(add(pc, [x * 31, -112, -2]), mul(d, 114)), pole: [x, 0, 0], dir: d }; }),
      legs: both(function (x) { return { to: stand(x), pole: FWD }; }) });
    J._props = [bandLine(J.haa, J.hab)];
    return J;
  }
  function supine(o) { // Rückenlage: Becken am Boden, Kopf zeigt nach -z
    return build({ pc: o.pc || [0, 374, 0], a: -90, nod: o.nod || 0, arms: o.arms, legs: o.legs, props: o.props });
  }
  function supineTwist(p) { // Supine Spinal Twist: Rückenlage, Arme zur Seite. Ein Knie anwinkeln und zur Gegenseite ablegen, Schultern bleiben unten.
    var k = keys(p, [[0, { b: 0, d: 0 }], [.18, { b: 1, d: 0 }], [.4, { b: 1, d: 1 }], [.72, { b: 1, d: 1 }], [.86, { b: 1, d: 0 }], [1, { b: 0, d: 0 }]]);
    var J = supine({ pc: [0, 382, 0], nod: -4,
      arms: both(function (x) { return { to: [x * 142, 393, -108], pole: [0, -1, 0], dir: [x, .05, 0] }; }),
      legs: { a: { to: [-14, 390, 168], pole: UP, dir: [0, -1, .25] }, b: { to: lerp([14, 390, 168], [12, 392, 86], k.b), pole: [0, -1, .4], dir: lerp([0, -1, .25], [0, .25, 1], k.b) } } });
    return rollLeg(J, 'b', -78 * k.d);
  }

  function childsPose(p) { // Child's Pose: Po auf den Fersen, Stirn am Boden, Arme lang nach vorn, Hände flach
    var b = breathe(p), pc = [0, 350 - 3 * b, -22], a = 96 - 2 * b, u = trunkU(a);
    var sh = add(pc, mul(u, 112));
    return build({ pc: pc, a: a, nod: 6,
      arms: both(function (x) { return { to: [x * 30, 395, sh[2] + Math.sqrt(Math.max(0, 113 * 113 - Math.pow(395 - sh[1], 2)))], pole: [x * .2, -1, 0], dir: [0, .12, 1] }; }),
      legs: both(function (x) { return kneelLeg(pc, a, x, 391); }) });
  }

  function pigeon(p) { // Pigeon Stretch: vorderes Schienbein schräg am Boden, hinteres Bein lang, Oberkörper sinkt nach vorn
    var t = rep(p, .4, .2), pc = [0, 356, 4];
    return build({ pc: pc, a: lerp(38, 76, t), nod: lerp(0, 12, t),
      arms: both(function (x) { return { to: [x * 34, 386, lerp(88, 140, t)], pole: [x, -.2, -.5], dir: [0, .1, 1] }; }),
      legs: { a: { to: [-16, 390, -160], pole: DOWN, dir: [0, .2, -1] }, b: { to: [-26, 384, 76], pole: [1, .3, .7], dir: [-1, .2, .2] } } });
  }
  function supineHam(p) { // Supine Hamstring Stretch: ein Bein gestreckt nach oben, Handtuch um den Fuß
    var t = rep(p, .4, .2), f = lerp(72, 86, t) * R, hb = [18, 380, 6], an = add(hb, [0, -169 * Math.sin(f), 169 * Math.cos(f)]);
    var J = supine({ nod: -4,
      arms: both(function (x) { var sh = [x * 31, 374, -112]; return { to: add(sh, mul(norm(sub3(an, sh)), 84)), pole: [x * .5, 1, 0] }; }),
      legs: { a: { to: [-12, 384, 170], pole: UP }, b: { to: an, pole: [0, 0, 1], dir: [0, -.8, -.2] } } });
    J._props = [{ type: 'line', a: J.wra, b: add(J.tob, [0, -6, 0]), col: BAND, w: 3, layer: 'front' }, { type: 'line', a: J.wrb, b: add(J.tob, [0, -6, 0]), col: BAND, w: 3, layer: 'front' }];
    return J;
  }
  function kneelShin(p) { // Kneeling Shin Stretch: auf den Fersen, Fußrücken flach, Hände hinten am Boden; zurücklehnen, Knie heben sich leicht
    var t = rep(p, .4, .2), pc = [0, 350 - 6 * t, -20], a = lerp(-58, -64, t), u = trunkU(a), sh = add(pc, mul(u, 112));
    return build({ pc: pc, a: a, nod: lerp(-14, -20, t),
      arms: both(function (x) { return { to: [x * 34, 395, sh[2] - Math.sqrt(Math.max(0, 113 * 113 - Math.pow(395 - sh[1], 2)))], pole: [x * .3, -.2, 1], dir: [0, .12, -1] }; }),
      legs: both(function (x) { return kneelLeg(pc, a, x, 391 - 14 * t); }) });
  }


  function quad(o) { // Vierfüßler: Knie unter der Hüfte, Hände unter den Schultern
    var pc = o.pc || [0, 296, -112], S = o.S || [0, 280, 0];
    return build({ pc: pc, a: trunkTo(pc, S), nod: o.nod || -10,
      arms: o.arms || both(function (x) { return { to: [x * 30, 386, 0], pole: [x * .3, -.2, -1], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 12, 388, -196], pole: DOWN, dir: [0, .05, -1] }; }) });
  }
  function threadNeedle(p) { // Thread the Needle: Vierfüßler. Rechter Arm fädelt unter dem Körper durch (Handrücken am Boden), Schulter und Kopf sinken ab;
    // dann den Arm weit nach oben aufdrehen, Blick folgt. Hüfte bleibt über den Knien, die Stützhand bleibt stehen.
    var k = keys(p, [[0, { tw: 0, r: 0 }], [.3, { tw: 68, r: 1 }], [.44, { tw: 68, r: 1 }], [.72, { tw: -62, r: 2 }], [.86, { tw: -62, r: 2 }], [1, { tw: 0, r: 0 }]]);
    var pc = [0, 312, -108], HA = [-30, 393, 2];
    function mk(a) { var J0 = build({ pc: pc, a: a, nod: -10, arms: both(function (x) { return { to: [x * 30, 393, 2], pole: FWD }; }), legs: both(function (x) { return kneelLeg(pc, a, x, 391); }) }); return twist(J0, k.tw); }
    var best = 90, err = 1e9;
    for (var a0 = 80; a0 <= 125; a0 += .5) { var e = Math.abs(len(sub3(mk(a0).sha, HA)) - 112); if (e < err) { err = e; best = a0; } }
    var J = mk(best);
    J.hc = add(J.hc, [0, 0, 0]);
    reArm(J, 'a', HA, [-.3, -.2, -1], [0, .12, 1]);
    var floorB = [30, 393, 2], under = [-96, 393, 6], dU = norm(sub3(under, J.shb)), dUp = norm(sub3(J.shb, J.sha));
    var to = k.r <= 1 ? lerp(floorB, under, k.r) : add(J.shb, mul(norm(lerp(dU, dUp, k.r - 1)), 116)); // im Bogen nach oben, Arm bleibt lang
    return reArm(J, 'b', to, k.r <= 1 ? [0, -1, .3] : [0, 0, 1], k.r <= 1 ? lerp([0, .12, 1], [-1, .1, .1], k.r) : norm(sub3(J.shb, J.sha)));
  }

  function openBook(p) { // Open Book: Seitenlage, Knie 90°, oberer Arm öffnet im Bogen, der Blick folgt
    var t = rep(p, .42, .16), psi = lerp(0, 165, t);
    var J = supine({ pc: [0, 300, 0], nod: 0,
      arms: { a: { to: add([-31, 300, -112], mul([-Math.sin(psi * R), -Math.cos(psi * R), 0], 114)), pole: [0, 0, 1] }, b: { to: [31, 186, -112], pole: [0, 0, 1], dir: UP } },
      legs: both(function (x) { return { to: [x * 18, 220, 88], pole: UP, dir: FWD }; }) });
    twist(J, psi * .45);
    reArm(J, 'a', add(J.sha, mul([-Math.sin(psi * R), -Math.cos(psi * R), 0], 114)), [0, 0, 1]);
    reArm(J, 'b', add(J.shb, [0, -114, 0]), [0, 0, 1], UP);
    return turnAll(J, [0, 300, 0], [0, 0, 1], 90, 386); // auf die rechte Seite legen: Brust zeigt nach +x
  }
  function frog(p) { // Frog Stretch: Unterarme am Boden, Knie weit auseinander, Unterschenkel parallel nach hinten, Hüfte langsam nach hinten schieben
    var t = rep(p, .4, .2), kz = -96, pc = [0, lerp(344, 350, t), lerp(-66, -100, t)], a = lerp(90, 94, t);
    var J = build({ pc: pc, a: a, nod: 4,
      arms: both(function (x) { return { to: [x * 30, 394, 96], pole: [x * .2, 1, -.6], dir: [0, .12, 1] }; }), // Unterarme bleiben liegen
      legs: both(function (x) { return legVia(pc, a, x, [x * 84, 391, kz], [0, .03, -1], [x * .5, .1, -.8]); }) });
    return J;
  }

  function legsUpWall(p) { // Legs-Up-the-Wall: Po nah an der Wand, Beine gestreckt an der Wand
    var b = breathe(p), J = supine({ nod: -4,
      arms: both(function (x) { return { to: [x * 62, 386, -40 + 3 * b], pole: [x, -.3, 0], dir: [x * .3, 0, 1] }; }),
      legs: both(function (x) { return { to: [x * 12, 205, 14], pole: [0, 0, 1], dir: [0, -.3, -1] }; }) });
    J._props = wallBig(36);
    return J;
  }
  function puppy(p) { // Puppy Pose: Hüfte über den Knien, Hände weit vorn, Brust Richtung Boden
    var b = breathe(p), pc = [0, 300, -112], a = 102 + 6 * b, S = add(pc, mul(trunkU(a), 112));
    return quad({ pc: pc, S: S, nod: 10,
      arms: both(function (x) { return { to: [x * 30, 386, 96], pole: [x * .2, -1, 0], dir: [0, .1, 1] }; }) });
  }
  function barbell(c, w) { // Langhantel von der Seite: Stange und Scheiben
    w = w || 44;
    return [{ type: 'line', a: [-92, c[1], c[2]], b: [92, c[1], c[2]], w: 2, layer: 'front', keep: true },
      { type: 'circle', c: [-74, c[1], c[2]], r: w, hub: true, layer: 'back', keep: true }, { type: 'circle', c: [74, c[1], c[2]], r: w, hub: true, layer: 'front', keep: true }];
  }
  function deadlift(p) { // Deadlift: Stange über der Fußmitte und an den Schienbeinen, Rücken gerade, Arme senkrecht, Schultern knapp vor der Stange.
    // Erst drücken die Beine (Rückenwinkel bleibt), über dem Knie streckt die Hüfte. Die Stange läuft senkrecht.
    var t = 1 - rep(p, .4, .12), u = 1 - t; // u: 0 unten, 1 oben
    var k = keys(u, [[0, { y: 350, py: 305, pz: -71, a: 55 }], [.5, { y: 298, py: 258, pz: -66, a: 52 }], [1, { y: 216, py: 222, pz: -2, a: -2 }]]);
    var pc = [0, k.py, k.pz], sh = add(pc, mul(trunkU(k.a), 112)), dz = 10 - sh[2];
    var bar = [0, sh[1] + Math.sqrt(Math.max(0, 113 * 113 - dz * dz)), 10]; // Arme bleiben gestreckt, die Stange läuft senkrecht über der Fußmitte
    var J = build({ pc: pc, a: k.a, nod: lerp(-14, 0, u),
      arms: both(function (x) { return { to: [x * 33, bar[1], bar[2]], pole: [x * .3, 0, -1], dir: DOWN }; }),
      legs: both(function (x) { return { to: [x * 20, 390, 0], pole: [x * .15, 0, 1] }; }) });
    J._props = barbell(bar, 50);
    return J;
  }

  function backSquat(p) { // Back Squat: Stange auf dem oberen Rücken, unten below parallel
    var t = rep(p, .42, .08), pc = lerp([0, 222, -6], [0, 328, -40], t), a = lerp(2, 40, t);
    var u = trunkU(a), f = trunkF(a), bar = add(add(pc, mul(u, 116)), mul(f, -16));
    var J = build({ pc: pc, a: a, nod: lerp(0, -12, t),
      arms: both(function (x) { return { to: add(bar, [x * 58, 0, 0]), pole: [x * .5, 1, -.6], dir: UP }; }),
      legs: both(function (x) { return { to: [x * 22, 390, 0], pole: [x * .35, -.1, 1] }; }) });
    J._props = barbell(bar, 40);
    return J;
  }
  function doorPec(p) { // Doorway Pec Stretch: im Türrahmen, Unterarme senkrecht an den Pfosten, Ellbogen auf Schulterhöhe; ein Schritt nach vorn, Brust geht durch die Tür
    var t = rep(p, .4, .2), pc = [0, 222, lerp(-34, 4, t)];
    var J = build({ pc: pc, a: lerp(2, 6, t), nod: 0,
      arms: both(function (x) { return { to: [x * 82, 54, -10], pole: [x, .9, -.2], dir: UP }; }),
      legs: { a: { to: [-18, 390, lerp(-6, 40, t)], pole: FWD }, b: { to: [18, 390, -46], pole: FWD } } });
    J._props = doorFrame(90, -10);
    return J;
  }

  function prayer(p) { // Prayer Stretch: vor dem Sofa knien, Ellbogen auf der Kante, Hände zusammen. Hüfte nach hinten, Brust sinkt unter die Kante, Kopf zwischen die Arme
    var t = rep(p, .4, .2), E = [0, 303, 98], pc = lerp([0, 321, -36], [0, 345, -58], t), a = lerp(60, 88, t);
    var fd = norm(lerp([0, -1, -.1], [0, -.6, -.8], t));
    var J = build({ pc: pc, a: a, nod: lerp(8, 34, t),
      arms: both(function (x) { return { to: [x * 6, 250, 98], pole: FWD }; }),
      legs: both(function (x) { return legVia(pc, a, x, [x * 19, 391, 6], [0, .05, -1], [0, .06, -1]); }) });
    [['a', -1], ['b', 1]].forEach(function (q) { // Ellbogen liegen fest auf der Kante, Unterarme zusammen nach oben
      var el = [q[1] * 16, E[1], E[2]], wr = add([q[1] * 6, el[1], el[2]], mul(fd, 53));
      J['el' + q[0]] = el; J['wr' + q[0]] = wr; J['ha' + q[0]] = add(wr, mul(fd, 24)); J._to['wr' + q[0]] = wr;
    });
    J._props = sofa(104, 220, 309, 52, 70);
    return J;
  }



  function couch(p) { // Couch Stretch: hinteres Knie am Boden direkt vor dem Sofa, Schienbein senkrecht an der Vorderseite, Fußrücken liegt auf der Sitzfläche.
    // Vorderes Bein im rechten Winkel, Oberkörper aufrecht; Hüfte nach vorn schieben.
    var t = rep(p, .4, .2), K = [-19, 391, -64], hz = lerp(-42, -28, t), hy = K[1] - Math.sqrt(6400 - Math.pow(hz - K[2], 2));
    var pc = [0, hy - 6, hz], a = lerp(4, -2, t);
    var J = build({ pc: pc, a: a, nod: 0,
      arms: both(function (x) { return { to: [x * 10 + 12, hy - 14, hz + 66], pole: [x * .6, .3, -1], dir: [0, .5, .8] }; }),
      legs: { a: legVia(pc, a, -1, K, [0, -1, 0], [0, .04, -1]), b: { to: [19, 390, 62], pole: FWD } } });
    J._props = sofa(-70, -184, 314, 52, 72);
    return J;
  }

  function calfWall(p) { // Wall Calf Stretch: Hände an der Wand, hinteres Bein gestreckt, Ferse unten, Hüfte nach vorn
    var t = rep(p, .4, .2), pc = [0, lerp(232, 236, t), lerp(-2, 12, t)];
    var J = build({ pc: pc, a: lerp(12, 16, t), nod: 0,
      arms: both(function (x) { return { to: [x * 30, 156, 118], pole: [x * .6, .6, -.3], dir: [0, -.4, 1] }; }),
      legs: { a: { to: [-16, 390, -62], pole: FWD }, b: { to: [16, 390, 54], pole: FWD } } });
    J._props = wallPlane(124);
    return J;
  }

  function kneelLeg(pc, a, x, ky) { // Kniestand: Knie bei ky (391 = am Boden), Fuß bleibt flach am Boden hinten
    var u = trunkU(a), h = add(add(pc, mul(u, -6)), [18 * x, 0, 0]), dy = ky - h[1], kz = h[2] + Math.sqrt(Math.max(0, 6400 - dy * dy));
    var ay = 395, az = kz - Math.sqrt(Math.max(0, 82.4 * 82.4 - Math.pow(ay - ky, 2)));
    return { to: [x * 15, ay, az], pole: [0, 1, .3], dir: [0, .06, -1] };
  }

  function rollLeg(J, sd, deg) { // Bein samt Hüfte um die Längsachse durch das Becken kippen (Becken dreht mit)
    ['hi', 'kn', 'an', 'to'].forEach(function (q) { J[q + sd] = rotAround(J[q + sd], J.pc, [0, 0, 1], deg); });
    if (J._to) J._to['an' + sd] = J['an' + sd];
    return J;
  }
  function legVia(pc, a, x, knee, shin, dir) { // Bein über ein gewünschtes Knie: Knöchel = Knie + Schienbein-Richtung × 82
    var u = trunkU(a), h = add(add(pc, mul(u, -6)), [18 * x, 0, 0]), an = add(knee, mul(norm(shin), 82.5));
    return { to: an, pole: sub3(knee, mid(h, an)), dir: dir };
  }
  function doorFrame(x, z) { // Türrahmen von vorn: zwei Pfosten (mit Tiefe) und Sturz
    var l = [], top = -30, d = 18;
    [-1, 1].forEach(function (s) {
      l.push({ type: 'line', a: [s * x, FLOOR_Y, z], b: [s * x, top, z], w: 2, keep: true });
      l.push({ type: 'line', a: [s * (x + 14), FLOOR_Y, z], b: [s * (x + 14), top - 14, z], col: STYLE.far });
      l.push({ type: 'line', a: [s * x, FLOOR_Y, z - d], b: [s * x, top, z - d], col: STYLE.far });
    });
    l.push({ type: 'line', a: [-x, top, z], b: [x, top, z], w: 2, keep: true }, { type: 'line', a: [-x - 14, top - 14, z], b: [x + 14, top - 14, z], col: STYLE.far });
    return l;
  }
  function sofa(z0, z1, y, w, back) { // Sofa von der Seite (nahe Seite bei -x): Vorderkante bei z0, Sitzfläche bis z1, Höhe y, Lehne hinten
    var sg = z1 > z0 ? 1 : -1, zb = z1 + 26 * sg;
    return [{ type: 'poly', pts: [[-w, FLOOR_Y, z0], [-w, y, z0], [-w, y, z1], [-w, y - back, z1], [-w, y - back, zb], [-w, FLOOR_Y, zb]], open: true, keep: true },
      { type: 'line', a: [-w, y, z0], b: [w, y, z0], col: STYLE.far },
      { type: 'poly', pts: [[w, FLOOR_Y, z0], [w, y, z0], [w, y, z1], [w, y - back, z1], [w, y - back, zb], [w, FLOOR_Y, zb]], open: true, col: STYLE.far }];
  }



  var api = {
    STYLE: STYLE, PALETTES: PALETTES, STAND: STAND, figure: figure, fitBox: fitBox, frames: frames, animatedSVG: animatedSVG, play: play,
    build: build, ik3: ik3, rep: rep, sway: sway, ease: ease, rings: rings, bench: bench,
    // name, pose(p), Blickwinkel, Dauer einer Wiederholung (s), Boden zeichnen
    EXERCISES: {
      _wave: { name: 'Maskottchen winkt', pose: wave, yaw: 18, dur: 1.6 },
      g_air: { name: 'Air Squat', pose: function (p) { return air(rep(p)); }, yaw: 38, dur: 2.6 },
      g_pullup: { name: 'Ring Pull-up', pose: function (p) { return hang(p, false); }, yaw: 38, dur: 3, floor: false },
      g_push: { name: 'Push-up', pose: pushup, yaw: 62, dur: 2.6 },
      g_pistol: { name: 'Pistol Squat', pose: pistol, yaw: 55, dur: 3.2 },
      g_nordic: { name: 'Nordic Curl', pose: nordic, yaw: 70, dur: 4 },
      g_hollow: { name: 'Hollow Body Hold', pose: hollow, yaw: 62, dur: 4 },
      g_handstand: { name: 'Handstand', pose: handstand, yaw: 62, dur: 4 },
      g_dip: { name: 'Ring Dip', pose: dip, yaw: 45, dur: 2.8, floor: false },
      g_bridge: { name: 'Glute Bridge', pose: bridge, yaw: 62, dur: 2.8 },
      g_chinup: { name: 'Ring Chin-up', pose: function (p) { return hang(p, true); }, yaw: 38, dur: 3, floor: false },
      g_bss: { name: 'Bulgarian Split Squat', pose: bss, yaw: 58, dur: 3 },
      g_abwheel: { name: 'Ab Wheel Rollout', pose: abwheel, yaw: 66, dur: 3.4 },
      g_row: { name: 'Ring Row', pose: ringRow, yaw: 62, dur: 2.8 },
      g_pike: { name: 'Pike Push-up', pose: pikePush, yaw: 64, dur: 2.8 },
      g_lunge: { name: 'Reverse Lunge', pose: lunge, yaw: 58, dur: 2.8 },
      g_kneeraise: { name: 'Hanging Knee Raise', pose: kneeRaise, yaw: 50, dur: 2.6, floor: false },
      g_burpee: { name: 'Burpee', pose: burpee, yaw: 60, dur: 4 },
      g_squatjump: { name: 'Squat Jump', pose: squatJump, yaw: 38, dur: 2.4 },
      g_skater: { name: 'Skater Jump', pose: skater, yaw: 14, dur: 2.4 },
      g_tuck: { name: 'Slider Knee Tuck', pose: kneeTuck, yaw: 64, dur: 2.6 },
      g_ring_push: { name: 'Ring Push-up', pose: ringPush, yaw: 62, dur: 2.8 },
      g_hspu: { name: 'Strict Handstand Push-up', pose: hspu, yaw: 62, dur: 3.4 },
      g_lsit: { name: 'L-Sit', pose: lsit, yaw: 62, dur: 4 },
      g_mountain_climber: { name: 'Mountain Climber', pose: climber, yaw: 62, dur: 1.2 },
      g_plank: { name: 'Plank', pose: plank, yaw: 62, dur: 4 },
      g_hollow_rock: { name: 'Hollow Rock', pose: hollowRock, yaw: 62, dur: 1.8 },
      g_v_up: { name: 'V-up', pose: vup, yaw: 62, dur: 2.8 },
      g_slider_curl: { name: 'Slider Leg Curl', pose: legCurl, yaw: 62, dur: 3 },
      g_hip_thrust: { name: 'Hip Thrust', pose: hipThrust, yaw: 62, dur: 2.8 },
      g_scap: { name: 'Scapular Push-up', pose: scapPush, yaw: 62, dur: 2 },
      g_diamond_push: { name: 'Diamond Push-up', pose: diamond, yaw: 52, dur: 2.6 },
      g_split_squat: { name: 'Split Squat', pose: splitSquat, yaw: 58, dur: 2.8 },
      g_push_knee: { name: 'Knee Push-up', pose: pushKnee, yaw: 62, dur: 2.6 },
      g_push_parallettes: { name: 'Parallette Push-up', pose: pushPar, yaw: 62, dur: 2.8 },
      g_push_decline: { name: 'Decline Push-up', pose: pushDecline, yaw: 62, dur: 2.6 },
      g_push_band: { name: 'Banded Push-up', pose: pushBand, yaw: 56, dur: 2.6 },
      g_push_weighted: { name: 'Weighted Push-up', pose: pushVest, yaw: 62, dur: 2.6 },
      g_pistol_assisted: { name: 'Assisted Pistol Squat', pose: pistolDoor, yaw: 55, dur: 3.2 },
      g_pistol_box: { name: 'Box Pistol Squat', pose: pistolBox, yaw: 58, dur: 3.2 },
      g_free_handstand: { name: 'Freestanding Handstand', pose: freeHand, yaw: 62, dur: 4 },
      g_support_hold: { name: 'Ring Support Hold', pose: support, yaw: 45, dur: 4, floor: false },
      g_shrimp: { name: 'Shrimp Squat', pose: shrimp, yaw: 58, dur: 3.2 },
      g_ragdoll: { name: 'Ragdoll Hang', pose: ragdoll, yaw: 90, dur: 4 },
      g_forward_fold: { name: 'Standing Forward Fold', pose: forwardFold, yaw: 70, dur: 5 },
      g_pike_stretch: { name: 'Pike Stretch', pose: pikeStretch, yaw: 62, dur: 4 },
      g_jefferson_curl: { name: 'Jefferson Curl', pose: jefferson, yaw: 62, dur: 4, floor: false },
      g_deep_squat: { name: 'Deep Squat Hold', pose: deepSquat, yaw: 40, dur: 4 },
      g_overhead_squat_hold: { name: 'Overhead Deep Squat Hold', pose: ohSquat, yaw: 40, dur: 4 },
      g_wall_flexion_hold: { name: 'Wall Flexion Hold', pose: wallFlex, yaw: 42, dur: 3.6 },
      g_wall_slide: { name: 'Wall Slide', pose: wallSlide, yaw: 30, dur: 3 },
      g_wrist_extension_stretch: { name: 'Wrist Extension Stretch', pose: wristExt, yaw: 62, dur: 3.4 },
      g_planche_lean: { name: 'Planche Lean', pose: plancheLean, yaw: 62, dur: 3.4 },
      g_knee_to_wall: { name: 'Knee-to-Wall Mobilization', pose: kneeWall, yaw: 80, dur: 2.8 },
      // Runde 3
      g_stack: { name: 'Stack Breathing', pose: stack, yaw: 28, dur: 5 },
      g_wgs: { name: "World's Greatest Stretch", pose: wgs, yaw: 34, dur: 8 },
      g_pullapart: { name: 'Band Pull-Apart', pose: pullApart, yaw: 20, dur: 2.6 },
      g_passthrough: { name: 'Band Pass-Through', pose: passThrough, yaw: 74, dur: 3.2 },
      g_supine_twist: { name: 'Supine Spinal Twist', pose: supineTwist, yaw: -100, tilt: 40, mat: [-150, 150, -200, 200], dur: 7 },
      g_childs_pose: { name: "Child's Pose", pose: childsPose, yaw: 62, dur: 5 },
      g_pigeon: { name: 'Pigeon Stretch', pose: pigeon, yaw: 50, dur: 5 },
      g_supine_hamstring: { name: 'Supine Hamstring Stretch', pose: supineHam, yaw: 66, dur: 4 },
      g_kneeling_shin: { name: 'Kneeling Shin Stretch', pose: kneelShin, yaw: 64, dur: 4 },
      g_thread_needle: { name: 'Thread the Needle', pose: threadNeedle, yaw: 58, tilt: 24, mat: [-130, 120, -250, 70], dur: 7 },
      g_open_book: { name: 'Open Book', pose: openBook, yaw: 28, tilt: 38, mat: [-175, 195, -205, 140], dur: 5 },
      g_frog: { name: 'Frog Stretch', pose: frog, yaw: 205, tilt: 34, mat: [-150, 150, -230, 120], dur: 5 },
      g_legs_up_wall: { name: 'Legs-Up-the-Wall', pose: legsUpWall, yaw: 66, dur: 5 },
      g_puppy_pose: { name: 'Puppy Pose', pose: puppy, yaw: 62, dur: 5 },
      g_deadlift: { name: 'Deadlift', pose: deadlift, yaw: 64, dur: 3.2 },
      g_back_squat: { name: 'Back Squat', pose: backSquat, yaw: 50, dur: 3 },
      g_doorway_pec: { name: 'Doorway Pec Stretch', pose: doorPec, yaw: 50, tilt: 10, mat: [-130, 130, -120, 90], dur: 5 },
      g_prayer_stretch: { name: 'Prayer Stretch', pose: prayer, yaw: 62, dur: 4 },
      g_couch_stretch: { name: 'Couch Stretch', pose: couch, yaw: 64, dur: 4 },
      g_calf_wall_stretch: { name: 'Wall Calf Stretch', pose: calfWall, yaw: 60, dur: 4 }
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Maskottchen = api;
})(this);
