import {
  IconArrowUp,
  IconCornerUpLeft,
  IconCornerUpRight,
  IconHexagonNumber0,
  IconEye,
  IconSpray,
} from "@tabler/icons-react";
import { actType, conditionType } from "@type/game";
import styled from "styled-components";

export const ActIcon = ({ icon }: { icon: actType }) => {
  switch (icon) {
    case "MOVE":
      return <IconArrowUp />;
    case "TURN_LEFT":
      return <IconCornerUpLeft />;
    case "TURN_RIGHT":
      return <IconCornerUpRight />;
    case "F0":
      return <IconHexagonNumber0 />;
    case "PAINTING_NONE":
      return <IconSpray />;
    case "PAINTING_YELLOW":
      return (
        <IconWrapper>
          <IconSpray color="var(--primaryColor)" />
        </IconWrapper>
      );
    case "PAINTING_BLUE":
      return (
        <IconWrapper>
          <IconSpray color="var(--secondaryColor)" />
        </IconWrapper>
      );
    default:
      return <IconEmpty />;
  }
};

export const ConditionIcon = ({ icon }: { icon: conditionType }) => {
  return <IconEye />;
};

const IconEmpty = styled.div`
  width: 24px;
  height: 24px;
`;

const IconWrapper = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 1rem;
  background-color: white;
`;
