import styled, { css } from "styled-components";
import { IconCandy, IconCandyOff } from "@tabler/icons-react";

const Food = () => {
    return (
        <FoodStyled>
            <IconCandy width={16} height={16} />
        </FoodStyled>
    )
}

export const EmptyFood = () => {
    return (
        <FoodStyled>
            <IconCandyOff width={16} height={16} />
        </FoodStyled>
    )
}

export default Food;

const FoodStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
