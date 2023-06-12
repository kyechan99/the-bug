import React from "react";
import styled, { CSSProperties, DefaultTheme, css } from "styled-components";

const VARIANTS = {
  normal: css`
    background: ${({ theme }) => theme.colors.bg};
  `,
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
  `,
  transparent: css`
    background: transparent;
    color: black;
  `,
};

type CustomButtonProps = StyledButtonProps & {
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  variant?: "normal" | "primary" | "secondary" | "transparent";
  outline?: boolean;
  withIcon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
};
export const Button = ({
  type = "button",
  variant = "normal",
  borderRadius,
  withIcon = false,
  holding = false,
  customStyle,
  disabled,
  children,
  onClick,
}: CustomButtonProps) => {
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton
      type={type}
      disabled={disabled}
      variantStyle={variantStyle}
      holding={holding}
      borderRadius={borderRadius}
      customStyle={customStyle}
      withIcon={withIcon}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

type StyledButtonProps = {
  borderRadius?: string;
  customStyle?: any;
  holding?: boolean;
};

const StyledButton = styled.button<
  {
    variantStyle: any;
    withIcon: boolean;
  } & StyledButtonProps
>`
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.5rem 1rem;
    outline: none;

    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.black};
    border: 2px solid ${({ theme }) => theme.colors.black};
    box-shadow: 0px 3px 0 0 ${({ theme }) => theme.colors.black};

    ${(props) => {
      if (props.holding)
        return css`
          box-shadow: inset 2px 2px rgba(0, 0, 0, 123);
          transform: translate(2px, 3px);
        `;
    }}

    transition: .3s;
    &:hover {
        box-shadow: none;
        transform: translate(2px, 3px);
    }

    &:disabled,
    &[disabled] {
        background: ${({ theme }) => theme.colors.black};
        border-color ${({ theme }) => theme.colors.black};
    }

    ${(props) => props.variantStyle}
    ${(props) => props.customStyle}
    ${(props) => props.withIcon && `display: inline-flex; align-items: center;`}
    
    .icon.icon-sm { margin-right: 0.25rem; }
    .icon.icon-md { margin-right: 0.5rem; }
`;
