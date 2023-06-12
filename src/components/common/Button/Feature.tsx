import { conditionType } from "@type/command";
import styled, { css } from "styled-components";

export const FeatureButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.bg};
  flex-basis: 100%;
  border-radius: 0.125rem;
  margin: 1px 1px 4px 1px;
  box-shadow: 0px 3px 0 0 ${({ theme }) => theme.colors.black};
  transition: 0.3s;
  &:hover {
    box-shadow: none;
    transform: translate(0px, 3px);
  }
`;
export const ActButton = styled(FeatureButton)``;

const CONDITION_VARIANTS = {
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
export const ConditionButton = styled(FeatureButton)<{
  variant: conditionType;
}>`
  ${(props) => {
    return CONDITION_VARIANTS[props.variant];
  }}
`;
