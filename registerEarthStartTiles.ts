import {
  American,
  Aztec,
  Babylonian,
  Chinese,
  Egyptian,
  English,
  French,
  German,
  Greek,
  Indian,
  Mongol,
  Roman,
  Russian,
  Zulu,
} from '@civ-clone/civ1-civilization/Civilizations';
import Civilization from '@civ-clone/core-civilization/Civilization';
import { Coordinates } from './CivilizationStartTile';
import EarthStartTile from './EarthStartTile';
import { instance as earthStartTileRegistryInstance } from './EarthStartTileRegistry';

earthStartTileRegistryInstance.register(
  ...(
    [
      [American, { x: 12, y: 18 }],
      [Aztec, { x: 5, y: 23 }],
      [Babylonian, { x: 45, y: 22 }],
      [Chinese, { x: 66, y: 19 }],
      [Egyptian, { x: 41, y: 24 }],
      [English, { x: 31, y: 14 }],
      [French, { x: 33, y: 16 }],
      [German, { x: 38, y: 15 }],
      [Greek, { x: 39, y: 18 }],
      [Indian, { x: 57, y: 26 }],
      [Mongol, { x: 49, y: 19 }],
      [Roman, { x: 36, y: 19 }],
      [Russian, { x: 44, y: 12 }],
      [Zulu, { x: 42, y: 42 }],
    ] as [typeof Civilization, Coordinates][]
  ).map(
    ([CivilizationType, startTile]) =>
      new EarthStartTile(CivilizationType, startTile)
  )
);
