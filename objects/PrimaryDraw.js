import { Node2D } from "./Node2D.js";

export class Rect2D extends Node2D {
  /**
   *
   * @param {string} name
   * @param {{child: Node2d, color: string, x: number, y: number, width: number, heigth: number}} options
   */
  constructor(name) {
    super(name);
    /**
     * @type {string}
     */
    this.color = "white";
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  __render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.y, this.size.x);
  }
}

export class Text2D extends Node2D {
  /**
   *
   * @param {string} name
   * @param {{child: Node2D, color: string, x: number, y: number, width: number, heigth: number}} options
   */
  constructor(name) {
    super(name);
    /**
     * @type {string}
     */
    this.color = "";
    this.string = "";
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  __render(ctx) {
    console.log(this.size.x);
    ctx.fillStyle = this.color;
    ctx.fillText(this.string, this.position.x, this.position.y, this.size.x);
  }
}
