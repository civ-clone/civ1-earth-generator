import CivilizationStartTile, { Coordinates } from './CivilizationStartTile';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Earth from './Earth';
import Tile from '@civ-clone/core-world/Tile';
import World from '@civ-clone/core-world/World';
import { sizeKey } from './EarthMap';

/** Start `Tile`s keyed by map size, as `sizeKey` gives it (`'80x50'`). */
export type StartTilesBySize = { [size: string]: Coordinates };

export class EarthStartTile extends CivilizationStartTile {
  private _startTiles: StartTilesBySize;

  constructor(
    CivilizationType: typeof Civilization,
    startTiles: StartTilesBySize
  ) {
    super(CivilizationType, Earth, startTiles[sizeKey(80, 50)]);

    this._startTiles = startTiles;
  }

  startTiles(): StartTilesBySize {
    return this._startTiles;
  }

  startTileForMap(world: World): Tile {
    const { x, y } =
      this._startTiles[sizeKey(world.width(), world.height())] ??
      this.startTile();

    return world.get(x, y);
  }
}

export default EarthStartTile;
