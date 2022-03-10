import Node2D from "./Node2D.js";

export default class Text2D extends Node2D {
  /**
   *
   * @param {string} name
   * @param {{child: Node2D, color: string, x: number, y: number, width: number, heigth: number}} options
   */
  constructor(name) {
    super(name);
    this.fontSize = 15;
    this.color = "";
    this._string = "";
  }

  set string(string) {
    this._string = string.toString();
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = `${this.fontSize}`;
    ctx.fillText(this._string, this.position.x, this.position.y + 10);
  }
}
