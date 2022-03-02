export default class {
  constructor() {
    this.colliders = {};
  }

  addCollider(obj) {
    const id = Math.random();
    this.colliders[id] = obj;
    return id;
  }

  removeCollider(id) {
    delete this.colliders[id];
  }

  testColliding(testCollider, id) {
    return Object.entries(this.colliders).filter(([index, collider]) => {
      if (index == id) {
        return false;
      }
      return (
        testCollider.rigth > collider.left &&
        testCollider.left < collider.rigth &&
        testCollider.botton > collider.top &&
        testCollider.top < collider.botton
      );
    });
  }
}
