import styled from "styled-components";

export const InputGroup = styled.div`
  margin: 0.25rem 0rem;
`;
export const InputNumber = styled.input.attrs((props) => ({
    type: "number",
    step: 1,
    min: props.min,
    max: 20,
}))`
    width: 2.75rem;
    height: 2rem;
    border: 1px solid ${({ theme }) => theme.colors.grey};
    border-radius: 0.5rem;
    text-align: center;
  `;
