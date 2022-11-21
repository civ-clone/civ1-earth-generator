import Civilization from '@civ-clone/core-civilization/Civilization';
import World from '@civ-clone/core-world/World';
import Tile from '@civ-clone/core-world/Tile';
import Generator from '@civ-clone/core-world-generator/Generator';

export type Coordinates = {
  x: number;
  y: number;
};

// TODO: Maybe break this and the `Registry` out into another package when the time comes.
export class CivilizationStartTile {
  #civilizationType: typeof Civilization;
  #mapGenerator: typeof Generator;
  #startTile: Coordinates;

  constructor(
    CivilizationType: typeof Civilization,
    MapGenerator: typeof Generator,
    startTile: Coordinates
  ) {
    this.#civilizationType = CivilizationType;
    this.#mapGenerator = MapGenerator;
    this.#startTile = startTile;
  }

  civilizationType(): typeof Civilization {
    return this.#civilizationType;
  }

  mapGenerator(): typeof Generator {
    return this.#mapGenerator;
  }

  startTile(): Coordinates {
    return this.#startTile;
  }

  startTileForMap(world: World): Tile {
    const { x, y } = this.#startTile;

    return world.get(x, y);
  }
}

export default CivilizationStartTile;
