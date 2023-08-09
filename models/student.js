import { Person } from "./person.js";

export class Student extends Person {
  constructor(name, address, id, email, type, math, physics, chemistry) {
    super(name, address, id, email, type);

    this.math = Number(math);
    this.physics = Number(physics);
    this.chemistry = Number(chemistry);
  }

  mediumScore() {
    return (this.math + this.physics + this.chemistry) / 3;
  }
}
