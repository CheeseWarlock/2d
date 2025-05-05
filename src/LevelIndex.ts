import ILevelFormat from "./types";
import TeachesPhoto from "./levels/TeachesPhoto";
import jump from "./levels/Jump.json";
import TeachesJump from "./levels/TeachesJump.json";
import DodgeThings from "./levels/DodgeThings.json";
import EndingScreen from "./levels/EndingScreen";
import ShowsRotation from "./levels/ShowsRotation";
import TeachesTimer from "./levels/TeachesTimer";

export const GAME_LEVELS: ILevelFormat[] = [
  TeachesPhoto,
  TeachesJump,
  ShowsRotation,
  TeachesTimer,
  jump,
  DodgeThings,
  EndingScreen,
];
