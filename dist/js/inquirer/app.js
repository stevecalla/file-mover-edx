const os = require('os');
const {
  getContentDirectory,
  getDirectoryToCopy,
  getDestinationInformation,
  getCommitMessage,
  confirmContinue,
} = require("./runInquirer");
const { getAllDirectories } = require("../../../utilities/getAllDirectories");
const { execute_copy_and_delete } = require("../fileMover/step_0_executeCopyAndDelete");
const { openFolder } = require("../../../utilities/openFinder");
const { gitAddCommitPush } = require("../../../utilities/gitCommit");
const { consoleLogStartText, confirmCopyText, consoleLogSelections, confirmGitCommitText, confirmGitPath } = require('./contentConsoleLogs');
const { createDirectoriesCopyDeleteRules } = require('./createDirectoriesCopyDeleteRules');
const { exitProgram } = require("../../../utilities/exitProgram");
const { link } = require('../../../utilities/hyperlinkBuyACoffee');

console.log(link);

getCopyMoveDeleteDetails = async () => {
  let contentDirectory = "";
  let contentsOfDirectory = "";
  let sourceDirectory = "";
  let destinationPath = "";
  let destinationInformation = "";
  const copyPathMacOS = "/Users/stevecalla/file-mover-edx/01-Class-Content-Destination"; // MAC TEST copyPath
  const deployPathMacOs = "/Users/stevecalla/file-mover-edx/file-mover-edx"; // MAC DEVELOPMENT TESTING
  const deployPathWindowsOS = "/Google Drive/edX Tutor/file-mover-edx/fullstack-live/01-Class-Content"; // WINDOWS DEVELOPMENT TESTING
  const deployPathTesting = os.platform() === 'win32' ? deployPathWindowsOS : deployPathMacOs;

  await consoleLogStartText()
    // SECTION = QUESTION #1 - GET CONTENT DIRECTORY
    .then(() => getContentDirectory())
    .then((result) => contentDirectory = result.contentDirectory)
    // SECTION = QUESTION #2 - SELECT A DIRECTORY TO COPY
    .then(() => getAllDirectories(contentDirectory)) // READ CONTENTS OF contentDirectory
    .then((result) => contentsOfDirectory = result)
    .then(() => !contentsOfDirectory.length && exitProgram()) // IF ERROR READING DIRECTORY EXIT
    .then(() => openFolder(contentDirectory))
    .then(() => getDirectoryToCopy(contentsOfDirectory))
    .then((result) => sourceDirectory = result.directoryToCopy)
    // SECTION = QUESTION #3 - GET COPY & DELETE INSTRUCTIONS
    .then(() => getDestinationInformation())
    .then((result) => destinationInformation = result)
    .then(() => getAllDirectories(destinationInformation.destinationPath)) // READ DIRECTORY TO CHECK THAT DIRECTORY EXISTS
    .then((result) => !result.length && exitProgram()) // IF ERROR READING DIRECTORY EXIT
    .then(() => {if(copyPathMacOS) {destinationInformation.destinationPath = copyPathMacOS}}) //fix
    .then(() => consoleLogSelections(destinationInformation, contentDirectory, sourceDirectory))
    .then(() => openFolder(destinationInformation.destinationPath))
    // SECTION = CONFIRM THEN EXECUTE COPY & DELETE
    .then(() => confirmContinue(confirmCopyText))
    .then((isContinue) => !isContinue && exitProgram())
    .then(() => createDirectoriesCopyDeleteRules(destinationInformation, contentDirectory, sourceDirectory))
    .then((result) => execute_copy_and_delete(result))
    // SECTION EXECUTE GIT ADD, COMMIT, PUSH; ONLY ON MAC OS; EXIT IF WINDOWS OS SINCE GIT IS NOT WORKING
    .then(() => os.platform() !== "darwin" && exitProgram()) 
    .then(() => destinationPath = deployPathTesting || destinationInformation.destinationPath) //fix
    .then(() => confirmContinue(confirmGitCommitText)) // CONFIRM GIT ADD, COMMIT, PUSH
    .then((isContinue) => !isContinue && exitProgram())
    .then(() => confirmContinue(confirmGitPath(destinationPath)))
    .then((isContinue) => !isContinue && exitProgram())
    .then(() => getCommitMessage())
    .then((result) => gitAddCommitPush(destinationPath, result.commitMessage))
    .catch((error) => {
      console.error("Error occurred:", error);
    });
};

// getCopyMoveDeleteDetails();

module.exports = {
  getCopyMoveDeleteDetails,
};
