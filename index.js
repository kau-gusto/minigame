import KinematicBody2D from "./Togod/objects/2D/KinematicBody2D.js";
import Rect2D from "./Togod/objects/2D/Rect2D.js";
import PhysicsBody2D from "./Togod/objects/2D/PhysicsBody2D.js";
import Input from "./Togod/observers/Input.js";
import { Vector2 } from "./Togod/types/Vectors.js";
import Three from "./Togod/Three.js";
import Collider2D from "./Togod/objects/2D/Collider2D.js";
import Node2D from "./Togod/objects/2D/Node2D.js";
import Observer from "./Togod/observers/Observer.js";
import Text2D from "./Togod/objects/2D/Text2D.js";

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("canvas#root");
const ctx = canvas.getContext("2d");
Three.init(canvas, ctx);

class NodeBase extends KinematicBody2D {
  constructor() {
    super();
    this.direction = Vector2.ZERO;
    this.velocity = Vector2.ZERO;
    this.forceGravity = 10;
    this.gravity = 0;
    this.debugMode = false;
    this.deltaTime = 0;
  }

  _ready() {
    this.guifps = this.parent.childs["GUI"];
    this.guitime = this.parent.childs["GUI0"];
    this.guifps_ = this.parent.childs["GUI1"];
    this.guitime_ = this.parent.childs["GUI2"];
    this.guifps__ = this.parent.childs["GUI3"];
    this.guitime__ = this.parent.childs["GUI4"];
  }

  newBody() {
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
    rigidBody2D.debugMode = this.debugMode;
    rigidBody2D.deltaTime = this.deltaTime;
    this.parent.addChild(rigidBody2D);
  }

  _input(event) {
    if (!event.repeat) {
      if (event.key == "F9") {
        this.debugMode = !this.debugMode;
        this.guifps.string = "";
        this.guitime.string = "";
        this.guifps_.string = "";
        this.guitime_.string = "";
        this.guifps__.string = "";
        this.guitime__.string = "";
      }
      if (event.key == "Enter") {
        this.newBody();
        // this.queueFree();
      }
    }
  }

  _render(_, delta) {
    if (this.debugMode) {
      this.guifps.string = parseInt(1 / delta) + "fps";
    }
  }

  _physic_process(delta) {
    if (this.is_on_floor) {
      this.direction = Vector2.ZERO;
      if (Input.isKeyPressed(" ")) {
        this.gravity = -5;
      }
      if (Input.isKeyPressed("a")) {
        this.direction.x -= 1;
      }
      if (Input.isKeyPressed("d")) {
        this.direction.x += 1;
      }
      this.velocity = this.velocity.move_toward(
        this.direction.normalized().mul(100 * delta),
        10 * delta
      );
    }
    this.gravity += this.forceGravity * delta;
    this.velocity.y = this.gravity;
    this.velocity = this.move_and_collide(this.velocity, Vector2.UP);
    this.gravity = this.velocity.y;
    if (this.debugMode) {
      this.guifps_.string = parseInt(1 / delta) + "cps";
    }
  }

  _process(delta) {
    this.deltaTime += delta;
    if (this.debugMode) {
      this.guifps__.string = parseInt(1 / delta) + "pps";
      this.guitime.string = parseInt(this.deltaTime) + "s";
    }
  }
}
const node2D = new Node2D("World");
const text2D = new Text2D("GUI");
const text2D1 = new Text2D("GUI");
const text2D2 = new Text2D("GUI");
const text2D3 = new Text2D("GUI");
const text2D4 = new Text2D("GUI");
const text2D5 = new Text2D("GUI");
text2D.color = "black";
text2D.fontSize = 30;
text2D1.color = "black";
text2D1.fontSize = 30;
text2D1.x = 40;
text2D2.color = "black";
text2D2.fontSize = 30;
text2D2.y = 10;
text2D3.color = "black";
text2D3.fontSize = 30;
text2D3.x = 20;
text2D3.y = 10;
text2D4.color = "black";
text2D4.fontSize = 30;
text2D4.y = 20;
text2D5.color = "black";
text2D5.fontSize = 30;
text2D5.x = 20;
text2D5.y = 20;
node2D.addChild(text2D);
node2D.addChild(text2D1);
node2D.addChild(text2D2);
node2D.addChild(text2D3);
node2D.addChild(text2D4);
node2D.addChild(text2D5);

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
quadrado1.heigth = 120;
quadrado1.width = 640;
collider1.heigth = 120;
collider1.width = 640;
rigidBody2D1.addChild(collider1);
rigidBody2D1.addChild(quadrado1);
rigidBody2D1.position = new Vector2(0, 300);

node2D.addChild(rigidBody2D);
node2D.addChild(rigidBody2D1);

Three.replaceScene(node2D);
