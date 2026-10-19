import EarthMap from './EarthMap';
import earth104x65 from './Maps/Earth104x65';
import earth128x80 from './Maps/Earth128x80';
import earth80x50 from './Maps/Earth80x50';

/** Every size the Earth map comes in, the original first. */
export const earthMaps: EarthMap[] = [earth80x50, earth104x65, earth128x80];

/** The Earth map for the requested size, or the original when there isn't one. */
export const getEarthMap = (width: number, height: number): EarthMap =>
  earthMaps.find((map) => map.width === width && map.height === height) ??
  earth80x50;

export default earthMaps;
