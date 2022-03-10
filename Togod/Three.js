import Colliders from "./observers/Colliders.js";
import Input from "./observers/Input.js";
import Observer from "./observers/Observer.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class Three {
  static init(canvas, ctx) {
    Observer.init();
    Colliders.init();
    Input.init(Observer);
    Three.observer = Observer;
    Three.colliders = Colliders;
    Three.input = Input;
    Three.canvas = canvas;
    Three.ctx = ctx;
    Three.frameRate = 1000 / 60;
    Three.scene = null;
    Three.render(Date.now());
    Three.physicProcess(Date.now());
    Three.start = Date.now();
    setInterval(() => {
      const delta = Date.now() - Three.start;
      Three.start = Date.now();
      Observer.notify("process", delta / 1000);
    }, 0.01);
  }

  static replaceScene(scene) {
    if (Three.scene) {
      Three.scene.queueFree();
    }
    Three.scene = scene;
    Three.scene.ready(Three);
  }

  static async render(start) {
    const delta = Date.now() - start;
    const start_ = Date.now();
    Three.ctx.clearRect(0, 0, Three.canvas.width, Three.canvas.height);
    Observer.notify("render", Three.ctx, delta / 1000);
    requestAnimationFrame(async () => {
      const compesation = Date.now() - start_;
      if (compesation < Three.frameRate) {
        await sleep(Three.frameRate - compesation);
      }
      Three.render(start_);
    });
  }

  static physicProcess(start) {
    const delta = Date.now() - start;
    const start_ = Date.now();
    Observer.notify("physic_process", delta / 1000);
    requestAnimationFrame(async () => {
      Three.physicProcess(start_);
    });
  }
}
