import Generator from '@civ-clone/core-world-generator/Generator';
import Terrain from '@civ-clone/core-terrain/Terrain';
export declare class Earth extends Generator {
  generate(): Promise<Terrain[]>;
  height(): number;
  width(): number;
}
export default Earth;
