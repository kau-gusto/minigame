import { RigidBody2D } from "./objects/RigidBody.js";
import { Rect2D } from "./objects/PrimaryDraw.js";
import { Observer } from "./observers/observer.js";
import { Vector2 } from "./types/Vectors.js";
import { Input } from "./input.js";

const vector2 = new Vector2(1, 2);
const vector22 = new Vector2(1, 2);
const result = vector2.add(vector22);
console.log(result, vector2);

const observer = new Observer();
const input = new Input(observer);
/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("canvas#root");
const ctx = canvas.getContext("2d");

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  observer.notify("render", ctx);
  requestAnimationFrame(render);
}
render();

let start = Date.now();
let delta = Date.now() - start;
function physicProcess() {
  delta = Date.now() - start;
  observer.notify("physic_process", delta / 1000);
  start = Date.now();
  requestAnimationFrame(physicProcess);
}
physicProcess();

class NodeBase extends RigidBody2D {
  constructor() {
    super();
    this.direction = Vector2.ZERO;
  }

  _physic_process(delta) {
    // console.log(delta);
    this.direction = Vector2.ZERO;
    if (input.isKeyPressed("w")) {
      this.direction.y -= 1;
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
    const velocity = this.direction.normalized().mul(100 * delta);
    this.move(velocity);
  }
}

const rigidBody2D = new NodeBase();
const quadrado = new Rect2D();
quadrado.color = "black";
quadrado.width = 10;
quadrado.heigth = 10;
rigidBody2D.addChild(quadrado);

observer.addObserver(rigidBody2D);
