const inquirer = require("inquirer");
const {
  questionContentDirectory,
  questionDirectoryToCopy,
  questionsDestinationPath,
  questionsContinue,
  questionCommitMessage,
  questionNewBranchName,
} = require("./questions");

const getContentDirectory = () => {
  try {
    const contentDirectory = inquirer.prompt(questionContentDirectory);
    return contentDirectory;
  } catch (error) {
    console.log('Error getting content directory', error);
  }
};

const getDirectoryToCopy = (directories) => {
  try {
    const directoryToCopy = inquirer.prompt(questionDirectoryToCopy(directories));
    return directoryToCopy;
  } catch (error) {
    console.log('Error getting directory to copy ', error);
  }
};

const getDestinationInformation = () => {
  try {
    const destinationDirectory = inquirer.prompt(questionsDestinationPath);
    return destinationDirectory;
  } catch (error) {
    console.log('Error getting destination path ', error);
  }
};

confirmContinue = async (message, prefixText) => {
  try {
    const confirm = await inquirer.prompt(questionsContinue(message, prefixText));
    return confirm.isContinue;
  } catch (error) {
    console.log('Error confirming continue ', error);
  }
};

const getCommitMessage = async () => {
  try {
    const gitCommitMessage = await inquirer.prompt(questionCommitMessage);
    return gitCommitMessage;
  } catch (error) {
    console.log('Error getting commit message ', error);
  }
}

const getNewBranchName = async () => {
  try {
    const gitNewBranchName = await inquirer.prompt(questionNewBranchName);
    return gitNewBranchName;
  } catch (error) {
    console.log('Error getting commit message ', error);
  }
}

module.exports = {
  getContentDirectory,
  getDirectoryToCopy,
  getDestinationInformation,
  getCommitMessage,
  getNewBranchName,
  confirmContinue,
};
