import { RoadType } from "@type/road";
import React from "react";
import styled, { css } from "styled-components";
import { useRecoilState } from "recoil";
import { playerState, roadState } from "@recoil/game/atom";
import Player from "./Player";

type RaodStyledProps = {
  variant: RoadType;
};

type RoadProps = RaodStyledProps & {
  id: string;
  children?: React.ReactNode;
};

export const Road = ({ id, variant, children }: RoadProps) => {
  const [road, setRoad] = useRecoilState(roadState(id));
  const [player, setPlayer] = useRecoilState(playerState);

  return (
    <RoadStyled variant={variant} className="road">
      {id === `${player.y}-${player.x}` ? <Player /> : <></>}
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
  ${(props) => {
    return VARIANTS[props.variant];
  }}
`;
