import { Vector2 } from "../../types/Vectors.js";
import Collider2D from "./Collider2D.js";
import Node2D from "./Node2D.js";

export default class extends Node2D {
  constructor(name) {
    super(name);
    this.velocity = new Vector2(0, 1);
    this.collider = null;
  }

  addChild(child) {
    super.addChild(child);
    if (child instanceof Collider2D) {
      this.collider = child;
    }
  }

  // physic_process(delta) {
  //   this.velocity.y += 10;
  //   this.position = this.position.add(this.velocity.mul(delta));
  // }
}
