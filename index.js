const { main, employees } = require('./dist/js/inquirer.js');

async function makeTeam() {
  await main();
  // console.log(employees);
}

makeTeam();