import EarthStartTile, { StartTilesBySize } from './EarthStartTile';
import { earthMaps } from './EarthMaps';
import { instance as earthStartTileRegistryInstance } from './EarthStartTileRegistry';
import { sizeKey } from './EarthMap';

const [original] = earthMaps;

earthStartTileRegistryInstance.register(
  ...original.startTiles.map(
    ([CivilizationType]) =>
      new EarthStartTile(
        CivilizationType,
        earthMaps.reduce((startTiles: StartTilesBySize, map) => {
          const [, coordinates] =
            map.startTiles.find(
              ([MapCivilizationType]) =>
                MapCivilizationType === CivilizationType
            ) ?? [];

          if (coordinates) {
            startTiles[sizeKey(map.width, map.height)] = coordinates;
          }

          return startTiles;
        }, {})
      )
  )
);
