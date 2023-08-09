import { Person } from "./person.js";

export class Employee extends Person {
  constructor(name, address, id, email, type, workingDays, salaryPerDay) {
    super(name, address, id, email, type);

    this.workingDays = Number(workingDays);
    this.salaryPerDay = Number(salaryPerDay);
  }

  totalSalary() {
    console.log(this.salaryPerDay);
    console.log(this.workingDays);
    return this.workingDays * this.salaryPerDay;
  }
}
