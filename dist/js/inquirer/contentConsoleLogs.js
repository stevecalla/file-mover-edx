const path = require("path");
const os = require('os');
const { adjustWin32Path } = require("../../../utilities/adjustWin32Path");
const {
  blueColor,
  greenColor,
  redColor,
  whiteColor,
} = require("../../../utilities/colors");

async function consoleLogStartText() {
  console.log(
    `${whiteColor}PLEASE ENTER THE DIRECTORY PATHS & COPY INSTRUCTIONS.\n`
  );
}

const confirmInstructionText = `Would you like to ${blueColor}review the INSTRUCTIONS${whiteColor}`;

const confirmCopyText = `Would you like to ${blueColor}COPY & DELETE per the SELECTIONS${whiteColor}`;

const confirmGitCommitText = `Would you like to ${blueColor}Git Add, Commit & Push${whiteColor}?`;

const confirmCreateNewBranch = `Would you like to ${blueColor}create a NEW BRANCH${whiteColor}?`;

const confirmGitPath = (destinationPath) => `Is this the correct path for Git add, commit, push ${blueColor}${destinationPath}?`;

async function consoleLogSelections(result, contentDirectory, sourceDirectory) {
  let destinationFolderName = path.basename(sourceDirectory);
  let destinationPath = "";

  if (os.platform() === "win32") {
    destinationPath = await adjustWin32Path(result.destinationPath);
  } else {
    destinationPath = result.destinationPath;
  }

  console.log(
    `
    ${blueColor}SELECTIONS:${whiteColor}
    Content Directory:                     ${contentDirectory}
    Copy From     ${blueColor}- Source Path${whiteColor}:           ${sourceDirectory}
    Copy To       ${blueColor}- Folder${whiteColor}:                ${destinationFolderName}
    Copy To       ${blueColor}- Destinaton Path${whiteColor}:       ${destinationPath}/${destinationFolderName}
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
}

module.exports = {
  consoleLogStartText,
  consoleLogSelections,
  confirmGitPath,
  confirmCopyText,
  confirmGitCommitText,
  confirmInstructionText,
  confirmCreateNewBranch,
};
