import Generator from '@civ-clone/core-world-generator/Generator';
import Terrain from '@civ-clone/core-terrain/Terrain';
/**
 * The Earth, in each size `earthMaps` has. A size without a map of its own gets the original 80 x 50 map, so
 * `width()` and `height()` report the size actually generated.
 */
export declare class Earth extends Generator {
  private _map;
  constructor(
    height?: number,
    width?: number,
    options?: {
      [key: string]: any;
    }
  );
  generate(): Promise<Terrain[]>;
}
export default Earth;
