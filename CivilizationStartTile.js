"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CivilizationStartTile_civilizationType, _CivilizationStartTile_mapGenerator, _CivilizationStartTile_startTile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CivilizationStartTile = void 0;
// TODO: Maybe break this and the `Registry` out into another package when the time comes.
class CivilizationStartTile {
    constructor(CivilizationType, MapGenerator, startTile) {
        _CivilizationStartTile_civilizationType.set(this, void 0);
        _CivilizationStartTile_mapGenerator.set(this, void 0);
        _CivilizationStartTile_startTile.set(this, void 0);
        __classPrivateFieldSet(this, _CivilizationStartTile_civilizationType, CivilizationType, "f");
        __classPrivateFieldSet(this, _CivilizationStartTile_mapGenerator, MapGenerator, "f");
        __classPrivateFieldSet(this, _CivilizationStartTile_startTile, startTile, "f");
    }
    civilizationType() {
        return __classPrivateFieldGet(this, _CivilizationStartTile_civilizationType, "f");
    }
    mapGenerator() {
        return __classPrivateFieldGet(this, _CivilizationStartTile_mapGenerator, "f");
    }
    startTile() {
        return __classPrivateFieldGet(this, _CivilizationStartTile_startTile, "f");
    }
    startTileForMap(world) {
        const { x, y } = __classPrivateFieldGet(this, _CivilizationStartTile_startTile, "f");
        return world.get(x, y);
    }
}
exports.CivilizationStartTile = CivilizationStartTile;
_CivilizationStartTile_civilizationType = new WeakMap(), _CivilizationStartTile_mapGenerator = new WeakMap(), _CivilizationStartTile_startTile = new WeakMap();
exports.default = CivilizationStartTile;
//# sourceMappingURL=CivilizationStartTile.js.map