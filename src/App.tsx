import React from "react";

import { Road } from "./components/Road/Road";
import "./styles/yuri-grid.scss";
import { Button } from "./components/common/Button/Button";
import styled from "styled-components";
import { H1 } from "./components/common/Heading/Heading";
import Main from "./page/Main";
import Game from "./page/Game";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "game",
    element: <Game />,
  },
]);

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
      <RouterProvider router={router} />
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
