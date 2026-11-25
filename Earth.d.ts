import Generator from '@civ-clone/core-world-generator/Generator';
import Terrain from '@civ-clone/core-terrain/Terrain';
/**
 * What `Earth#id()` says, and so what a world made from it records (`World#generatorId()`): how a rule tells a game on
 *  the Earth, before or after a load.
 */
export declare const earthGeneratorId = 'earth';
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
  id(): string;
  generate(): Promise<Terrain[]>;
}
export default Earth;
