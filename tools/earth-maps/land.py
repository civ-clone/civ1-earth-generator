import json, math, os, array
RES = 10  # cells per degree
W, H = 360 * RES, 180 * RES

def rasterise():
    d = json.load(open('ne_50m_land.geojson'))
    rows = [[] for _ in range(H)]
    for f in d['features']:
        g = f['geometry']
        polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
        for poly in polys:
            for ring in poly:
                for (x0, y0), (x1, y1) in zip(ring, ring[1:]):
                    if y0 == y1: continue
                    if y0 > y1: x0, y0, x1, y1 = x1, y1, x0, y0
                    ja = math.ceil((90 - y1) * RES - 0.5); jb = math.floor((90 - y0) * RES - 0.5)
                    for j in range(max(ja, 0), min(jb, H - 1) + 1):
                        lat = 90 - (j + 0.5) / RES
                        if y0 <= lat < y1:
                            rows[j].append(x0 + (lat - y0) * (x1 - x0) / (y1 - y0))
    grid = bytearray(W * H)
    for j, xs in enumerate(rows):
        xs.sort()
        for a, b in zip(xs[0::2], xs[1::2]):
            ia = max(0, math.ceil((a + 180) * RES - 0.5)); ib = min(W - 1, math.floor((b + 180) * RES - 0.5))
            if ib >= ia: grid[j * W + ia:j * W + ib + 1] = b'\x01' * (ib - ia + 1)
    open('land.bin', 'wb').write(grid)

if not os.path.exists('land.bin'):
    rasterise()
GRID = open('land.bin', 'rb').read()

def is_land(lat, lon):
    j = int((90 - lat) * RES)
    if not 0 <= j < H: return lat < -60
    i = int(((lon + 180) % 360) * RES) % W
    return GRID[j * W + i] == 1
