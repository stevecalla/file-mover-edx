const Manager = require('../../lib/manager.js');
const Engineer = require('../../lib/engineer.js');
const Intern = require('../../lib/intern.js');

createMembers = (role, member, employeeDetails, teamMembers) => {
  switch(role) {
    case ("Engineer"): 
      const engineer = new Engineer(member.firstName, member.lastName, member.employeeId, member.emailAddress, employeeDetails.gitHubUserName);
      engineer.getRole();
      teamMembers.push(engineer); //push employees into an array
      break;
    case ("Intern"): 
      const intern = new Intern(member.firstName, member.lastName, member.employeeId, member.emailAddress, employeeDetails.internSchool);
      intern.getRole();
      teamMembers.push(intern); //push employees into an array
      break;
    default:
      const manager = new Manager(member.firstName, member.lastName, member.employeeId, member.emailAddress, employeeDetails.officeNumber);
      manager.getRole();
      teamMembers.push(manager); //push employees into an array
  }
  // console.log(teamMembers);
  return teamMembers;
}

module.exports = {
  createMembers
}