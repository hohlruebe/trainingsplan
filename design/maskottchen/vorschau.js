// Vorschau der Vorlage: Rundumansicht in 8 Positionen und alle Übungen animiert.
// Aufruf: node vorschau.js  ->  out/vorschau.html
var fs = require('fs'), path = require('path'), M = require('./maskottchen.js');
var out = path.join(__dirname, 'out'); fs.mkdirSync(out, { recursive: true });
function still(yaw) { return '<svg viewBox="0 20 320 395" width="130" height="160">' + M.figure(M.STAND, yaw, 0).svg + '</svg>'; }
var row = '';
for (var y = 0; y < 360; y += 45) row += '<div class="c"><span>' + y + '°</span>' + still(y) + '</div>';
var spin = M.animatedSVG({ pose: function () { return M.STAND; }, yaw: 0, dur: 6 }, 130, 160);
// Drehen: eigene Bilder, weil sich die Ansicht ändert
var n = 72, fr = '';
for (var i = 0; i < n; i++) {
  var v = i === 0 ? ['1;0', '0;' + (1 / n).toFixed(4)] : i === n - 1 ? ['0;1', '0;' + (i / n).toFixed(4)] : ['0;1;0', '0;' + (i / n).toFixed(4) + ';' + ((i + 1) / n).toFixed(4)];
  fr += '<g opacity="' + (i ? 0 : 1) + '"><animate attributeName="opacity" calcMode="discrete" values="' + v[0] + '" keyTimes="' + v[1] + '" dur="6s" repeatCount="indefinite"/>' + M.figure(M.STAND, i * 5, i).svg + '</g>';
}
spin = '<svg viewBox="0 20 320 395" width="130" height="160">' + fr + '</svg>';
row += '<div class="c"><span>dreht sich</span>' + spin + '</div>';
var ex = '';
for (var k in M.EXERCISES) ex += '<div class="card"><b>' + k + '</b>' + M.animatedSVG(M.EXERCISES[k], 270, 250) + '</div>';
var html = '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Maskottchen-Vorlage</title><style>' +
  'body{margin:0;padding:32px;background:#ECECE7;font-family:system-ui,sans-serif;color:#111214}' +
  '.row,.ex{display:flex;gap:8px;flex-wrap:wrap}.c{display:flex;flex-direction:column;align-items:center;background:#fff;border-radius:18px;padding:8px}' +
  '.c span{font-size:11px;color:#6E6E73}.card{background:#fff;border-radius:22px;padding:14px;display:flex;flex-direction:column;gap:6px}</style></head><body>' +
  '<h2>Maskottchen-Vorlage · B3-2 V-Form</h2><div class="row">' + row + '</div><h3>Übungen</h3><div class="ex">' + ex + '</div></body></html>';
fs.writeFileSync(path.join(out, 'vorschau.html'), html);
console.log('out/vorschau.html');
