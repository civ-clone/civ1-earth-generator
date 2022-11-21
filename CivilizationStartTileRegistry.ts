import Civilization from '@civ-clone/core-civilization/Civilization';
import CivilizationStartTile from './CivilizationStartTile';
import EntityRegistry from '@civ-clone/core-registry/EntityRegistry';
import Tile from '@civ-clone/core-world/Tile';
import World from '@civ-clone/core-world/World';

export class CivilizationStartTileRegistry extends EntityRegistry<CivilizationStartTile> {
  constructor() {
    super(CivilizationStartTile);
  }

  getByCivilization(
    CivilizationType: typeof Civilization
  ): CivilizationStartTile {
    const [startTile] = this.getBy('civilizationType', CivilizationType);

    if (!startTile) {
      throw new TypeError(
        `${CivilizationType.name} does not have a registered start tile.`
      );
    }

    return startTile;
  }

  getStartTileByCivilizationAndWorld(
    CivilizationType: typeof Civilization,
    world: World
  ): Tile {
    return this.getByCivilization(CivilizationType).startTileForMap(world);
  }
}

export const instance: CivilizationStartTileRegistry =
  new CivilizationStartTileRegistry();

export default CivilizationStartTileRegistry;
