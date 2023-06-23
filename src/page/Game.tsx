import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  availableCommandState,
  commandState,
  curCommandState,
  foodState,
  gameRound,
  gameState,
  mapState,
  playerState,
} from "@recoil/game/atom";

import GameFeature from "@components/Game/GameFeature";
import GameController from "@components/Game/GameController";
import GameBoard from "@components/Game/GameBoard";
import GameCompiler from "@components/Game/GameCompiler";

import { useInterval } from "@hooks/useInterval";
import { Direction } from "@type/position";
import { FoodObjType, GameMode, actType, initCommandData } from "@type/game";
import {
  isRoadCondition,
  isWall,
  levels,
  modes,
  roadDecryption,
} from "@utils/data";
import { posFormat } from "@utils/format";

const Game = () => {
  const { mode } = useParams<{ mode: modes }>();
  const [cookies] = useCookies(["game"]);

  const [mapList] = React.useState<number[]>(() => {
    if (mode !== "practice" && mode !== "random" && mode !== undefined)
      return Array.from(Array(levels[mode]).keys()).sort(
        () => Math.random() - 0.5
      );
    return [];
  });
  const [round] = useRecoilState(gameRound);

  const [map, setMap] = useRecoilState(mapState);
  const [command, setCommand] = useRecoilState(commandState);
  const [gameMode, setGameMode] = useRecoilState(gameState);
  const [player, setPlayer] = useRecoilState(playerState);
  const [food, setFood] = useRecoilState(foodState);
  const [curCommand, setCurCommand] = useRecoilState(curCommandState);
  const setAvailableCommand = useSetRecoilState(availableCommandState);
  const resetCurCommand = useResetRecoilState(curCommandState);

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
      resetCurCommand();
    } else if (gameMode === GameMode.REFRESH) {
      refreshGame();
      setGameMode(GameMode.READY);
    } else if (gameMode === GameMode.INIT) {
      // initGame();
    } else if (gameMode === GameMode.SUCCESS) {
      console.log("GAME CLEAR !!! ");
    }
  }, [gameMode]);

  React.useEffect(() => {
    initGame();
  }, [cookies.game, round, mapList]);

  useInterval(
    () => {
      if (gameMode === GameMode.SUCCESS || gameMode === GameMode.FAIL) {
        return;
      }

      if (curCommand.idx >= command[curCommand.function].length) {
        resetCurCommand();
        setGameMode((prev) => {
          if (prev === GameMode.FAIL || prev === GameMode.SUCCESS) return prev;
          return GameMode.FAIL;
        });
        return;
      }

      if (
        isRoadCondition(
          roadDecryption(map[player.y][player.x]),
          command[curCommand.function][curCommand.idx].condition
        )
      ) {
        switch (command[curCommand.function][curCommand.idx].act) {
          case "MOVE":
            move();
            break;
          case "TURN_LEFT":
          case "TURN_RIGHT":
            rotate(command[curCommand.function][curCommand.idx].act);
            break;
          case "F0":
            setCurCommand((prev) => {
              return {
                ...prev,
                idx: 0,
              };
            });
            return;
        }
      }

      setCurCommand((prev) => {
        return {
          ...prev,
          idx: prev.idx + 1,
        };
      });
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
    var data = refreshGame();
    if (data === null) return;

    console.log(`%cROUND : ${cookies.game || 0}`, "color: cyan;");
    console.log(`MAP DATA`, data);

    const arrays = [];
    for (let i = 0; i < data.function.length; i++) {
      arrays[i] = Array(data.function[i].limit).fill(initCommandData);
    }

    setAvailableCommand(data.active_command + data.active_condition + ["NONE"]);

    // 빈 배열로 초기화된 2차원 배열 생성
    setCommand(arrays);
    setGameMode(GameMode.READY);
    resetCurCommand();
  };

  const refreshGame = () => {
    /*
      mode = 'practice' | 'random' | 'level_*'
    */
    var data;
    if (mode === "practice") {
      data = require(`../data/${mode}/data_${cookies.game || 0}.json`);
    } else if (mode?.startsWith("level_")) {
      data = require(`../data/${mode}/data_${mapList[round]}.json`);
    } else {
      /* else if (mode === "random") {
    //  TODO: Make Random Mode
    }*/
      console.error(
        `WRONG DATA PATH\n- mode : ${mode}\n-round : ${cookies.game || 0}`
      );
      return null;
    }

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

    return data;
  };

  return (
    <GameContainer>
      <h2>ROUND {round + 1}</h2>
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
