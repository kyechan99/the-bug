import { DefaultValue, atom, atomFamily, selector } from "recoil";

import { RoadType } from "@type/road";
import { Direction, PlayerData } from "@type/position";
import { CommandType } from "@type/command";

export const roadState = atomFamily<RoadType, string>({
  key: "roadState",
  default: "none",
});

export const playerState = atom<PlayerData>({
  key: "playerState",
  default: {
    direction: Direction.UP,
    x: 1,
    y: 1,
  },
});

export const commandState = atom<CommandType[]>({
  key: "commandState",
  default: [],
});
export const curCommandState = atom<number>({
  key: "curCommandState",
  default: 0,
});

export const mapState = atom<number[][]>({
  key: " mapState",
  default: [],
});
