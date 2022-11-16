import Civilization from '@civ-clone/core-civilization/Civilization';
import Generator from '@civ-clone/core-world-generator/Generator';
import Terrain from '@civ-clone/core-terrain/Terrain';
import World from '@civ-clone/core-world/World';
export declare const startSquare: (
  world: World,
  civilization: Civilization
) => import('@civ-clone/core-world/Tile').Tile;
export declare class Earth extends Generator {
  generate(): Promise<Terrain[]>;
  height(): number;
  width(): number;
}
export default Earth;
