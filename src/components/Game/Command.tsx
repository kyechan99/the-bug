import React from "react";
import styled, { css } from "styled-components";

import { ActIcon } from "@common/Icon";
import { CommandType } from "@type/command";

interface CommandProps {
  variant: CommandType;
  select?: boolean;
  onClick: (e: any) => void;
  children?: React.ReactNode;
}

export const Command = ({ variant, select, onClick }: CommandProps) => {
  return (
    <CommandStyled
      variant={variant}
      className={`Command ${select ? "select" : ""}`}
      onClick={onClick}
    >
      <ActIcon icon={variant.act} />
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

const CommandStyled = styled.button<CommandProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
  width: 2.5rem;
  height: 2.5rem;
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
