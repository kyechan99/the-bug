import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { gameState } from "@recoil/game/atom";

import { GameMode } from "@type/game";
import { Button } from "@common/Button/Button";
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
  IconPlayerTrackNextFilled,
  IconRefresh,
  IconTrophyFilled,
} from "@tabler/icons-react";

const GameController = () => {
  const [gameMode, setGameMode] = useRecoilState(gameState);

  const playHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setGameMode((prev) => {
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
      <ControllerList>
        <Button
          onClick={playHandler}
          variant={isGamePlaying() ? "primary" : "normal"}
          holding={isGamePlaying()}
        >
          {isGamePlaying() ? (
            <IconPlayerStopFilled />
          ) : (
            <IconPlayerPlayFilled />
          )}
        </Button>
        <Button onClick={refreshHandler}>
          <IconRefresh />
        </Button>
        {gameMode === GameMode.SUCCESS && (
          <Button variant="secondary">
            <IconPlayerTrackNextFilled />
          </Button>
        )}
      </ControllerList>
      {gameMode === GameMode.SUCCESS && (
        <Message>
          <IconTrophyFilled /> SUCCESS <IconTrophyFilled />
        </Message>
      )}
    </GameControllerStyled>
  );
};

export default GameController;

const GameControllerStyled = styled.div`
  position: relative;
`;
const ControllerList = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Message = styled.div`
  font-family: "Lilita One", sans-serif;
  position: absolute;
  margin-top: 1rem;
  display: inline-flex;
  gap: 0.5rem;
  transform: translate(-50%, 0%);
  left: 50%;
  color: ${({ theme }) => theme.colors.primary};
`;
