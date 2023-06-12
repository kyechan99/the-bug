import { DefaultValue, atom, atomFamily, selector } from "recoil";

import { RoadType } from "@type/road";
import { Direction, PlayerData } from "@type/position";
import { CommandType, GameMode, GameModeType } from "@type/game";

/********************************************
 * 
 *      Map
 * 
 ********************************************/
// export const roadState = atomFamily<RoadType, string>({
//   key: "roadState",
//   default: "none",
// });
type FoodObjType = {
  [key: string]: boolean;
};
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
export const commandState = atom<CommandType[]>({
  key: "commandState",
  default: [],
});
export const curCommandState = atom<number>({
  key: "curCommandState",
  default: 0,
});


/********************************************
 * 
 *      Game
 * 
 ********************************************/
export const gameState = atom<GameModeType>({
  key: "gameState",
  default: GameMode.REFRESH,
});