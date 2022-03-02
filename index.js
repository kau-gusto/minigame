import KinematicBody2D from "./Togod/objects/2D/KinematicBody2D.js";
import Rect2D from "./Togod/objects/2D/Rect2D.js";
import PhysicsBody2D from "./Togod/objects/2D/PhysicsBody2D.js";
import Input from "./Togod/observers/Input.js";
import { Vector2 } from "./Togod/types/Vectors.js";
import { colliders, init, observer } from "./Togod/index.js";
import Collider2D from "./Togod/objects/2D/Collider2D.js";

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("canvas#root");
const ctx = canvas.getContext("2d");
init(canvas, ctx);
const input = new Input(observer);

class NodeBase extends KinematicBody2D {
  constructor() {
    super();
    this.direction = Vector2.ZERO;
    this.velocity = Vector2.ZERO;
    this.forceGravity = 10;
    this.gravity = 0;
  }

  _physic_process(delta) {
    this.gravity += this.forceGravity * delta;
    this.direction = Vector2.ZERO;
    if (input.isJustKeyPressed(" ") && this.is_on_floor) {
      this.gravity = -5;
    }
    if (input.isKeyPressed("a")) {
      this.direction.x -= 1;
    }
    if (input.isKeyPressed("s")) {
      this.direction.y += 1;
    }
    if (input.isKeyPressed("d")) {
      this.direction.x += 1;
    }
    this.velocity = this.velocity.move_toward(
      this.direction.normalized().mul(100 * delta),
      10 * delta
    );
    this.velocity.y = this.gravity;
    this.velocity = this.move_and_collide(this.velocity, Vector2.UP);
    this.gravity = this.velocity.y;
  }
}

const rigidBody2D = new NodeBase();
const collider = new Collider2D();
const quadrado = new Rect2D();
quadrado.color = "black";
quadrado.width = 10;
quadrado.heigth = 10;
collider.width = 10;
collider.heigth = 10;
rigidBody2D.addChild(collider);
rigidBody2D.addChild(quadrado);
rigidBody2D.position = new Vector2(20, 20);

const rigidBody2D1 = new KinematicBody2D();
const collider1 = new Collider2D();
const quadrado1 = new Rect2D();
quadrado1.color = "red";
quadrado1.width = 30;
quadrado1.heigth = 240;
collider1.heigth = 30;
collider1.width = 240;
rigidBody2D1.addChild(collider1);
rigidBody2D1.addChild(quadrado1);
rigidBody2D1.position = new Vector2(0, 400);
