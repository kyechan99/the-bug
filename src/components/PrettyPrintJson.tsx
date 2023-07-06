import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "@common/Button/Button";
import { IconBrandGithub } from "@tabler/icons-react";
import dataFileType from "@type/data";

const PrettyPrintJson = ({ data }: { data: dataFileType }) => {
    const copyData = () => {
        window.navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
            // alert("Copied !! ");
        });
    }
    return <CodeWrapper>
        <Code>{JSON.stringify(data, null, 2)}</Code>
        <CodeMenu>
            <Button onClick={copyData}>Copy</Button>
            <Link to="https://github.com/kyechan99/the-bug" target="_blank">
                <Button withIcon>
                    <IconBrandGithub className="icon icon-sm" width={18} height={18} /> Issue / PR
                </Button>
            </Link>
        </CodeMenu>
    </CodeWrapper>;
    return <div>{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}</div>;
};

export default PrettyPrintJson;

const CodeWrapper = styled.div`
    border-radius: 1rem;
    color: #000;
    overflow: auto;
    margin: 3rem 0rem 5rem 0rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.grey};
    border: 1px solid black;
`;
const Code = styled.code`
    display: block;
    margin-bottom: 1rem;
`;
const CodeMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;
