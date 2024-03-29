import React from "react";
import styled, { css } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { foodState, playerState } from "@recoil/game/atom";

import Player from "./Player";
import Food from "./Food";

import { posFormat } from "@utils/format";
import { RoadType } from "@type/road";

type RaodStyledProps = {
  onClick?: () => void;
  variant: RoadType;
};

type RoadProps = RaodStyledProps & {
  id: string;
  className?: string;
  children?: React.ReactNode;
};

export const Road = ({ id, className, variant, onClick, children }: RoadProps) => {
  const player = useRecoilValue(playerState);
  const food = useRecoilValue(foodState);

  return (
    <RoadStyled variant={variant} onClick={onClick}
      className={`road ${className ? className : ''}`}>
      <RoadWrapper>
        {id === posFormat(player.x, player.y) ? (
          <Player />
        ) : food[id] ? (
          <Food />
        ) : (
          children
        )}
      </RoadWrapper>
    </RoadStyled>
  );
};

const VARIANTS = {
  none: css`
    background: ${({ theme }) => theme.colors.bg};
  `,
  wall: css`
    background: ${({ theme }) => theme.colors.grey};
  `,
  yellow: css`
    background: ${({ theme }) => theme.colors.primary};
  `,
  blue: css`
    background: ${({ theme }) => theme.colors.secondary};
  `,
};

const RoadStyled = styled.div<RaodStyledProps>`
  margin: 0px;
  width: 2.5rem;
  height: 2.5rem;
  display: inline-block;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.primary};
  flex-basis: 100%;
  border-radius: 0.125rem;
  margin: 1px;
  &.select {
    box-shadow: 0px 3px 0 0 ${({ theme }) => theme.colors.black};
  }
  ${(props) => {
    return VARIANTS[props.variant];
  }}
  ${(props) => {
    if (props.onClick) return css`cursor: pointer`;
  }}
`;

const RoadWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
