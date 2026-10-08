// Schreibt design/familien.json im gleichen Format wie bisher (Familien-Felder je Zeile, Varianten je eine Zeile).
'use strict';
function inl(v){ if(Array.isArray(v)) return '['+v.map(inl).join(', ')+']';
  if(v&&typeof v==='object'){const k=Object.keys(v); return k.length?'{ '+k.map(x=>JSON.stringify(x)+': '+inl(v[x])).join(', ')+' }':'{}';}
  return JSON.stringify(v);}
function arrLines(a,ind){ return a.length?'[\n'+a.map(x=>ind+'  '+inl(x)).join(',\n')+'\n'+ind+']':'[]'; }
function fam(f){ const I='      '; return '    {\n'+Object.keys(f).map(k=>{const v=f[k];
  let s=(k==='voraussetzt'||k==='varianten')?arrLines(v,I):inl(v); return I+JSON.stringify(k)+': '+s;}).join(',\n')+'\n    }';}
function obj(o){ return '    {\n'+Object.keys(o).map(k=>'      '+JSON.stringify(k)+': '+inl(o[k])).join(',\n')+'\n    }'; }
function fmt(d){ return '{\n'+Object.keys(d).map(k=>{const v=d[k]; let s;
  if(k==='familien') s='[\n'+v.map(fam).join(',\n')+'\n  ]'; else if(k==='entscheidungen') s='[\n'+v.map(obj).join(',\n')+'\n  ]'; else s=inl(v);
  return '  '+JSON.stringify(k)+': '+s;}).join(',\n')+'\n}\n'; }
module.exports=fmt;
