const Employee = require('../lib/employee');

class Engineer extends Employee {
  constructor(firstName, lastName, id, email, gitHubUserName) {
    super(firstName, lastName, id, email);
    this.gitHubUserName = gitHubUserName;
  }

  getGitHubUserName() {
    return this.gitHubUserName;
  }

  getRole() {
    return this.role = "Engineer";
  }

  getIcon() {
    return this.icon = "fa-glasses";
  }
  
}

// const sam = new Engineer('sam', 'licken', 2, 's@s.com', 'slicken');
// sam.getRole();
// sam.getGitHubUserName();
// console.log(sam.getName());


module.exports = Engineer;