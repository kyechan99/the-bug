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

  const changeStartPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "player_x") {
      setPlayer({ ...player, x: parseInt(value) });
      setData({
        ...data,
        start_position: { ...data.start_position, x: parseInt(value) },
      });
    } else {
      setPlayer({ ...player, y: parseInt(value) });
      setData({
        ...data,
        start_position: { ...data.start_position, y: parseInt(value) },
      });
    }
  };

  const refreshCommand = (functions: any) => {
    const arrays = [];
    for (let i = 0; i < functions.length; i++) {
      arrays[i] = Array(functions[i].limit).fill(initCommandData);
    }
    setCommand(arrays);
  }

  const handleFunctionAdd = () => {
    const newArray = [...data.function, { limit: 1 }];
    setData({
      ...data,
      function: newArray,
    });
    refreshCommand(newArray);
    
  };

  const handleFunctionRemove = (index: number) => {
    const newArray = [...data.function];
    newArray.splice(index, 1);
    setData({
      ...data,
      function: newArray,
    });
    refreshCommand(newArray);
  };

  const handleFunctionLimitChange = (index: number, value: number) => {
    const newArray = [...data.function];
    newArray[index].limit = Number(value);
    setData({
      ...data,
      function: newArray,
    });
    refreshCommand(newArray);
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

      <InputGroup>
        <Label>Board Size :</Label>
        <InputNumber
          name="board_height"
          min={4}
          value={data.map.length || 4}
          onChange={changeBoardSize}
        />
        x
        <InputNumber
          name="board_width"
          min={4}
          value={data.map[0].length}
          onChange={changeBoardSize}
        />
      </InputGroup>

      <InputGroup>
        <Label>Start Position :</Label>
        <InputNumber
          name="player_x"
          min={0}
          value={player.x}
          onChange={changeStartPosition}
        />
        ,
        <InputNumber
          name="player_y"
          min={0}
          value={player.y}
          onChange={changeStartPosition}
        />
      </InputGroup>

      <InputGroup>
        <div>
          <Label>Functions :</Label>
          {data.function.map((item, index) => (
            <div key={index}>
              <label>F{index} : </label>
              <InputNumber
                value={item.limit}
                min={1}
                onChange={(e) =>
                  handleFunctionLimitChange(index, parseInt(e.target.value))
                }
              />
              <RemoveButton onClick={() => handleFunctionRemove(index)}>-</RemoveButton>
            </div>
          ))}
          <AddButton onClick={handleFunctionAdd}>+</AddButton>
        </div>
      </InputGroup>

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

const InputGroup = styled.div`
  margin: 0.25rem 0rem;
`;

const Label = styled.label`
  font-family: "Lilita One", sans-serif;
  margin-right: 0.5rem;
`;

const InputNumber = styled.input.attrs((props) => ({
  type: "number",
  step: 1,
  min: props.min,
  max: 20,
}))`
  width: 2.75rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 0.5rem;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: ${({ theme }) => theme.colors.grey};
  border: none;
  margin: 0rem 0.125rem;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
`;
const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.grey};
  border: none;
  margin: 0.25rem 0.125rem;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  padding: 0.25rem 3rem;
`;
