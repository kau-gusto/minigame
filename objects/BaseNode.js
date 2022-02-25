import { Vector2 } from "../types/Vectors.js";

export class Node_ {
  constructor(name) {
    /**
     * @type {string}
     */
    this.name = name;
    /**
     * @type {Array<Node_>}
     */
    this.childs = [];
    /**
     * @type {Node_}
     */
    this.parent = null;
  }
  addChild(child) {
    child.parent = this;
    this.childs.push(child);
  }

  sendEventForMe(event, ...args) {
    if ("_" + event in this) {
      this["_" + event](...args);
    }
    if ("__" + event in this) {
      this["__" + event](...args);
    }
  }

  sendEventForChilds(event, ...args) {
    this.childs.forEach((child) => {
      if (child) {
        child[event](...args);
        if ("_" + event in child) {
          child["_" + event](...args);
        }
        if ("__" + event in child) {
          child["__" + event](...args);
        }
      }
    });
  }

  render(ctx) {
    this.sendEventForMe("render", ctx);
    this.sendEventForChilds("render", ctx);
  }

  input(key, event) {
    this.sendEventForMe("input", key, event);
    this.sendEventForChilds("input", key, event);
  }

  physic_process(delta) {
    this.sendEventForMe("physic_process", delta);
    this.sendEventForChilds("physic_process", delta);
  }
}
