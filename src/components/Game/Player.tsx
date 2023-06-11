import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { IconBug } from "@tabler/icons-react";
import { playerState } from "@recoil/game/atom";
import { Direction } from "@type/position";

const Player = () => {
  const pl = useRecoilValue(playerState);

  const getRotate = () => {
    switch (pl.direction) {
      case Direction.UP:
        return 0;
      case Direction.LEFT:
        return 270;
      case Direction.RIGHT:
        return 90;
      case Direction.DOWN:
        return 180;
      default:
        return 0;
    }
  };

  return (
    <PlayerCharacter rotate={getRotate()}>
      <IconBug />
    </PlayerCharacter>
  );
};

export default Player;

const PlayerCharacter = styled.div<{ rotate: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => props.rotate || 0}deg);
`;
