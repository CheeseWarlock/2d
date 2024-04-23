import GeometryObject from "./GeometryObject.js";
import GameObject from "./IGameObject.js";
import Player from "./Player.js";

export default class World {
  objects: GameObject[] = [];

  get geometryObjects(): GeometryObject[] {
    return this.objects.filter(obj => obj instanceof GeometryObject) as GeometryObject[];
  }

  get players(): Player[] {
    return this.objects.filter(obj => obj instanceof Player) as Player[]; 
  }

  update() {
    this.objects.forEach(obj => obj.tick());
  }
}