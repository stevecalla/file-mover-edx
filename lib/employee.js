class Employee {
  constructor(firstName, lastName, id, email) {
    this.firstName = firstName; //use filter in inquirer to cap first letter
    this.lastName = lastName; ////use filter in inquirer to cap first letter
    this.fullName = "";
    this.id = id;
    this.email = email;
    this.role = "";
  }

  getName() {
    this.fullName = `${this.firstName} ${this.lastName}`
    return this; //return the object for use
  }

  getId() {
    return this; //return the object for use
  }

  getRole() {
    return this.role = "Employee"
  }
}

const giles = new Employee('giles', 'jones', 55, 'g@g.com');
giles.getRole();
console.log(giles.getName());

module.exports = Employee;