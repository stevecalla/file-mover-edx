const { getBasicInfo, getRole, getRoleQuestion, confirmContinue } = require("./runInquirer");
const { createMembers } = require("./createMembers.js");
const { createHTML } = require("./createHTML.js");
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
    await createHTML(teamMembers)
    // await writeTeamMembers(),
  )
  // console.log(teamMembers);
}

module.exports = {
  getTeamDetails
}
q
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