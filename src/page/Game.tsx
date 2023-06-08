import React from "react";
import styled from "styled-components";

import { Road } from "@components/Game/Road";
import { Command } from "@components/Game/Command";
import { CommandType } from "@type/command";
import { IconArrowUp } from "@tabler/icons-react";
import Feature from "@components/Game/Feature";

/*
  0: MOVE STRAIGHT
  
  1: TURN LEFT
  2: TURN RIGHT

  3: IF YELLOW
  4: IF BLUE

*/

const Game = () => {
  // const [mapData, setMapData] = React.useState<Number>();
  const arr = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 4, 1],
    [1, 0, 0, 0, 1],
    [1, 3, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];

  const [command, setCommand] = React.useState<CommandType[]>([
    {
      act: "MOVE",
      condition: "NONE",
    },
    {
      act: "TURN_LEFT",
      condition: "IF_BLUE",
    },
  ]);
  const [selectIdx, setSelectIdx] = React.useState<number>(0);

  const decryption = (code: number) => {
    switch (code) {
      case 0:
        return "abled";
      case 1:
        return "disabled";
      case 3:
        return "start";
      case 4:
        return "goal";
    }
    return "disabled";
  };

  return (
    <GameContainer>
      <h2>ROUND 1</h2>
      <GameBoard>
        {arr.map((v, yIdx) => {
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
      </GameCommand>
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
  height: 2rem;
  margin: 2px 0px;
`;

const GameFeature = styled.div``;

const GameCommand = styled.div``;
