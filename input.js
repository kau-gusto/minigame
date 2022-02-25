export class Input {
  constructor(observer) {
    this.observer = observer;
    this.keys = {};

    window.onkeydown = (e) => {
      this.addKey(e.key);
      this.observer.notify("input", e);
    };
    window.onmousemove = (e) => {
      this.observer.notify("input", e);
    };
    window.onmousedown = (e) => {
      this.observer.notify("input", e);
    };
    window.onmouseup = (e) => {
      this.observer.notify("input", e);
    };
    window.onkeyup = (e) => {
      this.deleteKey(e.key);
    };
  }

  addKey(key) {
    if (!(key in this.keys)) {
      this.keys[key] = true;
    }
  }

  deleteKey(key) {
    if (key in this.keys) {
      delete this.keys[key];
    }
  }

  isKeyPressed(key) {
    if (key in this.keys) {
      return true;
    }
    return false;
  }

  isJustKeyPressed(key) {
    if (key in this.keys && this.keys[key]) {
      this.keys[key] = false;
      return true;
    }
    return false;
  }
}
