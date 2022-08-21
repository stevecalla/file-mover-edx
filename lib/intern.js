const Employee = require('../lib/employee');

class Intern extends Employee {
  constructor(firstName, lastName, id, email, school) {
    super(firstName, lastName, id, email);
    this.school = school;
  }

  getSchool() {
    // this.school = school;
  }

  getRole() {
    return this.role = "Intern"
  }
}

const flora = new Intern('flora', 'green', 250, 'f@f.com', 'Oxford');
flora.getRole();
flora.getSchool();

console.log(flora.getName());

module.exports = {
  Intern,
}