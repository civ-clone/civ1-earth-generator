"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEarthMap = exports.earthMaps = void 0;
const Earth104x65_1 = require("./Maps/Earth104x65");
const Earth128x80_1 = require("./Maps/Earth128x80");
const Earth80x50_1 = require("./Maps/Earth80x50");
/** Every size the Earth map comes in, the original first. */
exports.earthMaps = [Earth80x50_1.default, Earth104x65_1.default, Earth128x80_1.default];
/** The Earth map for the requested size, or the original when there isn't one. */
const getEarthMap = (width, height) => {
    var _a;
    return (_a = exports.earthMaps.find((map) => map.width === width && map.height === height)) !== null && _a !== void 0 ? _a : Earth80x50_1.default;
};
exports.getEarthMap = getEarthMap;
exports.default = exports.earthMaps;
//# sourceMappingURL=EarthMaps.js.map