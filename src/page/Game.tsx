import React from "react";
import styled from "styled-components";

import { Road } from "@components/Game/Road";
import { Command } from "@components/Game/Command";
import { CommandType, initCommandData } from "@type/command";
import {
  IconHexagonNumber0,
  IconPlayerPlayFilled,
  IconRefresh,
} from "@tabler/icons-react";
import Feature from "@components/Game/Feature";
import { Button } from "@common/Button/Button";
import { Position } from "@type/position";
import { RoadType } from "@type/road";

/*
  0: MOVE STRAIGHT
  
  1: TURN LEFT
  2: TURN RIGHT

  3: IF YELLOW
  4: IF BLUE

*/

const Game = () => {
  const [map, setMap] = React.useState<number[][]>([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 4, 1],
    [1, 0, 0, 0, 1],
    [1, 3, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ]);
  const [maxCommandSize, setMaxCommandSize] = React.useState<number>(8);
  const [command, setCommand] = React.useState<CommandType[]>(
    Array(maxCommandSize).fill(initCommandData)
  );
  const [pos, setPos] = React.useState<Position>({
    x: 0,
    y: 0,
  });

  // const [command, setCommand] = React.useState<CommandType[]>([
  //   {
  //     act: "MOVE",
  //     condition: "NONE",
  //   },
  //   {
  //     act: "TURN_LEFT",
  //     condition: "IF_BLUE",
  //   },
  // ]);
  const [selectIdx, setSelectIdx] = React.useState<number>(0);

  const decryption = (code: number): RoadType => {
    switch (code) {
      case 0:
        return "none";
      case 1:
        return "wall";
      case 3:
        return "yellow";
      case 4:
        return "blue";
    }
    return "wall";
  };

  return (
    <GameContainer>
      <h2>ROUND 1</h2>

      <GameBoard>
        {map.map((v, yIdx) => {
          return (
            <GameBoardRow>
              {v.map((el, xIdx) => {
                return (
                  <Road key={`${yIdx}-${xIdx}`} variant={decryption(el)}></Road>
                );
              })}
            </GameBoardRow>
          );
        })}
      </GameBoard>

      <GameFeature>
        <Feature />
      </GameFeature>

      <GameCommand>
        <CommandFunction>
          <Function>
            <IconHexagonNumber0 strokeWidth={1} width={32} height={32} />
          </Function>
          {command.map((c, idx) => {
            return (
              <Command
                key={`k-${idx}`}
                variant={c}
                select={idx === selectIdx}
                onClick={() => {
                  setSelectIdx(idx);
                }}
              />
            );
          })}
        </CommandFunction>
      </GameCommand>

      <GamePlayer>
        <Button>
          <IconPlayerPlayFilled />
        </Button>
        <Button>
          <IconRefresh />
        </Button>
      </GamePlayer>
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
const GameBoard = styled.div``;

const GameBoardRow = styled.div`
  height: 2.5rem;
  margin: 2px 0px;
`;

const GameFeature = styled.div``;

const GameCommand = styled.div``;

const CommandFunction = styled.div`
  display: flex;
  background: #ddd;
  padding: 0.675rem 1.5rem 1rem 0.5rem;
  border-radius: 0.5rem;
  align-items: center;
`;
const Function = styled.div`
  margin: 0.75rem 0.5rem 0rem 0.5rem;
`;

const GamePlayer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
