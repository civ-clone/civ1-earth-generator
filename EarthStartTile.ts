import CivilizationStartTile, { Coordinates } from './CivilizationStartTile';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Earth from './Earth';

export class EarthStartTile extends CivilizationStartTile {
  constructor(CivilizationType: typeof Civilization, startTile: Coordinates) {
    super(CivilizationType, Earth, startTile);
  }
}

export default EarthStartTile;
