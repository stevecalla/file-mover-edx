const {
  getContentDirectory,
  getDirectoryToCopy,
  getDestinationInformation,
  getCommitMessage,
  getNewBranchName,
  confirmContinue,
} = require("./runInquirer");
const { getAllDirectories } = require("../../../utilities/getAllDirectories");
const { execute_copy_and_delete } = require("../fileMover/step_0_executeCopyAndDelete");
const { openFolder } = require("../../../utilities/openFinder");
const { gitAddCommitPush } = require("../../../utilities/gitCommit");
const { 
  consoleLogStartText, 
  consoleLogSelections, 
  confirmGitPath, 
  confirmCopyText, 
  confirmGitCommitText, 
  confirmInstructionText,
  confirmCreateNewBranch,
} = require('./contentConsoleLogs');
const { instructionsContent } = require('./contentInstructions');
const { createDirectoriesCopyDeleteRules } = require('./createDirectoriesCopyDeleteRules');
const { exitProgram } = require("../../../utilities/exitProgram");
const { copyPathTesting, deployPathTesting } = require('./defaultDirectories');

getCopyMoveDeleteDetails = async () => {
  let contentDirectory = ""; // course content directory
  let contentsOfDirectory = ""; // contents of course content directory
  let sourceDirectory = ""; // directoryToCopy
  let destinationPath = "";
  let destinationInformation = ""; // copy & delete details / information
  let isCreateNewBranch = false;
  let branchName = "";

  await confirmContinue(confirmInstructionText)
    // SECTION RENDER INSTRUCTIONS
    .then((isContinue) => isContinue && instructionsContent())
    .then(() => consoleLogStartText())
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
    // SECTION = QUESTION #3 & #4 - GET COPY & DELETE INSTRUCTIONS
    .then(() => getDestinationInformation())
    .then((result) => destinationInformation = result)
    .then(() => getAllDirectories(destinationInformation.destinationPath)) // READ DIRECTORY TO CHECK THAT DIRECTORY EXISTS
    .then((result) => !result.length && exitProgram()) // IF ERROR READING DIRECTORY EXIT
    //fix in production set default copyPathTesting === "" in the defaultDirectories file
    .then(() => {if(copyPathTesting) {destinationInformation.destinationPath = copyPathTesting}}) 
    .then(() => consoleLogSelections(destinationInformation, contentDirectory, sourceDirectory))
    .then(() => openFolder(destinationInformation.destinationPath))
    // SECTION = CONFIRM THEN EXECUTE COPY & DELETE
    .then(() => confirmContinue(confirmCopyText, '4c)'))
    .then((isContinue) => !isContinue && exitProgram())
    .then(() => createDirectoriesCopyDeleteRules(destinationInformation, contentDirectory, sourceDirectory))
    .then((result) => execute_copy_and_delete(result))
    // SECTION Question #5 - EXECUTE GIT ADD, COMMIT, PUSH
    //fix in production set default deployPathTesting === "" in the defaultDirectories file
    .then(() => destinationPath = deployPathTesting || destinationInformation.destinationPath) 
    // SECTION CONFIRM GIT COMMIT PATH
    .then(() => confirmContinue(confirmGitCommitText, '5)')) // CONFIRM GIT ADD, COMMIT, PUSH
    .then((isContinue) => !isContinue && exitProgram())
    .then(() => confirmContinue(confirmGitPath(destinationPath)))
    .then((isContinue) => !isContinue && exitProgram())
    // SECTION GET BRANCH NAME
    .then(() => confirmContinue(confirmCreateNewBranch))
    .then((result) => { if(result) { isCreateNewBranch = true } }) // default false
    .then(() => isCreateNewBranch && getNewBranchName()) // get branch name
    .then((result) => { if(result) { branchName = result.branchName } }) // if branchName create variable
    // SECTION GET COMMIT MESSAGE
    .then(() => getCommitMessage())
    // SECTION EXECUTE COMMIT
    .then((result) => gitAddCommitPush(destinationPath, result.commitMessage, isCreateNewBranch, branchName))
    .catch((error) => {
      console.error("Error occurred:", error);
    });
};

// getCopyMoveDeleteDetails();

module.exports = {
  getCopyMoveDeleteDetails,
};
