import React from "react";
import styled from "styled-components";

import { Button } from "@common/Button/Button";
import { H1 } from "@common/Heading/Heading";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Hero>
        <H1>TRA1IN</H1>
        <p>asdfasdf</p>
      </Hero>
      <MenuList>
        <Link to="/game">
          <Button>Story Mode</Button>
        </Link>
        <Button variant="primary">Random Mode</Button>
        <Button variant="secondary">Level Mode</Button>
        <Button variant="transparent">Make Game</Button>
      </MenuList>
      <div className="row">
        {/* {
              arr.map( (v) => {
                  return v.map(el => {
                      return <Road>{el}</Road>;
                    })
                })
            } */}
      </div>
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
