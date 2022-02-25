import { Node2D } from "./Node2D.js";

export class RigidBody2D extends Node2D {
  constructor(name) {
    super(name);
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  move(vector2) {
    this.position = this.position.add(vector2);
  }
}
