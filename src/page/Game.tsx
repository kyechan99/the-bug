import React from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";

import { initCommandData } from "@type/command";
import GameFeature from "@components/Game/GameFeature";
import { commandState, mapState, playerState } from "@recoil/game/atom";
import GameController from "@components/Game/GameController";
import GameBoard from "@components/Game/GameBoard";
import GameCompiler from "@components/Game/GameCompiler";

import mapFile from "../data/example.json";

const Game = () => {
  const [maxCommandSize, setMaxCommandSize] = React.useState<number>(8);
  const setMap = useSetRecoilState(mapState);
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
    console.log(data);
    
    setMaxCommandSize(data.function[0].limit);
    setMap(data.map);
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
