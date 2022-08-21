const { getTeamDetails, teamMembers } = require("./dist/js/inquirer");
const Manager = require("./lib/manager.js")

let main = async () => {
  const step1 = await getTeamDetails();
  // console.log('help')
}

// const manager = new Manager('amanda', 'black', 25, 'a@a.com', 1);
// // amanda.getRole();
// console.log(manager.getName());

main();