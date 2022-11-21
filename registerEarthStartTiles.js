"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Civilizations_1 = require("@civ-clone/civ1-civilization/Civilizations");
const EarthStartTile_1 = require("./EarthStartTile");
const EarthStartTileRegistry_1 = require("./EarthStartTileRegistry");
EarthStartTileRegistry_1.instance.register(...[
    [Civilizations_1.American, { x: 12, y: 18 }],
    [Civilizations_1.Aztec, { x: 5, y: 23 }],
    [Civilizations_1.Babylonian, { x: 45, y: 22 }],
    [Civilizations_1.Chinese, { x: 66, y: 19 }],
    [Civilizations_1.Egyptian, { x: 41, y: 24 }],
    [Civilizations_1.English, { x: 31, y: 14 }],
    [Civilizations_1.French, { x: 33, y: 16 }],
    [Civilizations_1.German, { x: 38, y: 15 }],
    [Civilizations_1.Greek, { x: 39, y: 18 }],
    [Civilizations_1.Indian, { x: 57, y: 26 }],
    [Civilizations_1.Mongol, { x: 49, y: 19 }],
    [Civilizations_1.Roman, { x: 36, y: 19 }],
    [Civilizations_1.Russian, { x: 44, y: 12 }],
    [Civilizations_1.Zulu, { x: 42, y: 42 }],
].map(([CivilizationType, startTile]) => new EarthStartTile_1.default(CivilizationType, startTile)));
//# sourceMappingURL=registerEarthStartTiles.js.map