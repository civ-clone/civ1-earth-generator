"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CivilizationStartTile = void 0;
// TODO: Maybe break this and the `Registry` out into another package when the time comes.
class CivilizationStartTile {
    constructor(CivilizationType, MapGenerator, startTile) {
        this._civilizationType = CivilizationType;
        this._mapGenerator = MapGenerator;
        this._startTile = startTile;
    }
    civilizationType() {
        return this._civilizationType;
    }
    mapGenerator() {
        return this._mapGenerator;
    }
    startTile() {
        return this._startTile;
    }
    startTileForMap(world) {
        const { x, y } = this._startTile;
        return world.get(x, y);
    }
}
exports.CivilizationStartTile = CivilizationStartTile;
exports.default = CivilizationStartTile;
//# sourceMappingURL=CivilizationStartTile.js.map