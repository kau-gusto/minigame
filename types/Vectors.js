export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(obj) {
    if (obj instanceof Vector2) {
      return new Vector2(this.x + obj.x, this.y + obj.y);
    } else if (typeof obj === "number") {
      return new Vector2(this.x + obj, this.y + obj);
    }
  }

  sub(obj) {
    if (obj instanceof Vector2) {
      return new Vector2(this.x - obj.x, this.y - obj.y);
    } else if (typeof obj === "number") {
      return new Vector2(this.x - obj, this.y - obj);
    }
  }

  mul(obj) {
    if (obj instanceof Vector2) {
      return new Vector2(this.x * obj.x, this.y * obj.y);
    } else if (typeof obj === "number") {
      return new Vector2(this.x * obj, this.y * obj);
    }
  }

  div(obj) {
    if (obj instanceof Vector2) {
      return new Vector2(this.x / obj.x, this.y / obj.y);
    } else if (typeof obj === "number") {
      return new Vector2(this.x / obj, this.y / obj);
    }
  }

  normalized() {
    const temp = this;
    var m = Math.sqrt(temp.x * temp.x + temp.y * temp.y);
    temp.x /= m == 0 ? 1 : m;
    temp.y /= m == 0 ? 1 : m;
    return temp;
  }

  static get ZERO() {
    return new Vector2(0, 0);
  }

  static get UP() {
    return new Vector2(0, 1);
  }

  static get DOWN() {
    return new Vector2(0, -1);
  }

  static get RIGHT() {
    return new Vector2(1, 0);
  }

  static get LEFT() {
    return new Vector2(-1, 0);
  }

  move_toward(final_vector, calc) {
    const temp = temp;
    calc = calc < 0 ? calc * -1 : calc;
    if (temp.x !== final_vector.x) {
      const calcX = temp.x > final_vector.x ? calc : -calc;
      temp.x = temp.x > final_vector.x ? temp.x - calcX : temp.x + calc;
    }
    if (temp.y !== final_vector.y) {
      const calcX = temp.x > final_vector.x ? calc : -calc;
      temp.x = temp.x > final_vector.x ? temp.x - calcX : temp.x + calc;
    }
    return temp;
  }
}

export function vector2(x, y) {
  return new Vector2(x, y);
}
