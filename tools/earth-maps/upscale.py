import math, random
from collections import Counter, deque
from realfield import geo
from land import is_land

from civ1map import TERRAIN as CIV1, STARTS as CIV1_STARTS
CW, CH = 80, 50
REAL_WEIGHT = 0.35

# Islands Civ1 left out: (name, lat range, lon range, terrain weights, nudge in Civ1 tiles)
OMISSIONS = [
    ('Sri Lanka', (5.9, 9.9), (79.6, 82.0), {'G': 5, 'F': 3, 'H': 2}, (0, 0)),
    ('New Zealand North', (-41.7, -34.3), (172.5, 178.6), {'G': 5, 'F': 3, 'H': 2}, (0, 0)),
    ('New Zealand South', (-46.7, -40.4), (166.3, 174.4), {'G': 3, 'F': 2, 'M': 3, 'H': 2}, (0, 0)),
    ('Ireland', (51.4, 55.4), (-10.6, -5.9), {'G': 7, 'H': 2, 'S': 1}, (0, 0)),
    ('Sicily', (36.6, 38.3), (12.3, 15.7), {'P': 4, 'H': 4, 'G': 2}, (0, 0)),
    ('Sardinia', (38.8, 41.3), (8.1, 9.9), {'H': 5, 'P': 5}, (0, 0)),
    ('Crete', (34.9, 35.7), (23.5, 26.4), {'H': 6, 'P': 4}, (0, 0)),
    ('Cyprus', (34.5, 35.7), (32.2, 34.6), {'P': 6, 'H': 4}, (0, 0)),
    ('Hainan', (18.1, 20.2), (108.5, 111.1), {'J': 5, 'H': 5}, (0, 0)),
    ('Hokkaido', (41.3, 45.6), (139.7, 145.9), {'F': 6, 'H': 4}, (0, 0)),
    ('Jamaica', (17.7, 18.6), (-78.4, -76.2), {'J': 6, 'H': 4}, (0, 0)),
    ('Puerto Rico', (17.9, 18.6), (-67.3, -65.6), {'J': 6, 'H': 4}, (0, 0)),
    ('Falklands', (-52.5, -51.0), (-61.5, -57.6), {'T': 5, 'P': 5}, (0, 0)),
    ('Hawaii', (18.9, 22.3), (-160.3, -154.8), {'G': 4, 'J': 3, 'M': 3}, (0, 0)),
    ('Iceland', (63.3, 66.6), (-24.6, -13.5), {'T': 6, 'A': 2, 'H': 2}, (0, 0)),
]


def civ(x, y):
    return CIV1[y][x % CW] if 0 <= y < CH else 'O'


def civ_land(x, y):
    return civ(x, y) != 'O'


def civ_field(u, v):
    """bilinear land indicator between Civ1 tile centres"""
    u, v = u - 0.5, v - 0.5
    x0, y0 = math.floor(u), math.floor(v)
    fx, fy = u - x0, v - y0
    def L(x, y):
        return 1.0 if civ_land(x, y) else 0.0
    return (L(x0, y0) * (1 - fx) + L(x0 + 1, y0) * fx) * (1 - fy) + \
           (L(x0, y0 + 1) * (1 - fx) + L(x0 + 1, y0 + 1) * fx) * fy


def civ_components():
    comp = {}
    n = 0
    for y in range(CH):
        for x in range(CW):
            if civ_land(x, y) and (x, y) not in comp:
                n += 1
                q = deque([(x, y)]); comp[(x, y)] = n
                while q:
                    a, b = q.popleft()
                    for dx in (-1, 0, 1):
                        for dy in (-1, 0, 1):
                            p = ((a + dx) % CW, b + dy)
                            if 0 <= p[1] < CH and civ_land(*p) and p not in comp:
                                comp[p] = n; q.append(p)
    return comp


COMP = civ_components()

# Civ1 water cells the real map calls land (lakes, inlets, misregistered straits): keep them as water
def _preserved_water():
    out = set()
    for y in range(CH):
        for x in range(CW):
            if not civ_land(x, y):
                k = 4
                n = sum(is_land(*geo(x + (a + .5) / k, y + (b + .5) / k)) for a in range(k) for b in range(k))
                if n / (k * k) >= 0.4:
                    out.add((x, y))
    return out


PRESERVED = _preserved_water()


def real_sample(u, v):
    cell = (math.floor(u) % CW, math.floor(v))
    if cell in PRESERVED:
        return 0
    # only let the real coastline act near Civ1 coasts
    x, y = cell
    near_coast = any(civ_land(x + dx, y + dy) != civ_land(x, y) for dx in (-1, 0, 1) for dy in (-1, 0, 1))
    if not near_coast:
        return 1 if civ_land(x, y) else 0
    return 1 if is_land(*geo(u, v)) else 0


class Noise:
    def __init__(self, seed, scale):
        self.r = random.Random(seed); self.scale = scale; self.cache = {}

    def _lat(self, i, j):
        if (i, j) not in self.cache:
            self.cache[(i, j)] = self.r.random() - 0.5
        return self.cache[(i, j)]

    def __call__(self, x, y):
        x /= self.scale; y /= self.scale
        i, j = math.floor(x), math.floor(y); fx, fy = x - i, y - j
        sx, sy = fx * fx * (3 - 2 * fx), fy * fy * (3 - 2 * fy)
        a, b, c, d = self._lat(i, j), self._lat(i + 1, j), self._lat(i, j + 1), self._lat(i + 1, j + 1)
        return (a * (1 - sx) + b * sx) * (1 - sy) + (c * (1 - sx) + d * sx) * sy


def base_terrain():
    """Civ1 terrain with rivers replaced by their surroundings (rivers are redrawn as lines)"""
    g = [list(r) for r in CIV1]
    for y in range(CH):
        for x in range(CW):
            if g[y][x] == 'R':
                c = Counter(CIV1[y + dy][(x + dx) % CW] for dx in (-1, 0, 1) for dy in (-1, 0, 1)
                            if 0 <= y + dy < CH and CIV1[y + dy][(x + dx) % CW] not in 'RO')
                g[y][x] = c.most_common(1)[0][0] if c else 'G'
    return g


BASE = base_terrain()


def nearest_land_cell(u, v, r=3):
    best = None
    cx, cy = math.floor(u), math.floor(v)
    for y in range(cy - r, cy + r + 1):
        for x in range(cx - r, cx + r + 1):
            if civ_land(x, y):
                d = (x + 0.5 - u) ** 2 + (y + 0.5 - v) ** 2
                if best is None or d < best[0]:
                    best = (d, (x % CW, y))
    return best[1] if best else None


def upscale(W, H, seed=1):
    s = W / CW
    K = 4
    nx, ny, nt = Noise(seed, 2.5), Noise(seed + 1, 2.5), Noise(seed + 2, 1.5)
    score = [[0.0] * W for _ in range(H)]
    for j in range(H):
        for i in range(W):
            cf = rf = 0.0
            for a in range(K):
                for b in range(K):
                    u, v = (i + (a + 0.5) / K) / s, (j + (b + 0.5) / K) / s
                    cf += civ_field(u, v)
                    rf += real_sample(u, v)
            cf /= K * K; rf /= K * K
            score[j][i] = cf + REAL_WEIGHT * (rf - 0.5) * (1 if 0.02 < cf < 0.98 else 0)
    land = [[score[j][i] >= 0.5 for i in range(W)] for j in range(H)]

    # which Civ1 landmass each target land tile belongs to
    owner = {}
    for j in range(H):
        for i in range(W):
            if land[j][i]:
                c = nearest_land_cell((i + .5) / s, (j + .5) / s)
                owner[(i, j)] = COMP[c] if c else 0
                if c is None:
                    land[j][i] = False

    # every Civ1 landmass keeps at least one tile
    present = set(owner.values())
    for cid in set(COMP.values()) - present:
        cells = [c for c, k in COMP.items() if k == cid]
        best = max(((score[min(H - 1, int((y + .5) * s))][int((x + .5) * s) % W], (int((x + .5) * s) % W, min(H - 1, int((y + .5) * s))))
                    for x, y in cells))
        i, j = best[1]; land[j][i] = True; owner[(i, j)] = cid

    # keep Civ1 landmasses apart (e.g. Britain and France)
    def separate():
        changed = True
        while changed:
            changed = False
            for (i, j), cid in list(owner.items()):
                if not land[j][i]:
                    continue
                for dx in (-1, 0, 1):
                    for dy in (-1, 0, 1):
                        p = ((i + dx) % W, j + dy)
                        if p in owner and land[p[1]][p[0]] and owner[p] != cid:
                            # drop the weaker tile, unless it is its landmass's last
                            a, b = (i, j), p
                            weak = a if score[j][i] < score[p[1]][p[0]] else b
                            if sum(1 for q, k in owner.items() if k == owner[weak] and land[q[1]][q[0]]) > 1:
                                land[weak[1]][weak[0]] = False; changed = True
    separate()

    # terrain
    grid = [['O'] * W for _ in range(H)]
    for (i, j), cid in owner.items():
        if not land[j][i]:
            continue
        u = (i + 0.5) / s + 0.9 * nx(i, j)
        v = (j + 0.5) / s + 0.9 * ny(i, j)
        c = (math.floor(u) % CW, math.floor(v))
        if not (0 <= c[1] < CH) or not civ_land(*c) or COMP.get(c) != cid:
            c = nearest_land_cell((i + .5) / s, (j + .5) / s)
        grid[j][i] = BASE[c[1]][c[0]]

    # islands Civ1 left out
    added = {}
    nid = max(COMP.values())
    for name, (la0, la1), (lo0, lo1), weights, (ox, oy) in OMISSIONS:
        nid += 1
        tiles = []
        for j in range(H):
            for i in range(W):
                n = 0
                for a in range(K):
                    for b in range(K):
                        lat, lon = geo((i + (a + .5) / K) / s - ox, (j + (b + .5) / K) / s - oy)
                        lon = (lon + 180) % 360 - 180
                        if la0 <= lat <= la1 and lo0 <= lon <= lo1 and is_land(lat, lon):
                            n += 1
                if n:
                    tiles.append((n / (K * K), i, j))
        if not tiles:
            # too small to hit with the samples: use the tile whose centre is nearest the island
            clat, clon = (la0 + la1) / 2, (lo0 + lo1) / 2
            best = None
            for j in range(H):
                for i in range(W):
                    lat, lon = geo((i + .5) / s - ox, (j + .5) / s - oy)
                    d = (lat - clat) ** 2 + (((lon - clon + 540) % 360 - 180) * math.cos(math.radians(clat))) ** 2
                    if best is None or d < best[0]:
                        best = (d, i, j)
            tiles = [(1.0, best[1], best[2])]
        chosen = [(i, j) for f, i, j in tiles if f >= 0.3] or [max(tiles)[1:]]

        def free(i, j):
            if not 0 <= j < H or grid[j][i % W] != 'O' or land[j][i % W]:
                return False
            return not any(land[j + dy][(i + dx) % W] for dx in (-1, 0, 1) for dy in (-1, 0, 1)
                           if 0 <= j + dy < H and (dx or dy) and ((i + dx) % W, j + dy) not in shape_set)

        replace_existing = name == 'Iceland'
        keep = None
        if replace_existing:
            keep = chosen
        else:
            core = [max(tiles)[1:]]
            for shape in (chosen, core):
                for r_ in range(0, 4):
                    offs = sorted(((dx, dy) for dx in range(-r_, r_ + 1) for dy in range(-r_, r_ + 1)
                                   if max(abs(dx), abs(dy)) == r_), key=lambda d: d[0] ** 2 + d[1] ** 2)
                    for dx, dy in offs:
                        moved = [((i + dx) % W, j + dy) for i, j in shape]
                        shape_set = set(moved)
                        if all(free(i, j) for i, j in moved):
                            keep = moved; break
                    if keep: break
                if keep: break
        if not keep:
            print('no free tiles for', name, chosen); continue
        r = random.Random(name)
        keys = list(weights)
        for i, j in keep:
            land[j][i] = True; owner[(i, j)] = nid
            t = 0.5 + nt(i, j) + 0.0
            acc = 0; tot = sum(weights.values())
            pick = keys[-1]
            for k in keys:
                acc += weights[k] / tot
                if t < acc:
                    pick = k; break
            grid[j][i] = pick if len(keep) > 2 else max(weights, key=weights.get)
        added[name] = keep
    return grid, score, owner, added


def draw_rivers(grid, W, H):
    s = W / CW
    def tgt(x, y):
        return (min(W - 1, int((x + 0.5) * s)), min(H - 1, int((y + 0.5) * s)))
    def line(a, b):
        (x0, y0), (x1, y1) = a, b
        pts = [a]
        x, y = x0, y0
        while (x, y) != (x1, y1):
            if abs(x1 - x) >= abs(y1 - y) and x != x1:
                x += 1 if x1 > x else -1
            else:
                y += 1 if y1 > y else -1
            pts.append((x, y))
        return pts
    rivers = [(x, y) for y in range(CH) for x in range(CW) if CIV1[y][x] == 'R']
    rs = set(rivers)
    for x, y in rivers:
        a = tgt(x, y)
        is_end = sum(((x + dx) % CW, y + dy) in rs for dx, dy in ((1, 0), (0, 1), (-1, 0), (0, -1))) <= 1
        for dx, dy in ((1, 0), (0, 1), (-1, 0), (0, -1)):
            p = ((x + dx) % CW, y + dy)
            if p in rs:
                for i, j in line(a, tgt(*p)):
                    if grid[j][i] != 'O':
                        grid[j][i] = 'R'
            elif is_end and 0 <= p[1] < CH and CIV1[p[1]][p[0]] == 'O':
                # carry the river to the sea
                b = tgt(*p)
                for i, j in line(a, b):
                    if grid[j][i] == 'O':
                        break
                    grid[j][i] = 'R'
        if grid[a[1]][a[0]] != 'O':
            grid[a[1]][a[0]] = 'R'



def place_starts(grid, W, H, min_gap=3):
    s = W / CW
    starts = {}
    for civ_name, (x, y) in CIV1_STARTS.items():
        i0, j0 = int((x + 0.5) * s), int((y + 0.5) * s)
        best = None
        for r in range(0, 6):
            for j in range(j0 - r, j0 + r + 1):
                for i in range(i0 - r, i0 + r + 1):
                    if not 0 <= j < H or grid[j][i % W] not in 'GPR':
                        continue
                    if any(min(abs(i % W - a), W - abs(i % W - a)) < min_gap and abs(j - b) < min_gap for a, b in starts.values()):
                        continue
                    d = (i - i0) ** 2 + (j - j0) ** 2 - (0.5 if grid[j][i % W] == 'R' else 0)
                    if best is None or d < best[0]:
                        best = (d, i % W, j)
            if best:
                break
        starts[civ_name] = best[1:]
    return starts
