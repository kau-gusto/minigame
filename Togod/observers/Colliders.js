export default class Colliders {
  static init() {
    Colliders.colliders = {};
  }

  static addCollider(obj) {
    const id = Math.random();
    Colliders.colliders[id] = obj;
    return id;
  }

  static removeCollider(id) {
    delete Colliders.colliders[id];
  }

  static testColliding(testCollider, id) {
    return Object.entries(Colliders.colliders).filter(([index, collider]) => {
      if (index == id) {
        return false;
      }
      if (
        testCollider.rigth > collider.left &&
        testCollider.left < collider.rigth &&
        testCollider.botton > collider.top &&
        testCollider.top < collider.botton
      ) {
        if ("colide" in collider.parent) {
          collider.parent.collide(testCollider);
        }
        return true;
      }
    });
  }
}
