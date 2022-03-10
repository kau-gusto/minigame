import { Vector2 } from "../../types/Vectors.js";
import Collider2D from "./Collider2D.js";
import Node2D from "./Node2D.js";

export default class KinematicBody2D extends Node2D {
  constructor(name) {
    super(name);
    this.velocity = new Vector2(0, 1);
    this.collider = null;
    this.is_on_floor = false;
  }

  __queue() {}

  addChild(child) {
    super.addChild(child);
    if (child instanceof Collider2D) {
      this.collider = child;
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  move(vector2) {
    this.position = this.position.add(vector2);
  }

  test_move_and_collide(vector2) {
    const newPosition = this.collider.position.add(vector2);
    return {
      left: newPosition.x,
      middleHorizontal: newPosition.x + this.collider.size.x / 2,
      rigth: newPosition.x + this.collider.size.x,
      top: newPosition.y,
      botton: newPosition.y + this.collider.size.y,
      middleVertical: newPosition.y + this.collider.size.y / 2,
    };
  }

  move_and_collide(vector2, not_floor = Vector2.ZERO) {
    const stateCollider = this.test_move_and_collide(vector2);
    this.is_on_floor = false;
    this.three.colliders
      .testColliding(stateCollider, this.collider.idCollider)
      .forEach((infoCollider) => {
        const collider = infoCollider[1];

        if (vector2.x !== 0) {
          if (
            this.collider.middleHorizontal <= collider.left &&
            vector2.x > 0
          ) {
            vector2.x = collider.left - this.collider.rigth;
            if (vector2.x < 0) {
              vector2.x = 0;
            }
            if (not_floor.x > 0) {
              this.is_on_floor = true;
            }
          } else if (
            this.collider.middleHorizontal >= collider.rigth &&
            vector2.x < 0
          ) {
            vector2.x = collider.rigth - this.collider.left;
            if (vector2.x > 0) {
              vector2.x = 0;
            }
            if (not_floor.x < 0) {
              this.is_on_floor = true;
            }
          }
        }
        if (vector2.y !== 0) {
          if (this.collider.middleVertical <= collider.top && vector2.y > 0) {
            vector2.y = -(this.collider.botton - collider.top);
            if (vector2.y < 0) {
              vector2.y = 0;
            }
            if (not_floor.y > 0) {
              this.is_on_floor = true;
            }
          } else if (
            this.collider.middleVertical >= collider.botton &&
            vector2.y < 0
          ) {
            vector2.y = collider.botton - this.collider.top;
            if (vector2.y > 0) {
              vector2.y = 0;
            }
            if (not_floor.y < 0) {
              this.is_on_floor = true;
            }
          }
        }
      });
    this.move(vector2);

    return vector2;
  }
}
