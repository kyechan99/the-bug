import React from "react";
import styled, { css } from "styled-components";

interface RoadProps {
  variant: "abled" | "disabled" | "goal" | "start";
  children?: React.ReactNode;
}

export const Road = ({ variant, children }: RoadProps) => {
  return (
    <RoadStyled variant={variant} className="road">
      {children}
    </RoadStyled>
  );
};

const VARIANTS = {
  abled: css`
    background: ${({ theme }) => theme.colors.bg};
  `,
  disabled: css`
    background: ${({ theme }) => theme.colors.grey};
    opacity: 0.5;
  `,
  start: css`
    background: ${({ theme }) => theme.colors.primary};
  `,
  goal: css`
    background: ${({ theme }) => theme.colors.secondary};
  `,
};

const RoadStyled = styled.div<RoadProps>`
  margin: 0px;
  width: 2rem;
  height: 2rem;
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.primary};
  flex-basis: 100%;
  border-radius: 0.125rem;
  margin: 1px;
  ${(props) => {
    return VARIANTS[props.variant];
  }}
`;
