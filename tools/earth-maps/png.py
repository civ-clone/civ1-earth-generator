import zlib,struct
def write_png(path,w,h,rows):
    raw=b''.join(b'\x00'+bytes(c for p in r for c in p) for r in rows)
    def ch(t,d): return struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
    open(path,'wb').write(b'\x89PNG\r\n\x1a\n'+ch(b'IHDR',struct.pack('>IIBBBBB',w,h,8,2,0,0,0))+ch(b'IDAT',zlib.compress(raw,6))+ch(b'IEND',b''))
PAL={'O':(40,70,160),'G':(60,170,50),'P':(170,190,70),'F':(20,100,30),'D':(225,205,140),'A':(245,245,250),'R':(70,140,230),'H':(150,120,70),'T':(150,160,150),'M':(100,80,70),'J':(40,130,70),'S':(60,130,120)}
def render(grid,path,s=4,gridlines=0,marks=()):
    H=len(grid);W=len(grid[0])
    rows=[[PAL[grid[y//s][x//s]] for x in range(W*s)] for y in range(H*s)]
    if gridlines:
        for y in range(H*s):
            for x in range(W*s):
                if (x//s)%gridlines==0 and x%s==0 or (y//s)%gridlines==0 and y%s==0: rows[y][x]=(255,60,60)
    for (i,j) in marks:
        for dy in range(s):
            for dx in range(s):
                if dx in(0,s-1) or dy in(0,s-1): rows[j*s+dy][i*s+dx]=(255,0,255)
    write_png(path,W*s,H*s,rows)
