"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.CivilizationStartTileRegistry = void 0;
const CivilizationStartTile_1 = require("./CivilizationStartTile");
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
class CivilizationStartTileRegistry extends EntityRegistry_1.default {
    constructor() {
        super(CivilizationStartTile_1.default);
    }
    getByCivilization(CivilizationType) {
        const [startTile] = this.getBy('civilizationType', CivilizationType);
        if (!startTile) {
            throw new TypeError(`${CivilizationType.name} does not have a registered start tile.`);
        }
        return startTile;
    }
    getStartTileByCivilizationAndWorld(CivilizationType, world) {
        return this.getByCivilization(CivilizationType).startTileForMap(world);
    }
}
exports.CivilizationStartTileRegistry = CivilizationStartTileRegistry;
exports.instance = new CivilizationStartTileRegistry();
exports.default = CivilizationStartTileRegistry;
//# sourceMappingURL=CivilizationStartTileRegistry.js.map