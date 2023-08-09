export class ListPerson {
  listPerson = [];

  add = (person) => {
    this.listPerson = [...this.listPerson, person];
  };

  delete = (id) => {
    const index = this.listPerson.findIndex((element, index, array) => {
      return element.id === id;
    });
    this.listPerson.splice(index, 1);
  };

  findById = (id) => {
    return this.listPerson.find((element) => {
      return element.id === id;
    });
  };

  update(person) {
    const index = this.listPerson.findIndex((element) => {
      return element.id === person.id;
    });
    this.listPerson[index] = person;
  }

  filterByType(type) {
    const data = this.listPerson.filter((element) => {
      if (type === "all") {
        return true;
      }
      return element.type === type;
    });
    return data;
  }
}
