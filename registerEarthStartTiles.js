"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EarthStartTile_1 = require("./EarthStartTile");
const EarthMaps_1 = require("./EarthMaps");
const EarthStartTileRegistry_1 = require("./EarthStartTileRegistry");
const EarthMap_1 = require("./EarthMap");
const [original] = EarthMaps_1.earthMaps;
EarthStartTileRegistry_1.instance.register(...original.startTiles.map(([CivilizationType]) => new EarthStartTile_1.default(CivilizationType, EarthMaps_1.earthMaps.reduce((startTiles, map) => {
    var _a;
    const [, coordinates] = (_a = map.startTiles.find(([MapCivilizationType]) => MapCivilizationType === CivilizationType)) !== null && _a !== void 0 ? _a : [];
    if (coordinates) {
        startTiles[(0, EarthMap_1.sizeKey)(map.width, map.height)] = coordinates;
    }
    return startTiles;
}, {}))));
//# sourceMappingURL=registerEarthStartTiles.js.map