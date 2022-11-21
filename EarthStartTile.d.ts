import CivilizationStartTile, { Coordinates } from './CivilizationStartTile';
import Civilization from '@civ-clone/core-civilization/Civilization';
export declare class EarthStartTile extends CivilizationStartTile {
  constructor(CivilizationType: typeof Civilization, startTile: Coordinates);
}
export default EarthStartTile;
