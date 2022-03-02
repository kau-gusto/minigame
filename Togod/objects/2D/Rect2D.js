import Node2D from "./Node2D.js";

export default class extends Node2D {
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
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.y, this.size.x);
  }
}
