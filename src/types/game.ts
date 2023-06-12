/********************************************
 * 
 *      ACT TYPE
 * 
 ********************************************/
export const actList = [
  "NONE",
  "MOVE",
  "TURN_LEFT",
  "TURN_RIGHT",
  "PAINTING_NONE",
  "PAINTING_YELLOW",
  "PAINTING_BLUE",
  "F0",
] as const;
export type actType = (typeof actList)[number];


/********************************************
 * 
 *      CONDITION TYPE
 * 
 ********************************************/
export const conditionList = ["NONE", "IF_YELLOW", "IF_BLUE"] as const;
export type conditionType = (typeof conditionList)[number];


/********************************************
 * 
 *      COMMAND TYPE
 * 
 ********************************************/
export type CommandType = {
  act: actType;
  condition: conditionType;
};

export const initCommandData: CommandType = {
  act: "NONE",
  condition: "NONE",
};


/********************************************
 * 
 *      Game Mode TYPE
 * 
 ********************************************/
export const GameMode = {
  READY: "READY",
  PLAYING: "PLAYING",
  REFRESH: "REFRESH",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  INIT: "INIT"
} as const;
export type GameModeType = (typeof GameMode)[keyof typeof GameMode];


/********************************************
 * 
 *      Food Data TYPE
 * 
 ********************************************/
export type FoodObjType = {
  [key: string]: boolean;
};