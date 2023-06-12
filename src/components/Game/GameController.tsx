import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  commandState,
  foodState,
  gameState,
  playerState,
} from "@recoil/game/atom";

import { GameMode, actType } from "@type/game";
import { Direction } from "@type/position";
import { Button } from "@common/Button/Button";
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
  IconPlayerTrackNextFilled,
  IconRefresh,
} from "@tabler/icons-react";
import { posFormat } from "@utils/format";

const GameController = () => {
  const [gameMode, setGameMode] = useRecoilState(gameState);

  const playHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setGameMode((prev) => {
      if (prev === GameMode.SUCCESS || prev === GameMode.FAIL)
        return GameMode.REFRESH;
      if (prev === GameMode.PLAYING) return GameMode.READY;
      return GameMode.PLAYING;
    });
  };

  const refreshHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setGameMode(GameMode.REFRESH);
  };

  const isGamePlaying = () => {
    return gameMode === GameMode.PLAYING;
  };

  return (
    <GameControllerStyled>
      <Button
        onClick={playHandler}
        variant={isGamePlaying() ? "primary" : "normal"}
        holding={isGamePlaying()}
      >
        {isGamePlaying() ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />}
      </Button>
      <Button onClick={refreshHandler}>
        <IconRefresh />
      </Button>
      {gameMode === GameMode.SUCCESS && (
        <Button>
          <IconPlayerTrackNextFilled />
        </Button>
      )}
    </GameControllerStyled>
  );
};

export default GameController;

const GameControllerStyled = styled.div`
  display: flex;
  gap: 0.5rem;
`;
