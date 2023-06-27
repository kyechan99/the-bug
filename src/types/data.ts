import { actType, conditionType } from "./game";

export type functionType = {
  limit: number;
};

type dataFileType = {
  level: number;
  _level_comment?: "Game level.";

  map: number[][];
  _map_comment?: "Map data.  See /utils/data.ts";

  food: number[][];
  _food_comment?: "Set the location of food. It should be the same size as the map.";

  start_position: {
    x: number;
    y: number;
  };
  _start_position_comment?: "The coordinates the player will start with.";

  start_direction: 0 | 1 | 2 | 3;
  _start_direction_comment?: "This is the direction the player first looks.  The top left corner is (0, 0).";

  active_command: actType[];
  _active_command_comment?: "Command to activate. See /types/command.ts/actList";

  active_condition: conditionType[];
  _active_condition_comment?: "Condition to activate. See /types/command.ts/conditionList";

  function: functionType[];
  _function_comment?: "Add as many objects as the functions you want to activate. 'limit' is the maximum number of commands in the function";
};

export default dataFileType;
