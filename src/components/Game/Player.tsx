import styled, { css } from "styled-components";
import { useRecoilValue } from "recoil";
import { gameState, playerState } from "@recoil/game/atom";

import { IconBug } from "@tabler/icons-react";

import { Direction } from "@type/position";
import { GameMode } from "@type/game";

const Player = () => {
  const pl = useRecoilValue(playerState);
  const gameMode = useRecoilValue(gameState);

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
    <PlayerCharacter rotate={getRotate()} alive={gameMode === GameMode.FAIL}>
      <IconBug />
    </PlayerCharacter>
  );
};

export default Player;

const PlayerCharacter = styled.div<{ rotate: number; alive: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => props.rotate || 0}deg);
  ${(props) => {
    if (props.alive)
      return css`
        color: ${props.theme.colors.warning};
      `;
  }}
`;
