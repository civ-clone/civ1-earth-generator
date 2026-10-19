"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Earth = void 0;
const Arctic_1 = require("@civ-clone/base-terrain-arctic/Arctic");
const Desert_1 = require("@civ-clone/base-terrain-desert/Desert");
const Forest_1 = require("@civ-clone/base-terrain-forest/Forest");
const Generator_1 = require("@civ-clone/core-world-generator/Generator");
const EarthMaps_1 = require("./EarthMaps");
const Grassland_1 = require("@civ-clone/base-terrain-grassland/Grassland");
const Hills_1 = require("@civ-clone/base-terrain-hills/Hills");
const Jungle_1 = require("@civ-clone/base-terrain-jungle/Jungle");
const Mountains_1 = require("@civ-clone/base-terrain-mountains/Mountains");
const Ocean_1 = require("@civ-clone/base-terrain-ocean/Ocean");
const Plains_1 = require("@civ-clone/base-terrain-plains/Plains");
const River_1 = require("@civ-clone/base-terrain-river/River");
const Swamp_1 = require("@civ-clone/base-terrain-swamp/Swamp");
const Tundra_1 = require("@civ-clone/base-terrain-tundra/Tundra");
const terrainLookup = {
    A: Arctic_1.default,
    D: Desert_1.default,
    F: Forest_1.default,
    G: Grassland_1.default,
    H: Hills_1.default,
    J: Jungle_1.default,
    M: Mountains_1.default,
    O: Ocean_1.default,
    P: Plains_1.default,
    R: River_1.default,
    S: Swamp_1.default,
    T: Tundra_1.default,
};
/**
 * The Earth, in each size `earthMaps` has. A size without a map of its own gets the original 80 x 50 map, so
 * `width()` and `height()` report the size actually generated.
 */
class Earth extends Generator_1.default {
    constructor(height = 50, width = 80, options = {}) {
        const map = (0, EarthMaps_1.getEarthMap)(width, height);
        super(map.height, map.width, options);
        this._map = map;
    }
    async generate() {
        return Array.from(this._map.terrain.replace(/\n/g, '')).map((terrainId) => new terrainLookup[terrainId]());
    }
}
exports.Earth = Earth;
exports.default = Earth;
//# sourceMappingURL=Earth.js.map