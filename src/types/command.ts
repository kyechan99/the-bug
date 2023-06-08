export type actType =
  | "MOVE"
  | "TURN_LEFT"
  | "TURN_RIGHT"
  | "PAINTING_NONE"
  | "PAINTING_YELLOW"
  | "PAINTING_BLUE";

export const conditionList = ["NONE", "IF_YELLOW", "IF_BLUE"] as const;
export type conditionType = (typeof conditionList)[number];

export type CommandType = {
  act: actType;
  condition: conditionType;
};
