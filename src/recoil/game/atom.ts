import { atom, atomFamily } from "recoil";

import { RoadType } from "@type/road";
import { Position } from "@type/position";
import { CommandType } from "@type/command";

export const roadState = atomFamily<RoadType, string>({
    key: "roadState",
    default: "none",
});

export const playerState = atom<Position>({
    key: "playerState",
    default: {
        x: 0,
        y: 0,
    },
});

export const commandState = atom<CommandType[]>({
    key: "commandState",
    default: []
});
export const curCommandState = atom<number>({
    key: "curCommandState",
    default: 0,
});