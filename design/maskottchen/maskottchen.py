# Maskottchen-Entwurf (Stil B3 mit drei Verfeinerungen): Figur in 3D, gedreht und als Skizze gezeichnet.
# Aufruf: python3 maskottchen.py  ->  out/rundum.html und out/app.html
import math, json, random, os
HERE=os.path.dirname(os.path.abspath(__file__)); OUT=os.path.join(HERE,'out'); os.makedirs(OUT,exist_ok=True)
_s=open(os.path.join(HERE,'gesture.py')).read(); exec(_s[:_s.index('\ndef figure(')])
STAND={'nb':(0,96,2),'hc':(0,58,7),'pc':(0,222,-4),
 'sha':(-31,110,-2),'shb':(31,110,-2),'ela':(-39,166,-6),'elb':(38,166,-3),'wra':(-41,220,6),'wrb':(40,218,9),'haa':(-42,244,10),'hab':(41,242,13),
 'hia':(-18,228,-4),'hib':(18,228,-4),'kna':(-19,308,3),'knb':(22,306,10),'ana':(-20,390,-3),'anb':(24,388,2),'toa':(-22,397,22),'tob':(27,395,26)}
BASE=dict(passes=3,sw=1.1,jit=1.4,fill='none',fop=0,dot=False,loa=4,far='#A8A7CC',boil=False,work=(),shadow=False)
BASE.update(boil=True,boilstep=2,hands=False,taper=False,athl=False)
BASE.update(taper=True,athl=True,muscle=False,delt=False,trap=False,extra=0)
V={
 'A':dict(BASE,name='B3-1 · Definiert',sub='Feine Muskellinien: Brust, Bauch, Oberschenkel, Wade',muscle=True),
 'B':dict(BASE,name='B3-2 · V-Form',sub='Noch breitere Schultern mit Schulterkappen, stärker verjüngt',delt=True,extra=3),
 'C':dict(BASE,name='B3-3 · Nacken und Kiefer',sub='Kräftiger Nacken mit Trapez, kantiges Kinn',trap=True),
}
FRAME=[0]; EXT=[]
def stroke(shape,col,st,seed):
    rnd=random.Random(seed+(FRAME[0]//st['boilstep'])*1009 if st['boil'] else seed); out=''
    for i in range(st['passes']):
        tr='' if i==0 else ' transform="translate(%.1f %.1f) rotate(%.1f)"'%(rnd.uniform(-1,1)*st['jit'],rnd.uniform(-1,1)*st['jit'],rnd.uniform(-.8,.8))
        sh=shape if i==0 else shape.replace('fill="%s"'%st['fill'],'fill="none"')
        out+='<g stroke-width="%s" opacity="%s"%s>%s</g>'%(st['sw'] if i==0 else st['sw']*.6,1 if i==0 else .5,tr,sh)
    return '<g fill="none" stroke="%s" stroke-linecap="round" stroke-linejoin="round">%s</g>'%(col,out)
WK='#3F6FE0'
def sub3(a,b): return (a[0]-b[0],a[1]-b[1],a[2]-b[2])
def fig(st,yaw,J,vb='0 20 320 395',w=250,h=309,floor=True):
    c,s=math.cos(math.radians(yaw)),math.sin(math.radians(yaw)); f=s
    if st['athl']:
        J=dict(J)
        for sd,x in (('a',-1),('b',1)):
            for k,dx in (('sh',4+st['extra']),('el',4.5+st['extra']),('wr',4+st['extra']),('ha',4+st['extra'])): v=J[k+sd]; J[k+sd]=(v[0]+x*dx,v[1],v[2])
    P={};Z={}
    for k,(x,y,z) in J.items(): P[k]=(160+x*c+z*s,y); Z[k]=-x*s+z*c
    near='a' if Z['sha']+Z['hia']>=Z['shb']+Z['hib'] else 'b'; farr='b' if near=='a' else 'a'
    side=abs(s)>.35
    n=[0]
    def S(shape,col):
        n[0]+=1; return stroke(shape,col,st,n[0]*7)
    F=st['fill']
    def segm(a,b,wd,col,fill,ext=.1):
        L=d(a,b);cx,cy=(a[0]+b[0])/2,(a[1]+b[1])/2
        if st['taper'] and wd>6 and L>wd:
            h=L/2*(1+ext); w1=wd*1.12; w2=wd*.62
            pth='M%.1f 0 C%.1f %.1f %.1f %.1f 0 %.1f C%.1f %.1f %.1f %.1f %.1f 0 C%.1f %.1f %.1f %.1f 0 %.1f C%.1f %.1f %.1f %.1f %.1f 0 Z'%(
                -h,-h,-w1*.9,-h*.5,-w1,w1*-0+-((w1+w2)/2),h*.5,-w2,h,-w2*.8,h,h,w2*.8,h*.5,w2,(w1+w2)/2,-h*.5,w1,-h,w1*.9,-h)
            if st['muscle'] and wd>8:
                pth+=' M%.1f %.1f Q%.1f %.1f %.1f %.1f'%(-h*.55,-w1*.35,-h*.05,-w1*.75,h*.55,-w2*.35)
            elif st['muscle'] and wd>7:
                pth+=' M%.1f %.1f Q%.1f %.1f %.1f %.1f'%(-h*.7,w1*.3,-h*.3,w1*.85,h*.25,w2*.3)
            if st['delt'] and wd>8: w1*=1.0
            return S('<path fill="%s" d="%s" transform="translate(%.1f %.1f) rotate(%.1f)"/>'%(fill,pth,cx,cy,ang(a,b)),col)
        return S('<ellipse fill="%s" rx="%.1f" ry="%.1f" transform="translate(%.1f %.1f) rotate(%.1f)"/>'%(fill,max(L/2*(1+ext),wd),wd,cx,cy,ang(a,b) if L>.5 else 0),col)
    def jnt(p,r,col):
        if st['dot']: return '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>'%(p[0],p[1],r*.62,col)
        return '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="#fff" stroke="%s" stroke-width="1.3"/>'%(p[0],p[1],r,col)
    def foot(a,t,col,fill):
        L=max(d(a,t),3); an=ang(a,t)
        return S('<path fill="%s" d="M-5 -3 C-7 3 -4 5.5 0 5.5 L%.1f 5.5 C%.1f 5.5 %.1f 2 %.1f 0 C%.1f -3 %.1f -5 0 -5.5 C-3 -5.5 -4.5 -4.5 -5 -3 Z" transform="translate(%.1f %.1f) rotate(%.1f)"/>'%(
            fill,L*.9,L*1.12,L*1.12,L*.8,L*.4,L*.1,a[0],a[1],an),col)
    def limbs(sd,col,fill):
        lc=(WK if col==INK else '#9FB6EE') if 'legs' in st['work'] else col
        g=segm(P['hi'+sd],P['kn'+sd],11,lc,fill)+segm(P['kn'+sd],P['an'+sd],8.5,lc,fill)+(foot(P['an'+sd],P['to'+sd],col,fill) if st['hands'] else segm(P['an'+sd],P['to'+sd],5,col,fill,.25))
        g+=segm(P['sh'+sd],P['el'+sd],8,col,fill)+segm(P['el'+sd],P['wr'+sd],6.5,col,fill)
        if st['delt']:
            sp_,el_=P['sh'+sd],P['el'+sd]; an=ang(sp_,el_); m=loc(sp_,an-90,(0,-0)) 
            g+=S('<ellipse fill="%s" rx="11" ry="8.5" transform="translate(%.1f %.1f) rotate(%.1f) translate(5 0)"/>'%(fill,sp_[0],sp_[1],an),col)
        if st['hands']:
            w,t=P['wr'+sd],P['ha'+sd]; L=max(d(w,t),6); an=ang(w,t); th=-1 if sd=='a' else 1
            g+=S('<g transform="translate(%.1f %.1f) rotate(%.1f)"><path fill="%s" d="M0 -4.2 C%.1f -6 %.1f -4.5 %.1f 0 C%.1f 4.5 %.1f 6 0 4.2 Z"/><ellipse fill="%s" cx="%.1f" cy="%.1f" rx="4" ry="1.9" transform="rotate(%d %.1f %.1f)"/></g>'%(
                w[0],w[1],an,fill,L*.7,L*1.1,L*1.15,L*1.1,L*.7,fill,L*.35,th*4.3,th*25,L*.35,th*4.3),col)
        else: g+=segm(P['wr'+sd],P['ha'+sd],4.6,col,fill,.2)
        for j,r in (('hi',5.5),('kn',5.2),('an',4),('sh',5.5),('el',4.5),('wr',3.4)): g+=jnt(P[j+sd],r,col)
        return g
    g='<line x1="20" x2="300" y1="401" y2="401" stroke="#DADAD3" stroke-width="2" stroke-linecap="round"/>' if floor else ''
    if st['shadow']:
        xs=[P[k][0] for k in ('ana','anb','toa','tob')]; cx=(min(xs)+max(xs))/2; wd=(max(xs)-min(xs))/2+22
        g+='<ellipse cx="%.1f" cy="401" rx="%.1f" ry="5" fill="#34327E" opacity=".08"/>'%(cx,wd)
    EXT.extend(P.values())
    fc=st['far'] if side else INK
    g+=limbs(farr,fc,F)
    # Rumpf: Winkel und Verkürzung aus der Wirbelsäule
    sp=sub3(J['nb'],J['pc']); L3=math.sqrt(sum(v*v for v in sp)) or 1
    dx=sp[0]*c+sp[2]*s; dy=sp[1]; th=math.degrees(math.atan2(dx,-dy)); ratio=max(.55,math.hypot(dx,dy)/L3)
    RX=math.hypot((30+st['extra'] if st['athl'] else 27)*c,(26 if st['athl'] else 25)*s); RY=42*ratio; PX=math.hypot((26 if st['athl'] else 29)*c,23*s)
    nb=P['nb']; rc=loc(nb,th,(0,RY)); pc=P['pc']
    hs=sub3(J['hc'],J['nb']); hth=math.degrees(math.atan2(hs[0]*c+hs[2]*s,-hs[1]))
    hb=loc(P['hc'],hth,(0,18))
    nw=9 if st['trap'] else 6
    g+=S('<path d="M%.1f %.1f L%.1f %.1f M%.1f %.1f L%.1f %.1f"/>'%(*loc(hb,hth,(-nw,0)),*loc(nb,th,(-nw-1,4)),*loc(hb,hth,(nw,0)),*loc(nb,th,(nw+1,4))),INK)
    if st['trap']:
        for sd in ('a','b'):
            sh_=P['sh'+sd]; q=loc(hb,hth,(0,6)); side_=1 if sh_[0]>nb[0] else -1
            g+=S('<path d="M%.1f %.1f Q%.1f %.1f %.1f %.1f"/>'%(q[0]+side_*nw*.9,q[1]-2,(q[0]+sh_[0])/2+side_*2,q[1]+4,sh_[0]-side_*3,sh_[1]-5),INK if sd==near or not side else fc)
    wl=(loc(rc,th,(-RX*.8,RY*.55)),loc(rc,th,(-RX*(.55 if st['athl'] else .72),RY*1.15)),loc(pc,th,(-PX*.85,-8)))
    wr=(loc(rc,th,(RX*.8,RY*.55)),loc(rc,th,(RX*(.55 if st['athl'] else .72),RY*1.15)),loc(pc,th,(PX*.85,-8)))
    g+=S('<path d="M%.1f %.1f Q%.1f %.1f %.1f %.1f M%.1f %.1f Q%.1f %.1f %.1f %.1f"/>'%(*wl[0],*wl[1],*wl[2],*wr[0],*wr[1],*wr[2]),INK)
    pel='<ellipse fill="%s" rx="%.1f" ry="19"/><path d="%s"/><path d="%s" opacity=".7"/>'%(F,PX,mer(PX,19,f*.9 if c>-.2 else -f*.9),equ(PX,19,-.1,.12))
    g+='<g transform="translate(%.1f %.1f) rotate(%.1f)">%s</g>'%(pc[0],pc[1],th,S(pel,WK if 'pelvis' in st['work'] else INK))
    rib=egg(RX,RY).replace('fill="#fff"','fill="%s"'%F)+'<path d="%s"/>'%mer(RX*.95,RY,f*.9 if c>-.2 else -f*.9)
    for y,b in ((-.3,.07),(.42,.12)): rib+='<path d="%s" opacity=".7"/>'%equ(RX*1.02,RY,y,b)
    if st['muscle'] and c>-.2:
        m0=f*RX*.85
        for sg in (-1,1):
            ox=m0+sg*RX*.55*abs(c)
            if abs(c)>.25 or sg==(1 if f>0 else -1): rib+='<path d="M%.1f %.1f Q%.1f %.1f %.1f %.1f" opacity=".8"/>'%(m0,-RY*.05,ox,RY*.12,ox+sg*RX*.25*abs(c)-f*4,-RY*.42)
        for k in (1,2): rib+='<path d="M%.1f %.1f l%.1f 0" opacity=".6"/>'%(m0-5*abs(c),RY*(.35+k*.17),10*abs(c)+1)
    g+='<g transform="translate(%.1f %.1f) rotate(%.1f)">%s</g>'%(rc[0],rc[1],th,S(rib,INK))
    # Kopf mit Gesicht (nur sichtbar, wenn es zum Betrachter zeigt)
    hx=math.hypot(15.5*c,18.5*s); hy=20
    hd='<path d="M0 %d C%.1f %d %.1f %.1f 0 %d C%.1f %.1f %.1f %d 0 %d Z" fill="%s"/>'%(-hy,hx*1.35,-hy,hx*1.1,hy*.9,hy,-hx*1.1,hy*.9,-hx*1.35,-hy,-hy,F)
    if st['trap'] and c>-.6:
        jx=f*hx*.75
        hd+='<path d="M%.1f %.1f L%.1f %.1f L%.1f %.1f" opacity=".85"/>'%(jx-hx*.85*abs(c)-f*4,hy*.45,jx-4*abs(c),hy*.98,jx+hx*.85*abs(c)*0.5+f*2,hy*.82)
    hd+='<path d="%s"/><path d="%s"/>'%(mer(hx,hy,f*.95 if c>-.2 else -f*.95),equ(hx,hy,.05,.06))
    for e in (-.55,.55):
        a=math.radians(yaw)+e
        if math.cos(a)>.15: ex=math.sin(a)*hx*1.05; hd+='<path d="M%.1f -1 q2.5 -2.6 5 0"/>'%(ex-2.5)
    if c>-.2:
        nx=f*hx*1.02; sx=1 if f>=0 else -1
        hd+='<path d="M%.1f 1 l%.1f 6 l%.1f 2"/>'%(nx,sx*(1+4*abs(f)),-sx*(1+4*abs(f)))
        if c>.4: hd+='<path d="M%.1f 12 q3 1.5 6 0"/>'%(nx-3)
    g+='<g transform="translate(%.1f %.1f) rotate(%.1f)">%s</g>'%(P['hc'][0],P['hc'][1],hth,S(hd,INK))
    top=loc(P['hc'],hth,(f*4 if c>-.2 else 0,-22))
    sup='a'; EXT.append(top)
    g+='<path d="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round" opacity=".85"/>'%(smooth([top,nb,rc,pc,P['kn'+sup],P['an'+sup]]),ORA,st['loa'])
    g+=limbs(near,INK,F)
    return '<svg viewBox="%s" width="%d" height="%d">%s</svg>'%(vb,w,h,g)

# ---- Kniebeuge: Gelenke aus Winkeln, damit nichts streckt ----
def ik2(h,a,l1,l2):
    # Knie in der y-z-Ebene, Knie nach vorn (+z)
    dy,dz=a[1]-h[1],a[2]-h[2]; D=min(math.hypot(dy,dz),l1+l2-.01)
    base=math.atan2(dz,dy); k=math.acos(max(-1,min(1,(l1*l1+D*D-l2*l2)/(2*l1*D))))
    t=base+k
    return (h[0]+(a[0]-h[0])*.4,h[1]+l1*math.cos(t),h[2]+l1*math.sin(t))
def squat(t):
    J=dict(STAND)
    pc=(0,222+78*t,-4-34*t); J['pc']=pc
    lean=math.radians(38*t)
    def up(dist,dx=0,extra=0): return (dx,pc[1]-dist*math.cos(lean),pc[2]+dist*math.sin(lean)+extra)
    J['nb']=up(126,0,2); J['hc']=up(164,0,7-4*t)
    J['hc']=(0,J['hc'][1]+6*t,J['hc'][2]-10*t)   # Kopf bleibt aufrecht, Blick nach vorn
    for sd,x in (('a',-1),('b',1)):
        sh=up(112,31*x,-2); J['sh'+sd]=sh
        b=math.radians(4+86*t)   # Arme heben nach vorn
        def arm(L): return (sh[0]+x*(2-2*t)*L/56,sh[1]+L*math.cos(b),sh[2]+L*math.sin(b))
        J['el'+sd]=arm(56); J['wr'+sd]=arm(110); J['ha'+sd]=arm(134)
        hi=(18*x+2*x*t,pc[1]+6,pc[2]); J['hi'+sd]=hi
        an=(21*x,390,-1); J['an'+sd]=an; J['to'+sd]=(23*x+3*x,397,24)
        J['kn'+sd]=ik2(hi,an,80,82)
        J['kn'+sd]=(J['kn'+sd][0]+x*8*t,)+J['kn'+sd][1:]
    return J
def frames(fn,N,dur,args):
    out=''
    for i in range(N):
        FRAME[0]=i
        if i==0: vals,kt='1;0','0;%.4f'%(1/N)
        elif i==N-1: vals,kt='0;1','0;%.4f'%(i/N)
        else: vals,kt='0;1;0','0;%.4f;%.4f'%(i/N,(i+1)/N)
        FRAME[0]=i
        out+='<g opacity="%d"><animate attributeName="opacity" calcMode="discrete" values="%s" keyTimes="%s" dur="%ss" repeatCount="indefinite"/>%s</g>'%(1 if i==0 else 0,vals,kt,dur,fn(i,*args))
    return out
def inner(svg): return svg[svg.index('>')+1:svg.rindex('</svg>')]
def ease(x): return .5-.5*math.cos(math.pi*x)
def sq_t(p):
    if p<.42: return ease(p/.42)
    if p<.5: return 1
    if p<.92: return 1-ease((p-.5)/.42)
    return 0
CARD='background:#fff;border-radius:22px;box-shadow:0 1px 2px rgba(0,0,0,.04),0 10px 30px rgba(0,0,0,.05)'
HEAD='''<!doctype html>
<html lang="de"><head><meta charset="utf-8"><title>%s</title></head>
<body><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"><style>body{margin:0}</style>'''
FOOT='</body></html>'
# Board 1: Rundumansicht
rows=''
for k,st in V.items():
    cells=''.join('<div style="display:flex;flex-direction:column;align-items:center"><span style="font-size:11px;color:#6E6E73">%d°</span>%s</div>'%(y,fig(st,y,STAND,w=118,h=146)) for y in range(0,360,45))
    spin=frames(lambda i,st: inner(fig(st,i*10,STAND)),36,6,(st,))
    cells+='<div style="display:flex;flex-direction:column;align-items:center;border-left:1px solid #EEE;padding-left:10px"><span style="font-size:11px;color:#6E6E73">dreht sich</span><svg viewBox="0 20 320 395" width="118" height="146">%s</svg></div>'%spin
    rows+='<div style="%s;padding:14px 20px 8px"><div style="display:flex;gap:12px;align-items:baseline"><b style="font-size:16px">%s</b><span style="color:#6E6E73;font-size:13px">%s</span></div><div style="display:flex;justify-content:space-between">%s</div></div>'%(CARD,st['name'],st['sub'],cells)
b1=HEAD%'Rundumansicht'+'''<div style="width:1340px;box-sizing:border-box;padding:36px;background:#ECECE7;font-family:'Geist',system-ui,sans-serif;color:#111214;display:flex;flex-direction:column;gap:16px">
<div style="font-size:18px;font-weight:600">B3 verfeinert · drei Varianten · Rundumansicht in 8 Positionen</div>%s
<div style="font-size:13px;color:#6E6E73;line-height:1.5">Von hinten verschwindet das Gesicht, die Mittellinie wird zur Wirbelsäule. Rechts dreht sich die Figur einmal ganz herum: das ist schon dieselbe Zeichnung wie in der Animation.</div></div>'''%rows+FOOT
open(os.path.join(OUT,'rundum.html'),'w').write(b1)
# Board 2: so in der App
phones=''
for k,st in V.items():
    del EXT[:]
    anim=frames(lambda i,st: inner(fig(st,38,squat(sq_t(i/32)),floor=True)),32,2.6,(st,))
    M=26; x0=min(p[0] for p in EXT)-M; x1=max(p[0] for p in EXT)+M; y0=min(p[1] for p in EXT)-M; y1=410
    VB='%.0f %.0f %.0f %.0f'%(x0,y0,x1-x0,y1-y0)
    phones+='''<div style="width:390px;height:760px;box-sizing:border-box;border-radius:44px;background:#F2F2EE;box-shadow:0 0 0 10px #1C1C1E,0 20px 50px rgba(0,0,0,.25);padding:54px 18px 18px;display:flex;flex-direction:column;gap:12px;position:relative;overflow:hidden">
<div style="position:absolute;top:56px;right:18px;width:36px;height:36px;border-radius:50%%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;font-size:16px;color:#6E6E73">✕</div>
<div style="font-size:11px;letter-spacing:.08em;color:#6E6E73;font-weight:600">TAG 6 · SCHRITT 4 VON 4 · METCON</div>
<div><div style="font-size:30px;font-weight:800;line-height:1.1">Air Squat</div><div style="width:64px;height:6px;border-radius:3px;background:#3F6FE0;margin-top:6px;opacity:.85"></div></div>
<div style="%s;padding:6px;display:flex;justify-content:center"><svg viewBox="%s" width="270" height="250" preserveAspectRatio="xMidYMid meet" style="overflow:hidden">%s</svg></div>
<div style="display:flex;gap:8px"><span style="background:#fff;border-radius:999px;padding:6px 12px;font-size:13px">AMRAP 8 Min</span><span style="background:#fff;border-radius:999px;padding:6px 12px;font-size:13px">15 Wdh.</span></div>
<div style="font-size:14px;line-height:1.45;color:#3A3A3C">Hüfte nach hinten, Knie über die Zehen, Brust bleibt oben. Unten kurz halten, dann kräftig hoch.</div>
<div style="margin-top:auto;border-radius:999px;background:rgba(255,255,255,.75);box-shadow:0 6px 20px rgba(0,0,0,.08);height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 22px;font-weight:700"><span style="font-size:22px;font-variant-numeric:tabular-nums">06:42</span><span style="font-size:13px;color:#6E6E73;font-weight:500">Runde 3</span><span style="width:40px;height:40px;border-radius:50%%;background:#3F6FE0;color:#fff;display:flex;align-items:center;justify-content:center">❚❚</span></div>
<div style="text-align:center;font-size:12px;color:#6E6E73">%s</div>
</div>'''%(CARD,VB,anim,st['name'])
b2=HEAD%'Animiert in der App'+'''<div style="width:1340px;box-sizing:border-box;padding:36px 46px;background:#ECECE7;font-family:'Geist',system-ui,sans-serif;color:#111214;display:flex;flex-direction:column;gap:22px">
<div style="font-size:18px;font-weight:600">So würde es im Training aussehen · animiert, halb gedreht</div>
<div style="display:flex;justify-content:space-between;padding:10px">%s</div>
<div style="font-size:13px;color:#6E6E73;line-height:1.5">Jedes Bild der Bewegung wird mit genau derselben Zeichnung erzeugt wie die Skizzen oben, aus Gelenkwinkeln in 3D. Dadurch sieht die Figur in Bewegung so aus wie im Stand. Der Bildausschnitt wird aus allen Bildern der Bewegung berechnet, damit nichts abgeschnitten wird. Air Squat nur als Beispiel; der Rest ist nachgebaut, nicht die echte Seite.</div></div>'''%phones+FOOT
open(os.path.join(OUT,'app.html'),'w').write(b2)
