export default class Observer {
  static init() {
    Observer.observers = {};
  }

  static addObserver(obj) {
    const id = Math.random();
    Observer.observers[id] = obj;
    return id;
  }

  static removeObserver(id) {
    delete this.observers[id];
  }

  static notify(event, ...args) {
    Object.values(Observer.observers).forEach((obj) => {
      if (event in obj) {
        obj[event](...args);
      }
      if ("_" + event in obj) {
        obj["_" + event](...args);
      }
    });
  }
}
