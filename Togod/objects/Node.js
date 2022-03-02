import { observer } from "../index.js";

export default class {
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
    this.id = observer.addObserver(this);
  }

  addChild(child) {
    child.parent = this;
    this.childs.push(child);
  }
}
