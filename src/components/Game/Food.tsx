import styled, { css } from "styled-components";
import { IconCandy, IconCandyOff } from "@tabler/icons-react";

const Food = () => {
    return (
        <IconCandy width={16} height={16} />
    )
}

export const EmptyFood = () => {
    return (
        <IconCandyOff width={16} height={16} />
    )
}

export default Food;
