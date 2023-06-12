import React from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  commandState,
  foodState,
  mapState,
  playerState,
} from "@recoil/game/atom";

import { initCommandData } from "@type/game";
import GameFeature from "@components/Game/GameFeature";
import GameController from "@components/Game/GameController";
import GameBoard from "@components/Game/GameBoard";
import GameCompiler from "@components/Game/GameCompiler";
import { posFormat } from "@utils/format";

type FoodObjType = {
  [key: string]: boolean;
};

const Game = () => {
  const [maxCommandSize, setMaxCommandSize] = React.useState<number>(8);
  const setMap = useSetRecoilState(mapState);
  const setFood = useSetRecoilState(foodState);
  const setPlayer = useSetRecoilState(playerState);
  const [command, setCommand] = useRecoilState(commandState);

  React.useEffect(() => {
    initGame();
  }, []);

  React.useEffect(() => {
    setCommand(Array(maxCommandSize).fill(initCommandData));
  }, [maxCommandSize]);

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
