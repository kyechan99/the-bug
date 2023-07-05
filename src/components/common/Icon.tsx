import {
  IconArrowUp,
  IconCornerUpLeft,
  IconCornerUpRight,
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
  IconEye,
  IconSpray,
} from "@tabler/icons-react";
import { actType, conditionType } from "@type/game";
import styled from "styled-components";

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

export const ActIcon = ({ icon }: { icon: actType }) => {
  switch (icon) {
    case "MOVE":
      return <IconArrowUp />;
    case "TURN_LEFT":
      return <IconCornerUpLeft />;
    case "TURN_RIGHT":
      return <IconCornerUpRight />;
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
  }

  if (icon[0] === 'F') {
    const fNum = parseInt(icon[1]);
    if (0 <= fNum && fNum <= icons.length) {
      const IconComponent = icons[fNum];
      return <IconComponent />;
    }
  }

  return <IconEmpty />;

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
