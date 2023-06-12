import { useRecoilState, useRecoilValue } from "recoil";
import { commandState, curCommandState } from "@recoil/game/atom";
import { IconEye } from "@tabler/icons-react";
import { conditionType, conditionList, actType, actList } from "@type/game";
import { ActIcon } from "@common/Icon";
import { ActButton, ConditionButton } from "@common/Button/Feature";

const GameFeature = () => {
  const [command, setCommand] = useRecoilState(commandState);
  const curCommand = useRecoilValue(curCommandState);

  const actHandler = (code: actType) => {
    const newStateArray = [...command];
    newStateArray[curCommand] = {
      ...newStateArray[curCommand],
      act: code,
    };

    setCommand(newStateArray);
  };

  const conditionHandler = (condition: conditionType) => {
    const newStateArray = [...command];
    newStateArray[curCommand] = {
      ...newStateArray[curCommand],
      condition: condition,
    };

    setCommand(newStateArray);
  };

  return (
    <div>
      <div>
        {actList.map((a) => (
          <ActButton
            key={a}
            onClick={() => {
              actHandler(a);
            }}
          >
            <ActIcon icon={a}></ActIcon>
          </ActButton>
        ))}
      </div>
      <div>
        {conditionList.map((con) => (
          <ConditionButton
            key={con}
            variant={con}
            onClick={() => {
              conditionHandler(con);
            }}
          >
            <IconEye />{" "}
          </ConditionButton>
        ))}
      </div>
    </div>
  );
};

export default GameFeature;
