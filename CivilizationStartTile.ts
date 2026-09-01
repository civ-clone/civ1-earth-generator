import Civilization from '@civ-clone/core-civilization/Civilization';
import World from '@civ-clone/core-world/World';
import Tile from '@civ-clone/core-world/Tile';
import Generator from '@civ-clone/core-world-generator/Generator';

export type Coordinates = {
  x: number;
  y: number;
};

// TODO: Maybe break this and the `Registry` out into another package when the time comes.
export class CivilizationStartTile {
  private _civilizationType: typeof Civilization;
  private _mapGenerator: typeof Generator;
  private _startTile: Coordinates;

  constructor(
    CivilizationType: typeof Civilization,
    MapGenerator: typeof Generator,
    startTile: Coordinates
  ) {
    this._civilizationType = CivilizationType;
    this._mapGenerator = MapGenerator;
    this._startTile = startTile;
  }

  civilizationType(): typeof Civilization {
    return this._civilizationType;
  }

  mapGenerator(): typeof Generator {
    return this._mapGenerator;
  }

  startTile(): Coordinates {
    return this._startTile;
  }

  startTileForMap(world: World): Tile {
    const { x, y } = this._startTile;

    return world.get(x, y);
  }
}

export default CivilizationStartTile;
