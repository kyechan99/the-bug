import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  commandState,
  curCommandState,
  foodState,
  gameState,
  mapState,
  playerState,
} from "@recoil/game/atom";

import { GameMode, actType, initCommandData } from "@type/game";
import GameFeature from "@components/Game/GameFeature";
import GameController from "@components/Game/GameController";
import GameBoard from "@components/Game/GameBoard";
import GameCompiler from "@components/Game/GameCompiler";
import { posFormat } from "@utils/format";
import { Direction } from "@type/position";
import { useInterval } from "@hooks/useInterval";
import { isWall } from "@utils/data";

type FoodObjType = {
  [key: string]: boolean;
};

const Game = () => {
  const [maxCommandSize, setMaxCommandSize] = React.useState<number>(8);
  const [map, setMap] = useRecoilState(mapState);
  const [command, setCommand] = useRecoilState(commandState);

  const [gameMode, setGameMode] = useRecoilState(gameState);
  const [player, setPlayer] = useRecoilState(playerState);
  const [food, setFood] = useRecoilState(foodState);
  const [curCommand, setCurCommand] = useRecoilState(curCommandState);

  React.useEffect(() => {
    setCommand(Array(maxCommandSize).fill(initCommandData));
  }, [maxCommandSize]);

  React.useEffect(() => {
    if (map.length > 0) {
      if (
        isWall(map[player.y][player.x]) ||
        player.x < 0 ||
        player.y < 0 ||
        player.x >= map[0].length ||
        player.y >= map.length
      ) {
        setGameMode(GameMode.FAIL);
        return;
      }
    }

    const foodKey = posFormat(player.x, player.y);

    if (food[foodKey]) {
      const newFoodState = { ...food };
      delete newFoodState[foodKey];

      if (Object.keys(newFoodState).length === 0) {
        // Game Clear
        setGameMode(GameMode.SUCCESS);
      }

      setFood(newFoodState);
    }
  }, [player]);

  React.useEffect(() => {
    if (gameMode === GameMode.PLAYING) {
      refreshGame();
      setCurCommand(0);
    } else if (gameMode === GameMode.REFRESH) {
      refreshGame();
      setGameMode(GameMode.READY);
    } else if (gameMode === GameMode.SUCCESS) {
      console.log("GAME CLEAR !!! ");
    }
  }, [gameMode]);

  useInterval(
    () => {
      if (gameMode === GameMode.SUCCESS || gameMode === GameMode.FAIL) {
        return;
      }

      if (curCommand >= command.length) {
        setCurCommand(0);
        setGameMode((prev) => {
          if (prev === GameMode.FAIL || prev === GameMode.SUCCESS) return prev;
          return GameMode.READY;
        });
        return;
      }

      switch (command[curCommand].act) {
        case "MOVE":
          move();
          break;
        case "TURN_LEFT":
        case "TURN_RIGHT":
          rotate(command[curCommand].act);
          break;
        case "F0":
          setCurCommand(0);
          return;
      }
      setCurCommand(curCommand + 1);
    },
    gameMode === GameMode.PLAYING ? 1000 : null
  );

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
      return curPlayer;
    });
  };

  const initGame = () => {
    var data = require("../data/level_0/data_0.json");
    console.log("MAP DATA", data);

    setMaxCommandSize(data.function[0].limit);
    setMap(data.map);

    let foodData: FoodObjType = {};
    for (let y = 0; y < data.food.length; y++) {
      for (let x = 0; x < data.food[y].length; x++) {
        if (data.food[y][x]) foodData[posFormat(x, y)] = true;
      }
    }
    setFood(foodData);

    setPlayer({
      direction: data.start_direction,
      x: data.start_position.x,
      y: data.start_position.y,
    });

    setCommand([]);
    setGameMode(GameMode.READY);
  };

  const refreshGame = () => {
    console.log("!!!!!!!!!!!!");
    var data = require("../data/level_0/data_0.json");
    console.log("MAP DATA", data);

    setMap(data.map);

    let foodData: FoodObjType = {};
    for (let y = 0; y < data.food.length; y++) {
      for (let x = 0; x < data.food[y].length; x++) {
        if (data.food[y][x]) foodData[posFormat(x, y)] = true;
      }
    }
    setFood(foodData);

    setPlayer({
      direction: data.start_direction,
      x: data.start_position.x,
      y: data.start_position.y,
    });
  };

  return (
    <GameContainer>
      <h2>ROUND 1</h2>
      <GameBoard />
      <GameFeature />
      <GameCompiler />
      <GameController />
    </GameContainer>
  );
};

export default Game;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
