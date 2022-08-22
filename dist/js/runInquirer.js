const inquirer = require("inquirer");
const {
  questionsRole,
  questionsBasicInfo,
  questionsManager,
  questionsEngineer,
  questionsIntern,
  questionsContinue,
} = require("./questions");

getBasicInfo = async () => {
  const employeeAnswers = await inquirer.prompt(questionsBasicInfo);
  // console.log(employeeAnswers);
  return employeeAnswers;
};

getRole = async () => {
  const selectRole = await inquirer.prompt(questionsRole);
  // console.log(selectRole);
  return selectRole;
};

getManagerInfo = async () => {
  const managerInfo = await inquirer.prompt(questionsManager);
  // console.log(managerInfo);
  return managerInfo;
};

getEngineerInfo = async () => {
  const engineerInfo = await inquirer.prompt(questionsEngineer);
  // console.log(engineerInfo);
  return engineerInfo;
};

getInternInfo = async () => {
  const internInfo = await inquirer.prompt(questionsIntern);
  // console.log(internInfo);
  return internInfo;
};

getRoleQuestion = async (role) => {
  let employeeDetails = {};
  switch (role) {
    case "Engineer":
      employeeDetails = await getEngineerInfo();
      break;
    case "Intern":
      employeeDetails = await getInternInfo();
      break;
    default:
      employeeDetails = getManagerInfo();
  }
  return employeeDetails;
};

confirmContinue = async () => {
  const confirm = await inquirer.prompt(questionsContinue);
  return confirm.isContinue;
};

module.exports = {
  getBasicInfo,
  getRole,
  getManagerInfo,
  getEngineerInfo,
  getInternInfo,
  getRoleQuestion,
  confirmContinue,
};
