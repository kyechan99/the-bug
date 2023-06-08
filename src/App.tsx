import React from "react";

import { Road } from "./components/Game/Road";
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
