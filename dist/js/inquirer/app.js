const path = require("path");
const os = require('os');
const {
  getContentDirectory,
  getDirectoryToCopy,
  getDestinationPath,
  confirmContinue,
  getCommitMessage,
} = require("./runInquirer");
const { getAllDirectories } = require("../../../utilities/directoryLibrary");
const { execute_copy_and_delete } = require("../fileMover/step_0_executeCopyAndDelete");
const { openFolder } = require("../../../utilities/openFinder");
const { gitAddCommitPush } = require("../../../utilities/gitCommit");
const { adjustWin32Path } = require("../../../utilities/adjustWin32Path");
const { blueColor, greenColor, redColor, whiteColor } = require("../../../utilities/colors");

getCopyMoveDeleteDetails = async () => {
  let contentDirectory = "";
  let sourceDirectory = "";
  let destinationPath = "";

  await consoleLogStart()
    .then(() => getContentDirectory()) // QUESTION #1
    .then((result) => {
      contentDirectory = result;
      openFolder(result.contentDirectory);
      return result;
    })
    .then((result) => getAllDirectories(result.contentDirectory))
    .then((allDirectories) => getDirectoryToCopy(allDirectories)) // QUESTION #2
    .then((result) => {
      sourceDirectory = result.directoryToCopy;
      return result;
    })
    .then(() => getDestinationPath()) // QUESTION #3
    .then((result) => {
      consoleLogSelections(result, contentDirectory, sourceDirectory);
      destinationPath = result.destinationPath;
      openFolder(destinationPath);
      return result;
    })
    .then((result) => {
      return confirmContinue(
        `Would you like to ${blueColor}COPY & DELETE per the SELECTIONS${whiteColor}`
      ).then((isContinue) => {
        return { result, isContinue };
      });
    })
    .then(({ result, isContinue }) => {
      if (!isContinue) {
        exitProgram();
      }
      result = createCombinedResult(
        result,
        isContinue,
        contentDirectory,
        sourceDirectory
      );
      return result;
    })
    .then((result) => execute_copy_and_delete(result))
    .then(() => os.platform() !== "darwin" && exitProgram())
    .then(() =>
      confirmContinue(
        `Would you like to ${blueColor}Git Add, Commit & Push${whiteColor}?`
      )
    )
    .then((isContinue) => !isContinue && exitProgram())
    .then(() => getCommitMessage())
    .then((result) => {
      let message = result.commitMessage;
      gitAddCommitPush(
        "/Users/stevecalla/file-mover-edx/file-mover-edx", // mac test / development
        // destinationPath, // production

        // '/Google Drive/edX Tutor/file-mover-edx/fullstack-live/01-Class-Content', // windows test
        // os.platform() === 'win32' ? "/Google Drive/edX Tutor/file-mover-edx/fullstack-live/01-Class-Content" : "/Users/stevecalla/file-mover-edx/file-mover-edx",
        message
      );
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
};

consoleLogStart = async () => {
  console.log(
    `\n${whiteColor}PLEASE ENTER THE FILES TO COPY & DELETE INSTRUCTIONS.\n`
  );
};

consoleLogSelections = async (result, contentDirectory, sourceDirectory) => {
  let destinationFolderName = path.basename(sourceDirectory);
  let destinationPath = "";
  let contentPath = "";

  if(os.platform() === "win32") {
    destinationPath = await adjustWin32Path(result.destinationPath);
  } else {
    destinationPath = result.destinationPath;
  }  

  console.log(
    `
    ${blueColor}SELECTIONS:${whiteColor}
    Content Directory:                     ${contentDirectory.contentDirectory}
    Copy From     ${blueColor}- Source Path${whiteColor}:           ${sourceDirectory}
    Copy To       ${blueColor}- Folder${whiteColor}:                ${destinationFolderName}
    Copy To       ${blueColor}- Destinaton Path${whiteColor}:       ${
      destinationPath
    }/${destinationFolderName}
    ${whiteColor}Delete ${blueColor}SOLVED - All Folders${whiteColor}:           ${
      result.deleteSolvedAllFolders
        ? `${greenColor}${result.deleteSolvedAllFolders}`
        : `${redColor}${result.deleteSolvedAllFolders}`
    }
    ${whiteColor}Delete ${blueColor}SOLVED - ACTIVITIES 01 to 10${whiteColor}:   ${
      result.deleteSolvedInActivity01To10
        ? `${greenColor}${result.deleteSolvedInActivity01To10}`
        : `${redColor}${result.deleteSolvedInActivity01To10}`
    }
    ${whiteColor}Delete ${blueColor}SOLVED - ACTIVITIES 11 to 20${whiteColor}:   ${
      result.deleteSolvedInActivity11To20
        ? `${greenColor}${result.deleteSolvedInActivity11To20}`
        : `${redColor}${result.deleteSolvedInActivity11To20}`
    }
    ${whiteColor}Delete ${blueColor}SOLVED - ACTIVITIES 21 to 28${whiteColor}:   ${
      result.deleteSolvedInActivity21To28
        ? `${greenColor}${result.deleteSolvedInActivity21To28}`
        : `${redColor}${result.deleteSolvedInActivity21To28}`
    }
    ${whiteColor}Delete ${blueColor}SOLVED - ALGORITHM folder${whiteColor}:      ${
      result.deleteSolvedInAlgorithmFolder
        ? `${greenColor}${result.deleteSolvedInAlgorithmFolder}`
        : `${redColor}${result.deleteSolvedInAlgorithmFolder}`
    }
    ${whiteColor}Delete ${blueColor}MAIN   - All Folders${whiteColor}:           ${
      result.deleteMainAllFolders
        ? `${greenColor}${result.deleteMainAllFolders}`
        : `${redColor}${result.deleteMainAllFolders}`
    }
    ${whiteColor}Delete ${blueColor}MAIN   - CHALLENGE Folder${whiteColor}:      ${
      result.deleteMainInChallengeFolder
        ? `${greenColor}${result.deleteMainInChallengeFolder}`
        : `${redColor}${result.deleteMainInChallengeFolder}`
    }
    `
  );
};

createCombinedResult = async (
  result,
  isContinue,
  contentDirectory,
  sourceDirectory
) => {

  let destinationFolderName = path.basename(sourceDirectory);
  let destinationPath = "";

  if(os.platform() === "win32") {
    destinationPath = await adjustWin32Path(result.destinationPath);
    console.log(destinationPath);
    contentDirectory = await adjustWin32Path(contentDirectory.contentDirectory);
  } else {
    destinationPath = result.destinationPath;
    contentDirectory = contentDirectory.contentDirectory;
  }

  let destinationDirectory = `${destinationPath}/${destinationFolderName}`;
  let activityDirectory = `${destinationPath}/${destinationFolderName}/01-Activities`;
  let algorithmDirectory = `${destinationPath}/${destinationFolderName}/03-Algorithms`;
  
  result.destinationPath = destinationPath;
  result.isContinue = isContinue;
  result.contentDirectory = contentDirectory;
  result.sourceDirectory = sourceDirectory;
  result.destinationDirectory = destinationDirectory;
  result.destinationFolderName = destinationFolderName;
  result.activityDirectory = activityDirectory;
  result.algorithmDirectory = algorithmDirectory;

  return result;
};

exitProgram = () => {
  console.log(`\n${whiteColor}Go${redColor}o${greenColor}d b${whiteColor}ye${blueColor}!!\n`);
  process.exit();
};

// getCopyMoveDeleteDetails();

module.exports = {
  getCopyMoveDeleteDetails,
};
