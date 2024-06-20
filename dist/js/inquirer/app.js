const path = require('path');
const {
  getContentDirectory,
  getDirectoryToCopy,
  getDestinationPath,
  confirmContinue,
} = require("./runInquirer");

const { getAllDirectories } = require("../fileMover/utility_getAllDirectories");
const { main } = require("../fileMover/step_0_main_copy")

getCopyMoveDeleteDetails = async () => {
  let contentDirectory = "";
  let sourceDirectory = "";

  console.log(`\n\u001b[0;1mPLEASE ENTER THE FILE TO MOVE DETAILS.\n`);
  await getContentDirectory()
    .then((result) => { contentDirectory = result; return result; })
    .then((result) => getAllDirectories(result.contentDirectory))
    .then((allDirectories) => getDirectoryToCopy(allDirectories))
    .then((result) => { sourceDirectory = result; return result; })
    .then(() => getDestinationPath())
    .then((result) => { consoleLogSelections(result, contentDirectory); return result; })
    .then((result) => {
      return confirmContinue()
              .then((isContinue) => {
                return { result, isContinue };
              });
    })
    .then(({ result, isContinue }) => {
      if(!isContinue) {
        return; // EXIT
      }
      result = createCombinedResult(result, isContinue, contentDirectory, sourceDirectory);
      main(result);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
};

consoleLogSelections = async (result, contentDirectory) => {
  console.log(
    `
    \u001b[0;1mSELECTIONS:
    Copy Files From - \x1b[36;1mSource Path\u001b[0;1m:         ${contentDirectory.contentDirectory}
    Copy Files To - \x1b[36;1mDestinaton Path\u001b[0;1m:       ${result.destinationPath}
    Delete \x1b[36;1mSOLVED - All Folders\u001b[0;1m:           ${result.deleteSolvedAllFolders}
    Delete \x1b[36;1mSOLVED - ACTIVITIES 01 to 10\u001b[0;1m:   ${result.deleteSolvedInActivity01To10}
    Delete \x1b[36;1mSOLVED - ACTIVITIES 11 to 20\u001b[0;1m:   ${result.deleteSolvedInActivity11To20}
    Delete \x1b[36;1mSOLVED - ACTIVITIES 21 to 28\u001b[0;1m:   ${result.deleteSolvedInActivity21To28}
    Delete \x1b[36;1mSOLVED - ALGORITHM folder\u001b[0;1m:      ${result.deleteSolvedInAlgorithmFolder}
    Delete \x1b[36;1mMAIN   - All Folders\u001b[0;1m:           ${result.deleteMainAllFolders}
    Delete \x1b[36;1mMAIN   - CHALLENGE Folder\u001b[0;1m:      ${result.deleteMainInChallengeFolder}`
  );
}

createCombinedResult = (result, isContinue, contentDirectory, sourceDirectory) => { 
  result.isContinue = isContinue;
  result.contentDirectory = contentDirectory.contentDirectory;
  result.sourceDirectory = sourceDirectory.directoryToCopy;
  
  let destinationFolderName = path.basename(result.sourceDirectory);
  result.destinationFolderName = destinationFolderName;

  result.destinationDirectory = `${result.destinationPath}/${destinationFolderName}`;
  result.activityDirectory = `${result.destinationPath}/${destinationFolderName}/01-Activities`;
  result.algorithmDirectory = `${result.destinationPath}/${destinationFolderName}/03-Algorithms`;

  return result;
}

getCopyMoveDeleteDetails();

module.exports = {
  getCopyMoveDeleteDetails,
};
