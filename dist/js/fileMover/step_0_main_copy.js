const {
  matchPattern01To10,
  matchPattern11To20,
  matchPattern21To28,
  matchPatternChallenge,
  directoryToDeleteSolved,
  directoryToDeleteMain,
} = require("./step_0a_defineDirectories");
const { copyFilesToDestination } = require("./step_2_copyMoveAllDirectoriesFiles"); // step 2
const { deleteAllDirectories } = require("./step_3_deleteAllDirectories");
const { deleteSelectDirectories } = require("./step_5a_deleteSelectDirectories");

// SECTION - MAIN FUNCTION
async function main(copyAndDeleteDetails) {
  await copyMoveAllFiles(copyAndDeleteDetails);

  await deleteAllSolved(copyAndDeleteDetails);
  await deleteSolvedInActivity01To10(copyAndDeleteDetails);
  await deleteSolvedInActivity11To20(copyAndDeleteDetails);
  await deleteSolvedInActivity21To28(copyAndDeleteDetails);
  await deleteSolvedInAlgorithmFolder(copyAndDeleteDetails);

  await deleteAllMain(copyAndDeleteDetails);
  await deleteMainInChallengeFolder(copyAndDeleteDetails);
}

// SECTION - STEP #1: COPY ALL FILES FROM SOURCE TO DESTINATION
async function copyMoveAllFiles(copyAndDeleteDetails) {
  console.log('copy & delete = ', copyAndDeleteDetails);

  const { isContinue, sourceDirectory, destinationDirectory } = copyAndDeleteDetails;

  isContinue && await copyFilesToDestination(sourceDirectory, destinationDirectory);
}

// SECTION - STEP #2: DELETE ALL SOLVED
async function deleteAllSolved(copyAndDeleteDetails) {
  const { deleteSolvedAllFolders, destinationDirectory } = copyAndDeleteDetails;

  deleteSolvedAllFolders && await deleteAllDirectories(destinationDirectory, directoryToDeleteSolved);
}

async function deleteSolvedInActivity01To10(copyAndDeleteDetails) {
  const { deleteSolvedInActivity01To10, activityDirectory } = copyAndDeleteDetails;

  deleteSolvedInActivity01To10 && await deleteSelectDirectories(activityDirectory, directoryToDeleteSolved, matchPattern01To10);
}

async function deleteSolvedInActivity11To20(copyAndDeleteDetails) {
  const { deleteSolvedInActivity11To20, activityDirectory } = copyAndDeleteDetails;

  deleteSolvedInActivity11To20 && await deleteSelectDirectories(activityDirectory, directoryToDeleteSolved, matchPattern11To20);
}

async function deleteSolvedInActivity21To28(copyAndDeleteDetails) {
  const { deleteSolvedInActivity21To28, activityDirectory } = copyAndDeleteDetails;

  deleteSolvedInActivity21To28 && await deleteSelectDirectories(activityDirectory, directoryToDeleteSolved, matchPattern21To28);
}

async function deleteSolvedInAlgorithmFolder(copyAndDeleteDetails) {
  const { deleteSolvedInAlgorithmFolder, algorithmDirectory } = copyAndDeleteDetails;

  deleteSolvedInAlgorithmFolder && await deleteSelectDirectories(algorithmDirectory, directoryToDeleteSolved, matchPattern01To10);
}

// SECTION - STEP #3: DELETE ALL MAIN
async function deleteAllMain(copyAndDeleteDetails) {
  const { deleteMainAllFolders, destinationDirectory } = copyAndDeleteDetails;

  deleteMainAllFolders && await deleteAllDirectories(destinationDirectory, directoryToDeleteMain);
}

async function deleteMainInChallengeFolder(copyAndDeleteDetails) {
  const { deleteMainInChallengeFolder, destinationDirectory } = copyAndDeleteDetails;

  deleteMainInChallengeFolder && await deleteSelectDirectories(destinationDirectory, directoryToDeleteMain, matchPatternChallenge);
}

module.exports = {
  main,
}
