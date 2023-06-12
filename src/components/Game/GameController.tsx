import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { commandState, playerState } from "@recoil/game/atom";

import { actType } from "@type/command";
import { Direction } from "@type/position";
import { Button } from "@common/Button/Button";
import { IconPlayerPlayFilled, IconRefresh } from "@tabler/icons-react";

const GameController = () => {
  const [player, setPlayer] = useRecoilState(playerState);
  const command = useRecoilValue(commandState);

  React.useEffect(() => {

    // console.log(player);

  }, [player]);

  const rotate = (act: actType) => {
    setPlayer((prev) => {
      const curPlayer = { ...prev };
      switch (act) {
        case "TURN_LEFT":
          curPlayer.direction++;
          if (curPlayer.direction > Direction.RIGHT)
            curPlayer.direction = Direction.UP;
          break;
        case "TURN_RIGHT":
          curPlayer.direction--;
          if (curPlayer.direction < Direction.UP)
            curPlayer.direction = Direction.RIGHT;
          break;
      }
      return curPlayer;
    });
  };
  
  const move = () => {
    setPlayer((prev) => {
      const curPlayer = { ...prev };
      
      switch (curPlayer.direction) {
        case Direction.UP:
          curPlayer.y--;
          console.log('3333', curPlayer);
          break;
        case Direction.LEFT:
          curPlayer.x--;
          break;
        case Direction.DOWN:
          curPlayer.y++;
          break;
        case Direction.RIGHT:
          curPlayer.x++;
          break;
      }
      
      console.log('2', curPlayer);

      return curPlayer;
    });
  };

  const playCommand = () => {
    let index = 0;
    let intervalId: any = null;

    const increaseIdx = () => {
      if (index >= command.length) {
        stop();
        return;
      }
      console.log('c', command[index]);

      switch (command[index].act) {
        case "MOVE":
          move();
          break;
        case "TURN_LEFT":
        case "TURN_RIGHT":
          rotate(command[index].act);
          break;
        case "F0":
          index = 0;
          return;
      }
      index++;
    };

    const start = () => {
      index = 0;
      intervalId = setInterval(increaseIdx, 1000);
    };

    const stop = () => {
      clearInterval(intervalId);
      intervalId = null;
    };

    return {
      isPlaying: intervalId !== null,
      start,
      stop,
    };
  };

  const controller = playCommand();
  
  const playHandler = (e: any) => {
    e.preventDefault();

    if (!controller.isPlaying) controller.start();
    else controller.stop();
  };

  return (
    <GameControllerStyled>
      <Button onClick={playHandler}>
        <IconPlayerPlayFilled />
      </Button>
      <Button>
        <IconRefresh />
      </Button>
    </GameControllerStyled>
  );
};

export default GameController;

const GameControllerStyled = styled.div`
  display: flex;
  gap: 0.5rem;
`;
