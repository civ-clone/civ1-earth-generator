import hashlib, math, pickle, os
from land import is_land
import tps
# precompute warp on a fine civ1-coordinate lattice (STEP tiles), then sample bilinearly
STEP = 0.125
NX, NY = int(80 / STEP) + 1, int(50 / STEP) + 1
def _lattice():
    f = tps.build()
    return [[f(x * STEP, y * STEP) for x in range(NX)] for y in range(NY)]
# cached, keyed on the control points, since the fit takes a few seconds
_KEY = hashlib.sha1(open('control.py', 'rb').read()).hexdigest()
_CACHE = f'lattice-{_KEY[:12]}.pkl'
if os.path.exists(_CACHE):
    LAT = pickle.load(open(_CACHE, 'rb'))
else:
    LAT = _lattice(); pickle.dump(LAT, open(_CACHE, 'wb'))
def geo(u, v):
    """civ1 continuous coords (tile units, 0..80, 0..50) -> (lat, lon)"""
    u %= 80
    v = min(max(v, 0), 50 - 1e-9)
    i, j = int(u / STEP), int(v / STEP)
    i = min(i, NX - 2); fx, fy = u / STEP - i, v / STEP - j
    a, b, c, d = LAT[j][i], LAT[j][i + 1], LAT[j + 1][i], LAT[j + 1][i + 1]
    lon = (a[0]*(1-fx)+b[0]*fx)*(1-fy)+(c[0]*(1-fx)+d[0]*fx)*fy
    lat = (a[1]*(1-fx)+b[1]*fx)*(1-fy)+(c[1]*(1-fx)+d[1]*fx)*fy
    return lat, lon
def real_fraction(u0, v0, u1, v1, k=6):
    n = 0
    for a in range(k):
        for b in range(k):
            lat, lon = geo(u0 + (a + 0.5) * (u1 - u0) / k, v0 + (b + 0.5) * (v1 - v0) / k)
            n += is_land(lat, lon)
    return n / (k * k)
