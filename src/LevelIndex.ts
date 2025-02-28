import multiShapeLevel from "./levels/Face";
import canyonLevel from "./levels/Face";
import ILevelFormat from "./levels/ILevelFormat";
import TeachesPhoto from "./levels/TeachesPhoto";
import newFace from "./levels/NewFace.json";
import jump from "./levels/Jump.json";
import TeachesJump from "./levels/TeachesJump.json";
import DodgeThings from "./levels/DodgeThings.json";
import EndingScreen from "./levels/EndingScreen";

export const GAME_LEVELS: ILevelFormat[] = [
  TeachesPhoto,
  TeachesJump,
  jump,
  DodgeThings,
  newFace,
  multiShapeLevel,
  canyonLevel,
  EndingScreen,
];
