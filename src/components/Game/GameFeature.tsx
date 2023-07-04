import { useRecoilState, useRecoilValue } from "recoil";
import {
  availableCommandState,
  commandState,
  curCommandState,
  gameState,
} from "@recoil/game/atom";
import { IconEye } from "@tabler/icons-react";
import {
  conditionType,
  conditionList,
  actType,
  actList,
  GameMode,
  CommandType,
} from "@type/game";
import { ActIcon } from "@common/Icon";
import { ActButton, ConditionButton } from "@common/Button/Feature";


const GameFeature = () => {
  const gameMode = useRecoilValue(gameState);
  const [command, setCommand] = useRecoilState(commandState);
  const availableCommand = useRecoilValue(availableCommandState);
  const curCommand = useRecoilValue(curCommandState);

  const actHandler = (code: actType) => {
    const newStateArray = [...command].map((row) => [...row]);
    newStateArray[curCommand.function][curCommand.idx] = {
      ...newStateArray[curCommand.function][curCommand.idx],
      act: code,
    };

    setCommand(newStateArray);
  };

  const conditionHandler = (condition: conditionType) => {
    const newStateArray = [...command].map((row) => [...row]);
    newStateArray[curCommand.function][curCommand.idx] = {
      ...newStateArray[curCommand.function][curCommand.idx],
      condition: condition,
    };

    setCommand(newStateArray);
  };

  return (
    <div>
      <div>
        {actList
          .filter((a) => availableCommand.includes(a))
          .map((a) => (
            <ActButton
              key={a}
              onClick={() => {
                actHandler(a);
              }}
              disabled={gameMode !== GameMode.READY}
            >
              <ActIcon icon={a}></ActIcon>
            </ActButton>
          ))}
      </div>
      <div>
        {conditionList
          .filter((con) => availableCommand.includes(con))
          .map((con) => (
            <ConditionButton
              key={con}
              variant={con}
              onClick={() => {
                conditionHandler(con);
              }}
              disabled={gameMode !== GameMode.READY}
            >
              <IconEye />{" "}
            </ConditionButton>
          ))}
      </div>
    </div>
  );
};

export default GameFeature;
