import Civilization from '@civ-clone/core-civilization/Civilization';
import World from '@civ-clone/core-world/World';
import Tile from '@civ-clone/core-world/Tile';
import Generator from '@civ-clone/core-world-generator/Generator';
export type Coordinates = {
  x: number;
  y: number;
};
export declare class CivilizationStartTile {
  #private;
  constructor(
    CivilizationType: typeof Civilization,
    MapGenerator: typeof Generator,
    startTile: Coordinates
  );
  civilizationType(): typeof Civilization;
  mapGenerator(): typeof Generator;
  startTile(): Coordinates;
  startTileForMap(world: World): Tile;
}
export default CivilizationStartTile;
