import styled from "styled-components";

type HeadingProps = {
    marginTop?: string,
    marginBottom?: string,
}
export const H1 = styled.h1<HeadingProps>`
    margin-top: ${(props) => props.marginTop || '0rem'}};
    margin-bottom: ${(props) => props.marginBottom || '1rem'}};
`;
export const H2 = styled.h2<HeadingProps>`
    margin-top: ${(props) => props.marginTop || '2rem'}};
    margin-bottom: ${(props) => props.marginBottom || '0rem'}};
`;