export const Direction = {
  UP: 0,
  LEFT: 1,
  RIGHT: 2,
  DOWN: 3,
} as const;
export type DirectionType = (typeof Direction)[keyof typeof Direction];

export type Position = {
  x: number;
  y: number;
};

export type PlayerData = Position & {
  direction: DirectionType;
};
