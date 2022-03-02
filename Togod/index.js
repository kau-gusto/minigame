import Colliders from "./observers/Colliders.js";
import Observer from "./observers/Observer.js";

export const observer = new Observer();
export const colliders = new Colliders();

function render(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  observer.notify("render", ctx);
  requestAnimationFrame(() => {
    render(canvas, ctx);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let startPhysics = Date.now();
let deltaPhysics = Date.now() - startPhysics;
let frameRate = 1000 / 24;
async function physicProcess() {
  deltaPhysics = Date.now() - startPhysics;
  startPhysics = Date.now();
  observer.notify("physic_process", deltaPhysics / 1000);
  await sleep(frameRate - deltaPhysics);
  requestAnimationFrame(physicProcess);
}

let startProcess = Date.now();
let deltaProcess = Date.now() - startProcess;
function process() {
  deltaProcess = Date.now() - startProcess;
  startProcess = Date.now();
  observer.notify("process", deltaProcess / 1000);
  requestAnimationFrame(process);
}

export function init(canvas, ctx) {
  render(canvas, ctx);
  physicProcess();
  process();
}
