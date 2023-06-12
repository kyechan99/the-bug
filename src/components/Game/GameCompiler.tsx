import { useRecoilState } from "recoil";
import styled from "styled-components";
import { commandState, curCommandState } from "@recoil/game/atom";
import Command from "@common/Button/Command";
import { IconHexagonNumber0 } from "@tabler/icons-react";

const GameCompiler = () => {
  const [curCommand, setCurCommand] = useRecoilState(curCommandState);
  const [command, setCommand] = useRecoilState(commandState);
  
  return (
    <CompilerStyled>
      <Function>
        <IconHexagonNumber0 strokeWidth={1} width={32} height={32} />
      </Function>
      {command.map((c, idx) => {
        return (
          <Command
            key={`cmd-${idx}`}
            variant={c}
            select={idx === curCommand}
            onClick={() => {
              setCurCommand(idx);
            }}
          />
        );
      })}
    </CompilerStyled>
  );
};

export default GameCompiler;

const CompilerStyled = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.grey};
  padding: 0.675rem 1.5rem 1rem 0.5rem;
  border-radius: 0.5rem;
  align-items: center;
`;

const Function = styled.div`
  margin: 0.75rem 0.5rem 0rem 0.5rem;
`;
