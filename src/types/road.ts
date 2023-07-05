export const Roads = ['none', 'wall', 'yellow', 'blue'] as const;
export type RoadType = typeof Roads[number];