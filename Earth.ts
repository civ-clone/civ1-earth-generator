import Arctic from '@civ-clone/base-terrain-arctic/Arctic';
import Desert from '@civ-clone/base-terrain-desert/Desert';
import EarthMap from './EarthMap';
import Forest from '@civ-clone/base-terrain-forest/Forest';
import Generator from '@civ-clone/core-world-generator/Generator';
import { getEarthMap } from './EarthMaps';
import Grassland from '@civ-clone/base-terrain-grassland/Grassland';
import Hills from '@civ-clone/base-terrain-hills/Hills';
import Jungle from '@civ-clone/base-terrain-jungle/Jungle';
import Mountains from '@civ-clone/base-terrain-mountains/Mountains';
import Ocean from '@civ-clone/base-terrain-ocean/Ocean';
import Plains from '@civ-clone/base-terrain-plains/Plains';
import River from '@civ-clone/base-terrain-river/River';
import Swamp from '@civ-clone/base-terrain-swamp/Swamp';
import Terrain from '@civ-clone/core-terrain/Terrain';
import Tundra from '@civ-clone/base-terrain-tundra/Tundra';

type StringTerrain =
  | 'A'
  | 'D'
  | 'F'
  | 'G'
  | 'H'
  | 'J'
  | 'M'
  | 'O'
  | 'P'
  | 'R'
  | 'S'
  | 'T';

type TerrainLookup = { [key in StringTerrain]: typeof Terrain };

const terrainLookup: TerrainLookup = {
  A: Arctic,
  D: Desert,
  F: Forest,
  G: Grassland,
  H: Hills,
  J: Jungle,
  M: Mountains,
  O: Ocean,
  P: Plains,
  R: River,
  S: Swamp,
  T: Tundra,
};

/**
 * The Earth, in each size `earthMaps` has. A size without a map of its own gets the original 80 x 50 map, so
 * `width()` and `height()` report the size actually generated.
 */
export class Earth extends Generator {
  private _map: EarthMap;

  constructor(
    height: number = 50,
    width: number = 80,
    options: { [key: string]: any } = {}
  ) {
    const map = getEarthMap(width, height);

    super(map.height, map.width, options);

    this._map = map;
  }

  async generate(): Promise<Terrain[]> {
    return (
      Array.from(this._map.terrain.replace(/\n/g, '')) as StringTerrain[]
    ).map((terrainId) => new terrainLookup[terrainId]());
  }
}

export default Earth;
