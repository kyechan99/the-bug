import React from "react";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./styles/yuri-grid.scss";

import Main from "./page/Main";
import Game from "./page/Game";
import Editor from "./page/Editor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "editor",
    element: <Editor />,
  },
  {
    path: "game/:mode",
    element: <Game />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <AppContainer className="App container-sm">
        <RouterProvider router={router} />
      </AppContainer>
    </RecoilRoot>
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
