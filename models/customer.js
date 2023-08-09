import { Person } from "./person.js";

export class Customer extends Person {
  constructor(name, address, id, email, type, company, invoiceValue, evaluate) {
    super(name, address, id, email, type);

    this.company = company;
    this.invoiceValue = invoiceValue;
    this.evaluate = evaluate;
  }
}
