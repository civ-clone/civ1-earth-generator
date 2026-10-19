import EarthMap from './EarthMap';
/** Every size the Earth map comes in, the original first. */
export declare const earthMaps: EarthMap[];
/** The Earth map for the requested size, or the original when there isn't one. */
export declare const getEarthMap: (width: number, height: number) => EarthMap;
export default earthMaps;
