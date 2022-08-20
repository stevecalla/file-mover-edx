const { getTeamDetails, teamMembers } = require("./dist/js/inquirer");

let main = async () => {
  const step1 = await getTeamDetails();
}

main();