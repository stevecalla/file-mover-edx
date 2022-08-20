const { getTeamDetails, teamMembers } = require('./dist/js/inquirer.js');

async function makeTeam() {
  await getTeamDetails();
}

async function console() {
  console.log(teamMembers);
}

makeTeam();
// console();