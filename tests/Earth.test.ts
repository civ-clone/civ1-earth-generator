import { earthMaps, getEarthMap } from '../EarthMaps';
import EarthStartTile from '../EarthStartTile';
import Earth from '../Earth';
import EarthMap from '../EarthMap';
import World from '@civ-clone/core-world/World';
import { expect } from 'chai';
import { instance as earthStartTileRegistryInstance } from '../EarthStartTileRegistry';
import '../registerEarthStartTiles';

const rows = (map: EarthMap): string[] => map.terrain.split('\n').slice(0, -1),
  terrainAt = (map: EarthMap, x: number, y: number): string => rows(map)[y][x],
  // A stand-in `World` that only knows its size and where its `Tile`s are.
  worldOf = (width: number, height: number): World =>
    ({
      width: () => width,
      height: () => height,
      get: (x: number, y: number) => ({ x, y }),
    } as unknown as World),
  // The land reachable from (x, y), moving as units do: diagonals count, and the map wraps east to west.
  landmass = (map: EarthMap, x: number, y: number): Set<string> => {
    const seen = new Set<string>([`${x},${y}`]),
      queue: [number, number][] = [[x, y]];

    while (queue.length) {
      const [cx, cy] = queue.shift()!;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = (cx + dx + map.width) % map.width,
            ny = cy + dy,
            key = `${nx},${ny}`;

          if (
            ny < 0 ||
            ny >= map.height ||
            seen.has(key) ||
            terrainAt(map, nx, ny) === 'O'
          ) {
            continue;
          }

          seen.add(key);
          queue.push([nx, ny]);
        }
      }
    }

    return seen;
  };

describe('Earth', (): void => {
  it('comes in the original size and the two larger New Game sizes', (): void => {
    expect(earthMaps.map(({ width, height }) => [width, height])).to.eql([
      [80, 50],
      [104, 65],
      [128, 80],
    ]);
  });

  earthMaps.forEach((map) => {
    describe(`${map.width} x ${map.height}`, (): void => {
      it('has a row of known terrain for each row of the map', (): void => {
        expect(rows(map)).to.have.lengthOf(map.height);

        rows(map).forEach((row) => expect(row).to.match(/^[ADFGHJMOPRST]+$/));
        rows(map).forEach((row) => expect(row).to.have.lengthOf(map.width));
      });

      it('generates a World of its own size', async (): Promise<void> => {
        const generator = new Earth(map.height, map.width),
          terrain = await generator.generate();

        expect([generator.width(), generator.height()]).to.eql([
          map.width,
          map.height,
        ]);
        expect(terrain).to.have.lengthOf(map.width * map.height);
        expect(
          terrain.map((tile) => tile.constructor.name[0]).join('')
        ).to.equal(rows(map).join(''));
      });

      it('starts every civilization on its own land', (): void => {
        const seen = new Set<string>();

        map.startTiles.forEach(([, { x, y }]) => {
          expect(terrainAt(map, x, y)).to.not.equal('O');
          expect(seen.has(`${x},${y}`)).to.be.false;

          seen.add(`${x},${y}`);
        });
      });
    });
  });

  earthMaps.slice(1).forEach((map) => {
    it(`starts every civilization on Grassland, Plains or River at ${map.width} x ${map.height}`, (): void => {
      expect(map.startTiles).to.have.lengthOf(14);

      map.startTiles.forEach(([, { x, y }]) =>
        expect('GPR').to.include(terrainAt(map, x, y))
      );
    });
  });

  earthMaps.forEach((map) => {
    it(`keeps Britain apart from the continent at ${map.width} x ${map.height}`, (): void => {
      const start = (name: string) =>
          map.startTiles.find(
            ([CivilizationType]) => CivilizationType.name === name
          )![1],
        london = start('English'),
        paris = start('French');

      expect(landmass(map, london.x, london.y).has(`${paris.x},${paris.y}`)).to
        .be.false;
    });
  });

  it('falls back to the original map for a size it has no map for', async (): Promise<void> => {
    const generator = new Earth(100, 160);

    expect([generator.width(), generator.height()]).to.eql([80, 50]);
    expect(await generator.generate()).to.have.lengthOf(80 * 50);
    expect(getEarthMap(160, 100)).to.equal(earthMaps[0]);
  });

  it('gives each civilization the start tile for the size of the World', (): void => {
    const startTiles = earthStartTileRegistryInstance.entries();

    expect(startTiles).to.have.lengthOf(14);

    startTiles.forEach((startTile) => {
      earthMaps.forEach((map) => {
        const [, expected] = map.startTiles.find(
          ([CivilizationType]) =>
            CivilizationType === startTile.civilizationType()
        )!;

        expect(
          startTile.startTileForMap(worldOf(map.width, map.height))
        ).to.eql(expected);
      });

      expect((startTile as EarthStartTile).startTile()).to.eql(
        (startTile as EarthStartTile).startTiles()['80x50']
      );
    });
  });
});
