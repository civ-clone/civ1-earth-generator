"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.EarthStartTileRegistry = void 0;
const CivilizationStartTileRegistry_1 = require("./CivilizationStartTileRegistry");
const Earth_1 = require("./Earth");
class EarthStartTileRegistry extends CivilizationStartTileRegistry_1.default {
    entries() {
        return super
            .entries()
            .filter((startTile) => startTile.mapGenerator() === Earth_1.default);
    }
}
exports.EarthStartTileRegistry = EarthStartTileRegistry;
exports.instance = new EarthStartTileRegistry();
exports.default = EarthStartTileRegistry;
//# sourceMappingURL=EarthStartTileRegistry.js.map