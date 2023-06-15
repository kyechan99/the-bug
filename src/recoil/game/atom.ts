import { DefaultValue, atom, atomFamily, selector } from "recoil";

import { Direction, PlayerData } from "@type/position";
import {
  CommandType,
  FoodObjType,
  GameMode,
  GameModeType,
  actType,
  conditionType,
} from "@type/game";

/********************************************
 *
 *      Map
 *
 ********************************************/
export const mapState = atom<number[][]>({
  key: "mapState",
  default: [],
});
export const foodState = atom<FoodObjType>({
  key: "foodState",
  default: {},
});

/********************************************
 *
 *      Player
 *
 ********************************************/
export const playerState = atom<PlayerData>({
  key: "playerState",
  default: {
    direction: Direction.UP,
    x: 1,
    y: 1,
  },
});

/********************************************
 *
 *      Command
 *
 ********************************************/
export const commandState = atom<CommandType[][]>({
  key: "commandState",
  default: [],
});
export const curCommandState = atom<{ function: number; idx: number }>({
  key: "curCommandState",
  default: {
    function: 0,
    idx: 0,
  },
});
export const availableCommandState = atom<(actType | conditionType)[]>({
  key: "availableCommandState",
  default: [],
});

/********************************************
 *
 *      Game
 *
 ********************************************/
export const gameState = atom<GameModeType>({
  key: "gameState",
  default: GameMode.INIT,
});
