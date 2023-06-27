import React from "react";
import styled from "styled-components";

import { Button } from "@common/Button/Button";
import { H1 } from "@common/Heading/Heading";
import { Link } from "react-router-dom";
import { IconBug } from "@tabler/icons-react";
import { levels } from "@utils/data";
import GameCompiler from "@components/Game/GameCompiler";
import GameFeature from "@components/Game/GameFeature";
import GameBoard from "@components/Game/GameBoard";
import { FoodObjType, conditionType, initCommandData } from "@type/game";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  availableCommandState,
  commandState,
  foodState,
  mapState,
  playerState,
} from "@recoil/game/atom";
import { posFormat } from "@utils/format";
import dataFileType from "@type/data";

const initData = require(`../data/example.json`);

const PrettyPrintJson = ({ data }: { data: dataFileType }) => {
  return <div>{JSON.stringify(data)}</div>;
  return <div>{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}</div>;
};

const Editor = () => {
  const [map, setMap] = useRecoilState(mapState);
  const setAvailableCommand = useSetRecoilState(availableCommandState);
  const [command, setCommand] = useRecoilState(commandState);
  const [food, setFood] = useRecoilState(foodState);
  const [player, setPlayer] = useRecoilState(playerState);

  const [data, setData] = React.useState<dataFileType>(initData);

  React.useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
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

    const arrays = [];
    for (let i = 0; i < data.function.length; i++) {
      arrays[i] = Array(data.function[i].limit).fill(initCommandData);
    }
    const none: conditionType[] = ["NONE"];
    setAvailableCommand([
      ...data.active_command,
      ...data.active_condition,
      ...none,
    ]);

    // 빈 배열로 초기화된 2차원 배열 생성
    setCommand(arrays);
  };

  const changeBoardSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    let [height, width] = [map.length, map[0].length];

    const { name, value } = e.target;

    if (name === "board_height") {
      height = parseInt(value);
    } else {
      width = parseInt(value);
    }

    const arrays = Array.from(Array(height), () => Array(width).fill(1));

    setMap(arrays);
    setData({ ...data, map: arrays });
  };

  return (
    <div>
      <Hero>
        <H1>
          THE <IconBug /> BUG
        </H1>
      </Hero>

      <GameContainer>
        <GameBoard />
        <GameFeature />
        <GameCompiler />
      </GameContainer>

      <BoardSizeInputBlock>
        <input
          type="number"
          name="board_height"
          step="1"
          min="4"
          max="20"
          value={data.map.length || 4}
          onChange={changeBoardSize}
        />
        x
        <input
          type="number"
          name="board_width"
          step="1"
          min="4"
          max="20"
          value={data.map[0].length}
          onChange={changeBoardSize}
        />
      </BoardSizeInputBlock>

      <PrettyPrintJson data={data} />
    </div>
  );
};

export default Editor;

const Hero = styled.div`
  margin-bottom: 3rem;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const BoardSizeInputBlock = styled.div``;
