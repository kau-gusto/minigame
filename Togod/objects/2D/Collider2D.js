import { colliders } from "../../index.js";
import Node2D from "./Node2D.js";

export default class extends Node2D {
  constructor(name) {
    super(name);
    this.idCollider = colliders.addCollider(this);
  }
}
