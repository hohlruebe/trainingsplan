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
    // entlang der Schulterlinie, damit gedrehte oder liegende Figuren ihre Schultern behalten
    var SL = norm(sub3(J.shb, J.sha)), SLj = sub3(J.shb, J.sha), turned = !!(J._tw || opt.tilt || Math.abs(SLj[1]) + Math.abs(SLj[2]) > 3);
    // gedrehte oder liegende Figur: ohne V-Verschiebung, damit die Schultern im mitgedrehten Brustkorb sitzen
    if (!turned) [['a', -1], ['b', 1]].forEach(function (q) {
      for (var j in st.shoulder) K[j + q[0]] = add(K[j + q[0]], mul(SL, q[1] * st.shoulder[j]));
    });
    var P = {}, Z = {}, ext = [];
    for (k in K) { var v = K[k]; P[k] = prj(v); Z[k] = -v[0] * s + v[2] * c; ext.push(P[k]); }
    var near = (Z.sha + Z.hia >= Z.shb + Z.hib) ? 'a' : 'b', farr = near === 'a' ? 'b' : 'a';
    var side = Math.abs(s) > .35;
    var count = 0;
    function S(shape, col, fillShape, so) { // Skizzenstrich: Hauptlinie und zwei leicht versetzte Nebenlinien; fillShape = Fläche darunter (deckend, opt.solid)
      // so.seed: ruhiger Strich (Geräte, Dennis: „wabern komisch“): Nebenlinien fest, wechseln nicht von Bild zu Bild; so.sw: eigene Strichbreite (Nebenlinien 0,6 davon)
      count++; so = so || {};
      var r = rng(so.seed != null ? so.seed * 131 + 17 : count * 7 + boil), bw = so.sw || st.sw, out = opt.solid && fillShape ? '<g fill="' + st.panel + '" stroke="none">' + fillShape + '</g>' : '';
      for (var i = 0; i < st.passes; i++) {
        var tr = '';
        if (i > 0) tr = ' transform="translate(' + n1((r() * 2 - 1) * st.jit) + ' ' + n1((r() * 2 - 1) * st.jit) + ') rotate(' + n1((r() * 2 - 1) * .8) + ')"';
        out += '<g stroke-width="' + n1(i === 0 ? bw : bw * .6) + '" opacity="' + (i === 0 ? 1 : .5) + '"' + tr + '>' + shape + '</g>';
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
        var sp_ = '<path d="' + d + '" transform="translate(' + n1(cx) + ' ' + n1(cy) + ') rotate(' + n1(ang(a, b)) + ')"/>';
        return S(sp_, col, sp_);
      }
      var se_ = '<ellipse rx="' + n1(Math.max(L / 2 * (1 + ext_), wd)) + '" ry="' + n1(wd) + '" transform="translate(' + n1(cx) + ' ' + n1(cy) +
        ') rotate(' + n1(L > .5 ? ang(a, b) : 0) + ')"/>';
      return S(se_, col, se_);
    }
    function jnt(p, r, col) {
      return '<circle cx="' + n1(p[0]) + '" cy="' + n1(p[1]) + '" r="' + r + '" fill="' + st.joint + '" stroke="' + col + '" stroke-width="1.3"/>';
    }
    function limbs(sd, col) {
      if (opt.solid) { // deckend: jedes Glied einzeln nach Tiefe, das Gelenk am Ende gehört dazu
        var zz = function (a, b) { return (Z[a + sd] + Z[b + sd]) / 2; }, cap = '<ellipse rx="11" ry="8.5" transform="translate(' + n1(P['sh' + sd][0]) + ' ' + n1(P['sh' + sd][1]) + ') rotate(' +
          n1(ang(P['sh' + sd], P['el' + sd])) + ') translate(5 0)"/>';
        return [[zz('hi', 'kn'), segm(P['hi' + sd], P['kn' + sd], 11, col, .1) + jnt(P['hi' + sd], 5.5, col) + jnt(P['kn' + sd], 5.2, col)],
          [zz('kn', 'an'), segm(P['kn' + sd], P['an' + sd], 8.5, col, .1) + jnt(P['kn' + sd], 5.2, col)],
          [zz('an', 'to'), segm(P['an' + sd], P['to' + sd], 5, col, .25) + jnt(P['an' + sd], 4, col)],
          [zz('sh', 'el'), S(cap, col, cap) + segm(P['sh' + sd], P['el' + sd], 8, col, .1) + jnt(P['sh' + sd], 5.5, col) + jnt(P['el' + sd], 4.5, col)],
          [zz('el', 'wr'), segm(P['el' + sd], P['wr' + sd], 6.5, col, .1) + jnt(P['el' + sd], 4.5, col)],
          [zz('wr', 'ha'), segm(P['wr' + sd], P['ha' + sd], 4.6, col, .2) + jnt(P['wr' + sd], 3.4, col)]];
      }
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
    function prop(o) { // Geräte im selben Skizzenstrich, aber ruhig (feste Nebenlinien) und mit eigener Breite o.w
      var col = o.col === STYLE.far ? st.far : o.col || INK, sh = '', so = { seed: props.indexOf(o) + 1, sw: o.w };
      if (o.type === 'line') { var a = pr(o.a), b = pr(o.b); sh = '<path d="M' + n1(a[0]) + ' ' + n1(a[1]) + ' L' + n1(b[0]) + ' ' + n1(b[1]) + '"/>'; }
      else if (o.type === 'poly') { sh = '<path d="M' + o.pts.map(function (p) { p = pr(p); return n1(p[0]) + ' ' + n1(p[1]); }).join(' L') + (o.open ? '' : ' Z') + '"/>'; }
      else if (o.type === 'circle') { // Kreis in der y-z-Ebene (Ring, Rad, Rolle)
        var m = pr(o.c), rx = Math.max(o.r * Math.abs(s), o.r * .3);
        sh = '<ellipse cx="' + n1(m[0]) + '" cy="' + n1(m[1]) + '" rx="' + n1(rx) + '" ry="' + o.r + '"/>';
        if (o.hub) sh += '<ellipse cx="' + n1(m[0]) + '" cy="' + n1(m[1]) + '" rx="' + n1(rx * .3) + '" ry="' + n1(o.r * .3) + '"/>';
        if (o.spokes) for (var si = 0; si < o.spokes; si++) { var sa = (si / o.spokes + (o.rot || 0)) * 2 * Math.PI; // Speichen bzw. Lüfterflügel, drehen mit o.rot
          sh += '<path d="M' + n1(m[0] + rx * .3 * Math.sin(sa)) + ' ' + n1(m[1] + o.r * .3 * Math.cos(sa)) + ' L' + n1(m[0] + rx * .92 * Math.sin(sa)) + ' ' + n1(m[1] + o.r * .92 * Math.cos(sa)) + '"/>'; }
        if (o.fill && opt.solid) { if (o.keep) ext.push([m[0] - rx, m[1] - o.r], [m[0] + rx, m[1] + o.r]); return S(sh, col, '<ellipse cx="' + n1(m[0]) + '" cy="' + n1(m[1]) + '" rx="' + n1(rx) + '" ry="' + o.r + '"/>', so); }
      }
      else if (o.type === 'ball') { // Ball: im Bild immer rund, mit Naht
        var bm = pr(o.c); sh = '<circle cx="' + n1(bm[0]) + '" cy="' + n1(bm[1]) + '" r="' + o.r + '"/><path d="M' + n1(bm[0] - o.r) + ' ' + n1(bm[1]) + ' Q' + n1(bm[0]) + ' ' + n1(bm[1] + o.r * .7) + ' ' + n1(bm[0] + o.r) + ' ' + n1(bm[1]) + '"/>';
        if (o.keep) ext.push([bm[0] - o.r, bm[1] - o.r], [bm[0] + o.r, bm[1] + o.r]);
        return S(sh, col, opt.solid ? '<circle cx="' + n1(bm[0]) + '" cy="' + n1(bm[1]) + '" r="' + o.r + '"/>' : null, so);
      }
      else if (o.type === 'kb') { // Kettlebell: Griff bei o.g (in der Hand), Kugel in Richtung o.dn, im Bild immer rund
        var gp = pr(o.g), cp = pr(add(o.g, mul(norm(o.dn), o.r + 13))), w = [gp[0] - cp[0], gp[1] - cp[1]], wl = Math.hypot(w[0], w[1]) || 1;
        w = [w[0] / wl, w[1] / wl]; var nv = [-w[1], w[0]], r0 = o.r;
        // Wird die Kugel stark verkürzt (zeigt zur Kamera), bleibt der Griff trotzdem über der Kugel.
        if (wl < r0) { cp = [gp[0] - w[0] * (r0 + 8), gp[1] - w[1] * (r0 + 8)]; }
        var P2 = function (u, v) { return n1(cp[0] + w[0] * u + nv[0] * v) + ' ' + n1(cp[1] + w[1] * u + nv[1] * v); };
        var tip = [gp[0] + w[0] * 3, gp[1] + w[1] * 3], T2 = function (u, v) { return n1(tip[0] + w[0] * u + nv[0] * v) + ' ' + n1(tip[1] + w[1] * u + nv[1] * v); };
        sh = '<circle cx="' + n1(cp[0]) + '" cy="' + n1(cp[1]) + '" r="' + r0 + '"/>' +
          '<path d="M' + P2(r0 * .55, r0 * .72) + ' C' + T2(-4, r0 * .95) + ' ' + T2(2, r0 * .6) + ' ' + T2(2, 0) + ' C' + T2(2, -r0 * .6) + ' ' + T2(-4, -r0 * .95) + ' ' + P2(r0 * .55, -r0 * .72) + '"/>' +
          '<path d="M' + P2(-r0 * .86, r0 * .5) + ' L' + P2(-r0 * .86, -r0 * .5) + '"/>';
        if (o.keep) [cp, gp].forEach(function (q) { ext.push([q[0] - r0, q[1] - r0], [q[0] + r0, q[1] + r0]); });
        return S(sh, col, null, so);
      }
      if (o.keep) (o.type === 'circle' ? [o.c] : o.type === 'line' ? [o.a, o.b] : o.pts).forEach(function (p) { ext.push(pr(p)); });
      return S(sh, col, opt.solid && o.fill ? sh : null, so); // o.fill: Fläche (Plyo-Box, AbMat)
    }
    function layer(l) { return props.filter(function (o) { return (o.layer || 'back') === l; }).map(prop).join(''); }
    var g = opt.floor === false ? '' : opt.tilt ? '' : '<line x1="-400" x2="720" y1="' + FLOOR_Y + '" y2="' + FLOOR_Y + '" stroke="' + st.floor + '" stroke-width="2" stroke-linecap="round"/>';
    if (opt.mat) { // Matte am Boden (bei Kamera von oben statt der Bodenlinie)
      var mt = opt.mat, mp = [[mt[0], FLOOR_Y, mt[2]], [mt[1], FLOOR_Y, mt[2]], [mt[1], FLOOR_Y, mt[3]], [mt[0], FLOOR_Y, mt[3]]].map(prj);
      g += '<path d="M' + mp.map(function (q) { return n1(q[0]) + ' ' + n1(q[1]); }).join(' L') + ' Z" fill="' + st.floor + '" fill-opacity=".35" stroke="' + st.floor + '" stroke-width="2" stroke-linejoin="round"/>';
      mp.forEach(function (q) { ext.push(q); });
    }
    var fc = side ? st.far : INK;
    if (!opt.solid) g += layer('back');
    var farL = limbs(farr, fc); if (!opt.solid) g += farL;
    // Rumpf: Winkel und Verkürzung aus der Wirbelsäule
    var sp = sub3(K.nb, K.pc), L3 = Math.hypot(sp[0], sp[1], sp[2]) || 1;
    var dx = P.nb[0] - P.pc[0], dy = P.nb[1] - P.pc[1], th = Math.atan2(dx, -dy) / R, ratio = Math.max(.55, Math.hypot(dx, dy) / L3);
    var RX = Math.hypot(st.ribW * c, st.ribD * s), RY = st.ribH * ratio, PX = Math.hypot(st.pelW * c, st.pelD * s);
    var nb = P.nb, rc = loc(nb, th, [0, RY]), pc = P.pc, PH = st.pelH, mf = c > -.2 ? f * .9 : -f * .9;
    // Gedrehter Oberkörper, liegende Figur oder Kamera von oben: Brustkorb und Becken als Körper im Raum, ausgerichtet an Wirbelsäule,
    // Schulter- und Hüftlinie, und so ins Bild gebracht. Dann sitzen Schultern und Hüften in jeder Lage am Rumpf.
    if (turned) {
      var Uv = norm(sub3(J.nb, J.pc)), orth = function (v) { return norm(sub3(v, mul(Uv, dot(v, Uv)))); };
      var Lv = orth(SLj), Fv = norm(cross(Uv, Lv)), Lh = orth(sub3(J.hib, J.hia));
      var pv = function (v) { return [v[0] * c + v[2] * s, v[1] * tc + (-v[0] * s + v[2] * c) * ts]; };
      var sl = Math.hypot(dx, dy) || 1, s2 = [dx / sl, dy / sl], p2 = [-s2[1], s2[0]];
      var extOf = function (ax, d) { return Math.sqrt(ax.reduce(function (t, a) { var q = pv(a); return t + Math.pow(q[0] * d[0] + q[1] * d[1], 2); }, 0)); };
      var ribAx = [mul(Lv, st.ribW), mul(Uv, st.ribH), mul(Fv, st.ribD)], pelAx = [mul(Lh, st.pelW), mul(Uv, st.pelH), mul(Fv, st.pelD)];
      RX = extOf(ribAx, p2); RY = extOf(ribAx, s2); PX = extOf(pelAx, p2); PH = extOf(pelAx, s2);
      rc = prj(sub3(J.nb, mul(Uv, st.ribH)));
      var fq = pv(Fv), fx = fq[0] * p2[0] + fq[1] * p2[1];
      mf = (-Fv[0] * s + Fv[2] * c) > -.2 ? fx * .9 : -fx * .9;
    }
    // Gekrümmte Wirbelsäule (J._bend, z. B. Cat-Cow): Brustkorb und Becken eigene Achsen (3D, Richtung zum Kopf), Brustkorb verschoben.
    var thR = th, thP = th, B = J._bend;
    if (B) {
      var ang2 = function (v) { var q = prj(add(J.pc, v)), o = prj(J.pc); return Math.atan2(q[0] - o[0], -(q[1] - o[1])) / R; };
      if (B.rib) thR = ang2(B.rib); if (B.pel) thP = ang2(B.pel);
      if (!turned) rc = loc(nb, thR, [0, RY]);
      if (B.rc) { var o1 = prj(J.nb), o2 = prj(add(J.nb, B.rc)); rc = [rc[0] + o2[0] - o1[0], rc[1] + o2[1] - o1[1]]; }
    }
    var hth = Math.atan2(P.hc[0] - P.nb[0], -(P.hc[1] - P.nb[1])) / R;
    var hb = loc(P.hc, hth, [0, 18]);
    var a1 = loc(hb, hth, [-6, 0]), a2 = loc(nb, th, [-7, 4]), b1 = loc(hb, hth, [6, 0]), b2 = loc(nb, th, [7, 4]);
    var t0 = g.length; // ab hier Rumpf (für opt.solid getrennt nach Tiefe)
    g += S('<path d="M' + n1(a1[0]) + ' ' + n1(a1[1]) + ' L' + n1(a2[0]) + ' ' + n1(a2[1]) + ' M' + n1(b1[0]) + ' ' + n1(b1[1]) + ' L' + n1(b2[0]) + ' ' + n1(b2[1]) + '"/>', INK);
    var wl = [loc(rc, thR, [-RX * .8, RY * .55]), loc(rc, thR, [-RX * st.waist, RY * 1.15]), loc(pc, thP, [-PX * .85, -8])];
    var wr = [loc(rc, thR, [RX * .8, RY * .55]), loc(rc, thR, [RX * st.waist, RY * 1.15]), loc(pc, thP, [PX * .85, -8])];
    function q3(w) { return 'M' + n1(w[0][0]) + ' ' + n1(w[0][1]) + ' Q' + n1(w[1][0]) + ' ' + n1(w[1][1]) + ' ' + n1(w[2][0]) + ' ' + n1(w[2][1]); }
    // Schulterpartie (Dennis, 1. November: Lücke zwischen Schultergelenk und Körper): von der Brustkorb-Seite zur Schulter, über den Nacken zur anderen
    var sA = P.sha, sB = P.shb, d2 = function (u, v) { return Math.hypot(u[0] - v[0], u[1] - v[1]); };
    var rA = d2(sA, wl[0]) + d2(sB, wr[0]) <= d2(sA, wr[0]) + d2(sB, wl[0]) ? wl[0] : wr[0], rB = rA === wl[0] ? wr[0] : wl[0], nk = loc(nb, th, [0, 3]);
    var gird = 'M' + n1(rA[0]) + ' ' + n1(rA[1]) + ' L' + n1(sA[0]) + ' ' + n1(sA[1]) + ' Q' + n1(nk[0]) + ' ' + n1(nk[1]) + ' ' + n1(sB[0]) + ' ' + n1(sB[1]) + ' L' + n1(rB[0]) + ' ' + n1(rB[1]);
    g += S('<path d="' + gird + '"/>', INK, '<path d="' + gird + ' Z"/>');
    var wFill = '<path d="' + q3(wl) + ' L' + n1(wr[2][0]) + ' ' + n1(wr[2][1]) + ' Q' + n1(wr[1][0]) + ' ' + n1(wr[1][1]) + ' ' + n1(wr[0][0]) + ' ' + n1(wr[0][1]) + ' Z"/>';
    g += S('<path d="' + q3(wl) + ' ' + q3(wr) + '"/>', INK, wFill);
    var pel = '<ellipse rx="' + n1(PX) + '" ry="' + n1(PH) + '"/><path d="' + mer(PX, PH, mf) + '"/><path d="' + equ(PX, PH, -.1, .12) + '" opacity=".7"/>';
    g += '<g transform="translate(' + n1(pc[0]) + ' ' + n1(pc[1]) + ') rotate(' + n1(thP) + ')">' + S(pel, INK, '<ellipse rx="' + n1(PX) + '" ry="' + n1(PH) + '"/>') + '</g>';
    var rib = egg(RX, RY) + '<path d="' + mer(RX * .95, RY, mf) + '"/>';
    [[-.3, .07], [.42, .12]].forEach(function (q) { rib += '<path d="' + equ(RX * 1.02, RY, q[0], q[1]) + '" opacity=".7"/>'; });
    g += '<g transform="translate(' + n1(rc[0]) + ' ' + n1(rc[1]) + ') rotate(' + n1(thR) + ')">' + S(rib, INK, egg(RX, RY).replace('fill="none" ', '')) + '</g>';
    var t1 = g.length;
    // Kopf: Augen, Nase und Mund nur, wenn das Gesicht zum Betrachter zeigt
    // Blickrichtung des Kopfes: wie der Körper, oder eigene (J._hf, z. B. zur hochgestreckten Hand)
    var ye = yaw * R + (J._hf ? Math.atan2(J._hf[0], J._hf[2]) : 0), hc_ = Math.cos(ye), hf_ = Math.sin(ye);
    var hx = Math.hypot(15.5 * hc_, 18.5 * hf_), hy = 20;
    var hd = '<path d="M0 ' + (-hy) + ' C' + n1(hx * 1.35) + ' ' + (-hy) + ' ' + n1(hx * 1.1) + ' ' + n1(hy * .9) + ' 0 ' + hy +
      ' C' + n1(-hx * 1.1) + ' ' + n1(hy * .9) + ' ' + n1(-hx * 1.35) + ' ' + (-hy) + ' 0 ' + (-hy) + ' Z"/>';
    hd += '<path d="' + mer(hx, hy, hc_ > -.2 ? hf_ * .95 : -hf_ * .95) + '"/><path d="' + equ(hx, hy, .05, .06) + '"/>';
    [-.55, .55].forEach(function (e) {
      var a = ye + e;
      if (Math.cos(a) > .15) hd += '<path d="M' + n1(Math.sin(a) * hx * 1.05 - 2.5) + ' -1 q2.5 -2.6 5 0"/>';
    });
    if (hc_ > -.2) {
      var nx = hf_ * hx * 1.02, sx = hf_ >= 0 ? 1 : -1, nl = 1 + 4 * Math.abs(hf_);
      hd += '<path d="M' + n1(nx) + ' 1 l' + n1(sx * nl) + ' 6 l' + n1(-sx * nl) + ' 2"/>';
      if (hc_ > .4) hd += '<path d="M' + n1(nx - 3) + ' 12 q3 1.5 6 0"/>';
    }
    var hOut = '<path d="M0 ' + (-hy) + ' C' + n1(hx * 1.35) + ' ' + (-hy) + ' ' + n1(hx * 1.1) + ' ' + n1(hy * .9) + ' 0 ' + hy + ' C' + n1(-hx * 1.1) + ' ' + n1(hy * .9) + ' ' + n1(-hx * 1.35) + ' ' + (-hy) + ' 0 ' + (-hy) + ' Z"/>';
    g += '<g transform="translate(' + n1(P.hc[0]) + ' ' + n1(P.hc[1]) + ') rotate(' + n1(hth) + ')">' + S(hd, INK, hOut) + '</g>';
    var t2 = g.length;
    var top = loc(P.hc, hth, [hc_ > -.2 ? hf_ * 4 : 0, -22]); ext.push(top);
    g += '<path d="' + smooth([top, nb, rc, pc, P.kna, P.ana]) + '" fill="none" stroke="' + st.action + '" stroke-width="' + st.loa + '" stroke-linecap="round" opacity=".85"/>';
    if (opt.solid) { // deckend (Dennis: sonst wird es ein Gewirr von Linien): Rumpf, Kopf und jedes Glied nach Tiefe, hinten zuerst, mit Fläche gefüllt
      var torso = g.slice(t0, t1), head = g.slice(t1, t2), loa = g.slice(t2); g = g.slice(0, t0);
      var items = farL.concat(limbs(near, INK), [[(Z.pc + Z.nb) / 2, torso + loa], [Z.hc, head]]);
      // Geräte ebenso nach Tiefe (Dennis: beim Ring Dip gehört das vordere Seil vor den Körper); Flächen hinter der Figur (Wand) bleiben hinten
      var zOf = function (v) { return -v[0] * s + v[2] * c; };
      props.forEach(function (o) {
        var pts = o.type === 'line' ? [o.a, o.b] : o.type === 'poly' ? o.pts : o.type === 'circle' || o.type === 'ball' ? [o.c] : o.type === 'kb' ? [o.g] : [];
        var z = pts.length ? pts.reduce(function (t, v) { return t + zOf(v); }, 0) / pts.length : -1e9;
        items.push([o.layer === 'back' && o.flat ? -1e9 : o.layer === 'front' && o.top ? 1e9 : z, prop(o)]);
      });
      items.sort(function (x, y) { return x[0] - y[0]; }).forEach(function (it) { g += it[1]; });
      return { svg: g, ext: ext };
    }
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
    for (var i = 0; i < n; i++) { var r = figure(ex.pose(i / n), ex.yaw, i, { floor: ex.floor, pal: P, tilt: ex.tilt, mat: ex.mat, solid: ex.solid !== false }); list.push(r.svg); exts.push(r.ext); }
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
    var t = rep(p, .46, .08), q = lerp(0, 68, t) * R, K = [0, 384, 0]; // endet wieder oben (vorher 1,1 Zyklen lang, die Schleife sprang)
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
    var lift = ease(Math.min(1, s / .15, (1 - s) / .3)); // Füße sofort vom Boden, beide Beine unter dem Körper; vor der Landung schon wieder in Landehaltung (Schleife ohne Sprung)
    o.la = mix(o.la, add(o.pc, [-20, 128, -18]), lift); o.lb = mix(o.lb, add(o.pc, [20, 128, -18]), lift); // Knie leicht angezogen
    o.ea = mix(o.ea, [0, .6, .8], lift); o.eb = mix(o.eb, [0, .6, .8], lift); o.qa = mix(o.qa, FWD, lift); o.qb = mix(o.qb, FWD, lift); // weich zurück in die Landung, sonst springt die Schleife
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
  function twist(J, deg) { var k = norm(sub3(J.nb, J.pc)); UPPER.forEach(function (q) { J[q] = rotAround(J[q], J.pc, k, deg); }); J._tw = (J._tw || 0) + deg; return J; }
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
    O._props = J._props || []; O._tw = J._tw;
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


  function wgs(p) { // World's Greatest Stretch: tiefer Ausfallschritt, hinteres Bein gestreckt, beide Hände innen am vorderen Fuß.
    // 1. Ellbogen sinkt zum vorderen Fuß. 2. Aufdrehen: der Arm geht gestreckt im Bogen über die Seite zur Decke, beide Arme in einer Linie,
    // die Brust öffnet sich. 3. Zurück im Bogen. 4. Hüfte nach hinten, vorderes Bein gestreckt (Beinrückseite). Die Stützhand bleibt immer stehen.
    var k = keys(p, [[0, { d: 0, tw: 0, h: 0 }], [.1, { d: 1, tw: 0, h: 0 }], [.2, { d: 1, tw: 0, h: 0 }], [.28, { d: 0, tw: 0, h: 0 }], [.46, { d: 0, tw: 1, h: 0 }],
      [.58, { d: 0, tw: 1, h: 0 }], [.74, { d: 0, tw: 0, h: 0 }], [.84, { d: 0, tw: 0, h: 1 }], [.94, { d: 0, tw: 0, h: 1 }], [1, { d: 0, tw: 0, h: 0 }]]);
    var FA = [-22, 390, 104], HB = [24, 395, 110], RB = [18, 377, -150];
    var pc = add(lerp([0, 316, 4], [0, 272, -15], k.h), [0, 8 * k.d, 0]), tw = 100 * k.tw;
    function shB(a) { var J0 = build({ pc: pc, a: a, arms: both(function () { return { to: pc, pole: FWD }; }), legs: both(function () { return { to: pc, pole: FWD }; }) }); twist(J0, tw); return J0.shb; }
    var best = 70, err = 1e9;
    for (var a0 = 40; a0 <= 112; a0 += .5) { var sb = shB(a0), e = Math.abs(len(sub3(sb, HB)) - 113); if (e < err && sb[1] < HB[1]) { err = e; best = a0; } }
    best += 12 * k.d; // Ellbogen zum Fuß: die Brust sinkt, der Stützarm gibt nach
    var J = build({ pc: pc, a: best, nod: lerp(4, -34, k.tw), // Kopf geht beim Aufdrehen mit nach oben
      arms: { a: { to: [-4, 395, 112], pole: [-.3, -.2, -1], dir: [0, .12, 1] }, b: { to: HB, pole: [.4, -.2, -1], dir: [0, .12, 1] } },
      legs: { a: { to: FA, pole: [0, -.3, 1] }, b: { to: RB, pole: DOWN, dir: [0, .88, .48] } } });
    twist(J, tw);
    reArm(J, 'b', HB, [.7, -.2, -.8], [0, .12, 1]);
    var floorA = [-4, 395, 112];
    if (k.tw > 0) { // gestreckt im Bogen: nach unten → zur Seite → zur Decke (in Richtung der Schulterlinie)
      var dDown = norm(sub3(floorA, J.sha)), dSide = norm([-1, 0, .15]), dUp = norm(sub3(J.sha, J.shb)), q = k.tw;
      var dir = q < .5 ? norm(lerp(dDown, dSide, q * 2)) : norm(lerp(dSide, dUp, q * 2 - 1));
      var Lr = q < .5 ? lerp(Math.min(114, len(sub3(floorA, J.sha))), 114, q * 2) : 114; // startet an der Hand am Boden, nie durch den Boden
      reArm(J, 'a', add(J.sha, mul(dir, Lr)), [0, 0, 1], norm(lerp([0, .12, 1], dir, Math.min(1, q * 3))));
      J._hf = norm(lerp([0, 0, 1], [-1, 0, .25], Math.min(1, q * 1.4))); // Gesicht dreht mit zur offenen Seite, Blick zur Hand nach oben
      var hu = norm(sub3(J.hc, J.nb)), toH = norm(sub3(J.haa, J.nb)); J.hc = add(J.nb, mul(norm(lerp(hu, toH, .5 * Math.min(1, q * 1.4))), 40)); // Kopf neigt sich zur Hand
      return J;
    }
    var EL = [-12, 378, 96], wr = lerp(floorA, [-10, 395, 146], k.d); // Ellbogen innen neben den Fuß, Unterarm nach vorn auf den Boden
    return reArm(J, 'a', wr, lerp([-.3, -.2, -1], sub3(EL, mid(J.sha, wr)), k.d), [0, .12, 1]);
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

  function pigeon(p) { // Pigeon Stretch: vorderes Schienbein liegt quer vor der Hüfte am Boden, hinteres Bein lang nach hinten (Fußrücken am Boden).
    // Aufgerichtet mit den Fingerspitzen vorn am Boden, dann mit den Händen nach vorn wandern, Oberkörper sinkt über das vordere Bein.
    var t = rep(p, .4, .2), pc = [0, 350, 0], a = lerp(50, 84, t), sh = add(pc, mul(trunkU(a), 112));
    return build({ pc: pc, a: a, nod: lerp(-4, 10, t),
      arms: both(function (x) { return { to: [x * 34, 393, sh[2] + Math.sqrt(Math.max(0, 112 * 112 - Math.pow(393 - sh[1], 2)))], pole: [x * .4, -.2, -1], dir: [0, .12, 1] }; }),
      legs: { a: { to: [-20, 395, -160], pole: DOWN, dir: [0, .06, -1] }, b: legVia(pc, a, 1, [34, 391, 70], [-.86, .02, -.5], [-.86, .1, -.45]) } });
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
  function threadNeedle(p) { // Thread the Needle: Vierfüßler. Der rechte Arm fädelt zwischen Stützarm und Knien unter dem Körper durch (Handrücken am Boden),
    // Schulter und Kopf sinken ab, der Stützarm beugt sich. Dann den Arm im Bogen nach oben aufdrehen, Blick folgt, und zurück auf den Boden.
    var k = keys(p, [[0, { tw: 0, r: 0, lo: 0 }], [.28, { tw: 58, r: 1, lo: 1 }], [.42, { tw: 58, r: 1, lo: 1 }], [.66, { tw: -60, r: 2, lo: 0 }], [.8, { tw: -60, r: 2, lo: 0 }], [1, { tw: 0, r: 3, lo: 0 }]]);
    var pc = [0, 312, -108], HA = [-30, 393, 2], a = 88 + 14 * k.lo;
    var J = build({ pc: pc, a: a, nod: -10 + 8 * k.lo, arms: both(function (x) { return { to: [x * 30, 393, 2], pole: FWD }; }), legs: both(function (x) { return legVia(pc, a, x, [x * 18, 391, -104], [0, .05, -1], [0, .06, -1]); }) }); // Knie bleiben stehen
    twist(J, k.tw);
    reArm(J, 'a', HA, [-1, -.3, -.2], [0, .12, 1]); // Stützhand bleibt, der Ellbogen gibt nach
    var floorB = [30, 393, 2], under = [-92, 393, -44], dUp = norm(sub3(J.shb, J.sha)), up = add(J.shb, mul(dUp, 116));
    var to, pole, dir;
    if (k.r <= 1) { to = lerp(floorB, under, k.r); pole = [0, -1, .3]; dir = lerp([0, .12, 1], [-1, .1, -.1], k.r); }
    else if (k.r <= 2) { var dU = norm(sub3(under, J.shb)); to = add(J.shb, mul(norm(lerp(dU, dUp, k.r - 1)), 116)); pole = [0, 0, 1]; dir = norm(lerp(dU, dUp, k.r - 1)); }
    else { var q = k.r - 2, d1 = norm(sub3(floorB, J.shb)); to = add(J.shb, mul(norm(lerp(dUp, d1, q)), lerp(116, len(sub3(floorB, J.shb)), q))); pole = lerp([.3, 0, 1], FWD, q); dir = norm(lerp(dUp, [0, .12, 1], q)); } // im Bogen zurück auf den Boden
    return reArm(J, 'b', to, pole, dir);
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
  function deadlift(p) { // Deadlift: Start vom Boden, Hüfte über den Knien (keine Kniebeuge). Stange über der Fußmitte und am Schienbein, Rücken gerade,
    // Arme gestreckt, Schultern knapp vor der Stange. Erst drücken die Beine, über dem Knie streckt die Hüfte; die Stange läuft senkrecht. Fließend, ohne Halt am Knie.
    var u = rep(p, .36, .14);
    var K = [[0, 294, -74, 60], [.45, 254, -64, 54], [1, 222, -2, -2]], i = u < K[1][0] ? 0 : 1, q = (u - K[i][0]) / (K[i + 1][0] - K[i][0]);
    var pc = [0, lerp(K[i][1], K[i + 1][1], q), lerp(K[i][2], K[i + 1][2], q)], a = lerp(K[i][3], K[i + 1][3], q);
    var sh = add(pc, mul(trunkU(a), 112)), dz = 10 - sh[2];
    var bar = [0, sh[1] + Math.sqrt(Math.max(0, 113 * 113 - dz * dz)), 10];
    var J = build({ pc: pc, a: a, nod: lerp(-14, 0, u),
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

  function prayer(p) { // Prayer Stretch: vor dem Sofa knien, Ellbogen auf der Kante, Hände zusammen. Hüfte nach hinten zu den Fersen, Brust sinkt bis knapp unter die Kante, Kopf zwischen den Armen
    var t = rep(p, .4, .2), E = [0, 303, 98], pc = lerp([0, 321, -36], [0, 348, -58], t), a = lerp(60, 64, t); // Kopf bleibt über der Sitzfläche
    var fd = norm(lerp([0, -1, -.1], [0, -.6, -.8], t));
    var J = build({ pc: pc, a: a, nod: lerp(8, 0, t),
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




  // ---- Runde Kettlebell (Dennis, 23. Oktober 2026) ----
  // Die Kettlebell hängt immer an den berechneten Händen (Griff zwischen Handgelenk und Hand), die Kugel zeigt in Richtung dn.
  var KB_R = 15;
  function kbP(g, dn, layer, r) { return { type: 'kb', g: g, dn: dn, r: r || KB_R, layer: layer || 'front', keep: true }; }
  // Spiegeln (links ↔ rechts): einarmige Übungen haben die Kettlebell so auf der Seite zur Kamera.
  function flipX(J) {
    var O = {}, k; for (k in J) {
      if (k.charAt(0) === '_') continue;
      var m = /^(sh|el|wr|ha|hi|kn|an|to)([ab])$/.exec(k), nk = m ? m[1] + (m[2] === 'a' ? 'b' : 'a') : k, v = J[k]; O[nk] = [-v[0], v[1], v[2]];
    }
    var fv = function (v) { return [-v[0], v[1], v[2]]; };
    O._props = (J._props || []).map(function (o) { var q = Object.assign({}, o); ['g', 'dn', 'a', 'b', 'c'].forEach(function (z) { if (q[z]) q[z] = fv(q[z]); }); if (q.pts) q.pts = q.pts.map(fv); return q; });
    if (J._to) O._to = { wra: fv(J._to.wrb), wrb: fv(J._to.wra), ana: fv(J._to.anb), anb: fv(J._to.ana) };
    if (J._tw) O._tw = J._tw;
    return O;
  }
  function gripOf(J, sd) { return sd ? lerp(J['wr' + sd], J['ha' + sd], .45) : lerp(mid(J.wra, J.wrb), mid(J.haa, J.hab), .45); }
  function shOf(pc, a, x) { return add(add(add(pc, mul(trunkU(a), 112)), [31 * (x || 0), 0, 0]), mul(trunkF(a), -2)); }
  function armDir(th, x) { return norm([x || 0, Math.cos(th * R), Math.sin(th * R)]); } // 0 = senkrecht nach unten, 90 = waagerecht nach vorn
  function swingAt(t, o) { // Swing-Bahn: t 0 = Kettlebell hinten zwischen den Beinen, 1 = oben auf Brusthöhe; Arme bleiben gestreckt
    o = o || {}; var pc = lerp([0, 252, -44], [0, 222, -2], t), a = lerp(52, -3, t), th = lerp(-27, o.top || 88, t), wide = o.wide || 24;
    var J = build({ pc: pc, a: a, nod: lerp(-16, 0, t),
      arms: both(function (x) { var d = armDir(th, x * (o.hx || .06)), sh = shOf(pc, a, x); return { to: add(sh, mul(d, 114)), pole: [x * .2, -d[2], d[1]], dir: d }; }),
      legs: both(function (x) { return { to: [x * wide, 390, 0], pole: [x * .3, 0, 1] }; }) });
    J._kbd = armDir(th, 0); return J;
  }
  function kbSwing(p) { // Russian Swing: Hüfte schiebt nach hinten, explosiv strecken, Kettlebell schwebt auf Brusthöhe
    var t = (1 + Math.cos(p * 2 * Math.PI)) / 2, J = swingAt(t);
    J._props = [kbP(gripOf(J), J._kbd)]; return J;
  }
  function kbAmericanSwing(p) { // American Swing: gleiche Hüftbewegung, die Kettlebell geht bis senkrecht über den Kopf, Boden nach oben
    var t = (1 + Math.cos(p * 2 * Math.PI)) / 2, J = swingAt(t, { top: 176 });
    J._props = [kbP(gripOf(J), J._kbd)]; return J;
  }
  function kbDoubleSwing(p) { // zwei Kettlebells, breiter Stand, je eine Hand
    var t = (1 + Math.cos(p * 2 * Math.PI)) / 2, J = swingAt(t, { wide: 30, hx: .16 });
    J._props = [kbP(gripOf(J, 'a'), J._kbd, 'back'), kbP(gripOf(J, 'b'), J._kbd)]; return J;
  }
  function gobletAt(t, o) { // Kniebeuge mit der Kettlebell vor der Brust, unten below parallel
    o = o || {}; var pc = lerp([0, 222, -6], [0, o.low || 332, o.lz || -36], t), a = lerp(2, o.lean || 30, t), u = trunkU(a), f = trunkF(a);
    var g = add(add(pc, mul(u, 88)), mul(f, 40)), w = o.wide || 24;
    var J = build({ pc: pc, a: a, nod: lerp(0, -8, t),
      arms: both(function (x) { return { to: add(g, [x * 11, 9, -6]), pole: [x * .5, 1, -.2], dir: [-x * .5, -.8, .3] }; }),
      legs: both(function (x) { return { to: [x * w, 390, x * (o.toe || 0)], pole: [x * .45, -.1, 1], dir: o.out ? [x * .5, .25, .8] : null }; }) });
    J._props = [kbP(gripOf(J), DOWN)]; return J;
  }
  function kbGoblet(p) { return gobletAt(rep(p, .42, .08)); }
  function kbSumo(p) { // breiter Stand, Zehen nach außen, Kettlebell hängt mit gestreckten Armen zwischen den Beinen
    var t = rep(p, .42, .08), pc = lerp([0, 226, -4], [0, 334, -18], t), a = lerp(2, 14, t), w = 46;
    var J = build({ pc: pc, a: a, nod: 0,
      arms: both(function (x) { var sh = shOf(pc, a, x); return { to: add(sh, [-x * 22, 110, 6]), pole: [x, 0, -.2], dir: DOWN }; }),
      legs: both(function (x) { return { to: [x * w, 390, 0], pole: [x * .9, -.1, .45], dir: [x * .5, .25, .8] }; }) });
    J._props = [kbP(gripOf(J), DOWN)]; return J;
  }
  function hingeAt(t, o) { // Kreuzheben mit Kettlebell: unten Rücken gerade, Arme senkrecht, oben ganz aufgerichtet
    o = o || {}; var pc = lerp([0, o.low || 310, -74], [0, 222, -2], t), a = lerp(o.lean || 46, 0, t);
    var J = build({ pc: pc, a: a, nod: lerp(-14, 0, t),
      arms: both(function (x) { var sh = shOf(pc, a, x), hx = o.hx ? o.hx(x) : -x * 21; return { to: add(sh, [hx, 112, 3]), pole: [x * .3, 0, -1], dir: DOWN }; }),
      legs: both(function (x) { return { to: [x * (o.wide || 26), 390, 0], pole: [x * .3, 0, 1] }; }) });
    return J;
  }
  function kbDeadlift(p) { var J = hingeAt(1 - rep(p, .36, .14)); J._props = [kbP(gripOf(J), DOWN)]; return J; }
  function kbSuitcase(p) { // Kettlebell seitlich neben dem rechten Fuß, nur die rechte Hand
    var t = 1 - rep(p, .36, .14), J = hingeAt(t, { wide: 20, low: 314, lean: 44, hx: function (x) { return x > 0 ? 16 : -6; } });
    J._props = [kbP(gripOf(J, 'b'), DOWN)]; return flipX(J);
  }
  // Einarmige Abläufe aus Zuständen (Rack, Hüftbeuge, Zug, über Kopf), weich überblendet. Rechte Hand (b) hält die Kettlebell.
  // pc, a: Becken und Rumpf; w/wp/wd: Ziel, Ellbogen-Richtung, Hand-Richtung rechts; fa: linke Hand (frei); dn: Richtung der Kugel.
  var KS = {
    rack: { pc: [0, 222, -4], a: 0, nod: 0, w: [8, 132, 34], wp: [.15, 1, .6], wd: [-.2, -.95, .25], fa: [-36, 222, 12], dn: [.6, .2, .35] },
    dip: { pc: [0, 248, -16], a: 3, nod: 0, w: [8, 156, 24], wp: [.15, 1, .6], wd: [-.2, -.95, .25], fa: [-36, 246, 4], dn: [.6, .2, .35] },
    over: { pc: [0, 222, -4], a: 0, nod: 0, w: [24, -4, -4], wp: [1, 0, .2], wd: UP, fa: [-36, 222, 12], dn: [.25, .3, -.92] },
    hike: { pc: [0, 252, -44], a: 52, nod: -16, w: [8, 283, -8], wp: [.2, -.45, .9], wd: [0, .89, -.45], fa: [-30, 288, 34], dn: [0, .89, -.45] },
    pull: { pc: [0, 224, -6], a: -2, nod: 0, w: [14, 176, 26], wp: [.6, -.4, -.7], wd: [0, -.3, 1], fa: [-36, 222, 12], dn: [0, .95, .3] },
    high: { pc: [0, 222, -4], a: -3, nod: 0, w: [10, 134, 36], wp: [.7, -.5, -.6], wd: [0, -.2, 1], fa: [-36, 222, 12], dn: [0, .9, .44] }
  };
  function kbFlow(p, seq) { // seq: [[Zeitpunkt, Zustand], …]
    var s = keys(p, seq.map(function (k) { return [k[0], KS[k[1]] || k[1]]; }));
    var J = build({ pc: s.pc, a: s.a, nod: s.nod,
      arms: { a: { to: s.fa, pole: [-.3, 0, -1], dir: DOWN }, b: { to: s.w, pole: s.wp, dir: s.wd } },
      legs: both(function (x) { return { to: [x * 24, 390, 0], pole: [x * .3, 0, 1] }; }) });
    J._props = [kbP(gripOf(J, 'b'), norm(s.dn))]; return flipX(J);
  }
  function kbClean(p) { return kbFlow(p, [[0, 'rack'], [.14, 'rack'], [.44, 'hike'], [.7, 'pull'], [.84, 'rack'], [1, 'rack']]); }
  function kbSnatch(p) { return kbFlow(p, [[0, 'over'], [.12, 'over'], [.3, 'high'], [.48, 'hike'], [.68, 'high'], [.84, 'over'], [1, 'over']]); }
  function kbHighPull(p) { return kbFlow(p, [[0, 'hike'], [.45, 'high'], [.56, 'high'], [1, 'hike']]); }
  function kbPushPress(p) { return kbFlow(p, [[0, 'rack'], [.18, 'dip'], [.32, 'rack'], [.46, 'over'], [.66, 'over'], [.9, 'rack'], [1, 'rack']]); }
  function kbCleanPress(p) { return kbFlow(p, [[0, 'rack'], [.1, 'rack'], [.3, 'over'], [.4, 'over'], [.54, 'rack'], [.7, 'hike'], [.86, 'pull'], [.95, 'rack'], [1, 'rack']]); }
  // Rack im Rumpf mitgedreht (Kniebeugen mit Kettlebell im Rack): Ziel aus Rumpfrichtung, Kugel außen auf dem Unterarm.
  function rackAt(pc, a, x) { var u = trunkU(a), f = trunkF(a); return add(add(add(pc, mul(u, 90)), mul(f, 38)), [x * 9, 0, 0]); }
  function rackDn(a, x) { var u = trunkU(a), f = trunkF(a); return norm(add(add([x * .6, 0, 0], mul(u, -.2)), mul(f, .35))); }
  function rackSquat(p, two) {
    var t = rep(p, .42, .08), pc = lerp([0, 222, -6], [0, 330, -32], t), a = lerp(2, 24, t), u = trunkU(a), f = trunkF(a);
    var J = build({ pc: pc, a: a, nod: lerp(0, -8, t),
      arms: both(function (x) {
        if (two || x > 0) return { to: rackAt(pc, a, x), pole: add([x * .15, 0, 0], add(mul(u, -1), mul(f, .6))), dir: add([-x * .2, 0, 0], add(mul(u, .95), mul(f, .2))) };
        return { to: add(add(pc, mul(u, 62)), [-62, 0, 30]), pole: [-.5, .6, -.4], dir: [-.4, .2, .9] }; // freie Hand locker zur Seite
      }),
      legs: both(function (x) { return { to: [x * 24, 390, 0], pole: [x * .45, -.1, 1] }; }) });
    J._props = (two ? ['a', 'b'] : ['b']).map(function (sd) { return kbP(gripOf(J, sd), rackDn(a, sd === 'a' ? -1 : 1), sd === 'a' ? 'back' : 'front'); });
    return two ? J : flipX(J);
  }
  function kbFrontSquat(p) { return rackSquat(p, false); }
  function kbDoubleFrontSquat(p) { return rackSquat(p, true); }
  function kbDoublePress(p) { // beide aus dem Rack über den Kopf
    var t = rep(p, .36, .14), pc = [0, 222, -4];
    var J = build({ pc: pc, a: 0, nod: lerp(0, 4, t),
      arms: both(function (x) { return { to: lerp([x * 8, 132, 34], [x * 24, -4, -4], t), pole: lerp([x * .15, 1, .6], [x, 0, .2], t), dir: lerp([-x * .2, -.95, .25], UP, t) }; }),
      legs: both(function (x) { return { to: [x * 22, 390, 0], pole: FWD }; }) });
    J._props = ['a', 'b'].map(function (sd) { var x = sd === 'a' ? -1 : 1; return kbP(gripOf(J, sd), norm(lerp([x * .6, .2, .35], [x * .25, .3, -.92], t)), sd === 'a' ? 'back' : 'front'); });
    return J;
  }
  function kbHalo(p) { // Kettlebell kopfüber an den Hörnern, eng um den Kopf
    var f = p * 2 * Math.PI, c = [0, 70, 6], g = [Math.sin(f) * 44, c[1] + 10 - 6 * Math.cos(f), c[2] + Math.cos(f) * 44];
    var tg = [Math.cos(f), 0, -Math.sin(f)], pc = [0, 222, -4];
    var J = build({ pc: pc, a: 0, nod: 0,
      arms: both(function (x) { return { to: add(add(g, mul(tg, x * 10)), [0, 14, 0]), pole: add(mul(norm([g[0], 0, g[2]]), .6), [x * .5, .3, 0]), dir: UP }; }),
      legs: both(function (x) { return { to: [x * 20, 390, 0], pole: FWD }; }) });
    J._props = [kbP(gripOf(J), UP)]; return J;
  }
  function kbRevLunge(p) { // linkes Bein tritt zurück, hinteres Knie knapp über dem Boden, Kettlebell vor der Brust
    var t = rep(p, .42, .08), pc = lerp([0, 222, -4], [0, 296, -40], t), a = lerp(2, 6, t), u = trunkU(a), f = trunkF(a);
    var g = add(add(pc, mul(u, 88)), mul(f, 40)), lift = Math.sin(Math.PI * Math.min(1, t * 1.25)) * 16 * (t < .8 ? 1 : 0);
    var J = build({ pc: pc, a: a, nod: 0,
      arms: both(function (x) { return { to: add(g, [x * 11, 9, -6]), pole: [x * .5, 1, -.2], dir: [-x * .5, -.8, .3] }; }),
      legs: { a: { to: [-18, lerp(390, 372, t) - lift, lerp(-2, -150, t)], pole: [0, lerp(-.1, 1, t), lerp(1, .15, t)], dir: [0, lerp(.28, .7, t), lerp(1, .7, t)] },
        b: { to: [20, 390, 8], pole: [.3, 0, 1] } } });
    J._props = [kbP(gripOf(J), DOWN)]; return J;
  }
  function kbGorillaRow(p) { // breit über zwei Kettlebells, Rumpf fast waagerecht, abwechselnd rudern; die andere drückt in den Boden
    var pc = [0, 288, -77], a = 60, low = [0, 342, 20], side = p < .5 ? 'b' : 'a', t = rep((p % .5) * 2, .38, .2);
    var J = build({ pc: pc, a: a, nod: -20,
      arms: both(function (x) { var sd = x < 0 ? 'a' : 'b', fl = [x * 24, low[1], low[2]];
        return sd === side ? { to: lerp(fl, [x * 28, 266, -22], t), pole: [x * .25, -.5, -.8], dir: DOWN } : { to: fl, pole: [x * .3, 0, -1], dir: DOWN }; }),
      legs: both(function (x) { return { to: [x * 34, 390, 0], pole: [x * .35, 0, 1] }; }) });
    J._props = ['a', 'b'].map(function (sd) { return kbP(gripOf(J, sd), DOWN, sd === 'a' ? 'back' : 'front'); });
    return J;
  }
  function kbBridge(p) { // Glute Bridge mit Kettlebell quer auf der Hüfte, beide Hände halten sie
    var t = rep(p, .38, .16), S = [0, 384, -150], py = lerp(372, 340, t);
    var pz = S[2] + Math.sqrt(Math.max(0, 112 * 112 - Math.pow(py - S[1], 2))), pc = [0, py, pz];
    var v = norm(sub3(S, pc)), a = Math.atan2(v[2], -v[1]) / R, n = norm([0, -v[2], v[1]]); if (n[1] > 0) n = mul(n, -1);
    var g = add(add(pc, mul(n, 40)), mul(v, 8));
    var J = build({ pc: pc, a: a, hc: [0, 380, -195],
      arms: both(function (x) { return { to: add(g, [x * 14, 10, -8]), pole: [x, -.3, -.3], dir: [-x * .4, -.6, .6] }; }),
      legs: both(function (x) { return { to: [x * 16, 388, 40], pole: [0, -1, .3], dir: [0, .35, 1] }; }) });
    J._props = [kbP(gripOf(J), mul(n, -1))]; return J;
  }
  function kbTwist(p) { // sitzen, zurückgelehnt, Fersen am Boden; Kettlebell von Seite zu Seite
    var pc = [0, 372, -6], a = -42, u = trunkU(a), f = trunkF(a), g = add(add(pc, mul(u, 74)), mul(f, 44));
    var J = build({ pc: pc, a: a, nod: 10,
      arms: both(function (x) { return { to: add(g, [x * 11, 6, -6]), pole: [x * .6, .8, -.2], dir: [-x * .4, -.5, .7] }; }),
      legs: both(function (x) { return { to: [x * 16, 388, 128], pole: [x * .1, -1, .3], dir: [0, .3, 1] }; }) });
    twist(J, Math.sin(p * 2 * Math.PI) * 38);
    J._props = [kbP(gripOf(J), DOWN)]; return J;
  }
  function kbDeadBug(p) { // Rückenlage, Kettlebell mit gestreckten Armen über der Brust, Beine abwechselnd strecken
    var side = p < .5 ? 'a' : 'b', t = rep((p % .5) * 2, .36, .2);
    var J = supine({ nod: 6,
      arms: both(function (x) { return { to: [x * 12, 258, -108], pole: [x, 0, 0], dir: UP }; }),
      legs: both(function (x) { var sd = x < 0 ? 'a' : 'b', ex = sd === side ? t : 0;
        return { to: lerp([x * 18, 300, 82], [x * 18, 366, 172], ex), pole: [0, -1, lerp(.2, .6, ex)], dir: [0, -.2 + .1 * ex, 1] }; }) });
    J._props = [kbP(gripOf(J), UP)]; return J;
  }

  // ---- Runde 4 (1. November 2026): die nächsten 20 aus REIHENFOLGE.md (Ruhetag, Cool-down, Metcon, Kraft) ----
  // Rumpfwinkel so suchen, dass die Schulter (Seite x) die Hand H mit gestrecktem Arm erreicht (Hände bleiben am Boden).
  function reachA(pc, H, x, lo, hi, L) {
    L = L || 111; var best = lo, err = 1e9;
    for (var a = lo; a <= hi; a += .5) { var sh = shOf(pc, a, x), e = Math.abs(len(sub3(sh, H)) - L); if (e < err && sh[1] < H[1]) { err = e; best = a; } }
    return best;
  }
  function onFloor(sh, y, L, sg) { return sh[2] + (sg || 1) * Math.sqrt(Math.max(0, L * L - Math.pow(y - sh[1], 2))); } // z, wo die Hand den Boden erreicht
  function dumbbell(g) { // Kurzhantel quer in der Hand: Griff und zwei Scheiben
    return [{ type: 'line', a: add(g, [-13, 0, 0]), b: add(g, [13, 0, 0]), w: 3, layer: 'front', keep: true },
      { type: 'circle', c: add(g, [-15, 0, 0]), r: 10, hub: true, layer: 'front', keep: true }, { type: 'circle', c: add(g, [15, 0, 0]), r: 10, hub: true, layer: 'front', keep: true }];
  }
  function cossack(p) { // sehr breiter Stand, Gewicht auf ein Bein, tief beugen; das andere Bein gestreckt, Zehen nach oben
    var s = Math.sin(p * 2 * Math.PI), d = Math.pow(Math.abs(s), .8), sg = s < 0 ? -1 : 1, W = 108;
    var pc = [sg * 64 * d, lerp(250, 340, d), lerp(-6, -56, d)], a = lerp(4, 30, d);
    return build({ pc: pc, a: a, nod: lerp(0, -10, d),
      arms: both(function (x) { return { to: add(pc, [x * 6, lerp(-70, -66, d), lerp(30, 62, d)]), pole: [x, .6, -.2], dir: [-x * .3, -.9, .3] }; }),
      legs: both(function (x) { var bent = x === sg && d > .05;
        return { to: [x * W, 390, 0], pole: bent ? [x * .5, -.2, 1] : [x * .2, -.3, 1], dir: bent || d < .3 ? [x * .45, .28, .85] : norm([x * .2, lerp(.28, -.9, (d - .3) / .7), lerp(1, .4, (d - .3) / .7)]) }; }) });
  }
  // Stange vorn auf den Schultern (Front Rack) bzw. über dem Kopf; q = Kniebeuge 0…1, o = über Kopf 0…1
  function barRack(q, o, nod) {
    var pc = lerp([0, 222, -6], [0, 334, -34], q), a = lerp(2, 22, q), u = trunkU(a), f = trunkF(a);
    var rack = add(add(pc, mul(u, 102)), mul(f, 30)), over = add(shOf(pc, a, 0), [0, -117, -2]), bar = lerp(rack, over, o);
    var J = build({ pc: pc, a: a, nod: nod != null ? nod : lerp(0, -10, q),
      arms: both(function (x) { return { to: add(bar, [x * 30, lerp(9, 4, o), lerp(-5, 0, o)]), pole: norm(lerp(add(add([x * .25, 0, 0], mul(f, 1)), mul(u, -.5)), [x, 0, .1], o)), dir: norm(lerp(add(mul(u, .8), mul(f, -.5)), UP, o)) }; }),
      legs: both(function (x) { return { to: [x * 22, 390, 0], pole: [x * .4, -.1, 1] }; }) });
    J._props = barbell(bar, 40);
    return J;
  }
  function thruster(p) { // Front Squat, explosiv hoch und in einem Zug über den Kopf; zurück auf die Schultern
    // Dennis: eine flüssige Bewegung. Kein Halt unten (federnd aus der Hocke), die Stange startet nach oben, während die Beine noch strecken,
    // und nach dem Zurücklegen auf die Schultern geht es gleich in die nächste Hocke. Keine Schlüsselbilder mit Stillstand, sondern zwei weiche Kurven.
    var d = ((p - .2 + 1.5) % 1) - .5, q = Math.abs(d) < .3 ? Math.pow(Math.cos(Math.PI * d / .6), 2) : 0; // Hocke, tiefster Punkt bei .2, beginnt bei .9
    var o = p < .34 ? 0 : p < .56 ? ease((p - .34) / .22) : p < .7 ? 1 : p < .92 ? 1 - ease((p - .7) / .22) : 0;
    return barRack(q, o);
  }
  function strictPress(p) { // Stange vorn auf den Schultern, Knie gestreckt, gerade nach oben; der Kopf geht kurz zurück
    var o = rep(p, .4, .14); return barRack(0, o, -16 * Math.sin(Math.PI * Math.min(1, o * 1.6)));
  }
  function catCow(p) { // Vierfüßler: Rücken rund mit Kinn zur Brust, dann hohl mit Blick nach vorn
    // Dennis: der Rücken muss oben und unten runder werden. Rund (c > 0): Becken kippt ein, die Mitte hebt sich, Brustkorb und Kopf sinken.
    // Hohl (c < 0): Becken kippt nach vorn, die Mitte sinkt, Brust und Blick gehen nach vorn oben.
    var c = Math.sin(p * 2 * Math.PI), pc = [0, 296 - 6 * c, -112], S = [0, 274 + 2 * c, 0];
    var J = quad({ pc: pc, S: S, nod: c > 0 ? 42 * c : -22 * -c });
    var u = norm(sub3(J.nb, J.pc)), up = [0, -1, 0], piv = add(J.pc, mul(u, 60));
    ['nb', 'hc'].forEach(function (q) { J[q] = rotAround(J[q], piv, [1, 0, 0], c > 0 ? -22 * c : -10 * c); }); // hohl: Kopf nur leicht nach vorn oben
    J._bend = { pel: norm(add(u, mul(up, .4 * c))), rib: norm(add(u, mul(up, -.3 * c))), rc: mul(up, 20 * c) }; // Bogen über die Brustkorb-Mitte, damit die Linie der Bewegung mitgeht
    return J;
  }
  function shoulderCars(p) { // aufrecht, freie Hand an der Hüfte; gestreckter Arm langsam nach vorn, über Kopf, hinten im großen Kreis nach unten
    var f = p * 2 * Math.PI, pc = [0, 222, -4], back = Math.max(0, -Math.sin(f));
    var d = norm([.08 + .55 * back, Math.cos(f), Math.sin(f) * (1 - .35 * back)]);
    return build({ pc: pc, a: 0, nod: 0,
      arms: { b: { to: add(pc, [40, -14, 6]), pole: [1, 0, -.4], dir: [-.6, .3, .3] }, a: { to: add(shOf(pc, 0, -1), mul([-d[0], d[1], d[2]], 114)), pole: [-1, 0, 0], dir: [-d[0], d[1], d[2]] } }, // Dennis: der Arm, der zum Bildschirm zeigt
      legs: both(function (x) { return { to: stand(x), pole: FWD }; }) });
  }
  function hipCars(p) { // Vierfüßler: Knie seitlich heben, im großen Kreis nach hinten führen, zurück
    var pc = [0, 292, -112], a = trunkTo(pc, [0, 275, 0]), ha = add(add(pc, mul(trunkU(a), -6)), [-18, 0, 0]);
    var k = keys(p, [[0, { k: [-18, 391, -108], s: [0, .05, -1] }], [.12, { k: [-22, 380, -104], s: [0, .05, -1] }], [.36, { k: [-88, 300, -96], s: [-.1, .05, -1] }],
      [.6, { k: [-40, 318, -190], s: [0, -.45, -.9] }], [.8, { k: [-20, 366, -168], s: [0, .2, -1] }], [1, { k: [-18, 391, -108], s: [0, .05, -1] }]]);
    var K = add(ha, mul(norm(sub3(k.k, ha)), 80));
    var J = build({ pc: pc, a: a, nod: -10,
      arms: both(function (x) { return { to: [x * 30, 386, 0], pole: [x * .3, -.2, -1], dir: [0, .1, 1] }; }),
      legs: { a: legVia(pc, a, -1, K, k.s, k.s), b: { to: [12, 388, -196], pole: DOWN, dir: [0, .05, -1] } } });
    return J;
  }
  function ninety(p) { // 90/90 Hip Switch: sitzen, Füße bleiben weit auseinander am selben Fleck, beide Knie kippen wie Scheibenwischer von einer Seite zur anderen
    var k = keys(p, [[0, { s: -1 }], [.16, { s: -1 }], [.5, { s: 1 }], [.66, { s: 1 }], [1, { s: -1 }]]).s, pc = [0, 372, -26];
    function leg(x) {
      var hi = add(pc, [x * 18, 6, 0]), An = [x * 62, 392, 66];
      var down = norm([k, .25, x === (k < 0 ? -1 : 1) ? .15 : -.25]), pole = norm(lerp([0, -1, .25], down, Math.abs(k))); // Knie kippt zur Seite s, oben dazwischen
      return { to: An, pole: pole, dir: norm([-k * .55, .15, .8]) };
    }
    var J = build({ pc: pc, a: 3, nod: 0,
      arms: both(function (x) { return { to: add(pc, [x * 7, -74, 36]), pole: [x, .6, -.2], dir: [-x * .3, -.9, .3] }; }), // Hände locker vor der Brust, Oberkörper aufrecht
      legs: { a: leg(-1), b: leg(1) } });
    return twist(J, -12 * k); // der Oberkörper dreht ein wenig mit den Knien
  }
  function halfSplit(p) { // Halbkniestand, Hüfte nach hinten über das hintere Knie, vorderes Bein gestreckt (Zehen oben), Oberkörper lang nach vorn
    var t = rep(p, .4, .2), pc = [0, lerp(302, 312, t), lerp(-18, -40, t)], AF = [-18, 391, 109], Hz = lerp(80, 86, t); // Fuß bleibt stehen, das Bein streckt sich, wenn die Hüfte nach hinten geht
    var a = reachA(pc, [-40, 393, Hz], -1, 20, 100);
    return build({ pc: pc, a: a, nod: lerp(-4, 10, t),
      arms: both(function (x) { return { to: [x * 40, 393, Hz], pole: [x * .3, -.2, -1], dir: [0, .12, 1] }; }),
      legs: { a: { to: AF, pole: [0, -1, .25], dir: [0, -.9, .4] }, b: kneelLeg(pc, a, 1, 391) } });
  }
  function wristRocks(p) { // Vierfüßler, Hände fest: langsam nach vorn über die Hände und zurück
    var s = Math.sin(p * 2 * Math.PI), dz = 22 * s, Sy = 386 - Math.sqrt(111 * 111 - dz * dz) + 1; // Arme bleiben gestreckt
    return quad({ pc: [0, 296 + 2 * Math.abs(s), -112 + dz], S: [0, Sy, dz], nod: -10 });
  }
  function cobra(p) { // Bauchlage, Hände neben der Brust; Oberkörper hoch drücken, Hüfte bleibt am Boden
    // Dennis: oben sind die Arme ganz gestreckt. Die Hände stehen dort, wo der gestreckte Arm aus der oberen Lage den Boden erreicht.
    var t = rep(p, .4, .2), pc = [0, 380, -20], top = 36, a = lerp(87, top, t), Hz = onFloor(shOf(pc, top, 1), 393, 113);
    var J = build({ pc: pc, a: a, nod: lerp(4, -16, t),
      arms: both(function (x) { return { to: [x * 36, 393, Hz], pole: [x * .5, -1, -.4], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 14, 390, -190], pole: DOWN, dir: [0, .1, -1] }; }) });
    // Dennis: im Bogen statt eckig. Becken bleibt flach am Boden, der Brustkorb steht steiler, die Mitte sinkt Richtung Boden (Lendenwirbelsäule im Hohlkreuz).
    var u = norm(sub3(J.nb, J.pc)), fw = trunkF(a);
    J._bend = { pel: norm(lerp([0, -.05, 1], u, .35)), rib: norm(add(u, mul([0, -1, 0], .35 * t))), rc: mul(fw, 14 * t) };
    return J;
  }
  function inchworm(p) { // aus der Vorbeuge mit den Händen nach vorn bis in den Liegestütz laufen, mit den Füßen hinterher
    var k = keys(p, [[0, { h: 0, f: 0 }], [.38, { h: 1, f: 0 }], [.48, { h: 1, f: 0 }], [.86, { h: 1, f: 1 }], [1, { h: 1, f: 1 }]]);
    var Az = 230 * k.f, hz = Az + lerp(40, 268, k.h - k.f), w = (k.h - k.f), A = [0, lerp(390, 384, w), Az];
    var step = Math.sin((k.h + k.f) * 6 * Math.PI) * 9; // Hände bzw. Füße wechseln sich ab
    var phi = lerp(-6, 67, w) * R, pc = add(A, mul([0, -Math.cos(phi), Math.sin(phi)], 166));
    var H = [0, 393, hz], a = reachA(pc, H, 0, 50, 175, 112);
    var J = build({ pc: pc, a: a, nod: lerp(30, -8, w),
      arms: both(function (x) { return { to: [x * 30, 393, hz + x * step * (k.h < 1 ? 1 : 0)], pole: [x * .3, -.2, -1], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 12, A[1], Az - x * step * (k.h >= 1 ? 1 : 0)], pole: lerp(FWD, DOWN, w), dir: norm(lerp([0, .28, 1], [0, .55, .85], w)) }; }) });
    // Dennis: endlose Schleife. Die Figur kommt 230 weiter vorn an; das Bild läuft gleichmäßig mit, die Striche am Boden zeigen, dass sie vorankommt.
    var sh = -230 * p; for (var q in J) if (q.charAt(0) !== '_') J[q] = add(J[q], [0, 0, sh]);
    if (J._to) for (var r in J._to) J._to[r] = add(J._to[r], [0, 0, sh]);
    J._props = []; for (var i = -4; i <= 8; i++) { var z = i * 46 + ((sh % 46) + 46) % 46 - 60; if (z > -150 && z < 330) J._props.push({ type: 'line', a: [-30, 397, z], b: [30, 397, z], col: STYLE.far }); }
    J._props.push({ type: 'line', a: [0, 397, -150], b: [0, 397, 330], col: STYLE.far, keep: true });
    return J;
  }
  function sleeper(p) { // Seitenlage auf der Schulter, unterer Arm vor dir im rechten Winkel, Unterarm nach oben; die freie Hand drückt ihn Richtung Boden
    var t = rep(p, .4, .2), ps = lerp(4, 58, t) * R, pc = [0, 222, -4];
    var shb = shOf(pc, 0, 1), elb = add(shb, [-2, 0, 56]), fd = [-Math.cos(ps), Math.sin(ps), 0], wrb = add(elb, mul(fd, 54));
    var J = build({ pc: pc, a: 0, nod: 0,
      arms: { a: { to: add(wrb, [-6, -4, 8]), pole: [-.4, -.6, -1], dir: fd }, b: { to: wrb, pole: [1, 0, 0], dir: fd } },
      legs: both(function (x) { return { to: add(pc, [x * 14 + 6, 118, 84]), pole: FWD, dir: [0, .2, 1] }; }) });
    J.elb = elb; J.wrb = wrb; J.hab = add(wrb, mul(fd, 24)); J._to.wrb = wrb; // Oberarm liegt fest vor dem Körper, nur der Unterarm dreht
    return turnAll(J, pc, [0, 0, 1], 90, 392);
  }
  function lizard(p) { // tiefer Ausfallschritt, hinteres Knie am Boden, beide Hände innen neben dem vorderen Fuß; Hüfte sinkt nach vorn unten
    var t = rep(p, .4, .2), pc = [0, lerp(326, 344, t), lerp(-30, -14, t)], H = [-14, 393, 116];
    var a = reachA(pc, [-44, 393, 110], -1, 30, 100);
    return build({ pc: pc, a: a, nod: lerp(-6, 4, t),
      arms: { a: { to: [-46, 393, 110], pole: [-.4, -.2, -1], dir: [0, .12, 1] }, b: { to: H, pole: [.3, -.2, -1], dir: [0, .12, 1] } },
      legs: { a: legVia(pc, a, -1, [-18, 391, pc[2] - Math.sqrt(Math.max(0, 6300 - Math.pow(385 - pc[1], 2)))], [0, .03, -1], [0, .06, -1]), b: { to: [26, 390, 106], pole: [.3, -.3, 1] } } });
  }
  function butterfly(p) { // sitzen, Fußsohlen zusammen, Hände halten die Füße; mit langem Rücken nach vorn kippen, die Ellbogen drücken die Knie sanft Richtung Boden
    var t = rep(p, .4, .2), pc = [0, 372, -20], a = lerp(48, 60, t);
    var J = build({ pc: pc, a: a, nod: lerp(-6, 8, t),
      arms: both(function (x) { return { to: [x * 10, 384, 56], pole: [x, -.2, -.2], dir: [0, .4, 1] }; }),
      legs: both(function (x) { var hi = add(pc, [x * 18, 6, 0]), An = [x * 7, 392, 52], K = [x * 78, lerp(360, 382, t), 30]; return { to: An, pole: sub3(K, mid(hi, An)), dir: [-x, .2, .2] }; }) });
    [['a', -1], ['b', 1]].forEach(function (q) { // Ellbogen liegt innen auf dem Oberschenkel nahe am Knie, Unterarm zur Hand am Fuß
      var sd = q[0], kn = J['kn' + sd], hi = J['hi' + sd], Et = add(lerp(hi, kn, .72), [-q[1] * 4, -9, 0]), sh = J['sh' + sd], H = [q[1] * 10, 384, 56];
      var el = add(sh, mul(norm(sub3(Et, sh)), 56)), wr = add(el, mul(norm(sub3(H, el)), 54));
      J['el' + sd] = el; J['wr' + sd] = wr; J['ha' + sd] = add(wr, mul(norm(sub3(H, el)), 24)); J._to['wr' + sd] = wr;
    });
    return J;
  }
  function pancake(p) { // weite Grätsche, Beine gestreckt, Kniescheiben oben; mit geradem Rücken nach vorn
    var t = rep(p, .4, .2), pc = [0, 372, -20], a = lerp(30, 62, t), sh = shOf(pc, a, 0);
    return build({ pc: pc, a: a, nod: lerp(-4, 8, t),
      arms: both(function (x) { return { to: [x * 34, 393, onFloor(add(sh, [x * 31, 0, 0]), 393, 106)], pole: [x * .5, -.3, -1], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 114, 390, 116], pole: UP, dir: [x * .2, -.9, .3] }; }) });
  }
  function bridgeHold(p) { // Glute Bridge oben halten: Schulter, Hüfte, Knie in einer Linie, ruhig atmen
    var b = breathe(p), S = [0, 384, -150], py = 340 + 3 * b;
    var pz = S[2] + Math.sqrt(Math.max(0, 112 * 112 - Math.pow(py - S[1], 2))), pc = [0, py, pz], u = norm(sub3(S, pc)), a = Math.atan2(u[2], -u[1]) / R;
    return build({ pc: pc, a: a, hc: [0, 380, -195],
      arms: both(function (x) { return { to: [x * 40, 388, S[2] + 118], pole: [x, -.5, 0], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 16, 388, 40], pole: [0, -1, .3], dir: [0, .35, 1] }; }) });
  }
  function pressAt(t, o) { // Hände von Schulterhöhe gestreckt über den Kopf (Band, Kurzhanteln)
    var pc = [0, 222, -4];
    return build({ pc: pc, a: 0, nod: 0,
      arms: both(function (x) { return { to: lerp([x * 34, 126, 30], [x * 26, -6, -2], t), pole: lerp([x * .6, .7, .55], [x, 0, .2], t), dir: UP }; }), // Ellbogen leicht vor dem Körper
      legs: both(function (x) { return { to: [x * 20, 390, 0], pole: FWD }; }) });
  }
  function bandPress(p) { // auf dem Band stehen, Enden auf Schulterhöhe, gestreckt über den Kopf
    var J = pressAt(rep(p, .36, .14));
    var B = { type: 'poly', pts: [gripOf(J, 'a'), [-22, 397, 12], [22, 397, 12], gripOf(J, 'b')], open: true, col: BAND, w: 4, layer: 'front', keep: true }; // ein Band unter beiden Füßen
    J._props = [B];
    return J;
  }
  function dbPress(p) { var J = pressAt(rep(p, .36, .14)); J._props = dumbbell(gripOf(J, 'a')).concat(dumbbell(gripOf(J, 'b'))); return J; }
  function run(p) { // Laufen von der Seite: Fuß landet unter dem Körper, Knie vorn hoch, Ferse hinten hoch, Arme schwingen locker gegengleich,
    // Schultern drehen leicht gegen die Hüfte (Dennis: „etwas steif“)
    var pc = [0, 226 + 7 * Math.cos((p - .08) * 4 * Math.PI), 0], a = 12 + 3 * Math.cos((p - .2) * 4 * Math.PI); // Knie federt in der Landung; beim Abdruck etwas mehr Vorlage
    function legAt(q) { // q = 0 Landung … .38 Abdruck, dann Schwung
      var K = [[0, [0, 386, 30]], [.18, [0, 390, -6]], [.38, [0, 380, -62]], [.52, [0, 318, -96]], [.7, [0, 286, -14]], [.82, [0, 318, 40]], [.93, [0, 370, 46]], [1, [0, 386, 30]]];
      for (var i = 0; i < K.length - 1; i++) if (q <= K[i + 1][0]) return lerp(K[i][1], K[i + 1][1], ease((q - K[i][0]) / (K[i + 1][0] - K[i][0])));
      return K[0][1];
    }
    var J = build({ pc: pc, a: a, nod: -2 + 3 * Math.cos(p * 4 * Math.PI),
      arms: both(function (x) { // Dennis: Arme natürlicher. Oberarm pendelt aus der Schulter, hinten weiter (Hand bis neben die Hüfte) als vorn (Hand bis vor die Brust);
        // der Ellbogen ist vorn enger und öffnet sich hinten, er folgt dem Oberarm etwas später.
        var q = (p + (x < 0 ? .5 : 0) + .03) % 1, w = Math.cos(q * 2 * Math.PI), wl = Math.cos((q - .07) * 2 * Math.PI), th = (-16 - 40 * w) * R, sh = shOf(pc, a, x);
        var ud = norm([x * (.06 + .06 * Math.max(0, w)), Math.cos(th), Math.sin(th)]), el = add(sh, mul(ud, 56)), E = lerp(68, 112, (1 + wl) / 2);
        var fa = th + (180 - E) * R, fd = norm([-x * lerp(.28, .05, (1 + w) / 2), Math.cos(fa), Math.sin(fa)]);
        return { to: add(el, mul(fd, 54)), pole: [x * .15, .2, -1], dir: fd }; }), // Hand locker in Verlängerung des Unterarms (Dennis: abgeknickt sah komisch aus)
      legs: both(function (x) { var q = (p + (x < 0 ? 0 : .5)) % 1, A = add(legAt(q), [x * 10, 0, 0]), sw = q > .38 && q < .95;
        return { to: A, pole: [0, 0, 1], dir: sw ? (q < .6 ? [0, .75, -.6] : [0, .45, .9]) : [0, .28, 1] }; }) });
    // Dennis: der Oberkörper bewegt sich mit. Schultern drehen mit dem Arm, der vorn ist (gegen die Hüfte), die Hüfte dreht mit dem vorderen Bein.
    twist(J, 20 * Math.cos(p * 2 * Math.PI));
    return turnAll(J, pc, [0, 1, 0], -7 * Math.cos(p * 2 * Math.PI));
  }
  function hipFlexor(p) { // Halbkniestand: hinteres Knie am Boden, Gesäß fest, Hüfte nach vorn; der Arm der hinteren Seite geht nach oben
    var t = rep(p, .4, .2), K = [-19, 391, -60], hz = lerp(-46, -26, t), hy = K[1] - Math.sqrt(6400 - Math.pow(hz - K[2], 2));
    var pc = [0, hy - 6, hz], a = lerp(2, -4, t), sh = shOf(pc, a, -1);
    return build({ pc: pc, a: a, nod: lerp(0, -4, t),
      arms: { a: { to: add(sh, mul(norm([.12, -1, lerp(0, -.12, t)]), 114)), pole: [-1, 0, 0], dir: UP }, b: { to: [22, 300, 66], pole: [.6, .3, -1], dir: [0, .6, .8] } },
      legs: { a: legVia(pc, a, -1, K, [0, .03, -1], [0, .06, -1]), b: { to: [19, 390, 70], pole: FWD } } });
  }


  // ---- Runde 5 (1. November 2026): Platz 42–61 aus REIHENFOLGE.md ----
  function bar(y, z, w) { return [{ type: 'line', a: [-(w || 70), y, z], b: [w || 70, y, z], w: 3, keep: true }]; } // Klimmzugstange quer
  function box(z0, z1, y, w) { // Kasten bzw. Stufe: Oberseite, Vorderkante bis zum Boden
    return [{ type: 'poly', pts: [[-w, y, z0], [w, y, z0], [w, y, z1], [-w, y, z1]], keep: true }, { type: 'poly', pts: [[-w, y, z0], [-w, FLOOR_Y, z0], [w, FLOOR_Y, z0], [w, y, z0]], open: true, keep: true },
      { type: 'line', a: [-w, y, z1], b: [-w, FLOOR_Y, z1], col: STYLE.far }];
  }
  function plyoBox(z0, z1, y, w) { // Plyo-Box aus Holz (Dennis: echte Maße). Maßstab der Figur ≈ 2 px/cm; Flächen deckend
    // Dennis: beim Drehen wurde die Box durchsichtig. Die Seiten werden nach Tiefe mit der Figur sortiert, nur die Oberseite liegt immer unter dem, was darauf steht.
    var F = FLOOR_Y, face = function (pts, far, top) { return { type: 'poly', pts: pts, fill: true, keep: true, layer: top ? 'back' : undefined, flat: !!top, col: far ? STYLE.far : undefined }; };
    var hole = function (x) { var zc = (z0 + z1) / 2, hw = (z1 - z0) * .22, yy = y + (F - y) * .16; // Griffloch oben in der Seitenwand
      return { type: 'poly', pts: [[x, yy - 5, zc - hw], [x, yy - 5, zc + hw], [x, yy + 5, zc + hw], [x, yy + 5, zc - hw]], col: x > 0 ? STYLE.far : undefined }; };
    return [face([[-w, y, z1], [w, y, z1], [w, F, z1], [-w, F, z1]], true), face([[w, y, z0], [w, y, z1], [w, F, z1], [w, F, z0]], true), face([[-w, y, z0], [-w, y, z1], [-w, F, z1], [-w, F, z0]]),
      face([[-w, y, z0], [w, y, z0], [w, F, z0], [-w, F, z0]]), face([[-w, y, z0], [w, y, z0], [w, y, z1], [-w, y, z1]], false, true), hole(-w), hole(w)];
  }
  function flatBench(z0, z1, y, w) { // Flachbank (Dennis: eine richtige Bank): gepolsterte Auflage mit Kante, darunter Stahlrahmen aus zwei Füßen mit Querstrebe
    // Dennis: beim Drehen durchsichtig. Alles nach Tiefe sortiert, nur das Polster oben liegt immer unter der Figur
    var F = FLOOR_Y, P = {}, T = 9, o = function (q, x) { for (var k in P) q[k] = P[k]; for (var k2 in x || {}) q[k2] = x[k2]; return q; };
    var zm = (z0 + z1) / 2, L = [];
    [-1, 1].forEach(function (s) { var x = s * (w - 16), far = s > 0 ? STYLE.far : undefined; // Fuß: Rohr nach unten, unten ein breiter Querfuß
      L.push(o({ type: 'line', a: [x, y + T, zm], b: [x, F - 6, zm], w: 1.8, col: far }), o({ type: 'line', a: [x, F - 3, z0 - 8], b: [x, F - 3, z1 + 8], w: 2.2, col: far }),
        o({ type: 'line', a: [x, y + T + 2, z0 + 8], b: [x, y + T + 2, z1 - 8], w: 1.4, col: far })); });
    L.push(o({ type: 'line', a: [-w + 16, y + T + 4, zm], b: [w - 16, y + T + 4, zm], w: 1.8 })); // Längsträger unter dem Polster
    L.push(o({ type: 'poly', pts: [[-w, y, z1], [w, y, z1], [w, y + T, z1], [-w, y + T, z1]], fill: true, col: STYLE.far }), o({ type: 'poly', pts: [[w, y, z0], [w, y, z1], [w, y + T, z1], [w, y + T, z0]], fill: true, col: STYLE.far }),
      o({ type: 'poly', pts: [[-w, y, z0], [-w, y, z1], [-w, y + T, z1], [-w, y + T, z0]], fill: true }), o({ type: 'poly', pts: [[-w, y, z0], [w, y, z0], [w, y + T, z0], [-w, y + T, z0]], fill: true }),
      o({ type: 'poly', pts: [[-w, y, z0], [w, y, z0], [w, y, z1], [-w, y, z1]], fill: true, keep: true, layer: 'back', flat: true }));
    return L;
  }
  function deadHang(p) { // toter Hang an der Stange, Arme ganz gestreckt, ruhig hängen
    var b = breathe(p), pc = [0, 268 + 2 * b, 13.7 + sway(p, 2)];
    var J = build({ pc: pc, a: -4 + sway(p, 1.5), nod: -2,
      arms: both(function (x) { return { to: [x * 30, 44, 0], pole: [x * .8, .5, .4], dir: UP }; }),
      legs: both(function (x) { return { to: add(pc, [x * 10, 166, 6]), pole: FWD, dir: [0, .55, .8] }; }) });
    J._props = bar(24, 0); return J;
  }
  function wallBiceps(p) { // Handfläche auf Schulterhöhe hinten an der Wand, Arm gestreckt; Körper langsam von der Wand wegdrehen
    var t = rep(p, .4, .2), pc = [0, 222, -4], H = [-124, 112, -64];
    var J = build({ pc: pc, a: 0, nod: 0,
      arms: { a: { to: H, pole: [-1, 0, 0], dir: [-.2, 0, -1] }, b: { to: add(pc, [40, -14, 6]), pole: [1, 0, -.4], dir: [-.6, .3, .3] } },
      legs: both(function (x) { return { to: stand(x), pole: FWD }; }) });
    twist(J, -24 * t); reArm(J, 'a', H, [-1, .2, 0], [-.2, 0, -1]);
    // Dennis: die Hand ging an der Wand vorbei. Die Wand steht jetzt seitlich, die Handfläche liegt flach daran.
    var Wl = [{ type: 'poly', pts: [[-131, -40, -130], [-131, -40, 10], [-131, 401, 10], [-131, 401, -130]], col: STYLE.far, keep: true, layer: 'back', flat: true }];
    for (var y = -30; y < FLOOR_Y; y += 34) Wl.push({ type: 'line', a: [-131, y, -60], b: [-145, y + 14, -60], col: STYLE.far, layer: 'back', flat: true }); // Schraffur: dahinter ist Wand
    J._props = Wl; return J;
  }
  function tricepsStretch(p) { // Arm über Kopf, Ellbogen gebeugt, Hand zwischen den Schulterblättern; die andere Hand liegt hinter dem Kopf oben auf dem Ellbogen und drückt ihn nach unten
    // Dennis: die Stützhand gehört hinter den Kopf. Der Ellbogen zeigt nach oben und liegt hinter dem Kopf; der andere Arm greift über den Kopf hinweg darauf.
    var t = rep(p, .4, .2), pc = [0, 222, -4], E = lerp([-22, 52, -14], [-16, 60, -22], t), W = lerp([-6, 100, -36], [-2, 108, -40], t);
    var J = build({ pc: pc, a: 0, nod: lerp(8, 12, t),
      arms: { a: { to: W, pole: [-.2, -1, -.4], dir: [.2, .9, -.3] }, b: { to: add(E, [7, -15, -3]), pole: [1, -.9, -.5], dir: [-.4, .9, -.1] } },
      legs: both(function (x) { return { to: stand(x), pole: FWD }; }) });
    // Dennis: die Hand muss den Ellbogen berühren. Erst wenn Arm a steht, kennt man seinen Ellbogen; die Handfläche legt sich von oben darauf.
    var D = norm([-1, .9, .05]); return reArm(J, 'b', add(J.ela, [16, -14, 1]), [1, -.9, -.5], D);
  }
  function wristFlexion(p) { // knien, Handrücken am Boden, Finger zu den Knien, Arme gestreckt; sanft nach hinten lehnen
    var t = rep(p, .4, .2), dz = -26 * t, Sy = 386 - Math.sqrt(111 * 111 - dz * dz) + 1;
    return quad({ pc: [0, 300 + 22 * t, -112 - 30 * t], S: [0, Sy, dz], nod: -10,
      arms: both(function (x) { return { to: [x * 30, 389, 0], pole: [x * .3, -.2, -1], dir: [0, .15, -1] }; }) });
  }
  function benchDip(p) { // Hände an der Bankkante neben der Hüfte, Finger nach vorn, Füße vorn am Boden; Hüfte senkt sich, Ellbogen zeigen nach hinten
    var t = rep(p, .4, .1), pc = [0, lerp(298, 362, t), lerp(2, -6, t)], a = lerp(-2, 8, t); // Dennis: unten ist der Oberarm waagerecht (90° im Ellbogen)
    var J = build({ pc: pc, a: a, nod: lerp(0, -6, t),
      arms: both(function (x) { return { to: [x * 26, 296, -40], pole: [x * .2, -.2, -1], dir: [0, .3, 1] }; }),
      legs: both(function (x) { return { to: [x * 16, 390, 116], pole: UP, dir: [0, .28, 1] }; }) });
    J._props = flatBench(-96, -34, 300, 104); return J; // Bank 45 cm hoch, 30 cm breit; die Figur sitzt an der Längsseite
  }
  function bodySaw(p) { // Unterarmstütz, Füße auf dem Handtuch; den Körper über die Unterarme nach hinten schieben und zurück
    var t = rep(p, .42, .1), dz = -44 * t, S = [0, 386 - Math.sqrt(56 * 56 - dz * dz) - 2, dz], A = [0, 384, dz - 262], L = line(A, S);
    var J = build({ pc: L.pc, a: L.a, nod: -8,
      arms: both(function (x) { return { to: [x * 16, 388, 48], pole: [0, 1, 0], dir: [0, .1, 1] }; }),
      legs: both(function (x) { return { to: [x * 11, 384, A[2]], pole: DOWN, dir: [0, .55, .85] }; }) });
    ['a', 'b'].forEach(function (sd) { var x = sd === 'a' ? -1 : 1; J['el' + sd] = [x * 26, 386, 0]; J['wr' + sd] = [x * 16, 389, 52]; J['ha' + sd] = [x * 14, 390, 76]; }); // Unterarme bleiben liegen
    J._props = slideFeet((J.toa[2] + J.tob[2]) / 2 + 4); return J;
  }
  function bandRow(p) { // Band vorn befestigt, Knie leicht gebeugt; Schulterblätter zusammen, Ellbogen eng am Körper nach hinten
    var t = rep(p, .36, .14), pc = [0, 230, -6], a = 4, sh = shOf(pc, a, 0);
    var J = build({ pc: pc, a: a, nod: 0,
      arms: both(function (x) { return { to: lerp(add(sh, [x * 24, 4, 108]), add(pc, [x * 34, -66, 30]), t), pole: [x * .3, .5, -1], dir: [0, 0, 1] }; }),
      legs: both(function (x) { return { to: [x * 20, 390, 4], pole: FWD }; }) });
    var A = [0, 150, 250];
    J._props = [bandLine(gripOf(J, 'a'), A), bandLine(gripOf(J, 'b'), A), { type: 'line', a: [-8, 150, 252], b: [8, 150, 252], w: 4, keep: true }];
    return J;
  }
  function butterflyLegs(pc, kd) { return both(function (x) { var hi = add(pc, [x * 18, 6, 0]), An = [x * 7, 392, 52], K = [x * 78, kd || 372, 30]; return { to: An, pole: sub3(K, mid(hi, An)), dir: [-x, .2, .2] }; }); }
  function sitUp(p) { // Fußsohlen zusammen, Knie außen; zurücklegen bis die Schultern den Boden berühren, Arme über dem Kopf; mit Schwung aufrichten, Hände zu den Füßen
    var AL = -94, k = keys(p, [[0, { a: 40 }], [.38, { a: AL }], [.5, { a: AL }], [.86, { a: 40 }], [1, { a: 40 }]]).a, pc = [0, 374, -14], a = k; // Dennis: die Schultern müssen bis auf den Boden, sonst ist es keine ganze Wiederholung
    var u = trunkU(a), q = (a - AL) / (40 - AL), J = build({ pc: pc, a: a, nod: lerp(-4, 14, q),
      arms: both(function (x) { var sh = shOf(pc, a, x), d = norm(lerp(u, norm(sub3([x * 8, 386, 56], sh)), Math.min(1, q * 1.3))); var T = add(sh, mul(d, q > .9 ? Math.min(113, len(sub3([x * 8, 386, 56], sh))) : 113)); T[1] = Math.min(T[1], 384); return { to: T, pole: [x, 0, 0], dir: d }; }), // Hände über dem Kopf am Boden, nicht darunter
      legs: butterflyLegs(pc) });
    // AbMat (Dennis: nicht eckig, richtige Größe): 38 × 30 cm, höchstens 7,5 cm hoch, also 76 × 60 × 15 px. Rund geformt: am Gesäß eine weiche,
    // kurze Kante, dann flach auslaufend zum Rücken hin. Im Liegen liegt der untere Rücken darauf im Bogen (Hohlkreuz über der Matte, `_bend`).
    var Z0 = -22, Lm = 76, Hm = 15, top = function (u) { var r = u < .14 ? Math.sin(u / .14 * Math.PI / 2) : 1 - Math.pow((u - .14) / .86, 1.7); return 397 - Hm * r; };
    var prof = []; for (var i = 0; i <= 16; i++) { var uu = i / 16; prof.push([top(uu), Z0 - Lm * uu]); }
    var side = function (x, far) { return { type: 'poly', pts: [[x, 397, Z0]].concat(prof.map(function (q) { return [x, q[0], q[1]]; })), fill: true, keep: true, col: far ? STYLE.far : undefined }; };
    J._props = [side(30, true), { type: 'poly', pts: prof.map(function (q) { return [-30, q[0], q[1]]; }).concat(prof.slice().reverse().map(function (q) { return [30, q[0], q[1]]; })), fill: true }, side(-30)];
    var e = Math.max(0, -a / -AL) * .8, d = [0, 1, 0]; // e: wie weit er liegt; d: zum Rücken hin
    if (e > 0) J._bend = { pel: norm(add(u, mul(d, -.22 * e))), rib: norm(add(u, mul(d, .14 * e))), rc: mul(d, -9 * e) };
    return J;
  }
  function russianTwist(p) { // sitzen, Knie gebeugt, leicht zurückgelehnt; Hände vor der Brust, Schultern zu einer Seite, dann zur anderen
    var pc = [0, 372, -6], a = -40, u = trunkU(a), f = trunkF(a), g = add(add(pc, mul(u, 72)), mul(f, 46));
    var J = build({ pc: pc, a: a, nod: 10,
      arms: both(function (x) { return { to: add(g, [x * 5, 2, -2]), pole: [x * .6, .8, -.2], dir: [-x * .5, -.4, .7] }; }),
      legs: both(function (x) { return { to: [x * 16, 388, 128], pole: [x * .1, -1, .3], dir: [0, .3, 1] }; }) });
    return twist(J, Math.sin(p * 2 * Math.PI) * 42);
  }
  function wallBall(p) { // eine flüssige Bewegung (Dennis): aus der Hocke explosiv hoch und werfen, Arme bleiben oben, Ball in der Abwärtsbewegung fangen und direkt in die nächste Hocke
    function pose(p) { var k = keys(p, [[0, { q: 1, o: 0 }], [.08, { q: .92, o: 0 }], [.2, { q: 0, o: .4 }], [.26, { q: 0, o: 1 }], [.5, { q: 0, o: 1 }], [.6, { q: .2, o: .7 }], [.78, { q: .85, o: .05 }], [.92, { q: 1, o: 0 }], [1, { q: 1, o: 0 }]]);
      var pc = lerp([0, 222, -6], [0, 334, -40], k.q), a = lerp(2, 30, k.q), u = trunkU(a), f = trunkF(a), sh = shOf(pc, a, 0);
      var chest = add(add(pc, mul(u, 96)), mul(f, 40)), over = add(sh, mul(norm([0, -1, .32]), 112));
      return { k: k, pc: pc, a: a, g: lerp(chest, over, k.o) }; }
    var P = pose(p), k = P.k, g = P.g;
    var J = build({ pc: P.pc, a: P.a, nod: lerp(-10, -26, k.o),
      arms: both(function (x) { return { to: add(g, [x * 14, 10, 0]), pole: norm(lerp([x * .6, .8, -.2], [x, 0, .2], k.o)), dir: norm(lerp([-x * .6, -.5, .4], [-x * .2, -.9, .3], k.o)) }; }),
      legs: both(function (x) { return { to: [x * 24, 390, 0], pole: [x * .45, -.1, 1] }; }) });
    // Ball: bis zum Abwurf (.24) in den Händen, fliegt zum Ziel (.38), fällt zurück und wird bei .56 im Absenken gefangen
    var T = [0, -96, 166], R0 = add(pose(.24).g, [0, -6, 14]), C1 = add(pose(.56).g, [0, -6, 14]), bp;
    if (p < .24 || p >= .56) bp = add(g, [0, k.o > .5 ? -6 : 0, 14]);
    else if (p < .38) { var u1 = (p - .24) / .14; bp = add(lerp(R0, T, u1), [0, -30 * Math.sin(Math.PI * u1), 0]); }
    else { var u2 = (p - .38) / .18; bp = lerp(T, C1, u2 * u2); }
    J._props = wall(176).concat([{ type: 'line', a: [0, -120, 174], b: [0, -72, 174], w: 3, col: '#E8963A' }, { type: 'ball', c: bp, r: 17, layer: 'front', keep: true }]);
    return J;
  }
  function runPose(q, z) { var J = run(q); for (var k in J) if (k.charAt(0) !== '_') J[k] = add(J[k], [0, 0, z]); return J; }
  function blendJ(A, B, t) { var O = {}; for (var k in A) if (k.charAt(0) !== '_') O[k] = lerp(A[k], B[k], t); O._props = []; return O; }
  function touchPose(z) { // abbremsen, tief, eine Hand tippt an die Linie
    var pc = [0, 330, z - 34];
    return build({ pc: pc, a: 62, nod: -20,
      // Dennis: die Fingerspitzen berühren den Boden, und zwar mit der Hand auf der Seite zur Kamera, außen neben dem vorderen Fuß (sonst verdeckt das Bein sie)
      arms: { b: { to: [34, 371, z + 20], pole: [.3, -.2, -1], dir: [.1, .96, .26] }, a: { to: add(pc, [-44, -40, 30]), pole: [-1, .3, -.4], dir: [0, .6, .6] } },
      legs: { a: { to: [-20, 390, z + 36], pole: [-.2, -.2, 1] }, b: legVia(pc, 62, 1, [20, 388, z - 96], [0, .02, -1], [0, .2, -1]) } });
  }
  function shuttle(p) { // zur Linie sprinten, kurz abbremsen, Boden antippen, umdrehen, zurück
    var L = 140, seg = function (q) { var J; if (q < .55) J = runPose((q / .55) * 2 % 1, lerp(-(L - 40), L - 40, q / .55)); // startet dort, wo die Rückkehr endet (Schleife)
      else if (q < .7) J = blendJ(runPose(0, L - 40), touchPose(L - 30), ease((q - .55) / .15));
      else if (q < .85) J = touchPose(L - 30); else J = blendJ(touchPose(L - 30), runPose(0, L - 40), ease((q - .85) / .15)); return J; };
    var h = p < .5 ? 0 : 1, J = seg((p % .5) * 2);
    if (h) J = turnAll(J, [0, 222, 0], [0, 1, 0], 180);
    var turn = (p % .5) * 2 > .85 ? ((p % .5) * 2 - .85) / .15 : 0; if (turn) J = turnAll(J, [0, 222, h ? -(L - 40) : L - 40], [0, 1, 0], 180 * ease(turn));
    J._props = [{ type: 'line', a: [-50, 400, L - 10], b: [50, 400, L - 10], w: 3, col: '#E8963A', keep: true }, { type: 'line', a: [-50, 400, -L + 10], b: [50, 400, -L + 10], w: 3, col: '#E8963A', keep: true }]; // die Hand tippt genau auf die Linie
    return J;
  }
  function pushPress(p) { // Stange vorn auf den Schultern, kurz in die Knie (wenige Zentimeter), explosiv strecken und über den Kopf drücken
    var k = keys(p, [[0, { q: 0, o: 0 }], [.16, { q: .24, o: 0 }], [.22, { q: .24, o: 0 }], [.32, { q: 0, o: .25 }], [.44, { q: 0, o: 1 }], [.64, { q: 0, o: 1 }], [.9, { q: .06, o: 0 }], [1, { q: 0, o: 0 }]]);
    return barRack(k.q, k.o, -12 * Math.sin(Math.PI * Math.min(1, k.o * 1.6)));
  }
  function clipLine(pts, f) { // Linienzug auf den Teil mit f(q) ≤ 0 kürzen; Schnittpunkte linear (f ist stückweise linear)
    var out = [], prevIn = null;
    for (var i = 0; i < pts.length; i++) { var q = pts[i], vin = f(q) <= 0;
      if (i > 0 && vin !== prevIn) { var a = pts[i - 1], fa = f(a), fb = f(q), lo = 0, hi = 1; for (var it = 0; it < 30; it++) { var m = (lo + hi) / 2; if ((f(lerp(a, q, m)) <= 0) === (fa <= 0)) lo = m; else hi = m; } out.push(lerp(a, q, (lo + hi) / 2)); }
      if (vin) out.push(q); prevIn = vin; }
    return out;
  }
  function stairClimb(p) { // zügig die Treppe hinauf, ganzer Fuß mitten auf der Stufe; die Treppe läuft mit, damit die Figur im Bild bleibt
    // Dennis: nicht so steif. Becken hebt und senkt sich mit dem Schritt, Oberkörper lehnt sich in den Schritt, Arme schwingen gebeugt gegengleich, Schultern drehen mit.
    var R2 = 40, D = 64, h = (p * 2) % 1, lead = p < .5 ? -1 : 1, o = h;
    function Y(i) { return 390 - i * R2 + o * R2; } function Zc(i) { return i * D - o * D + 30; }
    var sup = [0, Y(1), Zc(1)], tr0 = [0, Y(0), Zc(0)], tr1 = [0, Y(2), Zc(2)], lift = Math.sin(Math.PI * Math.min(1, Math.max(0, (h - .2) / .6)));
    var trail = h < .2 ? tr0 : lerp(tr0, tr1, ease(Math.min(1, (h - .2) / .6))); trail = add(trail, [0, -lift * 30, -lift * 8]);
    // Wie ein Laufband (Dennis: endlose Schleife): der Körper bleibt auf einer Höhe, die Stufen laufen unter ihm weg. Darum endet jeder Schritt genau dort,
    // wo der nächste anfängt, nur mit dem anderen Bein. Das Becken federt und schwingt zum Standbein, der Oberkörper lehnt sich beim Abdruck vor.
    var push = Math.sin(Math.PI * h), pc = [lead * 5 * push, 220 - 6 * Math.cos(2 * Math.PI * h), 46 + 6 * push], a = 14 + 5 * Math.cos(2 * Math.PI * h);
    var J = build({ pc: pc, a: a, nod: -4 + 3 * Math.cos(2 * Math.PI * h),
      arms: both(function (x) { var w = (x === lead ? -1 : 1) * Math.cos(h * Math.PI), th = (-4 - 14 * w) * R, sh = shOf(pc, a, x); // Dennis: Arme etwas weniger
        var ud = norm([x * .08, Math.cos(th), Math.sin(th)]), el = add(sh, mul(ud, 56)), fa = th + (180 - lerp(135, 158, (1 + w) / 2)) * R, fd = norm([-x * .15, Math.cos(fa), Math.sin(fa)]);
        return { to: add(el, mul(fd, 54)), pole: [x * .15, .2, -1], dir: fd }; }),
      legs: both(function (x) { var P = x === lead ? sup : trail; return { to: add(P, [x * 14, 0, 0]), pole: FWD }; }) });
    twist(J, lead * 14 * Math.cos(h * Math.PI));
    // Dennis: die Stufen tauchten abgehackt auf. Jetzt läuft eine lange Treppe durch ein festes Fenster: oben wächst die neue Stufe Stück für Stück herein,
    // unten verschwindet die letzte im Boden. Abgeschnitten wird an festen Grenzen (z ≤ ZMAX, y ≤ Boden), nicht stufenweise.
    var pts = [], i, ZMAX = 238; for (i = -3; i <= 7; i++) { var z0 = Zc(i) - D / 2; pts.push([0, Y(i - 1) + 6, z0], [0, Y(i) + 6, z0], [0, Y(i) + 6, z0 + D]); }
    pts = clipLine(pts, function (q) { return Math.max(q[1] - (FLOOR_Y - 1), q[2] - ZMAX); });
    J._props = [-46, 46].map(function (xx) { return { type: 'poly', pts: pts.map(function (q) { return [xx, q[1], q[2]]; }), open: true, keep: true, col: xx > 0 ? STYLE.far : undefined }; });
    return J;
  }
  function bikeErg(p) { // auf dem Rad-Ergometer: rund vorwärts treten, Oberkörper ruhig, Hände am Lenker
    var f = p * 2 * Math.PI, C = [0, 334, 14], Rk = 26, pc = [0, 236, -36], a = 30;
    var J = build({ pc: pc, a: a, nod: -10,
      arms: both(function (x) { return { to: [x * 22, 196, 84], pole: [x * .4, .6, -.3], dir: [0, .3, 1] }; }),
      // Dennis: falsche Richtung. Vorwärts: oben geht das Pedal nach vorn, unten nach hinten
      legs: both(function (x) { var g = f + (x < 0 ? 0 : Math.PI); return { to: add(C, [x * 16, Rk * Math.cos(g), -Rk * Math.sin(g)]), pole: [x * .1, -.2, 1], dir: [0, .3, 1] }; }) });
    J._props = ergBike(C, Rk, f, p); return J;
  }
  function ergBike(C, Rk, f, p) { // Rad-Ergometer nach Art des BikeErg (Dennis: mehr Mühe bei den Geräten). Maßstab ≈ 2 px/cm, Sattel 75 cm, Lenker 100 cm hoch.
    var F = FLOOR_Y, W = [0, 318, 112], far = STYLE.far, L = [];
    var Pa = add(C, [-16, Rk * Math.cos(f), -Rk * Math.sin(f)]), Pb = add(C, [16, -Rk * Math.cos(f), Rk * Math.sin(f)]);
    L.push({ type: 'line', a: [-38, F - 4, -84], b: [38, F - 4, -84], w: 2.7, keep: true }, { type: 'line', a: [-38, F - 4, 150], b: [38, F - 4, 150], w: 2.7, keep: true }); // Standfüße mit Gummikappen
    [-38, 38].forEach(function (x) { L.push({ type: 'line', a: [x, F - 2, -88], b: [x, F - 2, -80], w: 4, col: x > 0 ? far : undefined }, { type: 'line', a: [x, F - 2, 146], b: [x, F - 2, 154], w: 4, col: x > 0 ? far : undefined }); });
    L.push({ type: 'poly', pts: [[0, F - 6, -84], [0, 300, -36], [0, 310, -24], [0, F - 6, -66]], fill: true, w: 1.4 }); // hinterer Rahmen bis unter den Sattel
    L.push({ type: 'line', a: [0, 304, -30], b: [0, 252, -40], w: 2.7 }, { type: 'line', a: [0, 290, -33], b: [0, 296, -31], w: 4 }); // Sattelstütze mit Klemme
    L.push({ type: 'poly', pts: [[-16, 244, -66], [16, 244, -66], [17, 246, -50], [7, 247, -18], [-7, 247, -18], [-17, 246, -50]], fill: true, w: 1.4 }, { type: 'poly', pts: [[-16, 244, -66], [16, 244, -66], [16, 252, -62], [-16, 252, -62]], fill: true }); // Sattel
    L.push({ type: 'line', a: [0, 306, -26], b: add(W, [0, 8, -10]), w: 3.1 }); // Unterrohr zum Schwungrad
    L.push({ type: 'line', a: add(W, [0, -28, -14]), b: [0, 210, 74], w: 2.7 }, { type: 'line', a: [0, 210, 74], b: [0, 198, 84], w: 2.7 }); // Lenkerstütze und Vorbau
    L.push({ type: 'line', a: [-24, 196, 84], b: [24, 196, 84], w: 1.8 }); // Lenker mit Hörnchen nach vorn
    [-24, 24].forEach(function (x) { L.push({ type: 'line', a: [x, 196, 84], b: [x, 190, 108], w: 1.8, col: x > 0 ? far : undefined }); });
    L.push({ type: 'poly', pts: [[-12, 176, 92], [12, 176, 92], [12, 186, 78], [-12, 186, 78]], fill: true, w: 1.4 }); // Monitor
    L.push({ type: 'line', a: add(W, [0, 6, 0]), b: [0, F - 4, 132], w: 2.7 }); // vorderes Bein
    L.push({ type: 'circle', c: W, r: 48, fill: true, keep: true }, { type: 'circle', c: W, r: 40, spokes: 8, rot: p * 2 }, { type: 'circle', c: W, r: 10, hub: true }); // Lüfterrad im Gehäuse, dreht mit
    L.push({ type: 'poly', pts: [add(C, [-9, -14, 0]), add(W, [-9, -14, -6]), add(W, [-9, 14, -6]), add(C, [-9, 14, 0])], fill: true }); // Riemenabdeckung
    L.push({ type: 'circle', c: add(C, [-11, 0, 0]), r: 14, fill: true, hub: true }, { type: 'line', a: add(C, [-16, 0, 0]), b: Pa, w: 1.8 }, { type: 'line', a: add(C, [16, 0, 0]), b: Pb, w: 1.8, col: far });
    L.push({ type: 'poly', pts: [add(Pa, [-4, -3, -10]), add(Pa, [-16, -3, -10]), add(Pa, [-16, -3, 10]), add(Pa, [-4, -3, 10])], fill: true }, { type: 'poly', pts: [add(Pb, [4, -3, -10]), add(Pb, [16, -3, -10]), add(Pb, [16, -3, 10]), add(Pb, [4, -3, 10])], fill: true, col: far }); // Pedale
    return L;
  }
  function rowErg(p) { // Rudern: vorn Knie gebeugt, Arme lang; erst Beine, dann Oberkörper zurück, dann Arme zur unteren Brust; zurück umgekehrt
    // Sitz in echter Höhe (Dennis: Geräte besser ausgestalten): Sitzfläche 35 cm über dem Boden, Fußstützen schräg, Schwungrad vorn im Gehäuse.
    var k = keys(p, [[0, { s: 0, b: 0, r: 0 }], [.22, { s: 1, b: 0, r: 0 }], [.3, { s: 1, b: 1, r: 0 }], [.4, { s: 1, b: 1, r: 1 }], [.48, { s: 1, b: 1, r: 1 }], [.58, { s: 1, b: 1, r: 0 }], [.68, { s: 1, b: 0, r: 0 }], [1, { s: 0, b: 0, r: 0 }]]);
    var pc = [0, 311, lerp(12, -60, k.s)], a = lerp(24, -22, k.b), sh = shOf(pc, a, 0), F = [0, 327, 96];
    var reach = add(sh, mul(norm(sub3([0, 255, 200], sh)), 112)), chest = add(add(pc, mul(trunkU(a), 84)), mul(trunkF(a), 24)), Hn = lerp(reach, chest, k.r);
    var J = build({ pc: pc, a: a, nod: lerp(-6, 4, k.b),
      arms: both(function (x) { return { to: add(Hn, [x * 22, 0, 0]), pole: [x * .5, .3, -1], dir: [0, 0, 1] }; }),
      legs: both(function (x) { return { to: [x * 14, F[1], F[2]], pole: [x * .15, -1, .3], dir: [0, -.5, 1] }; }) });
    J._props = ergRow(pc[2], mid(gripOf(J, 'a'), gripOf(J, 'b')), p); return J;
  }
  function ergRow(sz, hg, p) { // Rudergerät nach Art des RowErg: Schiene auf zwei Füßen, Sitz mit Rollen, Fußstützen mit Riemen, Schwungrad im Gehäuse, Monitor am Arm, Kette zum Griff
    var F = FLOOR_Y, far = STYLE.far, W = [0, 300, 216], L = [];
    L.push({ type: 'poly', pts: [[-8, 336, -190], [8, 336, -190], [8, 336, 150], [-8, 336, 150]], fill: true, keep: true }, { type: 'poly', pts: [[-8, 336, -190], [-8, 336, 150], [-8, 348, 150], [-8, 348, -190]], fill: true }); // Schiene
    L.push({ type: 'line', a: [0, 348, -178], b: [0, F - 5, -184], w: 2.7 }, { type: 'line', a: [-34, F - 4, -184], b: [34, F - 4, -184], w: 2.7, keep: true }); // hinterer Fuß
    L.push({ type: 'line', a: [0, 346, 146], b: [0, F - 5, 252], w: 3.1 }, { type: 'line', a: [-34, F - 4, 252], b: [34, F - 4, 252], w: 2.7, keep: true }); // vorderer Fuß
    [-34, 34].forEach(function (x) { [-184, 252].forEach(function (z) { L.push({ type: 'line', a: [x, F - 2, z - 4], b: [x, F - 2, z + 4], w: 4, col: x > 0 ? far : undefined }); }); }); // Gummikappen
    L.push({ type: 'poly', pts: [[-17, 327, sz - 24], [17, 327, sz - 24], [17, 327, sz + 18], [-17, 327, sz + 18]], fill: true }, { type: 'poly', pts: [[-17, 327, sz - 24], [-17, 327, sz + 18], [-15, 334, sz + 14], [-15, 334, sz - 20]], fill: true }); // Sitz
    L.push({ type: 'circle', c: [-10, 334, sz - 12], r: 3 }, { type: 'circle', c: [-10, 334, sz + 8], r: 3 }); // Rollen
    [-14, 14].forEach(function (x) { var c = x > 0 ? far : undefined; // Fußstütze schräg, Fersenschale, Riemen über dem Fuß
      L.push({ type: 'poly', pts: [[x - 9, 343, 84], [x + 9, 343, 84], [x + 9, 301, 116], [x - 9, 301, 116]], fill: true, col: c }, { type: 'line', a: [x - 9, 343, 84], b: [x - 9, 334, 80], w: 1.4, col: c }, { type: 'line', a: [x - 11, 316, 92], b: [x + 11, 316, 92], w: 1.8, col: c }); });
    L.push({ type: 'line', a: [-26, 346, 84], b: [26, 346, 84], w: 1.8 }, { type: 'line', a: [0, 340, 108], b: add(W, [0, 30, -30]), w: 2.7 }); // Halter der Fußstützen, Verbindung zum Gehäuse
    L.push({ type: 'circle', c: W, r: 50, fill: true, keep: true }, { type: 'circle', c: W, r: 42, spokes: 10, rot: p * 3 }, { type: 'circle', c: W, r: 11, hub: true }); // Gehäuse mit Lüfterrad, dreht mit
    L.push({ type: 'line', a: add(W, [0, -48, -6]), b: [0, 196, 176], w: 2.2 }, { type: 'poly', pts: [[-14, 180, 168], [14, 180, 168], [14, 204, 172], [-14, 204, 172]], fill: true, w: 1.4 }); // Monitorarm und Monitor
    L.push({ type: 'line', a: hg, b: [0, 290, 168], w: 1.4 }, { type: 'line', a: [-28, hg[1], hg[2]], b: [28, hg[1], hg[2]], w: 2.2 }); // Kette und Griff
    [-28, 28].forEach(function (x) { L.push({ type: 'line', a: [x * .55, hg[1], hg[2]], b: [x, hg[1], hg[2]], w: 3.6, col: x > 0 ? far : undefined }); }); // Griffe
    return L;
  }
  function bandPulldown(p) { // kniend vor dem hoch befestigten Band; Schultern nach unten, dann Ellbogen zur Seite bis die Hände auf Schulterhöhe sind
    var t = rep(p, .38, .14), pc = [0, 294, -20], a = 2, sh = shOf(pc, a, 0);
    var J = build({ pc: pc, a: a, nod: 0,
      arms: both(function (x) { return { to: lerp(add(sh, [x * 42, -102, 26]), add(sh, [x * 46, -4, 12]), t), pole: [x, .4, -.2], dir: UP }; }),
      legs: both(function (x) { return kneelLeg(pc, a, x, 391); }) });
    var A = [0, -70, 110];
    J._props = [bandLine(gripOf(J, 'a'), A), bandLine(gripOf(J, 'b'), A), { type: 'line', a: [-10, -70, 112], b: [10, -70, 112], w: 4, keep: true }];
    return J;
  }
  function boxJump(p) { // Absprung etwa eine Fußlänge vor der Box, Arme nach hinten, beidbeinig hoch, ganzer Fuß landet mittig, oben Hüfte strecken;
    // rückwärts herunter: erst ein Fuß hinter die Kante und hinunter, das Standbein auf der Box beugt sich, dann der zweite Fuß. Ende = Anfang (Schleife).
    var Z0 = 100, Z1 = 204, YB = 273, ZS = 20, ZB = (Z0 + Z1) / 2, FB = YB - 7, FS = 390; // Fußhöhe (Knöchel) auf der Box bzw. am Boden
    var A, B, pc, a = 4, sw = 0, nod = 0, s;
    function stand(z, y, sq) { return [0, y - 168 + 100 * sq, z - 6 - 40 * sq]; }
    if (p < .3) { // Ausholen, Absprung, Flug, Landung mit Abfangen
      var k = keys(p, [[0, { s: 0, w: 0 }], [.1, { s: .6, w: -1 }], [.15, { s: .1, w: .7 }], [.22, { s: .25, w: .9 }], [.27, { s: .55, w: .35 }], [.3, { s: .5, w: .3 }]]);
      var f = Math.min(1, Math.max(0, (p - .13) / .14)), fz = lerp(ZS, ZB, ease(f)), fy = f <= 0 ? FS : lerp(FS, FB, f) - 70 * Math.sin(Math.PI * f);
      s = k.s; sw = k.w; A = [-18, fy, fz]; B = [18, fy, fz]; pc = stand(fz, fy, s); a = 4 + 36 * s;
    } else if (p < .5) { // aufrichten, Hüfte strecken, kurz stehen
      s = .5 * (1 - ease(Math.min(1, (p - .3) / .12))); A = [-18, FB, ZB]; B = [18, FB, ZB]; pc = stand(ZB, FB, s); a = 4 + 36 * s; sw = .3 * s / .5;
    } else if (p < .74) { // Fuß b rückwärts über die Kante und hinunter, Standbein a beugt sich
      var d = ease((p - .5) / .24), zb = lerp(ZB, ZS, ease(Math.min(1, (p - .5) / .15))), yb = p < .58 ? FB - 10 * Math.sin(Math.PI * (p - .5) / .16) : lerp(FB, FS, ease((p - .58) / .16));
      A = [-18, FB, ZB]; B = [18, yb, zb]; pc = lerp(stand(ZB, FB, 0), [0, 228, 58], d); a = lerp(4, 14, d); nod = 6 * d;
    } else if (p < .92) { // Fuß a folgt, aufrichten
      var e = ease((p - .74) / .18), za = lerp(ZB, ZS, ease(Math.min(1, (p - .74) / .12))), ya = p < .8 ? FB - 8 * Math.sin(Math.PI * (p - .74) / .12) : lerp(FB, FS, ease((p - .8) / .12));
      A = [-18, ya, za]; B = [18, FS, ZS]; pc = lerp([0, 228, 58], stand(ZS, FS, 0), e); a = lerp(14, 4, e); nod = 6 * (1 - e);
    } else { A = [-18, FS, ZS]; B = [18, FS, ZS]; pc = stand(ZS, FS, 0); }
    var th = lerp(0, sw < 0 ? -50 : 150, Math.abs(sw)) * R;
    var J = build({ pc: pc, a: a, nod: nod - 6 * (s || 0),
      arms: both(function (x) { return { to: add(shOf(pc, a, x), mul([x * .1, Math.cos(th), Math.sin(th)], 112)), pole: [x, 0, 0], dir: [0, Math.cos(th), Math.sin(th)] }; }),
      legs: { a: { to: A, pole: [-.35, -.1, 1] }, b: { to: B, pole: [.35, -.1, 1] } } });
    J._props = plyoBox(Z0, Z1, YB, 77); return J; // 61 cm hoch, 51 cm tief, 76 cm breit (Plyo-Box 20 × 24 × 30 Zoll, aufrecht auf 24)
  }
  function bandWalk(p) { // Band um die Knie, halbe Hocke; kleine Schritte zur Seite, das Band bleibt gespannt; gleich viele zurück
    var pc0 = [0, 262, -24], a = 18, st = 34, k = (p * 2) % 1, dir = p < .5 ? 1 : -1, lead = dir, sx = p < .5 ? 0 : st; // zurück endet, wo es anfing
    var leadX = sx + lead * (22 + st * ease(Math.min(1, k * 2))), trailX = sx - lead * 22 + lead * st * ease(Math.max(0, k * 2 - 1));
    var px = (leadX + trailX) / 2, pc = [px, pc0[1], pc0[2]];
    var J = build({ pc: pc, a: a, nod: -6,
      arms: both(function (x) { return { to: add(pc, [x * 10, -70, 54]), pole: [x, .6, -.2], dir: [-x * .3, -.9, .3] }; }),
      legs: { a: { to: [lead < 0 ? leadX : trailX, 390 - (lead < 0 ? 1 : 0) * 10 * Math.sin(Math.PI * Math.min(1, k * 2)), 0], pole: [-.5, -.1, 1] }, b: { to: [lead > 0 ? leadX : trailX, 390 - (lead > 0 ? 1 : 0) * 10 * Math.sin(Math.PI * Math.min(1, k * 2)), 0], pole: [.5, -.1, 1] } } });
    J._props = [bandLine(lerp(J.hia, J.kna, .8), lerp(J.hib, J.knb, .8))]; return J;
  }
  function clamshell(p) { // Seitenlage, Knie gebeugt, Füße aufeinander; oberes Knie öffnet sich wie eine Muschel
    var t = rep(p, .4, .2), pc = [0, 222, -4];
    var J = build({ pc: pc, a: 0, nod: 0,
      arms: { a: { to: add(pc, [-26, 6, 18]), pole: [-1, 0, .2], dir: [.3, .5, .6] }, b: { to: add(shOf(pc, 0, 1), [0, -110, 4]), pole: [1, 0, 0], dir: UP } },
      legs: both(function (x) { return { to: add(pc, [x * 4, 112, -60]), pole: FWD, dir: [0, .2, 1] }; }) });
    var ax = norm(sub3(J.ana, J.hia)), kn = rotAround(J.kna, J.hia, ax, -48 * t); J.kna = kn; // nur das Knie dreht um die Achse Hüfte–Fuß
    J.hc = add(J.hc, [8, 0, 0]);
    return turnAll(J, pc, [0, 0, 1], 90, 392);
  }
  function copenhagen(p) { // Seitstütz am Unterarm, oberes Bein auf der Bank, unteres hängt darunter; Hüfte heben, bis der Körper eine Linie bildet
    var t = rep(p, .4, .2), pc = [lerp(26, 0, t), 222, -4], shb0 = shOf([0, 222, -4], 0, 1);
    var J = build({ pc: pc, a: 0, nod: 0,
      arms: { a: { to: add(pc, [-30, 8, 16]), pole: [-1, 0, .2], dir: [.2, .6, .5] }, b: { to: add(shb0, [56, 0, 52]), pole: [1, 0, -1], dir: [0, 0, 1] } },
      legs: { a: { to: [-16, 392, 0], pole: FWD, dir: [0, .28, 1] }, b: { to: [lerp(40, 34, t), 386, -6], pole: [0, 0, 1], dir: [0, .28, 1] } } });
    J = turnAll(J, [0, 222, -4], [0, 0, 1], 90, null); // Dennis: der untere Fuß hängt frei unter der Bank (nicht am Boden)
    var dy = 388 - J.elb[1]; for (var q in J) if (q.charAt(0) !== '_') J[q] = add(J[q], [0, dy, 0]);
    if (J._to) for (var r in J._to) J._to[r] = add(J._to[r], [0, dy, 0]);
    var F = J.ana; J._props = box(F[2] - 40, F[2] + 40, F[1] + 8, 0).length ? [{ type: 'poly', pts: [[F[0] - 30, F[1] + 9, -46], [F[0] + 30, F[1] + 9, -46], [F[0] + 30, F[1] + 9, 46], [F[0] - 30, F[1] + 9, 46]], keep: true },
      { type: 'line', a: [F[0] - 24, F[1] + 9, 40], b: [F[0] - 24, FLOOR_Y, 40] }, { type: 'line', a: [F[0] + 24, F[1] + 9, 40], b: [F[0] + 24, FLOOR_Y, 40] }, { type: 'line', a: [F[0] - 24, F[1] + 9, -40], b: [F[0] - 24, FLOOR_Y, -40], col: STYLE.far }] : [];
    return J;
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
      g_wgs: { name: "World's Greatest Stretch", pose: wgs, yaw: 54, dur: 9 },
      g_pullapart: { name: 'Band Pull-Apart', pose: pullApart, yaw: 20, dur: 2.6 },
      g_passthrough: { name: 'Band Pass-Through', pose: passThrough, yaw: 74, dur: 3.2 },
      g_supine_twist: { name: 'Supine Spinal Twist', pose: supineTwist, yaw: -100, tilt: 40, mat: [-150, 150, -200, 200], dur: 7 },
      g_childs_pose: { name: "Child's Pose", pose: childsPose, yaw: 62, dur: 5 },
      g_pigeon: { name: 'Pigeon Stretch', pose: pigeon, yaw: 44, tilt: 22, mat: [-120, 130, -200, 230], dur: 5 },
      g_supine_hamstring: { name: 'Supine Hamstring Stretch', pose: supineHam, yaw: 66, dur: 4 },
      g_kneeling_shin: { name: 'Kneeling Shin Stretch', pose: kneelShin, yaw: 64, dur: 4 },
      g_thread_needle: { name: 'Thread the Needle', pose: threadNeedle, yaw: 58, tilt: 24, mat: [-130, 120, -250, 70], dur: 7 },
      g_open_book: { name: 'Open Book', pose: openBook, yaw: 28, tilt: 38, mat: [-175, 195, -205, 140], dur: 5 },
      g_frog: { name: 'Frog Stretch', pose: frog, yaw: 24, tilt: 36, mat: [-150, 150, -230, 130], dur: 5 },
      g_legs_up_wall: { name: 'Legs-Up-the-Wall', pose: legsUpWall, yaw: 66, dur: 5 },
      g_puppy_pose: { name: 'Puppy Pose', pose: puppy, yaw: 62, dur: 5 },
      g_deadlift: { name: 'Deadlift', pose: deadlift, yaw: 64, dur: 3.2 },
      g_back_squat: { name: 'Back Squat', pose: backSquat, yaw: 50, dur: 3 },
      g_doorway_pec: { name: 'Doorway Pec Stretch', pose: doorPec, yaw: 50, tilt: 10, mat: [-130, 130, -120, 90], dur: 5 },
      g_prayer_stretch: { name: 'Prayer Stretch', pose: prayer, yaw: 62, dur: 4 },
      g_couch_stretch: { name: 'Couch Stretch', pose: couch, yaw: 64, dur: 4 },
      g_calf_wall_stretch: { name: 'Wall Calf Stretch', pose: calfWall, yaw: 60, dur: 4 },
      // Runde Kettlebell
      g_kb_swing: { name: 'Russian Kettlebell Swing', pose: kbSwing, yaw: 64, dur: 1.6 },
      g_american_swing: { name: 'American Kettlebell Swing', pose: kbAmericanSwing, yaw: 64, dur: 1.8 },
      g_goblet_squat: { name: 'Goblet Squat', pose: kbGoblet, yaw: 50, dur: 3 },
      g_kb_deadlift: { name: 'Kettlebell Deadlift', pose: kbDeadlift, yaw: 60, dur: 3 },
      g_kb_sumo_squat: { name: 'Kettlebell Sumo Squat', pose: kbSumo, yaw: 30, dur: 3 },
      g_kb_suitcase_deadlift: { name: 'Kettlebell Suitcase Deadlift', pose: kbSuitcase, yaw: 40, dur: 3 },
      g_kb_double_swing: { name: 'Double Kettlebell Swing', pose: kbDoubleSwing, yaw: 60, dur: 1.6 },
      g_kb_clean: { name: 'Kettlebell Clean', pose: kbClean, yaw: 64, dur: 2.4 },
      g_kb_snatch: { name: 'Kettlebell Snatch', pose: kbSnatch, yaw: 64, dur: 2.6 },
      g_kb_high_pull: { name: 'Kettlebell High Pull', pose: kbHighPull, yaw: 58, dur: 1.8 },
      g_kb_push_press: { name: 'Kettlebell Push Press', pose: kbPushPress, yaw: 58, dur: 2.6 },
      g_kb_clean_press: { name: 'Kettlebell Clean and Press', pose: kbCleanPress, yaw: 62, dur: 3.6 },
      g_kb_front_squat: { name: 'Kettlebell Front Squat', pose: kbFrontSquat, yaw: 40, dur: 3 },
      g_kb_double_front_squat: { name: 'Double Kettlebell Front Squat', pose: kbDoubleFrontSquat, yaw: 40, dur: 3 },
      g_kb_double_press: { name: 'Double Kettlebell Press', pose: kbDoublePress, yaw: 40, dur: 2.6 },
      g_kb_halo: { name: 'Kettlebell Halo', pose: kbHalo, yaw: 30, dur: 3 },
      g_kb_goblet_reverse_lunge: { name: 'Goblet Reverse Lunge', pose: kbRevLunge, yaw: 62, dur: 3 },
      g_kb_gorilla_row: { name: 'Kettlebell Gorilla Row', pose: kbGorillaRow, yaw: 56, dur: 3.6 },
      g_kb_glute_bridge: { name: 'Kettlebell Glute Bridge', pose: kbBridge, yaw: 66, dur: 3 },
      g_kb_russian_twist: { name: 'Kettlebell Russian Twist', pose: kbTwist, yaw: 40, dur: 2.6 },
      g_kb_dead_bug: { name: 'Kettlebell Dead Bug', pose: kbDeadBug, yaw: 64, dur: 4 },
      // Runde 4
      g_cossack: { name: 'Cossack Squat', pose: cossack, yaw: 12, dur: 5 },
      g_thruster: { name: 'Thruster', pose: thruster, yaw: 62, dur: 3 },
      g_cat_cow: { name: 'Cat-Cow', pose: catCow, yaw: 66, dur: 5 },
      g_shoulder_cars: { name: 'Shoulder CARs', pose: shoulderCars, yaw: 70, dur: 6 },
      g_hip_cars: { name: 'Hip CARs', pose: hipCars, yaw: -40, tilt: 26, mat: [-160, 120, -250, 70], dur: 6 },
      g_ninety_ninety: { name: '90/90 Hip Switch', pose: ninety, yaw: 18, tilt: 34, mat: [-150, 150, -150, 110], dur: 5 },
      g_half_split: { name: 'Half Split', pose: halfSplit, yaw: 64, dur: 4 },
      g_wrist_rocks: { name: 'Wrist Rocks', pose: wristRocks, yaw: 62, dur: 3 },
      g_cobra: { name: 'Cobra Stretch', pose: cobra, yaw: 66, dur: 4 },
      g_inchworm: { name: 'Inchworm', pose: inchworm, yaw: 64, dur: 7 },
      g_sleeper_stretch: { name: 'Sleeper Stretch', pose: sleeper, yaw: 10, tilt: 14, mat: [-190, 150, -110, 150], dur: 4 },
      g_lizard: { name: 'Lizard Stretch', pose: lizard, yaw: 50, tilt: 16, mat: [-110, 120, -190, 170], dur: 4 },
      g_butterfly: { name: 'Butterfly Stretch', pose: butterfly, yaw: 8, tilt: 12, mat: [-130, 130, -110, 120], solid: true, dur: 4 },
      g_pancake: { name: 'Pancake Stretch', pose: pancake, yaw: 150, tilt: 30, mat: [-160, 160, -100, 170], dur: 4 },
      g_glute_bridge_hold: { name: 'Glute Bridge Hold', pose: bridgeHold, yaw: 62, dur: 4 },
      g_band_press: { name: 'Band Overhead Press', pose: bandPress, yaw: 34, dur: 2.6 },
      g_db_press: { name: 'Dumbbell Shoulder Press', pose: dbPress, yaw: 34, dur: 2.6 },
      g_run: { name: 'Run', pose: run, yaw: 84, dur: 1.2 },
      g_strict_press: { name: 'Strict Press', pose: strictPress, yaw: 62, dur: 2.8 },
      g_hip_flexor_stretch: { name: 'Half-Kneeling Hip Flexor Stretch', pose: hipFlexor, yaw: 58, dur: 4 },
      // Runde 5
      g_dead_hang: { name: 'Dead Hang', pose: deadHang, yaw: 38, dur: 4, floor: false },
      g_wall_biceps_stretch: { name: 'Wall Biceps Stretch', pose: wallBiceps, yaw: 6, tilt: 4, dur: 4 },
      g_triceps_stretch: { name: 'Overhead Triceps Stretch', pose: tricepsStretch, yaw: 160, tilt: 10, dur: 4 },
      g_wrist_flexion_stretch: { name: 'Wrist Flexion Stretch', pose: wristFlexion, yaw: 62, dur: 4 },
      g_bench_dip: { name: 'Bench Dip', pose: benchDip, yaw: 50, tilt: 6, dur: 2.8 },
      g_body_saw: { name: 'Body Saw', pose: bodySaw, yaw: 64, dur: 3 },
      g_band_row: { name: 'Band Row', pose: bandRow, yaw: 60, dur: 2.6 },
      g_sit_up: { name: 'AbMat Sit-up', pose: sitUp, yaw: 62, dur: 3 },
      g_russian_twist: { name: 'Russian Twist', pose: russianTwist, yaw: 40, dur: 2.6 },
      g_wall_ball: { name: 'Wall Ball Shot', pose: wallBall, yaw: 62, dur: 3 },
      g_shuttle_run: { name: 'Shuttle Run', pose: shuttle, yaw: 84, dur: 5 },
      g_push_press: { name: 'Push Press', pose: pushPress, yaw: 62, dur: 2.8 },
      g_stair_climb: { name: 'Stair Climb', pose: stairClimb, yaw: 70, dur: 2 },
      g_bike_erg: { name: 'Bike Erg', pose: bikeErg, yaw: 72, dur: 1.4 },
      g_row_erg: { name: 'Row', pose: rowErg, yaw: 72, dur: 3 },
      g_band_lat_pulldown: { name: 'Band Lat Pulldown', pose: bandPulldown, yaw: 50, dur: 2.8 },
      g_box_jump: { name: 'Box Jump', pose: boxJump, yaw: 70, dur: 3.6 },
      g_lateral_band_walk: { name: 'Lateral Band Walk', pose: bandWalk, yaw: 12, dur: 3.2 },
      g_clamshell: { name: 'Clamshell', pose: clamshell, yaw: 10, tilt: 16, mat: [-200, 180, -120, 140], dur: 3 },
      g_copenhagen_plank: { name: 'Copenhagen Plank', pose: copenhagen, yaw: 12, tilt: 14, mat: [-220, 180, -120, 140], dur: 4 }
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Maskottchen = api;
})(this);
