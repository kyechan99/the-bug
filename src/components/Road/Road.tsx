import React from "react";
import styled from "styled-components";

interface RoadProps {
  children: React.ReactNode;
}

export const Road = ({ children }: RoadProps) => {
  return <RoadStyled className="road col">{children}</RoadStyled>;
};

const RoadStyled = styled.div`
  margin: 0px;
  padding: 1rem;
  display: inline-block;
  background-color: ${({theme})=>theme.colors.primary};
`;
