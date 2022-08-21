const Manager = require('../../lib/manager.js');
const Engineer = require('../../lib/engineer.js');
const Intern = require('../../lib/intern.js');

createMembers = (role, member, employeeDetails, teamMembers) => {
  member.role = role;
  member[Object.keys(employeeDetails)] = Object.values(employeeDetails).join('');
  
  // console.log('class = ', member);

  switch(role) {
    case ("Engineer"): 
      const engineer = new Engineer(member.firstName, member.lastName, member.employeeId, member.emailAddress, member.gitHubUserName);
      engineer.getRole();
      engineer.getName();
      engineer.getIcon();
      engineer.getShowHide();
      teamMembers.push(engineer); //push employees into an array
      break;
    case ("Intern"): 
      const intern = new Intern(member.firstName, member.lastName, member.employeeId, member.emailAddress, member.internSchool);
      intern.getRole();
      intern.getName();
      intern.getIcon();
      intern.getShowHide();
      teamMembers.push(intern); //push employees into an array
      break;
    default:
      const manager = new Manager(member.firstName, member.lastName, member.employeeId, member.emailAddress, member.officeNumber);
      manager.getRole();
      manager.getName();
      manager.getIcon();
      manager.getShowHide();
      teamMembers.push(manager); //push employees into an array
  }
  console.log(teamMembers);
  // teamMembers.forEach(element => console.log(element.email));
  return teamMembers;
}

module.exports = {
  createMembers,
}