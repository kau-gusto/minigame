import Observer from "../observers/Observer.js";

export default class Node {
  constructor(name) {
    /**
     * @type {string}
     */
    if (name) {
      this.name = name;
    } else {
      this.name = this.constructor.name;
    }
    /**
     * @type {Object<Node_>}
     */
    this.childs = {};
    /**
     * @type {Node_}
     */
    this.parent = null;
    this.three = null;
  }

  ready(three) {
    this.three = three;
    if (three) {
      this.id = Observer.addObserver(this);
      Object.values(this.childs).forEach((child) => {
        child.ready(this.three);
        if ("_" + "ready" in child) {
          child._ready();
        }
      });
    }
    if ("_" + "ready" in this) {
      this._ready();
    }
  }

  queueFree() {
    this.three.observer.removeObserver(this.id);
    Object.values(this.childs).forEach((child) => {
      child.queueFree();
      if ("_" + "queue" in child) {
        child._queue();
      }
      if ("__" + "queue" in child) {
        child.__queue();
      }
    });
  }

  /**
   * @param {{name: string}} child
   */
  addChild(child) {
    child.parent = this;
    if (this.three) {
      child.ready(this.three);
    }
    const numRegex = /[0-9]*$/;
    let lastNum = parseInt(numRegex.exec(child.name)[0]);
    let lastName = child.name;
    if (lastNum) {
      lastName = child.name + lastNum;
    }
    while (lastName in this.childs) {
      if (!lastNum) {
        lastNum = 0;
      }
      child.name.replace(lastNum, lastNum + 1);
      lastName = child.name + lastNum;
      lastNum += 1;
    }
    this.childs[lastName] = child;
  }
}
