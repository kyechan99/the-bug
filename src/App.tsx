import React from "react";

import { Road } from "./components/Road/Road";
import "./styles/yuri-grid.scss";
import { Button } from "./components/common/Button/Button";
import styled from "styled-components";
import { H1 } from "./components/common/Heading/Heading";

function App() {
  // const [mapData, setMapData] = React.useState<Number>();
  const arr = [
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ];

  return (
    <AppContainer className="App container-sm">
      <Hero>
        <H1>TRAIN</H1>
        <p>asdfasdf</p>
      </Hero>
      <MenuList>
        <Button>Story Mode</Button>
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
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;

  top: 30%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -30%);
`;

const Hero = styled.div`
  margin-bottom: 3rem;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
