"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarthStartTile = void 0;
const CivilizationStartTile_1 = require("./CivilizationStartTile");
const Earth_1 = require("./Earth");
const EarthMap_1 = require("./EarthMap");
class EarthStartTile extends CivilizationStartTile_1.default {
    constructor(CivilizationType, startTiles) {
        super(CivilizationType, Earth_1.default, startTiles[(0, EarthMap_1.sizeKey)(80, 50)]);
        this._startTiles = startTiles;
    }
    startTiles() {
        return this._startTiles;
    }
    startTileForMap(world) {
        var _a;
        const { x, y } = (_a = this._startTiles[(0, EarthMap_1.sizeKey)(world.width(), world.height())]) !== null && _a !== void 0 ? _a : this.startTile();
        return world.get(x, y);
    }
}
exports.EarthStartTile = EarthStartTile;
exports.default = EarthStartTile;
//# sourceMappingURL=EarthStartTile.js.map