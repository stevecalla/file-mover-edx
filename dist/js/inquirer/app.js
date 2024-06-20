const path = require("path");
const {
  getContentDirectory,
  getDirectoryToCopy,
  getDestinationPath,
  confirmContinue,
  getCommitMessage,
} = require("./runInquirer");

const { getAllDirectories } = require("../fileMover/utility_getAllDirectories");
const {
  execute_copy_and_delete,
} = require("../fileMover/step_0_executeCopyAndDelete");
const { openFolder } = require("../../../utilities/openFinder");
const { gitAddCommitPush } = require("../../../utilities/gitCommit");
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
      execute_copy_and_delete(result);
      // add progress messages
    })
    .then(() =>
      confirmContinue(
        `Would you like to ${blueColor}Git Add, Commit & Push${whiteColor}?`
      )
    )
    .then((isContinue) => {
      if (!isContinue) {
        exitProgram();
      }
      getCommitMessage();
    })
    .then((commitMessage) => {
      gitAddCommitPush(
        "/Users/stevecalla/file-mover-edx/file-mover-edx",
        commitMessage
      );
      return;
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

  console.log(
    `
    ${blueColor}SELECTIONS:${whiteColor}
    Content Directory:                     ${contentDirectory.contentDirectory}
    Copy From     ${blueColor}- Source Path${whiteColor}:           ${sourceDirectory}
    Copy To       ${blueColor}- Folder${whiteColor}:                ${destinationFolderName}
    Copy To       ${blueColor}- Destinaton Path${whiteColor}:       ${
      result.destinationPath
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
    }`
  );
};

createCombinedResult = (
  result,
  isContinue,
  contentDirectory,
  sourceDirectory
) => {
  result.isContinue = isContinue;
  result.contentDirectory = contentDirectory.contentDirectory;
  result.sourceDirectory = sourceDirectory;

  let destinationFolderName = path.basename(result.sourceDirectory);
  result.destinationFolderName = destinationFolderName;

  result.destinationDirectory = `${result.destinationPath}/${destinationFolderName}`;
  result.activityDirectory = `${result.destinationPath}/${destinationFolderName}/01-Activities`;
  result.algorithmDirectory = `${result.destinationPath}/${destinationFolderName}/03-Algorithms`;

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
