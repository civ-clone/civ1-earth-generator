"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Earth = exports.startSquare = void 0;
const Civilizations_1 = require("@civ-clone/civ1-civilization/Civilizations");
const Arctic_1 = require("@civ-clone/base-terrain-arctic/Arctic");
const Desert_1 = require("@civ-clone/base-terrain-desert/Desert");
const Forest_1 = require("@civ-clone/base-terrain-forest/Forest");
const Generator_1 = require("@civ-clone/core-world-generator/Generator");
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
const startTileCoordinatesByCivilizationType = new Map();
[
    [Civilizations_1.American, { x: 12, y: 18 }],
    [Civilizations_1.Aztec, { x: 5, y: 23 }],
    [Civilizations_1.Babylonian, { x: 45, y: 22 }],
    [Civilizations_1.Chinese, { x: 67, y: 19 }],
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
].forEach(([CivilizationType, coordinates]) => startTileCoordinatesByCivilizationType.set(CivilizationType, coordinates));
const startSquare = (world, civilization) => {
    const { x, y } = startTileCoordinatesByCivilizationType.get(civilization.sourceClass());
    return world.get(x, y);
};
exports.startSquare = startSquare;
class Earth extends Generator_1.default {
    async generate() {
        // Map data from MAP>PIC converted using `civ1-asset-extractor`.
        return (
        // Excludes all the `TerrainFeature`s since we'll rely on those being added via the `Created` `Rule`s in
        //  `civ1-world`
        Array.from(`OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
OOOOOOOOOOOOOOOOOOOOOOOOOAAAAAAAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
OOOOOOOOOOOOOOOAAOAOAAAOAAAAAAAAOOOOOOAOOOOOGGOOOOOTAGOOOOOOOOOOOOOOOOOOOOOOOOOO
OOOOTTTTAOOOOAAAAAAAAOOOOAAAAAATOOOOOAAOOOOOOOOOOOOOOOAAOOOOOTOOOOOOOOOOOOOOOOOO
OOOTTTTTTTTTAAOAOAAAAAOOOAAAAATOOOOOOOOOOOOOOOAOOOOOFFAAFFFFFOOFFFOOOOFFFOOOOOOO
OTPTGPPPPTTTTTOTAAAOOAOOOAAAATOOOOOOOOOOOOOOOAOOAAOFFGAFFFFFFFAFFFFFFFFFFOTOOOOO
OOOOOPGTPTOOTTAAAAAAAAOOAAGGOOOOOOOOOOGAAOOOOOOGOGFFFGFFFFFFFFAFFAFFFFFGFGGOOOOO
OOOOOGGFGPPTTAAOOOAOTOOOAGOOOOAOOOOOOAFGFPGFOAAFGTGFFFFFFFFFFFFFFFGFFGOGFFOOOOOO
OOOOPMGFPPPPTTOOOATAAOOOOOOOOOOOOOOOGFPGGFOFFFFFFGFFFFFFFFFFFFFFGFFFFGOOFOOOOOOO
OOOOPMGFGPPOTTTAATTTTOOOOOOOOOOHOOOPFGOGGGFFFGFGGGFFFFFFFFFFFFFFFFFFOOOOFGOOOOOO
OOOOPHFFGPGOPPPOPTTTTOOOOOOOOOGROOOOOPOGFGFFGFFFGFGFGGFGGFFFGFFFFFFFGOOOOPOOOOOO
OOOOGGHFGPPPPPPPPPTPPOOOOOOOOOOFOOOFOOOFFFRFFFFRGFPFFPFGPFGFFOFFFFFGPPGOOOOOOOOO
OOOGGGMGGGPPPOPPPPPOPOOOOOOOOOGGOOOGPPFFFGRRFRRRGGFGGGGGPGGFFFFDPPPPPPOOOOOOOOOO
OOOGGFMGRGRPGORRGOPOOOOOOOOOOOOOOGRGGGGFFGFRFRPGPGGGGGPPPPPPPPPPPPPPGPGOOOOOOOOO
OOGGGMMGRGRGGGGOOOOOOOOOOOOOOOOOGGRMMGGGGPGRPRRPPPPPPPPPPPPPPPPPPPPPGPGOPGOOOOOO
OOGGPPHGRRRGGGOOOOOOOOOOOOOOOOOOPGGGGFGRRGPRPDOOPPOPPPDPDDDPPPPPPDPPPGOOGOOOOOOO
OOGFPPFGGRGGGPOOOOOOOOOOOOOOOOPPPPOGHOOGRFOOOHPOGPPDPDPDDPPPPPPDDPPOPGOOMGOOOOOO
OOGPPDDGGRGGOOOOOOOOOOOOOOOOOOPPPOOOGHOOOGPPPPPOPPPPDPPHPDDDDDDPPPGOOOOOOPOOOOOO
OOPOGDDPOOOPOOOOOOOOOOOOOOOOOOOOOOOOOGOOOOOPPPPGPPPPPPHHMHHHHHHHHMHPGOOGOOOOOOOO
OOPOGDDOOOOPOOOOOOOOOOOOOOOOOOGPPDDOOOOOOOOPPRRHPPPDPPHPGHMMMMMHHHPPPGOOOOOOOOOO
OOOOGDGOOOOOOOOOOOOOOOOOOOOOOODPHHPPPGODPOPPPGRRPPPPPHHRDPGMHHMHHPPRRROOOOOOOOOO
OOOOGGPOPOOOGPOOOOOOOOOOOOOOOPPHDDDPPPPDDRGDPPDOPPPPHPRRDGGGHHHHHPGPPPOOOOOOOOOO
OOOOOGGPGOOOOGPOOOOOOOOOOOOOPPDDDDDPDDDDDRDOPDDOOOOHHRRDPGGRGGGHGPGGPOOOOOOOOOOO
OOOOOOOOGGOOOOOOOOOOOOOOOOOOPDDDDDDDDDDDSRSODDDDDDOOOOPPGGGRRPPGFGGGOOOGOOOOOOOO
OOOOOOOOOGOOOOOOOOOOOOOOOOOPDDDDDDPPPDDDDRDOOPDDDDPOOOOGGGGGOOGGGGGOOOOPGOOOOOOO
OOOOOOOOOPPOGPPGOOOOOOOOOOODDDDDDDPDDDDDDRDDOODDDDOOOOOOGGGOOOPPGGOOOOOGGOOOOOOO
OOOOOOOOOOPGFPPPGOOOOOOOOOODDDDDDDDPDPDPPDHHDOOPDOOOOOOOGGOOOOOGGGGOOOOOFGOOOOOO
OOOOOOOOOOOGHGGGGGGOOOOOOOOPPDPPPPDDDPPPPPPMDPOOGOOOOOOOPGOOOOOOOGGOOOOOOGOOOOOO
OOOOOOOOOOOHJJJGGGGROOOOOOOOPPDPPPPPPPPPPPPHMDPOOOOOOOOOOGOOOOOOOOOOOPOOOOOOOOOO
OOOOOOOOOOGHJRRJJRRRGOOOOOOOOPPPGOPPGPGGGGGGMDDPOOOOOOOOOOOOOOOOOOOGPPOOGPOOOOOO
OOOOOOOOOOPGJJRRRRJGFGGOOOOOOOOOOOOGGGGJJJGGODPPOOOOOOOOOOOOOOOGFGOOPGFGGGOGOOOO
OOOOOOOOOOOFGGJJGJJFGGGPOOOOOOOOOOOGGJJRRRGGHPPOOOOOOOOOOOOOOOOOGFOOGOPGOOOPGGOO
OOOOOOOOOOOGHGGGGGGGGGGOOOOOOOOOOOOGGRRRJJHOGGOOOOOOOOOOOOOOOOOOOGOOOOOOOOOOOGGO
OOOOOOOOOOOOGMFGGGGGGPOOOOOOOOOOOOOOGRJJJGHMGOOOOOOOOOOOOOOOOOOOOPPOOOOOGOOOOOOO
OOOOOOOOOOOOGFMGGFGPPPOOOOOOOOOOOOOORRGGGGGMPOOOOOOOOOOOOOOOOOOOOOGOOOOOOOPGOOOO
OOOOOOOOOOOOOOHMGGRPGGOOOOOOOOOOOOOOOGGGGGGHGOOOOOOOOOOOOOOOOOOOOOOOOOOGGPGPGGOO
OOOOOOOOOOOOOOGHGGRGGOOOOOOOOOOOOOOOODPPGGGGGGOOOOOOOOOOOOOOOOOOOOOOOOOGGPPPPGOO
OOOOOOOOOOOOOOGMGPRROOOOOOOOOOOOOOOOPPPPPPPGGGOPOOOOOOOOOOOOOOOOOOOOGGPPPDDDPPPO
OOOOOOOOOOOOOOGMGGGPOOOOOOOOOOOOOOOOHPDDPPGGOOOPOOOOOOOOOOOOOOOOOOOGGGPDDDDDDPFO
OOOOOOOOOOOOOOPMGGGOOOOOOOOOOOOOOOOOOPPDPPGGOOOGOOOOOOOOOOOOOOOOOOOGPDDDDDDDDPPO
OOOOOOOOOOOOOOOMGPOOOOOOOOOOOOOOOOOOOHPPPGGGOOGPOOOOOOOOOOOOOOOOOOOGDDDDDPDDDPGO
OOOOOOOOOOOOOOOGGOOOOOOOOOOOOOOOOOOOOHPPGHGOOOPOOOOOOOOOOOOOOOOOOOODDDDDDDPDDHFO
OOOOOOOOOOOOOOOPGOOOOOOOOOOOOOOOOOOOOODPGHGOOOOOOOOOOOOOOOOOOOOOOOODDDOOGDDDHGOO
OOOOOOOOOOOOOOOOGOOOOOOOOOOOOOOOOOOOOOPGGGOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOGHHHGOOO
OOOOOOOOOOOOOOOOFOOOOOOOOOOOOOOOOOOOOOGOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPGOOOO
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
`.replace(/\n/g, '')).map((terrainId) => new terrainLookup[terrainId]()));
    }
    height() {
        return 50;
    }
    width() {
        return 80;
    }
}
exports.Earth = Earth;
exports.default = Earth;
//# sourceMappingURL=Earth.js.map