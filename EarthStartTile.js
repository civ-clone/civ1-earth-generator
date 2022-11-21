"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarthStartTile = void 0;
const CivilizationStartTile_1 = require("./CivilizationStartTile");
const Earth_1 = require("./Earth");
class EarthStartTile extends CivilizationStartTile_1.default {
    constructor(CivilizationType, startTile) {
        super(CivilizationType, Earth_1.default, startTile);
    }
}
exports.EarthStartTile = EarthStartTile;
exports.default = EarthStartTile;
//# sourceMappingURL=EarthStartTile.js.map