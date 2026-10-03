// Prüft die volle Bewegung aller Übungen: kleinster und größter Winkel an Ellbogen und Knie.
// Aufruf: node design/maskottchen/pruefen.js  — gestreckt heißt mindestens 175°.
var M=require('./maskottchen.js');
function ang3(a,b,c){var u=[a[0]-b[0],a[1]-b[1],a[2]-b[2]],v=[c[0]-b[0],c[1]-b[1],c[2]-b[2]];return Math.round(Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1]+u[2]*v[2])/Math.hypot(...u)/Math.hypot(...v))))*57.3);}
for (var k in M.EXERCISES){var e=M.EXERCISES[k],n=Math.round(e.dur*12),eMin=999,eMax=0,kMin=999,kMax=0;
 for(var i=0;i<n;i++){var J=e.pose(i/n);['a','b'].forEach(function(s){var el=ang3(J['sh'+s],J['el'+s],J['wr'+s]),kn=ang3(J['hi'+s],J['kn'+s],J['an'+s]);eMin=Math.min(eMin,el);eMax=Math.max(eMax,el);kMin=Math.min(kMin,kn);kMax=Math.max(kMax,kn);});}
 console.log(k.padEnd(12),'Ellbogen',eMin+'–'+eMax+'°','Knie',kMin+'–'+kMax+'°');}
