const inquirer = require("inquirer");
const {
  questionContentDirectory,
  questionDirectoryToCopy,
  questionsDestinationPath,
  questionsContinue,
  questionCommitMessage,
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

const getDestinationPath = () => {
  try {
    const destinationDirectory = inquirer.prompt(questionsDestinationPath);
    return destinationDirectory;
  } catch (error) {
    console.log('Error getting destination path ', error);
  }
};

confirmContinue = async (message) => {
  try {
    const confirm = await inquirer.prompt(questionsContinue(message));
    return confirm.isContinue;
  } catch (error) {
    console.log('Error confirming continue ', error);
  }
};

const getCommitMessage = () => {
  try {
    const gitCommitMessage = inquirer.prompt(questionCommitMessage);
    return gitCommitMessage;
  } catch (error) {
    console.log('Error getting commit message ', error);
  }
}

module.exports = {
  getContentDirectory,
  getDirectoryToCopy,
  getDestinationPath,
  confirmContinue,
  getCommitMessage,
};
