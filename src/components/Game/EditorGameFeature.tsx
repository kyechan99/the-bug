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
import dataFileType from "@type/data";

type EditorGameFeatureProps = {
  data: dataFileType,
  setData: React.Dispatch<React.SetStateAction<dataFileType>>,
}

const EditorGameFeature = ({ data, setData }: EditorGameFeatureProps) => {

  const activeActHandler = (code: actType) => {
    if (code === "NONE") return;

    var array = [...data.active_command];
    var index = array.indexOf(code)
    if (index !== -1) {
      array.splice(index, 1);
      setData({ ...data, active_command: array });
    } else {
      array.push(code);
      setData({ ...data, active_command: array });
    }
  };

  const activeConditionHandler = (condition: conditionType) => {
    if (condition === "NONE") return;

    var array = [...data.active_condition];
    var index = array.indexOf(condition)
    if (index !== -1) {
      array.splice(index, 1);
      setData({ ...data, active_condition: array });
    } else {
      array.push(condition);
      setData({ ...data, active_condition: array });
    }
  };

  return (
    <div>
      <div>
        {
          actList.map((a) => (
            <ActButton
              key={a}
              className={(data.active_command.includes(a) || a === "NONE") ? "" : "disabled"}
              onClick={() => {
                activeActHandler(a);
              }}
            >
              <ActIcon icon={a}></ActIcon>
            </ActButton>
          ))
        }
      </div>
      <div>
        {conditionList
          .map((con) => (
            <ConditionButton
              key={con}
              variant={con}
              className={(data.active_condition.includes(con) || con === "NONE") ? "" : "disabled"}
              onClick={() => {
                activeConditionHandler(con);
              }}
            >
              <IconEye />{" "}
            </ConditionButton>
          ))}
      </div>
    </div>
  );
};

export default EditorGameFeature;
