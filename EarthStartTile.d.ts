import CivilizationStartTile, { Coordinates } from './CivilizationStartTile';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Tile from '@civ-clone/core-world/Tile';
import World from '@civ-clone/core-world/World';
/** Start `Tile`s keyed by map size, as `sizeKey` gives it (`'80x50'`). */
export type StartTilesBySize = {
  [size: string]: Coordinates;
};
export declare class EarthStartTile extends CivilizationStartTile {
  private _startTiles;
  constructor(
    CivilizationType: typeof Civilization,
    startTiles: StartTilesBySize
  );
  startTiles(): StartTilesBySize;
  startTileForMap(world: World): Tile;
}
export default EarthStartTile;
