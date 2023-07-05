import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { mapState } from "@recoil/game/atom";

import { Road } from "./Road";
import { roadDecryption } from "@utils/data";
import { posFormat } from "@utils/format";
import Food, { EmptyFood } from "./Food";
import { Roads } from "@type/road";

type EditorGameBoardProps = {
  setRoadType: (xIdx: number, yIdx: number, roadType: string) => void;
}

const EditorGameBoard = ({ setRoadType }: EditorGameBoardProps) => {
  const [curRoadType, setCurRoadType] = React.useState<string>('none');
  const map = useRecoilValue(mapState);

  const roadHandler = (xIdx: number, yIdx: number) => {
    setRoadType(xIdx, yIdx, curRoadType);
  }

  const selectRoad = (roadType: string) => {
    setCurRoadType(roadType);
  }

  return (
    <div>
      <div>
        <label>Road Type :</label>
        {
          Roads.map(road =>
            <Road
              key={road}
              id={posFormat(-1, -1)}
              onClick={() => { selectRoad(road) }}
              variant={road}
            />
          )
        }
        <Road
          id={posFormat(-1, -1)}
          onClick={() => { selectRoad("food") }}
          variant={"none"}
        >
          <Food />
        </Road>
        <Road
          id={posFormat(-1, -1)}
          onClick={() => { selectRoad("empty_food") }}
          variant={"none"}
        >
          <EmptyFood />
        </Road>
      </div>

      <GameBoardStyled>
        {map.map((v, yIdx) => {
          return (
            <GameBoardRow key={`row-${yIdx}`}>
              {v.map((el, xIdx) => {
                return (
                  <Road
                    onClick={() => { roadHandler(xIdx, yIdx) }}
                    id={posFormat(xIdx, yIdx)}
                    key={posFormat(xIdx, yIdx)}
                    variant={roadDecryption(el)}
                  />
                );
              })}
            </GameBoardRow>
          );
        })}
      </GameBoardStyled>

    </div>
  );
};
export default EditorGameBoard;

const GameBoardStyled = styled.div``;

const GameBoardRow = styled.div`
  height: 2.5rem;
  margin: 2px 0px;
`;
