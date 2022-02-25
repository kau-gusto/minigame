import { Vector2 } from "../types/Vectors.js";
import { Node_ } from "./BaseNode.js";

export class Node2D extends Node_ {
  /**
   *
   * @param {string} name
   */
  constructor(name) {
    super(name);
    /**
     * @type {Vector2}
     */
    this._position = Vector2.ZERO;
    /**
     * @type {Vector2}
     */
    this._scale = new Vector2(1, 1);
    this._size = new Vector2(1, 1);
  }

  get size() {
    return this._size.mul(this.scale);
  }

  set width(width) {
    this._size.x = width;
  }

  set heigth(heigth) {
    this._size.y = heigth;
  }

  get scale() {
    return this._scale;
  }

  set scale(vector2) {
    this._scale = vector2;
  }

  get position() {
    return this._position;
  }

  set position(vector2) {
    this._position = vector2;
    this.childs.forEach((child) => {
      child.position = child.position.add(this.position.sub(child.position));
    });
  }

  get x() {
    return this._position.x;
  }

  get y() {
    return this._position.y;
  }

  set x(x) {
    this.childs.forEach((child) => {
      child.x = child.x + this.x;
    });
    this._position.x = x;
  }

  set y(y) {
    this.childs.forEach((child) => {
      child.y = child.y + this.y;
    });
    this._position.y = y;
  }
}
