const fs = require("fs").promises;
const { getBasicInfo, getRole, getRoleQuestion, confirmContinue } = require("./runInquirer");
const { createMembers, createClass } = require("./createMembers.js");
const { employeeProfileTemplate } = require("../../src/employeeProfileTemplate.html");
const template = require("../../src/homePageTemplate.html");
const Employee = require('../../lib/employee.js');
const Intern = require('../../lib/intern.js');
let teamMembers = [];

getTeamDetails = async (role = 'Manager') => {
  let basicInfo = {};
  console.log(`\n\u001b[0;1mPLEASE ENTER THE ${role.toUpperCase()}\'S INFORMATION.`);
  await getBasicInfo() //get basic employee info
  .then((answers) => basicInfo = answers)
  .then(() => getRoleQuestion(role))
  .then((details) => createMembers(role, basicInfo, details, teamMembers))
  .then(() => confirmContinue())
  .then((confirm) => inputMoreMembers(confirm, role))

  // let addMoreMembers = true;
    // .then((confirm) => addMoreMembers = confirm)
    // .then(() => {if(addMoreMembers) {getRole()}})
    // .then((data) => {if(addMoreMembers) {getTeamDetails(data)}})
}

inputMoreMembers = async (confirm, role) => {
  confirm ? (
    role = await getRole(),
    getTeamDetails(role.role)
  ) : (
    await createMemberHTML()
    // await writeTeamMembers(),
  )
  // console.log(teamMembers);
}

createMemberHTML = async () => {
  let membersHTML = "";
  
  //USED FOR OF STATEMENT BECAUSE IT SEMED TO WORK LIKE AN AWAIT STATEMENT WHILE MAP & FOR EACH DID NOT EXECUTE BEFORE THE NEXT WRITE FILE STATEMENT
  for (member of teamMembers) { 
    console.log(member)
    membersHTML += employeeProfileTemplate(member);
  };
  
  fs.writeFile("./index-draft.html", template.homePageTemplate(membersHTML), function (err) {
    if (err) throw err;
    // console.log('It\'s saved!');
  });
  return membersHTML;
}

module.exports = {
  getTeamDetails,
}

// WRITE INFO TO JSON FILE
  // writeTeamMembers = async () => {
  //   await fs.writeFile(
  //     "./src/teamMembers.json",
  //     JSON.stringify(teamMembers),
  //     function (err) {
  //       if (err) throw err;
  //       // console.log('It\'s saved!');
  //     }
  //   );
  // }

  //ATTEMPT AT BUILING A PROMISE
    // let role = "Manager"
    // const getTeamDetails = (role = "Manager") => {
    //     new Promise((resolve, reject) => {
    //     // let basicInfo = {};
    //     console.log(`\n\u001b[0;1mPLEASE ENTER THE ${role.toUpperCase()}\'S INFORMATION.`);
    //     // let basicInfo = getBasicInfo();
    //     resolve (getBasicInfo())
    //   });
    // }

    // getTeamDetails
    //   .then((answers) => basicInfo = answers)
    //   .then(() => getRoleQuestion(role))
    //   .then((details) => createMembers(role, basicInfo, details, teamMembers)) 
    //   .then(() => confirmContinue())
    //   .then((confirm) => inputMoreMembers(confirm, role))