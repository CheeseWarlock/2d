import ILevelFormat from "./types";
import TeachesPhoto from "./levels/TeachesPhoto";
import jump from "./levels/Jump.json";
import TeachesJump from "./levels/TeachesJump.json";
import DodgeThings from "./levels/DodgeThings.json";
import EndingScreen from "./levels/EndingScreen";
import ShowsRotation from "./levels/ShowsRotation";
import TeachesTimer from "./levels/TeachesTimer";
import TeachesFov from "./levels/TeachesFov";
import TeachesTiming from "./levels/TeachesTiming";
import TeachesJumpCap from "./levels/TeachesJumpCap";

export const GAME_LEVELS: ILevelFormat[] = [
  TeachesPhoto,
  TeachesFov,
  TeachesJump,
  TeachesJumpCap,
  TeachesTiming,
  ShowsRotation,
  TeachesTimer,
  jump,
  DodgeThings,
  EndingScreen,
];
