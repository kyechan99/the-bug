import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { mapState } from "@recoil/game/atom";

import { Road } from "./Road";
import { roadDecryption } from "@utils/data";
import { posFormat } from "@utils/format";
import Food, { EmptyFood } from "./Food";
import { Roads } from "@type/road";
import Label from "@common/Form/Label";

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
      <EditMenus>
        <Label>Road Type :</Label>
        {
          Roads.map(road =>
            <Road
              key={road}
              id={posFormat(-1, -1)}
              onClick={() => { selectRoad(road) }}
              variant={road}
              className={curRoadType === road ? 'select' : ''}
            />
          )
        }
        <Road
          id={posFormat(-1, -1)}
          onClick={() => { selectRoad("food") }}
          variant={"none"}
          className={curRoadType === 'food' ? 'select' : ''}
        >
          <Food />
        </Road>
        <Road
          id={posFormat(-1, -1)}
          onClick={() => { selectRoad("empty_food") }}
          variant={"none"}
          className={curRoadType === 'empty_food' ? 'select' : ''}
        >
          <EmptyFood />
        </Road>
      </EditMenus>

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

const EditMenus = styled.div`
  margin-bottom: 1rem;
`;

const GameBoardStyled = styled.div``;

const GameBoardRow = styled.div`
  height: 2.5rem;
  margin: 2px 0px;
`;
