const Employee = require('../lib/employee');

class Manager extends Employee {
  constructor(firstName, lastName, id, email, officeNumber) {
    super(firstName, lastName, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    return this.role = "Manager";
  }

  getIcon() {
    return this.icon = "fa-mug-hot";
  }

  getShowHide() {
    return this.showHide = ["", "hide", "hide"];
  }
}

// const amanda = new Manager('amanda', 'black', 25, 'a@a.com', 1);
// amanda.getRole();
// console.log(amanda.getName());

module.exports = Manager;