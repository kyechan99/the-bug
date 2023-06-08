import {
  IconArrowUp,
  IconCornerUpLeft,
  IconCornerUpRight,
} from "@tabler/icons-react";
import { CommandType } from "@type/command";
import React from "react";
import styled, { css } from "styled-components";

interface CommandProps {
  variant: CommandType;
  select?: boolean;
  onClick: (e: any) => void;
  children?: React.ReactNode;
}

export const Command = ({ variant, select, onClick }: CommandProps) => {
  const CommandIcon = () => {
    switch (variant.act) {
      case "MOVE":
        return <IconArrowUp />;
      case "TURN_LEFT":
        return <IconCornerUpLeft />;
      case "TURN_RIGHT":
        return <IconCornerUpRight />;
      default:
        return <></>;
    }
  };
  return (
    <CommandStyled
      variant={variant}
      className={`Command ${select ? "select" : ""}`}
      onClick={onClick}
    >
      {CommandIcon()}
    </CommandStyled>
  );
};

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

const CommandStyled = styled.div<CommandProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.primary};
  flex-basis: 100%;
  border-radius: 0.125rem;
  margin: 1px;

  ${(props) => {
    return VARIANTS[props.variant.condition];
  }}


  box-shadow: none;
  transform: translate(3px, 3px);
  
  &.select {
    box-shadow: 0px 3px 0 0 ${({ theme }) => theme.colors.black};
    &:after {
      content: "^";
      position: absolute;
      bottom: -1.5rem;
    }
  }
`;
