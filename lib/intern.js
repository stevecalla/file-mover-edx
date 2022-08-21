const Employee = require('../lib/employee');

class Intern extends Employee {
  constructor(firstName, lastName, id, email, school) {
    super(firstName, lastName, id, email);
    this.internSchool = school;
  }

  getSchool() {
    // this.school = school;
  }

  getRole() {
    return this.role = "Intern";
  }

  getIcon() {
    return this.icon = "fa-user-graduate";
  }

  getShowHide() {
    return this.showHide = ["hide", "hide", ""];
  }
}

// const flora = new Intern('flora', 'green', 250, 'f@f.com', 'Oxford');
// flora.getRole();
// flora.getSchool();
// console.log(flora.getName());

module.exports = Intern;