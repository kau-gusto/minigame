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
    const temp = new Vector2(this.x, this.y);
    if (temp.x !== final_vector.x) {
      if (temp.x < final_vector.x) {
        const calcX =
          calc > final_vector.x - temp.x ? final_vector.x - temp.x : calc;
        temp.x += calcX;
      } else if (temp.x > final_vector.x) {
        const calcX =
          calc > temp.x - final_vector.x ? temp.x - final_vector.x : calc;
        temp.x -= calcX;
      }
    }
    if (temp.y !== final_vector.y) {
      if (temp.y < final_vector.y) {
        const calcY =
          calc > final_vector.y - temp.y ? final_vector.y - temp.y : calc;
        temp.y += calcY;
      } else if (temp.y > final_vector.y) {
        const calcY =
          calc > temp.y - final_vector.y ? temp.y - final_vector.y : calc;
        temp.y -= calcY;
      }
    }
    return temp;
  }
}

export function vector2(x, y) {
  return new Vector2(x, y);
}
