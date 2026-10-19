import math
from control import CONTROL

def _u(r2):
    return 0.0 if r2 <= 0 else r2 * math.log(r2) * 0.5  # r^2 log r

def _solve(A, b):
    n = len(A)
    M = [row[:] + [b[i]] for i, row in enumerate(A)]
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(M[r][c]))
        M[c], M[p] = M[p], M[c]
        piv = M[c][c]
        for r in range(c + 1, n):
            f = M[r][c] / piv
            if f:
                Mr, Mc = M[r], M[c]
                for k in range(c, n + 1):
                    Mr[k] -= f * Mc[k]
    x = [0.0] * n
    for r in range(n - 1, -1, -1):
        x[r] = (M[r][n] - sum(M[r][k] * x[k] for k in range(r + 1, n))) / M[r][r]
    return x

class TPS:
    def __init__(self, src, dst, lam=0.5):
        self.src = src
        n = len(src)
        A = [[0.0] * (n + 3) for _ in range(n + 3)]
        for i, (xi, yi) in enumerate(src):
            for j, (xj, yj) in enumerate(src):
                A[i][j] = _u((xi - xj) ** 2 + (yi - yj) ** 2) + (lam if i == j else 0)
            A[i][n:n + 3] = [1, xi, yi]
            A[n][i], A[n + 1][i], A[n + 2][i] = 1, xi, yi
        self.coef = [_solve(A, [d[k] for d in dst] + [0, 0, 0]) for k in range(len(dst[0]))]

    def __call__(self, x, y):
        n = len(self.src)
        w = [_u((x - sx) ** 2 + (y - sy) ** 2) for sx, sy in self.src]
        return tuple(sum(c[i] * w[i] for i in range(n)) + c[n] + c[n + 1] * x + c[n + 2] * y for c in self.coef)

def build(lam=0.5):
    src, dst = [], []
    for (x, y), (lat, lon) in CONTROL:
        for dx, dlon in ((0, 0), (80, 360), (-80, -360)):
            X = x + 0.5 + dx
            if -25 <= X <= 105:
                src.append((X, y + 0.5)); dst.append((lon + dlon, lat))
    return TPS(src, dst, lam)
