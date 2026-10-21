"""
Start tiles for every civilization with an Earth start, Civilization's own 14 and civ1-world-civilizations' 12
(civ-clone/web-renderer#466), placed together on each map so that the 14 are spread out with or without the plugin.

Each civilization starts from its real capital, found on the original map through the warp. Its start is the
Grassland, Plains or River tile nearby that keeps every start at least MIN_GAP tiles apart (straight-line, wrapping east
to west). Among those it moves little, trading a tile or two of distance for good land around the city; placing is
greedy over TRIES seeded orders, keeping the cheapest, so it's a good placement rather than a proven best one. At 5 apart, two capitals share none of their 21 city
tiles.
"""
import math
import random

from realfield import LAT, STEP

MIN_GAP = 5
REACH = 6  # how far from its capital a start may move, in tiles of the map being placed
TRIES = 1500  # orders tried, seeded, keeping the cheapest

# (civilization, package, capital, (lat, lon))
CAPITALS = [
    ('American', 'civ1', 'Washington', (38.9, -77.0)),
    ('Aztec', 'civ1', 'Tenochtitlan', (19.4, -99.1)),
    ('Babylonian', 'civ1', 'Babylon', (32.5, 44.4)),
    ('Chinese', 'civ1', 'Beijing', (39.9, 116.4)),
    ('Egyptian', 'civ1', 'Cairo', (30.0, 31.2)),
    ('English', 'civ1', 'London', (51.5, -0.1)),
    ('French', 'civ1', 'Paris', (48.9, 2.4)),
    ('German', 'civ1', 'Berlin', (52.5, 13.4)),
    ('Greek', 'civ1', 'Athens', (38.0, 23.7)),
    ('Indian', 'civ1', 'Delhi', (28.6, 77.2)),
    ('Mongol', 'civ1', 'Karakorum', (47.2, 102.8)),
    ('Roman', 'civ1', 'Rome', (41.9, 12.5)),
    ('Russian', 'civ1', 'Moscow', (55.8, 37.6)),
    ('Zulu', 'civ1', 'Ulundi', (-28.3, 31.4)),
    ('Inca', 'world', 'Cusco', (-13.5, -72.0)),
    ('Brazilian', 'world', 'Rio de Janeiro', (-22.9, -43.2)),
    ('Malian', 'world', 'Niani', (11.4, -8.8)),
    ('Ethiopian', 'world', 'Addis Ababa', (9.0, 38.7)),
    ('Kongo', 'world', 'Mbanza Kongo', (-6.3, 14.2)),
    ('Khmer', 'world', 'Angkor', (13.4, 103.9)),
    # Borneo gives the capital more land than Java at every size; Kutai is on its east coast.
    ('Indonesian', 'world', 'Kutai', (-0.2, 116.35)),
    ('Japanese', 'world', 'Kyoto', (35.0, 135.8)),
    ('Australian', 'world', 'Canberra', (-35.3, 149.1)),
    ('Sioux', 'world', 'Black Hills', (44.0, -103.5)),
    ('Viking', 'world', 'Uppsala', (59.9, 17.6)),
    ('Chukchi', 'world', 'Anadyr', (64.7, 177.5)),
]

# A city's 21 tiles, and what each terrain is worth to a new city.
CROSS = [(dx, dy) for dx in range(-2, 3) for dy in range(-2, 3) if not (abs(dx) == 2 and abs(dy) == 2)]
VALUE = {'G': 2, 'P': 2, 'R': 3, 'F': 1, 'H': 1, 'J': 1, 'S': 0.5, 'D': 0.5, 'T': 0.5, 'M': 0.5, 'A': 0, 'O': 0.7}


def on_original(lat, lon):
    """Where (lat, lon) is on the original 80 x 50 map, as continuous tile coordinates."""
    best = None
    for j, row in enumerate(LAT):
        for i, (la_lon, la_lat) in enumerate(row):
            dlon = ((la_lon - lon) + 540) % 360 - 180
            d = (la_lat - lat) ** 2 + (dlon * math.cos(math.radians(lat))) ** 2
            if best is None or d < best[0]:
                best = (d, i * STEP, j * STEP)
    return best[1], best[2]


ANCHORS = {name: on_original(*position) for name, _, _, position in CAPITALS}


def quality(rows, x, y):
    H, W = len(rows), len(rows[0])
    return sum(VALUE[rows[y + dy][(x + dx) % W]] for dx, dy in CROSS if 0 <= y + dy < H)


def place(rows):
    """{civilization: (x, y)} for every civilization in CAPITALS, on the map `rows`."""
    H, W = len(rows), len(rows[0])
    s = W / 80

    options = {}
    for name, (u, v) in ANCHORS.items():
        i0, j0 = int(u * s), int(v * s)
        candidates = []
        for j in range(j0 - REACH, j0 + REACH + 1):
            for i in range(i0 - REACH, i0 + REACH + 1):
                if 0 <= j < H and rows[j][i % W] in 'GPR':
                    cost = (i - i0) ** 2 + (j - j0) ** 2 - 0.15 * quality(rows, i % W, j)
                    candidates.append((cost, (i % W, j)))
        options[name] = sorted(candidates)

    def apart(a, b):
        dx = abs(a[0] - b[0])
        return math.hypot(min(dx, W - dx), a[1] - b[1])

    names = [name for name, *_ in CAPITALS]
    rng = random.Random(1)
    best = None

    for attempt in range(TRIES):
        order = names if attempt == 0 else rng.sample(names, len(names))
        placed, cost = {}, 0

        for name in order:
            for c, position in options[name]:
                if all(apart(position, other) >= MIN_GAP for other in placed.values()):
                    placed[name] = position
                    cost += c
                    break
            else:
                cost = math.inf
                break

        if best is None or cost < best[0]:
            best = (cost, placed)

    if best[0] == math.inf:
        raise ValueError(f'Not every civilization fits {W} x {H} at {MIN_GAP} apart.')

    return {name: best[1][name] for name in names}
