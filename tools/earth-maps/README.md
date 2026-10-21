# Earth maps

`generate.py` scales Civilization's own 80 x 50 Earth (`Maps/Earth80x50.ts`) up to the larger sizes New Game offers,
writes `Maps/Earth104x65.ts` and `Maps/Earth128x80.ts`, and places every civilization's start tile on all three maps.
It needs Python 3 and nothing else.

```sh
cd tools/earth-maps
curl -L -o ne_50m_land.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson
python3 generate.py
cd ../.. && npm run build
```

It also writes `preview.png`: the original map and each new one, with the start tiles marked (Civilization's own in
red, civ1-world-civilizations' in orange).

## How it works

The original map sets the shape and the terrain. Real coastlines only refine the coast.

- `control.py` pairs about 150 tiles of the original map with where they are on the real Earth (capes, straits,
  capitals), and `tps.py` fits a smooth warp (a thin-plate spline) through them. Civilization's map is not a regular
  projection: the Pacific is a few tiles wide and Africa reaches further south than South America.
- `land.py` turns [Natural Earth](https://www.naturalearthdata.com/)'s 1:50m land polygons (public domain) into a
  0.1° grid, and `realfield.py` looks up any point of the original map on it through the warp.
- `upscale.py` builds each larger map:
  - **Land:** a smooth version of the original's land, with the real coastline moving the coast by up to a part of a
    tile. Water the original has and the real map doesn't (its lakes, Hudson Bay, Baltic) stays water.
  - **Landmasses stay apart:** each tile belongs to one of the original's landmasses, and land that would join two of
    them (Britain and France) goes back to sea.
  - **Terrain:** from the nearest tile of the original, wobbled with a little smooth noise so the edges between
    regions aren't stretched blocks. Rivers are drawn again as connected lines.
  - **Islands the original leaves out** (`OMISSIONS`: Sri Lanka, New Zealand, Ireland, Sicily...) are shaped from the
    real coastline and moved into open sea if they would touch other land.
- `generate.py` applies hand edits (`OVERRIDES`) on top and writes the maps.
- `starts.py` places the start tiles of all 26 civilizations with an Earth start together on each map: Civilization's
  own 14, and the 12 of civ1-world-civilizations (civ-clone/web-renderer#466). Each starts from its real capital
  (`CAPITALS`), found on the original map through the warp, and moves to a Grassland, Plains or River tile nearby
  that keeps every start at least 5 tiles from every other, so no two capitals share a city tile. It moves little,
  trading a tile or two for good land around the city. The 14 are written
  to `Maps/*.ts`; the 12 to `world-civilizations.json`, which civ1-world-civilizations' start tiles are copied from.
  Placing them together means the 14 are spread out with or without the plugin.
