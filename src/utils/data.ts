import { conditionType } from "@type/game";
import { RoadType } from "@type/road";

export const roadDecryption = (code: number): RoadType => {
  switch (code) {
    case 0:
      return "none";
    case 1:
      return "wall";
    case 2:
      return "yellow";
    case 3:
      return "blue";
  }
  return "wall";
};

export const roadEncryption = (code: string): number => {
  switch (code) {
    case "none":
      return 0;
    case "wall":
      return 1;
    case "yellow":
      return 2;
    case "blue":
      return 3;
  }
  return 1;
}

export const isRoadCondition = (road: RoadType, condition: conditionType) => {
  if (condition === "NONE") return true;

  const conditions: {
    condition: conditionType;
    road: RoadType;
  }[] = [
      { condition: "IF_YELLOW", road: "yellow" },
      { condition: "IF_BLUE", road: "blue" },
    ];

  return conditions.some(
    (item) => item.condition === condition && item.road === road
  );
};

export const isWall = (code: number): boolean => {
  return code === 1;
};

// number of files
export const levels = {
  level_0: 2,
  level_1: 2,
  level_2: 3,
}
export type modes = 'practice' | 'level_0' | 'level_1' | 'level_2' | 'random';