import Civilization from '@civ-clone/core-civilization/Civilization';
import { Coordinates } from './CivilizationStartTile';
/**
 * One size of the Earth map. `terrain` is one letter per `Tile`, a line per row: `A`rctic, `D`esert, `F`orest,
 * `G`rassland, `H`ills, `J`ungle, `M`ountains, `O`cean, `P`lains, `R`iver, `S`wamp and `T`undra.
 */
export interface EarthMap {
  width: number;
  height: number;
  startTiles: [typeof Civilization, Coordinates][];
  terrain: string;
}
export declare const sizeKey: (width: number, height: number) => string;
export default EarthMap;
