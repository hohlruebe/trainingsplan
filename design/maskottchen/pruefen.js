// Prüft die volle Bewegung aller Übungen: kleinster und größter Winkel an Ellbogen und Knie.
// Aufruf: node design/maskottchen/pruefen.js  — gestreckt heißt mindestens 175°.
var M=require('./maskottchen.js');
function ang3(a,b,c){var u=[a[0]-b[0],a[1]-b[1],a[2]-b[2]],v=[c[0]-b[0],c[1]-b[1],c[2]-b[2]];return Math.round(Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1]+u[2]*v[2])/Math.hypot(...u)/Math.hypot(...v))))*57.3);}
for (var k in M.EXERCISES){var e=M.EXERCISES[k],n=Math.round(e.dur*12),eMin=999,eMax=0,kMin=999,kMax=0;
 for(var i=0;i<n;i++){var J=e.pose(i/n);['a','b'].forEach(function(s){var el=ang3(J['sh'+s],J['el'+s],J['wr'+s]),kn=ang3(J['hi'+s],J['kn'+s],J['an'+s]);eMin=Math.min(eMin,el);eMax=Math.max(eMax,el);kMin=Math.min(kMin,kn);kMax=Math.max(kMax,kn);});}
 console.log(k.padEnd(12),'Ellbogen',eMin+'–'+eMax+'°','Knie',kMin+'–'+kMax+'°');}

// Kontaktpunkte: Hände und Füße, die am Boden, Ring oder Gerät sind, dürfen sich nie lösen (höchstens 1,5 px vom Ziel).
var C = { g_pullup: 'H', g_chinup: 'H', g_dip: 'H', g_row: 'HF', g_kneeraise: 'H', g_push: 'HF', g_pike: 'HF', g_tuck: 'HF', g_ring_push: 'HF', g_hspu: 'H', g_lsit: 'H',
  g_mountain_climber: 'H', g_plank: 'F', g_scap: 'HF', g_diamond_push: 'HF', g_slider_curl: 'HF', g_hip_thrust: 'F', g_bridge: 'HF', g_handstand: 'H', g_air: 'F', g_nordic: 'F', g_abwheel: 'F',
  g_push_knee: 'H', g_push_parallettes: 'HF', g_push_decline: 'HF', g_push_band: 'HF', g_push_weighted: 'HF', g_pistol_assisted: 'H', g_support_hold: 'H', g_free_handstand: 'H',
  g_wrist_extension_stretch: 'H', g_planche_lean: 'HF', g_knee_to_wall: 'F', g_wall_flexion_hold: 'F', g_wall_slide: 'F', g_deep_squat: 'F', g_overhead_squat_hold: 'F', g_ragdoll: 'F', g_forward_fold: 'F', g_jefferson_curl: 'F', g_pike_stretch: 'F',
  g_stack: 'F', g_pullapart: 'F', g_passthrough: 'F', g_childs_pose: 'HF', g_pigeon: 'H', g_kneeling_shin: 'HF', g_frog: 'HF', g_legs_up_wall: 'F', g_puppy_pose: 'HF',
  g_deadlift: 'HF', g_back_squat: 'HF', g_doorway_pec: 'F', g_prayer_stretch: 'F', g_couch_stretch: 'F', g_calf_wall_stretch: 'HF', g_supine_twist: 'H',
  g_cossack: 'F', g_thruster: 'HF', g_strict_press: 'HF', g_cat_cow: 'HF', g_shoulder_cars: 'F', g_hip_cars: 'H', g_half_split: 'H', g_wrist_rocks: 'HF', g_cobra: 'HF',
  g_lizard: 'H', g_butterfly: 'F', g_pancake: 'HF', g_glute_bridge_hold: 'HF', g_band_press: 'F', g_db_press: 'F', g_hip_flexor_stretch: 'F',
  g_dead_hang: 'H', g_wall_biceps_stretch: 'F', g_wrist_flexion_stretch: 'HF', g_bench_dip: 'HF', g_body_saw: 'F', g_band_row: 'F', g_russian_twist: 'F', g_push_press: 'HF', g_bike_erg: 'HF', g_row_erg: 'F', g_band_lat_pulldown: 'F', g_copenhagen_plank: 'F',
  g_lat_pulldown: 'F', g_shrug: 'F', g_reverse_nordic: 'F', g_single_slider_curl: 'HF', g_ring_leg_curl: 'HF', g_ring_triceps_extension: 'HF', g_skull_crusher: 'F', g_ring_curl: 'HF',
  g_biceps_curl: 'F', g_band_external_rotation: 'F', g_face_pull: 'F', g_back_extension_45: 'F', g_pallof: 'F', g_single_leg_calf_raise: 'HF', g_seated_calf_raise: 'HF' };
var bad = 0;
for (var k2 in C) {
  var e2 = M.EXERCISES[k2]; if (!e2) continue;
  var n2 = Math.round(e2.dur * 12), mh = 0, mf = 0;
  for (var j = 0; j < n2; j++) {
    var Q = e2.pose(j / n2); if (!Q._to) continue;
    ['a', 'b'].forEach(function (s) { var w = Q['wr' + s], t = Q._to['wr' + s], a = Q['an' + s], u = Q._to['an' + s];
      mh = Math.max(mh, Math.hypot(w[0] - t[0], w[1] - t[1], w[2] - t[2])); mf = Math.max(mf, Math.hypot(a[0] - u[0], a[1] - u[1], a[2] - u[2])); });
  }
  var ok = (C[k2].indexOf('H') < 0 || mh <= 1.5) && (C[k2].indexOf('F') < 0 || mf <= 1.5);
  if (!ok) { bad++; console.log('Kontakt löst sich:', k2, 'Hände', mh.toFixed(1), 'Füße', mf.toFixed(1)); }
}
console.log(bad ? bad + ' Übungen mit gelöstem Kontakt' : 'Kontakte: alle halten');

// Endlose Schleife (Dennis, 1. November: „ende in der gleichen Position, in der die Animation anfängt“): der Schritt vom letzten Bild zurück zum ersten
// darf nicht größer sein als die Schritte rundherum (Gelenke in px). Bewegt sich die Figur fort (Inchworm, Treppe), läuft das Bild mit.
function gap(A, B) { var m = 0, mk = ''; for (var q in A) { if (q.charAt(0) === '_' || !Array.isArray(A[q]) || !B[q] || A[q].length !== 3) continue;
  var v = Math.hypot(A[q][0] - B[q][0], A[q][1] - B[q][1], A[q][2] - B[q][2]); if (v > m) { m = v; mk = q; } } return [m, mk]; }
var jumps = 0;
for (var id3 in M.EXERCISES) {
  var e3 = M.EXERCISES[id3], n3 = Math.round(e3.dur * 12), P3 = []; for (var i3 = 0; i3 < n3; i3++) P3.push(e3.pose(i3 / n3));
  var near = Math.max(gap(P3[n3 - 3], P3[n3 - 2])[0], gap(P3[n3 - 2], P3[n3 - 1])[0], gap(P3[0], P3[1])[0], gap(P3[1], P3[2])[0]), w3 = gap(P3[n3 - 1], P3[0]);
  if (w3[0] > 1.6 * near + 2) { jumps++; console.log('Schleife springt:', id3, w3[0].toFixed(1), 'px bei', w3[1], '(sonst', near.toFixed(1) + ')'); }
}
console.log(jumps ? jumps + ' Übungen springen am Ende der Schleife' : 'Schleifen: alle enden, wo sie anfangen');
