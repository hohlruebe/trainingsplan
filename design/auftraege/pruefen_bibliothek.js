#!/usr/bin/env node
// Prüft Pakete von Cowork für die Übungsbibliothek gegen die echten Daten in index.html.
// Aufruf: node design/auftraege/pruefen_bibliothek.js felder_zug_vertikal.json [neu_zug_vertikal.json …]
// Gibt je Datei „OK“ oder eine Liste mit Fehlern aus. Exit-Code 1, sobald eine Datei Fehler hat.
'use strict';
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
const block = (id) => JSON.parse(new RegExp('<script id="' + id + '"[^>]*>([\\s\\S]*?)</script>').exec(html)[1]);
const LIB = block('lib-data');
const FAM = block('fam-data');

const UE = {}; LIB.uebungen.forEach((u) => { UE[u.id] = u; });
const EQ = new Set(LIB.equipment.map((e) => e.id));
const LAD = {}; LIB.leitern.forEach((l) => { LAD[l.id] = l.stufen.map((s) => s.name); });
const FAMS = {}; FAM.familien.forEach((f) => { FAMS[f.id] = f; });
const MUSTER = new Set(LIB.uebungen.map((u) => u.muster).concat(['isolation']));
const BEREICH = new Set(LIB.uebungen.map((u) => u.bereich));
const EINHEIT = new Set(['wdh', 'sek', 'kg', 'meter', 'kalorien', 'atemzuege']);
const ROLLE = new Set(['kraft', 'metcon', 'aufwaermen', 'cooldown', 'ruhetag', 'morgen', 'test']);
const MUSKELN = new Set(['brust', 'schulter_vorn', 'schulter_seite', 'schulter_hinten', 'trizeps', 'bizeps', 'unterarm', 'latissimus',
  'oberer_ruecken', 'rueckenstrecker', 'bauch_gerade', 'bauch_schraeg', 'hueftbeuger', 'gesaess', 'quadrizeps', 'beinbeuger',
  'adduktoren', 'abduktoren', 'waden', 'ganzkoerper']);
const GELENKE = ['schulter', 'ellbogen', 'handgelenk', 'ruecken', 'huefte', 'knie', 'fuss'];
const FAM_BEREICH = new Set(['zug', 'druck', 'beine', 'rumpf', 'skill', 'ausdauer', 'gewichtheben']);
// Sehnen-Tabelle der App (Leitern): Werte müssen gleich bleiben, Abweichung nur nach Entscheidung mit Dennis
const SEHNE = Function('return ' + /var SEHNE = (\{[\s\S]*?\});/.exec(html)[1])();
const NAMEN = new Map(); LIB.uebungen.forEach((u) => NAMEN.set(u.name.toLowerCase(), u.id));

function int(v, lo, hi) { return Number.isInteger(v) && v >= lo && v <= hi; }
function text(v) { return typeof v === 'string' && v.trim().length > 0 && !/…|\.\.\./.test(v); }

// Neue Felder (Teil 1 und Teil 2)
function pruefeFelder(u, err, wo, neueEq) {
  const m = u.muskeln;
  if (!m || !Array.isArray(m.primaer) || !Array.isArray(m.sekundaer)) err.push(wo + ': muskeln fehlt oder falsch');
  else {
    if (m.primaer.length < 1 || m.primaer.length > 3) err.push(wo + ': muskeln.primaer braucht 1–3 Einträge');
    if (m.sekundaer.length > 4) err.push(wo + ': muskeln.sekundaer höchstens 4');
    m.primaer.concat(m.sekundaer).forEach((x) => { if (!MUSKELN.has(x)) err.push(wo + ': unbekannter Muskel „' + x + '“'); });
    m.primaer.forEach((x) => { if (m.sekundaer.includes(x)) err.push(wo + ': „' + x + '“ steht in primaer und sekundaer'); });
  }
  const g = u.gelenke;
  if (!g || typeof g !== 'object') err.push(wo + ': gelenke fehlt');
  else {
    GELENKE.forEach((k) => { if (!int(g[k], 0, 3)) err.push(wo + ': gelenke.' + k + ' muss 0–3 sein'); });
    Object.keys(g).forEach((k) => { if (!GELENKE.includes(k)) err.push(wo + ': unbekanntes Gelenk „' + k + '“'); });
  }
  const b = u.bewegt;
  if (!Array.isArray(b)) err.push(wo + ': bewegt fehlt (Liste der bewegten Gelenke, [] bei Halteübungen)');
  else {
    b.forEach((k) => { if (!GELENKE.includes(k)) err.push(wo + ': unbekanntes Gelenk in bewegt „' + k + '“'); });
    if (new Set(b).size !== b.length) err.push(wo + ': bewegt enthält ein Gelenk doppelt');
    if ((UE[u.id] || u).muster === 'isolation' && b.length !== 1) err.push(wo + ': im Paket isolation genau ein Gelenk in bewegt');
  }
  if (!int(u.sehne, 0, 2)) err.push(wo + ': sehne muss 0, 1 oder 2 sein');
  else if (u.id in SEHNE && u.sehne !== SEHNE[u.id]) err.push(wo + ': sehne ' + u.sehne + ' weicht von der App ab (dort ' + SEHNE[u.id] + '). Nur nach Entscheidung, dann wird die App angepasst');
  if (!int(u.ermuedung, 1, 3)) err.push(wo + ': ermuedung muss 1–3 sein');
  if (!int(u.technik, 1, 5)) err.push(wo + ': technik muss 1–5 sein');
  if (typeof u.seitig !== 'boolean') err.push(wo + ': seitig muss true oder false sein');
  if (typeof u.laut !== 'boolean') err.push(wo + ': laut muss true oder false sein');
  const basis = UE[u.id] || u, metconKg = basis.einheit === 'kg' && (basis.rolle || []).includes('metcon');
  if (u.rx === undefined) err.push(wo + ': rx fehlt (null, wenn nicht nötig)');
  else if (u.rx !== null) {
    if (!metconKg) err.push(wo + ': rx nur bei Einheit kg und Rolle metcon, sonst null');
    else if (!(u.rx.m > 0 && u.rx.w > 0)) err.push(wo + ': rx braucht m und w in kg');
  }
  if (!Array.isArray(u.alias)) err.push(wo + ': alias muss eine Liste sein');
}

function pruefeEquipment(eq, err, wo, neueEq) {
  if (!Array.isArray(eq)) { err.push(wo + ': equipment muss eine Liste von Gruppen sein'); return; }
  eq.forEach((gr) => {
    if (!Array.isArray(gr) || !gr.length) err.push(wo + ': jede Equipment-Gruppe braucht mindestens ein Gerät');
    else gr.forEach((e) => { if (!EQ.has(e) && !neueEq.has(e)) err.push(wo + ': unbekanntes Gerät „' + e + '“'); });
  });
}

function pruefeVoraussetzung(list, err, wo) {
  if (!Array.isArray(list)) { err.push(wo + ': voraussetzung muss eine Liste sein'); return; }
  list.forEach((v) => {
    if (!LAD[v.leiter]) err.push(wo + ': Leiter „' + v.leiter + '“ gibt es nicht (Anhang E)');
    else if (!LAD[v.leiter].includes(v.stufe)) err.push(wo + ': Stufe „' + v.stufe + '“ gibt es in ' + v.leiter + ' nicht. Gültig: ' + LAD[v.leiter].join(', '));
  });
}

// Was andere Dateien im selben Aufruf neu einführen (Geräte, Familien, Übungen), gilt für alle Dateien.
const ALLE = { eq: new Set(), fam: new Map(), ue: new Map(), name: new Map() };
function sammle(datei) {
  let d; try { d = JSON.parse(fs.readFileSync(datei, 'utf8')); } catch (e) { return; }
  if (d.teil !== 'neu') return;
  (d.geraete_neu || []).forEach((e) => ALLE.eq.add(e.id));
  (d.familien_neu || []).forEach((f) => ALLE.fam.set(f.id, f));
  (d.uebungen || []).forEach((u) => {
    ALLE.ue.set(u.id, (ALLE.ue.get(u.id) || []).concat(path.basename(datei)));
    if (u.name) { const k = u.name.toLowerCase(); ALLE.name.set(k, (ALLE.name.get(k) || []).concat(u.id)); }
  });
}

function pruefeDatei(datei) {
  const err = [];
  let d;
  try { d = JSON.parse(fs.readFileSync(datei, 'utf8')); } catch (e) { return ['Kein gültiges JSON: ' + e.message]; }
  if (d.v !== 1) err.push('v muss 1 sein');
  if (!MUSTER.has(d.muster)) err.push('unbekanntes muster „' + d.muster + '“');
  if (!text(d.quelle)) err.push('quelle fehlt');
  if (!Array.isArray(d.uebungen) || !d.uebungen.length) return err.concat(['uebungen fehlt oder ist leer']);
  const ids = new Set();
  d.uebungen.forEach((u) => { if (ids.has(u.id)) err.push(u.id + ': doppelt im Paket'); ids.add(u.id); });

  if (d.teil === 'felder') {
    const soll = LIB.uebungen.filter((u) => u.muster === d.muster).map((u) => u.id);
    soll.forEach((id) => { if (!ids.has(id)) err.push(id + ': fehlt im Paket'); });
    d.uebungen.forEach((u) => {
      if (!UE[u.id]) { err.push(u.id + ': diese Übung gibt es nicht'); return; }
      if (UE[u.id].muster !== d.muster) err.push(u.id + ': gehört zu Muster ' + UE[u.id].muster);
      pruefeFelder(u, err, u.id, new Set());
    });
  } else if (d.teil === 'neu') {
    const neueEq = ALLE.eq;
    (d.geraete_neu || []).forEach((e) => {
      if (!/^eq_[a-z0-9_]+$/.test(e.id)) err.push('Gerät ' + e.id + ': id muss mit eq_ beginnen');
      if (EQ.has(e.id)) err.push('Gerät ' + e.id + ': gibt es schon');
      ['name', 'preis', 'platz', 'warum'].forEach((k) => { if (!text(e[k])) err.push('Gerät ' + e.id + ': ' + k + ' fehlt'); });
    });
    const neueFam = new Set((d.familien_neu || []).map((f) => f.id));
    d.uebungen.forEach((u) => {
      const wo = u.id || '(ohne id)';
      if (!/^g_[a-z0-9_]+$/.test(u.id || '')) err.push(wo + ': id muss g_ + Kleinbuchstaben, Ziffern, _ sein');
      if (UE[u.id]) err.push(wo + ': diese ID gibt es schon');
      if ((ALLE.ue.get(u.id) || []).length > 1) err.push(wo + ': ID steht in mehreren Dateien (' + ALLE.ue.get(u.id).join(', ') + ')');
      if (u.name && (ALLE.name.get(u.name.toLowerCase()) || []).length > 1) err.push(wo + ': Name „' + u.name + '“ gibt es in diesen Paketen mehrfach (' + ALLE.name.get(u.name.toLowerCase()).join(', ') + ')');
      if (u.name && NAMEN.has(u.name.toLowerCase())) err.push(wo + ': Name „' + u.name + '“ gibt es schon (' + NAMEN.get(u.name.toLowerCase()) + ')');
      if (!text(u.name)) err.push(wo + ': name fehlt');
      if (u.muster !== d.muster) err.push(wo + ': muster passt nicht zum Paket');
      if (!BEREICH.has(u.bereich)) err.push(wo + ': unbekannter bereich „' + u.bereich + '“');
      if (!EINHEIT.has(u.einheit)) err.push(wo + ': unbekannte einheit „' + u.einheit + '“');
      if (!Array.isArray(u.rolle) || !u.rolle.length || u.rolle.some((r) => !ROLLE.has(r))) err.push(wo + ': rolle fehlt oder enthält Unbekanntes');
      pruefeEquipment(u.equipment, err, wo, neueEq);
      if (!int(u.nutzen, 0, 100)) err.push(wo + ': nutzen muss 0–100 sein');
      if (!int(u.level, 1, 5)) err.push(wo + ': level muss 1–5 sein');
      pruefeVoraussetzung(u.voraussetzung, err, wo);
      ['trainiert', 'sauber', 'fehler', 'skalierung'].forEach((k) => { if (!text(u[k])) err.push(wo + ': ' + k + ' fehlt'); });
      if (!Array.isArray(u.schritte) || u.schritte.length < 2 || u.schritte.length > 4 || !u.schritte.every(text)) err.push(wo + ': schritte braucht 2–4 Sätze');
      pruefeFelder(u, err, wo, neueEq);
    });
    // Jede neue Übung genau einmal in einer Familie
    const platz = {};
    const zaehle = (id, wo) => { platz[id] = (platz[id] || 0) + 1; if (!ids.has(id)) err.push(wo + ': Übung ' + id + ' ist nicht im Paket'); };
    (d.familien_ergaenzt || []).forEach((fe) => {
      const f = FAMS[fe.familie] || ALLE.fam.get(fe.familie);
      if (!f) { err.push('familien_ergaenzt: Familie ' + fe.familie + ' gibt es nicht'); return; }
      (fe.varianten || []).forEach((v) => {
        const wo = fe.familie + '/' + v.uebung;
        zaehle(v.uebung, wo);
        if (!['stufe', 'variante', 'tempo'].includes(v.art)) err.push(wo + ': art muss stufe, variante oder tempo sein');
        if (v.art === 'stufe') {
          if (v.nach !== null && !f.varianten.some((x) => x.uebung === v.nach && x.art === 'stufe') && !ids.has(v.nach)) err.push(wo + ': nach „' + v.nach + '“ ist keine Stufe dieser Familie');
          if (!text(v.ziel)) err.push(wo + ': ziel fehlt');
        } else if ('nach' in v) err.push(wo + ': nach nur bei stufe');
        if (v.art === 'tempo' && !text(v.vermerk)) err.push(wo + ': vermerk fehlt');
        if (!int(v.effekt, 0, 100)) err.push(wo + ': effekt muss 0–100 sein');
        if (!text(v.grund)) err.push(wo + ': grund fehlt');
      });
    });
    (d.familien_neu || []).forEach((f) => {
      const wo = 'Familie ' + f.id;
      if (!/^f_[a-z0-9_]+$/.test(f.id || '')) err.push(wo + ': id muss f_ + Kleinbuchstaben, Ziffern, _ sein');
      if (FAMS[f.id]) err.push(wo + ': gibt es schon');
      ['name', 'kurz'].forEach((k) => { if (!text(f[k])) err.push(wo + ': ' + k + ' fehlt'); });
      if (!MUSTER.has(f.muster)) err.push(wo + ': unbekanntes muster');
      if (!FAM_BEREICH.has(f.bereich)) err.push(wo + ': unbekannter bereich');
      if (!int(f.ebene, 1, 6)) err.push(wo + ': ebene muss 1–6 sein');
      if (f.leiter !== null) err.push(wo + ': leiter muss null sein');
      (f.voraussetzt || []).forEach((v) => { if (!FAMS[v.familie] && !ALLE.fam.has(v.familie)) err.push(wo + ': voraussetzt ' + v.familie + ' gibt es nicht'); });
      const st = (f.varianten || []).filter((v) => v.art === 'stufe').map((v) => v.rang).sort((a, b) => a - b);
      st.forEach((r, i) => { if (r !== i + 1) err.push(wo + ': Ränge der Stufen müssen 1, 2, 3 … ohne Lücke sein'); });
      (f.varianten || []).forEach((v) => {
        zaehle(v.uebung, wo + '/' + v.uebung);
        if (v.art === 'stufe' && !text(v.ziel)) err.push(wo + '/' + v.uebung + ': ziel fehlt');
        if (v.art !== 'stufe' && v.rang !== null) err.push(wo + '/' + v.uebung + ': rang nur bei stufe, sonst null');
        if (v.art === 'tempo' && !text(v.vermerk)) err.push(wo + '/' + v.uebung + ': vermerk fehlt');
      });
    });
    ids.forEach((id) => { if (!platz[id]) err.push(id + ': steht in keiner Familie'); else if (platz[id] > 1) err.push(id + ': steht in mehr als einer Familie'); });
  } else err.push('teil muss „felder“ oder „neu“ sein');
  if (!Array.isArray(d.entscheidungen)) err.push('entscheidungen fehlt (leere Liste, wenn keine)');
  return err;
}

const dateien = process.argv.slice(2);
if (!dateien.length) { console.log('Aufruf: node design/auftraege/pruefen_bibliothek.js <datei.json> …'); process.exit(2); }
dateien.forEach(sammle);
let fehler = 0;
dateien.forEach((f) => {
  const err = pruefeDatei(f);
  if (err.length) { fehler++; console.log('✗ ' + path.basename(f) + ': ' + err.length + ' Fehler'); err.forEach((e) => console.log('  - ' + e)); }
  else console.log('✓ ' + path.basename(f) + ': OK');
});
process.exit(fehler ? 1 : 0);
