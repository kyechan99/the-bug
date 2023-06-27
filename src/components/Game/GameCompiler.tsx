import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { commandState, curCommandState } from "@recoil/game/atom";

import Command from "@common/Button/Command";
import {
  IconHexagonNumber0,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconHexagonNumber6,
  IconHexagonNumber7,
  IconHexagonNumber8,
  IconHexagonNumber9,
  IconHexagonOff,
} from "@tabler/icons-react";

const icons = [
  IconHexagonNumber0,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconHexagonNumber6,
  IconHexagonNumber7,
  IconHexagonNumber8,
  IconHexagonNumber9,
];

const GameCompiler = () => {
  const [curCommand, setCurCommand] = useRecoilState(curCommandState);
  const command = useRecoilValue(commandState);

  const FunctionIcon = (idx: number) => {
    const iconProps = {
      strokeWidth: 1,
      width: 32,
      height: 32,
    };

    if (idx >= icons.length) return <IconHexagonOff {...iconProps} />;

    const IconComponent = icons[idx];
    return <IconComponent {...iconProps} />;
  };

  return (
    <CompilerStyled>
      {command.map((f, fIdx) => {
        return (
          <Function key={`fc-${fIdx}`}>
            <FunctionTitle>{FunctionIcon(fIdx)}</FunctionTitle>
            {f.map((c, cIdx) => {
              return (
                <Command
                  key={`cmd-${cIdx}`}
                  variant={c}
                  select={
                    cIdx === curCommand.idx && fIdx === curCommand.function
                  }
                  onClick={() => {
                    setCurCommand({
                      function: fIdx,
                      idx: cIdx,
                    });
                  }}
                />
              );
            })}
          </Function>
        );
      })}
    </CompilerStyled>
  );
};

export default GameCompiler;

const CompilerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Function = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.grey};
  padding: 0.5rem 1rem 0.5rem 0.25rem;
  border-radius: 0.5rem;
  align-items: center;
`;

const FunctionTitle = styled.div`
  display: inline-flex;
  padding: 0rem 0.5rem;
`;
