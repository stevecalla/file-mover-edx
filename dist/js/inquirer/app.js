const path = require("path");
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
const { adjustWin32Path } = require("../../../utilities/adjustWin32Path");
const { consoleLogStartText, confirmCopyText, consoleLogSelections, confirmGitText } = require('./content');
const { createDirectoriesCopyDeleteRules } = require('./createDirectoriesCopyDeleteRules');
const { exitProgram } = require("../../../utilities/exitProgram");

getCopyMoveDeleteDetails = async () => {
  let contentDirectory = "";
  let sourceDirectory = "";
  let destinationPath = "";
  let destinationInformation = "";
  const deployPathMacOs = "/Users/stevecalla/file-mover-edx/file-mover-edx"; // MAC DEVELOPMENT TESTING
  const deployPathWindowsOS = "/Google Drive/edX Tutor/file-mover-edx/fullstack-live/01-Class-Content"; // WINDOWS DEVELOPMENT TESTING
  const deployPathTesting = os.platform() === 'win32' ? deployPathWindowsOS : deployPathMacOs;

  await consoleLogStartText()
    // SECTION = QUESTION #1 - GET CONTENT DIRECTORY
    .then(() => getContentDirectory()) 
    .then((result) => contentDirectory = result.contentDirectory)
    .then(() => openFolder(contentDirectory))
    .then(() => getAllDirectories(contentDirectory)) // READ CONTENTS OF contentDirectory
    // SECTION = QUESTION #2 - SELECT A DIRECTORY TO COPY
    .then((result) => getDirectoryToCopy(result))
    .then((result) => sourceDirectory = result.directoryToCopy)
    // SECTION = QUESTION #3 - GET COPY & DELETE INSTRUCTIONS
    .then(() => getDestinationInformation())
    .then((result) => destinationInformation = result)
    .then(() => destinationPath = deployPathTesting || destinationInformation.destinationPath) //fix
    .then(() => openFolder(destinationPath))
    .then(() => consoleLogSelections(destinationInformation, contentDirectory, sourceDirectory))
    // SECTION = CONFIRM THEN EXECUTE COPY & DELETE
    .then(() => confirmContinue(confirmCopyText))
    .then((isContinue) => !isContinue && exitProgram())
    .then(() => createDirectoriesCopyDeleteRules(destinationInformation, contentDirectory, sourceDirectory))
    .then((result) => execute_copy_and_delete(result))
    // SECTION EXECUTE GIT ADD, COMMIT, PUSH; ONLY ON MAC OS; EXIT IF WINDOWS OS SINCE GIT IS NOT WORKING
    .then(() => os.platform() !== "darwin" && exitProgram()) 
    .then(() => confirmContinue(confirmGitText)) // CONFIRM GIT ADD, COMMIT, PUSH
    .then((isContinue) => !isContinue && exitProgram())
    .then(() => getCommitMessage())
    .then((result) => gitAddCommitPush(destinationPath, result.commitMessage))
    .catch((error) => {
      console.error("Error occurred:", error);
    });
};

// createDirectoriesCopyDeleteRules = async (
//   result,
//   contentDirectory,
//   sourceDirectory
// ) => {

//   let destinationFolderName = path.basename(sourceDirectory);
//   let destinationPath = "";

//   if(os.platform() === "win32") {
//     destinationPath = await adjustWin32Path(result.destinationPath);
//     console.log(destinationPath);
//     contentDirectory = await adjustWin32Path(contentDirectory);
//   } else {
//     destinationPath = result.destinationPath;
//     contentDirectory = contentDirectory;
//   }

//   let destinationDirectory = `${destinationPath}/${destinationFolderName}`;
//   let activityDirectory = `${destinationPath}/${destinationFolderName}/01-Activities`;
//   let algorithmDirectory = `${destinationPath}/${destinationFolderName}/03-Algorithms`;
  
//   result.destinationPath = destinationPath;
//   result.isContinue = true;
//   result.contentDirectory = contentDirectory;
//   result.sourceDirectory = sourceDirectory;
//   result.destinationDirectory = destinationDirectory;
//   result.destinationFolderName = destinationFolderName;
//   result.activityDirectory = activityDirectory;
//   result.algorithmDirectory = algorithmDirectory;

//   return result;
// };

// getCopyMoveDeleteDetails();

module.exports = {
  getCopyMoveDeleteDetails,
};
