import { commandState, curCommandState } from "@recoil/game/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  IconArrowUp,
  IconCornerUpLeft,
  IconCornerUpRight,
  IconEye,
  IconHexagonNumber0,
} from "@tabler/icons-react";
import { conditionType, conditionList, actType, actList } from "@type/command";
import styled, { css } from "styled-components";
import { ActIcon } from "@common/Icon";

type ActFeatureType = {
  code: actType;
  icon: React.ReactNode;
};

const Feature = () => {
  const [command, setCommand] = useRecoilState(commandState);
  const curCommand = useRecoilValue(curCommandState);

  const actHandler = (code: actType) => {
    const newStateArray = [...command];
    newStateArray[curCommand] = {
      ...newStateArray[curCommand],
      act: code,
    };

    setCommand(newStateArray);
  };

  const conditionHandler = (condition: conditionType) => {
    const newStateArray = [...command];
    newStateArray[curCommand] = {
      ...newStateArray[curCommand],
      condition: condition,
    };

    setCommand(newStateArray);
  };

  return (
    <div>
      <div>
        {actList.map((a) => (
          <ActButton
            key={a}
            onClick={() => {
              actHandler(a);
            }}
          >
            <ActIcon icon={a}></ActIcon>
          </ActButton>
        ))}
      </div>
      <div>
        {conditionList.map((con) => (
          <ConditionButton
            key={con}
            variant={con}
            onClick={() => {
              conditionHandler(con);
            }}
          >
            <IconEye />{" "}
          </ConditionButton>
        ))}
      </div>
    </div>
  );
};

export default Feature;

const FeatureButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.bg};
  flex-basis: 100%;
  border-radius: 0.125rem;
  margin: 1px 1px 4px 1px;
  box-shadow: 0px 3px 0 0 ${({ theme }) => theme.colors.black};
  transition: 0.3s;
  &:hover {
    box-shadow: none;
    transform: translate(0px, 3px);
  }
`;
const ActButton = styled(FeatureButton)``;

const VARIANTS = {
  NONE: css`
    background: ${({ theme }) => theme.colors.bg};
  `,
  IF_YELLOW: css`
    background: ${({ theme }) => theme.colors.primary};
  `,
  IF_BLUE: css`
    background: ${({ theme }) => theme.colors.secondary};
  `,
};
const ConditionButton = styled(FeatureButton)<{ variant: conditionType }>`
  ${(props) => {
    return VARIANTS[props.variant];
  }}
`;
