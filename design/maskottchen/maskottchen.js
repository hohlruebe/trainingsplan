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
    var st = STYLE, INK = st.ink;
    var c = Math.cos(yaw * R), s = Math.sin(yaw * R), f = s;
    var boil = Math.floor((frame || 0) / st.boilStep) * 1009;
    // V-Form: Schultern und Arme nach außen
    var K = {}, k;
    for (k in J) K[k] = J[k].slice();
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
      return '<circle cx="' + n1(p[0]) + '" cy="' + n1(p[1]) + '" r="' + r + '" fill="#fff" stroke="' + col + '" stroke-width="1.3"/>';
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
    var g = opt.floor === false ? '' : '<line x1="20" x2="300" y1="' + FLOOR_Y + '" y2="' + FLOOR_Y + '" stroke="' + st.floor + '" stroke-width="2" stroke-linecap="round"/>';
    var fc = side ? st.far : INK;
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
    g += limbs(near, INK);
    return { svg: g, ext: ext };
  }

  /* Bildausschnitt über alle Bilder einer Bewegung, damit nie etwas abgeschnitten wird. */
  function fitBox(exts, margin) {
    margin = margin == null ? 26 : margin;
    var x0 = 1e9, x1 = -1e9, y0 = 1e9;
    exts.forEach(function (e) { e.forEach(function (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); }); });
    x0 -= margin; x1 += margin; y0 -= margin;
    return [Math.round(x0), Math.round(y0), Math.round(x1 - x0), Math.round(FLOOR_Y + 9 - y0)];
  }

  /* Eine Übung = Funktion pose(p) mit p von 0 bis 1 über eine Wiederholung, liefert 3D-Gelenke.
     ex = {pose, yaw, dur (s)}. Liefert alle Bilder und den gemeinsamen Ausschnitt. */
  function frames(ex) {
    var n = Math.round(ex.dur * STYLE.fps), list = [], exts = [];
    for (var i = 0; i < n; i++) { var r = figure(ex.pose(i / n), ex.yaw, i); list.push(r.svg); exts.push(r.ext); }
    return { frames: list, box: fitBox(exts), n: n, dur: ex.dur };
  }

  /* Für Entwürfe: eine SVG-Datei mit SMIL-Animation (läuft ohne Skript). */
  function animatedSVG(ex, w, h) {
    var F = frames(ex), N = F.n, out = '';
    F.frames.forEach(function (svg, i) {
      var vals, kt;
      if (i === 0) { vals = '1;0'; kt = '0;' + (1 / N).toFixed(4); }
      else if (i === N - 1) { vals = '0;1'; kt = '0;' + (i / N).toFixed(4); }
      else { vals = '0;1;0'; kt = '0;' + (i / N).toFixed(4) + ';' + ((i + 1) / N).toFixed(4); }
      out += '<g opacity="' + (i ? 0 : 1) + '"><animate attributeName="opacity" calcMode="discrete" values="' + vals + '" keyTimes="' + kt + '" dur="' + F.dur + 's" repeatCount="indefinite"/>' + svg + '</g>';
    });
    return '<svg viewBox="' + F.box.join(' ') + '" width="' + w + '" height="' + h + '" preserveAspectRatio="xMidYMid meet">' + out + '</svg>';
  }

  /* Für die App: zeichnet live in ein Element, Bild für Bild. Gibt eine Stopp-Funktion zurück. */
  function play(el, ex) {
    var F = frames(ex), i = 0, stop = false, last = 0;
    el.innerHTML = '<svg viewBox="' + F.box.join(' ') + '" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"></svg>';
    var svg = el.firstChild;
    function tick(t) {
      if (stop) return;
      if (t - last >= 1000 / STYLE.fps) { last = t; svg.innerHTML = F.frames[i]; i = (i + 1) % F.n; }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    return function () { stop = true; };
  }

  // ---- Bausteine für Posen ----
  function ik2(h, a, l1, l2) { // Knie (oder Ellbogen) in der y-z-Ebene, beugt nach vorn (+z)
    var dy = a[1] - h[1], dz = a[2] - h[2], D = Math.min(Math.hypot(dy, dz), l1 + l2 - .01);
    var base = Math.atan2(dz, dy), k = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + D * D - l2 * l2) / (2 * l1 * D))));
    var t = base + k;
    return [h[0] + (a[0] - h[0]) * .4, h[1] + l1 * Math.cos(t), h[2] + l1 * Math.sin(t)];
  }
  function ease(x) { return .5 - .5 * Math.cos(Math.PI * x); }

  // ---- Beispiel-Übung: Air Squat (runter 42 %, unten halten, hoch 42 %, oben halten) ----
  function squat(t) {
    var J = {}, k; for (k in STAND) J[k] = STAND[k].slice();
    var pc = [0, 222 + 78 * t, -4 - 34 * t]; J.pc = pc;
    var lean = 38 * t * R;
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
  function squatCycle(p) {
    if (p < .42) return squat(ease(p / .42));
    if (p < .5) return squat(1);
    if (p < .92) return squat(1 - ease((p - .5) / .42));
    return squat(0);
  }

  var api = {
    STYLE: STYLE, STAND: STAND, figure: figure, fitBox: fitBox, frames: frames, animatedSVG: animatedSVG, play: play,
    ik2: ik2, ease: ease,
    EXERCISES: { air_squat: { pose: squatCycle, yaw: 38, dur: 2.6 } }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Maskottchen = api;
})(this);
