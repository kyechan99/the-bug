import { RoadType } from "@type/road";
import React from "react";
import styled, { css } from "styled-components";

interface RoadProps {
  variant: RoadType;
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
  none: css`
    background: ${({ theme }) => theme.colors.bg};
  `,
  wall: css`
    background: ${({ theme }) => theme.colors.grey};
    opacity: 0.5;
  `,
  yellow: css`
    background: ${({ theme }) => theme.colors.primary};
  `,
  blue: css`
    background: ${({ theme }) => theme.colors.secondary};
  `,
};

const RoadStyled = styled.div<RoadProps>`
  margin: 0px;
  width: 2.5rem;
  height: 2.5rem;
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
