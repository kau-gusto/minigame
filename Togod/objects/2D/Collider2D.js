import { Vector2 } from "../../types/Vectors.js";
import Node2D from "./Node2D.js";

export default class Collider2D extends Node2D {
  constructor(name) {
    super(name);
    this.type = null;
    this._points = [];
  }

  ready(three) {
    if (three) {
      super.ready(three);
      this.idCollider = this.three.colliders.addCollider(this);
    }
  }

  queueFree() {
    super.queueFree();
    this.three.colliders.removeCollider(this.idCollider);
  }

  addPoint(vector2) {
    this.points.push(vector2);
    return this.points.length - 1;
  }

  get points() {
    if (Object.keys(this._points).length > 0) {
      return this._points;
    }
    if (this.type === "square") {
      return [
        new Vector2(0, 0),
        new Vector2(0, this.width),
        new Vector2(0, this.heigth),
        new Vector2(this.width, this.heigth),
      ];
    }
  }
}
