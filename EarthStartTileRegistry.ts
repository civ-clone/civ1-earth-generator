import CivilizationStartTile from './CivilizationStartTile';
import CivilizationStartTileRegistry from './CivilizationStartTileRegistry';
import Earth from './Earth';

export class EarthStartTileRegistry extends CivilizationStartTileRegistry {
  entries(): CivilizationStartTile[] {
    return super
      .entries()
      .filter((startTile) => startTile.mapGenerator() === Earth);
  }
}

export const instance: EarthStartTileRegistry = new EarthStartTileRegistry();

export default EarthStartTileRegistry;
