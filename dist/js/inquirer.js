const fs = require("fs").promises;
// const inquirer = require("inquirer");
const { getBasicInfo, getRole, getEmployeeDetails, confirmContinue } = require("./runInquirer");
const { createTeamMemberList } = require("./teamMembers.js");
const { employeeProfileTemplate } = require("../../src/employeeProfileTemplate.html");
const template = require("../../src/homePageTemplate.html");
let teamMembers = [];

getTeamDetails = async (role = 'Manager') => {
  console.log(`\n\u001b[0;1mPLEASE ENTER THE ${role.toUpperCase()}\'S INFORMATION.`);
  const member = await getBasicInfo(); //get basic employee info
  const employeeDetails = await getEmployeeDetails(role); //get details for specific role
  teamMembers = createTeamMemberList(role, member, employeeDetails, teamMembers); //combine employee role, basic info & role specific into object
  let addMoreMembers = await confirmContinue(role); //determine if user would like to add more employees
  inputMoreMembers(addMoreMembers, role);
}

inputMoreMembers = async (addMoreMembers, role) => {
  if (addMoreMembers) {
    role = await getRole();
    getTeamDetails(role.role);
  } else {
    await writeTeamMembers();
    await createMemberHTML();
  console.log(teamMembers);
  // process.exit();
  }
}

createMemberHTML = async () => {
  let membersHTML = "";
  for (member of teamMembers) {
    membersHTML += employeeProfileTemplate(member);
  };

  fs.writeFile("./index-draft.html", template.homePageTemplate(membersHTML), function (err) {
    if (err) throw err;
    // console.log('It\'s saved!');
  });
  return membersHTML;
}

writeTeamMembers = async () => {
  await fs.writeFile(
    "./src/teamMembers.json",
    JSON.stringify(teamMembers),
    function (err) {
      if (err) throw err;
      // console.log('It\'s saved!');
    }
  );
}

module.exports = {
  getTeamDetails,
  // teamMembers,
}