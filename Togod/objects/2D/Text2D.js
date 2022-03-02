import Node2D from "./Node2D";

export default class extends Node2D {
  /**
   *
   * @param {string} name
   * @param {{child: Node2D, color: string, x: number, y: number, width: number, heigth: number}} options
   */
  constructor(name) {
    super(name);

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
