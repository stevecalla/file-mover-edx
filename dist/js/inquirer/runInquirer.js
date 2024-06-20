const inquirer = require("inquirer");
const {
  questionContentDirectory,
  questionDirectoryToCopy,
  questionsDestinationPath,
  questionsContinue,
} = require("./questions");

const getContentDirectory = () => {
  const contentDirectory = inquirer.prompt(questionContentDirectory);
  return contentDirectory;
};

const getDirectoryToCopy = (directories) => {
  const directoryToCopy = inquirer.prompt(questionDirectoryToCopy(directories));
  return directoryToCopy;
};

const getDestinationPath = () => {
  const destinationDirectory = inquirer.prompt(questionsDestinationPath);
  return destinationDirectory;
};

confirmContinue = async () => {
  const confirm = await inquirer.prompt(questionsContinue);
  return confirm.isContinue;
};

module.exports = {
  getContentDirectory,
  getDirectoryToCopy,
  getDestinationPath,
  confirmContinue,
};
