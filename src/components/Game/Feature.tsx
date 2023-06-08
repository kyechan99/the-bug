import {
  IconArrowUp,
  IconCornerUpLeft,
  IconCornerUpRight,
  IconEye,
} from "@tabler/icons-react";
import { conditionType, conditionList, actType } from "@type/command";
import styled, { css } from "styled-components";

type ActFeatureType = {
  code: actType;
  icon: React.ReactNode;
};

const Feature = () => {
  const actList: ActFeatureType[] = [
    {
      code: "MOVE",
      icon: <IconArrowUp />,
    },
    {
      code: "TURN_LEFT",
      icon: <IconCornerUpLeft />,
    },
    {
      code: "TURN_RIGHT",
      icon: <IconCornerUpRight />,
    },
  ];

  return (
    <div>
      <div>
        {actList.map((a) => (
          <ActButton>{a.icon}</ActButton>
        ))}
      </div>
      <div>
        {conditionList.map((a) => (
          <ConditionButton variant={a}>
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
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.bg};
  flex-basis: 100%;
  border-radius: 0.125rem;
  margin: 1px 1px 4px 1px;
  box-shadow: 0px 3px 0 0 ${({ theme }) => theme.colors.black};
  transition: .3s;
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
