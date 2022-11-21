import { accessSync, readFileSync } from 'fs';
import Map from '@civ-clone/civ1-asset-extractor/Map';

try {
  accessSync('MAP.PIC');
} catch (e) {
  console.error('Please ensure MAP.PIC is present.');

  process.exit(1);
}

const map = new Map();

map.fromString(
  readFileSync('MAP.PIC', {
    encoding: 'binary',
  }),
  // We remove the `TerrainFeature`s as these are randomised on build via the `Created` `Rule`s.
  () => console.log(map.getTerrainMap().replace(/[a-z]/g, ''))
);
