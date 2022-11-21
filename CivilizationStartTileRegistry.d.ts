import Civilization from '@civ-clone/core-civilization/Civilization';
import CivilizationStartTile from './CivilizationStartTile';
import EntityRegistry from '@civ-clone/core-registry/EntityRegistry';
import Tile from '@civ-clone/core-world/Tile';
import World from '@civ-clone/core-world/World';
export declare class CivilizationStartTileRegistry extends EntityRegistry<CivilizationStartTile> {
  constructor();
  getByCivilization(
    CivilizationType: typeof Civilization
  ): CivilizationStartTile;
  getStartTileByCivilizationAndWorld(
    CivilizationType: typeof Civilization,
    world: World
  ): Tile;
}
export declare const instance: CivilizationStartTileRegistry;
export default CivilizationStartTileRegistry;
