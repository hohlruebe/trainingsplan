# Zeichen-Grundlagen für das Maskottchen (Ovale, Skizzenstrich, Kopf, Linien). Wird von maskottchen.py geladen.
import math, json
INK='#34327E'; FAR='#9C9AD0'; ORA='#E8963A'
def d(a,b): return math.hypot(b[0]-a[0],b[1]-a[1])
def ang(a,b): return math.degrees(math.atan2(b[1]-a[1],b[0]-a[0]))
def sk(shape,col,sw=1.8):
    # Skizzenstrich: Hauptlinie plus leicht versetzte zweite Linie
    return ('<g fill="none" stroke="%s" stroke-linecap="round" stroke-linejoin="round">'
            '<g stroke-width="%s">%s</g><g stroke-width="%s" opacity=".35" transform="translate(.9 -.7) rotate(.6)">%s</g></g>') % (col,sw,shape,sw*.6,shape)
def seg(a,b,w,col,ext=.08):
    L=d(a,b); cx,cy=(a[0]+b[0])/2,(a[1]+b[1])/2
    return sk('<ellipse cx="0" cy="0" rx="%.1f" ry="%.1f" transform="translate(%.1f %.1f) rotate(%.1f)"/>'%(L/2*(1+ext),w,cx,cy,ang(a,b)),col)
def joint(p,r,col):
    return '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="#fff" stroke="%s" stroke-width="1.6"/>'%(p[0],p[1],r,col)
def mer(rx,ry,f,y0=-1,y1=1):
    # Mittellinie auf einem Oval, f = Drehung (-1 links … 1 rechts)
    if abs(f)<.04: return 'M0 %.1f L0 %.1f'%(y0*ry,y1*ry)
    sw=1 if f>0 else 0
    return 'M0 %.1f A%.1f %.1f 0 0 %d 0 %.1f'%(-ry,abs(f)*rx,ry,sw,ry)
def equ(rx,ry,y,b):
    w=rx*math.sqrt(max(0,1-(y)**2))
    return 'M%.1f %.1f Q0 %.1f %.1f %.1f'%(-w,y*ry,y*ry+b*ry*2,w,y*ry)
def oval_body(c,a,rx,ry,f,eqs,col,extra=''):
    s='<ellipse cx="0" cy="0" rx="%s" ry="%s" fill="#fff"/>'%(rx,ry)
    s+='<path d="%s"/>'%mer(rx,ry,f)
    for y,b in eqs: s+='<path d="%s" opacity=".7"/>'%equ(rx,ry,y,b)
    return '<g transform="translate(%.1f %.1f) rotate(%.1f)">%s%s</g>'%(c[0],c[1],a,sk(s,col),extra)
def egg(rx,ry,top=1.25,bot=.8):
    return '<path d="M0 %.1f C%.1f %.1f %.1f %.1f 0 %.1f C%.1f %.1f %.1f %.1f 0 %.1f Z" fill="#fff"/>'%(-ry,rx*top*1.1,-ry,rx*bot*1.25,ry*.95,ry,-rx*bot*1.25,ry*.95,-rx*top*1.1,-ry,-ry)
def rib_body(c,a,rx,ry,f,col):
    s=egg(rx,ry)+'<path d="%s"/>'%mer(rx*.95,ry,f)
    for y,b in ((-.3,.07),(.42,.12)): s+='<path d="%s" opacity=".7"/>'%equ(rx*1.02,ry,y,b)
    return '<g transform="translate(%.1f %.1f) rotate(%.1f)">%s</g>'%(c[0],c[1],a,sk(s,col))
def loc(c,a,p):
    r=math.radians(a); return (c[0]+p[0]*math.cos(r)-p[1]*math.sin(r), c[1]+p[0]*math.sin(r)+p[1]*math.cos(r))
def head(c,a,f):
    rx,ry=16,20
    s='<path d="M0 %d C%d %d %d %d 0 %d C%d %d %d %d 0 %d Z" fill="#fff"/>'%(-ry,rx*1.35,-ry,rx*1.1,ry*.9,ry,-rx*1.1,ry*.9,-rx*1.35,-ry,-ry)
    s+='<path d="%s"/>'%mer(rx,ry,f)
    s+='<path d="%s"/>'%equ(rx,ry,.05,.06)
    sx=1 if f>=0 else -1; nx=f*rx*.95
    s+='<path d="M%.1f 1 l%.1f 6 l%.1f 2"/>'%(nx,sx*5,-sx*5)          # Nase
    s+='<path d="M%.1f -1 q%.1f -3 %.1f 0"/>'%(nx-sx*9,sx*3,sx*6)     # Auge
    return '<g transform="translate(%.1f %.1f) rotate(%.1f)">%s</g>'%(c[0],c[1],a,sk(s,INK))
def hand(w,t,col): return seg(w,t,4.6,col,.15)
def foot(a,t,col): return seg(a,t,5.2,col,.2)
def smooth(P):
    s='M%.1f %.1f'%P[0]
    for i in range(1,len(P)):
        p0=P[max(i-2,0)];p1=P[i-1];p2=P[i];p3=P[min(i+1,len(P)-1)]
        s+=' C%.1f %.1f %.1f %.1f %.1f %.1f'%(p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6,p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6,p2[0],p2[1])
    return s
def figure(P,floor):
    g='<line x1="10" x2="310" y1="%d" y2="%d" stroke="#DADAD3" stroke-width="2" stroke-linecap="round"/>'%(floor,floor)
    RX,RY=27,42
    nb,ra,rf=P['nb'],P['rib'][0],P['rib'][1]
    r=math.radians(ra); rc=(nb[0]-RY*math.sin(r), nb[1]+RY*math.cos(r))
    pc,pa,pf=P['pel']
    sgn=-1 if rf>=0 else 1   # vordere Seite
    P['shn']=loc(rc,ra,(sgn*RX*.92,-RY*.62)); P['shf']=loc(rc,ra,(-sgn*RX*.7,-RY*.68))
    P['hin']=loc(pc,pa,(sgn*20,4)); P['hif']=loc(pc,pa,(-sgn*17,2))
    P['wl']=(loc(rc,ra,(-RX*.85,RY*.55)),loc(rc,ra,(-RX*.8,RY*1.15)),loc(pc,pa,(-24,-8)))
    P['wr2']=(loc(rc,ra,(RX*.85,RY*.55)),loc(rc,ra,(RX*.8,RY*1.15)),loc(pc,pa,(24,-8)))
    hc,ha,hf=P['head']; hb=loc(hc,ha,(0,17))
    P['nk']=((hb[0]-6,hb[1]),(nb[0]-7,nb[1]+4),(hb[0]+6,hb[1]-1),(nb[0]+7,nb[1]+4))
    rb=(rc,ra,rf); pb=P['pel']
    # hintere Seite
    for side,col in (('f',FAR),):
        g+=seg(P['sh'+side],P['el'+side],8,col)+seg(P['el'+side],P['wr'+side],6.5,col)+hand(P['wr'+side],P['ha'+side],col)
        g+=seg(P['hi'+side],P['kn'+side],11,col)+seg(P['kn'+side],P['an'+side],8.5,col)+foot(P['an'+side],P['to'+side],col)
        for j,r in (('el',4.5),('wr',3.5),('kn',5.5),('an',4.2)): g+=joint(P[j+side],r,col)
    # Taille: zwei Flanken
    g+=sk('<path d="M%.1f %.1f Q%.1f %.1f %.1f %.1f"/><path d="M%.1f %.1f Q%.1f %.1f %.1f %.1f"/>'%(
        *P['wl'][0],*P['wl'][1],*P['wl'][2],*P['wr2'][0],*P['wr2'][1],*P['wr2'][2]),INK)
    g+=oval_body(pb[0],pb[1],27,19,pb[2],[(-.1,.12)],INK)
    g+=joint(P['hif'],5.5,FAR)
    g+=sk('<path d="M%.1f %.1f L%.1f %.1f"/><path d="M%.1f %.1f L%.1f %.1f"/>'%(*P['nk'][0],*P['nk'][1],*P['nk'][2],*P['nk'][3]),INK)
    g+=rib_body(rb[0],rb[1],RX,RY,rb[2],INK)
    g+=joint(P['shf'],5,FAR)
    g+=head(P['head'][0],P['head'][1],P['head'][2])
    # Linie der Bewegung
    g+='<path d="%s" fill="none" stroke="%s" stroke-width="3" stroke-linecap="round" opacity=".85"/>'%(smooth(P['loa']),ORA)
    # vordere Seite
    s='n'
    g+=seg(P['hin'],P['knn'],11,INK)+seg(P['knn'],P['ann'],8.5,INK)+foot(P['ann'],P['ton'],INK)
    g+=seg(P['shn'],P['eln'],8,INK)+seg(P['eln'],P['wrn'],6.5,INK)+hand(P['wrn'],P['han'],INK)
    for j,r in (('hi',6),('kn',5.5),('an',4.2),('sh',5.5),('el',4.5),('wr',3.5)): g+=joint(P[j+s],r,INK)
    return '<svg viewBox="0 0 320 430" width="330" height="444">%s</svg>'%g
