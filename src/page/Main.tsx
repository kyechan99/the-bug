import React from "react";
import styled from "styled-components";

import { Button } from "@common/Button/Button";
import { H1 } from "@common/Heading/Heading";
import { Link } from "react-router-dom";
import { IconBrandGithub, IconBug } from "@tabler/icons-react";
import { levels } from "@utils/data";

const Main = () => {
  const [openLevel, setOpenLevel] = React.useState<boolean>(false);

  return (
    <div>
      <Hero>
        <H1>
          THE <IconBug /> BUG
        </H1>
      </Hero>
      <MenuList>
        <Link to="/game/practice">
          <Button variant="primary">Practice Mode</Button>
        </Link>
        {/* TODO : Random Mode */}
        {/* <Link to="/game/random">
          <Button variant="primary">Random Mode</Button>
        </Link> */}
        <LevelBlock>
          <Button variant="secondary" onClick={() => setOpenLevel(!openLevel)}>
            Level Mode
          </Button>
          {openLevel && (
            <LevelLink>
              {Object.keys(levels).map((level) => (
                <Link to={`/game/${level}`} key={level}>
                  <Button>{level.replace("level_", "")}</Button>
                </Link>
              ))}
            </LevelLink>
          )}
        </LevelBlock>
        <Link to="/editor">
          <Button variant="transparent">Editor</Button>
        </Link>
        <Link to="https://github.com/kyechan99/the-bug" target="_blank">
          <Button withIcon>
            <IconBrandGithub className="" />
          </Button>
        </Link>
        <SubMessage>Used <Link to="https://github.com/tabler/tabler-icons" target="_blank">Tabler-icons</Link></SubMessage>
      </MenuList>
    </div>
  );
};

export default Main;

const Hero = styled.div`
  margin-bottom: 3rem;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LevelBlock = styled.div`
  position: relative;
`;
const LevelLink = styled.div`
  position: absolute;
  top: 0;
  left: 8rem;
  display: flex;
  gap: 0.25rem;
`;

const SubMessage = styled.span`
  color: ${({ theme }) => theme.colors.grey};
  a {
    color: ${({ theme }) => theme.colors.grey};
  }
`;