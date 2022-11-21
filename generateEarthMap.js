"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const Map_1 = require("@civ-clone/civ1-asset-extractor/Map");
try {
    (0, fs_1.accessSync)('MAP.PIC');
}
catch (e) {
    console.error('Please ensure MAP.PIC is present.');
    process.exit(1);
}
const map = new Map_1.default();
map.fromString((0, fs_1.readFileSync)('MAP.PIC', {
    encoding: 'binary',
}), 
// We remove the `TerrainFeature`s as these are randomised on build via the `Created` `Rule`s.
() => console.log(map.getTerrainMap().replace(/[a-z]/g, '')));
//# sourceMappingURL=generateEarthMap.js.map