const inquirer = require("inquirer");
const { getBasicInfo, getRole, getEmployeeDetails, confirmContinue } = require("./runInquirer");
const { createTeamMemberList } = require("./teamMembers.js");
let teamMembers = [];

getTeamDetails = async (role = 'Manager') => {
  console.log(`\n\u001b[0;1mPLEASE ENTER THE ${role.toUpperCase()}\'S INFORMATION.`);
  
  let member = await getBasicInfo(); //get basic employee info
  let employeeDetails = await getEmployeeDetails(role); //get details for specific role
  teamMembers = createTeamMemberList(role, member, employeeDetails, teamMembers); //combine employee role, basic info & role specific into object
  let addMoreMembers = await confirmContinue(role); //determine if user would like to add more employees
  if (addMoreMembers) {
    role = await getRole();
    getTeamDetails(role.role);
  } else {
    // console.log(teamMembers);
  }
}

module.exports = {
  getTeamDetails,
  teamMembers,
}