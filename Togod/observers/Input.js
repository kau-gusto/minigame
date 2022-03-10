export default class Input {
  static init(observer) {
    Input.observer = observer;
    Input.keys = {};

    window.onkeydown = (e) => {
      Input.addKey(e.key);
      Input.observer.notify("input", e);
    };
    window.onmousemove = (e) => {
      Input.observer.notify("input", e);
    };
    window.onmousedown = (e) => {
      Input.observer.notify("input", e);
    };
    window.onmouseup = (e) => {
      Input.observer.notify("input", e);
    };
    window.onkeyup = (e) => {
      Input.deleteKey(e.key);
    };
    window.onblur = () => {
      Input.keys = [];
    };
  }

  static addKey(key) {
    if (!(key in Input.keys)) {
      Input.keys[key] = true;
    }
  }

  static deleteKey(key) {
    if (key in Input.keys) {
      delete Input.keys[key];
    }
  }

  static isKeyPressed(key) {
    if (key in Input.keys) {
      return true;
    }
    return false;
  }

  static isJustKeyPressed(key) {
    if (key in Input.keys && Input.keys[key]) {
      Input.keys[key] = false;
      return true;
    }
    return false;
  }
}
