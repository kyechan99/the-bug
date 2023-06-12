import { RoadType } from "@type/road";

export const roadDecryption = (code: number): RoadType => {
  switch (code) {
    case 0:
      return "none";
    case 1:
      return "wall";
    case 3:
      return "yellow";
    case 4:
      return "blue";
  }
  return "wall";
};

export const isWall = (code: number): boolean => {
  return code === 1;
}