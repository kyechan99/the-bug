import { IconBug } from "@tabler/icons-react";
import styled from "styled-components";

const Player = () => {
  return (
    <PlayerCharacter>
      <IconBug />
    </PlayerCharacter>
  );
};

export default Player;

const PlayerCharacter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
