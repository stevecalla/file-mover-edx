const inquirer = require("inquirer");
const {
  questionContentDirectory,
  questionDirectoryToCopy,
  questionsDestinationPath,
  questionsContinue,
  questionCommitMessage,
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

confirmContinue = async (message) => {
  const confirm = await inquirer.prompt(questionsContinue(message));
  return confirm.isContinue;
};

const getCommitMessage = () => {
  const gitCommitMessage = inquirer.prompt(questionCommitMessage);
  return gitCommitMessage;
}

module.exports = {
  getContentDirectory,
  getDirectoryToCopy,
  getDestinationPath,
  confirmContinue,
  getCommitMessage,
};
