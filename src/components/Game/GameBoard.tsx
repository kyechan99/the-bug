import React from "react";
import styled from "styled-components";

import { useRecoilValue } from "recoil";
import { mapState } from "@recoil/game/atom";

import { Road } from "./Road";
import { roadDecryption } from "@utils/data";
import { posFormat } from "@utils/format";

const GameBoard = () => {
  const map = useRecoilValue(mapState);

  return (
    <GameBoardStyled>
      {map.map((v, yIdx) => {
        return (
          <GameBoardRow key={`row-${yIdx}`}>
            {v.map((el, xIdx) => {
              return (
                <Road
                  id={posFormat(xIdx, yIdx)}
                  key={posFormat(xIdx, yIdx)}
                  variant={roadDecryption(el)}
                ></Road>
              );
            })}
          </GameBoardRow>
        );
      })}
    </GameBoardStyled>
  );
};
export default GameBoard;

const GameBoardStyled = styled.div``;

const GameBoardRow = styled.div`
  height: 2.5rem;
  margin: 2px 0px;
`;
