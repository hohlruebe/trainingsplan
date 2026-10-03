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

  // Farbsätze: hell ist der Standard (STYLE). Dunkel für den Dunkelmodus der App.
  var PALETTES = { dark: { ink: '#E4E3F7', far: '#6D6B9C', action: '#F0A04B', floor: '#3A3B40', joint: '#1A1B1E' } };

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
    var boil = Math.floor((frame || 0) / st.boilStep) * 1009;
    // V-Form: Schultern und Arme nach außen
    var K = {}, k;
    for (k in J) if (k.charAt(0) !== '_') K[k] = J[k].slice();
    var props = J._props || [];
    [['a', -1], ['b', 1]].forEach(function (q) {
      for (var j in st.shoulder) K[j + q[0]][0] += q[1] * st.shoulder[j];
    });
    var P = {}, Z = {}, ext = [];
    for (k in K) { var v = K[k]; P[k] = [160 + v[0] * c + v[2] * s, v[1]]; Z[k] = -v[0] * s + v[2] * c; ext.push(P[k]); }
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
    function pr(p) { return [160 + p[0] * c + p[2] * s, p[1]]; }
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
    var g = opt.floor === false ? '' : '<line x1="-400" x2="720" y1="' + FLOOR_Y + '" y2="' + FLOOR_Y + '" stroke="' + st.floor + '" stroke-width="2" stroke-linecap="round"/>';
    var fc = side ? st.far : INK;
    g += layer('back');
    g += limbs(farr, fc);
    // Rumpf: Winkel und Verkürzung aus der Wirbelsäule
    var sp = sub3(K.nb, K.pc), L3 = Math.hypot(sp[0], sp[1], sp[2]) || 1;
    var dx = sp[0] * c + sp[2] * s, dy = sp[1], th = Math.atan2(dx, -dy) / R, ratio = Math.max(.55, Math.hypot(dx, dy) / L3);
    var RX = Math.hypot(st.ribW * c, st.ribD * s), RY = st.ribH * ratio, PX = Math.hypot(st.pelW * c, st.pelD * s);
    var nb = P.nb, rc = loc(nb, th, [0, RY]), pc = P.pc;
    var hs = sub3(K.hc, K.nb), hth = Math.atan2(hs[0] * c + hs[2] * s, -hs[1]) / R;
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
    for (var i = 0; i < n; i++) { var r = figure(ex.pose(i / n), ex.yaw, i, { floor: ex.floor, pal: P }); list.push(r.svg); exts.push(r.ext); }
    return { frames: list, box: fitBox(exts, ex.floor), n: n, dur: ex.dur };
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
  function ik3(root, target, l1, l2, pole) {
    var d = sub3(target, root), D = Math.min(len(d), l1 + l2 - .01), dir = norm(d);
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
      J['to' + sd] = add(lg[1], mul(norm(L.dir || add(mul(fw, 1), [0, .28, 0])), LEN.foot));
    });
    J._props = o.props || [];
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
    var t = rep(p, .4, .1), RY = 30, gx = chin ? 22 : 28;
    var pc = [0, lerp(266, 157, t), lerp(13.7, 6, t)], a = lerp(-6, -12, t); // unten toter Hang: Arme ganz gestreckt
    return build({ pc: pc, a: a, nod: lerp(0, -10, t),
      arms: both(function (x) { return { to: [x * gx, RY + 12, 0], pole: [x * (chin ? .3 : .8), .5, chin ? .9 : .4], dir: [0, -1, 0] }; }),
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
    var t = rep(p), RY = 150, pc = [0, lerp(144, 205, t), lerp(-9.7, -20, t)], a = lerp(6, 26, t); // oben Arme ganz gestreckt, unten Oberarm waagerecht
    return build({ pc: pc, a: a, nod: lerp(0, -8, t),
      arms: both(function (x) { return { to: [x * 27, RY - 4, 0], pole: [x * .25, 0, -1], dir: [0, .35, 1] }; }),
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


  var api = {
    STYLE: STYLE, PALETTES: PALETTES, STAND: STAND, figure: figure, fitBox: fitBox, frames: frames, animatedSVG: animatedSVG, play: play,
    build: build, ik3: ik3, rep: rep, sway: sway, ease: ease, rings: rings, bench: bench,
    // name, pose(p), Blickwinkel, Dauer einer Wiederholung (s), Boden zeichnen
    EXERCISES: {
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
      g_abwheel: { name: 'Ab Wheel Rollout', pose: abwheel, yaw: 66, dur: 3.4 }
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Maskottchen = api;
})(this);
