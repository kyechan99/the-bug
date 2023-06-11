/*
  ACT TYPE
*/
export type actType =
  | "NONE"
  | "MOVE"
  | "TURN_LEFT"
  | "TURN_RIGHT"
  | "PAINTING_NONE"
  | "PAINTING_YELLOW"
  | "PAINTING_BLUE"
  | "F0";

/*
  CONDITION TYPE
*/
export const conditionList = ["NONE", "IF_YELLOW", "IF_BLUE"] as const;
export type conditionType = (typeof conditionList)[number];

/*
  COMMAND TYPE
*/
export type CommandType = {
  act: actType;
  condition: conditionType;
};

export const initCommandData: CommandType = {
  act: "NONE",
  condition: "NONE",
};
