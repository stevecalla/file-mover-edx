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
  let copyToDirectory = "";
  let sourceDirectory = "";

  // console.log(`\n\u001b[0;1mPLEASE ENTER THE FILES TO COPY & DELETE INSTRUCTIONS.\n`);
  await consoleLogStart()
    .then(() => getContentDirectory())
    .then((result) => { contentDirectory = result; return result; })
    .then((result) => getAllDirectories(result.contentDirectory))
    .then((allDirectories) => getDirectoryToCopy(allDirectories))
    .then((result) => { sourceDirectory = result.directoryToCopy; return result; })
    .then(() => getDestinationPath())
    .then((result) => { consoleLogSelections(result, contentDirectory, sourceDirectory); return result; })
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

consoleLogStart = async () => {
  const whiteColor = "\u001b[0;1m";
  console.log(`\n${whiteColor}PLEASE ENTER THE FILES TO COPY & DELETE INSTRUCTIONS.\n`);
}

consoleLogSelections = async (result, contentDirectory, sourceDirectory) => {
  let destinationFolderName = path.basename(sourceDirectory);
  const blueColor = "\x1b[36;1m";
  const greenColor = "\x1b[32;1m";
  const redColor = "\x1b[31;1m";
  const whiteColor = "\u001b[0;1m";

  console.log(
    `
    ${blueColor}SELECTIONS:\u001b[0;1m
    Content Directory:                     ${contentDirectory.contentDirectory}
    Copy From     ${blueColor}- Source Path${whiteColor}:           ${sourceDirectory}
    Copy To       ${blueColor}- Folder${whiteColor}:                ${destinationFolderName}
    Copy To       ${blueColor}- Destinaton Path${whiteColor}:       ${result.destinationPath}/${destinationFolderName}
    ${whiteColor}Delete ${blueColor}SOLVED - All Folders${whiteColor}:           ${result.deleteSolvedAllFolders ? `${greenColor}${result.deleteSolvedAllFolders}` : `${redColor}${result.deleteSolvedAllFolders}`}
    ${whiteColor}Delete ${blueColor}SOLVED - ACTIVITIES 01 to 10${whiteColor}:   ${result.deleteSolvedInActivity01To10 ? `${greenColor}${result.deleteSolvedInActivity01To10}` : `${redColor}${result.deleteSolvedInActivity01To10}`}
    ${whiteColor}Delete ${blueColor}SOLVED - ACTIVITIES 11 to 20${whiteColor}:   ${result.deleteSolvedInActivity11To20 ? `${greenColor}${result.deleteSolvedInActivity11To20}` : `${redColor}${result.deleteSolvedInActivity11To20}`}
    ${whiteColor}Delete ${blueColor}SOLVED - ACTIVITIES 21 to 28${whiteColor}:   ${result.deleteSolvedInActivity21To28 ? `${greenColor}${result.deleteSolvedInActivity21To28}` : `${redColor}${result.deleteSolvedInActivity21To28}`}
    ${whiteColor}Delete ${blueColor}SOLVED - ALGORITHM folder${whiteColor}:      ${result.deleteSolvedInAlgorithmFolder ? `${greenColor}${result.deleteSolvedInAlgorithmFolder}` : `${redColor}${result.deleteSolvedInAlgorithmFolder}`}
    ${whiteColor}Delete ${blueColor}MAIN   - All Folders${whiteColor}:           ${result.deleteMainAllFolders ? `${greenColor}${result.deleteMainAllFolders}` : `${redColor}${result.deleteMainAllFolders}`}
    ${whiteColor}Delete ${blueColor}MAIN   - CHALLENGE Folder${whiteColor}:      ${result.deleteMainInChallengeFolder ? `${greenColor}${result.deleteMainInChallengeFolder}` : `${redColor}${result.deleteMainInChallengeFolder}`}`
  );
}

createCombinedResult = (result, isContinue, contentDirectory, sourceDirectory) => { 
  result.isContinue = isContinue;
  result.contentDirectory = contentDirectory.contentDirectory;
  result.sourceDirectory = sourceDirectory;
  
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
